import { gql } from 'apollo-server';

const typeDefs = gql`
    type Task {
        _id: String
        name: String
        description: String
        status: Boolean
        createdAt: String
        updatedAt: String
    }

    input TaskInput {
        name: String
        description: String
        status: Boolean
    }

    type Query {
        task(ID: ID!): Task!
        allTasks: [Task]
    }

    type Mutation {
        createTask(taskInput: TaskInput): Task!
        updateTask(ID: ID!, taskInput: TaskInput): Boolean
    }
`;

export default typeDefs;
