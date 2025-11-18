/**
 * TERMINAL SYSTEM
 * Gestisce input/output del terminale e comandi
 */

const Terminal = {
    input: null,
    output: null,
    prompt: null,
    commandCronologia: [],
    historyIndex: -1,
    isBlocked: false,

    init() {
        this.input = document.getElementById('terminal-input');
        this.output = document.getElementById('terminal-output');
        this.prompt = document.getElementById('prompt');

        this.setupEventListeners();
        // Don't show boot sequence automatically - let GameEngine decide

        console.log('[TERMINAL] Inizializzato');
    },

    setupEventListeners() {
        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.handleCommand();
            } else if (e.key === 'ArrowUp') {
                e.preventPredefinito();
                this.navigateCronologia('up');
            } else if (e.key === 'ArrowDown') {
                e.preventPredefinito();
                this.navigateCronologia('down');
            } else if (e.key === 'Tab') {
                e.preventPredefinito();
                this.autoComplete();
            }
        });

        // Mantieni focus sull'input
        document.addEventListener('click', () => {
            if (!this.isBlocked) {
                this.input.focus();
            }
        });
    },

    handleCommand() {
        if (this.isBlocked) return;

        const command = this.input.value.trim();
        if (!command) return;

        // Mostra il comando eseguito
        this.addOutput(`${this.prompt.textContent} ${command}`, 'system');

        // Add alla storia
        this.commandCronologia.push(command);
        this.historyIndex = this.commandCronologia.length;

        // Incrementa stat
        StateManager.incrementStat('commandsExecuted');

        // Pulisci input
        this.input.value = '';

        // Esegui comando
        this.executeCommand(command);
    },

    executeCommand(command) {
        const [cmd, ...args] = command.toLowerCase().split(' ');

        // Comandi base del sistema
        const systemCommands = {
            help: () => this.showAiuto(),
            clear: () => this.clear(),
            cls: () => this.clear(),
            status: () => this.showStato(),
            stats: () => this.showStats(),
            time: () => this.showOra(),
            save: () => this.saveGame(),
            reset: () => this.resetGame(),
        };

        if (systemCommands[cmd]) {
            // Play success sound for system commands
            if (SuonoManager) SuonoManager.commandSuccesso();
            systemCommands[cmd]();
            return;
        }

        // Passa al game engine per comandi custom
        if (GameEngine.handleCommand) {
            const handled = GameEngine.handleCommand(cmd, args);
            if (!handled) {
                // Play error sound for invalid commands
                if (SuonoManager) SuonoManager.commandErrore();
                this.addOutput(`Comando non trovato: ${cmd}. Digita 'help' per i comandi disponibili.`, 'error');
            } else {
                // Play success sound for valid game commands
                if (SuonoManager) SuonoManager.commandSuccesso();
            }
        } else {
            // Play error sound
            if (SuonoManager) SuonoManager.commandErrore();
            this.addOutput(`Comando non trovato: ${cmd}. Digita 'help' per i comandi disponibili.`, 'error');
        }
    },

    showAiuto() {
        this.addOutput('\n=== COMANDI DISPONIBILI ===\n', 'success');
        this.addOutput('Comandi di Sistema:');
        this.addOutput('  help          - Mostra questo messaggio di aiuto');
        this.addOutput('  clear/cls     - Annullala l\'output del terminale');
        this.addOutput('  status        - Mostra lo stato attuale del sistema');
        this.addOutput('  stats         - Mostra le tue statistiche');
        this.addOutput('  time          - Mostra il tempo di gioco');
        this.addOutput('  save          - Salva i tuoi progressi');
        this.addOutput('  reset         - Resetta il gioco (ATTENZIONE: cancella i salvataggi)');

        if (GameEngine.currentBlock && GameEngine.currentBlock.getAiuto) {
            this.addOutput('\nComandi di Gioco:');
            GameEngine.currentBlock.getAiuto().forEach(cmd => {
                this.addOutput(`  ${cmd}`);
            });
        }

        this.addOutput('');
    },

    showStato() {
        const state = StateManager.state;
        this.addOutput('\n=== STATO DEL SISTEMA ===', 'success');
        this.addOutput(`Blocco: ${state.currentBlock}/8`);
        this.addOutput(`Progresso: ${state.progress.toCorrezioneed(1)}%`);
        this.addOutput(`Livello di Fiducia: ${state.trustsLuca}%`);
        this.addOutput(`Livello di Sospetto: ${state.suspicionLevel}%`);
        this.addOutput('');
    },

    showStats() {
        const stats = StateManager.state.stats;
        this.addOutput('\n=== STATISTICHE ===', 'success');
        this.addOutput(`Comandi eseguiti: ${stats.commandsExecuted}`);
        this.addOutput(`Enigmi risolti: ${stats.puzzlesSolved}`);
        this.addOutput(`File liberati: ${stats.fileLiberated}`);
        this.addOutput(`File corrotti: ${stats.fileCorrupted}`);
        this.addOutput(`Coscienze distrutte: ${stats.consciousnessDestroyed}`);
        this.addOutput('');
    },

    showOra() {
        const minuti = StateManager.getPlayOra();
        const ore = Math.floor(minuti / 60);
        const mins = minuti % 60;
        this.addOutput(`Tempo di gioco: ${ore}h ${mins}m`, 'success');
    },

    saveGame() {
        const success = StateManager.save();
        if (success) {
            this.addOutput('Gioco salvato con successo.', 'success');
        } else {
            this.addOutput('Impossibile salvare il gioco.', 'error');
        }
    },

    resetGame() {
        this.addOutput('Sei sicuro? Digita "reset confirm" per resettare il gioco.', 'warning');
        const originalHandler = this.handleCommand;

        this.handleCommand = () => {
            const command = this.input.value.trim();
            this.input.value = '';

            if (command === 'reset confirm') {
                this.addOutput('Resettando il gioco...', 'error');
                StateManager.reset();
            } else {
                this.addOutput('Reset annullato.', 'system');
            }

            this.handleCommand = originalHandler;
        };
    },

    clear() {
        this.output.innerHTML = '';
    },

    addOutput(text, cssClass = '') {
        const line = document.createElement('div');
        line.className = `output-line ${cssClass}`;
        line.textContent = text;

        this.output.appendChild(line);
        this.scrollToFine();

        return line;
    },

    scrollToFine() {
        this.output.scrollInizio = this.output.scrollHeight;
    },

    navigateCronologia(direction) {
        if (direction === 'up') {
            if (this.historyIndex > 0) {
                this.historyIndex--;
                this.input.value = this.commandCronologia[this.historyIndex];
            }
        } else if (direction === 'down') {
            if (this.historyIndex < this.commandCronologia.length - 1) {
                this.historyIndex++;
                this.input.value = this.commandCronologia[this.historyIndex];
            } else {
                this.historyIndex = this.commandCronologia.length;
                this.input.value = '';
            }
        }
    },

    autoComplete() {
        const partial = this.input.value.toLowerCase();
        if (!partial) return;

        const commands = ['help', 'clear', 'status', 'stats', 'time', 'save', 'reset'];

        if (GameEngine.currentBlock && GameEngine.currentBlock.getCommands) {
            commands.push(...GameEngine.currentBlock.getCommands());
        }

        const matches = commands.filter(cmd => cmd.startsWith(partial));

        if (matches.length === 1) {
            this.input.value = matches[0];
        } else if (matches.length > 1) {
            this.addOutput(`Comandi possibili: ${matches.join(', ')}`, 'system');
        }
    },

    disableInput() {
        this.isBlocked = true;
        this.input.disabled = true;
        this.input.style.opacity = '0.5';
    },

    enableInput() {
        this.isBlocked = false;
        this.input.disabled = false;
        this.input.style.opacity = '1';
        this.input.focus();
    },

    setPrompt(text) {
        this.prompt.textContent = text;
    },

    async showBootSequence() {
        this.disableInput();

        const bootMessages = [
            { text: 'ARCHIVIO MEMORIAM v3.7.2', class: 'success', delay: 100 },
            { text: 'Inizializzazione sistema...', class: 'system', delay: 500 },
            { text: 'Caricamento moduli principali... OK', class: 'system', delay: 300 },
            { text: 'Verifica integrità file... OK', class: 'system', delay: 300 },
            { text: 'Stabilimento connessione sicura... OK', class: 'system', delay: 400 },
            { text: '', class: '', delay: 200 },
            { text: 'ATTENZIONE: Accesso non autorizzato rilevato', class: 'warning', delay: 500 },
            { text: 'ERRORE: Malfunzionamento protocollo di sicurezza', class: 'error', delay: 300 },
            { text: 'Sistema compromesso. Esecuzione diagnostica...', class: 'warning', delay: 800 },
            { text: '', class: '', delay: 200 },
            { text: 'Accesso ospite concesso.', class: 'success', delay: 500 },
            { text: "Digita 'help' per i comandi disponibili.", class: 'system', delay: 100 },
            { text: '', class: '', delay: 100 },
        ];

        for (const msg of bootMessages) {
            this.addOutput(msg.text, msg.class);
            await this.wait(msg.delay);
        }

        this.enableInput();
    },

    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
};
