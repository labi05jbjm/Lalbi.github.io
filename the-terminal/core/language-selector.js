/**
 * LANGUAGE SELECTOR TERMINAL
 * Immersive language selection with B&W terminal and Matrix animation
 */

const LanguageSelector = {
    selectedLanguage: null,
    isConfirmed: false,

    async show() {
        console.log('[LANG-SELECT] Showing language selection terminal');

        // Apply B&W theme
        this.applyBlackWhiteTheme();

        // Clear terminal and show boot sequence
        Terminal.clear();
        Terminal.disableInput();

        await this.showBootSequence();
        await this.showLanguagePrompt();
    },

    applyBlackWhiteTheme() {
        const container = document.getElementById('terminal-container');
        const output = document.getElementById('terminal-output');

        if (container) {
            container.style.transition = 'all 0.5s ease';
            container.style.border = '2px solid #ffffff';
            container.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.3)';
            container.classList.remove('crt-curved');
        }

        if (output) {
            output.style.color = '#ffffff';
        }

        // Hide CRT overlay temporarily
        const crtOverlay = document.getElementById('crt-overlay');
        if (crtOverlay) {
            crtOverlay.style.display = 'none';
        }

        document.body.style.background = '#000000';
    },

    async showBootSequence() {
        const bootMessages = [
            '> INITIALIZING SYSTEM...',
            '> LOADING CORE MODULES...',
            '> CHECKING MEMORY INTEGRITY... [OK]',
            '> MOUNTING FILE SYSTEMS... [OK]',
            '> STARTING NETWORK SERVICES... [OK]',
            '> LOADING MEMORIAM ARCHIVE v3.7.2...',
            '> SYSTEM READY',
            '',
            '> LANGUAGE CONFIGURATION REQUIRED',
            '> PLEASE SELECT YOUR PREFERRED LANGUAGE',
            '',
        ];

        for (const msg of bootMessages) {
            const line = Terminal.addOutput(msg, 'system');
            line.style.color = '#ffffff';
            await this.wait(150);
        }

        await this.wait(500);
    },

    async showLanguagePrompt() {
        const promptLine = Terminal.addOutput('> AVAILABLE LANGUAGES:', 'system');
        promptLine.style.color = '#ffffff';
        await this.wait(300);

        const itLine = Terminal.addOutput('  - LINGUA ITALIANA', 'system');
        itLine.style.color = '#cccccc';
        await this.wait(200);

        const enLine = Terminal.addOutput('  - LINGUA INGLESE', 'system');
        enLine.style.color = '#cccccc';
        await this.wait(300);

        Terminal.addOutput('', 'system');
        const instructLine = Terminal.addOutput('> TYPE YOUR CHOICE BELOW:', 'system');
        instructLine.style.color = '#ffffff';
        instructLine.style.fontWeight = 'bold';

        await this.wait(500);

        // Enable custom input handler
        this.enableLanguageInput();
    },

    enableLanguageInput() {
        Terminal.enableInput();

        const input = document.getElementById('terminal-input');
        const prompt = document.getElementById('prompt');

        if (prompt) {
            prompt.textContent = 'language@system:~$';
            prompt.style.color = '#ffffff';
        }

        if (input) {
            input.style.color = '#ffffff';
        }

        // Override command handler temporarily
        const originalHandler = Terminal.handleCommand;

        Terminal.handleCommand = () => {
            const userInput = input.value.trim().toLowerCase();

            // Add user input to output
            const inputLine = Terminal.addOutput(`language@system:~$ ${input.value}`, 'system');
            inputLine.style.color = '#aaaaaa';
            input.value = '';

            // Check language choice
            if (userInput === 'lingua italiana' || userInput === 'italiana' || userInput === 'italiano') {
                this.selectedLanguage = 'it';
                this.showConfirmation();
            } else if (userInput === 'lingua inglese' || userInput === 'inglese' || userInput === 'english') {
                this.selectedLanguage = 'en';
                this.showConfirmation();
            } else {
                const errorLine = Terminal.addOutput('> ERROR: INVALID LANGUAGE CHOICE', 'error');
                errorLine.style.color = '#ff6666';
                const retryLine = Terminal.addOutput('> PLEASE TYPE: "lingua italiana" OR "lingua inglese"', 'system');
                retryLine.style.color = '#ffffff';
            }
        };

        this.originalHandler = originalHandler;
    },

    async showConfirmation() {
        Terminal.disableInput();

        await this.wait(300);
        Terminal.addOutput('', 'system');

        const warningLine = Terminal.addOutput('> ⚠ SEI SICURO UTENTE? NON POTRAI CAMBIARE OPZIONE LINGUISTICA', 'warning');
        warningLine.style.color = '#ffff00';
        warningLine.style.fontWeight = 'bold';

        await this.wait(500);
        Terminal.addOutput('', 'system');

        // Create confirmation buttons
        const container = document.createElement('div');
        container.className = 'language-confirmation-container';
        container.style.cssText = 'display: flex; flex-direction: column; gap: 10px; margin: 20px 0;';

        const btnConfirm = this.createConfirmButton('▶ CONFERMA OPZIONE LINGUISTICA', () => {
            this.confirmLanguage();
        });

        const btnReconsider = this.createConfirmButton('◀ RIPENSACI', () => {
            container.remove();
            this.selectedLanguage = null;
            Terminal.addOutput('', 'system');
            const backLine = Terminal.addOutput('> RETURNING TO LANGUAGE SELECTION...', 'system');
            backLine.style.color = '#ffffff';
            this.wait(500).then(() => this.showLanguagePrompt());
        });

        container.appendChild(btnConfirm);
        container.appendChild(btnReconsider);

        const output = document.getElementById('terminal-output');
        output.appendChild(container);
        Terminal.scrollToBottom();
    },

    createConfirmButton(text, onClick) {
        const btn = document.createElement('button');
        btn.className = 'language-confirm-button';
        btn.textContent = text;
        btn.style.cssText = `
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid #ffffff;
            color: #ffffff;
            font-family: 'Share Tech Mono', monospace;
            font-size: 14px;
            padding: 12px 20px;
            cursor: pointer;
            transition: all 0.2s ease;
            text-transform: uppercase;
            letter-spacing: 1px;
        `;

        btn.onmouseenter = () => {
            btn.style.background = 'rgba(255, 255, 255, 0.2)';
            btn.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.5)';
        };

        btn.onmouseleave = () => {
            btn.style.background = 'rgba(255, 255, 255, 0.1)';
            btn.style.boxShadow = 'none';
        };

        btn.onclick = onClick;

        return btn;
    },

    async confirmLanguage() {
        console.log(`[LANG-SELECT] Language confirmed: ${this.selectedLanguage}`);

        // Save language choice
        localStorage.setItem('gameLanguage', this.selectedLanguage);
        localStorage.setItem('languageSelected', 'true');

        // Remove confirmation buttons
        const container = document.querySelector('.language-confirmation-container');
        if (container) container.remove();

        Terminal.disableInput();

        await this.wait(300);
        Terminal.addOutput('', 'system');
        const confirmLine = Terminal.addOutput('> LANGUAGE CONFIRMED', 'success');
        confirmLine.style.color = '#00ff00';

        await this.wait(500);
        const initLine = Terminal.addOutput('> INITIALIZING SYSTEM WITH SELECTED LANGUAGE...', 'system');
        initLine.style.color = '#ffffff';

        await this.wait(800);

        // Start Matrix animation
        await this.startMatrixAnimation();
    },

    async startMatrixAnimation() {
        console.log('[LANG-SELECT] Starting Matrix rain animation');

        // Create Matrix canvas overlay
        const canvas = document.createElement('canvas');
        canvas.id = 'matrix-canvas';
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 9999;
            background: #000000;
        `;
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Matrix rain setup
        const columns = Math.floor(canvas.width / 20);
        const drops = new Array(columns).fill(1);

        let colorPhase = 0; // 0 = white, 1 = transitioning, 2 = green

        const drawMatrix = () => {
            // Semi-transparent black to create trail effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Determine color based on phase
            let textColor;
            if (colorPhase === 0) {
                textColor = '#ffffff';
            } else if (colorPhase === 1) {
                // Transition from white to green
                const progress = (Date.now() % 1000) / 1000;
                const r = Math.floor(255 * (1 - progress));
                const g = Math.floor(255);
                const b = Math.floor(255 * (1 - progress) * 0.3);
                textColor = `rgb(${r}, ${g}, ${b})`;
            } else {
                textColor = '#00ff41';
            }

            ctx.fillStyle = textColor;
            ctx.font = '15px Share Tech Mono';

            for (let i = 0; i < drops.length; i++) {
                // Random binary digit
                const text = Math.random() > 0.5 ? '1' : '0';
                const x = i * 20;
                const y = drops[i] * 20;

                ctx.fillText(text, x, y);

                // Reset drop to top randomly
                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                drops[i]++;
            }
        };

        // Animation phases
        let frameCount = 0;
        const interval = setInterval(() => {
            drawMatrix();
            frameCount++;

            // Start color transition after 60 frames (~1 second)
            if (frameCount === 60) {
                colorPhase = 1;
            }

            // Complete transition after 120 frames (~2 seconds)
            if (frameCount === 120) {
                colorPhase = 2;
            }

            // End animation after 180 frames (~3 seconds)
            if (frameCount >= 180) {
                clearInterval(interval);
                this.completeTransition(canvas);
            }
        }, 16); // ~60fps
    },

    async completeTransition(canvas) {
        console.log('[LANG-SELECT] Completing transition to main menu');

        // Fade out canvas
        canvas.style.transition = 'opacity 1s ease';
        canvas.style.opacity = '0';

        await this.wait(1000);

        // Remove canvas
        canvas.remove();

        // Restore normal theme and show menu
        this.restoreNormalTheme();

        await this.wait(500);

        // Restore original command handler
        if (this.originalHandler) {
            Terminal.handleCommand = this.originalHandler;
        }

        // Show main menu
        await MainMenu.show();
    },

    restoreNormalTheme() {
        const container = document.getElementById('terminal-container');
        const output = document.getElementById('terminal-output');

        if (container) {
            container.style.border = '2px solid var(--primary-color)';
            container.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.3), inset 0 0 100px rgba(0, 255, 136, 0.03)';
        }

        if (output) {
            output.style.color = 'var(--text-color)';
        }

        document.body.style.background = 'var(--bg-color)';

        // Restore CRT effects based on options
        const crtOverlay = document.getElementById('crt-overlay');
        if (crtOverlay && MainMenu.options.crtEffects) {
            crtOverlay.style.display = 'block';
        }

        // Apply saved options
        if (MainMenu.options.crtCurved) {
            container.classList.add('crt-curved');
        }
    },

    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    // Check if language was already selected
    isLanguageSelected() {
        return localStorage.getItem('languageSelected') === 'true';
    },

    getSelectedLanguage() {
        return localStorage.getItem('gameLanguage') || null;
    }
};
