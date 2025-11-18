/**
 * LANGUAGE SELECTOR TERMINAL
 * Immersive language selection with B&W terminal and Matrix animation
 */

const LanguageSelector = {
    selectedLanguage: null,
    isConfermaed: false,

    async show() {
        console.log('[LANG-SELECT] Visualizzazione terminale selezione lingua');

        // Applica B&W theme FIRST
        this.applyBlackWhiteTheme();

        // Wait for theme to apply
        await this.wait(100);

        // Cancella terminal and show boot sequence
        Terminal.clear();
        Terminal.disableInput();

        // Nascondi the input line completely
        const inputLine = document.getElementById('terminal-input-line');
        if (inputLine) {
            inputLine.style.display = 'none';
        }

        await this.showBootSequence();
        await this.showLanguagePrompt();
    },

    applyBlackWhiteTheme() {
        // Add B&W class to body for global styling
        document.body.classList.add('bw-theme');

        const container = document.getElementById('terminal-container');
        const output = document.getElementById('terminal-output');
        const header = document.getElementById('terminal-header');

        if (container) {
            container.style.transition = 'all 0.5s ease';
            container.style.border = '2px solid #ffffff';
            container.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.3), inset 0 0 50px rgba(255, 255, 255, 0.05)';
            container.style.background = 'rgba(0, 0, 0, 0.98)';
            container.classList.remove('crt-curved');
        }

        if (output) {
            output.style.color = '#ffffff';
        }

        if (header) {
            header.style.borderColor = '#ffffff';
            header.style.background = 'rgba(255, 255, 255, 0.1)';
            const systemName = document.getElementById('system-name');
            const systemStatus = document.getElementById('system-status');
            if (systemName) systemName.style.color = '#ffffff';
            if (systemStatus) systemStatus.style.color = '#ffffff';
        }

        // Nascondi CRT overlay
        const crtOverlay = document.getElementById('crt-overlay');
        if (crtOverlay) {
            crtOverlay.style.display = 'none';
        }

        document.body.style.background = '#000000';
    },

    async showBootSequence() {
        const bootMessages = [
            '> INIZIALIZZAZIONE SISTEMA...',
            '> CARICAMENTO MODULI PRINCIPALI...',
            '> VERIFICA INTEGRITÀ MEMORIA... [OK]',
            '> MONTAGGIO FILE SYSTEM... [OK]',
            '> AVVIO SERVIZI DI RETE... [OK]',
            '> CARICAMENTO ARCHIVIO MEMORIAM v3.7.2...',
            '> SISTEMA PRONTO',
            '',
            '> CONFIGURAZIONE LINGUISTICA RICHIESTA',
            '> SI PREGA DI SELEZIONARE LA LINGUA PREFERITA',
            '',
        ];

        for (const msg of bootMessages) {
            const line = Terminal.addOutput(msg, 'system');
            line.style.color = '#ffffff';
            line.style.textShadow = '0 0 5px rgba(255, 255, 255, 0.5)';
            await this.wait(150);
        }

        await this.wait(500);
    },

    async showLanguagePrompt() {
        const promptLine = Terminal.addOutput('> LINGUE DISPONIBILI:', 'system');
        promptLine.style.color = '#ffffff';
        promptLine.style.fontWeight = 'bold';
        await this.wait(300);

        const itLine = Terminal.addOutput('  - LINGUA ITALIANA', 'system');
        itLine.style.color = '#cccccc';
        await this.wait(200);

        const enLine = Terminal.addOutput('  - LINGUA INGLESE', 'system');
        enLine.style.color = '#cccccc';
        await this.wait(300);

        Terminal.addOutput('', 'system');
        const instructionLine = Terminal.addOutput('> DIGITA LA TUA SCELTA QUI SOTTO:', 'system');
        instructionLine.style.color = '#ffffff';
        instructionLine.style.fontWeight = 'bold';

        await this.wait(500);

        // Mostra custom input line for language selection
        this.showCustomInput();
    },

    showCustomInput() {
        const output = document.getElementById('terminal-output');

        // Create custom input container
        const inputContainer = document.createElement('div');
        inputContainer.id = 'lang-input-container';
        inputContainer.style.cssText = 'display: flex; align-items: center; margin-top: 10px; font-family: "Share Tech Mono", monospace;';

        const prompt = document.createElement('span');
        prompt.textContent = 'language@system:~$ ';
        prompt.style.cssText = 'color: #ffffff; margin-right: 5px;';

        const input = document.createElement('input');
        input.type = 'text';
        input.id = 'lang-input';
        input.autocomplete = 'off';
        input.spellcheck = false;
        input.style.cssText = `
            background: transparent;
            border: none;
            outline: none;
            color: #ffffff;
            font-family: 'Share Tech Mono', monospace;
            font-size: 14px;
            flex: 1;
            caret-color: #ffffff;
        `;

        inputContainer.appendChild(prompt);
        inputContainer.appendChild(input);
        output.appendChild(inputContainer);

        Terminal.scrollToFine();
        input.focus();

        // Handle enter key
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const userInput = input.value.trim().toLowerCase();

                // Add user input to output
                const inputLine = Terminal.addOutput(`language@system:~$ ${input.value}`, 'system');
                inputLine.style.color = '#aaaaaa';

                // Rimuovi input container
                inputContainer.remove();

                // Check language choice
                if (userInput === 'lingua italiana' || userInput === 'italiana' || userInput === 'italiano') {
                    this.selectedLanguage = 'it';
                    this.showConfirmation();
                } else if (userInput === 'lingua inglese' || userInput === 'inglese' || userInput === 'english') {
                    this.selectedLanguage = 'en';
                    this.showConfirmation();
                } else {
                    const errorLine = Terminal.addOutput('> ERRORE: SCELTA LINGUISTICA NON VALIDA', 'error');
                    errorLine.style.color = '#ff6666';
                    errorLine.style.fontWeight = 'bold';
                    const retryLine = Terminal.addOutput('> SI PREGA DI DIGITARE: "lingua italiana" OPPURE "lingua inglese"', 'system');
                    retryLine.style.color = '#ffffff';
                    // Mostra input again
                    setTimeout(() => this.showCustomInput(), 500);
                }
            }
        });
    },

    async showConfirmation() {
        await this.wait(300);
        Terminal.addOutput('', 'system');

        const warningLine = Terminal.addOutput('> ⚠ SEI SICURO UTENTE? NON POTRAI CAMBIARE OPZIONE LINGUISTICA', 'warning');
        warningLine.style.color = '#ffff00';
        warningLine.style.fontWeight = 'bold';
        warningLine.style.textShadow = '0 0 10px rgba(255, 255, 0, 0.5)';

        await this.wait(500);
        Terminal.addOutput('', 'system');

        // Create confirmation buttons
        const container = document.createElement('div');
        container.className = 'language-confirmation-container';
        container.style.cssText = 'display: flex; flex-direction: column; gap: 10px; margin: 20px 0;';

        const btnConferma = this.createConfermaButton('▶ CONFERMA OPZIONE LINGUISTICA', () => {
            this.confirmLanguage();
        });

        const btnReconsider = this.createConfermaButton('◀ RIPENSACI', () => {
            container.remove();
            this.selectedLanguage = null;
            Terminal.addOutput('', 'system');
            const backLine = Terminal.addOutput('> RITORNO ALLA SELEZIONE LINGUISTICA...', 'system');
            backLine.style.color = '#ffffff';
            this.wait(500).then(() => this.showLanguagePrompt());
        });

        container.appendChild(btnConferma);
        container.appendChild(btnReconsider);

        const output = document.getElementById('terminal-output');
        output.appendChild(container);
        Terminal.scrollToFine();
    },

    createConfermaButton(text, onClick) {
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
        console.log(`[LANG-SELECT] Lingua confirmed: ${this.selectedLanguage}`);

        // Salva language choice
        localStorage.setItem('gameLingua', this.selectedLanguage);
        localStorage.setItem('languageSelected', 'true');

        // Rimuovi confirmation buttons
        const container = document.querySelector('.language-confirmation-container');
        if (container) container.remove();

        await this.wait(300);
        Terminal.addOutput('', 'system');
        const confirmLine = Terminal.addOutput('> LINGUA CONFERMATA', 'success');
        confirmLine.style.color = '#00ff00';
        confirmLine.style.textShadow = '0 0 10px rgba(0, 255, 0, 0.8)';

        await this.wait(500);
        const initLine = Terminal.addOutput('> INIZIALIZZAZIONE SISTEMA CON LINGUA SELEZIONATA...', 'system');
        initLine.style.color = '#ffffff';

        await this.wait(1000);

        // Avvia Matrix animation
        await this.startMatrixAnimation();
    },

    async startMatrixAnimation() {
        console.log('[LANG-SELECT] Starting Matrix rain animation');

        // Create Matrix canvas overlay with fade-in
        const canvas = document.createElement('canvas');
        canvas.id = 'matrix-canvas';
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 9999;
            background: transparent;
            opacity: 0;
            transition: opacity 0.5s ease;
        `;
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Matrix rain setup
        const columns = Math.floor(canvas.width / 20);
        const drops = new Array(columns).fill(1);

        let colorPhase = 0; // 0 = white, 1 = transitioning, 2 = green
        let frameCount = 0;

        const drawMatrix = () => {
            // Semi-transparent black to create trail effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Determine color based on phase
            let textColore;
            if (colorPhase === 0) {
                textColore = '#ffffff';
            } else if (colorPhase === 1) {
                // Smooth transition from white to green
                const transitionProgress = (frameCount - 60) / 60; // 0 to 1 over 60 frames
                const r = Math.floor(255 * (1 - transitionProgress));
                const g = 255;
                const b = Math.floor(65 * transitionProgress);
                textColore = `rgb(${r}, ${g}, ${b})`;
            } else {
                textColore = '#00ff41';
            }

            ctx.fillStyle = textColore;
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

        // Fade in canvas
        await this.wait(100);
        canvas.style.opacity = '1';

        // Animation loop
        const interval = setInterval(() => {
            drawMatrix();
            frameCount++;

            // Avvia color transition after 60 frames (~1 second)
            if (frameCount === 60) {
                colorPhase = 1;
            }

            // Complete transition after 120 frames (~2 secondi)
            if (frameCount === 120) {
                colorPhase = 2;
            }

            // Fine animation after 180 frames (~3 secondi)
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

        // Rimuovi canvas
        canvas.remove();

        // Ripristina normal theme
        this.restoreNormalTheme();

        await this.wait(300);

        // Mostra main menu
        await MainMenu.show();
    },

    restoreNormalTheme() {
        // Rimuovi B&W class
        document.body.classList.remove('bw-theme');

        const container = document.getElementById('terminal-container');
        const output = document.getElementById('terminal-output');
        const header = document.getElementById('terminal-header');

        if (container) {
            container.style.border = '2px solid var(--primary-color)';
            container.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.3), inset 0 0 100px rgba(0, 255, 136, 0.03)';
            container.style.background = 'rgba(10, 14, 20, 0.95)';
        }

        if (output) {
            output.style.color = 'var(--text-color)';
        }

        if (header) {
            header.style.borderColor = 'var(--primary-color)';
            header.style.background = 'rgba(0, 255, 136, 0.1)';
            const systemName = document.getElementById('system-name');
            const systemStatus = document.getElementById('system-status');
            if (systemName) systemName.style.color = 'var(--primary-color)';
            if (systemStatus) systemStatus.style.color = 'var(--primary-color)';
        }

        document.body.style.background = 'var(--bg-color)';

        // Mostra input line again
        const inputLine = document.getElementById('terminal-input-line');
        if (inputLine) {
            inputLine.style.display = 'flex';
        }

        // Ripristina CRT effects based on options
        const crtOverlay = document.getElementById('crt-overlay');
        if (crtOverlay && MainMenu.options && MainMenu.options.crtEffetti) {
            crtOverlay.style.display = 'block';
        }

        // Applica saved options
        if (MainMenu.options && MainMenu.options.crtCurved) {
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
        return localStorage.getItem('gameLingua') || null;
    }
};
