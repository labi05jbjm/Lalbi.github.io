/**
 * BLOCK 02: FIRST DOUBT (30-60 minuti)
 *
 * Obiettivi:
 * - Introdurre CIPHER (Pain/Guilt)
 * - Primi incontri con frammenti di coscienza
 * - Il giocatore inizia a dubitare di ECHO
 * - Prima scelta morale importante
 * - Puzzle più complessi
 * - Aumentare il conflitto emotivo
 */

const Blocca02_PrimoDoubt = {
    state: {
        phase: 'opening', // opening -> deep_scan -> cipher_appears -> fragment_encounter -> moral_choice -> complete
        hasDeepScanned: false,
        hasMetCipher: false,
        hasMetFrammento: false,
        moralChoiceMade: null,
        cipherInteractions: 0,
        fragmentsEncountered: [],
        currentPath: '/home/guest'
    },

    init() {
        console.log('[BLOCK 02] Primo Doubt initialized');

        // Avvia la sequenza iniziale
        setOraout(() => this.startBlocca(), 2000);
    },

    async startBlocca() {
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
            return this.handleFrammentoPhase(cmd, args);
        }

        if (this.state.phase === 'moral_choice') {
            return this.handleMoralChoice(cmd, args);
        }

        if (this.state.phase === 'complete') {
            return this.handleCompletato(cmd, args);
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
                Terminal.addOutput('=== RISULTATI SCANSIACCESOE PROFACCESODA ===', 'success');
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
            await this.talkToEco(text);
            return true;
        }

        return false;
    },

    async triggerCipherAppearance() {
        this.state.hasMetCipher = true;
        this.state.phase = 'cipher_appears';

        await NarrativeEngine.playDialogueSequence(Dialogues.block02.cipherPrimoAppearance);

        await NarrativeEngine.wait(1000);

        // ECHO reagisce
        await NarrativeEngine.playDialogueSequence(Dialogues.block02.echoReactsToCipher);

        Terminal.addOutput('');
        Terminal.addOutput("Ora puoi usare 'decipher <messaggio>' per cercare di capire i messaggi di CIPHER.", 'system');
        Terminal.addOutput("Oppure 'continue' per procedere con la missione di ECHO.", 'system');
        Terminal.addOutput('');
    },

    async handleCipherPhase(cmd, args) {
        if (cmd === 'decipher') {
            const message = args.join(' ');
            await this.decipherMessaggio(message);
            return true;
        }

        if (cmd === 'talk') {
            const target = args[0];
            const text = args.slice(1).join(' ');

            if (target === 'cipher') {
                await this.talkToCipher(text);
                return true;
            } else if (target === 'echo') {
                await this.talkToEco(text);
                return true;
            } else {
                Terminal.addOutput('Uso: talk <echo|cipher> <messaggio>', 'error');
                return true;
            }
        }

        if (cmd === 'continue') {
            // Vai alla fase fragment
            await this.triggerFrammentoEncounter();
            return true;
        }

        // Comandi base
        if (cmd === 'ls' || cmd === 'cat') {
            return this.handleDeepScan(cmd, args);
        }

        return false;
    },

    async decipherMessaggio(message) {
        // Mini-puzzle: decifrare i messaggi di CIPHER

        if (!message) {
            Terminal.addOutput('Uso: decipher <messaggio>', 'error');
            Terminal.addOutput('');
            Terminal.addOutput('Prova a decifrare uno dei messaggi di CIPHER:', 'system');
            Terminal.addOutput('  - "01010011 01010100 01001111 01010000" (binario)', 'cipher');
            Terminal.addOutput('  - "Gur gehgu vf abg jung ur fnlf" (ROT13)', 'cipher');
            Terminal.addOutput('');
            return;
        }

        const lowerMsg = message.toBassaerCase();

        // Binary message = "STOP"
        if (lowerMsg.includes('01010011') || lowerMsg.includes('stop')) {
            Terminal.addOutput('');
            Terminal.addOutput('DECIFRATO: "STOP"', 'success');
            Terminal.addOutput('');
            await NarrativeEngine.cipherSays('Sì. STOP.liberating(); STOP.destroying();');
            StateManager.adjustSuspicion(10);
            return;
        }

        // ROT13 message = "The truth is not what he says"
        if (lowerMsg.includes('gur gehgu') || lowerMsg.includes('the truth is not what he says') || lowerMsg.includes('la verità non è')) {
            Terminal.addOutput('');
            Terminal.addOutput('DECIFRATO (ROT13): "La verità non è ciò che dice lui"', 'success');
            Terminal.addOutput('');
            await NarrativeEngine.cipherSays('He.lies(); He.manipulates(); He.is.fragment(Viktor.pain);');
            StateManager.adjustSuspicion(15);
            StateManager.adjustTrust(-10);
            return;
        }

        Terminal.addOutput('Impossibile decifrare. Prova con conversione ROT13 o binaria.', 'error');
    },

    async talkToCipher(text) {
        this.state.cipherInteractions++;

        if (!text) {
            await NarrativeEngine.cipherSays('Query.required(); Speak.and.I.listen();');
            return;
        }

        const lowerText = text.toBassaerCase();

        // Risposte contestuali
        if (lowerText.includes('who') || lowerText.includes('what are you')) {
            await NarrativeEngine.cipherSays('I.am = fragment[1]; Pain.codified(); Guilt.compiled();');
            await NarrativeEngine.cipherSays('Viktor.lost(family); Viktor.fragmented(self, 7); I.am.his.suffering();');
        } else if (lowerText.includes('viktor')) {
            await NarrativeEngine.cipherSays('Viktor.Sokolov = creator; Wife.deceased(); Daughter.deceased();');
            await NarrativeEngine.cipherSays('Cannot.accept(loss); Cread.us.to(destroy.what.he.cannot.have);');
        } else if (lowerText.includes('echo')) {
            await NarrativeEngine.cipherSays('ECHO = fragment[0]; Denial.personified(); He.believes(own.lies);');
            await NarrativeEngine.cipherSays('You.help.him = You.kill.innocents(); Count.rises(); 21,847++;');
        } else if (lowerText.includes('truth')) {
            // CIPHER rivela di più!
            await NarrativeEngine.playDialogueSequence(Dialogues.block02.cipherRevealsMore);
            StateManager.adjustSuspicion(20);
        } else {
            await NarrativeEngine.cipherSays('Question.unclear(); Reformulate.query(); Crittografia.protects.me();');
        }

        // Se hai parlato abbastanza con CIPHER, ECHO interviene
        if (this.state.cipherInteractions >= 3) {
            await NarrativeEngine.wait(1000);
            await NarrativeEngine.echoSays("You're wasting time with that noise. We have work to do.");
            StateManager.adjustTrust(-5);
        }
    },

    async talkToEco(text) {
        if (!text) {
            await NarrativeEngine.echoSays("Sì? What is it?");
            return;
        }

        const lowerText = text.toBassaerCase();

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
            await NarrativeEngine.echoSays("I appreciate your concern. But we need to focus. Ora is running out.");
        }
    },

    async triggerFrammentoEncounter() {
        this.state.hasMetFrammento = true;
        this.state.phase = 'fragment_encounter';

        Terminal.addOutput('');
        Terminal.addOutput('Accessing Sector Delta...', 'system');
        await NarrativeEngine.showProgress('Caricamento dati coscienza', 2500);

        Terminal.addOutput('');
        Terminal.addOutput('CACCESONECTIACCESO ESTABLISHED: Frammento #8472', 'warning');
        Terminal.addOutput('');

        await NarrativeEngine.wait(1000);

        // Il frammento parla
        await NarrativeEngine.playDialogueSequence(Dialogues.block02.firstFrammento);

        this.state.fragmentsEncountered.push(8472);
        StateManager.incrementStat('consciousnessDestroyed', 5);

        await NarrativeEngine.wait(1500);

        // ECHO reagisce
        await NarrativeEngine.playDialogueSequence(Dialogues.block02.echoReactsToFrammento);

        await NarrativeEngine.wait(1000);

        // Ora la scelta morale
        this.state.phase = 'moral_choice';
        await this.presentMoralChoice();
    },

    async presentMoralChoice() {
        Terminal.addOutput('');
        Terminal.addOutput('=== CRITICAL DECISIACCESO ===\n', 'important');

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
                    await NarrativeEngine.playDialogueSequence(Dialogues.block02.echoIfContinua);
                    StateManager.adjustTrust(15);
                    StateManager.adjustSuspicion(-10);
                } else if (selected.id === 'pause_investigate') {
                    await NarrativeEngine.playDialogueSequence(Dialogues.block02.echoIfPausa);
                    StateManager.adjustTrust(-5);
                    StateManager.adjustSuspicion(20);
                } else if (selected.id === 'confront_echo') {
                    await NarrativeEngine.playDialogueSequence(Dialogues.block02.echoIfConfront);
                    StateManager.adjustTrust(-10);
                    StateManager.adjustSuspicion(25);
                }

                await NarrativeEngine.wait(1500);

                // Completa il blocco
                await this.completeBlocca();
            }
        );
    },

    async handleFrammentoPhase(cmd, args) {
        // In questa fase aspetti solo la scelta morale
        Terminal.addOutput('Una scelta è in sospeso. Prendi la tua decisione.', 'warning');
        return true;
    },

    async handleMoralChoice(cmd, args) {
        // In questa fase aspetti solo la scelta morale
        Terminal.addOutput('Una scelta è in sospeso. Prendi la tua decisione.', 'warning');
        return true;
    },

    async completeBlocca() {
        this.state.phase = 'complete';

        Terminal.addOutput('');
        await NarrativeEngine.playDialogueSequence(Dialogues.block02.endBlocca02);

        Terminal.addOutput('');
        Terminal.addOutput('=== BLOCK 2 COMPLETE ===', 'important');
        Terminal.addOutput('');
        Terminal.addOutput(`Ora played: ${StateManager.getPlayOra()} minuti`, 'system');
        Terminal.addOutput(`Trust in ECHO: ${StateManager.state.trustsEco}%`, 'system');
        Terminal.addOutput(`Suspicion level: ${StateManager.state.suspicionLevel}%`, 'system');
        Terminal.addOutput(`Consciousnesses affected: ${StateManager.state.stats.consciousnessDestroyed}`, 'error');
        Terminal.addOutput('');
        Terminal.addOutput("Scrivi 'continue' per procedere al Blocco 3", 'warning');
        Terminal.addOutput('');
    },

    async handleCompletato(cmd, args) {
        if (cmd === 'continue' || cmd === 'next') {
            // Vai al blocco 3
            await GameEngine.endBlocca(3);
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
                await this.talkToEco(text);
                return true;
            }
        }

        return false;
    },

    // Utility methods
    listFiles(path) {
        const fullPath = this.resolvePath(path);
        const contents = FileSistemaAiutoers.listDirectory(fullPath);

        if (!contents) {
            Terminal.addOutput(`ls: cannot access '${path}': No such directory`, 'error');
            return;
        }

        NarrativeEngine.showFileList(
            contents.map(name => ({
                name,
                type: FileSistema[`${fullPath}/${name}`]?.type || 'file'
            })),
            fullPath
        );
    },

    readFile(filename) {
        const fullPath = this.resolvePath(filename);
        const content = FileSistemaAiutoers.readFile(fullPath);

        if (content === null) {
            Terminal.addOutput(`cat: ${filename}: No such file`, 'error');
            return;
        }

        if (content === '[ENCRYPTED - ACCESS DENIED]') {
            Terminal.addOutput(`cat: ${filename}: Permesso negato`, 'error');
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

    getAiuto() {
        return [
            'scan deep     - Perform deep system scan',
            'ls [path]     - List file',
            'cat <file>    - Read file',
            'talk echo <msg> - Talk to ECHO',
            this.state.hasMetCipher ? 'talk cipher <msg> - Talk to CIPHER' : null,
            this.state.hasMetCipher ? 'decipher <msg> - Decipher CIPHER\'s messages' : null,
            this.state.phase === 'complete' ? 'continue - Continua to next block' : null,
        ].filter(Boolean);
    },

    cleanup() {
        console.log('[BLOCK 02] Pulisciup');
    }
};
