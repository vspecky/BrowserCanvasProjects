let canvas;
let spr = new Supershapes(canvasWidth, canvasHeight);

function setup() {
    canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('sketch');
    resetSupershape();
}

function resetSupershape() {
    background(0);
    spr.draw();
}