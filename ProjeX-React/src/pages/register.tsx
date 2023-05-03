import React, { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import env from "../utils/env";

interface Props {
    onRegister: (token: string) => void;
}

const Register: React.FC<Props> = ({ onRegister }: Props) => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const URL = env.VITE_API_URL;

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            // Send email, username, and password to server
            const response = await fetch(URL + "/user/register", {
                method: "POST",
                body: JSON.stringify({ email, username, password }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const { token } = await response.json();
                onRegister(token);
                navigate("/"); // Redirect to home page
            } else {
                setError(
                    "Error registering user, make sure all fields are filled and that email address is unique"
                );
            }
        } catch (error) {
            setError(
                "An error occurred while registering. Please try again later."
            );
        }
    };

    return (
        <div className="login-register-container">
            <form onSubmit={handleSubmit} className="register-form">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(event) =>
                        setEmail(
                            event.target.value &&
                                event.target.value.toLowerCase()
                        )
                    }
                />

                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />

                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                    type="password"
                    id="confirm-password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                />

                {error && <div className="error">{error}</div>}

                <button type="submit">Register</button>
                <p>
                    Already have an account?{" "}
                    <span>
                        <Link to="/login">Login</Link>
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Register;
