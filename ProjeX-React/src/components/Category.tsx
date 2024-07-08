import React, { useState, useEffect } from "react";
import TaskType from "../types/Task";
import Task from "./Task";
import TaskForm from "./TaskForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faX } from "@fortawesome/free-solid-svg-icons";

interface Props {
  projectId: string;
  id: string;
  name: string;
  tasks: TaskType[];
  fetchProject: () => void;
}
const Category = ({ projectId, id, name, tasks, fetchProject }: Props) => {
  const [showNewTaskPopup, setShowNewTaskPopup] = useState(false);
  const handleShowNewTaskPopup = () => {
    setShowNewTaskPopup(true);
  };

  const handleCloseNewTaskPopup = () => {
    setShowNewTaskPopup(false);
  };

  return (
    <div className="category">
      <div className="category-header">
        <h3>{name}</h3>
      </div>
      <div className="cards-container">
        {tasks.map((task) => (
          <Task key={task.id} task={task} fetchProject={fetchProject} />
        ))}
        <div
          className="task-card new-task-card"
          onClick={handleShowNewTaskPopup}
        >
          <FontAwesomeIcon className="add-icon" icon={faPlus} />
          <div className="task-header">New Task</div>
        </div>
        {showNewTaskPopup && (
          <TaskForm
            ProjectId={projectId}
            CategoryId={id}
            onAddTask={fetchProject}
            onClose={handleCloseNewTaskPopup}
          ></TaskForm>
        )}
      </div>
    </div>
  );
};

export default Category;
