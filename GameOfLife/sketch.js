const game = new GameOfLife(canvasWidth, canvasHeight, cellSize);
let canvas;
let speed = 10;

const resetButton = document.getElementById('reset');
const startButton = document.getElementById('start');
const incSpeedButton = document.getElementById('inc-speed');
const decSpeedButton = document.getElementById('dec-speed');

function setup() {
	canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('sketch');
    background(0);
}

function draw() {
	background(0);
    game.handleClick();
    game.step();
    game.draw();
}

function reset() {
    game.reset();
    frameRate(60);
}

function start() {
    frameRate(speed);
    game.startExecuting();
}

function incSpeed() {
    if (speed < 60) {
        speed = speed + 2;
        frameRate(speed); 
    }
}

function decSpeed() {
    if (speed > 2) {
        speed = speed - 2;
        frameRate(speed);
    }
}

function keyPressed() {
    if (keyIsDown(83)) start();
    else if (keyIsDown(82)) reset();
    else if (keyIsDown(38)) incSpeed();
    else if (keyIsDown(40)) decSpeed();
}

resetButton.addEventListener('click', reset);

startButton.addEventListener('click', start);

incSpeedButton.addEventListener('click', incSpeed);

decSpeedButton.addEventListener('click', decSpeed);