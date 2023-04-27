import TaskType from "../types/Task";

interface Props {
    task: TaskType;
}
const Task = ({ task }: Props) => {
    const handleOnCheck = () => {};
    // Get random color for each name card according to first letter of the name.
    const generateRandomColor = (name: string) => {
        const colors = ["#118ab2", "#984447", "#e49e4e"];
        const randomizer = name.charCodeAt(0);
        return colors[randomizer % colors.length];
    };

    return (
        <div className="task-card">
            <div className="task-header">
                <h4>{task.name}</h4>
                <input
                    type="checkbox"
                    id="status"
                    name="status"
                    defaultChecked={task.isFinished}
                    onChange={handleOnCheck}
                ></input>
                <p
                    className="task-assigned-user"
                    style={{
                        backgroundColor: generateRandomColor(
                            task.assignedToName[0]
                        ),
                    }}
                >
                    {task.assignedToName[0]}
                </p>
            </div>
        </div>
    );
};

export default Task;
