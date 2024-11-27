import { IsEnum, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

import TaskStatusEnum from './task.status.enum';

class TaskDTO {
    @IsString({ message: 'O nome da tarefa deve ser uma string.' })
    @MinLength(3, { message: 'O nome da tarefa deve ter pelo menos 3 caracteres.' })
    @MaxLength(256, { message: 'O nome da tarefa deve ter no máximo 256 caracters,' })
    public name: string;

    @IsString({ message: 'A descrição da tarefa deve ser uma string.' })
    @MinLength(5, { message: 'A descrição da tarefa deve ter pelo menos 5 caracteres.' })
    @MaxLength(1024, { message: 'A descrição da tarefa está muito longa' })
    public description: string;

    @IsEnum(TaskStatusEnum, {
        message: `O status da tarefa deve ser um dos seguintes valores: ${Object.values(TaskStatusEnum).join(', ')}.`,
    })
    @IsOptional()
    public status: TaskStatusEnum;
}

export default TaskDTO;
