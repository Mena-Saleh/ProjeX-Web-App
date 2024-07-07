const generateRandomColor = (name: string) => {
    const colors = ["#118ab2", "#984447", "#e49e4e", "#916AB4", "#5AD891", "#684A52", "#EF798A", "#FB8B24", "#5F0F40"];
    const randomizer = name.charCodeAt(0) + name.charCodeAt(1);
    return colors[randomizer % colors.length];
};

export default generateRandomColor;