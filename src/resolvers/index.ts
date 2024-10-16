import TaskEntity from '../entities/task.entity';

const resolvers = {
    Query: {
        async task(_, { ID }) {
            return await TaskEntity.findById(ID);
        },

        async allTasks() {
            return await TaskEntity.find();
        },
    },
    Mutation: {
        async createTask(_, { taskInput: { name, description, status } }) {
            const createTask = new TaskEntity({
                name: name,
                description: description,
                status: status,
            });

            const response = await createTask.save();

            return {
                ID: response.id,
                ...response.toObject(),
            };
        },

        async updateTask(_, { ID, taskInput: { name, description, status } }) {
            const wasUpdated = (
                await TaskEntity.updateOne(
                    { _id: ID },
                    { name: name, description: description, status: status },
                )
            ).modifiedCount;

            return wasUpdated;
        },

        async deleteTask(_, { ID }) {
            const wasDeleted = (await TaskEntity.deleteOne({ _id: ID }))
                .deletedCount;

            return wasDeleted;
        },
    },
};

export default resolvers;
