import precisionRound from './precisionRound';

/**
 * superParseFloat will coerce any input into a number rounded to a specific precision (default 2 dp)
 * If the input cannot be resolved to a number then the function returns zero
 * e.g. superParseFloat("I have 12,345.6789 potatoes") = 12345.68
 *
 * @param {any} numberish The value to convert into a number
 * @param {number} [precision=2] The rounding precision of the returned number
 */
export default (numberish, precision = 2) => {
  const converted = (numberish) ? precisionRound(parseFloat(numberish.toString().replace(/[^0-9.-]/g, '')), precision) : 0;

  return Number.isNaN(converted) ? 0 : converted;
};
