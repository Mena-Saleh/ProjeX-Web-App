import Task from "./Task";

interface Category {
    id: string;
    name: string;
    tasks: Task[];
}

export default Category;
