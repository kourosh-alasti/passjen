# PassJen

A Zero Dependency, secure password generator and hasher for TypeScript/JavaScript applications.

## Features

- 🔐 Generate secure passwords with customizable options
- 🔒 Hash passwords using crypto's pbkdf2
- ⚡ Synchronous and asynchronous methods
- 🎯 Zero dependencies
- 📊 Password strength assessment
- 🛡️ Strict mode for guaranteed character inclusion
- 🔄 Salt generation and management

## Installation

```bash
npm install passjen
```

## Usage

### Password Generation

```typescript
import { Generator } from 'passjen';

// Generate a password with default options
const result = Generator.generate({});
console.log(result.password); // 6-character password
console.log(result.passwordStrength); // Password strength rating

// Generate a strong password
const strongPassword = Generator.generate({
  characterLength: 12,
  useNumbers: true,
  useSymbols: true,
  useLowercase: true,
  useUppercase: true,
  useStrict: true
});

// Generate a password excluding similar characters
const unambiguousPassword = Generator.generate({
  characterLength: 10,
  useNumbers: true,
  useLowercase: true,
  excludeSimilarCharacters: true // Excludes i, l, 1, L, o, 0, etc.
});
```

### Password Hashing

```typescript
import { Hasher } from 'passjen';

// Async hashing
const hashedResult = await Hasher.hash('myPassword');
console.log(hashedResult.hashedPassword);
console.log(hashedResult.salt);

// Sync hashing
const hashedResultSync = Hasher.hashSync('myPassword');

// Password comparison (async)
const isMatch = await Hasher.compare({
  password: 'myPassword',
  hashedPassword: hashedResult.hashedPassword,
  salt: hashedResult.salt,
  saltRounds: hashedResult.saltRounds
});

// Generate and hash a password in one step
const generatedHash = await Hasher.generateHashedPassword({
  characterLength: 12,
  useNumbers: true,
  useSymbols: true,
  useLowercase: true,
  useUppercase: true,
  useStrict: true,
  saltRounds: 10
});
```

## API Reference

### Generator Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| characterLength | number | 6 | Length of the generated password |
| useNumbers | boolean | false | Include numbers (0-9) |
| useSymbols | boolean | false | Include symbols (!@#$%^&*()_+-=[]{}\|;:,.<>?) |
| useLowercase | boolean | false | Include lowercase letters (a-z) |
| useUppercase | boolean | false | Include uppercase letters (A-Z) |
| excludeSimilarCharacters | boolean | false | Exclude similar characters (ilLI\|`oO0) |
| excludeTheseCharacters | string | "" | Custom characters to exclude |
| useStrict | boolean | false | Ensure at least one character from each selected type |

### Password Strength Levels

The password strength is calculated based on:
- Length (8+ chars for basic strength, 12+ for better strength)
- Character variety (numbers, lowercase, uppercase, symbols)
- Overall complexity

Strength levels:
- **Too weak**: Very short or simple passwords
- **Weak**: Longer passwords with limited character types
- **Medium**: Medium-length passwords with some character types
- **Strong**: Complex passwords with multiple character types and sufficient length

### Hasher Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| saltRounds | number | 10 | Number of iterations for PBKDF2 |
| encryption | string | "sha256" | Hash algorithm to use |

## Security

PassJen uses Node's native `crypto` module with PBKDF2 for password hashing. The generator creates cryptographically secure random passwords when strict mode is enabled.

## License

MIT License - see LICENSE file for details
