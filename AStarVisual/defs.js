// Width of the canvas.
const canvasWidth = 1500;
// Height of the canvas.
const canvasHeight = 900;
// Cell size
const cellSize = 30;
// Background Color
const backgroundColor = 200;
// Cell toggle color
const cellToggleColor = 'rgb(0, 255, 0)';

// STARTING CELL SELECTION
let selectingStart = false;
let isSelectedStart = false;
let startingCell = null;

// ENDING CELL SELECTION
let selectingEnd = false;
let isSelectedEnd = false;
let endCell = null;

let isSelectingObstacles = false;

let solving = false;

let current;

let test = false;