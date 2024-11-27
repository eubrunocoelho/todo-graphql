import { ApolloError } from 'apollo-server';
import bcrypt from 'bcrypt';

import validateDTO from '../utils/validation.util';

import UserDTO from './user.dto';
import UserEntity from './user.entity';
import IUser from './user.interface';

class UserService {
    public async create(userInput: UserDTO): Promise<IUser> {
        await validateDTO(userInput, UserDTO);

        const isUnique = await this.checkIfEmailIsUnique(userInput.email);

        if (!isUnique) {
            throw new ApolloError(`O e-mail não é único`);
        }

        const create = new UserEntity({
            name: userInput.name,
            email: userInput.email,
            password: bcrypt.hashSync(userInput.password, 10),
        });

        const response = await create.save();

        return response.toObject();
    }

    public async checkIfEmailIsUnique(email: string): Promise<boolean> {
        const user = await UserEntity.find({ email: email });

        if (user.length) return false;

        return true;
    }
}

export default UserService;
