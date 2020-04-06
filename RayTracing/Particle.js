class Particle {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.rays = [];
        this.heading = 0;
        this.dir = createVector(1, 0);

        for (let i = -40; i <= 40; i += 0.1) {
            this.rays.push(new Ray(this.pos, radians(i)));
        }
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
        this.heading += angle;
        this.dir = p5.Vector.fromAngle(radians(this.heading));

        for (const ray of this.rays) ray.rotateByAngle(radians(angle));
    }

    cast(walls) {
        for (const ray of this.rays) {
            let minDist = Infinity;
            let closestWall = null;

            for (const wall of walls) {
                const pt = ray.getIntersectionPoint(wall)
                if (pt.dist && pt.dist < minDist) {
                    minDist = pt.dist;
                    closestWall = wall;
                }
            }

            if (closestWall) ray.cast(closestWall);
        }
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