class Dijkstra {
    constructor(cWidth, cHeight, cellSize) {
        this.cellSize = cellSize;
        this.gridWidth = Math.floor(cWidth / cellSize);
        this.gridHeight = Math.floor(cHeight / cellSize);

        this.reset();
    }

    reset() {
        this.cells = [];

        for (let y = 0; y < this.gridHeight; y++) {
            const cellRow = [];

            for (let x = 0; x < this.gridWidth; x++) {
                cellRow.push(new Cell(x * cellSize, y * cellSize, cellSize));
            }

            this.cells.push(cellRow);
        }

        this.queue = [];
        this.startNode = null;
        this.endNode = null;
        this.solving = false;
        this.solved = false;
        this.current = null;
    }

    getCellAtMousePos() {
        if (mouseX > canvasWidth || mouseY > canvasHeight) return null;

        const y = Math.floor(mouseY / this.cellSize);
        const x = Math.floor(mouseX / this.cellSize);

        return this.cells[y][x];
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

                if (currentCell instanceof Cell && currentCell !== cell) {
                    neighbors.push(currentCell);
                }
            }
        }

        return neighbors;
    }

    filterNeighbors(neighbors) {
        return neighbors.filter(elem => elem.status === 'empty' || elem.status === 'end');
    }

    mouseClick() {
        if (this.solving) return;

        if (keyIsDown(83)) {
            // Set start node if pressing the S key;
            const newStart = this.getCellAtMousePos();
            if (!newStart) return;
            if (this.startNode) {
                this.startNode.status = 'empty';
                this.queue = [];
            }
            newStart.status = 'start';
            this.startNode = newStart;
            this.queue.push(this.startNode);

        } else if (keyIsDown(69)) {
            // Set end node if pressing the E key;
            const newEnd = this.getCellAtMousePos();
            if (!newEnd) return;
            if (this.endNode) this.endNode.status = 'empty';
            newEnd.status = 'end';
            this.endNode = newEnd;

        } else if (keyIsDown(81)) {
            // Set obstacles if pressing the Q key;
            const obstacle = this.getCellAtMousePos();
            if (!obstacle) return;
            obstacle.setStatus('obstacle');
        }
    }

    draw() {
        for (const row of this.cells) {
            for (const cell of row) {
                cell.draw();
            }
        }
    }

    setSolving() {
        if (!this.startNode || !this.endNode || !this.queue.length || this.solving || this.solved) return;
        this.solving = true
    }

    solveStep() {
        if (!this.solving) return;

        this.current = this.queue.shift();
        if (this.current === this.endNode) {
            this.solved = true;
            this.solving = false;
            return this.tracePath();
        }

        this.current.setStatus('closed');

        const neighbors = this.filterNeighbors(this.getNeighbors(this.current));
        for (const neighbor of neighbors) {
            neighbor.maybeSetParent(this.current);
            
            if (!this.queue.includes(neighbor)) {
                this.queue.push(neighbor);
            }
        }
    }

    tracePath() {
        let node = this.endNode;

        while (node !== this.startNode) {
            node.setStatus('path');
            node = node.parent;
        }
    }
}

const dijkstra = new Dijkstra(canvasWidth, canvasHeight, cellSize);