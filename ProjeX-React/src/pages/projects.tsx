import Project from "../components/Project";
import env from "../utils/env";
import React, { useState, useEffect } from "react";
import ProjectType from "../types/Project";
import ProjectForm from "../components/ProjectForm";

interface Props {
    loggedInID: string;
}

function Projects({ loggedInID }: Props) {
    const URL = env.VITE_API_URL;
    const [projects, setProjects] = useState<ProjectType[]>([]);
    const [showPopup, setShowPopup] = useState(false);
    const handleShowPopup = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    useEffect(() => {
        async function fetchProjects() {
            try {
                const response = await fetch(
                    URL + `/projects/user/${loggedInID}`
                );
                const data = await response.json();
                setProjects(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchProjects();
    }, projects);

    if (!projects) {
        return <Project name=".." description="...." date="...." id="" />;
    }

    return (
        <section className="projects-page">
            <h1>Projects</h1>
            <p>Here you can manage and navigate your projects</p>
            <div className="projects-grid">
                {projects.map((project) => (
                    <Project
                        key={project.id}
                        name={project.name}
                        description={project.description}
                        date={project.creationDate}
                        id={project.id.toString()}
                    />
                ))}
                <div
                    className="project-card new-project"
                    onClick={handleShowPopup}
                >
                    <button>New Project</button>
                </div>

                {/* Form the shows up on changing the state of showPopUp by clicking the button */}
                {showPopup && (
                    <ProjectForm
                        onClose={handleClosePopup}
                        loggedInID={loggedInID}
                    ></ProjectForm>
                )}
            </div>
        </section>
    );
}

export default Projects;
