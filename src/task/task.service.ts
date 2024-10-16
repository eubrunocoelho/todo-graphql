import TaskEntity from './task.entity';

class TaskService {
    public async findAll() {
        return await TaskEntity.find();
    }

    public async findOne(ID) {
        return await TaskEntity.findById(ID);
    }

    public async create(data) {
        const create = new TaskEntity({
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

    public async update(ID, data) {
        const wasUpdated = (
            await TaskEntity.updateOne(
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

    public async delete(ID) {
        const wasDeleted = (await TaskEntity.deleteOne({ _id: ID }))
            .deletedCount;

        return wasDeleted;
    }
}

export default TaskService;
