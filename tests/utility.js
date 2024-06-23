const SPECIAL_CHAR_REGEX = /^[^a-zA-Z0-9]+$/;
const NUMBER_REGEX = /\D/;
const ALPHABET_REGEX = /^[a-zA-Z]+$/;

export const isANumber = (value) => {
  return !NUMBER_REGEX.test(value);
};

export const isOnlySpecialCharacters = (value) => {
  return SPECIAL_CHAR_REGEX.test(value);
};

export const isLowercase = (value) => {
  return value === String(value).toLowerCase();
};

export const isUppercase = (value) => {
  return value === String(value).toUpperCase();
};

export const isAlphabet = (value) => {
  return ALPHABET_REGEX.test(value);
};
