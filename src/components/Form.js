import React, { useState, useEffect } from "react";

function Form(props) {
  const { dropDown1Options, collectValuesFromForm } = props;
  const [value1, setValue1] = useState(null);
  const [value2, setValue2] = useState(null);
  const [dropDown2Visible, setDropDown2Visible] = useState(false);
  const [dropDown2Options, setDropDown2Options] = useState(dropDown1Options);

  useEffect(() => {
    console.log("value 1 has been selected: ", value1);
    const filteredOptions = dropDown1Options.filter((entries) => entries !== value1);
    setDropDown2Options(filteredOptions);
    if (value1 !== null) {
      setDropDown2Visible(true);
    }
  }, [value1]);

  function onFormSubmission(event) {
    event.preventDefault();
    collectValuesFromForm(value1, value2);
  }

  return (
    <>
      <h2>Form</h2>
      <form onSubmit={onFormSubmission}>
        {/* First Dropdown Menu */}
        <select onChange={(event) => setValue1(event.target.value)}>
          {dropDown1Options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        {/* Second Dropdown Menu */}
        {dropDown2Visible && (
          <select onChange={(event) => setValue2(event.target.value)}>
            {dropDown2Options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}
        <button type="submit">Submit Selection</button>
      </form>
    </>
  );
}

export default Form;

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
