import { describe, it, expect } from 'vitest';
import Hasher from '../src/models/hasher';

describe('Hasher', () => {
  describe('hash', () => {
    it('should hash a password asynchronously', async () => {
      const password = 'testPassword123';
      const result = await Hasher.hash(password);
      
      expect(result.password).toBe(password);
      expect(result.hashedPassword).toBeDefined();
      expect(result.salt).toBeDefined();
      expect(result.saltRounds).toBe(10);
      expect(result.hashedPassword).toHaveLength(128);
      expect(result.salt).toHaveLength(32);
    });

    it('should use custom salt rounds', async () => {
      const password = 'testPassword123';
      const saltRounds = 15;
      const result = await Hasher.hash(password, saltRounds);
      
      expect(result.saltRounds).toBe(saltRounds);
    });

    it('should use custom encryption algorithm', async () => {
      const password = 'testPassword123';
      const result = await Hasher.hash(password, 10, 'sha512');
      
      expect(result.hashedPassword).toBeDefined();
      expect(result.hashedPassword).toHaveLength(128);
    });

    it('should generate different hashes for same password', async () => {
      const password = 'testPassword123';
      const result1 = await Hasher.hash(password);
      const result2 = await Hasher.hash(password);
      
      expect(result1.hashedPassword).not.toBe(result2.hashedPassword);
      expect(result1.salt).not.toBe(result2.salt);
    });
  });

  describe('hashSync', () => {
    it('should hash a password synchronously', () => {
      const password = 'testPassword123';
      const result = Hasher.hashSync(password);
      
      expect(result.password).toBe(password);
      expect(result.hashedPassword).toBeDefined();
      expect(result.salt).toBeDefined();
      expect(result.saltRounds).toBe(10);
      expect(result.hashedPassword).toHaveLength(128);
      expect(result.salt).toHaveLength(32);
    });

    it('should use custom salt rounds', () => {
      const password = 'testPassword123';
      const saltRounds = 15;
      const result = Hasher.hashSync(password, saltRounds);
      
      expect(result.saltRounds).toBe(saltRounds);
    });

    it('should use custom encryption algorithm', () => {
      const password = 'testPassword123';
      const result = Hasher.hashSync(password, 10, 'sha512');
      
      expect(result.hashedPassword).toBeDefined();
      expect(result.hashedPassword).toHaveLength(128);
    });

    it('should generate different hashes for same password', () => {
      const password = 'testPassword123';
      const result1 = Hasher.hashSync(password);
      const result2 = Hasher.hashSync(password);
      
      expect(result1.hashedPassword).not.toBe(result2.hashedPassword);
      expect(result1.salt).not.toBe(result2.salt);
    });
  });

  describe('compare', () => {
    it('should compare a correct password asynchronously', async () => {
      const password = 'testPassword123';
      const hashedResult = await Hasher.hash(password);
      const isValid = await Hasher.compare({
        password,
        hashedPassword: hashedResult.hashedPassword,
        salt: hashedResult.salt,
        saltRounds: hashedResult.saltRounds
      });
      
      expect(isValid).toBe(true);
    });

    it('should reject an incorrect password asynchronously', async () => {
      const password = 'testPassword123';
      const wrongPassword = 'wrongPassword123';
      const hashedResult = await Hasher.hash(password);
      const isValid = await Hasher.compare({
        password: wrongPassword,
        hashedPassword: hashedResult.hashedPassword,
        salt: hashedResult.salt,
        saltRounds: hashedResult.saltRounds
      });
      
      expect(isValid).toBe(false);
    });
  });

  describe('compareSync', () => {
    it('should compare a correct password synchronously', () => {
      const password = 'testPassword123';
      const hashedResult = Hasher.hashSync(password);
      const isValid = Hasher.compareSync({
        password,
        hashedPassword: hashedResult.hashedPassword,
        salt: hashedResult.salt,
        saltRounds: hashedResult.saltRounds
      });
      
      expect(isValid).toBe(true);
    });

    it('should reject an incorrect password synchronously', () => {
      const password = 'testPassword123';
      const wrongPassword = 'wrongPassword123';
      const hashedResult = Hasher.hashSync(password);
      const isValid = Hasher.compareSync({
        password: wrongPassword,
        hashedPassword: hashedResult.hashedPassword,
        salt: hashedResult.salt,
        saltRounds: hashedResult.saltRounds
      });
      
      expect(isValid).toBe(false);
    });
  });

  describe('generateHashedPassword', () => {
    it('should generate and hash a password asynchronously', async () => {
      const result = await Hasher.generateHashedPassword({
        characterLength: 12,
        useNumbers: true,
        useSymbols: true,
        useLowercase: true,
        useUppercase: true,
        saltRounds: 10
      });

      expect(result.password).toBeDefined();
      expect(result.hashedPassword).toBeDefined();
      expect(result.salt).toBeDefined();
      expect(result.password).toHaveLength(12);
      expect(result.hashedPassword).toHaveLength(128);
      expect(result.salt).toHaveLength(32);

      const isValid = await Hasher.compare({
        password: result.password,
        hashedPassword: result.hashedPassword,
        salt: result.salt,
        saltRounds: result.saltRounds
      });
      expect(isValid).toBe(true);
    });
  });

  describe('generateHashedPasswordSync', () => {
    it('should generate and hash a password synchronously', () => {
      const result = Hasher.generateHashedPasswordSync({
        characterLength: 12,
        useNumbers: true,
        useSymbols: true,
        useLowercase: true,
        useUppercase: true,
        saltRounds: 10
      });

      expect(result.password).toBeDefined();
      expect(result.hashedPassword).toBeDefined();
      expect(result.salt).toBeDefined();
      expect(result.password).toHaveLength(12);
      expect(result.hashedPassword).toHaveLength(128);
      expect(result.salt).toHaveLength(32);

      const isValid = Hasher.compareSync({
        password: result.password,
        hashedPassword: result.hashedPassword,
        salt: result.salt,
        saltRounds: result.saltRounds
      });
      expect(isValid).toBe(true);
    });
  });
});
