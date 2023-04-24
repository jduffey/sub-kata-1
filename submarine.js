const fs = require('fs');

class Submarine {
    constructor() {
        this.horizontalPos = 0;
        this.verticalPos = 0;
    }

    getHorizontalPosition = () => this.horizontalPos;
    getVerticalPosition = () => this.verticalPos;

    moveForward = (disp) => this.horizontalPos += disp;
    moveDown = (disp) => this.verticalPos -= disp;
    moveUp = (disp) => {
        this.verticalPos = Math.min(0, this.verticalPos + disp);
    };

    executeOrders = (inputFile) => {
        try {
            const rawText = fs.readFileSync(inputFile, 'utf-8');
            const linesText = rawText.split('\n');
            const movementOrders = linesText.map((line) => {
                const split = line.split(' ');
                return {
                    direction: split[0],
                    displacement: parseInt(split[1], 10),
                };
            });

            movementOrders.forEach((order) => {
                if (order.direction === 'forward') {
                    this.moveForward(order.displacement);
                } else if (order.direction === 'down') {
                    this.moveDown(order.displacement);
                } else if (order.direction === 'up') {
                    this.moveUp(order.displacement);
                } else {
                    throw new Error("Invalid or missing direction.");
                }
            });

        } catch (e) {
            console.error('Error when attempting to execute orders:', e);
        }
    }
}

module.exports = Submarine;