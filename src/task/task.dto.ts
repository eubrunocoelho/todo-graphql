import { IsEnum, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

import TaskStatusEnum from './task.status.enum';

class TaskDTO {
    @IsString()
    @MinLength(3)
    @MaxLength(256)
    public name: string;

    @IsString()
    @MinLength(5)
    @MaxLength(1024)
    public description: string;

    @IsEnum(TaskStatusEnum)
    @IsOptional()
    public status: TaskStatusEnum;
}

export default TaskDTO;
