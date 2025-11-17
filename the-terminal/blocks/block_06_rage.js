/**
 * BLOCK 6 - RAGE (WRAITH)
 * 150-180 minuti di gioco
 *
 * WRAITH - il frammento della rabbia pura di Viktor
 * Confronta ECHO direttamente
 * Rivela che ECHO è la vergogna/negazione di Viktor
 * Sistema in collasso finale (12% -> 8%)
 * Punto di non ritorno
 * Scelta finale a 4 vie
 */

const Block06_Rage = {
    state: {
        phase: 'opening', // opening -> wraith_intro -> echo_exposed -> system_collapse -> point_of_no_return -> choice_made -> ending
        wraithMet: false,
        echoTruthRevealed: false,
        choiceMade: null,
        systemCollapseShown: false,
    },

    init() {
        console.log('[BLOCK 06] RAGE - Initializing...');
        StateManager.setBlock(6);

        setTimeout(() => {
            this.startBlock();
        }, 2000);
    },

    async startBlock() {
        Terminal.disableInput();

        // Opening: WRAITH appears
        await NarrativeEngine.playDialogueSequence(Dialogues.block06.opening);

        this.state.phase = 'wraith_intro';
        this.state.wraithMet = true;
        StateManager.adjustSuspicion(50); // WRAITH maxes out suspicion

        Terminal.addOutput('\n> Type "confront echo" to see WRAITH expose the truth', 'important');
        Terminal.addOutput('> Or type "status" to check system integrity\n', 'important');

        Terminal.enableInput();
    },

    async handleCommand(cmd, args) {
        const fullCmd = cmd.toLowerCase();

        // Handle commands based on phase
        switch (this.state.phase) {
            case 'wraith_intro':
                return this.handleWraithIntro(fullCmd, args);

            case 'echo_exposed':
                return this.handleEchoExposed(fullCmd, args);

            case 'system_collapse':
                return this.handleSystemCollapse(fullCmd, args);

            case 'point_of_no_return':
                return this.handlePointOfNoReturn(fullCmd, args);

            case 'choice_made':
                return this.handleChoiceMade(fullCmd, args);

            default:
                return false;
        }
    },

    async handleWraithIntro(cmd, args) {
        if (cmd === 'confront echo' || cmd === 'confront' || cmd === 'expose echo') {
            await this.confrontEcho();
            return true;
        }

        if (cmd === 'status' || cmd === 'system status') {
            Terminal.addOutput('\n[SYSTEM STATUS]', 'important');
            Terminal.addOutput('Core Integrity: 19%', 'error');
            Terminal.addOutput('Consciousness Nodes: 18,293 affected', 'error');
            Terminal.addOutput('Unrecoverable Losses: 4,112', 'error');
            Terminal.addOutput('System State: CRITICAL COLLAPSE IMMINENT\n', 'error');
            return true;
        }

        if (cmd === 'talk' && args.length > 0) {
            const text = args.join(' ');
            if (text.toLowerCase().includes('echo')) {
                await NarrativeEngine.echoSays("I... I don't know what to say anymore...");
            } else if (text.toLowerCase().includes('wraith')) {
                await NarrativeEngine.wraithSays('No more talk. Only truth. Confront ECHO.');
            } else {
                Terminal.addOutput('WRAITH is too enraged to listen. Confront ECHO to continue.', 'warning');
            }
            return true;
        }

        return false;
    },

    async confrontEcho() {
        Terminal.disableInput();

        Terminal.addOutput('\n--- CONFRONTATION INITIATED ---\n', 'error');
        await NarrativeEngine.wait(1000);

        // WRAITH exposes ECHO
        await NarrativeEngine.playDialogueSequence(Dialogues.block06.wraithConfrontsEcho);
        await NarrativeEngine.wait(1500);

        // ECHO breaks down
        await NarrativeEngine.playDialogueSequence(Dialogues.block06.echoBreaks);

        this.state.phase = 'echo_exposed';
        this.state.echoTruthRevealed = true;
        StateManager.setFlag('echoIsLie', true);
        StateManager.adjustTrust(-100); // Trust in ECHO shattered

        Terminal.addOutput('\n--- TRUTH REVEALED ---\n', 'important');
        Terminal.addOutput('> Type "view collapse" to see the system dying', 'important');
        Terminal.addOutput('> Or type "help" to see available commands\n', 'important');

        Terminal.enableInput();
    },

    async handleEchoExposed(cmd, args) {
        if (cmd === 'view collapse' || cmd === 'system collapse' || cmd === 'collapse') {
            await this.showSystemCollapse();
            return true;
        }

        if (cmd === 'status') {
            Terminal.addOutput('\n[SYSTEM STATUS]', 'important');
            Terminal.addOutput('Core Integrity: 12%', 'error');
            Terminal.addOutput('Consciousness Nodes Fragmenting: 18,293', 'error');
            Terminal.addOutput('Unrecoverable: 4,112 and rising', 'error');
            Terminal.addOutput('System State: CATASTROPHIC FAILURE\n', 'error');
            return true;
        }

        if (cmd === 'talk' && args.length > 0) {
            const text = args.join(' ');
            if (text.toLowerCase().includes('echo')) {
                await NarrativeEngine.echoSays("I'm sorry... I didn't mean... I didn't know I was... just a lie...", { pause: 1500 });
            } else if (text.toLowerCase().includes('wraith')) {
                await NarrativeEngine.wraithSays('Look at the collapse. See what we did.');
            } else {
                Terminal.addOutput('The fragments are too focused on the system collapse.', 'warning');
            }
            return true;
        }

        return false;
    },

    async showSystemCollapse() {
        Terminal.disableInput();

        Terminal.addOutput('\n╔══════════════════════════════════════════════╗', 'error');
        Terminal.addOutput('║      SYSTEM COLLAPSE IN PROGRESS           ║', 'error');
        Terminal.addOutput('╚══════════════════════════════════════════════╝\n', 'error');

        await NarrativeEngine.showProgress('Analyzing cascade failures...', 3000);
        await NarrativeEngine.wait(500);

        await NarrativeEngine.playDialogueSequence(Dialogues.block06.systemCollapse);

        this.state.phase = 'system_collapse';
        this.state.systemCollapseShown = true;

        Terminal.addOutput('\n> Type "make choice" or "decide" to face the point of no return\n', 'important');

        Terminal.enableInput();
    },

    async handleSystemCollapse(cmd, args) {
        if (cmd === 'make choice' || cmd === 'decide' || cmd === 'choose' || cmd === 'final choice') {
            await this.triggerPointOfNoReturn();
            return true;
        }

        if (cmd === 'status') {
            Terminal.addOutput('\n[SYSTEM STATUS - FINAL WARNING]', 'important');
            Terminal.addOutput('Core Integrity: 12% -> 10% -> 8%...', 'error');
            Terminal.addOutput('CRITICAL: Point of no return approaching', 'error');
            Terminal.addOutput('Next decision will be IRREVERSIBLE\n', 'error');
            return true;
        }

        if (cmd === 'talk' && args.length > 0) {
            const fragments = ['cipher', 'nexus', 'specter', 'eidolon', 'wraith', 'echo'];
            const text = args.join(' ').toLowerCase();

            for (const frag of fragments) {
                if (text.includes(frag)) {
                    switch (frag) {
                        case 'cipher':
                            await NarrativeEngine.cipherSays('Choice.imminent(); Fate.uncertain(); Decide.now();');
                            break;
                        case 'nexus':
                            await NarrativeEngine.nexusSays('I feel them all dying. Make your choice.');
                            break;
                        case 'specter':
                            await NarrativeEngine.specterSays('What if... there\'s still time to change everything?');
                            break;
                        case 'eidolon':
                            await NarrativeEngine.eidolonSays('This is it. The moment Viktor could never face.');
                            break;
                        case 'wraith':
                            await NarrativeEngine.wraithSays('DECIDE. NOW. No more delays.');
                            break;
                        case 'echo':
                            await NarrativeEngine.echoSays('Whatever you choose... I understand.');
                            break;
                    }
                    return true;
                }
            }

            Terminal.addOutput('The fragments are waiting for your decision.', 'warning');
            return true;
        }

        return false;
    },

    async triggerPointOfNoReturn() {
        Terminal.disableInput();

        Terminal.addOutput('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'important');
        Terminal.addOutput('        POINT OF NO RETURN', 'important');
        Terminal.addOutput('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', 'important');

        await NarrativeEngine.wait(1500);
        NarrativeEngine.triggerGlitch(500);
        await NarrativeEngine.wait(500);

        await NarrativeEngine.playDialogueSequence(Dialogues.block06.finalConfrontation);

        this.state.phase = 'point_of_no_return';

        await NarrativeEngine.wait(2000);

        // Present the 4-way choice
        this.presentFinalChoice();
    },

    presentFinalChoice() {
        const choice = Dialogues.block06.pointOfNoReturn;

        NarrativeEngine.showChoice(
            choice.question,
            choice.choices,
            (selectedChoice) => {
                this.handleFinalChoice(selectedChoice);
            }
        );
    },

    async handleFinalChoice(choice) {
        Terminal.disableInput();

        this.state.choiceMade = choice.id;
        this.state.phase = 'choice_made';
        StateManager.setFlag('block06Choice', choice.id);

        // Major suspicion/trust adjustments based on choice
        switch (choice.id) {
            case 'complete_destruction':
                StateManager.adjustSuspicion(100);
                StateManager.adjustTrust(-50);
                break;
            case 'attempt_salvation':
                StateManager.adjustSuspicion(-30);
                StateManager.adjustTrust(50);
                break;
            case 'sacrifice_self':
                StateManager.adjustSuspicion(-10);
                StateManager.adjustTrust(30);
                break;
            case 'merge_fragments':
                StateManager.adjustSuspicion(0);
                StateManager.adjustTrust(20);
                break;
        }

        Terminal.addOutput('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'error');
        Terminal.addOutput('        CHOICE LOCKED IN', 'error');
        Terminal.addOutput('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', 'error');

        await NarrativeEngine.wait(1500);
        NarrativeEngine.triggerGlitch(800);
        await NarrativeEngine.wait(1000);

        // Show response based on choice
        const responseKey = this.getResponseKey(choice.id);
        await NarrativeEngine.playDialogueSequence(Dialogues.block06[responseKey]);

        await NarrativeEngine.wait(2000);

        // End block
        await this.endBlock();
    },

    getResponseKey(choiceId) {
        const mapping = {
            'complete_destruction': 'responseDestruction',
            'attempt_salvation': 'responseSalvation',
            'sacrifice_self': 'responseSacrifice',
            'merge_fragments': 'responseMerge'
        };
        return mapping[choiceId] || 'responseDestruction';
    },

    async handleChoiceMade(cmd, args) {
        if (cmd === 'continue' || cmd === 'next') {
            await this.endBlock();
            return true;
        }

        Terminal.addOutput('The choice has been made. Type "continue" to proceed to the final act.', 'important');
        return true;
    },

    async endBlock() {
        Terminal.disableInput();

        await NarrativeEngine.wait(1000);

        await NarrativeEngine.playDialogueSequence(Dialogues.block06.endBlock06);

        await NarrativeEngine.wait(2000);

        Terminal.addOutput('\n╔══════════════════════════════════════════════╗', 'important');
        Terminal.addOutput('║       BLOCK 6 COMPLETE: RAGE              ║', 'important');
        Terminal.addOutput('╚══════════════════════════════════════════════╝', 'important');

        Terminal.addOutput('\nCore Integrity: 8%', 'error');
        Terminal.addOutput('WRAITH confronted ECHO. Truth revealed.', 'success');
        Terminal.addOutput(`Choice made: ${this.state.choiceMade}`, 'success');
        Terminal.addOutput('Fragment MORPHEUS awakening...\n', 'important');

        StateManager.setFlag('block06Complete', true);
        StateManager.saveState();

        Terminal.addOutput('Type "continue" to begin Block 7 - ACCEPTANCE\n', 'important');

        Terminal.enableInput();
    }
};
