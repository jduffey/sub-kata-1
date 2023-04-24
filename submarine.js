class Submarine {
    constructor() {
        this.horizontalPos = 0;
        this.verticalPos = 0;
    }

    getHorizontalPosition = () => this.horizontalPos;
    getVerticalPosition = () => this.verticalPos;
}

module.exports = Submarine;