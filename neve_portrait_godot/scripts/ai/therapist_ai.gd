class_name TherapistAI
extends Node

## AI strategica per il Dr. Lumen (terapeuta/avversario)
## ITERAZIONE 2: AI che prende decisioni intelligenti invece di random

enum Difficulty {
	EASY,      # Gioca casualmente, poche carte
	NORMAL,    # Strategia base, reagisce al giocatore
	HARD,      # Strategia avanzata, ottimizza posizionamento
	ADAPTIVE   # Si adatta al livello del giocatore
}

var difficulty: Difficulty = Difficulty.NORMAL
var aggression_level: float = 0.5  # 0.0 = difensivo, 1.0 = aggressivo

## Decide quali carte giocare e dove
func plan_turn(player_field: Array, therapist_field: Array, current_phase: int) -> Array[Dictionary]:
	var actions: Array[Dictionary] = []

	# Analizza lo stato del campo
	var threat_level = _evaluate_threat_level(player_field)
	var field_state = _analyze_field(player_field, therapist_field)

	# Adatta strategia in base alla fase narrativa
	_adjust_strategy_by_phase(current_phase)

	# Decide quante carte giocare
	var cards_to_play = _decide_card_count(field_state, threat_level)

	# Per ogni carta da giocare, trova la migliore
	for i in range(cards_to_play):
		var action = _choose_best_action(player_field, therapist_field, field_state)
		if action:
			actions.append(action)

	return actions

## Valuta il livello di minaccia del campo giocatore
func _evaluate_threat_level(player_field: Array) -> float:
	var total_threat: float = 0.0

	for card in player_field:
		if card == null:
			continue

		# Minaccia = attacco + (salute / 2) + bonus sigilli
		var threat = card.current_attack + (card.current_health / 2.0)

		# Sigilli aumentano la minaccia
		for sigil in card.card_data.sigils:
			threat += 0.5

		total_threat += threat

	# Normalizza 0-1
	return clamp(total_threat / 20.0, 0.0, 1.0)

## Analizza lo stato del campo
func _analyze_field(player_field: Array, therapist_field: Array) -> Dictionary:
	return {
		"player_card_count": _count_cards(player_field),
		"therapist_card_count": _count_cards(therapist_field),
		"empty_slots": _get_empty_slots(therapist_field),
		"weakest_player_slot": _find_weakest_slot(player_field),
		"strongest_player_slot": _find_strongest_slot(player_field),
		"exposed_slots": _find_exposed_slots(player_field, therapist_field)
	}

## Adatta strategia in base alla fase narrativa
func _adjust_strategy_by_phase(phase: int) -> void:
	match phase:
		1:  # Denial - Passivo
			aggression_level = 0.3
		2:  # Recognition - Bilanciato
			aggression_level = 0.5
		3:  # Fracture - Aggressivo
			aggression_level = 0.7
		4:  # Revelation - Molto aggressivo
			aggression_level = 0.9

## Decide quante carte giocare
func _decide_card_count(field_state: Dictionary, threat_level: float) -> int:
	var base_count = 1

	match difficulty:
		Difficulty.EASY:
			base_count = 1
		Difficulty.NORMAL:
			base_count = randi_range(1, 2)
		Difficulty.HARD:
			base_count = 2
		Difficulty.ADAPTIVE:
			# Si adatta al giocatore
			if threat_level > 0.7:
				base_count = 2
			else:
				base_count = 1

	# Non giocare se il campo è pieno
	if field_state["empty_slots"].size() == 0:
		return 0

	return mini(base_count, field_state["empty_slots"].size())

## Sceglie la migliore azione da compiere
func _choose_best_action(player_field: Array, therapist_field: Array, field_state: Dictionary) -> Dictionary:
	if field_state["empty_slots"].is_empty():
		return {}

	# Ottiene una carta casuale dal database
	var available_cards = CardDatabase.therapist_cards
	if available_cards.is_empty():
		return {}

	# Sceglie la carta migliore per la situazione
	var best_card = _select_best_card(available_cards, player_field, therapist_field)

	# Sceglie lo slot migliore per questa carta
	var best_slot = _select_best_slot(best_card, player_field, therapist_field, field_state["empty_slots"])

	return {
		"card": best_card,
		"slot": best_slot
	}

## Seleziona la carta migliore da giocare
func _select_best_card(available_cards: Array, player_field: Array, therapist_field: Array) -> CardData:
	# Strategia: bilanciare offensive e difensive
	var threat = _evaluate_threat_level(player_field)

	# Filtra carte per tipo basandosi sulla minaccia
	var preferred_type: CardData.CardType

	if threat > 0.6 and aggression_level < 0.5:
		# Alta minaccia e bassa aggressione = gioca difensivo
		preferred_type = CardData.CardType.VELO
	elif threat < 0.4 and aggression_level > 0.5:
		# Bassa minaccia e alta aggressione = attacca
		preferred_type = CardData.CardType.IMPULSO
	else:
		# Bilanciato
		preferred_type = CardData.CardType.ECO

	# Cerca carte del tipo preferito
	var preferred_cards = available_cards.filter(
		func(card): return card.card_type == preferred_type
	)

	if preferred_cards.is_empty():
		# Se non ci sono carte del tipo preferito, prendi una casuale
		return available_cards[randi() % available_cards.size()].duplicate_data()

	# Ritorna una carta casuale del tipo preferito
	return preferred_cards[randi() % preferred_cards.size()].duplicate_data()

## Seleziona lo slot migliore dove giocare la carta
func _select_best_slot(card: CardData, player_field: Array, therapist_field: Array, empty_slots: Array) -> int:
	if empty_slots.is_empty():
		return -1

	# Strategia posizionamento:
	# 1. Carte difensive vanno contro le minacce più grandi
	# 2. Carte offensive vanno contro slot vuoti (per danno diretto)
	# 3. Carte bilanciate vanno dove serve di più

	var best_slot = empty_slots[0]
	var best_score = -999.0

	for slot in empty_slots:
		var score = _evaluate_slot_score(slot, card, player_field, therapist_field)
		if score > best_score:
			best_score = score
			best_slot = slot

	return best_slot

## Valuta quanto è buono un slot per una carta
func _evaluate_slot_score(slot: int, card: CardData, player_field: Array, therapist_field: Array) -> float:
	var score: float = 0.0

	var opponent_card = player_field[slot]

	if opponent_card == null:
		# Slot vuoto = possibilità di danno diretto
		if card.card_type == CardData.CardType.IMPULSO:
			score += 5.0  # Carte offensive preferiscono slot vuoti
		else:
			score += 2.0
	else:
		# C'è una carta avversaria
		var opponent_power = opponent_card.current_attack + opponent_card.current_health

		if card.card_type == CardData.CardType.VELO:
			# Carte difensive preferiscono bloccare minacce forti
			score += opponent_power
		elif card.card_type == CardData.CardType.IMPULSO:
			# Carte offensive preferiscono uccidere minacce deboli
			if card.attack >= opponent_card.current_health:
				score += 4.0  # Può uccidere
			else:
				score += 1.0
		else:
			# Carte bilanciate valutano in base al matchup
			score += abs(card.attack - opponent_card.current_attack)

	# Preferenza per slot centrali (più flessibili)
	if slot == 1 or slot == 2:
		score += 0.5

	return score

## Utility functions
func _count_cards(field: Array) -> int:
	var count = 0
	for card in field:
		if card != null:
			count += 1
	return count

func _get_empty_slots(field: Array) -> Array[int]:
	var empty: Array[int] = []
	for i in range(field.size()):
		if field[i] == null:
			empty.append(i)
	return empty

func _find_weakest_slot(field: Array) -> int:
	var weakest_slot = -1
	var weakest_power = 999

	for i in range(field.size()):
		if field[i] == null:
			continue
		var power = field[i].current_attack + field[i].current_health
		if power < weakest_power:
			weakest_power = power
			weakest_slot = i

	return weakest_slot

func _find_strongest_slot(field: Array) -> int:
	var strongest_slot = -1
	var strongest_power = -1

	for i in range(field.size()):
		if field[i] == null:
			continue
		var power = field[i].current_attack + field[i].current_health
		if power > strongest_power:
			strongest_power = power
			strongest_slot = i

	return strongest_slot

func _find_exposed_slots(player_field: Array, therapist_field: Array) -> Array[int]:
	var exposed: Array[int] = []

	for i in range(player_field.size()):
		if player_field[i] != null and therapist_field[i] == null:
			exposed.append(i)

	return exposed
