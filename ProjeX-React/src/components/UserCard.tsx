import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faX } from "@fortawesome/free-solid-svg-icons";

interface Props {
    username: string;
    email: string;
    id: string;
    Status: boolean;
    onSelectCard: (friendId: string, isFriend: boolean) => void;
}

const UserCard = ({
    username,
    email,
    Status: isFriend,
    onSelectCard,
    id,
}: Props) => {
    const displayIcons = () => {
        if (isFriend) {
            return <FontAwesomeIcon className="remove-friend" icon={faX} />;
        } else {
            return <FontAwesomeIcon className="add-friend" icon={faPlus} />;
        }
    };

    return (
        <div className="user-card" onClick={() => onSelectCard(id, !isFriend)}>
            <p>{username}</p>
            <p>{email}</p>
            {displayIcons()}
        </div>
    );
};

export default UserCard;
