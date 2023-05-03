import TaskType from "../types/Task";
import React, { useState, useEffect } from "react";
import TaskDetailsForm from "./TaskDetailsForm";
import generateRandomColor from "../utils/randomColorGenerator";
import env from "../utils/env";
import Profile from "./Profile";
interface Props {
    task: TaskType;
    fetchProject: () => void;
}
const Task = ({ task, fetchProject }: Props) => {
    const URL = env.VITE_API_URL;
    const [showDetailsPopup, setShowDetailsPopup] = useState(false);
    const handleOnCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.checked);
        changeTaskStatus(event.target.checked);
    };

    const handleDelete = async () => {
        // const response = await fetch(URL + `/Projects//tasks${task.id}`, {
        //     method: "DELETE",
        // }).catch((error) => {
        //     console.log(error);
        // });
        // handleCloseDetailsPopup();
        // fetchProject();
    };

    const handleShowDetailsPopup = () => {
        setShowDetailsPopup(true);
    };

    const handleCloseDetailsPopup = () => {
        setShowDetailsPopup(false);
    };

    const changeTaskStatus = async (status: boolean) => {
        const response = await fetch(
            `${URL}/projects/tasks/${task.id}/${status}`,
            {
                method: "PUT",
            }
        );
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
                    <Profile name={task.assignedToName}></Profile>
                </div>
            </div>
            {showDetailsPopup && (
                <TaskDetailsForm
                    onDelete={handleDelete}
                    task={task}
                    onClose={handleCloseDetailsPopup}
                ></TaskDetailsForm>
            )}
        </>
    );
};

export default Task;
