import { ApolloServer } from 'apollo-server';
import dotenv from 'dotenv';
import { GraphQLError } from 'graphql';
import mongoose from 'mongoose';

import { resolvers, typeDefs } from './graphql';
import AuthService from './modules/auth/auth.service';
import jwtPayloadType from './modules/jwt/jwt.payload.type';
import jwtValidate from './modules/jwt/jwt.validate';
import TaskService from './modules/task/task.service';
import UserService from './modules/user/user.service';

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
            userService: new UserService(authUser),
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
    .connect(process.env.DB_URL as string)
    .then(() => {
        console.log('MongoDB conectado com sucesso!');

        return server.listen({ port: 5000 });
    })
    .then((res: { url: string }) => {
        console.log(`Servidor escutando na porta ${res.url}`);
    });
