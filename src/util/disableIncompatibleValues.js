// const vowelListDictionary = {
//   A: {
//     incompatibleCharacters: ["E"],
//   },
//   E: {
//     incompatibleCharacters: ["cons"],
//   },
//   cons: {
//     incompatibleCharacters: ["E"],
//   },
//   // null: {
//   //   incompatibleCharacters: ["E", "cons"],
//   // },
//   // Y: {
//   //   incompatibleCharacters: ["A"],
//   // },
// };

// After having 2 vowels selected, all remaining options are disabled
// Upon unchecking any selections, we expect all options to be re-enabled
// (except for characters incompatible with the current selection)
// Bug: "I" remains disabled on this action

// function disableIncompatibleValues(vowelList) {
//   // vowelList = [
//   //   {
//   //     char: "cons",
//   //     disabled: false,
//   //     isSelected: true,
//   //   },
//   //   {
//   //     char: "E",
//   //     disabled: false,
//   //     isSelected: false,
//   //   },
//   //   {
//   //     char: "A",
//   //     disabled: false,
//   //     isSelected: false,
//   //   },
//   // ];
//   const disabledVowelList = vowelList.map((vowel) => {
//     // disabledVowelList = [

//     // ]

//     // const vowelListDictionary = {
//     //   A: {
//     //     incompatibleCharacters: ["E"],
//     //   },
//     //   E: {
//     //     incompatibleCharacters: ["cons"],
//     //   },
//     //   cons: {
//     //     incompatibleCharacters: ["E"],
//     //   },
//     // };
//     const charDefinition = vowelListDictionary[vowel.char];
//     // charDefinition =
//     //   {
//     //     incompatibleCharacters: ["E"],
//     //   },

//     // console.log("disableIncompatibleValues, charDefinition: ", charDefinition);
//     if (charDefinition === undefined) {
//       // console.log("disableIncompatibleValues, charDefinition is undefined: ", charDefinition);
//       return vowel;
//     }

//     // BUG: When mulitple incompatible characters are compared. Will cause an issue when
//     // isSelected = false is done at a later stage
//     let updatedVowel;
//     // charDefinition =
//     //   {
//     //     incompatibleCharacters: ["E", "null"],
//     //   },
//     charDefinition.incompatibleCharacters.forEach((incompatibleCharacter) => {
//       // vowelList = [
//       //   {
//       //     char: "cons",
//       //     disabled: false,
//       //     isSelected: true,
//       //   },
//       //   {
//       //     char: "E",
//       //     disabled: false,
//       //     isSelected: false,
//       //   },
//       //   {
//       //     char: "A",
//       //     disabled: false,
//       //     isSelected: false,
//       //   },
//       // ];
//       const dependant = vowelList.find((entry) => entry.char === incompatibleCharacter);
//       // dependent =
//       //   {
//       //     char: "E",
//       //     disabled: false,
//       //     isSelected: false,
//       //   },
//       if (dependant.isSelected) {
//         updatedVowel = {
//           ...vowel,
//           disabled: true,
//         };
//       } else {
//         updatedVowel = {
//           ...vowel,
//           disabled: false,
//         };
//       }
//     });

//     return updatedVowel;
//   });

//   return disabledVowelList;
// }

// export default disableIncompatibleValues;

const phonemeDictionary = {
  A: {
    incompatibleCharacters: ["E"],
  },
  E: {
    incompatibleCharacters: ["cons"],
  },
  cons: {
    incompatibleCharacters: ["E"],
  },
};

export default function disableIncompatibleValues(characterList) {
  let modifiedCharList = [...characterList];
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
  // Return modifiedCharList.
  return modifiedCharList;
}

// export default function disableIncompatibleValues(characterList) {
//   let disabledCharList = [...characterList];
//   disabledCharList = characterList.map((phoneme) => {
//     const phonemeCompatibility = phonemeDictionary[phoneme.char];
//     // phonemeCompatibility = {
//     //   incompatibleCharacters: ["E"],
//     // }
//     if (phonemeCompatibility === undefined) {
//       return phoneme;
//     }

//     let updatedPhoneme;

//     phonemeCompatibility.incompatibleCharacters.forEach((incompatibleCharacter) => {
//       // phonemeCompatibility.incompatibleCharacters = ["E", "null"];
//       // incompatibleCharacter = "E"
//       const dependant = characterList.find((entry) => entry.char === incompatibleCharacter);
//       // characterList is available characters for the dropdown select input.
//       // dependant = {
//       //  char: "E",
//       //  disabled: true,
//       //  isSelected: false,
//       // }
//       if (dependant.isSelected === false) {
//         // What purpose does this if/else decision tree serve?
//         // This is to disable an option IF current phoneme is not compatible with it
//         updatedPhoneme = {
//           ...dependant,
//           disabled: true,
//         };
//       } else {
//         updatedPhoneme = {
//           ...dependant,
//           disabled: false,
//         };
//       }
//       return updatedPhoneme;
//     });
//   });
//   console.log("disabledIncompatibleValues, disabledCharList: ", disabledCharList);
//   return disabledCharList;
// }

// export default function disableIncompatibleValues(characterList) {
//   // This function returns a modified version of the characterList passed in.
//   // It updates phonemes to disabled (or not) depending on the current selected phonemes.
//   let disabledCharList = [...characterList];
//   disabledCharList = characterList.map((phoneme) => {
//     // phoneme
//     //   {
//     //     char: "A",
//     //     disabled: false,
//     //     isSelected: false,
//     //   },
//     const phonemeCompatibility = phonemeDictionary[phoneme.char];
//     // phonemeCompatibility = {
//     //   incompatibleCharacters: ["E"],
//     // }
//     if (phonemeCompatibility === undefined) {
//       //   {
//       //     char: "I",
//       //     disabled: false,
//       //     isSelected: true,
//       //   },
//       // In this example, the character "I" does not have any incompatible characters.
//       // The phoneme entry is returned without modification.
//       return phoneme;
//     }

//     let updatedPhoneme;

//     phonemeCompatibility.incompatibleCharacters.forEach((incompatibleCharacter) => {
//       // phonemeCompatibility.incompatibleCharacters = ["E"];
//       // incompatibleCharacter = "E"
//       const dependant = characterList.find((entry) => entry.char === incompatibleCharacter);
//       // characterList is available characters for the dropdown select input.
//       // dependant = {
//       //  char: "E",
//       //  disabled: true,
//       //  isSelected: false,
//       // }
//       if (dependant.isSelected === false) {
//         // What purpose does this if/else decision tree serve?
//         // This is to disable an option IF current phoneme is not compatible with it
//         updatedPhoneme = {
//           ...dependant,
//           disabled: true,
//         };
//       } else {
//         updatedPhoneme = {
//           ...dependant,
//           disabled: false,
//         };
//       }
//       return updatedPhoneme;
//     });
//   });
//   console.log("disabledIncompatibleValues, disabledCharList: ", disabledCharList);
//   return disabledCharList;
// }
