interface ITask extends Document {
    name: string;
    description: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export default ITask;
