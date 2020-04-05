class AStar {
    constructor(cWidth, cHeight, cellSize) {
        this.gridWidth = Math.floor(cWidth / cellSize);
        this.gridHeight = Math.floor(cHeight / cellSize);
        this.cellSize = cellSize;
        this.reset();
    }

    reset() {
        this.cells = []

        for (let y = 0; y < this.gridHeight; y++) {
            const cellRow = [];

            for (let x = 0; x < this.gridWidth; x++) {
                const cell = new Cell(x * this.cellSize, y * this.cellSize, this.cellSize);
                cellRow.push(cell);
            }

            this.cells.push(cellRow);
        }

        this.open = new Set();
        this.startNode = null;
        this.endNode = null;
        this.solving = false;
        this.solved = false;
        this.current = null;
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

        const rowIndex = Math.floor(mouseY / cellSize);
        const columnIndex = Math.floor(mouseX / cellSize) ;

        return this.cells[rowIndex][columnIndex];
    }

    mouseClick() {
        if (this.solving) return;

        if (keyIsDown(83)) {
            // Set start node if pressing the S key;
            const newStart = this.getCellAtMousePosition();
            if (!newStart) return;
            if (this.startNode) {
                this.startNode.status = 'empty';
                this.open.delete(this.startNode);
            }
            newStart.status = 'start';
            if (this.endNode) {
                newStart.gCost = 0
                newStart.hCost = newStart.heuristicDistanceTo(this.endNode);
                newStart.fCost = newStart.hCost;
            }

            this.startNode = newStart;
            this.current = this.startNode;
            this.open.add(this.startNode);

        } else if (keyIsDown(69)) {
            // Set end node if pressing the E key;
            const newEnd = this.getCellAtMousePosition();
            if (!newEnd) return;
            if (this.endNode) this.endNode.status = 'empty';
            newEnd.status = 'end';
            if (this.startNode) {
                this.startNode.gCost = 0
                this.startNode.hCost = this.startNode.heuristicDistanceTo(newEnd);
                this.startNode.fCost = this.startNode.hCost;
            }

            this.endNode = newEnd;

        } else if (keyIsDown(81)) {
            // Set obstacles if pressing the Q key;
            const obstacle = this.getCellAtMousePosition();
            if (!obstacle) return;
            obstacle.setStatus('obstacle');
        }
    }

    setSolving() {
        if (!this.startNode || !this.endNode || this.solving || this.solved) return;
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

                if (currentCell instanceof Cell && currentCell !== cell) {
                    neighbors.push(currentCell);
                }
            }
        }

        return neighbors;
    }

    filterNeighbors(neighbors) {
        return neighbors.filter(elem => elem.status !== 'obstacle' && elem.status !== 'start' && elem.status !== 'closed');
    }

    getClosestNode() {
        const openNodes = [...this.open];

        let cell = openNodes.sort((a, b) => a.fCost - b.fCost);
        cell = cell.filter(elem => elem.fCost === cell[0].fCost);

        if (cell.length > 1) {
            cell = cell.sort((a, b) => a.hCost - b.hCost);
        }

        return cell[0];
    }

    solveStep() {
        if (!this.solving) return;

        if (this.current === this.endNode) {
            this.solving = false;
            this.solved = true;
            this.tracePath();
            return;
        }

        const neighbors = this.filterNeighbors(this.getNeighbors(this.current));

        for (const node of neighbors) {
            node.maybeSetParent(this.current, this.endNode);
            node.setStatus('open');
            this.open.add(node);
        }

        this.current.setStatus('closed');
        this.open.delete(this.current);
        this.current = this.getClosestNode();
    }

    tracePath() {
        let node = this.current;

        while (node !== this.startNode) {
            node.setStatus('path');
            node = node.parent;
        }
    }
}

const aStar = new AStar(canvasWidth, canvasHeight, cellSize);