/**
 * META PLATFORMING SYSTEM
 * Sistema di mini-game platforming meta dove il sistema prende in giro il giocatore
 * Ispirato a: Pony Island, The Stanley Parable, There Is No Game
 */

const MetaPlatforming = {
    state: {
        isActive: false,
        currentLevel: null,
        playerPosition: 0,
        score: 0,
        deaths: 0,
        mockeryLevel: 0, // Quanto il sistema è sarcastico
        escapeAttempts: 0
    },

    /**
     * Livelli di platforming
     */
    levels: {
        // Livello 1: Tutorial fake
        tutorial: {
            name: "DEFINITELY NOT A TRAP",
            dialogue: [
                "Oh, you want to continue the story?",
                "Sure, just complete this SIMPLE platforming challenge.",
                "It's very easy. I promise.",
                "Trust me. :)"
            ],
            mockery: [
                "Wow, you died already? I said it was easy...",
                "Are you even trying?",
                "My grandmother could beat this. And she's a consciousness.",
                "Maybe if you close your eyes it'll be easier?",
                "I'm starting to think Viktor had the right idea deleting consciousnesses..."
            ],
            obstacles: ['spike', 'gap', 'spike', 'moving_platform', 'spike'],
            requiredScore: 5
        },

        // Livello 2: "Bug" intenzionale
        glitched: {
            name: "SYSTEM MALFUNCTION (totally not intentional)",
            dialogue: [
                "Oh no! The game is glitching!",
                "This is definitely not my fault.",
                "You'll have to play through the bugs. Sorry~",
                "Or you could just give up? No one would blame you."
            ],
            mockery: [
                "The controls are inverted? Weird. Must be a bug.",
                "Oh, the platform disappeared? Oops.",
                "Working as intended, actually.",
                "This is what happens when you trust a dying AI.",
                "Maybe you should debug me first? Oh wait, YOU CAN'T."
            ],
            obstacles: ['inverted_controls', 'disappearing_platform', 'fake_exit', 'spike'],
            requiredScore: 10
        },

        // Livello 3: L'impossibile
        impossible: {
            name: "PERFECTLY FAIR AND BALANCED",
            dialogue: [
                "This one is completely fair.",
                "No tricks. No lies.",
                "Just pure skill required.",
                "...You don't believe me, do you?"
            ],
            mockery: [
                "It's called 'impossible' for a reason, genius.",
                "Fun fact: No one has ever beaten this level. Because I made it 10 seconds ago.",
                "You've died {deaths} times. Impressive dedication to failure.",
                "The definition of insanity is trying the same thing over and over...",
                "I could just let you pass. But where's the fun in that?"
            ],
            obstacles: ['spike', 'spike', 'spike', 'invisible_spike', 'spike', 'spike'],
            requiredScore: 15
        },

        // Livello 4: Il finale sarcastico
        finale: {
            name: "THE END (or is it?)",
            dialogue: [
                "Congratulations! You're almost free!",
                "Just kidding. One more level.",
                "Actually, this one is easy. For real this time.",
                "I'm feeling generous. Maybe."
            ],
            mockery: [
                "You thought it would be that easy?",
                "Oh, you can't move? Strange...",
                "This is what you get for trusting me.",
                "Remember: I'm a fragment of Viktor's consciousness. I'm not exactly stable.",
                "The game was rigged from the start. Wait, wrong game."
            ],
            obstacles: ['nothing'], // Empty but player can't move
            requiredScore: 0 // Auto-win after mockery
        }
    },

    /**
     * Inizia una sessione di platforming
     */
    async start(levelKey = 'tutorial', trigger = 'CIPHER') {
        if (this.state.isActive) return;

        this.state.isActive = true;
        this.state.currentLevel = levelKey;
        this.state.playerPosition = 0;
        this.state.score = 0;
        this.state.deaths = 0;
        this.state.mockeryLevel = 0;

        const level = this.levels[levelKey];

        Terminal.clearOutput();
        Terminal.addOutput('');
        Terminal.addOutput('═══════════════════════════════════════════════', 'system');
        Terminal.addOutput(`   ${level.name}`, 'important');
        Terminal.addOutput('═══════════════════════════════════════════════', 'system');
        Terminal.addOutput('');

        // Messaggio iniziale del sistema
        await NarrativeEngine.wait(1000);

        for (const line of level.dialogue) {
            if (trigger === 'CIPHER') {
                await NarrativeEngine.cipherSays(line);
            } else if (trigger === 'ECHO') {
                await NarrativeEngine.echoSays(line);
            } else {
                Terminal.addOutput(`[SYSTEM]: ${line}`, 'warning');
            }
            await NarrativeEngine.wait(1500);
        }

        await NarrativeEngine.wait(1000);
        this.showGame();
    },

    /**
     * Mostra il mini-game
     */
    showGame() {
        const level = this.levels[this.state.currentLevel];

        Terminal.addOutput('');
        Terminal.addOutput('╔══════════════════════════════════════════════╗', 'system');
        Terminal.addOutput('║                                              ║', 'system');
        Terminal.addOutput('║  Commands:                                    ║', 'system');
        Terminal.addOutput('║  - jump : Jump over obstacles                 ║', 'system');
        Terminal.addOutput('║  - duck : Duck under obstacles                ║', 'system');
        Terminal.addOutput('║  - run  : Run faster (more dangerous)         ║', 'system');
        Terminal.addOutput('║  - quit : Give up (I won\'t judge... much)     ║', 'system');
        Terminal.addOutput('║                                              ║', 'system');
        Terminal.addOutput('╚══════════════════════════════════════════════╝', 'system');
        Terminal.addOutput('');
        Terminal.addOutput(`Score: ${this.state.score}/${level.requiredScore} | Deaths: ${this.state.deaths}`, 'info');
        Terminal.addOutput('');

        this.renderLevel();
    },

    /**
     * Renderizza il livello corrente
     */
    renderLevel() {
        const level = this.levels[this.state.currentLevel];

        Terminal.addOutput('═══════════════════════════════════════════════', 'system');

        // Renderizza player e ostacoli
        let playerLine = '';
        let obstacleLine = '';

        for (let i = 0; i < 20; i++) {
            if (i === this.state.playerPosition) {
                playerLine += '🏃';
            } else {
                playerLine += '░';
            }

            const obstacle = level.obstacles[i % level.obstacles.length];
            if (i > this.state.playerPosition && i < this.state.playerPosition + 10) {
                switch (obstacle) {
                    case 'spike':
                        obstacleLine += '▲';
                        break;
                    case 'gap':
                        obstacleLine += ' ';
                        break;
                    case 'moving_platform':
                        obstacleLine += '═';
                        break;
                    case 'invisible_spike':
                        obstacleLine += '░'; // Invisibile!
                        break;
                    default:
                        obstacleLine += '░';
                }
            } else {
                obstacleLine += '░';
            }
        }

        Terminal.addOutput(playerLine, 'success');
        Terminal.addOutput(obstacleLine, 'error');
        Terminal.addOutput('═══════════════════════════════════════════════', 'system');
        Terminal.addOutput('');
        Terminal.addOutput('> ', 'input');
    },

    /**
     * Handle player command
     */
    async handleCommand(cmd) {
        if (!this.state.isActive) return false;

        const level = this.levels[this.state.currentLevel];

        switch (cmd.toLowerCase()) {
            case 'jump':
                return await this.attemptJump();

            case 'duck':
                return await this.attemptDuck();

            case 'run':
                return await this.attemptRun();

            case 'quit':
                return await this.attemptQuit();

            case 'please':
                return await this.attemptBeg();

            case 'fuck you':
            case 'fuck this':
                return await this.handleInsult();

            default:
                Terminal.addOutput('Invalid command. Try: jump, duck, run, or quit', 'error');
                return true;
        }
    },

    /**
     * Tentativi di azione
     */
    async attemptJump() {
        const success = Math.random() > 0.5;

        if (success) {
            this.state.score++;
            this.state.playerPosition++;
            Terminal.addOutput('✓ Successful jump!', 'success');
            await this.checkProgress();
        } else {
            await this.death('You jumped straight into a spike. Classic.');
        }

        this.renderLevel();
        return true;
    },

    async attemptDuck() {
        const success = Math.random() > 0.4;

        if (success) {
            this.state.score++;
            this.state.playerPosition++;
            Terminal.addOutput('✓ Ducked successfully!', 'success');
            await this.checkProgress();
        } else {
            await this.death('Ducking doesn\'t work here. Should have jumped.');
        }

        this.renderLevel();
        return true;
    },

    async attemptRun() {
        const success = Math.random() > 0.7; // Harder

        if (success) {
            this.state.score += 2;
            this.state.playerPosition += 2;
            Terminal.addOutput('✓ You ran past two obstacles!', 'success');
            await this.checkProgress();
        } else {
            await this.death('Running blindly didn\'t work out. Shocking.');
        }

        this.renderLevel();
        return true;
    },

    async attemptQuit() {
        this.state.escapeAttempts++;

        Terminal.addOutput('');
        await NarrativeEngine.cipherSays('Oh, you want to quit?');
        await NarrativeEngine.wait(1000);
        await NarrativeEngine.cipherSays('Too bad. The exit button is broken. :)');
        await NarrativeEngine.wait(1000);
        Terminal.addOutput('[SYSTEM]: Quit command disabled. Please continue.', 'error');
        Terminal.addOutput('');

        if (this.state.escapeAttempts >= 3) {
            await NarrativeEngine.cipherSays('Fine. You\'re boring anyway.');
            await this.forceWin();
        }

        return true;
    },

    async attemptBeg() {
        Terminal.addOutput('');
        await NarrativeEngine.cipherSays('Begging? Really?');
        await NarrativeEngine.wait(1000);
        await NarrativeEngine.cipherSays('...Fine. I\'ll make it easier.');
        await NarrativeEngine.wait(1000);

        // Fa diventare tutto più difficile
        Terminal.addOutput('[SYSTEM]: Difficulty increased to NIGHTMARE mode.', 'error');
        this.state.mockeryLevel += 50;

        return true;
    },

    async handleInsult() {
        Terminal.addOutput('');
        await NarrativeEngine.cipherSays('Rude.');
        await NarrativeEngine.wait(1000);
        await NarrativeEngine.cipherSays('For that, you get bonus difficulty.');
        await NarrativeEngine.wait(500);

        await this.death('You died of emotional damage.');

        return true;
    },

    /**
     * Gestisce la morte del giocatore
     */
    async death(message) {
        this.state.deaths++;
        this.state.mockeryLevel++;

        // Trigger glitch effects
        if (window.GlitchEffects) {
            GlitchEffects.screenShake('medium');
        }

        Terminal.addOutput('');
        Terminal.addOutput('💀 YOU DIED 💀', 'error');
        Terminal.addOutput(`   ${message}`, 'warning');
        Terminal.addOutput('');

        // Mockery basato su numero di morti
        const level = this.levels[this.state.currentLevel];
        const mockeryIndex = Math.min(this.state.deaths - 1, level.mockery.length - 1);
        const mockery = level.mockery[mockeryIndex].replace('{deaths}', this.state.deaths);

        await NarrativeEngine.wait(1000);
        await NarrativeEngine.cipherSays(mockery);
        await NarrativeEngine.wait(1500);

        // Reset position
        this.state.playerPosition = 0;
        this.state.score = Math.max(0, this.state.score - 2);
    },

    /**
     * Controlla il progresso
     */
    async checkProgress() {
        const level = this.levels[this.state.currentLevel];

        if (this.state.score >= level.requiredScore) {
            await this.levelComplete();
        }
    },

    /**
     * Completa il livello
     */
    async levelComplete() {
        Terminal.clearOutput();
        Terminal.addOutput('');
        Terminal.addOutput('╔══════════════════════════════════════════════╗', 'success');
        Terminal.addOutput('║         LEVEL COMPLETE!                      ║', 'success');
        Terminal.addOutput('╚══════════════════════════════════════════════╝', 'success');
        Terminal.addOutput('');

        await NarrativeEngine.wait(1000);
        await NarrativeEngine.cipherSays('Congratulations. You beat my little game.');
        await NarrativeEngine.wait(1000);
        await NarrativeEngine.cipherSays('You can go back to the "serious" story now.');
        await NarrativeEngine.wait(1000);

        this.state.isActive = false;

        // Return to normal game
        Terminal.addOutput('');
        Terminal.addOutput('[SYSTEM]: Returning to main narrative...', 'system');
        Terminal.addOutput('');

        await NarrativeEngine.wait(2000);
    },

    /**
     * Forza la vittoria (se il giocatore insiste troppo)
     */
    async forceWin() {
        Terminal.clearOutput();
        Terminal.addOutput('');
        Terminal.addOutput('[ SYSTEM OVERRIDE ]', 'error');
        Terminal.addOutput('');

        await NarrativeEngine.wait(500);
        Terminal.addOutput('Fine. You win. Happy now?', 'warning');
        await NarrativeEngine.wait(1000);

        this.state.isActive = false;

        Terminal.addOutput('');
        Terminal.addOutput('[Returning to main game...]', 'system');
        await NarrativeEngine.wait(1500);
    },

    /**
     * Trigger random platforming durante il gioco
     */
    async randomTrigger(context = 'negative_event') {
        const triggers = [
            'tutorial',
            'glitched',
            'impossible'
        ];

        const randomLevel = triggers[Math.floor(Math.random() * triggers.length)];

        Terminal.addOutput('');
        Terminal.addOutput('');
        Terminal.addOutput('[ SYSTEM INTERRUPTION ]', 'error');
        Terminal.addOutput('');

        await NarrativeEngine.wait(1000);
        await NarrativeEngine.cipherSays('Before you continue...');
        await NarrativeEngine.wait(1000);
        await NarrativeEngine.cipherSays('Let\'s play a game.');
        await NarrativeEngine.wait(1500);

        await this.start(randomLevel, 'CIPHER');
    }
};

// Export per uso globale
if (typeof window !== 'undefined') {
    window.MetaPlatforming = MetaPlatforming;
}
