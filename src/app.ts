import { ApolloServer } from 'apollo-server';
import dotenv from 'dotenv';
import { GraphQLError } from 'graphql';
import mongoose from 'mongoose';

import AuthService from './auth/auth.service';
import { resolvers, typeDefs } from './graphql';
import jwtPayloadType from './jwt/jwt.payload.type';
import jwtValidate from './jwt/jwt.validate';
import TaskService from './task/task.service';
import UserService from './user/user.service';

dotenv.config();

const server = new ApolloServer({
    resolvers,
    typeDefs,
    context: ({
        req,
    }): {
        authUser: jwtPayloadType | null;
        taskService: TaskService;
        userService: UserService;
        authService: AuthService;
    } => {
        const authHeader = req.headers.authorization || '';
        const authUser = authHeader ? jwtValidate(authHeader) : null;

        return {
            authUser,
            taskService: new TaskService(authUser),
            userService: new UserService(),
            authService: new AuthService(),
        };
    },
    formatError: (error: GraphQLError): { message: string; code: string | unknown; details: unknown } => {
        const { message, extensions } = error;

        if (process.env.STACKTRACE == 'false' && extensions?.exception?.stacktrace) {
            delete extensions.exception.stacktrace;
        }

        return {
            message,
            code: extensions?.code || 'INTERNAL_SERVER_ERROR',
            details: extensions || null,
        };
    },
});

mongoose
    .connect(process.env.MONGODB_URL as string)
    .then(() => {
        console.log('MongoDB connected successfully');

        return server.listen({ port: 5000 });
    })
    .then((res: { url: string }) => {
        console.log(`Server is running on port ${res.url}`);
    });
