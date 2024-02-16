const vowelListDictionary = {
  A: {
    incompatibleCharacters: ["Y"],
  },
  Y: {
    incompatibleCharacters: ["A"],
  },
};

function disableIncompatibleValues(vowelList) {
  const disabledVowelList = vowelList.map((vowel) => {
    const charDefinition = vowelListDictionary[vowel.char];
    if (charDefinition === undefined) return vowel;

    // BUG: When mulitple incompatible characters are compared and an incompatible character when
    // isSelected = false is compared at a later stage
    let updatedVowel;

    charDefinition.incompatibleCharacters.forEach((incompatibleCharacter) => {
      const dependant = vowelList.find((vowel) => vowel.char === incompatibleCharacter);

      if (dependant.isSelected) {
        updatedVowel = {
          ...vowel,
          disabled: true,
        };
      } else {
        updatedVowel = {
          ...vowel,
          disabled: false,
        };
      }
    });

    return updatedVowel;
  });

  return disabledVowelList;
}

export default disableIncompatibleValues;
