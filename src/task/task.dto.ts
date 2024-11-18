import { IsEnum, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

enum TaskStatusEnum {
    TO_DO = 'TO_DO',
    DONE = 'DONE',
}

class TaskDTO {
    @IsString()
    @MinLength(3)
    @MaxLength(256)
    name: string;

    @IsString()
    @MinLength(5)
    @MaxLength(1024)
    description: string;

    @IsEnum(TaskStatusEnum)
    @IsOptional()
    status: TaskStatusEnum;
}

export { TaskStatusEnum, TaskDTO };
