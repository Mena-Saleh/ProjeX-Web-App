import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Router from "./router";
import Footer from "./components/Footer";
import jwt_decode, { JwtPayload } from "jwt-decode";
import APIToken from "./types/TokenPayload";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [loggedInID, setloggedInID] = useState<string>("-1");

    const handleLoginOrRegister = (token: string) => {
        setIsLoggedIn(true);
        setToken(token);
        let decoded: APIToken = jwt_decode(token);
        setloggedInID(decoded.unique_name);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setToken(null);
        setloggedInID("-1");
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
                isLoggedIn={isLoggedIn}
                loggedInID={loggedInID}
            />
            <Footer />
        </>
    );
}

export default App;
