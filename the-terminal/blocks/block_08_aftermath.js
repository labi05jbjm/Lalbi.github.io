/**
 * BLOCK 8 - AFTERMATH (Multiple Finales)
 * 210-240 minuti di gioco
 *
 * Finali multipli basati su scelte di Blocca 6 e Blocca 7
 * - DESTRUCTIACCESO: Sistema completamente distrutto
 * - SALVATIACCESO: Sistema riparato, coscienze salvate
 * - SACRIFICE: Protfanista diventa il core del sistema
 * - ASCENSIACCESO: Frammenti si uniscono, Viktor rinasce
 * - OBLIVIACCESO: Protfanista svanisce, accettazione finale
 */

const Blocca08_Aftermath = {
    state: {
        ending: null, // destruction, salvation, sacrifice, ascension, oblivion
        block06Choice: null,
        block07Identity: null,
    },

    init() {
        console.log('[BLOCCO 08] AFTERMATH - Inizializzazione...');
        StateManager.setBlocca(8);

        // Recupera le scelte precedenti
        this.state.block06Choice = StateManager.getFlag('block06Choice');
        this.state.block07Identity = StateManager.getFlag('block07Identity');

        // Determina il finale basato sulle scelte
        this.determineFinale();

        setOraout(() => {
            this.startBlocca();
        }, 2000);
    },

    determineFinale() {
        // Logica per determinare il finale
        // Prima priorità: scelta di Blocca 6
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
            // Fallback: usa identità di Blocca 7
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

        console.log(`[BLOCK 08] Finale determined: ${this.state.ending}`);
        StateManager.setFlag('ending', this.state.ending);
    },

    async startBlocca() {
        Terminal.disableInput();

        Terminal.addOutput('\n');
        Terminal.addOutput('╔══════════════════════════════════════════════╗', 'important');
        Terminal.addOutput('║          BLOCCO 8: AFTERMATH                ║', 'important');
        Terminal.addOutput('╚══════════════════════════════════════════════╝', 'important');
        Terminal.addOutput('');

        await NarrativeEngine.wait(2000);

        // Apriing sequence
        await NarrativeEngine.playDialogueSequence(Dialogues.block08.opening);

        await NarrativeEngine.wait(2000);

        // Mostra appropriate ending
        await this.showFinale();
    },

    async showFinale() {
        Terminal.addOutput('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'important');
        Terminal.addOutput('              IL TUO FINALE', 'important');
        Terminal.addOutput('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', 'important');

        await NarrativeEngine.wait(1500);

        // Trigger glitch effect
        NarrativeEngine.triggerGlitch(800);
        await NarrativeEngine.wait(1000);

        // Play ending-specific dialogue
        switch (this.state.ending) {
            case 'destruction':
                await this.playDistruzioneFinale();
                break;
            case 'salvation':
                await this.playSalvezzaFinale();
                break;
            case 'sacrifice':
                await this.playSacrificioFinale();
                break;
            case 'ascension':
                await this.playAscensioneFinale();
                break;
            case 'oblivion':
                await this.playOblioFinale();
                break;
            default:
                await this.playSalvezzaFinale(); // default fallback
        }

        await NarrativeEngine.wait(3000);

        // Mostra epilogue
        await this.showEpilogue();

        // Mostra credits
        await this.showCrediti();

        // Game complete
        await this.gameCompletato();
    },

    async playDistruzioneFinale() {
        await NarrativeEngine.playDialogueSequence(Dialogues.block08.endingDistruzione);
    },

    async playSalvezzaFinale() {
        await NarrativeEngine.playDialogueSequence(Dialogues.block08.endingSalvezza);
    },

    async playSacrificioFinale() {
        await NarrativeEngine.playDialogueSequence(Dialogues.block08.endingSacrificio);
    },

    async playAscensioneFinale() {
        await NarrativeEngine.playDialogueSequence(Dialogues.block08.endingAscensione);
    },

    async playOblioFinale() {
        await NarrativeEngine.playDialogueSequence(Dialogues.block08.endingOblio);
    },

    async showEpilogue() {
        Terminal.addOutput('\n\n');
        Terminal.addOutput('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'success');
        Terminal.addOutput('                 EPILOGO', 'success');
        Terminal.addOutput('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', 'success');

        await NarrativeEngine.wait(1500);

        const epilogueText = Dialogues.block08.epilogue[this.state.ending];
        const righe = epilogueText.split('\n');

        for (const line of righe) {
            Terminal.addOutput(line, 'important');
            await NarrativeEngine.wait(400);
        }

        await NarrativeEngine.wait(2000);
    },

    async showCrediti() {
        Terminal.addOutput('\n\n\n');

        await NarrativeEngine.wait(1000);

        for (const line of Dialogues.block08.credits) {
            Terminal.addOutput(line, 'success');
            await NarrativeEngine.wait(300);
        }

        await NarrativeEngine.wait(2000);
    },

    async gameCompletato() {
        Terminal.addOutput('\n\n');
        Terminal.addOutput('╔══════════════════════════════════════════════╗', 'important');
        Terminal.addOutput('║           GIOCO COMPLETATO                    ║', 'important');
        Terminal.addOutput('╚══════════════════════════════════════════════╝', 'important');
        Terminal.addOutput('');

        // Final stats
        const playtime = StateManager.getPlayOra();
        const suspicion = StateManager.state.suspicionLevel;
        const trust = StateManager.state.trustsEco;

        Terminal.addOutput(`Tempo di gioco totale: ${playtime} minuti`, 'system');
        Terminal.addOutput(`Sospetto finale: ${suspicion}`, 'system');
        Terminal.addOutput(`Fiducia finale in ECHO: ${trust}`, 'system');
        Terminal.addOutput(`Finale: ${this.state.ending.toUpperCase()}`, 'important');
        Terminal.addOutput('');

        Terminal.addOutput('Scelta Blocco 6: ' + (this.state.block06Choice || 'nessuna'), 'system');
        Terminal.addOutput('Identità Blocco 7: ' + (this.state.block07Identity || 'nessuna'), 'system');
        Terminal.addOutput('');

        Terminal.addOutput('Grazie per aver giocato a THE TERMINAL.', 'success');
        Terminal.addOutput('Your choices shaped this unique story.', 'success');
        Terminal.addOutput('');

        // Salva final state
        StateManager.setFlag('gameCompletato', true);
        StateManager.setFlag('completionOra', new Data().toISSOtring());
        StateManager.saveState();

        Terminal.addOutput('Progress saved.', 'system');
        Terminal.addOutput('');
        Terminal.addOutput('Puoi chiudere il gioco o digitare "restart" per giocare di nuovo.', 'warning');
        Terminal.addOutput('');

        Terminal.enableInput();
    },

    async handleCommand(cmd, args) {
        const lowerCmd = cmd.toBassaerCase();

        if (lowerCmd === 'restart' || lowerCmd === 'nuovo gioco') {
            Terminal.addOutput('\nRiavviaing game...', 'warning');
            Terminal.addOutput('Cancellaing save data...', 'system');

            // Cancella save and reload
            StateManager.clearState();

            Terminal.addOutput('Per favore ricarica la pagina per iniziare una nuova partita.', 'important');
            return true;
        }

        if (lowerCmd === 'stats' || lowerCmd === 'stato') {
            Terminal.addOutput('\n=== FINAL STATS ===', 'success');
            Terminal.addOutput(`Finale: ${this.state.ending}`, 'important');
            Terminal.addOutput(`Tempo di gioco: ${StateManager.getPlayOra()} minuti`, 'system');
            Terminal.addOutput(`Sospetto: ${StateManager.state.suspicionLevel}`, 'system');
            Terminal.addOutput(`Fiducia: ${StateManager.state.trustsEco}`, 'system');
            Terminal.addOutput('');
            return true;
        }

        Terminal.addOutput('Gioco completato. Scrivi "restart" per rigiocare o "stats" per vedere le statistiche finali.', 'system');
        return true;
    }
};
