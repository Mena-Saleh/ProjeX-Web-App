import React from "react";
import { Link } from "react-router-dom";

interface Props {
    isLoggedIn: boolean;
}

function Home({ isLoggedIn }: Props) {
    const renderNavLink = () => {
        if (isLoggedIn) {
            return (
                <Link to="/projects" className="hero-button">
                    Get started
                </Link>
            );
        } else {
            return (
                <Link to="/register" className="hero-button">
                    Get started
                </Link>
            );
        }
    };

    return (
        <section className="hero">
            <h1>
                Proje<span>X</span>
            </h1>
            <p>The ultimate project management system</p>
            {renderNavLink()}
        </section>
    );
}

export default Home;
