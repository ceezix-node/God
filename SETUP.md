# 🚀 Quick Setup Guide - GOD v2.0

Get up and running in **5 minutes**!

## Step 1: Install Ollama (2 min)

### Download Ollama
- **macOS:** https://ollama.com/download/mac
- **Windows:** https://ollama.com/download/windows
- **Linux:** `curl -fsSL https://ollama.com/install.sh | sh`

### Pull a Model
```bash
ollama pull llama3
```

This downloads Llama 3 (8B) - about 4.7GB.

**Alternative models:**
- Faster: `ollama pull mistral` (4.1GB)
- Lightweight: `ollama pull phi` (2.7GB)
- Best quality: `ollama pull llama3:70b` (40GB, needs 64GB RAM)

## Step 2: Start Ollama (30 sec)

Ollama usually starts automatically. If not:

```bash
ollama serve
```

**Verify it's running:**
```bash
ollama list
```

You should see your downloaded model.

## Step 3: Run GOD v2.0 (1 min)

### Option A: Simple (No Backend)

```bash
cd frontend
python -m http.server 8000
```

**Or with Node:**
```bash
npx http-server frontend -p 8000
```

**Or just open:**
- Double-click `frontend/index.html` in your browser

### Option B: With Backend

```bash
cd backend
npm install          # First time only
npm start
```

## Step 4: Open & Use (1 min)

1. **Open browser:** http://localhost:8000 (or 3000 for backend)
2. **Test connection:** Click Settings ⚙️ → "Test Connection"
3. **Start chatting!**

## ✅ You're Ready!

Try these:
- Type: "Explain quantum physics simply"
- Click 🎤 and say: "Tell me a story"
- Switch character to 🧙 Philosopher
- Enable 🎙️ Live Mode for continuous chat

## 🔧 Troubleshooting

### Ollama not connecting?
```bash
# Check if Ollama is running
curl http://localhost:11434/api/tags

# Restart Ollama
ollama serve
```

### Model errors?
```bash
# Make sure model is installed
ollama list

# If not, pull it
ollama pull llama3
```

### Voice not working?
- Use Chrome or Edge (best support)
- Allow microphone permissions
- Check browser microphone settings

### Slow responses?
- Try a smaller model: `ollama pull mistral`
- Close other apps
- Lower temperature in settings

## 📚 Next Steps

- Read full [README.md](README.md) for features
- Try different characters
- Customize settings
- Enable Live Mode
- Export your conversations

## 💡 Pro Tips

1. **Space bar** = Quick voice input (push-to-talk)
2. **Shift+Enter** = New line (don't send)
3. **Quick buttons** = Try example prompts
4. **Live Mode** = Hands-free conversation
5. **Export** = Save your chat history

## 🎯 Common Use Cases

### Learning
Select 📚 Teacher character and ask: "Explain [topic] step by step"

### Problem Solving
Select 🔬 Scientist and describe your problem

### Creative Writing
Select 🎨 Creator and say: "Write a story about..."

### Philosophy
Select 🧙 Philosopher and ask: "What is the meaning of..."

### Casual Chat
Select 💬 Friend and just talk naturally

---

**Need help?** Check the full docs or open an issue!

**Enjoy your advanced AI assistant! 🌟**
