class Particle {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.rays = [];
        this.heading = 0;
        this.dir = createVector(1, 0);

        for (let i = -30; i <= 30; i += 0.1) {
            this.rays.push(new Ray(this.pos, radians(i)));
        }

        this.stripWidth = canvasWidth / this.rays.length
        this.compass = new Compass(1200, 60);
    }

    getHitboxAt(x, y) {
        return [
            new Wall(x - 5, y - 5, x + 5, y - 5),
            new Wall(x + 5, y - 5, x + 5, y + 5),
            new Wall(x - 5, y + 5, x + 5, y + 5),
            new Wall(x - 5, y - 5, x - 5, y + 5)
        ];
    }

    move(direction) {
        if (direction === 1) {
            this.pos.x += this.dir.x * 2;
            this.pos.y += this.dir.y * 2;

        } else if (direction === -1) {
            this.pos.x -= this.dir.x * 2;
            this.pos.y -= this.dir.y * 2;

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
        let point = null;

        for (const wall of walls) {
            const pt = ray.getIntersectionPoint(wall)
            if (pt.dist && pt.dist < minDist) {
                minDist = pt.dist;
                closestWall = wall;
                pt.dist = pt.dist * cos(ray.dir.heading() - this.heading);
                point = pt;
            }
        }

        return { wall: closestWall, ptInfo: point };
    }

    cast(walls) {
        let idx = 1;

        for (const ray of this.rays) {

            const alpha = map(Math.abs(this.rays.length / 2 - idx), -400, 400, 255, 0);
            idx++;

            const closestWall = this.getClosestWall(ray, walls);

            if (closestWall) ray.cast(closestWall, alpha);
        }
    }

    cast3D(walls) {
        let idx = 0;

        for (const ray of this.rays) {
            const alpha1 = map(Math.abs(this.rays.length / 2 - idx), -300, 300, 200, 0) //* (1 - 1 / pow(idx + 1, 2));
            //idx++;

            const { wall, ptInfo } = this.getClosestWall(ray, walls);

            if (!wall) continue;

            const alpha2 = Math.max(1 - 5 * (ptInfo.dist / canvasWidth), 0);
            const height = 40000 / ptInfo.dist;

            const yOffset = (canvasHeight - height) / 2;


            fill(200, alpha1 * alpha2);
            noStroke();
            rect(idx * this.stripWidth, yOffset, this.stripWidth + 2, height);
            idx++;

        }
    }

    update(x, y) {
        this.pos.x = x;
        this.pos.y = y;
    }

    intersects(seg1, seg2) {
        const x1 = seg1.x1;
        const y1 = seg1.y1;
        const x2 = seg1.x2;
        const y2 = seg1.y2;

        // Points of this
        const x3 = seg2.x1;
        const y3 = seg2.y1;
        const x4 = seg2.x2;
        const y4 = seg2.y2;

        const denominator = ((x1 - x2) * (y3 - y4)) - ((y1 - y2) * (x3 - x4));

        if (denominator === 0) return false;

        const tValue = (((x1 - x3) * (y3 - y4)) - ((y1 - y3) * (x3 - x4))) / denominator;
        const uValue = - ((((x1 - x2) * (y1 - y3)) - ((y1 - y2) * (x1 - x3))) / denominator);

        return tValue >= 0 && tValue <= 1 && uValue >= 0 && uValue <= 1;
    }

    keyboard() {
        if (keyIsDown(87)) {
            const nextX = this.pos.x + this.dir.x * 2;
            const nextY = this.pos.y + this.dir.y * 2;

            const hitbox = this.getHitboxAt(nextX, nextY);

            for (const line of hitbox) { 
                for (const wall of globalWalls) {
                    if (this.intersects(line, wall)) return;
                }
            }

            this.move(1);

        } else if (keyIsDown(83)) {
            const nextX = this.pos.x - this.dir.x * 2;
            const nextY = this.pos.y - this.dir.y * 2;

            const hitbox = this.getHitboxAt(nextX, nextY);

            for (const line of hitbox) { 
                for (const wall of globalWalls) {
                    if (this.intersects(line, wall)) return;
                }
            }
            this.move(-1);

        }
        
        if (keyIsDown(68)) {
            this.rotate(3);
            this.compass.rotate(3);

        } else if (keyIsDown(65)) {
            this.rotate(-3);
            this.compass.rotate(-3);
        }
    }
}