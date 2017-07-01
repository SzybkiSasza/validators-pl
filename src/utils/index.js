import {map, reduce, zip} from 'lodash';

// Letter values array used in passport/id checks
const letterValues = [
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
  'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
  'U', 'V', 'W', 'X', 'Y', 'Z',
];

/**
 * Calculates checksum for all the digits in particular ID
 *
 * @param  {array} digitsArray Array of digits (already transformed by
 *                             transformCharacters)
 * @param  {Array} weights     Array of weights of each digit
 * @return {Number}            Resulting checksum
 */
export function calculateCheckSum(digitsArray, weights) {
  const checkSum = map(zip(digitsArray, weights), (values) =>
    Number(values[0]) * Number(values[1])
  );

  // Reduce temporary array into one sum
  return Number(reduce(checkSum, (total, n) => total + n));
}

/**
 * Transforms id character into particular mapped value
 *
 * @param  {String} number Characters to transform
 * @return {Array}        Corresponding numerical values in character table
 */
export function transformCharacters(number) {
  return map(number.toUpperCase().split(''),
    (v) => indexOf(letterValues, v)
  );
}

/**
 * Checks if number complies to simple mask check in the style "XXX11111"
 * Where XXX is series part (letter values in fron of id number)
 *
 * @param  {String} number       Given id number
 * @param  {Number} seriesLength Length of series denominator
 * @return {Boolean}             Result of check
 */
export function checkMaskCompliance(number, seriesLength) {
  return reduce(number, function(result, val, index) {
    if ((val === -1) ||
      !((index < seriesLength && val >= 10) ||
        (index >= seriesLength && val < 10))) {
      return false;
    }
    return result;
  }, true);
}

/**
 * Generic checker for id types (personal id, passport etc.)
 *
 * @param  {String} idNo         Given id number
 * @param  {array} weights      Weights of particular characters to test id
 * @param  {Number} seriesLength Length of series part
 * @return {Boolean}              Result of check
 */
export function checkIdValidity(idNo, weights, seriesLength) {
  if (!idNo || idNo.length !== 9) {
    return false;
  }
  idNo = transformCharacters(idNo);

  if (!checkMaskCompliance(idNo, seriesLength)) {
    return false;
  }

  let checkSum = calculateCheckSum(idNo, weights);
  if (checkSum % 10 === 0) {
    return true;
  }

  return false;
}
