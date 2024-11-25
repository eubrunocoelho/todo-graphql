import { ApolloError } from 'apollo-server';

import UserEntity from '../user/user.entity';

class AuthService {
    public async signIn(email: string, password: string) {
        const foundUser = await UserEntity.findOne({ email });

        if (!foundUser || foundUser.password !== password) {
            throw new ApolloError(`Invalid credentials.`, 'INVALID_CREDENTIALS');
        }

        const { password: _, ...userWithoutPassword } = foundUser.toObject();

        return userWithoutPassword;
    }
}

export default AuthService;
