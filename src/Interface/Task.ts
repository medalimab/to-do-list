export interface Task {
    id: number;
    name: string;
    description: string | null;
    status: string;
    createdAt?: string;
    updatedAt?: string;
    userId?: number;
    isDone: boolean;
}