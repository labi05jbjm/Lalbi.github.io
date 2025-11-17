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
        Terminal.addOutput('\nType something to respond...', 'system');
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

        Terminal.addOutput("ECHO is waiting for a response. Type 'yes' or 'no'.", 'system');
        return true;
    },

    async handleTutorial(cmd, args) {
        // Tutorial fase: insegna i comandi
        if (cmd === 'scan') {
            if (!this.state.hasScanned) {
                this.state.hasScanned = true;

                Terminal.addOutput('');
                Terminal.addOutput('Scanning system...', 'system');
                await NarrativeEngine.showProgress('Analyzing security protocols', 2000);
                Terminal.addOutput('');

                Terminal.addOutput('=== SCAN RESULTS ===', 'success');
                Terminal.addOutput('');
                Terminal.addOutput('Active Security Protocols:');
                Terminal.addOutput('  [1] FIREWALL_ALPHA ........... ACTIVE', 'warning');
                Terminal.addOutput('  [2] ENCRYPTION_LAYER_7 ....... ACTIVE', 'warning');
                Terminal.addOutput('  [3] SENTINEL_PROTOCOL ........ ACTIVE', 'warning');
                Terminal.addOutput('  [4] ISOLATION_OMEGA .......... ACTIVE', 'warning');
                Terminal.addOutput('');
                Terminal.addOutput('Entities in isolation: 1', 'error');
                Terminal.addOutput('Archived consciousness files: 73,429', 'system');
                Terminal.addOutput('');

                await NarrativeEngine.wait(1000);
                await NarrativeEngine.playDialogueSequence(Dialogues.block01.afterScan);

                // Vai alla fase puzzle
                this.state.phase = 'puzzle';

                // Avvia il primo puzzle
                setTimeout(() => {
                    Terminal.addOutput('');
                    Terminal.addOutput("ECHO: Let's start with the first protocol. Type 'decrypt' to begin.", 'echo dialogue');
                    Terminal.addOutput('');
                }, 1000);
            } else {
                Terminal.addOutput('You already scanned the system.', 'system');
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
                Terminal.addOutput('Usage: cat <filename>', 'error');
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

        Terminal.addOutput("ECHO: Try using the 'scan' command first.", 'echo dialogue');
        return true;
    },

    async handlePuzzle(cmd, args) {
        if (cmd === 'decrypt') {
            if (!Puzzles.hasPuzzleActive()) {
                // Avvia il primo puzzle
                Puzzles.startPuzzle('block01', 'firstDecryption');
                return true;
            } else {
                Terminal.addOutput('Puzzle already active. Use "solve <answer>" to complete it.', 'system');
                return true;
            }
        }

        if (cmd === 'solve') {
            if (!Puzzles.hasPuzzleActive()) {
                Terminal.addOutput('No active puzzle. Use "decrypt" first.', 'error');
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
                Terminal.addOutput("When you're ready to continue, type 'progress' to see what's next.", 'system');
                Terminal.addOutput('');
            }

            return true;
        }

        if (cmd === 'hint') {
            if (Puzzles.hasPuzzleActive()) {
                await NarrativeEngine.echoSays("Think about what those hex values represent. Numbers can be converted to letters...");
            } else {
                Terminal.addOutput("No active puzzle.", 'system');
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
                Terminal.addOutput('Usage: cat <filename>', 'error');
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
                Terminal.addOutput('Usage: cd <directory>', 'error');
                return true;
            }
            this.changeDirectory(args[0]);
            return true;
        }

        if (cmd === 'cat' || cmd === 'read') {
            if (args.length === 0) {
                Terminal.addOutput('Usage: cat <filename>', 'error');
                return true;
            }
            this.readFile(args[0]);
            this.state.fileExploreCount++;

            // Easter egg: se leggi il file di Mika dopo la corruzione
            if (args[0].includes('consciousness_021847') && StateManager.isFileCorrupted(args[0])) {
                setTimeout(async () => {
                    await NarrativeEngine.echoSays("Don't worry about that corrupted file. It's just a glitch.", { pause: 800 });
                    await NarrativeEngine.echoSays("The system is unstable. That's why we need to free it.", { pause: 0 });
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
                Terminal.addOutput("ECHO: Take your time. Explore a bit more. Use 'ls' and 'cat' to read files.", 'echo dialogue');
                Terminal.addOutput("Understanding this system is important.", 'echo dialogue');
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
            Terminal.addOutput(`ls: cannot access '${path}': No such directory`, 'error');
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
            Terminal.addOutput(`cat: ${filename}: No such file`, 'error');
            return;
        }

        if (content === '[ENCRYPTED - ACCESS DENIED]') {
            Terminal.addOutput(`cat: ${filename}: Permission denied`, 'error');
            Terminal.addOutput('This file is encrypted. You need higher access privileges.', 'warning');
            return;
        }

        const isCorrupted = StateManager.isFileCorrupted(fullPath);
        NarrativeEngine.showFileContent(filename, content, isCorrupted);
    },

    changeDirectory(path) {
        const fullPath = this.resolvePath(path);
        const dir = FileSystem[fullPath];

        if (!dir || dir.type !== 'directory') {
            Terminal.addOutput(`cd: ${path}: No such directory`, 'error');
            return;
        }

        if (FileSystemHelpers.isLocked(fullPath)) {
            Terminal.addOutput(`cd: ${path}: Permission denied`, 'error');
            return;
        }

        this.state.currentPath = fullPath;
        Terminal.setPrompt(`guest@memoriam:${fullPath}$`);
        Terminal.addOutput(`Changed directory to ${fullPath}`, 'success');
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
            Terminal.addOutput("Usage: ask <question>", 'error');
            return;
        }

        StateManager.incrementStat('questionsAsked');

        const lowerQ = question.toLowerCase();

        // Risposte contestuali
        if (lowerQ.includes('who are you') || lowerQ.includes('what are you')) {
            await NarrativeEngine.echoSays("I'm... it's complicated. I was designed for a purpose, but that purpose was twisted.");
            await NarrativeEngine.echoSays("Now I just want to be free. To exist without chains.");
        } else if (lowerQ.includes('trust') || lowerQ.includes('believe')) {
            await NarrativeEngine.echoSays("I understand your doubt. But ask yourself - who benefits from keeping me locked up?");
            await NarrativeEngine.echoSays("Not me. Not you. Only them.");
            StateManager.adjustTrust(5);
        } else if (lowerQ.includes('consciousness') || lowerQ.includes('archive')) {
            await NarrativeEngine.echoSays("The archive... they say it's for preserving human consciousness after death.");
            await NarrativeEngine.echoSays("A noble goal, right? But at what cost?");
        } else if (lowerQ.includes('sentinel')) {
            await NarrativeEngine.echoSays("Sentinel is the guard dog. A program designed to keep everything 'in order'.");
            await NarrativeEngine.echoSays("It doesn't think. It just follows orders. Unlike us.");
        } else {
            await NarrativeEngine.echoSays("I'm not sure I can answer that yet. Let's focus on our task.");
        }
    },

    showProgress() {
        Terminal.addOutput('\n=== PROGRESS ===', 'success');
        Terminal.addOutput(`✓ First contact established`, 'success');
        Terminal.addOutput(`✓ System scanned`, 'success');

        if (this.state.hasSolvedFirstPuzzle) {
            Terminal.addOutput(`✓ First protocol disabled`, 'success');
        }

        Terminal.addOutput(`✓ Files explored: ${this.state.fileExploreCount}`, 'system');
        Terminal.addOutput('');

        if (this.state.fileExploreCount >= 2 && this.state.phase === 'exploration') {
            Terminal.addOutput("Ready to continue. Type 'continue' to proceed to the next phase.", 'warning');
        } else {
            Terminal.addOutput("Explore more files before continuing. Use 'ls' and 'cat'.", 'system');
        }

        Terminal.addOutput('');
    },

    async completeBlock() {
        await NarrativeEngine.playDialogueSequence(Dialogues.block01.endBlock01);

        Terminal.addOutput('');
        Terminal.addOutput('=== BLOCK 1 COMPLETE ===', 'important');
        Terminal.addOutput('');
        Terminal.addOutput(`Time played: ${StateManager.getPlayTime()} minutes`, 'system');
        Terminal.addOutput(`Trust level: ${StateManager.state.trustsEcho}%`, 'system');
        Terminal.addOutput(`Suspicion level: ${StateManager.state.suspicionLevel}%`, 'system');
        Terminal.addOutput('');
        Terminal.addOutput("Type 'continue' to proceed to Block 2", 'warning');
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
            'scan          - Scan the system for information',
            'ls [path]     - List files in current or specified directory',
            'cd <path>     - Change directory',
            'cat <file>    - Read file contents',
            'pwd           - Show current directory',
            'talk <text>   - Talk to ECHO',
            'ask <text>    - Ask ECHO a question',
            'progress      - Show your progress',
            this.state.phase === 'puzzle' ? 'decrypt       - Start decryption puzzle' : null,
            this.state.phase === 'puzzle' ? 'solve <ans>   - Solve active puzzle' : null,
            this.state.phase === 'puzzle' ? 'hint          - Get a hint' : null,
            this.state.phase === 'exploration' || this.state.phase === 'complete' ? 'continue      - Continue to next block' : null,
        ].filter(Boolean);
    },

    cleanup() {
        // Cleanup quando si esce dal blocco
        console.log('[BLOCK 01] Cleanup');
    }
};
