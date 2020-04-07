let canvas;

const plyr = new Particle(15, 15);

let showWalls = false;
let won = false;

const showWallsBtn = document.getElementById('show-walls');
const restartButton = document.getElementById('restart');
const msgP = document.getElementById('msg');

function resetMaze() {
    globalWalls = [];
    maze.reset();
    //maze.solveAtOnce();
    globalWalls = globalWalls.filter(wall => wall.active);
    //globalWalls = Wall.joinWalls(globalWalls);
    plyr.update(15, 15);
    showWalls = false;
}

function setup() {
    canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('sketch');
    background(0);

    resetMaze();
}

function draw() {
    background(0);
    plyr.keyboard();
    plyr.cast(globalWalls);

    if (plyr.pos.x >= 780 && plyr.pos.y >= 780 && !won) {
        msgP.innerText = "You win!";
        won = true;
    }

    if (showWalls) maze.draw();
}

showWallsBtn.addEventListener('click', () => showWalls = !showWalls);
restartButton.addEventListener('click', () => {
    resetMaze();
    msgP.innerText = "Get to the lower right corner!";
    won = false;
});