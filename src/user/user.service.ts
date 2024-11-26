import { ApolloError } from 'apollo-server';
import bcrypt from 'bcrypt';

import validateDTO from '../utils/validation.util';

import UserDTO from './user.dto';
import UserEntity from './user.entity';
import IUser from './user.interface';

class UserService {
    public async findOne(ID): Promise<IUser> {
        const user = await UserEntity.findById(ID);

        if (!user) {
            throw new ApolloError(`User with ID ${ID} not found.`, 'USER_NOT_FOUND', { ID });
        }

        return user;
    }

    public async create(userInput: UserDTO): Promise<IUser> {
        await validateDTO(userInput, UserDTO);

        const create = new UserEntity({
            name: userInput.name,
            email: userInput.email,
            password: bcrypt.hashSync(userInput.password, 10),
        });

        const response = await create.save();

        return response.toObject();
    }
}

export default UserService;
