class Plane3D {
    constructor(camera, shape) {
        this.camera = camera;
        this.shape = shape;
        this.update = true;
    }

    setShape(newShape) {
        this.shape = newShape;
        this.update = true;
    }

    updateAndDraw() {
        if (!this.update) return;
        push();
        translate(canvasWidth / 2, canvasHeight / 2);
        this.update = false;

        for (const pt of this.shape.points) {
            const zDiff = this.camera.z - pt.z;
            const scale = this.camera.fl / (this.camera.fl + zDiff);
            pt.drawX = pt.x * scale;
            pt.drawY = pt.y * scale;
        }

        background(0);
        this.shape.draw();
        pop();
    }

    rotate(axis, direction) {
        if (axis === 'y') this.shape.rotateAboutY(direction);
        else if (axis === 'x') this.shape.rotateAboutX(direction);
        this.update = true;
    }

    handleKeypress() {
        if (keyIsDown(65)) this.rotate('y', 1);
        else if (keyIsDown(68)) this.rotate('y', -1);
        
        if (keyIsDown(87)) this.rotate('x', -1);
        else if (keyIsDown(83)) this.rotate('x', 1);
    }
}