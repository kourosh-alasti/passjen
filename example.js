import generator from "./main";

const password = generator.generate({
  characterLength: 20, // default is 6
  useNumbers: true, // default is false
  useSymbols: true, // default is false
  useLowercaseLetters: true, // default is false
  useUppercaseLetters: true, // default is false
  excludeSimilarCharacters: true, // default is false
  excludeTheseCharacters: "a", // default is ""
  strictCharacters: true, // default is false
});

const passwords = generator.generateMultiple({
  count: 10,
  characterLength: 10, // default is 6
  useNumbers: true, // default is false
  useSymbols: true, // default is false
  useLowercaseLetters: true, // default is false
  strictCharacters: true, // default is false
});
