import Project from "../components/Project";
import env from "../utils/env";
import React, { useState, useEffect } from "react";
import ProjectType from "../types/Project";
import ProjectForm from "../components/ProjectForm";
import FriendsForm from "../components/FriendsForm";

interface Props {
    loggedInID: string;
}

function Projects({ loggedInID }: Props) {
    const URL = env.VITE_API_URL;
    const [projects, setProjects] = useState<ProjectType[]>([]);
    const [showCreatePopup, setShowCreatePopup] = useState(false);

    const handleShowCreatePopup = () => {
        setShowCreatePopup(true);
    };

    const handleCloseCreatePopup = () => {
        setShowCreatePopup(false);
    };

    const fetchProjects = async () => {
        try {
            const response = await fetch(URL + `/projects/user/${loggedInID}`);
            const data = await response.json();
            setProjects(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <section className="projects-page">
            <h1>Projects</h1>
            <p>Here you can manage and navigate your projects</p>
            <div className="projects-grid">
                {projects.map((project) => (
                    <Project
                        onDelete={fetchProjects}
                        loggedInID={loggedInID}
                        key={project.id}
                        name={project.name}
                        description={project.description}
                        date={project.creationDate}
                        id={project.id.toString()}
                    ></Project>
                ))}
                <div
                    className="project-card new-project"
                    onClick={handleShowCreatePopup}
                >
                    <button>New Project</button>
                </div>

                {/* Form the shows up on changing the state of showPopUp by clicking the button */}
                {showCreatePopup && (
                    <ProjectForm
                        onClose={handleCloseCreatePopup}
                        onAddProject={fetchProjects}
                        loggedInID={loggedInID}
                    />
                )}
            </div>
        </section>
    );
}

export default Projects;
