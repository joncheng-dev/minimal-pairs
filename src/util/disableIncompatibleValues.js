const vowelListDictionary = {
  A: {
    incompatibleCharacters: ["Y"],
  },
  Y: {
    incompatibleCharacters: ["A"],
  },
};

// After having 2 vowels selected, all remaining options are disabled
// Upon unchecking any selections, we expect all options to be re-enabled
// (except for characters incompatible with the current selection)
// Bug: "I" remains disabled on this action

function disableIncompatibleValues(vowelList) {
  // console.log("disableIncompatibleValues, vowelList: ", vowelList);
  // references dictionary to make a list of vowels that are disabled because of this selection
  const disabledVowelList = vowelList.map((vowel) => {
    const charDefinition = vowelListDictionary[vowel.char];
    // console.log("disableIncompatibleValues, charDefinition: ", charDefinition);
    if (charDefinition === undefined) {
      // console.log("disableIncompatibleValues, charDefinition is undefined: ", charDefinition);
      return vowel;
    }

    // BUG: When mulitple incompatible characters are compared. Will cause an issue when
    // isSelected = false is done at a later stage
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
