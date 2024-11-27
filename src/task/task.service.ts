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

        const tasks = await TaskEntity.find({ user: this.authUser.sub }).populate('user');

        return tasks;
    }

    public async findOne(ID): Promise<ITask> {
        if (!this.authUser) {
            throw new AuthenticationError('Unauthorized');
        }

        const task = await TaskEntity.findById(ID).populate('user');

        if (!task) {
            throw new ApolloError(`Task with ID ${ID} not found.`, 'TASK_NOT_FOUND', { ID });
        }

        const isOwner = await this.checkIfUserOwnsTask(ID, this.authUser.sub);

        if (!isOwner) {
            throw new AuthenticationError('You do not have permission to access this task');
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
            const isOwner = await this.checkIfUserOwnsTask(ID, this.authUser.sub);

            if (!isOwner) {
                throw new AuthenticationError('You do not have permission to access this task');
            }

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
            const isOwner = await this.checkIfUserOwnsTask(ID, this.authUser.sub);

            if (!isOwner) {
                throw new AuthenticationError('You do not have permission to access this task');
            }

            const wasDeleted = (await TaskEntity.deleteOne({ _id: ID })).deletedCount;

            return wasDeleted;
        }
    }

    public async checkIfUserOwnsTask(ID: string, authID: string): Promise<boolean> {
        const task = await TaskEntity.findById(ID).populate('user');

        if (task.user._id.toString() !== authID.toString()) {
            return false;
        }

        return true;
    }
}

export default TaskService;
