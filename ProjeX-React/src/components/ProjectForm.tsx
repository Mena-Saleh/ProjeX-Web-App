import React, { useState, FormEvent } from "react";
import env from "../utils/env";
import ProjectType from "../types/Project";

interface Props {
    loggedInID: string;
    onClose: () => void;
    onAddProject: () => void;
}

const ProjectForm = ({ loggedInID, onClose, onAddProject }: Props) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const URL = env.VITE_API_URL;

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setError("");

        try {
            // Send email, username, and password to server
            const response = await fetch(`${URL}/projects/${loggedInID}`, {
                method: "POST",
                body: JSON.stringify({ name, description }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                onAddProject();
                onClose();
            } else {
                setError("Error Creating Project");
            }
        } catch (error) {
            setError(
                "An error occurred while creating project. Please try again later."
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
                {error && <div className="error">{error}</div>}
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default ProjectForm;
