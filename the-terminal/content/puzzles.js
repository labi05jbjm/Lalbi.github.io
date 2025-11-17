/**
 * PUZZLES DATABASE
 * Puzzle e mini-giochi del gioco
 */

const Puzzles = {
    // BLOCK 1 PUZZLES
    block01: {
        firstDecryption: {
            id: 'first_decryption',
            name: 'Security Protocol Alpha',
            description: 'Decrypt the security protocol to proceed',
            difficulty: 'easy',
            type: 'pattern_matching',

            // Il puzzle: trovare il pattern nella sequenza
            challenge: {
                sequence: [
                    '0x4D 0x45 0x4D 0x4F 0x52 0x49 0x41 0x4D',
                    '0x53 0x45 0x43 0x55 0x52 0x45',
                    '0x50 0x52 0x4F 0x54 0x4F'
                ],
                hint: 'These are hexadecimal values. Try converting them to ASCII.',
                solution: 'MEMORIAM SECURE PROTO',
                alternatives: ['memoriam secure proto', 'MEMORIAM', 'memoriam']
            },

            // Presenta il puzzle
            present() {
                Terminal.addOutput('\n=== DECRYPTION CHALLENGE ===', 'warning');
                Terminal.addOutput('');
                Terminal.addOutput('Analyzing security protocol...', 'system');
                Terminal.addOutput('');
                Terminal.addOutput('Encrypted sequence detected:');
                this.challenge.sequence.forEach(seq => {
                    Terminal.addOutput(`  ${seq}`, 'success');
                });
                Terminal.addOutput('');
                Terminal.addOutput('Hint: ' + this.challenge.hint, 'system');
                Terminal.addOutput('');
                Terminal.addOutput("Use 'solve <answer>' to attempt decryption", 'warning');
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
                Terminal.addOutput('✓ DECRYPTION SUCCESSFUL', 'success');
                Terminal.addOutput('');
                Terminal.addOutput('Security Protocol Alpha: DISABLED', 'warning');
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
            name: 'Pattern Recognition',
            description: 'Identify the pattern in the sequence',
            difficulty: 'medium',
            type: 'logic',

            challenge: {
                sequence: '2, 4, 8, 16, 32, ?',
                hint: 'Each number is related to the previous one.',
                solution: '64',
                explanation: 'Each number is double the previous one (powers of 2)'
            },

            present() {
                Terminal.addOutput('\n=== PATTERN RECOGNITION ===', 'warning');
                Terminal.addOutput('');
                Terminal.addOutput('Complete the sequence:');
                Terminal.addOutput(`  ${this.challenge.sequence}`, 'success');
                Terminal.addOutput('');
                Terminal.addOutput('Hint: ' + this.challenge.hint, 'system');
                Terminal.addOutput('');
                Terminal.addOutput("Use 'solve <answer>' to submit", 'warning');
                Terminal.addOutput('');
            },

            verify(answer) {
                return answer.trim() === this.challenge.solution;
            },

            onComplete() {
                Terminal.addOutput('');
                Terminal.addOutput('✓ PATTERN IDENTIFIED', 'success');
                Terminal.addOutput(`Explanation: ${this.challenge.explanation}`, 'system');
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
            Terminal.addOutput('Puzzle not found.', 'error');
            return false;
        }

        this.currentPuzzle = puzzle;
        puzzle.present();
        return true;
    },

    solvePuzzle(answer) {
        if (!this.currentPuzzle) {
            Terminal.addOutput('No active puzzle.', 'error');
            return false;
        }

        const correct = this.currentPuzzle.verify(answer);

        if (correct) {
            this.currentPuzzle.onComplete();
            const completedPuzzle = this.currentPuzzle;
            this.currentPuzzle = null;
            return completedPuzzle;
        } else {
            Terminal.addOutput('Incorrect. Try again.', 'error');
            return false;
        }
    },

    hasPuzzleActive() {
        return this.currentPuzzle !== null;
    }
};
