interface ITask extends Document {
    ID: string;
    name: string;
    description: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

export default ITask;
