/**
 * Take a value between 0 and 1 and expand it to be between min and max.
 */
export const fractionToValue = (thing: number, min: number, max: number) => {
  const range = max - min;
  console.log("range", range);
  return thing * range - min;
};

/**
 * Take a value betwwen min and max and convert it to be between 0 and 1
 */
export const valueToFraction = (value: number, min: number, max: number) => {
  return (value + min) / (max - min);
};
