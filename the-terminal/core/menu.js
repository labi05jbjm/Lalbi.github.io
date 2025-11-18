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
        // Visual Effects
        crtEffects: true,
        crtCurved: true,
        scanlines: true,
        glitchEffects: true,
        typewriterEffect: true,
        blackAndWhiteMode: false,

        // Audio
        soundEffects: true,
        soundVolume: 30, // 0-100

        // Gameplay
        textSpeed: 30, // ms per character (10=instant, 30=normal, 50=slow, 100=very slow)
        textSize: 100, // percentage (80, 100, 120, 150)
        language: 'it', // it, en

        // Interface
        customCursor: true,
        cursorTrail: true, // Enable/disable cursor trail animation
        interfaceOpacity: 95, // 50-100
        highContrast: false,
        colorTheme: 'green', // green, amber, blue, red, purple, cyan

        // Advanced
        crtIntensity: 100, // 0-100
        glitchIntensity: 100, // 0-100
        skipAnimations: false,
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
    color: #00ff88;
    text-shadow: 0 0 3px #00ff41;
    font-size: 16px;
    line-height: 1.1;
    letter-spacing: 3px;
    font-weight: bold;
">
▀█▀ █ █ █▀▀   ▀█▀ █▀▀ █▀▀█ █▀▄▀█ █ █▄ █ ▄▀▄ █
 █  █▀█ █▀▀    █  █▀▀ █▄▄▀ █ ▀ █ █ █ ▀█ █▀█ █
 ▀  ▀ ▀ ▀▀▀    ▀  ▀▀▀ ▀ ▀▀ ▀   ▀ ▀ ▀  ▀ ▀ ▀ ▀▀▀
</pre>
<div class="subtitle" style="
    color: #00ff41;
    font-style: italic;
    margin-top: 15px;
    font-size: 13px;
    letter-spacing: 2px;
    opacity: 0.8;
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
            this.showNewGameSlotSelection();
        });
        menuContainer.appendChild(btnNewGame);

        // Load Game button (only if there's at least one saved game)
        if (hasSavedGame) {
            const btnContinue = this.createMenuButton('CARICA PARTITA', () => {
                this.showLoadGame();
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
        // Create full-screen diegetic options overlay
        const optionsOverlay = document.createElement('div');
        optionsOverlay.id = 'options-overlay';
        optionsOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(10, 14, 20, 0.98);
            z-index: 9999;
            display: flex;
            flex-direction: column;
            padding: 20px;
            box-sizing: border-box;
            overflow: hidden;
        `;

        // Header with title and back button
        const header = document.createElement('div');
        header.style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 2px solid var(--primary-color);
        `;

        const title = document.createElement('div');
        title.style.cssText = `
            color: var(--primary-color);
            font-size: 24px;
            font-weight: bold;
            letter-spacing: 3px;
            text-shadow: 0 0 10px var(--primary-color);
        `;
        title.textContent = '⚙ CONFIGURAZIONE SISTEMA';

        const btnBack = this.createMenuButton('[ ESC ]', () => {
            optionsOverlay.remove();
            this.show();
        });
        btnBack.style.minWidth = '100px';
        btnBack.style.padding = '8px 15px';
        btnBack.style.fontSize = '12px';

        header.appendChild(title);
        header.appendChild(btnBack);

        // Grid container for 4 panels (2x2)
        const gridContainer = document.createElement('div');
        gridContainer.style.cssText = `
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr 1fr;
            gap: 15px;
            flex: 1;
            max-height: calc(100vh - 100px);
        `;

        // Panel 1: AUDIO & GAMEPLAY
        const panel1 = this.createOptionPanel('🔊 AUDIO & GAMEPLAY', [
            this.createCompactToggle('SFX', 'soundEffects', (value) => {
                if (SoundManager) {
                    SoundManager.setEnabled(value);
                    if (value) setTimeout(() => SoundManager.commandSuccess(), 100);
                }
            }),
            this.createCompactSlider('Vol', 'soundVolume', 0, 100, 5, '%', (value) => {
                if (SoundManager) SoundManager.setVolume(value / 100);
            }),
            this.createCompactSelect('Velocità', 'textSpeed', [
                { value: 10, label: 'Instant' },
                { value: 30, label: 'Normal' },
                { value: 50, label: 'Slow' }
            ], (value) => {
                if (NarrativeEngine) NarrativeEngine.typingSpeed = value;
            }),
            this.createCompactSelect('Testo', 'textSize', [
                { value: 80, label: '80%' },
                { value: 100, label: '100%' },
                { value: 120, label: '120%' },
                { value: 150, label: '150%' }
            ], (value) => {
                document.documentElement.style.fontSize = value + '%';
            }),
            this.createCompactSelect('Lang', 'language', [
                { value: 'it', label: 'IT' },
                { value: 'en', label: 'EN' }
            ], (value) => {
                this.showLanguageChangeConfirmation(value);
            })
        ]);

        // Panel 2: EFFETTI VISIVI
        const panel2 = this.createOptionPanel('👁 EFFETTI VISIVI', [
            this.createCompactToggle('CRT', 'crtEffects', (value) => {
                const crtOverlay = document.getElementById('crt-overlay');
                if (crtOverlay) crtOverlay.style.display = value ? 'block' : 'none';
            }),
            this.createCompactToggle('Curvo', 'crtCurved', (value) => {
                const terminal = document.getElementById('terminal-container');
                if (terminal) {
                    terminal.classList.toggle('crt-curved', value);
                }
            }),
            this.createCompactSlider('CRT Int', 'crtIntensity', 0, 100, 10, '%', (value) => {
                const crtOverlay = document.getElementById('crt-overlay');
                if (crtOverlay) crtOverlay.style.opacity = (value / 100) * 0.15;
            }),
            this.createCompactToggle('Scanlines', 'scanlines', (value) => {
                const crtOverlay = document.getElementById('crt-overlay');
                if (crtOverlay) crtOverlay.style.opacity = value ? '1' : '0';
            }),
            this.createCompactToggle('Glitch', 'glitchEffects'),
            this.createCompactSlider('Glitch Int', 'glitchIntensity', 0, 100, 10, '%', (value) => {
                window.gameGlitchIntensity = value / 100;
            }),
            this.createCompactToggle('B&W', 'blackAndWhiteMode', (value) => {
                document.body.classList.toggle('bw-mode', value);
            }),
            this.createCompactToggle('Hi-Contrast', 'highContrast', (value) => {
                document.body.classList.toggle('high-contrast', value);
            })
        ]);

        // Panel 3: INTERFACCIA
        const panel3 = this.createOptionPanel('⚙ INTERFACCIA', [
            this.createCompactToggle('Cursor', 'customCursor', (value) => {
                const cursor = document.querySelector('.custom-cursor');
                if (cursor) cursor.style.display = value ? 'block' : 'none';
                document.body.style.cursor = value ? 'none' : 'default';
            }),
            this.createCompactToggle('Trail', 'cursorTrail', (value) => {
                if (CursorManager) CursorManager.trailEnabled = value;
            }),
            this.createCompactSlider('Opacity', 'interfaceOpacity', 50, 100, 5, '%', (value) => {
                const terminal = document.getElementById('terminal-container');
                if (terminal) terminal.style.opacity = value / 100;
            }),
            this.createCompactToggle('Typewriter', 'typewriterEffect'),
            this.createCompactToggle('Skip Anim', 'skipAnimations', (value) => {
                document.body.classList.toggle('skip-animations', value);
            }),
            this.createCompactSelect('Theme', 'colorTheme', [
                { value: 'green', label: '🟢 Green' },
                { value: 'amber', label: '🟡 Amber' },
                { value: 'blue', label: '🔵 Blue' },
                { value: 'red', label: '🔴 Red' },
                { value: 'purple', label: '🟣 Purple' },
                { value: 'cyan', label: '🔷 Cyan' }
            ], (value) => {
                this.applyColorTheme(value);
            })
        ]);

        // Panel 4: SYSTEM INFO
        const panel4 = this.createSystemInfoPanel();

        gridContainer.appendChild(panel1);
        gridContainer.appendChild(panel2);
        gridContainer.appendChild(panel3);
        gridContainer.appendChild(panel4);

        optionsOverlay.appendChild(header);
        optionsOverlay.appendChild(gridContainer);
        document.body.appendChild(optionsOverlay);

        // ESC key to close
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                optionsOverlay.remove();
                this.show();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    },

    createOptionPanel(title, options) {
        const panel = document.createElement('div');
        panel.style.cssText = `
            background: rgba(0, 255, 136, 0.03);
            border: 2px solid var(--primary-color);
            border-radius: 8px;
            padding: 15px;
            display: flex;
            flex-direction: column;
            box-shadow: 0 0 15px rgba(0, 255, 136, 0.2);
            overflow-y: auto;
        `;

        const panelTitle = document.createElement('div');
        panelTitle.style.cssText = `
            color: var(--primary-color);
            font-size: 14px;
            font-weight: bold;
            letter-spacing: 2px;
            margin-bottom: 12px;
            padding-bottom: 8px;
            border-bottom: 1px solid var(--primary-color);
            text-shadow: 0 0 5px var(--primary-color);
        `;
        panelTitle.textContent = title;

        const optionsContainer = document.createElement('div');
        optionsContainer.style.cssText = `
            display: flex;
            flex-direction: column;
            gap: 8px;
        `;

        options.forEach(opt => optionsContainer.appendChild(opt));

        panel.appendChild(panelTitle);
        panel.appendChild(optionsContainer);
        return panel;
    },

    createSystemInfoPanel() {
        const panel = document.createElement('div');
        panel.style.cssText = `
            background: rgba(0, 255, 136, 0.03);
            border: 2px solid var(--primary-color);
            border-radius: 8px;
            padding: 15px;
            display: flex;
            flex-direction: column;
            box-shadow: 0 0 15px rgba(0, 255, 136, 0.2);
        `;

        const title = document.createElement('div');
        title.style.cssText = `
            color: var(--primary-color);
            font-size: 14px;
            font-weight: bold;
            letter-spacing: 2px;
            margin-bottom: 12px;
            padding-bottom: 8px;
            border-bottom: 1px solid var(--primary-color);
            text-shadow: 0 0 5px var(--primary-color);
        `;
        title.textContent = '📊 SYSTEM STATUS';

        const info = document.createElement('div');
        info.style.cssText = `
            color: #888;
            font-size: 11px;
            line-height: 1.8;
            font-family: monospace;
        `;

        const optionsCount = Object.keys(this.options).length;
        const enabledCount = Object.values(this.options).filter(v => v === true).length;

        info.innerHTML = `
            <div style="margin-bottom: 10px; color: var(--primary-color);">
                ▸ TERMINAL v2.0.1<br>
                ▸ OPZIONI: ${optionsCount}<br>
                ▸ ATTIVE: ${enabledCount}<br>
            </div>
            <div style="margin-top: 15px; padding: 10px; background: rgba(0, 0, 0, 0.3); border-left: 2px solid var(--primary-color);">
                <div style="color: var(--primary-color); margin-bottom: 5px;">LEGENDA CONTROLLI:</div>
                <div>• Toggle = ON/OFF</div>
                <div>• Slider = Drag value</div>
                <div>• Select = Choose option</div>
                <div>• [ESC] = Exit options</div>
            </div>
            <div style="margin-top: 15px; padding: 10px; background: rgba(0, 255, 136, 0.05); border: 1px solid var(--primary-color); border-radius: 4px;">
                <div style="color: var(--primary-color); font-size: 10px; text-align: center;">
                    Tutte le impostazioni vengono<br>salvate automaticamente
                </div>
            </div>
        `;

        panel.appendChild(title);
        panel.appendChild(info);
        return panel;
    },

    createCompactToggle(label, optionKey, onChange) {
        const container = document.createElement('div');
        container.style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 6px 8px;
            background: rgba(0, 0, 0, 0.2);
            border: 1px solid rgba(0, 255, 136, 0.2);
            border-radius: 4px;
            font-size: 11px;
        `;

        const labelDiv = document.createElement('div');
        labelDiv.style.cssText = 'color: #aaa; font-weight: bold; text-transform: uppercase;';
        labelDiv.textContent = label;

        const toggle = document.createElement('button');
        toggle.style.cssText = `
            padding: 3px 10px;
            font-size: 10px;
            background: ${this.options[optionKey] ? 'var(--primary-color)' : 'rgba(100, 100, 100, 0.3)'};
            border: 1px solid ${this.options[optionKey] ? 'var(--primary-color)' : '#666'};
            color: ${this.options[optionKey] ? '#000' : '#888'};
            border-radius: 3px;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.2s;
        `;
        toggle.textContent = this.options[optionKey] ? 'ON' : 'OFF';

        toggle.onclick = () => {
            this.options[optionKey] = !this.options[optionKey];
            this.saveOptions();
            toggle.style.background = this.options[optionKey] ? 'var(--primary-color)' : 'rgba(100, 100, 100, 0.3)';
            toggle.style.borderColor = this.options[optionKey] ? 'var(--primary-color)' : '#666';
            toggle.style.color = this.options[optionKey] ? '#000' : '#888';
            toggle.textContent = this.options[optionKey] ? 'ON' : 'OFF';
            if (onChange) onChange(this.options[optionKey]);
        };

        container.appendChild(labelDiv);
        container.appendChild(toggle);
        return container;
    },

    createCompactSlider(label, optionKey, min, max, step, suffix, onChange) {
        const container = document.createElement('div');
        container.style.cssText = `
            padding: 6px 8px;
            background: rgba(0, 0, 0, 0.2);
            border: 1px solid rgba(0, 255, 136, 0.2);
            border-radius: 4px;
        `;

        const labelRow = document.createElement('div');
        labelRow.style.cssText = 'display: flex; justify-content: space-between; margin-bottom: 4px; font-size: 11px;';

        const labelDiv = document.createElement('div');
        labelDiv.style.cssText = 'color: #aaa; font-weight: bold; text-transform: uppercase;';
        labelDiv.textContent = label;

        const valueDisplay = document.createElement('div');
        valueDisplay.style.cssText = 'color: var(--primary-color); font-family: monospace; font-size: 10px;';
        valueDisplay.textContent = this.options[optionKey] + suffix;

        const slider = document.createElement('input');
        slider.type = 'range';
        slider.min = min;
        slider.max = max;
        slider.step = step;
        slider.value = this.options[optionKey];
        slider.style.cssText = 'width: 100%; height: 4px;';

        slider.oninput = () => {
            const value = parseInt(slider.value);
            this.options[optionKey] = value;
            valueDisplay.textContent = value + suffix;
            this.saveOptions();
            if (onChange) onChange(value);
        };

        labelRow.appendChild(labelDiv);
        labelRow.appendChild(valueDisplay);
        container.appendChild(labelRow);
        container.appendChild(slider);
        return container;
    },

    createCompactSelect(label, optionKey, optionsArray, onChange) {
        const container = document.createElement('div');
        container.style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 6px 8px;
            background: rgba(0, 0, 0, 0.2);
            border: 1px solid rgba(0, 255, 136, 0.2);
            border-radius: 4px;
            font-size: 11px;
        `;

        const labelDiv = document.createElement('div');
        labelDiv.style.cssText = 'color: #aaa; font-weight: bold; text-transform: uppercase;';
        labelDiv.textContent = label;

        const select = document.createElement('select');
        select.style.cssText = `
            padding: 3px 6px;
            font-size: 10px;
            background: rgba(0, 255, 136, 0.1);
            border: 1px solid var(--primary-color);
            color: var(--primary-color);
            border-radius: 3px;
            cursor: pointer;
        `;

        optionsArray.forEach(opt => {
            const option = document.createElement('option');
            option.value = opt.value;
            option.textContent = opt.label;
            if (this.options[optionKey] == opt.value) option.selected = true;
            select.appendChild(option);
        });

        select.onchange = () => {
            const value = isNaN(select.value) ? select.value : parseInt(select.value);
            this.options[optionKey] = value;
            this.saveOptions();
            if (onChange) onChange(value);
        };

        container.appendChild(labelDiv);
        container.appendChild(select);
        return container;
    },

    showLoadGame() {
        const output = document.getElementById('terminal-output');

        // Remove menu and title
        const menu = document.getElementById('main-menu-container');
        if (menu) menu.remove();
        const titleDiv = document.querySelector('.menu-title-animated');
        if (titleDiv) titleDiv.remove();

        // Load game screen
        const loadDiv = document.createElement('div');
        loadDiv.id = 'load-game-screen';
        loadDiv.style.cssText = 'text-align: center; margin-top: 20px;';

        // Title
        const title = document.createElement('div');
        title.style.cssText = 'color: #00ff88; font-size: 18px; font-weight: bold; margin-bottom: 20px; letter-spacing: 2px;';
        title.textContent = '💾 CARICA PARTITA';
        loadDiv.appendChild(title);

        // Slots container
        const slotsContainer = document.createElement('div');
        slotsContainer.style.cssText = 'display: flex; flex-direction: column; align-items: center; gap: 12px; margin-bottom: 20px;';

        // Get all save slots
        const slots = StateManager.getAllSaveSlots();

        slots.forEach(slot => {
            const slotDiv = this.createSaveSlotButton(slot, (slotId) => {
                // Load this slot
                loadDiv.remove();
                StateManager.currentSlot = slotId;
                this.continueGame();
            });
            slotsContainer.appendChild(slotDiv);
        });

        loadDiv.appendChild(slotsContainer);

        // Back button
        const btnBack = this.createMenuButton('TORNA AL MENU', () => {
            loadDiv.remove();
            this.show();
        });
        btnBack.style.marginTop = '10px';
        loadDiv.appendChild(btnBack);

        output.appendChild(loadDiv);
        Terminal.scrollToBottom();
    },

    showNewGameSlotSelection() {
        const output = document.getElementById('terminal-output');

        // Remove menu and title
        const menu = document.getElementById('main-menu-container');
        if (menu) menu.remove();
        const titleDiv = document.querySelector('.menu-title-animated');
        if (titleDiv) titleDiv.remove();

        // New game slot selection screen
        const newGameDiv = document.createElement('div');
        newGameDiv.id = 'new-game-screen';
        newGameDiv.style.cssText = 'text-align: center; margin-top: 20px;';

        // Title
        const title = document.createElement('div');
        title.style.cssText = 'color: #00ff88; font-size: 18px; font-weight: bold; margin-bottom: 15px; letter-spacing: 2px;';
        title.textContent = '🎮 SELEZIONA SLOT';
        newGameDiv.appendChild(title);

        // Subtitle
        const subtitle = document.createElement('div');
        subtitle.style.cssText = 'color: #888; font-size: 12px; margin-bottom: 20px;';
        subtitle.textContent = 'Scegli uno slot vuoto o sovrascrivi una partita esistente';
        newGameDiv.appendChild(subtitle);

        // Slots container
        const slotsContainer = document.createElement('div');
        slotsContainer.style.cssText = 'display: flex; flex-direction: column; align-items: center; gap: 12px; margin-bottom: 20px;';

        // Get all save slots
        const slots = StateManager.getAllSaveSlots();

        slots.forEach(slot => {
            const slotDiv = this.createSaveSlotButton(slot, (slotId) => {
                // Confirm if slot is not empty
                if (slot.exists) {
                    this.showOverwriteConfirmation(slotId, () => {
                        newGameDiv.remove();
                        StateManager.currentSlot = slotId;
                        this.startNewGame();
                    });
                } else {
                    newGameDiv.remove();
                    StateManager.currentSlot = slotId;
                    this.startNewGame();
                }
            }, !slot.exists);
            slotsContainer.appendChild(slotDiv);
        });

        newGameDiv.appendChild(slotsContainer);

        // Back button
        const btnBack = this.createMenuButton('TORNA AL MENU', () => {
            newGameDiv.remove();
            this.show();
        });
        btnBack.style.marginTop = '10px';
        newGameDiv.appendChild(btnBack);

        output.appendChild(newGameDiv);
        Terminal.scrollToBottom();
    },

    createSaveSlotButton(slot, onClick, isEmpty = false) {
        const container = document.createElement('div');
        container.className = 'save-slot-button';
        container.style.cssText = `
            width: 450px;
            max-width: 90%;
            background: ${slot.exists ? 'rgba(0, 255, 136, 0.08)' : 'rgba(100, 100, 100, 0.05)'};
            border: 2px solid ${slot.exists ? 'rgba(0, 255, 136, 0.4)' : 'rgba(100, 100, 100, 0.3)'};
            padding: 12px 15px;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.2s ease;
        `;

        if (slot.exists) {
            // Existing save slot
            const saveDate = new Date(slot.saveTime);
            const hours = Math.floor(slot.timePlayedMinutes / 60);
            const minutes = slot.timePlayedMinutes % 60;

            container.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="text-align: left;">
                        <div style="color: #00ff88; font-size: 16px; font-weight: bold; margin-bottom: 5px;">
                            💾 SLOT ${slot.slotId}
                        </div>
                        <div style="color: #00ff66; font-size: 13px; margin-bottom: 3px;">
                            Blocco ${slot.currentBlock}/8 · ${slot.progress}% completato
                        </div>
                        <div style="color: #888; font-size: 11px;">
                            ${saveDate.toLocaleDateString('it-IT')} ${saveDate.toLocaleTimeString('it-IT')}
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <div style="color: #00aaff; font-size: 12px; font-family: monospace;">
                            ⏱ ${hours}h ${minutes}m
                        </div>
                        <button class="delete-slot-btn" style="
                            margin-top: 8px;
                            padding: 4px 10px;
                            font-size: 10px;
                            background: rgba(255, 0, 0, 0.2);
                            border: 1px solid #ff3366;
                            color: #ff3366;
                            border-radius: 3px;
                            cursor: pointer;
                        ">🗑 ELIMINA</button>
                    </div>
                </div>
            `;

            // Delete button handler
            const deleteBtn = container.querySelector('.delete-slot-btn');
            deleteBtn.onclick = (e) => {
                e.stopPropagation();
                this.showDeleteSlotConfirmation(slot.slotId);
            };
        } else {
            // Empty slot
            container.innerHTML = `
                <div style="text-align: center; color: #666; padding: 10px;">
                    <div style="font-size: 14px; margin-bottom: 5px;">
                        📂 SLOT ${slot.slotId}
                    </div>
                    <div style="font-size: 12px; font-style: italic;">
                        ${isEmpty ? '[ VUOTO - Clicca per iniziare ]' : '[ VUOTO ]'}
                    </div>
                </div>
            `;
        }

        // Hover effects
        container.onmouseenter = () => {
            container.style.background = slot.exists ? 'rgba(0, 255, 136, 0.15)' : 'rgba(100, 100, 100, 0.1)';
            container.style.borderColor = slot.exists ? '#00ff88' : '#666';
            container.style.boxShadow = `0 0 15px ${slot.exists ? 'rgba(0, 255, 136, 0.3)' : 'rgba(100, 100, 100, 0.2)'}`;
            if (SoundManager) SoundManager.menuHover();
        };

        container.onmouseleave = () => {
            container.style.background = slot.exists ? 'rgba(0, 255, 136, 0.08)' : 'rgba(100, 100, 100, 0.05)';
            container.style.borderColor = slot.exists ? 'rgba(0, 255, 136, 0.4)' : 'rgba(100, 100, 100, 0.3)';
            container.style.boxShadow = 'none';
        };

        container.onclick = () => {
            if (SoundManager) SoundManager.menuClick();
            onClick(slot.slotId);
        };

        return container;
    },

    showOverwriteConfirmation(slotId, onConfirm) {
        const output = document.getElementById('terminal-output');

        const dialogDiv = document.createElement('div');
        dialogDiv.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(10, 14, 20, 0.95); border: 2px solid #ff6b6b; padding: 30px; border-radius: 8px; z-index: 10000; box-shadow: 0 0 30px rgba(255, 107, 107, 0.5);';
        dialogDiv.innerHTML = `
            <div style="color: #ff6b6b; font-size: 16px; margin-bottom: 20px; text-align: center;">
                ⚠️ SOVRASCRIVI SLOT ${slotId}?<br><br>
                <span style="font-size: 13px; color: #ccc;">
                Questa azione cancellerà la partita esistente<br>
                e non può essere annullata.
                </span>
            </div>
        `;

        const btnContainer = document.createElement('div');
        btnContainer.style.cssText = 'display: flex; justify-content: center; gap: 15px;';

        const btnNo = this.createMenuButton('ANNULLA', () => {
            dialogDiv.remove();
        });
        btnNo.style.minWidth = '120px';

        const btnYes = this.createMenuButton('SOVRASCRIVI', () => {
            dialogDiv.remove();
            onConfirm();
        });
        btnYes.style.minWidth = '120px';
        btnYes.style.background = 'rgba(255, 51, 102, 0.2)';
        btnYes.style.borderColor = '#ff3366';
        btnYes.style.color = '#ff3366';

        btnContainer.appendChild(btnNo);
        btnContainer.appendChild(btnYes);
        dialogDiv.appendChild(btnContainer);
        document.body.appendChild(dialogDiv);
    },

    showDeleteSlotConfirmation(slotId) {
        // Check if slot exists
        const slots = StateManager.getAllSaveSlots();
        const slot = slots.find(s => s.slotId === slotId);

        const dialogDiv = document.createElement('div');
        dialogDiv.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(10, 14, 20, 0.95); border: 2px solid #ff3366; padding: 30px; border-radius: 8px; z-index: 10000; box-shadow: 0 0 30px rgba(255, 51, 102, 0.5);';

        if (!slot || !slot.exists) {
            // Empty slot - philosophical message
            dialogDiv.innerHTML = `
                <div style="color: #00ff88; font-size: 16px; margin-bottom: 20px; text-align: center; line-height: 1.6;">
                    💭<br><br>
                    <span style="font-size: 14px; color: #00ff66; font-style: italic;">
                    Non puoi cancellare<br>ciò che non hai vissuto.
                    </span>
                </div>
            `;

            const btnContainer = document.createElement('div');
            btnContainer.style.cssText = 'display: flex; justify-content: center;';

            const btnOk = this.createMenuButton('COMPRENDO', () => {
                dialogDiv.remove();
            });
            btnOk.style.minWidth = '150px';

            btnContainer.appendChild(btnOk);
            dialogDiv.appendChild(btnContainer);
            document.body.appendChild(dialogDiv);
            return;
        }

        // Existing slot - philosophical message
        dialogDiv.innerHTML = `
            <div style="color: #ff3366; font-size: 16px; margin-bottom: 20px; text-align: center; line-height: 1.6;">
                🗑️<br><br>
                <span style="font-size: 14px; color: #ff6666; font-style: italic;">
                Puoi tentare di cancellare un ricordo,<br>
                ma esso vivrà sempre<br>
                ancorato nei tuoi abissi.
                </span>
            </div>
        `;

        const btnContainer = document.createElement('div');
        btnContainer.style.cssText = 'display: flex; justify-content: center; gap: 15px;';

        const btnNo = this.createMenuButton('PRESERVA', () => {
            dialogDiv.remove();
        });
        btnNo.style.minWidth = '120px';

        const btnYes = this.createMenuButton('CANCELLA', () => {
            dialogDiv.remove();
            StateManager.deleteSaveSlot(slotId);
            // Refresh current screen
            const loadScreen = document.getElementById('load-game-screen');
            const newGameScreen = document.getElementById('new-game-screen');
            if (loadScreen) {
                loadScreen.remove();
                this.showLoadGame();
            } else if (newGameScreen) {
                newGameScreen.remove();
                this.showNewGameSlotSelection();
            }
        });
        btnYes.style.minWidth = '120px';
        btnYes.style.background = 'rgba(255, 51, 102, 0.2)';
        btnYes.style.borderColor = '#ff3366';
        btnYes.style.color = '#ff3366';

        btnContainer.appendChild(btnNo);
        btnContainer.appendChild(btnYes);
        dialogDiv.appendChild(btnContainer);
        document.body.appendChild(dialogDiv);
    },

    showLanguageChangeConfirmation(newLanguage) {
        const languageNames = {
            'it': 'Italiano',
            'en': 'English'
        };

        const dialogDiv = document.createElement('div');
        dialogDiv.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(10, 14, 20, 0.95); border: 2px solid #00ff88; padding: 30px; border-radius: 8px; z-index: 10000; box-shadow: 0 0 30px rgba(0, 255, 136, 0.5);';
        dialogDiv.innerHTML = `
            <div style="color: #00ff88; font-size: 16px; margin-bottom: 20px; text-align: center;">
                🌐 ${newLanguage === 'it' ? 'CAMBIA LINGUA' : 'CHANGE LANGUAGE'}<br><br>
                <span style="font-size: 13px; color: #ccc;">
                ${newLanguage === 'it' ? 'Vuoi cambiare la lingua in' : 'Change language to'} ${languageNames[newLanguage]}?<br>
                ${newLanguage === 'it' ? 'Il menu verrà ricaricato.' : 'The menu will reload.'}
                </span>
            </div>
        `;

        const btnContainer = document.createElement('div');
        btnContainer.style.cssText = 'display: flex; justify-content: center; gap: 15px;';

        const btnNo = this.createMenuButton(newLanguage === 'it' ? 'ANNULLA' : 'CANCEL', () => {
            // Restore previous language in select
            const select = document.querySelector('select[data-option="language"]');
            if (select) {
                select.value = this.options.language;
            }
            dialogDiv.remove();
        });
        btnNo.style.minWidth = '120px';

        const btnYes = this.createMenuButton(newLanguage === 'it' ? 'CONFERMA' : 'CONFIRM', () => {
            dialogDiv.remove();
            // Apply language change
            this.options.language = newLanguage;
            localStorage.setItem('gameLingua', newLanguage);
            this.saveOptions();

            // Reload options menu
            const optionsScreen = document.getElementById('options-screen');
            if (optionsScreen) {
                optionsScreen.remove();
                this.showOptions();
            }
        });
        btnYes.style.minWidth = '120px';

        btnContainer.appendChild(btnNo);
        btnContainer.appendChild(btnYes);
        dialogDiv.appendChild(btnContainer);
        document.body.appendChild(dialogDiv);
    },

    createOptionToggle(label, optionKey, description, onChange) {
        const container = document.createElement('div');
        container.style.cssText = 'width: 400px; max-width: 90%; background: rgba(0, 255, 65, 0.05); border: 1px solid rgba(0, 255, 65, 0.3); padding: 10px 12px; border-radius: 3px;';

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

    createOptionSlider(label, optionKey, description, min, max, step, suffix = '', onChange) {
        const container = document.createElement('div');
        container.className = 'option-toggle';
        container.style.cssText = 'width: 400px; max-width: 90%; background: rgba(0, 255, 65, 0.05); border: 1px solid rgba(0, 255, 65, 0.3); padding: 10px 12px; border-radius: 3px;';

        const labelDiv = document.createElement('div');
        labelDiv.style.cssText = 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;';

        const labelText = document.createElement('span');
        labelText.style.cssText = 'color: #00ff41; font-size: 14px; font-weight: bold;';
        labelText.textContent = label;

        const valueDisplay = document.createElement('span');
        valueDisplay.style.cssText = 'color: #00ff88; font-size: 13px; font-family: monospace; min-width: 60px; text-align: right;';
        valueDisplay.textContent = this.options[optionKey] + suffix;

        labelDiv.appendChild(labelText);
        labelDiv.appendChild(valueDisplay);

        const sliderContainer = document.createElement('div');
        sliderContainer.style.cssText = 'margin: 8px 0;';

        const slider = document.createElement('input');
        slider.type = 'range';
        slider.min = min;
        slider.max = max;
        slider.step = step;
        slider.value = this.options[optionKey];
        slider.style.cssText = `
            width: 100%;
            height: 6px;
            background: linear-gradient(to right,
                #00ff41 0%,
                #00ff41 ${((this.options[optionKey] - min) / (max - min)) * 100}%,
                rgba(0, 255, 65, 0.2) ${((this.options[optionKey] - min) / (max - min)) * 100}%,
                rgba(0, 255, 65, 0.2) 100%);
            outline: none;
            border-radius: 3px;
            cursor: pointer;
        `;

        slider.oninput = () => {
            const value = parseInt(slider.value);
            this.options[optionKey] = value;
            valueDisplay.textContent = value + suffix;

            // Update slider background
            const percentage = ((value - min) / (max - min)) * 100;
            slider.style.background = `linear-gradient(to right,
                #00ff41 0%,
                #00ff41 ${percentage}%,
                rgba(0, 255, 65, 0.2) ${percentage}%,
                rgba(0, 255, 65, 0.2) 100%)`;

            this.saveOptions();

            // Call onChange callback
            if (onChange) {
                onChange(value);
            }
        };

        sliderContainer.appendChild(slider);

        const descDiv = document.createElement('div');
        descDiv.style.cssText = 'color: #888; font-size: 11px; text-align: left; margin-top: 8px;';
        descDiv.textContent = description;

        container.appendChild(labelDiv);
        container.appendChild(sliderContainer);
        container.appendChild(descDiv);

        return container;
    },

    createOptionSelect(label, optionKey, description, optionsArray, onChange) {
        const container = document.createElement('div');
        container.className = 'option-toggle';
        container.style.cssText = 'width: 400px; max-width: 90%; background: rgba(0, 255, 65, 0.05); border: 1px solid rgba(0, 255, 65, 0.3); padding: 10px 12px; border-radius: 3px;';

        const labelDiv = document.createElement('div');
        labelDiv.style.cssText = 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;';

        const labelText = document.createElement('span');
        labelText.style.cssText = 'color: #00ff41; font-size: 14px; font-weight: bold;';
        labelText.textContent = label;

        const select = document.createElement('select');
        select.style.cssText = `
            padding: 5px 10px;
            font-size: 12px;
            background: rgba(0, 255, 65, 0.1);
            border: 2px solid #00ff41;
            color: #00ff41;
            border-radius: 3px;
            cursor: pointer;
            font-family: 'Courier New', monospace;
        `;

        optionsArray.forEach(opt => {
            const option = document.createElement('option');
            option.value = opt.value;
            option.textContent = opt.label;
            if (this.options[optionKey] == opt.value) {
                option.selected = true;
            }
            select.appendChild(option);
        });

        select.onchange = () => {
            // Handle both string and number values
            const value = isNaN(select.value) ? select.value : parseInt(select.value);
            this.options[optionKey] = value;
            this.saveOptions();

            // Call onChange callback
            if (onChange) {
                onChange(value);
            }
        };

        labelDiv.appendChild(labelText);
        labelDiv.appendChild(select);

        const descDiv = document.createElement('div');
        descDiv.style.cssText = 'color: #888; font-size: 11px; text-align: left; margin-top: 8px;';
        descDiv.textContent = description;

        container.appendChild(labelDiv);
        container.appendChild(descDiv);

        return container;
    },

    createSectionHeader(container, title) {
        const header = document.createElement('div');
        header.style.cssText = `
            width: 400px;
            max-width: 90%;
            text-align: center;
            color: #00ff88;
            font-size: 13px;
            font-weight: bold;
            letter-spacing: 2px;
            margin-top: 15px;
            margin-bottom: 5px;
            padding: 8px;
            background: rgba(0, 255, 136, 0.1);
            border-top: 2px solid rgba(0, 255, 136, 0.5);
            border-bottom: 2px solid rgba(0, 255, 136, 0.5);
            text-shadow: 0 0 5px rgba(0, 255, 136, 0.5);
        `;
        header.textContent = title;
        container.appendChild(header);
    },

    startNewGame() {
        console.log('[MENU] Starting new game');
        this.menuActive = false;

        // Reset game state
        StateManager.resetGame();

        // Initialize desktop environment (but don't create any windows yet)
        if (typeof DesktopManager !== 'undefined') {
            DesktopManager.init();
        }

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

        // Initialize desktop environment if not already initialized
        if (typeof DesktopManager !== 'undefined' && !DesktopManager.windows) {
            DesktopManager.init();
        }

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
        // === AUDIO ===
        if (SoundManager) {
            SoundManager.setEnabled(this.options.soundEffects);
            SoundManager.setVolume(this.options.soundVolume / 100);
        }

        // === GAMEPLAY ===
        if (NarrativeEngine) {
            NarrativeEngine.typingSpeed = this.options.textSpeed;
        }
        document.documentElement.style.fontSize = this.options.textSize + '%';

        // === VISUAL EFFECTS ===
        const crtOverlay = document.getElementById('crt-overlay');
        if (crtOverlay) {
            crtOverlay.style.display = this.options.crtEffects ? 'block' : 'none';
            crtOverlay.style.opacity = this.options.scanlines ? '1' : '0';
        }

        const terminal = document.getElementById('terminal-container');
        if (terminal) {
            if (this.options.crtCurved) {
                terminal.classList.add('crt-curved');
            } else {
                terminal.classList.remove('crt-curved');
            }
            terminal.style.opacity = this.options.interfaceOpacity / 100;
        }

        // CRT Intensity
        if (crtOverlay && this.options.crtIntensity !== undefined) {
            const baseOpacity = this.options.scanlines ? 1 : 0;
            crtOverlay.style.opacity = baseOpacity * (this.options.crtIntensity / 100);
        }

        // Glitch Intensity
        window.gameGlitchIntensity = this.options.glitchIntensity / 100;

        // Black & White Mode
        if (this.options.blackAndWhiteMode) {
            document.body.classList.add('bw-mode');
        } else {
            document.body.classList.remove('bw-mode');
        }

        // High Contrast Mode
        if (this.options.highContrast) {
            document.body.classList.add('high-contrast');
        } else {
            document.body.classList.remove('high-contrast');
        }

        // === INTERFACE ===
        const cursor = document.querySelector('.custom-cursor');
        if (cursor) {
            cursor.style.display = this.options.customCursor ? 'block' : 'none';
        }
        if (this.options.customCursor) {
            document.body.style.cursor = 'none';
        } else {
            document.body.style.cursor = 'default';
        }

        // Cursor Trail
        if (CursorManager) {
            CursorManager.trailEnabled = this.options.cursorTrail;
        }

        // Skip Animations
        if (this.options.skipAnimations) {
            document.body.classList.add('skip-animations');
        } else {
            document.body.classList.remove('skip-animations');
        }

        // Color Theme
        this.applyColorTheme(this.options.colorTheme);

        // Store options globally for other systems to access
        if (typeof window.gameOptions === 'undefined') {
            window.gameOptions = this.options;
        } else {
            Object.assign(window.gameOptions, this.options);
        }
    },

    applyColorTheme(theme) {
        const themes = {
            green: {
                primary: '#00ff88',
                secondary: '#00aaff',
                tertiary: '#00ff41',
                glow: '#00ff88'
            },
            amber: {
                primary: '#ffaa00',
                secondary: '#ff8800',
                tertiary: '#ffcc00',
                glow: '#ffaa00'
            },
            blue: {
                primary: '#00aaff',
                secondary: '#0088ff',
                tertiary: '#00ccff',
                glow: '#00aaff'
            },
            red: {
                primary: '#ff3366',
                secondary: '#ff0044',
                tertiary: '#ff5588',
                glow: '#ff3366'
            },
            purple: {
                primary: '#cc66ff',
                secondary: '#aa44ff',
                tertiary: '#ee88ff',
                glow: '#cc66ff'
            },
            cyan: {
                primary: '#00ffff',
                secondary: '#00cccc',
                tertiary: '#00ffcc',
                glow: '#00ffff'
            }
        };

        const selectedTheme = themes[theme] || themes.green;

        // Apply CSS custom properties
        document.documentElement.style.setProperty('--primary-color', selectedTheme.primary);
        document.documentElement.style.setProperty('--secondary-color', selectedTheme.secondary);
        document.documentElement.style.setProperty('--glow', `0 0 5px ${selectedTheme.glow}`);

        // Update cursor colors
        const cursorStyle = document.createElement('style');
        cursorStyle.id = 'dynamic-cursor-theme';
        const existingStyle = document.getElementById('dynamic-cursor-theme');
        if (existingStyle) existingStyle.remove();

        cursorStyle.textContent = `
            .custom-cursor {
                border-color: ${selectedTheme.primary} !important;
                box-shadow: 0 0 10px ${selectedTheme.primary}, inset 0 0 5px ${selectedTheme.primary} !important;
            }
            .custom-cursor::before {
                background: ${selectedTheme.primary} !important;
                box-shadow: 0 0 5px ${selectedTheme.primary} !important;
            }
            .custom-cursor::after {
                border-color: ${selectedTheme.tertiary} !important;
            }
            .cursor-trail::before {
                border-color: ${selectedTheme.primary} !important;
                box-shadow: 0 0 5px ${selectedTheme.primary}, inset 0 0 3px ${selectedTheme.primary} !important;
            }
            .cursor-trail::after {
                background: ${selectedTheme.primary} !important;
                box-shadow: 0 0 3px ${selectedTheme.primary} !important;
            }
        `;

        document.head.appendChild(cursorStyle);

        console.log(`[MENU] Applied color theme: ${theme}`);
    }
};
