# passjen

A package that provides functions for generating and hashing passwords, along with password strength evaluation. It uses the `generate-password-browser` and `check-password-strength` libraries.

## Installation

To install the package, you can use npm or yarn:

```bash
npm install passjen
```

or

```bash
pnpm add passjen
```

or

```bash
bun add passjen
```

or

```bash
yarn add passjen
```

## Usage

The package exports two classes:

### Generator

> Import the Generator Class

```typescript
import { Generator } from "passjen";
```

> Generating a Password

```typescript
const { password, passwordLength, passwordStrengh } = Generator.generate({
  characterLength: 15, // Integer
  useNumbers: true, // Boolean
  useSymbols: true, // Boolean
  useLowercase: true, // Boolean
  useUppercase: true, // Boolean
  excludeSimilarCharacters: true, // Boolean
  excludeTheseCharacters: "", // String
  useStrict: true, // Boolean
});

console.log(password); // @String
console.log(passwordLength); // @Integer
console.log(passwordStrength); // @String Enum { 'Too weak', 'Strong' }
```

> Generate Multiple Passwords

```typescript
import { Generator } from "passjen";

const passwords = Generator.generateMultiple({
  count: 10, // Integer
  characterLength: 15, // Integer
  useNumbers: true, // Boolean
  useSymbols: true, // Boolean
  useLowercase: true, // Boolean
  useUppercase: true, // Boolean
  excludeSimilarCharacters: true, // Boolean
  excludeTheseCharacters: "", // String
  useStrict: true, // Boolean
});

console.log(passwords); // @Array[password @string, passwordLength @Integer, passwordStrengh @String Enum { 'Too weak', 'Strong' }]
```

### Hasher

> Hash a password ( **Synchronous** )

```typescript
import { Hasher } from "passjen";

const { hashedPassword, password, salt, saltRounds } = Hasher.hashSync(
  "testPassword",
  12,
  "sha256"
);

console.log(hashedPassword); // @String
console.log(password); // @String
console.log(salt); // @String
console.log(saltRounds); // @Integer
```

> Hash a password ( **Asynchronous )**

```typescript
import { Hasher } from "passjen";

const { hashedPassword, password, salt, saltRounds } = await Hasher.hash(
  "testPassword",
  12
);

console.log(hashedPassword); // @String
console.log(password); // @String
console.log(salt); // @String
console.log(saltRounds); // @Integer
```

> Generate Hashed Password ( Synchronous ) **BROKEN**

```typescript
import { Hasher } from "passjen";

const { password, passwordLength, passwordStrength, hashedPassword, salt } =
  Hasher.generateHashedPasswordSync({
    characterLength: 15, // Integer
    useNumbers: true, // Boolean
    useSymbols: true, // Boolean
    useLowercase: true, // Boolean
    useUppercase: true, // Boolean
    excludeSimilarCharacters: true, // Boolean
    excludeTheseCharacters: "", // String
    useStrict: true, // Boolean
    saltRounds: 10, // Integer
  });

console.log(password); // @String
console.log(passwordLength); // @Integer
console.log(passwordStrength); // @String Enum { 'Too weak', 'Strong' }
console.log(hashedPassword); // @String
console.log(salt); // @Integer
```

> Generate Hashed Password ( Asynchronous) **BROKEN**

```typescript
import { Hasher } from "passjen";

const { password, passwordLength, passwordStrength, hashedPassword, salt } =
  await Hasher.generateHashedPassword({
    characterLength: 15, // Integer
    useNumbers: true, // Boolean
    useSymbols: true, // Boolean
    useLowercase: true, // Boolean
    useUppercase: true, // Boolean
    excludeSimilarCharacters: true, // Boolean
    excludeTheseCharacters: "", // String
    useStrict: true, // Boolean
    saltRounds: 10, // Integer
  });

console.log(password); // @String
console.log(passwordLength); // @Integer
console.log(passwordStrength); // @String Enum { 'Too weak', 'Strong' }
console.log(hashedPassword); // @String
console.log(salt); // @Integer
```

> Compare Password ( Synchronous )

```typescript
import { Hasher } from "passjen";

const isMatch = Hasher.compareSync({
  password: pwd,
  hashedPassword: hash,
  salt: salt,
  saltRounds: 10,
  encryption: "sha256",
});

console.log(isMatch); // @Boolean
```

> Compare Password ( Asynchronous )

```typescript
import { Hasher } from "passjen";

const { password, hashedPassword, isMatch } = await Hasher.compare({
  password: pwd,
  hashedPassword: hash,
  salt: salt,
  saltRounds: 10,
  encryption: "sha256",
});

console.log(isMatch); // @Boolean
```

## Contributing

Contributions are welcome. If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## License

This package is licensed under the MIT License.

## Author

This package was developed by Kourosh Alasti <coding@kouroshalasti.com>.
