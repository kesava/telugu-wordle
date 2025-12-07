#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read the words.json file
function loadWords() {
  const wordsPath = path.join(__dirname, 'words.json');
  const wordsData = fs.readFileSync(wordsPath, 'utf8');
  return JSON.parse(wordsData);
}

// Read the template file
function loadTemplate() {
  const templatePath = path.join(__dirname, 'template.html');
  return fs.readFileSync(templatePath, 'utf8');
}

// Generate individual puzzle HTML files
function generatePuzzles() {
  const data = loadWords();
  const template = loadTemplate();

  console.log(`Generating ${data.puzzles.length} puzzle files...`);

  data.puzzles.forEach((puzzle, index) => {
    const puzzleId = puzzle.id;
    const prevPuzzleId = puzzleId > 1 ? puzzleId - 1 : null;
    const nextPuzzleId = puzzleId < data.puzzles.length ? puzzleId + 1 : null;

    // Replace template placeholders
    let html = template
      .replace(/const GAME_MODE = 4;/g, `const GAME_MODE = ${data.gameMode};`)
      .replace(/const CURRENT_PUZZLE = 1;/g, `const CURRENT_PUZZLE = ${puzzleId};`)
      .replace(/const PUZZLE_WORD = \["మా", "తి", "పు", "లు"\];/g, `const PUZZLE_WORD = ${JSON.stringify(puzzle.word)};`)
      .replace(/const PUZZLE_TITLE = "Puzzle #1";/g, `const PUZZLE_TITLE = "${puzzle.title}";`)
      .replace(/తెలుగు Wordle - Puzzle #1/g, `తెలుగు Wordle - ${puzzle.title}`)

      // Navigation URLs and styles
      .replace(/__PREV_LINK__/g, prevPuzzleId ? `${prevPuzzleId}.html` : '#')
      .replace(/__NEXT_LINK__/g, nextPuzzleId ? `${nextPuzzleId}.html` : '#')
      .replace(/__PREV_STYLE__/g, prevPuzzleId ? '{}' : '{{pointerEvents: "none", opacity: "0.4"}}')
      .replace(/__NEXT_STYLE__/g, nextPuzzleId ? '{}' : '{{pointerEvents: "none", opacity: "0.4"}}');

    // Write the puzzle file
    const filename = `${puzzleId}.html`;
    fs.writeFileSync(path.join(__dirname, filename), html);
    console.log(`Generated: ${filename}`);
  });

  // Generate enhanced index.html with puzzle list
  const latestPuzzleId = data.puzzles[data.puzzles.length - 1].id;
  const puzzleLinks = data.puzzles.map(p =>
    `          <li><a href="${p.id}.html" class="puzzle-link">${p.title}</a></li>`
  ).join('\n');

  const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>తెలుగు Wordle - Telugu Word Puzzle Game</title>
    <meta name="description" content="Telugu Wordle - A word puzzle game in Telugu script with gunintam clues">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, system-ui, "Noto Sans Telugu", "Segoe UI", Roboto, sans-serif;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #0f0f23 0%, #1a1a40 100%);
            color: white;
            padding: 20px;
        }
        .container {
            text-align: center;
            max-width: 500px;
            width: 100%;
        }
        .title {
            font-size: 2.5rem;
            font-weight: 800;
            background: linear-gradient(135deg, #00d4aa, #7c3aed);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 1rem;
        }
        .subtitle {
            font-size: 1.1rem;
            color: #a8a8b3;
            margin-bottom: 2rem;
            line-height: 1.4;
        }
        .latest-btn {
            display: inline-block;
            padding: 16px 32px;
            background: linear-gradient(135deg, #00d4aa, #7c3aed);
            color: white;
            text-decoration: none;
            border-radius: 12px;
            font-weight: 700;
            font-size: 1.1rem;
            margin-bottom: 3rem;
            transition: transform 0.2s ease;
            box-shadow: 0 4px 20px rgba(0, 212, 170, 0.3);
        }
        .latest-btn:hover {
            transform: translateY(-2px);
        }
        .puzzle-list {
            background: rgba(38, 38, 69, 0.6);
            border-radius: 16px;
            padding: 2rem;
            margin-top: 2rem;
            border: 1px solid #3a3a55;
        }
        .puzzle-list h3 {
            color: #00d4aa;
            margin-bottom: 1rem;
            font-size: 1.2rem;
        }
        .puzzle-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 12px;
            list-style: none;
            padding: 0;
            margin: 0;
        }
        .puzzle-link {
            display: block;
            padding: 12px;
            background: #262645;
            color: white;
            text-decoration: none;
            border-radius: 8px;
            border: 1px solid #3a3a55;
            transition: all 0.2s ease;
            font-weight: 600;
            font-size: 0.9rem;
        }
        .puzzle-link:hover {
            background: #7c3aed;
            transform: translateY(-1px);
            box-shadow: 0 4px 15px rgba(124, 58, 237, 0.3);
        }
        .instructions {
            color: #6b6b7d;
            font-size: 0.9rem;
            margin-top: 2rem;
            line-height: 1.5;
        }
        @media (max-width: 480px) {
            .title { font-size: 2rem; }
            .latest-btn { padding: 12px 24px; font-size: 1rem; }
            .puzzle-grid { grid-template-columns: repeat(3, 1fr); }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="title">తెలుగు Wordle</h1>
        <p class="subtitle">
            A word puzzle game in Telugu script<br>
            Guess consonants while vowel signs (gunintam) guide you!
        </p>

        <a href="${latestPuzzleId}.html" class="latest-btn">
            🎮 Play Latest Puzzle (#${latestPuzzleId})
        </a>

        <div class="puzzle-list">
            <h3>📚 All Puzzles</h3>
            <ul class="puzzle-grid">
${puzzleLinks}
            </ul>
        </div>

        <div class="instructions">
            <p><strong>How to play:</strong> Vowel signs are given as clues. Guess only the consonants to form complete Telugu syllables!</p>
        </div>
    </div>
</body>
</html>`;

  fs.writeFileSync(path.join(__dirname, 'index.html'), indexHtml);
  console.log(`Generated: index.html (puzzle directory with latest: #${latestPuzzleId})`);

  console.log(`\n✅ Generated ${data.puzzles.length} puzzle files + index.html`);
  console.log(`📂 Files: ${data.puzzles.map(p => `${p.id}.html`).join(', ')}`);
  console.log(`🌐 Access via: index.html or directly via 1.html, 2.html, etc.`);
  console.log(`🚀 Deploy with: npm run deploy`);
}

// Run the generator
try {
  generatePuzzles();
} catch (error) {
  console.error('❌ Error generating puzzles:', error.message);
  process.exit(1);
}