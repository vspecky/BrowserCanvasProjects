const canvasWidth = 1500;
const canvasHeight = 900;
const cellSize = 50;

const backgroundColor = "rgb(190, 190, 190)";

const cellColorsByStatus = {
    empty: backgroundColor,
    start: 'rgb(0, 255, 0)',
    end: "rgb(255, 0, 255)",
    open: "rgb(125, 125, 255)",
    closed: "rgb(255, 0, 0)",
    obstacle: "rgb(0, 0, 0)",
    path: "rgb(255, 255, 0)"
};