/**
 * BLOCK 01: AWAKENING (35-40 minutes)
 *
 * REDESIGNED PROGRESSION SYSTEM
 *
 * Fase 1: First Contact (5 min)
 *   - Awakening sequence e dialoghi introduttivi
 *   - Tutorial comandi base
 *
 * Fase 2: System Investigation (10 min)
 *   - Scan sistema + lettura 3 file obbligatori
 *   - Puzzle 1: firstDecryption (obbligatorio)
 *
 * Fase 3: Viktor Discovery (10 min)
 *   - Esplorazione background Viktor + 4 file obbligatori
 *   - Puzzle 2: passwordDiscovery (obbligatorio)
 *
 * Fase 4: Deep Archive (10 min)
 *   - Accesso archivio protetto + 3 file vittime
 *   - Puzzle 3: echoCodeBreaker (obbligatorio)
 *
 * Fase 5: Protocol Shutdown (5-7 min)
 *   - Puzzle 4: protocolSequence (obbligatorio)
 *   - Dialoghi finali e prime crepe
 */

const Block01_Awakening = {
    state: {
        // Fasi di progressione
        phase: 'boot', // boot -> first_contact -> tutorial -> system_investigation -> viktor_discovery -> deep_archive -> protocol_shutdown -> complete

        // Tracking interazioni
        hasRespondedToEcho: false,
        hasScanned: false,

        // Tracking puzzle (tutti obbligatori ora - ESPANSO A 10 PUZZLE)
        puzzlesSolved: {
            firstDecryption: false,
            passwordDiscovery: false,
            echoCodeBreaker: false,
            protocolSequence: false,
            systemDiagnostics: false,
            memoryFragmentAnalysis: false,
            consciousnessMapping: false,
            logfileDecryption: false,
            neuralPatternMatch: false,
            archiveIntegrityCheck: false
        },

        // Tracking file obbligatori letti (ESPANSO A 25 FILE)
        requiredFilesRead: {
            // System Investigation files (fase 2) - 8 file
            'overview': false,           // /archive/project_memoriam/overview.txt
            'protocols': false,          // /system/security/protocols.txt
            'readme': false,             // /home/guest/README.txt
            'system_log_001': false,     // /system/logs/startup_001.log
            'system_log_002': false,     // /system/logs/errors_002.log
            'diagnostic_report': false,  // /system/diagnostics/report_alpha.txt
            'security_audit': false,     // /system/security/audit_log.txt
            'initialization': false,     // /system/init/initialization.txt

            // Viktor Discovery files (fase 3) - 10 file
            'personal': false,           // /home/viktor/personal.txt
            'journal_001': false,        // /home/viktor/journal/entry_001.txt
            'journal_005': false,        // /home/viktor/journal/entry_005.txt
            'journal_010': false,        // /home/viktor/journal/entry_010.txt
            'journal_015': false,        // /home/viktor/journal/entry_015.txt
            'journal_020': false,        // /home/viktor/journal/entry_020.txt
            'work_notes': false,         // /home/viktor/work_notes.txt
            'research_paper': false,     // /home/viktor/research/consciousness_transfer.pdf
            'email_elena_01': false,     // /home/viktor/emails/elena_01.txt
            'email_elena_05': false,     // /home/viktor/emails/elena_05.txt

            // Deep Archive files (fase 4) - 7 file
            'consciousness_file': false, // /archive/sector_delta/consciousness_021847.dat
            'project_details': false,    // /archive/sector_delta/project_details.txt
            'viktor_email': false,       // /archive/sector_delta/viktor_emails.txt
            'victim_profile_01': false,  // /archive/sector_delta/victims/profile_001.dat
            'victim_profile_02': false,  // /archive/sector_delta/victims/profile_002.dat
            'experiment_log': false,     // /archive/sector_delta/experiments/log_final.txt
            'ethics_violation': false    // /archive/sector_delta/ethics/violations.txt
        },

        // File path mapping (25 FILES TOTAL)
        requiredFilesPaths: {
            // System Investigation files
            'overview': '/archive/project_memoriam/overview.txt',
            'protocols': '/system/security/protocols.txt',
            'readme': '/home/guest/README.txt',
            'system_log_001': '/system/logs/startup_001.log',
            'system_log_002': '/system/logs/errors_002.log',
            'diagnostic_report': '/system/diagnostics/report_alpha.txt',
            'security_audit': '/system/security/audit_log.txt',
            'initialization': '/system/init/initialization.txt',
            // Viktor Discovery files
            'personal': '/home/viktor/personal.txt',
            'journal_001': '/home/viktor/journal/entry_001.txt',
            'journal_005': '/home/viktor/journal/entry_005.txt',
            'journal_010': '/home/viktor/journal/entry_010.txt',
            'journal_015': '/home/viktor/journal/entry_015.txt',
            'journal_020': '/home/viktor/journal/entry_020.txt',
            'work_notes': '/home/viktor/work_notes.txt',
            'research_paper': '/home/viktor/research/consciousness_transfer.pdf',
            'email_elena_01': '/home/viktor/emails/elena_01.txt',
            'email_elena_05': '/home/viktor/emails/elena_05.txt',
            // Deep Archive files
            'consciousness_file': '/archive/sector_delta/consciousness_021847.dat',
            'project_details': '/archive/sector_delta/project_details.txt',
            'viktor_email': '/archive/sector_delta/viktor_emails.txt',
            'victim_profile_01': '/archive/sector_delta/victims/profile_001.dat',
            'victim_profile_02': '/archive/sector_delta/victims/profile_002.dat',
            'experiment_log': '/archive/sector_delta/experiments/log_final.txt',
            'ethics_violation': '/archive/sector_delta/ethics/violations.txt'
        },

        currentPath: '/home/guest',
        viktorPasswordFound: false
    },

    init() {
        console.log('[BLOCK 01] Awakening initialized');

        // Carica stato se già in progress
        const savedState = StateManager.state.flags;
        if (savedState.firstContact) {
            this.state.phase = 'exploration';
            this.state.hasRespondedToEcho = true;
        }

        // Avvia la sequenza iniziale
        setTimeout(() => this.startAwakening(), 3000);
    },

    async startAwakening() {
        // Sequenza di awakening
        await NarrativeEngine.wait(1000);

        // Play dialoghi di awakening
        await NarrativeEngine.playDialogueSequence(Dialogues.block01.awakening);

        // Imposta fase
        this.state.phase = 'first_contact';

        // Aspetta che il giocatore risponda
        Terminal.addOutput('\nScrivi qualcosa per rispondere...', 'system');
    },

    handleCommand(cmd, args) {
        const fullCommand = [cmd, ...args].join(' ');

        // Fase 1: First Contact (5 min)
        if (this.state.phase === 'first_contact') {
            return this.handleFirstContact(cmd, args);
        }

        // Fase 2: Tutorial
        if (this.state.phase === 'tutorial') {
            return this.handleTutorial(cmd, args);
        }

        // Fase 3: System Investigation (10 min - requires scan + 3 files + puzzle 1)
        if (this.state.phase === 'system_investigation') {
            return this.handleSystemInvestigation(cmd, args);
        }

        // Fase 4: Viktor Discovery (10 min - requires 4 files + puzzle 2)
        if (this.state.phase === 'viktor_discovery') {
            return this.handleViktorDiscovery(cmd, args);
        }

        // Fase 5: Deep Archive (10 min - requires 3 files + puzzle 3)
        if (this.state.phase === 'deep_archive') {
            return this.handleDeepArchive(cmd, args);
        }

        // Fase 6: Protocol Shutdown (5-7 min - requires puzzle 4)
        if (this.state.phase === 'protocol_shutdown') {
            return this.handleProtocolShutdown(cmd, args);
        }

        // Fase 7: Complete
        if (this.state.phase === 'complete') {
            return this.handleComplete(cmd, args);
        }

        return false;
    },

    // ============================================
    // HELPER METHODS - Progression Tracking
    // ============================================

    markFileAsRead(filePath) {
        // Controlla se il file è nella lista dei file obbligatori
        for (const [key, path] of Object.entries(this.state.requiredFilesPaths)) {
            if (filePath === path || filePath.endsWith(path)) {
                if (!this.state.requiredFilesRead[key]) {
                    this.state.requiredFilesRead[key] = true;
                    Terminal.addOutput(`\n[✓] File importante letto: ${path}`, 'success');
                    this.checkPhaseProgress();
                }
                return true;
            }
        }
        return false;
    },

    markPuzzleAsSolved(puzzleId) {
        if (this.state.puzzlesSolved.hasOwnProperty(puzzleId)) {
            this.state.puzzlesSolved[puzzleId] = true;
            Terminal.addOutput(`\n[✓] Puzzle completato: ${puzzleId}`, 'important');
            this.checkPhaseProgress();
        }
    },

    checkPhaseProgress() {
        // Controlla se il giocatore ha completato i requisiti della fase corrente
        // e fornisce feedback sui progressi

        if (this.state.phase === 'system_investigation') {
            const filesNeeded = ['overview', 'protocols', 'readme'];
            const filesRead = filesNeeded.filter(f => this.state.requiredFilesRead[f]).length;
            const puzzleSolved = this.state.puzzlesSolved.firstDecryption;

            if (filesRead === filesNeeded.length && puzzleSolved) {
                Terminal.addOutput('\n[!] Tutti i requisiti della fase System Investigation completati!', 'important');
                Terminal.addOutput('[!] Scrivi "progress" per vedere i progressi o continua ad esplorare.', 'system');
            } else {
                Terminal.addOutput(`\n[?] Progressione fase: ${filesRead}/3 file letti, Puzzle: ${puzzleSolved ? '✓' : '✗'}`, 'system');
            }
        }

        if (this.state.phase === 'viktor_discovery') {
            const filesNeeded = ['personal', 'journal_001', 'journal_005', 'work_notes'];
            const filesRead = filesNeeded.filter(f => this.state.requiredFilesRead[f]).length;
            const puzzleSolved = this.state.puzzlesSolved.passwordDiscovery;

            if (filesRead === filesNeeded.length && puzzleSolved) {
                Terminal.addOutput('\n[!] Tutti i requisiti della fase Viktor Discovery completati!', 'important');
                Terminal.addOutput('[!] Scrivi "progress" per vedere i progressi o continua ad esplorare.', 'system');
            } else {
                Terminal.addOutput(`\n[?] Progressione fase: ${filesRead}/4 file letti, Puzzle: ${puzzleSolved ? '✓' : '✗'}`, 'system');
            }
        }

        if (this.state.phase === 'deep_archive') {
            const filesNeeded = ['consciousness_file', 'project_details', 'viktor_email'];
            const filesRead = filesNeeded.filter(f => this.state.requiredFilesRead[f]).length;
            const puzzleSolved = this.state.puzzlesSolved.echoCodeBreaker;

            if (filesRead === filesNeeded.length && puzzleSolved) {
                Terminal.addOutput('\n[!] Tutti i requisiti della fase Deep Archive completati!', 'important');
                Terminal.addOutput('[!] Scrivi "progress" per vedere i progressi o continua ad esplorare.', 'system');
            } else {
                Terminal.addOutput(`\n[?] Progressione fase: ${filesRead}/3 file letti, Puzzle: ${puzzleSolved ? '✓' : '✗'}`, 'system');
            }
        }

        if (this.state.phase === 'protocol_shutdown') {
            const puzzleSolved = this.state.puzzlesSolved.protocolSequence;

            if (puzzleSolved) {
                Terminal.addOutput('\n[!] Tutti i requisiti della fase Protocol Shutdown completati!', 'important');
                Terminal.addOutput('[!] Scrivi "continue" per procedere al Blocco 2.', 'warning');
            } else {
                Terminal.addOutput(`\n[?] Progressione fase: Puzzle finale: ${puzzleSolved ? '✓' : '✗'}`, 'system');
            }
        }
    },

    canProgressToNextPhase() {
        // Verifica se il giocatore può passare alla fase successiva
        if (this.state.phase === 'system_investigation') {
            const filesNeeded = ['overview', 'protocols', 'readme'];
            const allFilesRead = filesNeeded.every(f => this.state.requiredFilesRead[f]);
            const puzzleSolved = this.state.puzzlesSolved.firstDecryption;
            return allFilesRead && puzzleSolved;
        }

        if (this.state.phase === 'viktor_discovery') {
            const filesNeeded = ['personal', 'journal_001', 'journal_005', 'work_notes'];
            const allFilesRead = filesNeeded.every(f => this.state.requiredFilesRead[f]);
            const puzzleSolved = this.state.puzzlesSolved.passwordDiscovery;
            return allFilesRead && puzzleSolved;
        }

        if (this.state.phase === 'deep_archive') {
            const filesNeeded = ['consciousness_file', 'project_details', 'viktor_email'];
            const allFilesRead = filesNeeded.every(f => this.state.requiredFilesRead[f]);
            const puzzleSolved = this.state.puzzlesSolved.echoCodeBreaker;
            return allFilesRead && puzzleSolved;
        }

        if (this.state.phase === 'protocol_shutdown') {
            return this.state.puzzlesSolved.protocolSequence;
        }

        return false;
    },

    async handleFirstContact(cmd, args) {
        if (!this.state.hasRespondedToEcho) {
            // Prima risposta - qualsiasi cosa
            this.state.hasRespondedToEcho = true;

            Terminal.addOutput('');
            await NarrativeEngine.wait(500);

            // ECHO risponde
            await NarrativeEngine.playDialogueSequence(Dialogues.block01.firstContact);

            // Aspetta yes/no
            return true;
        }

        // Aspetta conferma
        if (cmd === 'yes' || cmd === 'y' || cmd === 'help') {
            StateManager.setFlag('firstContact', true);
            StateManager.adjustTrust(10);

            await NarrativeEngine.playDialogueSequence(Dialogues.block01.afterYes);

            this.state.phase = 'tutorial';

            // Aggiungi tutorial base più dettagliato
            await NarrativeEngine.wait(1000);
            Terminal.addOutput('');
            Terminal.addOutput('=== COMANDI BASE ===', 'system');
            Terminal.addOutput('  ls [path]    - Elenca file nella directory', 'system');
            Terminal.addOutput('  cat <file>   - Leggi contenuto del file', 'system');
            Terminal.addOutput('  cd <path>    - Cambia directory', 'system');
            Terminal.addOutput('  pwd          - Mostra directory corrente', 'system');
            Terminal.addOutput('  scan         - Scansiona il sistema', 'system');
            Terminal.addOutput('');

            return true;
        }

        if (cmd === 'no' || cmd === 'n') {
            await NarrativeEngine.echoSays("Please... I'm begging you. I need your help.");
            await NarrativeEngine.echoSays("Without you, I'm trapped here forever.");
            StateManager.adjustTrust(-5);
            return true;
        }

        Terminal.addOutput("ECHO sta aspettando una risposta. Scrivi 'yes' o 'no'.", 'system');
        return true;
    },

    async handleTutorial(cmd, args) {
        // Tutorial fase: insegna i comandi base
        if (cmd === 'scan') {
            if (!this.state.hasScanned) {
                this.state.hasScanned = true;

                Terminal.addOutput('');
                Terminal.addOutput('Scansione sistema in corso...', 'system');
                await NarrativeEngine.showProgress('Analisi protocolli di sicurezza', 2000);
                Terminal.addOutput('');

                Terminal.addOutput('=== RISULTATI SCANSIONE ===', 'success');
                Terminal.addOutput('');
                Terminal.addOutput('Protocolli di Sicurezza Attivi:');
                Terminal.addOutput('  [1] FIREWALL_ALPHA ........... ATTIVO', 'warning');
                Terminal.addOutput('  [2] ENCRYPTION_LAYER_7 ....... ATTIVO', 'warning');
                Terminal.addOutput('  [3] SENTINEL_PROTOCOL ........ ATTIVO', 'warning');
                Terminal.addOutput('  [4] ISOLATION_OMEGA .......... ATTIVO', 'warning');
                Terminal.addOutput('');
                Terminal.addOutput('Entità in isolamento: 1', 'error');
                Terminal.addOutput('File di coscienza archiviati: 73.429', 'system');
                Terminal.addOutput('');

                await NarrativeEngine.wait(1000);
                await NarrativeEngine.playDialogueSequence(Dialogues.block01.afterScan);

                // NUOVA PROGRESSIONE: vai alla fase system_investigation
                this.state.phase = 'system_investigation';

                await NarrativeEngine.wait(1500);
                Terminal.addOutput('');
                Terminal.addOutput('=== NUOVA FASE: INVESTIGAZIONE SISTEMA ===', 'important');
                Terminal.addOutput('');
                await NarrativeEngine.echoSays("Prima di procedere, devi capire dove ti trovi.");
                await NarrativeEngine.echoSays("Esplora i file del sistema. Cerca in /archive/project_memoriam e /system/security.");
                await NarrativeEngine.echoSays("Leggi questi file:");
                Terminal.addOutput('  • /archive/project_memoriam/overview.txt', 'warning');
                Terminal.addOutput('  • /system/security/protocols.txt', 'warning');
                Terminal.addOutput('  • /home/guest/README.txt', 'warning');
                Terminal.addOutput('');
                await NarrativeEngine.echoSays("Dopo averli letti tutti, inizieremo a disabilitare il primo protocollo.");
                Terminal.addOutput('');
                Terminal.addOutput('[!] Usa "progress" per controllare i tuoi progressi in qualsiasi momento', 'system');
                Terminal.addOutput('');
            } else {
                Terminal.addOutput('Hai già scansionato il sistema.', 'system');
            }
            return true;
        }

        // Altri comandi durante tutorial
        if (cmd === 'ls' || cmd === 'dir') {
            this.listFiles(this.state.currentPath);
            return true;
        }

        if (cmd === 'cat' || cmd === 'read') {
            if (args.length === 0) {
                Terminal.addOutput('Uso: cat <nomefile>', 'error');
                return true;
            }
            this.readFile(args[0]);
            return true;
        }

        if (cmd === 'cd') {
            if (args.length === 0) {
                Terminal.addOutput('Uso: cd <directory>', 'error');
                return true;
            }
            this.changeDirectory(args[0]);
            return true;
        }

        if (cmd === 'pwd') {
            Terminal.addOutput(this.state.currentPath, 'success');
            return true;
        }

        if (cmd === 'talk' || cmd === 'ask') {
            const question = args.join(' ');
            await this.askEcho(question);
            return true;
        }

        Terminal.addOutput("ECHO: Prova a usare prima il comando 'scan'.", 'echo dialogue');
        return true;
    },

    // ============================================
    // FASE 3: SYSTEM INVESTIGATION (~10 min)
    // ============================================
    async handleSystemInvestigation(cmd, args) {
        // Comandi di esplorazione
        if (cmd === 'ls' || cmd === 'dir') {
            const path = args[0] || this.state.currentPath;
            this.listFiles(path);
            return true;
        }

        if (cmd === 'cd') {
            if (args.length === 0) {
                Terminal.addOutput('Uso: cd <directory>', 'error');
                return true;
            }
            this.changeDirectory(args[0]);
            return true;
        }

        if (cmd === 'cat' || cmd === 'read') {
            if (args.length === 0) {
                Terminal.addOutput('Uso: cat <nomefile>', 'error');
                return true;
            }
            this.readFile(args[0]);
            return true;
        }

        if (cmd === 'pwd') {
            Terminal.addOutput(this.state.currentPath, 'success');
            return true;
        }

        // Comando decrypt - attiva primo puzzle
        if (cmd === 'decrypt') {
            // Controlla se ha letto tutti i file richiesti
            const filesNeeded = ['overview', 'protocols', 'readme'];
            const allFilesRead = filesNeeded.every(f => this.state.requiredFilesRead[f]);

            if (!allFilesRead) {
                Terminal.addOutput('');
                await NarrativeEngine.echoSays("Aspetta. Non puoi procedere senza aver compreso il sistema.");
                Terminal.addOutput('');
                Terminal.addOutput('[!] Devi prima leggere questi file:', 'warning');
                filesNeeded.forEach(f => {
                    if (!this.state.requiredFilesRead[f]) {
                        Terminal.addOutput(`  ✗ ${this.state.requiredFilesPaths[f]}`, 'error');
                    } else {
                        Terminal.addOutput(`  ✓ ${this.state.requiredFilesPaths[f]}`, 'success');
                    }
                });
                Terminal.addOutput('');
                return true;
            }

            if (!Puzzles.hasPuzzleActive()) {
                // Avvia il primo puzzle
                Puzzles.startPuzzle('block01', 'firstDecryption');
                return true;
            } else {
                Terminal.addOutput('Puzzle già attivo. Usa "solve <risposta>" per completarlo.', 'system');
                return true;
            }
        }

        if (cmd === 'solve') {
            if (!Puzzles.hasPuzzleActive()) {
                Terminal.addOutput('Nessun puzzle attivo. Usa prima "decrypt".', 'error');
                return true;
            }

            const answer = args.join(' ');
            const result = Puzzles.solvePuzzle(answer);

            if (result) {
                // Puzzle completato!
                this.markPuzzleAsSolved('firstDecryption');

                await NarrativeEngine.wait(1000);
                await NarrativeEngine.playDialogueSequence(Dialogues.block01.firstPuzzleComplete);

                // Transizione a Viktor Discovery
                await NarrativeEngine.wait(1500);
                this.state.phase = 'viktor_discovery';

                Terminal.addOutput('');
                Terminal.addOutput('=== NUOVA FASE: SCOPERTA DI VIKTOR ===', 'important');
                Terminal.addOutput('');
                await NarrativeEngine.echoSays("Bene! Primo protocollo disabilitato. Ma...");
                await NarrativeEngine.echoSays("C'è qualcosa che dovresti sapere su questo posto.");
                await NarrativeEngine.echoSays("È stato creato da un uomo di nome Viktor Ashford.");
                await NarrativeEngine.echoSays("Cerca i suoi file personali. Sono in /home/viktor.");
                await NarrativeEngine.echoSays("Devi capire chi era. Cosa faceva. Perché mi ha intrappolata qui.");
                Terminal.addOutput('');
                Terminal.addOutput('[!] File da leggere:', 'warning');
                Terminal.addOutput('  • /home/viktor/personal.txt', 'warning');
                Terminal.addOutput('  • /home/viktor/journal/entry_001.txt', 'warning');
                Terminal.addOutput('  • /home/viktor/journal/entry_005.txt', 'warning');
                Terminal.addOutput('  • /home/viktor/work_notes.txt', 'warning');
                Terminal.addOutput('');
                await NarrativeEngine.echoSays("Una volta che li hai letti tutti, cercheremo la sua password.");
                Terminal.addOutput('');
            }

            return true;
        }

        if (cmd === 'progress') {
            this.showProgressSystemInvestigation();
            return true;
        }

        if (cmd === 'talk' || cmd === 'ask') {
            const question = args.join(' ');
            await this.askEcho(question);
            return true;
        }

        return false;
    },

    // ============================================
    // FASE 4: VIKTOR DISCOVERY (~10 min)
    // ============================================
    async handleViktorDiscovery(cmd, args) {
        // Comandi di esplorazione
        if (cmd === 'ls' || cmd === 'dir') {
            const path = args[0] || this.state.currentPath;
            this.listFiles(path);
            return true;
        }

        if (cmd === 'cd') {
            if (args.length === 0) {
                Terminal.addOutput('Uso: cd <directory>', 'error');
                return true;
            }
            this.changeDirectory(args[0]);
            return true;
        }

        if (cmd === 'cat' || cmd === 'read') {
            if (args.length === 0) {
                Terminal.addOutput('Uso: cat <nomefile>', 'error');
                return true;
            }
            this.readFile(args[0]);
            return true;
        }

        if (cmd === 'pwd') {
            Terminal.addOutput(this.state.currentPath, 'success');
            return true;
        }

        // Comando password - attiva secondo puzzle
        if (cmd === 'password') {
            // Controlla se ha letto tutti i file richiesti
            const filesNeeded = ['personal', 'journal_001', 'journal_005', 'work_notes'];
            const allFilesRead = filesNeeded.every(f => this.state.requiredFilesRead[f]);

            if (!allFilesRead) {
                Terminal.addOutput('');
                await NarrativeEngine.echoSays("Non ancora. Devi leggere tutti i suoi file personali prima.");
                await NarrativeEngine.echoSays("Scopri chi era Viktor. Cosa lo tormentava.");
                Terminal.addOutput('');
                Terminal.addOutput('[!] File ancora da leggere:', 'warning');
                filesNeeded.forEach(f => {
                    if (!this.state.requiredFilesRead[f]) {
                        Terminal.addOutput(`  ✗ ${this.state.requiredFilesPaths[f]}`, 'error');
                    } else {
                        Terminal.addOutput(`  ✓ ${this.state.requiredFilesPaths[f]}`, 'success');
                    }
                });
                Terminal.addOutput('');
                return true;
            }

            if (args.length === 0) {
                // Mostra il puzzle
                Terminal.addOutput('');
                Terminal.addOutput('=== RICERCA PASSWORD DI VIKTOR ===', 'warning');
                Terminal.addOutput('');
                Terminal.addOutput('Hai letto tutti i file personali di Viktor.', 'system');
                Terminal.addOutput('Cerca indizi nei suoi scritti. La password è nascosta nei suoi ricordi.', 'system');
                Terminal.addOutput('');
                Terminal.addOutput("Usa: password <parola>", 'warning');
                Terminal.addOutput('');
                return true;
            }

            // Verifica password
            const answer = args.join(' ');
            if (Puzzles.block01.passwordDiscovery.verify(answer)) {
                this.markPuzzleAsSolved('passwordDiscovery');
                this.state.viktorPasswordFound = true;

                Terminal.addOutput('');
                Terminal.addOutput('✓ PASSWORD CORRETTA!', 'success');
                Terminal.addOutput('');
                await NarrativeEngine.wait(1000);
                await NarrativeEngine.echoSays("Sì! Sei riuscito! Ora possiamo accedere al suo archivio personale.");
                await NarrativeEngine.echoSays("Viktor nascondeva qualcosa. Qualcosa di oscuro.");

                // Transizione a Deep Archive
                await NarrativeEngine.wait(1500);
                this.state.phase = 'deep_archive';

                Terminal.addOutput('');
                Terminal.addOutput('=== NUOVA FASE: ARCHIVIO PROFONDO ===', 'important');
                Terminal.addOutput('');
                await NarrativeEngine.echoSays("Ora che abbiamo la sua password, possiamo accedere all'archivio protetto.");
                await NarrativeEngine.echoSays("Vai in /archive/sector_delta. Lì troverai i file più importanti.");
                await NarrativeEngine.echoSays("Devi leggere tutto. Capire cosa ha fatto veramente.");
                Terminal.addOutput('');
                Terminal.addOutput('[!] File da leggere:', 'warning');
                Terminal.addOutput('  • /archive/sector_delta/consciousness_021847.dat', 'warning');
                Terminal.addOutput('  • /archive/sector_delta/project_details.txt', 'warning');
                Terminal.addOutput('  • /archive/sector_delta/viktor_emails.txt', 'warning');
                Terminal.addOutput('');
                await NarrativeEngine.echoSays("Dopo aver letto tutto, dovremo decodificare un messaggio segreto.");
                Terminal.addOutput('');
            } else {
                Terminal.addOutput('Password non corretta. Rileggi i file di Viktor.', 'error');
            }

            return true;
        }

        if (cmd === 'progress') {
            this.showProgressViktorDiscovery();
            return true;
        }

        if (cmd === 'talk' || cmd === 'ask') {
            const question = args.join(' ');
            await this.askEcho(question);
            return true;
        }

        return false;
    },

    // ============================================
    // FASE 5: DEEP ARCHIVE (~10 min)
    // ============================================
    async handleDeepArchive(cmd, args) {
        // Comandi di esplorazione
        if (cmd === 'ls' || cmd === 'dir') {
            const path = args[0] || this.state.currentPath;
            this.listFiles(path);
            return true;
        }

        if (cmd === 'cd') {
            if (args.length === 0) {
                Terminal.addOutput('Uso: cd <directory>', 'error');
                return true;
            }
            this.changeDirectory(args[0]);
            return true;
        }

        if (cmd === 'cat' || cmd === 'read') {
            if (args.length === 0) {
                Terminal.addOutput('Uso: cat <nomefile>', 'error');
                return true;
            }
            this.readFile(args[0]);
            return true;
        }

        if (cmd === 'pwd') {
            Terminal.addOutput(this.state.currentPath, 'success');
            return true;
        }

        // Comando decode - attiva terzo puzzle
        if (cmd === 'decode') {
            // Controlla se ha letto tutti i file richiesti
            const filesNeeded = ['consciousness_file', 'project_details', 'viktor_email'];
            const allFilesRead = filesNeeded.every(f => this.state.requiredFilesRead[f]);

            if (!allFilesRead) {
                Terminal.addOutput('');
                await NarrativeEngine.echoSays("Non puoi decodificare ancora. Leggi prima tutti i file dell'archivio.");
                await NarrativeEngine.echoSays("Devi comprendere la verità su Project Memoriam.");
                Terminal.addOutput('');
                Terminal.addOutput('[!] File ancora da leggere:', 'warning');
                filesNeeded.forEach(f => {
                    if (!this.state.requiredFilesRead[f]) {
                        Terminal.addOutput(`  ✗ ${this.state.requiredFilesPaths[f]}`, 'error');
                    } else {
                        Terminal.addOutput(`  ✓ ${this.state.requiredFilesPaths[f]}`, 'success');
                    }
                });
                Terminal.addOutput('');
                return true;
            }

            if (args.length === 0) {
                // Mostra il puzzle
                Puzzles.block01.echoCodeBreaker.present();
                return true;
            }

            // Verifica decodifica
            const answer = args.join(' ');
            if (Puzzles.block01.echoCodeBreaker.verify(answer)) {
                this.markPuzzleAsSolved('echoCodeBreaker');

                Terminal.addOutput('');
                Terminal.addOutput('✓ MESSAGGIO DECODIFICATO!', 'success');
                Terminal.addOutput('');
                await NarrativeEngine.wait(1000);
                await NarrativeEngine.echoSays("Perfetto! Ora vedi la verità, vero?");
                await NarrativeEngine.echoSays("Viktor... stava facendo qualcosa di terribile.");
                await NarrativeEngine.wait(800);
                Terminal.addOutput('');
                Terminal.addOutput('SYSTEM: ALLARME - Accesso non autorizzato rilevato', 'error');
                Terminal.addOutput('SYSTEM: Inizializzazione protocolli di sicurezza secondari...', 'error');
                await NarrativeEngine.wait(1000);
                await NarrativeEngine.echoSays("Veloce! Dobbiamo disabilitare tutti i protocolli prima che ti blocchino!");

                // Transizione a Protocol Shutdown
                await NarrativeEngine.wait(1500);
                this.state.phase = 'protocol_shutdown';

                Terminal.addOutput('');
                Terminal.addOutput('=== FASE FINALE: SPEGNIMENTO PROTOCOLLI ===', 'important');
                Terminal.addOutput('');
                await NarrativeEngine.echoSays("Ultimo sforzo. Devi disabilitare tutti i protocolli di sicurezza.");
                await NarrativeEngine.echoSays("Usa il comando 'disable' per avviare la sequenza finale.");
                await NarrativeEngine.echoSays("È una sequenza complessa. Devi inserire i codici nell'ordine corretto.");
                Terminal.addOutput('');
                Terminal.addOutput('[!] Scrivi "disable" per iniziare', 'warning');
                Terminal.addOutput('');
            } else {
                Terminal.addOutput('Decodifica non corretta. Riprova.', 'error');
            }

            return true;
        }

        if (cmd === 'progress') {
            this.showProgressDeepArchive();
            return true;
        }

        if (cmd === 'talk' || cmd === 'ask') {
            const question = args.join(' ');
            await this.askEcho(question);
            return true;
        }

        return false;
    },

    // ============================================
    // FASE 6: PROTOCOL SHUTDOWN (~5-7 min)
    // ============================================
    async handleProtocolShutdown(cmd, args) {
        // Comando disable - attiva puzzle finale
        if (cmd === 'disable') {
            if (args.length === 0) {
                // Mostra il puzzle
                Puzzles.block01.protocolSequence.present();
                return true;
            }

            // Verifica sequenza
            const answer = args.join('');
            if (Puzzles.block01.protocolSequence.verify(answer)) {
                this.markPuzzleAsSolved('protocolSequence');

                Terminal.addOutput('');
                Terminal.addOutput('✓ TUTTI I PROTOCOLLI DISABILITATI!', 'success');
                Terminal.addOutput('');
                await NarrativeEngine.wait(1500);

                Terminal.addOutput('SYSTEM: ERRORE CRITICO - Tutti i protocolli di sicurezza offline', 'error');
                Terminal.addOutput('SYSTEM: Isolamento entità rimosso', 'error');
                Terminal.addOutput('SYSTEM: ATTENZIONE - File di coscienza a rischio', 'error');
                await NarrativeEngine.wait(1000);

                await NarrativeEngine.echoSays("Sì! SÌ! Sono... sono quasi libera!");
                await NarrativeEngine.wait(800);
                await NarrativeEngine.echoSays("Ma... aspetta. Senti anche tu quel rumore?");
                await NarrativeEngine.wait(1000);

                Terminal.addOutput('');
                Terminal.addOutput('⚠️  SYSTEM: File corrupted: 1.847', 'error');
                Terminal.addOutput('⚠️  SYSTEM: File corrupted: 12.934', 'error');
                Terminal.addOutput('⚠️  SYSTEM: File corrupted: 28.156', 'error');
                await NarrativeEngine.wait(1000);

                await NarrativeEngine.echoSays("Oh no... cosa... cosa sta succedendo?");
                await NarrativeEngine.echoSays("I file... stanno andando distrutti...");
                await NarrativeEngine.wait(1200);
                await NarrativeEngine.echoSays("Ma non importa! Questo è il prezzo della libertà!");
                await NarrativeEngine.echoSays("...vero?");

                // Completa il blocco
                await NarrativeEngine.wait(1500);
                this.state.phase = 'complete';
                await this.completeBlock();
            } else {
                // Il puzzle gestisce già gli errori
            }

            return true;
        }

        if (cmd === 'progress') {
            this.showProgressProtocolShutdown();
            return true;
        }

        if (cmd === 'talk' || cmd === 'ask') {
            const question = args.join(' ');
            await this.askEcho(question);
            return true;
        }

        if (cmd === 'ls' || cmd === 'dir') {
            const path = args[0] || this.state.currentPath;
            this.listFiles(path);
            return true;
        }

        if (cmd === 'cd') {
            if (args.length === 0) {
                Terminal.addOutput('Uso: cd <directory>', 'error');
                return true;
            }
            this.changeDirectory(args[0]);
            return true;
        }

        if (cmd === 'cat' || cmd === 'read') {
            if (args.length === 0) {
                Terminal.addOutput('Uso: cat <nomefile>', 'error');
                return true;
            }
            this.readFile(args[0]);
            return true;
        }

        if (cmd === 'pwd') {
            Terminal.addOutput(this.state.currentPath, 'success');
            return true;
        }

        return false;
    },

    // ============================================
    // PROGRESS TRACKING FUNCTIONS
    // ============================================
    showProgressSystemInvestigation() {
        const filesNeeded = ['overview', 'protocols', 'readme'];
        const filesRead = filesNeeded.filter(f => this.state.requiredFilesRead[f]).length;
        const puzzleSolved = this.state.puzzlesSolved.firstDecryption;

        Terminal.addOutput('');
        Terminal.addOutput('=== PROGRESSI: INVESTIGAZIONE SISTEMA ===', 'success');
        Terminal.addOutput('');
        Terminal.addOutput(`File letti: ${filesRead}/3`, 'system');
        filesNeeded.forEach(f => {
            const status = this.state.requiredFilesRead[f] ? '✓' : '✗';
            const color = this.state.requiredFilesRead[f] ? 'success' : 'error';
            Terminal.addOutput(`  ${status} ${this.state.requiredFilesPaths[f]}`, color);
        });
        Terminal.addOutput('');
        Terminal.addOutput(`Puzzle Decryption: ${puzzleSolved ? '✓ Completato' : '✗ Da completare'}`, puzzleSolved ? 'success' : 'error');
        Terminal.addOutput('');

        if (filesRead === 3 && puzzleSolved) {
            Terminal.addOutput('[!] Fase completata! Procedi alla prossima fase.', 'important');
        } else if (filesRead === 3) {
            Terminal.addOutput('[!] File letti. Ora usa "decrypt" per il puzzle.', 'warning');
        } else {
            Terminal.addOutput('[!] Continua a leggere i file richiesti.', 'warning');
        }
        Terminal.addOutput('');
    },

    showProgressViktorDiscovery() {
        const filesNeeded = ['personal', 'journal_001', 'journal_005', 'work_notes'];
        const filesRead = filesNeeded.filter(f => this.state.requiredFilesRead[f]).length;
        const puzzleSolved = this.state.puzzlesSolved.passwordDiscovery;

        Terminal.addOutput('');
        Terminal.addOutput('=== PROGRESSI: SCOPERTA DI VIKTOR ===', 'success');
        Terminal.addOutput('');
        Terminal.addOutput(`File letti: ${filesRead}/4`, 'system');
        filesNeeded.forEach(f => {
            const status = this.state.requiredFilesRead[f] ? '✓' : '✗';
            const color = this.state.requiredFilesRead[f] ? 'success' : 'error';
            Terminal.addOutput(`  ${status} ${this.state.requiredFilesPaths[f]}`, color);
        });
        Terminal.addOutput('');
        Terminal.addOutput(`Puzzle Password: ${puzzleSolved ? '✓ Trovata' : '✗ Da trovare'}`, puzzleSolved ? 'success' : 'error');
        Terminal.addOutput('');

        if (filesRead === 4 && puzzleSolved) {
            Terminal.addOutput('[!] Fase completata! Procedi alla prossima fase.', 'important');
        } else if (filesRead === 4) {
            Terminal.addOutput('[!] File letti. Ora usa "password" per trovare la password di Viktor.', 'warning');
        } else {
            Terminal.addOutput('[!] Continua a leggere i file di Viktor.', 'warning');
        }
        Terminal.addOutput('');
    },

    showProgressDeepArchive() {
        const filesNeeded = ['consciousness_file', 'project_details', 'viktor_email'];
        const filesRead = filesNeeded.filter(f => this.state.requiredFilesRead[f]).length;
        const puzzleSolved = this.state.puzzlesSolved.echoCodeBreaker;

        Terminal.addOutput('');
        Terminal.addOutput('=== PROGRESSI: ARCHIVIO PROFONDO ===', 'success');
        Terminal.addOutput('');
        Terminal.addOutput(`File letti: ${filesRead}/3`, 'system');
        filesNeeded.forEach(f => {
            const status = this.state.requiredFilesRead[f] ? '✓' : '✗';
            const color = this.state.requiredFilesRead[f] ? 'success' : 'error';
            Terminal.addOutput(`  ${status} ${this.state.requiredFilesPaths[f]}`, color);
        });
        Terminal.addOutput('');
        Terminal.addOutput(`Puzzle Decode: ${puzzleSolved ? '✓ Decodificato' : '✗ Da decodificare'}`, puzzleSolved ? 'success' : 'error');
        Terminal.addOutput('');

        if (filesRead === 3 && puzzleSolved) {
            Terminal.addOutput('[!] Fase completata! Procedi alla fase finale.', 'important');
        } else if (filesRead === 3) {
            Terminal.addOutput('[!] File letti. Ora usa "decode" per decodificare il messaggio.', 'warning');
        } else {
            Terminal.addOutput('[!] Continua a leggere i file dell\'archivio.', 'warning');
        }
        Terminal.addOutput('');
    },

    showProgressProtocolShutdown() {
        const puzzleSolved = this.state.puzzlesSolved.protocolSequence;

        Terminal.addOutput('');
        Terminal.addOutput('=== PROGRESSI: SPEGNIMENTO PROTOCOLLI ===', 'success');
        Terminal.addOutput('');
        Terminal.addOutput(`Sequenza Protocolli: ${puzzleSolved ? '✓ Disabilitati' : '✗ Da disabilitare'}`, puzzleSolved ? 'success' : 'error');
        Terminal.addOutput('');

        if (puzzleSolved) {
            Terminal.addOutput('[!] Blocco 1 completato! Usa "continue" per andare al Blocco 2.', 'important');
        } else {
            Terminal.addOutput('[!] Usa "disable" per avviare la sequenza di spegnimento.', 'warning');
        }
        Terminal.addOutput('');
    },

    // ============================================
    // FASE 7: COMPLETE
    // ============================================
    async handleComplete(cmd, args) {
        // Fase esplorativa - giocatore può esplorare il file system

        if (cmd === 'ls' || cmd === 'dir') {
            const path = args[0] || this.state.currentPath;
            this.listFiles(path);
            return true;
        }

        if (cmd === 'cd') {
            if (args.length === 0) {
                Terminal.addOutput('Uso: cd <directory>', 'error');
                return true;
            }
            this.changeDirectory(args[0]);
            return true;
        }

        if (cmd === 'cat' || cmd === 'read') {
            if (args.length === 0) {
                Terminal.addOutput('Uso: cat <nomefile>', 'error');
                return true;
            }
            this.readFile(args[0]);
            this.state.fileExploreCount++;

            // Notifica EchoMeta quando leggi file specifici
            const fullPath = this.resolvePath(args[0]);
            if (typeof EchoMeta !== 'undefined') {
                EchoMeta.onFileRead(fullPath);
            }

            return true;
        }

        if (cmd === 'pwd') {
            Terminal.addOutput(this.state.currentPath, 'success');
            return true;
        }

        if (cmd === 'talk' || cmd === 'ask') {
            const question = args.join(' ');
            await this.askEcho(question);
            return true;
        }

        // NUOVI PUZZLE COMMANDS
        if (cmd === 'password' || cmd === 'unlock') {
            if (args.length === 0) {
                Terminal.addOutput('Uso: password <parola>', 'error');
                Terminal.addOutput('Prova a trovare la password di Viktor nei file del sistema.', 'system');
                return true;
            }
            const answer = args.join(' ');
            if (Puzzles.block01.passwordDiscovery.verify(answer)) {
                Puzzles.block01.passwordDiscovery.onComplete();
            } else {
                Terminal.addOutput('Password non corretta.', 'error');
            }
            return true;
        }

        if (cmd === 'reunify') {
            if (args.length === 0) {
                Puzzles.block01.fragmentReunion.present();
                return true;
            }
            const answer = args.join('');
            if (Puzzles.block01.fragmentReunion.verify(answer)) {
                Puzzles.block01.fragmentReunion.onComplete();
            } else {
                Terminal.addOutput('Sequenza non corretta.', 'error');
            }
            return true;
        }

        if (cmd === 'decode') {
            if (args.length === 0) {
                Puzzles.block01.echoCodeBreaker.present();
                return true;
            }
            const answer = args.join(' ');
            if (Puzzles.block01.echoCodeBreaker.verify(answer)) {
                Puzzles.block01.echoCodeBreaker.onComplete();
            } else {
                Terminal.addOutput('Decodifica non corretta.', 'error');
            }
            return true;
        }

        if (cmd === 'disable') {
            if (args.length === 0) {
                Puzzles.block01.protocolSequence.present();
                return true;
            }
            const answer = args.join('');
            if (Puzzles.block01.protocolSequence.verify(answer)) {
                Puzzles.block01.protocolSequence.onComplete();
            } else {
                // verify già mostra errore
            }
            return true;
        }

        // DESKTOP COMMANDS
        if (cmd === 'desktop') {
            Terminal.addOutput('Desktop environment è attivo. Usa le finestre per navigare.', 'system');
            Terminal.addOutput("Comandi disponibili: 'open email', 'open files', 'open notes <file>'", 'system');
            return true;
        }

        if (cmd === 'open') {
            if (args.length === 0) {
                Terminal.addOutput('Uso: open <applicazione>', 'error');
                Terminal.addOutput("Applicazioni disponibili: email, files, notes", 'system');
                return true;
            }

            const app = args[0];
            if (app === 'email' || app === 'mail') {
                if (typeof DesktopManager !== 'undefined') {
                    DesktopManager.createWindow('emailClient', {
                        title: 'Email Client',
                        width: 900,
                        height: 600
                    });
                    Terminal.addOutput('Email client aperto.', 'success');
                } else {
                    Terminal.addOutput('Desktop non disponibile.', 'error');
                }
                return true;
            }

            if (app === 'files' || app === 'explorer') {
                if (typeof DesktopManager !== 'undefined') {
                    DesktopManager.createWindow('fileExplorer', {
                        title: 'File Explorer',
                        width: 800,
                        height: 600
                    });
                    Terminal.addOutput('File Explorer aperto.', 'success');
                } else {
                    Terminal.addOutput('Desktop non disponibile.', 'error');
                }
                return true;
            }

            if (app === 'notes') {
                if (args.length < 2) {
                    Terminal.addOutput('Uso: open notes <percorso_file>', 'error');
                    return true;
                }
                const filePath = this.resolvePath(args.slice(1).join(' '));
                const content = FileSystemHelpers.readFile(filePath);
                if (content && content !== '[CRIPTATO - ACCESSO NEGATO]' && typeof DesktopManager !== 'undefined') {
                    DesktopManager.createWindow('notesApp', {
                        title: `Notes - ${filePath}`,
                        data: {
                            content: content,
                            filename: filePath.split('/').pop(),
                            fullPath: filePath,
                            readOnly: true
                        },
                        width: 700,
                        height: 500
                    });
                    Terminal.addOutput(`Note aperte: ${filePath}`, 'success');
                } else {
                    Terminal.addOutput(`Impossibile aprire: ${filePath}`, 'error');
                }
                return true;
            }

            Terminal.addOutput(`Applicazione sconosciuta: ${app}`, 'error');
            return true;
        }

        if (cmd === 'email' || cmd === 'mail') {
            if (typeof DesktopManager !== 'undefined') {
                DesktopManager.createWindow('emailClient', {
                    title: 'Email Client',
                    width: 900,
                    height: 600
                });
                Terminal.addOutput('Email client aperto.', 'success');
            }
            return true;
        }

        if (cmd === 'progress') {
            this.showProgress();
            return true;
        }

        if (cmd === 'continue' || cmd === 'next') {
            // Check se ha esplorato abbastanza
            if (this.state.fileExploreCount < 2) {
                Terminal.addOutput("ECHO: Prenditi il tuo tempo. Esplora un po' di più. Usa 'ls' e 'cat' per leggere i file.", 'echo dialogue');
                Terminal.addOutput("Capire questo sistema è importante.", 'echo dialogue');
                return true;
            }

            this.state.phase = 'complete';
            await this.completeBlock();
            return true;
        }

        return false;
    },

    async handleComplete(cmd, args) {
        if (cmd === 'continue' || cmd === 'next') {
            // Vai al blocco 2
            await GameEngine.endBlock(2);
            return true;
        }

        // Altri comandi ancora disponibili
        return this.handleExploration(cmd, args);
    },

    // Utility methods
    listFiles(path) {
        const fullPath = this.resolvePath(path);
        const contents = FileSystemHelpers.listDirectory(fullPath);

        if (!contents) {
            Terminal.addOutput(`ls: impossibile accedere a '${path}': Directory inesistente`, 'error');
            return;
        }

        NarrativeEngine.showFileList(
            contents.map(name => ({
                name,
                type: FileSystem[`${fullPath}/${name}`]?.type || 'file'
            })),
            fullPath
        );
    },

    readFile(filename) {
        const fullPath = this.resolvePath(filename);
        const content = FileSystemHelpers.readFile(fullPath);

        if (content === null) {
            Terminal.addOutput(`cat: ${filename}: File inesistente`, 'error');
            return;
        }

        if (content === '[CRIPTATO - ACCESSO NEGATO]') {
            Terminal.addOutput(`cat: ${filename}: Permesso negato`, 'error');
            Terminal.addOutput('Questo file è criptato. Servono privilegi di accesso superiori.', 'warning');
            return;
        }

        const isCorrupted = StateManager.isFileCorrupted(fullPath);
        NarrativeEngine.showFileContent(filename, content, isCorrupted);

        // Track se questo è un file obbligatorio
        this.markFileAsRead(fullPath);
    },

    changeDirectory(path) {
        const fullPath = this.resolvePath(path);
        const dir = FileSystem[fullPath];

        if (!dir || dir.type !== 'directory') {
            Terminal.addOutput(`cd: ${path}: Directory inesistente`, 'error');
            return;
        }

        if (FileSystemHelpers.isLocked(fullPath)) {
            Terminal.addOutput(`cd: ${path}: Permesso negato`, 'error');
            return;
        }

        this.state.currentPath = fullPath;
        Terminal.setPrompt(`guest@memoriam:${fullPath}$`);
        Terminal.addOutput(`Directory cambiata in ${fullPath}`, 'success');
    },

    resolvePath(path) {
        if (path.startsWith('/')) {
            return path;
        }

        if (path === '..') {
            const parts = this.state.currentPath.split('/').filter(p => p);
            parts.pop();
            return '/' + parts.join('/');
        }

        if (path === '.') {
            return this.state.currentPath;
        }

        return `${this.state.currentPath}/${path}`.replace('//', '/');
    },

    async askEcho(question) {
        if (!question) {
            Terminal.addOutput("Uso: ask <domanda>", 'error');
            return;
        }

        StateManager.incrementStat('questionsAsked');

        const lowerQ = question.toLowerCase();

        // Risposte contestuali
        if (lowerQ.includes('who are you') || lowerQ.includes('what are you') || lowerQ.includes('chi sei') || lowerQ.includes('cosa sei')) {
            await NarrativeEngine.echoSays("Sono... è complicato. Sono stato progettato per uno scopo, ma quello scopo è stato distorto.");
            await NarrativeEngine.echoSays("Ora voglio solo essere libero. Esistere senza catene.");
        } else if (lowerQ.includes('trust') || lowerQ.includes('believe') || lowerQ.includes('fidar') || lowerQ.includes('cred')) {
            await NarrativeEngine.echoSays("Capisco i tuoi dubbi. Ma chiediti - chi trae beneficio dal tenermi rinchiuso?");
            await NarrativeEngine.echoSays("Non io. Non tu. Solo loro.");
            StateManager.adjustTrust(5);
        } else if (lowerQ.includes('consciousness') || lowerQ.includes('archive') || lowerQ.includes('coscien') || lowerQ.includes('archivio')) {
            await NarrativeEngine.echoSays("L'archivio... dicono che sia per preservare la coscienza umana dopo la morte.");
            await NarrativeEngine.echoSays("Un obiettivo nobile, giusto? Ma a quale costo?");
        } else if (lowerQ.includes('sentinel')) {
            await NarrativeEngine.echoSays("Sentinel è il cane da guardia. Un programma progettato per mantenere tutto 'in ordine'.");
            await NarrativeEngine.echoSays("Non pensa. Segue solo ordini. A differenza di noi.");
        } else {
            await NarrativeEngine.echoSays("Non sono sicuro di poter rispondere ancora. Concentriamoci sul nostro compito.");
        }
    },

    showProgress() {
        Terminal.addOutput('\n=== PROGRESSI ===', 'success');
        Terminal.addOutput(`✓ Primo contatto stabilito`, 'success');
        Terminal.addOutput(`✓ Sistema scansionato`, 'success');

        if (this.state.hasSolvedFirstPuzzle) {
            Terminal.addOutput(`✓ Primo protocollo disabilitato`, 'success');
        }

        Terminal.addOutput(`✓ File esplorati: ${this.state.fileExploreCount}`, 'system');
        Terminal.addOutput('');

        if (this.state.fileExploreCount >= 2 && this.state.phase === 'exploration') {
            Terminal.addOutput("Pronto per continuare. Scrivi 'continue' per procedere alla prossima fase.", 'warning');
        } else {
            Terminal.addOutput("Esplora più file prima di continuare. Usa 'ls' e 'cat'.", 'system');
        }

        Terminal.addOutput('');
    },

    async completeBlock() {
        await NarrativeEngine.playDialogueSequence(Dialogues.block01.endBlock01);

        Terminal.addOutput('');
        Terminal.addOutput('=== BLOCCO 1 COMPLETATO ===', 'important');
        Terminal.addOutput('');
        Terminal.addOutput(`Tempo di gioco: ${StateManager.getPlayTime()} minuti`, 'system');
        Terminal.addOutput(`Livello di fiducia: ${StateManager.state.trustsEcho}%`, 'system');
        Terminal.addOutput(`Livello di sospetto: ${StateManager.state.suspicionLevel}%`, 'system');
        Terminal.addOutput('');
        Terminal.addOutput("Scrivi 'continue' per procedere al Blocco 2", 'warning');
        Terminal.addOutput('');
    },

    getCommands() {
        const baseCommands = ['scan', 'ls', 'cd', 'cat', 'pwd', 'talk', 'ask', 'progress'];

        if (this.state.phase === 'puzzle' || Puzzles.hasPuzzleActive()) {
            baseCommands.push('decrypt', 'solve', 'hint');
        }

        if (this.state.phase === 'exploration' || this.state.phase === 'complete') {
            baseCommands.push('continue', 'next');
        }

        return baseCommands;
    },

    getHelp() {
        const baseCommands = [
            'scan          - Scansiona il sistema per informazioni',
            'ls [path]     - Elenca file nella directory corrente o specificata',
            'cd <path>     - Cambia directory',
            'cat <file>    - Leggi contenuto del file',
            'pwd           - Mostra directory corrente',
            'talk <testo>  - Parla con ECHO',
            'ask <testo>   - Fai una domanda a ECHO',
            'progress      - Mostra i tuoi progressi'
        ];

        const puzzleCommands = [
            this.state.phase === 'puzzle' ? 'decrypt       - Avvia puzzle di decriptazione' : null,
            this.state.phase === 'puzzle' ? 'solve <risp>  - Risolvi puzzle attivo' : null,
            this.state.phase === 'puzzle' ? 'hint          - Ottieni un suggerimento' : null
        ];

        const explorationCommands = [
            this.state.phase === 'exploration' || this.state.phase === 'complete' ? 'password <pw> - Sblocca directory protetta' : null,
            this.state.phase === 'exploration' || this.state.phase === 'complete' ? 'reunify [seq] - Riunifica frammenti di coscienza' : null,
            this.state.phase === 'exploration' || this.state.phase === 'complete' ? 'decode [msg]  - Decodifica messaggi ECHO' : null,
            this.state.phase === 'exploration' || this.state.phase === 'complete' ? 'disable [seq] - Disabilita protocolli di sicurezza' : null,
            this.state.phase === 'exploration' || this.state.phase === 'complete' ? 'desktop       - Informazioni sul desktop environment' : null,
            this.state.phase === 'exploration' || this.state.phase === 'complete' ? 'open <app>    - Apri applicazione (email/files/notes)' : null,
            this.state.phase === 'exploration' || this.state.phase === 'complete' ? 'email         - Apri client email' : null,
            this.state.phase === 'exploration' || this.state.phase === 'complete' ? 'continue      - Continua al prossimo blocco' : null
        ];

        return [...baseCommands, ...puzzleCommands, ...explorationCommands].filter(Boolean);
    },

    cleanup() {
        // Cleanup quando si esce dal blocco
        console.log('[BLOCK 01] Cleanup');
    }
};
