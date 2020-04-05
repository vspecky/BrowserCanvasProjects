let canvas;
const solveButton = document.getElementById('solve');
const resetButton = document.getElementById('reset');

function setup() {
    canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('sketch');

    background(backgroundColor);
    //frameRate(60);
}

function draw() {
    maze.solvingStep();
    maze.draw();
}

function mouseClicked() {
    maze.mouseClick();
}

solveButton.addEventListener('click', () => maze.setSolving());
resetButton.addEventListener('click', () => maze.reset());