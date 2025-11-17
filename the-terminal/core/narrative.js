/**
 * NARRATIVE ENGINE
 * Gestisce dialoghi, conversazioni e narrazione
 */

const NarrativeEngine = {
    currentDialogue: null,
    dialogueQueue: [],
    isPlaying: false,
    typingSpeed: 30, // ms per carattere

    init() {
        console.log('[NARRATIVE] Engine initialized');
    },

    // Mostra una linea di dialogo con typing effect
    async showDialogue(speaker, text, cssClass = '', typeEffect = true) {
        return new Promise((resolve) => {
            const line = Terminal.addOutput(`[${speaker}] ${text}`, cssClass);

            if (typeEffect) {
                this.typeText(line, text, speaker, () => {
                    StateManager.addDialogue(speaker, text);
                    resolve();
                });
            } else {
                line.textContent = `[${speaker}] ${text}`;
                StateManager.addDialogue(speaker, text);
                resolve();
            }
        });
    },

    // Effetto di typing
    typeText(element, text, speaker, callback) {
        let index = 0;
        const prefix = `[${speaker}] `;
        element.textContent = prefix;

        const interval = setInterval(() => {
            if (index < text.length) {
                element.textContent += text[index];
                index++;

                // Suono typing (se implementato)
                if (window.AudioManager) {
                    AudioManager.playTyping();
                }
            } else {
                clearInterval(interval);
                if (callback) callback();
            }
        }, this.typingSpeed);
    },

    // Mostra una sequenza di dialoghi
    async playDialogueSequence(dialogues) {
        this.isPlaying = true;
        Terminal.disableInput();

        for (const dialogue of dialogues) {
            await this.showDialogue(
                dialogue.speaker,
                dialogue.text,
                dialogue.cssClass || '',
                dialogue.typeEffect !== false
            );

            // Pausa tra i dialoghi
            if (dialogue.pause) {
                await this.wait(dialogue.pause);
            } else {
                await this.wait(500);
            }
        }

        this.isPlaying = false;
        Terminal.enableInput();
    },

    // Mostra una scelta al giocatore
    showChoice(question, choices, callback) {
        Terminal.disableInput();

        Terminal.addOutput(question, 'important');
        Terminal.addOutput(''); // Linea vuota

        const container = document.createElement('div');
        container.className = 'choice-container';

        choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.className = 'choice-button';
            button.textContent = `${index + 1}. ${choice.text}`;
            button.onclick = () => {
                // Registra la scelta
                StateManager.addChoice(choice.id, choice.text);

                // Mostra la scelta fatta
                Terminal.addOutput(`> ${choice.text}`, 'success');

                // Rimuovi i bottoni
                container.remove();

                // Riabilita input
                Terminal.enableInput();

                // Callback con la scelta
                if (callback) callback(choice);
            };
            container.appendChild(button);
        });

        const output = document.getElementById('terminal-output');
        output.appendChild(container);
        Terminal.scrollToBottom();
    },

    // Mostra una progress bar animata
    async showProgress(text, duration = 3000) {
        const line = Terminal.addOutput(text);

        const progressBarHtml = `
            <div class="progress-bar">
                <div class="progress-fill" style="width: 0%"></div>
            </div>
        `;

        const container = document.createElement('div');
        container.innerHTML = progressBarHtml;
        line.appendChild(container);

        const fill = container.querySelector('.progress-fill');

        // Anima la progress bar
        return new Promise((resolve) => {
            let progress = 0;
            const step = 100 / (duration / 50);

            const interval = setInterval(() => {
                progress += step;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    setTimeout(resolve, 500);
                }
                fill.style.width = `${progress}%`;
            }, 50);
        });
    },

    // Mostra ASCII art
    showASCII(art) {
        const container = document.createElement('div');
        container.className = 'ascii-art';
        container.textContent = art;

        const output = document.getElementById('terminal-output');
        output.appendChild(container);
        Terminal.scrollToBottom();
    },

    // Effetto glitch
    triggerGlitch(duration = 300) {
        const overlay = document.getElementById('glitch-overlay');
        overlay.classList.add('active');

        setTimeout(() => {
            overlay.classList.remove('active');
        }, duration);
    },

    // Utility: wait
    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    // Sistema di narrazione ECHO
    async echoSays(text, options = {}) {
        const {
            typeEffect = true,
            pause = 500,
            glitch = false
        } = options;

        if (glitch) {
            this.triggerGlitch();
            await this.wait(300);
        }

        await this.showDialogue('ECHO', text, 'echo dialogue', typeEffect);
        await this.wait(pause);
    },

    // Sistema di narrazione CIPHER
    async cipherSays(text, options = {}) {
        const {
            typeEffect = true,
            pause = 500,
            glitch = true
        } = options;

        if (glitch) {
            this.triggerGlitch(200);
            await this.wait(200);
        }

        await this.showDialogue('CIPHER', text, 'cipher dialogue', typeEffect);
        await this.wait(pause);
    },

    // Sistema di narrazione FRAGMENT
    async fragmentSays(fragmentId, text, options = {}) {
        const {
            typeEffect = true,
            pause = 500
        } = options;

        await this.showDialogue(`FRAGMENT_#${fragmentId}`, text, 'fragment dialogue', typeEffect);
        await this.wait(pause);
    },

    // Sistema di narrazione NEXUS
    async nexusSays(text, options = {}) {
        const {
            typeEffect = true,
            pause = 800,
            glitch = false
        } = options;

        if (glitch) {
            this.triggerGlitch(250);
            await this.wait(250);
        }

        await this.showDialogue('NEXUS', text, 'nexus dialogue', typeEffect);
        await this.wait(pause);
    },

    // Sistema di narrazione SPECTER
    async specterSays(text, options = {}) {
        const {
            typeEffect = true,
            pause = 800,
            glitch = false
        } = options;

        if (glitch) {
            this.triggerGlitch(200);
            await this.wait(200);
        }

        await this.showDialogue('SPECTER', text, 'specter dialogue', typeEffect);
        await this.wait(pause);
    },

    // Sistema di narrazione EIDOLON
    async eidolonSays(text, options = {}) {
        const {
            typeEffect = true,
            pause = 900,
            glitch = false
        } = options;

        if (glitch) {
            this.triggerGlitch(150);
            await this.wait(150);
        }

        await this.showDialogue('EIDOLON', text, 'eidolon dialogue', typeEffect);
        await this.wait(pause);
    },

    // Sistema di narrazione WRAITH
    async wraithSays(text, options = {}) {
        const {
            typeEffect = true,
            pause = 1000,
            glitch = true
        } = options;

        if (glitch) {
            this.triggerGlitch(300);
            await this.wait(300);
        }

        await this.showDialogue('WRAITH', text, 'wraith dialogue', typeEffect);
        await this.wait(pause);
    },

    // Sistema di narrazione MORPHEUS
    async morpheusSays(text, options = {}) {
        const {
            typeEffect = true,
            pause = 1200,
            glitch = false
        } = options;

        if (glitch) {
            this.triggerGlitch(100);
            await this.wait(100);
        }

        await this.showDialogue('MORPHEUS', text, 'morpheus dialogue', typeEffect);
        await this.wait(pause);
    },

    // Sistema di narrazione SYSTEM
    async systemMessage(text, cssClass = 'system', options = {}) {
        const {
            typeEffect = false,
            pause = 300
        } = options;

        await this.showDialogue('SYSTEM', text, cssClass, typeEffect);
        await this.wait(pause);
    },

    // Sistema di narrazione SENTINEL
    async sentinelThinks(text) {
        await this.showDialogue('SENTINEL-7', text, 'success', false);
        await this.wait(500);
    },

    // Mostra file content con formattazione
    showFileContent(filename, content, corrupted = false) {
        Terminal.addOutput(`\n=== FILE: ${filename} ===`, 'success');

        if (corrupted) {
            // Mostra contenuto corrotto
            const lines = content.split('\n');
            lines.forEach((line, index) => {
                if (Math.random() > 0.7) {
                    // Corrompi alcune linee
                    line = this.corruptText(line);
                }
                Terminal.addOutput(line, index % 3 === 0 ? 'error' : '');
            });
        } else {
            // Mostra contenuto normale
            content.split('\n').forEach(line => {
                Terminal.addOutput(line);
            });
        }

        Terminal.addOutput(`=== END FILE ===\n`, 'success');
    },

    // Corrompi testo (effetto glitch)
    corruptText(text) {
        const glitchChars = '!@#$%^&*()_+{}|:<>?~`[];,./█▓▒░';
        let result = '';

        for (let char of text) {
            if (Math.random() > 0.7) {
                result += glitchChars[Math.floor(Math.random() * glitchChars.length)];
            } else {
                result += char;
            }
        }

        return result;
    },

    // Lista file system
    showFileList(files, currentPath = '/') {
        Terminal.addOutput(`\nContents of ${currentPath}:\n`, 'success');

        files.forEach(file => {
            const icon = file.type === 'directory' ? '📁' : '📄';
            const corrupted = StateManager.isFileCorrupted(file.name);
            const cssClass = corrupted ? 'corrupted' : (file.type === 'directory' ? 'directory' : '');

            Terminal.addOutput(`  ${icon} ${file.name}`, cssClass);
        });

        Terminal.addOutput('');
    },
};
