class_name Card
extends Control

## Script per una singola carta giocabile
## Gestisce visualizzazione, animazioni e interazioni

signal card_clicked(card: Card)
signal card_drag_started(card: Card)
signal card_drag_ended(card: Card)
signal card_hovered(card: Card)
signal card_unhovered(card: Card)

## Riferimenti UI (assegnati nella scena)
@onready var card_frame: Panel = $CardFrame
@onready var artwork: TextureRect = $CardFrame/Artwork
@onready var attack_label: Label = $CardFrame/StatsBar/AttackStat/HBox/Value
@onready var health_label: Label = $CardFrame/StatsBar/HealthStat/HBox/Value
@onready var name_label: Label = $CardFrame/NamePlate/VBox/CardName
@onready var artist_label: Label = $CardFrame/NamePlate/VBox/Artist
@onready var blood_cost_container: HBoxContainer = $CardFrame/BloodCost
@onready var sigils_container: HBoxContainer = $CardFrame/Sigils

## Dati della carta
var card_data: CardData
var current_attack: int
var current_health: int
var is_face_down: bool = false
var is_on_field: bool = false
var is_dragging: bool = false
var can_be_played: bool = true

## ID unico per tracking
var card_id: int = 0
static var _next_id: int = 0

func _ready() -> void:
	card_id = _next_id
	_next_id += 1

	# Setup input handling
	mouse_filter = Control.MOUSE_FILTER_STOP

	# Connect mouse events
	gui_input.connect(_on_gui_input)
	mouse_entered.connect(_on_mouse_entered)
	mouse_exited.connect(_on_mouse_exited)

## Inizializza la carta con dati specifici
func setup(data: CardData, face_down: bool = false) -> void:
	card_data = data
	current_attack = data.attack
	current_health = data.health
	is_face_down = face_down

	_update_visual()

## Aggiorna la visualizzazione della carta
func _update_visual() -> void:
	if is_face_down:
		_show_card_back()
		return

	# Nome e artista
	if name_label:
		name_label.text = card_data.card_name
	if artist_label:
		artist_label.text = card_data.artist

	# Stats
	if attack_label:
		attack_label.text = str(current_attack)
	if health_label:
		health_label.text = str(current_health)

	# Blood cost (gocce di sangue)
	if blood_cost_container:
		_update_blood_cost()

	# Sigils
	if sigils_container:
		_update_sigils()

	# Artwork (se hai texture locale, altrimenti usa HTTPRequest per download)
	if artwork and not card_data.artwork_url.is_empty():
		_load_artwork()

	# Colore bordo basato sul tipo
	if card_frame:
		var style = card_frame.get_theme_stylebox("panel").duplicate()
		style.border_color = CardData.get_type_color(card_data.card_type)
		card_frame.add_theme_stylebox_override("panel", style)

## Mostra il retro della carta
func _show_card_back() -> void:
	if name_label:
		name_label.visible = false
	if artist_label:
		artist_label.visible = false
	if attack_label:
		attack_label.text = "?"
	if health_label:
		health_label.text = "?"
	if blood_cost_container:
		blood_cost_container.visible = false
	if sigils_container:
		sigils_container.visible = false

	# TODO: Mostra texture "back" della carta

## Aggiorna le gocce di sangue (costo)
func _update_blood_cost() -> void:
	# Rimuovi gocce esistenti
	for child in blood_cost_container.get_children():
		child.queue_free()

	# Nascondi se costo 0
	if card_data.blood_cost == 0:
		blood_cost_container.visible = false
		return

	blood_cost_container.visible = true

	# Crea gocce
	for i in card_data.blood_cost:
		var drop = Label.new()
		drop.text = "🩸"
		drop.add_theme_font_size_override("font_size", 20)
		blood_cost_container.add_child(drop)

## Aggiorna i sigilli
func _update_sigils() -> void:
	# Rimuovi sigilli esistenti
	for child in sigils_container.get_children():
		child.queue_free()

	# Nascondi se nessun sigillo
	if card_data.sigils.is_empty():
		sigils_container.visible = false
		return

	sigils_container.visible = true

	# Crea sigilli
	for sigil in card_data.sigils:
		var sigil_icon = Label.new()
		sigil_icon.text = sigil.icon
		sigil_icon.add_theme_font_size_override("font_size", 13)
		sigil_icon.tooltip_text = sigil.description
		sigils_container.add_child(sigil_icon)

## Carica artwork da URL (versione semplice)
func _load_artwork() -> void:
	# Per ora usiamo un placeholder
	# In produzione useresti HTTPRequest per scaricare l'immagine
	# o avresti le texture già importate nel progetto
	pass

## Gestione input
func _on_gui_input(event: InputEvent) -> void:
	if event is InputEventMouseButton:
		if event.button_index == MOUSE_BUTTON_LEFT:
			if event.pressed:
				card_clicked.emit(self)
				if can_be_played and not is_on_field:
					_start_drag()
			else:
				if is_dragging:
					_end_drag()

func _on_mouse_entered() -> void:
	if not is_dragging:
		card_hovered.emit(self)
		_play_hover_animation()

func _on_mouse_exited() -> void:
	if not is_dragging:
		card_unhovered.emit(self)
		_play_unhover_animation()

## Drag & Drop
func _start_drag() -> void:
	is_dragging = true
	card_drag_started.emit(self)
	modulate.a = 0.7  # Semi-trasparente durante il drag

func _end_drag() -> void:
	is_dragging = false
	card_drag_ended.emit(self)
	modulate.a = 1.0

## Animazioni
func _play_hover_animation() -> void:
	var tween = create_tween()
	tween.set_ease(Tween.EASE_OUT)
	tween.set_trans(Tween.TRANS_CUBIC)
	tween.tween_property(self, "position:y", position.y - 40, 0.3)
	tween.parallel().tween_property(self, "scale", Vector2(1.08, 1.08), 0.3)

func _play_unhover_animation() -> void:
	var tween = create_tween()
	tween.set_ease(Tween.EASE_OUT)
	tween.set_trans(Tween.TRANS_CUBIC)
	tween.tween_property(self, "position:y", position.y + 40, 0.3)
	tween.parallel().tween_property(self, "scale", Vector2.ONE, 0.3)

## Animazione quando giocata
func play_card_animation(target_position: Vector2) -> void:
	var tween = create_tween()
	tween.set_ease(Tween.EASE_IN_OUT)
	tween.set_trans(Tween.TRANS_CUBIC)
	tween.tween_property(self, "global_position", target_position, 0.5)
	tween.parallel().tween_property(self, "rotation", 0.0, 0.3)
	await tween.finished
	is_on_field = true

## Applica danno alla carta
func take_damage(amount: int) -> void:
	current_health -= amount
	if health_label:
		health_label.text = str(current_health)

	# Animazione shake
	_play_damage_animation()

	if current_health <= 0:
		die()

## Animazione danno
func _play_damage_animation() -> void:
	var tween = create_tween()
	tween.tween_property(self, "modulate", Color.RED, 0.1)
	tween.tween_property(self, "modulate", Color.WHITE, 0.1)

## Carta muore
func die() -> void:
	# Animazione morte
	var tween = create_tween()
	tween.set_ease(Tween.EASE_IN)
	tween.tween_property(self, "modulate:a", 0.0, 0.5)
	tween.parallel().tween_property(self, "scale", Vector2(0.5, 0.5), 0.5)
	await tween.finished
	queue_free()

## Modifica attack
func modify_attack(amount: int) -> void:
	current_attack += amount
	if attack_label:
		attack_label.text = str(current_attack)

## Modifica health
func modify_health(amount: int) -> void:
	current_health += amount
	if health_label:
		health_label.text = str(current_health)
