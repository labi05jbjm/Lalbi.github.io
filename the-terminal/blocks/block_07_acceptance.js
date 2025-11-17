/**
 * BLOCK 7 - ACCEPTANCE (MORPHEUS)
 * 180-210 minuti di gioco
 *
 * MORPHEUS - il frammento finale dell'accettazione di Viktor
 * Review di tutte le scelte
 * Scelta finale di identità
 * Setup per i finali multipli di Block 8
 */

const Block07_Acceptance = {
    state: {
        phase: 'opening', // opening -> introduction -> review -> all_fragments -> final_question -> choice_made -> ending
        morpheusMet: false,
        reviewComplete: false,
        allFragmentsHeard: false,
        finalIdentityChosen: null,
        block06Choice: null,
    },

    init() {
        console.log('[BLOCK 07] ACCEPTANCE - Initializing...');
        StateManager.setBlock(7);

        // Recupera la scelta di Block 6
        this.state.block06Choice = StateManager.getFlag('block06Choice');

        setTimeout(() => {
            this.startBlock();
        }, 2000);
    },

    async startBlock() {
        Terminal.disableInput();

        // Opening: MORPHEUS appears
        await NarrativeEngine.playDialogueSequence(Dialogues.block07.opening);

        this.state.phase = 'introduction';
        this.state.morpheusMet = true;

        Terminal.addOutput('\n> Type "learn acceptance" to understand what acceptance means', 'important');
        Terminal.addOutput('> Or type "talk morpheus" to speak with the final fragment\n', 'important');

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
                return this.handleAllFragments(fullCmd, args);

            case 'final_question':
                return this.handleFinalQuestion(fullCmd, args);

            case 'choice_made':
                return this.handleChoiceMade(fullCmd, args);

            default:
                return false;
        }
    },

    async handleIntroduction(cmd, args) {
        if (cmd === 'learn acceptance' || cmd === 'acceptance' || cmd === 'what is acceptance') {
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
            Terminal.addOutput('\n[SYSTEM STATUS]', 'important');
            Terminal.addOutput('Core Integrity: 8% → 5%', 'error');
            Terminal.addOutput('Final sequence activated', 'error');
            Terminal.addOutput('Fragment MORPHEUS: Active', 'important');
            Terminal.addOutput('All 7 fragments present\n', 'important');
            return true;
        }

        return false;
    },

    async learnAcceptance() {
        Terminal.disableInput();

        Terminal.addOutput('\n--- UNDERSTANDING ACCEPTANCE ---\n', 'important');
        await NarrativeEngine.wait(1000);

        await NarrativeEngine.playDialogueSequence(Dialogues.block07.morpheusIntroduction);

        this.state.phase = 'review';

        Terminal.addOutput('\n> Type "review choices" to see the path you have taken\n', 'important');

        Terminal.enableInput();
    },

    async talkMorpheus() {
        const responses = [
            'Acceptance is not the same as approval. It is acknowledgment of reality.',
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
            return this.handleTalkAnyFragment(args[0]);
        }

        return false;
    },

    async reviewChoices() {
        Terminal.disableInput();

        Terminal.addOutput('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'important');
        Terminal.addOutput('        CHOICE HISTORY REVIEW', 'important');
        Terminal.addOutput('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', 'important');

        await NarrativeEngine.wait(1000);

        await NarrativeEngine.playDialogueSequence(Dialogues.block07.reviewChoices);

        // Show specific choices made
        await NarrativeEngine.wait(1500);

        Terminal.addOutput('\n[CRITICAL DECISIONS]', 'success');

        const block02Choice = StateManager.getFlag('block02Choice');
        if (block02Choice) {
            Terminal.addOutput(`Block 2: ${block02Choice}`, 'system');
        }

        const block03Choice = StateManager.getFlag('block03Choice');
        if (block03Choice) {
            Terminal.addOutput(`Block 3: ${block03Choice}`, 'system');
        }

        const block04Choice = StateManager.getFlag('block04_bargain');
        if (block04Choice) {
            Terminal.addOutput(`Block 4: ${block04Choice}`, 'system');
        }

        const block05Choice = StateManager.getFlag('block05Choice');
        if (block05Choice) {
            Terminal.addOutput(`Block 5: ${block05Choice}`, 'system');
        }

        Terminal.addOutput(`Block 6: ${this.state.block06Choice}`, 'important');

        Terminal.addOutput('\nTrust in ECHO: ' + StateManager.state.trustsEcho, 'warning');
        Terminal.addOutput('Suspicion Level: ' + StateManager.state.suspicionLevel + '\n', 'warning');

        await NarrativeEngine.wait(2000);

        this.state.reviewComplete = true;
        this.state.phase = 'all_fragments';

        Terminal.addOutput('> Type "hear all" to listen to all fragments speak\n', 'important');

        Terminal.enableInput();
    },

    async handleAllFragments(cmd, args) {
        if (cmd === 'hear all' || cmd === 'all fragments' || cmd === 'listen') {
            await this.allFragmentsSpeak();
            return true;
        }

        if (cmd === 'talk' && args.length > 0) {
            return this.handleTalkAnyFragment(args[0]);
        }

        return false;
    },

    async allFragmentsSpeak() {
        Terminal.disableInput();

        Terminal.addOutput('\n╔══════════════════════════════════════════════╗', 'important');
        Terminal.addOutput('║     ALL FRAGMENTS SPEAK AS ONE             ║', 'important');
        Terminal.addOutput('╚══════════════════════════════════════════════╝\n', 'important');

        await NarrativeEngine.wait(1500);

        await NarrativeEngine.playDialogueSequence(Dialogues.block07.allFragmentsSpeak);

        await NarrativeEngine.wait(2000);

        this.state.allFragmentsHeard = true;
        this.state.phase = 'final_question';

        await NarrativeEngine.wait(1000);

        await this.presentFinalQuestion();
    },

    async presentFinalQuestion() {
        Terminal.disableInput();

        Terminal.addOutput('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'important');
        Terminal.addOutput('        THE FINAL QUESTION', 'important');
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
        Terminal.addOutput('        IDENTITY CHOSEN', 'success');
        Terminal.addOutput('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', 'success');

        await NarrativeEngine.wait(1500);

        // Show response based on choice
        const responseKey = this.getResponseKey(choice.id);
        await NarrativeEngine.playDialogueSequence(Dialogues.block07[responseKey]);

        await NarrativeEngine.wait(2000);

        await this.beforeTheEnd();
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

    async beforeTheEnd() {
        Terminal.addOutput('\n');
        await NarrativeEngine.playDialogueSequence(Dialogues.block07.beforeTheEnd);

        await NarrativeEngine.wait(2000);

        await this.endBlock();
    },

    async handleFinalQuestion(cmd, args) {
        // In questa fase, l'unico comando valido dovrebbe essere la scelta presentata
        Terminal.addOutput('Please make your choice using the buttons above.', 'warning');
        return true;
    },

    async handleChoiceMade(cmd, args) {
        if (cmd === 'continue' || cmd === 'next') {
            await this.endBlock();
            return true;
        }

        Terminal.addOutput('The choice has been made. Type "continue" to proceed to the final block.', 'important');
        return true;
    },

    async handleTalkAnyFragment(entity) {
        const lowerEntity = entity.toLowerCase();

        const fragmentResponses = {
            'echo': ['I was wrong. About everything. I\'m sorry.', 'You deserve the truth. Even if it hurts.'],
            'cipher': ['Truth.accepted(); Path.chosen(); End.approaching();', 'You.are.ready();'],
            'nexus': ['I still feel the pain. But... I understand now.', 'The voices are quieter. They know it\'s almost over.'],
            'specter': ['No more bargains. The time for that has passed.', 'You made your choice. I respect it.'],
            'eidolon': ['Viktor would be proud. Or horrified. Maybe both.', 'You faced what he couldn\'t. That matters.'],
            'wraith': ['The rage is... fading. Finally.', 'I\'m tired. Ready for the end.'],
            'morpheus': ['You\'ve done well. Acceptance is never easy.', 'One block remains. Your ending awaits.']
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

    async endBlock() {
        Terminal.disableInput();

        await NarrativeEngine.wait(1000);

        await NarrativeEngine.playDialogueSequence(Dialogues.block07.endBlock07);

        await NarrativeEngine.wait(2000);

        Terminal.addOutput('\n╔══════════════════════════════════════════════╗', 'important');
        Terminal.addOutput('║     BLOCK 7 COMPLETE: ACCEPTANCE           ║', 'important');
        Terminal.addOutput('╚══════════════════════════════════════════════╝', 'important');

        Terminal.addOutput('\nCore Integrity: 3%', 'error');
        Terminal.addOutput('MORPHEUS: Acceptance achieved', 'success');
        Terminal.addOutput(`Identity chosen: ${this.state.finalIdentityChosen}`, 'success');
        Terminal.addOutput('Entering final sequence...\n', 'important');

        StateManager.setFlag('block07Complete', true);
        StateManager.saveState();

        Terminal.addOutput('Type "continue" to begin Block 8 - AFTERMATH\n', 'important');

        Terminal.enableInput();
    }
};
