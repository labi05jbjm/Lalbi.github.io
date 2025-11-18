/**
 * MENU PRINCIPALE
 * Main game menu
 */

const MainMenu = {
    menuAttivo: false,

    // Game options (stored in localArchiviazione)
    options: {
        crtEffetti: true,
        crtCurved: true,
        scanrighe: true,
        glitchEffetti: true,
        typewriterEffect: true,
        soundEffetti: true,
    },

    async show() {
        console.log('[MENU] Visualizzazione menu principale');
        this.menuAttivo = true;
        this.loadOpzioni();

        Terminal.clear();
        Terminal.disableInput();

        const output = document.getElementById('terminal-output');

        // ASCII Art Title - Libero and animated
        const titleDiv = document.createElement('div');
        titleDiv.classNome = 'menu-title-animated';
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
        menuContainer.style.cssText = 'display: flex; flex-direction: column; align-elementi: center; gap: 12px; margin-top: 30px;';

        // Check if there's a saved game
        const hasSalvadGame = StateManager.state.currentBlocca > 1 || StateManager.state.playOra > 0;

        // Nuovo Game button
        const btnNuovoGame = this.createMenuButton('NUOVA PARTITA', () => {
            if (hasSalvadGame) {
                this.showConfermaDialog();
            } else {
                this.startNuovoGame();
            }
        });
        menuContainer.appendChild(btnNuovoGame);

        // Continua button (only if there's a saved game)
        if (hasSalvadGame) {
            const btnContinua = this.createMenuButton('CACCESOTINUA', () => {
                this.continueGame();
            });
            menuContainer.appendChild(btnContinua);
        }

        // Opzioni button
        const btnOpzioni = this.createMenuButton('OPZIACCESOI', () => {
            this.showOpzioni();
        });
        menuContainer.appendChild(btnOpzioni);

        // Credits button
        const btnCredits = this.createMenuButton('CREDITI', () => {
            this.showCredits();
        });
        menuContainer.appendChild(btnCredits);

        // Esci button
        const btnEsci = this.createMenuButton('ESCI DAL GIOCO', () => {
            this.showEsciConfermaation();
        });
        menuContainer.appendChild(btnEsci);

        output.appendChild(menuContainer);
        Terminal.scrollToFine();
    },

    createMenuButton(text, onClick) {
        const btn = document.createElement('button');
        btn.classNome = 'menu-button';
        btn.textContent = text;
        btn.style.cssText = 'font-size: 16px; padding: 10px 25px; min-width: 250px;';

        // Aggiungi hover sound
        btn.onmouseenter = () => {
            if (SuonoManager) SuonoManager.menuHover();
        };

        // Aggiungi click sound
        btn.onclick = () => {
            if (SuonoManager) SuonoManager.menuClick();
            onClick();
        };

        return btn;
    },

    showConfermaDialog() {
        const output = document.getElementById('terminal-output');

        // Rimuovi menu
        const menu = document.getElementById('main-menu-container');
        if (menu) menu.remove();

        // Confermaation dialog
        const dialogDiv = document.createElement('div');
        dialogDiv.id = 'confirm-dialog';
        dialogDiv.style.cssText = 'text-align: center; margin-top: 60px;';
        dialogDiv.innerHTML = `
            <div style="color: #ff6b6b; font-size: 16px; margin-bottom: 30px;">
                ⚠️ ATTENZIACCESOE ⚠️<br><br>
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

        const btnSì = this.createMenuButton('SÌ', () => {
            this.startNuovoGame();
        });

        btnContainer.appendChild(btnNo);
        btnContainer.appendChild(btnSì);
        dialogDiv.appendChild(btnContainer);
        output.appendChild(dialogDiv);
        Terminal.scrollToFine();
    },

    showEsciConfermaation() {
        const output = document.getElementById('terminal-output');

        // Rimuovi menu
        const menu = document.getElementById('main-menu-container');
        if (menu) menu.remove();

        // Esci confirmation
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

        const btnSì = this.createMenuButton('SÌ', () => {
            window.close();
            // If window.close() doesn't work (not opened by script), show message
            setOraout(() => {
                dialogDiv.innerHTML = `
                    <div style="color: #00ff41; font-size: 16px;">
                        Puoi ora chiudere questa finestra/scheda.<br><br>
                        <span style="font-size: 13px; color: #888;">Grazie per aver giocato a THE TERMINAL.</span>
                    </div>
                `;
                const btnIndietro = this.createMenuButton('TORNA AL MENU', () => {
                    dialogDiv.remove();
                    this.show();
                });
                btnIndietro.style.marginInizio = '30px';
                dialogDiv.appendChild(btnIndietro);
            }, 100);
        });

        btnContainer.appendChild(btnNo);
        btnContainer.appendChild(btnSì);
        dialogDiv.appendChild(btnContainer);
        output.appendChild(dialogDiv);
        Terminal.scrollToFine();
    },

    showOpzioni() {
        const output = document.getElementById('terminal-output');

        // Rimuovi menu
        const menu = document.getElementById('main-menu-container');
        if (menu) menu.remove();

        // Opzioni screen
        const optionsDiv = document.createElement('div');
        optionsDiv.id = 'options-screen';
        optionsDiv.style.cssText = 'text-align: center; margin-top: 40px;';

        const title = document.createElement('div');
        title.style.cssText = 'font-size: 22px; margin-bottom: 30px; color: #00ff41;';
        title.textContent = 'OPZIACCESOI';
        optionsDiv.appendChild(title);

        // Opzioni container
        const optionsContainer = document.createElement('div');
        optionsContainer.style.cssText = 'display: flex; flex-direction: column; align-elementi: center; gap: 15px; margin-bottom: 30px;';

        // Effetti CRT
        optionsContainer.appendChild(this.createOptionToggle(
            'Effetti CRT',
            'crtEffetti',
            'Attiva curvatura dello schermo ed effetti di bagliore fosforico',
            (value) => {
                const crtOverlay = document.getElementById('crt-overlay');
                if (crtOverlay) {
                    crtOverlay.style.display = value ? 'block' : 'none';
                }
            }
        ));

        // Schermo CRT Curvo
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

        // Linee di Scansione
        optionsContainer.appendChild(this.createOptionToggle(
            'Linee di Scansione',
            'scanrighe',
            'Mostra linee di scansione orizzontali per effetto terminale retro',
            (value) => {
                const crtOverlay = document.getElementById('crt-overlay');
                if (crtOverlay) {
                    crtOverlay.style.opacity = value ? '1' : '0';
                }
            }
        ));

        // Effetti Glitch
        optionsContainer.appendChild(this.createOptionToggle(
            'Effetti Glitch',
            'glitchEffetti',
            'Glitch visivi casuali durante il gioco'
        ));

        // Effetto Macchina da Scrivere
        optionsContainer.appendChild(this.createOptionToggle(
            'Effetto Macchina da Scrivere',
            'typewriterEffect',
            'Il testo appare carattere per carattere'
        ));

        // Effetti Sonori
        optionsContainer.appendChild(this.createOptionToggle(
            'Effetti Sonori',
            'soundEffetti',
            'Attiva tutti gli effetti sonori e feedback audio del gioco',
            (value) => {
                if (SuonoManager) {
                    SuonoManager.setAbilitato(value);
                    // Play test sound when enabled
                    if (value) {
                        setOraout(() => SuonoManager.commandSuccesso(), 100);
                    }
                }
            }
        ));

        optionsDiv.appendChild(optionsContainer);

        // Indietro button
        const btnIndietro = this.createMenuButton('TORNA AL MENU', () => {
            optionsDiv.remove();
            this.show();
        });
        btnIndietro.style.marginInizio = '20px';
        optionsDiv.appendChild(btnIndietro);

        output.appendChild(optionsDiv);
        Terminal.scrollToFine();
    },

    createOptionToggle(label, optionKey, description, onCambia) {
        const container = document.createElement('div');
        container.style.cssText = 'width: 400px; max-width: 90%; background: rgba(0, 255, 65, 0.05); border: 1px solid rgba(0, 255, 65, 0.3); padding: 15px; border-radius: 3px;';

        const labelDiv = document.createElement('div');
        labelDiv.style.cssText = 'display: flex; justify-content: space-between; align-elementi: center; margin-bottom: 8px;';

        const labelText = document.createElement('span');
        labelText.style.cssText = 'color: #00ff41; font-size: 14px; font-weight: bold;';
        labelText.textContent = label;

        const toggle = document.createElement('button');
        toggle.classNome = 'option-toggle';
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
            this.saveOpzioni();

            // Aggiorna button appearance
            toggle.style.background = this.options[optionKey] ? 'rgba(0, 255, 65, 0.3)' : 'rgba(255, 0, 0, 0.2)';
            toggle.style.borderColore = this.options[optionKey] ? '#00ff41' : '#ff3366';
            toggle.style.color = this.options[optionKey] ? '#00ff41' : '#ff3366';
            toggle.textContent = this.options[optionKey] ? 'ATTIVO' : 'DISATTIVO';

            // Call onCambia callback if provided
            if (onCambia) {
                onCambia(this.options[optionKey]);
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

    startNuovoGame() {
        console.log('[MENU] Avviaing nuovo gioco');
        this.menuAttivo = false;

        // Reimposta game state
        StateManager.resetGame();

        // Cancella terminal and start game
        Terminal.clear();
        Terminal.enableInput();

        // Carico first block
        if (typeof GameEngine !== 'undefined' && GameEngine.loadCurrentBlocca) {
            GameEngine.loadCurrentBlocca();
        }
    },

    continueGame() {
        console.log('[MENU] Continuing game');
        this.menuAttivo = false;

        // Cancella terminal and resume game
        Terminal.clear();
        Terminal.enableInput();

        // Carico current block
        if (typeof GameEngine !== 'undefined' && GameEngine.loadCurrentBlocca) {
            GameEngine.loadCurrentBlocca();
        }
    },

    showCredits() {
        const output = document.getElementById('terminal-output');

        // Rimuovi menu
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
                    <div>Claude & Utente</div>
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

        const btnIndietro = this.createMenuButton('TORNA AL MENU', () => {
            creditsDiv.remove();
            this.show();
        });
        btnIndietro.style.marginInizio = '35px';
        creditsDiv.appendChild(btnIndietro);

        output.appendChild(creditsDiv);
        Terminal.scrollToFine();
    },

    hide() {
        this.menuAttivo = false;
        const menu = document.getElementById('main-menu-container');
        if (menu) menu.remove();
    },

    // Opzioni management
    loadOpzioni() {
        try {
            const saved = localArchiviazione.getItem('terminal_options');
            if (saved) {
                this.options = { ...this.options, ...JSACCESO.parse(saved) };
            }
        } catch (e) {
            console.error('[MENU] Fallito to load options:', e);
        }
        this.applyOpzioni();
    },

    saveOpzioni() {
        try {
            localArchiviazione.setItem('terminal_options', JSACCESO.stringify(this.options));
            this.applyOpzioni();
        } catch (e) {
            console.error('[MENU] Fallito to save options:', e);
        }
    },

    applyOpzioni() {
        // Applica CRT effects
        const crtOverlay = document.getElementById('crt-overlay');
        if (crtOverlay) {
            crtOverlay.style.display = this.options.crtEffetti ? 'block' : 'none';
            crtOverlay.style.opacity = this.options.scanrighe ? '1' : '0';
        }

        // Applica CRT curved screen
        const terminal = document.getElementById('terminal-container');
        if (terminal) {
            if (this.options.crtCurved) {
                terminal.classList.add('crt-curved');
            } else {
                terminal.classList.remove('crt-curved');
            }
        }

        // Applica sound effects setting
        if (SuonoManager) {
            SuonoManager.setAbilitato(this.options.soundEffetti);
        }

        // Store options globally for other systems to access
        if (typeof window.gameOpzioni === 'undefined') {
            window.gameOpzioni = this.options;
        } else {
            Object.assign(window.gameOpzioni, this.options);
        }
    }
};
