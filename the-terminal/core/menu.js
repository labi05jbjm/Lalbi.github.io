/**
 * MAIN MENU
 * Main game menu
 */

const MainMenu = {
    menuActive: false,

    // Game options (stored in localStorage)
    options: {
        crtEffects: true,
        scanlines: true,
        glitchEffects: true,
        typewriterEffect: true,
        ambientSound: false,
    },

    async show() {
        console.log('[MENU] Showing main menu');
        this.menuActive = true;
        this.loadOptions();

        Terminal.clear();
        Terminal.disableInput();

        const output = document.getElementById('terminal-output');

        // ASCII Art Title - Simpler and cleaner
        const titleDiv = document.createElement('div');
        titleDiv.className = 'menu-title';
        titleDiv.style.cssText = 'text-align: center; margin: 30px 0 15px 0;';
        titleDiv.innerHTML = `
<pre class="ascii-art" style="color: #00ff41; text-shadow: 0 0 10px #00ff41; font-size: 11px;">
╔═══════════════════════════════════════════════╗
║                                               ║
║         ▀█▀ █ █ █▀▀   ▀█▀ █▀▀ █▀▀█ █▀▄▀█      ║
║          █  █▀█ █▀▀    █  █▀▀ █▄▄▀ █ ▀ █      ║
║          ▀  ▀ ▀ ▀▀▀    ▀  ▀▀▀ ▀ ▀▀ ▀   ▀      ║
║                                               ║
║              █ █▄ █ █▀▄ █              ║
║              █ █ ▀█ █▀█ █▄▄            ║
║                                               ║
╚═══════════════════════════════════════════════╝
</pre>
<div style="color: #888; font-style: italic; margin-top: 8px; font-size: 13px;">A Digital Descent into Memory</div>
        `;
        output.appendChild(titleDiv);

        // Menu container
        const menuContainer = document.createElement('div');
        menuContainer.id = 'main-menu-container';
        menuContainer.style.cssText = 'display: flex; flex-direction: column; align-items: center; gap: 12px; margin-top: 30px;';

        // Check if there's a saved game
        const hasSavedGame = StateManager.state.currentBlock > 1 || StateManager.state.playTime > 0;

        // New Game button
        const btnNewGame = this.createMenuButton('NEW GAME', () => {
            if (hasSavedGame) {
                this.showConfirmDialog();
            } else {
                this.startNewGame();
            }
        });
        menuContainer.appendChild(btnNewGame);

        // Continue button (only if there's a saved game)
        if (hasSavedGame) {
            const btnContinue = this.createMenuButton('CONTINUE', () => {
                this.continueGame();
            });
            menuContainer.appendChild(btnContinue);
        }

        // Options button
        const btnOptions = this.createMenuButton('OPTIONS', () => {
            this.showOptions();
        });
        menuContainer.appendChild(btnOptions);

        // Credits button
        const btnCredits = this.createMenuButton('CREDITS', () => {
            this.showCredits();
        });
        menuContainer.appendChild(btnCredits);

        // Quit button
        const btnQuit = this.createMenuButton('QUIT GAME', () => {
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
        btn.onclick = onClick;
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
                ⚠️ WARNING ⚠️<br><br>
                Starting a new game will erase your current progress.<br>
                This action cannot be undone.<br><br>
                Continue?
            </div>
        `;

        const btnContainer = document.createElement('div');
        btnContainer.style.cssText = 'display: flex; justify-content: center; gap: 20px;';

        const btnNo = this.createMenuButton('NO', () => {
            dialogDiv.remove();
            this.show();
        });

        const btnYes = this.createMenuButton('YES', () => {
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
                Are you sure you want to quit?<br><br>
                <span style="font-size: 13px; color: #888;">Your progress has been saved.</span>
            </div>
        `;

        const btnContainer = document.createElement('div');
        btnContainer.style.cssText = 'display: flex; justify-content: center; gap: 20px;';

        const btnNo = this.createMenuButton('NO', () => {
            dialogDiv.remove();
            this.show();
        });

        const btnYes = this.createMenuButton('YES', () => {
            window.close();
            // If window.close() doesn't work (not opened by script), show message
            setTimeout(() => {
                dialogDiv.innerHTML = `
                    <div style="color: #00ff41; font-size: 16px;">
                        You can now close this window/tab.<br><br>
                        <span style="font-size: 13px; color: #888;">Thank you for playing THE TERMINAL.</span>
                    </div>
                `;
                const btnBack = this.createMenuButton('BACK TO MENU', () => {
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
        title.textContent = 'OPTIONS';
        optionsDiv.appendChild(title);

        // Options container
        const optionsContainer = document.createElement('div');
        optionsContainer.style.cssText = 'display: flex; flex-direction: column; align-items: center; gap: 15px; margin-bottom: 30px;';

        // CRT Effects
        optionsContainer.appendChild(this.createOptionToggle(
            'CRT Effects',
            'crtEffects',
            'Enables screen curvature and phosphor glow effects',
            (value) => {
                const crtOverlay = document.getElementById('crt-overlay');
                if (crtOverlay) {
                    crtOverlay.style.display = value ? 'block' : 'none';
                }
            }
        ));

        // Scanlines
        optionsContainer.appendChild(this.createOptionToggle(
            'Scanlines',
            'scanlines',
            'Displays horizontal scanlines for retro terminal effect',
            (value) => {
                const crtOverlay = document.getElementById('crt-overlay');
                if (crtOverlay) {
                    crtOverlay.style.opacity = value ? '1' : '0';
                }
            }
        ));

        // Glitch Effects
        optionsContainer.appendChild(this.createOptionToggle(
            'Glitch Effects',
            'glitchEffects',
            'Random visual glitches during gameplay'
        ));

        // Typewriter Effect
        optionsContainer.appendChild(this.createOptionToggle(
            'Typewriter Effect',
            'typewriterEffect',
            'Text appears character by character'
        ));

        optionsDiv.appendChild(optionsContainer);

        // Back button
        const btnBack = this.createMenuButton('BACK TO MENU', () => {
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
        toggle.textContent = this.options[optionKey] ? 'ON' : 'OFF';

        toggle.onclick = () => {
            this.options[optionKey] = !this.options[optionKey];
            this.saveOptions();

            // Update button appearance
            toggle.style.background = this.options[optionKey] ? 'rgba(0, 255, 65, 0.3)' : 'rgba(255, 0, 0, 0.2)';
            toggle.style.borderColor = this.options[optionKey] ? '#00ff41' : '#ff3366';
            toggle.style.color = this.options[optionKey] ? '#00ff41' : '#ff3366';
            toggle.textContent = this.options[optionKey] ? 'ON' : 'OFF';

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
                CREDITS
            </div>
            <div style="font-size: 18px; margin-bottom: 35px; color: #fff;">
                THE TERMINAL
            </div>
            <div style="font-size: 13px; color: #888; line-height: 2;">
                <div style="margin-bottom: 18px;">
                    <div style="color: #00ff41; font-size: 14px;">Design & Narrative</div>
                    <div>Claude & User</div>
                </div>
                <div style="margin-bottom: 18px;">
                    <div style="color: #00ff41; font-size: 14px;">Development</div>
                    <div>Pure HTML5/CSS3/JavaScript</div>
                    <div style="font-size: 11px; margin-top: 5px;">No external dependencies</div>
                </div>
                <div style="margin-bottom: 25px;">
                    <div style="color: #00ff41; font-size: 14px;">Inspired by</div>
                    <div>Pony Island</div>
                    <div>The Stanley Parable</div>
                    <div>Classic Cyberpunk Noir</div>
                </div>
                <div style="font-size: 15px; color: #00ff41; margin-top: 35px;">
                    ❖ Thank you for playing ❖
                </div>
            </div>
        `;

        const btnBack = this.createMenuButton('BACK TO MENU', () => {
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

        // Store options globally for other systems to access
        if (typeof window.gameOptions === 'undefined') {
            window.gameOptions = this.options;
        } else {
            Object.assign(window.gameOptions, this.options);
        }
    }
};
