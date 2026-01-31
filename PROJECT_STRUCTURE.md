# 📦 GOD v2.0 - Project Structure

## 🚀 Quick Start Files

**START HERE:**
- `README.md` - Main documentation
- `docs/SETUP.md` - 5-minute quick setup

**LAUNCH:**
- `start.sh` - Linux/Mac startup
- `start.bat` - Windows startup

## 📁 Directory Structure

```
god-v2-complete/
│
├── frontend/              ← Main application (use this!)
│   ├── index.html        - UI with voice, characters, chat
│   ├── app.js            - Full AI logic, streaming, voice
│   ├── styles.css        - Complete styling, 4 themes
│   ├── manifest.json     - PWA config
│   └── service-worker.js - Offline support
│
├── backend/              ← Optional server
│   ├── server.js         - Express + Ollama proxy
│   └── package.json      - Dependencies
│
├── docs/                 ← Documentation
│   ├── README.md         - Full features guide
│   └── SETUP.md          - Quick setup (5 min)
│
├── README.md             - Overview (this level)
├── PROJECT_STRUCTURE.md  - This file
├── start.sh              - Auto-launch (Unix)
└── start.bat             - Auto-launch (Windows)
```

## ✅ Complete Features

### Working AI Features:
- ✅ Ollama integration (streaming & normal)
- ✅ 6 character personalities
- ✅ Context-aware conversations
- ✅ Temperature control
- ✅ Model selection

### Working Voice Features:
- ✅ Speech-to-text input
- ✅ Text-to-speech output
- ✅ Push-to-talk (Space bar)
- ✅ Live mode (continuous)
- ✅ Voice visualization

### Working UI Features:
- ✅ Modern, responsive design
- ✅ 4 themes (Cosmic, Blue, Gold, Dark)
- ✅ Message bubbles
- ✅ Typing indicators
- ✅ Quick action buttons
- ✅ Settings panel

## 🎯 How to Run

### Easiest: Direct Open
```bash
# 1. Install Ollama & pull model
ollama pull llama3

# 2. Open frontend/index.html in browser
# Done!
```

### With Server:
```bash
# Start frontend
cd frontend
python -m http.server 8000
# Open http://localhost:8000
```

### Full Stack:
```bash
# Start backend
cd backend
npm install && npm start
# Open http://localhost:3000
```

## 📝 File Details

**frontend/index.html** - Main UI (~200 lines)
- Header with status
- Character selector (6 chars)
- Chat display
- Voice visualizer
- Input area
- Settings modal

**frontend/app.js** - Core logic (~500 lines)
- Ollama integration
- Streaming responses
- Voice I/O
- Character system
- Settings management
- Export functionality

**frontend/styles.css** - Styling (~600 lines)
- 4 complete themes
- Responsive design
- Animations
- Message bubbles
- Modern components

## 🎭 Characters

1. 🌟 **GOD** - Omniscient wisdom
2. 🧙 **Philosopher** - Deep thinking
3. 🔬 **Scientist** - Logic & evidence
4. 🎨 **Creator** - Creative content
5. 📚 **Teacher** - Patient educator
6. 💬 **Friend** - Casual companion

## ⚙️ Configuration

Edit `frontend/app.js`:
```javascript
const state = {
    ollamaUrl: 'http://localhost:11434',
    model: 'llama3',
    temperature: 0.7,
    // ...
};
```

Or use Settings panel in app.

## 📊 Stats

- **Total Files:** 15
- **Lines of Code:** ~1,300
- **Features:** 30+
- **Size:** <1MB
- **Dependencies:** 3 (backend only)

**You have everything you need! 🎉**
