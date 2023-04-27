import TaskType from "../types/Task";
import Task from "./Task";

interface Props {
    id: string;
    name: string;
    tasks: TaskType[];
}
const Category = ({ id, name, tasks }: Props) => {
    return (
        <div className="category">
            <div className="category-header">
                <h3>{name}</h3>
            </div>
            <div className="cards-container">
                {tasks.map((task) => (
                    <Task key={task.id} task={task} />
                ))}
            </div>
        </div>
    );
};

export default Category;
