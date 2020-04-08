let canvas;

const switchPerspectiveBtn = document.getElementById('switch-perspective');
const randomizeWallsBtn = document.getElementById('randomize-walls');

const particle = new Particle(canvasWidth / 2, canvasHeight / 2);
const boundaryArray = [
    new Wall(0, 0, canvasWidth, 0),
    new Wall(0, 0, 0, canvasHeight),
    new Wall(0, canvasHeight, canvasWidth, canvasHeight),
    new Wall(canvasWidth, 0, canvasWidth, canvasHeight),
]

let wallArray;

let mouseControlBool = false;
let view3D = false;

function randomizeWalls() {
    wallArray = [...boundaryArray];
    for (let i = 0; i < 5; i++) {
        const x1 = random(canvasWidth);
        const x2 = random(canvasWidth);
        const y1 = random(canvasHeight);
        const y2 = random(canvasHeight);
        wallArray.push(new Wall(x1, y1, x2, y2));
    }
}

function setup() {
    canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('sketch');
    background(backgroundColor);
    randomizeWalls();
}

function draw() {
    background(backgroundColor);
    particle.keyboard();
    //particle.update(mouseX, mouseY);
    if (view3D) {
        //particle.drawFilter();
        particle.cast3D(wallArray);
    }
    else particle.cast(wallArray);
    //wall.draw();
    if (mouseControlBool) {
        particle.update(mouseX, mouseY);
    }
}

switchPerspectiveBtn.addEventListener('click', () => view3D = !view3D);
randomizeWallsBtn.addEventListener('click', () => randomizeWalls());