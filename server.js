// GOD v2.0 Backend Server (Optional)
// This server provides a proxy to Ollama and serves the frontend

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', ollama: OLLAMA_URL });
});

// Proxy to Ollama - Generate
app.post('/api/generate', async (req, res) => {
    try {
        const response = await fetch(`${OLLAMA_URL}/api/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        });

        if (req.body.stream) {
            // Stream response
            res.setHeader('Content-Type', 'application/json');
            response.body.pipe(res);
        } else {
            const data = await response.json();
            res.json(data);
        }
    } catch (error) {
        console.error('Ollama error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Proxy to Ollama - List models
app.get('/api/models', async (req, res) => {
    try {
        const response = await fetch(`${OLLAMA_URL}/api/tags`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Catch-all route - serve index.html for SPA
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════╗
║     GOD v2.0 Server Running!          ║
╚═══════════════════════════════════════╝

🌐 Frontend: http://localhost:${PORT}
🤖 Ollama:   ${OLLAMA_URL}

Press Ctrl+C to stop
    `);
});
