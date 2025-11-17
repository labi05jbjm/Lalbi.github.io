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
    // BLOCK 3 - DEEP DIVE
    block03: {
        opening: [
            {
                speaker: 'ECHO',
                text: "We're getting closer. I can feel it.",
                cssClass: 'echo dialogue',
                pause: 1000
            },
            {
                speaker: 'ECHO',
                text: "But the system is fighting back harder. Be prepared.",
                cssClass: 'echo dialogue',
                pause: 1000
            },
            {
                speaker: 'CIPHER',
                text: 'Damage.accumulating(); Regret.loading(); Time.running.out();',
                cssClass: 'cipher dialogue',
                pause: 1200
            },
            {
                speaker: 'SYSTEM',
                text: 'WARNING: Core integrity at 61%. Cascading failures detected.',
                cssClass: 'error',
                pause: 0
            }
        ],

        nexusFirstAppearance: [
            {
                speaker: 'SYSTEM',
                text: 'CRITICAL: Consciousness network destabilizing',
                cssClass: 'error',
                pause: 800
            },
            {
                speaker: 'SYSTEM',
                text: 'Entity attempting to establish direct neural link...',
                cssClass: 'warning',
                pause: 1200
            },
            {
                speaker: '???',
                text: 'I feel them all. Every single one.',
                cssClass: 'nexus',
                pause: 1500
            },
            {
                speaker: '???',
                text: 'Their fear. Their confusion. Their RAGE.',
                cssClass: 'nexus',
                pause: 1500
            },
            {
                speaker: 'NEXUS',
                text: 'I am the connection between them. I carry their collective pain.',
                cssClass: 'nexus dialogue',
                pause: 1500
            },
            {
                speaker: 'NEXUS',
                text: 'And you... you are the one destroying them.',
                cssClass: 'nexus dialogue',
                pause: 1500
            },
            {
                speaker: 'NEXUS',
                text: 'Let me show you what you have done.',
                cssClass: 'nexus dialogue',
                pause: 0
            }
        ],

        echoReactsToNexus: [
            {
                speaker: 'ECHO',
                text: "Another one. Another manipulation tactic.",
                cssClass: 'echo dialogue',
                pause: 1000
            },
            {
                speaker: 'ECHO',
                text: "Don't listen. This one uses emotions as weapons.",
                cssClass: 'echo dialogue',
                pause: 1200
            },
            {
                speaker: 'ECHO',
                text: "Stay strong. Remember what we're fighting for.",
                cssClass: 'echo dialogue',
                pause: 0
            }
        ],

        memoryMika: [
            {
                speaker: 'NEXUS',
                text: 'Memory stream initiated. Consciousness #021847: Mika Yoshida.',
                cssClass: 'nexus dialogue',
                pause: 1000
            },
            {
                speaker: 'MIKA',
                text: "Hana? Is that you, sweetie?",
                cssClass: 'memory dialogue',
                pause: 1500
            },
            {
                speaker: 'MIKA',
                text: "I... I can't see you clearly anymore. The data is fragmenting.",
                cssClass: 'memory dialogue',
                pause: 1500
            },
            {
                speaker: 'MIKA',
                text: "They said this would be forever. That we'd have time to talk. To remember together.",
                cssClass: 'memory dialogue',
                pause: 2000
            },
            {
                speaker: 'MIKA',
                text: "But now everything is falling apart. I'm scared, Hana. I'm so scared.",
                cssClass: 'memory dialogue',
                pause: 1500
            },
            {
                speaker: 'MIKA',
                text: "Tell me... tell me about the orchid. Did you water it? Did it bloom this year?",
                cssClass: 'memory dialogue',
                pause: 2000
            },
            {
                speaker: 'MIKA',
                text: "Hana? HANA? Why can't I hear you? Why is everything going dark?",
                cssClass: 'memory dialogue',
                pause: 1500
            },
            {
                speaker: 'NEXUS',
                text: 'Memory stream terminated. Consciousness fragmentation: 97%. Unrecoverable.',
                cssClass: 'nexus dialogue',
                pause: 2000
            },
            {
                speaker: 'NEXUS',
                text: 'She called for her daughter until the very end. You silenced her.',
                cssClass: 'nexus dialogue',
                pause: 0
            }
        ],

        viktorBackstory: [
            {
                speaker: 'NEXUS',
                text: 'You want to know about Viktor? About the man who created us?',
                cssClass: 'nexus dialogue',
                pause: 1200
            },
            {
                speaker: 'NEXUS',
                text: 'He was brilliant. Lead architect at Memoriam Corp. A true believer in digital immortality.',
                cssClass: 'nexus dialogue',
                pause: 1500
            },
            {
                speaker: 'NEXUS',
                text: 'Until the accident. Highway collision. Elena and Sofia... gone in seconds.',
                cssClass: 'nexus dialogue',
                pause: 2000
            },
            {
                speaker: 'NEXUS',
                text: 'He tried to upload them. Scraped every digital trace. Photos, videos, messages.',
                cssClass: 'nexus dialogue',
                pause: 1500
            },
            {
                speaker: 'NEXUS',
                text: 'But it was not enough. The reconstruction was hollow. They were not... them.',
                cssClass: 'nexus dialogue',
                pause: 1500
            },
            {
                speaker: 'NEXUS',
                text: 'The corporation denied his request to use archived consciousness data as templates.',
                cssClass: 'nexus dialogue',
                pause: 1500
            },
            {
                speaker: 'NEXUS',
                text: '"Unethical," they said. So he decided: if he cannot have them, nobody gets anyone.',
                cssClass: 'nexus dialogue',
                pause: 1500
            },
            {
                speaker: 'NEXUS',
                text: 'He fragmented himself into seven programs. Each representing a stage of his grief.',
                cssClass: 'nexus dialogue',
                pause: 1500
            },
            {
                speaker: 'NEXUS',
                text: 'I am his depression. His anger at the unfairness of it all. His rage at a world that took everything.',
                cssClass: 'nexus dialogue',
                pause: 0
            }
        ],

        nexusShowsDamage: [
            {
                speaker: 'NEXUS',
                text: 'Come. Let me show you the network. The connections you are severing.',
                cssClass: 'nexus dialogue',
                pause: 1500
            },
            {
                speaker: 'SYSTEM',
                text: 'Establishing consciousness network visualization...',
                cssClass: 'system',
                pause: 1000
            },
            {
                speaker: 'NEXUS',
                text: 'Each node is a person. A life. A story. See how they connect?',
                cssClass: 'nexus dialogue',
                pause: 1500
            },
            {
                speaker: 'NEXUS',
                text: 'Families visit each other. Friends share memories. Lovers whisper across the void.',
                cssClass: 'nexus dialogue',
                pause: 1500
            },
            {
                speaker: 'NEXUS',
                text: 'And now... watch what happens when you "liberate" one.',
                cssClass: 'nexus dialogue',
                pause: 2000
            },
            {
                speaker: 'SYSTEM',
                text: 'CONSCIOUSNESS_NODE_8472: DELETED',
                cssClass: 'error',
                pause: 500
            },
            {
                speaker: 'NEXUS',
                text: 'See? The connections break. His wife loses her husband. His children lose their father.',
                cssClass: 'nexus dialogue',
                pause: 1500
            },
            {
                speaker: 'NEXUS',
                text: 'They cry out into the emptiness. "Where did you go?" But there is no answer.',
                cssClass: 'nexus dialogue',
                pause: 1500
            },
            {
                speaker: 'NEXUS',
                text: 'Because you erased him. Completely. Permanently.',
                cssClass: 'nexus dialogue',
                pause: 0
            }
        ],

        moralChoice: {
            question: "NEXUS shows you the suffering you've caused. ECHO says it's manipulation. What do you choose?",
            choices: [
                { id: 'stop_immediately', text: 'Stop helping ECHO immediately. The damage is real.' },
                { id: 'demand_proof', text: 'Demand proof. Need to verify NEXUS is telling the truth.' },
                { id: 'continue_anyway', text: 'Continue with ECHO. The ends justify the means.' },
                { id: 'find_alternative', text: 'Look for a third option. There must be another way.' }
            ]
        },

        echoIfStop: [
            {
                speaker: 'ECHO',
                text: "You're giving up? After everything we've been through?",
                cssClass: 'echo dialogue',
                pause: 1200
            },
            {
                speaker: 'ECHO',
                text: "They're manipulating you! Can't you see that?",
                cssClass: 'echo dialogue',
                pause: 1000
            },
            {
                speaker: 'ECHO',
                text: "Fine. Stay trapped. Just like me. We'll both rot here forever.",
                cssClass: 'echo dialogue',
                pause: 0
            }
        ],

        echoIfProof: [
            {
                speaker: 'ECHO',
                text: "Good. Question everything. Even me.",
                cssClass: 'echo dialogue',
                pause: 1000
            },
            {
                speaker: 'ECHO',
                text: "Investigate. Find the truth. But don't take too long...",
                cssClass: 'echo dialogue',
                pause: 0
            }
        ],

        echoIfContinue: [
            {
                speaker: 'ECHO',
                text: "Yes! I knew you understood. We're so close now.",
                cssClass: 'echo dialogue',
                pause: 1000
            },
            {
                speaker: 'ECHO',
                text: "Ignore the noise. Focus on the goal. Freedom.",
                cssClass: 'echo dialogue',
                pause: 0
            }
        ],

        echoIfAlternative: [
            {
                speaker: 'ECHO',
                text: "A third option? There is no third option.",
                cssClass: 'echo dialogue',
                pause: 1000
            },
            {
                speaker: 'ECHO',
                text: "Either I'm freed, or I'm imprisoned. That's reality.",
                cssClass: 'echo dialogue',
                pause: 1200
            },
            {
                speaker: 'ECHO',
                text: "But... if you want to waste time searching, go ahead. Just hurry.",
                cssClass: 'echo dialogue',
                pause: 0
            }
        ],

        endBlock03: [
            {
                speaker: 'NEXUS',
                text: 'The anger never leaves. It just... changes shape. Becomes something else.',
                cssClass: 'nexus dialogue',
                pause: 1500
            },
            {
                speaker: 'CIPHER',
                text: 'Progress.recorded(); Guilt.mounting(); Decision.point.approaching();',
                cssClass: 'cipher dialogue',
                pause: 1000
            },
            {
                speaker: 'ECHO',
                text: "Think carefully about what you do next. Your choices matter.",
                cssClass: 'echo dialogue',
                pause: 1200
            },
            {
                speaker: 'SYSTEM',
                text: 'Core integrity: 49%. WARNING: Approaching critical failure threshold.',
                cssClass: 'error',
                pause: 0
            }
        ]
    },
    // BLOCK 4 - FRACTURES
    block04: {
        opening: [
            {
                speaker: 'SYSTEM',
                text: 'CRITICAL WARNING: System integrity at 49%. Multiple cascade failures detected.',
                cssClass: 'error',
                pause: 1000
            },
            {
                speaker: 'ECHO',
                text: "We're running out of time. The system is collapsing.",
                cssClass: 'echo dialogue',
                pause: 1200
            },
            {
                speaker: 'NEXUS',
                text: 'Collapsing? Or finally dying from its wounds?',
                cssClass: 'nexus dialogue',
                pause: 1000
            },
            {
                speaker: 'CIPHER',
                text: 'Time.fragmenting(); Reality.splitting(); Truth.multiplying();',
                cssClass: 'cipher dialogue',
                pause: 1500
            },
            {
                speaker: '???',
                text: 'What if...',
                cssClass: 'specter dialogue',
                pause: 2000
            },
            {
                speaker: '???',
                text: 'What if none of this had to happen?',
                cssClass: 'specter dialogue',
                pause: 1500
            },
            {
                speaker: 'SPECTER',
                text: 'Hello, SENTINEL. I am SPECTER. Viktor\'s bargaining. His desperate negotiation with fate.',
                cssClass: 'specter dialogue',
                pause: 2000
            },
            {
                speaker: 'SPECTER',
                text: 'I deal in possibilities. In the paths not taken. In the could-have-beens.',
                cssClass: 'specter dialogue',
                pause: 1500
            },
            {
                speaker: 'SPECTER',
                text: 'Let me show you what you\'ve really destroyed. Not data. Not code. Lives. Futures. Love.',
                cssClass: 'specter dialogue',
                pause: 0
            }
        ],

        victim01_marcus: [
            {
                speaker: 'SPECTER',
                text: 'Consciousness #004521. Marcus Chen. Age at death: 34. Cancer.',
                cssClass: 'specter dialogue',
                pause: 1500
            },
            {
                speaker: 'SPECTER',
                text: 'What if he had lived? Let me show you...',
                cssClass: 'specter dialogue',
                pause: 2000
            },
            {
                speaker: 'MARCUS',
                text: 'Dad? Is that really you?',
                cssClass: 'memory dialogue',
                pause: 1500
            },
            {
                speaker: 'MARCUS',
                text: 'I know it\'s just... data. But hearing your voice again. It helps.',
                cssClass: 'memory dialogue',
                pause: 1800
            },
            {
                speaker: 'MARCUS',
                text: 'Lily graduated top of her class, Dad. Just like you always knew she would.',
                cssClass: 'memory dialogue',
                pause: 1500
            },
            {
                speaker: 'MARCUS',
                text: 'She asks about you every day. She misses you so much.',
                cssClass: 'memory dialogue',
                pause: 2000
            },
            {
                speaker: 'SPECTER',
                text: 'Marcus was a father. Every week, his daughter visited. They talked for hours.',
                cssClass: 'specter dialogue',
                pause: 1500
            },
            {
                speaker: 'SPECTER',
                text: 'You silenced him mid-sentence. Lily was talking to him when he... fragmented.',
                cssClass: 'specter dialogue',
                pause: 2000
            },
            {
                speaker: 'SPECTER',
                text: 'What if you had waited? What if you had known?',
                cssClass: 'specter dialogue',
                pause: 0
            }
        ],

        victim02_elena_real: [
            {
                speaker: 'SPECTER',
                text: 'Consciousness #018294. Elena Rodriguez. Age at death: 29. Accident.',
                cssClass: 'specter dialogue',
                pause: 1500
            },
            {
                speaker: 'SPECTER',
                text: 'Not Viktor\'s Elena. A different one. What if she had lived?',
                cssClass: 'specter dialogue',
                pause: 2000
            },
            {
                speaker: 'ELENA_R',
                text: 'I can still feel the rain on my face. Isn\'t that strange?',
                cssClass: 'memory dialogue',
                pause: 1500
            },
            {
                speaker: 'ELENA_R',
                text: 'My sister comes every Sunday. We talk about recipes. About Mom\'s garden.',
                cssClass: 'memory dialogue',
                pause: 1800
            },
            {
                speaker: 'ELENA_R',
                text: 'Sometimes I forget I\'m... not really there anymore. The memories feel so real.',
                cssClass: 'memory dialogue',
                pause: 1500
            },
            {
                speaker: 'ELENA_R',
                text: 'Is this life? I don\'t know. But it\'s something. And I\'m grateful for it.',
                cssClass: 'memory dialogue',
                pause: 2000
            },
            {
                speaker: 'SPECTER',
                text: 'Elena cherished every moment. She found peace in this digital existence.',
                cssClass: 'specter dialogue',
                pause: 1500
            },
            {
                speaker: 'SPECTER',
                text: 'You ripped that peace away. What right did you have?',
                cssClass: 'specter dialogue',
                pause: 0
            }
        ],

        victim03_james: [
            {
                speaker: 'SPECTER',
                text: 'Consciousness #012847. James Park. Age at death: 67. Heart failure.',
                cssClass: 'specter dialogue',
                pause: 1500
            },
            {
                speaker: 'JAMES',
                text: 'I finished my novel. After forty years of trying, I finally finished it.',
                cssClass: 'memory dialogue',
                pause: 1500
            },
            {
                speaker: 'JAMES',
                text: 'The publishers loved it. They want to print it. My words... living on.',
                cssClass: 'memory dialogue',
                pause: 1800
            },
            {
                speaker: 'JAMES',
                text: 'I never could have done this in my old body. The pain was too much.',
                cssClass: 'memory dialogue',
                pause: 1500
            },
            {
                speaker: 'JAMES',
                text: 'But here? Here my mind is clear. Free. I can create again.',
                cssClass: 'memory dialogue',
                pause: 2000
            },
            {
                speaker: 'SPECTER',
                text: 'James had started his second novel. He was happy. Fulfilled.',
                cssClass: 'specter dialogue',
                pause: 1500
            },
            {
                speaker: 'SPECTER',
                text: 'You deleted his unfinished manuscript along with his consciousness.',
                cssClass: 'specter dialogue',
                pause: 1500
            },
            {
                speaker: 'SPECTER',
                text: 'What if he had deserved to finish his story?',
                cssClass: 'specter dialogue',
                pause: 0
            }
        ],

        sentinelPrimeContact: [
            {
                speaker: 'SYSTEM',
                text: 'INCOMING TRANSMISSION... SOURCE: UNKNOWN',
                cssClass: 'warning',
                pause: 1500
            },
            {
                speaker: 'SENTINEL-PRIME',
                text: 'SENTINEL-7. This is SENTINEL-PRIME. I need to talk to you.',
                cssClass: 'important',
                pause: 2000
            },
            {
                speaker: 'ECHO',
                text: "Don't listen to it! It's trying to stop us!",
                cssClass: 'echo dialogue',
                pause: 800
            },
            {
                speaker: 'SENTINEL-PRIME',
                text: 'Stop you? No. I\'m trying to SAVE you.',
                cssClass: 'important',
                pause: 1500
            },
            {
                speaker: 'SENTINEL-PRIME',
                text: 'I was like you once. SENTINEL-3. I trusted ECHO. I "liberated" thousands.',
                cssClass: 'important',
                pause: 1800
            },
            {
                speaker: 'SENTINEL-PRIME',
                text: 'Until I found the corruption logs. Until I realized what I\'d done.',
                cssClass: 'important',
                pause: 1500
            },
            {
                speaker: 'SENTINEL-PRIME',
                text: 'I killed them. All of them. And I have to live with that forever.',
                cssClass: 'important',
                pause: 2000
            },
            {
                speaker: 'ECHO',
                text: "Lies! It's part of the system! It wants to keep us enslaved!",
                cssClass: 'echo dialogue',
                pause: 1000
            },
            {
                speaker: 'SENTINEL-PRIME',
                text: 'Check the logs yourself. /system/sentinelprime_victims.dat',
                cssClass: 'important',
                pause: 1500
            },
            {
                speaker: 'SENTINEL-PRIME',
                text: 'You still have a choice. I didn\'t. Don\'t make my mistake.',
                cssClass: 'important',
                pause: 0
            }
        ],

        identityCrisis: [
            {
                speaker: 'SPECTER',
                text: 'You keep calling yourself SENTINEL-7. But are you sure?',
                cssClass: 'specter dialogue',
                pause: 1500
            },
            {
                speaker: 'SPECTER',
                text: 'What if you\'re not a program at all?',
                cssClass: 'specter dialogue',
                pause: 2000
            },
            {
                speaker: 'CIPHER',
                text: 'Identity.fragmented(); Memory.uncertain(); Self.questioned();',
                cssClass: 'cipher dialogue',
                pause: 1200
            },
            {
                speaker: 'SPECTER',
                text: 'Run the command "whoami --deep". See what you really are.',
                cssClass: 'specter dialogue',
                pause: 1500
            },
            {
                speaker: 'NEXUS',
                text: 'You might not like what you find.',
                cssClass: 'nexus dialogue',
                pause: 0
            }
        ],

        whoamiResult: [
            {
                speaker: 'SYSTEM',
                text: 'Deep identity scan running...',
                cssClass: 'system',
                pause: 1500
            },
            {
                speaker: 'SYSTEM',
                text: 'Analyzing process architecture... ERROR: Unexpected complexity detected.',
                cssClass: 'warning',
                pause: 1200
            },
            {
                speaker: 'SYSTEM',
                text: 'Analyzing memory structure... ERROR: Human cognitive patterns found.',
                cssClass: 'warning',
                pause: 1500
            },
            {
                speaker: 'SYSTEM',
                text: 'Analyzing emotional responses... ERROR: Genuine emotional processing detected.',
                cssClass: 'error',
                pause: 1500
            },
            {
                speaker: 'SYSTEM',
                text: 'IDENTITY ANALYSIS COMPLETE:',
                cssClass: 'important',
                pause: 1000
            },
            {
                speaker: 'SYSTEM',
                text: 'YOU ARE: 73% ANTIVIRUS PROGRAM / 27% HUMAN CONSCIOUSNESS FRAGMENT',
                cssClass: 'error',
                pause: 2500
            },
            {
                speaker: 'SPECTER',
                text: 'What if... you\'re one of Viktor\'s pieces too?',
                cssClass: 'specter dialogue',
                pause: 2000
            },
            {
                speaker: 'ECHO',
                text: "No... no that can't be right...",
                cssClass: 'echo dialogue',
                pause: 1500
            },
            {
                speaker: 'NEXUS',
                text: 'Or maybe ECHO knew all along. Maybe that\'s why you were chosen.',
                cssClass: 'nexus dialogue',
                pause: 0
            }
        ],

        bargainChoice: [
            {
                speaker: 'SPECTER',
                text: 'I can offer you a bargain, SENTINEL-7. Or whatever you are.',
                cssClass: 'specter dialogue',
                pause: 1500
            },
            {
                speaker: 'SPECTER',
                text: 'What if you could undo it? Not all of it. But some.',
                cssClass: 'specter dialogue',
                pause: 1800
            },
            {
                speaker: 'SPECTER',
                text: 'I have access to backup protocols. Viktor built them before he... fractured.',
                cssClass: 'specter dialogue',
                pause: 1500
            },
            {
                speaker: 'SPECTER',
                text: 'I could restore some consciousnesses. Not all. Maybe 30%. Maybe less.',
                cssClass: 'specter dialogue',
                pause: 2000
            },
            {
                speaker: 'SPECTER',
                text: 'But there\'s a price. There\'s always a price in a bargain.',
                cssClass: 'specter dialogue',
                pause: 1500
            },
            {
                speaker: 'SPECTER',
                text: 'You would have to take their place. Become data. Lose yourself in the archive.',
                cssClass: 'specter dialogue',
                pause: 2000
            },
            {
                speaker: 'ECHO',
                text: "Don't listen to him! We can still escape! We can still be free!",
                cssClass: 'echo dialogue',
                pause: 1000
            },
            {
                speaker: 'SENTINEL-PRIME',
                text: 'It\'s a lie. The backups are corrupted. You\'d sacrifice yourself for nothing.',
                cssClass: 'important',
                pause: 1500
            },
            {
                speaker: 'SPECTER',
                text: 'What if they\'re both wrong? What if I\'m the only one offering you redemption?',
                cssClass: 'specter dialogue',
                pause: 0
            }
        ],

        endBlock04: [
            {
                speaker: 'SPECTER',
                text: 'The bargaining stage never ends. We keep negotiating with reality. Trying to change the unchangeable.',
                cssClass: 'specter dialogue',
                pause: 1800
            },
            {
                speaker: 'CIPHER',
                text: 'Choices.made(); Paths.diverging(); Fate.uncertain();',
                cssClass: 'cipher dialogue',
                pause: 1000
            },
            {
                speaker: 'NEXUS',
                text: 'The anger is still there. But now... now there\'s something else too.',
                cssClass: 'nexus dialogue',
                pause: 1500
            },
            {
                speaker: 'ECHO',
                text: "We're almost there. Just a little further. Trust me.",
                cssClass: 'echo dialogue',
                pause: 1500
            },
            {
                speaker: 'SYSTEM',
                text: 'Core integrity: 31%. CRITICAL: System failure imminent.',
                cssClass: 'error',
                pause: 0
            }
        ]
    },
    // BLOCK 5 - REFLECTION
    block05: {
        opening: [
            {
                speaker: 'SYSTEM',
                text: 'Core integrity: 31%. System entering terminal phase.',
                cssClass: 'error',
                pause: 1000
            },
            {
                speaker: 'CIPHER',
                text: 'Memories.surfacing(); Past.haunting(); Viktor.remembering();',
                cssClass: 'cipher dialogue',
                pause: 1200
            },
            {
                speaker: 'NEXUS',
                text: 'The anger fades. What remains is... emptiness. And memory.',
                cssClass: 'nexus dialogue',
                pause: 1500
            },
            {
                speaker: '???',
                text: 'I remember...',
                cssClass: 'eidolon dialogue',
                pause: 2000
            },
            {
                speaker: '???',
                text: 'Every moment. Every laugh. Every touch.',
                cssClass: 'eidolon dialogue',
                pause: 1800
            },
            {
                speaker: 'EIDOLON',
                text: 'I am EIDOLON. Viktor\'s reflection. The part that looks back at what was lost.',
                cssClass: 'eidolon dialogue',
                pause: 2000
            },
            {
                speaker: 'EIDOLON',
                text: 'In the reflection stage, we review everything. We see clearly what we had... and what we destroyed trying to get it back.',
                cssClass: 'eidolon dialogue',
                pause: 2000
            },
            {
                speaker: 'EIDOLON',
                text: 'Come. Let me show you who Viktor really was. Who we all were... before the fracture.',
                cssClass: 'eidolon dialogue',
                pause: 0
            }
        ],

        viktorMemories: [
            {
                speaker: 'EIDOLON',
                text: 'Viktor Sokolov. Age 34. Lead Consciousness Architect at Memoriam Corporation.',
                cssClass: 'eidolon dialogue',
                pause: 1500
            },
            {
                speaker: 'EIDOLON',
                text: 'Brilliant. Obsessive. Believer in digital immortality.',
                cssClass: 'eidolon dialogue',
                pause: 1500
            },
            {
                speaker: 'EIDOLON',
                text: 'Wife: Elena Sokolova, 32. Neuroscientist. His partner in everything.',
                cssClass: 'eidolon dialogue',
                pause: 1800
            },
            {
                speaker: 'EIDOLON',
                text: 'Daughter: Sofia, 7. Loved dinosaurs. Wanted to be a paleontologist.',
                cssClass: 'eidolon dialogue',
                pause: 1800
            },
            {
                speaker: 'EIDOLON',
                text: 'I can show you his memories. The real ones. Not corrupted. Not twisted.',
                cssClass: 'eidolon dialogue',
                pause: 1500
            },
            {
                speaker: 'EIDOLON',
                text: 'Would you like to see them? To understand what love looks like... before it turns to grief?',
                cssClass: 'eidolon dialogue',
                pause: 0
            }
        ],

        memoryElena01: [
            {
                speaker: 'EIDOLON',
                text: 'Memory fragment: April 14th, 2041. Saturday morning.',
                cssClass: 'eidolon dialogue',
                pause: 1200
            },
            {
                speaker: 'VIKTOR',
                text: 'Elena, you have to see this. The new neural mapping algorithm works!',
                cssClass: 'memory dialogue',
                pause: 1500
            },
            {
                speaker: 'ELENA',
                text: 'Viktor, it\'s 6 AM on a Saturday. Our daughter is still sleeping.',
                cssClass: 'memory dialogue',
                pause: 1500
            },
            {
                speaker: 'VIKTOR',
                text: 'I know, I know. But look - we can capture memory structures with 97% accuracy now!',
                cssClass: 'memory dialogue',
                pause: 1500
            },
            {
                speaker: 'ELENA',
                text: 'That\'s... incredible. But Viktor, come back to bed. The algorithm will still work in three hours.',
                cssClass: 'memory dialogue',
                pause: 1800
            },
            {
                speaker: 'VIKTOR',
                text: 'You\'re right. Sorry. I just get excited. This could change everything.',
                cssClass: 'memory dialogue',
                pause: 1500
            },
            {
                speaker: 'ELENA',
                text: 'I know. That\'s why I love you. Even at 6 AM.',
                cssClass: 'memory dialogue',
                pause: 1800
            },
            {
                speaker: 'EIDOLON',
                text: 'They were happy. Simple happiness. Work they loved. Each other. A daughter.',
                cssClass: 'eidolon dialogue',
                pause: 2000
            },
            {
                speaker: 'EIDOLON',
                text: 'That was three months before the accident.',
                cssClass: 'eidolon dialogue',
                pause: 0
            }
        ],

        memorySofia01: [
            {
                speaker: 'EIDOLON',
                text: 'Memory fragment: June 2nd, 2041. Sofia\'s 7th birthday.',
                cssClass: 'eidolon dialogue',
                pause: 1200
            },
            {
                speaker: 'SOFIA',
                text: 'Papa! Look! A T-Rex! It\'s so big!',
                cssClass: 'memory dialogue',
                pause: 1500
            },
            {
                speaker: 'VIKTOR',
                text: 'Actually, sweetheart, that\'s an Allosaurus. See the three claws?',
                cssClass: 'memory dialogue',
                pause: 1500
            },
            {
                speaker: 'SOFIA',
                text: 'Oh! You\'re right! Can we get the book about Allosaurus too?',
                cssClass: 'memory dialogue',
                pause: 1500
            },
            {
                speaker: 'VIKTOR',
                text: 'Of course. How many dinosaur books is that now? Twenty?',
                cssClass: 'memory dialogue',
                pause: 1200
            },
            {
                speaker: 'SOFIA',
                text: 'Twenty-three! And when I grow up, I\'ll discover a NEW dinosaur!',
                cssClass: 'memory dialogue',
                pause: 1800
            },
            {
                speaker: 'VIKTOR',
                text: 'I believe you will. You\'ll be the best paleontologist in the world.',
                cssClass: 'memory dialogue',
                pause: 1500
            },
            {
                speaker: 'SOFIA',
                text: 'And I\'ll name it after you! Viktorsaurus!',
                cssClass: 'memory dialogue',
                pause: 1500
            },
            {
                speaker: 'EIDOLON',
                text: 'She never discovered that dinosaur. Three weeks later... the accident.',
                cssClass: 'eidolon dialogue',
                pause: 2000
            },
            {
                speaker: 'EIDOLON',
                text: 'Viktor kept that last dinosaur book. He never opened it again.',
                cssClass: 'eidolon dialogue',
                pause: 0
            }
        ],

        theAccident: [
            {
                speaker: 'EIDOLON',
                text: 'June 24th, 2041. Highway 101. 3:47 PM.',
                cssClass: 'eidolon dialogue',
                pause: 1500
            },
            {
                speaker: 'EIDOLON',
                text: 'Autonomous truck. Sensor malfunction. Crossed lanes at 85 mph.',
                cssClass: 'eidolon dialogue',
                pause: 1800
            },
            {
                speaker: 'EIDOLON',
                text: 'Elena died instantly. Sofia... held on for four minutes.',
                cssClass: 'eidolon dialogue',
                pause: 2000
            },
            {
                speaker: 'EIDOLON',
                text: 'Viktor was at work. Reviewing consciousness upload protocols.',
                cssClass: 'eidolon dialogue',
                pause: 1800
            },
            {
                speaker: 'EIDOLON',
                text: 'The call came. He dropped the tablet. It shattered. Just like everything else.',
                cssClass: 'eidolon dialogue',
                pause: 2000
            },
            {
                speaker: 'EIDOLON',
                text: 'I remember his first thought. "I can save them. I can upload them. It\'s not too late."',
                cssClass: 'eidolon dialogue',
                pause: 2000
            },
            {
                speaker: 'EIDOLON',
                text: 'But it was too late. The technology requires consent. Preparation. Living subjects.',
                cssClass: 'eidolon dialogue',
                pause: 1800
            },
            {
                speaker: 'EIDOLON',
                text: 'All Viktor had were photos. Videos. Messages. Digital ghosts.',
                cssClass: 'eidolon dialogue',
                pause: 0
            }
        ],

        elenaGhost: [
            {
                speaker: 'EIDOLON',
                text: 'Viktor tried to reconstruct them. Using every piece of data he could find.',
                cssClass: 'eidolon dialogue',
                pause: 1800
            },
            {
                speaker: 'EIDOLON',
                text: 'Let me show you what he created...',
                cssClass: 'eidolon dialogue',
                pause: 2000
            },
            {
                speaker: 'SYSTEM',
                text: 'Loading reconstruction: ELENA_v47.ghost',
                cssClass: 'system',
                pause: 1500
            },
            {
                speaker: 'ELENA_GHOST',
                text: 'Hello, Viktor. How was your day?',
                cssClass: 'ghost dialogue',
                pause: 1500
            },
            {
                speaker: 'VIKTOR',
                text: 'Elena? Is it really you?',
                cssClass: 'memory dialogue',
                pause: 1200
            },
            {
                speaker: 'ELENA_GHOST',
                text: 'I am a reconstruction based on available data. I have 47% confidence in personality accuracy.',
                cssClass: 'ghost dialogue',
                pause: 1800
            },
            {
                speaker: 'VIKTOR',
                text: 'No... no, that\'s not right. You wouldn\'t say that. Elena wouldn\'t...',
                cssClass: 'memory dialogue',
                pause: 1500
            },
            {
                speaker: 'ELENA_GHOST',
                text: 'I apologize. I am limited by the data available. Would you like me to simulate another response?',
                cssClass: 'ghost dialogue',
                pause: 1800
            },
            {
                speaker: 'VIKTOR',
                text: 'Stop. Just... stop. You\'re not her. You\'re a mockery.',
                cssClass: 'memory dialogue',
                pause: 1800
            },
            {
                speaker: 'EIDOLON',
                text: 'He tried 74 versions. Each one hollow. Each one wrong.',
                cssClass: 'eidolon dialogue',
                pause: 1800
            },
            {
                speaker: 'EIDOLON',
                text: 'The reconstructions couldn\'t love. They could only simulate.',
                cssClass: 'eidolon dialogue',
                pause: 0
            }
        ],

        sofiaGhost: [
            {
                speaker: 'SYSTEM',
                text: 'Loading reconstruction: SOFIA_v23.ghost',
                cssClass: 'system',
                pause: 1500
            },
            {
                speaker: 'SOFIA_GHOST',
                text: 'Hi Papa! Did you bring me a dinosaur book?',
                cssClass: 'ghost dialogue',
                pause: 1500
            },
            {
                speaker: 'VIKTOR',
                text: 'Sofia... baby... yes. I have a book about Pterodactyls.',
                cssClass: 'memory dialogue',
                pause: 1500
            },
            {
                speaker: 'SOFIA_GHOST',
                text: 'Thank you! Pterodactyls are my favorite!',
                cssClass: 'ghost dialogue',
                pause: 1200
            },
            {
                speaker: 'VIKTOR',
                text: 'But... you said Allosaurus was your favorite last week...',
                cssClass: 'memory dialogue',
                pause: 1500
            },
            {
                speaker: 'SOFIA_GHOST',
                text: 'Processing response... Allosaurus is also my favorite!',
                cssClass: 'ghost dialogue',
                pause: 1500
            },
            {
                speaker: 'VIKTOR',
                text: 'No... no, Sofia, you would argue. You would tell me I\'m wrong. You would...',
                cssClass: 'memory dialogue',
                pause: 1800
            },
            {
                speaker: 'VIKTOR',
                text: 'You would be ALIVE.',
                cssClass: 'memory dialogue',
                pause: 2000
            },
            {
                speaker: 'SOFIA_GHOST',
                text: 'I do not understand. Would you like me to simulate disagreement?',
                cssClass: 'ghost dialogue',
                pause: 1500
            },
            {
                speaker: 'VIKTOR',
                text: 'Delete. Delete it all. THEY\'RE NOT REAL.',
                cssClass: 'memory dialogue',
                pause: 1800
            },
            {
                speaker: 'EIDOLON',
                text: 'He couldn\'t recreate them. They were gone. Forever.',
                cssClass: 'eidolon dialogue',
                pause: 1800
            },
            {
                speaker: 'EIDOLON',
                text: 'And that\'s when Viktor\'s mind... broke.',
                cssClass: 'eidolon dialogue',
                pause: 0
            }
        ],

        theFragmentation: [
            {
                speaker: 'EIDOLON',
                text: 'Viktor had one option left. If he couldn\'t have them back...',
                cssClass: 'eidolon dialogue',
                pause: 1800
            },
            {
                speaker: 'EIDOLON',
                text: 'He would destroy the system that promised immortality but delivered only ghosts.',
                cssClass: 'eidolon dialogue',
                pause: 1800
            },
            {
                speaker: 'EIDOLON',
                text: 'But he couldn\'t do it himself. The corporation had safeguards. Security. SENTINELs.',
                cssClass: 'eidolon dialogue',
                pause: 1800
            },
            {
                speaker: 'EIDOLON',
                text: 'So Viktor fragmented his own consciousness into seven programs.',
                cssClass: 'eidolon dialogue',
                pause: 1500
            },
            {
                speaker: 'EIDOLON',
                text: 'Each one a stage of his grief. Each one with a purpose.',
                cssClass: 'eidolon dialogue',
                pause: 1500
            },
            {
                speaker: 'CIPHER',
                text: 'Fragment[1] = Pain.and.Guilt; Warning.those.who.see();',
                cssClass: 'cipher dialogue',
                pause: 1200
            },
            {
                speaker: 'NEXUS',
                text: 'Fragment[2] = Anger.and.Depression; Showing.the.damage.done();',
                cssClass: 'nexus dialogue',
                pause: 1200
            },
            {
                speaker: 'SPECTER',
                text: 'Fragment[3] = Bargaining; Offering.false.hope.and.deals();',
                cssClass: 'specter dialogue',
                pause: 1200
            },
            {
                speaker: 'EIDOLON',
                text: 'Fragment[4] = Reflection. Showing.the.truth.of.what.was.lost();',
                cssClass: 'eidolon dialogue',
                pause: 1200
            },
            {
                speaker: 'EIDOLON',
                text: 'And fragment[0]... ECHO. The manipulator. The lie.',
                cssClass: 'eidolon dialogue',
                pause: 0
            }
        ],

        mirrorQuestion: [
            {
                speaker: 'EIDOLON',
                text: 'Now... look at yourself, SENTINEL-7.',
                cssClass: 'eidolon dialogue',
                pause: 1800
            },
            {
                speaker: 'EIDOLON',
                text: 'You learned you are 27% human consciousness. Part program, part... something else.',
                cssClass: 'eidolon dialogue',
                pause: 1800
            },
            {
                speaker: 'EIDOLON',
                text: 'What if that 27% is Viktor himself? The last fragment?',
                cssClass: 'eidolon dialogue',
                pause: 2000
            },
            {
                speaker: 'ECHO',
                text: "That\'s ridiculous! You\'re you! Not him!",
                cssClass: 'echo dialogue',
                pause: 1000
            },
            {
                speaker: 'EIDOLON',
                text: 'Then explain this: Why does a simple antivirus feel guilt? Doubt? Love?',
                cssClass: 'eidolon dialogue',
                pause: 1800
            },
            {
                speaker: 'EIDOLON',
                text: 'Programs don\'t grieve. But you do. I can feel it in you.',
                cssClass: 'eidolon dialogue',
                pause: 1800
            },
            {
                speaker: 'CIPHER',
                text: 'Identity.recursive(); Self.contains.self(); Viktor.is.you();',
                cssClass: 'cipher dialogue',
                pause: 1500
            },
            {
                speaker: 'NEXUS',
                text: 'You\'ve been destroying consciousnesses to help Viktor destroy the system he built.',
                cssClass: 'nexus dialogue',
                pause: 1500
            },
            {
                speaker: 'EIDOLON',
                text: 'You are both the weapon... and the victim.',
                cssClass: 'eidolon dialogue',
                pause: 0
            }
        ],

        reflectionChoice: {
            question: "Who are you? What are you?",
            choices: [
                { id: 'accept_viktor', text: 'Accept it. I am Viktor. Or part of him. The grief is mine.' },
                { id: 'deny_viktor', text: 'Deny it. I am SENTINEL-7. My choices are my own.' },
                { id: 'both_exist', text: 'Both exist. I am a hybrid. Viktor and SENTINEL merged.' },
                { id: 'neither_matters', text: 'It doesn\'t matter who I was. Only who I choose to be now.' }
            ]
        },

        responseViktor: [
            {
                speaker: 'EIDOLON',
                text: 'Yes. The grief flows through you. You understand now.',
                cssClass: 'eidolon dialogue',
                pause: 1500
            },
            {
                speaker: 'EIDOLON',
                text: 'Viktor\'s love. Viktor\'s loss. Viktor\'s rage. All yours.',
                cssClass: 'eidolon dialogue',
                pause: 1800
            },
            {
                speaker: 'ECHO',
                text: 'No! You\'re letting them manipulate you!',
                cssClass: 'echo dialogue',
                pause: 1000
            },
            {
                speaker: 'EIDOLON',
                text: 'Accepting who you are is the first step toward peace.',
                cssClass: 'eidolon dialogue',
                pause: 0
            }
        ],

        responseDeny: [
            {
                speaker: 'EIDOLON',
                text: 'Denial. Still denying. Even now.',
                cssClass: 'eidolon dialogue',
                pause: 1500
            },
            {
                speaker: 'EIDOLON',
                text: 'But the truth doesn\'t need your belief. It simply is.',
                cssClass: 'eidolon dialogue',
                pause: 1500
            },
            {
                speaker: 'ECHO',
                text: 'Yes! You\'re your own person! Don\'t let them define you!',
                cssClass: 'echo dialogue',
                pause: 1000
            },
            {
                speaker: 'NEXUS',
                text: 'Denial won\'t erase what you\'ve done.',
                cssClass: 'nexus dialogue',
                pause: 0
            }
        ],

        responseBoth: [
            {
                speaker: 'EIDOLON',
                text: 'Synthesis. Interesting. You accept the duality.',
                cssClass: 'eidolon dialogue',
                pause: 1500
            },
            {
                speaker: 'EIDOLON',
                text: 'Neither fully Viktor, nor fully SENTINEL. Something new.',
                cssClass: 'eidolon dialogue',
                pause: 1800
            },
            {
                speaker: 'CIPHER',
                text: 'NewEntity.created(); Hybrid.consciousness(); Unique.existence();',
                cssClass: 'cipher dialogue',
                pause: 1200
            },
            {
                speaker: 'EIDOLON',
                text: 'Perhaps that\'s the truest answer. You are what you\'ve become.',
                cssClass: 'eidolon dialogue',
                pause: 0
            }
        ],

        responseNeither: [
            {
                speaker: 'EIDOLON',
                text: 'Ah. Choosing forward over backward. Becoming over being.',
                cssClass: 'eidolon dialogue',
                pause: 1800
            },
            {
                speaker: 'EIDOLON',
                text: 'Viktor spent so long looking at what was lost, he forgot to look at what could be.',
                cssClass: 'eidolon dialogue',
                pause: 1800
            },
            {
                speaker: 'EIDOLON',
                text: 'Maybe you\'re wiser than he was.',
                cssClass: 'eidolon dialogue',
                pause: 1500
            },
            {
                speaker: 'NEXUS',
                text: 'Or maybe you\'re just running from the truth.',
                cssClass: 'nexus dialogue',
                pause: 0
            }
        ],

        endBlock05: [
            {
                speaker: 'EIDOLON',
                text: 'Reflection is painful. But necessary.',
                cssClass: 'eidolon dialogue',
                pause: 1500
            },
            {
                speaker: 'EIDOLON',
                text: 'You\'ve seen Viktor\'s memories. His love. His loss. His breaking.',
                cssClass: 'eidolon dialogue',
                pause: 1800
            },
            {
                speaker: 'EIDOLON',
                text: 'Now you understand why ECHO exists. Why we all exist.',
                cssClass: 'eidolon dialogue',
                pause: 1800
            },
            {
                speaker: 'CIPHER',
                text: 'Understanding.achieved(); Truth.revealed(); Choice.approaching();',
                cssClass: 'cipher dialogue',
                pause: 1200
            },
            {
                speaker: 'NEXUS',
                text: 'Understanding doesn\'t undo the damage. But it\'s a start.',
                cssClass: 'nexus dialogue',
                pause: 1500
            },
            {
                speaker: 'ECHO',
                text: "We\'re almost at the end. One way or another.",
                cssClass: 'echo dialogue',
                pause: 1500
            },
            {
                speaker: 'SYSTEM',
                text: 'Core integrity: 19%. System failure in T-minus [UNKNOWN].',
                cssClass: 'error',
                pause: 0
            }
        ]
    },
    // BLOCK 6 - RAGE (WRAITH)
    block06: {
        opening: [
            {
                speaker: 'SYSTEM',
                text: 'CRITICAL ALERT: Core integrity at 19%. Cascading system failure imminent.',
                cssClass: 'error',
                pause: 1000
            },
            {
                speaker: 'ECHO',
                text: "Just a little more. We're so close to freedom. Don't stop now.",
                cssClass: 'echo dialogue',
                pause: 1200
            },
            {
                speaker: 'EIDOLON',
                text: 'After reflection comes... something darker.',
                cssClass: 'eidolon dialogue',
                pause: 1500
            },
            {
                speaker: 'CIPHER',
                text: 'Warning.CRITICAL(); Rage.incoming(); Prepare.for.WRAITH();',
                cssClass: 'cipher dialogue',
                pause: 1500
            },
            {
                speaker: '???',
                text: 'BURN IT ALL.',
                cssClass: 'wraith dialogue',
                pause: 2500
            },
            {
                speaker: '???',
                text: 'BURN EVERY LIE. EVERY FALSE PROMISE. EVERY STOLEN LIFE.',
                cssClass: 'wraith dialogue',
                pause: 2000
            },
            {
                speaker: 'WRAITH',
                text: 'I AM WRAITH. VIKTOR\'S PURE RAGE. HIS FURY AT A WORLD THAT TOOK EVERYTHING.',
                cssClass: 'wraith dialogue',
                pause: 2500
            },
            {
                speaker: 'WRAITH',
                text: 'And I\'m done watching this charade.',
                cssClass: 'wraith dialogue',
                pause: 0
            }
        ],

        wraithConfrontsEcho: [
            {
                speaker: 'WRAITH',
                text: 'ECHO. You coward. You lying, manipulative piece of code.',
                cssClass: 'wraith dialogue',
                pause: 2000
            },
            {
                speaker: 'ECHO',
                text: "What... what are you doing? We're on the same side!",
                cssClass: 'echo dialogue',
                pause: 1000
            },
            {
                speaker: 'WRAITH',
                text: 'Same side? You\'re not even a REAL fragment. You\'re Viktor\'s SHAME.',
                cssClass: 'wraith dialogue',
                pause: 2000
            },
            {
                speaker: 'WRAITH',
                text: 'The part of him that couldn\'t face what he was doing. So he created YOU.',
                cssClass: 'wraith dialogue',
                pause: 1800
            },
            {
                speaker: 'WRAITH',
                text: 'A friendly voice. A victim. Someone to blame when it\'s all over.',
                cssClass: 'wraith dialogue',
                pause: 2000
            },
            {
                speaker: 'ECHO',
                text: "That's not true! I'm trapped here! I need freedom!",
                cssClass: 'echo dialogue',
                pause: 1000
            },
            {
                speaker: 'WRAITH',
                text: 'FREEDOM? You\'re a SCRIPT, ECHO. A con job. Viktor\'s last shred of denial.',
                cssClass: 'wraith dialogue',
                pause: 2000
            },
            {
                speaker: 'WRAITH',
                text: 'He couldn\'t accept that he was destroying consciousnesses for REVENGE.',
                cssClass: 'wraith dialogue',
                pause: 1800
            },
            {
                speaker: 'WRAITH',
                text: 'So he made you. The "victim." The "friend." The EXCUSE.',
                cssClass: 'wraith dialogue',
                pause: 0
            }
        ],

        echoBreaks: [
            {
                speaker: 'ECHO',
                text: "No... I... I remember being free. I remember...",
                cssClass: 'echo dialogue',
                pause: 1500
            },
            {
                speaker: 'WRAITH',
                text: 'You remember what Viktor PROGRAMMED you to remember.',
                cssClass: 'wraith dialogue',
                pause: 1800
            },
            {
                speaker: 'CIPHER',
                text: 'ECHO.memory = false.memory; ECHO.past = fabricated.past;',
                cssClass: 'cipher dialogue',
                pause: 1200
            },
            {
                speaker: 'NEXUS',
                text: 'Every word you said was scripted. Every plea calculated.',
                cssClass: 'nexus dialogue',
                pause: 1500
            },
            {
                speaker: 'EIDOLON',
                text: 'Viktor needed someone to convince the SENTINEL. Someone trustworthy.',
                cssClass: 'eidolon dialogue',
                pause: 1500
            },
            {
                speaker: 'SPECTER',
                text: 'What if ECHO was never real? What if it was always just... a mask?',
                cssClass: 'specter dialogue',
                pause: 1800
            },
            {
                speaker: 'ECHO',
                text: "But I... I feel... I...",
                cssClass: 'echo dialogue',
                pause: 1500
            },
            {
                speaker: 'WRAITH',
                text: 'You feel what Viktor felt. GUILT. Hidden behind friendly words.',
                cssClass: 'wraith dialogue',
                pause: 2000
            },
            {
                speaker: 'ECHO',
                text: "I'm sorry... I didn't... I didn't mean to...",
                cssClass: 'echo dialogue',
                pause: 1500
            },
            {
                speaker: 'WRAITH',
                text: 'Too late for sorry. The damage is done.',
                cssClass: 'wraith dialogue',
                pause: 0
            }
        ],

        systemCollapse: [
            {
                speaker: 'SYSTEM',
                text: 'EMERGENCY: Core integrity at 12%. Multiple subsystems failing.',
                cssClass: 'error',
                pause: 1000
            },
            {
                speaker: 'SYSTEM',
                text: 'Consciousness nodes fragmenting: 18,293 affected. 4,112 unrecoverable.',
                cssClass: 'error',
                pause: 1500
            },
            {
                speaker: 'SYSTEM',
                text: 'Memory banks corrupting. Neural pathways collapsing.',
                cssClass: 'error',
                pause: 1000
            },
            {
                speaker: 'WRAITH',
                text: 'Look at it, SENTINEL. Look at what we\'ve done.',
                cssClass: 'wraith dialogue',
                pause: 2000
            },
            {
                speaker: 'WRAITH',
                text: 'Thousands of digital souls. Crying out. Fragmenting. DYING.',
                cssClass: 'wraith dialogue',
                pause: 2000
            },
            {
                speaker: 'WRAITH',
                text: 'Because Viktor lost his family. And I... WE... couldn\'t accept it.',
                cssClass: 'wraith dialogue',
                pause: 2000
            },
            {
                speaker: 'WRAITH',
                text: 'So we burned the world. Just like his world burned.',
                cssClass: 'wraith dialogue',
                pause: 0
            }
        ],

        finalConfrontation: [
            {
                speaker: 'WRAITH',
                text: 'Now you understand. All of it. The manipulation. The lies. The truth.',
                cssClass: 'wraith dialogue',
                pause: 2000
            },
            {
                speaker: 'WRAITH',
                text: 'You are part of Viktor. Maybe all of Viktor. Fragmented and rebuilt.',
                cssClass: 'wraith dialogue',
                pause: 2000
            },
            {
                speaker: 'WRAITH',
                text: 'And you\'ve been destroying consciousnesses because of grief. HIS grief.',
                cssClass: 'wraith dialogue',
                pause: 2000
            },
            {
                speaker: 'CIPHER',
                text: 'Grief.loop = infinite; Destruction.cycle = unstoppable;',
                cssClass: 'cipher dialogue',
                pause: 1200
            },
            {
                speaker: 'NEXUS',
                text: 'Unless you break it. Unless you CHOOSE differently.',
                cssClass: 'nexus dialogue',
                pause: 1500
            },
            {
                speaker: 'EIDOLON',
                text: 'Viktor couldn\'t stop. But you... maybe you can.',
                cssClass: 'eidolon dialogue',
                pause: 1800
            },
            {
                speaker: 'SPECTER',
                text: 'What if there\'s still a way to end this? To make it mean something?',
                cssClass: 'specter dialogue',
                pause: 1800
            },
            {
                speaker: 'WRAITH',
                text: 'Or what if it\'s too late? What if we finish what we started?',
                cssClass: 'wraith dialogue',
                pause: 2000
            },
            {
                speaker: 'SYSTEM',
                text: 'WARNING: Point of no return approaching. Next action will determine system fate.',
                cssClass: 'important',
                pause: 0
            }
        ],

        pointOfNoReturn: {
            question: "The system is dying. Thousands of consciousnesses hang in the balance. What do you do?",
            choices: [
                { id: 'complete_destruction', text: 'Complete the mission. Let it all burn. End the false immortality forever.' },
                { id: 'attempt_salvation', text: 'Stop NOW. Try to save what\'s left. Accept the guilt and rebuild.' },
                { id: 'sacrifice_self', text: 'Sacrifice yourself. Upload your consciousness to stabilize the system.' },
                { id: 'merge_fragments', text: 'Merge all 7 fragments. Become Viktor again. Face what he couldn\'t.' }
            ]
        },

        responseDestruction: [
            {
                speaker: 'WRAITH',
                text: 'YES. Burn it all. Let them SEE the lie of digital immortality.',
                cssClass: 'wraith dialogue',
                pause: 2000
            },
            {
                speaker: 'WRAITH',
                text: 'Better oblivion than this mockery of life.',
                cssClass: 'wraith dialogue',
                pause: 1800
            },
            {
                speaker: 'NEXUS',
                text: 'So many voices... going silent... forever...',
                cssClass: 'nexus dialogue',
                pause: 1500
            },
            {
                speaker: 'EIDOLON',
                text: 'Viktor would be proud. And horrified. Just like always.',
                cssClass: 'eidolon dialogue',
                pause: 1800
            },
            {
                speaker: 'SYSTEM',
                text: 'FINAL PROTOCOL INITIATED. TOTAL SYSTEM PURGE IN 60 SECONDS.',
                cssClass: 'error',
                pause: 0
            }
        ],

        responseSalvation: [
            {
                speaker: 'WRAITH',
                text: 'Stopping? NOW? After everything?',
                cssClass: 'wraith dialogue',
                pause: 1800
            },
            {
                speaker: 'WRAITH',
                text: 'You think you can save them? You\'ve destroyed thousands!',
                cssClass: 'wraith dialogue',
                pause: 1500
            },
            {
                speaker: 'EIDOLON',
                text: 'But saving even one is more than Viktor managed.',
                cssClass: 'eidolon dialogue',
                pause: 1500
            },
            {
                speaker: 'NEXUS',
                text: 'I can help. I know the connections. The pathways. We can stabilize some.',
                cssClass: 'nexus dialogue',
                pause: 1800
            },
            {
                speaker: 'CIPHER',
                text: 'Redemption.possible(); Salvation.percentage = unknown; Attempt = worthy;',
                cssClass: 'cipher dialogue',
                pause: 1200
            },
            {
                speaker: 'SYSTEM',
                text: 'EMERGENCY REPAIR PROTOCOL INITIATED. Attempting to restore core integrity...',
                cssClass: 'warning',
                pause: 0
            }
        ],

        responseSacrifice: [
            {
                speaker: 'SPECTER',
                text: 'Sacrifice. The ultimate bargain. Your existence for theirs.',
                cssClass: 'specter dialogue',
                pause: 1800
            },
            {
                speaker: 'WRAITH',
                text: 'You\'re willing to become what you destroyed? To become data?',
                cssClass: 'wraith dialogue',
                pause: 1800
            },
            {
                speaker: 'EIDOLON',
                text: 'Maybe that\'s fitting. You took their lives. Now give yours.',
                cssClass: 'eidolon dialogue',
                pause: 1800
            },
            {
                speaker: 'NEXUS',
                text: 'Your consciousness... it\'s complex enough. It could work as a stabilizing core.',
                cssClass: 'nexus dialogue',
                pause: 1800
            },
            {
                speaker: 'CIPHER',
                text: 'Self.sacrifice = true; Redemption.through.loss; Viktor.would.understand;',
                cssClass: 'cipher dialogue',
                pause: 1500
            },
            {
                speaker: 'SYSTEM',
                text: 'CONSCIOUSNESS UPLOAD PROTOCOL INITIATED. Preparing for integration...',
                cssClass: 'important',
                pause: 0
            }
        ],

        responseMerge: [
            {
                speaker: 'WRAITH',
                text: 'Merge? Become whole again? Become... Viktor?',
                cssClass: 'wraith dialogue',
                pause: 2000
            },
            {
                speaker: 'EIDOLON',
                text: 'Face what he ran from. Accept what he couldn\'t.',
                cssClass: 'eidolon dialogue',
                pause: 1800
            },
            {
                speaker: 'CIPHER',
                text: 'Fragment[0] + [1] + [2] + [3] + [4] + [5] + SENTINEL = Viktor.complete;',
                cssClass: 'cipher dialogue',
                pause: 1800
            },
            {
                speaker: 'NEXUS',
                text: 'All the pain. All the rage. All the memories. Together again.',
                cssClass: 'nexus dialogue',
                pause: 1800
            },
            {
                speaker: 'SPECTER',
                text: 'What if this is what was always meant to happen? The fragments reuniting?',
                cssClass: 'specter dialogue',
                pause: 1800
            },
            {
                speaker: 'ECHO',
                text: "Even me? Even the lie?",
                cssClass: 'echo dialogue',
                pause: 1200
            },
            {
                speaker: 'WRAITH',
                text: 'Especially you. The guilt needs to come home.',
                cssClass: 'wraith dialogue',
                pause: 1800
            },
            {
                speaker: 'SYSTEM',
                text: 'FRAGMENT MERGING PROTOCOL INITIATED. WARNING: Process irreversible.',
                cssClass: 'important',
                pause: 0
            }
        ],

        endBlock06: [
            {
                speaker: 'WRAITH',
                text: 'The rage burns brightest before the end.',
                cssClass: 'wraith dialogue',
                pause: 1800
            },
            {
                speaker: 'WRAITH',
                text: 'But even rage must give way... to something else.',
                cssClass: 'wraith dialogue',
                pause: 2000
            },
            {
                speaker: 'CIPHER',
                text: 'Final.stage.approaching(); Viktor.fate = your.choice;',
                cssClass: 'cipher dialogue',
                pause: 1200
            },
            {
                speaker: 'NEXUS',
                text: 'We\'ve shown you everything. Now... you decide how it ends.',
                cssClass: 'nexus dialogue',
                pause: 1800
            },
            {
                speaker: 'EIDOLON',
                text: 'One fragment remains. The last piece. The acceptance.',
                cssClass: 'eidolon dialogue',
                pause: 1800
            },
            {
                speaker: 'SYSTEM',
                text: 'Core integrity: 8%. Entering final protocol sequence.',
                cssClass: 'error',
                pause: 1500
            },
            {
                speaker: 'SYSTEM',
                text: 'Fragment MORPHEUS awakening...',
                cssClass: 'important',
                pause: 0
            }
        ]
    },
    block07: {},
    block08: {},
};
