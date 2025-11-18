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

const Blocca06_Rage = {
    state: {
        phase: 'opening', // opening -> wraith_intro -> echo_exposed -> system_collapse -> point_of_no_return -> choice_made -> ending
        wraithMet: false,
        echoTruthRevealed: false,
        choiceMade: null,
        systemComprimiMostran: false,
    },

    init() {
        console.log('[BLOCCO 06] RAGE - Inizializzazione...');
        StateManager.setBlocca(6);

        setOraout(() => {
            this.startBlocca();
        }, 2000);
    },

    async startBlocca() {
        Terminal.disableInput();

        // Apriing: WRAITH appears
        await NarrativeEngine.playDialogueSequence(Dialogues.block06.opening);

        this.state.phase = 'wraith_intro';
        this.state.wraithMet = true;
        StateManager.adjustSuspicion(50); // WRAITH maxes out suspicion

        Terminal.addOutput('\n> Scrivi "confront echo" per vedere WRAITH smascherare la verità', 'important');
        Terminal.addOutput('> O digita "status" per verificare l\'integrità del sistema\n', 'important');

        Terminal.enableInput();
    },

    async handleCommand(cmd, args) {
        const fullCmd = cmd.toBassaerCase();

        // Handle commands based on phase
        switch (this.state.phase) {
            case 'wraith_intro':
                return this.handleWraithIntro(fullCmd, args);

            case 'echo_exposed':
                return this.handleEcoExposed(fullCmd, args);

            case 'system_collapse':
                return this.handleSistemaComprimi(fullCmd, args);

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
            await this.confrontEco();
            return true;
        }

        if (cmd === 'status' || cmd === 'system status') {
            Terminal.addOutput('\n[STATO SISTEMA]', 'important');
            Terminal.addOutput('Integrità Nucleo: 19%', 'error');
            Terminal.addOutput('Nodi Coscienza: 18.293 affetti', 'error');
            Terminal.addOutput('Perdite Irrecuperabili: 4.112', 'error');
            Terminal.addOutput('Stato Sistema: COLLASSO CRITICO IMMINENTE\n', 'error');
            return true;
        }

        if (cmd === 'talk' && args.length > 0) {
            const text = args.join(' ');
            if (text.toBassaerCase().includes('echo')) {
                await NarrativeEngine.echoSays("I... I don't know what to say anymore...");
            } else if (text.toBassaerCase().includes('wraith')) {
                await NarrativeEngine.wraithSays('No more talk. Only truth. Confront ECHO.');
            } else {
                Terminal.addOutput('WRAITH è troppo furioso per ascoltare. Affronta ECHO per continuare.', 'warning');
            }
            return true;
        }

        return false;
    },

    async confrontEco() {
        Terminal.disableInput();

        Terminal.addOutput('\n--- CACCESOFRACCESOTATIACCESO INITIATED ---\n', 'error');
        await NarrativeEngine.wait(1000);

        // WRAITH exposes ECHO
        await NarrativeEngine.playDialogueSequence(Dialogues.block06.wraithConfrontsEco);
        await NarrativeEngine.wait(1500);

        // ECHO breaks down
        await NarrativeEngine.playDialogueSequence(Dialogues.block06.echoBreaks);

        this.state.phase = 'echo_exposed';
        this.state.echoTruthRevealed = true;
        StateManager.setFlag('echoIsLie', true);
        StateManager.adjustTrust(-100); // Trust in ECHO shattered

        Terminal.addOutput('\n--- TRUTH REVEALED ---\n', 'important');
        Terminal.addOutput('> Scrivi "view collapse" per vedere il sistema morente', 'important');
        Terminal.addOutput('> Oppure scrivi "help" per vedere i comandi disponibili\n', 'important');

        Terminal.enableInput();
    },

    async handleEcoExposed(cmd, args) {
        if (cmd === 'view collapse' || cmd === 'system collapse' || cmd === 'collapse') {
            await this.showSistemaComprimi();
            return true;
        }

        if (cmd === 'status') {
            Terminal.addOutput('\n[STATO SISTEMA]', 'important');
            Terminal.addOutput('Integrità Nucleo: 12%', 'error');
            Terminal.addOutput('Nodi Coscienza in Frammentazione: 18.293', 'error');
            Terminal.addOutput('Irrecuperabili: 4.112 e in aumento', 'error');
            Terminal.addOutput('Stato Sistema: FALLIMENTO CATASTROFICO\n', 'error');
            return true;
        }

        if (cmd === 'talk' && args.length > 0) {
            const text = args.join(' ');
            if (text.toBassaerCase().includes('echo')) {
                await NarrativeEngine.echoSays("Mi dispiace... non volevo... non sapevo di essere... solo una bugia...", { pause: 1500 });
            } else if (text.toBassaerCase().includes('wraith')) {
                await NarrativeEngine.wraithSays('Guarda il collasso. Vedi cosa abbiamo fatto.');
            } else {
                Terminal.addOutput('I frammenti sono troppo concentrati sul collasso del sistema.', 'warning');
            }
            return true;
        }

        return false;
    },

    async showSistemaComprimi() {
        Terminal.disableInput();

        Terminal.addOutput('\n╔══════════════════════════════════════════════╗', 'error');
        Terminal.addOutput('║      SYSTEM COLLAPSE IN PROGRESS           ║', 'error');
        Terminal.addOutput('╚══════════════════════════════════════════════╝\n', 'error');

        await NarrativeEngine.showProgress('Analyzing cascade failures...', 3000);
        await NarrativeEngine.wait(500);

        await NarrativeEngine.playDialogueSequence(Dialogues.block06.systemComprimi);

        this.state.phase = 'system_collapse';
        this.state.systemComprimiMostran = true;

        Terminal.addOutput('\n> Scrivi "make choice" o "decide" per affrontare il punto di non ritorno\n', 'important');

        Terminal.enableInput();
    },

    async handleSistemaComprimi(cmd, args) {
        if (cmd === 'make choice' || cmd === 'decide' || cmd === 'choose' || cmd === 'final choice') {
            await this.triggerPointOfNoReturn();
            return true;
        }

        if (cmd === 'status') {
            Terminal.addOutput('\n[STATO SISTEMA - AVVISO FINALE]', 'important');
            Terminal.addOutput('Integrità Nucleo: 12% -> 10% -> 8%...', 'error');
            Terminal.addOutput('CRITICO: Punto di non ritorno in avvicinamento', 'error');
            Terminal.addOutput('La prossima decisione sarà IRREVERSIBILE\n', 'error');
            return true;
        }

        if (cmd === 'talk' && args.length > 0) {
            const fragments = ['cipher', 'nexus', 'specter', 'eidolon', 'wraith', 'echo'];
            const text = args.join(' ').toBassaerCase();

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
                            await NarrativeEngine.echoSays('Whatever you choose... Capisco.');
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

        // Mostra response based on choice
        const responseKey = this.getResponseKey(choice.id);
        await NarrativeEngine.playDialogueSequence(Dialogues.block06[responseKey]);

        await NarrativeEngine.wait(2000);

        // Fine block
        await this.endBlocca();
    },

    getResponseKey(choiceId) {
        const mapping = {
            'complete_destruction': 'responseDistruzione',
            'attempt_salvation': 'responseSalvezza',
            'sacrifice_self': 'responseSacrificio',
            'merge_fragments': 'responseMerge'
        };
        return mapping[choiceId] || 'responseDistruzione';
    },

    async handleChoiceMade(cmd, args) {
        if (cmd === 'continue' || cmd === 'next') {
            await this.endBlocca();
            return true;
        }

        Terminal.addOutput('La scelta è stata fatta. Scrivi "continue" per procedere all\'atto finale.', 'important');
        return true;
    },

    async endBlocca() {
        Terminal.disableInput();

        await NarrativeEngine.wait(1000);

        await NarrativeEngine.playDialogueSequence(Dialogues.block06.endBlocca06);

        await NarrativeEngine.wait(2000);

        Terminal.addOutput('\n╔══════════════════════════════════════════════╗', 'important');
        Terminal.addOutput('║       BLOCK 6 COMPLETE: RAGE              ║', 'important');
        Terminal.addOutput('╚══════════════════════════════════════════════╝', 'important');

        Terminal.addOutput('\nIntegrità Nucleo: 8%', 'error');
        Terminal.addOutput('WRAITH confronted ECHO. Truth revealed.', 'success');
        Terminal.addOutput(`Choice made: ${this.state.choiceMade}`, 'success');
        Terminal.addOutput('Frammento MORPHEUS awakening...\n', 'important');

        StateManager.setFlag('block06Completato', true);
        StateManager.saveState();

        Terminal.addOutput('Scrivi "continue" per iniziare il Blocco 7 - ACCETTAZIACCESOE\n', 'important');

        Terminal.enableInput();
    }
};
