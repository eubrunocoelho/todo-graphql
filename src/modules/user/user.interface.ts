interface IUser extends Document {
    _id: string;
    name: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
}

export default IUser;
