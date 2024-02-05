import React, { useState, useEffect } from "react";
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from "@mui/material";
import { Checkbox, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from "@mui/material";

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
  const vowelCharList = ["A", "E", "I", "U"];
  const arrayOfRowsToDisplay = ["1", "2", "3", "4"];

  // useState
  const [queryCategory, setQueryCategory] = useState("consonant-pairs-expt");
  const [dropDown1Options, setDropDown1Options] = useState(consonantCharList);
  const [charValues, setCharValues] = useState(null);
  const [numPairsSelected, setNumPairsToShow] = useState(null);

  function onFormSubmission(event) {
    event.preventDefault();
    collectValuesFromForm(value, numPairsSelected);
    gatherAndFilterResults();
  }

  const handleCharChange = (event) => {
    setCharValues(event.target.value);
    setSelectedOption1(event.target.value);
  };

  return (
    <>
      <FormControl onSubmit={onFormSubmission} sx={{ m: 1, width: 300 }}>
        <h2>Form</h2>
        <FormLabel>Category</FormLabel>
        <RadioGroup row value={queryCategory} onChange={handleCategoryChange}>
          <FormControlLabel value="consonant-pairs-expt" control={<Radio />} label="Consonants" />
          <FormControlLabel value="vowel-diphthong-pairs-expt" control={<Radio />} label="Vowels" />
        </RadioGroup>
        <hr />
        <InputLabel>Characters</InputLabel>
        <Select
          multiple
          value={charValues}
          onChange={handleCharChange}
          input={<OutlinedInput label="Characters" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {dropDown1Options.map((char) => (
            <MenuItem key={char} value={char}>
              <Checkbox checked={charValues.indexOf(char) > -1} />
              <ListItemText primary={char} />
            </MenuItem>
          ))}
        </Select>
        <br />
        <p>Select the number of rows you'd like to view</p>
        <select defaultValue={"(make a selection)"} onChange={(event) => setNumPairsToShow(event.target.value)}>
          <option value={"(make a selection)"}>(make a selection)</option>
          {numPairsOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <br />
        <br />
        <button type="submit">Submit Selection</button>
      </FormControl>
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
