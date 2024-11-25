const resolvers = {
    Query: {
        async signIn(_, { email, password }, context) {
            return await context.authService.signIn(email, password);
        },
    },
    Mutation: {
        async createUser(_, { userInput }, context) {
            return await context.userService.create(userInput);
        },
    },
};

export default resolvers;
