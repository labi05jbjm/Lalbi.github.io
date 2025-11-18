/**
 * PUZZLES DATABASE
 * Puzzle e mini-giochi del gioco
 */

const Puzzles = {
    // BLOCK 1 PUZZLES
    block01: {
        firstDecryption: {
            id: 'first_decryption',
            name: () => TranslationSistema.t('puzzles', 'firstDecryption', 'name'),
            description: () => TranslationSistema.t('puzzles', 'firstDecryption', 'description'),
            difficulty: 'easy',
            type: 'pattern_matching',

            // Il puzzle: trovare il pattern nella sequenza
            get challenge() {
                const langData = TranslationSistema.t('puzzles', 'firstDecryption', 'challenge');
                return {
                    sequence: langData.sequence,
                    hint: langData.hint,
                    solution: langData.solution,
                    alternatives: langData.alternatives
                };
            },

            // Presenta il puzzle
            present() {
                const langData = TranslationSistema.t('puzzles', 'firstDecryption', 'present');
                const challengeData = TranslationSistema.t('puzzles', 'firstDecryption', 'challenge');
                
                Terminal.addOutput('\n' + langData.title, 'warning');
                Terminal.addOutput('');
                Terminal.addOutput(langData.analyzing, 'system');
                Terminal.addOutput('');
                Terminal.addOutput(langData.encryptedSequence);
                challengeData.sequence.forEach(seq => {
                    Terminal.addOutput(`  ${seq}`, 'success');
                });
                Terminal.addOutput('');
                Terminal.addOutput(langData.hint + ' ' + challengeData.hint, 'system');
                Terminal.addOutput('');
                Terminal.addOutput(langData.useCommand, 'warning');
                Terminal.addOutput('');
            },

            // Verifica la soluzione
            verify(answer) {
                const normalized = answer.trim().toUpperCase();
                const challengeData = TranslationSistema.t('puzzles', 'firstDecryption', 'challenge');
                const solutions = [
                    challengeData.solution.toUpperCase(),
                    ...challengeData.alternatives.map(a => a.toUpperCase())
                ];

                return solutions.some(sol => normalized.includes(sol));
            },

            // Callback quando completato
            onCompletato() {
                const langData = TranslationSistema.t('puzzles', 'firstDecryption', 'success');
                
                Terminal.addOutput('');
                Terminal.addOutput(langData.message, 'success');
                Terminal.addOutput('');
                Terminal.addOutput(langData.protocolDisabilitato, 'warning');
                Terminal.addOutput('');

                // Aggiorna stato
                StateManager.setFlag('firstPuzzleCompletato', true);
                StateManager.incrementStat('puzzlesSolved');
                StateManager.incrementStat('fileLiberated');

                // Ma anche corrompi i file
                StateManager.corruptFile('/archive/sector_delta/consciousness_021847.dat');
                StateManager.incrementStat('consciousnessDestroyed', 1);
            }
        },

        sequencePattern: {
            id: 'sequence_pattern',
            name: 'Riconoscimento Pattern',
            description: 'Identifica il pattern nella sequenza',
            difficulty: 'medium',
            type: 'logic',

            challenge: {
                sequence: '2, 4, 8, 16, 32, ?',
                hint: 'Ogni numero è correlato al precedente.',
                solution: '64',
                explanation: 'Ogni numero è il doppio del precedente (potenze di 2)'
            },

            present() {
                Terminal.addOutput('\n=== RICACCESOSOCIMENTO PATTERN ===', 'warning');
                Terminal.addOutput('');
                Terminal.addOutput('Completa la sequenza:');
                Terminal.addOutput(`  ${this.challenge.sequence}`, 'success');
                Terminal.addOutput('');
                Terminal.addOutput('Suggerimento: ' + this.challenge.hint, 'system');
                Terminal.addOutput('');
                Terminal.addOutput("Usa 'solve <risposta>' per inviare", 'warning');
                Terminal.addOutput('');
            },

            verify(answer) {
                return answer.trim() === this.challenge.solution;
            },

            onCompletato() {
                Terminal.addOutput('');
                Terminal.addOutput('✓ PATTERN IDENTIFICATO', 'success');
                Terminal.addOutput(`Spiegazione: ${this.challenge.explanation}`, 'system');
                Terminal.addOutput('');

                StateManager.incrementStat('puzzlesSolved');
            }
        }
    },

    // Utility per gestire i puzzle
    currentPuzzle: null,

    startPuzzle(blockId, puzzleId) {
        const puzzle = this.block01[puzzleId]; // Per ora solo block01
        if (!puzzle) {
            Terminal.addOutput('Puzzle non trovato.', 'error');
            return false;
        }

        this.currentPuzzle = puzzle;
        puzzle.present();
        return true;
    },

    solvePuzzle(answer) {
        if (!this.currentPuzzle) {
            Terminal.addOutput('Nessun puzzle attivo.', 'error');
            return false;
        }

        const correct = this.currentPuzzle.verify(answer);

        if (correct) {
            this.currentPuzzle.onCompletato();
            const completedPuzzle = this.currentPuzzle;
            this.currentPuzzle = null;
            return completedPuzzle;
        } else {
            Terminal.addOutput('Errato. Riprova.', 'error');
            return false;
        }
    },

    hasPuzzleAttivo() {
        return this.currentPuzzle !== null;
    }
};
