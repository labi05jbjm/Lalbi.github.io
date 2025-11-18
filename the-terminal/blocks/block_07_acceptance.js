/**
 * BLOCK 7 - ACCEPTANCE (MORPHEUS)
 * 180-210 minuti di gioco
 *
 * MORPHEUS - il frammento finale dell'accettazione di Viktor
 * Review di tutte le scelte
 * Scelta finale di identità
 * Setup per i finali multipli di Blocca 8
 */

const Blocca07_Accettaance = {
    state: {
        phase: 'opening', // opening -> introduction -> review -> all_fragments -> final_question -> choice_made -> ending
        morpheusMet: false,
        reviewComplete: false,
        allFrammentosHeard: false,
        finalIdentityChosen: null,
        block06Choice: null,
    },

    init() {
        console.log('[BLOCCO 07] ACCEPTANCE - Inizializzazione...');
        StateManager.setBlocca(7);

        // Recupera la scelta di Blocca 6
        this.state.block06Choice = StateManager.getFlag('block06Choice');

        setTimeout(() => {
            this.startBlock();
        }, 2000);
    },

    async startBlock() {
        Terminal.disableInput();

        // Apriing: MORPHEUS appears
        await NarrativeEngine.playDialogueSequence(Dialogues.block07.opening);

        this.state.phase = 'introduction';
        this.state.morpheusMet = true;

        Terminal.addOutput('\n> Scrivi "learn acceptance" per capire cosa significa l\'accettazione', 'important');
        Terminal.addOutput('> O digita "talk morpheus" per parlare con il frammento finale\n', 'important');

        Terminal.enableInput();
    },

    async handleCommand(cmd, args) {
        const fullCmd = cmd.toLowerCase();

        // Handle commands based on phase
        switch (this.state.phase) {
            case 'introduction':
                return this.handleIntroduction(fullCmd, args);

            case 'review':
                return this.handleReview(fullCmd, args);

            case 'all_fragments':
                return this.handleAllFrammentos(fullCmd, args);

            case 'final_question':
                return this.handleFinalQuestion(fullCmd, args);

            case 'choice_made':
                return this.handleChoiceMade(fullCmd, args);

            default:
                return false;
        }
    },

    async handleIntroduction(cmd, args) {
        if (cmd === 'learn acceptance' || cmd === 'acceptance' || cmd === "cos'è l'accettazione") {
            await this.learnAcceptance();
            return true;
        }

        if (cmd === 'talk' && args.length > 0) {
            const entity = args[0].toLowerCase();
            if (entity === 'morpheus') {
                await this.talkMorpheus();
                return true;
            }
        }

        if (cmd === 'status' || cmd === 'system status') {
            Terminal.addOutput('\n[STATO SISTEMA]', 'important');
            Terminal.addOutput('Integrità Nucleo: 8% → 5%', 'error');
            Terminal.addOutput('Sequenza finale attivata', 'error');
            Terminal.addOutput('Frammento MORPHEUS: Attivo', 'important');
            Terminal.addOutput('Tutti e 7 frammenti presenti\n', 'important');
            return true;
        }

        return false;
    },

    async learnAcceptance() {
        Terminal.disableInput();

        Terminal.addOutput('\n--- COMPRENDERE L\'ACCETTAZIACCESOE ---\n', 'important');
        await NarrativeEngine.wait(1000);

        await NarrativeEngine.playDialogueSequence(Dialogues.block07.morpheusIntroduction);

        this.state.phase = 'review';

        Terminal.addOutput('\n> Scrivi "review choices" per vedere il percorso che hai intrapreso\n', 'important');

        Terminal.enableInput();
    },

    async talkMorpheus() {
        const responses = [
            'Accettaance is not the same as approval. It is acknowledgment of reality.',
            'Viktor could never reach this stage. He fragmented before he could accept.',
            'You have a choice he never had. To face the truth and move forward.',
            'I am calm because I have accepted. The rage, the pain, the loss - all of it.',
            'The end is coming. But how you meet it defines who you are.'
        ];

        const response = responses[Math.floor(Math.random() * responses.length)];
        await NarrativeEngine.morpheusSays(response);
    },

    async handleReview(cmd, args) {
        if (cmd === 'review choices' || cmd === 'review' || cmd === 'show choices') {
            await this.reviewChoices();
            return true;
        }

        if (cmd === 'talk' && args.length > 0) {
            return this.handleTalkAnyFrammento(args[0]);
        }

        return false;
    },

    async reviewChoices() {
        Terminal.disableInput();

        Terminal.addOutput('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'important');
        Terminal.addOutput('        RICONFIROTO CRACCESOOLOGIA SCELTE', 'important');
        Terminal.addOutput('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', 'important');

        await NarrativeEngine.wait(1000);

        await NarrativeEngine.playDialogueSequence(Dialogues.block07.reviewChoices);

        // Mostra specific choices made
        await NarrativeEngine.wait(1500);

        Terminal.addOutput('\n[CRITICAL DECISIACCESSO]', 'success');

        const block02Choice = StateManager.getFlag('block02Choice');
        if (block02Choice) {
            Terminal.addOutput(`Blocco 2: ${block02Choice}`, 'system');
        }

        const block03Choice = StateManager.getFlag('block03Choice');
        if (block03Choice) {
            Terminal.addOutput(`Blocco 3: ${block03Choice}`, 'system');
        }

        const block04Choice = StateManager.getFlag('block04_bargain');
        if (block04Choice) {
            Terminal.addOutput(`Blocco 4: ${block04Choice}`, 'system');
        }

        const block05Choice = StateManager.getFlag('block05Choice');
        if (block05Choice) {
            Terminal.addOutput(`Blocco 5: ${block05Choice}`, 'system');
        }

        Terminal.addOutput(`Blocco 6: ${this.state.block06Choice}`, 'important');

        Terminal.addOutput('\nTrust in ECHO: ' + StateManager.state.trustsEco, 'warning');
        Terminal.addOutput('Suspicion Level: ' + StateManager.state.suspicionLevel + '\n', 'warning');

        await NarrativeEngine.wait(2000);

        this.state.reviewComplete = true;
        this.state.phase = 'all_fragments';

        Terminal.addOutput('> Scrivi "hear all" per ascoltare tutti i frammenti parlare\n', 'important');

        Terminal.enableInput();
    },

    async handleAllFrammentos(cmd, args) {
        if (cmd === 'hear all' || cmd === 'all fragments' || cmd === 'listen') {
            await this.allFrammentosSpeak();
            return true;
        }

        if (cmd === 'talk' && args.length > 0) {
            return this.handleTalkAnyFrammento(args[0]);
        }

        return false;
    },

    async allFrammentosSpeak() {
        Terminal.disableInput();

        Terminal.addOutput('\n╔══════════════════════════════════════════════╗', 'important');
        Terminal.addOutput('║     ALL FRAGMENTS SPEAK AS ACCESOE             ║', 'important');
        Terminal.addOutput('╚══════════════════════════════════════════════╝\n', 'important');

        await NarrativeEngine.wait(1500);

        await NarrativeEngine.playDialogueSequence(Dialogues.block07.allFrammentosSpeak);

        await NarrativeEngine.wait(2000);

        this.state.allFrammentosHeard = true;
        this.state.phase = 'final_question';

        await NarrativeEngine.wait(1000);

        await this.presentFinalQuestion();
    },

    async presentFinalQuestion() {
        Terminal.disableInput();

        Terminal.addOutput('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'important');
        Terminal.addOutput('        THE FINAL QUESTIACCESO', 'important');
        Terminal.addOutput('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', 'important');

        await NarrativeEngine.wait(1500);

        await NarrativeEngine.playDialogueSequence(Dialogues.block07.theQuestion);

        await NarrativeEngine.wait(2000);

        // Present the identity choice
        this.presentIdentityChoice();
    },

    presentIdentityChoice() {
        const choice = Dialogues.block07.finalChoice;

        NarrativeEngine.showChoice(
            choice.question,
            choice.choices,
            (selectedChoice) => {
                this.handleIdentityChoice(selectedChoice);
            }
        );
    },

    async handleIdentityChoice(choice) {
        Terminal.disableInput();

        this.state.finalIdentityChosen = choice.id;
        this.state.phase = 'choice_made';
        StateManager.setFlag('block07Identity', choice.id);

        Terminal.addOutput('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'success');
        Terminal.addOutput('        IDENTITY CHSOEN', 'success');
        Terminal.addOutput('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', 'success');

        await NarrativeEngine.wait(1500);

        // Mostra response based on choice
        const responseKey = this.getResponseKey(choice.id);
        await NarrativeEngine.playDialogueSequence(Dialogues.block07[responseKey]);

        await NarrativeEngine.wait(2000);

        await this.beforeTheFine();
    },

    getResponseKey(choiceId) {
        const mapping = {
            'guardian': 'responseGuardian',
            'viktor': 'responseViktor',
            'hybrid': 'responseHybrid',
            'nothing': 'responseNothing'
        };
        return mapping[choiceId] || 'responseHybrid';
    },

    async beforeTheFine() {
        Terminal.addOutput('\n');
        await NarrativeEngine.playDialogueSequence(Dialogues.block07.beforeTheFine);

        await NarrativeEngine.wait(2000);

        await this.endBlocca();
    },

    async handleFinalQuestion(cmd, args) {
        // In questa fase, l'unico comando valido dovrebbe essere la scelta presentata
        Terminal.addOutput('Please make your choice using the buttons above.', 'warning');
        return true;
    },

    async handleChoiceMade(cmd, args) {
        if (cmd === 'continue' || cmd === 'next') {
            await this.endBlocca();
            return true;
        }

        Terminal.addOutput('La scelta è stata fatta. Scrivi "continue" per procedere al blocco finale.', 'important');
        return true;
    },

    async handleTalkAnyFrammento(entity) {
        const lowerEntity = entity.toLowerCase();

        const fragmentResponses = {
            'echo': ['I was wrong. Circa everything. I\'m sorry.', 'You deserve the truth. Even if it hurts.'],
            'cipher': ['Truth.accepted(); Path.chosen(); Fine.approaching();', 'You.are.ready();'],
            'nexus': ['I still feel the pain. But... I understand now.', 'The voices are quieter. They know it\'s almost over.'],
            'specter': ['No more bargains. The time for that has passed.', 'You made your choice. I respect it.'],
            'eidolon': ['Viktor would be proud. Or horrified. Forse both.', 'You faced what he couldn\'t. That matters.'],
            'wraith': ['The rage is... fading. Finalmente.', 'I\'m tired. Pronto for the end.'],
            'morpheus': ['You\'ve done well. Accettaance is never easy.', 'One block remains. Your ending awaits.']
        };

        if (fragmentResponses[lowerEntity]) {
            const responses = fragmentResponses[lowerEntity];
            const response = responses[Math.floor(Math.random() * responses.length)];

            switch (lowerEntity) {
                case 'echo': await NarrativeEngine.echoSays(response); break;
                case 'cipher': await NarrativeEngine.cipherSays(response); break;
                case 'nexus': await NarrativeEngine.nexusSays(response); break;
                case 'specter': await NarrativeEngine.specterSays(response); break;
                case 'eidolon': await NarrativeEngine.eidolonSays(response); break;
                case 'wraith': await NarrativeEngine.wraithSays(response, { glitch: false }); break;
                case 'morpheus': await NarrativeEngine.morpheusSays(response); break;
            }
            return true;
        }

        Terminal.addOutput(`Cannot talk to '${entity}'. Try: echo, cipher, nexus, specter, eidolon, wraith, morpheus`, 'error');
        return true;
    },

    async endBlocca() {
        Terminal.disableInput();

        await NarrativeEngine.wait(1000);

        await NarrativeEngine.playDialogueSequence(Dialogues.block07.endBlocca07);

        await NarrativeEngine.wait(2000);

        Terminal.addOutput('\n╔══════════════════════════════════════════════╗', 'important');
        Terminal.addOutput('║     BLOCK 7 COMPLETE: ACCEPTANCE           ║', 'important');
        Terminal.addOutput('╚══════════════════════════════════════════════╝', 'important');

        Terminal.addOutput('\nIntegrità Nucleo: 3%', 'error');
        Terminal.addOutput('MORPHEUS: Accettaance achieved', 'success');
        Terminal.addOutput(`Identity chosen: ${this.state.finalIdentityChosen}`, 'success');
        Terminal.addOutput('Entering final sequence...\n', 'important');

        StateManager.setFlag('block07Complete', true);
        StateManager.saveState();

        Terminal.addOutput('Scrivi "continue" per iniziare il Blocco 8 - AFTERMATH\n', 'important');

        Terminal.enableInput();
    }
};
