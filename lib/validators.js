'use strict';

var _ = require('lodash');

class Validators {
  /**
   * Checks if password contains required characters.
   * Required are one digit, special char and uppercase and lowercase letters
   *
   * @param  {String}  password Password String
   * @return {Boolean}          result of check
   */
  static isComplexPassword(password) {
    return !!password && !!password
      .match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@!%*?&])/);
  }

  /**
   * Checks whether provided string complies to polish firstname/lastname requirements
   *
   * @param  {String}  name Name string
   * @return {Boolean}      result of check
   */
  static isName(name) {
    return !!name && !!name
      .match(/^[A-ZŻŹĆŃÓŁĘĄ][A-Za-zżźćńółęąśŻŹĆŃÓŁĘĄ\d\s\-\.]{1,}$/);
  }

  /**
   * Checks if provided string is location (street or flat) number.
   *
   * @param  {String}  number Number to check (HAS to be String)
   * @return {Boolean}        result of check
   */
  static isLocationNumber(number) {
    if (!!number && number.length > 0) { // Fix for flat numbers - could be empty
      return !!number
        .match(/^[\da-zA-Z\\\/\.\-]+$/);
    } else {
      return true;
    }
  }

  /**
   * Simple check for postcode mask
   *
   * @param  {String}  postCode Given postcode
   * @return {Boolean}          result of check
   */
  static isPostCode(postCode) {
    return !!postCode && !!postCode
      .match(/^\d{2}-\d{3}$/);
  }

  /**
   * Checks if provided date (birth date) is compliant with PESEL
   *
   * @param  {String|Date}  date  Birth date
   * @param  {String}  pesel PESEL to check date against
   *
   * @return {Boolean}       result of check
   */
  static isCompliantWithPesel(date, pesel) {
    date = new Date(date);
    if (isNaN(date.getTime())) {
      return false;
    } else {
      var peselPart = pesel.substr(0, 6);
      var fullYear = date.getFullYear();

      // Prepare proper month sum. 19xx - 0, 20xx - 20, 21xx - 40 and so on
      var monthSum = 20 * ((+fullYear.toString().substr(0, 2)) - 19);

      // Build date part for comparison with PESEL
      var datePart = fullYear.toString().substr(2, 2) + '' +
        ('0' + (date.getMonth() + 1 + monthSum).toString()).slice(-2) + '' +
        ('0' + date.getDate().toString()).slice(-2);

      return peselPart === datePart;
    }
  }

  /**
   * Checks whether PESEL is compliant with standards
   *
   * @param  {String}  pesel PESEL string
   * @return {Boolean}       result of check
   */
  static isValidPesel(pesel) {
    var reg = /^[0-9]{11}$/;
    if (!pesel || !reg.test(pesel)) {
      return false;
    } else {
      var digits = pesel.split('');
      var checkSumDigits = _.dropRight(digits);

      // Map each pesel digit using proper weight
      var checkSum = this
        .calculateCheckSum(checkSumDigits, [1, 3, 7, 9, 1, 3, 7, 9, 1, 3]) % 10;
      checkSum = (10 - checkSum) % 10;

      return +digits[10] === checkSum;
    }
  }

  /**
   * Checks if given personal id number is valid one
   *
   * @param  {String}  idNo Personal id number
   * @return {Boolean}      result of check
   */
  static isValidIdNo(idNo) {
    return this.checkIdValidity(idNo, [7, 3, 1, 9, 7, 3, 1, 7, 3], 3);
  }

  /**
   * Checks if given passport number is compliant with standards.
   * Similar to personal ID checks.
   *
   * @param  {String}  passportNo Given passport number
   * @return {Boolean}            result of check
   */
  static isValidPassportNo(passportNo) {
    return this.checkIdValidity(passportNo, [7, 3, 9, 1, 7, 3, 1, 7, 3], 2);
  }

  /**
   * Checks if given NIP is correct one
   * NIP could be given with or without dashes
   *
   * @param  {String}  nip NIP number
   * @return {Boolean}     result of check
   */
  static isValidNip(nip) {
    if (!nip) {
      return false;
    }
    var nipNumber = nip.replace(/-/g, '');
    var reg = /^[0-9]{10}$/;

    if (!reg.test(nipNumber)) {
      return false;
    } else {
      var digits = nipNumber.split('');
      var checkSumDigits = _.dropRight(digits);
      var checkSum = this
        .calculateCheckSum(checkSumDigits, [6, 5, 7, 2, 3, 4, 5, 6, 7]) % 11;

      return +digits[9] === checkSum;
    }
  }

  /**
   * Transforms id character into particular mapped value
   *
   * @param  {String} number Characters to transform
   * @return {Array}        Corresponding numerical values in character table
   */
  static transformCharacters(number) {
    return _.map(number.toUpperCase().split(''),
      v => _.indexOf(this.letterValues, v)
    );
  }

  /**
   * Checks if number complies to simple mask check like XXX11111
   * Where XXX is series part (letter values in fron of id number)
   *
   * @param  {String} number       Given id number
   * @param  {Number} seriesLength Length of series denominator
   * @return {Boolean}             Result of check
   */
  static checkMaskCompliance(number, seriesLength) {
    return _.reduce(number, function(result, val, index) {
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
   * @param  {array} weights      Weights of particular characters to test id against
   * @param  {Number} seriesLength Length of series part
   * @return {Boolean}              Result of check
   */
  static checkIdValidity(idNo, weights, seriesLength) {
    if (!idNo || idNo.length !== 9) {
      return false;
    }
    idNo = this.transformCharacters(idNo);

    if (!this.checkMaskCompliance(idNo, seriesLength)) {
      return false;
    }

    var checkSum = this.calculateCheckSum(idNo, weights);
    if (checkSum % 10 === 0) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Calculates checksum for all the digits in particular ID
   *
   * @param  {array} digitsArray Array of digits (already transformed by transformCharacters)
   * @param  {Array} weights     Array of weights of each digit
   * @return {Number}            Resulting checksum
   */
  static calculateCheckSum(digitsArray, weights) {
    var checkSum = _.map(_.zip(digitsArray, weights),
      function(values) {
        return +values[0] * +values[1];
      });

    // Reduce temporary array into one sum
    return +_.reduce(checkSum, function(total, n) {
      return total + n;
    });
  }
}

Validators.letterValues = [
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
  'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
  'U', 'V', 'W', 'X', 'Y', 'Z'
];

module.exports = Validators;
