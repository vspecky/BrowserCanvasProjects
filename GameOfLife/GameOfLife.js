/**
 * Main Game of Life class.
 *
 * @class GameOfLife
 */
class GameOfLife {
    /**
     * Creates an instance of GameOfLife.
     * @param {number} gridWidth Width of the grid in pixels.
     * @param {number} gridHeight Height of the grid in pixels.
     * @param {number} cellSize Cell size in pixels.
     * @memberof GameOfLife
     */
    constructor(gridWidth, gridHeight, cellSize) {
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
        this.cellSize = cellSize;
        this.executing = false;
    
        this.width = Math.floor(this.gridWidth / this.cellSize);
        this.height = Math.floor(this.gridHeight / this.cellSize);
    
        this.reset();
    }
  
    /**
     * Resets the board.
     *
     * @memberof GameOfLife
     */
    reset() {
        this.executing = false;
        this.cells = [];
    
        for (let y = 0; y < this.height; y++) {
            const cellRow = [];
    
            for (let x = 0; x < this.width; x++) {
            const cell = new Cell(x * this.cellSize, y * this.cellSize, this.cellSize);
            cellRow.push(cell);
            }
    
            this.cells.push(cellRow);
        }
    }
  
    /**
     * Gets the cell at the mouse position.
     *
     * @returns Cell at mouse position if mouse is on the board, else null.
     * @memberof GameOfLife
     */
    getCellAtMousePos() {
        if (mouseX > this.gridWidth || mouseX < 0 || mouseY > this.gridHeight || mouseY < 0) return null;
    
        const rowIndex = Math.floor(mouseY / this.cellSize);
        const colIndex = Math.floor(mouseX / this.cellSize);
    
        return this.cells[rowIndex][colIndex];
    }
  
    /**
     * Function that takes in a cell and calculates the amount of live neighbors
     * the cell currently has.
     *
     * @param {Cell} cell The cell whose live neighbors need to be found.
     * @returns Number of live neighbors of the cell.
     * @memberof GameOfLife
     */
    getLiveNeighbors(cell) {
        const xpos = cell.x / cell.size;
        const ypos = cell.y / cell.size;
    
        let neighbors = 0;
    
        for (let y = ypos - 1; y < ypos + 2; y++) {
            for (let x = xpos - 1; x < xpos + 2; x++) {
                const row = this.cells[y];
                if (!row) break;
                const neighborCell = row[x];
        
                if (neighborCell instanceof Cell && neighborCell !== cell && neighborCell.currentlyAlive) {
                    neighbors++;
                }
            }
        }
    
        return neighbors;
    }
  
    /**
     * Handles mouse clicks by the user.
     *
     * @memberof GameOfLife
     */
    handleClick() {
        if (this.executing || !mouseIsPressed) return;
    
        const cell = this.getCellAtMousePos();
        if (!cell) return;
    
        if (keyIsDown(69)) cell.setDead();
        else cell.setAlive();
    }
  
    startExecuting() {
        this.executing = true;
    }
  
    step() {
        if (!this.executing) return;
    
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const cell = this.cells[y][x];
                const neighbors = this.getLiveNeighbors(cell);
        
                if ([2, 3].includes(neighbors) && cell.currentlyAlive) cell.setNextAlive();
                else if (neighbors === 3 && !cell.currentlyAlive) cell.setNextAlive();
                else cell.setNextDead();
            }
        }
    }
  
    draw() {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                this.cells[y][x].flipNDraw();
            }
        }
    }
  }