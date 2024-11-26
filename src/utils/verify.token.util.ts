import jwt from 'jsonwebtoken';

const verifyToken = (token: string): any => {
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            return decoded;
        } catch (error) {
            return null;
        }
    }

    return null;
};

export default verifyToken;
