interface User {
    id: string;
    username: string;
    email: string;
    friends: string[];
    isFriend: boolean;
    isMember: boolean;
}

export default User;
