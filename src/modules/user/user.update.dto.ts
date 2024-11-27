import { IsString, MaxLength, MinLength } from 'class-validator';

class UserUpdateDTO {
    @IsString({ message: 'A senha deve ser uma string.' })
    @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres.' })
    @MaxLength(128, { message: 'A senha deve ter no máximo 128 caracteres.' })
    public password: string;
}

export default UserUpdateDTO;
