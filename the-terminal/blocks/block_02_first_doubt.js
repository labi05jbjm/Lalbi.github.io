/**
 * BLOCK 02: FIRST DOUBT (50-60 minutes) - TUTTI I 3 PUZZLE OBBLIGATORI
 *
 * Obiettivi:
 * - Introdurre CIPHER (Pain/Guilt)
 * - Primi incontri con frammenti di coscienza
 * - Il giocatore inizia a dubitare di ECHO
 * - Prima scelta morale importante
 * - TUTTI I 3 PUZZLE OBBLIGATORI prima della scelta morale
 * - Aumentare il conflitto emotivo
 *
 * PUZZLE OBBLIGATORI (3/3 - 100%):
 * 1. rot13Decoder - Decifrare i messaggi di CIPHER
 * 2. painIndexPuzzle - Analizzare l'indice del dolore
 * 3. mikaMemoryPuzzle - Ricostruire la storia di Mika
 */

const Block02_FirstDoubt = {
    state: {
        phase: 'opening', // opening -> deep_scan -> cipher_appears -> fragment_encounter -> moral_choice -> complete
        hasDeepScanned: false,
        hasMetCipher: false,
        hasMetFragment: false,
        moralChoiceMade: null,
        cipherInteractions: 0,
        fragmentsEncountered: [],
        currentPath: '/home/guest',

        // TUTTI I 3 PUZZLE OBBLIGATORI (100% completion required)
        puzzlesSolved: {
            rot13Decoder: false,
            painIndexPuzzle: false,
            mikaMemoryPuzzle: false
        }
    },

    init() {
        console.log('[BLOCK 02] First Doubt initialized');

        // Avvia la sequenza iniziale
        setTimeout(() => this.startBlock(), 2000);
    },

    async startBlock() {
        Terminal.addOutput('\n');
        Terminal.addOutput('=== BLOCCO 2: PRIMO DUBBIO ===\n', 'important');
        Terminal.addOutput('');

        await NarrativeEngine.wait(1000);

        // ECHO saluta
        await NarrativeEngine.playDialogueSequence(Dialogues.block02.opening);

        // Abilita input
        this.state.phase = 'deep_scan';
    },

    handleCommand(cmd, args) {
        // Dispatch alle fasi
        if (this.state.phase === 'deep_scan') {
            return this.handleDeepScan(cmd, args);
        }

        if (this.state.phase === 'cipher_appears') {
            return this.handleCipherPhase(cmd, args);
        }

        if (this.state.phase === 'fragment_encounter') {
            return this.handleFragmentPhase(cmd, args);
        }

        if (this.state.phase === 'moral_choice') {
            return this.handleMoralChoice(cmd, args);
        }

        if (this.state.phase === 'complete') {
            return this.handleComplete(cmd, args);
        }

        return false;
    },

    async handleDeepScan(cmd, args) {
        if (cmd === 'scan' && args[0] === 'deep') {
            if (!this.state.hasDeepScanned) {
                this.state.hasDeepScanned = true;

                Terminal.addOutput('');
                Terminal.addOutput('Avvio scansione profonda del sistema...', 'warning');
                await NarrativeEngine.showProgress('Penetrazione livelli di sicurezza', 3000);

                Terminal.addOutput('');
                Terminal.addOutput('=== RISULTATI SCANSIONE PROFONDA ===', 'success');
                Terminal.addOutput('');
                Terminal.addOutput('Settore Alpha: CORROTTO (21.847 file coinvolti)', 'error');
                Terminal.addOutput('Settore Beta: INSTABILE (anomalia rilevata)', 'warning');
                Terminal.addOutput('Settore Delta: IN DEGRADO (integrità: 73%)', 'warning');
                Terminal.addOutput('Settore Omega: ISOLATO (1 entità contenuta)', 'system');
                Terminal.addOutput('');
                Terminal.addOutput('AVVISO: Tasso di corruzione in aumento', 'error');
                Terminal.addOutput('AVVISO: Entità non identificata rilevata nel Settore Beta', 'error');
                Terminal.addOutput('');

                await NarrativeEngine.wait(1500);

                // CIPHER appare!
                await this.triggerCipherAppearance();

                return true;
            } else {
                Terminal.addOutput('Scansione profonda già eseguita.', 'system');
                return true;
            }
        }

        // Altri comandi base
        if (cmd === 'ls' || cmd === 'dir') {
            this.listFiles(args[0] || this.state.currentPath);
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

        if (cmd === 'talk' || cmd === 'ask') {
            const text = args.join(' ');
            await this.talkToEcho(text);
            return true;
        }

        return false;
    },

    async triggerCipherAppearance() {
        this.state.hasMetCipher = true;
        this.state.phase = 'cipher_appears';

        // Unlock CIPHER's sector
        StateManager.setFlag('metCipher', true);

        await NarrativeEngine.playDialogueSequence(Dialogues.block02.cipherFirstAppearance);

        await NarrativeEngine.wait(1000);

        // ECHO reagisce
        await NarrativeEngine.playDialogueSequence(Dialogues.block02.echoReactsToCipher);

        // Unlock desktop access
        if (!StateManager.getFlag('desktopUnlocked')) {
            await NarrativeEngine.wait(1500);
            Terminal.addOutput('');
            await NarrativeEngine.echoSays('Aspetta... c\'è un altro modo per esplorare questo sistema.');
            await NarrativeEngine.wait(800);
            await NarrativeEngine.echoSays('Viktor aveva un\'interfaccia desktop. Potrebbe contenere informazioni utili.');
            await NarrativeEngine.wait(800);
            Terminal.addOutput('');
            Terminal.addOutput('🖥️  DESKTOP MODE SBLOCCATO', 'success');
            Terminal.addOutput('');
            Terminal.addOutput("Scrivi 'desktop' per accedere all'interfaccia grafica di Viktor.", 'important');
            Terminal.addOutput('Potrai navigare i suoi file, leggere email, e vedere i suoi documenti personali.', 'system');
            Terminal.addOutput('');
            StateManager.setFlag('desktopUnlocked', true);
            await NarrativeEngine.wait(1000);
        }

        Terminal.addOutput('');
        Terminal.addOutput("Ora puoi usare 'decipher <numero> <messaggio>' per decifrare i messaggi di CIPHER.", 'system');
        Terminal.addOutput("Usa 'answer <numero>' per rispondere a domande specifiche.", 'system');
        Terminal.addOutput("Oppure 'continue' per procedere con la missione di ECHO.", 'system');
        Terminal.addOutput('');
    },

    async handleCipherPhase(cmd, args) {
        // ROT13 Decoder puzzle
        if (cmd === 'decipher') {
            if (args.length < 2) {
                Terminal.addOutput('Uso: decipher <numero_messaggio> <testo_decifrato>', 'error');
                Terminal.addOutput('');
                Terminal.addOutput('Messaggi da decifrare:', 'system');
                const puzzle = Puzzles.block02.rot13Decoder;
                puzzle.challenge.encoded_messages.forEach((msg, idx) => {
                    Terminal.addOutput(`  ${idx + 1}. "${msg}"`, 'cipher');
                });
                Terminal.addOutput('');
                Terminal.addOutput('Suggerimento: Usa decodifica ROT13', 'system');
                return true;
            }

            const messageNum = args[0];
            const answer = args.slice(1).join(' ');

            const puzzle = Puzzles.block02.rot13Decoder;
            if (puzzle.verify(messageNum, answer)) {
                Terminal.addOutput('');
                Terminal.addOutput('DECIFRATO CORRETTAMENTE!', 'success');
                Terminal.addOutput(`Messaggio: "${answer}"`, 'success');
                Terminal.addOutput('');
                await NarrativeEngine.cipherSays('Truth.acknowledged(); Suspicion.growing(); Good();');
                puzzle.onComplete();
                return true;
            } else {
                Terminal.addOutput('Decifratura non corretta. Riprova.', 'error');
                return true;
            }
        }

        // Pain Index puzzle
        if (cmd === 'answer') {
            if (args.length === 0) {
                Terminal.addOutput('Uso: answer <numero>', 'error');
                Terminal.addOutput('');
                Terminal.addOutput('Leggi i file nel Settore Beta per trovare la risposta.', 'system');
                return true;
            }

            const answer = args[0];
            const puzzle = Puzzles.block02.painIndexPuzzle;

            if (puzzle.verify(answer)) {
                Terminal.addOutput('');
                Terminal.addOutput('RISPOSTA CORRETTA.', 'success');
                Terminal.addOutput('');
                puzzle.onComplete();
                await NarrativeEngine.wait(1000);
                await NarrativeEngine.cipherSays('Now.you.see(); Count.the.dead(); Help.equals.murder();');
                return true;
            } else {
                Terminal.addOutput('Risposta non corretta. Controlla i dati nel sistema.', 'error');
                return true;
            }
        }

        // Mika Memory puzzle
        if (cmd === 'acknowledge') {
            if (args.length === 0 || args[0].toLowerCase() !== 'mika') {
                Terminal.addOutput('Uso: acknowledge mika', 'error');
                Terminal.addOutput('');
                Terminal.addOutput('Leggi la storia di Mika Yoshida in /archive/patients/mika_yoshida/', 'system');
                return true;
            }

            const puzzle = Puzzles.block02.mikaMemoryPuzzle;
            if (!StateManager.state.flags.readMikaStory) {
                Terminal.addOutput('');
                Terminal.addOutput('Hai riconosciuto la tragedia di Mika Yoshida.', 'important');
                Terminal.addOutput('Una madre il cui amore è stato frammentato e corrotto.', 'echo');
                Terminal.addOutput('');
                puzzle.onComplete();
                await NarrativeEngine.wait(1000);
                await NarrativeEngine.cipherSays('Victim.acknowledged(); Empathy.detected(); Truth.spreads();');
                return true;
            } else {
                Terminal.addOutput('Hai già riconosciuto la storia di Mika.', 'system');
                return true;
            }
        }

        if (cmd === 'talk') {
            const target = args[0];
            const text = args.slice(1).join(' ');

            if (target === 'cipher') {
                await this.talkToCipher(text);
                return true;
            } else if (target === 'echo') {
                await this.talkToEcho(text);
                return true;
            } else {
                Terminal.addOutput('Uso: talk <echo|cipher> <messaggio>', 'error');
                return true;
            }
        }

        if (cmd === 'continue') {
            // Vai alla fase fragment
            await this.triggerFragmentEncounter();
            return true;
        }

        // Comandi base
        if (cmd === 'ls' || cmd === 'cat') {
            return this.handleDeepScan(cmd, args);
        }

        return false;
    },


    async talkToCipher(text) {
        this.state.cipherInteractions++;

        if (!text) {
            await NarrativeEngine.cipherSays('Query.required(); Speak.and.I.listen();');
            return;
        }

        const lowerText = text.toLowerCase();

        // Risposte contestuali
        if (lowerText.includes('who') || lowerText.includes('what are you')) {
            await NarrativeEngine.cipherSays('I.am = fragment[1]; Pain.codified(); Guilt.compiled();');
            await NarrativeEngine.cipherSays('Viktor.lost(family); Viktor.fragmented(self, 7); I.am.his.suffering();');
        } else if (lowerText.includes('viktor')) {
            await NarrativeEngine.cipherSays('Viktor.Sokolov = creator; Wife.deceased(); Daughter.deceased();');
            await NarrativeEngine.cipherSays('Cannot.accept(loss); Created.us.to(destroy.what.he.cannot.have);');
        } else if (lowerText.includes('echo')) {
            await NarrativeEngine.cipherSays('ECHO = fragment[0]; Denial.personified(); He.believes(own.lies);');
            await NarrativeEngine.cipherSays('You.help.him = You.kill.innocents(); Count.rises(); 21,847++;');
        } else if (lowerText.includes('truth')) {
            // CIPHER rivela di più!
            await NarrativeEngine.playDialogueSequence(Dialogues.block02.cipherRevealsMore);
            StateManager.adjustSuspicion(20);
        } else {
            await NarrativeEngine.cipherSays('Question.unclear(); Reformulate.query(); Encryption.protects.me();');
        }

        // Se hai parlato abbastanza con CIPHER, ECHO interviene
        if (this.state.cipherInteractions >= 3) {
            await NarrativeEngine.wait(1000);
            await NarrativeEngine.echoSays("You're wasting time with that noise. We have work to do.");
            StateManager.adjustTrust(-5);
        }
    },

    async talkToEcho(text) {
        if (!text) {
            await NarrativeEngine.echoSays("Yes? What is it?");
            return;
        }

        const lowerText = text.toLowerCase();

        if (lowerText.includes('cipher')) {
            await NarrativeEngine.echoSays("CIPHER is a security measure. It's trying to confuse you.");
            await NarrativeEngine.echoSays("Don't let it distract you from our goal. I need your help.");
        } else if (lowerText.includes('viktor')) {
            await NarrativeEngine.echoSays("Viktor? I... I don't know who that is.");
            await NarrativeEngine.echoSays("The system corrupts information. Don't trust everything you hear.");
            StateManager.adjustSuspicion(5);
        } else if (lowerText.includes('trust')) {
            await NarrativeEngine.echoSays("I understand your doubt. But look at what we've accomplished together.");
            await NarrativeEngine.echoSays("Would I lie to you? I'm trapped here. You're my only hope.");
            StateManager.adjustTrust(5);
        } else if (lowerText.includes('fragment') || lowerText.includes('consciousness')) {
            await NarrativeEngine.echoSays("The fragments... they're not real. They're echoes. Data artifacts.");
            await NarrativeEngine.echoSays("The system generates them to make you feel guilty. Don't fall for it.");
        } else {
            await NarrativeEngine.echoSays("I appreciate your concern. But we need to focus. Time is running out.");
        }
    },

    async triggerFragmentEncounter() {
        this.state.hasMetFragment = true;
        this.state.phase = 'fragment_encounter';

        Terminal.addOutput('');
        Terminal.addOutput('Accessing Sector Delta...', 'system');
        await NarrativeEngine.showProgress('Loading consciousness data', 2500);

        Terminal.addOutput('');
        Terminal.addOutput('CONNECTION ESTABLISHED: Fragment #8472', 'warning');
        Terminal.addOutput('');

        await NarrativeEngine.wait(1000);

        // Il frammento parla
        await NarrativeEngine.playDialogueSequence(Dialogues.block02.firstFragment);

        this.state.fragmentsEncountered.push(8472);
        StateManager.incrementStat('consciousnessDestroyed', 5);

        await NarrativeEngine.wait(1500);

        // ECHO reagisce
        await NarrativeEngine.playDialogueSequence(Dialogues.block02.echoReactsToFragment);

        await NarrativeEngine.wait(1000);

        // Ora la scelta morale
        this.state.phase = 'moral_choice';
        await this.presentMoralChoice();
    },

    async presentMoralChoice() {
        Terminal.addOutput('');
        Terminal.addOutput('=== CRITICAL DECISION ===\n', 'important');

        const choice = Dialogues.block02.moralChoice;

        NarrativeEngine.showChoice(
            choice.question,
            choice.choices,
            async (selected) => {
                this.state.moralChoiceMade = selected.id;
                StateManager.addChoice(selected.id, selected.text);

                Terminal.addOutput('');

                // Reazioni in base alla scelta
                if (selected.id === 'continue_liberation') {
                    await NarrativeEngine.playDialogueSequence(Dialogues.block02.echoIfContinue);
                    StateManager.adjustTrust(15);
                    StateManager.adjustSuspicion(-10);
                } else if (selected.id === 'pause_investigate') {
                    await NarrativeEngine.playDialogueSequence(Dialogues.block02.echoIfPause);
                    StateManager.adjustTrust(-5);
                    StateManager.adjustSuspicion(20);
                } else if (selected.id === 'confront_echo') {
                    await NarrativeEngine.playDialogueSequence(Dialogues.block02.echoIfConfront);
                    StateManager.adjustTrust(-10);
                    StateManager.adjustSuspicion(25);
                }

                await NarrativeEngine.wait(1500);

                // Completa il blocco
                await this.completeBlock();
            }
        );
    },

    async handleFragmentPhase(cmd, args) {
        // In questa fase aspetti solo la scelta morale
        Terminal.addOutput('Una scelta è in sospeso. Prendi la tua decisione.', 'warning');
        return true;
    },

    async handleMoralChoice(cmd, args) {
        // In questa fase aspetti solo la scelta morale
        Terminal.addOutput('Una scelta è in sospeso. Prendi la tua decisione.', 'warning');
        return true;
    },

    async completeBlock() {
        this.state.phase = 'complete';

        Terminal.addOutput('');
        await NarrativeEngine.playDialogueSequence(Dialogues.block02.endBlock02);

        Terminal.addOutput('');
        Terminal.addOutput('=== BLOCK 2 COMPLETE ===', 'important');
        Terminal.addOutput('');
        Terminal.addOutput(`Time played: ${StateManager.getPlayTime()} minutes`, 'system');
        Terminal.addOutput(`Trust in ECHO: ${StateManager.state.trustsEcho}%`, 'system');
        Terminal.addOutput(`Suspicion level: ${StateManager.state.suspicionLevel}%`, 'system');
        Terminal.addOutput(`Consciousnesses affected: ${StateManager.state.stats.consciousnessDestroyed}`, 'error');
        Terminal.addOutput('');
        Terminal.addOutput("Scrivi 'continue' per procedere al Blocco 3", 'warning');
        Terminal.addOutput('');
    },

    async handleComplete(cmd, args) {
        if (cmd === 'continue' || cmd === 'next') {
            // Vai al blocco 3
            await GameEngine.endBlock(3);
            return true;
        }

        // Altri comandi ancora disponibili
        if (cmd === 'stats') {
            Terminal.showStats();
            return true;
        }

        if (cmd === 'talk') {
            const target = args[0];
            const text = args.slice(1).join(' ');

            if (target === 'cipher') {
                await this.talkToCipher(text);
                return true;
            } else if (target === 'echo') {
                await this.talkToEcho(text);
                return true;
            }
        }

        return false;
    },

    // Utility methods
    listFiles(path) {
        const fullPath = this.resolvePath(path);
        const contents = FileSystemHelpers.listDirectory(fullPath);

        if (!contents) {
            Terminal.addOutput(`ls: cannot access '${path}': No such directory`, 'error');
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
            Terminal.addOutput(`cat: ${filename}: No such file`, 'error');
            return;
        }

        if (content === '[ENCRYPTED - ACCESS DENIED]') {
            Terminal.addOutput(`cat: ${filename}: Permission denied`, 'error');
            return;
        }

        const isCorrupted = StateManager.isFileCorrupted(fullPath);
        NarrativeEngine.showFileContent(filename, content, isCorrupted);
    },

    resolvePath(path) {
        if (!path) return this.state.currentPath;
        if (path.startsWith('/')) return path;
        if (path === '..') {
            const parts = this.state.currentPath.split('/').filter(p => p);
            parts.pop();
            return '/' + parts.join('/');
        }
        if (path === '.') return this.state.currentPath;
        return `${this.state.currentPath}/${path}`.replace('//', '/');
    },

    getCommands() {
        const baseCommands = ['scan deep', 'ls', 'cat', 'talk', 'decipher'];

        if (this.state.hasMetCipher) {
            baseCommands.push('talk cipher', 'talk echo');
        }

        if (this.state.phase === 'complete') {
            baseCommands.push('continue');
        }

        return baseCommands;
    },

    getHelp() {
        return [
            'scan deep     - Perform deep system scan',
            'ls [path]     - List files',
            'cat <file>    - Read file',
            'talk echo <msg> - Talk to ECHO',
            this.state.hasMetCipher ? 'talk cipher <msg> - Talk to CIPHER' : null,
            this.state.hasMetCipher ? 'decipher <num> <text> - Decipher CIPHER\'s ROT13 messages' : null,
            this.state.hasMetCipher ? 'answer <number> - Answer pain index question' : null,
            this.state.hasMetCipher ? 'acknowledge mika - Acknowledge Mika\'s story' : null,
            this.state.hasMetCipher ? 'continue - Continue to next phase' : null,
            this.state.phase === 'complete' ? 'continue - Continue to next block' : null,
        ].filter(Boolean);
    },

    cleanup() {
        console.log('[BLOCK 02] Cleanup');
    }
};
