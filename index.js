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
            displacement: split[1],
        };
    });

console.log(structuredInstructions);

// Pausing to make a WIP commit here -- at this point I realized that there is not a "back" direction
// and wanted to verify that :-)
const possibleDirections = structuredInstructions.map(e => e.direction);
console.log(new Set(possibleDirections));

let horiztonalPos = 0;
let verticalPos = 0;

// structuredInstructions.forEach(e => {
//     if (e.direction === )
// })