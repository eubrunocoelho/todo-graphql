import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';

class UserDTO {
    @IsString()
    @Matches(/^[A-Za-zÀ-ÿ]+([ ]([A-Za-zÀ-ÿ]+))*$/)
    @MinLength(3)
    @MaxLength(256)
    public name: string;

    @IsString()
    @IsEmail()
    @MaxLength(128)
    public email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(128)
    public password: string;
}

export default UserDTO;
