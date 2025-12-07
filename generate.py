#!/usr/bin/env python3

import json
import os

def load_words():
    """Load words from words.json"""
    with open('words.json', 'r', encoding='utf-8') as f:
        return json.load(f)

def load_template():
    """Load the HTML template"""
    with open('template.html', 'r', encoding='utf-8') as f:
        return f.read()

def generate_puzzles():
    """Generate individual puzzle HTML files"""
    data = load_words()
    template = load_template()

    print(f"Generating {len(data['puzzles'])} puzzle files...")

    for i, puzzle in enumerate(data['puzzles']):
        puzzle_id = puzzle['id']
        prev_puzzle_id = puzzle_id - 1 if puzzle_id > 1 else None
        next_puzzle_id = puzzle_id + 1 if puzzle_id < len(data['puzzles']) else None

        # Replace template placeholders
        html = template
        html = html.replace('{{GAME_MODE}}', str(data['gameMode']))
        html = html.replace('{{CURRENT_PUZZLE}}', str(puzzle_id))
        html = html.replace('{{PUZZLE_WORD}}', json.dumps(puzzle['word']))
        html = html.replace('{{PUZZLE_TITLE}}', puzzle['title'])

        # Navigation URLs
        prev_url = f"{prev_puzzle_id}.html" if prev_puzzle_id else '#'
        next_url = f"{next_puzzle_id}.html" if next_puzzle_id else '#'

        html = html.replace('{{PREV_PUZZLE_URL}}', prev_url)
        html = html.replace('{{NEXT_PUZZLE_URL}}', next_url)

        # Disable navigation buttons when needed
        prev_disabled = '' if prev_puzzle_id else 'style="pointer-events: none; opacity: 0.4;"'
        next_disabled = '' if next_puzzle_id else 'style="pointer-events: none; opacity: 0.4;"'

        html = html.replace('{{PREV_DISABLED}}', prev_disabled)
        html = html.replace('{{NEXT_DISABLED}}', next_disabled)

        # Write the puzzle file
        filename = f"{puzzle_id}.html"
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f"Generated: {filename}")

    # Generate index.html that redirects to the latest puzzle
    latest_puzzle_id = data['puzzles'][-1]['id']
    index_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>తెలుగు Wordle - Redirecting...</title>
    <style>
        body {{
            font-family: system-ui, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #0f0f23 0%, #1a1a40 100%);
            color: white;
        }}
        .loading {{
            text-align: center;
        }}
        .spinner {{
            width: 40px;
            height: 40px;
            margin: 20px auto;
            border: 4px solid #333;
            border-top: 4px solid #00d4aa;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }}
        @keyframes spin {{
            0% {{ transform: rotate(0deg); }}
            100% {{ transform: rotate(360deg); }}
        }}
    </style>
</head>
<body>
    <div class="loading">
        <h1>తెలుగు Wordle</h1>
        <div class="spinner"></div>
        <p>Loading latest puzzle...</p>
    </div>

    <script>
        // Redirect to the latest puzzle
        window.location.href = './{latest_puzzle_id}.html';
    </script>
</body>
</html>"""

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(index_html)

    print(f"Generated: index.html (redirects to puzzle {latest_puzzle_id})")
    print(f"\n✅ Generated {len(data['puzzles'])} puzzle files + index.html")
    print(f"📂 Files: {', '.join([f'{p['id']}.html' for p in data['puzzles']])}")
    print(f"🌐 Access via: index.html or directly via 1.html, 2.html, etc.")

if __name__ == "__main__":
    try:
        generate_puzzles()
    except Exception as e:
        print(f"❌ Error generating puzzles: {e}")