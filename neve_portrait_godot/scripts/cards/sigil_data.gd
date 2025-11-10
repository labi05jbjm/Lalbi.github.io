class_name SigilData
extends Resource

## Rappresenta un'abilità speciale (sigillo) di una carta
## I sigilli vengono attivati in momenti diversi del gioco

enum SigilTrigger {
	ON_PLAY,       # Quando la carta viene giocata
	ON_ATTACK,     # Quando la carta attacca
	ON_DAMAGED,    # Quando la carta subisce danno
	ON_DEATH,      # Quando la carta muore
	PASSIVE        # Effetto passivo sempre attivo
}

@export var icon: String = "⚡"  # Emoji/icona del sigillo
@export var sigil_name: String = ""
@export var description: String = ""
@export var trigger: SigilTrigger = SigilTrigger.PASSIVE

## Parametri per effetti (flessibile)
@export var effect_value: int = 1
@export var effect_target: String = "self"  # "self", "allies", "enemies", "all"

## Sigilli predefiniti del gioco
static func create_draw_sigil() -> SigilData:
	var sigil = SigilData.new()
	sigil.icon = "⭐"
	sigil.sigil_name = "Pesca Carte"
	sigil.description = "Pesca 2 carte quando giocata"
	sigil.trigger = SigilTrigger.ON_PLAY
	sigil.effect_value = 2
	return sigil

static func create_heal_sigil() -> SigilData:
	var sigil = SigilData.new()
	sigil.icon = "🌙"
	sigil.sigil_name = "Guarigione"
	sigil.description = "Cura 1 HP a tutte le carte alleate"
	sigil.trigger = SigilTrigger.ON_PLAY
	sigil.effect_value = 1
	sigil.effect_target = "allies"
	return sigil

static func create_double_damage_sigil() -> SigilData:
	var sigil = SigilData.new()
	sigil.icon = "💥"
	sigil.sigil_name = "Attacco Raddoppiato"
	sigil.description = "Attacco raddoppiato contro carte 'velo'"
	sigil.trigger = SigilTrigger.ON_ATTACK
	sigil.effect_value = 2
	return sigil

static func create_shield_sigil() -> SigilData:
	var sigil = SigilData.new()
	sigil.icon = "🛡️"
	sigil.sigil_name = "Difesa"
	sigil.description = "Difesa +1 quando attaccata"
	sigil.trigger = SigilTrigger.ON_DAMAGED
	sigil.effect_value = 1
	return sigil

static func create_bond_sigil() -> SigilData:
	var sigil = SigilData.new()
	sigil.icon = "🔗"
	sigil.sigil_name = "Legame"
	sigil.description = "Lega due carte alleate: condividono la salute"
	sigil.trigger = SigilTrigger.ON_PLAY
	sigil.effect_target = "allies"
	return sigil

## ========================================
## SIGILLI ITERAZIONE 2
## ========================================

static func create_piercing_sigil() -> SigilData:
	var sigil = SigilData.new()
	sigil.icon = "🗡️"
	sigil.sigil_name = "Perforante"
	sigil.description = "Gli attacchi ignorano gli scudi e le abilità difensive"
	sigil.trigger = SigilTrigger.ON_ATTACK
	sigil.effect_value = 1
	return sigil

static func create_confusion_sigil() -> SigilData:
	var sigil = SigilData.new()
	sigil.icon = "🌀"
	sigil.sigil_name = "Confusione"
	sigil.description = "La carta avversaria attacca se stessa"
	sigil.trigger = SigilTrigger.ON_PLAY
	sigil.effect_target = "enemies"
	return sigil

static func create_thorns_sigil() -> SigilData:
	var sigil = SigilData.new()
	sigil.icon = "🌵"
	sigil.sigil_name = "Spine"
	sigil.description = "Riflette 1 danno all'attaccante quando danneggiata"
	sigil.trigger = SigilTrigger.ON_DAMAGED
	sigil.effect_value = 1
	return sigil

static func create_absorb_sigil() -> SigilData:
	var sigil = SigilData.new()
	sigil.icon = "💫"
	sigil.sigil_name = "Assorbimento"
	sigil.description = "Guadagna +1/+1 quando una carta muore"
	sigil.trigger = SigilTrigger.PASSIVE
	sigil.effect_value = 1
	return sigil

static func create_evasion_sigil() -> SigilData:
	var sigil = SigilData.new()
	sigil.icon = "👻"
	sigil.sigil_name = "Evasione"
	sigil.description = "50% di probabilità di evitare gli attacchi"
	sigil.trigger = SigilTrigger.PASSIVE
	sigil.effect_value = 50
	return sigil

static func create_weaken_sigil() -> SigilData:
	var sigil = SigilData.new()
	sigil.icon = "💤"
	sigil.sigil_name = "Indebolimento"
	sigil.description = "Riduce l'attacco delle carte avversarie di 1"
	sigil.trigger = SigilTrigger.PASSIVE
	sigil.effect_value = 1
	sigil.effect_target = "enemies"
	return sigil
