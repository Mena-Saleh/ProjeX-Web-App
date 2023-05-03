import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";
import Users from "./pages/users";
import Projects from "./pages/projects";
import Login from "./pages/login";
import Register from "./pages/register";
import Boards from "./pages/boards";

interface Props {
    onLogin: (token: string) => void;
    onRegister: (token: string) => void;
    isLoggedIn: boolean;
    loggedInID: string;
}

function Router({ onLogin, onRegister, isLoggedIn, loggedInID }: Props) {
    //Only accessible if user is logged in
    const renderAuthorizedRoutes = (isLoggedIn: boolean) => {
        if (isLoggedIn) {
            return (
                <>
                    <Route
                        path="/users"
                        element={<Users loggedInID={loggedInID} />}
                    />
                    <Route
                        path="/projects"
                        element={<Projects loggedInID={loggedInID} />}
                    />
                    <Route
                        path="/boards/:id"
                        element={<Boards loggedInID={loggedInID} />}
                    />
                </>
            );
        } else {
            return <></>;
        }
    };

    return (
        <Routes>
            <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
            {renderAuthorizedRoutes(isLoggedIn)}
            <Route path="/login" element={<Login onLogin={onLogin} />} />
            <Route
                path="/register"
                element={<Register onRegister={onRegister} />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default Router;
