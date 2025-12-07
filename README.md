# తెలుగు Wordle - Sequence-Based Word Puzzle Game

A sequence-based word puzzle game in Telugu script where players guess consonants while vowel signs (gunintam) are provided as clues. Perfect for irregular publishing schedules!

## 🎮 Game Features

- **Sequence-Based**: Puzzles numbered sequentially (#1, #2, #3...) instead of daily
- **Flexible Publishing**: Add new puzzles whenever you want, no daily commitment
- **Telugu Script**: Native support for Telugu consonants and gunintam
- **Mobile-First**: Optimized for mobile devices with touch interactions
- **Two Modes**: 3-letter or 4-letter words (configurable in code)
- **Archive Navigation**: Browse through all available puzzles
- **Beautiful UI**: Modern gradient design with animations

## 🚀 Quick Start

### 1. Install and Generate
```bash
npm install
npm run build
```

### 2. Deploy to GitHub Pages
```bash
npm run deploy
```

### 3. Enable GitHub Pages
Go to repository Settings → Pages → Deploy from `gh-pages` branch

**That's it!** Your Telugu Wordle is now live! 🎉

## 📝 Adding New Puzzles

1. **Edit `words.json`**:
```json
{
  "gameMode": 4,
  "puzzles": [
    {
      "id": 11,
      "word": ["న్యూ", "పజ్", "లు", "!"],
      "title": "Puzzle #11",
      "description": "New puzzle"
    }
  ]
}
```

2. **Deploy**:
```bash
npm run deploy
```

3. **Done!** New puzzle is live with automatic navigation.

## 📱 Features

### Enhanced Index Page
- **Puzzle Directory**: Grid of all available puzzles
- **Latest Puzzle Button**: Quick access to newest challenge
- **Mobile Responsive**: Beautiful layout on all devices
- **SEO Optimized**: Proper meta tags and descriptions

### Game Mechanics
- Gunintam (vowel signs) are shown as clues
- Players only input consonants (వ్యంజనాలు)
- Color-coded feedback: absent (gray), present (orange), correct (green)
- 6 attempts to guess the word
- Touch-optimized keyboard layout with complete Telugu character set

### Navigation System
- **Previous/Next**: Navigate between adjacent puzzles
- **Latest Button**: Jump to newest puzzle from any page
- **Index Page**: Central directory of all puzzles
- **Direct URLs**: Share specific puzzles with direct links

## 🌐 GitHub Pages Deployment

### Automatic Deployment
The system includes automated GitHub Pages deployment:

- **Build**: Generates HTML files from `words.json`
- **Deploy**: Pushes only game files to `gh-pages` branch
- **Serve**: GitHub Pages serves your puzzles automatically

### URL Structure
```
https://yourusername.github.io/repository-name/
├── /                  # Puzzle directory page
├── /1.html           # Puzzle #1
├── /2.html           # Puzzle #2
└── /N.html           # Puzzle #N
```

### Benefits
✅ **Zero Server Costs**: Hosted free on GitHub Pages
✅ **Lightning Fast**: Static files load instantly
✅ **SEO Friendly**: Each puzzle has unique URL and title
✅ **Mobile Perfect**: Responsive design works everywhere
✅ **Easy Sharing**: Direct links to specific puzzles

## 🔧 Configuration

### Changing Word Length
Edit the `gameMode` in `words.json`:
```json
{
  "gameMode": 3,  // Change to 3 for 3-letter words
  "puzzles": [...]
}
```

### Available Scripts
| Command | Description |
|---------|-------------|
| `npm run build` | Generate puzzle files |
| `npm run deploy` | Deploy to GitHub Pages |
| `npm run dev` | Generate and test locally |
| `npm run clean` | Remove generated files |

## 📚 Documentation

- **[DEPLOY.md](DEPLOY.md)** - Complete deployment guide
- **[TEMPLATE_GUIDE.md](TEMPLATE_GUIDE.md)** - Template system documentation
- **[CLAUDE.md](CLAUDE.md)** - Development guide for Claude Code

## 🎨 Design Features

- **Responsive Design**: Works on all screen sizes
- **Dark Theme**: Eye-friendly colors with gradient accents
- **Animations**: Smooth transitions and pulse effects
- **Accessibility**: High contrast mode and reduced motion support
- **PWA Ready**: Can be installed as a web app on mobile devices

## 📅 Publishing Workflow

Perfect for content creators who want flexibility:

1. **No Daily Pressure**: Add puzzles whenever inspiration strikes
2. **Batch Publishing**: Create multiple puzzles and deploy together
3. **Archive Friendly**: All puzzles remain accessible by number
4. **Easy Sharing**: Share specific puzzles with `?puzzle=5`
5. **Future-Proof**: No date dependencies or timezone issues

## 🛠️ Development

Built with:
- Vanilla HTML5, CSS3, JavaScript
- React 18 (loaded from CDN)
- Node.js build system
- gh-pages deployment
- No complex build pipeline required

## 🤝 Contributing

Feel free to:
- Add more Telugu words to the word lists
- Improve the UI/UX design
- Enhance accessibility features
- Fix any bugs you encounter

## 📄 License

MIT License - feel free to use and modify for your own Telugu language learning projects!

---

పజిల్స్ ఆస్వాదించండి! (Enjoy the puzzles!)