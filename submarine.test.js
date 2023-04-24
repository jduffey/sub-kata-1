const Submarine = require('./submarine');

describe("Submarine", () => {
    describe("initialization tests", () => {
        it("starts with horizontal position as 0", () => {
            const sut = new Submarine();

            const actual = sut.getHorizontalPosition();

            expect(actual).toBe(0);
        });

        it("starts with vertical position as 0", () => {
            const sut = new Submarine();

            const actual = sut.getVerticalPosition();

            expect(actual).toBe(0);
        });
    });

    describe("horiztonal movement tests", () => {
        it("increases horiztonal position when given forward command", () => {
            const sut = new Submarine();
            sut.moveForward(5);

            const actual = sut.getHorizontalPosition();

            expect(actual).toBe(5);
        });

        it("can accept multiple successive commands", () => {
            const sut = new Submarine();
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
                const sut = new Submarine();
                sut.moveDown(8);

                const actual = sut.getVerticalPosition();

                expect(actual).toBe(-8);
            });

            it("can accept multiple successive commands", () => {
                const sut = new Submarine();
                sut.moveDown(1);
                sut.moveDown(2);
                sut.moveDown(10);

                const actual = sut.getVerticalPosition();

                expect(actual).toBe(-13);
            });
        });

        describe("move up command", () => {
            it("increases vertical position", () => {
                const sut = new Submarine();
                sut.moveDown(10);
                sut.moveUp(3);

                const actual = sut.getVerticalPosition();

                expect(actual).toBe(-7);
            });

            describe("cannot result in a positive vertical position (i.e. cannot rise above sea level)", () => {
                it("from zero, cannot increase vertical position", () => {
                    const sut = new Submarine();
                    sut.moveUp(4);

                    const actual = sut.getVerticalPosition();

                    expect(actual).toBe(0);
                });

                it("from a negative vertical position, move up command will at most place the submarine at vertical position of 0", () => {
                    const sut = new Submarine();
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
            const sut = new Submarine();
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

            const sut = new Submarine();
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
            const sut = new Submarine();

            sut.executeOrders(testFile);

            expect(sut.getHorizontalPosition()).toBe(2052);
            expect(sut.getVerticalPosition()).toBe(-1032);
        });
    });
});
