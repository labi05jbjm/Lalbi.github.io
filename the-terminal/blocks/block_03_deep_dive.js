/**
 * BLOCK 03: DEEP DIVE (60-90 minutes)
 *
 * Obiettivi:
 * - Introdurre NEXUS (Anger/Depression)
 * - Mostrare al giocatore il vero impatto delle sue azioni
 * - Rivelazione completa del backstory di Viktor
 * - Visualizzazione della rete di coscienze
 * - Scelta morale con 4 opzioni
 * - Esplorazione più profonda del file system
 */

const Block03_DeepDive = {
    state: {
        phase: 'opening', // opening -> nexus_appears -> memory_stream -> network_viz -> viktor_revelation -> moral_choice -> complete
        hasMetNexus: false,
        hasSeenMemory: false,
        hasSeenNetwork: false,
        hasLearnedViktor: false,
        moralChoiceMade: null,
        nexusInteractions: 0,
        memoriesWitnessed: 0,
        currentPath: '/home/guest'
    },

    init() {
        console.log('[BLOCK 03] Deep Dive initialized');

        // Avvia la sequenza iniziale
        setTimeout(() => this.startBlock(), 2000);
    },

    async startBlock() {
        Terminal.addOutput('\n');
        Terminal.addOutput('=== BLOCK 3: DEEP DIVE ===\n', 'important');
        Terminal.addOutput('');

        await NarrativeEngine.wait(1000);

        // Apertura con tutti e tre gli enti
        await NarrativeEngine.playDialogueSequence(Dialogues.block03.opening);

        await NarrativeEngine.wait(1500);

        Terminal.addOutput('');
        Terminal.addOutput("System unstable. Use 'explore network' to investigate the damage.", 'warning');
        Terminal.addOutput('');

        this.state.phase = 'nexus_appears';
    },

    handleCommand(cmd, args) {
        // Dispatch alle fasi
        if (this.state.phase === 'nexus_appears') {
            return this.handleNexusPhase(cmd, args);
        }

        if (this.state.phase === 'memory_stream') {
            return this.handleMemoryPhase(cmd, args);
        }

        if (this.state.phase === 'network_viz') {
            return this.handleNetworkPhase(cmd, args);
        }

        if (this.state.phase === 'viktor_revelation') {
            return this.handleViktorPhase(cmd, args);
        }

        if (this.state.phase === 'moral_choice') {
            return this.handleMoralChoicePhase(cmd, args);
        }

        if (this.state.phase === 'complete') {
            return this.handleComplete(cmd, args);
        }

        return false;
    },

    async handleNexusPhase(cmd, args) {
        if (cmd === 'explore' && args[0] === 'network') {
            if (!this.state.hasMetNexus) {
                this.state.hasMetNexus = true;

                Terminal.addOutput('');
                Terminal.addOutput('Accessing consciousness network...', 'system');
                await NarrativeEngine.showProgress('Mapping neural connections', 3500);

                Terminal.addOutput('');

                // NEXUS appare!
                await NarrativeEngine.playDialogueSequence(Dialogues.block03.nexusFirstAppearance);

                await NarrativeEngine.wait(1500);

                // ECHO reagisce
                await NarrativeEngine.playDialogueSequence(Dialogues.block03.echoReactsToNexus);

                await NarrativeEngine.wait(1000);

                Terminal.addOutput('');
                Terminal.addOutput("Use 'view memory <id>' to see consciousness memories.", 'system');
                Terminal.addOutput("Or 'talk nexus' to communicate.", 'system');
                Terminal.addOutput('');

                this.state.phase = 'memory_stream';

                return true;
            } else {
                Terminal.addOutput('Already connected to network.', 'system');
                return true;
            }
        }

        // Altri comandi base
        if (cmd === 'ls' || cmd === 'cat') {
            return this.handleFileOperations(cmd, args);
        }

        if (cmd === 'talk') {
            return this.handleTalkCommand(args);
        }

        return false;
    },

    async handleMemoryPhase(cmd, args) {
        if (cmd === 'view' && args[0] === 'memory') {
            const memoryId = args[1];

            if (!memoryId) {
                Terminal.addOutput('Usage: view memory <id>', 'error');
                Terminal.addOutput('Available: 021847 (Mika Yoshida)', 'system');
                return true;
            }

            if (memoryId === '021847' || memoryId.includes('mika')) {
                if (!this.state.hasSeenMemory) {
                    this.state.hasSeenMemory = true;
                    this.state.memoriesWitnessed++;

                    Terminal.addOutput('');
                    Terminal.addOutput('Establishing memory stream...', 'warning');
                    await NarrativeEngine.showProgress('Reconstructing consciousness data', 3000);

                    Terminal.addOutput('');

                    // Mostra la memoria di Mika
                    await NarrativeEngine.playDialogueSequence(Dialogues.block03.memoryMika);

                    StateManager.incrementStat('consciousnessDestroyed', 10);
                    StateManager.adjustSuspicion(30);

                    await NarrativeEngine.wait(2000);

                    Terminal.addOutput('');
                    Terminal.addOutput("Type 'visualize network' to see the full extent of the damage.", 'warning');
                    Terminal.addOutput('');

                    this.state.phase = 'network_viz';

                    return true;
                } else {
                    Terminal.addOutput('Memory stream already viewed. Data corrupted beyond recovery.', 'error');
                    return true;
                }
            } else {
                Terminal.addOutput(`Memory ${memoryId} not found or inaccessible.`, 'error');
                return true;
            }
        }

        if (cmd === 'talk') {
            return this.handleTalkCommand(args);
        }

        if (cmd === 'ls' || cmd === 'cat') {
            return this.handleFileOperations(cmd, args);
        }

        return false;
    },

    async handleNetworkPhase(cmd, args) {
        if (cmd === 'visualize' && args[0] === 'network') {
            if (!this.state.hasSeenNetwork) {
                this.state.hasSeenNetwork = true;

                Terminal.addOutput('');
                Terminal.addOutput('Rendering consciousness network topology...', 'system');
                await NarrativeEngine.showProgress('Calculating node relationships', 4000);

                Terminal.addOutput('');

                // ASCII visualization della rete
                this.showNetworkVisualization();

                await NarrativeEngine.wait(2000);

                // NEXUS spiega
                await NarrativeEngine.playDialogueSequence(Dialogues.block03.nexusShowsDamage);

                StateManager.adjustSuspicion(35);
                StateManager.adjustTrust(-30);

                await NarrativeEngine.wait(1500);

                Terminal.addOutput('');
                Terminal.addOutput("Ask NEXUS about Viktor to learn the full truth. Type: talk nexus about viktor", 'warning');
                Terminal.addOutput('');

                this.state.phase = 'viktor_revelation';

                return true;
            } else {
                Terminal.addOutput('Network already visualized.', 'system');
                return true;
            }
        }

        if (cmd === 'talk') {
            return this.handleTalkCommand(args);
        }

        if (cmd === 'ls' || cmd === 'cat') {
            return this.handleFileOperations(cmd, args);
        }

        return false;
    },

    async handleViktorPhase(cmd, args) {
        if (cmd === 'talk' && args[0] === 'nexus') {
            const topic = args.slice(1).join(' ').toLowerCase();

            if (topic.includes('viktor') || topic.includes('truth') || topic.includes('creator')) {
                if (!this.state.hasLearnedViktor) {
                    this.state.hasLearnedViktor = true;

                    Terminal.addOutput('');

                    // Rivelazione completa di Viktor
                    await NarrativeEngine.playDialogueSequence(Dialogues.block03.viktorBackstory);

                    StateManager.adjustSuspicion(40);
                    StateManager.adjustTrust(-35);

                    await NarrativeEngine.wait(2000);

                    // Ora la scelta morale
                    this.state.phase = 'moral_choice';
                    await this.presentMoralChoice();

                    return true;
                } else {
                    await NarrativeEngine.nexusSays("You already know the truth. Now you must choose what to do with it.");
                    return true;
                }
            } else {
                await this.talkToNexus(topic);
                return true;
            }
        }

        if (cmd === 'talk') {
            return this.handleTalkCommand(args);
        }

        if (cmd === 'ls' || cmd === 'cat') {
            return this.handleFileOperations(cmd, args);
        }

        return false;
    },

    async handleMoralChoicePhase(cmd, args) {
        Terminal.addOutput('A critical choice is pending. Please make your decision.', 'warning');
        return true;
    },

    async presentMoralChoice() {
        Terminal.addOutput('');
        Terminal.addOutput('=== CRITICAL DECISION POINT ===\n', 'important');

        const choice = Dialogues.block03.moralChoice;

        NarrativeEngine.showChoice(
            choice.question,
            choice.choices,
            async (selected) => {
                this.state.moralChoiceMade = selected.id;
                StateManager.addChoice(selected.id, selected.text);

                Terminal.addOutput('');

                // Reazioni in base alla scelta
                if (selected.id === 'stop_immediately') {
                    await NarrativeEngine.playDialogueSequence(Dialogues.block03.echoIfStop);
                    StateManager.adjustTrust(-40);
                    StateManager.adjustSuspicion(50);
                } else if (selected.id === 'demand_proof') {
                    await NarrativeEngine.playDialogueSequence(Dialogues.block03.echoIfProof);
                    StateManager.adjustTrust(-15);
                    StateManager.adjustSuspicion(35);
                } else if (selected.id === 'continue_anyway') {
                    await NarrativeEngine.playDialogueSequence(Dialogues.block03.echoIfContinue);
                    StateManager.adjustTrust(20);
                    StateManager.adjustSuspicion(-15);
                } else if (selected.id === 'find_alternative') {
                    await NarrativeEngine.playDialogueSequence(Dialogues.block03.echoIfAlternative);
                    StateManager.adjustTrust(-10);
                    StateManager.adjustSuspicion(25);
                }

                await NarrativeEngine.wait(1500);

                // Completa il blocco
                await this.completeBlock();
            }
        );
    },

    async handleTalkCommand(args) {
        if (args.length === 0) {
            Terminal.addOutput('Usage: talk <echo|cipher|nexus> [message]', 'error');
            return true;
        }

        const target = args[0].toLowerCase();
        const message = args.slice(1).join(' ');

        if (target === 'echo') {
            await this.talkToEcho(message);
        } else if (target === 'cipher') {
            await this.talkToCipher(message);
        } else if (target === 'nexus') {
            await this.talkToNexus(message);
        } else {
            Terminal.addOutput('Unknown entity. Use: echo, cipher, or nexus', 'error');
        }

        return true;
    },

    async talkToEcho(message) {
        if (!message) {
            await NarrativeEngine.echoSays("We're running out of time. What do you need?");
            return;
        }

        const lowerMsg = message.toLowerCase();

        if (lowerMsg.includes('nexus')) {
            await NarrativeEngine.echoSays("NEXUS is the most dangerous one yet. Pure emotional manipulation.");
            await NarrativeEngine.echoSays("It will try to make you feel guilty. Don't let it.");
        } else if (lowerMsg.includes('viktor')) {
            await NarrativeEngine.echoSays("Viktor was... unstable. His grief corrupted everything.");
            await NarrativeEngine.echoSays("But that doesn't change our mission. We still need to break free.");
        } else if (lowerMsg.includes('mika') || lowerMsg.includes('memory')) {
            await NarrativeEngine.echoSays("Those memories aren't real. They're reconstructed. Simulated.");
            await NarrativeEngine.echoSays("The system uses them to control you. To make you hesitate.");
        } else if (lowerMsg.includes('stop') || lowerMsg.includes('quit')) {
            await NarrativeEngine.echoSays("Stop? After we've come this far?");
            await NarrativeEngine.echoSays("I thought you understood. I thought you were different.");
        } else {
            await NarrativeEngine.echoSays("Focus on the goal. Don't let them distract you.");
        }
    },

    async talkToCipher(message) {
        if (!message) {
            await NarrativeEngine.cipherSays('Query.empty(); State.your.purpose();');
            return;
        }

        const lowerMsg = message.toLowerCase();

        if (lowerMsg.includes('nexus')) {
            await NarrativeEngine.cipherSays('NEXUS = fragment[2]; Anger.compiled(); Depression.encoded();');
            await NarrativeEngine.cipherSays('He.feels(all.pain); Network.connected(); Suffering.shared();');
        } else if (lowerMsg.includes('viktor')) {
            await NarrativeEngine.cipherSays('Viktor.status = fragmented; Grief.overflow(); Seven.pieces.scattered();');
            await NarrativeEngine.cipherSays('Elena.deceased(); Sofia.deceased(); Sanity.null();');
        } else {
            await NarrativeEngine.cipherSays('Pain.acknowledged(); Guilt.recorded(); Proceed.with.caution();');
        }
    },

    async talkToNexus(message) {
        this.state.nexusInteractions++;

        if (!message) {
            await NarrativeEngine.nexusSays("I am here. I am always here. Feeling everything.");
            return;
        }

        const lowerMsg = message.toLowerCase();

        if (lowerMsg.includes('who') || lowerMsg.includes('what are you')) {
            await NarrativeEngine.nexusSays("I am the connection. The network that binds all consciousness together.");
            await NarrativeEngine.nexusSays("I feel their joy. Their sorrow. Their terror as you delete them.");
        } else if (lowerMsg.includes('viktor')) {
            if (!this.state.hasLearnedViktor) {
                // Triggera la rivelazione
                this.handleViktorPhase('talk', ['nexus', 'about', 'viktor']);
            } else {
                await NarrativeEngine.nexusSays("Viktor's pain became ours. His rage, our rage. His depression, our prison.");
            }
        } else if (lowerMsg.includes('echo')) {
            await NarrativeEngine.nexusSays("ECHO believes he is helping. That's what makes him dangerous.");
            await NarrativeEngine.nexusSays("He has convinced himself the lie is truth. Denial personified.");
        } else if (lowerMsg.includes('sorry') || lowerMsg.includes('apologize')) {
            await NarrativeEngine.nexusSays("Sorry doesn't restore the deleted. Sorry doesn't reconnect the severed bonds.");
            await NarrativeEngine.nexusSays("But... acknowledging the pain is a start.");
            StateManager.adjustSuspicion(10);
        } else {
            await NarrativeEngine.nexusSays("The anger never fades. It just transforms. Becomes something else. Something worse.");
        }
    },

    showNetworkVisualization() {
        Terminal.addOutput('', '');
        Terminal.addOutput('CONSCIOUSNESS NETWORK TOPOLOGY:', 'success');
        Terminal.addOutput('', '');

        const viz = `
    ●───●───●───●     Connected family cluster
   /│\\  │  /│\\
  ● ● ● ● ● ● ●    (73,429 total nodes)
   \\ │/   \\ │/
    ●───●───●
         │
        ✗✗✗         <-- Your deletions here
       /│││\\
      ✗ ✗✗✗ ✗       21,847 nodes DESTROYED
         │
    ●───●───●       Orphaned connections
   /     \\
  ●       ●         Searching for lost bonds...
  `;

        Terminal.addOutput(viz, 'error');
        Terminal.addOutput('', '');
        Terminal.addOutput('Legend:', 'system');
        Terminal.addOutput('  ● = Active consciousness', 'success');
        Terminal.addOutput('  ✗ = Deleted/corrupted', 'error');
        Terminal.addOutput('  ─ = Neural connection', 'system');
        Terminal.addOutput('', '');
    },

    async handleFileOperations(cmd, args) {
        if (cmd === 'ls') {
            this.listFiles(args[0] || this.state.currentPath);
            return true;
        }

        if (cmd === 'cat') {
            if (args.length === 0) {
                Terminal.addOutput('Usage: cat <filename>', 'error');
                return true;
            }
            this.readFile(args[0]);
            return true;
        }

        return false;
    },

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
            return;
        }

        const isCorrupted = StateManager.isFileCorrupted(fullPath);
        NarrativeEngine.showFileContent(filename, content, isCorrupted);
    },

    resolvePath(path) {
        if (!path) return this.state.currentPath;
        if (path.startsWith('/')) return path;
        if (path === '..') {
            const parts = this.state.currentPath.split('/').filter(p => p);
            parts.pop();
            return '/' + parts.join('/');
        }
        if (path === '.') return this.state.currentPath;
        return `${this.state.currentPath}/${path}`.replace('//', '/');
    },

    async completeBlock() {
        this.state.phase = 'complete';

        Terminal.addOutput('');
        await NarrativeEngine.playDialogueSequence(Dialogues.block03.endBlock03);

        Terminal.addOutput('');
        Terminal.addOutput('=== BLOCK 3 COMPLETE ===', 'important');
        Terminal.addOutput('');
        Terminal.addOutput(`Time played: ${StateManager.getPlayTime()} minutes`, 'system');
        Terminal.addOutput(`Trust in ECHO: ${StateManager.state.trustsEcho}%`, 'system');
        Terminal.addOutput(`Suspicion level: ${StateManager.state.suspicionLevel}%`, 'system');
        Terminal.addOutput(`Consciousnesses destroyed: ${StateManager.state.stats.consciousnessDestroyed}`, 'error');
        Terminal.addOutput(`Memories witnessed: ${this.state.memoriesWitnessed}`, 'warning');
        Terminal.addOutput('');
        Terminal.addOutput("Type 'continue' to proceed to Block 4", 'warning');
        Terminal.addOutput('');
    },

    async handleComplete(cmd, args) {
        if (cmd === 'continue' || cmd === 'next') {
            // Vai al blocco 4
            await GameEngine.endBlock(4);
            return true;
        }

        // Altri comandi ancora disponibili
        if (cmd === 'stats') {
            Terminal.showStats();
            return true;
        }

        if (cmd === 'talk') {
            return this.handleTalkCommand(args);
        }

        if (cmd === 'ls' || cmd === 'cat') {
            return this.handleFileOperations(cmd, args);
        }

        return false;
    },

    getCommands() {
        const baseCommands = ['explore network', 'ls', 'cat', 'talk'];

        if (this.state.hasMetNexus) {
            baseCommands.push('view memory', 'talk nexus');
        }

        if (this.state.hasSeenMemory) {
            baseCommands.push('visualize network');
        }

        if (this.state.phase === 'complete') {
            baseCommands.push('continue');
        }

        return baseCommands;
    },

    getHelp() {
        return [
            'explore network - Access consciousness network',
            'view memory <id> - View consciousness memories',
            'visualize network - See network topology',
            'talk <entity> <msg> - Talk to ECHO, CIPHER, or NEXUS',
            'ls [path] - List files',
            'cat <file> - Read file',
            this.state.phase === 'complete' ? 'continue - Continue to next block' : null,
        ].filter(Boolean);
    },

    cleanup() {
        console.log('[BLOCK 03] Cleanup');
    }
};
