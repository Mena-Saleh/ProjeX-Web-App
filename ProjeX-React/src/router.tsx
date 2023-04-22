import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Users from "./pages/users";
import Projects from "./pages/projects";
import Login from "./pages/login";
import Register from "./pages/register";

interface Props {
    onLogin: (token: string) => void;
    onRegister: (token: string) => void;
    isLoggedIn: boolean;
    loggedInID: string;
}

function Router({ onLogin, onRegister, isLoggedIn, loggedInID }: Props) {
    return (
        <Routes>
            <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
            <Route path="/users" element={<Users loggedInID={loggedInID} />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/login" element={<Login onLogin={onLogin} />} />
            <Route
                path="/register"
                element={<Register onRegister={onRegister} />}
            />
        </Routes>
    );
}

export default Router;
