import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ApolloError } from 'apollo-server';

async function validateDTO(dto: any, dtoClass: any) {
    const object = plainToInstance(dtoClass, dto);
    const errors = await validate(object);

    if (errors.length > 0) {
        const formattedErrors = errors.map((error) => {
            const constraints = error.constraints ? Object.values(error.constraints) : [];

            return constraints.join(', ');
        });

        throw new ApolloError(formattedErrors.join('; '), 'VALIDATION_ERRORS');
    }
}

export default validateDTO;
