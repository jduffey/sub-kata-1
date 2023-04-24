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
        let movementOrders;
        try {
            movementOrders = this.convertFileToOrders(inputFile);

            movementOrders.forEach(({ direction, displacement }) => {
                if (direction === 'forward') {
                    this.moveForward(displacement);
                } else if (direction === 'down') {
                    this.moveDown(displacement);
                } else if (direction === 'up') {
                    this.moveUp(displacement);
                } else {
                    throw new Error("Invalid or missing direction.");
                }
            });
        } catch (e) {
            console.error('Error when attempting to execute orders.');
            throw e;
        }
    }

    calculateFinalPositionChecksum = () => this.getHorizontalPosition() * this.getDepth();
}

module.exports = Submarine;