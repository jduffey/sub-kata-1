const Submarine = require('./submarine');

describe("Submarine", () => {
    let sut;
    beforeEach(() => {
        sut = new Submarine();
    });

    describe("initialization tests", () => {
        it("starts with horizontal position as 0", () => {
            const actual = sut.getHorizontalPosition();

            expect(actual).toBe(0);
        });

        it("starts with vertical position as 0", () => {
            const actual = sut.getVerticalPosition();

            expect(actual).toBe(0);
        });

        it("starts with depth as 0", () => {
            const actual = sut.getDepth();

            // h/t https://stackoverflow.com/questions/48405174/how-to-make-jest-not-distinguish-between-negative-zero-and-positive-zero
            expect(actual === -0).toBe(true);
        })
    });

    describe("horiztonal movement tests", () => {
        it("increases horiztonal position when given forward command", () => {
            sut.moveForward(5);

            const actual = sut.getHorizontalPosition();

            expect(actual).toBe(5);
        });

        it("can accept multiple successive commands", () => {
            sut.moveForward(3);
            sut.moveForward(4);
            sut.moveForward(5);

            const actual = sut.getHorizontalPosition();

            expect(actual).toBe(12);
        });
    });

    describe("vertical movement tests", () => {
        describe("move down command", () => {
            it("decreases vertical position", () => {
                sut.moveDown(8);

                const actual = sut.getVerticalPosition();

                expect(actual).toBe(-8);
            });

            it("can accept multiple successive commands", () => {
                sut.moveDown(1);
                sut.moveDown(2);
                sut.moveDown(10);

                const actual = sut.getVerticalPosition();

                expect(actual).toBe(-13);
            });
        });

        describe("move up command", () => {
            it("increases vertical position", () => {
                sut.moveDown(10);
                sut.moveUp(3);

                const actual = sut.getVerticalPosition();

                expect(actual).toBe(-7);
            });

            describe("cannot result in a positive vertical position (i.e. cannot rise above sea level)", () => {
                it("from zero, cannot increase vertical position", () => {
                    sut.moveUp(4);

                    const actual = sut.getVerticalPosition();

                    expect(actual).toBe(0);
                });

                it("from a negative vertical position, move up command will at most place the submarine at vertical position of 0", () => {
                    sut.moveDown(3);
                    sut.moveUp(6);

                    const actual = sut.getVerticalPosition();

                    expect(actual).toBe(0);
                });
            });
        });
    });

    describe("movement combination tests", () => {
        it("example from kata", () => {
            sut.moveForward(5);
            sut.moveDown(5);
            sut.moveForward(8);
            sut.moveUp(3);
            sut.moveDown(8);
            sut.moveForward(2);

            expect(sut.getHorizontalPosition()).toBe(15);
            expect(sut.getVerticalPosition()).toBe(-10);
        });

        it("excessive and useless move up commands", () => {
            const expectedFinalDepth = 13;

            sut.moveUp(1);
            sut.moveUp(2);
            sut.moveDown(5)
            sut.moveUp(5);
            sut.moveDown(3);
            sut.moveUp(1);
            sut.moveUp(1);
            sut.moveUp(9);
            sut.moveDown(expectedFinalDepth);

            const actual = sut.getVerticalPosition();

            expect(actual).toBe(-expectedFinalDepth);
        });
    });

    describe("executeOrders(): text file ingestion and execution", () => {
        it("kata example file", () => {
            const testFile = 'testFiles/submarine_kata_input.txt';

            sut.executeOrders(testFile);

            expect(sut.getHorizontalPosition()).toBe(2052);
            expect(sut.getVerticalPosition()).toBe(-1032);
        });
    });

    describe("calculateFinalPositionChecksum(): returns product of horizontal position and depth", () => {
        it("is 0 when submarine has not moved", () => {
            const actual = sut.calculateFinalPositionChecksum();

            expect(actual === -0).toBe(true);
        });

        it("kata example", () => {
            sut.moveForward(5);
            sut.moveDown(5);
            sut.moveForward(8);
            sut.moveUp(3);
            sut.moveDown(8);
            sut.moveForward(2);

            const actual = sut.calculateFinalPositionChecksum();

            expect(actual).toBe(150);
        });

        it("using kata .txt file", () => {
            const testFile = 'testFiles/submarine_kata_input.txt';
            sut.executeOrders(testFile);

            const actual = sut.calculateFinalPositionChecksum();

            // To be clear, I did not manually calculate this result and am trusting my code :-)
            expect(actual).toBe(2117664);
        });
    });
});
