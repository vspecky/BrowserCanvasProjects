class Cell {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.centreX = x + size / 2;
        this.centreY = y + size / 2;
        this.status = 'empty';
        this.parent = null;
        this.weight = 0;
    }

    setStatus(status) {
        if (this.status !== 'start' && this.status !== 'end') {
            this.status = status;
        }
    }

    draw() {
        fill(cellColorsByStatus[this.status]);
        rect(this.x, this.y, this.size, this.size);
    }

    maybeSetParent(cell) {
        if (!this.parent) {
            this.weight = cell.weight + cell.distanceTo(this);
            this.parent = cell;
            return;
        }

        const newWeight = cell.weight + cell.distanceTo(this);

        if (newWeight < this.weight) {
            this.weight = newWeight;
            this.parent = cell;
        }
    }

    distanceTo(cell) {
        const aSquare = Math.pow(this.centreX - cell.centreX, 2);
        const bSquare = Math.pow(this.centreY - cell.centreY, 2);

        return Math.sqrt(aSquare + bSquare);
    }
}