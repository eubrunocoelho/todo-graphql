import { Types } from 'mongoose';

interface ITask extends Document {
    _id: string;
    name: string;
    description: string;
    status: string;
    user: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export default ITask;
