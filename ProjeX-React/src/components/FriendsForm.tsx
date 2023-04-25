import React, { useState, FormEvent, useEffect } from "react";
import env from "../utils/env";
import User from "../types/User";
import UserCard from "./UserCard";

interface Props {
    projectId: string;
    loggedInID: string;
    onClose: () => void;
}

const FriendsForm = ({ loggedInID, onClose, projectId }: Props) => {
    const [error, setError] = useState("");
    const [users, setUsers] = useState<User[]>([]);
    const URL = env.VITE_API_URL;

    const handleSelectCard = async (
        userId: string,
        projectId: string,
        isMember: boolean
    ) => {
        try {
            const method = isMember ? "DELETE" : "POST";
            const response = await fetch(
                `${URL}/projects/${projectId}/user/${userId}`,
                { method }
            );
            if (response.ok) {
                const updatedUsers = users.map((user) => {
                    if (user.id === userId) {
                        return { ...user, isMember: !isMember };
                    }
                    return user;
                });
                setUsers(updatedUsers);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const fetchUsers = async () => {
        try {
            const response = await fetch(`${URL}/user/${loggedInID}/friends`);
            let data = await response.json();
            data = data.filter((user: User) => user.id != loggedInID); //remove logged in user from all users
            const usersWithMembershipStatus = await Promise.all(
                data
                    .filter((user: User) => user.id !== loggedInID)
                    .map(async (user: User) => {
                        const memberResponse = await fetch(
                            `${URL}/projects/${projectId}/user/${user.id}/membership`
                        );
                        const isMember = await memberResponse.json();
                        return {
                            username: user.username,
                            email: user.email,
                            id: user.id,
                            isMember: isMember,
                        };
                    })
            );
            setUsers(usersWithMembershipStatus);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="pop-up project-members">
            <form className="popup-inner">
                <button className="close-button" onClick={onClose}>
                    X
                </button>{" "}
                {error && <div className="error">{error}</div>}
                {users.map((user) => (
                    <UserCard
                        key={user.id}
                        id={user.id}
                        username={user.username}
                        email={user.email}
                        Status={user.isMember}
                        onSelectCard={() =>
                            handleSelectCard(user.id, projectId, user.isMember)
                        }
                    />
                ))}
            </form>
        </div>
    );
};

export default FriendsForm;
