class Particle {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.rays = [];
        this.heading = 0;
        this.dir = createVector(1, 0);

        for (let i = -30; i <= 30; i += 0.1) {
            this.rays.push(new Ray(this.pos, radians(i)));
        }

        this.stripWidth = canvasWidth / this.rays.length; 
    }

    move(direction) {
        if (direction === 1) {
            this.pos.x += this.dir.x * 3;
            this.pos.y += this.dir.y * 3;

        } else if (direction === -1) {
            this.pos.x -= this.dir.x * 3;
            this.pos.y -= this.dir.y * 3;

        }
    } 

    rotate(angle) {
        this.heading += radians(angle);
        this.dir = p5.Vector.fromAngle(this.heading);

        for (const ray of this.rays) ray.rotateByAngle(radians(angle));
    }

    getClosestWall(ray, walls) {
        let minDist = Infinity;
        let closestWall = null;
        let closestPt = null;

        for (const wall of walls) {
            const pt = ray.getIntersectionPoint(wall)
            if (pt.dist && pt.dist < minDist) {
                minDist = pt.dist;
                closestWall = wall;
                pt.dist = pt.dist * cos(ray.dir.heading() - this.heading);
                closestPt = pt;
            }
        }

        return { wall: closestWall, ptInfo: closestPt };
    }

    cast(walls) {
        let idx = 1;

        for (const ray of this.rays) {

            const alpha = map(Math.abs(this.rays.length / 2 - idx), -400, 400, 255, 0);
            idx++;

            const { wall, ptInfo } = this.getClosestWall(ray, walls);

            if (!wall) continue;

            if (wall) ray.cast(ptInfo, alpha);
        }
    }

    cast3D(walls) {
        let idx = 0;

        for (const ray of this.rays) {
            const alpha1 = map(Math.abs(this.rays.length / 2 - idx), -300, 300, 200, 0) * (1 - 1 / pow(idx + 1, 2));
            //idx++;

            const { wall, ptInfo } = this.getClosestWall(ray, walls);

            if (!wall) continue;

            const alpha2 = Math.max(1 - 1.5 * (ptInfo.dist / canvasWidth), 0);
            const height = 50000 / ptInfo.dist;

            const yOffset = (canvasHeight - height) / 2;


            fill(200, alpha1 * alpha2);
            noStroke();
            rect(idx * this.stripWidth, yOffset, this.stripWidth + 2, height);
            idx++;

        }
    }

    drawFilter() {
        fill(90, 50);

        rect(0, 0, canvasWidth, canvasHeight);
    }

    update(x, y) {
        this.pos.x = x;
        this.pos.y = y;
    }

    keyboard() {
        if (keyIsDown(87)) {
            this.move(1);

        } else if (keyIsDown(83)) {
            this.move(-1);

        }
        
        if (keyIsDown(68)) {
            this.rotate(2.5);

        } else if (keyIsDown(65)) {
            this.rotate(-2.5);
        }
    }
}