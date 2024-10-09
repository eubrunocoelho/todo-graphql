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
                id: response.id,
                ...response.toObject(),
            };
        },
    },
};

export default resolvers;
