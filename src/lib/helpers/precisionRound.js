/**
 * Rounds a number to a specified number of decimal places
 *
 * @param   {number}  number  the number to be rounded
 * @param   {number}  [precision=0]  the number of decimal places to round to
 *
 * @return  {number}  the rounded number
 */
export default (number, precision = 0) => {
  const factor = 10 ** precision;
  return Math.round(number * factor) / factor;
};
