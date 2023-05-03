import React, { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import env from "../utils/env";

interface Props {
    onLogin: (token: string) => void;
}

const Login: React.FC<Props> = ({ onLogin }: Props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const URL = env.VITE_API_URL;
 
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setError("");

        try {
            const response = await fetch(URL + "/user/login", {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const { token } = await response.json();
                onLogin(token);
                navigate("/");
            } else {
                setError("Invalid email or password");
            }
        } catch (error) {
            setError(
                "An error occurred while logging in. Please try again later."
            );
        }
    };

    return (
        <div className="login-register-container">
            <form onSubmit={handleSubmit} className="login-form">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />

                {error && <div className="error">{error}</div>}

                <button type="submit">Login</button>
                <p>
                    Don't have an account?{" "}
                    <span>
                        <Link to="/register">Register</Link>
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Login;
