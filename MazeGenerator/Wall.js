class Wall {
    constructor(x1, y1, x2, y2, activated=true) {
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1
        this.y2 = y2;
        this.active = activated;
    }

    draw() {
        if (!this.active) return;
        stroke(lineColor);
        line(this.x1, this.y1, this.x2, this.y2);
    }

    deactivate() {
        this.active = false;
    }
}