import { gql } from 'apollo-server';

const typeDefs = gql`
    type Task {
        name: String
        description: String
        status: Boolean
        createdAt: String
        updatedAt: String
    }

    type Query {
        task(ID: ID!): Task!
        allTasks: [Task]
    }
`;

export default typeDefs;
