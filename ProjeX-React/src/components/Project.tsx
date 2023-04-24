import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import env from "../utils/env";

interface Props {
    id: string;
    name: string;
    description: string;
    date: string;
}

const Project = ({ id, name, description, date }: Props) => {
    const URL = env.VITE_API_URL;
    const handleDelete = async () => {
        const response = await fetch(URL + `/Projects/${id}`, {
            method: "DELETE",
        }).catch((error) => {
            console.log(error);
        });
    };
    const handleUpdate = () => {};

    return (
        <div className="project-card">
            <div className="project-icon-group">
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
    );
};

export default Project;
