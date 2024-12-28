import React, { useState, useEffect } from "react";
import { FormControlLabel, FormControl, Grid, Typography } from "@mui/material";
import {
  Box,
  Button,
  Checkbox,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Switch,
  Tooltip,
} from "@mui/material";
import disableIncompatibleValues from "../util/disableIncompatibleValues";
import { consonantCharList, vowelCharList } from "../data/characterLists";
import { alpha, styled } from "@mui/material/styles";
import { pink, blue } from "@mui/material/colors";
import BasicModal from "./BasicModal";

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

const PinkSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: pink[600],
    "&:hover": {
      backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: blue[600], // Choose the color here
  },
  "& .MuiSwitch-switchBase": {
    color: blue[600], // Color of the switch when it's off
  },
  "& .MuiSwitch-switchBase.Mui-disabled + .MuiSwitch-track": {
    backgroundColor: alpha(blue[600], 0.4), // Adjust opacity for disabled track when switch is off
  },
}));


export default function Form(props) {
  const { onFormSubmission, setNotificationOpen } = props;
  // Try putting these values inherently in the Form component rather than parent
  const arrayOfRowsToDisplay = ["(make a selection)", "1", "2", "3", "4"];

  const [charListState, setCharListState] = useState(vowelCharList);
  // Which is selected, consonants or vowels?
  const [charCategory, setCharCategory] = useState("consonants");
  // Grabs values user selected
  const [userSelectedChars, setUserSelectedChars] = useState([]);
  // How many pairs should be shown in results tree?
  const [numRowsToShow, setNumRowsToShow] = useState("(make a selection)");

  useEffect(() => {
    // Sets dropdown select options -- Does this if charCategory changes
    if (charCategory === "consonants") {
      // console.log("Form, charCategory changed, drop down -> should be consonantCharList: ", charCategory);
      setCharListState(consonantCharList);
      setUserSelectedChars([]);
      setNumRowsToShow("(make a selection)");
    } else {
      // console.log("Form, charCategory changed, drop down -> should be vowelCharList: ", charCategory);
      setCharListState(vowelCharList);
      setUserSelectedChars([]);
      setNumRowsToShow("(make a selection)");
    }
  }, [charCategory]);

  const handleDropDownChange = (event) => {
    const copiedCharListState = [...charListState];
    let characterListState = null;
    // console.log("Form, handleDropDownChange, event.target.value", event.target.value);
    // handles changing "isSelected" state from false / true
    characterListState = copiedCharListState.map((phoneme) => {
      if (phoneme.char === event.target.value[0] && !phoneme.disabled) {
        return {
          ...phoneme,
          isSelected: !phoneme.isSelected,
        };
      } else {
        return phoneme;
      }
    });
    // counts how many characters are currently selected by user
    const countSelectedChars = characterListState.filter((entry) => entry.isSelected).length;

    if (countSelectedChars >= 2) {
      const updatedCharListState = characterListState.map((phoneme) => {
        if (phoneme.isSelected) {
          return phoneme;
        } else {
          return {
            ...phoneme,
            disabled: true,
          };
        }
      });
      // console.log("2 boxes checked, all remaining boxes disabled: ", updatedCharListState);
      setCharListState(updatedCharListState);
    } else if (countSelectedChars === 1) {
      const updatedCharListState = characterListState.map((phoneme) => {
        if (phoneme.isSelected) {
          return phoneme;
        } else {
          return {
            ...phoneme,
            disabled: false,
          };
        }
      });
      // console.log("1 box checked, before incompatible values filtered: ", updatedCharListState);
      const disabledCharacterList = disableIncompatibleValues(updatedCharListState, charCategory);
      // console.log("1 box checked, after incompatible values filtered: ", disabledCharacterList);

      setCharListState(disabledCharacterList);
    } else {
      const updatedCharListState = characterListState.map((vowel) => {
        return {
          ...vowel,
          disabled: false,
        };
      });
      // console.log("0 boxes checked, all characters should be enabled: ", updatedCharListState);
      setCharListState(updatedCharListState);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const selectedChars = charListState
      //prettier-ignore
      .filter((phoneme) => phoneme.isSelected)
      .map((phoneme) => phoneme.char);

    // console.log("selectedChars.length: ", selectedChars.length);
    // console.log("numRowsToShow: ", numRowsToShow);

    const collectedValues = {
      charCategory,
      selectedChars,
      // userSelectedChars,
      numRowsToShow,
    };
    if (selectedChars.length === 1 && numRowsToShow !== "(make a selection)") {
      setNotificationOpen({
        open: true,
        message: "You've selected one phoneme. Please select two before submitting.",
        color: "#3499e8",
      });
    } else if (selectedChars.length !== 2 || numRowsToShow === "(make a selection)") {
      setNotificationOpen({
        open: true,
        message: "Please complete the form before submitting.",
        color: "#3499e8",
      });
    } else if (selectedChars.length === 2 && numRowsToShow !== "(make a selection)") {
      onFormSubmission(collectedValues);
    } else {
      setNotificationOpen({
        open: true,
        message: "Error.",
        color: "#3499e8",
      });
    }
  };

  const phonemeToolTipText = "Select two phonemes from the dropdown menu.";
  const rowsToolTipText = "Select the number of rows you'd like to view.";

  return (
    <>
      <Grid container mt={2} mb={2} display="flex">
        <Grid item>
          <Typography variant="h5">Minimal Pairs</Typography>
        </Grid>
        <Grid item alignItems="flex-start">
          <BasicModal />
        </Grid>
      </Grid>
      <Box component="form" onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
        <FormControl sx={{ m: 1, width: 300 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography style={{ flexGrow: 1, textAlign: "right" }}>Consonants</Typography>
            <FormControlLabel
              control={
                <PinkSwitch
                  checked={charCategory === "vowels"}
                  onChange={() => setCharCategory((prevCategory) => (prevCategory === "consonants" ? "vowels" : "consonants"))}
                />
              }
            />
            <Typography style={{ flexGrow: 1 }}>Vowels</Typography>
          </Stack>
          <br />
          <br />
          <div style={{ width: "fit-content", marginLeft: -8 }}>
            <Tooltip
              title={phonemeToolTipText}
              placement="right"
              PopperProps={{
                disablePortal: true,
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, -5], // Adjust the offset as needed
                    },
                  },
                ],
              }}
            >
              <Button sx={{ "&:hover": { backgroundColor: "transparent", cursor: "pointer" } }} disableRipple>
                Phonemes
              </Button>
            </Tooltip>
          </div>
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
            {charListState.map((phoneme) => (
              <MenuItem key={phoneme.char} value={phoneme.char} disabled={phoneme.disabled}>
                <Checkbox checked={phoneme.isSelected} />
                <ListItemText primary={phoneme.char} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <Tooltip
          title={rowsToolTipText}
          placement="right"
          PopperProps={{
            disablePortal: true,
            modifiers: [
              {
                name: "offset",
                options: {
                  // offset: [-2, -245], // Adjust the offset as needed
                },
              },
            ],
          }}
        >
          <Button ml={1} sx={{ "&:hover": { backgroundColor: "transparent", cursor: "pointer" } }} disableRipple>
            Rows
          </Button>
        </Tooltip>

        <FormControl sx={{ m: 1, width: 300 }}>
          <Select
            defaultValue={"(make a selection)"}
            value={numRowsToShow}
            label="Number of rows"
            data-testid="num-rows-selector"
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
