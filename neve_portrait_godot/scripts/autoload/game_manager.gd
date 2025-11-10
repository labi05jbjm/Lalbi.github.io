extends Node

## GameManager - Singleton centrale che gestisce lo stato del gioco
## Accessibile globalmente come GameManager

signal stability_changed(new_value: int)
signal fragments_changed(new_value: int)
signal turn_changed(is_player_turn: bool)
signal phase_changed(new_phase: int)
signal game_over(player_won: bool)

## Game State
var round: int = 1
var stability: int = 100  # HP del giocatore (Dr. Lumen)
var fragments: int = 0     # Frammenti di memoria raccolti
var is_player_turn: bool = true
var current_phase: int = 1  # Fase narrativa (1-4)
var game_started: bool = false

## Cards
var player_hand: Array[Card] = []
var player_field: Array = [null, null, null, null]  # 4 slot
var therapist_field: Array = [null, null, null, null]  # 4 slot

## Narrative tracking
var choice_history: Array[Dictionary] = []
var trust: int = 0
var awareness: int = 0
var meta_awareness: bool = false

## Tutorial
var tutorial_completed: bool = false
var tutorial_active: bool = false

## Session tracking
var session_start_time: int = 0
var cards_played_count: int = 0
var damage_dealt_total: int = 0

const MAX_HAND_SIZE: int = 8
const STARTING_HAND_SIZE: int = 5

func _ready() -> void:
	# Carica preferences dal save
	_load_preferences()
	print("GameManager: Initialized")

## Inizia una nuova partita
func start_new_game() -> void:
	_reset_game_state()
	game_started = true
	session_start_time = Time.get_ticks_msec()

	print("GameManager: New game started")

## Reset dello stato di gioco
func _reset_game_state() -> void:
	round = 1
	stability = 100
	fragments = 0
	is_player_turn = true
	current_phase = 1
	player_hand.clear()
	player_field = [null, null, null, null]
	therapist_field = [null, null, null, null]
	choice_history.clear()
	trust = 0
	awareness = 0
	meta_awareness = false
	cards_played_count = 0
	damage_dealt_total = 0

## Pesca una carta
func draw_card(free_only: bool = false) -> Card:
	if player_hand.size() >= MAX_HAND_SIZE:
		print("GameManager: Hand is full!")
		return null

	var card_data: CardData
	if free_only:
		card_data = CardDatabase.get_random_free_card()
	else:
		card_data = CardDatabase.get_random_player_card()

	if not card_data:
		return null

	# Crea istanza carta (questo dovrà essere fatto dalla scena)
	# Per ora returniamo solo i dati
	print("GameManager: Drew card: %s" % card_data.card_name)
	return null  # Verrà gestito dalla game scene

## Gioca una carta dal giocatore
func play_card(card: Card, slot_index: int) -> bool:
	if not is_player_turn:
		print("GameManager: Not player's turn!")
		return false

	if slot_index < 0 or slot_index >= 4:
		print("GameManager: Invalid slot index!")
		return false

	if player_field[slot_index] != null:
		print("GameManager: Slot already occupied!")
		return false

	# Controlla costo sangue
	if card.card_data.blood_cost > 0:
		var available_sacrifices = _count_cards_on_field(player_field)
		if available_sacrifices < card.card_data.blood_cost:
			print("GameManager: Not enough sacrifices! Need %d, have %d" % [card.card_data.blood_cost, available_sacrifices])
			return false
		# Trigger sacrifice mode (gestito dalla game scene)
		return false  # Aspetta selezione sacrifici

	# Gioca la carta
	player_field[slot_index] = card
	player_hand.erase(card)
	cards_played_count += 1

	# Trigger sigilli ON_PLAY
	_trigger_sigils(card, SigilData.SigilTrigger.ON_PLAY)

	# Effetti speciali per tipo
	if card.card_data.card_type == CardData.CardType.VOCE:
		add_fragments(1)

	print("GameManager: Played card %s to slot %d" % [card.card_data.card_name, slot_index])
	return true

## Termina il turno
func end_turn() -> void:
	if not is_player_turn:
		return

	print("GameManager: Player ending turn...")

	# Fase attacco del giocatore
	_player_attack_phase()

	# Cambia turno
	is_player_turn = false
	turn_changed.emit(false)

	# Turno dell'AI
	await get_tree().create_timer(1.0).timeout
	_ai_turn()

## Fase attacco giocatore
func _player_attack_phase() -> void:
	for i in range(4):
		var attacker = player_field[i]
		if attacker == null:
			continue

		# Trigger sigilli ON_ATTACK
		_trigger_sigils(attacker, SigilData.SigilTrigger.ON_ATTACK)

		# Trova difensore
		var defender = therapist_field[i]
		if defender:
			# Attacco contro carta
			_card_attack_card(attacker, defender)
		else:
			# Attacco diretto
			_direct_damage_to_therapist(attacker.current_attack)

func _card_attack_card(attacker: Card, defender: Card) -> void:
	print("GameManager: %s attacks %s" % [attacker.card_data.card_name, defender.card_data.card_name])

	# Calcola danno
	var damage = attacker.current_attack

	# Applica modificatori sigilli
	# TODO: check per double damage sigil, ecc.

	# Applica danno
	defender.take_damage(damage)
	damage_dealt_total += damage

	# Contrattacco simultaneo
	if defender.current_health > 0:
		attacker.take_damage(defender.current_attack)

func _direct_damage_to_therapist(damage: int) -> void:
	# In questo gioco, l'avversario "vince" riducendo la stabilità del giocatore
	# Quindi qui non fa nulla - il danno diretto non esiste
	# (o potrebbe dare frammenti bonus)
	add_fragments(1)
	print("GameManager: Direct hit! Gained 1 fragment")

## Turno AI
func _ai_turn() -> void:
	print("GameManager: AI turn starting...")

	# AI gioca carte casuali
	var cards_to_play = randi_range(1, 2)
	for i in range(cards_to_play):
		var empty_slots = []
		for slot_i in range(4):
			if therapist_field[slot_i] == null:
				empty_slots.append(slot_i)

		if empty_slots.is_empty():
			break

		var slot = empty_slots[randi() % empty_slots.size()]
		_ai_play_card(slot)

	await get_tree().create_timer(1.0).timeout

	# AI attacca
	_ai_attack_phase()

	await get_tree().create_timer(1.0).timeout

	# Ritorna turno al giocatore
	is_player_turn = true
	round += 1
	turn_changed.emit(true)

	# Pesca carta automaticamente
	draw_card()

func _ai_play_card(slot_index: int) -> void:
	var card_data = CardDatabase.get_random_therapist_card()
	if not card_data:
		return

	# Crea carta AI (gestito dalla scene)
	print("GameManager: AI plays %s to slot %d" % [card_data.card_name, slot_index])
	# therapist_field[slot_index] = card  # Verrà fatto dalla scene

func _ai_attack_phase() -> void:
	for i in range(4):
		var attacker = therapist_field[i]
		if attacker == null:
			continue

		var defender = player_field[i]
		if defender:
			_card_attack_card(attacker, defender)
		else:
			# Danno diretto al giocatore
			lose_stability(attacker.current_attack)

## Modifica stabilità
func lose_stability(amount: int) -> void:
	stability -= amount
	stability_changed.emit(stability)

	if stability <= 0:
		_trigger_game_over(false)

func add_stability(amount: int) -> void:
	stability = mini(stability + amount, 100)
	stability_changed.emit(stability)

## Modifica frammenti
func add_fragments(amount: int) -> void:
	fragments += amount
	fragments_changed.emit(fragments)

	# Check per fase progression
	_check_phase_progression()

## Check progressione fasi
func _check_phase_progression() -> void:
	var new_phase = current_phase

	if fragments >= 50 and current_phase < 4:
		new_phase = 4  # Revelation
	elif fragments >= 30 and current_phase < 3:
		new_phase = 3  # Fracture
	elif fragments >= 15 and current_phase < 2:
		new_phase = 2  # Recognition

	if new_phase != current_phase:
		current_phase = new_phase
		phase_changed.emit(current_phase)
		print("GameManager: Phase changed to %d" % current_phase)

## Game Over
func _trigger_game_over(player_won: bool) -> void:
	game_started = false
	game_over.emit(player_won)
	print("GameManager: Game Over - Player won: %s" % player_won)

## Utilities
func _count_cards_on_field(field: Array) -> int:
	var count = 0
	for card in field:
		if card != null:
			count += 1
	return count

func _trigger_sigils(card: Card, trigger_type: SigilData.SigilTrigger) -> void:
	for sigil in card.card_data.sigils:
		if sigil.trigger == trigger_type:
			_execute_sigil_effect(card, sigil)

func _execute_sigil_effect(card: Card, sigil: SigilData) -> void:
	# TODO: Implementa effetti sigilli specifici
	match sigil.icon:
		"⭐":  # Draw cards
			for i in range(sigil.effect_value):
				draw_card()
		"🌙":  # Heal allies
			for field_card in player_field:
				if field_card and field_card != card:
					field_card.modify_health(sigil.effect_value)
		_:
			print("GameManager: Sigil effect %s not implemented yet" % sigil.icon)

## Save/Load
func _load_preferences() -> void:
	# Carica impostazioni salvate
	tutorial_completed = false  # TODO: load from save file

func save_game() -> void:
	# TODO: Implementa salvataggio
	pass

func load_game() -> void:
	# TODO: Implementa caricamento
	pass
