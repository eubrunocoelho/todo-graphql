import { IsString, MaxLength, MinLength } from 'class-validator';

class UserUpdateDTO {
    @IsString()
    @MinLength(6)
    @MaxLength(128)
    public password: string;
}

export default UserUpdateDTO;
