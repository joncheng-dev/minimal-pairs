const phonemeDictionary = {
  // vowels & diphthongs start here
  i: {
    incompatibleCharacters: [],
  },
  "\u026A": {
    //ɪ
    incompatibleCharacters: [],
  },
  e: {
    incompatibleCharacters: ["cons", "null"],
  },
  "\u00E6": {
    //æ
    incompatibleCharacters: ["cons"],
  },
  "\u0251": {
    //ɑ
    incompatibleCharacters: ["cons"],
  },
  "\u0252": {
    //ɒ
    incompatibleCharacters: ["cons"],
  },
  "\u0254": {
    //ɔ
    incompatibleCharacters: ["cons"],
  },
  "\u028A": {
    //ʊ
    incompatibleCharacters: ["cons", "null"],
  },
  u: {
    incompatibleCharacters: ["cons", "null"],
  },
  "\u028C": {
    //ʌ
    incompatibleCharacters: ["cons", "null"],
  },
  "\u025C": {
    //3
    incompatibleCharacters: ["cons", "null"],
  },
  "\u0259": {
    //ə
    incompatibleCharacters: ["cons", "null"],
  },
  "\u0065\u026A": {
    //eɪ
    incompatibleCharacters: ["cons", "null"],
  },
  "a\u026A": {
    //aɪ
    incompatibleCharacters: ["cons", "null"],
  },
  "\u0254\u026A": {
    //ɔɪ
    incompatibleCharacters: ["cons"],
  },
  "\u0259\u028A": {
    //əʊ
    incompatibleCharacters: [],
  },
  "a\u028A": {
    //aʊ
    incompatibleCharacters: ["null"],
  },
  "\u026A\u0259": {
    //ɪə
    incompatibleCharacters: ["null"],
  },
  "e\u0259": {
    //eə
    incompatibleCharacters: ["null"],
  },
  "\u028A\u0259": {
    //ʊə
    incompatibleCharacters: ["null"],
  },
  cons: {
    incompatibleCharacters: [
      "e",
      "\u00E6", // æ
      "a",
      "\u0252", // ɒ
      "\u0254", // ɔ
      "\u028A", // ʊ
      "u",
      "\u028C", // ʌ
      "\u025C", // 3
      "\u0259", // ə
      "\u0065\u026A", // eɪ
      "a\u026A", // aɪ
      "\u0254\u026A", // ɔɪ
      "a\u028A", // aʊ
      "\u026A\u0259", // ɪə
      "e\u0259", // eə
      "\u028A\u0259", //ʊə
      "null",
    ],
  },
  null: {
    incompatibleCharacters: [
      "e",
      "\u028A", // ʊ
      "u",
      "\u028C", // ʌ
      "\u025C", // 3
      "\u0259", // ə
      "\u0065\u026A", // eɪ
      "a\u026A", // aɪ
      "cons",
    ],
  },
  //consonants starts here
  p: {
    incompatibleCharacters: [],
  },
  b: {
    incompatibleCharacters: ["vowel"],
  },
  t: {
    incompatibleCharacters: ["vowel", "null"],
  },
  d: {
    incompatibleCharacters: ["vowel", "null"],
  },
  k: {
    incompatibleCharacters: ["vowel", "null"],
  },
  g: {
    incompatibleCharacters: ["vowel", "null"],
  },
  f: {
    incompatibleCharacters: ["vowel", "null"],
  },
  v: {
    incompatibleCharacters: ["vowel", "null"],
  },
  "\u03B8": {
    incompatibleCharacters: ["vowel"],
  },
  "\u00F0": {
    incompatibleCharacters: ["vowel"],
  },
  s: {
    incompatibleCharacters: ["vowel", "null"],
  },
  z: {
    incompatibleCharacters: ["vowel", "null"],
  },
  "\u0283": {
    incompatibleCharacters: ["vowel", "null"],
  },
  "\u0292": {
    incompatibleCharacters: [],
  },
  h: {
    incompatibleCharacters: ["vowel"],
  },
  m: {
    incompatibleCharacters: ["vowel", "null"],
  },
  n: {
    incompatibleCharacters: ["vowel"],
  },
  "\u03B7": {
    incompatibleCharacters: [],
  },
  l: {
    incompatibleCharacters: ["null"],
  },
  r: {
    incompatibleCharacters: ["vowel"],
  },
  j: {
    incompatibleCharacters: ["vowel"],
  },
  w: {
    incompatibleCharacters: ["vowel"],
  },
  "\u02A7": {
    incompatibleCharacters: ["vowel"],
  },
  "\u02A4": {
    incompatibleCharacters: ["vowel"],
  },
  null: {
    incompatibleCharacters: [
      "t",
      "d",
      "k",
      "g",
      "f",
      "v",
      "s",
      "z",
      "\u0283", // ʃ
      "m",
      "n",
      "l",
      "vowel",
    ],
  },
  vowel: {
    incompatibleCharacters: [
      "b",
      "t",
      "d",
      "k",
      "g",
      "f",
      "v",
      "\u019F", // Ɵ
      "\u00F0", // ð
      "s",
      "z",
      "\u0283", // ʃ
      "h",
      "m",
      "n",
      "\u014B", // ŋ
      "r",
      "j",
      "w",
      "\u0287", // ʧ
      "\u02A4", // ʤ
      "null",
    ],
  },
};

export default function disableIncompatibleValues(characterList) {
  let modifiedCharList = [...characterList];
  console.log("disableIncompatibleValues, modifiedCharList: ", modifiedCharList);
  // Find that one phoneme where "isSelected: true"
  const selectedPhoneme = characterList.find((phoneme) => phoneme.isSelected === true);
  //  selectedPhoneme = {
  //     char: "cons",
  //     disabled: false,
  //     isSelected: true,
  //  };
  // Check that character against the dictionary.
  const phonemeCompatibility = phonemeDictionary[selectedPhoneme.char];
  // const phonemeCompatibility = phonemeDictionary["cons"];
  // const phonemeCompatibility = {
  //   incompatibleCharacters: ["E"],
  // };
  // Disable all relevant phonemes. (update characterList as we go)
  // Look through characterList, and update all phonemes found in incompatible characters to disabled: true.
  // For each incompatibleCharacter in the phonemeCompatibility.incompatibleCharacters array: ["E"], do this:
  if (phonemeCompatibility !== undefined) {
    phonemeCompatibility.incompatibleCharacters.forEach((entry) => {
      // update modifiedCharList, at incompatibleChar's phoneme. Example:
      const targetPhoneme = characterList.find((phoneme) => phoneme.char === entry);
      // Replace modifiedCharList's phoneme E with this
      const updatedPhoneme = {
        ...targetPhoneme,
        disabled: true,
      };
      const indexToUpdate = modifiedCharList.findIndex((item) => item.char === updatedPhoneme.char);
      modifiedCharList =
        indexToUpdate !== -1
          ? [...modifiedCharList.slice(0, indexToUpdate), updatedPhoneme, ...modifiedCharList.slice(indexToUpdate + 1)]
          : modifiedCharList;
    });
  }
  // Return modifiedCharList.
  return modifiedCharList;
}
