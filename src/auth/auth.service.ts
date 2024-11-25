import { ApolloError } from 'apollo-server';
import bcrypt from 'bcrypt';

import UserEntity from '../user/user.entity';

class AuthService {
    public async signIn(email: string, password: string) {
        const foundUser = await UserEntity.findOne({ email });

        if (!foundUser || !bcrypt.compareSync(password, foundUser.password)) {
            throw new ApolloError(`Invalid credentials.`, 'INVALID_CREDENTIALS');
        }

        /* eslint-disable @typescript-eslint/no-unused-vars */
        const { password: _, ...userWithoutPassword } = foundUser.toObject();

        return userWithoutPassword;
    }
}

export default AuthService;
