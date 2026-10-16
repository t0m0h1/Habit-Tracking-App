# Gentle Habits

A calm, low-pressure habit tracker. No streaks, no guilt, no pressure to be perfect.

## Features
- **Today view**: progress ring, habits grouped by time of day, big checkboxes, "Not today" option
- **Week view**: tick any day, mark rest days, check-in count (never a failure count)
- **My habits**: add, edit and delete habits with icon, colour, time of day, days and reminder choice
- **Rest days**: pause a day without it counting against you
- **Fresh starts**: a missed day just means "today is a fresh page"
- **Gentle reminders**: off by default, one dismissible note on the Today page, never a sound or pop-up
- **Comfort settings**: soft light/dark theme, larger text, turn off all movement
- **Accessible**: real checkboxes and buttons, visible focus, screen-reader labels, large tap targets, responsive
- **Private**: all data stays in your browser (`localStorage`), nothing is sent anywhere

## Run it in VS Code
No build step and no dependencies.

**Option 1: Live Server (easiest)**
1. Open this folder in VS Code (`File > Open Folder`).
2. Install the recommended **Live Server** extension when prompted.
3. Right-click `index.html` and choose **Open with Live Server**.

**Option 2: Python**
- Press `Ctrl+Shift+B` (runs the *Serve (Python)* task), or in the terminal: `python -m http.server 5500`
- Open <http://localhost:5500>

**Option 3: Node**
- `npm start`, then open <http://localhost:5500>

You can also just double-click `index.html`; it works straight from the file system.

## Project structure
```
index.html        page shell and navigation
css/styles.css    theme tokens (light/dark), layout, components
js/app.js         state, storage, views (Today, Week, My habits), icons
.vscode/          Live Server settings, serve tasks, extension tips
```

## Customising
- **Colours and spacing**: edit the variables at the top of `css/styles.css`
- **Icons**: add a name and SVG path to the `P` object in `js/app.js`, then add the name to `ICONS`
- **Habit colours**: edit the `COLS` array in `js/app.js`
- **Reset all data**: in the browser console run `localStorage.removeItem('gentle-habits-v1')` and refresh

## Notes
- The Atkinson Hyperlegible font loads from Google Fonts when online; offline it falls back to your system font.
- Data is per browser and per address (`localhost:5500` and `file://` keep separate data).
