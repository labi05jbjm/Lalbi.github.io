extends CanvasLayer

## DialogueBox UI - Visualizza i dialoghi a schermo
## ITERAZIONE 2: Sistema base per mostrare dialoghi narrativi

@onready var dialogue_panel: Panel = $DialoguePanel
@onready var speaker_label: Label = $DialoguePanel/VBox/SpeakerLabel
@onready var text_label: RichTextLabel = $DialoguePanel/VBox/TextLabel
@onready var continue_button: Button = $DialoguePanel/VBox/ContinueButton

var current_dialogue: Dictionary = {}
var current_line_index: int = 0
var is_visible: bool = false

func _ready() -> void:
	# Connetti ai segnali del DialogueManager
	DialogueManager.dialogue_started.connect(_on_dialogue_started)
	DialogueManager.dialogue_ended.connect(_on_dialogue_ended)

	# Setup UI
	dialogue_panel.visible = false
	continue_button.pressed.connect(_on_continue_pressed)

	print("DialogueBox: Ready")

## Callback quando inizia un dialogo
func _on_dialogue_started(dialogue_data: Dictionary) -> void:
	current_dialogue = dialogue_data
	current_line_index = 0
	is_visible = true

	dialogue_panel.visible = true
	_show_current_line()

	print("DialogueBox: Showing dialogue '%s'" % dialogue_data.get("id", "unknown"))

## Callback quando termina un dialogo
func _on_dialogue_ended() -> void:
	is_visible = false
	dialogue_panel.visible = false
	current_dialogue.clear()
	current_line_index = 0

	print("DialogueBox: Dialogue ended")

## Mostra la linea corrente
func _show_current_line() -> void:
	if not current_dialogue.has("lines"):
		return

	var lines = current_dialogue["lines"]
	if current_line_index >= lines.size():
		# Finito il dialogo
		_end_dialogue()
		return

	var line = lines[current_line_index]
	var speaker = line.get("speaker", "???")
	var text = line.get("text", "")

	# Aggiorna UI
	speaker_label.text = speaker
	text_label.text = text

	# Colora speaker in base a chi parla
	speaker_label.modulate = _get_speaker_color(speaker)

	# Mostra pulsante continua
	if current_line_index < lines.size() - 1:
		continue_button.text = "Continua..."
	else:
		continue_button.text = "Chiudi"

	# Emetti segnale
	DialogueManager.show_line(speaker, text)

## Quando si clicca continua
func _on_continue_pressed() -> void:
	current_line_index += 1

	if current_line_index >= current_dialogue["lines"].size():
		_end_dialogue()
	else:
		_show_current_line()

## Termina il dialogo
func _end_dialogue() -> void:
	DialogueManager.end_dialogue()

## Ottiene colore per speaker
func _get_speaker_color(speaker: String) -> Color:
	match speaker:
		DialogueManager.SPEAKER_NEVE:
			return Color(0.6, 0.8, 1.0)  # Azzurro chiaro
		DialogueManager.SPEAKER_LUMEN:
			return Color(1.0, 0.85, 0.6)  # Oro pallido
		DialogueManager.SPEAKER_NARRATOR:
			return Color(0.7, 0.7, 0.7)  # Grigio
		_:
			return Color.WHITE

## Input handling - Spacebar per continuare
func _unhandled_input(event: InputEvent) -> void:
	if not is_visible:
		return

	if event.is_action_pressed("ui_accept") or event.is_action_pressed("ui_select"):
		_on_continue_pressed()
		get_viewport().set_input_as_handled()
