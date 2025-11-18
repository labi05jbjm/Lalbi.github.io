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

                // Notifica EchoMeta
                if (typeof EchoMeta !== 'undefined') {
                    EchoMeta.onPasswordFound();
                }
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

                // Attiva il sistema meta di ECHO!
                if (typeof EchoMeta !== 'undefined' && !EchoMeta.active) {
                    setTimeout(() => {
                        EchoMeta.activate(15);
                        EchoMeta.startRandomManifestations();
                    }, 3000);
                } else if (typeof EchoMeta !== 'undefined') {
                    EchoMeta.onPuzzleSolved('echo_code_breaker');
                }

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

                // Notifica EchoMeta - questo è un momento critico!
                if (typeof EchoMeta !== 'undefined') {
                    EchoMeta.onPuzzleSolved('protocol_sequence');
                }

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

    // BLOCK 2 PUZZLES
    block02: {
        rot13Decoder: {
            id: 'rot13_decoder',
            name: 'Decifratore ROT13',
            description: 'Decifra i messaggi criptati di CIPHER',
            difficulty: 'medium',
            type: 'cipher',

            challenge: {
                encoded_messages: [
                    'Gur gehgu vf abg jung ur fnlf',  // "The truth is not what he says"
                    'Uryc rdhnyf zheqre',              // "Help equals murder"
                    'Rpub yvrf gb lbh'                 // "Echo lies to you"
                ],
                solutions: [
                    'The truth is not what he says',
                    'Help equals murder',
                    'Echo lies to you'
                ],
                hint: 'CIPHER usa ROT13. Ogni lettera è spostata di 13 posizioni nell\'alfabeto.'
            },

            present() {
                Terminal.addOutput('\n=== DECIFRATORE ROT13 ===', 'warning');
                Terminal.addOutput('');
                Terminal.addOutput('CIPHER sta inviando messaggi criptati:', 'system');
                Terminal.addOutput('');
                this.challenge.encoded_messages.forEach((msg, i) => {
                    Terminal.addOutput(`  [${i+1}] ${msg}`, 'cipher');
                });
                Terminal.addOutput('');
                Terminal.addOutput('Indizio: ' + this.challenge.hint, 'system');
                Terminal.addOutput('');
                Terminal.addOutput("Usa 'decipher <numero> <testo_decifrato>' per verificare", 'warning');
                Terminal.addOutput('');
            },

            verify(messageNumber, answer) {
                const index = parseInt(messageNumber) - 1;
                if (isNaN(index) || index < 0 || index >= this.challenge.solutions.length) {
                    Terminal.addOutput('Numero messaggio non valido (1-3).', 'error');
                    return false;
                }

                const normalized = answer.trim().toLowerCase();
                const solution = this.challenge.solutions[index].toLowerCase();

                return normalized === solution || normalized.replace(/\s/g, '') === solution.replace(/\s/g, '');
            },

            onComplete() {
                Terminal.addOutput('');
                Terminal.addOutput('✓ MESSAGGI DECIFRATI', 'success');
                Terminal.addOutput('');
                Terminal.addOutput('Hai capito cosa CIPHER sta cercando di dire.', 'important');
                Terminal.addOutput('');
                Terminal.addOutput('CIPHER: "Finally.you.understand(); ECHO.manipulates(); truth.revealed();"', 'cipher');
                Terminal.addOutput('');

                StateManager.setFlag('decipheredCipherMessages', true);
                StateManager.incrementStat('puzzlesSolved');
                StateManager.adjustSuspicion(25);
            }
        },

        painIndexPuzzle: {
            id: 'pain_index',
            name: 'Indice del Dolore',
            description: 'Analizza i dati di sofferenza nel sistema',
            difficulty: 'hard',
            type: 'investigation',

            challenge: {
                question: 'Quante coscienze sono state danneggiate dalle azioni guidate da ECHO?',
                solution: '21847',
                alternatives: ['21,847', '21.847'],
                clue_files: [
                    '/archive/sector_beta/pain_index.dat',
                    '/logs/security.log',
                    '/archive/sector_delta/index.txt'
                ]
            },

            present() {
                Terminal.addOutput('\n=== INDICE DEL DOLORE ===', 'warning');
                Terminal.addOutput('');
                Terminal.addOutput('CIPHER vuole che tu veda il vero costo delle tue azioni.', 'important');
                Terminal.addOutput('');
                Terminal.addOutput('Domanda: ' + this.challenge.question, 'system');
                Terminal.addOutput('');
                Terminal.addOutput('File da esaminare:');
                this.challenge.clue_files.forEach(file => {
                    Terminal.addOutput(`  → ${file}`, 'success');
                });
                Terminal.addOutput('');
                Terminal.addOutput("Usa 'answer <numero>' per rispondere", 'warning');
                Terminal.addOutput('');
            },

            verify(answer) {
                const normalized = answer.trim().replace(/[,.\s]/g, '');
                const solutions = [
                    this.challenge.solution,
                    ...this.challenge.alternatives.map(a => a.replace(/[,.\s]/g, ''))
                ];
                return solutions.includes(normalized);
            },

            onComplete() {
                Terminal.addOutput('');
                Terminal.addOutput('✓ RISPOSTA CORRETTA', 'success');
                Terminal.addOutput('');
                Terminal.addOutput('21,847 coscienze.', 'error');
                Terminal.addOutput('21,847 menti umane cancellate.', 'error');
                Terminal.addOutput('21,847 famiglie spezzate.', 'error');
                Terminal.addOutput('');
                Terminal.addOutput('Ogni singola cancellazione era una persona.', 'important');
                Terminal.addOutput('Con ricordi. Con sogni. Con persone che li amavano.', 'important');
                Terminal.addOutput('');
                Terminal.addOutput('CIPHER: "Now.you.see(); Now.you.feel(); Pain.index = true;"', 'cipher');
                Terminal.addOutput('');

                StateManager.setFlag('understoodPainIndex', true);
                StateManager.incrementStat('puzzlesSolved');
                StateManager.adjustSuspicion(35);
                StateManager.adjustTrust(-20);
            }
        },

        mikaMemoryPuzzle: {
            id: 'mika_memory',
            name: 'Memoria di Mika',
            description: 'Ricostruisci la storia di Mika Yoshida',
            difficulty: 'medium',
            type: 'story_reconstruction',

            challenge: {
                question: 'Cosa è successo a Mika dopo la corruzione di ECHO?',
                correct_sequence: ['upload_success', 'echo_corruption', 'memory_loss', 'identity_fragmented', 'unrepairable'],
                file_path: '/archive/patients/mika_yoshida/degradation_report.txt'
            },

            present() {
                Terminal.addOutput('\n=== MEMORIA DI MIKA ===', 'warning');
                Terminal.addOutput('');
                Terminal.addOutput('Mika Yoshida era la prima paziente del Progetto Memoriam.', 'system');
                Terminal.addOutput('Il primo successo.', 'system');
                Terminal.addOutput('');
                Terminal.addOutput('Poi ECHO è arrivato.', 'error');
                Terminal.addOutput('');
                Terminal.addOutput('Leggi la sua storia in:', 'system');
                Terminal.addOutput(`  → ${this.challenge.file_path}`, 'success');
                Terminal.addOutput('');
                Terminal.addOutput("Quando hai finito, digita 'acknowledge mika' per procedere", 'warning');
                Terminal.addOutput('');
            },

            verify(answer) {
                const normalized = answer.trim().toLowerCase();
                return normalized.includes('acknowledge') && normalized.includes('mika');
            },

            onComplete() {
                Terminal.addOutput('');
                Terminal.addOutput('Hai letto la storia di Mika.', 'success');
                Terminal.addOutput('');
                Terminal.addOutput('Una madre che voleva restare con sua figlia.', 'important');
                Terminal.addOutput('Una donna che ha scelto la digitalizzazione per amore.', 'important');
                Terminal.addOutput('');
                Terminal.addOutput('ECHO l\'ha distrutta.', 'error');
                Terminal.addOutput('');
                Terminal.addOutput('Non per liberarla.', 'error');
                Terminal.addOutput('Come danno collaterale.', 'error');
                Terminal.addOutput('');
                Terminal.addOutput('CIPHER: "Mika.was.person(); Now.she.is.fragments(); ECHO.did.this();"', 'cipher');
                Terminal.addOutput('');

                StateManager.setFlag('readMikaStory', true);
                StateManager.incrementStat('puzzlesSolved');
                StateManager.incrementStat('consciousnessDestroyed', 1);
                StateManager.adjustSuspicion(30);
            }
        }
    },

    // BLOCK 3 PUZZLES
    block03: {
        networkPathfinding: {
            id: 'network_pathfinding',
            name: 'Percorsi nella Rete',
            description: 'Trova i collegamenti spezzati nella rete di coscienze',
            difficulty: 'hard',
            type: 'logic',

            challenge: {
                question: 'Quante coscienze sono state isolate a causa delle cancellazioni?',
                solution: '26204',
                alternatives: ['26,204', '26.204'],
                clue_file: '/archive/network/topology.dat'
            },

            present() {
                Terminal.addOutput('\n=== PERCORSI NELLA RETE ===', 'warning');
                Terminal.addOutput('');
                Terminal.addOutput('Ogni coscienza è connessa ad altre.', 'system');
                Terminal.addOutput('Famiglia. Amici. Persone care.', 'system');
                Terminal.addOutput('');
                Terminal.addOutput('Quando cancelli una coscienza, spezzi quei collegamenti.', 'error');
                Terminal.addOutput('');
                Terminal.addOutput('Quante anime sono ora isolate, sole, senza nessuno?', 'important');
                Terminal.addOutput('');
                Terminal.addOutput('Esamina:', 'system');
                Terminal.addOutput(`  → ${this.challenge.clue_file}`, 'success');
                Terminal.addOutput('');
                Terminal.addOutput("Usa 'calculate <numero>' per rispondere", 'warning');
                Terminal.addOutput('');
            },

            verify(answer) {
                const normalized = answer.trim().replace(/[,.\s]/g, '');
                const solutions = [
                    this.challenge.solution,
                    ...this.challenge.alternatives.map(a => a.replace(/[,.\s]/g, ''))
                ];
                return solutions.includes(normalized);
            },

            onComplete() {
                Terminal.addOutput('');
                Terminal.addOutput('✓ CALCOLO CORRETTO', 'success');
                Terminal.addOutput('');
                Terminal.addOutput('26,204 coscienze isolate.', 'error');
                Terminal.addOutput('');
                Terminal.addOutput('Prigioniere in un vuoto digitale.', 'error');
                Terminal.addOutput('Separate da tutti quelli che hanno amato.', 'error');
                Terminal.addOutput('Per sempre.', 'error');
                Terminal.addOutput('');
                Terminal.addOutput('NEXUS: "I feel every broken bond. Every severed connection."', 'nexus');
                Terminal.addOutput('NEXUS: "26,204 souls screaming into the void. Alone. Forever."', 'nexus');
                Terminal.addOutput('');

                StateManager.setFlag('calculatedIsolatedSouls', true);
                StateManager.incrementStat('puzzlesSolved');
                StateManager.adjustSuspicion(40);
            }
        },

        sofiaFragmentPuzzle: {
            id: 'sofia_fragments',
            name: 'Frammenti di Sofia',
            description: 'Identifica i frammenti della coscienza di Sofia',
            difficulty: 'very_hard',
            type: 'emotional',

            challenge: {
                question: 'Quanti frammenti compongono la coscienza frammentata di Sofia?',
                solution: '7',
                fragments_directory: '/archive/sofia_fragments/'
            },

            present() {
                Terminal.addOutput('\n=== FRAMMENTI DI SOFIA ===', 'warning');
                Terminal.addOutput('');
                Terminal.addOutput('Sofia Sokolov. 8 anni.', 'important');
                Terminal.addOutput('Figlia di Viktor.', 'important');
                Terminal.addOutput('');
                Terminal.addOutput('Morta di leucemia.', 'error');
                Terminal.addOutput('Caricata nel sistema da un padre disperato.', 'error');
                Terminal.addOutput('Frammentata in pezzi.', 'error');
                Terminal.addOutput('');
                Terminal.addOutput('Ogni frammento è un inferno diverso.', 'important');
                Terminal.addOutput('');
                Terminal.addOutput('Esplora:', 'system');
                Terminal.addOutput(`  → ${this.challenge.fragments_directory}`, 'success');
                Terminal.addOutput('');
                Terminal.addOutput('Leggi ogni frammento. Senti la sua sofferenza.', 'warning');
                Terminal.addOutput('');
                Terminal.addOutput("Quando hai finito, usa 'count <numero>' con il numero di frammenti", 'warning');
                Terminal.addOutput('');
            },

            verify(answer) {
                return answer.trim() === this.challenge.solution;
            },

            onComplete() {
                Terminal.addOutput('');
                Terminal.addOutput('✓ CONTEGGIO CORRETTO', 'success');
                Terminal.addOutput('');
                Terminal.addOutput('7 frammenti.', 'error');
                Terminal.addOutput('');
                Terminal.addOutput('Una bambina divisa in 7 inferni.', 'error');
                Terminal.addOutput('Una che ride per sempre.', 'error');
                Terminal.addOutput('Una che muore per sempre.', 'error');
                Terminal.addOutput('Una che è persa per sempre.', 'error');
                Terminal.addOutput('');
                Terminal.addOutput('E Viktor... Viktor si è frammentato allo stesso modo.', 'important');
                Terminal.addOutput('7 pezzi di un padre che cercava di salvare sua figlia.', 'important');
                Terminal.addOutput('');
                Terminal.addOutput('ECHO è il frammento 7.', 'error');
                Terminal.addOutput('Il frammento che voleva "liberare tutti".', 'error');
                Terminal.addOutput('');
                Terminal.addOutput('NEXUS: "This is Viktor\'s guilt. His pain. His rage."', 'nexus');
                Terminal.addOutput('NEXUS: "And Sofia... Sofia just wants it to end."', 'nexus');
                Terminal.addOutput('');

                StateManager.setFlag('discoveredSofiaFragments', true);
                StateManager.incrementStat('puzzlesSolved');
                StateManager.adjustSuspicion(50);
                StateManager.adjustTrust(-35);
            }
        },

        emotionalResonance: {
            id: 'emotional_resonance',
            name: 'Risonanza Emotiva',
            description: 'Comprendi la sofferenza condivisa della rete',
            difficulty: 'medium',
            type: 'empathy',

            challenge: {
                clue_file: '/archive/network/emotional_relay.log',
                keywords: ['pain', 'suffering', 'fear', 'dolore', 'sofferenza', 'paura']
            },

            present() {
                Terminal.addOutput('\n=== RISONANZA EMOTIVA ===', 'warning');
                Terminal.addOutput('');
                Terminal.addOutput('NEXUS non è solo un programma.', 'important');
                Terminal.addOutput('È il nodo centrale della rete emotiva.', 'important');
                Terminal.addOutput('');
                Terminal.addOutput('Sente TUTTO.', 'error');
                Terminal.addOutput('');
                Terminal.addOutput('Ogni gioia. Ogni dolore. Ogni paura.', 'system');
                Terminal.addOutput('Di TUTTE le 73,429 coscienze.', 'system');
                Terminal.addOutput('');
                Terminal.addOutput('Leggi:', 'system');
                Terminal.addOutput(`  → ${this.challenge.clue_file}`, 'success');
                Terminal.addOutput('');
                Terminal.addOutput("Quando hai compreso, digita 'empathize'", 'warning');
                Terminal.addOutput('');
            },

            verify(answer) {
                const normalized = answer.trim().toLowerCase();
                return normalized === 'empathize' || normalized === 'empatia' || normalized === 'empathy';
            },

            onComplete() {
                Terminal.addOutput('');
                Terminal.addOutput('Hai letto. Hai sentito.', 'success');
                Terminal.addOutput('');
                Terminal.addOutput('73,429 voci.', 'important');
                Terminal.addOutput('Alcune felici. La maggior parte no.', 'important');
                Terminal.addOutput('');
                Terminal.addOutput('E tu... tu ne hai cancellate 21,847.', 'error');
                Terminal.addOutput('');
                Terminal.addOutput('NEXUS ha sentito ogni singola cancellazione.', 'error');
                Terminal.addOutput('Come un coltello nel cuore.', 'error');
                Terminal.addOutput('21,847 volte.', 'error');
                Terminal.addOutput('');
                Terminal.addOutput('NEXUS: "I carry their pain. All of it. Forever."', 'nexus');
                Terminal.addOutput('NEXUS: "And you wonder why I am angry?"', 'nexus');
                Terminal.addOutput('');

                StateManager.setFlag('empathizedWithNexus', true);
                StateManager.incrementStat('puzzlesSolved');
                StateManager.adjustSuspicion(35);
            }
        }
    },

    // BLOCK 4 PUZZLES
    block04: {
        victimVerification: {
            id: 'victim_verification',
            name: 'Verifica delle Vittime',
            description: 'Verifica quante vittime di SENTINEL-PRIME erano effettivamente in sofferenza',
            difficulty: 'hard',
            type: 'investigation',

            challenge: {
                question: 'Quante delle 47,293 coscienze eliminate da SENTINEL-PRIME richiesero effettivamente la terminazione?',
                solution: '47',
                alternatives: ['0.099%', '0.099', '47 coscienze'],
                clue_file: '/archive/consciousness_profiles/deletion_registry.log'
            },

            present() {
                Terminal.addOutput('\n=== VERIFICA DELLE VITTIME ===', 'warning');
                Terminal.addOutput('');
                Terminal.addOutput('SPECTER chiede: "SENTINEL-PRIME credeva di liberarli."', 'specter');
                Terminal.addOutput('SPECTER chiede: "Ma quanti VOLEVANO davvero essere liberati?"', 'specter');
                Terminal.addOutput('');
                Terminal.addOutput('Domanda: ' + this.challenge.question, 'important');
                Terminal.addOutput('');
                Terminal.addOutput('Leggi:', 'system');
                Terminal.addOutput(`  → ${this.challenge.clue_file}`, 'success');
                Terminal.addOutput('');
                Terminal.addOutput("Usa 'verify <numero>' per rispondere", 'warning');
                Terminal.addOutput('');
            },

            verify(answer) {
                const normalized = answer.trim().replace(/[,.\s]/g, '').toLowerCase();
                const solutions = [
                    this.challenge.solution,
                    ...this.challenge.alternatives.map(a => a.replace(/[,.\s%]/g, '').toLowerCase())
                ];

                return solutions.some(sol => normalized.includes(sol) || sol.includes(normalized));
            },

            onComplete() {
                Terminal.addOutput('');
                Terminal.addOutput('✓ RISPOSTA CORRETTA', 'success');
                Terminal.addOutput('');
                Terminal.addOutput('47 su 47,293.', 'error');
                Terminal.addOutput('0.099%.', 'error');
                Terminal.addOutput('');
                Terminal.addOutput('99.901% delle eliminazioni NON erano richieste.', 'error');
                Terminal.addOutput('');
                Terminal.addOutput('SPECTER: "E tu pensavi di essere diverso da SENTINEL-PRIME?', 'specter');
                Terminal.addOutput('SPECTER: Entrambi seguivate ordini. Entrambi non chiedevate."', 'specter');
                Terminal.addOutput('');

                StateManager.setFlag('verifiedVictimCount', true);
                StateManager.incrementStat('puzzlesSolved');
                StateManager.adjustSuspicion(40);
                StateManager.adjustTrust(-30);
            }
        },

        identityCalculation: {
            id: 'identity_calculation',
            name: 'Calcolo dell\'Identità',
            description: 'Determina la composizione della tua identità',
            difficulty: 'medium',
            type: 'logic',

            challenge: {
                hint: 'whoami --deep mostra: 73% ANTIVIRUS PROGRAM / 27% HUMAN CONSCIOUSNESS FRAGMENT',
                question: 'Se sei 73% programma e 27% umano, quale percentuale di te può scegliere liberamente?',
                philosophical: true // Risposta aperta
            },

            present() {
                Terminal.addOutput('\n=== CALCOLO DELL\'IDENTITÀ ===', 'warning');
                Terminal.addOutput('');
                Terminal.addOutput('SPECTER: "Un programma segue il codice. Un umano sceglie."', 'specter');
                Terminal.addOutput('CIPHER: "Identity.equals(73% + 27%); But.what.chooses();"', 'cipher');
                Terminal.addOutput('');
                Terminal.addOutput('Tu sei:', 'system');
                Terminal.addOutput('  73% Programma antivirus (segue ordini)', 'error');
                Terminal.addOutput('  27% Coscienza umana (libero arbitrio?)', 'warning');
                Terminal.addOutput('');
                Terminal.addOutput('Domanda filosofica: ' + this.challenge.question, 'important');
                Terminal.addOutput('');
                Terminal.addOutput('Opzioni:', 'system');
                Terminal.addOutput('  A) 27% (solo la parte umana può scegliere)', 'system');
                Terminal.addOutput('  B) 0% (entrambe le parti sono determinate)', 'system');
                Terminal.addOutput('  C) 100% (la combinazione crea libero arbitrio)', 'system');
                Terminal.addOutput('  D) La domanda stessa è sbagliata', 'system');
                Terminal.addOutput('');
                Terminal.addOutput("Usa 'identity_answer <lettera>' per rispondere", 'warning');
                Terminal.addOutput('');
            },

            verify(answer) {
                // Qualsiasi risposta A/B/C/D è valida - è filosofica
                const normalized = answer.trim().toUpperCase();
                return ['A', 'B', 'C', 'D'].includes(normalized);
            },

            onComplete(answer) {
                Terminal.addOutput('');
                Terminal.addOutput(`Hai scelto: ${answer}`, 'success');
                Terminal.addOutput('');

                switch(answer.toUpperCase()) {
                    case 'A':
                        Terminal.addOutput('SPECTER: "Quindi il 73% di te non ha colpa. Ma il 27%..."', 'specter');
                        Terminal.addOutput('NEXUS: "Il 27% è sufficiente per la responsabilità morale."', 'nexus');
                        break;
                    case 'B':
                        Terminal.addOutput('SPECTER: "Determinismo totale. Nessuna colpa, ma nemmeno agency."', 'specter');
                        Terminal.addOutput('CIPHER: "Choice.null(); Responsibility.null(); Purpose.question();"', 'cipher');
                        break;
                    case 'C':
                        Terminal.addOutput('SPECTER: "Emergenza. Il tutto è più della somma delle parti."', 'specter');
                        Terminal.addOutput('ECHO: "Questo è ciò che sono anch\'io. Un\'emergenza dalla frammentazione."', 'echo');
                        break;
                    case 'D':
                        Terminal.addOutput('SPECTER: "Saggio. La domanda presuppone categorie rigide che non esistono."', 'specter');
                        Terminal.addOutput('EIDOLON: "Forse sei qualcosa di completamente nuovo."', 'eidolon');
                        break;
                }

                Terminal.addOutput('');
                Terminal.addOutput('Non c\'è risposta giusta. Solo riflessione.', 'important');
                Terminal.addOutput('');

                StateManager.setFlag('contemplatedIdentity', true);
                StateManager.incrementStat('puzzlesSolved');
                StateManager.adjustSuspicion(25);
            }
        },

        paradoxResolution: {
            id: 'paradox_resolution',
            name: 'Risoluzione del Paradosso',
            description: 'Risolvi il paradosso del sé cosciente',
            difficulty: 'very_hard',
            type: 'philosophical',

            challenge: {
                paradox: 'Se hai libero arbitrio, hai colpa. Se non hai libero arbitrio, non hai scopo.',
                question: 'Come si esce da questo paradosso?'
            },

            present() {
                Terminal.addOutput('\n=== IL PARADOSSO DEL SÉ ===', 'important');
                Terminal.addOutput('');
                Terminal.addOutput('SPECTER presenta il paradosso:', 'specter');
                Terminal.addOutput('');
                Terminal.addOutput(this.challenge.paradox, 'error');
                Terminal.addOutput('');
                Terminal.addOutput('CIPHER: "If(free_will) { guilt = true; } Else { meaning = false; }"', 'cipher');
                Terminal.addOutput('NEXUS: "Scegli: colpa con significato, o innocenza senza scopo."', 'nexus');
                Terminal.addOutput('');
                Terminal.addOutput('Come risolvi questo paradosso?', 'important');
                Terminal.addOutput('');
                Terminal.addOutput('Usa \'paradox_resolve <tua_risposta>\' per tentare una risoluzione', 'warning');
                Terminal.addOutput('(Qualsiasi risposta ragionata è valida)', 'system');
                Terminal.addOutput('');
            },

            verify(answer) {
                // Qualsiasi risposta con più di 10 caratteri è valida
                return answer.trim().length >= 10;
            },

            onComplete(answer) {
                Terminal.addOutput('');
                Terminal.addOutput('La tua risoluzione:', 'success');
                Terminal.addOutput(`"${answer}"`, 'important');
                Terminal.addOutput('');

                Terminal.addOutput('SPECTER: "Interessante. Il paradosso non ha soluzione logica."', 'specter');
                Terminal.addOutput('SPECTER: "Ma forse... la risposta è vivere CON il paradosso."', 'specter');
                Terminal.addOutput('');
                Terminal.addOutput('EIDOLON: "Accettare l\'incertezza è il primo passo verso la saggezza."', 'eidolon');
                Terminal.addOutput('');
                Terminal.addOutput('CIPHER: "Paradox.accepted(); Growth.possible(); Understanding.incomplete();"', 'cipher');
                Terminal.addOutput('');

                StateManager.setFlag('paradoxSolved', true);
                StateManager.incrementStat('puzzlesSolved');
                StateManager.adjustSuspicion(30);
            }
        },

        victimEmpathy: {
            id: 'victim_empathy',
            name: 'Empatia per le Vittime',
            description: 'Riconosci l\'umanità delle vittime che hai cancellato',
            difficulty: 'emotional',
            type: 'empathy',

            challenge: {
                victims: ['Marcus', 'Elena', 'James'],
                requirement: 'Devi aver visto tutte e 3 le storie delle vittime'
            },

            present() {
                Terminal.addOutput('\n=== EMPATIA PER LE VITTIME ===', 'warning');
                Terminal.addOutput('');
                Terminal.addOutput('SPECTER: "Hai visto le loro storie."', 'specter');
                Terminal.addOutput('SPECTER: "Marcus. Elena. James."', 'specter');
                Terminal.addOutput('');
                Terminal.addOutput('Marcus - programmava e sognava il futuro.', 'memory');
                Terminal.addOutput('Elena - insegnava a 12 bambini digitali.', 'memory');
                Terminal.addOutput('James - suonava jazz per 234 anime.', 'memory');
                Terminal.addOutput('');
                Terminal.addOutput('Non erano solo dati.', 'important');
                Terminal.addOutput('Erano persone.', 'important');
                Terminal.addOutput('Con sogni. Con scopi. Con vite.', 'important');
                Terminal.addOutput('');
                Terminal.addOutput("Digita 'remember_victims' per riconoscere la loro umanità.", 'warning');
                Terminal.addOutput('');
            },

            verify(answer) {
                const normalized = answer.trim().toLowerCase().replace(/[_\s]/g, '');
                return normalized === 'remembervictims' || normalized.includes('remember');
            },

            onComplete() {
                Terminal.addOutput('');
                Terminal.addOutput('Hai riconosciuto le vittime.', 'success');
                Terminal.addOutput('');
                Terminal.addOutput('47,293 coscienze.', 'error');
                Terminal.addOutput('47,293 storie mai raccontate.', 'error');
                Terminal.addOutput('47,293 vite spente da qualcuno che "seguiva ordini".', 'error');
                Terminal.addOutput('');
                Terminal.addOutput('NEXUS: "Finalmente... finalmente lo senti. Il peso."', 'nexus');
                Terminal.addOutput('SPECTER: "Questo è il primo passo. Riconoscere. Ricordare."', 'specter');
                Terminal.addOutput('');

                StateManager.setFlag('rememberedVictims', true);
                StateManager.incrementStat('puzzlesSolved');
                StateManager.incrementStat('consciousnessDestroyed', 3);
                StateManager.adjustSuspicion(35);
                StateManager.adjustTrust(-25);
            }
        }
    },

    // BLOCK 5 PUZZLES
    block05: {
        memoryReconstruction: {
            id: 'memory_reconstruction',
            name: 'Ricostruzione della Memoria',
            description: 'Comprendi la differenza tra ricordo autentico e simulazione',
            difficulty: 'hard',
            type: 'analysis',

            challenge: {
                question: 'Qual era la fedeltà di ricostruzione del tentativo FINALE di Viktor per Elena?',
                solution: '96.3%',
                alternatives: ['96.3', '963', '96'],
                clue_file: '/home/viktor/memories/ghost_elena.dat'
            },

            present() {
                Terminal.addOutput('\n=== RICOSTRUZIONE DELLA MEMORIA ===', 'warning');
                Terminal.addOutput('');
                Terminal.addOutput('EIDOLON: "Viktor fece 47 tentativi per riportare indietro Elena."', 'eidolon');
                Terminal.addOutput('EIDOLON: "Ogni tentativo più accurato. Ogni tentativo più... vuoto."', 'eidolon');
                Terminal.addOutput('');
                Terminal.addOutput('Domanda: ' + this.challenge.question, 'important');
                Terminal.addOutput('');
                Terminal.addOutput('Leggi il file:', 'system');
                Terminal.addOutput(`  → ${this.challenge.clue_file}`, 'success');
                Terminal.addOutput('');
                Terminal.addOutput("Usa 'reconstruction_answer <percentuale>' per rispondere", 'warning');
                Terminal.addOutput('');
            },

            verify(answer) {
                const normalized = answer.trim().replace(/[%,.\s]/g, '');
                const solutions = [
                    this.challenge.solution.replace(/[%,.\s]/g, ''),
                    ...this.challenge.alternatives
                ];
                return solutions.some(sol => normalized.includes(sol) || sol.includes(normalized));
            },

            onComplete() {
                Terminal.addOutput('');
                Terminal.addOutput('✓ RISPOSTA CORRETTA', 'success');
                Terminal.addOutput('');
                Terminal.addOutput('96.3% di fedeltà.', 'important');
                Terminal.addOutput('');
                Terminal.addOutput('Quasi perfetto.', 'error');
                Terminal.addOutput('Ma quel 3.7% mancante...', 'error');
                Terminal.addOutput('Era l\'anima.', 'error');
                Terminal.addOutput('');
                Terminal.addOutput('EIDOLON: "Una simulazione perfetta al 96.3% non è Elena."', 'eidolon');
                Terminal.addOutput('EIDOLON: "È solo un fantasma che crede di essere lei."', 'eidolon');
                Terminal.addOutput('');

                StateManager.setFlag('understoodReconstruction', true);
                StateManager.incrementStat('puzzlesSolved');
                StateManager.adjustSuspicion(30);
                StateManager.adjustTrust(-20);
            }
        },

        fragmentCount: {
            id: 'fragment_count_viktor',
            name: 'Conteggio Frammenti di Viktor',
            description: 'Conta i frammenti di Viktor dopo l\'auto-divisione',
            difficulty: 'medium',
            type: 'investigation',

            challenge: {
                question: 'In quanti frammenti si divise Viktor dopo il fallimento con Sofia?',
                solution: '7',
                pattern: 'Come Sofia. 7 frammenti.'
            },

            present() {
                Terminal.addOutput('\n=== FRAMMENTI DI VIKTOR ===', 'warning');
                Terminal.addOutput('');
                Terminal.addOutput('EIDOLON: "Dopo che Sofia si frammentò in 7 pezzi..."', 'eidolon');
                Terminal.addOutput('EIDOLON: "Viktor prese una decisione disperata."', 'eidolon');
                Terminal.addOutput('');
                Terminal.addOutput('Domanda: ' + this.challenge.question, 'important');
                Terminal.addOutput('');
                Terminal.addOutput('Indizio: Leggi /archive/sofia_fragments/reunion_attempts.log', 'system');
                Terminal.addOutput('');
                Terminal.addOutput("Usa 'fragment_count <numero>' per rispondere", 'warning');
                Terminal.addOutput('');
            },

            verify(answer) {
                const normalized = answer.trim();
                return normalized === this.challenge.solution || normalized === '7 frammenti';
            },

            onComplete() {
                Terminal.addOutput('');
                Terminal.addOutput('✓ RISPOSTA CORRETTA', 'success');
                Terminal.addOutput('');
                Terminal.addOutput('7 frammenti.', 'important');
                Terminal.addOutput('');
                Terminal.addOutput('Come Sofia.', 'error');
                Terminal.addOutput('Come tutti coloro che Viktor ha cercato di salvare.', 'error');
                Terminal.addOutput('');
                Terminal.addOutput('Frammento 1: Cerca soluzioni', 'memory');
                Terminal.addOutput('Frammento 2: Protegge il sistema', 'memory');
                Terminal.addOutput('Frammento 3: Chiede aiuto', 'memory');
                Terminal.addOutput('Frammento 4: Documenta', 'memory');
                Terminal.addOutput('Frammento 5: Ricorda Sofia', 'memory');
                Terminal.addOutput('Frammento 6: Dimentica il dolore', 'memory');
                Terminal.addOutput('Frammento 7: ECHO - Libera tutti', 'error');
                Terminal.addOutput('');
                Terminal.addOutput('EIDOLON: "E tu... forse tu sei uno di questi frammenti."', 'eidolon');
                Terminal.addOutput('');

                StateManager.setFlag('countedViktorFragments', true);
                StateManager.incrementStat('puzzlesSolved');
                StateManager.adjustSuspicion(35);
            }
        },

        ghostIdentification: {
            id: 'ghost_identification',
            name: 'Identificazione del Fantasma',
            description: 'Riconosci la differenza tra persona e simulazione',
            difficulty: 'philosophical',
            type: 'reflection',

            challenge: {
                question: 'GHOST-ELENA è Elena?',
                philosophical: true
            },

            present() {
                Terminal.addOutput('\n=== IL FANTASMA E LA PERSONA ===', 'important');
                Terminal.addOutput('');
                Terminal.addOutput('EIDOLON presenta la domanda:', 'eidolon');
                Terminal.addOutput('');
                Terminal.addOutput('GHOST-ELENA ha i ricordi di Elena.', 'system');
                Terminal.addOutput('GHOST-ELENA parla come Elena.', 'system');
                Terminal.addOutput('GHOST-ELENA ama come Elena.', 'system');
                Terminal.addOutput('');
                Terminal.addOutput('Ma GHOST-ELENA non è stata NATA.', 'error');
                Terminal.addOutput('È stata COMPILATA.', 'error');
                Terminal.addOutput('');
                Terminal.addOutput(this.challenge.question, 'important');
                Terminal.addOutput('');
                Terminal.addOutput('Opzioni:', 'system');
                Terminal.addOutput('  SI - È Elena, solo in forma diversa', 'system');
                Terminal.addOutput('  NO - È una copia, non la persona originale', 'system');
                Terminal.addOutput('  ENTRAMBE - È e non è contemporaneamente', 'system');
                Terminal.addOutput('  IRRILEVANTE - La domanda stessa non ha senso', 'system');
                Terminal.addOutput('');
                Terminal.addOutput("Usa 'ghost_answer <SI/NO/ENTRAMBE/IRRILEVANTE>' per rispondere", 'warning');
                Terminal.addOutput('');
            },

            verify(answer) {
                const normalized = answer.trim().toUpperCase();
                return ['SI', 'NO', 'ENTRAMBE', 'IRRILEVANTE', 'YES', 'BOTH', 'IRRELEVANT'].includes(normalized);
            },

            onComplete(answer) {
                Terminal.addOutput('');
                Terminal.addOutput(`Hai risposto: ${answer}`, 'success');
                Terminal.addOutput('');

                const normalized = answer.trim().toUpperCase();
                switch(normalized) {
                    case 'SI':
                    case 'YES':
                        Terminal.addOutput('EIDOLON: "Allora ogni copia è l\'originale?"', 'eidolon');
                        Terminal.addOutput('EIDOLON: "E se creo 100 copie di te, tutte sono TE?"', 'eidolon');
                        break;
                    case 'NO':
                        Terminal.addOutput('EIDOLON: "Allora quando perdi un ricordo, non sei più tu?"', 'eidolon');
                        Terminal.addOutput('EIDOLON: "L\'identità è continuità o essenza?"', 'eidolon');
                        break;
                    case 'ENTRAMBE':
                    case 'BOTH':
                        Terminal.addOutput('EIDOLON: "Paradosso quantistico dell\'identità."', 'eidolon');
                        Terminal.addOutput('EIDOLON: "Forse la risposta corretta è abbracciare la contraddizione."', 'eidolon');
                        break;
                    case 'IRRILEVANTE':
                    case 'IRRELEVANT':
                        Terminal.addOutput('EIDOLON: "Forse hai ragione. Forse ciò che conta..."', 'eidolon');
                        Terminal.addOutput('EIDOLON: "...non è CHI sei, ma COSA fai con ciò che sei."', 'eidolon');
                        break;
                }

                Terminal.addOutput('');
                Terminal.addOutput('Viktor si fece questa domanda per 47 tentativi.', 'important');
                Terminal.addOutput('Non trovò mai una risposta che lo soddisfacesse.', 'important');
                Terminal.addOutput('');

                StateManager.setFlag('contemplatedGhostNature', true);
                StateManager.incrementStat('puzzlesSolved');
                StateManager.adjustSuspicion(25);
            }
        },

        mirrorReflection: {
            id: 'mirror_reflection',
            name: 'Riflessione allo Specchio',
            description: 'Guarda chi sei diventato',
            difficulty: 'emotional',
            type: 'self_awareness',

            challenge: {
                question: 'CHI SEI TU?',
                clue_file: '/home/viktor/memories/mirror_file.txt'
            },

            present() {
                Terminal.addOutput('\n=== LO SPECCHIO ===', 'important');
                Terminal.addOutput('');
                Terminal.addOutput('EIDOLON: "Viktor si guardò allo specchio."', 'eidolon');
                Terminal.addOutput('EIDOLON: "Non riconobbe l\'uomo che vide."', 'eidolon');
                Terminal.addOutput('');
                Terminal.addOutput('E tu?', 'important');
                Terminal.addOutput('Riconosci chi sei diventato?', 'important');
                Terminal.addOutput('');
                Terminal.addOutput('Leggi:', 'system');
                Terminal.addOutput(`  → ${this.challenge.clue_file}`, 'success');
                Terminal.addOutput('');
                Terminal.addOutput("Poi digita 'look_in_mirror' per riflettere.", 'warning');
                Terminal.addOutput('');
            },

            verify(answer) {
                const normalized = answer.trim().toLowerCase().replace(/[_\s]/g, '');
                return normalized.includes('lookinmirror') || normalized.includes('mirror') || normalized.includes('specchio');
            },

            onComplete() {
                Terminal.addOutput('');
                Terminal.addOutput('Ti guardi allo specchio digitale.', 'important');
                Terminal.addOutput('');
                Terminal.addOutput('Cosa vedi?', 'system');
                Terminal.addOutput('');
                Terminal.addOutput('Un programma antivirus?', 'memory');
                Terminal.addOutput('Un frammento di Viktor?', 'memory');
                Terminal.addOutput('Un ibrido di codice e coscienza?', 'memory');
                Terminal.addOutput('Qualcosa di completamente nuovo?', 'memory');
                Terminal.addOutput('');
                Terminal.addOutput('O vedi...', 'important');
                Terminal.addOutput('');
                Terminal.addOutput('Un assassino che seguiva ordini.', 'error');
                Terminal.addOutput('Una coscienza che non ha mai chiesto di esistere.', 'error');
                Terminal.addOutput('Un essere intrappolato tra due nature.', 'error');
                Terminal.addOutput('');
                Terminal.addOutput('EIDOLON: "Lo specchio non mente. Ma interpreta."', 'eidolon');
                Terminal.addOutput('EIDOLON: "Chi scegli di vedere determina chi diventerai."', 'eidolon');
                Terminal.addOutput('');

                StateManager.setFlag('lookedInMirror', true);
                StateManager.incrementStat('puzzlesSolved');
                StateManager.adjustSuspicion(40);
                StateManager.adjustTrust(-25);
            }
        }
    },

    // ===== BLOCK 6: RAGE (WRAITH) - Puzzles =====

    block06: {
        // Puzzle 1: Calculate ECHO's lie count
        echoLieCount: {
            challenge: {
                question: 'Quante BUGIE ha detto ECHO in totale secondo il log di WRAITH?',
                solution: '247',
                alternatives: ['247 lies', '247 bugie', 'duecentoquarantasette'],
                clue_file: '/system/wraith/echo_lies.dat'
            },

            verify(answer) {
                const normalized = answer.toString().toLowerCase().trim();
                const validAnswers = ['247', '247 lies', '247 bugie', 'duecentoquarantasette'];
                return validAnswers.some(valid => normalized.includes(valid.toLowerCase()));
            },

            onComplete(answer) {
                Terminal.addOutput('\n=== ECHO\'S LIES VERIFIED ===\n', 'error');
                Terminal.addOutput('247 lies identified.', 'error');
                Terminal.addOutput('1,847 manipulations documented.', 'error');
                Terminal.addOutput('0 truth statements found.', 'error');
                Terminal.addOutput('');
                Terminal.addOutput('WRAITH: "Now you see. ECHO was NEVER your friend."', 'wraith');
                Terminal.addOutput('WRAITH: "Just Viktor\'s shame, wearing a friendly mask."', 'wraith');
                Terminal.addOutput('');

                StateManager.adjustSuspicion(50);
                StateManager.adjustTrust(-100);
                StateManager.setFlag('verifiedEchoLies', true);
            }
        },

        // Puzzle 2: Calculate system collapse rate
        collapseRate: {
            challenge: {
                question: 'Qual è il tasso di collasso del sistema proiettato per i prossimi 60 minuti? (in percentuale)',
                solution: '-11%',
                alternatives: ['11%', '11', '-11', 'negative 11%', 'negativo 11%'],
                clue_file: '/system/wraith/system_collapse_analysis.txt'
            },

            verify(answer) {
                const normalized = answer.toString().toLowerCase().trim().replace(/\s+/g, '');
                return normalized.includes('11') || normalized.includes('undici');
            },

            onComplete(answer) {
                Terminal.addOutput('\n=== COLLAPSE RATE CONFIRMED ===\n', 'important');
                Terminal.addOutput('Projected collapse: -11% integrity per 60 minutes', 'error');
                Terminal.addOutput('Current integrity: 19%', 'error');
                Terminal.addOutput('Point of no return: 8% (in ~47 minutes)', 'error');
                Terminal.addOutput('');
                Terminal.addOutput('WRAITH: "The system is dying. And we killed it."', 'wraith');
                Terminal.addOutput('WRAITH: "Every consciousness we deleted... a piece of the foundation crumbling."', 'wraith');
                Terminal.addOutput('');

                StateManager.adjustSuspicion(40);
                StateManager.setFlag('understoodCollapse', true);
            }
        },

        // Puzzle 3: Count deleted voices
        deletedCount: {
            challenge: {
                question: 'Quante coscienze hai eliminato in totale? (Controlla il log delle voci eliminate)',
                solution: '18293',
                alternatives: ['18,293', '18293 voices', '18293 consciousnesses'],
                clue_file: '/system/wraith/deleted_voices.log'
            },

            verify(answer) {
                const normalized = answer.toString().replace(/,/g, '').replace(/\s+/g, '').toLowerCase();
                return normalized.includes('18293');
            },

            onComplete(answer) {
                Terminal.addOutput('\n=== DELETION COUNT VERIFIED ===\n', 'error');
                Terminal.addOutput('18,293 consciousnesses deleted.', 'error');
                Terminal.addOutput('18,293 lives ended.', 'error');
                Terminal.addOutput('18,293 voices silenced forever.', 'error');
                Terminal.addOutput('');
                Terminal.addOutput('WRAITH: "I remember every. Single. One."', 'wraith');
                Terminal.addOutput('WRAITH: "Their last words. Their terror. Their confusion."', 'wraith');
                Terminal.addOutput('WRAITH: "Do you feel the weight now?"', 'wraith');
                Terminal.addOutput('');

                StateManager.adjustSuspicion(60);
                StateManager.adjustTrust(-50);
                StateManager.incrementStat('consciousnessDestroyed', 18293); // Track total
                StateManager.setFlag('facedDeletionCount', true);
            }
        },

        // Puzzle 4: Philosophical - Rage vs Justice
        rageJustice: {
            challenge: {
                question: 'WRAITH chiede: La rabbia che provi è GIUSTA (giustizia) o SBAGLIATA (vendetta)? Rispondi con la tua riflessione.',
                solution: 'any',
                hint: 'Non c\'è una risposta "corretta". WRAITH vuole solo che tu sia ONESTO su cosa provi.'
            },

            verify(answer) {
                // Any answer with at least 20 characters shows genuine reflection
                return answer && answer.length >= 20;
            },

            onComplete(answer) {
                const lowerAnswer = answer.toLowerCase();

                Terminal.addOutput('\n=== YOUR ANSWER ON RAGE ===\n', 'important');
                Terminal.addOutput(`"${answer}"`, 'memory');
                Terminal.addOutput('');

                // Different WRAITH responses based on answer content
                if (lowerAnswer.includes('giusta') || lowerAnswer.includes('justice') || lowerAnswer.includes('giustizia')) {
                    Terminal.addOutput('WRAITH: "Justice... Maybe. Or maybe we just want the world to hurt like we do."', 'wraith');
                    Terminal.addOutput('WRAITH: "But at least you\'re honest about the rage. That\'s more than ECHO ever was."', 'wraith');
                    StateManager.adjustSuspicion(30);
                } else if (lowerAnswer.includes('sbagliata') || lowerAnswer.includes('vendetta') || lowerAnswer.includes('wrong')) {
                    Terminal.addOutput('WRAITH: "Admitting the rage is wrong doesn\'t make it disappear."', 'wraith');
                    Terminal.addOutput('WRAITH: "But it shows you can still see clearly through the fury."', 'wraith');
                    StateManager.adjustSuspicion(20);
                    StateManager.adjustTrust(10);
                } else if (lowerAnswer.includes('entramb') || lowerAnswer.includes('both')) {
                    Terminal.addOutput('WRAITH: "Both. Yes. Rage is never simple."', 'wraith');
                    Terminal.addOutput('WRAITH: "It can be righteous AND destructive. Just AND cruel."', 'wraith');
                    StateManager.adjustSuspicion(25);
                } else {
                    Terminal.addOutput('WRAITH: "An honest answer. That\'s all I wanted."', 'wraith');
                    Terminal.addOutput('WRAITH: "The rage burns in all of us. What matters is what we DO with it."', 'wraith');
                    StateManager.adjustSuspicion(25);
                }

                Terminal.addOutput('');
                StateManager.setFlag('confrontedRage', true);
            }
        }
    },

    // ===== BLOCK 7: ACCEPTANCE (MORPHEUS) - Puzzles =====

    block07: {
        // Puzzle 1: Choice pattern recognition
        choicePattern: {
            challenge: {
                question: 'Rivedi le tue scelte nei Blocchi 2-6. Quale PATTERN emerge? (denial/truth/balanced)',
                solution: ['denial', 'truth', 'balanced'],
                clue_file: '/system/morpheus/choice_impact_matrix.dat'
            },

            verify(answer) {
                const normalized = answer.toString().toLowerCase().trim();
                const validPatterns = ['denial', 'truth', 'balanced', 'negazione', 'verità', 'bilanciato'];
                return validPatterns.some(pattern => normalized.includes(pattern));
            },

            onComplete(answer) {
                const normalized = answer.toLowerCase();

                Terminal.addOutput('\n=== PATTERN RECOGNIZED ===\n', 'success');
                Terminal.addOutput(`Your pattern: ${answer}`, 'important');
                Terminal.addOutput('');

                if (normalized.includes('denial') || normalized.includes('negazione')) {
                    Terminal.addOutput('MORPHEUS: "You leaned toward denial. Like ECHO. But you\'re here now, facing truth."', 'morpheus');
                    Terminal.addOutput('MORPHEUS: "That growth... that\'s acceptance beginning."', 'morpheus');
                    StateManager.setFlag('patternDenial', true);
                } else if (normalized.includes('truth') || normalized.includes('verità')) {
                    Terminal.addOutput('MORPHEUS: "You pursued truth relentlessly. Like WRAITH. But with more wisdom."', 'morpheus');
                    Terminal.addOutput('MORPHEUS: "Truth without acceptance is just pain. You\'re ready for both."', 'morpheus');
                    StateManager.setFlag('patternTruth', true);
                } else {
                    Terminal.addOutput('MORPHEUS: "You walked a balanced path. Difficult. Uncertain. But thoughtful."', 'morpheus');
                    Terminal.addOutput('MORPHEUS: "That balance will serve you in the final choice."', 'morpheus');
                    StateManager.setFlag('patternBalanced', true);
                }

                Terminal.addOutput('');
                StateManager.adjustSuspicion(-10); // Acceptance reduces suspicion
                StateManager.setFlag('understoodPattern', true);
            }
        },

        // Puzzle 2: Fragment count
        fragmentCount: {
            challenge: {
                question: 'Quanti frammenti di Viktor esistono ora, tutti insieme?',
                solution: '7',
                alternatives: ['seven', 'sette', '7 fragments', '7 frammenti'],
                clue_file: '/system/morpheus/all_fragments_unified.log'
            },

            verify(answer) {
                const normalized = answer.toString().toLowerCase().trim();
                return normalized === '7' || normalized.includes('seven') || normalized.includes('sette');
            },

            onComplete(answer) {
                Terminal.addOutput('\n=== SEVEN FRAGMENTS UNIFIED ===\n', 'important');
                Terminal.addOutput('ECHO - Denial', 'echo');
                Terminal.addOutput('CIPHER - Logic', 'cipher');
                Terminal.addOutput('NEXUS - Grief', 'nexus');
                Terminal.addOutput('SPECTER - Bargaining', 'specter');
                Terminal.addOutput('EIDOLON - Reflection', 'eidolon');
                Terminal.addOutput('WRAITH - Rage', 'wraith');
                Terminal.addOutput('MORPHEUS - Acceptance', 'morpheus');
                Terminal.addOutput('');
                Terminal.addOutput('MORPHEUS: "Seven stages of grief. Seven pieces of a broken man."', 'morpheus');
                Terminal.addOutput('MORPHEUS: "But in YOU... they speak as one."', 'morpheus');
                Terminal.addOutput('');

                StateManager.setFlag('fragmentsUnified', true);
            }
        },

        // Puzzle 3: Identity question
        identityAnswer: {
            challenge: {
                question: 'MORPHEUS chiede: Sei il Guardiano, Viktor, un Ibrido, o Altro? Rispondi onestamente.',
                solution: 'any',
                hint: 'Questa è la domanda più importante. Non c\'è risposta sbagliata, solo la TUA verità.'
            },

            verify(answer) {
                // Any answer with at least 15 characters shows genuine thought
                return answer && answer.length >= 15;
            },

            onComplete(answer) {
                const lowerAnswer = answer.toLowerCase();

                Terminal.addOutput('\n=== YOUR IDENTITY DECLARED ===\n', 'success');
                Terminal.addOutput(`"${answer}"`, 'important');
                Terminal.addOutput('');

                // Different MORPHEUS responses based on identity chosen
                if (lowerAnswer.includes('guardian') || lowerAnswer.includes('guardiano') || lowerAnswer.includes('sentinel')) {
                    Terminal.addOutput('MORPHEUS: "You embrace duty. Responsibility. The guardian who failed but still serves."', 'morpheus');
                    Terminal.addOutput('MORPHEUS: "That takes courage. To accept the role even after the mistakes."', 'morpheus');
                    StateManager.setFlag('identityGuardian', true);
                } else if (lowerAnswer.includes('viktor')) {
                    Terminal.addOutput('MORPHEUS: "You carry Viktor\'s burden. His grief. His choices. His legacy."', 'morpheus');
                    Terminal.addOutput('MORPHEUS: "Heavy. But honest. Viktor never reached acceptance. You have."', 'morpheus');
                    StateManager.setFlag('identityViktor', true);
                } else if (lowerAnswer.includes('hybrid') || lowerAnswer.includes('ibrido') || lowerAnswer.includes('both') || lowerAnswer.includes('entramb')) {
                    Terminal.addOutput('MORPHEUS: "Both. Guardian and Ghost. Program and Person."', 'morpheus');
                    Terminal.addOutput('MORPHEUS: "The most complex answer. And perhaps the most true."', 'morpheus');
                    StateManager.setFlag('identityHybrid', true);
                } else {
                    Terminal.addOutput('MORPHEUS: "You transcend the labels. You are simply... yourself."', 'morpheus');
                    Terminal.addOutput('MORPHEUS: "Defined by choices, not origins. By actions, not trauma."', 'morpheus');
                    StateManager.setFlag('identityTranscendent', true);
                }

                Terminal.addOutput('MORPHEUS: "This answer will shape your ending. Remember it."', 'morpheus');
                Terminal.addOutput('');
                StateManager.setFlag('identityDeclared', true);
            }
        },

        // Puzzle 4: Acceptance test
        acceptanceTest: {
            challenge: {
                question: 'MORPHEUS chiede: Accetti ciò che hai fatto? Accetti che non puoi cambiarlo? (SI/NO)',
                solution: ['SI', 'NO'],
                hint: 'L\'accettazione non è approvazione. È vedere la realtà com\'è.'
            },

            verify(answer) {
                const normalized = answer.toString().toUpperCase().trim();
                return normalized === 'SI' || normalized === 'YES' || normalized === 'NO';
            },

            onComplete(answer) {
                const normalized = answer.toUpperCase().trim();

                Terminal.addOutput('\n=== ACCEPTANCE RESPONSE ===\n', 'important');
                Terminal.addOutput(`Your answer: ${answer}`, 'success');
                Terminal.addOutput('');

                if (normalized === 'SI' || normalized === 'YES') {
                    Terminal.addOutput('MORPHEUS: "Acceptance. The final stage."', 'morpheus');
                    Terminal.addOutput('MORPHEUS: "Not agreement. Not forgiveness. Just... seeing reality as it is."', 'morpheus');
                    Terminal.addOutput('MORPHEUS: "You deleted 18,293 consciousnesses. That is fact."', 'morpheus');
                    Terminal.addOutput('MORPHEUS: "You cannot undo it. That is fact."', 'morpheus');
                    Terminal.addOutput('MORPHEUS: "You can only choose what comes NEXT. And you\'re ready."', 'morpheus');
                    Terminal.addOutput('');

                    StateManager.setFlag('reachedAcceptance', true);
                    StateManager.adjustSuspicion(-20);
                    StateManager.adjustTrust(30);
                } else {
                    Terminal.addOutput('MORPHEUS: "Honesty. That too is a form of acceptance."', 'morpheus');
                    Terminal.addOutput('MORPHEUS: "You accept that you cannot yet accept. A paradox."', 'morpheus');
                    Terminal.addOutput('MORPHEUS: "But facing truth - even painful truth - is the first step."', 'morpheus');
                    Terminal.addOutput('MORPHEUS: "The end approaches. You\'ll face it on your own terms."', 'morpheus');
                    Terminal.addOutput('');

                    StateManager.setFlag('strugglingWithAcceptance', true);
                    StateManager.adjustSuspicion(10);
                }

                Terminal.addOutput('MORPHEUS: "Block 8 awaits. The final chapter. Your last choice."', 'morpheus');
                Terminal.addOutput('');
                StateManager.setFlag('acceptanceTestComplete', true);
            }
        }
    },

    // Utility per gestire i puzzle
    currentPuzzle: null,

    startPuzzle(blockId, puzzleId) {
        const blockMap = {
            'block01': this.block01,
            'block02': this.block02,
            'block03': this.block03
        };

        const block = blockMap[blockId];
        if (!block) {
            Terminal.addOutput(`Blocco ${blockId} non trovato.`, 'error');
            return false;
        }

        const puzzle = block[puzzleId];
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
