import { describe, it, expect } from 'vitest';
import Generator, { GenerateOptions, PasswordStrength } from '../src/models/generator';

describe('Generator', () => {
  describe('generate', () => {
    it('should generate a password with default options', () => {
      const result = Generator.generate({});
      expect(result.password).toBeDefined();
      expect(result.password.length).toBe(6);
      expect(result.passwordLength).toBe(6);
      expect(result.passwordStrength).toBe('Too weak');
    });

    it('should respect character length option', () => {
      const options: GenerateOptions = { characterLength: 12 };
      const result = Generator.generate(options);
      expect(result.password.length).toBe(12);
      expect(result.passwordLength).toBe(12);
    });

    it('should include numbers when useNumbers is true', () => {
      const options: GenerateOptions = { 
        useNumbers: true,
        useStrict: true,
        characterLength: 10
      };
      const result = Generator.generate(options);
      expect(result.password).toMatch(/[0-9]/);
    });

    it('should include symbols when useSymbols is true', () => {
      const options: GenerateOptions = { 
        useSymbols: true,
        useStrict: true,
        characterLength: 10
      };
      const result = Generator.generate(options);
      expect(result.password).toMatch(/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/);
    });

    it('should include lowercase when useLowercase is true', () => {
      const options: GenerateOptions = { 
        useLowercase: true,
        useStrict: true,
        characterLength: 10
      };
      const result = Generator.generate(options);
      expect(result.password).toMatch(/[a-z]/);
    });

    it('should include uppercase when useUppercase is true', () => {
      const options: GenerateOptions = { 
        useUppercase: true,
        useStrict: true,
        characterLength: 10
      };
      const result = Generator.generate(options);
      expect(result.password).toMatch(/[A-Z]/);
    });

    it('should exclude similar characters when excludeSimilarCharacters is true', () => {
      const options: GenerateOptions = { 
        characterLength: 100,
        useNumbers: true,
        useUppercase: true,
        excludeSimilarCharacters: true 
      };
      const result = Generator.generate(options);
      expect(result.password).not.toMatch(/[ilLI|`oO0]/);
    });

    it('should exclude specified characters', () => {
      const options: GenerateOptions = {
        characterLength: 100,
        useNumbers: true,
        useLowercase: true,
        excludeTheseCharacters: 'abc123'
      };
      const result = Generator.generate(options);
      expect(result.password).not.toMatch(/[abc123]/);
    });

    it('should generate password with all character types in strict mode', () => {
      const options: GenerateOptions = {
        characterLength: 12,
        useStrict: true,
        useNumbers: true,
        useSymbols: true,
        useLowercase: true,
        useUppercase: true
      };
      const result = Generator.generate(options);
      expect(result.password).toMatch(/[0-9]/);
      expect(result.password).toMatch(/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/);
      expect(result.password).toMatch(/[a-z]/);
      expect(result.password).toMatch(/[A-Z]/);
      expect(result.passwordStrength).toBe('Strong');
    });

    it('should not guarantee character types without strict mode', () => {
      const options: GenerateOptions = {
        characterLength: 12,
        useNumbers: true,
        useSymbols: true,
        useLowercase: true,
        useUppercase: true
      };
      const result = Generator.generate(options);
      // Only verify the password contains valid characters
      expect(result.password).toMatch(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{}|;:,.<>?]+$/);
    });
  });

  describe('password strength', () => {
    it('should return "Too weak" for short passwords', () => {
      const options: GenerateOptions = {
        characterLength: 4,
        useLowercase: true
      };
      const result = Generator.generate(options);
      expect(result.passwordStrength).toBe('Too weak');
    });

    it('should return "Too weak" for longer passwords with single character type', () => {
      const options: GenerateOptions = {
        characterLength: 8,
        useLowercase: true
      };
      const result = Generator.generate(options);
      expect(result.passwordStrength).toBe('Too weak');
    });

    it('should return "Weak" for passwords with multiple character types', () => {
      const options: GenerateOptions = {
        characterLength: 8,
        useNumbers: true,
        useLowercase: true,
        useUppercase: true,
        useStrict: true
      };
      const result = Generator.generate(options);
      expect(result.passwordStrength).toBe('Weak');
    });

    it('should return "Strong" for complex passwords', () => {
      const options: GenerateOptions = {
        characterLength: 12,
        useNumbers: true,
        useSymbols: true,
        useLowercase: true,
        useUppercase: true,
        useStrict: true
      };
      const result = Generator.generate(options);
      expect(result.passwordStrength).toBe('Strong');
    });
  });
});
