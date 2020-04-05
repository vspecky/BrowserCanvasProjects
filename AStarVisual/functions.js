let grid = new CellGrid(canvasWidth, canvasHeight, cellSize);

const sleep = async time => new Promise(res => setTimeout(res, time));

function getCellAtMousePosition() {
    if (mouseX > canvasWidth || mouseY > canvasHeight) return null;

    const rowIndex = Math.floor(mouseY / cellSize);
    const columnIndex = Math.floor(mouseX / cellSize) ;

    return grid.cells[rowIndex][columnIndex];
}

function getClosestNode(openNodes) {

    let cell = openNodes.sort((a, b) => a.fCost - b.fCost);
    cell = cell.filter(elem => elem.fCost === cell[0].fCost);

    if (cell.length > 1) {
        cell = cell.sort((a, b) => a.hCost - b.hCost);
    }

    return cell[0];
}

function handleNeighborCells(current, neighbors) {
    let cells = neighbors.filter(elem => elem.status !== 'obstacle' && elem.status !== 'start' && elem.status !== 'closed');

    for (const cell of cells) {
        cell.maybeSetParent(current);
        if (cell.status === 'empty') cell.setStatus('open');
    }

    //cells = cells.filter(elem => elem.status !== 'closed');

    return cells;
}