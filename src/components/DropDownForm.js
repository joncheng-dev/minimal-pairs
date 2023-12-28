import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

function DropDownForm(props) {
  const { handleSaveFormValue } = props;
  const [age, setAge] = useState("");

  const handleChange = (e) => {
    setAge(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    console.log("handleSubmit triggered");
    handleSaveFormValue(age);
  }

  return (
    <>
      <h2>Drop Down Form</h2>
      <Box sx={{ minWidth: 120 }} component="form" onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" value={age} label="Age" onChange={handleChange}>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
    </>
  );
}

export default DropDownForm;

// useEffect(() => {
//   console.log("handleChange", age);
// }, [age]);
