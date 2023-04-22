const fs = require('fs');

let contents;
try {
    contents = fs.readFileSync('./submarine_kata_input.txt', 'utf-8');
} catch (e) {
    console.error('Error when trying to read file:', e);
}

const instructions = contents.split("\n");

const structuredInstructions =
    instructions.map(e => {
        const split = e.split(" ");
        return {
            direction: split[0],
            displacement: parseInt(split[1], 10),
        };
    });

console.log(structuredInstructions);

const possibleDirections = structuredInstructions.map(e => e.direction);
console.log(new Set(possibleDirections));

let horiztonalPos = 0;
let verticalPos = 0;

const moveForward = (disp) => {
    horiztonalPos += disp;
}

const moveDown = (disp) => {
    verticalPos -= disp;
}

const moveUp = (disp) => {
    // TODO: the submarine cannot just always move up; we need to prevent it from "rising above sea level"
    // verticalPos = Math.min(0, verticalPos + disp);
    verticalPos += disp;
}

structuredInstructions.forEach(instrx => {
    if (verticalPos > 0) {
        throw new Error("Vertical position error");
    }
    if (instrx.direction === "forward") {
        moveForward(instrx.displacement);
    } else if (instrx.direction === "down") {
        moveDown(instrx.displacement);
    } else if (instrx.direction === "up") {
        moveUp(instrx.displacement);
    } else {
        throw new Error("Invalid direction; instructions were:", instrx);
    }
});

console.log("NOTICE: we are still developing this solution; vertical position is not correct because it does not take into account that UP directions putting the vehicle above sea level need to be handled.");
console.log("Horiztontal pos:", horiztonalPos);
console.log("   Vertical pos:", verticalPos);
