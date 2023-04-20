import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Router from "./router";
import Footer from "./components/Footer";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    const handleLoginOrRegister = (token: string) => {
        setIsLoggedIn(true);
        setToken(token);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setToken(null);
    };

    return (
        <>
            <Navbar
                isLoggedIn={isLoggedIn}
                token={token}
                onLogout={handleLogout}
            />
            <Router
                onLogin={handleLoginOrRegister}
                onRegister={handleLoginOrRegister}
            />
            <Footer />
        </>
    );
}

export default App;
