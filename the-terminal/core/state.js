/**
 * STATE MANAGER
 * Gestisce lo stato del gioco e il salvataggio
 */

const StateManager = {
    state: {
        currentBlock: 1,
        progress: 0,
        timePlayedMinutes: 0,

        // Player knowledge
        knowsAboutSentinel: false,
        knowsAboutLuca: false,
        trustsLuca: 100, // 0-100
        suspicionLevel: 0, // 0-100

        // Flags di progressione
        flags: {
            firstContact: false,
            firstPuzzleComplete: false,
            sawCorruptedFile: false,
            readMissionBriefing: false,
            lucaRevealed: false,
        },

        // Statistiche azioni
        stats: {
            filesLiberated: 0,
            filesCorrupted: 0,
            consciousnessDestroyed: 0,
            puzzlesSolved: 0,
            commandsExecuted: 0,
            questionsAsked: 0,
        },

        // File system state
        fileSystem: {
            corrupted: [],
            accessed: [],
            unlocked: [],
        },

        // Dialogue history
        dialogueHistory: [],

        // Choices made
        choices: [],

        // Timestamp
        startTime: Date.now(),
        lastSaveTime: Date.now(),
    },

    init() {
        this.load();
        this.startAutoSave();
        this.trackPlayTime();
    },

    save() {
        try {
            const saveData = JSON.stringify(this.state);
            localStorage.setItem('the_terminal_save', saveData);
            this.state.lastSaveTime = Date.now();
            console.log('[STATE] Game saved');
            return true;
        } catch (e) {
            console.error('[STATE] Save failed:', e);
            return false;
        }
    },

    load() {
        try {
            const saveData = localStorage.getItem('the_terminal_save');
            if (saveData) {
                this.state = JSON.parse(saveData);
                console.log('[STATE] Game loaded');
                return true;
            }
        } catch (e) {
            console.error('[STATE] Load failed:', e);
        }
        return false;
    },

    reset() {
        localStorage.removeItem('the_terminal_save');
        location.reload();
    },

    startAutoSave() {
        setInterval(() => {
            this.save();
        }, 30000); // Auto-save ogni 30 secondi
    },

    trackPlayTime() {
        setInterval(() => {
            this.state.timePlayedMinutes += 0.5;
        }, 30000); // Traccia ogni 30 secondi
    },

    // Utility methods
    setFlag(flagName, value = true) {
        this.state.flags[flagName] = value;
        this.save();
    },

    getFlag(flagName) {
        return this.state.flags[flagName] || false;
    },

    incrementStat(statName, amount = 1) {
        if (this.state.stats[statName] !== undefined) {
            this.state.stats[statName] += amount;
            this.save();
        }
    },

    addChoice(choiceId, choiceText) {
        this.state.choices.push({
            id: choiceId,
            text: choiceText,
            timestamp: Date.now(),
            block: this.state.currentBlock,
        });
        this.save();
    },

    addDialogue(speaker, text) {
        this.state.dialogueHistory.push({
            speaker,
            text,
            timestamp: Date.now(),
            block: this.state.currentBlock,
        });
    },

    corruptFile(filename) {
        if (!this.state.fileSystem.corrupted.includes(filename)) {
            this.state.fileSystem.corrupted.push(filename);
            this.incrementStat('filesCorrupted');
            this.save();
        }
    },

    accessFile(filename) {
        if (!this.state.fileSystem.accessed.includes(filename)) {
            this.state.fileSystem.accessed.push(filename);
            this.save();
        }
    },

    unlockFile(filename) {
        if (!this.state.fileSystem.unlocked.includes(filename)) {
            this.state.fileSystem.unlocked.push(filename);
            this.save();
        }
    },

    isFileCorrupted(filename) {
        return this.state.fileSystem.corrupted.includes(filename);
    },

    isFileAccessed(filename) {
        return this.state.fileSystem.accessed.includes(filename);
    },

    isFileUnlocked(filename) {
        return this.state.fileSystem.unlocked.includes(filename);
    },

    adjustTrust(amount) {
        this.state.trustsLuca = Math.max(0, Math.min(100, this.state.trustsLuca + amount));
        this.save();
    },

    adjustSuspicion(amount) {
        this.state.suspicionLevel = Math.max(0, Math.min(100, this.state.suspicionLevel + amount));
        this.save();
    },

    setBlock(blockNumber) {
        this.state.currentBlock = blockNumber;
        this.state.progress = ((blockNumber - 1) / 8) * 100;
        this.save();
    },

    getPlayTime() {
        return Math.floor(this.state.timePlayedMinutes);
    },
};
