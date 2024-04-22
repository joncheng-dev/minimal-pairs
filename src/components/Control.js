import React, { useState, useEffect, useRef } from "react";
import Form from "./Form";
import { doc, getDoc } from "firebase/firestore";
import db from "./../firebase";
import Results from "./Results";
import TreeDiagram from "./TreeDiagram";
import TreeDiagramExpt from "./TreeDiagramExpt";

export default function Control() {
  // TODO expand upon this array of characters to choose from.
  // 2. Expand upon list of values
  // const vowelCharList = ["A", "E", "I", "U", "\u026A"];
  // const arrayOfRowsToDisplay = ["1", "2", "3", "4"];
  // TODO refactor to allow any numbers of pairs up to 15 pairs maximum?
  // 1 row is 1 pair of words,
  // 2 rows is 3 pairs of words,
  // 3 rows is 7 pairs of words,
  // 4 rows is 15 pairs of words
  // const [category, setCategory] = useState(null);
  // const [userQuery, setUserQuery] = useState(null);
  // const [numPairsInTree, setNumPairsInTree] = useState(null);
  const [treeDiagramName, setTreeDiagramName] = useState(null);
  const [resultsToUI, setResultsToUI] = useState(null);
  const [notEnoughPairsMessage, setNotEnoughPairsMessage] = useState(null);
  const initialRender = useRef(true);

  // Functions
  function getNumPairsInTree(numRowsToShow) {
    switch (numRowsToShow) {
      case "1":
        return 1;
      case "2":
        return 3;
      case "3":
        return 7;
      case "4":
        return 15;
      default:
        return 0;
    }
  }

  function numPairsToRows(numPairs) {
    switch (numPairs) {
      case 1:
        return 1;
      case 3:
        return 2;
      case 7:
        return 3;
      case 15:
        return 4;
      default:
        return 0;
    }
  }

  function randomPairPicker(numPairsAvailable, numPairsToSelect) {
    let randomlySelectedIds = new Set(),
      ans;
    while (randomlySelectedIds.size < numPairsToSelect) {
      randomlySelectedIds.add(Math.floor(Math.random() * numPairsAvailable));
    }
    ans = [...randomlySelectedIds];
    return ans;
  }

  // Use this to filter the document using randomized values
  function filterDocResults(document, arrayOfSelectedIds) {
    console.log("filterDocResults, document: ", document);
    console.log("filterDocResults, arrayOfSelectedIds: ", arrayOfSelectedIds);
    // const filteredResults = Object.fromEntries(Object.entries(document).filter(([key]) => convertedArray.includes(String(key))));
    const filteredResults = arrayOfSelectedIds.map((index) => document.pairs[index]);
    console.log("Control, filterDocResults, filteredResults: ", filteredResults);
    setResultsToUI(filteredResults);
  }

  // useEffect(() => {
  //   const tempDbQuery = async () => {
  //     const docRef = doc(db, "vowels", "eu");
  //     const docSnap = await getDoc(docRef);
  //     if (docSnap.exists()) {
  //       console.log("eu: ", docSnap.data());
  //       const dataKeys = docSnap.data();
  //       // console.log(dataKeys.pairs.length); // This is the number of pairs in a document.
  //       // Let's try console logging the pair at this doc, at index 1.
  //       console.log("eu, pair at Index 1, dataKeys.pairs[1]: ", dataKeys.pairs[1]);
  //       console.log("eu, pair at Index 1, firstWord, dataKeys.pairs[1].firstWord: ", dataKeys.pairs[1].firstWord);
  //       console.log("eu, pair at Index 1, secondWord, dataKeys.pairs[1].secondWord: ", dataKeys.pairs[1].secondWord);
  //       gatherAndFilterResults("vowels", "eu", 3);
  //     }
  //   };
  //   tempDbQuery();
  // }, []);

  // useEffect(() => {
  //   const tempDbQuery = async () => {
  //     const docRef = doc(db, "vowel-diphthong-pairs-expt", "IU");
  //     const docSnap = await getDoc(docRef);
  //     if (docSnap.exists()) {
  //       console.log("IU: ", docSnap.data());
  //       const dataKeys = Object.keys(docSnap.data());
  //       console.log(dataKeys.length);
  //     }
  //   };
  //   tempDbQuery();
  // }, []);

  async function gatherAndFilterResults(category, query, numPairs) {
    if (category && query) {
      const queryOne = query[0] + query[1];
      const queryTwo = query[1] + query[0];
      const possibleQueries = [queryOne, queryTwo];

      for (const currentQuery of possibleQueries) {
        const docRef = doc(db, category, currentQuery);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          let arrayOfSelectedIds;
          const dataKeys = docSnap.data();
          if (dataKeys.pairs.length === 0) {
            setNotEnoughPairsMessage("No pairs available for the selected query.");
            return;
          }
          if (numPairs >= dataKeys.pairs.length) {
            arrayOfSelectedIds = randomPairPicker(dataKeys.pairs.length, dataKeys.pairs.length);
            setNotEnoughPairsMessage(
              `You've selected ${numPairsToRows(numPairs)} rows (i.e. ${numPairs} pairs) to show, but there are only ${
                dataKeys.pairs.length
              } pairs available.`
            );
          } else {
            // Before setting results to UI, randomly select and filter them.
            arrayOfSelectedIds = randomPairPicker(dataKeys.pairs.length, numPairs);
          }
          // console.log("Control, gatherAndFilterResults, arrayOfSelectedIds: ", arrayOfSelectedIds);
          filterDocResults(docSnap.data(), arrayOfSelectedIds);
          return; // Stop searching after finding a match
        }
      }
      console.log("No such document!");
    }
  }

  function onFormSubmission(collectedValues) {
    console.log("Control, onFormSubmission, collectedValues.charCategory: ", collectedValues.charCategory);
    console.log("Control, onFormSubmission, collectedValues.selectedChars: ", collectedValues.selectedChars);
    console.log("Control, onFormSubmission, collectedValues.selectedChars[0]: ", collectedValues.selectedChars[0]);
    console.log("Control, onFormSubmission, collectedValues.selectedChars[1]: ", collectedValues.selectedChars[1]);

    // Take the data from the user -- category, query, number pairs
    // Trigger a database query
    // Random pair picker
    // Gather and Filter Results

    setTreeDiagramName(collectedValues.selectedChars[0] + " vs " + collectedValues.selectedChars[1]);

    gatherAndFilterResults(collectedValues.charCategory, collectedValues.selectedChars, getNumPairsInTree(collectedValues.numRowsToShow));
  }

  return (
    <>
      <h2>Tree Diagram</h2>
      {resultsToUI ? <TreeDiagramExpt results={resultsToUI} treeDiagramName={treeDiagramName} /> : ""}
      {notEnoughPairsMessage && <h3>{notEnoughPairsMessage}</h3>}
      {resultsToUI ? <Results results={resultsToUI} /> : ""}
      <hr />
      {/* prettier-ignore */}
      <Form
        onFormSubmission={onFormSubmission}
        // collectValuesFromForm={collectValuesFromForm}
      />
      <hr />
    </>
  );
}

// Former Data Organization:
// {
//     "0": [
//         "B",
//         "boo"
//     ],
//     "1": [
//         "B's",
//         "booze"
//     ],
//     "2": [
//         "bead",
//         "booed"
//     ],
//     "3": [
//         "beam",
//         "boom"
//     ],
//     "4": [
//         "bean",
//         "boon"
//     ],
//     "5": [
//         "beast",
//         "boost"
//     ],
//     "6": [
//         "beat",
//         "boot"
//     ],
//     "7": [
//         "bee",
//         "boo"
//     ],
//     "8": [
//         "been",
//         "boon"
//     ],
//     "9": [
//         "bees",
//         "booze"
//     ],
//     "10": [
//         "breed",
//         "brewed"
//     ],
//     "11": [
//         "breeze",
//         "bruise"
//     ],
//     "12": [
//         "buckteeth",
//         "bucktooth"
//     ],
//     "13": [
//         "cheese",
//         "chews"
//     ],
//     "14": [
//         "creed",
//         "crewed"
//     ],
//     "15": [
//         "creed",
//         "crude"
//     ]
// }

// New Data Organization:
// {
//     "pairs": [
//         {
//             "firstWord": "bed",
//             "secondWord": "booed"
//         },
//         {
//             "secondWord": "buhl",
//             "firstWord": "bell"
//         },
//         {
//             "secondWord": "boules",
//             "firstWord": "bell"
//         },
//         {
//             "firstWord": "ben",
//             "secondWord": "boon"
//         },
//         {
//             "firstWord": "bens",
//             "secondWord": "boons"
//         },
//         {
//             "firstWord": "best",
//             "secondWord": "boost"
//         },
//         {
//             "secondWord": "boosted",
//             "firstWord": "bested"
//         },
//         {
//             "firstWord": "besting",
//             "secondWord": "boosting"
//         },
//         {
//             "secondWord": "boosts",
//             "firstWord": "bests"
//         },
//         {
//             "firstWord": "bet",
//             "secondWord": "boot"
//         },
//         {
//             "secondWord": "boots",
//             "firstWord": "bets"
//         },
//         {
//             "secondWord": "booted",
//             "firstWord": "betted"
//         },
//         {
//             "secondWord": "booting",
//             "firstWord": "betting"
//         },
//         {
//             "firstWord": "Betty",
//             "secondWord": "booty"
//         },
//         {
//             "secondWord": "blued",
//             "firstWord": "bled"
//         },
//         {
//             "firstWord": "bread",
//             "secondWord": "brewed"
//         },
//         {
//             "secondWord": "food",
//             "firstWord": "Fed"
//         },
//         {
//             "secondWord": "fool",
//             "firstWord": "fell"
//         },
//         {
//             "firstWord": "felled",
//             "secondWord": "fooled"
//         },
//         {
//             "secondWord": "fooling",
//             "firstWord": "felling"
//         },
//         {
//             "secondWord": "fools",
//             "firstWord": "fells"
//         },
//         {
//             "firstWord": "fettle",
//             "secondWord": "footle"
//         },
//         {
//             "secondWord": "fluke",
//             "firstWord": "fleck"
//         },
//         {
//             "firstWord": "flecks",
//             "secondWord": "flukes"
//         },
//         {
//             "secondWord": "flume",
//             "firstWord": "phlegm"
//         },
//         {
//             "secondWord": "fruit",
//             "firstWord": "fret"
//         },
//         {
//             "secondWord": "fruitful",
//             "firstWord": "fretful"
//         },
//         {
//             "firstWord": "fretfully",
//             "secondWord": "fruitfully"
//         },
//         {
//             "firstWord": "frets",
//             "secondWord": "fruits"
//         },
//         {
//             "secondWord": "fruited",
//             "firstWord": "fretted"
//         },
//         {
//             "secondWord": "fruiting",
//             "firstWord": "fretting"
//         },
//         {
//             "secondWord": "joule",
//             "firstWord": "gel"
//         },
//         {
//             "secondWord": "joules",
//             "firstWord": "gels"
//         },
//         {
//             "firstWord": "gen",
//             "secondWord": "June"
//         },
//         {
//             "firstWord": "gens",
//             "secondWord": "Junes"
//         },
//         {
//             "firstWord": "guess",
//             "secondWord": "goose"
//         },
//         {
//             "firstWord": "hem",
//             "secondWord": "whom"
//         },
//         {
//             "firstWord": "hep",
//             "secondWord": "hoop"
//         },
//         {
//             "firstWord": "jelly",
//             "secondWord": "Julie"
//         },
//         {
//             "secondWord": "juice",
//             "firstWord": "Jess"
//         },
//         {
//             "firstWord": "Jessie",
//             "secondWord": "juicy"
//         },
//         {
//             "secondWord": "jute",
//             "firstWord": "jet"
//         },
//         {
//             "secondWord": "coon",
//             "firstWord": "ken"
//         },
//         {
//             "secondWord": "coons",
//             "firstWord": "kens"
//         },
//         {
//             "secondWord": "cooped",
//             "firstWord": "kept"
//         },
//         {
//             "secondWord": "looped",
//             "firstWord": "leapt"
//         },
//         {
//             "firstWord": "lemming",
//             "secondWord": "looming"
//         },
//         {
//             "firstWord": "Len",
//             "secondWord": "loon"
//         },
//         {
//             "secondWord": "loony",
//             "firstWord": "Lenny"
//         },
//         {
//             "secondWord": "loons",
//             "firstWord": "lens"
//         },
//         {
//             "firstWord": "Les",
//             "secondWord": "loos"
//         },
//         {
//             "secondWord": "lose",
//             "firstWord": "Les"
//         },
//         {
//             "secondWord": "loose",
//             "firstWord": "less"
//         },
//         {
//             "secondWord": "loosen",
//             "firstWord": "lessen"
//         },
//         {
//             "secondWord": "loosened",
//             "firstWord": "lessened"
//         },
//         {
//             "secondWord": "loosening",
//             "firstWord": "lessening"
//         },
//         {
//             "firstWord": "lessens",
//             "secondWord": "loosens"
//         },
//         {
//             "secondWord": "looser",
//             "firstWord": "lesser"
//         },
//         {
//             "secondWord": "loosed",
//             "firstWord": "lest"
//         },
//         {
//             "secondWord": "loot",
//             "firstWord": "let"
//         },
//         {
//             "firstWord": "lets",
//             "secondWord": "loots"
//         },
//         {
//             "firstWord": "letting",
//             "secondWord": "looting"
//         },
//         {
//             "firstWord": "letter",
//             "secondWord": "looter"
//         },
//         {
//             "secondWord": "looters",
//             "firstWord": "letters"
//         },
//         {
//             "secondWord": "moony",
//             "firstWord": "many"
//         },
//         {
//             "secondWord": "mood",
//             "firstWord": "Med"
//         },
//         {
//             "firstWord": "men",
//             "secondWord": "moon"
//         },
//         {
//             "firstWord": "mend",
//             "secondWord": "mooned"
//         },
//         {
//             "firstWord": "mess",
//             "secondWord": "moose"
//         },
//         {
//             "secondWord": "mooses",
//             "firstWord": "messes"
//         },
//         {
//             "firstWord": "Met",
//             "secondWord": "moot"
//         },
//         {
//             "secondWord": "noose",
//             "firstWord": "ness"
//         },
//         {
//             "firstWord": "nesses",
//             "secondWord": "nooses"
//         },
//         {
//             "firstWord": "nest",
//             "secondWord": "noosed"
//         },
//         {
//             "firstWord": "pedal",
//             "secondWord": "poodle"
//         },
//         {
//             "firstWord": "pedals",
//             "secondWord": "poodles"
//         },
//         {
//             "firstWord": "pep",
//             "secondWord": "poop"
//         },
//         {
//             "firstWord": "peps",
//             "secondWord": "poops"
//         },
//         {
//             "secondWord": "rood",
//             "firstWord": "read"
//         },
//         {
//             "firstWord": "read",
//             "secondWord": "rude"
//         },
//         {
//             "secondWord": "rood",
//             "firstWord": "red"
//         },
//         {
//             "secondWord": "roods",
//             "firstWord": "reds"
//         },
//         {
//             "secondWord": "rude",
//             "firstWord": "red"
//         },
//         {
//             "secondWord": "ruder",
//             "firstWord": "redder"
//         },
//         {
//             "firstWord": "reddest",
//             "secondWord": "rudest"
//         },
//         {
//             "firstWord": "ready",
//             "secondWord": "Rudy"
//         },
//         {
//             "firstWord": "ref",
//             "secondWord": "roof"
//         },
//         {
//             "secondWord": "roofed",
//             "firstWord": "reft"
//         },
//         {
//             "firstWord": "Rennes",
//             "secondWord": "rune"
//         },
//         {
//             "secondWord": "roost",
//             "firstWord": "rest"
//         },
//         {
//             "firstWord": "rested",
//             "secondWord": "roosted"
//         },
//         {
//             "secondWord": "roosting",
//             "firstWord": "resting"
//         },
//         {
//             "secondWord": "roosts",
//             "firstWord": "rests"
//         },
//         {
//             "secondWord": "retool",
//             "firstWord": "retell"
//         },
//         {
//             "secondWord": "retooling",
//             "firstWord": "retelling"
//         },
//         {
//             "secondWord": "retools",
//             "firstWord": "retells"
//         },
//         {
//             "firstWord": "Sept",
//             "secondWord": "souped"
//         },
//         {
//             "firstWord": "shed",
//             "secondWord": "shooed"
//         },
//         {
//             "firstWord": "shred",
//             "secondWord": "shrewd"
//         },
//         {
//             "secondWord": "scoop",
//             "firstWord": "skep"
//         },
//         {
//             "firstWord": "skeps",
//             "secondWord": "scoops"
//         },
//         {
//             "secondWord": "slewed",
//             "firstWord": "sled"
//         },
//         {
//             "secondWord": "spook",
//             "firstWord": "speck"
//         },
//         {
//             "secondWord": "spooks",
//             "firstWord": "specks"
//         },
//         {
//             "secondWord": "spool",
//             "firstWord": "spell"
//         },
//         {
//             "firstWord": "spelling",
//             "secondWord": "spooling"
//         },
//         {
//             "firstWord": "spelled",
//             "secondWord": "spooled"
//         },
//         {
//             "secondWord": "spools",
//             "firstWord": "spells"
//         },
//         {
//             "firstWord": "spend",
//             "secondWord": "spooned"
//         },
//         {
//             "secondWord": "stoop",
//             "firstWord": "step"
//         },
//         {
//             "firstWord": "stepped",
//             "secondWord": "stooped"
//         },
//         {
//             "secondWord": "stooping",
//             "firstWord": "stepping"
//         },
//         {
//             "secondWord": "stoops",
//             "firstWord": "steps"
//         },
//         {
//             "firstWord": "steppes",
//             "secondWord": "stoops"
//         },
//         {
//             "firstWord": "swept",
//             "secondWord": "swooped"
//         },
//         {
//             "firstWord": "tell",
//             "secondWord": "tool"
//         },
//         {
//             "secondWord": "tooling",
//             "firstWord": "telling"
//         },
//         {
//             "firstWord": "tells",
//             "secondWord": "tools"
//         },
//         {
//             "firstWord": "tress",
//             "secondWord": "truce"
//         },
//         {
//             "firstWord": "tresses",
//             "secondWord": "truces"
//         },
//         {
//             "firstWord": "wed",
//             "secondWord": "wooed"
//         },
//         {
//             "firstWord": "wend",
//             "secondWord": "wound"
//         },
//         {
//             "secondWord": "wounded",
//             "firstWord": "wended"
//         },
//         {
//             "firstWord": "wending",
//             "secondWord": "wounding"
//         },
//         {
//             "secondWord": "wounds",
//             "firstWord": "wends"
//         },
//         {
//             "secondWord": "rune",
//             "firstWord": "wren"
//         },
//         {
//             "secondWord": "runes",
//             "firstWord": "wrens"
//         },
//         {
//             "firstWord": "yes",
//             "secondWord": "use"
//         },
//         {
//             "secondWord": "uses",
//             "firstWord": "yeses"
//         }
//     ]
// }

// async function gatherAndFilterResults(category, query, numPairs) {
//   if (category && query) {
//     const queryOne = query[0] + query[1];
//     const queryTwo = query[1] + query[0];
//     const possibleQueries = [queryOne, queryTwo];

//     for (const currentQuery of possibleQueries) {
//       const docRef = doc(db, category, currentQuery);
//       const docSnap = await getDoc(docRef);

//       console.log("Control, gatherAndFilterResults, docSnap._key.path.segments: ", docSnap._key.path.segments);
//       if (docSnap.exists()) {
//         let arrayOfSelectedIds;
//         const dataKeys = Object.keys(docSnap.data()); // !! Our new data will need different code at this point to access the pairs
//         if (dataKeys.length === 1 && docSnap.data()[0][0] === "") {
//           setNotEnoughPairsMessage("No pairs available for the selected query.");
//           return;
//         }
//         if (numPairs >= dataKeys.length) {
//           arrayOfSelectedIds = randomPairPicker(dataKeys.length, dataKeys.length);
//           setNotEnoughPairsMessage(
//             `You've selected ${numPairsToRows(numPairs)} rows (i.e. ${numPairs} pairs) to show, but there are only ${
//               dataKeys.length
//             } pairs available.`
//           );
//         } else {
//           // Before setting results to UI, randomly select and filter them.
//           arrayOfSelectedIds = randomPairPicker(dataKeys.length, numPairs);
//         }
//         console.log("Control, gatherAndFilterResults, arrayOfSelectedIds: ", arrayOfSelectedIds);
//         filterDocResults(docSnap.data(), arrayOfSelectedIds);
//         return; // Stop searching after finding a match
//       }
//     }
//     console.log("No such document!");
//   }
// }
