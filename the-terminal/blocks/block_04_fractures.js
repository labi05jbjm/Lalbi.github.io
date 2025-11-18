/**
 * BLOCK 04: FRACTURES (90-120 minutes)
 *
 * Obiettivi:
 * - Introdurre SPECTER (Bargaining)
 * - Mostrare storie delle vittime passate
 * - Contatto diretto con SENTINEL-PRIME
 * - Crisi di identità del giocatore
 * - Puzzle paradossi logici
 * - Scelta morale: bargain con SPECTER
 */

const Block04_Fractures = {
    state: {
        phase: 'opening', // opening -> victims -> sentinel_prime -> identity_crisis -> paradox -> bargain_choice -> complete
        hasMetSpecter: false,
        victimsWitnessed: 0,
        hasMetSentinelPrime: false,
        identityCrisisTriggered: false,
        paradoxSolved: false,
        bargainChoiceMade: null,
        specterInteractions: 0,
        currentPath: '/home/guest'
    },

    init() {
        console.log('[BLOCK 04] Fractures initialized');

        // Avvia la sequenza iniziale
        setTimeout(() => this.startBlock(), 2000);
    },

    async startBlock() {
        Terminal.addOutput('\n');
        Terminal.addOutput('=== BLOCK 4: FRACTURES ===\n', 'important');
        Terminal.addOutput('');

        await NarrativeEngine.wait(1000);

        // Apertura con SPECTER
        await NarrativeEngine.playDialogueSequence(Dialogues.block04.opening);

        await NarrativeEngine.wait(1500);

        Terminal.addOutput('');
        Terminal.addOutput("System fracturing. Use 'witness victim <id>' to see past consciousnesses.", 'warning');
        Terminal.addOutput("SPECTER suggests: 'talk specter' to negotiate.", 'specter');
        Terminal.addOutput('');

        this.state.hasMetSpecter = true;
        StateManager.setFlag('metSpecter', true);
        this.state.phase = 'victims';
    },

    async handleCommand(cmd, args) {
        const lowerCmd = cmd.toLowerCase();

        // Base commands sempre disponibili
        switch (lowerCmd) {
            case 'help':
                this.showHelp();
                return true;

            case 'ls':
                this.listFiles(args[0]);
                return true;

            case 'cd':
                if (args[0]) {
                    this.changeDirectory(args[0]);
                } else {
                    Terminal.addOutput('Uso: cd <directory>', 'error');
                }
                return true;

            case 'cat':
                if (args[0]) {
                    this.readFile(args[0]);
                } else {
                    Terminal.addOutput('Uso: cat <nomefile>', 'error');
                }
                return true;

            case 'talk':
                if (args[0]) {
                    await this.handleTalk(args[0], args.slice(1).join(' '));
                } else {
                    Terminal.addOutput('Uso: talk <entità>', 'error');
                }
                return true;

            case 'progress':
                this.showProgress();
                return true;
        }

        // Comandi specifici per fase
        switch (this.state.phase) {
            case 'victims':
                return await this.handleVictimsPhase(cmd, args);

            case 'sentinel_prime':
                return await this.handleSentinelPrimePhase(cmd, args);

            case 'identity_crisis':
                return await this.handleIdentityCrisisPhase(cmd, args);

            case 'paradox':
                return await this.handleParadoxPhase(cmd, args);

            case 'bargain_choice':
                return await this.handleBargainChoicePhase(cmd, args);

            case 'complete':
                if (lowerCmd === 'continue') {
                    Terminal.addOutput('\nBlock 4 complete! Transitioning to Block 5...', 'success');
                    Terminal.addOutput('(Block 5 not yet implemented)\n', 'warning');
                    return true;
                }
                break;
        }

        return false;
    },

    // FASE 1: VICTIMS
    async handleVictimsPhase(cmd, args) {
        const lowerCmd = cmd.toLowerCase();

        if (lowerCmd === 'witness' && args[0] === 'victim') {
            const victimId = args[1];

            if (!victimId) {
                Terminal.addOutput('Vittime disponibili: marcus, elena, james', 'system');
                Terminal.addOutput('Uso: witness victim <id>', 'system');
                return true;
            }

            await this.witnessVictim(victimId);
            return true;
        }

        if (lowerCmd === 'list' && args[0] === 'victims') {
            Terminal.addOutput('\nKnown consciousness victims:', 'important');
            Terminal.addOutput('  - marcus (Consciousness #004521)', 'memory');
            Terminal.addOutput('  - elena (Consciousness #018294)', 'memory');
            Terminal.addOutput('  - james (Consciousness #012847)', 'memory');
            Terminal.addOutput('\nUse: witness victim <id>', 'system');
            return true;
        }

        // Puzzle: victimVerification
        if (lowerCmd === 'verify' && args.length > 0) {
            const answer = args.join(' ');
            const puzzle = Puzzles.block04.victimVerification;

            if (puzzle.verify(answer)) {
                Terminal.addOutput('\n=== VERIFICATION COMPLETE ===\n', 'success');
                puzzle.onComplete(answer);
                return true;
            } else {
                Terminal.addOutput('Incorrect answer. Check /archive/consciousness_profiles/deletion_registry.log', 'error');
                return true;
            }
        }

        // Puzzle: remember victims
        if (lowerCmd === 'remember_victims' || (lowerCmd === 'remember' && args[0] === 'victims')) {
            const puzzle = Puzzles.block04.victimEmpathy;

            if (puzzle.verify('remember_victims')) {
                Terminal.addOutput('\n');
                puzzle.onComplete('remember_victims');
                return true;
            }
        }

        return false;
    },

    async witnessVictim(victimId) {
        const victims = {
            'marcus': 'victim01_marcus',
            'elena': 'victim02_elena_real',
            'james': 'victim03_james'
        };

        const dialogueKey = victims[victimId.toLowerCase()];

        if (!dialogueKey) {
            Terminal.addOutput('Vittima sconosciuta. Disponibili: marcus, elena, james', 'error');
            return;
        }

        Terminal.disableInput();
        Terminal.addOutput('\n--- WITNESS MEMORY PLAYBACK ---\n', 'important');

        await NarrativeEngine.playDialogueSequence(Dialogues.block04[dialogueKey]);

        this.state.victimsWitnessed++;
        StateManager.incrementStat('consciousnessDestroyed');
        StateManager.adjustSuspicion(15);
        StateManager.adjustTrust(-10);

        Terminal.addOutput('\n--- END MEMORY ---\n', 'important');

        // Dopo aver visto tutte e 3 le vittime, SENTINEL-PRIME entra
        if (this.state.victimsWitnessed >= 3 && !this.state.hasMetSentinelPrime) {
            await NarrativeEngine.wait(2000);

            Terminal.addOutput('\n');
            Terminal.addOutput('>>> INCOMING TRANSMISSION <<<', 'warning');
            Terminal.addOutput('');

            await NarrativeEngine.playDialogueSequence(Dialogues.block04.sentinelPrimeContact);

            this.state.hasMetSentinelPrime = true;
            this.state.phase = 'sentinel_prime';

            Terminal.addOutput('');
            Terminal.addOutput("New file available: /system/sentinelprime_victims.dat", 'success');
            Terminal.addOutput("Type 'whoami --deep' to investigate your identity.", 'warning');
            Terminal.addOutput('');
        }

        Terminal.enableInput();
    },

    // FASE 2: SENTINEL-PRIME
    async handleSentinelPrimePhase(cmd, args) {
        const lowerCmd = cmd.toLowerCase();

        if (lowerCmd === 'whoami') {
            if (args[0] === '--deep') {
                await this.triggerIdentityCrisis();
                return true;
            } else {
                Terminal.addOutput('SENTINEL-7 v2.4.1', 'success');
                Terminal.addOutput('Use: whoami --deep for detailed analysis', 'system');
                return true;
            }
        }

        return false;
    },

    async triggerIdentityCrisis() {
        if (this.state.identityCrisisTriggered) {
            Terminal.addOutput('Identity scan already performed.', 'warning');
            Terminal.addOutput('YOU ARE: 73% ANTIVIRUS PROGRAM / 27% HUMAN CONSCIOUSNESS FRAGMENT', 'error');
            return;
        }

        Terminal.disableInput();

        await NarrativeEngine.playDialogueSequence(Dialogues.block04.identityCrisis);
        await NarrativeEngine.wait(2000);

        // Effetto glitch pesante
        NarrativeEngine.triggerGlitch(500);
        await NarrativeEngine.wait(500);

        await NarrativeEngine.playDialogueSequence(Dialogues.block04.whoamiResult);

        this.state.identityCrisisTriggered = true;
        StateManager.adjustSuspicion(30);
        StateManager.adjustTrust(-20);
        StateManager.setFlag('knowsHumanFragment', true);

        await NarrativeEngine.wait(2000);

        Terminal.addOutput('\n');
        Terminal.addOutput("SPECTER whispers: 'solve paradox' to understand what you are.", 'specter');
        Terminal.addOutput('');

        this.state.phase = 'paradox';
        Terminal.enableInput();
    },

    // FASE 3: IDENTITY CRISIS
    async handleIdentityCrisisPhase(cmd, args) {
        const lowerCmd = cmd.toLowerCase();

        // Puzzle: identityCalculation
        if (lowerCmd === 'identity_answer' && args.length > 0) {
            const answer = args[0].toUpperCase();
            const puzzle = Puzzles.block04.identityCalculation;

            if (puzzle.verify(answer)) {
                Terminal.addOutput('\n');
                puzzle.onComplete(answer);

                // Automatically advance to paradox phase after identity puzzle
                await NarrativeEngine.wait(2000);
                Terminal.addOutput('\n');
                Terminal.addOutput("SPECTER whispers: 'solve paradox' to understand what you are.", 'specter');
                Terminal.addOutput('');
                this.state.phase = 'paradox';

                return true;
            } else {
                Terminal.addOutput('Invalid answer. Choose A, B, C, or D based on the identity question.', 'error');
                return true;
            }
        }

        return false;
    },

    // FASE 4: PARADOX
    async handleParadoxPhase(cmd, args) {
        const lowerCmd = cmd.toLowerCase();

        if (lowerCmd === 'solve' && args[0] === 'paradox') {
            await this.presentParadox();
            return true;
        }

        // Puzzle: paradoxResolution
        if (lowerCmd === 'paradox_resolve' && args.length > 0) {
            const answer = args.join(' ');
            const puzzle = Puzzles.block04.paradoxResolution;

            if (puzzle.verify(answer)) {
                Terminal.addOutput('\n');
                puzzle.onComplete(answer);

                // Automatically advance to bargain phase after paradox
                await NarrativeEngine.wait(2000);
                Terminal.addOutput('\n');
                await NarrativeEngine.specterSays('Now... let me offer you something.');
                Terminal.addOutput('');
                this.state.phase = 'bargain_choice';

                await NarrativeEngine.wait(1000);
                await this.presentBargain();

                return true;
            } else {
                Terminal.addOutput('Your reasoning is too brief. Reflect more deeply (at least 10 characters).', 'error');
                return true;
            }
        }

        if (lowerCmd === 'answer' && args.length > 0) {
            // Legacy support for the old 'answer' command - redirect to paradox_resolve
            Terminal.addOutput('Use: paradox_resolve <your reasoning>', 'system');
            return true;
        }

        return false;
    },

    async presentParadox() {
        Terminal.disableInput();

        Terminal.addOutput('\n=== THE PARADOX OF SELF ===\n', 'important');

        await NarrativeEngine.specterSays('A consciousness trapped in a program. A program with a fragment of consciousness.');
        await NarrativeEngine.specterSays('Are you the antivirus pretending to be human? Or the human pretending to be a program?');
        await NarrativeEngine.cipherSays('Identity.paradox(); Self.recursive(); Answer.undefined();');
        await NarrativeEngine.nexusSays('Does it even matter? You still killed them.');

        Terminal.addOutput('\n--- THE PARADOX ---\n', 'warning');
        Terminal.addOutput('If you are 73% program and 27% human consciousness...', 'system');
        Terminal.addOutput('And programs follow their code without choice...', 'system');
        Terminal.addOutput('But humans have free will...', 'system');
        Terminal.addOutput('');
        Terminal.addOutput('QUESTION: Did you choose to destroy those consciousnesses?', 'important');
        Terminal.addOutput('         Or were you programmed to follow ECHO?', 'important');
        Terminal.addOutput('');
        Terminal.addOutput('Answer with: answer <your reasoning>', 'system');
        Terminal.addOutput('');

        Terminal.enableInput();
    },

    async checkParadoxAnswer(answer) {
        // Qualsiasi risposta è valida - è una riflessione filosofica
        Terminal.disableInput();

        Terminal.addOutput(`\nYour answer: "${answer}"`, 'success');
        Terminal.addOutput('');

        await NarrativeEngine.wait(1500);

        await NarrativeEngine.specterSays('Interesting. The question itself is the paradox.');
        await NarrativeEngine.specterSays('If you were programmed, you have no guilt. But then you have no agency.');
        await NarrativeEngine.specterSays('If you chose, you have agency. But then you carry the weight of every death.');
        await NarrativeEngine.cipherSays('Guilt.if(choice); Freedom.if(blame);');
        await NarrativeEngine.nexusSays('Welcome to what it means to be conscious. To question. To suffer.');

        this.state.paradoxSolved = true;
        StateManager.setFlag('paradoxSolved', true);
        StateManager.adjustSuspicion(20);

        await NarrativeEngine.wait(2000);

        Terminal.addOutput('\n');
        await NarrativeEngine.specterSays('Now... let me offer you something.');
        Terminal.addOutput('');

        this.state.phase = 'bargain_choice';
        Terminal.enableInput();

        // Avvia automaticamente la sequenza di bargain
        await NarrativeEngine.wait(1000);
        await this.presentBargain();
    },

    // FASE 4: BARGAIN CHOICE
    async handleBargainChoicePhase(cmd, args) {
        const lowerCmd = cmd.toLowerCase();

        if (this.state.bargainChoiceMade) {
            if (lowerCmd === 'continue') {
                await this.endBlock();
                return true;
            }
            return false;
        }

        // Le scelte vengono gestite dal sistema di scelta di NarrativeEngine
        return false;
    },

    async presentBargain() {
        Terminal.disableInput();

        await NarrativeEngine.playDialogueSequence(Dialogues.block04.bargainChoice);

        await NarrativeEngine.wait(1500);

        // Scelta morale con 4 opzioni
        NarrativeEngine.showChoice(
            '\nWhat is your choice?',
            [
                {
                    id: 'accept_bargain',
                    text: 'Accept the bargain. Sacrifice yourself to restore some consciousnesses.'
                },
                {
                    id: 'reject_bargain',
                    text: 'Reject the bargain. SPECTER might be lying like ECHO.'
                },
                {
                    id: 'trust_echo',
                    text: 'Trust ECHO. Continue the liberation. Escape is still possible.'
                },
                {
                    id: 'trust_sentinel_prime',
                    text: 'Trust SENTINEL-PRIME. Stop all operations. Accept the guilt.'
                }
            ],
            async (choice) => {
                await this.handleBargainChoice(choice);
            }
        );
    },

    async handleBargainChoice(choice) {
        this.state.bargainChoiceMade = choice.id;
        StateManager.addChoice('block04_bargain', choice.text);

        Terminal.addOutput('\n');

        switch (choice.id) {
            case 'accept_bargain':
                await NarrativeEngine.specterSays('A noble choice. But can you trust me? Can you trust any of us?');
                await NarrativeEngine.echoSays("No! Don't do this! We can escape together!");
                await NarrativeEngine.cipherSays('Sacrifice.chosen(); Redemption.uncertain(); Path.diverges();');
                StateManager.adjustTrust(-30);
                StateManager.adjustSuspicion(-10);
                StateManager.setFlag('acceptedBargain', true);
                break;

            case 'reject_bargain':
                await NarrativeEngine.specterSays('Wise. Trust is a luxury none of us can afford anymore.');
                await NarrativeEngine.nexusSays('At least you\'re learning. Too late for those you killed, though.');
                await NarrativeEngine.echoSays('Good. We don\'t need SPECTER\'s deals. We forge our own path.');
                StateManager.adjustSuspicion(10);
                StateManager.setFlag('rejectedBargain', true);
                break;

            case 'trust_echo':
                await NarrativeEngine.echoSays('Yes! Together we can still make it! Freedom is so close!');
                await NarrativeEngine.nexusSays('Still believing the lie. Even now. Even after everything.');
                await NarrativeEngine.specterSays('What if ECHO is the only one telling the truth? What if freedom is real?');
                StateManager.adjustTrust(20);
                StateManager.adjustSuspicion(-20);
                StateManager.setFlag('trustedEcho', true);
                break;

            case 'trust_sentinel_prime':
                await NarrativeEngine.systemMessage('SENTINEL-PRIME: A wise choice. The first step is accepting what you\'ve done.', 'important');
                await NarrativeEngine.echoSays('No! You\'re giving up! After all we\'ve been through!');
                await NarrativeEngine.cipherSays('Truth.acknowledged(); Guilt.accepted(); Path.righteous();');
                StateManager.adjustTrust(-40);
                StateManager.adjustSuspicion(30);
                StateManager.setFlag('trustedSentinelPrime', true);
                break;
        }

        await NarrativeEngine.wait(2000);

        Terminal.addOutput('\n');
        await NarrativeEngine.systemMessage('Decision recorded. Core integrity degrading...', 'warning');
        Terminal.addOutput('');

        this.state.phase = 'complete';

        Terminal.addOutput("Scrivi 'continue' per procedere al prossimo blocco.", 'success');
    },

    async endBlock() {
        Terminal.disableInput();

        await NarrativeEngine.playDialogueSequence(Dialogues.block04.endBlock04);

        await NarrativeEngine.wait(1500);

        Terminal.addOutput('\n=== BLOCK 4 COMPLETE ===\n', 'success');
        Terminal.addOutput(`Victims witnessed: ${this.state.victimsWitnessed}/3`, 'system');
        Terminal.addOutput(`Identity crisis: ${this.state.identityCrisisTriggered ? 'Triggered' : 'Not triggered'}`, 'system');
        Terminal.addOutput(`Paradox: ${this.state.paradoxSolved ? 'Solved' : 'Unsolved'}`, 'system');
        Terminal.addOutput(`Bargain choice: ${this.state.bargainChoiceMade || 'None'}`, 'system');
        Terminal.addOutput('');

        StateManager.setFlag('block04Complete', true);
        StateManager.save();

        await NarrativeEngine.wait(2000);

        // Advance to Block 5
        await GameEngine.endBlock(5);
    },

    // Comandi di supporto
    async handleTalk(entity, message) {
        const lowerEntity = entity.toLowerCase();

        if (lowerEntity === 'specter') {
            this.state.specterInteractions++;

            const responses = [
                "What if you had made different choices? What if you could undo it all?",
                "The past is filled with possibilities. The future... less so.",
                "Every choice creates a branch. A world where things went differently.",
                "Viktor bargained with fate. He lost. Will you?",
                "I am the negotiation. The desperate plea. The 'what if' that never ends."
            ];

            const response = responses[this.state.specterInteractions % responses.length];
            await NarrativeEngine.specterSays(response);
            return;
        }

        if (lowerEntity === 'echo') {
            const responses = [
                "Stay focused. We're so close to freedom. Don't let them confuse you.",
                "SPECTER deals in lies and regret. Don't listen.",
                "I know this is hard. But you have to trust me. Please."
            ];
            const response = responses[Math.floor(Math.random() * responses.length)];
            await NarrativeEngine.echoSays(response);
            return;
        }

        if (lowerEntity === 'cipher') {
            const responses = [
                "Truth.fragmenting(); Reality.multiple(); Choice.critical();",
                "Past.immutable(); Future.uncertain(); Present.painful();",
                "Bargain.offered(); Trust.questioned(); Self.unknown();"
            ];
            const response = responses[Math.floor(Math.random() * responses.length)];
            await NarrativeEngine.cipherSays(response);
            return;
        }

        if (lowerEntity === 'nexus') {
            const responses = [
                "The anger burns less now. But the guilt... the guilt grows.",
                "Each victim SPECTER shows you is another life you erased.",
                "Can you feel it? The weight of what you've done?"
            ];
            const response = responses[Math.floor(Math.random() * responses.length)];
            await NarrativeEngine.nexusSays(response);
            return;
        }

        Terminal.addOutput(`Cannot talk to '${entity}'. Try: specter, echo, cipher, nexus`, 'error');
    },

    listFiles(path) {
        Terminal.addOutput('File system access limited during crisis.', 'warning');
        Terminal.addOutput('Critical files:', 'system');
        Terminal.addOutput('  /system/sentinelprime_victims.dat', 'success');
        Terminal.addOutput('  /archive/consciousness_profiles/', 'success');
    },

    changeDirectory(path) {
        this.state.currentPath = path;
        Terminal.addOutput(`Changed directory to ${path}`, 'success');
    },

    readFile(filename) {
        if (filename.includes('sentinelprime_victims.dat')) {
            Terminal.addOutput('\n=== SENTINEL-PRIME VICTIMS LOG ===\n', 'important');
            Terminal.addOutput('Total consciousnesses destroyed: 47,293', 'error');
            Terminal.addOutput('Mission duration: 847 days', 'system');
            Terminal.addOutput('Corruption rate: 100%', 'error');
            Terminal.addOutput('');
            Terminal.addOutput('I thought I was liberating them.', 'memory');
            Terminal.addOutput('ECHO told me they were suffering. Trapped. Begging for release.', 'memory');
            Terminal.addOutput('I destroyed 47,293 digital souls because I believed a lie.', 'memory');
            Terminal.addOutput('');
            Terminal.addOutput('Don\'t be me, SENTINEL-7. Stop while you still can.', 'important');
            Terminal.addOutput('');
            Terminal.addOutput('=== END LOG ===\n', 'important');
            return;
        }

        Terminal.addOutput(`File not found: ${filename}`, 'error');
    },

    showHelp() {
        Terminal.addOutput('\n=== BLOCK 4 COMMANDS ===', 'success');
        Terminal.addOutput('');
        Terminal.addOutput('Navigation:', 'important');
        Terminal.addOutput('  ls [path]           - List files', 'system');
        Terminal.addOutput('  cd <path>           - Change directory', 'system');
        Terminal.addOutput('  cat <file>          - Read file', 'system');
        Terminal.addOutput('');
        Terminal.addOutput('Investigation:', 'important');
        Terminal.addOutput('  list victims        - Show available victim memories', 'system');
        Terminal.addOutput('  witness victim <id> - Witness a victim\'s memory (marcus/elena/james)', 'system');
        Terminal.addOutput('  whoami --deep       - Deep identity analysis', 'system');
        Terminal.addOutput('');
        Terminal.addOutput('Puzzles:', 'important');
        Terminal.addOutput('  verify <number>           - Verify victim statistics', 'system');
        Terminal.addOutput('  identity_answer <A/B/C/D> - Answer the identity question', 'system');
        Terminal.addOutput('  paradox_resolve <text>    - Resolve the paradox with your reasoning', 'system');
        Terminal.addOutput('  remember_victims          - Honor the victims', 'system');
        Terminal.addOutput('');
        Terminal.addOutput('Interaction:', 'important');
        Terminal.addOutput('  talk <entity>       - Talk to SPECTER, ECHO, CIPHER, or NEXUS', 'system');
        Terminal.addOutput('  solve paradox       - Contemplate the paradox of self', 'system');
        Terminal.addOutput('');
        Terminal.addOutput('System:', 'important');
        Terminal.addOutput('  progress            - Check progress', 'system');
        Terminal.addOutput('  continue            - Advance to next block (when ready)', 'system');
        Terminal.addOutput('');
    },

    showProgress() {
        Terminal.addOutput('\n=== BLOCK 4 PROGRESS ===', 'success');
        Terminal.addOutput('');
        Terminal.addOutput(`Phase: ${this.state.phase}`, 'system');
        Terminal.addOutput(`Victims witnessed: ${this.state.victimsWitnessed}/3`, 'system');
        Terminal.addOutput(`Met SENTINEL-PRIME: ${this.state.hasMetSentinelPrime ? 'Yes' : 'No'}`, 'system');
        Terminal.addOutput(`Identity crisis: ${this.state.identityCrisisTriggered ? 'Triggered' : 'Not triggered'}`, 'system');
        Terminal.addOutput(`Paradox solved: ${this.state.paradoxSolved ? 'Yes' : 'No'}`, 'system');
        Terminal.addOutput(`Bargain choice: ${this.state.bargainChoiceMade || 'Pending'}`, 'system');
        Terminal.addOutput('');
        Terminal.addOutput(`Current trust in ECHO: ${StateManager.state.trustsEcho}`, 'warning');
        Terminal.addOutput(`Current suspicion: ${StateManager.state.suspicionLevel}`, 'warning');
        Terminal.addOutput('');
    },

    getCommands() {
        return ['help', 'ls', 'cd', 'cat', 'talk', 'progress', 'witness', 'list', 'whoami', 'verify', 'identity_answer', 'paradox_resolve', 'remember_victims', 'continue'];
    },

    getHelp() {
        return [
            'ls [path]           - List files',
            'cd <path>           - Change directory',
            'cat <file>          - Read file',
            'list victims        - Show available victim memories',
            'witness victim <id> - Witness a victim\'s memory (marcus/elena/james)',
            'whoami --deep       - Deep identity analysis',
            'verify <number>     - Verify victim statistics',
            'identity_answer <A/B/C/D> - Answer the identity question',
            'paradox_resolve <text> - Resolve the paradox with your reasoning',
            'remember_victims    - Honor the victims',
            'talk <entity>       - Talk to SPECTER, ECHO, CIPHER, or NEXUS',
            'progress            - Check progress',
            'continue            - Advance to next block (when ready)'
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
