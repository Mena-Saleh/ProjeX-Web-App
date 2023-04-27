import Category from "./Category";

interface Project {
    id: string;
    name: string;
    description: string;
    users: string[];
    creationDate: string;
    categories: Category[];
}

export default Project;
