class Submarine {
    constructor() {
        this.horizontalPos = 0;
        this.verticalPos = 0;
    }

    getHorizontalPosition = () => this.horizontalPos;
    getVerticalPosition = () => this.verticalPos;

    moveForward = (disp) => this.horizontalPos += disp;
    moveDown = (disp) => this.verticalPos -= disp;
    moveUp = (disp) => this.verticalPos += disp;
}

module.exports = Submarine;