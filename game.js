// ==========================================
// META-NARRATIVE CARD GAME
// "Chi sta veramente giocando?"
// ==========================================

class Card {
    constructor(name, cost, attack, health, ability = null, emoji = '🃏') {
        this.name = name;
        this.cost = cost;
        this.attack = attack;
        this.health = health;
        this.maxHealth = health;
        this.ability = ability;
        this.emoji = emoji;
        this.id = Math.random().toString(36).substr(2, 9);
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

class Game {
    constructor() {
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
        this.sacrificeTarget = null;
        this.metaEventCount = 0;
        this.gameStarted = false;

        // Metanarrative messages
        this.metaMessages = [
            "Benvenuto... o dovrei dire bentornato?",
            "Le carte ricordano ogni partita precedente...",
            "Hai mai pensato che forse sei tu il NPC?",
            "Il tavolo da gioco non è un luogo sicuro",
            "Ogni carta sacrificata lascia un'eco",
            "L'Entità sa il tuo nome... anzi, tutti i tuoi nomi",
            "Questo gioco è stato giocato prima. Molte volte.",
            "Le regole cambiano quando nessuno guarda",
            "Hai notato che le tue carte ti osservano?",
            "Salvare il gioco? Ma il gioco ha già salvato te."
        ];

        this.cardLibrary = this.initializeCardLibrary();
        this.initializeDOM();
        this.startGame();
    }

    initializeCardLibrary() {
        return [
            new Card("Ombra Errante", 0, 1, 1, "Evasiva", '👤'),
            new Card("Lupo Maledetto", 1, 2, 2, null, '🐺'),
            new Card("Corvo Profetico", 1, 1, 2, "Pesca 1 carta", '🦅'),
            new Card("Scheletro", 2, 2, 3, null, '💀'),
            new Card("Spettro", 2, 3, 2, "Incorporeo", '👻'),
            new Card("Cultista", 1, 1, 3, "Genera 1🜏", '🕯️'),
            new Card("Bestia Antica", 3, 5, 4, null, '🦴'),
            new Card("Occhio del Vuoto", 2, 2, 2, "Visione", '👁️'),
            new Card("Marionetta", 0, 0, 2, "Può essere sacrificata 2 volte", '🎭'),
            new Card("Anomalia", 1, 2, 1, "???", '⚠️'),
            new Card("Divoratore", 2, 4, 3, "Sacrificio: +2/+2", '🦷'),
            new Card("Araldo", 1, 1, 4, "Guarigione 2", '🔔'),
        ];
    }

    initializeDOM() {
        // Get all necessary DOM elements
        this.elements = {
            playerHealth: document.getElementById('player-health'),
            opponentHealth: document.getElementById('opponent-health'),
            playerLives: document.getElementById('player-lives'),
            playerCurrency: document.getElementById('player-currency'),
            roundCounter: document.getElementById('round-counter'),
            turnIndicator: document.getElementById('turn-indicator'),
            playerField: document.getElementById('player-field'),
            opponentField: document.getElementById('opponent-field'),
            playerHand: document.getElementById('player-hand'),
            battleLog: document.getElementById('battle-log'),
            metaMessage: document.getElementById('meta-message'),
            endTurnBtn: document.getElementById('end-turn-btn'),
            sacrificeModeBtn: document.getElementById('sacrifice-mode-btn'),
            drawCardBtn: document.getElementById('draw-card-btn'),
            glitchOverlay: document.getElementById('glitch-overlay'),
            metaModal: document.getElementById('meta-modal'),
            modalText: document.getElementById('modal-text'),
            modalContinue: document.getElementById('modal-continue')
        };

        // Event listeners
        this.elements.endTurnBtn.addEventListener('click', () => this.endTurn());
        this.elements.sacrificeModeBtn.addEventListener('click', () => this.toggleSacrificeMode());
        this.elements.drawCardBtn.addEventListener('click', () => this.drawCard());
        this.elements.modalContinue.addEventListener('click', () => this.closeModal());

        // Drag and drop for cards
        this.setupDragAndDrop();
    }

    setupDragAndDrop() {
        let draggedCard = null;
        let draggedFrom = null;

        document.addEventListener('dragstart', (e) => {
            if (e.target.classList.contains('card')) {
                draggedCard = e.target;
                draggedFrom = draggedCard.parentElement;
                e.target.classList.add('dragging');
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
            if (slot && slot.parentElement.id === 'player-field') {
                slot.classList.add('valid-drop');
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

            if (slot && slot.parentElement.id === 'player-field' && draggedCard) {
                const slotIndex = parseInt(slot.dataset.slot);

                if (this.sacrificeMode) {
                    // Sacrifice card from field
                    if (draggedFrom.id === 'player-field') {
                        const fromSlot = parseInt(draggedFrom.dataset.slot);
                        this.handleSacrifice(fromSlot);
                    }
                } else {
                    // Play card from hand
                    if (draggedFrom.id === 'player-hand') {
                        const cardId = draggedCard.dataset.cardId;
                        this.playCardFromHand(cardId, slotIndex);
                    }
                }
            }

            draggedCard = null;
            draggedFrom = null;
        });
    }

    startGame() {
        this.log("Il gioco inizia... o forse continua?", 'meta');

        // Initial draw
        for (let i = 0; i < 4; i++) {
            this.drawCard(true);
        }

        this.updateUI();
        this.showMetaMessage(this.metaMessages[0]);

        setTimeout(() => {
            this.showModal("Sei pronto a giocare?<br><br>O forse... il gioco è pronto a giocare con te?");
        }, 1000);

        this.gameStarted = true;
    }

    drawCard(free = false) {
        if (!free) {
            if (this.playerCurrency < 1) {
                this.log("Non hai abbastanza anime per pescare!", 'damage');
                return;
            }
            this.playerCurrency -= 1;
        }

        // Random card from library
        const card = this.createRandomCard();
        this.playerHand.push(card);
        this.updateUI();
        this.log(`Hai pescato: ${card.name}`);

        // Random meta event
        if (Math.random() < 0.15) {
            this.triggerMetaEvent();
        }
    }

    createRandomCard() {
        const template = this.cardLibrary[Math.floor(Math.random() * this.cardLibrary.length)];
        return new Card(template.name, template.cost, template.attack, template.health, template.ability, template.emoji);
    }

    playCardFromHand(cardId, slotIndex) {
        if (!this.isPlayerTurn) {
            this.log("Non è il tuo turno... o lo è?", 'meta');
            return;
        }

        if (this.playerField[slotIndex] !== null) {
            this.log("Quella posizione è già occupata!");
            return;
        }

        const cardIndex = this.playerHand.findIndex(c => c.id === cardId);
        if (cardIndex === -1) return;

        const card = this.playerHand[cardIndex];

        // Check cost
        if (card.cost > this.playerCurrency) {
            this.log(`Non hai abbastanza anime! Serve: ${card.cost}🜏`, 'damage');
            return;
        }

        // Play the card
        this.playerCurrency -= card.cost;
        this.playerHand.splice(cardIndex, 1);
        this.playerField[slotIndex] = card;

        this.log(`Hai giocato: ${card.name}`);
        this.handleCardAbility(card, 'play');
        this.updateUI();
    }

    handleCardAbility(card, trigger) {
        if (!card.ability) return;

        if (card.ability === "Pesca 1 carta" && trigger === 'play') {
            setTimeout(() => {
                this.drawCard(true);
                this.log(`${card.name} ti fa pescare una carta!`);
            }, 500);
        } else if (card.ability === "Genera 1🜏" && trigger === 'endTurn') {
            this.playerCurrency += 1;
            this.log(`${card.name} genera 1🜏`);
        } else if (card.ability === "Guarigione 2" && trigger === 'play') {
            this.playerHealth = Math.min(this.playerHealth + 2, this.playerMaxHealth);
            this.log(`${card.name} ti guarisce per 2 HP!`);
        }
    }

    toggleSacrificeMode() {
        this.sacrificeMode = !this.sacrificeMode;
        this.elements.sacrificeModeBtn.textContent = this.sacrificeMode ? 'Annulla Sacrificio' : 'Modalità Sacrificio';

        document.querySelectorAll('.card').forEach(card => {
            card.classList.toggle('sacrifice-target', this.sacrificeMode);
        });

        if (this.sacrificeMode) {
            this.log("Seleziona una carta da sacrificare...", 'meta');
        }
    }

    handleSacrifice(slotIndex) {
        const card = this.playerField[slotIndex];
        if (!card) return;

        this.playerCurrency += 1;
        this.playerField[slotIndex] = null;
        this.log(`Hai sacrificato ${card.name} per 1🜏`, 'damage');
        this.updateUI();

        // Meta event
        if (Math.random() < 0.3) {
            this.showMetaMessage("Le carte sacrificate non dimenticano...");
            this.triggerGlitch();
        }

        this.toggleSacrificeMode();
    }

    endTurn() {
        if (!this.isPlayerTurn) return;

        this.log("=== Fine del tuo turno ===");
        this.isPlayerTurn = false;
        this.elements.turnIndicator.textContent = "Turno dell'Entità";

        // Player field abilities
        this.playerField.forEach(card => {
            if (card) {
                this.handleCardAbility(card, 'endTurn');
            }
        });

        // Combat phase
        setTimeout(() => {
            this.combatPhase();
        }, 1000);
    }

    combatPhase() {
        this.log("=== Fase di Combattimento ===");

        // Player attacks
        this.playerField.forEach((card, index) => {
            if (card) {
                const opposingCard = this.opponentField[index];
                if (opposingCard) {
                    // Card vs Card
                    this.log(`${card.name} (${card.attack}) attacca ${opposingCard.name} (${opposingCard.health})`);
                    const cardDied = opposingCard.takeDamage(card.attack);
                    const yourCardDied = card.takeDamage(opposingCard.attack);

                    if (cardDied) {
                        this.log(`${opposingCard.name} è stato distrutto!`, 'damage');
                        this.opponentField[index] = null;
                    }
                    if (yourCardDied) {
                        this.log(`${card.name} è stato distrutto!`, 'damage');
                        this.playerField[index] = null;
                    }
                } else {
                    // Direct damage
                    this.opponentHealth -= card.attack;
                    this.log(`${card.name} colpisce direttamente per ${card.attack} danni!`, 'damage');
                }
            }
        });

        setTimeout(() => {
            this.updateUI();
            this.checkWinCondition();

            // Opponent turn
            if (this.opponentHealth > 0 && this.playerHealth > 0) {
                setTimeout(() => {
                    this.opponentTurn();
                }, 1500);
            }
        }, 1500);
    }

    opponentTurn() {
        this.log("=== Turno dell'Entità ===", 'meta');

        // Opponent plays cards (AI)
        const emptySlots = this.opponentField.map((card, i) => card === null ? i : -1).filter(i => i !== -1);

        if (emptySlots.length > 0 && Math.random() < 0.7) {
            const slot = emptySlots[Math.floor(Math.random() * emptySlots.length)];
            const card = this.createRandomCard();
            this.opponentField[slot] = card;
            this.log(`L'Entità gioca: ${card.name}`);
        }

        // Opponent attacks
        setTimeout(() => {
            this.opponentField.forEach((card, index) => {
                if (card) {
                    const opposingCard = this.playerField[index];
                    if (opposingCard) {
                        this.log(`${card.name} attacca ${opposingCard.name}`);
                        const yourCardDied = opposingCard.takeDamage(card.attack);
                        const opponentCardDied = card.takeDamage(opposingCard.attack);

                        if (yourCardDied) {
                            this.log(`${opposingCard.name} è stato distrutto!`, 'damage');
                            this.playerField[index] = null;
                        }
                        if (opponentCardDied) {
                            this.log(`${card.name} è stato distrutto!`);
                            this.opponentField[index] = null;
                        }
                    } else {
                        this.playerHealth -= card.attack;
                        this.log(`${card.name} ti colpisce per ${card.attack} danni!`, 'damage');
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
        }, 1000);
    }

    startNewRound() {
        this.round++;
        this.isPlayerTurn = true;
        this.playerCurrency += 1;
        this.elements.turnIndicator.textContent = "Il tuo turno";
        this.elements.roundCounter.textContent = `Round ${this.round}`;
        this.log(`=== Round ${this.round} ===`);

        // Draw a card
        this.drawCard(true);

        // Meta events get more frequent
        if (this.round % 3 === 0) {
            this.triggerMetaEvent();
        }

        this.updateUI();
    }

    checkWinCondition() {
        if (this.opponentHealth <= 0) {
            this.log("Hai vinto... o almeno così sembra.", 'meta');
            setTimeout(() => {
                this.showModal(
                    "VITTORIA?<br><br>" +
                    "Sei sicuro di aver vinto?<br>" +
                    "O forse hai solo completato il tutorial dell'Entità?<br><br>" +
                    "<i>Il gioco si ricarica...</i>"
                );
                setTimeout(() => location.reload(), 5000);
            }, 1000);
        } else if (this.playerHealth <= 0) {
            this.playerLives--;
            if (this.playerLives <= 0) {
                this.log("Game Over... per ora.", 'damage');
                setTimeout(() => {
                    this.showModal(
                        "SEI MORTO<br><br>" +
                        "Ma la morte è solo un altro stato del gioco.<br>" +
                        "Le carte ricorderanno.<br><br>" +
                        "<i>Il gioco si ricarica...</i>"
                    );
                    setTimeout(() => location.reload(), 5000);
                }, 1000);
            } else {
                this.log(`Hai perso una vita! Vite rimaste: ${this.playerLives}`, 'damage');
                this.playerHealth = this.playerMaxHealth;
                this.updateUI();
            }
        }
    }

    triggerMetaEvent() {
        this.metaEventCount++;
        const events = [
            () => {
                this.triggerGlitch();
                this.showMetaMessage("Hai sentito anche tu quel rumore?");
            },
            () => {
                this.showMetaMessage("Le carte si stanno... muovendo?");
                document.querySelectorAll('.card').forEach(card => {
                    card.classList.add('floating');
                });
            },
            () => {
                const msg = this.metaMessages[Math.floor(Math.random() * this.metaMessages.length)];
                this.showModal(msg);
            },
            () => {
                this.playerCurrency += 2;
                this.log("Hai ricevuto 2🜏 dal vuoto...", 'meta');
                this.showMetaMessage("Un dono. O forse un debito?");
            },
            () => {
                this.elements.playerHealth.classList.add('shake');
                setTimeout(() => {
                    this.elements.playerHealth.classList.remove('shake');
                }, 500);
                this.showMetaMessage("L'Entità conosce la tua posizione.");
            }
        ];

        const event = events[Math.floor(Math.random() * events.length)];
        event();
    }

    triggerGlitch() {
        this.elements.glitchOverlay.classList.add('active');
        setTimeout(() => {
            this.elements.glitchOverlay.classList.remove('active');
        }, 300);
    }

    showMetaMessage(message) {
        this.elements.metaMessage.textContent = message;
        setTimeout(() => {
            this.elements.metaMessage.textContent = "";
        }, 5000);
    }

    showModal(html) {
        this.elements.modalText.innerHTML = html;
        this.elements.metaModal.classList.remove('hidden');
    }

    closeModal() {
        this.elements.metaModal.classList.add('hidden');
    }

    log(message, type = 'normal') {
        const entry = document.createElement('div');
        entry.className = `log-entry ${type}`;
        entry.textContent = message;
        this.elements.battleLog.insertBefore(entry, this.elements.battleLog.firstChild);

        // Keep only last 20 entries
        while (this.elements.battleLog.children.length > 20) {
            this.elements.battleLog.removeChild(this.elements.battleLog.lastChild);
        }
    }

    updateUI() {
        // Update health bars
        this.updateHealthBar(this.elements.playerHealth, this.playerHealth, this.playerMaxHealth);
        this.updateHealthBar(this.elements.opponentHealth, this.opponentHealth, this.opponentMaxHealth);

        // Update stats
        this.elements.playerLives.textContent = `❤️ Vite: ${this.playerLives}`;
        this.elements.playerCurrency.textContent = `🜏 Anime: ${this.playerCurrency}`;

        // Update hand
        this.elements.playerHand.innerHTML = '';
        this.playerHand.forEach(card => {
            this.elements.playerHand.appendChild(card.render());
        });

        // Update fields
        this.updateField(this.elements.playerField, this.playerField);
        this.updateField(this.elements.opponentField, this.opponentField);
    }

    updateHealthBar(element, current, max) {
        const percentage = (current / max) * 100;
        const fill = element.querySelector('.health-fill');
        const text = element.querySelector('.health-text');

        fill.style.width = `${Math.max(0, percentage)}%`;
        text.textContent = `${Math.max(0, current)} / ${max}`;

        if (percentage < 30) {
            fill.classList.add('low');
        } else {
            fill.classList.remove('low');
        }
    }

    updateField(fieldElement, field) {
        const slots = fieldElement.querySelectorAll('.card-slot');
        slots.forEach((slot, index) => {
            const card = field[index];
            slot.innerHTML = '';

            if (card) {
                slot.classList.add('occupied');
                slot.appendChild(card.render());
            } else {
                slot.classList.remove('occupied');
            }
        });
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    window.game = game; // For debugging
});
