import TaskEntity from './task.entity';

class TaskService {
    constructor(private taskEntity: typeof TaskEntity) {}

    public async findAll() {
        return await this.taskEntity.find();
    }

    public async findOne(ID) {
        return await this.taskEntity.findById(ID);
    }

    public async create(data) {
        const create = new this.taskEntity({
            name: data.name,
            description: data.description,
            status: data.status,
        });

        const response = await create.save();

        return {
            ID: response.id,
            ...response.toObject(),
        };
    }

    public async updateTask(ID, data) {
        const wasUpdated = (
            await this.taskEntity.updateOne(
                { _id: ID },
                {
                    name: data.name,
                    description: data.description,
                    status: data.status,
                },
            )
        ).modifiedCount;

        return wasUpdated;
    }

    public async deleteTask(ID) {
        const wasDeleted = (await TaskEntity.deleteOne({ _id: ID }))
            .deletedCount;

        return wasDeleted;
    }
}

export default TaskService;
