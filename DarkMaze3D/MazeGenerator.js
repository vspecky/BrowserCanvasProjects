class MazeGenerator {
    constructor(cWidth, cHeight, cellSize) {
        this.cellSize = cellSize;
        this.gridWidth = Math.floor(cWidth / this.cellSize);
        this.gridHeight = Math.floor(cHeight / this.cellSize);
        this.reset();
    }

    reset() {
        this.cells = [];
        globalWalls = [];

        for (let y = 0; y < this.gridHeight; y++) {
            const cellRow = [];

            for (let x = 0; x < this.gridWidth; x++) {
                cellRow.push(new Cell(x * this.cellSize, y * this.cellSize, this.cellSize));
            }

            this.cells.push(cellRow);
        }

        this.stack = [this.cells[floor(random(this.gridHeight))][floor(random(this.gridWidth))]];
        this.current = this.stack[0];
        this.solveAtOnce();
    }

    draw() {
        for (const row of this.cells) {
            for (const cell of row) {
                cell.draw();
            }
        }
    }

    getCellAtMousePosition() {
        if (mouseX > canvasWidth || mouseY > canvasHeight) return null;

        const rowIndex = Math.floor(mouseY / this.cellSize);
        const colIndex = Math.floor(mouseX / this.cellSize);

        return this.cells[rowIndex][colIndex];
    }

    mouseClick() {
        if (this.solving || this.solved) return;

        if (keyIsDown(83)) {
            const newCell = this.getCellAtMousePosition();
            if (!newCell) return;
            if (this.current) {
                this.current.setStatus('unvisited');

            }
            this.current = newCell;
            this.current.setStatus('current');
            this.stack = [newCell];
        }
    }

    setSolving() {
        if (!this.current || this.solved) return;
        this.solving = true;
    }

    getNeighbors(cell) {
        const x = cell.x / this.cellSize;
        const y = cell.y / this.cellSize;

        const neighbors = [];

        for (let j = y - 1; j < y + 2; j++) {
            for (let i = x - 1; i < x + 2; i++) {
                const row = this.cells[j];
                if (!row) continue;
                const currentCell = row[i];

                if (currentCell instanceof Cell && currentCell !== cell && (j == y || i == x)) {
                    neighbors.push(currentCell);
                }
            }
        }

        return neighbors;
    }

    filterNeighborsAndReturnRandom(neighbors) {
        const filtered = neighbors.filter(elem => elem.status === 'unvisited');

        if (!filtered.length) return null;
        else return filtered[Math.floor(Math.random() * filtered.length)]
    }

    solveAtOnce() {
        while (this.stack.length) {
            this.current = this.stack.pop();
            this.current.setStatus('visited');

            const neighbor = this.filterNeighborsAndReturnRandom(this.getNeighbors(this.current));

            if (!neighbor) continue;

            this.stack.push(this.current);

            if (this.current.y - this.cellSize === neighbor.y) {
                this.current.deactivateWall('top');
                neighbor.deactivateWall('bottom');

            } else if (this.current.y + this.cellSize === neighbor.y) {
                this.current.deactivateWall('bottom');
                neighbor.deactivateWall('top');

            } else if (this.current.x + this.cellSize === neighbor.x) {
                this.current.deactivateWall('right');
                neighbor.deactivateWall('left');

            } else {
                this.current.deactivateWall('left');
                neighbor.deactivateWall('right');
            }

            neighbor.setStatus('current');
            this.current.setStatus('visited');
            this.stack.push(neighbor);
        }
    }
}

const maze = new MazeGenerator(mazeWidth, mazeHeight, cellSize);