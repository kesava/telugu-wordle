# Telugu Wordle Template System

This system converts the single HTML file into a template-based generator that creates individual puzzle files.

## Files Created

### 1. `words.json` - Puzzle Data
Contains all puzzle configuration and words:
```json
{
  "gameMode": 4,
  "puzzles": [
    {
      "id": 1,
      "word": ["మా", "తి", "పు", "లు"],
      "title": "Puzzle #1",
      "description": "First puzzle"
    }
    // ... more puzzles
  ]
}
```

### 2. `template.html` - HTML Template
The main template file with placeholders:
- `{{GAME_MODE}}` - Number of letters (3 or 4)
- `{{CURRENT_PUZZLE}}` - Current puzzle ID
- `{{PUZZLE_WORD}}` - Array of syllables for the puzzle
- `{{PUZZLE_TITLE}}` - Display title
- `{{PREV_PUZZLE_URL}}` - Previous puzzle link
- `{{NEXT_PUZZLE_URL}}` - Next puzzle link
- `{{PREV_DISABLED}}` / `{{NEXT_DISABLED}}` - Disable navigation when needed

### 3. `generate.js` - Generator Script
Node.js script that:
- Reads `words.json`
- Processes `template.html`
- Replaces placeholders with actual values
- Generates individual files: `1.html`, `2.html`, `3.html`, etc.
- Creates `index.html` that redirects to latest puzzle

### 4. `package.json` - NPM Configuration
Provides convenient scripts:
```bash
npm run generate  # Generate all puzzle files
npm run build     # Same as generate
npm run dev       # Generate and show instructions
```

## Usage

### Adding New Puzzles
1. Edit `words.json` and add new puzzle objects
2. Run the generator: `node generate.js`
3. New HTML files are created automatically

### Generated Files
- `1.html` - Puzzle #1
- `2.html` - Puzzle #2
- `3.html` - Puzzle #3
- ... and so on
- `index.html` - Redirects to latest puzzle

### Navigation
Each puzzle file has:
- ← Previous button (disabled on first puzzle)
- Latest button (goes to index.html)
- Next → button (disabled on last puzzle)

## Benefits

1. **Static Files**: Each puzzle is a standalone HTML file
2. **No Server Logic**: Pure client-side, works on any web server
3. **Easy Deployment**: Just upload generated HTML files
4. **Fast Loading**: No API calls or data fetching needed
5. **Archive Friendly**: Old puzzles remain accessible forever
6. **SEO Friendly**: Each puzzle has its own URL and title

## Example Generation

From this data:
```json
{
  "id": 1,
  "word": ["మా", "తి", "పు", "లు"],
  "title": "Puzzle #1"
}
```

The template `{{PUZZLE_WORD}}` becomes `["మా", "తి", "పు", "లు"]`
The template `{{PUZZLE_TITLE}}` becomes `"Puzzle #1"`
Navigation is set up automatically based on available puzzles.

## Deployment

1. Run `node generate.js` to create all HTML files
2. Upload all `.html` files to your web server
3. Access via `yoursite.com/` (redirects to latest) or `yoursite.com/5.html` (specific puzzle)

This system gives you the flexibility of individual files while maintaining easy content management through the JSON configuration.