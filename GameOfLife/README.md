# John Conway's Game of Life
This is the famous Game of Life cellular automaton created by John Conway. It's so fascinating to watch this in action.

## Rules of the Game
- Every cell has 8 neighbors except cells at the edges (The edge cells are also supposed to have 8 neighbors since the grid is supposed to be infinite but this is just a condensed down version of the grid).
- White cells are alive, black cells are dead.
- At any step 't', a live cell with either 2 or 3 live neighbors will still be a live cell at step 't + 1'.
- At any step 't', if a dead cell has exactly 3 live neigbors, it will become alive as if by reproduction at step 't + 1'.
- Any other live cells die in the next generation, and dead cells stay dead.

## Instructions
- Drag your mouse around on the board to set live cells.
- Hold `E` while dragging to erase live cells.
- Click the `Start` button or press `S` to start the Game of Life.
- Click the `Reset` button or press `R` to reset the grid.
- Click the `Inc Speed` button or press `UP Arrow` to increase the speed.
- Click the `Dec Speed` button or press `DOWN Arrow` to increase the speed.