import { ApolloServer } from 'apollo-server';
import { resolvers, typeDefs } from './graphql';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import TaskService from './task/task.service';
import { GraphQLError } from 'graphql';

dotenv.config();

const server = new ApolloServer({
    resolvers,
    typeDefs,
    context: () => ({ TaskService: new TaskService() }),
    formatError: (error: GraphQLError) => {
        const { message, extensions } = error;
        const validationErrors = (extensions?.exception as any)
            ?.validationErrors;

        if (extensions?.code === 'BAD_USER_INPUT') {
            return {
                message: 'Invalid input provided.',
                details: validationErrors || null,
            };
        }

        return {
            message,
            code: extensions?.code || 'INTERNAL_SERVER_ERROR',
        };
    },
});

mongoose
    .connect(process.env.MONGO_DB_URL as string)
    .then(() => {
        console.log('MongoDB connected successfully');

        return server.listen({ port: 5000 });
    })
    .then((res) => {
        console.log(`Server is running on port ${res.url}`);
    });
