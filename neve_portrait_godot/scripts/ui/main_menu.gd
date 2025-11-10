extends Control

## Main Menu Controller

@onready var new_game_button = $VBox/NewGameButton
@onready var continue_button = $VBox/ContinueButton
@onready var settings_button = $VBox/SettingsButton
@onready var quit_button = $VBox/QuitButton

func _ready() -> void:
	new_game_button.pressed.connect(_on_new_game_pressed)
	continue_button.pressed.connect(_on_continue_pressed)
	settings_button.pressed.connect(_on_settings_pressed)
	quit_button.pressed.connect(_on_quit_pressed)

	# Check if save exists
	continue_button.disabled = not _has_save_file()

func _on_new_game_pressed() -> void:
	print("MainMenu: Starting new game...")
	get_tree().change_scene_to_file("res://scenes/main/game_scene.tscn")

func _on_continue_pressed() -> void:
	print("MainMenu: Loading saved game...")
	# TODO: Load game state
	get_tree().change_scene_to_file("res://scenes/main/game_scene.tscn")

func _on_settings_pressed() -> void:
	print("MainMenu: Opening settings...")
	# TODO: Open settings menu

func _on_quit_pressed() -> void:
	print("MainMenu: Quitting game...")
	get_tree().quit()

func _has_save_file() -> bool:
	# TODO: Check for actual save file
	return false
