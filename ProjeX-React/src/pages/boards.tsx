import { useParams } from "react-router-dom";
import env from "../utils/env";
import ProjectType from "../types/Project";
import React, { useState, useEffect } from "react";
import Category from "../components/Category";
import CategoryForm from "../components/CategoryForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faX } from "@fortawesome/free-solid-svg-icons";

interface Props {
  loggedInID: string;
}

function Boards({ loggedInID }: Props) {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<ProjectType | undefined>(undefined);
  const [showNewCategoryPopup, setShowNewCategoryPopup] = useState(false);
  const URL = env.VITE_API_URL;

  const handleShowNewCategoryPopup = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setShowNewCategoryPopup(true);
  };

  const handleCloseNewCategoryPopup = () => {
    setShowNewCategoryPopup(false);
  };

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
    <div className="boards">
      <div className="boards-body">
        {project &&
          project.categories.map((category) => (
            <Category
              key={category.id}
              id={category.id}
              name={category.name}
              tasks={category.tasks}
              projectId={id ? id : "-1"}
              fetchProject={fetchProject}
            ></Category>
          ))}

        <div className="category new-category">
          <button onClick={handleShowNewCategoryPopup}>
            <FontAwesomeIcon className="add-icon" icon={faPlus} />
            New Category
          </button>
        </div>
        {showNewCategoryPopup && (
          <CategoryForm
            projectId={id ? id : "-1"}
            onAddCategory={fetchProject}
            onClose={handleCloseNewCategoryPopup}
          ></CategoryForm>
        )}
      </div>
    </div>
  );
}

export default Boards;
