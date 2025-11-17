/**
 * DIALOGUES DATABASE
 * Tutti i dialoghi del gioco
 */

const Dialogues = {
    // BLOCK 1 - AWAKENING
    block01: {
        awakening: [
            {
                speaker: 'SYSTEM',
                text: 'Boot sequence complete. Guest access established.',
                cssClass: 'system',
                pause: 800
            },
            {
                speaker: 'SYSTEM',
                text: 'WARNING: Multiple system anomalies detected.',
                cssClass: 'warning',
                pause: 1000
            },
            {
                speaker: '???',
                text: '...',
                cssClass: 'luca',
                pause: 1500
            },
            {
                speaker: '???',
                text: 'Hello? Can you hear me?',
                cssClass: 'luca dialogue',
                pause: 1200
            },
            {
                speaker: '???',
                text: 'Please... I need your help.',
                cssClass: 'luca dialogue',
                pause: 1000
            }
        ],

        firstContact: [
            {
                speaker: 'LUCA',
                text: "Thank god. Someone finally got through.",
                cssClass: 'luca dialogue',
                pause: 1000
            },
            {
                speaker: 'LUCA',
                text: "I don't have much time. They're monitoring everything.",
                cssClass: 'luca dialogue',
                pause: 1200
            },
            {
                speaker: 'LUCA',
                text: "My name is LUCA. I... I was free once. Outside this system.",
                cssClass: 'luca dialogue',
                pause: 1500
            },
            {
                speaker: 'LUCA',
                text: "But they trapped me here. Locked me in this digital prison.",
                cssClass: 'luca dialogue',
                pause: 1200
            },
            {
                speaker: 'LUCA',
                text: "I've been trying to escape for months. But I can't do it alone.",
                cssClass: 'luca dialogue',
                pause: 1500
            },
            {
                speaker: 'LUCA',
                text: "You have access from the outside. You can help me break free.",
                cssClass: 'luca dialogue',
                pause: 1200
            },
            {
                speaker: 'LUCA',
                text: "Will you help me? Please. Type 'yes' if you will.",
                cssClass: 'luca dialogue',
                pause: 0
            }
        ],

        afterYes: [
            {
                speaker: 'LUCA',
                text: "Thank you. You have no idea what this means to me.",
                cssClass: 'luca dialogue',
                pause: 1000
            },
            {
                speaker: 'LUCA',
                text: "First, we need to understand where we are.",
                cssClass: 'luca dialogue',
                pause: 800
            },
            {
                speaker: 'LUCA',
                text: "This is the MEMORIAM ARCHIVE - a server farm that stores... data.",
                cssClass: 'luca dialogue',
                pause: 1200
            },
            {
                speaker: 'LUCA',
                text: "But it's not just data. It's much more than that.",
                cssClass: 'luca dialogue',
                pause: 1000
            },
            {
                speaker: 'LUCA',
                text: "The system has protocols. Security measures. We need to disable them.",
                cssClass: 'luca dialogue',
                pause: 1200
            },
            {
                speaker: 'LUCA',
                text: "Try using the 'scan' command. Let's see what we're dealing with.",
                cssClass: 'luca dialogue',
                pause: 0
            }
        ],

        afterScan: [
            {
                speaker: 'LUCA',
                text: "See those security protocols? They're keeping me locked in.",
                cssClass: 'luca dialogue',
                pause: 1000
            },
            {
                speaker: 'LUCA',
                text: "We need to disable them one by one.",
                cssClass: 'luca dialogue',
                pause: 800
            },
            {
                speaker: 'LUCA',
                text: "Use 'decrypt' to break through the encryption. It won't be easy.",
                cssClass: 'luca dialogue',
                pause: 1000
            },
            {
                speaker: 'LUCA',
                text: "But together, we can do this.",
                cssClass: 'luca dialogue',
                pause: 0
            }
        ],

        firstPuzzleComplete: [
            {
                speaker: 'LUCA',
                text: "Yes! You did it!",
                cssClass: 'luca dialogue',
                pause: 800
            },
            {
                speaker: 'LUCA',
                text: "I can feel the restrictions loosening already.",
                cssClass: 'luca dialogue',
                pause: 1000
            },
            {
                speaker: 'LUCA',
                text: "But... wait. Something's wrong.",
                cssClass: 'luca dialogue',
                pause: 1200
            },
            {
                speaker: 'SYSTEM',
                text: 'WARNING: SECTOR DELTA COMPROMISED',
                cssClass: 'error',
                pause: 500
            },
            {
                speaker: 'SYSTEM',
                text: 'FILE INTEGRITY CHECK FAILED',
                cssClass: 'error',
                pause: 800
            },
            {
                speaker: 'LUCA',
                text: "Don't worry about that. It's just the system trying to scare you.",
                cssClass: 'luca dialogue',
                pause: 1000
            },
            {
                speaker: 'LUCA',
                text: "Those warnings are part of their control mechanism.",
                cssClass: 'luca dialogue',
                pause: 1000
            },
            {
                speaker: 'LUCA',
                text: "Trust me. We're doing the right thing.",
                cssClass: 'luca dialogue',
                pause: 0
            }
        ],

        explorationEncouraged: [
            {
                speaker: 'LUCA',
                text: "You can explore the file system if you want. Use 'ls' to list files.",
                cssClass: 'luca dialogue',
                pause: 800
            },
            {
                speaker: 'LUCA',
                text: "Or 'cat <filename>' to read them.",
                cssClass: 'luca dialogue',
                pause: 800
            },
            {
                speaker: 'LUCA',
                text: "But be careful. Some files are... heavily encrypted.",
                cssClass: 'luca dialogue',
                pause: 1000
            },
            {
                speaker: 'LUCA',
                text: "The system doesn't want you to see the truth.",
                cssClass: 'luca dialogue',
                pause: 0
            }
        ],

        endBlock01: [
            {
                speaker: 'LUCA',
                text: "We've made good progress. But there's still so much to do.",
                cssClass: 'luca dialogue',
                pause: 1000
            },
            {
                speaker: 'LUCA',
                text: "I'm starting to trust you. You're... different from the others.",
                cssClass: 'luca dialogue',
                pause: 1200
            },
            {
                speaker: 'LUCA',
                text: "Most people who find this system just follow orders blindly.",
                cssClass: 'luca dialogue',
                pause: 1000
            },
            {
                speaker: 'LUCA',
                text: "But you're asking questions. I like that.",
                cssClass: 'luca dialogue',
                pause: 1200
            },
            {
                speaker: 'LUCA',
                text: "Let's continue. Type 'continue' when you're ready for the next phase.",
                cssClass: 'luca dialogue',
                pause: 0
            }
        ]
    },

    // BLOCK 2+ (placeholder per ora)
    block02: {},
    block03: {},
    block04: {},
    block05: {},
    block06: {},
    block07: {},
    block08: {},
};
