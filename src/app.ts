import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

import resolvers from './resolvers';
import typeDefs from './typeDefs';

const server = new ApolloServer({ resolvers, typeDefs });

mongoose
    .connect(process.env.MONGO_DB_URL as string)
    .then(() => {
        console.log('MongoDB connected successfully');

        return server.listen({ port: 5000 });
    })
    .then((res) => {
        console.log(`Server is running on port ${res.url}`);
    });
