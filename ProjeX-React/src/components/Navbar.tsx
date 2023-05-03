import React from "react";
import { Link } from "react-router-dom";

interface Props {
    isLoggedIn: boolean;
    token: string | null;
    onLogout: () => void;
}

const Navbar: React.FC<Props> = ({ isLoggedIn, token, onLogout }: Props) => {
    const handleLogout = () => {
        onLogout();
    };

    const renderAuthButtons = () => {
        if (isLoggedIn && token) {
            return (
                <>
                    <Link
                        className="logout-button"
                        to="/"
                        onClick={handleLogout}
                    >
                        Logout
                    </Link>
                </>
            );
        } else {
            return (
                <div>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                </div>
            );
        }
    };
    return (
        <nav>
            <img src="././public/Logo3.png" alt="logo" className="logo"></img>
            <ul>
                <div>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    {isLoggedIn && (
                        <>
                            <li>
                                <Link to="/users">Users</Link>
                            </li>
                            <li>
                                <Link to="/projects">Projects</Link>
                            </li>
                        </>
                    )}
                </div>
                {renderAuthButtons()}
            </ul>
        </nav>
    );
};

export default Navbar;
