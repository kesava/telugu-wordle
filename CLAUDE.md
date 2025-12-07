# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Telugu Language Wordle Game** - a template-based system that generates individual puzzle HTML files for a variant of Wordle using Telugu script. The game uses a **sequence-based puzzle system** instead of daily puzzles, making it perfect for irregular publishing schedules.

### Key Features
- Native Telugu language support (తెలుగు)
- Sequence-based puzzles (#1, #2, #3...) instead of daily
- Flexible word lengths: supports both 3-letter and 4-letter words automatically
- Gunintam (vowel sign) hints displayed for each position
- Players input only consonants; vowels are pre-filled from hint pattern

## Development Commands

### Template System (IMPORTANT)
```bash
# ONLY edit the template file:
template.html  # ← Make ALL changes here

# Generated files (DO NOT EDIT MANUALLY):
1.html, 2.html, 3.html, 4.html, 5.html, 6.html  # ← Never edit these directly

# Regenerate all puzzle files after editing template:
node generate.js

# Deploy to GitHub Pages:
npm run deploy
```

**CRITICAL RULE**: Always edit `template.html` only. Never manually edit generated puzzle files (`1.html`, `2.html`, etc.) as they will be overwritten when regenerated.

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
1. Add new puzzle to `words.json`
2. Run `node generate.js` to create puzzle files
3. Test locally with new puzzle
4. Deploy with `npm run deploy` for GitHub Pages

## Architecture Overview

### Template-Based System
- **template.html**: Master template for generating puzzle files (HTML + CSS + JavaScript)
- **generate.js**: Node.js script that creates individual puzzle files (1.html, 2.html, etc.)
- **words.json**: Configuration file containing puzzle data and settings
- **index.html**: Generated puzzle directory with links to all puzzles
- **No build system**: Uses React 18 + ReactDOM + Babel from CDN
- **Runtime JSX transpilation**: Babel Standalone processes JSX in-browser

### Generated Files Structure
```
├── template.html      # Master template (EDIT THIS)
├── generate.js        # Generator script
├── words.json         # Puzzle configuration
├── index.html         # Generated puzzle directory
├── 1.html            # Generated puzzle #1 (DO NOT EDIT)
├── 2.html            # Generated puzzle #2 (DO NOT EDIT)
└── ...               # More generated puzzles
```

### Core Components

#### Template Configuration (template.html)
```javascript
// Key constants injected by generator:
const CURRENT_PUZZLE = __PUZZLE_ID__;   // Individual puzzle ID
const PUZZLE_WORD = __PUZZLE_WORD__;    // Individual puzzle word array
const PUZZLE_TITLE = "__PUZZLE_TITLE__"; // Individual puzzle title
// Word length automatically determined from PUZZLE_WORD.length
```

#### Words Configuration (words.json)
```json
{
  "gameMode": 4,  // Optional, for documentation/compatibility
  "puzzles": [
    {
      "id": 1,
      "word": ["అ", "ల", "స", "ట"],      // 4-letter word
      "title": "Puzzle #1",
      "description": "Tiredness"
    },
    {
      "id": 2,
      "word": ["వ", "రు", "స"],          // 3-letter word (also supported!)
      "title": "Puzzle #2",
      "description": "In sequence"
    }
  ]
}
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
```json
// Add to words.json puzzles array:
{
  "gameMode": 4,
  "puzzles": [
    {
      "id": 1,
      "word": ["అ", "ల", "స", "ట"],
      "title": "Puzzle #1",
      "description": "Tiredness"
    },
    {
      "id": 2,
      "word": ["క", "మ", "ల", "ము"],
      "title": "Puzzle #2",
      "description": "Lotus"
    }
  ]
}
```

Then regenerate: `node generate.js`

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

### Template System Files
- **Master template**: `template.html` (EDIT THIS ONLY)
- **Configuration**: `words.json` (puzzle data and settings)
- **Generator**: `generate.js` (creates puzzle files)
- **Package config**: `package.json` (npm scripts)

### Generated Files (DO NOT EDIT MANUALLY)
- **Puzzle files**: `1.html`, `2.html`, `3.html`, etc.
- **Directory**: `index.html` (puzzle navigation)

**REMINDER**: Always edit `template.html`, never the generated `.html` files.

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