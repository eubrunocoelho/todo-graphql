import { ApolloError, AuthenticationError } from 'apollo-server';

import jwtPayload from '../jwt/jwt.payload.type';
import validateDTO from '../utils/validation.util';

import TaskDTO from './task.dto';
import TaskEntity from './task.entity';
import ITask from './task.interface';
import TaskStatusEnum from './task.status.enum';

class TaskService {
    constructor(private authUser: jwtPayload | null) {}

    public async findAll(): Promise<ITask[]> {
        if (!this.authUser) {
            throw new AuthenticationError('Unauthorized');
        }

        const tasks = await TaskEntity.find();

        return tasks;
    }

    public async findOne(ID): Promise<ITask> {
        if (!this.authUser) {
            throw new AuthenticationError('Unauthorized');
        }

        const task = await TaskEntity.findById(ID);

        if (!task) {
            throw new ApolloError(`Task with ID ${ID} not found.`, 'TASK_NOT_FOUND', { ID });
        }

        return task;
    }

    public async create(taskInput: TaskDTO): Promise<ITask> {
        if (!this.authUser) {
            throw new AuthenticationError('Unauthorized');
        }

        await validateDTO(taskInput, TaskDTO);

        const create = new TaskEntity({
            name: taskInput.name,
            description: taskInput.description,
            status: taskInput.status || TaskStatusEnum.TO_DO,
            user: this.authUser.sub,
        });

        const response = await create.save();

        return response;
    }

    public async update(ID, taskInput: TaskDTO): Promise<number> {
        if (!this.authUser) {
            throw new AuthenticationError('Unauthorized');
        }

        if (await this.findOne(ID)) {
            await validateDTO(taskInput, TaskDTO);

            const wasUpdated = (
                await TaskEntity.updateOne(
                    { _id: ID },
                    {
                        name: taskInput.name,
                        description: taskInput.description,
                        status: taskInput.status,
                        user: this.authUser.sub,
                    },
                )
            ).modifiedCount;

            return wasUpdated;
        }
    }

    public async delete(ID): Promise<number> {
        if (!this.authUser) {
            throw new AuthenticationError('Unauthorized');
        }

        if (await this.findOne(ID)) {
            const wasDeleted = (await TaskEntity.deleteOne({ _id: ID })).deletedCount;

            return wasDeleted;
        }
    }
}

export default TaskService;
