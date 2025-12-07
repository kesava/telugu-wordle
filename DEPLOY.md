# GitHub Pages Deployment Guide

## 🚀 Quick Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Generate Puzzle Files
```bash
npm run build
```

### 3. Deploy to GitHub Pages
```bash
npm run deploy
```

### 4. Enable GitHub Pages
1. Go to your GitHub repository
2. Click **Settings** tab
3. Scroll to **Pages** section
4. Under **Source**, select **Deploy from a branch**
5. Choose **gh-pages** branch
6. Click **Save**

## 📝 How It Works

### File Generation
- `npm run build` reads `words.json` and generates HTML files
- Creates `index.html` with puzzle directory and latest puzzle link
- Creates individual files: `1.html`, `2.html`, `3.html`, etc.
- Each puzzle has working Previous/Next navigation

### Deployment Process
1. **Build**: Generates all HTML files from `words.json`
2. **gh-pages**: Pushes only HTML files to `gh-pages` branch
3. **GitHub Pages**: Serves the files from `gh-pages` branch

### Generated Files
```
📁 gh-pages branch (deployed):
├── index.html          # Main page with puzzle directory
├── 1.html             # Puzzle #1
├── 2.html             # Puzzle #2
├── 3.html             # Puzzle #3
└── ...                # More puzzles
```

## 🔄 Publishing Workflow

### Adding New Puzzles
1. **Edit** `words.json`:
   ```json
   {
     "gameMode": 4,
     "puzzles": [
       {
         "id": 11,
         "word": ["నీ", "లి", "మా", "లు"],
         "title": "Puzzle #11",
         "description": "Eleventh puzzle"
       }
     ]
   }
   ```

2. **Deploy**:
   ```bash
   npm run deploy
   ```

3. **That's it!** New puzzle is live at:
   - `yoursite.github.io/puzzle-repo/11.html`
   - Links automatically added to index page

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run generate` | Generate HTML files locally |
| `npm run build` | Same as generate |
| `npm run dev` | Generate and show instructions |
| `npm run clean` | Remove generated HTML files |
| `npm run deploy` | Build and deploy to GitHub Pages |
| `npm run setup-deploy` | Show deployment setup instructions |

## 🌐 URL Structure

After deployment, your puzzles are accessible at:
```
https://yourusername.github.io/repository-name/
├── /                  # Main page with puzzle directory
├── /1.html           # Puzzle #1
├── /2.html           # Puzzle #2
└── /latest           # Redirects to latest puzzle
```

## 🔧 Customization

### Change Puzzle Word Length
Edit `words.json`:
```json
{
  "gameMode": 3,  // Change to 3 for 3-letter words
  "puzzles": [...]
}
```

### Custom Styling
- Edit CSS in `template.html`
- Regenerate with `npm run build`
- Deploy with `npm run deploy`

## 📊 Benefits

✅ **Static Files**: No server needed, just HTML files
✅ **Fast Loading**: All resources self-contained
✅ **SEO Friendly**: Each puzzle has unique URL and title
✅ **Mobile Optimized**: Responsive design works everywhere
✅ **Archive Friendly**: Old puzzles stay accessible forever
✅ **Easy Sharing**: Direct links to specific puzzles

## 🛠️ Troubleshooting

### Deployment Issues
- Ensure `gh-pages` package is installed: `npm install`
- Check repository has GitHub Pages enabled
- Verify `gh-pages` branch exists after first deploy

### Generated Files Not Updating
- Run `npm run clean` then `npm run build`
- Check `words.json` syntax is valid JSON

### Navigation Not Working
- Ensure puzzle IDs are sequential (1, 2, 3...)
- Check navigation links in generated HTML files

## 📧 Support

For issues with:
- **Template System**: Check `TEMPLATE_GUIDE.md`
- **Game Logic**: Review the React code in `template.html`
- **Deployment**: Follow this guide or check GitHub Pages documentation