'use strict';

var chai = require('chai');
var expect = chai.expect;

var Validators = require('../lib/validators');

describe('Custom validators class', function() {
  it('should be defined class', function() {
    expect(Validators).to.be.a('function');
  });

  describe('Password validator', function() {
    it('Should return true if password contains all required chars',
      function() {
        expect(Validators.isComplexPassword('Aa1@.89')).to.equal(true);
      });

    it('Should return false if no small letter is provided', function() {
      expect(Validators.isComplexPassword('A1@.89')).to.equal(false);
    });

    it('Should return false if no big letter is provided', function() {
      expect(Validators.isComplexPassword('a1@.89')).to.equal(false);
    });

    it('Should return false if no special char is provided', function() {
      expect(Validators.isComplexPassword('a89')).to.equal(false);
    });

    it('Should return false if no digit is provided', function() {
      expect(Validators.isComplexPassword('a@.')).to.equal(false);
    });
  });

  describe('Name validator', function() {
    it('Should return true if name doesn\'t contain any restricted chars',
      function() {
        expect(Validators.isName('Żelisław III')).to.equal(true);
      });

    it('Should return false if name contains restricted chars', function() {
      expect(Validators.isName('Żelisł@w III')).to.equal(false);
    });
  });

  describe('Location (flat, street) number validator', function() {
    it('Should return true if number complies to numbering convention',
      function() {
        expect(Validators.isLocationNumber('123/4B')).to.equal(true);
        expect(Validators.isLocationNumber('123\\4B')).to.equal(true);
        expect(Validators.isLocationNumber('123.4B')).to.equal(true);
        expect(Validators.isLocationNumber('123-4A')).to.equal(true);
      });

    it('Should return false if number contains restricted chars', function() {
      expect(Validators.isLocationNumber('123@4B')).to.equal(false);
    });

    it('Should return true if number is empty', function() {
      expect(Validators.isLocationNumber('')).to.equal(true);
    });
  });

  describe('Postcode validator', function() {
    it('Should return true if postcode matches XX-XXX mask', function() {
      expect(Validators.isPostCode('00-800')).to.equal(true);
    });

    it('Should return false if postcode contains restricted chars',
      function() {
        expect(Validators.isPostCode('AB-CDE')).to.equal(false);
      });

    it('Should return false if postcode does not match XX-XXX mask',
      function() {
        expect(Validators.isPostCode('435-5435')).to.equal(false);
      });
  });

  describe('Date compliance with PESEL validator', function() {
    it('Should return true if date is compliant with PESEL', function() {
      expect(Validators.isCompliantWithPesel('1949-04-05', '49040501580'))
        .to.equal(true);
    });
    it('Should return false if provided date cannot be converted to Date',
      function() {
        expect(Validators.isCompliantWithPesel('Afasf', '49040501580'))
          .to.equal(false);
      });
    it('Should return false if date is not compliant with PESEL', function() {
      expect(Validators.isCompliantWithPesel('1949-04-08', '49040501580'))
        .to.equal(false);
    });
  });

  describe('PESEL number validator', function() {
    it('Should return true if checksum is computed properly (valid one)',
      function() {
        expect(Validators.isValidPesel('49040501580')).to.equal(true);
      });

    it('Should return false if it does not comply to the mask 00000000000',
      function() {
        expect(Validators.isValidPesel('123456')).to.equal(false);
        expect(Validators.isValidPesel('12B456U890E')).to.equal(false);
      });

    it('Should return false if checksum is wrong', function() {
      expect(Validators.isValidPesel('46040501580')).to.equal(false);
    });
  });

  describe('ID number validator', function() {
    it('Should return true if checksum is computed properly (valid one)',
      function() {
        expect(Validators.isValidIdNo('AXZ043405')).to.equal(true);
        expect(Validators.isValidIdNo('ACE243027')).to.equal(true);
        expect(Validators.isValidIdNo('AYF458741')).to.equal(true);
      });

    it('Should return false if number has incorrect length', function() {
      expect(Validators.isValidIdNo('AXZ04340')).to.equal(false);
    });

    it('Should return false if number contains restricted characters',
      function() {
        expect(Validators.isValidIdNo('AXZ0434#5')).to.equal(false);
      });

    it('Should return false if number does not comply to mask AAA000000',
      function() {
        expect(Validators.isValidIdNo('A5Z043405')).to.equal(false);
        expect(Validators.isValidIdNo('AXZ04A405')).to.equal(false);
      });

    it('Should return false if checksum is incorrect',
      function() {
        expect(Validators.isValidIdNo('AXY043405')).to.equal(false);
      });
  });

  describe('Passport number validator', function() {
    it('Should return true if checksum is computed properly (valid one)',
      function() {
        expect(Validators.isValidPassportNo('MW3066805')).to.equal(true);
        expect(Validators.isValidPassportNo('KN7958468')).to.equal(true);
        expect(Validators.isValidPassportNo('OK6073778')).to.equal(true);
      });

    it('Should return false if number has incorrect length', function() {
      expect(Validators.isValidPassportNo('XE607262')).to.equal(false);
    });

    it('Should return false if number contains restricted characters',
      function() {
        expect(Validators.isValidPassportNo('XE60#2626')).to.equal(false);
      });

    it('Should return false if number does not comply to mask AA0000000',
      function() {
        expect(Validators.isValidPassportNo('5E6072626')).to.equal(false);
        expect(Validators.isValidPassportNo('XE607G626')).to.equal(false);
      });

    it('Should return false if checksum is incorrect',
      function() {
        expect(Validators.isValidPassportNo('XE6172626')).to.equal(false);
      });
  });

  describe('NIP number validator', function() {
    it('Should return true if checksum is computed properly (valid one)',
      function() {
        expect(Validators.isValidNip('4375003084')).to.equal(true);
      });

    it('Should return false if it does not comply to the mask 0000000000',
      function() {
        expect(Validators.isValidNip('437500384')).to.equal(false);
        expect(Validators.isValidNip('43B5003Y84')).to.equal(false);
      });

    it('Should return false if checksum is wrong', function() {
      expect(Validators.isValidNip('4375103084')).to.equal(false);
    });

    it('Should return false if NIP is not present', function() {
      expect(Validators.isValidNip()).to.equal(false);
    });
  });

  describe('Character transformer', function() {
    it('Should transform characters or digits to corresponding values',
      function() {
        expect(Validators.transformCharacters('C56')).to.deep.equal([12, 5, 6]);
        expect(Validators.transformCharacters('5')).to.deep.equal([5]);
      });
  });

  describe('Mask compliance checker', function() {
    it('Should return true for numbers compliant with mask', function() {
      var number = [12, 15, 1, 2, 3, 4];
      expect(Validators.checkMaskCompliance(number, 2)).to.equal(true);
    });

    it('Should return false for numbers that contain improper chars',
      function() {
        var number = [12, -1, 1, 2, 3, 4];
        expect(Validators.checkMaskCompliance(number, 2)).to.equal(false);
      });

    it('Should return false for numbers that do not comply to mask',
      function() {
        var number = [12, 15, 1, 2, 3, 4];
        expect(Validators.checkMaskCompliance(number, 3)).to.equal(false);
      });
  });

  describe('Checksum calculator', function() {
    it('Should calculate proper checksum for given digits and weights',
      function() {
        var digits = [10, 11, 12, 0, 1, 2];
        var weights = [1, 2, 3, 1, 2, 3];

        expect(Validators.calculateCheckSum(digits, weights)).to.equal(76);
      });
  });
});
