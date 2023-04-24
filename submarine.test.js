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
        });
    });

    it("movement combination tests", () => {
        const sut = new Submarine();
        sut.moveDown(2);
        sut.moveForward(5);
        sut.moveForward(4);
        sut.moveDown(3);

        expect(sut.getHorizontalPosition()).toBe(9);
        expect(sut.getVerticalPosition()).toBe(-5);
    });
});
