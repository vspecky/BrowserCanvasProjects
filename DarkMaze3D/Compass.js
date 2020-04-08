class Compass {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.dir = createVector(1, 0);
        this.d = 60;
        this.heading = 0;
        this.Npos = createVector(x, y - 36);
        this.Wpos = createVector(x - 43, y + 6);
        this.Spos = createVector(x, y + 50);
        this.Epos = createVector(x + 40, y + 6);
        this.coordsPos = createVector(x, y + 80);
    }

    draw(plyrx, plyry) {
        noFill();
        stroke(255);
        circle(this.pos.x, this.pos.y, this.d);
        line(this.pos.x, this.pos.y, this.pos.x + this.dir.x * 20, this.pos.y + this.dir.y * 20);
        textAlign(CENTER);
        text('N', this.Npos.x, this.Npos.y);
        text('W', this.Wpos.x, this.Wpos.y);
        text('S', this.Spos.x, this.Spos.y);
        text('E', this.Epos.x, this.Epos.y);
        text(`[${floor(plyrx)}, ${floor(plyry)}]`, this.coordsPos.x, this.coordsPos.y);
    }

    rotate(angle) {
        this.heading += radians(angle);
        this.dir = p5.Vector.fromAngle(this.heading);
    }
}