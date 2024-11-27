import { model, Schema } from 'mongoose';

import IUser from './user.interface';

const userSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    {
        timestamps: true,
    },
);

const UserEntity = model<IUser & Document>('User', userSchema);

export default UserEntity;
