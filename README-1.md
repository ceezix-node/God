# 🌟 GOD v2.0 - Complete Package

**Advanced AI Assistant with Voice, Live Mode, Multiple Characters, and Streaming Responses**

Built with ❤️ using Ollama for 100% local, private AI

---

## 📦 What's Included

This complete package includes:

### ✅ Frontend (Ready to Use)
- Modern, responsive web interface
- 6 AI character personalities
- Voice input & output (TTS/STT)
- Live conversation mode
- Real-time streaming responses
- PWA support (installable)
- Offline caching
- 4 themes

### ✅ Backend (Optional)
- Express.js server
- Ollama proxy
- CORS handling
- Streaming support
- Easy deployment

### ✅ Documentation
- Complete setup guide
- Quick start (5 minutes)
- API documentation
- Troubleshooting guide
- Deployment instructions

### ✅ Scripts
- `start.sh` - Linux/Mac startup
- `start.bat` - Windows startup
- Auto-detection & setup

---

## 🚀 Quick Start

### 1️⃣ Install Ollama

**Mac/Linux:**
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

**Windows:**
Download from https://ollama.com/download

### 2️⃣ Download AI Model

```bash
ollama pull llama3
```

### 3️⃣ Run GOD v2.0

**Easy Way (Auto-start script):**
```bash
# Mac/Linux
./start.sh

# Windows
start.bat
```

**Manual Way:**
```bash
# Start Ollama
ollama serve

# Start frontend
cd frontend
python -m http.server 8000

# Open http://localhost:8000
```

### 4️⃣ Start Chatting!

1. Open browser to http://localhost:8000
2. Select a character (🌟 GOD, 🧙 Philosopher, etc.)
3. Type or speak your message
4. Get instant AI responses!

---

## 🎯 Features Overview

### 🎙️ Voice Capabilities
- **Speech-to-Text:** Click 🎤 or hold Space bar
- **Text-to-Speech:** Auto-reads AI responses
- **Live Mode:** Continuous voice conversation
- **Push-to-Talk:** Space bar for quick voice input

### 🤖 AI Characters

| Character | Best For |
|-----------|----------|
| 🌟 GOD | Comprehensive knowledge, wisdom |
| 🧙 Philosopher | Deep thinking, existential questions |
| 🔬 Scientist | Technical explanations, logic |
| 🎨 Creator | Creative content, stories |
| 📚 Teacher | Learning, step-by-step guides |
| 💬 Friend | Casual conversation, support |

### ⚡ Advanced Features
- **Streaming:** See responses in real-time
- **Context Awareness:** Remembers conversation
- **Adjustable Temperature:** Control creativity
- **Export:** Save conversations
- **Offline Mode:** Works without internet (after install)
- **Multiple Themes:** Customize appearance

---

## 📁 File Structure

```
god-v2-complete/
│
├── frontend/                   # Web app (main)
│   ├── index.html             # UI
│   ├── styles.css             # Styling
│   ├── app.js                 # Core logic
│   ├── manifest.json          # PWA config
│   └── service-worker.js      # Offline support
│
├── backend/                    # Server (optional)
│   ├── server.js              # Express server
│   └── package.json           # Dependencies
│
├── docs/                       # Documentation
│   ├── README.md              # Full guide
│   └── SETUP.md               # Quick setup
│
├── start.sh                    # Launch script (Unix)
├── start.bat                   # Launch script (Windows)
└── README.md                   # This file
```

---

## 💻 System Requirements

### Minimum
- **OS:** Windows 10+, macOS 11+, Linux
- **RAM:** 8GB (for llama3)
- **Storage:** 10GB free
- **Browser:** Chrome, Edge, Safari, Firefox

### Recommended
- **RAM:** 16GB+
- **GPU:** NVIDIA/Apple Silicon (optional, 10x faster)
- **Storage:** 20GB+ (for multiple models)

### Model Requirements

| Model | RAM | Speed | Quality |
|-------|-----|-------|---------|
| phi (2.7B) | 4GB | ⚡⚡⚡ | Good |
| mistral (7B) | 8GB | ⚡⚡ | Great |
| llama3 (8B) | 8GB | ⚡⚡ | Excellent |
| llama3 (70B) | 64GB | ⚡ | Best |

---

## 🔧 Configuration

### Settings Panel (⚙️)

**Ollama:**
- Endpoint: Where Ollama is running
- Model: Which AI model to use
- Temperature: 0.0 (factual) to 1.0 (creative)
- Stream: Enable real-time responses

**Voice:**
- Auto TTS: Auto-speak responses
- (Browser controls voice selection)

**Appearance:**
- Theme: Cosmic, Blue, Gold, Dark

### Advanced Config

Edit `frontend/app.js` to customize:
```javascript
const state = {
    ollamaUrl: 'http://localhost:11434',
    model: 'llama3',
    temperature: 0.7,
    // ... more options
};
```

---

## 🐛 Troubleshooting

### "Connection refused"
```bash
# Start Ollama
ollama serve

# Verify
curl http://localhost:11434/api/tags
```

### "Model not found"
```bash
# Install model
ollama pull llama3

# Check installed
ollama list
```

### Voice not working
- Use Chrome/Edge (best support)
- Allow microphone permissions
- Check browser settings

### Slow responses
- Try smaller model: `ollama pull mistral`
- Close other apps
- Lower temperature in settings

### See full troubleshooting in `docs/README.md`

---

## 📖 Documentation

- **[docs/README.md](docs/README.md)** - Complete guide with all features
- **[docs/SETUP.md](docs/SETUP.md)** - 5-minute quick start
- **Inline Comments** - Code is well-documented

---

## 🚀 Deployment

### Local Network Access

Make accessible on your network:

```bash
# Frontend
python -m http.server 8000 --bind 0.0.0.0

# Backend
PORT=3000 npm start
```

Then access from any device: `http://YOUR_IP:8000`

### Cloud Deployment

**Frontend Only (GitHub Pages, Netlify):**
- Deploy `frontend/` folder
- Users need local Ollama

**Full Stack (Heroku, Railway):**
- Deploy entire project
- Set up remote Ollama server
- Configure OLLAMA_URL

See `docs/README.md` for detailed deployment.

---

## 🔒 Privacy & Security

### ✅ What's Private
- All AI processing is local
- No data sent to external servers
- Conversations stored in browser only
- You control all data

### 🔐 Best Practices
- Use HTTPS in production
- Don't expose Ollama publicly
- Keep software updated
- Review code before use

---

## 🎓 Usage Tips

### For Learning
1. Select 📚 Teacher
2. Ask: "Explain [topic] simply"
3. Follow-up questions work!

### For Problem Solving
1. Select 🔬 Scientist
2. Describe your problem
3. Get logical solutions

### For Creativity
1. Select 🎨 Creator
2. Say: "Write a story about..."
3. Get unique content

### For Philosophy
1. Select 🧙 Philosopher
2. Ask deep questions
3. Explore ideas

### For Casual Chat
1. Select 💬 Friend
2. Just talk naturally
3. Get support

---

## 🤝 Contributing

Want to improve GOD v2.0?

**Ideas:**
- More characters
- Additional themes
- Tool integrations
- Image generation
- Multi-language support
- Mobile app

**How to contribute:**
1. Fork the repo
2. Make improvements
3. Submit pull request

---

## 📄 License

MIT License - Free to use, modify, and distribute

See LICENSE file for details

---

## 🙏 Acknowledgments

- **Ollama** - Making AI accessible locally
- **Meta** - Llama 3 open model
- **Community** - Testing and feedback
- **You** - For using GOD v2.0!

---

## 📞 Support

- **Issues:** Report bugs or request features
- **Discussions:** Ask questions, share ideas
- **Ollama Help:** https://ollama.com
- **Web Speech API:** https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API

---

## 🎉 What's Next?

### Try These:
1. Enable Live Mode for hands-free chat
2. Try all 6 characters
3. Export your best conversations
4. Install as PWA app
5. Customize themes

### Advanced:
1. Try different models (mistral, mixtral)
2. Adjust temperature for creativity
3. Set up on local network
4. Deploy to cloud

### Share:
- Tell friends about local AI
- Share interesting conversations
- Contribute improvements

---

**Enjoy your advanced, private AI assistant! 🌟**

*"All knowledge, locally, privately, freely."*

**Version:** 2.0.0  
**Updated:** 2026  
**Made with** 💜 **for AI enthusiasts**
