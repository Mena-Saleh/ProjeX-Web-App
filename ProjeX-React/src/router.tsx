import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Projects from "./pages/projects";
import Login from "./pages/login";
import Register from "./pages/register";

interface Props {
    onLogin: (token: string) => void;
    onRegister: (token: string) => void;
}

function Router({ onLogin, onRegister }: Props) {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
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
