class Cell {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.initWalls();
        this.status = 'unvisited';
    }

    initWalls() {
        this.walls = {
            top: new Wall(this.x, this.y, this.x + this.size, this.y),
            right: new Wall(this.x + this.size, this.y, this.x + this.size, this.y + this.size),
            bottom: new Wall(this.x, this.y + this.size, this.x + this.size, this.y + this.size),
            left: new Wall(this.x, this.y, this.x, this.y + this.size),
        };
    }

    deactivateWall(wall) {
        this.walls[wall].deactivate();
    }

    draw() {
        for (const wall of Object.values(this.walls)) {
            wall.draw();
        }

        noStroke();
        fill(cellColorsByStatus[this.status]);
        rect(this.x, this.y, this.size, this.size);
    }

    setStatus(status) {
        this.status = status;
    }
}