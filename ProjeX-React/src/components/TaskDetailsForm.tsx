import React, { useState, FormEvent, useEffect } from "react";
import User from "../types/User";
import UserCard from "./UserCard";
import Task from "../types/Task";
import dateFormatter from "../utils/dateFormatter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";

interface Props {
  task: Task;
  onClose: () => void;
  onDelete: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const TaskDetailsForm = ({ task: Task, onClose, onDelete }: Props) => {
  const [error, setError] = useState("");
  const showDetailsPopup = () => {};

  return (
    <div className="pop-up project-members">
      <form className="popup-inner">
        <button className="close-button" onClick={onClose}>
          X
        </button>{" "}
        {error && <div className="error">{error}</div>}
        <label htmlFor="date">Creation Date</label>
        <input
          required
          type="text"
          disabled={true}
          id="date"
          value={dateFormatter(Task.creationDate)}
        />
        <label htmlFor="date">Task Name</label>
        <input
          required
          type="text"
          disabled={true}
          id="name"
          value={Task.name}
        />
        <label htmlFor="description">Task Description</label>
        <textarea
          maxLength={190}
          rows={5}
          cols={50}
          id="description"
          disabled={true}
          value={Task.description}
        />
        <label htmlFor="date">Assigned To</label>
        <input
          required
          type="text"
          disabled={true}
          id="assignedToName"
          value={Task.assignedToName}
        />
        <label htmlFor="date">Due Date</label>
        <input
          required
          type="text"
          disabled={true}
          id="assignedToName"
          value={dateFormatter(Task.dueDate)}
        />
        <button onClick={onDelete}>
          <FontAwesomeIcon className="trash task-delete" icon={faTrash} />
        </button>
      </form>
    </div>
  );
};

export default TaskDetailsForm;
