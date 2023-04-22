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
