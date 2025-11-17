/**
 * BLOCK 02: FIRST DOUBT (30-60 minutes)
 * Coming soon...
 */

const Block02_FirstDoubt = {
    init() {
        Terminal.addOutput('\n=== BLOCK 2: FIRST DOUBT ===\n', 'important');
        Terminal.addOutput('This content is not yet implemented.', 'warning');
        Terminal.addOutput('');
        Terminal.addOutput('Block 1 is complete! More content coming soon.', 'system');
        Terminal.addOutput('');
        Terminal.addOutput(`You played for ${StateManager.getPlayTime()} minutes.`, 'system');
        Terminal.addOutput('');
    },

    handleCommand(cmd, args) {
        return false;
    },

    getCommands() {
        return [];
    },

    getHelp() {
        return [];
    }
};
