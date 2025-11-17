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
    block05: {},
    block06: {},
    block07: {},
    block08: {},
};
