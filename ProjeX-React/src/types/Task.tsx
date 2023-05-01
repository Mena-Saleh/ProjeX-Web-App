import User from "./User";

interface Task {
    id?: string;
    name: string;
    isFinished: boolean;
    description: string;
    assignedToId?: string;
    assignedToName: string;
    creationDate: string;
    dueDate: string;
}

export default Task;
