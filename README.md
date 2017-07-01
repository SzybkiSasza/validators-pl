![Travic CI status][travis-image]
![Codacy Badge - Quality][codacy-quality]
![Codacy Badge - Coverage][codacy-coverage]


# Polish validators

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/8a97aec25ae949f5adbe5d1b9d6b00ad)](https://www.codacy.com/app/SzybkiSasza/validators-pl?utm_source=github.com&utm_medium=referral&utm_content=SzybkiSasza/validators-pl&utm_campaign=badger)

Validators for verifying mainly Polish ID data

Library consists of two validator types:
*  Address and personal data validators
*  ID validators (PESEL, NIP, personal ID, passport)

# Testing & coverage

To run tests or coverage simply type:

```bash
npm test
npm run coverage
```

This module requires `NodeJS >=4.0.0` to work! (it uses some of the ES6 spec)

Usage:
  1. Import validators to your project: `npm install --save validators-pl`
  2. Include this module inside your code and use as below:

  ```javascript
  const validators = require('validators-pl');
  const isIdNo = validators.isValidIdNo('ABC123');
  ```

[travis-image]: https://travis-ci.org/SzybkiSasza/validators-pl.svg?branch=master
[codacy-quality]: https://api.codacy.com/project/badge/Grade/8a97aec25ae949f5adbe5d1b9d6b00ad
[codacy-coverage]: https://api.codacy.com/project/badge/Coverage/8a97aec25ae949f5adbe5d1b9d6b00ad
