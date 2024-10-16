import { model, Schema } from 'mongoose';

interface Task extends Document {
    name: string;
    description: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const taskSchema = new Schema<Task>(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        status: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    },
);

const TaskEntity = model<Task>('Task', taskSchema);

export default TaskEntity;
