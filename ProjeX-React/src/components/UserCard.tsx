import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import Profile from "./Profile";

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
      return (
        <>
          <div className="remove-friend">
            <p>Remove Friend</p>
            <FontAwesomeIcon icon={faX} />
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="add-friend">
            <p>Add Friend</p>
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </>
      );
    }
  };

  return (
    <div className="user-card" onClick={() => onSelectCard(id, !isFriend)}>
      <div>
        <Profile name={username}></Profile>
        <p>{username}</p>
      </div>
      <p>{email}</p>
      {displayIcons()}
    </div>
  );
};

export default UserCard;
