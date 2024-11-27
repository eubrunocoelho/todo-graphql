import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';

class UserDTO {
    @IsString({ message: 'O nome deve ser uma string.' })
    @Matches(/^[A-Za-zÀ-ÿ]+([ ]([A-Za-zÀ-ÿ]+))*$/, { message: 'O nome está inválido.' })
    @MinLength(3, { message: 'O nome deve ter pelo menos 3 caracteres.' })
    @MaxLength(256, { message: 'O nome deve ter no máximo 256 caracteres.' })
    public name: string;

    @IsString({ message: 'O endereço de e-mail deve ser uma string.' })
    @IsEmail({}, { message: 'O endereço de e-mail está inválido.' })
    @MaxLength(128, { message: 'O endereço de e-mail deve ter no máximo 128 caracteres.' })
    public email: string;

    @IsString({ message: 'A senha deve ser uma string.' })
    @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres.' })
    @MaxLength(128, { message: 'A senha deve ter no máximo 128 caracteres.' })
    public password: string;
}

export default UserDTO;
