import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Router from "./router";
import Footer from "./components/Footer";
import jwt_decode, { JwtPayload } from "jwt-decode";
import APIToken from "./types/APIToken";
import loginSessionManager from "./utils/loginSessionManager";
import { decode } from "punycode";
function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [loggedInID, setLoggedInID] = useState<string>("-1");

     useEffect(() => {
        const fetchToken = async () => {
            const token = await loginSessionManager.getTokenFromLocalStorage();
            if (token) {
                setIsLoggedIn(true);
                setToken(token);
                const decoded: APIToken = jwt_decode(token);
                setLoggedInID(decoded.unique_name);
            }
        };

        fetchToken();
    }, []);

    const handleLoginOrRegister = (token: string) => {
        loginSessionManager.storeTokenInLocalStorage(token);
        setIsLoggedIn(true);
        setToken(token);
        let decoded: APIToken = jwt_decode(token);
        setLoggedInID(decoded.unique_name);
    };

    const handleLogout = () => {
        loginSessionManager.deleteTokenFromLocalStorage();
        setIsLoggedIn(false);
        setToken(null);
        setLoggedInID("-1");
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
