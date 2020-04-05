const cellColorsByStatus = {
    empty: backgroundColor,
    start: 'rgb(0, 255, 0)',
    end: "rgb(255, 0, 255)",
    open: "rgb(125, 125, 255)",
    closed: "rgb(255, 0, 0)",
    obstacle: "rgb(0, 0, 0)",
    path: "rgb(255, 255, 0)"
};

const linearDistance = cellSize;
const diagonalDistance = Math.sqrt(2) * linearDistance;

class Cell {
    constructor(x, y, size) {
        this.x = x
        this.y = y
        this.size = size
        this.centreX = x + size / 2;
        this.centreY = y + size / 2;
        this.fCost = null;
        this.gCost = null;
        this.hCost = null;
        this.parent = null;
        this.status = 'empty'
    }

    draw() {
        fill(cellColorsByStatus[this.status]);
        rect(this.x, this.y, this.size, this.size);
    }

    distanceTo(cell) {
        return Math.sqrt(Math.pow(this.centreX - cell.centreX, 2) + Math.pow(this.centreY - cell.centreY, 2));
    }

    manhattanDistanceTo(cell) {
        return Math.abs(this.centreX - cell.centreX) + Math.abs(this.centreY - cell.centreY);
    }

    heuristicDistanceTo(cell) {
        let xUnits = Math.abs(this.centreX - cell.centreX) / linearDistance;
        let yUnits = Math.abs(this.centreY - cell.centreY) / linearDistance;

        if (xUnits > yUnits) {
            let temp = yUnits;
            yUnits = xUnits;
            xUnits = temp;
        }

        yUnits = yUnits - xUnits;

        return xUnits * diagonalDistance + yUnits * linearDistance;
    }

    setStatus(status) {
        if (this.status !== 'start' && this.status !== 'end') {
            this.status = status;
        }
    }

    maybeSetParent(cell, endCell) {
        if (!this.parent) {
            this.hCost = this.heuristicDistanceTo(endCell);
            this.gCost = this.heuristicDistanceTo(cell) + cell.gCost;
            this.fCost = this.hCost + this.gCost;
            this.parent = cell;
            return;
        }

        const newGCost = this.heuristicDistanceTo(cell) + cell.gCost;

        if (newGCost <= this.gCost) {
            this.gCost = newGCost;
            this.fCost = this.hCost + this.fCost;
            this.parent = cell;
        }
    }
}