const SPECIAL_CHAR_REGEX = /^[^a-zA-Z0-9]+$/;
const NUMBER_REGEX = /\D/;
const ALPHABET_REGEX = /^[a-zA-Z]+$/;

const isANumber = (value) => {
  return !NUMBER_REGEX.test(value);
};

const isOnlySpecialCharacters = (value) => {
  return SPECIAL_CHAR_REGEX.test(value);
};

const isLowercase = (value) => {
  return value === String(value).toLowerCase();
};

const isUppercase = (value) => {
  return value === String(value).toUpperCase();
};

const isAlphabet = (value) => {
  return ALPHABET_REGEX.test(value);
};

export {
  isANumber,
  isOnlySpecialCharacters,
  isLowercase,
  isUppercase,
  isAlphabet,
};
