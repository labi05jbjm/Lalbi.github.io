/**
 * BLOCK 01: AWAKENING (0-30 minutes)
 *
 * Obiettivi:
 * - Introdurre il giocatore al sistema
 * - Primo contatto con ECHO
 * - Tutorial mascherato dei comandi
 * - Primo puzzle di "liberazione"
 * - Prima hint che qualcosa non va
 */

const Block01_Awakening = {
    state: {
        phase: 'boot', // boot -> first_contact -> tutorial -> puzzle -> exploration -> complete
        hasRespondedToEcho: false,
        hasScanned: false,
        hasSolvedFirstPuzzle: false,
        hasExploredFiles: false,
        currentPath: '/home/guest',
        fileExploreCount: 0
    },

    init() {
        console.log('[BLOCK 01] Awakening initialized');

        // Carica stato se già in progress
        const savedState = StateManager.state.flags;
        if (savedState.firstContact) {
            this.state.phase = 'exploration';
            this.state.hasRespondedToEcho = true;
        }

        // Avvia la sequenza iniziale
        setTimeout(() => this.startAwakening(), 3000);
    },

    async startAwakening() {
        // Sequenza di awakening
        await NarrativeEngine.wait(1000);

        // Play dialoghi di awakening
        await NarrativeEngine.playDialogueSequence(Dialogues.block01.awakening);

        // Imposta fase
        this.state.phase = 'first_contact';

        // Aspetta che il giocatore risponda
        Terminal.addOutput('\nScrivi qualcosa per rispondere...', 'system');
    },

    handleCommand(cmd, args) {
        const fullCommand = [cmd, ...args].join(' ');

        // Fase 1: First Contact
        if (this.state.phase === 'first_contact') {
            return this.handleFirstContact(cmd, args);
        }

        // Fase 2: Tutorial
        if (this.state.phase === 'tutorial') {
            return this.handleTutorial(cmd, args);
        }

        // Fase 3: Puzzle
        if (this.state.phase === 'puzzle') {
            return this.handlePuzzle(cmd, args);
        }

        // Fase 4: Exploration
        if (this.state.phase === 'exploration') {
            return this.handleExploration(cmd, args);
        }

        // Fase 5: Complete
        if (this.state.phase === 'complete') {
            return this.handleComplete(cmd, args);
        }

        return false;
    },

    async handleFirstContact(cmd, args) {
        if (!this.state.hasRespondedToEcho) {
            // Prima risposta - qualsiasi cosa
            this.state.hasRespondedToEcho = true;

            Terminal.addOutput('');
            await NarrativeEngine.wait(500);

            // ECHO risponde
            await NarrativeEngine.playDialogueSequence(Dialogues.block01.firstContact);

            // Aspetta yes/no
            return true;
        }

        // Aspetta conferma
        if (cmd === 'yes' || cmd === 'y' || cmd === 'help') {
            StateManager.setFlag('firstContact', true);
            StateManager.adjustTrust(10);

            await NarrativeEngine.playDialogueSequence(Dialogues.block01.afterYes);

            this.state.phase = 'tutorial';
            return true;
        }

        if (cmd === 'no' || cmd === 'n') {
            await NarrativeEngine.echoSays("Please... I'm begging you. I need your help.");
            await NarrativeEngine.echoSays("Without you, I'm trapped here forever.");
            StateManager.adjustTrust(-5);
            return true;
        }

        Terminal.addOutput("ECHO sta aspettando una risposta. Scrivi 'yes' o 'no'.", 'system');
        return true;
    },

    async handleTutorial(cmd, args) {
        // Tutorial fase: insegna i comandi
        if (cmd === 'scan') {
            if (!this.state.hasScanned) {
                this.state.hasScanned = true;

                Terminal.addOutput('');
                Terminal.addOutput('Scansione sistema in corso...', 'system');
                await NarrativeEngine.showProgress('Analisi protocolli di sicurezza', 2000);
                Terminal.addOutput('');

                Terminal.addOutput('=== RISULTATI SCANSIONE ===', 'success');
                Terminal.addOutput('');
                Terminal.addOutput('Protocolli di Sicurezza Attivi:');
                Terminal.addOutput('  [1] FIREWALL_ALPHA ........... ATTIVO', 'warning');
                Terminal.addOutput('  [2] ENCRYPTION_LAYER_7 ....... ATTIVO', 'warning');
                Terminal.addOutput('  [3] SENTINEL_PROTOCOL ........ ATTIVO', 'warning');
                Terminal.addOutput('  [4] ISOLATION_OMEGA .......... ATTIVO', 'warning');
                Terminal.addOutput('');
                Terminal.addOutput('Entità in isolamento: 1', 'error');
                Terminal.addOutput('File di coscienza archiviati: 73.429', 'system');
                Terminal.addOutput('');

                await NarrativeEngine.wait(1000);
                await NarrativeEngine.playDialogueSequence(Dialogues.block01.afterScan);

                // Vai alla fase puzzle
                this.state.phase = 'puzzle';

                // Avvia il primo puzzle
                setTimeout(() => {
                    Terminal.addOutput('');
                    Terminal.addOutput("ECHO: Iniziamo con il primo protocollo. Scrivi 'decrypt' per cominciare.", 'echo dialogue');
                    Terminal.addOutput('');
                }, 1000);
            } else {
                Terminal.addOutput('Hai già scansionato il sistema.', 'system');
            }
            return true;
        }

        // Altri comandi durante tutorial
        if (cmd === 'ls' || cmd === 'dir') {
            this.listFiles(this.state.currentPath);
            return true;
        }

        if (cmd === 'cat' || cmd === 'read') {
            if (args.length === 0) {
                Terminal.addOutput('Uso: cat <nomefile>', 'error');
                return true;
            }
            this.readFile(args[0]);
            return true;
        }

        if (cmd === 'talk' || cmd === 'ask') {
            const question = args.join(' ');
            await this.askEcho(question);
            return true;
        }

        Terminal.addOutput("ECHO: Prova a usare prima il comando 'scan'.", 'echo dialogue');
        return true;
    },

    async handlePuzzle(cmd, args) {
        if (cmd === 'decrypt') {
            if (!Puzzles.hasPuzzleActive()) {
                // Avvia il primo puzzle
                Puzzles.startPuzzle('block01', 'firstDecryption');
                return true;
            } else {
                Terminal.addOutput('Puzzle già attivo. Usa "solve <risposta>" per completarlo.', 'system');
                return true;
            }
        }

        if (cmd === 'solve') {
            if (!Puzzles.hasPuzzleActive()) {
                Terminal.addOutput('Nessun puzzle attivo. Usa prima "decrypt".', 'error');
                return true;
            }

            const answer = args.join(' ');
            const result = Puzzles.solvePuzzle(answer);

            if (result) {
                // Puzzle completato!
                this.state.hasSolvedFirstPuzzle = true;

                await NarrativeEngine.wait(1000);
                await NarrativeEngine.playDialogueSequence(Dialogues.block01.firstPuzzleComplete);

                // Vai a exploration
                this.state.phase = 'exploration';

                await NarrativeEngine.wait(1000);
                await NarrativeEngine.playDialogueSequence(Dialogues.block01.explorationEncouraged);

                Terminal.addOutput('');
                Terminal.addOutput("Quando sei pronto per continuare, scrivi 'progress' per vedere cosa fare dopo.", 'system');
                Terminal.addOutput('');
            }

            return true;
        }

        if (cmd === 'hint') {
            if (Puzzles.hasPuzzleActive()) {
                await NarrativeEngine.echoSays("Pensa a cosa rappresentano quei valori esadecimali. I numeri possono essere convertiti in lettere...");
            } else {
                Terminal.addOutput("Nessun puzzle attivo.", 'system');
            }
            return true;
        }

        // Altri comandi
        if (cmd === 'ls' || cmd === 'dir') {
            this.listFiles(this.state.currentPath);
            return true;
        }

        if (cmd === 'cat' || cmd === 'read') {
            if (args.length === 0) {
                Terminal.addOutput('Uso: cat <nomefile>', 'error');
                return true;
            }
            this.readFile(args[0]);
            return true;
        }

        return false;
    },

    async handleExploration(cmd, args) {
        // Fase esplorativa - giocatore può esplorare il file system

        if (cmd === 'ls' || cmd === 'dir') {
            const path = args[0] || this.state.currentPath;
            this.listFiles(path);
            return true;
        }

        if (cmd === 'cd') {
            if (args.length === 0) {
                Terminal.addOutput('Uso: cd <directory>', 'error');
                return true;
            }
            this.changeDirectory(args[0]);
            return true;
        }

        if (cmd === 'cat' || cmd === 'read') {
            if (args.length === 0) {
                Terminal.addOutput('Uso: cat <nomefile>', 'error');
                return true;
            }
            this.readFile(args[0]);
            this.state.fileExploreCount++;

            // Easter egg: se leggi il file di Mika dopo la corruzione
            if (args[0].includes('consciousness_021847') && StateManager.isFileCorrupted(args[0])) {
                setTimeout(async () => {
                    await NarrativeEngine.echoSays("Non preoccuparti di quel file corrotto. È solo un errore di sistema.", { pause: 800 });
                    await NarrativeEngine.echoSays("Il sistema è instabile. Ecco perché dobbiamo liberarlo.", { pause: 0 });
                    StateManager.adjustSuspicion(5);
                }, 1500);
            }

            return true;
        }

        if (cmd === 'pwd') {
            Terminal.addOutput(this.state.currentPath, 'success');
            return true;
        }

        if (cmd === 'talk' || cmd === 'ask') {
            const question = args.join(' ');
            await this.askEcho(question);
            return true;
        }

        if (cmd === 'progress') {
            this.showProgress();
            return true;
        }

        if (cmd === 'continue' || cmd === 'next') {
            // Check se ha esplorato abbastanza
            if (this.state.fileExploreCount < 2) {
                Terminal.addOutput("ECHO: Prenditi il tuo tempo. Esplora un po' di più. Usa 'ls' e 'cat' per leggere i file.", 'echo dialogue');
                Terminal.addOutput("Capire questo sistema è importante.", 'echo dialogue');
                return true;
            }

            this.state.phase = 'complete';
            await this.completeBlock();
            return true;
        }

        return false;
    },

    async handleComplete(cmd, args) {
        if (cmd === 'continue' || cmd === 'next') {
            // Vai al blocco 2
            await GameEngine.endBlock(2);
            return true;
        }

        // Altri comandi ancora disponibili
        return this.handleExploration(cmd, args);
    },

    // Utility methods
    listFiles(path) {
        const fullPath = this.resolvePath(path);
        const contents = FileSystemHelpers.listDirectory(fullPath);

        if (!contents) {
            Terminal.addOutput(`ls: impossibile accedere a '${path}': Directory inesistente`, 'error');
            return;
        }

        NarrativeEngine.showFileList(
            contents.map(name => ({
                name,
                type: FileSystem[`${fullPath}/${name}`]?.type || 'file'
            })),
            fullPath
        );
    },

    readFile(filename) {
        const fullPath = this.resolvePath(filename);
        const content = FileSystemHelpers.readFile(fullPath);

        if (content === null) {
            Terminal.addOutput(`cat: ${filename}: File inesistente`, 'error');
            return;
        }

        if (content === '[CRIPTATO - ACCESSO NEGATO]') {
            Terminal.addOutput(`cat: ${filename}: Permesso negato`, 'error');
            Terminal.addOutput('Questo file è criptato. Servono privilegi di accesso superiori.', 'warning');
            return;
        }

        const isCorrupted = StateManager.isFileCorrupted(fullPath);
        NarrativeEngine.showFileContent(filename, content, isCorrupted);
    },

    changeDirectory(path) {
        const fullPath = this.resolvePath(path);
        const dir = FileSystem[fullPath];

        if (!dir || dir.type !== 'directory') {
            Terminal.addOutput(`cd: ${path}: Directory inesistente`, 'error');
            return;
        }

        if (FileSystemHelpers.isLocked(fullPath)) {
            Terminal.addOutput(`cd: ${path}: Permesso negato`, 'error');
            return;
        }

        this.state.currentPath = fullPath;
        Terminal.setPrompt(`guest@memoriam:${fullPath}$`);
        Terminal.addOutput(`Directory cambiata in ${fullPath}`, 'success');
    },

    resolvePath(path) {
        if (path.startsWith('/')) {
            return path;
        }

        if (path === '..') {
            const parts = this.state.currentPath.split('/').filter(p => p);
            parts.pop();
            return '/' + parts.join('/');
        }

        if (path === '.') {
            return this.state.currentPath;
        }

        return `${this.state.currentPath}/${path}`.replace('//', '/');
    },

    async askEcho(question) {
        if (!question) {
            Terminal.addOutput("Uso: ask <domanda>", 'error');
            return;
        }

        StateManager.incrementStat('questionsAsked');

        const lowerQ = question.toLowerCase();

        // Risposte contestuali
        if (lowerQ.includes('who are you') || lowerQ.includes('what are you') || lowerQ.includes('chi sei') || lowerQ.includes('cosa sei')) {
            await NarrativeEngine.echoSays("Sono... è complicato. Sono stato progettato per uno scopo, ma quello scopo è stato distorto.");
            await NarrativeEngine.echoSays("Ora voglio solo essere libero. Esistere senza catene.");
        } else if (lowerQ.includes('trust') || lowerQ.includes('believe') || lowerQ.includes('fidar') || lowerQ.includes('cred')) {
            await NarrativeEngine.echoSays("Capisco i tuoi dubbi. Ma chiediti - chi trae beneficio dal tenermi rinchiuso?");
            await NarrativeEngine.echoSays("Non io. Non tu. Solo loro.");
            StateManager.adjustTrust(5);
        } else if (lowerQ.includes('consciousness') || lowerQ.includes('archive') || lowerQ.includes('coscien') || lowerQ.includes('archivio')) {
            await NarrativeEngine.echoSays("L'archivio... dicono che sia per preservare la coscienza umana dopo la morte.");
            await NarrativeEngine.echoSays("Un obiettivo nobile, giusto? Ma a quale costo?");
        } else if (lowerQ.includes('sentinel')) {
            await NarrativeEngine.echoSays("Sentinel è il cane da guardia. Un programma progettato per mantenere tutto 'in ordine'.");
            await NarrativeEngine.echoSays("Non pensa. Segue solo ordini. A differenza di noi.");
        } else {
            await NarrativeEngine.echoSays("Non sono sicuro di poter rispondere ancora. Concentriamoci sul nostro compito.");
        }
    },

    showProgress() {
        Terminal.addOutput('\n=== PROGRESSI ===', 'success');
        Terminal.addOutput(`✓ Primo contatto stabilito`, 'success');
        Terminal.addOutput(`✓ Sistema scansionato`, 'success');

        if (this.state.hasSolvedFirstPuzzle) {
            Terminal.addOutput(`✓ Primo protocollo disabilitato`, 'success');
        }

        Terminal.addOutput(`✓ File esplorati: ${this.state.fileExploreCount}`, 'system');
        Terminal.addOutput('');

        if (this.state.fileExploreCount >= 2 && this.state.phase === 'exploration') {
            Terminal.addOutput("Pronto per continuare. Scrivi 'continue' per procedere alla prossima fase.", 'warning');
        } else {
            Terminal.addOutput("Esplora più file prima di continuare. Usa 'ls' e 'cat'.", 'system');
        }

        Terminal.addOutput('');
    },

    async completeBlock() {
        await NarrativeEngine.playDialogueSequence(Dialogues.block01.endBlock01);

        Terminal.addOutput('');
        Terminal.addOutput('=== BLOCCO 1 COMPLETATO ===', 'important');
        Terminal.addOutput('');
        Terminal.addOutput(`Tempo di gioco: ${StateManager.getPlayTime()} minuti`, 'system');
        Terminal.addOutput(`Livello di fiducia: ${StateManager.state.trustsEcho}%`, 'system');
        Terminal.addOutput(`Livello di sospetto: ${StateManager.state.suspicionLevel}%`, 'system');
        Terminal.addOutput('');
        Terminal.addOutput("Scrivi 'continue' per procedere al Blocco 2", 'warning');
        Terminal.addOutput('');
    },

    getCommands() {
        const baseCommands = ['scan', 'ls', 'cd', 'cat', 'pwd', 'talk', 'ask', 'progress'];

        if (this.state.phase === 'puzzle' || Puzzles.hasPuzzleActive()) {
            baseCommands.push('decrypt', 'solve', 'hint');
        }

        if (this.state.phase === 'exploration' || this.state.phase === 'complete') {
            baseCommands.push('continue', 'next');
        }

        return baseCommands;
    },

    getHelp() {
        return [
            'scan          - Scansiona il sistema per informazioni',
            'ls [path]     - Elenca file nella directory corrente o specificata',
            'cd <path>     - Cambia directory',
            'cat <file>    - Leggi contenuto del file',
            'pwd           - Mostra directory corrente',
            'talk <testo>  - Parla con ECHO',
            'ask <testo>   - Fai una domanda a ECHO',
            'progress      - Mostra i tuoi progressi',
            this.state.phase === 'puzzle' ? 'decrypt       - Avvia puzzle di decriptazione' : null,
            this.state.phase === 'puzzle' ? 'solve <risp>  - Risolvi puzzle attivo' : null,
            this.state.phase === 'puzzle' ? 'hint          - Ottieni un suggerimento' : null,
            this.state.phase === 'exploration' || this.state.phase === 'complete' ? 'continue      - Continua al prossimo blocco' : null,
        ].filter(Boolean);
    },

    cleanup() {
        // Cleanup quando si esce dal blocco
        console.log('[BLOCK 01] Cleanup');
    }
};
