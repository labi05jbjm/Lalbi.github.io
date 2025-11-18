/**
 * TERMINAL SYSTEM
 * Gestisce input/output del terminale e comandi
 */

const Terminal = {
    input: null,
    output: null,
    prompt: null,
    commandHistory: [],
    historyIndex: -1,
    isLocked: false,

    init() {
        this.input = document.getElementById('terminal-input');
        this.output = document.getElementById('terminal-output');
        this.prompt = document.getElementById('prompt');

        this.setupEventListeners();
        // Don't show boot sequence automatically - let GameEngine decide

        console.log('[TERMINAL] Initialized');
    },

    setupEventListeners() {
        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.handleCommand();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.navigateHistory('up');
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.navigateHistory('down');
            } else if (e.key === 'Tab') {
                e.preventDefault();
                this.autoComplete();
            }
        });

        // Mantieni focus sull'input
        document.addEventListener('click', () => {
            if (!this.isLocked) {
                this.input.focus();
            }
        });
    },

    handleCommand() {
        if (this.isLocked) return;

        const command = this.input.value.trim();
        if (!command) return;

        // Mostra il comando eseguito
        this.addOutput(`${this.prompt.textContent} ${command}`, 'system');

        // Aggiungi alla storia
        this.commandHistory.push(command);
        this.historyIndex = this.commandHistory.length;

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
            help: () => this.showHelp(),
            clear: () => this.clear(),
            cls: () => this.clear(),
            status: () => this.showStatus(),
            stats: () => this.showStats(),
            time: () => this.showTime(),
            save: () => this.saveGame(),
            reset: () => this.resetGame(),
        };

        if (systemCommands[cmd]) {
            // Play success sound for system commands
            if (SoundManager) SoundManager.commandSuccess();
            systemCommands[cmd]();
            return;
        }

        // Passa al game engine per comandi custom
        if (GameEngine.handleCommand) {
            const handled = GameEngine.handleCommand(cmd, args);
            if (!handled) {
                // Play error sound for invalid commands
                if (SoundManager) SoundManager.commandError();
                this.addOutput(`Comando non trovato: ${cmd}. Digita 'help' per i comandi disponibili.`, 'error');
            } else {
                // Play success sound for valid game commands
                if (SoundManager) SoundManager.commandSuccess();
            }
        } else {
            // Play error sound
            if (SoundManager) SoundManager.commandError();
            this.addOutput(`Comando non trovato: ${cmd}. Digita 'help' per i comandi disponibili.`, 'error');
        }
    },

    showHelp() {
        this.addOutput('\n=== COMANDI DISPONIBILI ===\n', 'success');
        this.addOutput('Comandi di Sistema:');
        this.addOutput('  help          - Mostra questo messaggio di aiuto');
        this.addOutput('  clear/cls     - Cancella l\'output del terminale');
        this.addOutput('  status        - Mostra lo stato attuale del sistema');
        this.addOutput('  stats         - Mostra le tue statistiche');
        this.addOutput('  time          - Mostra il tempo di gioco');
        this.addOutput('  save          - Salva i tuoi progressi');
        this.addOutput('  reset         - Resetta il gioco (ATTENZIONE: cancella i salvataggi)');

        if (GameEngine.currentBlock && GameEngine.currentBlock.getHelp) {
            this.addOutput('\nComandi di Gioco:');
            GameEngine.currentBlock.getHelp().forEach(cmd => {
                this.addOutput(`  ${cmd}`);
            });
        }

        this.addOutput('');
    },

    showStatus() {
        const state = StateManager.state;
        this.addOutput('\n=== STATO DEL SISTEMA ===', 'success');
        this.addOutput(`Blocco: ${state.currentBlock}/8`);
        this.addOutput(`Progresso: ${state.progress.toFixed(1)}%`);
        this.addOutput(`Livello di Fiducia in ECHO: ${state.trustsEcho}%`);
        this.addOutput(`Livello di Sospetto: ${state.suspicionLevel}%`);
        this.addOutput('');
    },

    showStats() {
        const stats = StateManager.state.stats;
        this.addOutput('\n=== STATISTICHE ===', 'success');
        this.addOutput(`Comandi eseguiti: ${stats.commandsExecuted}`);
        this.addOutput(`Enigmi risolti: ${stats.puzzlesSolved}`);
        this.addOutput(`File liberati: ${stats.filesLiberated}`);
        this.addOutput(`File corrotti: ${stats.filesCorrupted}`);
        this.addOutput(`Coscienze distrutte: ${stats.consciousnessDestroyed}`);
        this.addOutput('');
    },

    showTime() {
        const minutes = StateManager.getPlayTime();
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        this.addOutput(`Tempo di gioco: ${hours}h ${mins}m`, 'success');
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
        const playTime = StateManager.getPlayTime();
        const hours = Math.floor(playTime / 60);
        const mins = playTime % 60;

        this.addOutput('\n⚠️  ATTENZIONE: RESET TOTALE DEL GIOCO ⚠️', 'error');
        this.addOutput('', '');
        this.addOutput('Questa azione cancellerà:', 'warning');
        this.addOutput(`  • Tutti i salvataggi (tempo di gioco: ${hours}h ${mins}m)`, 'warning');
        this.addOutput(`  • Progresso attuale: Blocco ${StateManager.state.currentBlock}/8`, 'warning');
        this.addOutput(`  • ${StateManager.state.stats.puzzlesSolved} puzzle risolti`, 'warning');
        this.addOutput(`  • Tutte le scelte e statistiche`, 'warning');
        this.addOutput('', '');
        this.addOutput('Sei SICURO di voler perdere tutto?', 'error');
        this.addOutput('Digita "reset confirm" per procedere (o qualsiasi altro comando per annullare)', 'system');
        this.addOutput('', '');

        const originalHandler = this.handleCommand;

        this.handleCommand = () => {
            const command = this.input.value.trim();
            this.input.value = '';

            if (command === 'reset confirm') {
                this.addOutput('Resettando il gioco...', 'error');
                StateManager.reset();
            } else {
                this.addOutput('Reset annullato. I tuoi dati sono al sicuro.', 'success');
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
        this.scrollToBottom();

        return line;
    },

    scrollToBottom() {
        this.output.scrollTop = this.output.scrollHeight;
    },

    navigateHistory(direction) {
        if (direction === 'up') {
            if (this.historyIndex > 0) {
                this.historyIndex--;
                this.input.value = this.commandHistory[this.historyIndex];
            }
        } else if (direction === 'down') {
            if (this.historyIndex < this.commandHistory.length - 1) {
                this.historyIndex++;
                this.input.value = this.commandHistory[this.historyIndex];
            } else {
                this.historyIndex = this.commandHistory.length;
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
        this.isLocked = true;
        this.input.disabled = true;
        this.input.style.opacity = '0.5';
    },

    enableInput() {
        this.isLocked = false;
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
