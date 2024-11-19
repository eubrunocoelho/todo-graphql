const resolvers = {
    Query: {
        async findTask(_, { ID }, context) {
            return await context.taskService.findOne(ID);
        },

        async allTasks(_, args, context) {
            return await context.taskService.findAll();
        },
    },
    Mutation: {
        async createTask(_, { taskInput }, context) {
            return await context.taskService.create(taskInput);
        },

        async updateTask(_, { ID, taskInput }, context) {
            return await context.taskService.update(ID, taskInput);
        },

        async deleteTask(_, { ID }, context) {
            return await context.taskService.delete(ID);
        },
    },
};

export default resolvers;
