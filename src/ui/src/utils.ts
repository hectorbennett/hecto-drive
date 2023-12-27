/**
 * Take a value between 0 and 1 and expand it to be between min and max.
 */
export const fractionToValue = (fraction: number, min: number, max: number) => {
  return fraction * (max - min) + min;
};

/**
 * Take a value betwwen min and max and convert it to be between 0 and 1
 */
export const valueToFraction = (value: number, min: number, max: number) => {
  return (value - min) / (max - min);
};

/**
 * Round a number to the specified number of decimal places.
 */
export const round = (value: number, decimalPlaces: number) => {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimalPlaces,
  });
};
