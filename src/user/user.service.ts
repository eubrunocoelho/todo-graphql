import { ApolloError, AuthenticationError } from 'apollo-server';
import bcrypt from 'bcrypt';

import jwtPayloadType from '../jwt/jwt.payload.type';
import validateDTO from '../utils/validation.util';

import UserDTO from './user.dto';
import UserEntity from './user.entity';
import IUser from './user.interface';
import UserUpdateDTO from './user.update.dto';

class UserService {
    constructor(private authUser: jwtPayloadType | null) {}

    public async findOne(ID: string): Promise<IUser> {
        if (!this.authUser) {
            throw new AuthenticationError('Não autorizado.');
        }

        const user = await UserEntity.findById(ID);

        if (!user) {
            throw new ApolloError(`O usuário com o ID ${ID} não existe.`, 'USER_NOT_FOUND', { ID });
        }

        const isOwner = await this.checkIfUserOwnsUser(ID, this.authUser.sub);

        if (!isOwner) {
            throw new AuthenticationError('Você não tem permissão para acessar este usuário.');
        }

        return user;
    }

    public async create(userInput: UserDTO): Promise<IUser> {
        await validateDTO(userInput, UserDTO);

        const isUnique = await this.checkIfEmailIsUnique(userInput.email);

        if (!isUnique) {
            throw new ApolloError('Este endereço de e-mail já está cadastrado.');
        }

        const create = new UserEntity({
            name: userInput.name,
            email: userInput.email,
            password: bcrypt.hashSync(userInput.password, 10),
        });

        const response = await create.save();

        return response.toObject();
    }

    public async update(ID: string, userInput: UserUpdateDTO): Promise<number> {
        if (!this.authUser) {
            throw new AuthenticationError('Não autorizado.');
        }

        if (await this.findOne(ID)) {
            const isOwner = await this.checkIfUserOwnsUser(ID, this.authUser.sub);

            if (!isOwner) {
                throw new AuthenticationError('Você não tem permissão para acessar este usuário.');
            }

            await validateDTO(userInput, UserUpdateDTO);

            const wasUpdated = (
                await UserEntity.updateOne(
                    { _id: ID },
                    {
                        password: bcrypt.hashSync(userInput.password, 10),
                    },
                )
            ).modifiedCount;

            return wasUpdated;
        }
    }

    public async checkIfEmailIsUnique(email: string): Promise<boolean> {
        const user = await UserEntity.find({ email: email });

        if (user.length) return false;

        return true;
    }

    public async checkIfUserOwnsUser(ID: string, authID: string): Promise<boolean> {
        const user = await UserEntity.findById(ID);

        if (user._id.toString() !== authID.toString()) {
            return false;
        }

        return true;
    }
}

export default UserService;
