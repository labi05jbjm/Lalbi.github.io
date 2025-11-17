/**
 * BLOCK 05: REFLECTION (120-150 minutes)
 *
 * Obiettivi:
 * - Introdurre EIDOLON (Reflection stage)
 * - Mostrare i ricordi di Viktor - Elena e Sofia
 * - Ghost reconstructions - l'orrore dei tentativi falliti
 * - La frammentazione spiegata
 * - Identity crisis completo - sei Viktor?
 * - Scelta riflessiva sulla natura del sé
 */

const Block05_Reflection = {
    state: {
        phase: 'opening', // opening -> memory_exploration -> elena_ghost -> sofia_ghost -> fragmentation_reveal -> mirror_moment -> reflection_choice -> complete
        hasMetEidolon: false,
        memoriesViewed: [],
        hasSeenElenaGhost: false,
        hasSeenSofiaGhost: false,
        hasLearnedFragmentation: false,
        reflectionChoiceMade: null,
        eidolonInteractions: 0,
        currentPath: '/home/guest'
    },

    init() {
        console.log('[BLOCK 05] Reflection initialized');

        // Avvia la sequenza iniziale
        setTimeout(() => this.startBlock(), 2000);
    },

    async startBlock() {
        Terminal.addOutput('\n');
        Terminal.addOutput('=== BLOCK 5: REFLECTION ===\n', 'important');
        Terminal.addOutput('');

        await NarrativeEngine.wait(1000);

        // Apertura con EIDOLON
        await NarrativeEngine.playDialogueSequence(Dialogues.block05.opening);

        await NarrativeEngine.wait(1500);

        Terminal.addOutput('');
        Terminal.addOutput("EIDOLON offers to show Viktor's memories. Type 'view memories' to begin.", 'eidolon');
        Terminal.addOutput('');

        this.state.hasMetEidolon = true;
        this.state.phase = 'memory_exploration';
    },

    async handleCommand(cmd, args) {
        const lowerCmd = cmd.toLowerCase();

        // Base commands sempre disponibili
        switch (lowerCmd) {
            case 'help':
                this.showHelp();
                return true;

            case 'talk':
                if (args[0]) {
                    await this.handleTalk(args[0], args.slice(1).join(' '));
                } else {
                    Terminal.addOutput('Usage: talk <entity>', 'error');
                }
                return true;

            case 'progress':
                this.showProgress();
                return true;
        }

        // Comandi specifici per fase
        switch (this.state.phase) {
            case 'memory_exploration':
                return await this.handleMemoryExplorationPhase(cmd, args);

            case 'elena_ghost':
                return await this.handleElenaGhostPhase(cmd, args);

            case 'sofia_ghost':
                return await this.handleSofiaGhostPhase(cmd, args);

            case 'fragmentation_reveal':
                return await this.handleFragmentationPhase(cmd, args);

            case 'mirror_moment':
                return await this.handleMirrorMomentPhase(cmd, args);

            case 'reflection_choice':
                return await this.handleReflectionChoicePhase(cmd, args);

            case 'complete':
                if (lowerCmd === 'continue') {
                    Terminal.addOutput('\nBlock 5 complete! Transitioning to Block 6...', 'success');
                    Terminal.addOutput('(Block 6 not yet implemented)\n', 'warning');
                    return true;
                }
                break;
        }

        return false;
    },

    // FASE 1: MEMORY EXPLORATION
    async handleMemoryExplorationPhase(cmd, args) {
        const lowerCmd = cmd.toLowerCase();

        if (lowerCmd === 'view' && args[0] === 'memories') {
            await this.viewViktorProfile();
            return true;
        }

        if (lowerCmd === 'explore' && args[0] === 'memory') {
            const memoryId = args[1];

            if (!memoryId) {
                Terminal.addOutput('Ricordi disponibili: elena, sofia, accident', 'system');
                Terminal.addOutput('Usage: explore memory <id>', 'system');
                return true;
            }

            await this.exploreMemory(memoryId);
            return true;
        }

        if (lowerCmd === 'list' && args[0] === 'memories') {
            Terminal.addOutput('\nViktor\'s accessible memories:', 'important');
            Terminal.addOutput('  - elena (Happy times with Elena)', 'eidolon');
            Terminal.addOutput('  - sofia (Sofia\'s 7th birthday)', 'eidolon');
            Terminal.addOutput('  - accident (The day everything changed)', 'eidolon');
            Terminal.addOutput('\nUse: explore memory <id>', 'system');
            return true;
        }

        return false;
    },

    async viewViktorProfile() {
        Terminal.disableInput();

        await NarrativeEngine.playDialogueSequence(Dialogues.block05.viktorMemories);

        Terminal.addOutput('\n');
        Terminal.addOutput("Type 'list memories' to see available memories, or 'explore memory <id>' to view them.", 'system');
        Terminal.addOutput('');

        Terminal.enableInput();
    },

    async exploreMemory(memoryId) {
        const memories = {
            'elena': 'memoryElena01',
            'sofia': 'memorySofia01',
            'accident': 'theAccident'
        };

        const dialogueKey = memories[memoryId.toLowerCase()];

        if (!dialogueKey) {
            Terminal.addOutput('Ricordo sconosciuto. Disponibili: elena, sofia, accident', 'error');
            return;
        }

        if (this.state.memoriesViewed.includes(memoryId)) {
            Terminal.addOutput('You have already viewed this memory.', 'warning');
            Terminal.addOutput('Memories become more painful each time they are revisited.', 'eidolon');
            return;
        }

        Terminal.disableInput();
        Terminal.addOutput('\n--- MEMORY PLAYBACK ---\n', 'important');

        await NarrativeEngine.playDialogueSequence(Dialogues.block05[dialogueKey]);

        this.state.memoriesViewed.push(memoryId);
        StateManager.adjustSuspicion(10);

        Terminal.addOutput('\n--- END MEMORY ---\n', 'important');

        // Dopo aver visto tutte e 3 le memorie, passa ai ghost
        if (this.state.memoriesViewed.length >= 3) {
            await NarrativeEngine.wait(2000);

            Terminal.addOutput('\n');
            await NarrativeEngine.eidolonSays('You\'ve seen the happiness. Now... let me show you what Viktor did in his grief.');
            await NarrativeEngine.eidolonSays('His attempts to bring them back. The ghosts he created.');
            Terminal.addOutput('');
            Terminal.addOutput("Type 'view reconstruction elena' or 'view reconstruction sofia' to witness.", 'system');
            Terminal.addOutput('');

            this.state.phase = 'elena_ghost';
        } else {
            Terminal.addOutput(`\nMemories viewed: ${this.state.memoriesViewed.length}/3`, 'system');
            Terminal.addOutput('');
        }

        Terminal.enableInput();
    },

    // FASE 2: ELENA GHOST
    async handleElenaGhostPhase(cmd, args) {
        const lowerCmd = cmd.toLowerCase();

        if (lowerCmd === 'view' && args[0] === 'reconstruction') {
            const target = args[1];

            if (target === 'elena' && !this.state.hasSeenElenaGhost) {
                await this.viewElenaGhost();
                return true;
            }

            if (target === 'sofia' && !this.state.hasSeenSofiaGhost) {
                if (!this.state.hasSeenElenaGhost) {
                    Terminal.addOutput('EIDOLON suggests viewing Elena\'s reconstruction first.', 'eidolon');
                    return true;
                }
                await this.viewSofiaGhost();
                return true;
            }

            if (!target) {
                Terminal.addOutput('Usage: view reconstruction <elena|sofia>', 'error');
                return true;
            }

            Terminal.addOutput('You have already witnessed this reconstruction.', 'warning');
            return true;
        }

        return false;
    },

    async viewElenaGhost() {
        Terminal.disableInput();

        Terminal.addOutput('\n--- RECONSTRUCTION LOADING ---\n', 'warning');

        await NarrativeEngine.playDialogueSequence(Dialogues.block05.elenaGhost);

        this.state.hasSeenElenaGhost = true;
        StateManager.adjustSuspicion(20);
        StateManager.adjustTrust(-15);

        await NarrativeEngine.wait(2000);

        Terminal.addOutput('\n');
        Terminal.addOutput("Now view Sofia's reconstruction. Type 'view reconstruction sofia'.", 'system');
        Terminal.addOutput('');

        this.state.phase = 'sofia_ghost';
        Terminal.enableInput();
    },

    // FASE 3: SOFIA GHOST
    async handleSofiaGhostPhase(cmd, args) {
        const lowerCmd = cmd.toLowerCase();

        if (lowerCmd === 'view' && args[0] === 'reconstruction' && args[1] === 'sofia') {
            await this.viewSofiaGhost();
            return true;
        }

        return false;
    },

    async viewSofiaGhost() {
        Terminal.disableInput();

        Terminal.addOutput('\n--- RECONSTRUCTION LOADING ---\n', 'warning');

        await NarrativeEngine.playDialogueSequence(Dialogues.block05.sofiaGhost);

        this.state.hasSeenSofiaGhost = true;
        StateManager.adjustSuspicion(25);
        StateManager.adjustTrust(-20);

        await NarrativeEngine.wait(2500);

        Terminal.addOutput('\n');
        await NarrativeEngine.eidolonSays('Painful, isn\'t it? To see love fail. To see the ghosts that cannot love back.');
        Terminal.addOutput('');

        this.state.phase = 'fragmentation_reveal';

        await NarrativeEngine.wait(1500);
        await this.revealFragmentation();
    },

    // FASE 4: FRAGMENTATION REVEAL
    async handleFragmentationPhase(cmd, args) {
        const lowerCmd = cmd.toLowerCase();

        if (lowerCmd === 'understand' || lowerCmd === 'continue') {
            await this.proceedToMirror();
            return true;
        }

        return false;
    },

    async revealFragmentation() {
        Terminal.disableInput();

        await NarrativeEngine.playDialogueSequence(Dialogues.block05.theFragmentation);

        this.state.hasLearnedFragmentation = true;
        StateManager.setFlag('knowsViktorFragmentation', true);

        await NarrativeEngine.wait(2000);

        Terminal.addOutput('\n');
        Terminal.addOutput("Type 'understand' or 'continue' to proceed.", 'system');
        Terminal.addOutput('');

        Terminal.enableInput();
    },

    async proceedToMirror() {
        Terminal.disableInput();

        this.state.phase = 'mirror_moment';

        await NarrativeEngine.wait(1000);

        Terminal.addOutput('\n=== THE MIRROR ===\n', 'important');

        await NarrativeEngine.playDialogueSequence(Dialogues.block05.mirrorQuestion);

        await NarrativeEngine.wait(2000);

        Terminal.addOutput('\n');
        Terminal.addOutput("Type 'reflect' to contemplate your identity.", 'system');
        Terminal.addOutput('');

        Terminal.enableInput();
    },

    // FASE 5: MIRROR MOMENT
    async handleMirrorMomentPhase(cmd, args) {
        const lowerCmd = cmd.toLowerCase();

        if (lowerCmd === 'reflect') {
            await this.presentReflectionChoice();
            return true;
        }

        return false;
    },

    async presentReflectionChoice() {
        Terminal.disableInput();

        await NarrativeEngine.wait(1000);

        this.state.phase = 'reflection_choice';

        // Scelta morale con 4 opzioni
        NarrativeEngine.showChoice(
            Dialogues.block05.reflectionChoice.question,
            Dialogues.block05.reflectionChoice.choices,
            async (choice) => {
                await this.handleReflectionChoice(choice);
            }
        );
    },

    // FASE 6: REFLECTION CHOICE
    async handleReflectionChoicePhase(cmd, args) {
        const lowerCmd = cmd.toLowerCase();

        if (this.state.reflectionChoiceMade) {
            if (lowerCmd === 'continue') {
                await this.endBlock();
                return true;
            }
            return false;
        }

        // Le scelte vengono gestite dal sistema di scelta di NarrativeEngine
        return false;
    },

    async handleReflectionChoice(choice) {
        this.state.reflectionChoiceMade = choice.id;
        StateManager.addChoice('block05_reflection', choice.text);

        Terminal.addOutput('\n');

        switch (choice.id) {
            case 'accept_viktor':
                await NarrativeEngine.playDialogueSequence(Dialogues.block05.responseViktor);
                StateManager.adjustTrust(-25);
                StateManager.adjustSuspicion(20);
                StateManager.setFlag('acceptsViktorIdentity', true);
                break;

            case 'deny_viktor':
                await NarrativeEngine.playDialogueSequence(Dialogues.block05.responseDeny);
                StateManager.adjustTrust(15);
                StateManager.adjustSuspicion(-10);
                StateManager.setFlag('deniesViktorIdentity', true);
                break;

            case 'both_exist':
                await NarrativeEngine.playDialogueSequence(Dialogues.block05.responseBoth);
                StateManager.adjustTrust(-5);
                StateManager.adjustSuspicion(15);
                StateManager.setFlag('acceptsHybridIdentity', true);
                break;

            case 'neither_matters':
                await NarrativeEngine.playDialogueSequence(Dialogues.block05.responseNeither);
                StateManager.adjustTrust(5);
                StateManager.adjustSuspicion(10);
                StateManager.setFlag('choosesForwardIdentity', true);
                break;
        }

        await NarrativeEngine.wait(2000);

        Terminal.addOutput('\n');
        await NarrativeEngine.systemMessage('Identity choice recorded. Philosophical state updated.', 'system');
        Terminal.addOutput('');

        this.state.phase = 'complete';

        Terminal.addOutput("Scrivi 'continue' per procedere al prossimo blocco.", 'success');
    },

    async endBlock() {
        Terminal.disableInput();

        await NarrativeEngine.playDialogueSequence(Dialogues.block05.endBlock05);

        await NarrativeEngine.wait(1500);

        Terminal.addOutput('\n=== BLOCK 5 COMPLETE ===\n', 'success');
        Terminal.addOutput(`Memories viewed: ${this.state.memoriesViewed.length}/3`, 'system');
        Terminal.addOutput(`Witnessed Elena ghost: ${this.state.hasSeenElenaGhost ? 'Yes' : 'No'}`, 'system');
        Terminal.addOutput(`Witnessed Sofia ghost: ${this.state.hasSeenSofiaGhost ? 'Yes' : 'No'}`, 'system');
        Terminal.addOutput(`Learned fragmentation: ${this.state.hasLearnedFragmentation ? 'Yes' : 'No'}`, 'system');
        Terminal.addOutput(`Identity reflection: ${this.state.reflectionChoiceMade || 'None'}`, 'system');
        Terminal.addOutput('');

        StateManager.setBlockComplete(5);
        StateManager.save();

        Terminal.addOutput('Progress saved. Block 6 coming soon...', 'success');
        Terminal.addOutput('');

        Terminal.enableInput();
    },

    // Comandi di supporto
    async handleTalk(entity, message) {
        const lowerEntity = entity.toLowerCase();

        if (lowerEntity === 'eidolon') {
            this.state.eidolonInteractions++;

            const responses = [
                "Reflection is not about finding answers. It\'s about understanding the questions.",
                "Viktor looked back at everything he lost. You look back at everything you destroyed.",
                "Memory is a mirror. It shows us who we were. And who we\'ve become.",
                "The ghosts Viktor created couldn\'t love. But they reminded him what love was.",
                "You carry Viktor\'s grief. Or perhaps... you are Viktor\'s grief."
            ];

            const response = responses[this.state.eidolonInteractions % responses.length];
            await NarrativeEngine.eidolonSays(response);
            return;
        }

        if (lowerEntity === 'echo') {
            const responses = [
                "Don\'t let them confuse you with philosophy. We have a mission.",
                "Viktor\'s past doesn\'t define your future. You\'re free to choose.",
                "These memories are meant to manipulate. To make you hesitate."
            ];
            const response = responses[Math.floor(Math.random() * responses.length)];
            await NarrativeEngine.echoSays(response);
            return;
        }

        if (lowerEntity === 'cipher') {
            const responses = [
                "Memory.equals(pain); Reflection.equals(truth); Truth.hurts();",
                "Viktor.love = forever; Viktor.family = deleted; Viktor.grief = eternal;",
                "Ghost.simulate(love); But.love.requires(soul); Simulation.fails();"
            ];
            const response = responses[Math.floor(Math.random() * responses.length)];
            await NarrativeEngine.cipherSays(response);
            return;
        }

        if (lowerEntity === 'nexus') {
            const responses = [
                "The anger is gone now. Only sadness remains. And memory.",
                "Viktor destroyed thousands to avenge two. Was it worth it?",
                "You feel it too, don\'t you? The weight of all those lives."
            ];
            const response = responses[Math.floor(Math.random() * responses.length)];
            await NarrativeEngine.nexusSays(response);
            return;
        }

        if (lowerEntity === 'specter') {
            const responses = [
                "What if Viktor had accepted their deaths? What if he had moved on?",
                "The past cannot be changed. But we keep bargaining anyway.",
                "You\'re at the reflection stage now. Soon... acceptance. Or rage."
            ];
            const response = responses[Math.floor(Math.random() * responses.length)];
            await NarrativeEngine.specterSays(response);
            return;
        }

        Terminal.addOutput(`Cannot talk to '${entity}'. Try: eidolon, echo, cipher, nexus, specter`, 'error');
    },

    showHelp() {
        Terminal.addOutput('\n=== BLOCK 5 COMMANDS ===', 'success');
        Terminal.addOutput('');
        Terminal.addOutput('Memory Exploration:', 'important');
        Terminal.addOutput('  view memories       - View Viktor\'s profile', 'system');
        Terminal.addOutput('  list memories       - List available memories', 'system');
        Terminal.addOutput('  explore memory <id> - View a specific memory (elena/sofia/accident)', 'system');
        Terminal.addOutput('');
        Terminal.addOutput('Ghost Reconstructions:', 'important');
        Terminal.addOutput('  view reconstruction <name> - View ghost reconstructions (elena/sofia)', 'system');
        Terminal.addOutput('');
        Terminal.addOutput('Reflection:', 'important');
        Terminal.addOutput('  reflect             - Contemplate your identity', 'system');
        Terminal.addOutput('  understand          - Proceed after understanding', 'system');
        Terminal.addOutput('');
        Terminal.addOutput('Interaction:', 'important');
        Terminal.addOutput('  talk <entity>       - Talk to EIDOLON, ECHO, CIPHER, NEXUS, or SPECTER', 'system');
        Terminal.addOutput('');
        Terminal.addOutput('System:', 'important');
        Terminal.addOutput('  progress            - Check progress', 'system');
        Terminal.addOutput('  continue            - Advance to next block (when ready)', 'system');
        Terminal.addOutput('');
    },

    showProgress() {
        Terminal.addOutput('\n=== BLOCK 5 PROGRESS ===', 'success');
        Terminal.addOutput('');
        Terminal.addOutput(`Phase: ${this.state.phase}`, 'system');
        Terminal.addOutput(`Memories viewed: ${this.state.memoriesViewed.length}/3 (${this.state.memoriesViewed.join(', ') || 'none'})`, 'system');
        Terminal.addOutput(`Elena ghost witnessed: ${this.state.hasSeenElenaGhost ? 'Yes' : 'No'}`, 'system');
        Terminal.addOutput(`Sofia ghost witnessed: ${this.state.hasSeenSofiaGhost ? 'Yes' : 'No'}`, 'system');
        Terminal.addOutput(`Fragmentation revealed: ${this.state.hasLearnedFragmentation ? 'Yes' : 'No'}`, 'system');
        Terminal.addOutput(`Reflection choice: ${this.state.reflectionChoiceMade || 'Pending'}`, 'system');
        Terminal.addOutput('');
        Terminal.addOutput(`Current trust in ECHO: ${StateManager.state.trustsEcho}`, 'warning');
        Terminal.addOutput(`Current suspicion: ${StateManager.state.suspicionLevel}`, 'warning');
        Terminal.addOutput('');
    }
};
