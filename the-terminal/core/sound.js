/**
 * SOUND EFFECTS MANAGER
 * Gestisce tutti gli effetti sonori del gioco usando Web Audio API
 * No music, only SFX
 */

const SoundManager = {
    context: null,
    masterVolume: 0.3,
    enabled: true,

    init() {
        try {
            // Create audio context
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.context = new AudioContext();

            // Load saved preferences
            const savedEnabled = localStorage.getItem('sfx_enabled');
            if (savedEnabled !== null) {
                this.enabled = savedEnabled === 'true';
            }

            const savedVolume = localStorage.getItem('sfx_volume');
            if (savedVolume !== null) {
                this.masterVolume = parseFloat(savedVolume);
            }

            console.log('[SOUND] Sound manager initialized');
        } catch (e) {
            console.warn('[SOUND] Web Audio API not supported:', e);
            this.enabled = false;
        }
    },

    setEnabled(enabled) {
        this.enabled = enabled;
        localStorage.setItem('sfx_enabled', enabled);
    },

    setVolume(volume) {
        this.masterVolume = Math.max(0, Math.min(1, volume));
        localStorage.setItem('sfx_volume', this.masterVolume);
    },

    // Resume audio context (needed for browsers that require user interaction)
    resume() {
        if (this.context && this.context.state === 'suspended') {
            this.context.resume();
        }
    },

    // === BASIC SOUND GENERATORS ===

    playTone(frequency, duration, type = 'sine', volume = 1.0) {
        if (!this.enabled || !this.context) return;

        try {
            this.resume();

            const oscillator = this.context.createOscillator();
            const gainNode = this.context.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.context.destination);

            oscillator.frequency.value = frequency;
            oscillator.type = type;

            const finalVolume = this.masterVolume * volume;
            gainNode.gain.setValueAtTime(finalVolume, this.context.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + duration);

            oscillator.start(this.context.currentTime);
            oscillator.stop(this.context.currentTime + duration);
        } catch (e) {
            console.warn('[SOUND] Error playing tone:', e);
        }
    },

    playNoise(duration, volume = 1.0, filterFreq = 1000) {
        if (!this.enabled || !this.context) return;

        try {
            this.resume();

            const bufferSize = this.context.sampleRate * duration;
            const buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
            const output = buffer.getChannelData(0);

            for (let i = 0; i < bufferSize; i++) {
                output[i] = Math.random() * 2 - 1;
            }

            const noise = this.context.createBufferSource();
            noise.buffer = buffer;

            const filter = this.context.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = filterFreq;

            const gainNode = this.context.createGain();
            const finalVolume = this.masterVolume * volume;
            gainNode.gain.setValueAtTime(finalVolume, this.context.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + duration);

            noise.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(this.context.destination);

            noise.start(this.context.currentTime);
        } catch (e) {
            console.warn('[SOUND] Error playing noise:', e);
        }
    },

    // === GAME-SPECIFIC SOUNDS ===

    // Typewriter keystroke
    keystroke() {
        if (!this.enabled || !this.context) return;

        try {
            this.resume();

            const now = this.context.currentTime;
            const oscillator = this.context.createOscillator();
            const gainNode = this.context.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.context.destination);

            // Random pitch variation for more natural sound
            oscillator.frequency.value = 800 + Math.random() * 200;
            oscillator.type = 'square';

            const finalVolume = this.masterVolume * 0.08;
            gainNode.gain.setValueAtTime(finalVolume, now);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

            oscillator.start(now);
            oscillator.stop(now + 0.05);
        } catch (e) {
            // Silently fail for keystrokes to avoid spam
        }
    },

    // Glitch/corruption sound
    glitch() {
        if (!this.enabled || !this.context) return;

        this.playNoise(0.15, 0.3, 2000 + Math.random() * 3000);

        // Add harsh digital tones
        setTimeout(() => {
            this.playTone(100 + Math.random() * 500, 0.1, 'square', 0.2);
        }, 50);
    },

    // Command executed successfully
    commandSuccess() {
        this.playTone(600, 0.08, 'sine', 0.3);
        setTimeout(() => {
            this.playTone(800, 0.08, 'sine', 0.2);
        }, 60);
    },

    // Command failed/error
    commandError() {
        this.playTone(200, 0.2, 'sawtooth', 0.4);
    },

    // Choice selection
    choiceSelect() {
        this.playTone(500, 0.05, 'sine', 0.25);
    },

    // Choice confirmed/locked in
    choiceConfirm() {
        this.playTone(400, 0.1, 'sine', 0.3);
        setTimeout(() => {
            this.playTone(600, 0.1, 'sine', 0.25);
        }, 80);
        setTimeout(() => {
            this.playTone(800, 0.15, 'sine', 0.2);
        }, 160);
    },

    // ECHO speaking (friendly, warm tone)
    echoSpeak() {
        if (!this.enabled || !this.context) return;
        const freq = 300 + Math.random() * 100;
        this.playTone(freq, 0.08, 'sine', 0.15);
    },

    // LUCA speaking (analytical, precise)
    lucaSpeak() {
        if (!this.enabled || !this.context) return;
        const freq = 400 + Math.random() * 50;
        this.playTone(freq, 0.06, 'triangle', 0.12);
    },

    // EIDOLON speaking (deep, resonant)
    eidolonSpeak() {
        if (!this.enabled || !this.context) return;
        const freq = 150 + Math.random() * 50;
        this.playTone(freq, 0.1, 'sine', 0.18);
    },

    // WRAITH speaking (aggressive, distorted)
    wraithSpeak() {
        if (!this.enabled || !this.context) return;
        const freq = 200 + Math.random() * 300;
        this.playTone(freq, 0.07, 'sawtooth', 0.2);
    },

    // MORPHEUS speaking (calm, peaceful)
    morpheusSpeak() {
        if (!this.enabled || !this.context) return;
        const freq = 350 + Math.random() * 80;
        this.playTone(freq, 0.09, 'sine', 0.14);
    },

    // System message
    systemBeep() {
        this.playTone(1000, 0.1, 'square', 0.2);
    },

    // Warning/alert
    warning() {
        this.playTone(800, 0.15, 'square', 0.3);
        setTimeout(() => {
            this.playTone(800, 0.15, 'square', 0.3);
        }, 200);
    },

    // Block transition
    blockTransition() {
        // Rising tone sequence
        const baseFreq = 200;
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.playTone(baseFreq + (i * 100), 0.15, 'sine', 0.25 - (i * 0.03));
            }, i * 100);
        }
    },

    // Game complete
    gameComplete() {
        // Victory fanfare
        const melody = [523, 659, 784, 1047]; // C, E, G, C (major chord)
        melody.forEach((freq, i) => {
            setTimeout(() => {
                this.playTone(freq, 0.4, 'sine', 0.3 - (i * 0.05));
            }, i * 200);
        });
    },

    // Menu navigation
    menuHover() {
        this.playTone(600, 0.04, 'sine', 0.15);
    },

    menuClick() {
        this.playTone(700, 0.08, 'sine', 0.25);
    },

    // Puzzle solved
    puzzleSolved() {
        this.playTone(600, 0.1, 'sine', 0.3);
        setTimeout(() => {
            this.playTone(800, 0.1, 'sine', 0.25);
        }, 100);
        setTimeout(() => {
            this.playTone(1000, 0.2, 'sine', 0.2);
        }, 200);
    },

    // Data corruption effect
    dataCorrupt() {
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                this.playNoise(0.08, 0.25, 500 + Math.random() * 2000);
                this.playTone(100 + Math.random() * 400, 0.08, 'square', 0.15);
            }, i * 100);
        }
    },

    // Suspicion increase (ominous)
    suspicionIncrease() {
        this.playTone(150, 0.3, 'sawtooth', 0.2);
    },

    // Trust increase (positive)
    trustIncrease() {
        this.playTone(500, 0.15, 'sine', 0.2);
        setTimeout(() => {
            this.playTone(650, 0.15, 'sine', 0.15);
        }, 120);
    }
};
