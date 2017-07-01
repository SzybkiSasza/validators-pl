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
  //
  // describe('Mask compliance checker', () => {
  //   it('Should return true for numbers compliant with mask', () => {
  //     const number = [12, 15, 1, 2, 3, 4];
  //     expect(utils.checkMaskCompliance(number, 2)).toEqual(true);
  //   });
  //
  //   it('Should return false for numbers that contain improper chars', () => {
  //       const number = [12, -1, 1, 2, 3, 4];
  //       expect(utils.checkMaskCompliance(number, 2)).toEqual(false);
  //     });
  //
  //   it('Should return false for numbers that do not comply to mask', () => {
  //       const number = [12, 15, 1, 2, 3, 4];
  //       expect(utils.checkMaskCompliance(number, 3)).toEqual(false);
  //     });
  // });
});
