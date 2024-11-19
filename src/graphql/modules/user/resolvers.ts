const resolvers = {
    Mutation: {
        async createUser(_, { userInput }, context) {
            return await context.userService.create(userInput);
        },
    },
};

export default resolvers;
