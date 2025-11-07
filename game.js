// ============================================
// THE CARD GAME - Meta-Narrative Edition
// "Who is really playing?"
// ============================================

// === ENTITY DIALOGUE SYSTEM ===
const EntityDialogues = {
    // Start game dialogues
    gameStart: [
        "Così... sei tornato...",
        "Pensavi di poter vincere questa volta?",
        "Benvenuto nel mio dominio, giocatore...",
        "Le carte ricordano la tua ultima sconfitta.",
        "Giochiamo ancora?"
    ],

    // Card hover dialogues
    cardHover: [
        "Quella carta? Interessante scelta...",
        "Credi davvero che ti salverà?",
        "Ne ho viste cadere molte come questa...",
        "Le carte parlano di te, sai?",
        "Quella è forte... troppo forte per te forse?",
        "Osservo come le tue dita tremano sul mouse...",
        "Decisione difficile, vero?",
        "Ah, quella... ha ucciso il suo ultimo proprietario.",
        "Sento la tua esitazione...",
        "Non sei sicuro, vero? Lo vedo nei tuoi occhi."
    ],

    // Card play dialogues
    cardPlay: [
        "Mossa coraggiosa... o stupida?",
        "Vediamo se regge...",
        "Interessante... ma non abbastanza.",
        "Pensavi mi sorprendessi?",
        "Le carte sussurrano il tuo nome...",
        "Ah, giochi quella? Come immaginavo.",
        "Prevedibile. Come sempre.",
        "Questa partita è già finita... tu non lo sai ancora.",
        "Hai sentito quel suono? Le carte... ridono.",
        "Bravo. Ma non basterà."
    ],

    // Sacrifice dialogues
    sacrifice: [
        "Il sacrificio... nobile. O disperato?",
        "Le anime sacrificate non dimenticano...",
        "Puoi sentirla urlare mentre svanisce?",
        "Un'altra carta nella mia collezione di ricordi.",
        "Il sangue delle carte nutre l'oscurità.",
        "Sacrificare è facile. Vivere con la scelta... no.",
        "Quella carta ti maledirà nei sogni.",
        "Perfetto. Più sacrifichi, più diventi come me.",
        "Sento il peso della tua decisione.",
        "Era la tua preferita, vero?"
    ],

    // End turn dialogues
    endTurn: [
        "Finalmente. Il mio turno...",
        "Ora vedrai cosa significa giocare davvero.",
        "Lasciami mostrarti come si fa.",
        "È sempre più divertente quando tocca a me.",
        "Preparati. Non sarà piacevole.",
        "Il destino è già scritto. Te lo mostro.",
        "Hai fatto il tuo meglio? Spero di no.",
        "Turno terminato? Bene. Ora soffri."
    ],

    // Draw card dialogues
    draw: [
        "Pesca... sperando in un miracolo?",
        "Le carte ti daranno ciò che meriti.",
        "Non c'è fortuna qui. Solo destino.",
        "Quella carta... l'ho già vista perdere.",
        "Ah, bella pesca. Non cambierà nulla.",
        "Peschi come un disperato."
    ],

    // Low health dialogues
    lowHealth: [
        "Sento il tuo cuore accelerare...",
        "La morte bussa alla porta.",
        "Ancora quanto resisterai?",
        "Il panico nei tuoi occhi... delizioso.",
        "È quasi finita... lo senti anche tu?",
        "Sento la tua paura attraverso lo schermo."
    ],

    // Victory close
    almostWin: [
        "Pensi di star vincendo? Quanto ingenuo...",
        "Questa vittoria sarà più amara di ogni sconfitta.",
        "Vincere non ti libererà da me.",
        "Anche nella vittoria, sei già perso.",
        "VITTORIA? Non capisci ancora..."
    ],

    // Pause menu
    pause: [
        "Perché ti fermi? Hai paura di continuare?",
        "Scappare non cambierà il finale.",
        "Il gioco continua... anche quando non guardi.",
        "Puoi mettere in pausa, ma io sono sempre qui.",
        "Anche ora, sto osservando.",
        "Credi che premere pausa ti salvi?"
    ]
};

// === CARD CLASS ===
class Card {
    constructor(name, cost, attack, health, ability = null, emoji = '🃏') {
        this.name = name;
        this.cost = cost;
        this.attack = attack;
        this.health = health;
        this.maxHealth = health;
        this.ability = ability;
        this.emoji = emoji;
        this.id = `card_${Math.random().toString(36).substr(2, 9)}`;
    }

    takeDamage(amount) {
        this.health -= amount;
        return this.health <= 0;
    }

    render() {
        const cardEl = document.createElement('div');
        cardEl.className = 'card';
        cardEl.draggable = true;
        cardEl.dataset.cardId = this.id;
        cardEl.dataset.cardName = this.name;

        cardEl.innerHTML = `
            <div class="card-cost">${this.cost}🜏</div>
            <div class="card-name">${this.name}</div>
            <div class="card-image">${this.emoji}</div>
            <div class="card-stats">
                <div class="stat">
                    <span class="stat-label">ATK</span>
                    <span class="stat-value attack">${this.attack}</span>
                </div>
                <div class="stat">
                    <span class="stat-label">HP</span>
                    <span class="stat-value health">${this.health}</span>
                </div>
            </div>
            ${this.ability ? `<div class="card-ability">${this.ability}</div>` : ''}
        `;

        return cardEl;
    }
}

// === MAIN GAME CLASS ===
class Game {
    constructor() {
        // Game state
        this.playerHealth = 20;
        this.opponentHealth = 20;
        this.playerMaxHealth = 20;
        this.opponentMaxHealth = 20;
        this.playerCurrency = 0;
        this.playerLives = 3;
        this.round = 1;
        this.isPlayerTurn = true;
        this.playerHand = [];
        this.playerField = [null, null, null, null];
        this.opponentField = [null, null, null, null];
        this.sacrificeMode = false;
        this.metaEventCount = 0;
        this.gameStarted = false;
        this.totalCardsPlayed = 0;
        this.totalSacrifices = 0;

        // Card library
        this.cardLibrary = [
            new Card("Ombra Errante", 0, 1, 1, "Evasiva", '👤'),
            new Card("Lupo Maledetto", 1, 2, 2, null, '🐺'),
            new Card("Corvo Profetico", 1, 1, 2, "Pesca 1", '🦅'),
            new Card("Scheletro", 2, 2, 3, null, '💀'),
            new Card("Spettro", 2, 3, 2, "Incorporeo", '👻'),
            new Card("Cultista", 1, 1, 3, "Genera 1🜏", '🕯️'),
            new Card("Bestia Antica", 3, 5, 4, null, '🦴'),
            new Card("Occhio Vigile", 2, 2, 2, "Visione", '👁️'),
            new Card("Marionetta", 0, 0, 2, "2x Sacrificio", '🎭'),
            new Card("Anomalia", 1, 2, 1, "???", '⚠️'),
            new Card("Divoratore", 2, 4, 3, "Sacrificio: +2/+2", '🦷'),
            new Card("Araldo", 1, 1, 4, "Guarigione 2", '🔔'),
            new Card("Sussurro", 0, 1, 1, "Pesca 1", '💬'),
            new Card("Guardiano", 2, 1, 5, "Difensore", '🛡️'),
        ];

        this.init();
    }

    init() {
        this.initializeDOM();
        this.setupStaticCanvas();
        this.showMainMenu();
    }

    initializeDOM() {
        // Get all DOM elements
        this.elements = {
            // Main menu
            mainMenu: document.getElementById('main-menu'),
            startGameBtn: document.getElementById('start-game-btn'),
            continueBtn: document.getElementById('continue-btn'),
            aboutBtn: document.getElementById('about-btn'),
            powerButton: document.getElementById('power-button'),
            aboutModal: document.getElementById('about-modal'),
            closeAboutBtn: document.getElementById('close-about-btn'),

            // Game container
            gameContainer: document.getElementById('game-container'),

            // Pause menu
            pauseMenu: document.getElementById('pause-menu'),
            pauseDialogue: document.getElementById('pause-dialogue'),
            menuToggleBtn: document.getElementById('menu-toggle-btn'),
            resumeBtn: document.getElementById('resume-btn'),
            restartBtn: document.getElementById('restart-btn'),
            quitBtn: document.getElementById('quit-btn'),

            // Game elements
            entityDialogue: document.getElementById('entity-dialogue'),
            playerLivesDisplay: document.getElementById('player-lives-display'),
            soulsDisplay: document.getElementById('souls-display'),
            roundDisplay: document.getElementById('round-display'),
            turnIndicator: document.getElementById('turn-indicator'),

            // Health bars
            playerHealthFill: document.getElementById('player-health-fill'),
            playerHealthText: document.getElementById('player-health-text'),
            opponentHealthFill: document.getElementById('opponent-health-fill'),
            opponentHealthText: document.getElementById('opponent-health-text'),

            // Fields
            playerField: document.getElementById('player-field'),
            opponentField: document.getElementById('opponent-field'),
            playerHand: document.getElementById('player-hand'),

            // Battle log
            logEntries: document.getElementById('log-entries'),

            // Actions
            sacrificeBtn: document.getElementById('sacrifice-btn'),
            drawCardBtn: document.getElementById('draw-card-btn'),
            endTurnBtn: document.getElementById('end-turn-btn'),

            // Tooltip
            cardTooltip: document.getElementById('card-tooltip'),
            tooltipText: document.getElementById('tooltip-text'),

            // Effects
            glitchOverlay: document.getElementById('glitch-overlay')
        };

        // Event listeners
        this.setupEventListeners();
        this.setupDragAndDrop();
    }

    setupEventListeners() {
        // Main menu
        this.elements.startGameBtn.addEventListener('click', () => this.startNewGame());
        this.elements.aboutBtn.addEventListener('click', () => this.showAboutModal());
        this.elements.closeAboutBtn.addEventListener('click', () => this.hideAboutModal());
        this.elements.powerButton.addEventListener('click', () => this.toggleMainMenu());

        // Pause menu
        this.elements.menuToggleBtn.addEventListener('click', () => this.togglePause());
        this.elements.resumeBtn.addEventListener('click', () => this.togglePause());
        this.elements.restartBtn.addEventListener('click', () => this.restartGame());
        this.elements.quitBtn.addEventListener('click', () => this.quitToMenu());

        // Game actions
        this.elements.sacrificeBtn.addEventListener('click', () => this.toggleSacrificeMode());
        this.elements.drawCardBtn.addEventListener('click', () => this.drawCard());
        this.elements.endTurnBtn.addEventListener('click', () => this.endTurn());
    }

    setupStaticCanvas() {
        const canvas = document.getElementById('static-canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Draw static noise
        const drawStatic = () => {
            const imageData = ctx.createImageData(canvas.width, canvas.height);
            for (let i = 0; i < imageData.data.length; i += 4) {
                const value = Math.random() * 255;
                imageData.data[i] = value;
                imageData.data[i + 1] = value;
                imageData.data[i + 2] = value;
                imageData.data[i + 3] = 10; // Low opacity
            }
            ctx.putImageData(imageData, 0, 0);
        };

        setInterval(drawStatic, 100);

        // Resize handler
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    setupDragAndDrop() {
        let draggedCard = null;
        let draggedCardData = null;
        let draggedFromLocation = null;

        document.addEventListener('dragstart', (e) => {
            if (e.target.classList.contains('card')) {
                draggedCard = e.target;
                draggedCardData = {
                    cardId: e.target.dataset.cardId,
                    fromSlot: e.target.parentElement.dataset.slot,
                    fromLocation: e.target.parentElement.id
                };
                draggedFromLocation = e.target.parentElement;
                e.target.classList.add('dragging');

                this.log("📌 Carta selezionata...");
            }
        });

        document.addEventListener('dragend', (e) => {
            if (e.target.classList.contains('card')) {
                e.target.classList.remove('dragging');
                document.querySelectorAll('.card-slot').forEach(slot => {
                    slot.classList.remove('valid-drop');
                });
            }
        });

        document.addEventListener('dragover', (e) => {
            e.preventDefault();
            const slot = e.target.closest('.card-slot');

            if (slot && slot.closest('#player-field')) {
                if (!this.sacrificeMode && !slot.classList.contains('occupied')) {
                    slot.classList.add('valid-drop');
                }
            }
        });

        document.addEventListener('dragleave', (e) => {
            const slot = e.target.closest('.card-slot');
            if (slot) {
                slot.classList.remove('valid-drop');
            }
        });

        document.addEventListener('drop', (e) => {
            e.preventDefault();
            const slot = e.target.closest('.card-slot');

            if (slot && draggedCardData) {
                const slotIndex = parseInt(slot.dataset.slot);

                if (this.sacrificeMode) {
                    // Sacrifice mode: only from player field
                    if (draggedFromLocation.closest('#player-field')) {
                        const fromSlot = parseInt(draggedCardData.fromSlot);
                        this.handleSacrifice(fromSlot);
                    }
                } else {
                    // Play mode: only from hand to empty field slot
                    if (draggedFromLocation.id === 'player-hand' && !this.playerField[slotIndex]) {
                        this.playCardFromHand(draggedCardData.cardId, slotIndex);
                    }
                }
            }

            // Cleanup
            draggedCard = null;
            draggedCardData = null;
            draggedFromLocation = null;
            document.querySelectorAll('.card-slot').forEach(slot => {
                slot.classList.remove('valid-drop');
            });
        });

        // Card hover for Entity dialogue
        document.addEventListener('mouseover', (e) => {
            const card = e.target.closest('.card');
            if (card && card.parentElement.id === 'player-hand') {
                const cardName = card.dataset.cardName;
                this.showTooltip(this.getRandomDialogue('cardHover'));

                // Random entity comment
                if (Math.random() < 0.3) {
                    this.setEntityDialogue(this.getRandomDialogue('cardHover'));
                }
            }
        });

        document.addEventListener('mouseout', (e) => {
            const card = e.target.closest('.card');
            if (card) {
                this.hideTooltip();
            }
        });
    }

    // === MENU FUNCTIONS ===
    showMainMenu() {
        this.elements.mainMenu.classList.remove('hidden');
        this.elements.gameContainer.classList.add('hidden');

        // Check if there's a saved game
        if (localStorage.getItem('savedGame')) {
            this.elements.continueBtn.style.display = 'block';
            this.elements.continueBtn.addEventListener('click', () => this.loadGame(), {once: true});
        }
    }

    toggleMainMenu() {
        if (this.elements.mainMenu.classList.contains('hidden')) {
            this.showMainMenu();
        } else if (this.gameStarted) {
            this.hideMainMenu();
        }
    }

    hideMainMenu() {
        this.elements.mainMenu.classList.add('hidden');
        this.elements.gameContainer.classList.remove('hidden');
    }

    togglePause() {
        if (this.elements.pauseMenu.classList.contains('hidden')) {
            this.elements.pauseMenu.classList.remove('hidden');
            this.elements.pauseDialogue.textContent = this.getRandomDialogue('pause');
        } else {
            this.elements.pauseMenu.classList.add('hidden');
        }
    }

    showAboutModal() {
        this.elements.aboutModal.classList.remove('hidden');
    }

    hideAboutModal() {
        this.elements.aboutModal.classList.add('hidden');
    }

    restartGame() {
        this.togglePause();
        this.resetGame();
        this.startNewGame();
    }

    quitToMenu() {
        this.togglePause();
        this.saveGame();
        this.showMainMenu();
    }

    // === GAME FLOW ===
    startNewGame() {
        this.hideMainMenu();
        this.resetGame();

        this.log("=== Il gioco inizia ===", 'meta');
        this.setEntityDialogue(this.getRandomDialogue('gameStart'));

        // Initial draw
        for (let i = 0; i < 4; i++) {
            this.drawCard(true);
        }

        this.updateUI();
        this.gameStarted = true;

        // Random meta event after a delay
        setTimeout(() => {
            if (Math.random() < 0.5) {
                this.triggerMetaEvent();
            }
        }, 5000);
    }

    resetGame() {
        this.playerHealth = 20;
        this.opponentHealth = 20;
        this.playerCurrency = 0;
        this.playerLives = 3;
        this.round = 1;
        this.isPlayerTurn = true;
        this.playerHand = [];
        this.playerField = [null, null, null, null];
        this.opponentField = [null, null, null, null];
        this.sacrificeMode = false;
        this.metaEventCount = 0;
        this.totalCardsPlayed = 0;
        this.totalSacrifices = 0;
        this.elements.logEntries.innerHTML = '';
    }

    drawCard(free = false) {
        if (!free) {
            if (this.playerCurrency < 1) {
                this.log("Non hai abbastanza anime!", 'damage');
                this.setEntityDialogue("Non puoi permettertelo... patetico.");
                return;
            }
            this.playerCurrency -= 1;
            this.setEntityDialogue(this.getRandomDialogue('draw'));
        }

        const card = this.createRandomCard();
        this.playerHand.push(card);
        this.log(`Hai pescato: ${card.name}`);
        this.updateUI();

        // Random meta event
        if (Math.random() < 0.1) {
            this.triggerMetaEvent();
        }
    }

    createRandomCard() {
        const template = this.cardLibrary[Math.floor(Math.random() * this.cardLibrary.length)];
        return new Card(template.name, template.cost, template.attack, template.health, template.ability, template.emoji);
    }

    playCardFromHand(cardId, slotIndex) {
        if (!this.isPlayerTurn) {
            this.log("Non è il tuo turno!", 'damage');
            return;
        }

        const cardIndex = this.playerHand.findIndex(c => c.id === cardId);
        if (cardIndex === -1) return;

        const card = this.playerHand[cardIndex];

        // Check cost
        if (card.cost > this.playerCurrency) {
            this.log(`Non hai abbastanza anime! Serve: ${card.cost}🜏`, 'damage');
            this.setEntityDialogue("Patetico. Non puoi nemmeno permetterti quella carta.");
            return;
        }

        // Play the card
        this.playerCurrency -= card.cost;
        this.playerHand.splice(cardIndex, 1);
        this.playerField[slotIndex] = card;
        this.totalCardsPlayed++;

        this.log(`✨ Hai giocato: ${card.name}`);
        this.setEntityDialogue(this.getRandomDialogue('cardPlay'));
        this.handleCardAbility(card, 'play');
        this.updateUI();

        // Random glitch on card play
        if (Math.random() < 0.2) {
            this.triggerGlitch();
        }
    }

    toggleSacrificeMode() {
        this.sacrificeMode = !this.sacrificeMode;

        if (this.sacrificeMode) {
            this.elements.sacrificeBtn.textContent = '❌ ANNULLA';
            this.elements.sacrificeBtn.classList.add('active');
            this.log("🗡️ Modalità sacrificio attiva. Trascina una carta dal campo.", 'meta');
            this.setEntityDialogue(this.getRandomDialogue('sacrifice'));

            // Highlight field cards as sacrifice targets
            document.querySelectorAll('#player-field .card').forEach(card => {
                card.classList.add('sacrifice-target');
            });
        } else {
            this.elements.sacrificeBtn.innerHTML = '<span class="btn-icon">🗡️</span><span class="btn-text">SACRIFICA</span>';
            this.elements.sacrificeBtn.classList.remove('active');
            this.log("Modalità sacrificio disattivata.");

            document.querySelectorAll('.card').forEach(card => {
                card.classList.remove('sacrifice-target');
            });
        }
    }

    handleSacrifice(slotIndex) {
        const card = this.playerField[slotIndex];
        if (!card) {
            this.log("Nessuna carta da sacrificare in quello slot!");
            return;
        }

        // Sacrifice the card
        this.playerField[slotIndex] = null;
        this.playerCurrency += 1;
        this.totalSacrifices++;

        this.log(`🩸 Hai sacrificato ${card.name} per 1🜏`, 'damage');
        this.setEntityDialogue(this.getRandomDialogue('sacrifice'));
        this.updateUI();

        // Meta event on sacrifice
        if (Math.random() < 0.4) {
            this.triggerGlitch();
            setTimeout(() => {
                this.setEntityDialogue("Le carte sacrificate... sussurrano il tuo nome...");
            }, 500);
        }

        // Exit sacrifice mode
        this.toggleSacrificeMode();
    }

    handleCardAbility(card, trigger) {
        if (!card.ability) return;

        if (card.ability === "Pesca 1" && trigger === 'play') {
            setTimeout(() => {
                this.drawCard(true);
                this.log(`${card.name}: Peschi 1 carta`, 'heal');
            }, 500);
        } else if (card.ability === "Genera 1🜏" && trigger === 'endTurn') {
            this.playerCurrency += 1;
            this.log(`${card.name}: +1🜏`, 'heal');
        } else if (card.ability === "Guarigione 2" && trigger === 'play') {
            this.playerHealth = Math.min(this.playerHealth + 2, this.playerMaxHealth);
            this.log(`${card.name}: +2 HP!`, 'heal');
        }
    }

    endTurn() {
        if (!this.isPlayerTurn) return;

        this.log("=== Fine del tuo turno ===");
        this.isPlayerTurn = false;
        this.elements.turnIndicator.textContent = "TURNO DELL'ENTITÀ";
        this.setEntityDialogue(this.getRandomDialogue('endTurn'));

        // Trigger end-turn abilities
        this.playerField.forEach(card => {
            if (card) this.handleCardAbility(card, 'endTurn');
        });

        // Combat phase
        setTimeout(() => {
            this.combatPhase();
        }, 1500);
    }

    combatPhase() {
        this.log("⚔️ === COMBATTIMENTO === ⚔️", 'meta');

        // Player attacks
        this.playerField.forEach((card, index) => {
            if (card) {
                const opposingCard = this.opponentField[index];
                if (opposingCard) {
                    // Card vs Card
                    this.log(`${card.name} (${card.attack}) VS ${opposingCard.name} (${opposingCard.health})`);

                    const oppDied = opposingCard.takeDamage(card.attack);
                    const yourDied = card.takeDamage(opposingCard.attack);

                    if (oppDied) {
                        this.log(`⚰️ ${opposingCard.name} distrutto!`, 'damage');
                        this.opponentField[index] = null;
                    }
                    if (yourDied) {
                        this.log(`⚰️ ${card.name} distrutto!`, 'damage');
                        this.playerField[index] = null;
                    }
                } else {
                    // Direct damage
                    this.opponentHealth -= card.attack;
                    this.log(`💥 ${card.name} colpisce L'Entità per ${card.attack}!`, 'damage');
                }
            }
        });

        setTimeout(() => {
            this.updateUI();
            this.checkWinCondition();

            if (this.opponentHealth > 0 && this.playerHealth > 0) {
                setTimeout(() => {
                    this.opponentTurn();
                }, 1500);
            }
        }, 1500);
    }

    opponentTurn() {
        this.log("👁️ === TURNO DELL'ENTITÀ === 👁️", 'meta');
        this.setEntityDialogue("Ora... guarda e impara.");

        // Opponent AI
        const emptySlots = this.opponentField
            .map((card, i) => card === null ? i : -1)
            .filter(i => i !== -1);

        // Play 1-2 cards
        const cardsToPlay = Math.min(Math.floor(Math.random() * 2) + 1, emptySlots.length);

        for (let i = 0; i < cardsToPlay; i++) {
            if (emptySlots.length > 0) {
                const slotIndex = emptySlots.splice(Math.floor(Math.random() * emptySlots.length), 1)[0];
                const card = this.createRandomCard();
                this.opponentField[slotIndex] = card;
                this.log(`👁️ L'Entità gioca: ${card.name}`);
            }
        }

        // Opponent attacks
        setTimeout(() => {
            this.log("⚔️ L'Entità attacca!", 'meta');

            this.opponentField.forEach((card, index) => {
                if (card) {
                    const opposingCard = this.playerField[index];
                    if (opposingCard) {
                        this.log(`${card.name} VS ${opposingCard.name}`);

                        const yourDied = opposingCard.takeDamage(card.attack);
                        const oppDied = card.takeDamage(opposingCard.attack);

                        if (yourDied) {
                            this.log(`⚰️ ${opposingCard.name} distrutto!`, 'damage');
                            this.playerField[index] = null;
                        }
                        if (oppDied) {
                            this.log(`⚰️ ${card.name} distrutto!`);
                            this.opponentField[index] = null;
                        }
                    } else {
                        this.playerHealth -= card.attack;
                        this.log(`💀 ${card.name} ti colpisce per ${card.attack}!`, 'damage');
                    }
                }
            });

            setTimeout(() => {
                this.updateUI();
                this.checkWinCondition();

                if (this.opponentHealth > 0 && this.playerHealth > 0) {
                    this.startNewRound();
                }
            }, 1500);
        }, 1500);
    }

    startNewRound() {
        this.round++;
        this.isPlayerTurn = true;
        this.playerCurrency += 1;

        this.elements.turnIndicator.textContent = "IL TUO TURNO";
        this.log(`\n=== ROUND ${this.round} ===\n`, 'meta');
        this.setEntityDialogue(`Round ${this.round}... ancora resisti?`);

        // Draw card
        this.drawCard(true);

        // Meta events increase with rounds
        if (this.round % 3 === 0 || Math.random() < 0.2) {
            setTimeout(() => {
                this.triggerMetaEvent();
            }, 2000);
        }

        this.updateUI();
    }

    checkWinCondition() {
        // Check low health for dialogue
        if (this.playerHealth <= 5 && this.playerHealth > 0) {
            if (Math.random() < 0.5) {
                this.setEntityDialogue(this.getRandomDialogue('lowHealth'));
            }
        }

        // Check opponent almost dead
        if (this.opponentHealth <= 5 && this.opponentHealth > 0) {
            if (Math.random() < 0.5) {
                this.setEntityDialogue(this.getRandomDialogue('almostWin'));
            }
        }

        // Victory
        if (this.opponentHealth <= 0) {
            setTimeout(() => {
                this.triggerGlitch();
                this.log("🎭 VITTORIA... o forse no?", 'meta');
                this.setEntityDialogue("HAI VINTO. Ma hai davvero vinto?");

                setTimeout(() => {
                    alert(
                        "VITTORIA?\n\n" +
                        "Congratulazioni... suppongo.\n\n" +
                        "Ma dimmi: chi ha davvero giocato questa partita?\n" +
                        "Tu... o io attraverso te?\n\n" +
                        "Le carte ricorderanno."
                    );
                    this.quitToMenu();
                }, 2000);
            }, 1000);
        }

        // Defeat
        if (this.playerHealth <= 0) {
            this.playerLives--;

            if (this.playerLives <= 0) {
                setTimeout(() => {
                    this.triggerGlitch();
                    this.log("☠️ GAME OVER", 'damage');
                    this.setEntityDialogue("Sapevo che sarebbe finita così.");

                    setTimeout(() => {
                        alert(
                            "SCONFITTA\n\n" +
                            "Lo sapevi già come sarebbe finita, vero?\n\n" +
                            "Le carte non dimenticano.\n" +
                            "Io non dimentico.\n\n" +
                            "Gioca ancora?"
                        );
                        this.quitToMenu();
                    }, 2000);
                }, 1000);
            } else {
                this.log(`💔 Hai perso una vita! Vite: ${this.playerLives}`, 'damage');
                this.setEntityDialogue(`${this.playerLives} vite rimaste... per ora.`);
                this.playerHealth = this.playerMaxHealth;
                this.triggerGlitch();
                this.updateUI();
            }
        }
    }

    // === META EVENTS ===
    triggerMetaEvent() {
        this.metaEventCount++;

        const events = [
            () => {
                this.triggerGlitch();
                this.setEntityDialogue("Hai sentito anche tu quel sussurro?");
                this.log("Le carte... parlano?", 'meta');
            },
            () => {
                this.setEntityDialogue(`Ho visto ${this.totalCardsPlayed} carte... tutte perdenti.`);
                this.triggerGlitch();
            },
            () => {
                this.playerCurrency += 2;
                this.log("✨ +2🜏 dal Vuoto", 'meta');
                this.setEntityDialogue("Un regalo. O forse un debito da pagare...");
            },
            () => {
                this.elements.gameContainer.classList.add('shake');
                setTimeout(() => {
                    this.elements.gameContainer.classList.remove('shake');
                }, 500);
                this.setEntityDialogue("Sento il tuo battito cardiaco attraverso lo schermo.");
            },
            () => {
                this.log("Il tempo si distorce...", 'meta');
                this.setEntityDialogue("Hai mai pensato che forse stai giocando la stessa partita all'infinito?");
            },
            () => {
                if (this.totalSacrifices > 0) {
                    this.setEntityDialogue(`${this.totalSacrifices} sacrifici... sento il loro peso su di te.`);
                } else {
                    this.setEntityDialogue("Non hai ancora sacrificato nessuno? Quanto nobile... o codardo?");
                }
            }
        ];

        const event = events[Math.floor(Math.random() * events.length)];
        event();
        this.updateUI();
    }

    triggerGlitch() {
        this.elements.glitchOverlay.classList.add('active');
        setTimeout(() => {
            this.elements.glitchOverlay.classList.remove('active');
        }, 300);
    }

    // === UI FUNCTIONS ===
    setEntityDialogue(text) {
        this.elements.entityDialogue.textContent = text;
    }

    showTooltip(text) {
        this.elements.tooltipText.textContent = text;
        this.elements.cardTooltip.classList.remove('hidden');
    }

    hideTooltip() {
        this.elements.cardTooltip.classList.add('hidden');
    }

    getRandomDialogue(category) {
        const dialogues = EntityDialogues[category];
        return dialogues[Math.floor(Math.random() * dialogues.length)];
    }

    log(message, type = 'normal') {
        const entry = document.createElement('div');
        entry.className = `log-entry ${type}`;
        entry.textContent = message;
        this.elements.logEntries.insertBefore(entry, this.elements.logEntries.firstChild);

        // Keep only last 30 entries
        while (this.elements.logEntries.children.length > 30) {
            this.elements.logEntries.removeChild(this.elements.logEntries.lastChild);
        }
    }

    updateUI() {
        // Update stats
        this.elements.playerLivesDisplay.textContent = this.playerLives;
        this.elements.soulsDisplay.textContent = this.playerCurrency;
        this.elements.roundDisplay.textContent = this.round;

        // Update health bars
        this.updateHealthBar(
            this.elements.playerHealthFill,
            this.elements.playerHealthText,
            this.playerHealth,
            this.playerMaxHealth
        );
        this.updateHealthBar(
            this.elements.opponentHealthFill,
            this.elements.opponentHealthText,
            this.opponentHealth,
            this.opponentMaxHealth
        );

        // Update hand
        this.elements.playerHand.innerHTML = '';
        this.playerHand.forEach(card => {
            this.elements.playerHand.appendChild(card.render());
        });

        // Update fields
        this.updateField(this.elements.playerField, this.playerField);
        this.updateField(this.elements.opponentField, this.opponentField);
    }

    updateHealthBar(fillElement, textElement, current, max) {
        const percentage = Math.max(0, (current / max) * 100);
        fillElement.style.width = `${percentage}%`;
        textElement.textContent = `${Math.max(0, current)}/${max}`;

        if (percentage < 30) {
            fillElement.classList.add('low');
        } else {
            fillElement.classList.remove('low');
        }
    }

    updateField(fieldElement, field) {
        const slots = fieldElement.querySelectorAll('.card-slot');
        slots.forEach((slot, index) => {
            const card = field[index];
            slot.innerHTML = '';
            slot.classList.remove('occupied');

            if (card) {
                slot.classList.add('occupied');
                slot.appendChild(card.render());
            }
        });
    }

    // === SAVE/LOAD ===
    saveGame() {
        const saveData = {
            playerHealth: this.playerHealth,
            opponentHealth: this.opponentHealth,
            playerCurrency: this.playerCurrency,
            playerLives: this.playerLives,
            round: this.round,
            totalCardsPlayed: this.totalCardsPlayed,
            totalSacrifices: this.totalSacrifices
        };
        localStorage.setItem('savedGame', JSON.stringify(saveData));
    }

    loadGame() {
        const savedData = localStorage.getItem('savedGame');
        if (savedData) {
            const data = JSON.parse(savedData);
            this.playerHealth = data.playerHealth;
            this.opponentHealth = data.opponentHealth;
            this.playerCurrency = data.playerCurrency;
            this.playerLives = data.playerLives;
            this.round = data.round;
            this.totalCardsPlayed = data.totalCardsPlayed || 0;
            this.totalSacrifices = data.totalSacrifices || 0;

            this.hideMainMenu();
            this.gameStarted = true;
            this.setEntityDialogue("Ah... sei tornato. Come sapevo che avresti fatto.");
            this.updateUI();
        }
    }
}

// === INITIALIZE GAME ===
let game;
document.addEventListener('DOMContentLoaded', () => {
    game = new Game();
    window.game = game; // For debugging
});
