/**
 * MAIN MENU
 * Main game menu
 */

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
        const output = document.getElementById('terminal-output');

        // Remove menu
        const menu = document.getElementById('main-menu-container');
        if (menu) menu.remove();

        // Credits screen
        const creditsDiv = document.createElement('div');
        creditsDiv.id = 'credits-screen';
        creditsDiv.style.cssText = 'text-align: center; margin-top: 40px;';
        creditsDiv.innerHTML = `
            <div style="font-size: 22px; margin-bottom: 25px; color: #00ff41;">
                CREDITI
            </div>
            <div style="font-size: 18px; margin-bottom: 35px; color: #fff;">
                THE TERMINAL
            </div>
            <div style="font-size: 13px; color: #888; line-height: 2;">
                <div style="margin-bottom: 18px;">
                    <div style="color: #00ff41; font-size: 14px;">Design & Narrativa</div>
                    <div>Claude & User</div>
                </div>
                <div style="margin-bottom: 18px;">
                    <div style="color: #00ff41; font-size: 14px;">Sviluppo</div>
                    <div>Puro HTML5/CSS3/JavaScript</div>
                    <div style="font-size: 11px; margin-top: 5px;">Nessuna dipendenza esterna</div>
                </div>
                <div style="margin-bottom: 25px;">
                    <div style="color: #00ff41; font-size: 14px;">Ispirato da</div>
                    <div>Pony Island</div>
                    <div>The Stanley Parable</div>
                    <div>Classico Cyberpunk Noir</div>
                </div>
                <div style="font-size: 15px; color: #00ff41; margin-top: 35px;">
                    ❖ Grazie per aver giocato ❖
                </div>
            </div>
        `;

        const btnBack = this.createMenuButton('TORNA AL MENU', () => {
            creditsDiv.remove();
            this.show();
        });
        btnBack.style.marginTop = '35px';
        creditsDiv.appendChild(btnBack);

        output.appendChild(creditsDiv);
        Terminal.scrollToBottom();
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
