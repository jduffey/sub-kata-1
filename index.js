const process = require('process');
const Submarine = require('./submarine');

if (!process.argv[2]) {
    const program = process.argv[0].split('/').reverse()[0];
    const script = process.argv[1].split('/').reverse()[0];
    console.log(
        "No file selected! Please provide an input file, e.g.:\n" +
        `  ${program} ${script} myMovementCommands.txt`
    );
    process.exit();
}

const submarine = new Submarine();

submarine.executeOrders(process.argv[2]);

console.log(`\n** TOP SECRET - For Fleet Command **

The submarine has reached its final destination.

  Horiztonal position: ${submarine.getHorizontalPosition()}
                Depth: ${submarine.getDepth()}
Verification Checksum: ${submarine.calculateFinalPositionChecksum()}

- Sub Commander
  ${new Date()}
`
);
