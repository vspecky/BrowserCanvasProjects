let setStartBtn;
let setEndButton;
let setObstaclesCheckbox;
let solveButton;
let resetButton;

function setup() {
    createCanvas(canvasWidth, canvasHeight);

    setStartBtn = createButton("Set Start");
    setStartBtn.mousePressed(() => {
        if (isSelectingObstacles) return;

        isSelectedStart = false;
        selectingStart = true;
        if (startingCell) {
            startingCell.status = 'empty';
            startingCell = null;
        }
    });

    setEndButton = createButton("Set End");
    setEndButton.mousePressed(() => {
        if (isSelectingObstacles) return;

        isSelectedEnd = false;
        selectingEnd = true;
        if (endCell) {
            endCell.status = 'empty';
            endCell = null;
        }
    });

    setObstaclesCheckbox = createCheckbox('Setting Obstacles');
    setObstaclesCheckbox.changed(function() {
        isSelectingObstacles = this.checked();
    });

    solveButton = createButton('Solve');
    solveButton.mousePressed(() => {
        if (!isSelectedStart || !isSelectedEnd) return;
        solving = true;
    });

    resetButton = createButton('Reset');
    resetButton.mousePressed(() => {
        selectingStart = false;
        isSelectedStart = false;
        startingCell = null;

        // ENDING CELL SELECTION
        selectingEnd = false;
        isSelectedEnd = false;
        endCell = null;

        isSelectingObstacles = false;

        solving = false;

        current = null;

        grid = new CellGrid(canvasWidth, canvasHeight, cellSize);
    });

    frameRate(5);

    background(backgroundColor);
}

async function solve() {

    if (!startingCell || !endCell) return;

    let current = startingCell;

    while (current !== endCell) {
        
    }

    
}

function mouseClicked() {
    if (selectingStart) {
        const cell = getCellAtMousePosition();
        if (!cell) return;
        cell.setStatus('start');
        startingCell = cell;
        if (isSelectedEnd) {
            startingCell.gCost = 0
            startingCell.hCost = startingCell.heuristicDistanceTo(endCell);
            startingCell.fCost = startingCell.gCost + startingCell.hCost;
        }
        selectingStart = false;
        isSelectedStart = true;
        current = startingCell;
        return;
    }

    if (selectingEnd) {
        const cell = getCellAtMousePosition();
        if (!cell) return;
        cell.setStatus('end');
        endCell = cell;
        if (isSelectedStart) {
            startingCell.gCost = 0
            startingCell.hCost = startingCell.heuristicDistanceTo(endCell);
            startingCell.fCost = startingCell.gCost + startingCell.hCost;
        }
        selectingEnd = false;
        isSelectedEnd = true;
        return;
    }
}

const open = new Set();

function draw() {
    if (test) return;

    if (mouseIsPressed && isSelectingObstacles) {
        const cell = getCellAtMousePosition();
        if (cell) cell.setStatus('obstacle');
    }

    if (solving) {
        if (current !== endCell) {
            const currentNeighbors = handleNeighborCells(current, grid.getNeighbors(current));
            //test = true;

            for (const neighbor of currentNeighbors) {
                open.add(neighbor);
            }

            current.setStatus('closed');
            open.delete(current);
            current = getClosestNode([...open]);

        } else {
            current = current.parent;
            while (current !== startingCell) {
                current.setStatus('path');
                current = current.parent;
            }
            solving = false;
        }
    }

    grid.drawCells();
}