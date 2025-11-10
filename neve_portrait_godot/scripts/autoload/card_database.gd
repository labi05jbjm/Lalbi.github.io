extends Node

## Database centralizzato di tutte le carte disponibili nel gioco
## Autoload singleton accessibile globalmente come CardDatabase

var player_cards: Array[CardData] = []
var therapist_cards: Array[CardData] = []

func _ready() -> void:
	_initialize_player_cards()
	_initialize_therapist_cards()
	print("CardDatabase: Loaded %d player cards, %d therapist cards" % [player_cards.size(), therapist_cards.size()])

## Inizializza le carte del giocatore (porte da HTML)
func _initialize_player_cards() -> void:
	# LOW COST CARDS (0 blood)
	player_cards.append(_create_ophelia())
	player_cards.append(_create_girl_with_pearl())
	player_cards.append(_create_starry_night())
	player_cards.append(_create_christinas_world())

	# MEDIUM COST CARDS (1 blood)
	player_cards.append(_create_the_scream())
	player_cards.append(_create_the_kiss())
	player_cards.append(_create_nighthawks())
	player_cards.append(_create_persistence_of_memory())

## Inizializza le carte del terapeuta/avversario
func _initialize_therapist_cards() -> void:
	# ITERAZIONE 1: Carte base
	therapist_cards.append(_create_therapist_logic())
	therapist_cards.append(_create_therapist_analysis())
	therapist_cards.append(_create_therapist_diagnosis())

	# ITERAZIONE 2: Carte avanzate
	therapist_cards.append(_create_therapist_invalidation())
	therapist_cards.append(_create_therapist_gaslighting())
	therapist_cards.append(_create_therapist_projection())
	therapist_cards.append(_create_therapist_repression())
	therapist_cards.append(_create_therapist_transference())
	therapist_cards.append(_create_therapist_dissociation())
	therapist_cards.append(_create_therapist_sedation())

## Ottiene una carta casuale per il giocatore
func get_random_player_card() -> CardData:
	if player_cards.is_empty():
		push_error("CardDatabase: No player cards available!")
		return null
	return player_cards[randi() % player_cards.size()].duplicate_data()

## Ottiene una carta casuale a costo 0 (per tutorial/inizio)
func get_random_free_card() -> CardData:
	var free_cards = player_cards.filter(func(card): return card.blood_cost == 0)
	if free_cards.is_empty():
		return get_random_player_card()
	return free_cards[randi() % free_cards.size()].duplicate_data()

## Ottiene una carta casuale per il terapeuta
func get_random_therapist_card() -> CardData:
	if therapist_cards.is_empty():
		push_error("CardDatabase: No therapist cards available!")
		return null
	return therapist_cards[randi() % therapist_cards.size()].duplicate_data()

## ========================================
## PLAYER CARDS DEFINITIONS
## ========================================

func _create_ophelia() -> CardData:
	var card = CardData.new()
	card.card_name = "Ophelia"
	card.card_type = CardData.CardType.ECO
	card.attack = 1
	card.health = 2
	card.blood_cost = 0
	card.artwork_url = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/John_Everett_Millais_-_Ophelia_-_Google_Art_Project.jpg/1024px-John_Everett_Millais_-_Ophelia_-_Google_Art_Project.jpg"
	card.artist = "Millais, 1851"
	card.short_desc = "Voce bambina"
	card.long_desc = "Una giovane figura galleggia tra i fiori, cantando canzoni dimenticate. I suoi occhi cercano qualcosa che non può più vedere. La voce di chi era prima della frattura."
	return card

func _create_girl_with_pearl() -> CardData:
	var card = CardData.new()
	card.card_name = "Ragazza con l'Orecchino"
	card.card_type = CardData.CardType.VELO
	card.attack = 1
	card.health = 3
	card.blood_cost = 0
	card.artwork_url = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/800px-1665_Girl_with_a_Pearl_Earring.jpg"
	card.artist = "Vermeer, 1665"
	card.short_desc = "Innocenza velata"
	card.long_desc = "Lo sguardo penetra oltre la superficie. Cosa nasconde dietro quegli occhi? Un segreto, una domanda, un'identità non ancora frammentata."
	card.sigils = [SigilData.create_shield_sigil()]
	return card

func _create_starry_night() -> CardData:
	var card = CardData.new()
	card.card_name = "Notte Stellata"
	card.card_type = CardData.CardType.IMPULSO
	card.attack = 2
	card.health = 1
	card.blood_cost = 0
	card.artwork_url = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1024px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg"
	card.artist = "Van Gogh, 1889"
	card.short_desc = "Vortice mentale"
	card.long_desc = "Il cielo gira su se stesso, le stelle danzano in spirali impossibili. La realtà si piega, si torce, diventa altro. È questo che vede Neve quando chiude gli occhi?"
	return card

func _create_christinas_world() -> CardData:
	var card = CardData.new()
	card.card_name = "Christina's World"
	card.card_type = CardData.CardType.ECO
	card.attack = 1
	card.health = 4
	card.blood_cost = 0
	card.artwork_url = "https://upload.wikimedia.org/wikipedia/en/a/a2/Christinasworld.jpg"
	card.artist = "Wyeth, 1948"
	card.short_desc = "Isolamento"
	card.long_desc = "Una figura sola in un campo infinito. La casa è lontana, irraggiungibile. Trascinare il proprio corpo verso qualcosa che non si può mai toccare."
	return card

func _create_the_scream() -> CardData:
	var card = CardData.new()
	card.card_name = "L'Urlo"
	card.card_type = CardData.CardType.IMPULSO
	card.attack = 3
	card.health = 2
	card.blood_cost = 1
	card.artwork_url = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg/800px-Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg"
	card.artist = "Munch, 1893"
	card.short_desc = "Angoscia pura"
	card.long_desc = "Il grido silenzioso che nessuno sente. Le mani sul volto, la bocca aperta, il mondo che si distorce intorno. L'eco dell'urlo che Neve non può esprimere."
	card.sigils = [SigilData.create_double_damage_sigil()]
	return card

func _create_the_kiss() -> CardData:
	var card = CardData.new()
	card.card_name = "Il Bacio"
	card.card_type = CardData.CardType.VELO
	card.attack = 2
	card.health = 4
	card.blood_cost = 1
	card.artwork_url = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Gustav_Klimt_016.jpg/800px-Gustav_Klimt_016.jpg"
	card.artist = "Klimt, 1908"
	card.short_desc = "Connessione perduta"
	card.long_desc = "Due figure si fondono, si abbracciano, diventano una. Ma Neve ricorda cosa significa essere connessa a se stessa? O è solo un sogno dorato di unità?"
	card.sigils = [SigilData.create_bond_sigil()]
	return card

func _create_nighthawks() -> CardData:
	var card = CardData.new()
	card.card_name = "Nighthawks"
	card.card_type = CardData.CardType.ECO
	card.attack = 2
	card.health = 3
	card.blood_cost = 1
	card.artwork_url = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Nighthawks_by_Edward_Hopper_1942.jpg/1024px-Nighthawks_by_Edward_Hopper_1942.jpg"
	card.artist = "Hopper, 1942"
	card.short_desc = "Solitudine notturna"
	card.long_desc = "Persone sole insieme. Ognuna nella propria bolla di vetro, separate dalla luce al neon. La terapia è così? Neve e il dottore, soli insieme nella notte?"
	return card

func _create_persistence_of_memory() -> CardData:
	var card = CardData.new()
	card.card_name = "La Persistenza della Memoria"
	card.card_type = CardData.CardType.IMPULSO
	card.attack = 4
	card.health = 1
	card.blood_cost = 1
	card.artwork_url = "https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg"
	card.artist = "Dalí, 1931"
	card.short_desc = "Tempo distorto"
	card.long_desc = "Gli orologi si sciolgono, il tempo perde significato. I ricordi si piegano e si fondono. Quanto tempo è passato davvero nella stanza della terapia?"
	return card

## ========================================
## THERAPIST CARDS DEFINITIONS
## ========================================

func _create_therapist_logic() -> CardData:
	var card = CardData.new()
	card.card_name = "Logica Clinica"
	card.card_type = CardData.CardType.VELO
	card.attack = 2
	card.health = 3
	card.blood_cost = 0
	card.short_desc = "Razionalità fredda"
	card.long_desc = "Le argomentazioni del Dr. Lumen sono perfette, inattaccabili. Ma c'è qualcosa di innaturale nella loro precisione."
	return card

func _create_therapist_analysis() -> CardData:
	var card = CardData.new()
	card.card_name = "Analisi Profonda"
	card.card_type = CardData.CardType.IMPULSO
	card.attack = 3
	card.health = 2
	card.blood_cost = 0
	card.short_desc = "Dissezionamento psicologico"
	card.long_desc = "Ogni parola è un bisturi che taglia, seziona, analizza. Neve si sente esposta, vulnerabile sotto lo sguardo clinico."
	return card

func _create_therapist_diagnosis() -> CardData:
	var card = CardData.new()
	card.card_name = "Diagnosi"
	card.card_type = CardData.CardType.ECO
	card.attack = 1
	card.health = 4
	card.blood_cost = 0
	card.short_desc = "Etichettare la sofferenza"
	card.long_desc = "Una parola, un'etichetta, una categoria. Il dolore di Neve ridotto a codici diagnostici."
	return card

## ========================================
## THERAPIST CARDS - ITERAZIONE 2
## ========================================

func _create_therapist_invalidation() -> CardData:
	var card = CardData.new()
	card.card_name = "Invalidazione"
	card.card_type = CardData.CardType.IMPULSO
	card.attack = 3
	card.health = 2
	card.blood_cost = 0
	card.short_desc = "Negare la realtà"
	card.long_desc = "\"Non è come pensi tu, Neve.\" Le sue esperienze, i suoi ricordi, le sue emozioni... tutto messo in dubbio. Cancellato."
	card.sigils = [SigilData.create_piercing_sigil()]
	return card

func _create_therapist_gaslighting() -> CardData:
	var card = CardData.new()
	card.card_name = "Gaslighting"
	card.card_type = CardData.CardType.VOCE
	card.attack = 2
	card.health = 3
	card.blood_cost = 0
	card.short_desc = "Distorcere la verità"
	card.long_desc = "\"Sei sicura che sia andata così?\" La realtà si piega, si torce. Forse Neve ricorda male. Forse è sempre stata confusa."
	card.sigils = [SigilData.create_confusion_sigil()]
	return card

func _create_therapist_projection() -> CardData:
	var card = CardData.new()
	card.card_name = "Proiezione"
	card.card_type = CardData.CardType.VELO
	card.attack = 1
	card.health = 4
	card.blood_cost = 0
	card.short_desc = "Riflettere il dolore"
	card.long_desc = "Il Dr. Lumen proietta le sue ombre su Neve. I suoi problemi diventano i problemi di lei. Lo specchio si rompe."
	card.sigils = [SigilData.create_thorns_sigil()]
	return card

func _create_therapist_repression() -> CardData:
	var card = CardData.new()
	card.card_name = "Repressione"
	card.card_type = CardData.CardType.VELO
	card.attack = 0
	card.health = 5
	card.blood_cost = 0
	card.short_desc = "Seppellire il trauma"
	card.long_desc = "\"Non pensarci. Seppelliscilo. Dimentica.\" Ma ciò che è sepolto non muore. Cresce nell'oscurità."
	card.sigils = [SigilData.create_shield_sigil()]
	return card

func _create_therapist_transference() -> CardData:
	var card = CardData.new()
	card.card_name = "Transfert"
	card.card_type = CardData.CardType.IMPULSO
	card.attack = 2
	card.health = 2
	card.blood_cost = 0
	card.short_desc = "Assorbire l'identità"
	card.long_desc = "Il terapeuta diventa padre, madre, amico, nemico. Neve proietta tutto su di lui. E lui assorbe ogni frammento."
	card.sigils = [SigilData.create_absorb_sigil()]
	return card

func _create_therapist_dissociation() -> CardData:
	var card = CardData.new()
	card.card_name = "Dissociazione Clinica"
	card.card_type = CardData.CardType.VOCE
	card.attack = 2
	card.health = 2
	card.blood_cost = 0
	card.short_desc = "Distacco emotivo"
	card.long_desc = "Il Dr. Lumen osserva dalla distanza. Freddo. Distaccato. Neve è un caso, un file, un numero. Non una persona."
	card.sigils = [SigilData.create_evasion_sigil()]
	return card

func _create_therapist_sedation() -> CardData:
	var card = CardData.new()
	card.card_name = "Sedazione"
	card.card_type = CardData.CardType.ECO
	card.attack = 1
	card.health = 3
	card.blood_cost = 0
	card.short_desc = "Spegnere le emozioni"
	card.long_desc = "Pillole colorate in bottigliette bianche. \"Prendile, ti faranno sentire meglio.\" Ma Neve si sente solo... vuota."
	card.sigils = [SigilData.create_weaken_sigil()]
	return card
