import bcrypt from 'bcrypt';

import validateDTO from '../utils/validation.util';

import UserDTO from './user.dto';
import UserEntity from './user.entity';
import IUser from './user.interface';

class UserService {
    public async create(userInput: UserDTO): Promise<IUser> {
        await validateDTO(userInput, UserDTO);

        const create = new UserEntity({
            name: userInput.name,
            email: userInput.email,
            password: bcrypt.hashSync(userInput.password, 10),
        });

        const response = await create.save();

        return {
            ID: response.id,
            ...response.toObject(),
        };
    }
}

export default UserService;
