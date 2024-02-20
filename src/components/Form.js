import React, { useState, useEffect } from "react";
import { Radio, RadioGroup, FormControlLabel, FormControl, FormGroup, FormLabel } from "@mui/material";
import { Box, Button, Checkbox, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from "@mui/material";
import disableIncompatibleValues from "../util/disableIncompatibleValues";

// Style
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function Form(props) {
  const { onFormSubmission } = props;
  const { collectValuesFromForm } = props;
  // Try putting these values inherently in the Form component rather than parent
  const consonantCharList = ["B", "L", "R", "V"];
  // const vowelCharList = ["A", "E", "I", "U", "\u026A", "\u00E6"];
  const arrayOfRowsToDisplay = ["(make a selection)", "1", "2", "3", "4"];

  const vowelCharList = [
    {
      char: "A",
      disabled: false,
      isSelected: false,
    },
    {
      char: "E",
      disabled: false,
      isSelected: false,
    },
    {
      char: "I",
      disabled: false,
      isSelected: false,
    },
    {
      char: "Y",
      disabled: false,
      isSelected: false,
    },
  ];

  // in this list vowelCharList, for each VOWEL,
  // Do stuff with vowel.char
  // Look at vowel.disabled
  // look at vowel.isSelected

  const [vowelCharListState, setVowelCharListState] = useState(vowelCharList);

  // Which is selected, consonants or vowels?
  const [charCategory, setCharCategory] = useState("consonant-pairs-expt");
  // Decides what characters to show to user in dropdown select.
  const [dropDown1Options, setDropDown1Options] = useState(consonantCharList);
  // Grabs values user selected
  const [userSelectedChars, setUserSelectedChars] = useState([]);
  // How many pairs should be shown in results tree?
  const [numRowsToShow, setNumRowsToShow] = useState("(make a selection)");

  useEffect(() => {
    console.log("Form, charCategory: ", charCategory);
    console.log("Form, userSelectedChars: ", userSelectedChars);
    console.log("Form, numRowsToShow: ", numRowsToShow);
  }, []);

  // Function sending information back to Control
  // function onFormSubmission(event) {
  //   event.preventDefault();

  //   const collectedValues = {
  //     charCategory,
  //     userSelectedChars,
  //     numRowsToShow,
  //   };
  //   collectValuesFromForm(collectedValues);
  //   gatherAndFilterResults();
  // }

  useEffect(() => {
    // Sets dropdown select options -- Does this if charCategory changes
    if (charCategory === "consonant-pairs-expt") {
      // console.log("Form, charCategory changed, drop down -> should be consonantCharList: ", charCategory);
      setDropDown1Options(consonantCharList);
      setUserSelectedChars([]);
      setNumRowsToShow("(make a selection)");
    } else {
      // console.log("Form, charCategory changed, drop down -> should be vowelCharList: ", charCategory);
      setDropDown1Options(vowelCharList);
      setUserSelectedChars([]);
      setNumRowsToShow("(make a selection)");
    }
  }, [charCategory]);

  // useEffect(() => {
  //   gatherAndFilterResults();
  // }, [charCategory, userSelectedChars, numRowsToShow]);

  const handleDropDownChange = (event) => {
    const {
      target: { value },
    } = event;
    // console.log("Form, handleDropDownChange, value: ", value);
    const copiedVowelListState = [...vowelCharListState];
    let newVowelListState = null;
    console.log("Form, handleDropDownChange, event.target.value", event.target.value);
    // handles changing "isSelected" state from false / true
    newVowelListState = copiedVowelListState.map((vowel) => {
      if (vowel.char === event.target.value[0] && !vowel.disabled) {
        return {
          ...vowel,
          isSelected: !vowel.isSelected,
        };
      } else {
        return vowel;
      }
    });
    // newVowelListState = [
    // {
    //   char: "A",
    //   disabled: false,
    //   isSelected: false,
    // },
    // {
    //   char: "E",
    //   disabled: false,
    //   isSelected: false,
    // },
    // {
    //   char: "I",
    //   disabled: false,
    //   isSelected: true,
    // },
    // {
    //   char: "Y",
    //   disabled: false,
    //   isSelected: false,
    // },
    // ]

    // counts how many characters are currently selected by user
    const countSelectedChars = newVowelListState.filter((entry) => entry.isSelected).length;
    console.log("handleDropDownChange, countSelectedChars: ", countSelectedChars);
    // countSelectedChars = 1;

    if (countSelectedChars >= 2) {
      const updatedVowelListState = newVowelListState.map((vowel) => {
        if (vowel.isSelected) {
          return vowel;
        } else {
          return {
            ...vowel,
            disabled: true,
          };
        }
      });
      console.log("updatedVowelListState with all values disabled: ", updatedVowelListState);
      setVowelCharListState(updatedVowelListState);
    } else {
      const updatedVowelListState = newVowelListState.map((vowel) => {
        if (vowel.isSelected) {
          return vowel;
        } else {
          return {
            ...vowel,
            disabled: false,
          };
        }
      });
      // First, reenable everything.
      // if isSelected, leave it alone.
      // if !isSelected, enable it. --> disabled: false
      // Second, pass this array in to disabledIncompatibleValues.
      // Third, the result is now displayed to user.
      const disabledCharacterList = disableIncompatibleValues(updatedVowelListState);
      console.log("less than 2 chars selected, character list: ", disabledCharacterList);
      // if it is not in disabledVowelList, AND it is not currently selected, enable it.
      // disabledVowelList = [
      //   {
      //     char: "A",
      //     disabled: false,
      //     isSelected: true,
      //   },
      //   {
      //     char: "E",
      //     disabled: false,
      //     isSelected: false,
      //   },
      //   {
      //     char: "I",
      //     disabled: true,
      //     isSelected: false,
      //   },
      //   {
      //     char: "Y",
      //     disabled: true,
      //     isSelected: false,
      //   },
      // ];
      setVowelCharListState(disabledCharacterList);
    }
    // setUserSelectedChars(typeof value === "string" ? value.split(",") : value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const collectedValues = {
      charCategory,
      userSelectedChars,
      numRowsToShow,
    };
    onFormSubmission(collectedValues);
  };

  return (
    <>
      <h2>Form</h2>
      <Box component="form" onSubmit={handleSubmit}>
        <FormControl sx={{ m: 1, width: 300 }}>
          <FormLabel>Category</FormLabel>
          <RadioGroup row value={charCategory} onChange={(event) => setCharCategory(event.target.value)}>
            <FormControlLabel value="consonant-pairs-expt" control={<Radio />} label="Consonants" />
            <FormControlLabel value="vowel-diphthong-pairs-expt" control={<Radio />} label="Vowels" />
          </RadioGroup>
          <br />
          {/* <InputLabel id="multiple-checkbox-label">Characters</InputLabel> */}
          <Select
            labelId="multiple-checkbox-label"
            id="multiple-checkbox-label"
            multiple
            value={userSelectedChars}
            onChange={handleDropDownChange}
            input={<OutlinedInput label="Characters" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {vowelCharListState.map((vowel) => (
              <MenuItem key={vowel.char} value={vowel.char} disabled={vowel.disabled}>
                <Checkbox checked={vowel.isSelected} />
                <ListItemText primary={vowel.char} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <InputLabel>Select the number of rows you'd like to view</InputLabel>
        <FormControl sx={{ m: 1, width: 300 }}>
          <Select
            defaultValue={"(make a selection)"}
            value={numRowsToShow}
            label="Number of rows"
            onChange={(event) => setNumRowsToShow(event.target.value)}
          >
            {arrayOfRowsToDisplay.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <br />
        <Button type="submit" variant="contained" sx={{ m: 1, width: 300 }}>
          Submit
        </Button>
      </Box>
    </>
  );
}
