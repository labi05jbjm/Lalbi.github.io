class_name CardData
extends Resource

## Rappresenta i dati template di una carta
## Usato come base per creare istanze di carte durante il gioco

enum CardType {
	ECO,      # Carta eco - frammenti di memoria
	VELO,     # Carta velo - protezioni/difese
	IMPULSO,  # Carta impulso - attacchi potenti
	VOCE      # Carta voce - abilità speciali
}

## Dati Carta Base
@export var card_name: String = ""
@export var card_type: CardType = CardType.ECO
@export var attack: int = 1
@export var health: int = 1
@export var blood_cost: int = 0  # Numero di sacrifici richiesti

## Arte e Presentazione
@export var artwork_url: String = ""
@export var artist: String = ""
@export var short_desc: String = ""
@export_multiline var long_desc: String = ""

## Abilità (Sigils)
@export var sigils: Array[SigilData] = []

## Metodo helper per creare una copia dei dati
func duplicate_data() -> CardData:
	var new_data = CardData.new()
	new_data.card_name = card_name
	new_data.card_type = card_type
	new_data.attack = attack
	new_data.health = health
	new_data.blood_cost = blood_cost
	new_data.artwork_url = artwork_url
	new_data.artist = artist
	new_data.short_desc = short_desc
	new_data.long_desc = long_desc
	new_data.sigils = sigils.duplicate()
	return new_data

## Converte il tipo in stringa per UI
static func type_to_string(type: CardType) -> String:
	match type:
		CardType.ECO: return "eco"
		CardType.VELO: return "velo"
		CardType.IMPULSO: return "impulso"
		CardType.VOCE: return "voce"
		_: return "unknown"

## Ritorna il colore associato al tipo
static func get_type_color(type: CardType) -> Color:
	match type:
		CardType.ECO: return Color("5a8aa4")       # Blu freddo
		CardType.VELO: return Color("8a7a9a")      # Viola whisper
		CardType.IMPULSO: return Color("c85a54")   # Rosso impulso
		CardType.VOCE: return Color("4a9ab4")      # Cyan voce
		_: return Color.WHITE
