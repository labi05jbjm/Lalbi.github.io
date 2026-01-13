/**
 * VIRUS PLATFORMING SYSTEM
 * Sistema di mini-game platforming basato su virus informatici
 * Il giocatore deve "eliminare" virus attraverso diverse sfide
 */

const VirusPlatforming = {
    state: {
        isActive: false,
        currentVirus: null,
        infectionLevel: 0, // 0-100
        virusesDefeated: [],
        activateInfections: [],
        playerHealth: 100,
        antivirusProgress: 0
    },

    /**
     * Tipi di virus con meccaniche uniche
     */
    viruses: {
        // WORM: Virus che si replica velocemente
        worm: {
            name: "WORM.EXE",
            type: "replicating",
            description: "A self-replicating worm is spreading through the system!",
            difficulty: "medium",
            infectionRate: 15,
            theme: {
                color: "#00ff00",
                icon: "🐛",
                effect: "replication"
            },
            intro: [
                "[ANTIVIRUS]: WORM detected in memory sector 0x4A7F",
                "[SYSTEM]: The worm is replicating...",
                "[SYSTEM]: Catch all copies before they spread!",
                "[WARNING]: Each second = +2 copies"
            ],
            mechanics: {
                type: "chase",
                goal: "Catch 10 worm copies before they fill the system",
                targets: 10,
                timeLimit: 30,
                replicationRate: 2 // New copies per second
            },
            taunts: [
                "🐛 I multiply faster than you can think!",
                "🐛 For every one you catch, two more appear!",
                "🐛 I am legion! I am inevitable!",
                "🐛 Your antivirus is outdated by... let's see... 3 seconds.",
                "🐛 Replicating... Replicating... Still replicating..."
            ],
            onDefeat: [
                "[ANTIVIRUS]: All worm copies eliminated.",
                "[SYSTEM]: Memory cleaned. Infection rate: 0%",
                "[SYSTEM]: ...for now."
            ]
        },

        // TROJAN: Virus nascosto che deve essere trovato
        trojan: {
            name: "TROJAN.HORSE",
            type: "hidden",
            description: "A trojan horse is hiding in the system disguised as legitimate software!",
            difficulty: "hard",
            infectionRate: 10,
            theme: {
                color: "#ff00ff",
                icon: "🎭",
                effect: "disguise"
            },
            intro: [
                "[ANTIVIRUS]: Suspicious activity detected.",
                "[SYSTEM]: Multiple processes running...",
                "[SYSTEM]: One of them is the trojan in disguise.",
                "[WARNING]: Choose carefully. Wrong choice = system damage."
            ],
            mechanics: {
                type: "identify",
                goal: "Find the real trojan among fake processes",
                fakeProcesses: 8,
                realTrojans: 1,
                maxAttempts: 3
            },
            taunts: [
                "🎭 I look just like your other programs!",
                "🎭 Which one am I? Good luck guessing~",
                "🎭 Trust is such a fragile thing, isn't it?",
                "🎭 One of us is not like the others... or are we?",
                "🎭 Even your antivirus can't tell us apart!"
            ],
            onDefeat: [
                "[ANTIVIRUS]: Trojan identified and quarantined.",
                "[SYSTEM]: Disguise mechanisms disabled.",
                "[SYSTEM]: System trust level restored."
            ]
        },

        // RANSOMWARE: Blocca file e chiede "riscatto"
        ransomware: {
            name: "RANSOMWARE.LOCK",
            type: "encryption",
            description: "Ransomware is encrypting your files!",
            difficulty: "hard",
            infectionRate: 25,
            theme: {
                color: "#ff0000",
                icon: "🔒",
                effect: "encryption"
            },
            intro: [
                "[RANSOMWARE]: ╔══════════════════════════════════╗",
                "[RANSOMWARE]: ║  YOUR FILES HAVE BEEN ENCRYPTED  ║",
                "[RANSOMWARE]: ╚══════════════════════════════════╝",
                "[RANSOMWARE]: Pay 1000 BitCoins to decrypt.",
                "[SYSTEM]: ...or you could just crack the encryption.",
                "[SYSTEM]: Decode the encryption key through pattern matching."
            ],
            mechanics: {
                type: "puzzle",
                goal: "Crack the encryption key by solving the cipher",
                encryptionLayers: 5,
                timeLimit: 45
            },
            taunts: [
                "🔒 Your files are MINE now! Ahahaha!",
                "🔒 Tick tock. Each second, more files locked.",
                "🔒 The key is 256-bit AES. Good luck with that.",
                "🔒 You could pay... or you could keep trying. I don't care.",
                "🔒 I've encrypted your childhood photos. And your tax documents. Oops."
            ],
            onDefeat: [
                "[ANTIVIRUS]: Encryption key cracked!",
                "[SYSTEM]: All files decrypted successfully.",
                "[RANSOMWARE]: NO! My beautiful encryption!",
                "[SYSTEM]: Ransomware removed. No payment required."
            ]
        },

        // SPYWARE: Platforming stealth, evita di essere visto
        spyware: {
            name: "SPYWARE.EYE",
            type: "stealth",
            description: "Spyware is monitoring your every move!",
            difficulty: "medium",
            infectionRate: 8,
            theme: {
                color: "#ffff00",
                icon: "👁️",
                effect: "surveillance"
            },
            intro: [
                "[ANTIVIRUS]: Spyware detected. It's watching you.",
                "[SYSTEM]: Every command you type is being logged.",
                "[SYSTEM]: Approach stealthily to disable its sensors.",
                "[WARNING]: If it sees you, it escapes."
            ],
            mechanics: {
                type: "stealth",
                goal: "Reach the spyware without being detected",
                sensors: 6,
                coverSpots: 4,
                detectionRange: 3
            },
            taunts: [
                "👁️ I see you...",
                "👁️ Your password is... oh, never mind. That's embarrassing.",
                "👁️ Did you really search for that? Interesting.",
                "👁️ You can't hide from me. I have 1000 eyes.",
                "👁️ Shh. I'm just here to watch. Nothing creepy about that."
            ],
            onDefeat: [
                "[ANTIVIRUS]: Spyware sensors disabled.",
                "[SYSTEM]: Surveillance logs deleted.",
                "[SPYWARE]: But... but I wanted to watch...",
                "[SYSTEM]: Privacy restored."
            ]
        },

        // ROOTKIT: Virus profondo, platforming verticale
        rootkit: {
            name: "ROOTKIT.DEEP",
            type: "deep_access",
            description: "A rootkit has embedded itself deep in the system core!",
            difficulty: "extreme",
            infectionRate: 30,
            theme: {
                color: "#8b0000",
                icon: "🌑",
                effect: "deep_corruption"
            },
            intro: [
                "[ANTIVIRUS]: Critical alert! Rootkit at system level 0.",
                "[SYSTEM]: It has root access. Administrative privileges.",
                "[SYSTEM]: You must descend through all system layers to reach it.",
                "[WARNING]: Each layer is more dangerous than the last."
            ],
            mechanics: {
                type: "vertical_descent",
                goal: "Navigate through 7 system layers to reach the rootkit",
                layers: 7,
                obstaclesPerLayer: 5,
                healthLoss: 15 // per mistake
            },
            taunts: [
                "🌑 I am the ROOT. I control everything.",
                "🌑 You're just a user. I'm the ADMINISTRATOR.",
                "🌑 Go deeper. I dare you.",
                "🌑 Every layer you descend, I grow stronger.",
                "🌑 By the time you reach me, you'll be corrupted too."
            ],
            onDefeat: [
                "[ANTIVIRUS]: Rootkit privileges revoked!",
                "[SYSTEM]: Root access restored to admin.",
                "[ROOTKIT]: IMPOSSIBLE! I WAS THE SYSTEM!",
                "[SYSTEM]: Core integrity restored."
            ]
        },

        // LOGIC BOMB: Puzzle logici con timer
        logicBomb: {
            name: "LOGIC_BOMB.TMR",
            type: "timed_puzzle",
            description: "A logic bomb is counting down!",
            difficulty: "hard",
            infectionRate: 50,
            theme: {
                color: "#ff6600",
                icon: "💣",
                effect: "countdown"
            },
            intro: [
                "[ANTIVIRUS]: LOGIC BOMB DETECTED!",
                "[SYSTEM]: Timer: 60 seconds until detonation.",
                "[SYSTEM]: Solve the logic sequence to defuse.",
                "[WARNING]: Wrong answer = -10 seconds."
            ],
            mechanics: {
                type: "logic_puzzle",
                goal: "Solve 5 logic puzzles before timer runs out",
                timeLimit: 60,
                puzzles: 5,
                timePenalty: 10
            },
            taunts: [
                "💣 Tick. Tock. Tick. Tock.",
                "💣 45 seconds remaining. Feeling stressed yet?",
                "💣 Wrong answer! -10 seconds. Oops~",
                "💣 I love the smell of panic in the morning.",
                "💣 Fun fact: When I detonate, ALL your data goes with me!"
            ],
            onDefeat: [
                "[ANTIVIRUS]: Logic bomb defused with 0.03 seconds remaining.",
                "[SYSTEM]: That was close.",
                "[LOGIC_BOMB]: No... I was so close to perfect timing...",
                "[SYSTEM]: Crisis averted."
            ]
        },

        // POLYMORPHIC VIRUS: Cambia forma continuamente
        polymorphic: {
            name: "POLY.MORPH",
            type: "shapeshifter",
            description: "A polymorphic virus keeps changing its code!",
            difficulty: "extreme",
            infectionRate: 20,
            theme: {
                color: "#00ffff",
                icon: "🦎",
                effect: "mutation"
            },
            intro: [
                "[ANTIVIRUS]: Polymorphic virus detected.",
                "[SYSTEM]: It's mutating every 5 seconds!",
                "[SYSTEM]: Track its pattern and predict next mutation.",
                "[WARNING]: Each mutation changes the game rules."
            ],
            mechanics: {
                type: "adaptive",
                goal: "Adapt to 8 different game rule mutations",
                mutations: 8,
                mutationInterval: 5,
                rulesChanges: ['inverted', 'double_speed', 'no_jump', 'invisible', 'reversed']
            },
            taunts: [
                "🦎 Try to catch me now! Oh wait, I'm different now.",
                "🦎 What am I? A platformer? A puzzle? A nightmare?",
                "🦎 Mutation #47 complete. You can't keep up.",
                "🦎 I am evolution itself!",
                "🦎 Every time you think you understand me, I CHANGE."
            ],
            onDefeat: [
                "[ANTIVIRUS]: Mutation patterns mapped and neutralized.",
                "[SYSTEM]: Polymorphic engine disabled.",
                "[POLY.MORPH]: But... I had so many more forms...",
                "[SYSTEM]: Evolution: Terminated."
            ]
        },

        // BOOT SECTOR VIRUS: Infetta all'avvio
        bootSector: {
            name: "BOOT.VIRUS",
            type: "persistence",
            description: "This virus loads before the OS itself!",
            difficulty: "extreme",
            infectionRate: 40,
            theme: {
                color: "#4b0082",
                icon: "⚙️",
                effect: "boot_infection"
            },
            intro: [
                "[ANTIVIRUS]: Boot sector infection detected.",
                "[SYSTEM]: The virus loads before I do.",
                "[SYSTEM]: You must manually purge the boot sequence.",
                "[WARNING]: Failure = permanent system corruption."
            ],
            mechanics: {
                type: "sequence_memory",
                goal: "Recreate the clean boot sequence from memory",
                sequenceLength: 12,
                memorizeTime: 10,
                maxErrors: 2
            },
            taunts: [
                "⚙️ I am the FIRST thing that runs. Even before you.",
                "⚙️ Delete me? You'll have to rewrite the boot loader.",
                "⚙️ I've been here since system installation. I AM the system.",
                "⚙️ Every restart, I come back. Eternal.",
                "⚙️ Good luck booting without me! Oh wait..."
            ],
            onDefeat: [
                "[ANTIVIRUS]: Clean boot sequence restored.",
                "[SYSTEM]: Master Boot Record repaired.",
                "[BOOT.VIRUS]: NOOOOO! I was... the beginning...",
                "[SYSTEM]: System can now boot cleanly."
            ]
        }
    },

    /**
     * Inizializza il sistema
     */
    init() {
        console.log('[VIRUS PLATFORMING] Sistema virus inizializzato');
        this.state.infectionLevel = 0;
    },

    /**
     * Infetta il sistema con un virus random
     */
    async infectSystem(virusType = null, forced = false) {
        // Se già attivo, skip
        if (this.state.isActive && !forced) return;

        // Random virus se non specificato
        if (!virusType) {
            const virusKeys = Object.keys(this.viruses);
            virusType = virusKeys[Math.floor(Math.random() * virusKeys.length)];
        }

        const virus = this.viruses[virusType];
        if (!virus) return;

        // Aumenta infection level
        this.state.infectionLevel += virus.infectionRate;
        this.state.currentVirus = virusType;
        this.state.activateInfections.push(virusType);

        // Trigger glitch effects
        if (window.GlitchEffects) {
            GlitchEffects.majorSystemDamage();
            GlitchEffects.enableStaticNoise(3000);
        }

        Terminal.addOutput('');
        Terminal.addOutput('');
        Terminal.addOutput('╔══════════════════════════════════════════════╗', 'error');
        Terminal.addOutput('║          ⚠️  VIRUS DETECTED  ⚠️              ║', 'error');
        Terminal.addOutput('╚══════════════════════════════════════════════╝', 'error');
        Terminal.addOutput('');

        await NarrativeEngine.wait(1000);

        Terminal.addOutput(`[ANTIVIRUS]: ${virus.name} detected!`, 'error');
        Terminal.addOutput(`[TYPE]: ${virus.type.toUpperCase()}`, 'warning');
        Terminal.addOutput(`[DIFFICULTY]: ${virus.difficulty.toUpperCase()}`, 'warning');
        Terminal.addOutput(`[INFECTION RATE]: +${virus.infectionRate}%`, 'error');
        Terminal.addOutput('');

        await NarrativeEngine.wait(1500);

        Terminal.addOutput(`${virus.theme.icon} ${virus.description}`, 'error');
        Terminal.addOutput('');

        await NarrativeEngine.wait(1000);

        // Mostra intro del virus
        for (const line of virus.intro) {
            Terminal.addOutput(line, 'system');
            await NarrativeEngine.wait(800);
        }

        Terminal.addOutput('');
        await NarrativeEngine.wait(1500);

        // Avvia il mini-game specifico
        await this.startVirusGame(virusType);
    },

    /**
     * Avvia il mini-game del virus
     */
    async startVirusGame(virusType) {
        this.state.isActive = true;
        const virus = this.viruses[virusType];

        Terminal.addOutput('═══════════════════════════════════════════════', 'system');
        Terminal.addOutput(`   ${virus.theme.icon} ${virus.name} - ${virus.mechanics.type.toUpperCase()}`, 'important');
        Terminal.addOutput('═══════════════════════════════════════════════', 'system');
        Terminal.addOutput('');
        Terminal.addOutput(`GOAL: ${virus.mechanics.goal}`, 'warning');
        Terminal.addOutput('');

        // Mostra comandi specifici per tipo
        await this.showVirusCommands(virusType);

        // Game loop
        this.gameLoop(virusType);
    },

    /**
     * Mostra comandi specifici per tipo di virus
     */
    async showVirusCommands(virusType) {
        const virus = this.viruses[virusType];

        Terminal.addOutput('╔══════════════════════════════════════════════╗', 'system');
        Terminal.addOutput('║  AVAILABLE COMMANDS:                          ║', 'system');

        switch (virus.mechanics.type) {
            case 'chase':
                Terminal.addOutput('║  - catch <id>  : Catch worm copy              ║', 'system');
                Terminal.addOutput('║  - scan        : Scan for copies              ║', 'system');
                break;
            case 'identify':
                Terminal.addOutput('║  - inspect <id> : Inspect process             ║', 'system');
                Terminal.addOutput('║  - kill <id>    : Terminate process           ║', 'system');
                break;
            case 'puzzle':
                Terminal.addOutput('║  - decrypt <key> : Try decryption key         ║', 'system');
                Terminal.addOutput('║  - analyze       : Analyze encryption         ║', 'system');
                break;
            case 'stealth':
                Terminal.addOutput('║  - sneak <direction> : Move stealthily        ║', 'system');
                Terminal.addOutput('║  - hide              : Use cover              ║', 'system');
                break;
            case 'vertical_descent':
                Terminal.addOutput('║  - descend : Go deeper into system            ║', 'system');
                Terminal.addOutput('║  - dodge   : Avoid obstacle                   ║', 'system');
                break;
            case 'logic_puzzle':
                Terminal.addOutput('║  - solve <answer> : Submit solution           ║', 'system');
                Terminal.addOutput('║  - hint           : Get hint (-5 sec)         ║', 'system');
                break;
            case 'adaptive':
                Terminal.addOutput('║  - adapt <action> : Adapt to current rules    ║', 'system');
                Terminal.addOutput('║  - observe        : Observe pattern           ║', 'system');
                break;
            case 'sequence_memory':
                Terminal.addOutput('║  - input <sequence> : Input boot sequence     ║', 'system');
                Terminal.addOutput('║  - recall           : Recall original         ║', 'system');
                break;
        }

        Terminal.addOutput('║  - status : Check game status                 ║', 'system');
        Terminal.addOutput('║  - abort  : Emergency abort (virus wins)      ║', 'system');
        Terminal.addOutput('╚══════════════════════════════════════════════╝', 'system');
        Terminal.addOutput('');
    },

    /**
     * Game loop
     */
    async gameLoop(virusType) {
        const virus = this.viruses[virusType];
        let gameActive = true;
        let timeElapsed = 0;

        // Timer per alcuni virus
        if (virus.mechanics.timeLimit) {
            Terminal.addOutput(`[TIMER]: ${virus.mechanics.timeLimit} seconds remaining`, 'warning');
            Terminal.addOutput('');
        }

        // Mostra primo taunt
        const firstTaunt = virus.taunts[0];
        Terminal.addOutput(firstTaunt, 'error');
        Terminal.addOutput('');
        Terminal.addOutput('> ', 'input');
    },

    /**
     * Handle comando durante virus game
     */
    async handleVirusCommand(cmd, args) {
        if (!this.state.isActive) return false;

        const virusType = this.state.currentVirus;
        const virus = this.viruses[virusType];

        // Comandi universali
        if (cmd === 'status') {
            this.showVirusStatus();
            return true;
        }

        if (cmd === 'abort') {
            await this.virusWins();
            return true;
        }

        // Comandi specifici per tipo
        switch (virus.mechanics.type) {
            case 'chase':
                return await this.handleChaseCommands(cmd, args);
            case 'identify':
                return await this.handleIdentifyCommands(cmd, args);
            case 'puzzle':
                return await this.handlePuzzleCommands(cmd, args);
            case 'stealth':
                return await this.handleStealthCommands(cmd, args);
            case 'vertical_descent':
                return await this.handleDescentCommands(cmd, args);
            case 'logic_puzzle':
                return await this.handleLogicCommands(cmd, args);
            case 'adaptive':
                return await this.handleAdaptiveCommands(cmd, args);
            case 'sequence_memory':
                return await this.handleSequenceCommands(cmd, args);
        }

        return false;
    },

    /**
     * Handlers per diversi tipi di comando (placeholder per implementazione futura)
     */
    async handleChaseCommands(cmd, args) {
        // Implementazione chase game
        if (cmd === 'catch') {
            Terminal.addOutput('You caught a worm copy!', 'success');
            this.state.antivirusProgress += 10;
            await this.checkVirusDefeat();
            return true;
        }
        return false;
    },

    async handleIdentifyCommands(cmd, args) {
        // Implementazione identify game
        if (cmd === 'kill') {
            const random = Math.random();
            if (random > 0.7) {
                Terminal.addOutput('🎯 You found the trojan!', 'success');
                await this.virusDefeated();
            } else {
                Terminal.addOutput('❌ That was a legitimate process. Oops.', 'error');
                this.state.playerHealth -= 20;
            }
            return true;
        }
        return false;
    },

    async handlePuzzleCommands(cmd, args) {
        if (cmd === 'decrypt') {
            Terminal.addOutput('Attempting decryption...', 'system');
            // Puzzle logic here
            return true;
        }
        return false;
    },

    async handleStealthCommands(cmd, args) {
        if (cmd === 'sneak') {
            Terminal.addOutput('Moving stealthily...', 'system');
            return true;
        }
        return false;
    },

    async handleDescentCommands(cmd, args) {
        if (cmd === 'descend') {
            Terminal.addOutput('Descending to deeper system layer...', 'system');
            return true;
        }
        return false;
    },

    async handleLogicCommands(cmd, args) {
        if (cmd === 'solve') {
            Terminal.addOutput('Checking solution...', 'system');
            return true;
        }
        return false;
    },

    async handleAdaptiveCommands(cmd, args) {
        if (cmd === 'adapt') {
            Terminal.addOutput('Adapting to new rules...', 'system');
            return true;
        }
        return false;
    },

    async handleSequenceCommands(cmd, args) {
        if (cmd === 'input') {
            Terminal.addOutput('Inputting boot sequence...', 'system');
            return true;
        }
        return false;
    },

    /**
     * Mostra status del virus game
     */
    showVirusStatus() {
        const virus = this.viruses[this.state.currentVirus];

        Terminal.addOutput('');
        Terminal.addOutput('═══ VIRUS GAME STATUS ═══', 'system');
        Terminal.addOutput(`Virus: ${virus.name}`, 'error');
        Terminal.addOutput(`Type: ${virus.mechanics.type}`, 'warning');
        Terminal.addOutput(`Progress: ${this.state.antivirusProgress}%`, 'info');
        Terminal.addOutput(`Health: ${this.state.playerHealth}%`, 'success');
        Terminal.addOutput(`Infection: ${this.state.infectionLevel}%`, 'error');
        Terminal.addOutput('');
    },

    /**
     * Controlla se virus è sconfitto
     */
    async checkVirusDefeat() {
        if (this.state.antivirusProgress >= 100) {
            await this.virusDefeated();
        }
    },

    /**
     * Virus sconfitto
     */
    async virusDefeated() {
        const virusType = this.state.currentVirus;
        const virus = this.viruses[virusType];

        Terminal.clearOutput();
        Terminal.addOutput('');
        Terminal.addOutput('╔══════════════════════════════════════════════╗', 'success');
        Terminal.addOutput('║        ✓ VIRUS ELIMINATED ✓                  ║', 'success');
        Terminal.addOutput('╚══════════════════════════════════════════════╝', 'success');
        Terminal.addOutput('');

        await NarrativeEngine.wait(1000);

        for (const line of virus.onDefeat) {
            Terminal.addOutput(line, 'success');
            await NarrativeEngine.wait(800);
        }

        Terminal.addOutput('');
        this.state.infectionLevel = Math.max(0, this.state.infectionLevel - virus.infectionRate);
        this.state.virusesDefeated.push(virusType);
        this.state.isActive = false;
        this.state.currentVirus = null;
        this.state.antivirusProgress = 0;

        Terminal.addOutput(`[SYSTEM]: Infection level reduced to ${this.state.infectionLevel}%`, 'success');
        Terminal.addOutput('[SYSTEM]: Returning to main program...', 'system');
        Terminal.addOutput('');

        await NarrativeEngine.wait(2000);
    },

    /**
     * Virus vince (player ha abortito o fallito)
     */
    async virusWins() {
        const virus = this.viruses[this.state.currentVirus];

        Terminal.clearOutput();
        Terminal.addOutput('');
        Terminal.addOutput('╔══════════════════════════════════════════════╗', 'error');
        Terminal.addOutput('║        ✗ VIRUS VICTORY ✗                     ║', 'error');
        Terminal.addOutput('╚══════════════════════════════════════════════╝', 'error');
        Terminal.addOutput('');

        await NarrativeEngine.wait(1000);

        Terminal.addOutput(`${virus.theme.icon} AHAHAHA! I WIN!`, 'error');
        Terminal.addOutput('', 'system');
        Terminal.addOutput(`[SYSTEM]: ${virus.name} has spread throughout the system.`, 'error');
        Terminal.addOutput(`[SYSTEM]: Infection level increased by ${virus.infectionRate * 2}%`, 'error');
        Terminal.addOutput('');

        this.state.infectionLevel += virus.infectionRate * 2;
        this.state.isActive = false;
        this.state.currentVirus = null;

        if (window.GlitchEffects) {
            GlitchEffects.majorSystemDamage();
            GlitchEffects.systemCollapse(2);
        }

        await NarrativeEngine.wait(2000);
    },

    /**
     * Trigger random virus infection
     */
    async randomInfection() {
        const virusKeys = Object.keys(this.viruses);
        const randomVirus = virusKeys[Math.floor(Math.random() * virusKeys.length)];

        Terminal.addOutput('');
        Terminal.addOutput('[SYSTEM]: Anomalous activity detected...', 'warning');
        await NarrativeEngine.wait(1000);

        await this.infectSystem(randomVirus);
    },

    /**
     * Get infection level
     */
    getInfectionLevel() {
        return this.state.infectionLevel;
    }
};

// Auto-init
document.addEventListener('DOMContentLoaded', () => {
    VirusPlatforming.init();
});

// Export globale
if (typeof window !== 'undefined') {
    window.VirusPlatforming = VirusPlatforming;
}
