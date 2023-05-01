import TaskType from "../types/Task";
import React, { useState, useEffect } from "react";
import TaskDetailsForm from "./TaskDetailsForm";
import generateRandomColor from "../utils/randomColorGenerator";

interface Props {
    task: TaskType;
}
const Task = ({ task }: Props) => {
    const [showDetailsPopup, setShowDetailsPopup] = useState(false);
    const handleOnCheck = (event: React.ChangeEvent<HTMLInputElement>) => {};
    // Get random color for each name card according to first letter of the name.

    const handleShowDetailsPopup = () => {
        setShowDetailsPopup(true);
    };

    const handleCloseDetailsPopup = () => {
        setShowDetailsPopup(false);
    };

    return (
        <>
            <div className="task-card" onClick={handleShowDetailsPopup}>
                <div className="task-header">
                    <h4>{task.name}</h4>
                    <input
                        type="checkbox"
                        id="status"
                        name="status"
                        defaultChecked={task.isFinished}
                        onChange={handleOnCheck}
                        onClick={(event) => {
                            // Stop propagation of the event to parent task card
                            event.stopPropagation();
                        }}
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
            {showDetailsPopup && (
                <TaskDetailsForm
                    Task={task}
                    onClose={handleCloseDetailsPopup}
                ></TaskDetailsForm>
            )}
        </>
    );
};

export default Task;
