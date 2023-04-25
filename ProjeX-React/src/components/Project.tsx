import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import FriendsForm from "./FriendsForm";
import env from "../utils/env";

interface Props {
    loggedInID: string;
    id: string;
    name: string;
    description: string;
    date: string;
    onDelete: () => void;
}

const Project = ({
    id,
    name,
    description,
    date,
    loggedInID,
    onDelete,
}: Props) => {
    const URL = env.VITE_API_URL;
    const [showUsersPopup, setShowUsersPopup] = useState(false);
    const handleShowUsersPopup = () => {
        setShowUsersPopup(true);
    };

    const handleCloseUsersPopup = () => {
        setShowUsersPopup(false);
    };

    const handleDelete = async () => {
        const response = await fetch(URL + `/Projects/${id}`, {
            method: "DELETE",
        }).catch((error) => {
            console.log(error);
        });
        onDelete();
    };
    const handleUpdate = () => {};

    return (
        <>
            <div className="project-card">
                <div className="project-icon-group">
                    <FontAwesomeIcon
                        className="user"
                        icon={faUser}
                        onClick={handleShowUsersPopup}
                    />
                    <FontAwesomeIcon className="edit" icon={faEdit} />
                    <FontAwesomeIcon
                        className="trash"
                        icon={faTrash}
                        onClick={handleDelete}
                    />
                </div>
                <h3>{name}</h3>
                <p>{description}</p>
                <h6>{date}</h6>
            </div>
            {showUsersPopup && (
                <FriendsForm
                    projectId={id}
                    onClose={handleCloseUsersPopup}
                    loggedInID={loggedInID}
                ></FriendsForm>
            )}
        </>
    );
};

export default Project;
