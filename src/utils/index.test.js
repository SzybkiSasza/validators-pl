import * as utils from '.';

describe('Validator utils tests', () => {
  it('Is a defined export', () => {
    expect(utils).toEqual(expect.any(Object));
  });

  it('Exposes 4 helpers', () => {
    expect(Object.keys(utils).length).toEqual(4);
  });

  describe('Checksum calculator', () => {
    it('Should calculate proper checksum for given digits and weights', () => {
      const digits = [10, 11, 12, 0, 1, 2];
      const weights = [1, 2, 3, 1, 2, 3];

      expect(utils.calculateCheckSum(digits, weights)).toEqual(76);
    });
  });

  describe('Character transform', () => {
    it('Should transform one character to a corresponding value', () => {
      expect(utils.transformCharacters('5')).toEqual([5]);
    });

    it('Should transform each string value to a corresponding code', () => {
      expect(utils.transformCharacters('C56')).toEqual([12, 5, 6]);
    });
  });

  describe('Mask compliance checker', () => {
    it('Should return true for numbers compliant with mask', () => {
      const number = [12, 10, 1, 2, 3, 4];
      expect(utils.checkMaskCompliance(number, 2)).toEqual(true);
    });

    it('Should return false for numbers that contain improper chars', () => {
      const number = [12, -1, 1, 2, 3, 4];
      expect(utils.checkMaskCompliance(number, 2)).toEqual(false);
    });

    it('Should return false for numbers have numbers in serie', () => {
      const number = [12, 15, 9, 2, 3, 4];
      expect(utils.checkMaskCompliance(number, 3)).toEqual(false);
    });

    it('Should return false for numbers that have letters in number', () => {
      const number = [12, 15, 10, 11, 3, 4];
      expect(utils.checkMaskCompliance(number, 3)).toEqual(false);
    });
  });
});
