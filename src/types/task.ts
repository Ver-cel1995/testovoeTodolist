export type Task = {
        taskName: string;
        description: string;
        assigneeId: number | null;
        dueDate: string;
        priorityId: number;
        statusId: number;
};
