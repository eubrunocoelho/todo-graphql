import { ApolloError, AuthenticationError } from 'apollo-server';

import validateDTO from '../../utils/validation.util';
import jwtPayload from '../jwt/jwt.payload.type';

import TaskDTO from './task.dto';
import TaskEntity from './task.entity';
import ITask from './task.interface';
import TaskStatusEnum from './task.status.enum';

class TaskService {
    constructor(private authUser: jwtPayload | null) {}

    public async findAll(): Promise<ITask[]> {
        if (!this.authUser) {
            throw new AuthenticationError('Não autorizado.');
        }

        const tasks = await TaskEntity.find({ user: this.authUser.sub }).populate('user');

        return tasks;
    }

    public async findOne(ID: string): Promise<ITask> {
        if (!this.authUser) {
            throw new AuthenticationError('Não autorizado.');
        }

        const task = await TaskEntity.findById(ID).populate('user');

        if (!task) {
            throw new ApolloError(`A tarefa com o ID ${ID} não existe.`, 'TASK_NOT_FOUND', { ID });
        }

        const isOwner = await this.checkIfUserOwnsTask(ID, this.authUser.sub);

        if (!isOwner) {
            throw new AuthenticationError('Você não tem permissão para acessar está tarefa.');
        }

        return task;
    }

    public async create(taskInput: TaskDTO): Promise<ITask> {
        if (!this.authUser) {
            throw new AuthenticationError('Não autorizado.');
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

    public async update(ID: string, taskInput: TaskDTO): Promise<number> {
        if (!this.authUser) {
            throw new AuthenticationError('Não autorizado.');
        }

        if (await this.findOne(ID)) {
            const isOwner = await this.checkIfUserOwnsTask(ID, this.authUser.sub);

            if (!isOwner) {
                throw new AuthenticationError('Você não tem permissão para acessar está tarefa.');
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

    public async delete(ID: string): Promise<number> {
        if (!this.authUser) {
            throw new AuthenticationError('Não autorizado.');
        }

        if (await this.findOne(ID)) {
            const isOwner = await this.checkIfUserOwnsTask(ID, this.authUser.sub);

            if (!isOwner) {
                throw new AuthenticationError('Você não tem permissão para acessar está tarefa.');
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
