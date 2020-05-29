/**
 * Represents a single Cell on the board.
 *
 * @class Cell
 */
class Cell {
    /**
     * Creates an instance of Cell.
     * @param {number} x X position of the cell.
     * @param {number} y Y position of the cell.
     * @param {number} size Size of the cell.
     * @memberof Cell
     */
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.currentlyAlive = false;
        this.aliveNext = false;
    }

    /**
     * Advances the state of the cell and draws it to the board.
     *
     * @memberof Cell
     */
    flipNDraw() {
        this.currentlyAlive = this.aliveNext;
        fill(this.currentlyAlive ? 255 : 0);
        stroke(100);
        rect(this.x, this.y, this.size, this.size);
    }

    /**
     * Sets the current state as well as the future state of
     * the cell as alive.
     *
     * @memberof Cell
     */
    setAlive() {
        this.currentlyAlive = true;
        this.aliveNext = true;
    }

    /**
     * Sets the current state as well as the future state of the
     * cell as dead.
     *
     * @memberof Cell
     */
    setDead() {
        this.currentlyAlive = false;
        this.aliveNext = false;
    }

    /**
     * Sets the next state of the cell as alive.
     *
     * @memberof Cell
     */
    setNextAlive() {
        this.aliveNext = true;
    }

    /**
     * Sets the next state of the cell as dead.
     *
     * @memberof Cell
     */
    setNextDead() {
        this.aliveNext = false;
    }
}