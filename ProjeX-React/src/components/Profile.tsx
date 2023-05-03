import generateRandomColor from "../utils/randomColorGenerator";
interface Props {
    name: string;
}
const Profile = ({ name }: Props) => {
    return (
        <p
            className="task-assigned-user"
            style={{
                backgroundColor: generateRandomColor(name[0]),
            }}
        >
            {name.toUpperCase()[0]}
        </p>
    );
};

export default Profile;
