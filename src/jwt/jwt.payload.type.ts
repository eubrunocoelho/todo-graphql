type jwtPayload = {
    sub: string;
    email: string;
    iat: number;
    exp: number;
};

export default jwtPayload;
