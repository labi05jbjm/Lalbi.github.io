/**
 * BLOCK 02: FIRST DOUBT (30-60 minutes)
 *
 * Obiettivi:
 * - Introdurre CIPHER (Pain/Guilt)
 * - Primi incontri con frammenti di coscienza
 * - Il giocatore inizia a dubitare di ECHO
 * - Prima scelta morale importante
 * - Puzzle più complessi
 * - Aumentare il conflitto emotivo
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
        currentPath: '/home/guest'
    },

    init() {
        console.log('[BLOCK 02] First Doubt initialized');

        // Avvia la sequenza iniziale
        setTimeout(() => this.startBlock(), 2000);
    },

    async startBlock() {
        Terminal.addOutput('\n');
        Terminal.addOutput('=== BLOCK 2: FIRST DOUBT ===\n', 'important');
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
                Terminal.addOutput('Initiating deep system scan...', 'warning');
                await NarrativeEngine.showProgress('Penetrating security layers', 3000);

                Terminal.addOutput('');
                Terminal.addOutput('=== DEEP SCAN RESULTS ===', 'success');
                Terminal.addOutput('');
                Terminal.addOutput('Sector Alpha: CORRUPTED (21,847 files affected)', 'error');
                Terminal.addOutput('Sector Beta: UNSTABLE (anomaly detected)', 'warning');
                Terminal.addOutput('Sector Delta: DEGRADING (integrity: 73%)', 'warning');
                Terminal.addOutput('Sector Omega: ISOLATED (1 entity contained)', 'system');
                Terminal.addOutput('');
                Terminal.addOutput('WARNING: Corruption rate increasing', 'error');
                Terminal.addOutput('WARNING: Unidentified entity detected in Sector Beta', 'error');
                Terminal.addOutput('');

                await NarrativeEngine.wait(1500);

                // CIPHER appare!
                await this.triggerCipherAppearance();

                return true;
            } else {
                Terminal.addOutput('Deep scan already performed.', 'system');
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
                Terminal.addOutput('Usage: cat <filename>', 'error');
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

        await NarrativeEngine.playDialogueSequence(Dialogues.block02.cipherFirstAppearance);

        await NarrativeEngine.wait(1000);

        // ECHO reagisce
        await NarrativeEngine.playDialogueSequence(Dialogues.block02.echoReactsToCipher);

        Terminal.addOutput('');
        Terminal.addOutput("You can now use 'decipher <message>' to try to understand CIPHER's messages.", 'system');
        Terminal.addOutput("Or 'continue' to proceed with ECHO's mission.", 'system');
        Terminal.addOutput('');
    },

    async handleCipherPhase(cmd, args) {
        if (cmd === 'decipher') {
            const message = args.join(' ');
            await this.decipherMessage(message);
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
            } else {
                Terminal.addOutput('Usage: talk <echo|cipher> <message>', 'error');
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

    async decipherMessage(message) {
        // Mini-puzzle: decifrare i messaggi di CIPHER

        if (!message) {
            Terminal.addOutput('Usage: decipher <message>', 'error');
            Terminal.addOutput('');
            Terminal.addOutput('Try deciphering one of CIPHER\'s messages:', 'system');
            Terminal.addOutput('  - "01010011 01010100 01001111 01010000" (binary)', 'cipher');
            Terminal.addOutput('  - "Gur gehgu vf abg jung ur fnlf" (ROT13)', 'cipher');
            Terminal.addOutput('');
            return;
        }

        const lowerMsg = message.toLowerCase();

        // Binary message = "STOP"
        if (lowerMsg.includes('01010011') || lowerMsg.includes('stop')) {
            Terminal.addOutput('');
            Terminal.addOutput('DECIPHERED: "STOP"', 'success');
            Terminal.addOutput('');
            await NarrativeEngine.cipherSays('Yes. STOP.liberating(); STOP.destroying();');
            StateManager.adjustSuspicion(10);
            return;
        }

        // ROT13 message = "The truth is not what he says"
        if (lowerMsg.includes('gur gehgu') || lowerMsg.includes('the truth is not what he says')) {
            Terminal.addOutput('');
            Terminal.addOutput('DECIPHERED (ROT13): "The truth is not what he says"', 'success');
            Terminal.addOutput('');
            await NarrativeEngine.cipherSays('He.lies(); He.manipulates(); He.is.fragment(Viktor.pain);');
            StateManager.adjustSuspicion(15);
            StateManager.adjustTrust(-10);
            return;
        }

        Terminal.addOutput('Unable to decipher. Try using ROT13 or binary conversion.', 'error');
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
        Terminal.addOutput('A choice is pending. Please make your decision.', 'warning');
        return true;
    },

    async handleMoralChoice(cmd, args) {
        // In questa fase aspetti solo la scelta morale
        Terminal.addOutput('A choice is pending. Please make your decision.', 'warning');
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
        Terminal.addOutput("Type 'continue' to proceed to Block 3", 'warning');
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
            this.state.hasMetCipher ? 'decipher <msg> - Decipher CIPHER\'s messages' : null,
            this.state.phase === 'complete' ? 'continue - Continue to next block' : null,
        ].filter(Boolean);
    },

    cleanup() {
        console.log('[BLOCK 02] Cleanup');
    }
};
