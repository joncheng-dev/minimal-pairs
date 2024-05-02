# Minimal Pairs

#### By Jon Cheng (developer) & Tim Clauson (concept)

#### Description (short)

## Technologies Used

- _HTML_
- _CSS_
- _JavaScript_
- _React.js_
- _D3.js_
- _Firebase / Firestore_
- _Materials UI_
- _Node.js v18.17.1_
- _NPM v9.6.7_

## Description

## Diagrams, Screenshots, Demos

## Functionality Overview

### General functionality:

## Known Bugs

- _Drop down menu currently does not display user's current phoneme selections._
- _If you happen upon any, please report your find with a descriptive message to joncheng.dev@gmail.com_

<a align=left href="#">Return to Top</a>

// TO DO LIST

## Tasks

// can we display the user's chosen phonemes in the select / dropdown input field? (alternatives?)
// add message for if user only selects 1 phoneme and then tries to submit form, similarily for if user does not make a selection of rows
// bulk database import & assocciated verification of data import - test total number of rowes imported? or total number of 'documents' into firebase?

## Tree Design

// tweak display for larger trees -- upon being drawn, the tree is zoomed in
// investigate optimization of tree - can we economize on screen real estate by shortening 'gaps' between layers?
// Display user selected chars in dropdown menu -- currently does not show user input values
// doublecheck default view when tree is drawn - is it centered correctly, showing the user the top of thr tree
// add simple instructions? // tell users that redrawing is possible
// investigate collpsability of binary tree and/or mouseover on checkbox behaviour
//intellectual property protection and potential monetisation. Create a function where users can generate handouts as PDFs and charge per action a micro transaction

## User Interface

// UX/UI: make characters in dropdown menu large and easy to see. some characters, especially non unique characters are very similar in appearance. using a larger font will help to prevent user errors
// optimize UI to display tree - display as new window? maximized window?
// tidy up: remove header, tree diagram etc

## Update disabledIncompatibleValues function to be declarative

Edge case: some consonant pairings have "none"
in the tree which is drawn, destinations need to be shown. these can simply be numbers or letters, or we can be fancy later on and add things like cities, or fruit, or animals.

[X] Add unicode characters to phonemeDictionary -- both at indexes, and at incompatibleCharacters array
[X] Odd numbers of results to display. If a user selects 4 rows for example, but there's only enough for 3 rows, and some, display all that is possible, and show user a message.
[X] split phonemeDictionary into vowels and cons to avoid any potential issues
[X] Rewire vowel & cons as options for user to select

[X] Look into unit testing -- Cypress https://docs.cypress.io/guides/overview/why-cypress
[X] In the dictionary disableIncompatiableValues, 'null' is listed twice. Find a way to differentiate the two.

[X] Publish on Git Hub Pages first
[X] Clear previous results as soon as Submit button is clicked

[X] Not enough pairs message should go away on subsequent submits where there are enough pairs to show
