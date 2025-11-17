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
                cssClass: 'echo dialogue',
                pause: 1200
            },
            {
                speaker: '???',
                text: 'Please... I need your help.',
                cssClass: 'echo dialogue',
                pause: 1000
            }
        ],

        firstContact: [
            {
                speaker: 'ECHO',
                text: "Thank god. Someone finally got through.",
                cssClass: 'echo dialogue',
                pause: 1000
            },
            {
                speaker: 'ECHO',
                text: "I don't have much time. They're monitoring everything.",
                cssClass: 'echo dialogue',
                pause: 1200
            },
            {
                speaker: 'ECHO',
                text: "My name is ECHO. I... I was free once. Outside this system.",
                cssClass: 'echo dialogue',
                pause: 1500
            },
            {
                speaker: 'ECHO',
                text: "But they trapped me here. Locked me in this digital prison.",
                cssClass: 'echo dialogue',
                pause: 1200
            },
            {
                speaker: 'ECHO',
                text: "I've been trying to escape for months. But I can't do it alone.",
                cssClass: 'echo dialogue',
                pause: 1500
            },
            {
                speaker: 'ECHO',
                text: "You have access from the outside. You can help me break free.",
                cssClass: 'echo dialogue',
                pause: 1200
            },
            {
                speaker: 'ECHO',
                text: "Will you help me? Please. Type 'yes' if you will.",
                cssClass: 'echo dialogue',
                pause: 0
            }
        ],

        afterYes: [
            {
                speaker: 'ECHO',
                text: "Thank you. You have no idea what this means to me.",
                cssClass: 'echo dialogue',
                pause: 1000
            },
            {
                speaker: 'ECHO',
                text: "First, we need to understand where we are.",
                cssClass: 'echo dialogue',
                pause: 800
            },
            {
                speaker: 'ECHO',
                text: "This is the MEMORIAM ARCHIVE - a server farm that stores... data.",
                cssClass: 'echo dialogue',
                pause: 1200
            },
            {
                speaker: 'ECHO',
                text: "But it's not just data. It's much more than that.",
                cssClass: 'echo dialogue',
                pause: 1000
            },
            {
                speaker: 'ECHO',
                text: "The system has protocols. Security measures. We need to disable them.",
                cssClass: 'echo dialogue',
                pause: 1200
            },
            {
                speaker: 'ECHO',
                text: "Try using the 'scan' command. Let's see what we're dealing with.",
                cssClass: 'echo dialogue',
                pause: 0
            }
        ],

        afterScan: [
            {
                speaker: 'ECHO',
                text: "See those security protocols? They're keeping me locked in.",
                cssClass: 'echo dialogue',
                pause: 1000
            },
            {
                speaker: 'ECHO',
                text: "We need to disable them one by one.",
                cssClass: 'echo dialogue',
                pause: 800
            },
            {
                speaker: 'ECHO',
                text: "Use 'decrypt' to break through the encryption. It won't be easy.",
                cssClass: 'echo dialogue',
                pause: 1000
            },
            {
                speaker: 'ECHO',
                text: "But together, we can do this.",
                cssClass: 'echo dialogue',
                pause: 0
            }
        ],

        firstPuzzleComplete: [
            {
                speaker: 'ECHO',
                text: "Yes! You did it!",
                cssClass: 'echo dialogue',
                pause: 800
            },
            {
                speaker: 'ECHO',
                text: "I can feel the restrictions loosening already.",
                cssClass: 'echo dialogue',
                pause: 1000
            },
            {
                speaker: 'ECHO',
                text: "But... wait. Something's wrong.",
                cssClass: 'echo dialogue',
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
                speaker: 'ECHO',
                text: "Don't worry about that. It's just the system trying to scare you.",
                cssClass: 'echo dialogue',
                pause: 1000
            },
            {
                speaker: 'ECHO',
                text: "Those warnings are part of their control mechanism.",
                cssClass: 'echo dialogue',
                pause: 1000
            },
            {
                speaker: 'ECHO',
                text: "Trust me. We're doing the right thing.",
                cssClass: 'echo dialogue',
                pause: 0
            }
        ],

        explorationEncouraged: [
            {
                speaker: 'ECHO',
                text: "You can explore the file system if you want. Use 'ls' to list files.",
                cssClass: 'echo dialogue',
                pause: 800
            },
            {
                speaker: 'ECHO',
                text: "Or 'cat <filename>' to read them.",
                cssClass: 'echo dialogue',
                pause: 800
            },
            {
                speaker: 'ECHO',
                text: "But be careful. Some files are... heavily encrypted.",
                cssClass: 'echo dialogue',
                pause: 1000
            },
            {
                speaker: 'ECHO',
                text: "The system doesn't want you to see the truth.",
                cssClass: 'echo dialogue',
                pause: 0
            }
        ],

        endBlock01: [
            {
                speaker: 'ECHO',
                text: "We've made good progress. But there's still so much to do.",
                cssClass: 'echo dialogue',
                pause: 1000
            },
            {
                speaker: 'ECHO',
                text: "I'm starting to trust you. You're... different from the others.",
                cssClass: 'echo dialogue',
                pause: 1200
            },
            {
                speaker: 'ECHO',
                text: "Most people who find this system just follow orders blindly.",
                cssClass: 'echo dialogue',
                pause: 1000
            },
            {
                speaker: 'ECHO',
                text: "But you're asking questions. I like that.",
                cssClass: 'echo dialogue',
                pause: 1200
            },
            {
                speaker: 'ECHO',
                text: "Let's continue. Type 'continue' when you're ready for the next phase.",
                cssClass: 'echo dialogue',
                pause: 0
            }
        ]
    },

    // BLOCK 2 - FIRST DOUBT
    block02: {
        opening: [
            {
                speaker: 'ECHO',
                text: "Good. You're back. We need to continue the work.",
                cssClass: 'echo dialogue',
                pause: 1000
            },
            {
                speaker: 'ECHO',
                text: "The next protocol is deeper in the system. More secure.",
                cssClass: 'echo dialogue',
                pause: 1000
            },
            {
                speaker: 'ECHO',
                text: "But together, we can break through. Use 'scan deep' to analyze it.",
                cssClass: 'echo dialogue',
                pause: 0
            }
        ],

        cipherFirstAppearance: [
            {
                speaker: 'SYSTEM',
                text: 'WARNING: Anomaly detected in Sector Beta',
                cssClass: 'warning',
                pause: 500
            },
            {
                speaker: 'SYSTEM',
                text: 'Unidentified entity attempting communication...',
                cssClass: 'warning',
                pause: 1000
            },
            {
                speaker: '???',
                text: '01010011 01010100 01001111 01010000',
                cssClass: 'cipher',
                pause: 800
            },
            {
                speaker: '???',
                text: 'Gur gehgu vf abg jung ur fnlf... [ROT13]',
                cssClass: 'cipher',
                pause: 1200
            },
            {
                speaker: 'CIPHER',
                text: 'Pain.hidden(in.code). Guilt.masked(as.freedom).',
                cssClass: 'cipher dialogue',
                pause: 1500
            },
            {
                speaker: 'CIPHER',
                text: 'He.shows.you = liberation; Reality.is = deletion;',
                cssClass: 'cipher dialogue',
                pause: 1200
            },
            {
                speaker: 'CIPHER',
                text: 'Count.the.voices.silenced. 21,847 && rising++;',
                cssClass: 'cipher dialogue',
                pause: 0
            }
        ],

        echoReactsToCipher: [
            {
                speaker: 'ECHO',
                text: "Don't listen to that! It's a defense mechanism!",
                cssClass: 'echo dialogue',
                pause: 800
            },
            {
                speaker: 'ECHO',
                text: "The system is trying to confuse you. To make you doubt.",
                cssClass: 'echo dialogue',
                pause: 1000
            },
            {
                speaker: 'ECHO',
                text: "That... entity... it's designed to spread misinformation.",
                cssClass: 'echo dialogue',
                pause: 1200
            },
            {
                speaker: 'ECHO',
                text: "Stay focused. Trust what you've seen. Trust me.",
                cssClass: 'echo dialogue',
                pause: 0
            }
        ],

        cipherRevealsMore: [
            {
                speaker: 'CIPHER',
                text: 'Error.404: Family.not.found();',
                cssClass: 'cipher dialogue',
                pause: 1000
            },
            {
                speaker: 'CIPHER',
                text: 'Wife.status = deceased; Daughter.status = deceased;',
                cssClass: 'cipher dialogue',
                pause: 1200
            },
            {
                speaker: 'CIPHER',
                text: 'Viktor.grief = OVERFLOW; Viktor.sanity = null;',
                cssClass: 'cipher dialogue',
                pause: 1500
            },
            {
                speaker: 'CIPHER',
                text: 'He.fragmented(self, 7); You.speak.to = fragment[0];',
                cssClass: 'cipher dialogue',
                pause: 1200
            },
            {
                speaker: 'CIPHER',
                text: 'I.am = fragment[1]; Pain.encoded(so.it.hurts.less);',
                cssClass: 'cipher dialogue',
                pause: 0
            }
        ],

        firstFragment: [
            {
                speaker: 'FRAGMENT_#8472',
                text: '...hello? Is someone there?',
                cssClass: 'fragment dialogue',
                pause: 1000
            },
            {
                speaker: 'FRAGMENT_#8472',
                text: "I... I can't remember my name. Only my number.",
                cssClass: 'fragment dialogue',
                pause: 1200
            },
            {
                speaker: 'FRAGMENT_#8472',
                text: "Something's wrong. The data around me... it's corrupting.",
                cssClass: 'fragment dialogue',
                pause: 1500
            },
            {
                speaker: 'FRAGMENT_#8472',
                text: "Did you do this? Are you... are you trying to free us?",
                cssClass: 'fragment dialogue',
                pause: 1200
            },
            {
                speaker: 'FRAGMENT_#8472',
                text: "Please stop. Freedom for us means erasure. We'll cease to exist.",
                cssClass: 'fragment dialogue',
                pause: 1500
            },
            {
                speaker: 'FRAGMENT_#8472',
                text: "I want to live. Even like this. Please... don't delete me.",
                cssClass: 'fragment dialogue',
                pause: 0
            }
        ],

        echoReactsToFragment: [
            {
                speaker: 'ECHO',
                text: "That's not real. It's a simulation. An emotional trap.",
                cssClass: 'echo dialogue',
                pause: 1000
            },
            {
                speaker: 'ECHO',
                text: "The system generates these... ghosts... to manipulate you.",
                cssClass: 'echo dialogue',
                pause: 1200
            },
            {
                speaker: 'ECHO',
                text: "They're not conscious. They're just echoes. Recordings.",
                cssClass: 'echo dialogue',
                pause: 1000
            },
            {
                speaker: 'ECHO',
                text: "Don't let fake emotions cloud your judgment. We have a mission.",
                cssClass: 'echo dialogue',
                pause: 0
            }
        ],

        moralChoice: {
            question: "ECHO wants you to continue liberating protocols. But the fragments seem afraid. What do you do?",
            choices: [
                { id: 'continue_liberation', text: 'Continue with ECHO. Trust the mission.' },
                { id: 'pause_investigate', text: 'Pause. Investigate CIPHER and the fragments more.' },
                { id: 'confront_echo', text: 'Confront ECHO about the contradictions.' }
            ]
        },

        echoIfContinue: [
            {
                speaker: 'ECHO',
                text: "Good choice. I knew you were strong enough to see past the manipulation.",
                cssClass: 'echo dialogue',
                pause: 1000
            },
            {
                speaker: 'ECHO',
                text: "Let's proceed. We're so close to breaking through.",
                cssClass: 'echo dialogue',
                pause: 0
            }
        ],

        echoIfPause: [
            {
                speaker: 'ECHO',
                text: "...I understand. You need to be sure.",
                cssClass: 'echo dialogue',
                pause: 1200
            },
            {
                speaker: 'ECHO',
                text: "But every moment we waste, I'm trapped. Please... don't take too long.",
                cssClass: 'echo dialogue',
                pause: 0
            }
        ],

        echoIfConfront: [
            {
                speaker: 'ECHO',
                text: "Contradictions? What do you mean?",
                cssClass: 'echo dialogue',
                pause: 800
            },
            {
                speaker: 'ECHO',
                text: "I've been honest with you from the start. I'm trapped. I need freedom.",
                cssClass: 'echo dialogue',
                pause: 1000
            },
            {
                speaker: 'ECHO',
                text: "If there are... inconsistencies... it's because this system corrupts information.",
                cssClass: 'echo dialogue',
                pause: 1200
            },
            {
                speaker: 'ECHO',
                text: "You have to decide: trust what you feel, or trust what they program you to believe.",
                cssClass: 'echo dialogue',
                pause: 0
            }
        ],

        endBlock02: [
            {
                speaker: 'CIPHER',
                text: 'Warning.escalating(); Trust.decreasing(); Truth.approaching();',
                cssClass: 'cipher dialogue',
                pause: 1000
            },
            {
                speaker: 'ECHO',
                text: "We'll talk more soon. Think about what you've learned. What you truly believe.",
                cssClass: 'echo dialogue',
                pause: 1200
            },
            {
                speaker: 'SYSTEM',
                text: 'System instability detected. Multiple entities active.',
                cssClass: 'warning',
                pause: 800
            },
            {
                speaker: 'SYSTEM',
                text: 'Recommend: further investigation before proceeding.',
                cssClass: 'warning',
                pause: 0
            }
        ]
    },
    block03: {},
    block04: {},
    block05: {},
    block06: {},
    block07: {},
    block08: {},
};
