let canvas;
let shapeFunction = getCube;

function setup() {
    canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('sketch');
    background(0);
    stroke(255);
    strokeWeight(2);
}

const camera = new Camera(0, 0, 100, 700);

const plane = new Plane3D(camera, shapeFunction());

function draw() {
    if (keyIsPressed) plane.handleKeypress();
    plane.updateAndDraw();
}

document.getElementById('reset').addEventListener('click', () => {
    plane.setShape(shapeFunction());
});

document.getElementById('cube').addEventListener('click', () => {
    shapeFunction = getCube;
    plane.setShape(getCube());
});

document.getElementById('pyramid').addEventListener('click', () => {
    shapeFunction = getPyramid;
    plane.setShape(getPyramid());
});

document.getElementById('tetra').addEventListener('click', () => {
    shapeFunction = getTetrahedron;
    plane.setShape(getTetrahedron());
})