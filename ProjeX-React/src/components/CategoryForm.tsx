import React, { useState, FormEvent } from "react";
import env from "../utils/env";
import ProjectType from "../types/Project";

interface Props {
    projectId: string;
    onAddCategory: () => void;
    onClose: () => void;
}

const CategoryForm = ({ projectId, onAddCategory, onClose }: Props) => {
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const URL = env.VITE_API_URL;

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setError("");

        try {
            // Send email, username, and password to server
            const response = await fetch(
                `${URL}/projects/${projectId}/categories`,
                {
                    method: "POST",
                    body: JSON.stringify({ name }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.ok) {
                onAddCategory();
                onClose();
            } else {
                setError("Error Creating Category");
            }
        } catch (error) {
            setError(
                "An error occurred while creating Category. Please try again later."
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
                {error && <div className="error">{error}</div>}
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default CategoryForm;
