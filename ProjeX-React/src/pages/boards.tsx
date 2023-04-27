import { useParams } from "react-router-dom";
import env from "../utils/env";
import ProjectType from "../types/Project";
import React, { useState, useEffect } from "react";
import Category from "../components/Category";

interface Props {
    loggedInID: string;
}

function Boards({ loggedInID }: Props) {
    const { id } = useParams<{ id: string }>();
    const [project, setProject] = useState<ProjectType | undefined>(undefined);
    const URL = env.VITE_API_URL;

    const fetchProject = async () => {
        try {
            const response = await fetch(URL + `/projects/${id}`);
            const data: ProjectType = await response.json();
            setProject(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProject();
    }, []);

    return (
        <div className="main">
            <div className="main-body">
                {project &&
                    project.categories.map((category) => (
                        <Category
                            key={category.id}
                            id={category.id}
                            name={category.name}
                            tasks={category.tasks}
                        ></Category>
                    ))}
            </div>
        </div>
    );
}

export default Boards;
