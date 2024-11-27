type jwtPayloadType = {
    sub: string;
    email: string;
    iat: number;
    exp: number;
};

export default jwtPayloadType;
