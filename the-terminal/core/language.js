/**
 * LANGUAGE MANAGER
 * Gestisce la selezione e il cambio di lingua
 * Manages language selection and switching
 */

const LanguageManager = {
    currentLanguage: 'en', // 'en' or 'it'
    availableLanguages: ['en', 'it'],

    // UI Text translations
    ui: {
        en: {
            // Commands
            help: 'help',
            scan: 'scan',
            ls: 'ls',
            cd: 'cd',
            cat: 'cat',
            talk: 'talk',
            ask: 'ask',
            decrypt: 'decrypt',
            solve: 'solve',
            progress: 'progress',
            continue: 'continue',
            status: 'status',

            // System messages
            systemBooting: 'SYSTEM BOOTING...',
            accessGranted: 'ACCESS GRANTED',
            corruptionDetected: 'CORRUPTION DETECTED',
            scanningSystem: 'Scanning system...',
            loadingBlock: 'Loading block',
            gameComplete: 'GAME COMPLETE',
            thankYouPlaying: 'Thank you for playing THE TERMINAL.',
            choicesShaped: 'Your choices shaped this unique story.',
            progressSaved: 'Progress saved.',
            typeHelpForCommands: 'Type "help" to see available commands',
            typeRestartToPlayAgain: 'You may close the game or type "restart" to play again.',

            // Stats
            totalPlaytime: 'Total Playtime',
            finalSuspicion: 'Final Suspicion',
            finalTrust: 'Final Trust in ECHO',
            ending: 'Ending',
            minutes: 'minutes',

            // Errors
            commandNotFound: 'Command not found. Type "help" for available commands.',
            fileNotFound: 'File not found',
            directoryNotFound: 'Directory not found',
            invalidCommand: 'Invalid command',

            // Choice prompts
            makeYourChoice: 'Make your choice',
            choiceLocked: 'CHOICE LOCKED IN',

            // Block names
            block1Name: 'AWAKENING',
            block2Name: 'FIRST DOUBT',
            block3Name: 'DEEP DIVE',
            block4Name: 'FRACTURES',
            block5Name: 'REFLECTION',
            block6Name: 'RAGE',
            block7Name: 'ACCEPTANCE',
            block8Name: 'AFTERMATH',

            // Language selection
            selectLanguage: 'SELECT LANGUAGE / SELEZIONA LINGUA',
            languageEnglish: 'English',
            languageItalian: 'Italian / Italiano',
            pressToSelect: 'Press button to select',
        },

        it: {
            // Comandi
            help: 'aiuto',
            scan: 'scansiona',
            ls: 'ls',
            cd: 'cd',
            cat: 'cat',
            talk: 'parla',
            ask: 'chiedi',
            decrypt: 'decripta',
            solve: 'risolvi',
            progress: 'progresso',
            continue: 'continua',
            status: 'stato',

            // Messaggi di sistema
            systemBooting: 'AVVIO SISTEMA...',
            accessGranted: 'ACCESSO CONSENTITO',
            corruptionDetected: 'CORRUZIONE RILEVATA',
            scanningSystem: 'Scansione sistema...',
            loadingBlock: 'Caricamento blocco',
            gameComplete: 'GIOCO COMPLETATO',
            thankYouPlaying: 'Grazie per aver giocato a THE TERMINAL.',
            choicesShaped: 'Le tue scelte hanno plasmato questa storia unica.',
            progressSaved: 'Progresso salvato.',
            typeHelpForCommands: 'Digita "aiuto" per vedere i comandi disponibili',
            typeRestartToPlayAgain: 'Puoi chiudere il gioco o digitare "ricomincia" per giocare di nuovo.',

            // Statistiche
            totalPlaytime: 'Tempo di gioco totale',
            finalSuspicion: 'Sospetto finale',
            finalTrust: 'Fiducia finale in ECHO',
            ending: 'Finale',
            minutes: 'minuti',

            // Errori
            commandNotFound: 'Comando non trovato. Digita "aiuto" per i comandi disponibili.',
            fileNotFound: 'File non trovato',
            directoryNotFound: 'Directory non trovata',
            invalidCommand: 'Comando non valido',

            // Scelte
            makeYourChoice: 'Fai la tua scelta',
            choiceLocked: 'SCELTA CONFERMATA',

            // Nomi dei blocchi
            block1Name: 'RISVEGLIO',
            block2Name: 'PRIMO DUBBIO',
            block3Name: 'IMMERSIONE PROFONDA',
            block4Name: 'FRATTURE',
            block5Name: 'RIFLESSIONE',
            block6Name: 'RABBIA',
            block7Name: 'ACCETTAZIONE',
            block8Name: 'CONSEGUENZE',

            // Selezione lingua
            selectLanguage: 'SELECT LANGUAGE / SELEZIONA LINGUA',
            languageEnglish: 'English',
            languageItalian: 'Italian / Italiano',
            pressToSelect: 'Premi il pulsante per selezionare',
        }
    },

    init() {
        console.log('[LANGUAGE] Manager initialized');

        // Check if language was previously selected
        const savedLang = localStorage.getItem('gameLanguage');
        if (savedLang && this.availableLanguages.includes(savedLang)) {
            this.currentLanguage = savedLang;
            console.log(`[LANGUAGE] Loaded saved language: ${savedLang}`);
        }
    },

    setLanguage(lang) {
        if (!this.availableLanguages.includes(lang)) {
            console.error(`[LANGUAGE] Invalid language: ${lang}`);
            return false;
        }

        this.currentLanguage = lang;
        localStorage.setItem('gameLanguage', lang);
        console.log(`[LANGUAGE] Language set to: ${lang}`);

        return true;
    },

    getLanguage() {
        return this.currentLanguage;
    },

    getText(key) {
        const lang = this.currentLanguage;
        if (this.ui[lang] && this.ui[lang][key]) {
            return this.ui[lang][key];
        }

        // Fallback to English
        return this.ui.en[key] || key;
    },

    // Get the appropriate dialogues object based on current language
    getDialogues() {
        if (this.currentLanguage === 'it' && typeof Dialogues_IT !== 'undefined') {
            return Dialogues_IT;
        }
        return Dialogues; // English fallback
    },

    // Show language selection screen
    async showLanguageSelection() {
        return new Promise((resolve) => {
            Terminal.clear();

            const output = document.getElementById('terminal-output');

            // Title
            const title = document.createElement('div');
            title.className = 'language-selection-title';
            title.innerHTML = `
                <div class="ascii-art" style="text-align: center; margin: 40px 0;">
╔════════════════════════════════════════════════════╗
║                                                    ║
║              THE TERMINAL                          ║
║                                                    ║
║         SELECT LANGUAGE / SELEZIONA LINGUA         ║
║                                                    ║
╚════════════════════════════════════════════════════╝
                </div>
            `;
            output.appendChild(title);

            // Language buttons container
            const container = document.createElement('div');
            container.className = 'language-selection-container';
            container.style.cssText = 'display: flex; flex-direction: column; align-items: center; gap: 20px; margin-top: 40px;';

            // English button
            const btnEN = document.createElement('button');
            btnEN.className = 'language-button';
            btnEN.textContent = '🇬🇧 ENGLISH';
            btnEN.style.cssText = 'font-size: 20px; padding: 15px 40px; min-width: 300px;';
            btnEN.onclick = () => {
                this.setLanguage('en');
                container.remove();
                title.remove();
                resolve('en');
            };

            // Italian button
            const btnIT = document.createElement('button');
            btnIT.className = 'language-button';
            btnIT.textContent = '🇮🇹 ITALIANO';
            btnIT.style.cssText = 'font-size: 20px; padding: 15px 40px; min-width: 300px;';
            btnIT.onclick = () => {
                this.setLanguage('it');
                container.remove();
                title.remove();
                resolve('it');
            };

            container.appendChild(btnEN);
            container.appendChild(btnIT);
            output.appendChild(container);

            Terminal.scrollToBottom();
        });
    },

    // Check if language needs to be selected
    needsLanguageSelection() {
        const savedLang = localStorage.getItem('gameLanguage');
        return !savedLang;
    }
};
