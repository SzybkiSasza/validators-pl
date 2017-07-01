[![Build Status](https://travis-ci.org/SzybkiSasza/validators-pl.svg?branch=master)](https://travis-ci.org/SzybkiSasza/validators-pl)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/8a97aec25ae949f5adbe5d1b9d6b00ad)](https://www.codacy.com/app/SzybkiSasza/validators-pl?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=SzybkiSasza/validators-pl&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/8a97aec25ae949f5adbe5d1b9d6b00ad)](https://www.codacy.com/app/SzybkiSasza/validators-pl?utm_source=github.com&utm_medium=referral&utm_content=SzybkiSasza/validators-pl&utm_campaign=Badge_Coverage)

# Polish validators

Simple set of validators to validate polish data. Useful in any type of online forms.

## Browser and NodeJS support

Library currently supports all the browsers that have `> 5%` of market share and current LTS versions of NodeJS.

The library code is minified. For the original code, please refer to the GitHub repo.

Library methods are exposed both as classic `module.exports` and `ES6 exports`.

## Available validators

Provided validators are related only to polish ID data.

| **Method name**      | **Parameters**                    | **Description**                                                                                                                                               |
|----------------------|-----------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| isComplexPassword    | *String password*                 | Checks the password complexity. Follows simple regEx rules: one digit, one lowercase, one uppercase letter and one special character from the list: `$@!%*?&` |
| isName               | *String name*                     | Checks if the provided name contains only polish alphabet letters and is a valid polish name                                                                  |
| isLocationNumber     | *String number*                   | Checks if the passed number is a valid location number (e.g. apartment, street number)                                                                        |
| isPostalCode         | *String postCode*                 | Checks if provided string is a valid Polish postal code                                                                                                       |
| isCompliantWithPesel | *String/Date date, String pesel*  | Checks if the provided date matches given PESEL (does not check PESEL validity!!! - check the next method)                                                    |
| isValidPesel         | *String pesel*                    | Checks if the given PESEL is a valid PESEL number                                                                                                             |
| isValidIdNo          | *String idNo*                     | Checks if the given string is a valid identification number                                                                                                   |
| isValidPassportNo    | *String passportNo*               | Checks if the provided number is a valid passport number                                                                                                      |
| isValidNip           | *String nip*                      | Checks if the provided number is a valid NIP                                                                                                                  |

## Testing

Tests can be run by running `npm test` from the library directory.
