import User from "./User";

interface Task {
    id: string;
    name: string;
    isFinished: boolean;
    description: string;
    assignedTo: User;
    assignedToName: string;
    creationDate: string;
    dueDate: string;
}

export default Task;
