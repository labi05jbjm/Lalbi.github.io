extends Node

## AudioManager - Gestisce tutti i suoni e la musica del gioco
## Autoload singleton accessibile come AudioManager

var music_player: AudioStreamPlayer
var sfx_player: AudioStreamPlayer
var ambient_player: AudioStreamPlayer

var music_volume: float = 0.7
var sfx_volume: float = 0.8
var master_volume: float = 1.0

func _ready() -> void:
	# Crea audio players
	music_player = AudioStreamPlayer.new()
	music_player.bus = "Music"
	add_child(music_player)

	sfx_player = AudioStreamPlayer.new()
	sfx_player.bus = "SFX"
	add_child(sfx_player)

	ambient_player = AudioStreamPlayer.new()
	ambient_player.bus = "Ambient"
	add_child(ambient_player)

	print("AudioManager: Initialized")

## Inizializza audio (chiamato dopo interazione utente)
func init() -> void:
	print("AudioManager: Audio system initialized")
	# TODO: Carica impostazioni volume salvate
	_apply_volume_settings()

## Applica impostazioni volume
func _apply_volume_settings() -> void:
	AudioServer.set_bus_volume_db(AudioServer.get_bus_index("Master"), linear_to_db(master_volume))
	AudioServer.set_bus_volume_db(AudioServer.get_bus_index("Music"), linear_to_db(music_volume))
	AudioServer.set_bus_volume_db(AudioServer.get_bus_index("SFX"), linear_to_db(sfx_volume))

## Musica
func play_music(stream: AudioStream, fade_in: float = 1.0) -> void:
	if music_player.stream == stream and music_player.playing:
		return

	if music_player.playing:
		stop_music(fade_in)
		await get_tree().create_timer(fade_in).timeout

	music_player.stream = stream
	music_player.volume_db = -80
	music_player.play()

	# Fade in
	var tween = create_tween()
	tween.tween_property(music_player, "volume_db", 0, fade_in)

func stop_music(fade_out: float = 1.0) -> void:
	if not music_player.playing:
		return

	var tween = create_tween()
	tween.tween_property(music_player, "volume_db", -80, fade_out)
	await tween.finished
	music_player.stop()

## SFX
func play_sfx(stream: AudioStream, volume_db: float = 0.0) -> void:
	sfx_player.stream = stream
	sfx_player.volume_db = volume_db
	sfx_player.play()

## Suoni specifici del gioco (placeholder - aggiungere stream reali)
func play_card_draw() -> void:
	print("AudioManager: Card draw SFX")
	# play_sfx(preload("res://assets/audio/sfx/card_draw.ogg"))

func play_card_play() -> void:
	print("AudioManager: Card play SFX")
	# play_sfx(preload("res://assets/audio/sfx/card_play.ogg"))

func play_card_attack() -> void:
	print("AudioManager: Card attack SFX")
	# play_sfx(preload("res://assets/audio/sfx/attack.ogg"))

func play_card_damage() -> void:
	print("AudioManager: Card damage SFX")
	# play_sfx(preload("res://assets/audio/sfx/damage.ogg"))

func play_card_death() -> void:
	print("AudioManager: Card death SFX")
	# play_sfx(preload("res://assets/audio/sfx/card_death.ogg"))

func play_card_type_sound(card_type: CardData.CardType) -> void:
	match card_type:
		CardData.CardType.ECO:
			print("AudioManager: Eco card sound")
		CardData.CardType.VELO:
			print("AudioManager: Velo card sound")
		CardData.CardType.IMPULSO:
			print("AudioManager: Impulso card sound")
		CardData.CardType.VOCE:
			print("AudioManager: Voce card sound")

func play_ambient_drone(duration: float = 5.0, volume_db: float = -10.0) -> void:
	print("AudioManager: Playing ambient drone for %.1fs" % duration)
	# TODO: Load and play ambient drone
	ambient_player.volume_db = volume_db

## Volume controls
func set_master_volume(value: float) -> void:
	master_volume = clamp(value, 0.0, 1.0)
	_apply_volume_settings()

func set_music_volume(value: float) -> void:
	music_volume = clamp(value, 0.0, 1.0)
	_apply_volume_settings()

func set_sfx_volume(value: float) -> void:
	sfx_volume = clamp(value, 0.0, 1.0)
	_apply_volume_settings()
