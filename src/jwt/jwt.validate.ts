import jwt from 'jsonwebtoken';

import jwtPayload from './jwt.payload.type';

/* eslint-disable @typescript-eslint/no-unused-vars */
const jwtValidate = (token: string): jwtPayload | null => {
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            return decoded;
        } catch (_) {
            return null;
        }
    }

    return null;
};

export default jwtValidate;
