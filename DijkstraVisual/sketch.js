let canvas
const solveButton = document.getElementById('solve');
const resetButton = document.getElementById('reset');

function setup() {
    canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('sketch');
    background(backgroundColor);
}

function draw() {
    dijkstra.solveStep();
    dijkstra.draw();
}

function mousePressed() {
    dijkstra.mouseClick();
}

function mouseDragged() {
    dijkstra.mouseClick();
}

solveButton.addEventListener('click', () => dijkstra.setSolving());
resetButton.addEventListener('click', () => dijkstra.solved && dijkstra.reset());