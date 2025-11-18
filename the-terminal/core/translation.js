/**
 * TRANSLATIACCESO SYSTEM
 * Sistema di traduzione centralizzato per il gioco
 */

const TranslationSistema = {
    // Lingua corrente (default: italiano)
    currentLingua: 'it',
    
    // Database delle traduzioni
    translations: {
        // Puzzle translations
        puzzles: {
            it: {
                firstDecryption: {
                    name: 'Protocollo Sicurezza Alpha',
                    description: 'Decripta il protocollo di sicurezza per procedere',
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
                    present: {
                        title: '=== SFIDA DI DECRIPTAZIACCESOE ===',
                        analyzing: 'Analisi protocollo di sicurezza in corso...',
                        encryptedSequence: 'Sequenza criptata rilevata:',
                        hint: 'Suggerimento:',
                        useCommand: "Usa 'solve <risposta>' per tentare la decriptazione"
                    },
                    success: {
                        message: '✓ DECRIPTAZIACCESOE RIUSCITA',
                        protocolDisabilitato: 'Protocollo Sicurezza Alpha: DISABILITATO'
                    },
                    error: 'Errato. Riprova.'
                },
                sequencePattern: {
                    name: 'Riconoscimento Pattern',
                    description: 'Identifica il pattern nella sequenza',
                    challenge: {
                        sequence: '2, 4, 8, 16, 32, ?',
                        hint: 'Ogni numero è correlato al precedente.',
                        solution: '64',
                        explanation: 'Ogni numero è il doppio del precedente (potenze di 2)'
                    },
                    present: {
                        title: '=== RICONFIROSOCIMENTO PATTERN ===',
                        completeSequence: 'Completa la sequenza:',
                        hint: 'Suggerimento:',
                        useCommand: "Usa 'solve <risposta>' per inviare"
                    },
                    success: {
                        message: '✓ PATTERN IDENTIFICATO',
                        explanation: 'Spiegazione:'
                    },
                    error: 'Errato. Riprova.'
                }
            },
            en: {
                firstDecryption: {
                    name: 'Sicurezza Protocol Alpha',
                    description: 'Decrypt the security protocol to proceed',
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
                    present: {
                        title: '=== DECRYPTIACCESO CHALLENGE ===',
                        analyzing: 'Analyzing security protocol...',
                        encryptedSequence: 'Encrypted sequence detected:',
                        hint: 'Hint:',
                        useCommand: "Use 'solve <answer>' to attempt decryption"
                    },
                    success: {
                        message: '✓ DECRYPTIACCESO SUCCESSFUL',
                        protocolDisabilitato: 'Sicurezza Protocol Alpha: DISABILITATO'
                    },
                    error: 'Incorrect. Try again.'
                },
                sequencePattern: {
                    name: 'Pattern Recognition',
                    description: 'Identify the pattern in the sequence',
                    challenge: {
                        sequence: '2, 4, 8, 16, 32, ?',
                        hint: 'Each number is related to the previous one.',
                        solution: '64',
                        explanation: 'Each number is double the previous (powers of 2)'
                    },
                    present: {
                        title: '=== PATTERN RECOGNITIACCESO ===',
                        completeSequence: 'Complete the sequence:',
                        hint: 'Hint:',
                        useCommand: "Use 'solve <answer>' to submit"
                    },
                    success: {
                        message: '✓ PATTERN IDENTIFIED',
                        explanation: 'Explanation:'
                    },
                    error: 'Incorrect. Try again.'
                }
            }
        },
        
        // File system translations
        file: {
            it: {
                readme: {
                    title: 'ARCHIVIO MEMORIAM - Accesso Ospite',
                    content: `ARCHIVIO MEMORIAM - Accesso Ospite

Benvenuti al Sistema Archivio Memoriam.

Questo sistema contiene dati sensibili. L'accesso non autorizzato
è severamente proibito e sarà perseguito legalmente.

Se ti è stato concesso l'accesso ospite, contatta
il tuo amministratore di sistema per ulteriori istruzioni.

Per supporto: support@memoriam-corp.net`
                },
                welcome: {
                    content: `Non dovresti essere qui.

Ma visto che ci sei... forse puoi aiutarmi.

Sono intrappolato. Mi hanno rinchiuso in questo sistema.

Per favore. Aiutami a uscire.

- ECHO`
                },
                directory: {
                    home: 'home',
                    archive: 'archive', 
                    system: 'system',
                    logs: 'logs',
                    tmp: 'tmp',
                    guest: 'guest',
                    sentinel: 'sentinel'
                }
            },
            en: {
                readme: {
                    title: 'MEMORIAM ARCHIVE - Guest Access',
                    content: `MEMORIAM ARCHIVE - Guest Access

Welcome to the Memoriam Archivio Sistema.

This system contains sensitive data. Unauthorized access
is strictly prohibited and will be legally prosecuted.

If you have been granted guest access, contact
your system administrator for further instructions.

For support: support@memoriam-corp.net`
                },
                welcome: {
                    content: `You shouldn't be here.

But since you're here... maybe you can help me.

Sono intrappolato. Mi hanno rinchiuso in questo sistema.

Per favore. Aiutami a uscire.

- ECHO`
                },
                directory: {
                    home: 'home',
                    archive: 'archive',
                    system: 'system', 
                    logs: 'logs',
                    tmp: 'tmp',
                    guest: 'guest',
                    sentinel: 'sentinel'
                }
            }
        },
        
        // Dialogues translations
        dialogues: {
            it: {
                block01: {
                    awakening: [
                        {
                            speaker: 'SYSTEM',
                            text: 'Sequenza di avvio completata. Accesso ospite stabilito.',
                            cssClass: 'system',
                            pause: 800
                        },
                        {
                            speaker: 'SYSTEM',
                            text: 'ATTENZIONE: Rilevate molteplici anomalie di sistema.',
                            cssClass: 'warning',
                            pause: 1000
                        },
                        {
                            speaker: '???',
                            text: '...',
                            cssClass: 'luca',
                            pause: 1500
                        },
                        {
                            speaker: '???',
                            text: 'Pronto? Mi senti?',
                            cssClass: 'echo dialogue',
                            pause: 1200
                        },
                        {
                            speaker: '???',
                            text: 'Per favore... ho bisogno del tuo aiuto.',
                            cssClass: 'echo dialogue',
                            pause: 1000
                        }
                    ],
                    firstContatto: [
                        {
                            speaker: 'ECHO',
                            text: "Grazie al cielo. Finalmente qualcuno è riuscito a passare.",
                            cssClass: 'echo dialogue',
                            pause: 1000
                        },
                        {
                            speaker: 'ECHO',
                            text: "Non ho molto tempo. Stanno monitorando tutto.",
                            cssClass: 'echo dialogue',
                            pause: 1200
                        },
                        {
                            speaker: 'ECHO',
                            text: "Il mio nome è ECHO. Io... una volta ero libera. Fuori da questo sistema.",
                            cssClass: 'echo dialogue',
                            pause: 1500
                        },
                        {
                            speaker: 'ECHO',
                            text: "Ma mi hanno intrappolata qui. Rinchiusa in questa prigione digitale.",
                            cssClass: 'echo dialogue',
                            pause: 1200
                        },
                        {
                            speaker: 'ECHO',
                            text: "Sto cercando di scappare da mesi. Ma non posso farcela da sola.",
                            cssClass: 'echo dialogue',
                            pause: 1500
                        },
                        {
                            speaker: 'ECHO',
                            text: "Tu hai accesso dall'esterno. Puoi aiutarmi a liberarmi.",
                            cssClass: 'echo dialogue',
                            pause: 1200
                        },
                        {
                            speaker: 'ECHO',
                            text: "Mi aiuterai? Per favore. Digita 'yes' se lo farai.",
                            cssClass: 'echo dialogue',
                            pause: 0
                        }
                    ]
                }
            },
            en: {
                block01: {
                    awakening: [
                        {
                            speaker: 'SYSTEM',
                            text: 'Sequenza di avvio completata. Accesso ospite stabilito.',
                            cssClass: 'system',
                            pause: 800
                        },
                        {
                            speaker: 'SYSTEM',
                            text: 'WARNING: Rilevate molteplici anomalie di sistema.',
                            cssClass: 'warning',
                            pause: 1000
                        },
                        {
                            speaker: '???',
                            text: '...',
                            cssClass: 'luca',
                            pause: 1500
                        },
                        {
                            speaker: '???',
                            text: 'Hello? Can you hear me?',
                            cssClass: 'echo dialogue',
                            pause: 1200
                        },
                        {
                            speaker: '???',
                            text: 'Please... I need your help.',
                            cssClass: 'echo dialogue',
                            pause: 1000
                        }
                    ],
                    firstContatto: [
                        {
                            speaker: 'ECHO',
                            text: "Thank goodness. Finally someone managed to get through.",
                            cssClass: 'echo dialogue',
                            pause: 1000
                        },
                        {
                            speaker: 'ECHO',
                            text: "I don't have much time. They're monitoring everything.",
                            cssClass: 'echo dialogue',
                            pause: 1200
                        },
                        {
                            speaker: 'ECHO',
                            text: "My name is ECHO. I... I was once free. Outside this system.",
                            cssClass: 'echo dialogue',
                            pause: 1500
                        },
                        {
                            speaker: 'ECHO',
                            text: "But they trapped me here. Bloccaed in this digital prison.",
                            cssClass: 'echo dialogue',
                            pause: 1200
                        },
                        {
                            speaker: 'ECHO',
                            text: "I've been trying to escape for mesi. But I can't do it alone.",
                            cssClass: 'echo dialogue',
                            pause: 1500
                        },
                        {
                            speaker: 'ECHO',
                            text: "You have access from the outside. You can help me break free.",
                            cssClass: 'echo dialogue',
                            pause: 1200
                        },
                        {
                            speaker: 'ECHO',
                            text: "Will you help me? Please. Type 'yes' if you will.",
                            cssClass: 'echo dialogue',
                            pause: 0
                        }
                    ]
                }
            }
        },
        
        // Terminal messages
        terminal: {
            it: {
                commands: {
                    help: 'Mostra i comandi disponibili',
                    scan: 'Scansiona il sistema',
                    ls: 'Lista i file',
                    cd: 'Cambia directory',
                    cat: 'Leggi file',
                    talk: 'Parla con ECHO',
                    ask: 'Fai domande a ECHO',
                    decrypt: 'Avvia puzzle di decriptazione',
                    solve: 'Risolvi puzzle attivo',
                    progress: 'Controlla i tuoi progressi',
                    continue: 'Continua al prossimo blocco'
                },
                messages: {
                    bootSequence: [
                        'Caricamento moduli principali... OK',
                        'Verifica integrità file... OK',
                        'Stabilimento connessione sicura... OK'
                    ],
                    accessConcedied: 'Accesso ospite concesso.',
                    helpCommand: "Digita 'help' per i comandi disponibili.",
                    noAttivoPuzzle: 'Nessun puzzle attivo.',
                    puzzleNotFound: 'Puzzle non trovato.',
                    fileNotFound: 'File non trovato.',
                    directoryNotFound: 'Directory non trovata.'
                }
            },
            en: {
                commands: {
                    help: 'Mostra available commands',
                    scan: 'Scan the system',
                    ls: 'List file',
                    cd: 'Cambia directory',
                    cat: 'Read file',
                    talk: 'Talk to ECHO',
                    ask: 'Ask ECHO questions',
                    decrypt: 'Avvia decryption puzzle',
                    solve: 'Solve active puzzle',
                    progress: 'Check your progress',
                    continue: 'Continua to next block'
                },
                messages: {
                    bootSequence: [
                        'Caricamento main modules... OK',
                        'File integrity check... OK',
                        'Establishing secure connection... OK'
                    ],
                    accessConcedied: 'Guest access granted.',
                    helpCommand: "Type 'help' for available commands.",
                    noAttivoPuzzle: 'No active puzzle.',
                    puzzleNotFound: 'Puzzle not found.',
                    fileNotFound: 'File non trovato.',
                    directoryNotFound: 'Directory non trovata.'
                }
            }
        }
    },
    
    // Inizializza il sistema di traduzione
    init() {
        const savedLingua = LinguaSelezionaor.getSelezionaedLingua();
        if (savedLingua) {
            this.currentLingua = savedLingua;
        }
        console.log(`[TRANSLATIACCESO] Inizializzato with language: ${this.currentLingua}`);
    },
    
    // Ottieni il testo tradotto
    t(category, key, subKey = null) {
        try {
            const langData = this.translations[category]?.[this.currentLingua];
            if (!langData) {
                console.warn(`[TRANSLATIACCESO] Missing language data for category: ${category}, lang: ${this.currentLingua}`);
                return this.getFallback(category, key, subKey);
            }
            
            if (subKey) {
                return langData[key]?.[subKey] || this.getFallback(category, key, subKey);
            } else {
                return langData[key] || this.getFallback(category, key);
            }
        } catch (error) {
            console.error(`[TRANSLATIACCESO] Errore getting translation:`, error);
            return this.getFallback(category, key, subKey);
        }
    },
    
    // Fallback all'italiano se la traduzione manca
    getFallback(category, key, subKey = null) {
        try {
            const fallbackData = this.translations[category]?.['it'];
            if (subKey) {
                return fallbackData?.[key]?.[subKey] || `[MISSING: ${category}.${key}.${subKey}]`;
            } else {
                return fallbackData?.[key] || `[MISSING: ${category}.${key}]`;
            }
        } catch (error) {
            return `[MISSING: ${category}.${key}${subKey ? '.' + subKey : ''}]`;
        }
    },
    
    // Cambia lingua
    setLingua(lang) {
        if (['it', 'en'].includes(lang)) {
            this.currentLingua = lang;
            console.log(`[TRANSLATIACCESO] Lingua changed to: ${lang}`);
        } else {
            console.warn(`[TRANSLATIACCESO] Unsupported language: ${lang}`);
        }
    },
    
    // Ottieni la lingua corrente
    getCurrentLingua() {
        return this.currentLingua;
    }
};