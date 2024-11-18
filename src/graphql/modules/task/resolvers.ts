const resolvers = {
    Query: {
        async findTask(_, { ID }, context) {
            const task = await context.TaskService.findOne(ID);

            if (!task) {
                throw new Error(`Task with ID ${ID} not found.`);
            }

            return task;
        },

        async allTasks(_, args, context) {
            return await context.TaskService.findAll();
        },
    },
    Mutation: {
        async createTask(_, { taskInput }, context) {
            return await context.TaskService.create(taskInput);
        },

        async updateTask(_, { ID, taskInput }, context) {
            return await context.TaskService.update(ID, taskInput);
        },

        async deleteTask(_, { ID }, context) {
            return await context.TaskService.delete(ID);
        },
    },
};

export default resolvers;
