import * as validators from './';
import defaultValidators from './index';

describe('Polish validators - main file', () => {
  it('Exposes 9 validators', () => { // + 'default' export
    expect(Object.keys(validators).length).toEqual(10);
  });

  it('Exposes default export', () => {
    expect(Object.keys(defaultValidators).length).toEqual(9);
  });

  describe('Password validator', () => {
    it('Returns true if password contains all required chars', () => {
      expect(validators.isComplexPassword('Aa1@.89')).toEqual(true);
    });

    it('Returns false if no loercase letter is provided', () => {
      expect(validators.isComplexPassword('A1@.89')).toEqual(false);
    });

    it('Returns false if no uppercase letter is provided', () => {
      expect(validators.isComplexPassword('a1@.89')).toEqual(false);
    });

    it('Returns false if no special char is provided', () => {
      expect(validators.isComplexPassword('a89')).toEqual(false);
    });

    it('Returns false if no digit is provided', () => {
      expect(validators.isComplexPassword('a@.')).toEqual(false);
    });
  });

  describe('Name validator', () => {
    it('Returns true if name doesn\'t contain any restricted chars', () => {
      expect(validators.isName('Żelisław III')).toEqual(true);
    });

    it('Returns false if name contains restricted chars', () => {
      expect(validators.isName('Żelisł@w III')).toEqual(false);
    });
  });

  describe('Location (flat, street) number validator', () => {
    it('Returns true if number complies to numbering convention', () => {
      expect(validators.isLocationNumber('123/4B')).toEqual(true);
      expect(validators.isLocationNumber('123\\4B')).toEqual(true);
      expect(validators.isLocationNumber('123.4B')).toEqual(true);
      expect(validators.isLocationNumber('123-4A')).toEqual(true);
    });

    it('Returns false if number contains restricted chars', () => {
      expect(validators.isLocationNumber('123@4B')).toEqual(false);
    });

    it('Returns true immediately for numbers', () => {
      expect(validators.isLocationNumber(123)).toEqual(true);
    });
  });

  describe('Postcode validator', () => {
    it('Returns true if postcode matches XX-XXX mask', () => {
      expect(validators.isPostalCode('00-800')).toEqual(true);
    });

    it('Returns false if postcode contains restricted chars', () => {
      expect(validators.isPostalCode('AB-CDE')).toEqual(false);
    });

    it('Returns false if postcode does not match XX-XXX mask', () => {
      expect(validators.isPostalCode('435-5435')).toEqual(false);
    });
  });

  describe('Date compliance with PESEL validator', () => {
    it('Returns true if date is compliant with PESEL', () => {
      expect(validators.isCompliantWithPesel('1949-04-05', '49040501580'))
        .toEqual(true);
    });

    it('Returns false if provided date cannot be converted to Date', () => {
      expect(validators.isCompliantWithPesel('Afasf', '49040501580'))
        .toEqual(false);
    });

    it('Returns false if date is not compliant with PESEL', () => {
      expect(validators.isCompliantWithPesel('1949-04-08', '49040501580'))
        .toEqual(false);
    });
  });
  //
  // describe('PESEL number validator', () => {
  //   it('Should return true if checksum is computed properly (valid one)',
  //     () => {
  //       expect(validators.isValidPesel('49040501580')).toEqual(true);
  //     });
  //
  //   it('Should return false if it does not comply to the mask 00000000000',
  //     () => {
  //       expect(validators.isValidPesel('123456')).toEqual(false);
  //       expect(validators.isValidPesel('12B456U890E')).toEqual(false);
  //     });
  //
  //   it('Should return false if checksum is wrong', () => {
  //     expect(validators.isValidPesel('46040501580')).toEqual(false);
  //   });
  // });
  //
  // describe('ID number validator', () => {
  //   it('Should return true if checksum is computed properly (valid one)',
  //     () => {
  //       expect(validators.isValidIdNo('AXZ043405')).toEqual(true);
  //       expect(validators.isValidIdNo('ACE243027')).toEqual(true);
  //       expect(validators.isValidIdNo('AYF458741')).toEqual(true);
  //     });
  //
  //   it('Should return false if number has incorrect length', () => {
  //     expect(validators.isValidIdNo('AXZ04340')).toEqual(false);
  //   });
  //
  //   it('Should return false if number contains restricted characters',
  //     () => {
  //       expect(validators.isValidIdNo('AXZ0434#5')).toEqual(false);
  //     });
  //
  //   it('Should return false if number does not comply to mask AAA000000',
  //     () => {
  //       expect(validators.isValidIdNo('A5Z043405')).toEqual(false);
  //       expect(validators.isValidIdNo('AXZ04A405')).toEqual(false);
  //     });
  //
  //   it('Should return false if checksum is incorrect',
  //     () => {
  //       expect(validators.isValidIdNo('AXY043405')).toEqual(false);
  //     });
  // });
  //
  // describe('Passport number validator', () => {
  //   it('Should return true if checksum is computed properly (valid one)',
  //     () => {
  //       expect(validators.isValidPassportNo('MW3066805')).toEqual(true);
  //       expect(validators.isValidPassportNo('KN7958468')).toEqual(true);
  //       expect(validators.isValidPassportNo('OK6073778')).toEqual(true);
  //     });
  //
  //   it('Should return false if number has incorrect length', () => {
  //     expect(validators.isValidPassportNo('XE607262')).toEqual(false);
  //   });
  //
  //   it('Should return false if number contains restricted characters',
  //     () => {
  //       expect(validators.isValidPassportNo('XE60#2626')).toEqual(false);
  //     });
  //
  //   it('Should return false if number does not comply to mask AA0000000',
  //     () => {
  //       expect(validators.isValidPassportNo('5E6072626')).toEqual(false);
  //       expect(validators.isValidPassportNo('XE607G626')).toEqual(false);
  //     });
  //
  //   it('Should return false if checksum is incorrect',
  //     () => {
  //       expect(validators.isValidPassportNo('XE6172626')).toEqual(false);
  //     });
  // });
  //
  // describe('NIP number validator', () => {
  //   it('Should return true if checksum is computed properly (valid one)',
  //     () => {
  //       expect(validators.isValidNip('4375003084')).toEqual(true);
  //     });
  //
  //   it('Should return false if it does not comply to the mask 0000000000',
  //     () => {
  //       expect(validators.isValidNip('437500384')).toEqual(false);
  //       expect(validators.isValidNip('43B5003Y84')).toEqual(false);
  //     });
  //
  //   it('Should return false if checksum is wrong', () => {
  //     expect(validators.isValidNip('4375103084')).toEqual(false);
  //   });
  //
  //   it('Should return false if NIP is not present', () => {
  //     expect(validators.isValidNip()).toEqual(false);
  //   });
  // });
});
