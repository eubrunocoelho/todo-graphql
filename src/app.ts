import { ApolloServer } from 'apollo-server';
import { resolvers, typeDefs } from './graphql';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import TaskService from './task/task.service';

dotenv.config();

const server = new ApolloServer({
    resolvers,
    typeDefs,
    context: () => ({ TaskService: new TaskService() }),
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
