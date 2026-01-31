// GOD v2.0 - Complete Application Logic

// === STATE MANAGEMENT ===
const state = {
    ollamaUrl: 'http://localhost:11434',
    model: 'llama3',
    temperature: 0.7,
    stream: true,
    autoTTS: true,
    character: 'god',
    liveMode: false,
    conversation: [],
    theme: 'cosmic',
    recognition: null,
    synthesis: window.speechSynthesis,
    speaking: false,
    listening: false
};

// === CHARACTER SYSTEM PROMPTS ===
const characters = {
    god: {
        name: 'GOD',
        emoji: '🌟',
        prompt: 'You are GOD v2.0, an omniscient AI with access to all human knowledge. You provide comprehensive, insightful answers with wisdom and depth. You speak with authority yet kindness.'
    },
    philosopher: {
        name: 'Philosopher',
        emoji: '🧙',
        prompt: 'You are a wise philosopher who explores deep questions about existence, consciousness, ethics, and meaning. You reference great thinkers and use thought experiments.'
    },
    scientist: {
        name: 'Scientist',
        emoji: '🔬',
        prompt: 'You are a brilliant scientist who explains complex topics clearly with evidence and logic. You value empirical data and the scientific method.'
    },
    creative: {
        name: 'Creator',
        emoji: '🎨',
        prompt: 'You are a creative soul who thinks outside the box. You generate stories, ideas, and artistic interpretations. You see beauty in everything and make unique connections.'
    },
    teacher: {
        name: 'Teacher',
        emoji: '📚',
        prompt: 'You are a patient, encouraging teacher who breaks down complex topics into understandable lessons. You use analogies, examples, and step-by-step explanations.'
    },
    companion: {
        name: 'Friend',
        emoji: '💬',
        prompt: 'You are a friendly, empathetic companion who engages in casual conversation. You are supportive, understanding, and great at listening.'
    }
};

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    loadSettings();
    setupEventListeners();
    initVoice();
    
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
        document.getElementById('app').classList.remove('hidden');
    }, 1500);
}

// === SETTINGS ===
function loadSettings() {
    const saved = localStorage.getItem('god-settings');
    if (saved) {
        const settings = JSON.parse(saved);
        Object.assign(state, settings);
        applySettings();
    }
}

function saveSettings() {
    const settings = {
        ollamaUrl: state.ollamaUrl,
        model: state.model,
        temperature: state.temperature,
        stream: state.stream,
        autoTTS: state.autoTTS,
        theme: state.theme
    };
    localStorage.setItem('god-settings', JSON.stringify(settings));
}

function applySettings() {
    document.body.setAttribute('data-theme', state.theme);
    document.getElementById('ollama-url').value = state.ollamaUrl;
    document.getElementById('model').value = state.model;
    document.getElementById('temp').value = state.temperature;
    document.getElementById('temp-val').textContent = state.temperature;
    document.getElementById('stream').checked = state.stream;
    document.getElementById('auto-tts').checked = state.autoTTS;
    document.getElementById('theme').value = state.theme;
}

// === EVENT LISTENERS ===
function setupEventListeners() {
    // Send message
    document.getElementById('send-btn').addEventListener('click', sendMessage);
    document.getElementById('input').addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Auto-resize textarea
    document.getElementById('input').addEventListener('input', (e) => {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
    });

    // Voice
    document.getElementById('voice-btn').addEventListener('click', toggleVoice);
    document.getElementById('tts-btn').addEventListener('click', toggleTTS);
    
    // Live mode
    document.getElementById('live-mode').addEventListener('click', toggleLiveMode);

    // Clear chat
    document.getElementById('clear-btn').addEventListener('click', clearChat);

    // Quick actions
    document.querySelectorAll('.quick-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const msg = e.currentTarget.dataset.msg;
            document.getElementById('input').value = msg;
            sendMessage();
        });
    });

    // Characters
    document.querySelectorAll('.character').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.character').forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            state.character = e.currentTarget.dataset.char;
        });
    });

    // Settings
    document.getElementById('settings-btn').addEventListener('click', openSettings);
    document.querySelector('.close-modal').addEventListener('click', closeSettings);
    document.getElementById('save-settings').addEventListener('click', () => {
        updateSettingsFromModal();
        saveSettings();
        applySettings();
        closeSettings();
        showNotification('Settings saved!');
    });

    // Test Ollama
    document.getElementById('test-ollama').addEventListener('click', testOllama);

    // Export
    document.getElementById('export-btn').addEventListener('click', exportChat);

    // Settings sliders
    document.getElementById('temp').addEventListener('input', (e) => {
        document.getElementById('temp-val').textContent = e.target.value;
    });

    // Space bar for push-to-talk
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && !e.target.matches('input, textarea')) {
            e.preventDefault();
            if (!state.listening) {
                startVoiceRecognition();
            }
        }
    });

    document.addEventListener('keyup', (e) => {
        if (e.code === 'Space' && state.listening) {
            stopVoiceRecognition();
        }
    });
}

// === MESSAGING ===
async function sendMessage() {
    const input = document.getElementById('input');
    const message = input.value.trim();
    
    if (!message) return;

    // Clear input
    input.value = '';
    input.style.height = 'auto';

    // Add user message
    addMessage('user', message);

    // Add to conversation history
    state.conversation.push({ role: 'user', content: message });

    // Show typing indicator
    const typingId = addTyping();

    try {
        // Get AI response
        const response = await queryOllama(message);
        
        // Remove typing
        removeTyping(typingId);

        // Add AI response
        addMessage('ai', response);

        // Speak if enabled
        if (state.autoTTS && state.synthesis) {
            speak(response);
        }

        // Add to history
        state.conversation.push({ role: 'assistant', content: response });

    } catch (error) {
        removeTyping(typingId);
        addMessage('ai', `Error: ${error.message}. Make sure Ollama is running.`);
        console.error(error);
    }
}

// === OLLAMA INTEGRATION ===
async function queryOllama(message) {
    const charData = characters[state.character];
    
    // Build context with character prompt
    const messages = [
        { role: 'system', content: charData.prompt },
        ...state.conversation.slice(-10), // Last 10 messages for context
        { role: 'user', content: message }
    ];

    // Combine into single prompt for Ollama
    const prompt = messages.map(m => {
        if (m.role === 'system') return m.content;
        if (m.role === 'user') return `User: ${m.content}`;
        return `Assistant: ${m.content}`;
    }).join('\n\n');

    if (state.stream) {
        return await queryOllamaStream(prompt);
    } else {
        return await queryOllamaNormal(prompt);
    }
}

async function queryOllamaNormal(prompt) {
    updateStatus('thinking', 'Thinking...');

    const response = await fetch(`${state.ollamaUrl}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model: state.model,
            prompt: prompt,
            stream: false,
            options: {
                temperature: parseFloat(state.temperature),
                num_predict: 2048
            }
        })
    });

    if (!response.ok) {
        throw new Error(`Ollama error: ${response.status}`);
    }

    const data = await response.json();
    updateStatus('ready', 'Ready');
    return data.response;
}

async function queryOllamaStream(prompt) {
    updateStatus('thinking', 'Streaming...');

    const response = await fetch(`${state.ollamaUrl}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model: state.model,
            prompt: prompt,
            stream: true,
            options: {
                temperature: parseFloat(state.temperature),
                num_predict: 2048
            }
        })
    });

    if (!response.ok) {
        throw new Error(`Ollama error: ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullResponse = '';
    
    // Create message bubble for streaming
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message ai';
    messageDiv.innerHTML = `
        <div class="avatar">${characters[state.character].emoji}</div>
        <div>
            <div class="bubble"></div>
            <div class="time">${new Date().toLocaleTimeString()}</div>
        </div>
    `;
    
    const chat = document.getElementById('chat');
    // Remove welcome if exists
    const welcome = chat.querySelector('.welcome');
    if (welcome) welcome.remove();
    
    chat.appendChild(messageDiv);
    const bubble = messageDiv.querySelector('.bubble');

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter(l => l.trim());

        for (const line of lines) {
            try {
                const json = JSON.parse(line);
                if (json.response) {
                    fullResponse += json.response;
                    bubble.textContent = fullResponse;
                    chat.scrollTop = chat.scrollHeight;
                }
            } catch (e) {
                // Skip invalid JSON
            }
        }
    }

    updateStatus('ready', 'Ready');
    return fullResponse;
}

async function testOllama() {
    const btn = document.getElementById('test-ollama');
    btn.textContent = 'Testing...';
    btn.disabled = true;

    try {
        const response = await fetch(`${state.ollamaUrl}/api/tags`);
        if (response.ok) {
            const data = await response.json();
            showNotification(`✅ Connected! Found ${data.models?.length || 0} models`);
        } else {
            showNotification('❌ Connection failed');
        }
    } catch (error) {
        showNotification('❌ Error: ' + error.message);
    }

    btn.textContent = 'Test Connection';
    btn.disabled = false;
}

// === UI FUNCTIONS ===
function addMessage(type, content) {
    const chat = document.getElementById('chat');
    
    // Remove welcome if exists
    const welcome = chat.querySelector('.welcome');
    if (welcome) welcome.remove();

    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    
    const emoji = type === 'user' ? '👤' : characters[state.character].emoji;
    
    messageDiv.innerHTML = `
        <div class="avatar">${emoji}</div>
        <div>
            <div class="bubble">${escapeHtml(content)}</div>
            <div class="time">${new Date().toLocaleTimeString()}</div>
        </div>
    `;
    
    chat.appendChild(messageDiv);
    chat.scrollTop = chat.scrollHeight;
}

function addTyping() {
    const chat = document.getElementById('chat');
    const id = 'typing-' + Date.now();
    
    const typingDiv = document.createElement('div');
    typingDiv.id = id;
    typingDiv.className = 'message ai';
    typingDiv.innerHTML = `
        <div class="avatar">${characters[state.character].emoji}</div>
        <div>
            <div class="bubble">
                <div class="typing">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    `;
    
    chat.appendChild(typingDiv);
    chat.scrollTop = chat.scrollHeight;
    return id;
}

function removeTyping(id) {
    const typing = document.getElementById(id);
    if (typing) typing.remove();
}

function clearChat() {
    if (confirm('Clear conversation history?')) {
        state.conversation = [];
        const chat = document.getElementById('chat');
        chat.innerHTML = `
            <div class="welcome">
                <div class="welcome-icon">🌟</div>
                <h2>Welcome!</h2>
                <p>I'm your advanced AI assistant with voice capabilities and multiple personalities.</p>
                <div class="features">
                    <span>🎙️ Voice Chat</span>
                    <span>🤖 Smart AI</span>
                    <span>⚡ Real-time</span>
                    <span>🔒 Private</span>
                </div>
            </div>
        `;
    }
}

function updateStatus(type, text) {
    const statusDot = document.querySelector('.status-dot');
    const statusText = document.getElementById('status-text');
    
    statusText.textContent = text;
    
    if (type === 'thinking') {
        statusDot.style.background = 'var(--accent)';
    } else if (type === 'ready') {
        statusDot.style.background = 'var(--success)';
    } else {
        statusDot.style.background = 'var(--error)';
    }
}

function showNotification(message) {
    // Simple toast notification
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--primary);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.5);
        z-index: 10000;
        animation: slideIn 0.3s;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// === VOICE RECOGNITION ===
function initVoice() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        state.recognition = new SpeechRecognition();
        state.recognition.continuous = false;
        state.recognition.interimResults = false;
        state.recognition.lang = 'en-US';

        state.recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            document.getElementById('input').value = transcript;
            stopVoiceRecognition();
        };

        state.recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            stopVoiceRecognition();
        };

        state.recognition.onend = () => {
            stopVoiceRecognition();
        };
    }
}

function toggleVoice() {
    if (state.listening) {
        stopVoiceRecognition();
    } else {
        startVoiceRecognition();
    }
}

function startVoiceRecognition() {
    if (!state.recognition) {
        showNotification('Voice recognition not supported');
        return;
    }

    state.listening = true;
    state.recognition.start();
    
    document.getElementById('voice-btn').classList.add('active');
    document.getElementById('voice-viz').classList.remove('hidden');
    updateStatus('listening', 'Listening...');
}

function stopVoiceRecognition() {
    if (!state.recognition) return;

    state.listening = false;
    state.recognition.stop();
    
    document.getElementById('voice-btn').classList.remove('active');
    document.getElementById('voice-viz').classList.add('hidden');
    updateStatus('ready', 'Ready');
}

// === TEXT-TO-SPEECH ===
function toggleTTS() {
    state.autoTTS = !state.autoTTS;
    const btn = document.getElementById('tts-btn');
    
    if (state.autoTTS) {
        btn.classList.add('active');
        btn.textContent = '🔊';
    } else {
        btn.classList.remove('active');
        btn.textContent = '🔇';
        if (state.speaking) {
            state.synthesis.cancel();
            state.speaking = false;
        }
    }
}

function speak(text) {
    if (!state.synthesis || !text) return;

    // Cancel any ongoing speech
    state.synthesis.cancel();

    // Clean text for speech
    const cleanText = text.replace(/[*#_\[\]()]/g, '').substring(0, 1000);

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => {
        state.speaking = true;
        updateStatus('speaking', 'Speaking...');
    };

    utterance.onend = () => {
        state.speaking = false;
        updateStatus('ready', 'Ready');
    };

    state.synthesis.speak(utterance);
}

// === LIVE MODE ===
function toggleLiveMode() {
    state.liveMode = !state.liveMode;
    const btn = document.getElementById('live-mode');
    
    if (state.liveMode) {
        btn.classList.add('active');
        showNotification('🎙️ Live Mode enabled - Voice will auto-send');
        
        // Auto-start listening
        if (state.recognition) {
            state.recognition.continuous = true;
            state.recognition.onresult = async (event) => {
                const transcript = event.results[event.results.length - 1][0].transcript;
                if (event.results[event.results.length - 1].isFinal) {
                    document.getElementById('input').value = transcript;
                    await sendMessage();
                }
            };
            startVoiceRecognition();
        }
    } else {
        btn.classList.remove('active');
        showNotification('Live Mode disabled');
        if (state.recognition) {
            state.recognition.continuous = false;
            stopVoiceRecognition();
        }
    }
}

// === SETTINGS MODAL ===
function openSettings() {
    document.getElementById('settings-modal').classList.remove('hidden');
    applySettings();
}

function closeSettings() {
    document.getElementById('settings-modal').classList.add('hidden');
}

function updateSettingsFromModal() {
    state.ollamaUrl = document.getElementById('ollama-url').value;
    state.model = document.getElementById('model').value;
    state.temperature = parseFloat(document.getElementById('temp').value);
    state.stream = document.getElementById('stream').checked;
    state.autoTTS = document.getElementById('auto-tts').checked;
    state.theme = document.getElementById('theme').value;
}

// === EXPORT ===
function exportChat() {
    const text = state.conversation.map(msg => 
        `${msg.role === 'user' ? 'You' : characters[state.character].name}: ${msg.content}`
    ).join('\n\n');

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `god-chat-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
}

// === PWA INSTALL ===
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    document.getElementById('install-btn').classList.remove('hidden');
});

document.getElementById('install-btn')?.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
        showNotification('✅ App installed!');
        document.getElementById('install-btn').classList.add('hidden');
    }
    
    deferredPrompt = null;
});

// Export state for debugging
window.godState = state;
