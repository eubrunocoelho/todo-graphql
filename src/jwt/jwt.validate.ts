import jwt from 'jsonwebtoken';

import jwtPayloadType from './jwt.payload.type';

const jwtValidate = (token: string): jwtPayloadType | null => {
    if (!token) {
        return null;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

        return decoded as jwtPayloadType;
    } catch (error) {
        console.error('JWT validation failed:', error);

        return null;
    }
};

export default jwtValidate;
