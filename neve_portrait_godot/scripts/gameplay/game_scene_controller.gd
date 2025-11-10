extends Control

## Controller principale della scena di gioco
## Gestisce la visualizzazione e l'interazione con carte, campi, UI

## Riferimenti scene
const CARD_SCENE = preload("res://scenes/cards/card.tscn")

## Riferimenti UI
@onready var player_field_container = %PlayerField
@onready var therapist_field_container = %TherapistField
@onready var player_hand_container = %PlayerHand
@onready var end_turn_button = %EndTurnButton
@onready var dialogue_box = %DialogueBox
@onready var event_log = %EventLog
@onready var player_stats = %PlayerStats
@onready var turn_info = %TurnInfo

## Card instances
var player_hand_cards: Array[Card] = []
var player_field_cards: Array = [null, null, null, null]
var therapist_field_cards: Array = [null, null, null, null]

## Drag & Drop state
var dragged_card: Card = null
var drag_offset: Vector2 = Vector2.ZERO

func _ready() -> void:
	# Connect signals
	GameManager.stability_changed.connect(_on_stability_changed)
	GameManager.fragments_changed.connect(_on_fragments_changed)
	GameManager.turn_changed.connect(_on_turn_changed)
	GameManager.game_over.connect(_on_game_over)

	end_turn_button.pressed.connect(_on_end_turn_pressed)

	# Start game
	_start_game()

func _start_game() -> void:
	GameManager.start_new_game()

	# Draw starting hand (only free cards)
	for i in range(GameManager.STARTING_HAND_SIZE):
		_draw_card(true)

	_update_ui()

	log_event("La sessione di gioco inizia...")

	# TODO: Start tutorial if not completed
	if not GameManager.tutorial_completed:
		_start_tutorial()

## Draw a card and add to hand
func _draw_card(free_only: bool = false) -> void:
	if player_hand_cards.size() >= GameManager.MAX_HAND_SIZE:
		log_event("Mano piena!")
		return

	# Get card data
	var card_data: CardData
	if free_only:
		card_data = CardDatabase.get_random_free_card()
	else:
		card_data = CardDatabase.get_random_player_card()

	if not card_data:
		return

	# Create card instance
	var card = CARD_SCENE.instantiate()
	player_hand_container.add_child(card)
	card.setup(card_data)

	# Connect card signals
	card.card_clicked.connect(_on_card_clicked)
	card.card_drag_started.connect(_on_card_drag_started)
	card.card_drag_ended.connect(_on_card_drag_ended)

	player_hand_cards.append(card)
	_arrange_hand()

	log_event("Hai pescato: " + card_data.card_name)
	AudioManager.play_card_draw()

## Arrange cards in hand (fan layout)
func _arrange_hand() -> void:
	var card_count = player_hand_cards.size()
	if card_count == 0:
		return

	var hand_width = player_hand_container.size.x
	var card_width = 180
	var total_width = min(card_count * card_width, hand_width - 200)
	var spacing = total_width / max(card_count - 1, 1) if card_count > 1 else 0

	var start_x = (hand_width - total_width) / 2

	for i in range(card_count):
		var card = player_hand_cards[i]
		var target_pos = Vector2(start_x + i * spacing, 0)

		# Animate to position
		var tween = create_tween()
		tween.set_ease(Tween.EASE_OUT)
		tween.set_trans(Tween.TRANS_CUBIC)
		tween.tween_property(card, "position", target_pos, 0.3)

		# Slight rotation for fan effect
		var angle = (i - card_count / 2.0) * 6.0
		card.rotation_degrees = angle

## Card interactions
func _on_card_clicked(card: Card) -> void:
	print("GameSceneController: Card clicked: %s" % card.card_data.card_name)

func _on_card_drag_started(card: Card) -> void:
	dragged_card = card
	drag_offset = card.get_local_mouse_position()
	print("GameSceneController: Dragging: %s" % card.card_data.card_name)

func _on_card_drag_ended(card: Card) -> void:
	if dragged_card != card:
		return

	# Check if dropped on a valid slot
	var drop_slot = _get_slot_under_mouse()
	if drop_slot != -1:
		_try_play_card(card, drop_slot)
	else:
		# Return to hand
		_arrange_hand()

	dragged_card = null

func _process(_delta: float) -> void:
	if dragged_card:
		dragged_card.global_position = get_global_mouse_position() - drag_offset

## Try to play a card
func _try_play_card(card: Card, slot_index: int) -> void:
	# Check if slot is valid and empty
	if player_field_cards[slot_index] != null:
		log_event("Slot già occupato!")
		_arrange_hand()
		return

	# Check blood cost
	if card.card_data.blood_cost > 0:
		var available = _count_cards_on_field(player_field_cards)
		if available < card.card_data.blood_cost:
			log_event("Sacrifici insufficienti! Serve %d, disponibili %d" % [card.card_data.blood_cost, available])
			_arrange_hand()
			return

		# Start sacrifice mode
		_start_sacrifice_mode(card, slot_index)
		return

	# Play card directly
	_play_card_to_field(card, slot_index)

## Play card to field
func _play_card_to_field(card: Card, slot_index: int) -> void:
	# Remove from hand
	player_hand_cards.erase(card)
	card.get_parent().remove_child(card)

	# Add to field
	var slot = player_field_container.get_child(slot_index)
	slot.add_child(card)
	player_field_cards[slot_index] = card

	# Update GameManager state
	GameManager.player_field[slot_index] = card
	GameManager.cards_played_count += 1

	# Animate card
	card.position = Vector2.ZERO
	card.rotation = 0
	card.is_on_field = true

	# Effects
	_trigger_card_play_effects(card)

	log_event("Hai giocato: " + card.card_data.card_name)
	AudioManager.play_card_play()
	_arrange_hand()
	_update_ui()

## Trigger effects when card is played
func _trigger_card_play_effects(card: Card) -> void:
	# Voce cards give fragments
	if card.card_data.card_type == CardData.CardType.VOCE:
		GameManager.add_fragments(1)

	# Sigils
	for sigil in card.card_data.sigils:
		if sigil.trigger == SigilData.SigilTrigger.ON_PLAY:
			_execute_sigil(card, sigil)

## Execute sigil effect
func _execute_sigil(card: Card, sigil: SigilData) -> void:
	match sigil.icon:
		"⭐":  # Draw cards
			log_event("%s ti fa pescare %d carte!" % [card.card_data.card_name, sigil.effect_value])
			for i in range(sigil.effect_value):
				_draw_card()
		"🌙":  # Heal allies
			log_event("%s cura tutte le carte alleate!" % card.card_data.card_name)
			for field_card in player_field_cards:
				if field_card and field_card != card:
					field_card.modify_health(1)
		_:
			print("Sigil %s not implemented" % sigil.icon)

## Sacrifice mode
var sacrifice_mode_active: bool = false
var sacrifice_target_card: Card = null
var sacrifice_target_slot: int = -1
var sacrifices_needed: int = 0
var sacrifices_selected: Array[Card] = []

func _start_sacrifice_mode(card: Card, slot_index: int) -> void:
	sacrifice_mode_active = true
	sacrifice_target_card = card
	sacrifice_target_slot = slot_index
	sacrifices_needed = card.card_data.blood_cost
	sacrifices_selected.clear()

	log_event("Seleziona %d carte da sacrificare..." % sacrifices_needed)

	# TODO: Highlight cards that can be sacrificed

func _select_sacrifice(card: Card) -> void:
	if not sacrifice_mode_active:
		return

	sacrifices_selected.append(card)

	if sacrifices_selected.size() >= sacrifices_needed:
		_complete_sacrifice()

func _complete_sacrifice() -> void:
	# Remove sacrificed cards
	for card in sacrifices_selected:
		var slot_index = player_field_cards.find(card)
		if slot_index != -1:
			player_field_cards[slot_index] = null
			card.die()

	# Play the target card
	_play_card_to_field(sacrifice_target_card, sacrifice_target_slot)

	# Reset sacrifice mode
	sacrifice_mode_active = false
	sacrifice_target_card = null
	sacrifice_target_slot = -1
	sacrifices_selected.clear()

## Get slot under mouse
func _get_slot_under_mouse() -> int:
	var mouse_pos = get_global_mouse_position()

	for i in range(4):
		var slot = player_field_container.get_child(i)
		var rect = Rect2(slot.global_position, slot.size)
		if rect.has_point(mouse_pos):
			return i

	return -1

## Count cards on field
func _count_cards_on_field(field: Array) -> int:
	var count = 0
	for card in field:
		if card != null:
			count += 1
	return count

## End turn
func _on_end_turn_pressed() -> void:
	if not GameManager.is_player_turn:
		return

	end_turn_button.disabled = true
	GameManager.end_turn()

## UI Updates
func _update_ui() -> void:
	# Update stats
	var stability_label = player_stats.get_node("Stability/Value")
	var fragments_label = player_stats.get_node("Fragments/Value")
	stability_label.text = str(GameManager.stability)
	fragments_label.text = str(GameManager.fragments)

	# Update turn info
	var round_label = turn_info.get_node("Round")
	var turn_label = turn_info.get_node("Turn")
	round_label.text = "Round %d" % GameManager.current_round
	turn_label.text = "Your Turn" if GameManager.is_player_turn else "AI Turn"

	# Enable/disable end turn button
	end_turn_button.disabled = not GameManager.is_player_turn

func _on_stability_changed(new_value: int) -> void:
	_update_ui()
	if new_value < 30:
		log_event("[color=red]ATTENZIONE: Stabilità critica![/color]")

func _on_fragments_changed(new_value: int) -> void:
	_update_ui()

func _on_turn_changed(is_player_turn: bool) -> void:
	_update_ui()
	if is_player_turn:
		log_event("--- Il tuo turno ---")
		end_turn_button.disabled = false

		# Draw card
		_draw_card()
	else:
		log_event("--- Turno avversario ---")
		end_turn_button.disabled = true

func _on_game_over(player_won: bool) -> void:
	if player_won:
		log_event("[color=green]VITTORIA! Hai completato la sessione![/color]")
	else:
		log_event("[color=red]GAME OVER - Stabilità esaurita[/color]")

	end_turn_button.disabled = true

## Event log
func log_event(text: String) -> void:
	event_log.append_text(text + "\n")
	print("LOG: " + text)

## Tutorial
func _start_tutorial() -> void:
	# TODO: Implement tutorial system
	pass
