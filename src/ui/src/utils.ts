// test('adds 1 + 2 to equal 3', () => {
//     expect(sum(1, 2)).toBe(3);
//   });

/**
 * Take a value between 0 and 1 and expand it to be between min and max.
 */
export const fractionToValue = (fraction: number, min: number, max: number) => {
  return fraction * (max - min) + min;
};

const test1 = () => {
  console.log(fractionToValue(0.5, 100, 200), 150);
  console.log(fractionToValue(0.5, -100, 100), 0);
  console.log(fractionToValue(0, 0, 100), 0);
};

test1();

/**
 * Take a value betwwen min and max and convert it to be between 0 and 1
 */
export const valueToFraction = (value: number, min: number, max: number) => {
  return (value - min) / (max - min);
};

const test2 = () => {
  console.log(valueToFraction(150, 100, 200), 0.5);
  console.log(valueToFraction(0, -100, 100), 0.5);
  console.log(valueToFraction(0, 0, 100), 0);
};

test2();

/**
 * Round a number to the specified number of decimal places.
 */
export const round = (value: number, decimalPlaces: number) => {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimalPlaces,
  });
};

const test3 = () => {
  console.log(round(1.0, 2), "1");
  console.log(round(1.123, 2), "1.12");
};
test3();
