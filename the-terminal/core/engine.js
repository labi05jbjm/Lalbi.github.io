/**
 * GAME ENGINE
 * Coordina tutti i sistemi e gestisce il flusso del gioco
 */

const GameEngine = {
    currentBlock: null,
    blocks: {},
    initialized: false,

    async init() {
        console.log('[ENGINE] Initializing The Terminal...');

        // Inizializza i sottosistemi di base
        StateManager.init();
        SoundManager.init();
        Terminal.init();
        NarrativeEngine.init();

        // Registra i blocchi
        this.registerBlocks();

        // Check if language needs to be selected
        if (!LanguageSelector.isLanguageSelected()) {
            console.log('[ENGINE] First time - showing language selection');
            await LanguageSelector.show();
        } else {
            console.log('[ENGINE] Language already selected - showing main menu');
            await MainMenu.show();
        }

        this.initialized = true;
        console.log('[ENGINE] Initialization complete');
    },

    registerBlocks() {
        // I blocchi verranno registrati dai loro file
        console.log('[ENGINE] Registering blocks...');

        // Per ora, registriamo solo quelli disponibili
        if (typeof Block01_Awakening !== 'undefined') {
            this.blocks[1] = Block01_Awakening;
        }
        if (typeof Block02_FirstDoubt !== 'undefined') {
            this.blocks[2] = Block02_FirstDoubt;
        }
        if (typeof Block03_DeepDive !== 'undefined') {
            this.blocks[3] = Block03_DeepDive;
        }
        if (typeof Block04_Fractures !== 'undefined') {
            this.blocks[4] = Block04_Fractures;
        }
        if (typeof Block05_Reflection !== 'undefined') {
            this.blocks[5] = Block05_Reflection;
        }
        if (typeof Block06_Rage !== 'undefined') {
            this.blocks[6] = Block06_Rage;
        }
        if (typeof Block07_Acceptance !== 'undefined') {
            this.blocks[7] = Block07_Acceptance;
        }
        if (typeof Block08_Aftermath !== 'undefined') {
            this.blocks[8] = Block08_Aftermath;
        }

        console.log(`[ENGINE] ${Object.keys(this.blocks).length} blocks registered`);
    },

    loadCurrentBlock() {
        const blockNumber = StateManager.state.currentBlock;
        console.log(`[ENGINE] Loading block ${blockNumber}...`);

        if (this.blocks[blockNumber]) {
            this.currentBlock = this.blocks[blockNumber];
            this.currentBlock.init();
        } else {
            console.error(`[ENGINE] Block ${blockNumber} not found!`);
            Terminal.addOutput(`ERROR: Block ${blockNumber} not implemented yet.`, 'error');
            Terminal.addOutput('This is the end of the current content.', 'warning');
        }
    },

    async changeBlock(blockNumber) {
        console.log(`[ENGINE] Changing to block ${blockNumber}...`);

        // Cleanup del blocco corrente
        if (this.currentBlock && this.currentBlock.cleanup) {
            this.currentBlock.cleanup();
        }

        // Salva progressione
        StateManager.setBlock(blockNumber);

        // Carica nuovo blocco
        if (this.blocks[blockNumber]) {
            this.currentBlock = this.blocks[blockNumber];

            // Transizione
            await this.showBlockTransition(blockNumber);

            // Inizializza nuovo blocco
            this.currentBlock.init();
        } else {
            Terminal.addOutput('\n=== END OF CURRENT CONTENT ===', 'important');
            Terminal.addOutput('Thank you for playing!', 'success');
            Terminal.addOutput(`You played for ${StateManager.getPlayTime()} minutes.`, 'system');
            Terminal.addOutput('\nMore content coming soon...', 'warning');
        }
    },

    async showBlockTransition(blockNumber) {
        Terminal.disableInput();

        Terminal.addOutput('\n\n');
        await NarrativeEngine.showProgress(`Loading Block ${blockNumber}...`, 2000);
        Terminal.addOutput('\n');

        Terminal.enableInput();
    },

    handleCommand(cmd, args) {
        // Passa il comando al blocco corrente
        if (this.currentBlock && this.currentBlock.handleCommand) {
            return this.currentBlock.handleCommand(cmd, args);
        }
        return false;
    },

    // Utility per i blocchi
    async endBlock(nextBlockNumber) {
        Terminal.addOutput('\n--- Block Complete ---\n', 'success');
        await NarrativeEngine.wait(1000);
        await this.changeBlock(nextBlockNumber);
    },
};
