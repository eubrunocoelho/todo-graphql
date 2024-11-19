import { ApolloServer } from 'apollo-server';
import dotenv from 'dotenv';
import { GraphQLError } from 'graphql';
import mongoose from 'mongoose';

import { resolvers, typeDefs } from './graphql';
import TaskService from './task/task.service';

dotenv.config();

const server = new ApolloServer({
    resolvers,
    typeDefs,
    context: (): { TaskService: TaskService } => ({ TaskService: new TaskService() }),
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
