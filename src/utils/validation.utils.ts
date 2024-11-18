import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

async function validateDTO(dto: any, dtoClass: any) {
    const object = plainToInstance(dtoClass, dto);
    const errors = await validate(object);

    if (errors.length > 0) {
        throw new Error('Validation failed!');
    }
}

export default validateDTO;
