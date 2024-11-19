import { ApolloError } from 'apollo-server';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

const validateDTO = async <T extends object>(dto: T, dtoClass: { new (): T }): Promise<void> => {
    const object = plainToInstance(dtoClass, dto);
    const errors = await validate(object);

    if (errors.length > 0) {
        const formattedErrors = errors.map((error) => {
            const constraints = error.constraints ? Object.values(error.constraints) : [];

            return constraints.join(', ');
        });

        throw new ApolloError(formattedErrors.join('; '), 'VALIDATION_ERROR');
    }
};

export default validateDTO;
