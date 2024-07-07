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
    changeTaskStatus(event.target.checked);
  };

  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(URL + `/Projects/tasks/${task.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchProject();
        handleCloseDetailsPopup();
      } else {
        console.log("Error: Unable to delete the task");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowDetailsPopup = () => {
    setShowDetailsPopup(true);
  };

  const handleCloseDetailsPopup = () => {
    setShowDetailsPopup(false);
  };

  const changeTaskStatus = async (status: boolean) => {
    const response = await fetch(`${URL}/projects/tasks/${task.id}/${status}`, {
      method: "PUT",
    });
  };

  return (
    <>
      <div className="task-card" onClick={handleShowDetailsPopup}>
        <div className="task-header">
          <Profile name={task.assignedToName}></Profile>
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
