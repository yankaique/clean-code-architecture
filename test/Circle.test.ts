import Circle from "../src/Circle";

test("Shouls calculate the area of circle", function() {
    const circle = new Circle(2);
    expect(circle.getArea()).toBe(12.566370614359172);
});