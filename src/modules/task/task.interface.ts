import TaskUserType from './task.user.type';

interface ITask extends Document {
    _id: string;
    name: string;
    description: string;
    status: string;
    user: TaskUserType;
    createdAt: Date;
    updatedAt: Date;
}

export default ITask;
