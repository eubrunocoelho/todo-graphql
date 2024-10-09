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
};

export default resolvers;
