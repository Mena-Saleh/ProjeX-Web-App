import React, { useState, useEffect } from "react";
import UserCard from "../components/UserCard";
import User from "../types/User";
import env from "../utils/env";

interface Props {
    loggedInID: string;
}

function Users({ loggedInID }: Props) {
    const [users, setUsers] = useState<User[]>([]);
    const URL = env.VITE_API_URL;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(URL + "/user");
                let data = await response.json();
                data = data.filter((user: User) => user.id != loggedInID); //remove logged in user from all users
                const usersWithFriendStatus = await Promise.all(
                    data
                        .filter((user: User) => user.id !== loggedInID)
                        .map(async (user: User) => {
                            const friendResponse = await fetch(
                                `${URL}/user/${loggedInID}/friends/${user.id}/status`
                            );
                            const isFriend = await friendResponse.json();
                            return {
                                username: user.username,
                                email: user.email,
                                id: user.id,
                                isFriend: isFriend,
                            };
                        })
                );
                setUsers(usersWithFriendStatus);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUsers();
    }, []);

    const handleSelectCard = async (friendId: string, isFriend: boolean) => {
        try {
            const method = isFriend ? "DELETE" : "POST";
            const response = await fetch(
                URL + `/user/${loggedInID}/friends/${friendId}`,
                { method }
            );
            if (response.ok) {
                const updatedUsers = users.map((user) => {
                    if (user.id === friendId) {
                        return { ...user, isFriend: !isFriend };
                    }
                    return user;
                });
                setUsers(updatedUsers);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <section className="users-page">
            <h1>Users</h1>
            <h2>
                Add or remove users to collaborate on your projects (friend
                requests are not available as of now)
            </h2>
            {users.map((user) => (
                <UserCard
                    key={user.id}
                    id={user.id}
                    username={user.username}
                    email={user.email}
                    Status={user.isFriend}
                    onSelectCard={() =>
                        handleSelectCard(user.id, user.isFriend)
                    }
                />
            ))}

            <section />
        </section>
    );
}

export default Users;
