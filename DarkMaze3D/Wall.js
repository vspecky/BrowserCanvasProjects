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

    static joinWalls(walls) {
        const joinedWalls = [];

        for (let sIdx = 0; sIdx < 4; sIdx++) {
            let buffer = [];

            for (let i = sIdx; i < walls.length; i += 4) {
                const wall = walls[i];
                const bWall = buffer.length ? buffer[buffer.length - 1] : {};

                if (wall.active && wall.x1 === bWall.x2 && wall.y1 === bWall.y2) {
                    buffer.push(wall);

                } else if (buffer.length) {
                    const wallA = buffer[0];
                    const wallB = buffer[buffer.length - 1];

                    joinedWalls.push(new Wall(wallA.x1, wallA.y1, wallB.x2, wallB.y2));
                    buffer = [];
                }
            }
        }

        return joinedWalls;
    }
}