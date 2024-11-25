interface IUser extends Document {
    ID: string;
    name: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
}

export default IUser;
