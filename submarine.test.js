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
});
