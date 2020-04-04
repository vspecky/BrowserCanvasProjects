const cellColorsByStatus = {
    empty: backgroundColor,
    start: 'rgb(0, 255, 0)',
    end: "rgb(255, 0, 255)",
    open: "rgb(125, 125, 255)",
    closed: "rgb(255, 0, 0)",
    obstacle: "rgb(0, 0, 0)",
    path: "rgb(255, 255, 0)"
};

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
        this.color = backgroundColor;
    }

    draw() {
        fill(cellColorsByStatus[this.status]);
        rect(this.x, this.y, this.size, this.size);
    }

    setColor(color) {
        this.color = color
    }

    distanceTo(cell) {
        return Math.sqrt(Math.pow(this.centreX - cell.centreX, 2) + Math.pow(this.centreY - cell.centreY, 2));
    }

    manhattanDistanceTo(cell) {
        return Math.abs(this.centreX - cell.centreX) + Math.abs(this.centreY - cell.centreY);
    }

    setStatus(status) {
        if (this.status !== 'start' && this.status !== 'end') {
            this.status = status;
        }
    }

    maybeSetParent(cell) {
        const flr = Math.floor
        if (!this.parent) {
            this.hCost = flr(this.manhattanDistanceTo(endCell));
            this.gCost = flr(this.distanceTo(cell) + cell.gCost);
            this.fCost = this.hCost + this.gCost;
            this.parent = cell;
            return;
        }

        const newGCost = Math.floor(this.distanceTo(cell) + cell.gCost);

        if (newGCost <= this.gCost) {
            this.gCost = newGCost;
            this.fCost = this.hCost + this.fCost;
            this.parent = cell;
        }
    }
}

class CellGrid {
    constructor(cWidth, cHeight, size) {
        this.cellSize = size;
        const totalCellsX = Math.floor(cWidth / size);
        const totalCellsY = Math.floor(cHeight / size);

        this.cells = []

        for (let y = 0; y < totalCellsY; y++) {
            const cellRow = [];

            for (let x = 0; x < totalCellsX; x++) {
                const cell = new Cell(x * size, y * size, size);
                cellRow.push(cell);
            }

            this.cells.push(cellRow);
        }
    }

    drawCells() {
        noFill();
        stroke(0);
        for (const cellRow of this.cells) {
            for (const cell of cellRow) {
                cell.draw();
            }
        }
    }

    distance(cell1, cell2) {
        return cell1.distanceTo(cell2);
    }

    getNeighbors(cell) {
        const i = cell.x / this.cellSize;
        const j = cell.y / this.cellSize;

        const res = [];


        for (let y = j - 1; y < j + 2; y++) {
            for (let x = i - 1; x < i + 2; x++) {
                const row = this.cells[y];
                if (!row) continue;
                const currentCell = row[x];

                if (currentCell instanceof Cell && currentCell !== cell && (y == j || x == i)) {
                    res.push(currentCell);
                }
            }
        }

        return res;
    }
}