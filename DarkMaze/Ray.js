class Ray {
    constructor(pos, angle) {
        this.pos = pos
        this.angle = angle;
        this.dir = p5.Vector.fromAngle(angle);
    }

    rotateByAngle(angle) {
        this.angle += angle;
        this.dir = p5.Vector.fromAngle(this.angle);
    }

    draw() {
        push();
        translate(this.pos.x, this.pos.y);
        stroke(255);
        line(0, 0, this.dir.x * 10, this.dir.y * 10);
        pop();
    }

    getIntersectionPoint(wall) {
        const x1 = wall.x1;
        const y1 = wall.y1;
        const x2 = wall.x2;
        const y2 = wall.y2;

        // Points of this
        const x3 = this.pos.x;
        const y3 = this.pos.y;
        const x4 = x3 + this.dir.x;
        const y4 = y3 + this.dir.y;

        const denominator = ((x1 - x2) * (y3 - y4)) - ((y1 - y2) * (x3 - x4));

        if (denominator === 0) return { pt: null, dist: null };

        const tValue = (((x1 - x3) * (y3 - y4)) - ((y1 - y3) * (x3 - x4))) / denominator;
        const uValue = - ((((x1 - x2) * (y1 - y3)) - ((y1 - y2) * (x1 - x3))) / denominator);

        if (tValue > 0 && tValue < 1 && uValue > 0) {
            const pt = createVector();
            pt.x = x1 + tValue * (x2 - x1);
            pt.y = y1 + tValue * (y2 - y1);

            return { pt: pt, dist: uValue };
        }

        return { pt: null, dist: null };
    }

    cast(wall, alpha) {
        //console.log(closenessFactor);
        const intersect = this.getIntersectionPoint(wall);

        if (!intersect.pt) return;

        stroke(255, alpha * 0.1);
        line(this.pos.x, this.pos.y, intersect.pt.x, intersect.pt.y);
        noStroke();
        fill(255, 80);
        circle(intersect.pt.x, intersect.pt.y, 2.8);
        
    }

    gaze(x, y) {
        this.dir.x = x - this.pos.x;
        this.dir.y = y - this.pos.y;
        this.dir.normalize();
    }
}