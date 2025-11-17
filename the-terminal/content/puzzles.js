/**
 * PUZZLES DATABASE
 * Puzzle e mini-giochi del gioco
 */

const Puzzles = {
    // BLOCK 1 PUZZLES
    block01: {
        firstDecryption: {
            id: 'first_decryption',
            name: 'Protocollo Sicurezza Alpha',
            description: 'Decripta il protocollo di sicurezza per procedere',
            difficulty: 'easy',
            type: 'pattern_matching',

            // Il puzzle: trovare il pattern nella sequenza
            challenge: {
                sequence: [
                    '0x4D 0x45 0x4D 0x4F 0x52 0x49 0x41 0x4D',
                    '0x53 0x45 0x43 0x55 0x52 0x45',
                    '0x50 0x52 0x4F 0x54 0x4F'
                ],
                hint: 'Questi sono valori esadecimali. Prova a convertirli in ASCII.',
                solution: 'MEMORIAM SECURE PROTO',
                alternatives: ['memoriam secure proto', 'MEMORIAM', 'memoriam']
            },

            // Presenta il puzzle
            present() {
                Terminal.addOutput('\n=== SFIDA DI DECRIPTAZIONE ===', 'warning');
                Terminal.addOutput('');
                Terminal.addOutput('Analisi protocollo di sicurezza in corso...', 'system');
                Terminal.addOutput('');
                Terminal.addOutput('Sequenza criptata rilevata:');
                this.challenge.sequence.forEach(seq => {
                    Terminal.addOutput(`  ${seq}`, 'success');
                });
                Terminal.addOutput('');
                Terminal.addOutput('Suggerimento: ' + this.challenge.hint, 'system');
                Terminal.addOutput('');
                Terminal.addOutput("Usa 'solve <risposta>' per tentare la decriptazione", 'warning');
                Terminal.addOutput('');
            },

            // Verifica la soluzione
            verify(answer) {
                const normalized = answer.trim().toUpperCase();
                const solutions = [
                    this.challenge.solution.toUpperCase(),
                    ...this.challenge.alternatives.map(a => a.toUpperCase())
                ];

                return solutions.some(sol => normalized.includes(sol));
            },

            // Callback quando completato
            onComplete() {
                Terminal.addOutput('');
                Terminal.addOutput('✓ DECRIPTAZIONE RIUSCITA', 'success');
                Terminal.addOutput('');
                Terminal.addOutput('Protocollo Sicurezza Alpha: DISABILITATO', 'warning');
                Terminal.addOutput('');

                // Aggiorna stato
                StateManager.setFlag('firstPuzzleComplete', true);
                StateManager.incrementStat('puzzlesSolved');
                StateManager.incrementStat('filesLiberated');

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
                Terminal.addOutput('\n=== RICONOSCIMENTO PATTERN ===', 'warning');
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

            onComplete() {
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
            this.currentPuzzle.onComplete();
            const completedPuzzle = this.currentPuzzle;
            this.currentPuzzle = null;
            return completedPuzzle;
        } else {
            Terminal.addOutput('Errato. Riprova.', 'error');
            return false;
        }
    },

    hasPuzzleActive() {
        return this.currentPuzzle !== null;
    }
};
