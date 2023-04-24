const fs = require('fs');

class Submarine {
    constructor() {
        this.horizontalPos = 0;
        this.verticalPos = 0;
    }

    getHorizontalPosition = () => this.horizontalPos;
    getVerticalPosition = () => this.verticalPos;
    getDepth = () => -this.verticalPos;

    moveForward = (disp) => this.horizontalPos += disp;
    moveDown = (disp) => this.verticalPos -= disp;
    moveUp = (disp) => {
        this.verticalPos = Math.min(0, this.verticalPos + disp);
    };

    convertFileToOrders = (inputFile) => {
        const rawText = fs.readFileSync(inputFile, 'utf-8');
        const linesText = rawText.split('\n');
        const movementOrders = linesText.map((line) => {
            const split = line.split(' ');
            return {
                direction: split[0],
                displacement: parseInt(split[1], 10),
            };
        });
        return movementOrders;
    }

    executeOrders = (inputFile) => {
        try {
            const movementOrders = this.convertFileToOrders(inputFile);

            movementOrders.forEach(({ direction, displacement }) => {
                (
                    {
                        'forward': this.moveForward,
                        'down': this.moveDown,
                        'up': this.moveUp,
                    }[direction]
                )(displacement);
            });
        } catch (e) {
            console.error('Error when attempting to execute orders.');
            throw e;
        }
    }

    calculateFinalPositionChecksum = () => this.getHorizontalPosition() * this.getDepth();
}

module.exports = Submarine;