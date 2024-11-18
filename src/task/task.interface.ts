interface ITask extends Document {
    name: string;
    description: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

export default ITask;
