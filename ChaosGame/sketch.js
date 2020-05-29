let canvas;
let points;
let wanderer;

function setup() {
    canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('sketch');

    reset();
}

function reset() {
    background(0);
    stroke(0, 255, 0);
    points = [];
    wanderer = { x: 0, y: 0 };

    for (let i = 0; i < 3; i++) {
        const x = floor(random(canvasWidth));
        const y = floor(random(canvasHeight));
        wanderer.x += x;
        wanderer.y += y
        points.push({ x, y });
        point(x, y);
    }

    wanderer.x /= 3;
    wanderer.y /= 3;

    stroke(255);
}

function draw() {
    const towards = points[floor(random() * points.length)];

    const xDist = Math.abs((wanderer.x - towards.x) / 2);
    wanderer.x += towards.x > wanderer.x ? xDist : -xDist;

    const yDist = Math.abs((wanderer.y - towards.y) / 2);
    wanderer.y += towards.y > wanderer.y ? yDist : -yDist;

    point(wanderer.x, wanderer.y);
}

const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => reset());