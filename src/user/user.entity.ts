import { model, Schema } from 'mongoose';

import IUser from './user.interface';

const userSchema = new Schema<IUser>(
    {
        name: { type: String, requird: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
    },
    {
        timestamps: true,
    },
);

const UserEntity = model<IUser>('User', userSchema);

export default UserEntity;
