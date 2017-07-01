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

  describe('Generci ID validity checker', () => {
    it('Returns false if id number is missing', () => {
      expect(utils.checkIdValidity()).toEqual(false);
    });

    it('Returns false if the ID length is not a correct value', () => {
      expect(utils.checkIdValidity('A123')).toEqual(false);
    });

    it('Returns false if ID number does not comply to the mask', () => {
      expect(utils.checkIdValidity('A12345678', [1, 2, 3, 4], 2))
        .toEqual(false);
    });

    it('Returns true if ID number meets the checksum', () => {
      expect(utils.checkIdValidity(
        'DUP623456',
        [7, 3, 1, 9, 7, 3, 1, 7, 3],
        3
      )).toEqual(true);
    });

    it('Returns false if ID number does not meet the checksum', () => {
      expect(utils.checkIdValidity(
        'DUP123456',
        [7, 3, 1, 9, 7, 3, 1, 7, 3],
        3
      )).toEqual(false);
    });

    it('Does not mutate the input', () => {
      const id = 'AYE623456';
      utils.checkIdValidity(
        id,
        [7, 3, 1, 9, 7, 3, 1, 7, 3],
        3
      );

      expect(id).toEqual('AYE623456');
    });
  });
});
