const Submarine = require('./submarine');

describe("Submarine", () => {
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
