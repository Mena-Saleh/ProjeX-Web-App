const generateRandomColor = (name: string) => {
    const colors = ["#118ab2", "#984447", "#e49e4e"];
    const randomizer = name.charCodeAt(0);
    return colors[randomizer % colors.length];
};

export default generateRandomColor;