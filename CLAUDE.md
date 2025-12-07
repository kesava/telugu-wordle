# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Telugu Language Wordle Game** - a single-file web application that implements a variant of Wordle using Telugu script. The game uses a **sequence-based puzzle system** instead of daily puzzles, making it perfect for irregular publishing schedules.

### Key Features
- Native Telugu language support (తెలుగు)
- Sequence-based puzzles (#1, #2, #3...) instead of daily
- Two difficulty modes: 3-letter and 4-letter words (code-configurable)
- Gunintam (vowel sign) hints displayed for each position
- Players input only consonants; vowels are pre-filled from hint pattern

## Development Commands

### Running the Application
```bash
# No build system required - open directly in browser
open puddle.html
# or serve locally with any HTTP server
python -m http.server 8000  # then visit http://localhost:8000/puddle.html
```

### Testing Different Puzzles
- **Latest puzzle**: `http://localhost:8000/puddle.html`
- **Specific puzzle**: `http://localhost:8000/puddle.html?puzzle=5`
- **Test unavailable puzzle**: `http://localhost:8000/puddle.html?puzzle=99`

### Publishing Workflow
1. Add new word to appropriate word array
2. Increment `CURRENT_PUZZLE` constant
3. Test locally with new puzzle number
4. Commit and push for automatic deployment

## Architecture Overview

### Single-File Structure
- **puddle.html**: Complete self-contained application (HTML + CSS + JavaScript)
- **No build system**: Uses React 18 + ReactDOM + Babel from CDN
- **Runtime JSX transpilation**: Babel Standalone processes JSX in-browser

### Core Components

#### Sequence-Based Configuration
```javascript
// Key constants in puddle.html:520-525
const GAME_MODE = 4;        // 3 or 4 letter words
const CURRENT_PUZZLE = 1;   // Latest available puzzle number
```

#### Telugu Language Processing
```javascript
// Key functions in puddle.html:505-518
splitAksharam(ak)     // Separates consonant from gunintam
getGunintam(ak)       // Extracts vowel sign
getBaseConsonant(ak)  // Extracts consonant
```

#### Puzzle Management Functions
```javascript
getCurrentPuzzle()           // Get puzzle from URL or default to latest
getWordForPuzzle(num)       // Get word data for specific puzzle
getPreviousPuzzle(current)  // Navigation helper
getNextPuzzle(current)      // Navigation helper
```

#### Game State Management (React Hooks)
- `currentPuzzleNumber` - Current puzzle being played
- `currentPuzzleData` - Word and metadata for current puzzle
- `solution` - Target word (array of aksharas)
- `guesses` - History with consonants and status arrays
- `currentGuess` - Current consonant input
- `vowelPattern` - Fixed gunintam clues from solution

#### Word Lists and Constants
```javascript
WORDS_3 = [["కీ", "తీ", "లు"], ...]  // 10 three-letter words
WORDS_4 = [["మా", "తి", "పు", "లు"], ...]  // 10 four-letter words
CURRENT_PUZZLE = 1  // Increment when adding new puzzles
KEYBOARD_CONSONANTS = ["క", "గ", "చ", ...]  // 18 consonants
MAX_ROWS = 6  // Maximum guesses allowed
```

### Game Logic
- **Sequence-based selection**: Puzzles numbered 1-N, no date dependencies
- **Access control**: Users can't access puzzles beyond CURRENT_PUZZLE
- **Two-pass evaluation** (similar to Wordle): exact matches first, then present letters
- **Akshara composition**: Consonant + Gunintam → Complete syllable
- **Status system**: `empty`, `absent`, `present`, `correct`

## Code Structure Patterns

### React Component Architecture
- Single main component `TeluguWordle()` at puddle.html:650
- Functional component with hooks (useState, useMemo, useEffect)
- Effect hook to check puzzle availability and show warnings

### URL Parameter System
- `?puzzle=5` - Access specific puzzle number
- No parameter - Defaults to latest puzzle (CURRENT_PUZZLE)
- Invalid puzzle numbers are handled gracefully

### Styling Approach
- **Scoped CSS** with `tw-` prefixed classes (lines 10-470)
- **Dark theme** by default (#0f0f23 background)
- **Responsive design** with multiple mobile breakpoints
- **Status-based styling** for tiles and keyboard keys with gradients and animations

### Development Workflow
1. Edit puddle.html directly
2. Refresh browser to see changes
3. No compilation or build step required
4. All dependencies loaded from CDN

## Important Implementation Details

### Publishing New Puzzles
```javascript
// 1. Add word to appropriate array
const WORDS_4 = [
  ["మా", "తి", "పు", "లు"],  // Puzzle #1
  ["న్యూ", "వర్డ్", "హీర్", "!"], // Puzzle #2 ← Add here
];

// 2. Update current puzzle number
const CURRENT_PUZZLE = 2; // ← Increment this
```

### Telugu Character Handling
- **Aksharas** contain base consonant + optional gunintam
- **Inherent vowel**: Consonants without explicit gunintam have inherent 'అ' sound
- **Word validation**: Checks against predefined word lists
- **Puzzle availability**: Prevents access to future puzzles

### Performance Considerations
- Uses `useMemo` for keyboard status computation (puddle.html:679-699)
- Uses `useMemo` for vowel pattern caching (puddle.html:673-676)
- Uses `useEffect` for puzzle availability checking (puddle.html:665-671)
- Minimal re-renders through careful state management

### Navigation Features
- **← మునుపటిది**: Previous puzzle (disabled at puzzle #1)
- **తర్వాతిది →**: Next puzzle (only shown if available)
- **లేటెస్ట్ →**: Jump to latest puzzle (only shown when viewing old puzzles)
- **🏠 Latest**: Always available button to return to latest

### Security & Access Control
- Puzzle numbers validated against available range
- Users can't access puzzles beyond CURRENT_PUZZLE
- Graceful handling of invalid puzzle parameters
- Clear error messages for unavailable content

## File Locations

- **Main application**: `puddle.html` (lines 1-933)
- **CSS styles**: Embedded in puddle.html (lines 10-470)
- **JavaScript logic**: Embedded in puddle.html (lines 475-933)
- **Configuration**: Lines 520-525 (GAME_MODE, CURRENT_PUZZLE)
- **Word lists**: Lines 527-553 (WORDS_3, WORDS_4)
- **VS Code settings**: `.vscode/settings.json` (dark theme customization only)

## Telugu Language Notes

When working with Telugu text in this codebase:
- Ensure proper Telugu font rendering ("Noto Sans Telugu" in font-family)
- Understand akshara structure: base consonant + gunintam (vowel sign)
- The game focuses on gunintam as clues, making it educational for Telugu learners
- Word lists can be expanded by adding properly structured Telugu words
- Each word array index corresponds to puzzle number (0-based indexing internally)

## Sequence-Based Benefits

- **No daily pressure**: Add puzzles when ready
- **Flexible publishing**: Weekly, monthly, or irregular schedules
- **Archive navigation**: All puzzles remain accessible
- **Easy sharing**: Direct links to specific puzzles
- **No timezone issues**: Works globally without date conflicts