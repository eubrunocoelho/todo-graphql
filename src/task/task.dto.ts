enum TaskStatusEnum {
    TO_DO = 0,
    DONE = 1,
}

class TaskDTO {
    ID: string;
    name: string;
    description: string;
    status: boolean;
}

export { TaskStatusEnum, TaskDTO };
