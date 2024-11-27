import { ApolloError } from 'apollo-server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import UserEntity from '../user/user.entity';

import IAuth from './auth.interface';

/* eslint-disable @typescript-eslint/no-unused-vars */
class AuthService {
    public async signIn(email: string, password: string): Promise<IAuth> {
        const foundUser = await UserEntity.findOne({ email });

        if (!foundUser || !bcrypt.compareSync(password, foundUser.password)) {
            throw new ApolloError(`Credenciais inválidas.`, 'INVALID_CREDENTIALS');
        }

        const payload = { sub: foundUser._id, name: foundUser.name, email: foundUser.email };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

        const { password: _, ...userWithoutPassword } = foundUser.toObject();

        return {
            ...userWithoutPassword,
            _id: foundUser._id.toString(),
            token,
        };
    }
}

export default AuthService;
