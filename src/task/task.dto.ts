enum TaskStatusEnum {
    TO_DO = 'TO_DO',
    DONE = 'DONE',
}

class TaskDTO {
    ID: string;
    name: string;
    description: string;
    status: TaskStatusEnum;
}

export { TaskStatusEnum, TaskDTO };
