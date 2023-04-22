const fs = require('fs');

let contents;
try {
    contents = fs.readFileSync('./submarine_kata_input.txt', 'utf-8');
} catch (e) {
    console.error('Error when trying to read file:', e);
}

const instructions = contents.split("\n");

console.log(instructions);

const structuredInstructions =
    instructions.map(e => {
        return e.split(" ");
    });

console.log(structuredInstructions);