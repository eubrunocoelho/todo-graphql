import { model, Schema } from 'mongoose';

import ITask from './task.interface';

const taskSchema = new Schema<ITask>(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        status: { type: String, enum: ['TO_DO', 'DONE'], default: 'TO_DO' },
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    },
    {
        timestamps: true,
    },
);

const TaskEntity = model<ITask & Document>('Task', taskSchema);

export default TaskEntity;
