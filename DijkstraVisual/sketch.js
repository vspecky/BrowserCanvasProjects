let solveButton;
let resetButton;

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    background(backgroundColor);

    solveButton = createButton('Solve');
    solveButton.mousePressed(() => dijkstra.setSolving())

    resetButton = createButton('Reset');
    resetButton.mousePressed(() => dijkstra.solved && dijkstra.reset())
}

function draw() {
    console.log('called');
    dijkstra.solveStep();
    dijkstra.draw();
}

function mousePressed() {
    dijkstra.mouseClick();
}

function mouseDragged() {
    dijkstra.mouseClick();
}