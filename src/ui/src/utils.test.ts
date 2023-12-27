import { fractionToValue, round, valueToFraction } from "./utils";

test("Can convert a fraction to a value", () => {
  expect(fractionToValue(0.5, 100, 200)).toEqual(150);
  expect(fractionToValue(0.5, -100, 100)).toEqual(0);
  expect(fractionToValue(0, 0, 100)).toEqual(0);
});

test("Can convert a value to a fraction", () => {
  expect(valueToFraction(150, 100, 200)).toEqual(0.5);
  expect(valueToFraction(0, -100, 100)).toEqual(0.5);
  expect(valueToFraction(0, 0, 100)).toEqual(0);
});

test("Can round numbers", () => {
  expect(round(1.0, 2)).toEqual("1");
  expect(round(1.123, 2)).toEqual("1.12");
});
