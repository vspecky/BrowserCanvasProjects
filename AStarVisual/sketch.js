let canvas;
const solveButton = document.getElementById('solve');
const resetButton = document.getElementById('reset');

function setup() {
    canvas = createCanvas(canvasWidth, canvasHeight);
    //centerCanvas();
    canvas.parent('sketch');
    //frameRate(5);

    background(backgroundColor);
}

function centerCanvas() {
    const x = (displayWidth - width) / 2;
    const y = (displayHeight - height) / 2;
    canvas.position(x, y);
}

function mousePressed() {
    aStar.mouseClick();
}

function mouseDragged() {
    aStar.mouseClick();
}

function draw() {
    aStar.solveStep();
    aStar.draw();
}

solveButton.addEventListener('click', () => aStar.setSolving());
resetButton.addEventListener('click', () => aStar.solved && aStar.reset());