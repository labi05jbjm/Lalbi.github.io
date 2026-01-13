/**
 * BLOCK 8 - AFTERMATH (Multiple Endings)
 * 210-240 minuti di gioco
 *
 * Finali multipli basati su scelte di Block 6 e Block 7
 * - DESTRUCTION: Sistema completamente distrutto
 * - SALVATION: Sistema riparato, coscienze salvate
 * - SACRIFICE: Protagonista diventa il core del sistema
 * - ASCENSION: Frammenti si uniscono, Viktor rinasce
 * - OBLIVION: Protagonista svanisce, accettazione finale
 */

const Block08_Aftermath = {
    state: {
        ending: null, // destruction, salvation, sacrifice, ascension, oblivion
        block06Choice: null,
        block07Identity: null,

        // TUTTI I 12 PUZZLE OBBLIGATORI PER FINALE (100% completion required)
        puzzlesSolved: {
            finalSystemAnalysis: false,
            consequenceMapping: false,
            victimLegacyVerification: false,
            fragmentFinalUnification: false,
            viktorFinalJudgment: false,
            systemRebuildCalculation: false,
            consciousnessTransferFinal: false,
            ethicalResolutionPuzzle: false,
            endingVerification: false,
            transcendenceGatePrep: false,
            finalChoiceConfirmation: false,
            aftermathAnalysis: false
        }
    },

    init() {
        console.log('[BLOCK 08] AFTERMATH - Initializing...');
        StateManager.setBlock(8);

        // Recupera le scelte precedenti
        this.state.block06Choice = StateManager.getFlag('block06Choice');
        this.state.block07Identity = StateManager.getFlag('block07Identity');

        // Determina il finale basato sulle scelte
        this.determineEnding();

        setTimeout(() => {
            this.startBlock();
        }, 2000);
    },

    // Helper functions per puzzle tracking - FINALE
    markPuzzleAsSolved(puzzleId) {
        if (this.state.puzzlesSolved.hasOwnProperty(puzzleId)) {
            if (!this.state.puzzlesSolved[puzzleId]) {
                this.state.puzzlesSolved[puzzleId] = true;
                Terminal.addOutput(`\n[✓] PUZZLE FINALE COMPLETATO: ${puzzleId}`, 'important');
                this.checkProgress();
            }
        }
    },

    checkProgress() {
        const solved = Object.values(this.state.puzzlesSolved).filter(v => v).length;
        const total = Object.keys(this.state.puzzlesSolved).length;

        Terminal.addOutput(`[PROGRESSO FINALE] ${solved}/${total} puzzle completati`, 'info');

        if (this.allPuzzlesSolved()) {
            Terminal.addOutput('[✓] TUTTI I PUZZLE FINALI COMPLETATI! Il finale è vicino...', 'success');
        }
    },

    allPuzzlesSolved() {
        return Object.values(this.state.puzzlesSolved).every(solved => solved);
    },

    showProgress() {
        Terminal.addOutput('');
        Terminal.addOutput('=== PROGRESSO BLOCCO 8: AFTERMATH (FINALE) ===', 'important');
        Terminal.addOutput('');

        const puzzles = [
            { id: 'finalSystemAnalysis', name: 'Analisi Sistema Finale' },
            { id: 'consequenceMapping', name: 'Mappatura Conseguenze' },
            { id: 'victimLegacyVerification', name: 'Verifica Eredità Vittime' },
            { id: 'fragmentFinalUnification', name: 'Unificazione Finale Frammenti' },
            { id: 'viktorFinalJudgment', name: 'Giudizio Finale di Viktor' },
            { id: 'systemRebuildCalculation', name: 'Calcolo Ricostruzione Sistema' },
            { id: 'consciousnessTransferFinal', name: 'Trasferimento Coscienza Finale' },
            { id: 'ethicalResolutionPuzzle', name: 'Risoluzione Etica Finale' },
            { id: 'endingVerification', name: 'Verifica Finale' },
            { id: 'transcendenceGatePrep', name: 'Preparazione Porta Trascendenza' },
            { id: 'finalChoiceConfirmation', name: 'Conferma Scelta Finale' },
            { id: 'aftermathAnalysis', name: 'Analisi Aftermath' }
        ];

        puzzles.forEach(puzzle => {
            const status = this.state.puzzlesSolved[puzzle.id] ? '[✓]' : '[ ]';
            Terminal.addOutput(`${status} ${puzzle.name}`, this.state.puzzlesSolved[puzzle.id] ? 'success' : 'warning');
        });

        Terminal.addOutput('');
        const solved = Object.values(this.state.puzzlesSolved).filter(v => v).length;
        const total = Object.keys(this.state.puzzlesSolved).length;
        Terminal.addOutput(`Totale: ${solved}/${total} puzzle finali completati`, 'info');

        if (this.allPuzzlesSolved()) {
            Terminal.addOutput('');
            Terminal.addOutput('[✓] TUTTI I PUZZLE FINALI COMPLETATI!', 'success');
            Terminal.addOutput("Il finale ti attende...", 'success');
        } else {
            Terminal.addOutput('');
            Terminal.addOutput('[!] Devi completare TUTTI i puzzle per vedere il finale', 'warning');
        }
        Terminal.addOutput('');
    },

    determineEnding() {
        // Logica per determinare il finale
        // Prima priorità: scelta di Block 6
        const block06 = this.state.block06Choice;

        if (block06 === 'complete_destruction') {
            this.state.ending = 'destruction';
        } else if (block06 === 'attempt_salvation') {
            this.state.ending = 'salvation';
        } else if (block06 === 'sacrifice_self') {
            this.state.ending = 'sacrifice';
        } else if (block06 === 'merge_fragments') {
            this.state.ending = 'ascension';
        } else {
            // Fallback: usa identità di Block 7
            const identity = this.state.block07Identity;
            if (identity === 'nothing') {
                this.state.ending = 'oblivion';
            } else if (identity === 'viktor') {
                this.state.ending = 'ascension';
            } else if (identity === 'guardian') {
                this.state.ending = 'salvation';
            } else {
                this.state.ending = 'sacrifice'; // hybrid
            }
        }

        console.log(`[BLOCK 08] Ending determined: ${this.state.ending}`);
        StateManager.setFlag('ending', this.state.ending);
    },

    async startBlock() {
        Terminal.disableInput();

        Terminal.addOutput('\n');
        Terminal.addOutput('╔══════════════════════════════════════════════╗', 'important');
        Terminal.addOutput('║          BLOCK 8: AFTERMATH                ║', 'important');
        Terminal.addOutput('╚══════════════════════════════════════════════╝', 'important');
        Terminal.addOutput('');

        await NarrativeEngine.wait(2000);

        // Opening sequence
        await NarrativeEngine.playDialogueSequence(Dialogues.block08.opening);

        await NarrativeEngine.wait(2000);

        // Show appropriate ending
        await this.showEnding();
    },

    async showEnding() {
        Terminal.addOutput('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'important');
        Terminal.addOutput('              YOUR ENDING', 'important');
        Terminal.addOutput('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', 'important');

        await NarrativeEngine.wait(1500);

        // Trigger glitch effect
        NarrativeEngine.triggerGlitch(800);
        await NarrativeEngine.wait(1000);

        // Play ending-specific dialogue
        switch (this.state.ending) {
            case 'destruction':
                await this.playDestructionEnding();
                break;
            case 'salvation':
                await this.playSalvationEnding();
                break;
            case 'sacrifice':
                await this.playSacrificeEnding();
                break;
            case 'ascension':
                await this.playAscensionEnding();
                break;
            case 'oblivion':
                await this.playOblivionEnding();
                break;
            default:
                await this.playSalvationEnding(); // default fallback
        }

        await NarrativeEngine.wait(3000);

        // Show epilogue
        await this.showEpilogue();

        // Show credits
        await this.showCredits();

        // Game complete
        await this.gameComplete();
    },

    async playDestructionEnding() {
        await NarrativeEngine.playDialogueSequence(Dialogues.block08.endingDestruction);
    },

    async playSalvationEnding() {
        await NarrativeEngine.playDialogueSequence(Dialogues.block08.endingSalvation);
    },

    async playSacrificeEnding() {
        await NarrativeEngine.playDialogueSequence(Dialogues.block08.endingSacrifice);
    },

    async playAscensionEnding() {
        await NarrativeEngine.playDialogueSequence(Dialogues.block08.endingAscension);
    },

    async playOblivionEnding() {
        await NarrativeEngine.playDialogueSequence(Dialogues.block08.endingOblivion);
    },

    async showEpilogue() {
        Terminal.addOutput('\n\n');
        Terminal.addOutput('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'success');
        Terminal.addOutput('                 EPILOGUE', 'success');
        Terminal.addOutput('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', 'success');

        await NarrativeEngine.wait(1500);

        const epilogueText = Dialogues.block08.epilogue[this.state.ending];
        const lines = epilogueText.split('\n');

        for (const line of lines) {
            Terminal.addOutput(line, 'important');
            await NarrativeEngine.wait(400);
        }

        await NarrativeEngine.wait(2000);
    },

    async showCredits() {
        Terminal.addOutput('\n\n\n');

        await NarrativeEngine.wait(1000);

        for (const line of Dialogues.block08.credits) {
            Terminal.addOutput(line, 'success');
            await NarrativeEngine.wait(300);
        }

        await NarrativeEngine.wait(2000);
    },

    async gameComplete() {
        Terminal.addOutput('\n\n');
        Terminal.addOutput('╔══════════════════════════════════════════════╗', 'important');
        Terminal.addOutput('║           GAME COMPLETE                    ║', 'important');
        Terminal.addOutput('╚══════════════════════════════════════════════╝', 'important');
        Terminal.addOutput('');

        // Final stats
        const playtime = StateManager.getPlayTime();
        const suspicion = StateManager.state.suspicionLevel;
        const trust = StateManager.state.trustsEcho;

        Terminal.addOutput(`Total Playtime: ${playtime} minutes`, 'system');
        Terminal.addOutput(`Final Suspicion: ${suspicion}`, 'system');
        Terminal.addOutput(`Final Trust in ECHO: ${trust}`, 'system');
        Terminal.addOutput(`Ending: ${this.state.ending.toUpperCase()}`, 'important');
        Terminal.addOutput('');

        Terminal.addOutput('Block 6 Choice: ' + (this.state.block06Choice || 'none'), 'system');
        Terminal.addOutput('Block 7 Identity: ' + (this.state.block07Identity || 'none'), 'system');
        Terminal.addOutput('');

        Terminal.addOutput('Thank you for playing THE TERMINAL.', 'success');
        Terminal.addOutput('Your choices shaped this unique story.', 'success');
        Terminal.addOutput('');

        // Save final state
        StateManager.setFlag('gameComplete', true);
        StateManager.setFlag('completionTime', new Date().toISOString());
        StateManager.saveState();

        Terminal.addOutput('Progress saved.', 'system');
        Terminal.addOutput('');
        Terminal.addOutput('You may close the game or type "restart" to play again.', 'warning');
        Terminal.addOutput('');

        Terminal.enableInput();
    },

    async handleCommand(cmd, args) {
        const lowerCmd = cmd.toLowerCase();

        if (lowerCmd === 'restart' || lowerCmd === 'new game') {
            Terminal.addOutput('\nRestarting game...', 'warning');
            Terminal.addOutput('Clearing save data...', 'system');

            // Clear save and reload
            StateManager.clearState();

            Terminal.addOutput('Please refresh the page to start a new game.', 'important');
            return true;
        }

        if (lowerCmd === 'stats' || lowerCmd === 'status') {
            Terminal.addOutput('\n=== FINAL STATS ===', 'success');
            Terminal.addOutput(`Ending: ${this.state.ending}`, 'important');
            Terminal.addOutput(`Playtime: ${StateManager.getPlayTime()} minutes`, 'system');
            Terminal.addOutput(`Suspicion: ${StateManager.state.suspicionLevel}`, 'system');
            Terminal.addOutput(`Trust: ${StateManager.state.trustsEcho}`, 'system');
            Terminal.addOutput('');
            return true;
        }

        // Final reflection puzzles - heartbreaking goodbyes
        if (lowerCmd === 'total_lives' && args.length > 0) {
            const answer = args.join(' ');
            const puzzle = Puzzles.block08.totalLivesDestroyed;

            if (puzzle.verify(answer)) {
                Terminal.addOutput('\n');
                puzzle.onComplete(answer);
                return true;
            } else {
                Terminal.addOutput('Close, but not quite. Check /final/core_status.log for the exact count.', 'error');
                return true;
            }
        }

        if (lowerCmd === 'final_choice' && args.length > 0) {
            const answer = args.join(' ');
            const puzzle = Puzzles.block08.finalChoiceWeight;

            if (puzzle.verify(answer)) {
                Terminal.addOutput('\n');
                puzzle.onComplete(answer);
                return true;
            } else {
                Terminal.addOutput('That doesn\'t match your Block 6 choice. Check /final/ending_paths.txt', 'error');
                return true;
            }
        }

        if (lowerCmd === 'what_remains' && args.length > 0) {
            const answer = args.join(' ');
            const puzzle = Puzzles.block08.whatRemains;

            if (puzzle.verify(answer)) {
                Terminal.addOutput('\n');
                puzzle.onComplete(answer);
                return true;
            } else {
                Terminal.addOutput('Your answer is too brief. Reflect deeply (at least 5 characters).', 'error');
                return true;
            }
        }

        if (lowerCmd === 'goodbye' || lowerCmd === 'addio' || lowerCmd === 'farewell') {
            const answer = args.length > 0 ? 'goodbye ' + args.join(' ') : 'goodbye everyone';
            const puzzle = Puzzles.block08.theGoodbye;

            if (puzzle.verify(answer)) {
                Terminal.addOutput('\n');
                puzzle.onComplete(answer);
                return true;
            }
        }

        Terminal.addOutput('Gioco completato. Scrivi "restart" per rigiocare, "stats" per statistiche, o "goodbye" per l\'addio finale.', 'system');
        return true;
    },

    getCommands() {
        return ['help', 'restart', 'stats', 'status', 'total_lives', 'final_choice', 'what_remains', 'goodbye', 'addio', 'farewell'];
    },

    getHelp() {
        return [
            'restart / new game  - Start a new playthrough',
            'stats / status      - View final statistics',
            'total_lives <num>   - Puzzle: count total lives destroyed',
            'final_choice <answer> - Puzzle: reflect on your final choice weight',
            'what_remains <answer> - Puzzle: answer what remains after everything',
            'goodbye <message>   - Say your final goodbyes (to echo, viktor, fragments, or yourself)',
            'addio / farewell    - Alternative farewell commands'
        ];
    },

    // File system navigation methods
    listFiles(path) {
        const fullPath = this.resolvePath(path || this.state.currentPath);
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
    }
};
