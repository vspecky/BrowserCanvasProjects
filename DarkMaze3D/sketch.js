let canvas;

const plyr = new Particle(15, 15);
let won = false;

const backToStartButton = document.getElementById('back-to-start');
const restartButton = document.getElementById('restart');
const msgP = document.getElementById('msg');

function resetMaze() {
    globalWalls = [];
    maze.reset();
    //maze.solveAtOnce();
    globalWalls = globalWalls.filter(wall => wall.active);
    //globalWalls = Wall.joinWalls(globalWalls);
    plyr.update(15, 15);
    won = false;
    msgP.innerText = "Get to the bottom right corner! (780, 780)";
}

function setup() {
    canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('sketch');
    background(0);
    textSize(20);

    resetMaze();
}

function draw() {
    background(0);
    plyr.keyboard();
    plyr.cast3D(globalWalls);
    plyr.compass.draw(plyr.pos.x, plyr.pos.y);

    if (plyr.pos.x >= 780 && plyr.pos.y >= 780 && !won) {
        msgP.innerText = "You win!";
        won = true;
    }
}

backToStartButton.addEventListener('click', () => plyr.update(15, 15));
restartButton.addEventListener('click', () => resetMaze());