/**
 * MAIN MENU
 * Menu principale del gioco
 */

const MainMenu = {
    menuActive: false,

    // Testi del menu (bilingue)
    text: {
        en: {
            title: 'THE TERMINAL',
            subtitle: 'A Digital Descent into Memory',
            newGame: 'NEW GAME',
            continue: 'CONTINUE',
            settings: 'SETTINGS',
            credits: 'CREDITS',
            confirmNewGame: 'Starting a new game will erase your current progress. Continue?',
            yes: 'YES',
            no: 'NO',
            languageOption: 'Language',
            backToMenu: 'BACK TO MENU',

            // Credits
            creditsTitle: 'CREDITS',
            creditsGame: 'THE TERMINAL',
            creditsDesign: 'Design & Narrative',
            creditsDevelopment: 'Development',
            creditsInspiration: 'Inspired by',
            creditsInspiredBy: 'Pony Island, The Stanley Parable, and classic cyberpunk noir',
            creditsThanks: 'Thank you for playing',

            // Settings
            settingsTitle: 'SETTINGS',
            currentLanguage: 'Current Language',
            changeLanguage: 'Change Language',
            languageChanged: 'Language changed. Menu will reload.',
        },
        it: {
            title: 'THE TERMINAL',
            subtitle: 'Una Discesa Digitale nella Memoria',
            newGame: 'NUOVA PARTITA',
            continue: 'CONTINUA',
            settings: 'IMPOSTAZIONI',
            credits: 'CREDITI',
            confirmNewGame: 'Iniziare una nuova partita cancellerà i tuoi progressi attuali. Continuare?',
            yes: 'SÌ',
            no: 'NO',
            languageOption: 'Lingua',
            backToMenu: 'TORNA AL MENU',

            // Crediti
            creditsTitle: 'CREDITI',
            creditsGame: 'THE TERMINAL',
            creditsDesign: 'Design e Narrativa',
            creditsDevelopment: 'Sviluppo',
            creditsInspiration: 'Ispirato da',
            creditsInspiredBy: 'Pony Island, The Stanley Parable e il cyberpunk noir classico',
            creditsThanks: 'Grazie per aver giocato',

            // Impostazioni
            settingsTitle: 'IMPOSTAZIONI',
            currentLanguage: 'Lingua Corrente',
            changeLanguage: 'Cambia Lingua',
            languageChanged: 'Lingua cambiata. Il menu verrà ricaricato.',
        }
    },

    getText(key) {
        const lang = LanguageManager.getLanguage();
        return this.text[lang][key] || this.text.en[key] || key;
    },

    async show() {
        console.log('[MENU] Showing main menu');
        this.menuActive = true;

        Terminal.clear();
        Terminal.disableInput();

        const output = document.getElementById('terminal-output');

        // ASCII Art Title
        const titleDiv = document.createElement('div');
        titleDiv.className = 'menu-title';
        titleDiv.style.cssText = 'text-align: center; margin: 40px 0 20px 0;';
        titleDiv.innerHTML = `
<pre class="ascii-art" style="color: #00ff41; text-shadow: 0 0 10px #00ff41;">
╔══════════════════════════════════════════════════════╗
║                                                      ║
║         ████████╗██╗  ██╗███████╗                   ║
║         ╚══██╔══╝██║  ██║██╔════╝                   ║
║            ██║   ███████║█████╗                     ║
║            ██║   ██╔══██║██╔══╝                     ║
║            ██║   ██║  ██║███████╗                   ║
║            ╚═╝   ╚═╝  ╚═╝╚══════╝                   ║
║                                                      ║
║    ████████╗███████╗██████╗ ███╗   ███╗██╗███╗   ██╗ ║
║    ╚══██╔══╝██╔════╝██╔══██╗████╗ ████║██║████╗  ██║ ║
║       ██║   █████╗  ██████╔╝██╔████╔██║██║██╔██╗ ██║ ║
║       ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║██║██║╚██╗██║ ║
║       ██║   ███████╗██║  ██║██║ ╚═╝ ██║██║██║ ╚████║ ║
║       ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝ ║
║                                                      ║
╚══════════════════════════════════════════════════════╝
</pre>
<div style="color: #888; font-style: italic; margin-top: 10px;">${this.getText('subtitle')}</div>
        `;
        output.appendChild(titleDiv);

        // Menu container
        const menuContainer = document.createElement('div');
        menuContainer.id = 'main-menu-container';
        menuContainer.style.cssText = 'display: flex; flex-direction: column; align-items: center; gap: 15px; margin-top: 40px;';

        // Check if there's a saved game
        const hasSavedGame = StateManager.state.currentBlock > 1 || StateManager.state.playTime > 0;

        // New Game button
        const btnNewGame = this.createMenuButton(this.getText('newGame'), () => {
            if (hasSavedGame) {
                this.showConfirmDialog();
            } else {
                this.startNewGame();
            }
        });
        menuContainer.appendChild(btnNewGame);

        // Continue button (only if there's a saved game)
        if (hasSavedGame) {
            const btnContinue = this.createMenuButton(this.getText('continue'), () => {
                this.continueGame();
            });
            menuContainer.appendChild(btnContinue);
        }

        // Settings button
        const btnSettings = this.createMenuButton(this.getText('settings'), () => {
            this.showSettings();
        });
        menuContainer.appendChild(btnSettings);

        // Credits button
        const btnCredits = this.createMenuButton(this.getText('credits'), () => {
            this.showCredits();
        });
        menuContainer.appendChild(btnCredits);

        output.appendChild(menuContainer);
        Terminal.scrollToBottom();
    },

    createMenuButton(text, onClick) {
        const btn = document.createElement('button');
        btn.className = 'menu-button';
        btn.textContent = text;
        btn.style.cssText = 'font-size: 18px; padding: 12px 30px; min-width: 250px;';
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
            <div style="color: #ff6b6b; font-size: 18px; margin-bottom: 30px;">
                ⚠️ ${this.getText('confirmNewGame')}
            </div>
        `;

        const btnContainer = document.createElement('div');
        btnContainer.style.cssText = 'display: flex; justify-content: center; gap: 20px;';

        const btnYes = this.createMenuButton(this.getText('yes'), () => {
            this.startNewGame();
        });

        const btnNo = this.createMenuButton(this.getText('no'), () => {
            dialogDiv.remove();
            this.show();
        });

        btnContainer.appendChild(btnNo);
        btnContainer.appendChild(btnYes);
        dialogDiv.appendChild(btnContainer);
        output.appendChild(dialogDiv);
        Terminal.scrollToBottom();
    },

    startNewGame() {
        console.log('[MENU] Starting new game');
        this.menuActive = false;

        // Reset game state
        StateManager.resetGame();

        // Clear terminal and start game
        Terminal.clear();
        Terminal.enableInput();

        // Reload to start fresh
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

    showSettings() {
        const output = document.getElementById('terminal-output');

        // Remove menu
        const menu = document.getElementById('main-menu-container');
        if (menu) menu.remove();

        // Settings screen
        const settingsDiv = document.createElement('div');
        settingsDiv.id = 'settings-screen';
        settingsDiv.style.cssText = 'text-align: center; margin-top: 60px;';

        const currentLang = LanguageManager.getLanguage();
        const langName = currentLang === 'en' ? 'English' : 'Italiano';

        settingsDiv.innerHTML = `
            <div style="font-size: 24px; margin-bottom: 40px; color: #00ff41;">
                ${this.getText('settingsTitle')}
            </div>
            <div style="font-size: 16px; margin-bottom: 20px; color: #888;">
                ${this.getText('currentLanguage')}: <span style="color: #00ff41;">${langName}</span>
            </div>
        `;

        const btnContainer = document.createElement('div');
        btnContainer.style.cssText = 'display: flex; flex-direction: column; align-items: center; gap: 15px; margin-top: 30px;';

        // Language buttons
        const btnEN = this.createMenuButton('🇬🇧 English', () => {
            LanguageManager.setLanguage('en');
            Terminal.clear();
            this.show();
        });

        const btnIT = this.createMenuButton('🇮🇹 Italiano', () => {
            LanguageManager.setLanguage('it');
            Terminal.clear();
            this.show();
        });

        const btnBack = this.createMenuButton(this.getText('backToMenu'), () => {
            settingsDiv.remove();
            this.show();
        });

        btnContainer.appendChild(btnEN);
        btnContainer.appendChild(btnIT);
        btnContainer.appendChild(btnBack);
        settingsDiv.appendChild(btnContainer);
        output.appendChild(settingsDiv);
        Terminal.scrollToBottom();
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
            <div style="font-size: 24px; margin-bottom: 30px; color: #00ff41;">
                ${this.getText('creditsTitle')}
            </div>
            <div style="font-size: 20px; margin-bottom: 40px; color: #fff;">
                ${this.getText('creditsGame')}
            </div>
            <div style="font-size: 14px; color: #888; line-height: 2;">
                <div style="margin-bottom: 20px;">
                    <div style="color: #00ff41;">${this.getText('creditsDesign')}</div>
                    <div>Claude & User</div>
                </div>
                <div style="margin-bottom: 20px;">
                    <div style="color: #00ff41;">${this.getText('creditsDevelopment')}</div>
                    <div>Pure HTML5/CSS3/JavaScript</div>
                </div>
                <div style="margin-bottom: 30px;">
                    <div style="color: #00ff41;">${this.getText('creditsInspiration')}</div>
                    <div>${this.getText('creditsInspiredBy')}</div>
                </div>
                <div style="font-size: 16px; color: #00ff41; margin-top: 40px;">
                    ${this.getText('creditsThanks')}
                </div>
            </div>
        `;

        const btnBack = this.createMenuButton(this.getText('backToMenu'), () => {
            creditsDiv.remove();
            this.show();
        });
        btnBack.style.marginTop = '40px';
        creditsDiv.appendChild(btnBack);

        output.appendChild(creditsDiv);
        Terminal.scrollToBottom();
    },

    hide() {
        this.menuActive = false;
        const menu = document.getElementById('main-menu-container');
        if (menu) menu.remove();
    }
};
