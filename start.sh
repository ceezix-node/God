#!/bin/bash

# GOD v2.0 Startup Script

echo "╔════════════════════════════════════════╗"
echo "║       GOD v2.0 Startup Script          ║"
echo "╚════════════════════════════════════════╝"
echo ""

# Check if Ollama is installed
if ! command -v ollama &> /dev/null; then
    echo "❌ Ollama not found!"
    echo "📥 Please install Ollama first: https://ollama.com/download"
    exit 1
fi

echo "✅ Ollama found"

# Check if Ollama is running
if ! curl -s http://localhost:11434/api/tags > /dev/null; then
    echo "🚀 Starting Ollama..."
    ollama serve &
    sleep 2
else
    echo "✅ Ollama already running"
fi

# Check for models
echo ""
echo "📦 Checking models..."
ollama list

# Ask which mode to run
echo ""
echo "Choose startup mode:"
echo "1) Frontend only (simple, port 8000)"
echo "2) Backend + Frontend (full stack, port 3000)"
echo "3) Just check status"
read -p "Enter choice (1-3): " choice

case $choice in
    1)
        echo "🌐 Starting frontend on port 8000..."
        cd frontend
        if command -v python3 &> /dev/null; then
            python3 -m http.server 8000
        elif command -v python &> /dev/null; then
            python -m http.server 8000
        else
            echo "❌ Python not found. Please open frontend/index.html manually."
        fi
        ;;
    2)
        echo "🔧 Starting backend server..."
        cd backend
        if [ ! -d "node_modules" ]; then
            echo "📦 Installing dependencies..."
            npm install
        fi
        npm start
        ;;
    3)
        echo "📊 Status:"
        echo "  Ollama: ✅ Running on http://localhost:11434"
        ollama list
        ;;
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac
