/**
 * MAIN MENU
 * Main game menu
 */

const MainMenu = {
    menuActive: false,

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
<div style="color: #888; font-style: italic; margin-top: 10px;">A Digital Descent into Memory</div>
        `;
        output.appendChild(titleDiv);

        // Menu container
        const menuContainer = document.createElement('div');
        menuContainer.id = 'main-menu-container';
        menuContainer.style.cssText = 'display: flex; flex-direction: column; align-items: center; gap: 15px; margin-top: 40px;';

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

        // Credits button
        const btnCredits = this.createMenuButton('CREDITS', () => {
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
                ⚠️ Starting a new game will erase your current progress. Continue?
            </div>
        `;

        const btnContainer = document.createElement('div');
        btnContainer.style.cssText = 'display: flex; justify-content: center; gap: 20px;';

        const btnYes = this.createMenuButton('YES', () => {
            this.startNewGame();
        });

        const btnNo = this.createMenuButton('NO', () => {
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
                CREDITS
            </div>
            <div style="font-size: 20px; margin-bottom: 40px; color: #fff;">
                THE TERMINAL
            </div>
            <div style="font-size: 14px; color: #888; line-height: 2;">
                <div style="margin-bottom: 20px;">
                    <div style="color: #00ff41;">Design & Narrative</div>
                    <div>Claude & User</div>
                </div>
                <div style="margin-bottom: 20px;">
                    <div style="color: #00ff41;">Development</div>
                    <div>Pure HTML5/CSS3/JavaScript</div>
                </div>
                <div style="margin-bottom: 30px;">
                    <div style="color: #00ff41;">Inspired by</div>
                    <div>Pony Island, The Stanley Parable,<br>and classic cyberpunk noir</div>
                </div>
                <div style="font-size: 16px; color: #00ff41; margin-top: 40px;">
                    Thank you for playing
                </div>
            </div>
        `;

        const btnBack = this.createMenuButton('BACK TO MENU', () => {
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
