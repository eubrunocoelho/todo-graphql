import { model, Schema } from 'mongoose';
import ITask from './task.interface';

const taskSchema = new Schema<ITask>(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        status: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    },
);

const TaskEntity = model<ITask>('Task', taskSchema);

export default TaskEntity;
