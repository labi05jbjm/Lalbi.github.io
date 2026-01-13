/**
 * STATE MANAGER
 * Gestisce lo stato del gioco e il salvataggio
 */

const StateManager = {
    currentSlot: 1, // Current active save slot (1-5)
    maxSlots: 5, // Maximum number of save slots

    state: {
        saveName: '', // Custom name for this save
        currentBlock: 1,
        progress: 0,
        timePlayedMinutes: 0,

        // Player knowledge
        knowsAboutSentinel: false,
        knowsAboutEcho: false,
        trustsEcho: 100, // 0-100
        suspicionLevel: 0, // 0-100

        // Flags di progressione
        flags: {
            firstContact: false,
            firstPuzzleComplete: false,
            sawCorruptedFile: false,
            readMissionBriefing: false,
            echoRevealed: false,
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

    init(slotId = null) {
        // Load from specific slot or last used slot
        if (slotId) {
            this.currentSlot = slotId;
        } else {
            // Try to load last used slot from localStorage
            const lastSlot = localStorage.getItem('the_terminal_last_slot');
            if (lastSlot) {
                this.currentSlot = parseInt(lastSlot);
            }
        }

        this.load();
        this.startAutoSave();
        this.trackPlayTime();
    },

    save() {
        return this.saveToSlot(this.currentSlot);
    },

    load() {
        return this.loadFromSlot(this.currentSlot);
    },

    saveToSlot(slotId) {
        try {
            if (slotId < 1 || slotId > this.maxSlots) {
                console.error('[STATE] Invalid slot ID:', slotId);
                return false;
            }

            this.state.lastSaveTime = Date.now();
            const saveData = JSON.stringify(this.state);
            const slotKey = `the_terminal_save_slot_${slotId}`;

            localStorage.setItem(slotKey, saveData);
            localStorage.setItem('the_terminal_last_slot', slotId.toString());

            // Update metadata
            this.updateSlotMetadata(slotId);

            console.log(`[STATE] Game saved to slot ${slotId}`);
            return true;
        } catch (e) {
            console.error('[STATE] Save failed:', e);
            return false;
        }
    },

    loadFromSlot(slotId) {
        try {
            if (slotId < 1 || slotId > this.maxSlots) {
                console.error('[STATE] Invalid slot ID:', slotId);
                return false;
            }

            const slotKey = `the_terminal_save_slot_${slotId}`;
            const saveData = localStorage.getItem(slotKey);

            if (saveData) {
                this.state = JSON.parse(saveData);
                this.currentSlot = slotId;
                localStorage.setItem('the_terminal_last_slot', slotId.toString());
                console.log(`[STATE] Game loaded from slot ${slotId}`);
                return true;
            }
        } catch (e) {
            console.error('[STATE] Load failed:', e);
        }
        return false;
    },

    updateSlotMetadata(slotId) {
        try {
            const metadata = this.getAllSaveSlots();
            metadata[slotId - 1] = {
                slotId: slotId,
                exists: true,
                saveName: this.state.saveName || '',
                saveTime: this.state.lastSaveTime,
                currentBlock: this.state.currentBlock,
                timePlayedMinutes: this.state.timePlayedMinutes,
                progress: this.state.progress
            };

            localStorage.setItem('the_terminal_save_metadata', JSON.stringify(metadata));
        } catch (e) {
            console.error('[STATE] Failed to update metadata:', e);
        }
    },

    getAllSaveSlots() {
        try {
            // Try to load cached metadata first
            const cachedMetadata = localStorage.getItem('the_terminal_save_metadata');
            if (cachedMetadata) {
                return JSON.parse(cachedMetadata);
            }
        } catch (e) {
            console.warn('[STATE] Failed to load cached metadata:', e);
        }

        // Build metadata from scratch
        const slots = [];
        for (let i = 1; i <= this.maxSlots; i++) {
            const slotKey = `the_terminal_save_slot_${i}`;
            const saveData = localStorage.getItem(slotKey);

            if (saveData) {
                try {
                    const state = JSON.parse(saveData);
                    slots.push({
                        slotId: i,
                        exists: true,
                        saveName: state.saveName || '',
                        saveTime: state.lastSaveTime || Date.now(),
                        currentBlock: state.currentBlock || 1,
                        timePlayedMinutes: state.timePlayedMinutes || 0,
                        progress: state.progress || 0
                    });
                } catch (e) {
                    slots.push({ slotId: i, exists: false });
                }
            } else {
                slots.push({ slotId: i, exists: false });
            }
        }

        return slots;
    },

    deleteSaveSlot(slotId) {
        try {
            if (slotId < 1 || slotId > this.maxSlots) {
                console.error('[STATE] Invalid slot ID:', slotId);
                return false;
            }

            const slotKey = `the_terminal_save_slot_${slotId}`;
            localStorage.removeItem(slotKey);

            // Update metadata
            const metadata = this.getAllSaveSlots();
            metadata[slotId - 1] = { slotId: slotId, exists: false };
            localStorage.setItem('the_terminal_save_metadata', JSON.stringify(metadata));

            console.log(`[STATE] Slot ${slotId} deleted`);
            return true;
        } catch (e) {
            console.error('[STATE] Failed to delete slot:', e);
            return false;
        }
    },

    reset() {
        // Delete current slot and reload
        this.deleteSaveSlot(this.currentSlot);
        location.reload();
    },

    resetGame() {
        // Reset game state without reloading the page
        this.state = {
            currentBlock: 1,
            progress: 0,
            timePlayedMinutes: 0,

            // Player knowledge
            knowsAboutSentinel: false,
            knowsAboutEcho: false,
            trustsEcho: 100,
            suspicionLevel: 0,

            // Flags di progressione
            flags: {
                firstContact: false,
                firstPuzzleComplete: false,
                sawCorruptedFile: false,
                readMissionBriefing: false,
                echoRevealed: false,
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
        };

        localStorage.removeItem('the_terminal_save');
        this.save();
        console.log('[STATE] Game reset');
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

    getChoiceCount() {
        return this.state.choices.length;
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

        // Update progress indicator in header
        const progressIndicator = document.getElementById('progress-indicator');
        if (progressIndicator) {
            progressIndicator.textContent = `BLOCK ${blockNumber}/8 — ${this.state.progress.toFixed(0)}%`;
        }

        this.save();
    },

    getPlayTime() {
        return Math.floor(this.state.timePlayedMinutes);
    },
};
