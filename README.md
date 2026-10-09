# Arun Shijo — Premium Interactive Portfolio

A personal portfolio website for **Arun Shijo** (IT Support Specialist / IT Support Technician based in Riga, Latvia), featuring a dual-mode experience inspired by [vaisakh.dev](https://vaisakh.dev/) and [riyarose.online](https://riyarose.online/).

## 🌟 Key Features

1. **Dual Visitor Experiences**:
   - **Mode 1: Standard Portfolio (GUI)**:
     - Minimalist, recruiter-friendly design with refined dark color palette and ambient tech mesh.
     - Smooth scrolling between Hero, About, Technical Skills Matrix, Experience Timeline, Education, Languages, and Contact.
     - Interactive filter tabs for 20 verified IT skills across 5 core enterprise domains.
     - Verifiable work history at **TELUS Digital** (Riga, Latvia) and **Goodluck IT Solutions** (Calicut, India).
     - Higher education credentials from **ISMA University** (MSc Computer Science, Riga) and **University of Calicut** (BSc Computer Science).
     - Highlighted **Valid Latvian driving licence** for rapid on-site field calls across Latvia.
     - Direct, functional contact links (`mailto:`, `tel:`, LinkedIn) with one-click copy buttons and toast feedback.
     - Print-friendly resume formatting (`@media print`) for recruiters.
   - **Mode 2: Interactive IT Terminal (CLI)**:
     - Authentic Linux/macOS style terminal interface (`arun@riga-support:~$`).
     - Supports commands: `help`, `whoami`, `about`, `skills`, `experience`, `education`, `contact`, `languages`, `licence`, `ls`, `cat <file>`, `neofetch`, `ipconfig`, `ping`, `date`, `uptime`, `history`, `clear`, `gui`.
     - Command history navigation with `↑` and `↓` arrow keys.
     - Tab auto-completion for commands and virtual files.
     - Mobile touch command chips bar for smartphones and tablets.
     - Safe frontend simulation with zero server execution or vulnerabilities.
2. **Initial Visitor Experience**:
   - Welcome modal letting visitors choose their preferred experience on first visit, with keyboard shortcuts (`N` for Standard, `T` for Terminal).
   - Seamless one-click switching anytime from the top navigation bar or by typing `gui` / `portfolio` in the terminal.
3. **Strict Truthfulness**:
   - 100% based on verified CV details. Zero fabricated projects, certifications, or statistics.

---

## 🚀 Quick Start (Local Setup)

The application has **zero external build dependencies** and can be run immediately on any machine:

### Option A: Using Python (Recommended)
```bash
python server.py
# or
py server.py
```
Then open your browser at:
`http://localhost:3000`

### Option B: Using Node.js
```bash
node server.js
```
Then open your browser at:
`http://localhost:3000`

### Option C: Direct Browser Opening
Simply double-click or run:
```powershell
Start-Process index.html
```

---

## 📂 Project Structure

```
arun.ai/
├── index.html          # Core single-page application with dual GUI/Terminal views & SEO metadata
├── favicon.svg         # SVG favicon with tech monogram and terminal prompt
├── css/
│   └── styles.css      # Ambient meshes, glassmorphism cards, print stylesheet, terminal styles
├── js/
│   ├── data.js         # Single source of truth for CV data & terminal virtual filesystem
│   ├── terminal.js     # Simulated IT support terminal engine, commands, history & autocomplete
│   └── app.js          # Mode switcher, welcome modal, widgets, copy toasts & scrollspy
├── server.py           # Zero-dependency Python HTTP server
├── server.js           # Zero-dependency Node.js HTTP server
└── README.md           # Documentation & local commands
```

---

## 🧑‍💻 Verified Professional Profile
- **Name**: Arun Shijo
- **Role**: IT Support Specialist | IT Support Technician
- **Location**: Riga, Latvia
- **Email**: arunshijo789@gmail.com
- **Phone**: +371 28774002
- **LinkedIn**: https://www.linkedin.com/in/arunshijo/
- **Education**: MSc Computer Science (ISMA University, Riga) | BSc Computer Science (University of Calicut)
- **Licence**: Valid Latvian driving licence
