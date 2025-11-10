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

## MIGLIORAMENTO FINALE: Statistiche avanzate
var cards_sacrificed_count: int = 0
var sigils_triggered_count: int = 0
var max_combo: int = 0
var current_combo: int = 0
var perfect_turns: int = 0  # Turni senza subire danno
var cards_drawn_total: int = 0
var highest_damage_single_hit: int = 0

## Difficulty settings
enum Difficulty {
	STORY,    # Facile, focus narrativo
	NORMAL,   # Bilanciato
	HARD,     # Sfida tattica
	NIGHTMARE # Per veterani
}
var current_difficulty: Difficulty = Difficulty.NORMAL

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

	# ITERAZIONE 2: Trigger dialogo introduttivo
	await get_tree().create_timer(0.5).timeout
	DialogueManager.start_dialogue("phase1_intro")

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

	# MIGLIORAMENTO FINALE: Reset statistiche avanzate
	cards_sacrificed_count = 0
	sigils_triggered_count = 0
	max_combo = 0
	current_combo = 0
	perfect_turns = 0
	cards_drawn_total = 0
	highest_damage_single_hit = 0

	# Applica modificatori difficoltà
	_apply_difficulty_modifiers()

## Pesca una carta
func draw_card(free_only: bool = false) -> void:
	if player_hand.size() >= MAX_HAND_SIZE:
		print("GameManager: Hand is full!")
		return

	var card_data: CardData
	if free_only:
		card_data = CardDatabase.get_random_free_card()
	else:
		card_data = CardDatabase.get_random_player_card()

	if not card_data:
		return

	# MIGLIORAMENTO FINALE: Track statistiche
	track_card_drawn()

	# Crea istanza carta (questo dovrà essere fatto dalla scena)
	print("GameManager: Drew card: %s" % card_data.card_name)
	# Verrà gestito dalla game scene tramite segnali o chiamate dirette

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

	# ITERAZIONE 3: Check evasion del difensore
	if _has_sigil(defender, "👻"):  # Evasion
		if randf() < 0.5:  # 50% chance
			print("Evasion: %s dodged the attack!" % defender.card_data.card_name)
			return  # Attacco evitato

	# Calcola danno base
	var damage = attacker.current_attack

	# ITERAZIONE 3: Applica modificatori sigilli
	# Double damage contro VELO
	if _has_sigil(attacker, "💥") and defender.card_data.card_type == CardData.CardType.VELO:
		damage *= 2
		print("Double Damage: %s deals 2x damage to VELO!" % attacker.card_data.card_name)

	# Piercing ignora scudi
	var piercing = _has_sigil(attacker, "🗡️")
	if not piercing and _has_sigil(defender, "🛡️"):
		damage = max(0, damage - 1)
		print("Shield: %s blocked 1 damage" % defender.card_data.card_name)

	# Applica danno
	defender.take_damage(damage)
	damage_dealt_total += damage
	track_damage_dealt(damage)  # MIGLIORAMENTO FINALE

	# ITERAZIONE 3: Thorns - Riflette danno
	if _has_sigil(defender, "🌵") and damage > 0:
		var reflect_damage = 1
		attacker.take_damage(reflect_damage)
		print("Thorns: %s reflected %d damage!" % [defender.card_data.card_name, reflect_damage])

	# Contrattacco simultaneo
	if defender.current_health > 0:
		attacker.take_damage(defender.current_attack)

## Check se una carta ha un sigillo specifico
func _has_sigil(card: Card, sigil_icon: String) -> bool:
	for sigil in card.card_data.sigils:
		if sigil.icon == sigil_icon:
			return true
	return false

func _direct_damage_to_therapist(damage: int) -> void:
	# In questo gioco, l'avversario "vince" riducendo la stabilità del giocatore
	# Quindi qui non fa nulla - il danno diretto non esiste
	# (o potrebbe dare frammenti bonus)
	add_fragments(1)
	print("GameManager: Direct hit! Gained 1 fragment")

## Turno AI - ITERAZIONE 2: Usa AI strategica
func _ai_turn() -> void:
	print("GameManager: AI turn starting...")

	# Crea istanza AI (o usa singleton se preferisci)
	var ai = TherapistAI.new()

	# L'AI pianifica le sue mosse
	var actions = ai.plan_turn(player_field, therapist_field, current_phase)

	# Esegue le azioni pianificate
	for action in actions:
		if action.has("card") and action.has("slot"):
			_ai_play_card_strategic(action["card"], action["slot"])
			await get_tree().create_timer(0.5).timeout

	ai.queue_free()

	await get_tree().create_timer(1.0).timeout

	# AI attacca
	_ai_attack_phase()

	await get_tree().create_timer(1.0).timeout

	# Ritorna turno al giocatore
	is_player_turn = true
	round += 1
	turn_changed.emit(true)

	# MIGLIORAMENTO FINALE: Check evento casuale
	if EventManager.can_trigger_event(round):
		var event = EventManager.trigger_random_event(current_phase, round)
		if not event.is_empty():
			EventManager.apply_event_effect(event)
			# Mostra dialogo evento (gestito dalla UI)

	# Pesca carta automaticamente
	draw_card()

## ITERAZIONE 2: Gioca una carta specifica scelta dall'AI
func _ai_play_card_strategic(card_data: CardData, slot_index: int) -> void:
	if not card_data:
		return

	if slot_index < 0 or slot_index >= 4:
		return

	# Crea carta AI (gestito dalla scene)
	print("GameManager: AI strategically plays %s to slot %d" % [card_data.card_name, slot_index])
	# therapist_field[slot_index] = card  # Verrà fatto dalla scene

## DEPRECATO: Mantieni per retrocompatibilità
func _ai_play_card(slot_index: int) -> void:
	var card_data = CardDatabase.get_random_therapist_card()
	_ai_play_card_strategic(card_data, slot_index)

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

	# ITERAZIONE 2: Trigger dialogo low stability
	if stability <= 30 and stability > 0:
		if not DialogueManager.has_seen_dialogue("low_stability"):
			AudioManager.play_low_stability_warning()  # ITERAZIONE 3
			DialogueManager.start_dialogue("low_stability")

	if stability <= 0:
		AudioManager.play_game_over()  # ITERAZIONE 3
		_trigger_game_over(false)

func add_stability(amount: int) -> void:
	stability = min(stability + amount, 100)
	stability_changed.emit(stability)

## Modifica frammenti
func add_fragments(amount: int) -> void:
	var was_zero = (fragments == 0)

	fragments += amount
	fragments_changed.emit(fragments)

	# ITERAZIONE 3: Suono frammento raccolto
	AudioManager.play_fragment_collected()

	# ITERAZIONE 2: Trigger dialogo primo frammento
	if was_zero and fragments > 0:
		if not DialogueManager.has_seen_dialogue("first_fragment"):
			DialogueManager.start_dialogue("first_fragment")

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

		# ITERAZIONE 3: Suono transizione fase
		AudioManager.play_phase_transition(new_phase)
		AudioManager.play_phase_music(new_phase)

		# ITERAZIONE 2: Trigger dialogo di transizione fase
		_trigger_phase_dialogue(new_phase)

## ITERAZIONE 2: Trigger dialoghi per cambio fase
func _trigger_phase_dialogue(phase: int) -> void:
	match phase:
		2:
			DialogueManager.start_dialogue("phase2_transition")
		3:
			DialogueManager.start_dialogue("phase3_transition")
		4:
			DialogueManager.start_dialogue("phase4_transition")

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
			track_sigil_triggered()  # MIGLIORAMENTO FINALE

## ITERAZIONE 3: Implementazione completa sigilli
func _execute_sigil_effect(card: Card, sigil: SigilData) -> void:
	match sigil.icon:
		# ITERAZIONE 1 - Sigilli base
		"⭐":  # Draw cards
			for i in range(sigil.effect_value):
				draw_card()
			print("Sigil: %s drew %d cards" % [card.card_data.card_name, sigil.effect_value])

		"🌙":  # Heal allies
			var healed_count = 0
			for field_card in player_field:
				if field_card and field_card != card:
					field_card.modify_health(sigil.effect_value)
					healed_count += 1
			print("Sigil: Healed %d allies by %d HP" % [healed_count, sigil.effect_value])

		"💥":  # Double damage (handled in attack calculation)
			print("Sigil: Double damage active on %s" % card.card_data.card_name)

		"🛡️":  # Shield (handled when damaged)
			print("Sigil: Shield active on %s" % card.card_data.card_name)

		"🔗":  # Bond (link two cards - complex, placeholder)
			print("Sigil: Bond effect on %s (not fully implemented)" % card.card_data.card_name)

		# ITERAZIONE 2 - Sigilli avanzati
		"🗡️":  # Piercing (handled in attack calculation)
			print("Sigil: Piercing active on %s" % card.card_data.card_name)

		"🌀":  # Confusion - enemy attacks itself
			_apply_confusion_effect(card)

		"🌵":  # Thorns (handled when damaged)
			print("Sigil: Thorns active on %s" % card.card_data.card_name)

		"💫":  # Absorb (passive - triggers on card death)
			print("Sigil: Absorb active on %s" % card.card_data.card_name)

		"👻":  # Evasion (passive - chance to dodge)
			print("Sigil: Evasion active on %s" % card.card_data.card_name)

		"💤":  # Weaken (passive - reduces enemy attack)
			_apply_weaken_effect(card)

		_:
			print("GameManager: Sigil effect %s not implemented" % sigil.icon)

## Applica effetto confusione
func _apply_confusion_effect(caster: Card) -> void:
	# Trova la carta avversaria corrispondente
	var caster_slot = _find_card_slot(caster, player_field)
	if caster_slot == -1:
		caster_slot = _find_card_slot(caster, therapist_field)

	if caster_slot != -1:
		# Determina il campo opposto
		var enemy_field = therapist_field if caster in player_field else player_field
		var target = enemy_field[caster_slot]

		if target:
			# La carta nemica si danneggia da sola
			var self_damage = target.current_attack
			target.take_damage(self_damage)
			print("Confusion: %s hit itself for %d damage!" % [target.card_data.card_name, self_damage])

## Applica effetto indebolimento
func _apply_weaken_effect(caster: Card) -> void:
	# Determina quale campo indebolire
	var enemy_field = therapist_field if caster in player_field else player_field

	for enemy in enemy_field:
		if enemy and enemy != caster:
			# Riduce temporaneamente l'attacco (gestito con modificatore)
			enemy.current_attack = max(0, enemy.current_attack - 1)
			print("Weaken: %s attack reduced by 1" % enemy.card_data.card_name)

## Trova lo slot di una carta
func _find_card_slot(card: Card, field: Array) -> int:
	for i in range(field.size()):
		if field[i] == card:
			return i
	return -1

## ITERAZIONE 3: Save/Load System
const SAVE_FILE_PATH = "user://neve_portrait_save.json"
const SETTINGS_FILE_PATH = "user://settings.json"

func _load_preferences() -> void:
	# Carica impostazioni
	if FileAccess.file_exists(SETTINGS_FILE_PATH):
		var file = FileAccess.open(SETTINGS_FILE_PATH, FileAccess.READ)
		if file:
			var json_string = file.get_as_text()
			var json = JSON.new()
			var error = json.parse(json_string)
			if error == OK:
				var data = json.data
				tutorial_completed = data.get("tutorial_completed", false)
				AudioManager.set_music_volume(data.get("music_volume", 0.7))
				AudioManager.set_sfx_volume(data.get("sfx_volume", 0.8))
				AudioManager.set_master_volume(data.get("master_volume", 1.0))
				print("GameManager: Settings loaded")
			file.close()

func save_settings() -> void:
	var settings = {
		"tutorial_completed": tutorial_completed,
		"music_volume": AudioManager.music_volume,
		"sfx_volume": AudioManager.sfx_volume,
		"master_volume": AudioManager.master_volume
	}

	var file = FileAccess.open(SETTINGS_FILE_PATH, FileAccess.WRITE)
	if file:
		file.store_string(JSON.stringify(settings))
		file.close()
		print("GameManager: Settings saved")

func save_game() -> void:
	if not game_started:
		return

	var save_data = {
		"version": "1.0",
		"timestamp": Time.get_unix_time_from_system(),
		"round": round,
		"stability": stability,
		"fragments": fragments,
		"current_phase": current_phase,
		"choice_history": choice_history,
		"trust": trust,
		"awareness": awareness,
		"meta_awareness": meta_awareness,
		"cards_played_count": cards_played_count,
		"damage_dealt_total": damage_dealt_total,
		"session_duration": Time.get_ticks_msec() - session_start_time,
		# Note: Non salviamo lo stato del campo (troppo complesso per ora)
	}

	var file = FileAccess.open(SAVE_FILE_PATH, FileAccess.WRITE)
	if file:
		file.store_string(JSON.stringify(save_data))
		file.close()
		print("GameManager: Game saved (Round %d, Phase %d)" % [round, current_phase])
	else:
		push_error("GameManager: Failed to save game!")

func load_game() -> bool:
	if not FileAccess.file_exists(SAVE_FILE_PATH):
		print("GameManager: No save file found")
		return false

	var file = FileAccess.open(SAVE_FILE_PATH, FileAccess.READ)
	if not file:
		push_error("GameManager: Failed to open save file!")
		return false

	var json_string = file.get_as_text()
	file.close()

	var json = JSON.new()
	var error = json.parse(json_string)
	if error != OK:
		push_error("GameManager: Failed to parse save file!")
		return false

	var data = json.data

	# Ripristina stato
	round = data.get("round", 1)
	stability = data.get("stability", 100)
	fragments = data.get("fragments", 0)
	current_phase = data.get("current_phase", 1)
	choice_history = data.get("choice_history", [])
	trust = data.get("trust", 0)
	awareness = data.get("awareness", 0)
	meta_awareness = data.get("meta_awareness", false)
	cards_played_count = data.get("cards_played_count", 0)
	damage_dealt_total = data.get("damage_dealt_total", 0)

	game_started = true
	is_player_turn = true

	# Emetti segnali per aggiornare UI
	stability_changed.emit(stability)
	fragments_changed.emit(fragments)
	phase_changed.emit(current_phase)

	print("GameManager: Game loaded (Round %d, Phase %d)" % [round, current_phase])
	return true

func has_save_file() -> bool:
	return FileAccess.file_exists(SAVE_FILE_PATH)

func delete_save_file() -> void:
	if has_save_file():
		DirAccess.remove_absolute(SAVE_FILE_PATH)
		print("GameManager: Save file deleted")

## MIGLIORAMENTO FINALE: Sistema difficoltà
func set_difficulty(new_difficulty: Difficulty) -> void:
	current_difficulty = new_difficulty
	print("GameManager: Difficulty set to %s" % Difficulty.keys()[new_difficulty])

func _apply_difficulty_modifiers() -> void:
	match current_difficulty:
		Difficulty.STORY:
			stability = 150  # Più HP
			# AI più debole (gestito in TherapistAI)
		Difficulty.NORMAL:
			stability = 100  # Standard
		Difficulty.HARD:
			stability = 75   # Meno HP
			# AI più forte
		Difficulty.NIGHTMARE:
			stability = 50   # Molto meno HP
			fragments = 0
			# AI massima difficoltà

func get_difficulty_multiplier() -> float:
	match current_difficulty:
		Difficulty.STORY:
			return 0.75  # Nemici fanno -25% danno
		Difficulty.NORMAL:
			return 1.0
		Difficulty.HARD:
			return 1.25  # Nemici fanno +25% danno
		Difficulty.NIGHTMARE:
			return 1.5   # Nemici fanno +50% danno
	return 1.0

## Statistiche avanzate - Tracking
func track_card_drawn() -> void:
	cards_drawn_total += 1

func track_sigil_triggered() -> void:
	sigils_triggered_count += 1

func track_sacrifice() -> void:
	cards_sacrificed_count += 1

func track_damage_dealt(damage: int) -> void:
	if damage > highest_damage_single_hit:
		highest_damage_single_hit = damage

func track_combo_hit() -> void:
	current_combo += 1
	if current_combo > max_combo:
		max_combo = current_combo

func break_combo() -> void:
	current_combo = 0

func track_perfect_turn() -> void:
	perfect_turns += 1

## Ottiene statistiche come dizionario
func get_statistics() -> Dictionary:
	return {
		"round": round,
		"stability": stability,
		"fragments": fragments,
		"phase": current_phase,
		"cards_played": cards_played_count,
		"cards_sacrificed": cards_sacrificed_count,
		"cards_drawn": cards_drawn_total,
		"damage_dealt": damage_dealt_total,
		"highest_single_hit": highest_damage_single_hit,
		"sigils_triggered": sigils_triggered_count,
		"max_combo": max_combo,
		"perfect_turns": perfect_turns,
		"session_duration_ms": Time.get_ticks_msec() - session_start_time,
		"difficulty": Difficulty.keys()[current_difficulty]
	}
