import { ApolloServer } from 'apollo-server';
import dotenv from 'dotenv';
import { GraphQLError } from 'graphql';
import mongoose from 'mongoose';

import AuthService from './auth/auth.service';
import { resolvers, typeDefs } from './graphql';
import TaskService from './task/task.service';
import UserService from './user/user.service';
import verifyToken from './utils/verify.token.util';

dotenv.config();

const server = new ApolloServer({
    resolvers,
    typeDefs,
    context: ({ req }): { user: any; taskService: TaskService; userService: UserService; authService: AuthService } => {
        const authHeader = req.headers.authorization || '';
        const user = authHeader ? verifyToken(authHeader) : null;

        return {
            user,
            taskService: new TaskService(),
            userService: new UserService(),
            authService: new AuthService(),
        };
    },
    formatError: (error: GraphQLError): { message: string; code: string | unknown; details: unknown } => {
        const { message, extensions } = error;

        // if (extensions?.exception?.stacktrace) {
        //     delete extensions.exception.stacktrace;
        // }

        return {
            message,
            code: extensions?.code || 'INTERNAL_SERVER_ERROR',
            details: extensions || null,
        };
    },
});

mongoose
    .connect(process.env.MONGO_DB_URL as string)
    .then(() => {
        console.log('MongoDB connected successfully');

        return server.listen({ port: 5000 });
    })
    .then((res: { url: string }) => {
        console.log(`Server is running on port ${res.url}`);
    });
