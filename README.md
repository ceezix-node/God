# 🌟 GOD v2.0 - Advanced AI Assistant

**Complete AI assistant with voice capabilities, live mode, multiple characters, and streaming responses. 100% local and private with Ollama.**

![Version](https://img.shields.io/badge/version-2.0.0-purple) ![License](https://img.shields.io/badge/license-MIT-blue)

## ✨ Features

### Core Features
- 🎙️ **Voice Chat** - Real-time speech recognition and text-to-speech
- 🤖 **6 AI Characters** - GOD, Philosopher, Scientist, Creative, Teacher, Friend
- ⚡ **Streaming Responses** - Real-time AI generation
- 🔴 **Live Mode** - Continuous voice conversation
- 💬 **Smart Conversations** - Context-aware responses
- 📱 **PWA** - Install as native app
- 🔒 **100% Private** - Everything runs locally
- 🌈 **4 Themes** - Cosmic, Blue, Gold, Dark

### Technical Features
- Ollama integration with streaming support
- Web Speech API for voice I/O
- Multiple character personalities
- Context-aware conversations (last 10 messages)
- Export chat history
- Adjustable temperature
- Push-to-talk (Space bar)
- Responsive design

## 🚀 Quick Start

### Option 1: Direct Frontend (Simplest)

```bash
# 1. Install Ollama
# Download from: https://ollama.com/download

# 2. Pull a model
ollama pull llama3

# 3. Start Ollama
ollama serve

# 4. Open frontend/index.html in browser
# Or use a simple server:
cd frontend
python -m http.server 8000

# 5. Open http://localhost:8000
```

### Option 2: With Backend Server

```bash
# 1. Install Ollama & pull model (same as above)

# 2. Install backend dependencies
cd backend
npm install

# 3. Start backend server
npm start

# 4. Open http://localhost:3000
```

## 📁 Project Structure

```
god-v2-complete/
├── frontend/
│   ├── index.html          # Main app
│   ├── styles.css          # Styling
│   ├── app.js              # Core logic
│   ├── manifest.json       # PWA config
│   └── service-worker.js   # Offline support
├── backend/
│   ├── server.js           # Express server
│   └── package.json        # Dependencies
└── docs/
    ├── README.md           # This file
    ├── SETUP.md            # Detailed setup
    └── API.md              # API documentation
```

## 🎯 Usage Guide

### Basic Chat
1. Select a character (default: GOD)
2. Type your message
3. Press Send or Enter
4. AI responds with streaming text

### Voice Chat
1. Click 🎤 microphone button
2. Speak your message
3. Message appears in text box
4. Press Send or auto-sends in Live Mode
5. AI responds with voice (if TTS enabled)

### Live Mode
1. Click 🎙️ Live Mode button in header
2. Voice activates continuously
3. Speak naturally - AI responds automatically
4. Click again to disable

### Quick Tips
- **Space bar**: Push-to-talk voice input
- **Shift+Enter**: New line in message
- **🔊/🔇**: Toggle voice responses
- **Quick buttons**: Tap example questions
- **Clear**: Wipes conversation history

## ⚙️ Configuration

### Settings Panel

**Ollama Settings:**
- Endpoint: Default `http://localhost:11434`
- Model: Choose from installed models
- Temperature: 0.0 (factual) to 1.0 (creative)
- Stream: Enable real-time responses

**Voice Settings:**
- Auto Voice: Auto-speak AI responses
- (Voice selection in browser settings)

**Appearance:**
- Theme: Cosmic Purple, Blue, Gold, Dark
- (More themes coming soon)

### Environment Variables (Backend)

```bash
PORT=3000                          # Server port
OLLAMA_URL=http://localhost:11434  # Ollama endpoint
```

## 🦙 Ollama Setup

### Install Ollama

**macOS/Linux:**
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

**Windows:**
Download installer from https://ollama.com/download

### Download Models

```bash
# Recommended: Llama 3 (8B) - Best balance
ollama pull llama3

# Larger: Llama 3 (70B) - Best quality
ollama pull llama3:70b

# Faster: Mistral (7B) - Fast responses
ollama pull mistral

# Lightweight: Phi (2.7B) - Low resource
ollama pull phi

# List installed models
ollama list
```

### Start Ollama

```bash
# Usually starts automatically, or:
ollama serve
```

### Verify

```bash
# Test if running
curl http://localhost:11434/api/tags

# Should return list of models
```

## 🎭 Character Personalities

### 🌟 GOD
Omniscient oracle with comprehensive knowledge. Provides deep, insightful answers with wisdom and authority.

### 🧙 Philosopher
Explores existential questions. Uses thought experiments and references great thinkers.

### 🔬 Scientist
Explains complex topics with evidence and logic. Values empirical data.

### 🎨 Creator
Generates creative content, stories, and artistic interpretations. Makes unique connections.

### 📚 Teacher
Patient educator who breaks down topics. Uses analogies and step-by-step explanations.

### 💬 Friend
Casual, empathetic companion for everyday conversation. Supportive and understanding.

## 🔧 Troubleshooting

### "Connection refused" error

**Problem:** Frontend can't reach Ollama

**Solutions:**
```bash
# 1. Check if Ollama is running
curl http://localhost:11434/api/tags

# 2. Start Ollama
ollama serve

# 3. Check firewall settings
```

### "Model not found" error

**Problem:** Selected model not installed

**Solution:**
```bash
# Pull the model first
ollama pull llama3

# Verify it's installed
ollama list
```

### Voice input not working

**Problem:** Browser doesn't support speech recognition

**Solutions:**
- Use Chrome/Edge (best support)
- Enable microphone permissions
- Check browser settings
- Try different browser

### Slow responses

**Solutions:**
1. Use smaller model (phi, mistral)
2. Reduce temperature
3. Close other applications
4. Use GPU acceleration (automatic if available)

### CORS errors (with backend)

**Problem:** Cross-origin issues

**Solution:**
- Make sure backend is running
- Check OLLAMA_URL in backend
- Use backend proxy instead of direct Ollama

## 🚀 Deployment

### Deploy Frontend Only

**GitHub Pages:**
```bash
# Push to GitHub
git init
git add .
git commit -m "Initial commit"
git push origin main

# Enable Pages in repo settings
```

**Netlify:**
1. Connect repo to Netlify
2. Deploy from `frontend/` directory
3. Done!

### Deploy Full Stack

**Heroku:**
```bash
# In backend/
heroku create god-v2-app
git push heroku main
```

**Railway/Render:**
1. Connect repo
2. Set root directory to `backend/`
3. Auto-deploys

**Note:** Deployed apps need Ollama running somewhere accessible. Consider:
- Running Ollama on a VPS
- Using local Ollama (frontend only deployment)
- Setting up remote Ollama endpoint

## 📊 Performance

### Resource Usage

| Model | RAM | Speed | Quality |
|-------|-----|-------|---------|
| phi | 4GB | Fast | Good |
| mistral | 8GB | Fast | Great |
| llama3 | 8GB | Medium | Excellent |
| llama3:70b | 64GB | Slow | Best |

### Optimization Tips

1. **Use GPU:** Ollama auto-detects NVIDIA/Apple Silicon
2. **Reduce context:** Lower conversation history
3. **Lower temperature:** Faster, more focused responses
4. **Stream mode:** See responses sooner

## 🔒 Privacy & Security

### Data Handling
- ✅ All processing is local
- ✅ No data sent to external servers
- ✅ Conversations stored in browser only
- ✅ Export/delete anytime

### Recommendations
- Use HTTPS in production
- Don't expose Ollama to internet without auth
- Keep Ollama updated
- Review code before use

## 🤝 Contributing

Contributions welcome! Areas for improvement:

- [ ] More AI characters
- [ ] Voice customization
- [ ] Advanced agentic features
- [ ] Tool use integration
- [ ] Image generation
- [ ] Multi-language support
- [ ] Mobile app version

## 📄 License

MIT License - see LICENSE file

## 🙏 Credits

- **Ollama** - Local AI runtime
- **Llama 3** - Base AI model
- **Web Speech API** - Voice capabilities
- Built with love for the open source community

## 📞 Support

- **Issues:** GitHub Issues
- **Discussions:** GitHub Discussions
- **Ollama:** https://ollama.com

---

**Made with 💜 for AI enthusiasts everywhere**

*"All knowledge, locally, privately, freely."*
