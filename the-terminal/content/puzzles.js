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
