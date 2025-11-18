/**
 * MAIN MENU
 * Main game menu
 */

// Credits translations
const CREDITS_TRANSLATIONS = {
    it: {
        author_label: "Autore",
        inspiration: "Le ispirazioni per il mio gioco sono state Pony Island, The Stanley Parable e NaissancE",
        message1: "Ringrazio te Fogliolina mia, per aver strappato parti di me che non riavrò mai più",
        message2: "Non mi hai mai ringraziato per esserti cibata del mio nettare, per poi abbandonarlo e tramutarlo in veleno",
        message3: "Io sono morto quel giorno",
        message4: "Ora mi rivolgo a te, utente coraggioso che hai scelto di avventurarti in questo breve viaggio. Se hai comprato il gioco ti sono grato per la fiducia. Se lo hai piratato non posso biasimarti. In entrambe le circostanze, spero di non averti fatto perdere del tempo",
        goodbye: "Alla prossima",
        skip: "Salta [ESC]"
    },
    en: {
        author_label: "Author",
        inspiration: "The inspirations for my game were Pony Island, The Stanley Parable and NaissancE",
        message1: "Thank you my Little Leaf, for tearing away parts of me that I will never get back",
        message2: "You never thanked me for feeding on my nectar, only to abandon it and turn it into poison",
        message3: "I died that day",
        message4: "Now I turn to you, brave user who chose to venture into this short journey. If you bought the game I am grateful for your trust. If you pirated it I cannot blame you. In both circumstances, I hope I didn't waste your time",
        goodbye: "Until next time",
        skip: "Skip [ESC]"
    }
};

const MainMenu = {
    menuActive: false,

    // Game options (stored in localStorage)
    options: {
        crtEffects: true,
        crtCurved: true,
        scanlines: true,
        glitchEffects: true,
        typewriterEffect: true,
        soundEffects: true,
    },

    async show() {
        console.log('[MENU] Showing main menu');
        this.menuActive = true;
        this.loadOptions();

        Terminal.clear();
        Terminal.disableInput();

        const output = document.getElementById('terminal-output');

        // ASCII Art Title - Free and animated
        const titleDiv = document.createElement('div');
        titleDiv.className = 'menu-title-animated';
        titleDiv.style.cssText = 'text-align: center; margin: 40px 0 20px 0;';
        titleDiv.innerHTML = `
<pre class="title-logo" style="
    color: #00ff41;
    text-shadow:
        0 0 10px #00ff41,
        0 0 20px #00ff41,
        0 0 30px #00ff41,
        0 0 40px #00aa33;
    font-size: 14px;
    line-height: 1.1;
    letter-spacing: 2px;
    animation: titlePulse 3s ease-in-out infinite, titleGlitch 8s infinite;
">
▀█▀ █ █ █▀▀   ▀█▀ █▀▀ █▀▀█ █▀▄▀█ █ █▄ █ ▄▀▄ █
 █  █▀█ █▀▀    █  █▀▀ █▄▄▀ █ ▀ █ █ █ ▀█ █▀█ █
 ▀  ▀ ▀ ▀▀▀    ▀  ▀▀▀ ▀ ▀▀ ▀   ▀ ▀ ▀  ▀ ▀ ▀ ▀▀▀
</pre>
<div class="subtitle" style="
    color: #888;
    font-style: italic;
    margin-top: 15px;
    font-size: 14px;
    letter-spacing: 1px;
    animation: subtitleFade 4s ease-in-out infinite;
">Una Discesa Digitale nella Memoria</div>
<div class="version" style="
    color: #00ff4144;
    font-size: 10px;
    margin-top: 10px;
    letter-spacing: 2px;
">v1.0.0 - MEMORIAM ARCHIVE</div>
        `;
        output.appendChild(titleDiv);

        // Menu container
        const menuContainer = document.createElement('div');
        menuContainer.id = 'main-menu-container';
        menuContainer.style.cssText = 'display: flex; flex-direction: column; align-items: center; gap: 12px; margin-top: 30px;';

        // Check if there's a saved game
        const hasSavedGame = StateManager.state.currentBlock > 1 || StateManager.state.playTime > 0;

        // New Game button
        const btnNewGame = this.createMenuButton('NUOVA PARTITA', () => {
            if (hasSavedGame) {
                this.showConfirmDialog();
            } else {
                this.startNewGame();
            }
        });
        menuContainer.appendChild(btnNewGame);

        // Continue button (only if there's a saved game)
        if (hasSavedGame) {
            const btnContinue = this.createMenuButton('CONTINUA', () => {
                this.continueGame();
            });
            menuContainer.appendChild(btnContinue);
        }

        // Options button
        const btnOptions = this.createMenuButton('OPZIONI', () => {
            this.showOptions();
        });
        menuContainer.appendChild(btnOptions);

        // Credits button
        const btnCredits = this.createMenuButton('CREDITI', () => {
            this.showCredits();
        });
        menuContainer.appendChild(btnCredits);

        // Quit button
        const btnQuit = this.createMenuButton('ESCI DAL GIOCO', () => {
            this.showQuitConfirmation();
        });
        menuContainer.appendChild(btnQuit);

        output.appendChild(menuContainer);
        Terminal.scrollToBottom();
    },

    createMenuButton(text, onClick) {
        const btn = document.createElement('button');
        btn.className = 'menu-button';
        btn.textContent = text;
        btn.style.cssText = 'font-size: 16px; padding: 10px 25px; min-width: 250px;';

        // Add hover sound
        btn.onmouseenter = () => {
            if (SoundManager) SoundManager.menuHover();
        };

        // Add click sound
        btn.onclick = () => {
            if (SoundManager) SoundManager.menuClick();
            onClick();
        };

        return btn;
    },

    showConfirmDialog() {
        const output = document.getElementById('terminal-output');

        // Remove menu
        const menu = document.getElementById('main-menu-container');
        if (menu) menu.remove();

        // Confirmation dialog
        const dialogDiv = document.createElement('div');
        dialogDiv.id = 'confirm-dialog';
        dialogDiv.style.cssText = 'text-align: center; margin-top: 60px;';
        dialogDiv.innerHTML = `
            <div style="color: #ff6b6b; font-size: 16px; margin-bottom: 30px;">
                ⚠️ ATTENZIONE ⚠️<br><br>
                Iniziare una nuova partita cancellerà i tuoi progressi attuali.<br>
                Questa azione non può essere annullata.<br><br>
                Continuare?
            </div>
        `;

        const btnContainer = document.createElement('div');
        btnContainer.style.cssText = 'display: flex; justify-content: center; gap: 20px;';

        const btnNo = this.createMenuButton('NO', () => {
            dialogDiv.remove();
            this.show();
        });

        const btnYes = this.createMenuButton('SÌ', () => {
            this.startNewGame();
        });

        btnContainer.appendChild(btnNo);
        btnContainer.appendChild(btnYes);
        dialogDiv.appendChild(btnContainer);
        output.appendChild(dialogDiv);
        Terminal.scrollToBottom();
    },

    showQuitConfirmation() {
        const output = document.getElementById('terminal-output');

        // Remove menu
        const menu = document.getElementById('main-menu-container');
        if (menu) menu.remove();

        // Quit confirmation
        const dialogDiv = document.createElement('div');
        dialogDiv.id = 'quit-dialog';
        dialogDiv.style.cssText = 'text-align: center; margin-top: 60px;';
        dialogDiv.innerHTML = `
            <div style="color: #ffaa00; font-size: 16px; margin-bottom: 30px;">
                Sei sicuro di voler uscire?<br><br>
                <span style="font-size: 13px; color: #888;">I tuoi progressi sono stati salvati.</span>
            </div>
        `;

        const btnContainer = document.createElement('div');
        btnContainer.style.cssText = 'display: flex; justify-content: center; gap: 20px;';

        const btnNo = this.createMenuButton('NO', () => {
            dialogDiv.remove();
            this.show();
        });

        const btnYes = this.createMenuButton('SÌ', () => {
            window.close();
            // If window.close() doesn't work (not opened by script), show message
            setTimeout(() => {
                dialogDiv.innerHTML = `
                    <div style="color: #00ff41; font-size: 16px;">
                        Puoi ora chiudere questa finestra/scheda.<br><br>
                        <span style="font-size: 13px; color: #888;">Grazie per aver giocato a THE TERMINAL.</span>
                    </div>
                `;
                const btnBack = this.createMenuButton('TORNA AL MENU', () => {
                    dialogDiv.remove();
                    this.show();
                });
                btnBack.style.marginTop = '30px';
                dialogDiv.appendChild(btnBack);
            }, 100);
        });

        btnContainer.appendChild(btnNo);
        btnContainer.appendChild(btnYes);
        dialogDiv.appendChild(btnContainer);
        output.appendChild(dialogDiv);
        Terminal.scrollToBottom();
    },

    showOptions() {
        const output = document.getElementById('terminal-output');

        // Remove menu
        const menu = document.getElementById('main-menu-container');
        if (menu) menu.remove();

        // Options screen
        const optionsDiv = document.createElement('div');
        optionsDiv.id = 'options-screen';
        optionsDiv.style.cssText = 'text-align: center; margin-top: 40px;';

        const title = document.createElement('div');
        title.style.cssText = 'font-size: 22px; margin-bottom: 30px; color: #00ff41;';
        title.textContent = 'OPZIONI';
        optionsDiv.appendChild(title);

        // Options container
        const optionsContainer = document.createElement('div');
        optionsContainer.style.cssText = 'display: flex; flex-direction: column; align-items: center; gap: 15px; margin-bottom: 30px;';

        // CRT Effects
        optionsContainer.appendChild(this.createOptionToggle(
            'Effetti CRT',
            'crtEffects',
            'Attiva curvatura dello schermo ed effetti di bagliore fosforico',
            (value) => {
                const crtOverlay = document.getElementById('crt-overlay');
                if (crtOverlay) {
                    crtOverlay.style.display = value ? 'block' : 'none';
                }
            }
        ));

        // CRT Curved Screen
        optionsContainer.appendChild(this.createOptionToggle(
            'Schermo CRT Curvo',
            'crtCurved',
            'Schermo curvo come i vecchi monitor a tubo catodico',
            (value) => {
                const terminal = document.getElementById('terminal-container');
                if (terminal) {
                    if (value) {
                        terminal.classList.add('crt-curved');
                    } else {
                        terminal.classList.remove('crt-curved');
                    }
                }
            }
        ));

        // Scanlines
        optionsContainer.appendChild(this.createOptionToggle(
            'Linee di Scansione',
            'scanlines',
            'Mostra linee di scansione orizzontali per effetto terminale retro',
            (value) => {
                const crtOverlay = document.getElementById('crt-overlay');
                if (crtOverlay) {
                    crtOverlay.style.opacity = value ? '1' : '0';
                }
            }
        ));

        // Glitch Effects
        optionsContainer.appendChild(this.createOptionToggle(
            'Effetti Glitch',
            'glitchEffects',
            'Glitch visivi casuali durante il gioco'
        ));

        // Typewriter Effect
        optionsContainer.appendChild(this.createOptionToggle(
            'Effetto Macchina da Scrivere',
            'typewriterEffect',
            'Il testo appare carattere per carattere'
        ));

        // Sound Effects
        optionsContainer.appendChild(this.createOptionToggle(
            'Effetti Sonori',
            'soundEffects',
            'Attiva tutti gli effetti sonori e feedback audio del gioco',
            (value) => {
                if (SoundManager) {
                    SoundManager.setEnabled(value);
                    // Play test sound when enabled
                    if (value) {
                        setTimeout(() => SoundManager.commandSuccess(), 100);
                    }
                }
            }
        ));

        optionsDiv.appendChild(optionsContainer);

        // Back button
        const btnBack = this.createMenuButton('TORNA AL MENU', () => {
            optionsDiv.remove();
            this.show();
        });
        btnBack.style.marginTop = '20px';
        optionsDiv.appendChild(btnBack);

        output.appendChild(optionsDiv);
        Terminal.scrollToBottom();
    },

    createOptionToggle(label, optionKey, description, onChange) {
        const container = document.createElement('div');
        container.style.cssText = 'width: 400px; max-width: 90%; background: rgba(0, 255, 65, 0.05); border: 1px solid rgba(0, 255, 65, 0.3); padding: 15px; border-radius: 3px;';

        const labelDiv = document.createElement('div');
        labelDiv.style.cssText = 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;';

        const labelText = document.createElement('span');
        labelText.style.cssText = 'color: #00ff41; font-size: 14px; font-weight: bold;';
        labelText.textContent = label;

        const toggle = document.createElement('button');
        toggle.className = 'option-toggle';
        toggle.style.cssText = `
            padding: 5px 15px;
            font-size: 12px;
            min-width: 70px;
            background: ${this.options[optionKey] ? 'rgba(0, 255, 65, 0.3)' : 'rgba(255, 0, 0, 0.2)'};
            border: 2px solid ${this.options[optionKey] ? '#00ff41' : '#ff3366'};
            color: ${this.options[optionKey] ? '#00ff41' : '#ff3366'};
        `;
        toggle.textContent = this.options[optionKey] ? 'ATTIVO' : 'DISATTIVO';

        toggle.onclick = () => {
            this.options[optionKey] = !this.options[optionKey];
            this.saveOptions();

            // Update button appearance
            toggle.style.background = this.options[optionKey] ? 'rgba(0, 255, 65, 0.3)' : 'rgba(255, 0, 0, 0.2)';
            toggle.style.borderColor = this.options[optionKey] ? '#00ff41' : '#ff3366';
            toggle.style.color = this.options[optionKey] ? '#00ff41' : '#ff3366';
            toggle.textContent = this.options[optionKey] ? 'ATTIVO' : 'DISATTIVO';

            // Call onChange callback if provided
            if (onChange) {
                onChange(this.options[optionKey]);
            }
        };

        labelDiv.appendChild(labelText);
        labelDiv.appendChild(toggle);

        const descDiv = document.createElement('div');
        descDiv.style.cssText = 'color: #888; font-size: 11px; text-align: left;';
        descDiv.textContent = description;

        container.appendChild(labelDiv);
        container.appendChild(descDiv);

        return container;
    },

    startNewGame() {
        console.log('[MENU] Starting new game');
        this.menuActive = false;

        // Reset game state
        StateManager.resetGame();

        // Clear terminal and start game
        Terminal.clear();
        Terminal.enableInput();

        // Load first block
        if (typeof GameEngine !== 'undefined' && GameEngine.loadCurrentBlock) {
            GameEngine.loadCurrentBlock();
        }
    },

    continueGame() {
        console.log('[MENU] Continuing game');
        this.menuActive = false;

        // Clear terminal and resume game
        Terminal.clear();
        Terminal.enableInput();

        // Load current block
        if (typeof GameEngine !== 'undefined' && GameEngine.loadCurrentBlock) {
            GameEngine.loadCurrentBlock();
        }
    },

    showCredits() {
        console.log('[MENU] Showing cinematic credits');
        this.menuActive = false;

        // Get current language
        const currentLang = localStorage.getItem('gameLingua') || 'it';
        const translations = CREDITS_TRANSLATIONS[currentLang];

        // Create overlay
        const overlay = document.createElement('div');
        overlay.id = 'cinematic-credits-overlay';
        overlay.classList.add('hidden');

        // Create scrolling credits section
        const scrollContainer = document.createElement('div');
        scrollContainer.className = 'credits-scroll-container';
        scrollContainer.innerHTML = `
            <div class="credits-scroll-item">
                <div class="credits-role-label">${translations.author_label}</div>
                <div class="credits-author-name">Alberto Romeo</div>
            </div>
            <div class="credits-scroll-item">
                <div class="credits-inspiration-text">${translations.inspiration}</div>
            </div>
        `;

        // Create messages container
        const messagesContainer = document.createElement('div');
        messagesContainer.className = 'credits-messages-container hidden';

        // Create message screens
        const messageTexts = [
            translations.message1,
            translations.message2,
            translations.message3,
            translations.message4
        ];

        messageTexts.forEach((text, index) => {
            const screen = document.createElement('div');
            screen.className = 'credits-message-screen';
            screen.innerHTML = `<p class="credits-typewriter-text">${text}</p>`;
            messagesContainer.appendChild(screen);
        });

        // Create final message with brush effect
        const finalScreen = document.createElement('div');
        finalScreen.className = 'credits-message-screen credits-final-screen';
        finalScreen.innerHTML = `<div class="credits-brush-text">${translations.goodbye}</div>`;
        messagesContainer.appendChild(finalScreen);

        // Create skip button
        const skipButton = document.createElement('button');
        skipButton.className = 'credits-skip-button';
        skipButton.textContent = translations.skip;
        skipButton.onclick = () => this.skipCredits(overlay);

        // Assemble overlay
        overlay.appendChild(scrollContainer);
        overlay.appendChild(messagesContainer);
        overlay.appendChild(skipButton);
        document.body.appendChild(overlay);

        // Start credits sequence
        setTimeout(() => {
            overlay.classList.remove('hidden');
            overlay.classList.add('active');

            // Start messages after scroll completes
            setTimeout(() => {
                this.startCreditsMessages(messagesContainer);
            }, 12000); // 12 seconds for scrolling credits
        }, 100);

        // Handle ESC key
        this.creditsEscapeHandler = (e) => {
            if (e.key === 'Escape') {
                this.skipCredits(overlay);
            }
        };
        document.addEventListener('keydown', this.creditsEscapeHandler);
    },

    startCreditsMessages(container) {
        const screens = container.querySelectorAll('.credits-message-screen');
        container.classList.remove('hidden');
        container.classList.add('active');

        let currentIndex = 0;

        const showNextMessage = () => {
            // Hide previous message
            if (currentIndex > 0) {
                const prevScreen = screens[currentIndex - 1];
                prevScreen.classList.remove('active', 'fade-in', 'white-bg');
                prevScreen.classList.add('fade-out');
            }

            if (currentIndex < screens.length) {
                const currentScreen = screens[currentIndex];

                // Fade to white background on first message
                if (currentIndex === 0) {
                    setTimeout(() => {
                        container.style.background = '#fff';
                    }, 100);
                }

                setTimeout(() => {
                    currentScreen.classList.add('white-bg', 'fade-in', 'active');

                    // Typewriter effect for text messages
                    const textElement = currentScreen.querySelector('.credits-typewriter-text');
                    const brushElement = currentScreen.querySelector('.credits-brush-text');

                    if (textElement) {
                        this.typewriterEffect(textElement, textElement.textContent);
                    } else if (brushElement) {
                        // Hand-drawn effect for final message
                        setTimeout(() => {
                            brushElement.classList.add('active');
                        }, 500);
                    }

                    // Duration for each message (longer to appreciate the text)
                    const duration = currentIndex === screens.length - 1 ? 9000 : 10000;
                    setTimeout(() => {
                        currentIndex++;
                        showNextMessage();
                    }, duration);
                }, currentIndex === 0 ? 2000 : 500);
            } else {
                // End of credits, return to menu
                setTimeout(() => {
                    const overlay = document.getElementById('cinematic-credits-overlay');
                    this.skipCredits(overlay);
                }, 2000);
            }
        };

        showNextMessage();
    },

    typewriterEffect(element, text) {
        element.textContent = '';
        let charIndex = 0;

        const typeChar = () => {
            if (charIndex < text.length) {
                element.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, 40); // 40ms per character for better readability
            }
        };

        typeChar();
    },

    skipCredits(overlay) {
        console.log('[MENU] Skipping credits');

        // Remove escape handler
        if (this.creditsEscapeHandler) {
            document.removeEventListener('keydown', this.creditsEscapeHandler);
            this.creditsEscapeHandler = null;
        }

        // Fade out and remove overlay
        overlay.classList.remove('active');
        setTimeout(() => {
            if (overlay && overlay.parentNode) {
                overlay.remove();
            }
            // Return to main menu
            this.show();
        }, 500);
    },

    hide() {
        this.menuActive = false;
        const menu = document.getElementById('main-menu-container');
        if (menu) menu.remove();
    },

    // Options management
    loadOptions() {
        try {
            const saved = localStorage.getItem('terminal_options');
            if (saved) {
                this.options = { ...this.options, ...JSON.parse(saved) };
            }
        } catch (e) {
            console.error('[MENU] Failed to load options:', e);
        }
        this.applyOptions();
    },

    saveOptions() {
        try {
            localStorage.setItem('terminal_options', JSON.stringify(this.options));
            this.applyOptions();
        } catch (e) {
            console.error('[MENU] Failed to save options:', e);
        }
    },

    applyOptions() {
        // Apply CRT effects
        const crtOverlay = document.getElementById('crt-overlay');
        if (crtOverlay) {
            crtOverlay.style.display = this.options.crtEffects ? 'block' : 'none';
            crtOverlay.style.opacity = this.options.scanlines ? '1' : '0';
        }

        // Apply CRT curved screen
        const terminal = document.getElementById('terminal-container');
        if (terminal) {
            if (this.options.crtCurved) {
                terminal.classList.add('crt-curved');
            } else {
                terminal.classList.remove('crt-curved');
            }
        }

        // Apply sound effects setting
        if (SoundManager) {
            SoundManager.setEnabled(this.options.soundEffects);
        }

        // Store options globally for other systems to access
        if (typeof window.gameOptions === 'undefined') {
            window.gameOptions = this.options;
        } else {
            Object.assign(window.gameOptions, this.options);
        }
    }
};
