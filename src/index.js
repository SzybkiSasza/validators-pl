import {dropRight, isNaN, isNumber, isString} from 'lodash';

import {
  calculateCheckSum,
  checkIdValidity,
} from './utils';

/**
 * Simple checker for password characters
 * Requirements:
 *  - one digit
 *  - one special character
 *  - uppercase and lowercase letters
 *
 * @param  {String}  password Password String
 * @return {Boolean}          result of check
 */
export function isComplexPassword(password) {
  return isString(password) &&
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@!%*?&])/.test(password);
}

/**
 * Checks whether provided string complies to polish firstname/lastname
 * requirements
 *
 * @param  {String}  name   Name string
 * @return {Boolean}        result of check
 */
export function isName(name) {
  return isString(name) &&
    /^[A-ZŻŹĆŃÓŁĘĄ][A-Za-zżźćńółęąśŻŹĆŃÓŁĘĄŚ\d\s\-.]{1,}$/.test(name);
}

/**
 * Checks if provided string is location (street or flat) number.
 *
 * @param  {Number|String}  locationNumber  Number to check (HAS to be String)
 * @return {Boolean}                        result of check
 */
export function isLocationNumber(locationNumber) {
  if (isNumber(locationNumber)) {
    return true;
  }

  if (isString(locationNumber)) {
    return /^[\da-zA-Z\\/.-]+$/.test(locationNumber);
  }

  return false;
}

/**
 * Simple check for postcode mask
 *
 * @param  {String}  postCode Given postcode
 * @return {Boolean}          result of check
 */
export function isPostalCode(postCode) {
  return isString(postCode) && /^\d{2}-\d{3}$/.test(postCode);
}

/**
 * Checks if provided date (birth date) is compliant with PESEL
 *
 * @param  {String|Date}  date  Birth date
 * @param  {String}       pesel PESEL to check date against
 * @return {Boolean}            result of check
 */
export function isCompliantWithPesel(date, pesel) {
  date = new Date(date);

  const dateTime = date.getTime();
  if (isNumber(dateTime) && !isNaN(dateTime)) {
    const peselPart = pesel.substr(0, 6);
    const fullYear = date.getFullYear();

    // Prepare proper month sum. 19xx - 0, 20xx - 20, 21xx - 40 and so on
    const monthSum = 20 * ((Number(fullYear.toString().substr(0, 2))) - 19);

    // Build date part for comparison with PESEL
    const datePart = String(fullYear.toString().substr(2, 2)) +
      ('0' + (date.getMonth() + 1 + monthSum).toString()).slice(-2) +
      ('0' + date.getDate().toString()).slice(-2);

    return peselPart === datePart;
  }

  return false;
}

/**
 * Checks whether PESEL is compliant with standards
 *
 * @param  {String}  pesel PESEL string
 * @return {Boolean}       result of check
 */
export function isValidPesel(pesel) {
  let reg = /^[0-9]{11}$/;

  if (isString(pesel) && reg.test(pesel)) {
    const digits = pesel.split('');
    const checkSumDigits = dropRight(digits);

    // Map each pesel digit using proper weight
    let checkSum =
      calculateCheckSum(checkSumDigits, [1, 3, 7, 9, 1, 3, 7, 9, 1, 3]) % 10;
    checkSum = (10 - checkSum) % 10;

    return Number(digits[10]) === checkSum;
  }

  return false;
}

/**
 * Checks if given personal id number is valid one
 *
 * @param  {String}  idNo Personal id number
 * @return {Boolean}      result of check
 */
export function isValidIdNo(idNo) {
  return checkIdValidity(idNo, [7, 3, 1, 9, 7, 3, 1, 7, 3], 3);
}

/**
 * Checks if given passport number is compliant with standards.
 * Similar to personal ID checks.
 *
 * @param  {String}  passportNo Given passport number
 * @return {Boolean}            result of check
 */
export function isValidPassportNo(passportNo) {
  return checkIdValidity(passportNo, [7, 3, 9, 1, 7, 3, 1, 7, 3], 2);
}

/**
 * Checks if given NIP is correct one
 * NIP could be given with or without dashes
 *
 * @param  {String}  nip NIP number
 * @return {Boolean}     result of check
 */
export function isValidNip(nip) {
  if (!nip) {
    return false;
  }

  const nipNumber = nip.replace(/-/g, '');
  const reg = /^[0-9]{10}$/;

  if (reg.test(nipNumber)) {
    const digits = nipNumber.split('');
    const checkSumDigits = dropRight(digits);
    const checkSum =
      calculateCheckSum(checkSumDigits, [6, 5, 7, 2, 3, 4, 5, 6, 7]) % 11;

    return Number(digits[9]) === checkSum;
  }

  return false;
}

export default {
  isComplexPassword,
  isName,
  isLocationNumber,
  isPostalCode,
  isCompliantWithPesel,
  isValidPesel,
  isValidIdNo,
  isValidPassportNo,
  isValidNip,
};
