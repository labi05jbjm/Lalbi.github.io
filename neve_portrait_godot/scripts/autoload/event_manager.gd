extends Node

## EventManager - Gestisce eventi casuali durante il gameplay
## MIGLIORAMENTO FINALE: Aggiunge varietà e rigiocabilità

signal event_triggered(event_data: Dictionary)

## Tipi di eventi
enum EventType {
	NARRATIVE,    # Eventi narrativi puri
	MECHANIC,     # Eventi che modificano le meccaniche
	BONUS,        # Eventi positivi per il giocatore
	CHALLENGE     # Eventi negativi/sfida
}

var events_triggered: Array[String] = []
var last_event_round: int = 0
const MIN_ROUNDS_BETWEEN_EVENTS = 3

func _ready() -> void:
	print("EventManager: Initialized")

## Controlla se può triggerare un evento casuale
func can_trigger_event(current_round: int) -> bool:
	# Non durante i primi 2 round
	if current_round < 3:
		return false

	# Non se l'ultimo evento è troppo recente
	if current_round - last_event_round < MIN_ROUNDS_BETWEEN_EVENTS:
		return false

	# 25% probabilità ogni round
	return randf() < 0.25

## Triggera un evento casuale
func trigger_random_event(phase: int, current_round: int) -> Dictionary:
	var available_events = _get_available_events(phase)

	if available_events.is_empty():
		return {}

	var event = available_events[randi() % available_events.size()]
	events_triggered.append(event.id)
	last_event_round = current_round

	event_triggered.emit(event)
	print("EventManager: Triggered event '%s'" % event.id)

	return event

## Ottiene eventi disponibili per la fase corrente
func _get_available_events(phase: int) -> Array[Dictionary]:
	var all_events = _get_all_events()
	var available: Array[Dictionary] = []

	for event in all_events:
		# Skip eventi già triggerati (se sono one-time)
		if event.get("one_time", false) and event.id in events_triggered:
			continue

		# Check se l'evento è disponibile in questa fase
		if event.phases.is_empty() or phase in event.phases:
			available.append(event)

	return available

## Database di tutti gli eventi
func _get_all_events() -> Array[Dictionary]:
	return [
		# EVENTI FASE 1 (DENIAL)
		{
			"id": "memory_flash",
			"title": "Flash di Memoria",
			"type": EventType.NARRATIVE,
			"phases": [1, 2],
			"description": "Un ricordo improvviso attraversa la mente di Neve. Confuso, frammentato, ma reale.",
			"effect": {"fragments": 2},
			"dialogue": [
				{"speaker": "Neve", "text": "Ho visto... qualcosa. Un volto? Un luogo?"},
				{"speaker": "Dr. Lumen", "text": "Interessante. Continui a esplorare quel ricordo."}
			]
		},
		{
			"id": "medication_offer",
			"title": "Offerta di Medicinali",
			"type": EventType.CHALLENGE,
			"phases": [1, 2],
			"description": "Il Dr. Lumen offre a Neve delle pillole per 'aiutarla a concentrarsi'.",
			"effect": {"stability": -5, "choice": true},
			"dialogue": [
				{"speaker": "Dr. Lumen", "text": "Prenda queste. La aiuteranno a vedere più chiaramente."},
				{"speaker": "Neve", "text": "Io... non so se dovrei..."}
			]
		},
		{
			"id": "clock_stops",
			"title": "L'Orologio si Ferma",
			"type": EventType.NARRATIVE,
			"phases": [1, 2, 3],
			"description": "L'orologio sulla parete si ferma. Quanto tempo è passato davvero?",
			"effect": {},
			"one_time": true,
			"dialogue": [
				{"speaker": "Narrator", "text": "Tic. Toc. Silenzio."},
				{"speaker": "Neve", "text": "L'orologio... si è fermato?"},
				{"speaker": "Dr. Lumen", "text": "Il tempo qui è... relativo, Neve."}
			]
		},

		# EVENTI FASE 2 (RECOGNITION)
		{
			"id": "buried_trauma",
			"title": "Trauma Sepolto",
			"type": EventType.CHALLENGE,
			"phases": [2, 3],
			"description": "Un ricordo doloroso emerge dall'oscurità. Neve deve affrontarlo.",
			"effect": {"stability": -10, "fragments": 3},
			"dialogue": [
				{"speaker": "Neve", "text": "No... non voglio ricordare questo!"},
				{"speaker": "Dr. Lumen", "text": "Deve affrontarlo, Neve. È l'unico modo."}
			]
		},
		{
			"id": "mirror_crack",
			"title": "Lo Specchio si Rompe",
			"type": EventType.NARRATIVE,
			"phases": [2, 3],
			"description": "Uno specchio nella stanza si rompe spontaneamente. Neve vede infinite versioni di se stessa.",
			"effect": {"awareness": 1},
			"one_time": true,
			"dialogue": [
				{"speaker": "Narrator", "text": "Il vetro si frantuma in mille pezzi."},
				{"speaker": "Neve", "text": "Quante... quante Neve ci sono?"}
			]
		},

		# EVENTI FASE 3 (FRACTURE)
		{
			"id": "reality_glitch",
			"title": "Glitch della Realtà",
			"type": EventType.MECHANIC,
			"phases": [3, 4],
			"description": "La realtà si distorce. Le regole del gioco cambiano temporaneamente.",
			"effect": {"mechanic_change": "all_cards_cost_0"},
			"dialogue": [
				{"speaker": "Narrator", "text": "Qualcosa non va. La realtà si piega."},
				{"speaker": "Neve", "text": "Cosa sta succedendo?!"}
			]
		},
		{
			"id": "lumen_reveals",
			"title": "Il Dr. Lumen Scivola",
			"type": EventType.NARRATIVE,
			"phases": [3],
			"description": "Il Dr. Lumen dice qualcosa che non dovrebbe sapere. Neve se ne accorge.",
			"effect": {"trust": -2, "awareness": 1},
			"one_time": true,
			"dialogue": [
				{"speaker": "Dr. Lumen", "text": "Come quella volta al parco, quando..."},
				{"speaker": "Neve", "text": "Aspetti. Io non le ho mai parlato di quel parco."},
				{"speaker": "Dr. Lumen", "text": "...deve essermi sfuggito. Continui pure."}
			]
		},

		# EVENTI FASE 4 (REVELATION)
		{
			"id": "final_truth",
			"title": "Verità Finale",
			"type": EventType.BONUS,
			"phases": [4],
			"description": "Neve comprende finalmente la verità. Ottiene potere.",
			"effect": {"stability": 15, "fragments": 5},
			"one_time": true,
			"dialogue": [
				{"speaker": "Neve", "text": "Ora capisco. Tutto questo tempo..."},
				{"speaker": "Dr. Lumen", "text": "Sì. Finalmente vede."}
			]
		},
		{
			"id": "breaking_free",
			"title": "Tentativo di Fuga",
			"type": EventType.CHALLENGE,
			"phases": [4],
			"description": "Neve cerca di fuggire dalla stanza. Ma è possibile fuggire dalla propria mente?",
			"effect": {"stability": -15, "choice": true},
			"dialogue": [
				{"speaker": "Neve", "text": "Devo uscire di qui!"},
				{"speaker": "Dr. Lumen", "text": "Non c'è uscita, Neve. Non da questo luogo."}
			]
		},

		# EVENTI BONUS (TUTTE LE FASI)
		{
			"id": "sudden_clarity",
			"title": "Momento di Chiarezza",
			"type": EventType.BONUS,
			"phases": [],  # Disponibile sempre
			"description": "Un momento di lucidità attraversa Neve. Tutto è più chiaro.",
			"effect": {"stability": 5, "fragments": 1},
			"dialogue": [
				{"speaker": "Neve", "text": "Per un attimo... ho visto tutto chiaramente."}
			]
		},
		{
			"id": "whispers",
			"title": "Sussurri",
			"type": EventType.NARRATIVE,
			"phases": [],
			"description": "Neve sente sussurri. Voci che non dovrebbero esserci.",
			"effect": {"awareness": 1},
			"dialogue": [
				{"speaker": "Narrator", "text": "Voci. Tante voci. O forse è solo una?"},
				{"speaker": "Neve", "text": "Chi... chi sta parlando?"}
			]
		}
	]

## Applica l'effetto di un evento
func apply_event_effect(event: Dictionary) -> void:
	if event.is_empty():
		return

	var effect = event.get("effect", {})

	if effect.has("stability"):
		GameManager.add_stability(effect.stability) if effect.stability > 0 else GameManager.lose_stability(abs(effect.stability))

	if effect.has("fragments"):
		GameManager.add_fragments(effect.fragments)

	if effect.has("trust"):
		GameManager.trust += effect.trust

	if effect.has("awareness"):
		GameManager.awareness += effect.awareness

	print("EventManager: Applied effect: %s" % str(effect))

## Ottiene un evento specifico per ID
func get_event_by_id(event_id: String) -> Dictionary:
	for event in _get_all_events():
		if event.id == event_id:
			return event
	return {}
