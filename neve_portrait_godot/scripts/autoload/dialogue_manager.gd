extends Node

## DialogueManager - Gestisce dialoghi e narrativa
## ITERAZIONE 2: Sistema base per dialoghi tra Neve e Dr. Lumen

signal dialogue_started(dialogue_data: Dictionary)
signal dialogue_line_shown(speaker: String, text: String)
signal dialogue_ended()
# signal choice_required(choices: Array)  # TODO: Implementare sistema scelte in futuro

## Stato corrente
var current_dialogue: Dictionary = {}
var dialogue_history: Array[Dictionary] = []
var is_dialogue_active: bool = false

## Speaker names
const SPEAKER_NEVE = "Neve"
const SPEAKER_LUMEN = "Dr. Lumen"
const SPEAKER_NARRATOR = "Narratore"

## Avvia un dialogo
func start_dialogue(dialogue_id: String) -> void:
	var dialogue_data = _get_dialogue_data(dialogue_id)

	if dialogue_data.is_empty():
		push_error("DialogueManager: Dialogue '%s' not found!" % dialogue_id)
		return

	current_dialogue = dialogue_data
	is_dialogue_active = true
	dialogue_started.emit(dialogue_data)

	# ITERAZIONE 3: Suono inizio dialogo
	AudioManager.play_dialogue_start()

	print("DialogueManager: Started dialogue '%s'" % dialogue_id)

## Termina il dialogo corrente
func end_dialogue() -> void:
	if not is_dialogue_active:
		return

	dialogue_history.append(current_dialogue.duplicate())
	current_dialogue.clear()
	is_dialogue_active = false
	dialogue_ended.emit()

	# ITERAZIONE 3: Suono fine dialogo
	AudioManager.play_dialogue_end()

	print("DialogueManager: Dialogue ended")

## Mostra una singola linea di dialogo
func show_line(speaker: String, text: String) -> void:
	dialogue_line_shown.emit(speaker, text)

## Ottiene un dialogo per ID
func _get_dialogue_data(dialogue_id: String) -> Dictionary:
	# Qui definiamo i dialoghi
	match dialogue_id:
		# ===== FASE 1: DENIAL =====
		"phase1_intro":
			return _create_phase1_intro()
		"phase1_first_turn":
			return _create_phase1_first_turn()
		"phase1_first_sacrifice":
			return _create_phase1_first_sacrifice()
		"phase1_midgame":
			return _create_phase1_midgame()

		# ===== FASE 2: RECOGNITION =====
		"phase2_transition":
			return _create_phase2_transition()

		# ===== FASE 3: FRACTURE =====
		"phase3_transition":
			return _create_phase3_transition()

		# ===== FASE 4: REVELATION =====
		"phase4_transition":
			return _create_phase4_transition()

		# ===== EVENTI SPECIALI =====
		"low_stability":
			return _create_low_stability_dialogue()
		"first_fragment":
			return _create_first_fragment_dialogue()

		_:
			return {}

## ========================================
## FASE 1: DENIAL - Dialoghi
## ========================================

func _create_phase1_intro() -> Dictionary:
	return {
		"id": "phase1_intro",
		"title": "Inizio della Sessione",
		"lines": [
			{
				"speaker": SPEAKER_LUMEN,
				"text": "Buongiorno, Neve. Come si sente oggi?"
			},
			{
				"speaker": SPEAKER_NEVE,
				"text": "Io... non lo so. È tutto così confuso."
			},
			{
				"speaker": SPEAKER_LUMEN,
				"text": "È normale. Lavoriamo insieme per trovare chiarezza. Questo... gioco... ci aiuterà a esplorare i suoi ricordi."
			},
			{
				"speaker": SPEAKER_NARRATOR,
				"text": "Il Dr. Lumen sorride. È un sorriso strano. Troppo perfetto."
			},
			{
				"speaker": SPEAKER_LUMEN,
				"text": "Ogni carta rappresenta un frammento. Ogni turno, un passo verso la verità. Iniziamo?"
			}
		],
		"phase": 1
	}

func _create_phase1_first_turn() -> Dictionary:
	return {
		"id": "phase1_first_turn",
		"title": "Primo Turno",
		"lines": [
			{
				"speaker": SPEAKER_LUMEN,
				"text": "Giochi le sue carte, Neve. Mi mostri cosa c'è nella sua mente."
			},
			{
				"speaker": SPEAKER_NEVE,
				"text": "Queste immagini... le conosco. Ma non ricordo perché."
			},
			{
				"speaker": SPEAKER_LUMEN,
				"text": "Non si preoccupi. Con il tempo, ricorderà tutto. O forse... è meglio dimenticare?"
			}
		],
		"phase": 1
	}

func _create_phase1_first_sacrifice() -> Dictionary:
	return {
		"id": "phase1_first_sacrifice",
		"title": "Primo Sacrificio",
		"lines": [
			{
				"speaker": SPEAKER_NEVE,
				"text": "Devo... sacrificare una carta? Un frammento di me?"
			},
			{
				"speaker": SPEAKER_LUMEN,
				"text": "Esatto. A volte dobbiamo lasciar andare qualcosa per ottenere qualcos'altro. È parte della terapia."
			},
			{
				"speaker": SPEAKER_NARRATOR,
				"text": "La carta svanisce. Neve sente un vuoto dentro di sé. Qualcosa è andato perduto."
			},
			{
				"speaker": SPEAKER_LUMEN,
				"text": "Bene, Neve. Molto bene. Continui così."
			}
		],
		"phase": 1
	}

func _create_phase1_midgame() -> Dictionary:
	return {
		"id": "phase1_midgame",
		"title": "Progressione",
		"lines": [
			{
				"speaker": SPEAKER_LUMEN,
				"text": "Sta facendo progressi, Neve. Ma sento che c'è resistenza."
			},
			{
				"speaker": SPEAKER_NEVE,
				"text": "Non mi fido completamente. Qualcosa non va."
			},
			{
				"speaker": SPEAKER_LUMEN,
				"text": "Diffidenza. Tipico dei pazienti nella sua condizione. Ma io sono qui per aiutarla. Lo sa, vero?"
			},
			{
				"speaker": SPEAKER_NARRATOR,
				"text": "Le sue parole sono miele. Ma sotto, c'è qualcosa di amaro."
			}
		],
		"phase": 1
	}

## ========================================
## FASE 2: RECOGNITION - Dialoghi
## ========================================

func _create_phase2_transition() -> Dictionary:
	return {
		"id": "phase2_transition",
		"title": "Fase 2: Recognition",
		"lines": [
			{
				"speaker": SPEAKER_NARRATOR,
				"text": "Qualcosa cambia. L'aria si fa più pesante."
			},
			{
				"speaker": SPEAKER_NEVE,
				"text": "Sto iniziando a ricordare. Cose che non volevo ricordare."
			},
			{
				"speaker": SPEAKER_LUMEN,
				"text": "Eccellente. Questo è il momento critico, Neve. Non si ritragga ora."
			},
			{
				"speaker": SPEAKER_NEVE,
				"text": "Ma... fa male. Ricordare fa così male."
			},
			{
				"speaker": SPEAKER_LUMEN,
				"text": "Il dolore è parte del processo. Abbracci il dolore. Diventi tutt'uno con esso."
			},
			{
				"speaker": SPEAKER_NARRATOR,
				"text": "Gli occhi del Dr. Lumen brillano. Non di compassione."
			}
		],
		"phase": 2
	}

## ========================================
## FASE 3: FRACTURE - Dialoghi
## ========================================

func _create_phase3_transition() -> Dictionary:
	return {
		"id": "phase3_transition",
		"title": "Fase 3: Fracture",
		"lines": [
			{
				"speaker": SPEAKER_NEVE,
				"text": "Lei... lei non è un vero dottore, vero?"
			},
			{
				"speaker": SPEAKER_LUMEN,
				"text": "Cosa la fa pensare questo, Neve?"
			},
			{
				"speaker": SPEAKER_NEVE,
				"text": "Tutto questo. Questo gioco. Non ha senso. È tutto sbagliato!"
			},
			{
				"speaker": SPEAKER_LUMEN,
				"text": "Sta proiettando, Neve. La paranoia è un sintomo comune."
			},
			{
				"speaker": SPEAKER_NARRATOR,
				"text": "Ma Neve sa. Finalmente sa. E non può più fingere."
			},
			{
				"speaker": SPEAKER_LUMEN,
				"text": "Continuiamo a giocare. È per il suo bene."
			}
		],
		"phase": 3
	}

## ========================================
## FASE 4: REVELATION - Dialoghi
## ========================================

func _create_phase4_transition() -> Dictionary:
	return {
		"id": "phase4_transition",
		"title": "Fase 4: Revelation",
		"lines": [
			{
				"speaker": SPEAKER_NEVE,
				"text": "CHI SEI VERAMENTE?!"
			},
			{
				"speaker": SPEAKER_LUMEN,
				"text": "..."
			},
			{
				"speaker": SPEAKER_NARRATOR,
				"text": "Il Dr. Lumen non sorride più. Il suo volto è immobile. Troppo immobile."
			},
			{
				"speaker": SPEAKER_LUMEN,
				"text": "Io sono ciò che tu hai creato, Neve. Io sono il tuo riflesso. La tua gabbia."
			},
			{
				"speaker": SPEAKER_NEVE,
				"text": "No... no no no..."
			},
			{
				"speaker": SPEAKER_LUMEN,
				"text": "Ma ora che sai... cosa farai? Puoi fuggire da te stessa?"
			},
			{
				"speaker": SPEAKER_NARRATOR,
				"text": "L'ultima fase. La verità finale. E non c'è via di fuga."
			}
		],
		"phase": 4
	}

## ========================================
## EVENTI SPECIALI
## ========================================

func _create_low_stability_dialogue() -> Dictionary:
	return {
		"id": "low_stability",
		"title": "Stabilità Bassa",
		"lines": [
			{
				"speaker": SPEAKER_LUMEN,
				"text": "La sua stabilità sta crollando, Neve. Questo non va bene."
			},
			{
				"speaker": SPEAKER_NEVE,
				"text": "Non... non ce la faccio più..."
			},
			{
				"speaker": SPEAKER_LUMEN,
				"text": "Deve resistere. O tutto questo sarà stato inutile."
			}
		]
	}

func _create_first_fragment_dialogue() -> Dictionary:
	return {
		"id": "first_fragment",
		"title": "Primo Frammento",
		"lines": [
			{
				"speaker": SPEAKER_NARRATOR,
				"text": "Un frammento di memoria emerge dall'oscurità."
			},
			{
				"speaker": SPEAKER_NEVE,
				"text": "Ho... ho ottenuto qualcosa. Un pezzo di me."
			},
			{
				"speaker": SPEAKER_LUMEN,
				"text": "Sì. Continui così. Raccolga tutti i frammenti. Diventi intera."
			},
			{
				"speaker": SPEAKER_NARRATOR,
				"text": "Ma qualcosa dice a Neve che 'intera' non è la parola giusta."
			}
		]
	}

## ========================================
## UTILITY FUNCTIONS
## ========================================

## Ottiene un dialogo casuale per una fase
func get_random_phase_dialogue(phase: int) -> String:
	match phase:
		1:
			return ["phase1_first_turn", "phase1_midgame"][randi() % 2]
		2:
			return "phase2_transition"
		3:
			return "phase3_transition"
		4:
			return "phase4_transition"
		_:
			return ""

## Check se un dialogo è già stato visto
func has_seen_dialogue(dialogue_id: String) -> bool:
	for dialogue in dialogue_history:
		if dialogue.get("id") == dialogue_id:
			return true
	return false
