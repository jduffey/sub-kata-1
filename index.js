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

structuredInstructions.forEach(instrx => {
    if (instrx.direction === "forward") {
        horiztonalPos += instrx.displacement;
    } else if (instrx.direction === "down") {
        verticalPos -= instrx.displacement;
    } else if (instrx.direction === "up") {
        verticalPos += instrx.displacement;
    } else {
        throw new Error("Invalid direction; instructions were:", instrx);
    }
});

console.log("NOTICE: we are still developing this solution; vertical position is not correct because it does not take into account that UP directions putting the vehicle above sea level need to be handled.");
console.log("Horiztontal pos:", horiztonalPos);
console.log("   Vertical pos:", verticalPos);
