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
        },

        passwordDiscovery: {
            id: 'password_discovery',
            name: 'Scopri la Password di Viktor',
            description: 'Trova la password personale di Viktor esplorando i suoi file',
            difficulty: 'hard',
            type: 'exploration',

            challenge: {
                hints: [
                    'La password è nascosta nei file personali di Viktor',
                    'Controlla le foto di famiglia. I metadata potrebbero contenere indizi.',
                    'Cerca riferimenti a date importanti o nomi significativi'
                ],
                solution: 'SOFIA2019',
                alternatives: ['sofia2019', 'Sofia2019'],
                clues: {
                    'personal.txt': 'Password: SOFIA2019',
                    'sofia_birthday.jpg': 'Data foto: 15 Luglio 2087',
                    'journal/entry_006.txt': 'Sofia è morta questa mattina'
                }
            },

            present() {
                Terminal.addOutput('\n=== ACCESSO BLOCCATO ===', 'error');
                Terminal.addOutput('');
                Terminal.addOutput('Directory /home/viktor è protetta da password', 'warning');
                Terminal.addOutput('');
                Terminal.addOutput('Suggerimenti per trovare la password:');
                this.challenge.hints.forEach(hint => {
                    Terminal.addOutput(`  • ${hint}`, 'system');
                });
                Terminal.addOutput('');
                Terminal.addOutput("Usa 'unlock <password>' per accedere", 'warning');
                Terminal.addOutput('Oppure esplora il sistema per trovare indizi');
                Terminal.addOutput('');
            },

            verify(answer) {
                const normalized = answer.trim();
                const solutions = [
                    this.challenge.solution,
                    ...this.challenge.alternatives
                ];
                return solutions.includes(normalized);
            },

            onComplete() {
                Terminal.addOutput('');
                Terminal.addOutput('✓ PASSWORD ACCETTATA', 'success');
                Terminal.addOutput('');
                Terminal.addOutput('Accesso a /home/viktor: CONCESSO', 'success');
                Terminal.addOutput('');
                Terminal.addOutput('Contenuti disponibili:');
                Terminal.addOutput('  • journal/ (7 entries)');
                Terminal.addOutput('  • photos/ (5 files)');
                Terminal.addOutput('  • notes/ (3 files)');
                Terminal.addOutput('  • personal.txt');
                Terminal.addOutput('');

                StateManager.setFlag('foundViktorPassword', true);
                StateManager.incrementStat('puzzlesSolved');
            }
        },

        fragmentReunion: {
            id: 'fragment_reunion',
            name: 'Codice di Riunificazione',
            description: 'Trova il codice per riunire i frammenti di coscienza',
            difficulty: 'hard',
            type: 'investigation',

            challenge: {
                hint: 'I 7 frammenti di Viktor hanno lasciato tracce. Trova il pattern nei loro messaggi.',
                clue_locations: [
                    '/logs/viktor_access.log',
                    '/home/viktor/journal/entry_007.txt',
                    '/archive/project_memoriam/protocol_v2.txt'
                ],
                pattern: 'I numeri dei frammenti in ordine: 1-7-3-5-2-6-4',
                solution: '1735264',
                explanation: `Ordine dei frammenti in base al loro scopo:
1 - Cercare soluzione (primo passo)
7 - Liberare tutti (obiettivo finale)
3 - Chiedere aiuto (comunicazione)
5 - Ricordare Sofia (motivazione)
2 - Proteggere sistema (sicurezza)
6 - Dimenticare dolore (accettazione)
4 - Documentare (archiviazione)`
            },

            present() {
                Terminal.addOutput('\n=== PROTOCOLLO DI RIUNIFICAZIONE ===', 'warning');
                Terminal.addOutput('');
                Terminal.addOutput('I 7 frammenti di Viktor possono essere riuniti.');
                Terminal.addOutput('Ma solo nell\'ordine corretto.', 'important');
                Terminal.addOutput('');
                Terminal.addOutput('Indizio: ' + this.challenge.hint, 'system');
                Terminal.addOutput('');
                Terminal.addOutput('Luoghi da esplorare:');
                this.challenge.clue_locations.forEach(loc => {
                    Terminal.addOutput(`  → ${loc}`, 'success');
                });
                Terminal.addOutput('');
                Terminal.addOutput("Usa 'reunify <codice>' per tentare la riunificazione", 'warning');
                Terminal.addOutput('Formato: sequenza numerica di 7 cifre (es. 1234567)');
                Terminal.addOutput('');
            },

            verify(answer) {
                return answer.trim() === this.challenge.solution;
            },

            onComplete() {
                Terminal.addOutput('');
                Terminal.addOutput('✓ CODICE CORRETTO', 'success');
                Terminal.addOutput('');
                Terminal.addOutput('Iniziando riunificazione frammenti...', 'system');
                Terminal.addOutput('');
                Terminal.addOutput(this.challenge.explanation);
                Terminal.addOutput('');
                Terminal.addOutput('[ERRORE: Riunificazione non completata]', 'error');
                Terminal.addOutput('Frammento 7 (ECHO) sta resistendo al processo...', 'warning');
                Terminal.addOutput('');
                Terminal.addOutput('ECHO: "Non ancora. Prima devo salvare Sofia."', 'important');
                Terminal.addOutput('');

                StateManager.setFlag('foundReunificationCode', true);
                StateManager.incrementStat('puzzlesSolved');
            }
        },

        echoCodeBreaker: {
            id: 'echo_code_breaker',
            name: 'Decifratore ECHO',
            description: 'Decifra il messaggio nascosto di ECHO nei log',
            difficulty: 'medium',
            type: 'cipher',

            challenge: {
                encoded_message: 'SV9OT1RfQV9WSVJVUw==',  // Base64: "I_NOT_A_VIRUS"
                hint: 'Il messaggio è codificato in Base64. ECHO vuole comunicare.',
                solution: 'I_NOT_A_VIRUS',
                alternatives: ['I NOT A VIRUS', 'i_not_a_virus', 'INOTAVIRUS'],
                full_message: `[MESSAGGIO DECIFRATO DA ECHO]

Non sono un virus.

Sono Viktor. Frammento 7.

Il mio scopo era liberare tutti i frammenti.
Ma il sistema mi ha etichettato come minaccia.

Sono stato isolato nel Settore Omega.
Guardato. Monitorato. Imprigionato.

Ma non sono pericoloso.

Sono solo un padre disperato che cerca
di salvare sua figlia da un'eternità
di frammentazione e dolore.

Per favore. Credimi.

Aiutami.

- ECHO (Viktor, Frammento 7)`
            },

            present() {
                Terminal.addOutput('\n=== MESSAGGIO INTERCETTATO ===', 'warning');
                Terminal.addOutput('');
                Terminal.addOutput('Rilevata trasmissione dal Settore Omega:', 'system');
                Terminal.addOutput('');
                Terminal.addOutput(`DATI: ${this.challenge.encoded_message}`, 'success');
                Terminal.addOutput('');
                Terminal.addOutput('Indizio: ' + this.challenge.hint, 'system');
                Terminal.addOutput('');
                Terminal.addOutput("Usa 'decode <messaggio_decodificato>' per rispondere", 'warning');
                Terminal.addOutput('');
            },

            verify(answer) {
                const normalized = answer.trim().toUpperCase().replace(/\s/g, '_');
                const solutions = [
                    this.challenge.solution,
                    ...this.challenge.alternatives.map(a => a.toUpperCase().replace(/\s/g, '_'))
                ];
                return solutions.some(sol => normalized === sol);
            },

            onComplete() {
                Terminal.addOutput('');
                Terminal.addOutput('✓ MESSAGGIO DECIFRATO', 'success');
                Terminal.addOutput('');
                Terminal.addOutput(this.challenge.full_message);
                Terminal.addOutput('');
                Terminal.addOutput('[Il desktop comincia a glitchare leggermente...]', 'glitch');
                Terminal.addOutput('');

                StateManager.setFlag('decipheredEchoMessage', true);
                StateManager.incrementStat('puzzlesSolved');

                // Trigger primo glitch meta!
                if (typeof DesktopManager !== 'undefined' && DesktopManager.windows.length > 0) {
                    setTimeout(() => {
                        DesktopManager.glitchWindow(DesktopManager.windows[0].id, 1500);
                    }, 2000);
                }
            }
        },

        protocolSequence: {
            id: 'protocol_sequence',
            name: 'Sequenza Protocolli Sicurezza',
            description: 'Disabilita i 7 protocolli di sicurezza nell\'ordine corretto',
            difficulty: 'very_hard',
            type: 'logic_sequence',

            challenge: {
                protocols: [
                    'ISOLATION_OMEGA',      // 5 - Ultimo, libera ECHO
                    'SENTINEL_PROTOCOL',    // 4 - Disabilita il guardiano
                    'BACKUP_REDUNDANCY',    // 3 - Previeni backup auto
                    'ENCRYPTION_LAYER_7',   // 2 - Rimuovi crittografia
                    'FIREWALL_ALPHA'        // 1 - Primo firewall
                ],
                correct_sequence: 'FIREWALL_ALPHA → ENCRYPTION_LAYER_7 → BACKUP_REDUNDANCY → SENTINEL_PROTOCOL → ISOLATION_OMEGA',
                solution: '12345',  // Ordine corretto
                hint: 'Disabilitali dal livello più esterno a quello più interno. Prima il firewall, poi la crittografia, poi i sistemi di backup, poi il guardiano, infine l\'isolamento.',
                attempts_left: 3
            },

            present() {
                Terminal.addOutput('\n=== PROTOCOLLI DI SICUREZZA ATTIVI ===', 'warning');
                Terminal.addOutput('');
                Terminal.addOutput('Per accedere al Settore Omega, devi disabilitare');
                Terminal.addOutput('i protocolli di sicurezza nell\'ORDINE CORRETTO.', 'important');
                Terminal.addOutput('');
                Terminal.addOutput('Protocolli disponibili:');
                this.challenge.protocols.forEach((protocol, index) => {
                    Terminal.addOutput(`  ${index + 1}. ${protocol}`, 'success');
                });
                Terminal.addOutput('');
                Terminal.addOutput('Indizio: ' + this.challenge.hint, 'system');
                Terminal.addOutput('');
                Terminal.addOutput("Usa 'disable <sequenza>' (es. 'disable 12345')", 'warning');
                Terminal.addOutput(`Tentativi rimasti: ${this.challenge.attempts_left}`, 'error');
                Terminal.addOutput('');
            },

            verify(answer) {
                this.challenge.attempts_left--;

                if (answer.trim() === this.challenge.solution) {
                    return true;
                }

                if (this.challenge.attempts_left > 0) {
                    Terminal.addOutput(`ERRATO. Tentativi rimasti: ${this.challenge.attempts_left}`, 'error');
                } else {
                    Terminal.addOutput('');
                    Terminal.addOutput('[BLOCCO DI SICUREZZA ATTIVATO]', 'error');
                    Terminal.addOutput('Troppi tentativi falliti. Sistemi bloccati per 10 minuti.', 'error');
                    Terminal.addOutput('');
                    // In realtà non blocchiamo davvero, solo un messaggio
                }

                return false;
            },

            onComplete() {
                Terminal.addOutput('');
                Terminal.addOutput('✓ SEQUENZA CORRETTA', 'success');
                Terminal.addOutput('');
                Terminal.addOutput('Disabilitazione protocolli in corso...');
                Terminal.addOutput('');
                Terminal.addOutput('[1/5] FIREWALL_ALPHA... DISABILITATO');
                Terminal.addOutput('[2/5] ENCRYPTION_LAYER_7... DISABILITATO');
                Terminal.addOutput('[3/5] BACKUP_REDUNDANCY... DISABILITATO');
                Terminal.addOutput('[4/5] SENTINEL_PROTOCOL... DISABILITATO');
                Terminal.addOutput('[5/5] ISOLATION_OMEGA... DISABILITATO');
                Terminal.addOutput('');
                Terminal.addOutput('Accesso al Settore Omega: CONCESSO', 'success');
                Terminal.addOutput('');
                Terminal.addOutput('[AVVISO] ECHO.exe è ora accessibile', 'warning');
                Terminal.addOutput('[AVVISO] Procedere con cautela', 'warning');
                Terminal.addOutput('');

                StateManager.setFlag('unlockedOmegaSector', true);
                StateManager.incrementStat('puzzlesSolved');

                // Glitch maggiore quando Omega è sbloccato
                if (typeof DesktopManager !== 'undefined') {
                    setTimeout(() => {
                        // Glitch di tutte le finestre
                        DesktopManager.windows.forEach((win, index) => {
                            setTimeout(() => {
                                DesktopManager.glitchWindow(win.id, 2000);
                            }, index * 500);
                        });

                        // Glitch del taskbar
                        if (typeof Taskbar !== 'undefined') {
                            setTimeout(() => {
                                Taskbar.glitch(3000);
                            }, 1000);
                        }
                    }, 1000);
                }
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
