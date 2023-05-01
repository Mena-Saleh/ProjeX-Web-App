import React, { useState, FormEvent, useEffect } from "react";
import env from "../utils/env";
import TaskType from "../types/Task";
import User from "../types/User";
interface Props {
    ProjectId: string;
    CategoryId: string;
    onAddTask: () => void;
    onClose: () => void;
}

const TaskForm = ({ ProjectId, CategoryId, onAddTask, onClose }: Props) => {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<number>();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [assignedToName, setAssignedToName] = useState("");
    const [dueDate, setDueDate] = useState(new Date().toISOString());
    const [error, setError] = useState("");
    const URL = env.VITE_API_URL;

    const fetchProjectUsers = async () => {
        const response = await fetch(`${URL}/projects/${ProjectId}/users`);
        const data = await response.json();
        setUsers(data);
    };
    useEffect(() => {
        fetchProjectUsers();
    }, []);

    const handleSelectChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setSelectedUserId(parseInt(event.target.value));
        const selectedIndex = event.target.selectedIndex;
        const selectedOption = event.target.options[selectedIndex];
        setAssignedToName(selectedOption.text);
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setError("");
        let taskObject: TaskType = {
            name: name,
            description: description,
            creationDate: new Date().toISOString(),
            dueDate: dueDate,
            isFinished: false,
            assignedToName: assignedToName,
            assignedToId: selectedUserId?.toString(),
        };
        console.log(taskObject);
        try {
            const response = await fetch(
                `${URL}/projects/categories/${CategoryId}`,
                {
                    method: "POST",
                    body: JSON.stringify(taskObject),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.ok) {
                onAddTask();
                onClose();
            } else {
                setError("Error Creating Task");
            }
        } catch (error) {
            setError(
                "An error occurred while creating Task. Please try again later."
            );
        }
    };
    return (
        <div className="pop-up">
            <form onSubmit={handleSubmit} className="popup-inner">
                <button className="close-button" onClick={onClose}>
                    X
                </button>{" "}
                <label htmlFor="name">Name</label>
                <input
                    required
                    type="text"
                    id="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                <label htmlFor="description">Description</label>
                <textarea
                    maxLength={190}
                    rows={5}
                    cols={50}
                    id="description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />
                <label htmlFor="due date">Due date</label>
                <input
                    type="date"
                    onChange={(event) => setDueDate(event.target.value)}
                ></input>
                <label htmlFor="assigned to">Assigned to</label>
                <select value={selectedUserId} onChange={handleSelectChange}>
                    <option value="">Select a user</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.username}
                        </option>
                    ))}
                </select>
                {error && <div className="error">{error}</div>}
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default TaskForm;
