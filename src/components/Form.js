import React, { useState, useEffect } from "react";
import { Radio, RadioGroup, FormControlLabel, FormControl, FormGroup, FormLabel } from "@mui/material";
import { Box, Button, Checkbox, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from "@mui/material";

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
  const { collectValuesFromForm, gatherAndFilterResults } = props;
  // Try putting these values inherently in the Form component rather than parent
  const consonantCharList = ["B", "L", "R", "V"];
  const vowelCharList = ["A", "E", "I", "U", "\u026A"];
  const arrayOfRowsToDisplay = ["(make a selection)", "1", "2", "3", "4"];

  // Which is selected, consonants or vowels?
  const [charCategory, setCharCategory] = useState("consonant-pairs-expt");
  // Decides what characters to show to user in dropdown select.
  const [dropDown1Options, setDropDown1Options] = useState(consonantCharList);
  // Grabs values user selected
  const [userSelectedChars, setUserSelectedChars] = useState([]);
  // How many pairs should be shown in results tree?
  const [numRowsToShow, setNumRowsToShow] = useState("(make a selection)");

  // Function sending information back to Control
  function onFormSubmission(event) {
    event.preventDefault();
    console.log("onFormSubmission, form has been submitted");
    console.log("onFormSubmission, charCategory: ", charCategory);
    console.log("onFormSubmission, userSelectedChars: ", userSelectedChars);
    console.log("onFormSubmission, numRowsToShow: ", numRowsToShow);

    collectValuesFromForm(charCategory, userSelectedChars, numRowsToShow);
    gatherAndFilterResults();
  }

  useEffect(() => {
    // Sets dropdown select options -- Does this if charCategory changes
    if (charCategory === "consonant-pairs-expt") {
      console.log("Form, charCategory changed, drop down -> should be consonantCharList: ", charCategory);
      setDropDown1Options(consonantCharList);
      setUserSelectedChars([]);
      setNumRowsToShow("(make a selection)");
    } else {
      console.log("Form, charCategory changed, drop down -> should be vowelCharList: ", charCategory);
      setDropDown1Options(vowelCharList);
      setUserSelectedChars([]);
      setNumRowsToShow("(make a selection)");
    }
  }, [charCategory]);

  const handleDropDownChange = (event) => {
    const {
      target: { value },
    } = event;
    console.log("Form, handleDropDownChange, value: ", value);
    setUserSelectedChars(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <>
      <h2>Form</h2>
      <Box component="form" onSubmit={onFormSubmission}>
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
            {dropDown1Options.map((char) => (
              <MenuItem key={char} value={char}>
                <Checkbox checked={userSelectedChars.indexOf(char) > -1} />
                <ListItemText primary={char} />
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

// import React, { useState } from "react";
// import Box from "@mui/material/Box";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import Button from "@mui/material/Button";

// function DropDownForm(props) {
//   const { handleSaveFormValue } = props;
//   const [age, setAge] = useState("");

//   const handleChange = (e) => {
//     setAge(e.target.value);
//   };

//   function handleSubmit(e) {
//     e.preventDefault();
//     console.log("handleSubmit triggered");
//     handleSaveFormValue(age);
//   }

//   return (
//     <>
//       <h2>Drop Down Form</h2>
//       <Box sx={{ minWidth: 120 }} component="form" onSubmit={handleSubmit}>
//         <FormControl fullWidth>
//           <InputLabel id="demo-simple-select-label">Age</InputLabel>
//           <Select labelId="demo-simple-select-label" id="demo-simple-select" value={age} label="Age" onChange={handleChange}>
//             <MenuItem value={10}>Ten</MenuItem>
//             <MenuItem value={20}>Twenty</MenuItem>
//             <MenuItem value={30}>Thirty</MenuItem>
//           </Select>
//         </FormControl>
//         <Button type="submit" variant="contained">
//           Submit
//         </Button>
//       </Box>
//     </>
//   );
// }

// export default DropDownForm;

// useEffect(() => {
//   console.log("handleChange", age);
// }, [age]);
