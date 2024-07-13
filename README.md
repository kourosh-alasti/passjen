# @kourosh-alasti/pwd-gen

A package that provides functions for generating and hashing passwords, along with password strength evaluation. It uses the `generate-password-browser`, `bcrypt`, and `check-password-strength` libraries.

## Installation

To install the package, you can use npm or yarn:

```bash
npm install @kourosh-alasti/pwd-gen
```

or

```bash
pnpm add @kourosh-alasti/pwd-gen
```

or

```bash
bun add @kourosh-alasti/pwd-gen
```

or

```bash
yarn add @kourosh-alasti/pwd-gen
```

## Usage

The package exports two classes:

### Generator

> Import the Generator Class

```typescript
import { Generator } from "@kourosh-alasti/pwd-gen";
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
import { Generator } from "@kourosh-alasti/pwd-gen";

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
import { Hasher } from "@kourosh-alasti/pwd-gen";

const { hashedPassword, password, saltRounds } = Hasher.hashSync(
  "testPassword",
  12
);

console.log(hashedPassword); // @String
console.log(password); // @String
console.log(saltRounds); // @Integer
```

> Hash a password ( **Asynchronous )**

```typescript
import { Hasher } from "@kourosh-alasti/pwd-gen";

const { hashedPassword, password, saltRounds } = await Hasher.hash(
  "testPassword",
  12
);

console.log(hashedPassword); // @String
console.log(password); // @String
console.log(saltRounds); // @Integer
```

> Generate Hashed Password ( Synchronous )

```typescript
import { Hasher } from "@kourosh-alasti/pwd-gen";

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

> Generate Hashed Password ( Asynchronous)

```typescript
import { Hasher } from "@kourosh-alasti/pwd-gen";

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

> Compare Hashed Password ( Synchronous )

```typescript
import { Hasher } from "@kourosh-alasti/pwd-gen";

const { password, hashedPassword, isMatch } = Hasher.compareHashedPasswordSync({
  password: pwd,
  hashedPassword: hash,
});

console.log(password); // @String
console.log(hashedPassword); // @String
console.log(isMatch); // @Boolean
```

> Compare Hashed Password ( Asynchronous )

```typescript
import { Hasher } from "@kourosh-alasti/pwd-gen";

const { password, hashedPassword, isMatch } =
  await Hasher.compareHashedPasswordSync({
    password: pwd,
    hashedPassword: hash,
  });

console.log(password); // @String
console.log(hashedPassword); // @String
console.log(isMatch); // @Boolean
```

## Contributing

Contributions are welcome. If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## License

This package is licensed under the MIT License.

## Author

This package was developed by Kourosh Alasti <coding@kouroshalasti.com>.
