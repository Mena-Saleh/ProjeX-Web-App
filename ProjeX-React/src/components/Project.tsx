import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleUp,
    faBoxOpen,
    faCircleUp,
    faDashboard,
    faEdit,
    faExpand,
    faPlaneUp,
    faTrash,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import FriendsForm from "./FriendsForm";
import env from "../utils/env";
import { Link } from "react-router-dom";

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
    const handleShowUsersPopup = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
        setShowUsersPopup(true);
    };

    const handleCloseUsersPopup = () => {
        setShowUsersPopup(false);
    };

    const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
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
            <Link className="project-card-link" to={`/boards/${id}`}>
                <div className="project-card">
                    <div className="project-icon-group">
                        <button onClick={handleShowUsersPopup}>
                            <FontAwesomeIcon className="user" icon={faUser} />
                        </button>
                        <button>
                            <FontAwesomeIcon className="edit" icon={faEdit} />
                        </button>
                        <button onClick={handleDelete}>
                            <FontAwesomeIcon className="trash" icon={faTrash} />
                        </button>
                    </div>
                    <h3>{name}</h3>
                    <p>{description}</p>
                    <h6>{date}</h6>
                </div>{" "}
            </Link>
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
