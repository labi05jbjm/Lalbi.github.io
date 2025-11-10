# 🎴 A Neve Portrait - Godot Edition

Un gioco di carte psicologico ispirato a Inscryption, convertito da HTML/JavaScript a Godot 4.3.

## 📖 Descrizione

**A Neve Portrait** è un card game narrativo che esplora la frammentazione della psiche attraverso opere d'arte classiche. Gioca come Neve in una sessione di terapia dove ogni carta rappresenta un frammento di memoria, e ogni scelta rivela strati più profondi della verità.

## 🎯 Stato del Progetto

**ITERAZIONE 3 COMPLETATA** ✅

### ITERAZIONE 1 - Core Gameplay:
- ✅ Sistema carte completo (CardData, Card, CardDatabase)
- ✅ 8 carte giocatore implementate (4 gratuite + 4 costo sangue)
- ✅ Sistema di combattimento base
- ✅ Sistema sacrifici
- ✅ GameManager con gestione turni
- ✅ Scene complete (MainMenu, GameScene, Card)
- ✅ UI base (stats, field, hand, log)
- ✅ Autoload systems (GameManager, CardDatabase, AudioManager)

### ITERAZIONE 2 - AI & Narrativa:
- ✅ **Carte avversario espanse**: 10 carte terapeuta (da 3 a 10)
  - 7 nuove carte con abilità uniche (Invalidazione, Gaslighting, Proiezione, ecc.)
  - 6 nuovi sigilli aggiunti (Perforante, Confusione, Spine, Assorbimento, Evasione, Indebolimento)
- ✅ **AI strategica avanzata**: TherapistAI con decision-making intelligente
  - Valutazione delle minacce
  - Posizionamento tattico delle carte
  - Adattamento alle fasi narrative
  - Scelta intelligente carte offensive/difensive
- ✅ **DialogueManager**: Sistema dialoghi narrativi completo
  - Dialoghi per tutte e 4 le fasi narrative
  - Eventi speciali (low stability, primo frammento)
  - Storia psicologica horror tra Neve e Dr. Lumen
- ✅ **UI Dialoghi**: Script DialogueBox per visualizzazione narrativa
- ✅ **Integrazione narrativa**: Trigger automatici dialoghi in-game

### ITERAZIONE 3 - Meccaniche Complete & Polish:
- ✅ **Implementazione sigilli completa**: Tutti i sigilli ora funzionanti
  - Evasion (50% dodge), Thorns (riflette danno), Piercing (ignora scudi)
  - Double Damage contro VELO, Shield blocking, Confusion (auto-danno)
  - Weaken (riduce attacco nemico), Absorb tracking
- ✅ **Sistema audio espanso**: AudioManager con funzioni complete
  - Musica per fasi narrative (Phase 1-4)
  - SFX per eventi speciali (transizioni, frammenti, low stability)
  - Effetti sonori per sigilli, dialoghi, game over
  - Sistema volume (Music, SFX, Master)
- ✅ **Sistema Save/Load JSON**: Salvataggio progressi
  - Salva: round, stability, fragments, fase, statistiche
  - Load: ripristino completo stato di gioco
  - Settings: volume audio, tutorial status
  - File: `user://neve_portrait_save.json`
- ✅ **Carte giocatore espanse**: 12 carte totali (da 8 a 12)
  - 4 nuove opere d'arte: Melancholia I, Nascita di Venere, Guernica, Giardino delle Delizie
  - Diverse strategie e build
  - Prima carta 2 blood cost (Giardino delle Delizie)
- ✅ **Integrazione audio in-game**: Trigger automatici suoni per eventi

### Da Implementare (Iterazioni Future):
- ⏳ Tutorial interattivo
- ⏳ Scene UI dialoghi (.tscn files)
- ⏳ Effetti visivi e particelle
- ⏳ Asset audio reali (attualmente placeholder)
- ⏳ Achievements Steam
- ⏳ Animazioni carte avanzate
- ⏳ Multiplayer (forse?)

## 🚀 Come Iniziare

### Prerequisiti
- **Godot 4.3** o superiore
- Sistema operativo: Windows, Linux, o macOS

### Installazione

1. **Scarica Godot 4.3**: [https://godotengine.org/download](https://godotengine.org/download)

2. **Apri il progetto**:
   ```bash
   # Clona o scarica questo repository
   cd neve_portrait_godot

   # Apri con Godot
   # File > Open Project > Seleziona project.godot
   ```

3. **Esegui il gioco**:
   - Premi **F5** in Godot, oppure
   - Click sul pulsante **Play** (▶️) in alto a destra

## 📁 Struttura del Progetto

```
neve_portrait_godot/
├── project.godot              # Configurazione progetto Godot
│
├── scenes/                    # Scene .tscn
│   ├── main/
│   │   ├── main_menu.tscn    # Menu principale
│   │   └── game_scene.tscn   # Scena di gioco principale
│   ├── cards/
│   │   └── card.tscn         # Scena carta (riutilizzabile)
│   ├── ui/                    # UI components
│   └── effects/               # Effetti visivi
│
├── scripts/                   # GDScript files
│   ├── autoload/              # Singleton globali
│   │   ├── game_manager.gd   # ⭐ Manager principale del gioco
│   │   ├── card_database.gd  # ⭐ Database di tutte le carte
│   │   └── audio_manager.gd  # Gestione audio
│   │
│   ├── cards/                 # Sistema carte
│   │   ├── card_data.gd      # ⭐ Dati carta (resource)
│   │   ├── card.gd           # ⭐ Logica carta visuale
│   │   └── sigil_data.gd     # ⭐ Abilità carte
│   │
│   ├── gameplay/              # Logica di gioco
│   │   └── game_scene_controller.gd  # ⭐ Controller scena principale
│   │
│   └── ui/                    # UI scripts
│       └── main_menu.gd      # Menu principale
│
├── resources/                 # Risorse Godot (.tres)
│   ├── cards/                # Template carte
│   └── themes/               # Temi UI
│
├── assets/                    # Asset grafici/audio
│   ├── images/
│   ├── fonts/
│   └── audio/
│
└── README.md                  # Questo file
```

## 🎮 Come Si Gioca

### Obiettivo
Sopravvivi alla sessione di terapia mantenendo la **Stabilità** sopra 0 mentre raccogli **Frammenti di Memoria**.

### Meccaniche Base

1. **Pesca Carte**: Inizi con 5 carte gratuite (costo 0🩸)

2. **Gioca Carte**: Trascina carte dalla mano agli slot del campo
   - Carte gratuite (0🩸): gioca subito
   - Carte con costo (1🩸, 2🩸): richiede sacrificio di carte sul campo

3. **Sistema Sacrifici**:
   - 1🩸 = sacrifica 1 carta sul tuo campo
   - 2🩸 = sacrifica 2 carte sul tuo campo
   - Costruisci prima il tuo campo con carte gratuite!

4. **Combattimento**:
   - Clicca "TERMINA TURNO"
   - Le tue carte attaccano le carte avversarie
   - Se uno slot avversario è vuoto, guadagni frammenti
   - Combattimento simultaneo: entrambe le carte si danneggiano

5. **Vittoria/Sconfitta**:
   - **Perdi** se Stabilità raggiunge 0
   - **Vinci** raccogliendo abbastanza frammenti e completando le fasi

### Tipi di Carta

- **🌊 ECO** (Blu): Memoria, resistenza
- **👁️ VELO** (Viola): Protezione, difesa
- **⚡ IMPULSO** (Rosso): Attacco potente
- **🎭 VOCE** (Cyan): Abilità speciali, dà frammenti

### Sigilli (Abilità Speciali)

**ITERAZIONE 1:**
- **⭐ Pesca Carte**: Pesca 2 carte quando giocata
- **🌙 Guarigione**: Cura 1 HP a tutte le carte alleate
- **💥 Attacco Raddoppiato**: x2 danno contro carte 'velo'
- **🛡️ Difesa**: +1 difesa quando attaccata
- **🔗 Legame**: Lega due carte alleate (salute condivisa)

**ITERAZIONE 2 (Nuovi):**
- **🗡️ Perforante**: Gli attacchi ignorano scudi e difese
- **🌀 Confusione**: La carta avversaria attacca se stessa
- **🌵 Spine**: Riflette 1 danno all'attaccante quando danneggiata
- **💫 Assorbimento**: Guadagna +1/+1 quando una carta muore
- **👻 Evasione**: 50% di probabilità di evitare gli attacchi
- **💤 Indebolimento**: Riduce l'attacco delle carte avversarie di 1

## 🔧 Sviluppo

### File Chiave da Conoscere

Se vuoi modificare il gioco, questi sono i file più importanti:

1. **`scripts/autoload/card_database.gd`**
   - Contiene TUTTE le carte del gioco
   - Aggiungi nuove carte qui

2. **`scripts/autoload/game_manager.gd`**
   - Logica principale del gioco
   - Gestisce turni, combattimento, stato

3. **`scripts/cards/card.gd`**
   - Logica di una singola carta
   - Animazioni, interazioni

4. **`scripts/gameplay/game_scene_controller.gd`**
   - Gestisce la scena di gioco
   - UI, drag&drop, visualizzazione

### Aggiungere Nuove Carte

Apri `scripts/autoload/card_database.gd` e aggiungi una funzione:

```gdscript
func _create_mia_nuova_carta() -> CardData:
    var card = CardData.new()
    card.card_name = "Nome Carta"
    card.card_type = CardData.CardType.ECO
    card.attack = 2
    card.health = 3
    card.blood_cost = 0
    card.artwork_url = "https://url-immagine.jpg"
    card.artist = "Artista, Anno"
    card.short_desc = "Descrizione breve"
    card.long_desc = "Descrizione lunga e narrativa..."
    card.sigils = [SigilData.create_draw_sigil()]
    return card
```

Poi aggiungi alla lista in `_initialize_player_cards()`:
```gdscript
player_cards.append(_create_mia_nuova_carta())
```

### Creare Nuovi Sigilli

Apri `scripts/cards/sigil_data.gd` e crea una funzione statica:

```gdscript
static func create_mio_sigillo() -> SigilData:
    var sigil = SigilData.new()
    sigil.icon = "🔥"
    sigil.sigil_name = "Nome Sigillo"
    sigil.description = "Descrizione effetto"
    sigil.trigger = SigilTrigger.ON_PLAY
    sigil.effect_value = 1
    return sigil
```

Poi implementa la logica in `GameManager._execute_sigil_effect()`.

## 🃏 Carte Terapeuta (Avversario) - ITERAZIONE 2

Le nuove carte aggiunte nell'ITERAZIONE 2 riflettono tecniche terapeutiche manipolative e tossiche:

1. **Invalidazione** (3 ATK / 2 HP) - IMPULSO
   - Sigillo: Perforante
   - "Non è come pensi tu, Neve."

2. **Gaslighting** (2 ATK / 3 HP) - VOCE
   - Sigillo: Confusione
   - "Sei sicura che sia andata così?"

3. **Proiezione** (1 ATK / 4 HP) - VELO
   - Sigillo: Spine
   - Riflette il dolore su Neve

4. **Repressione** (0 ATK / 5 HP) - VELO
   - Sigillo: Scudo
   - "Non pensarci. Seppelliscilo."

5. **Transfert** (2 ATK / 2 HP) - IMPULSO
   - Sigillo: Assorbimento
   - Assorbe l'identità di Neve

6. **Dissociazione Clinica** (2 ATK / 2 HP) - VOCE
   - Sigillo: Evasione
   - Distacco emotivo freddo

7. **Sedazione** (1 ATK / 3 HP) - ECO
   - Sigillo: Indebolimento
   - "Prendile, ti faranno sentire meglio."

## 🤖 Sistema AI - ITERAZIONE 2

La nuova **TherapistAI** implementa una strategia intelligente:

### Difficoltà
- **EASY**: Gioca casualmente, 1 carta per turno
- **NORMAL**: Strategia base, reagisce al giocatore (default)
- **HARD**: Strategia avanzata, ottimizza posizionamento
- **ADAPTIVE**: Si adatta al livello del giocatore

### Strategia
- **Valutazione minacce**: Calcola quanto è pericoloso il campo giocatore
- **Adattamento fasi**: Diventa più aggressiva nelle fasi avanzate
- **Scelta carte intelligente**:
  - Alta minaccia → gioca difensive (VELO)
  - Bassa minaccia → gioca offensive (IMPULSO)
  - Situazione bilanciata → gioca ECO
- **Posizionamento strategico**:
  - Carte difensive contro le minacce più grandi
  - Carte offensive contro slot vuoti (danno diretto)
  - Preferenza per slot centrali (più flessibili)

### File: `scripts/ai/therapist_ai.gd`

Puoi modificare la difficoltà AI nel GameManager.

## 📖 Sistema Dialoghi - ITERAZIONE 2

Il **DialogueManager** gestisce la narrativa del gioco:

### Fasi Narrative

**Fase 1: Denial** (0-14 frammenti)
- Neve è confusa, vulnerabile
- Dr. Lumen è rassicurante ma ambiguo
- Dialoghi: introduzione, primi turni, primo sacrificio

**Fase 2: Recognition** (15-29 frammenti)
- Neve inizia a ricordare
- Il dolore emerge
- Dr. Lumen incoraggia ad "abbracciare il dolore"

**Fase 3: Fracture** (30-49 frammenti)
- Neve si rende conto che qualcosa non va
- Paranoia e sospetto
- Dr. Lumen mostra crepe nella facciata

**Fase 4: Revelation** (50+ frammenti)
- La verità finale
- Dr. Lumen rivela la sua natura
- Confronto psicologico

### Trigger Automatici
- Inizio gioco → Dialogo introduttivo
- Cambio fase → Dialogo transizione
- Stabilità ≤ 30 → Dialogo "low stability"
- Primo frammento → Dialogo celebrativo

### File: `scripts/autoload/dialogue_manager.gd`

## 🃏 Nuove Carte Giocatore - ITERAZIONE 3

4 nuove carte aggiunte per espandere le strategie disponibili:

1. **Melancholia I** (0 ATK / 5 HP) - ECO [0🩸]
   - Sigillo: Shield
   - "Paralisi contemplativa" - Carta difensiva ultra-resistente

2. **Nascita di Venere** (1 ATK / 2 HP) - VOCE [0🩸]
   - Sigillo: Pesca Carte (⭐)
   - "Rinascita fragile" - Pesca 2 carte quando giocata

3. **Guernica** (3 ATK / 1 HP) - IMPULSO [1🩸]
   - Sigillo: Piercing (🗡️)
   - "Trauma collettivo" - Attacco potente che ignora difese

4. **Giardino delle Delizie** (2 ATK / 5 HP) - VELO [2🩸]
   - Sigilli: Bond (🔗) + Heal (🌙)
   - "Paradiso distorto" - Prima carta 2 blood cost, molto potente

**Totale carte giocatore: 12** (4 gratuite, 4 costo 1, 3 costo 1 nuove, 1 costo 2)

## 💾 Sistema Save/Load - ITERAZIONE 3

Il gioco ora supporta salvataggio e caricamento completo!

### File Salvati
- **Salvataggio gioco**: `user://neve_portrait_save.json`
  - Round, stability, fragments, fase corrente
  - Storia scelte, trust, awareness, meta_awareness
  - Statistiche (carte giocate, danno totale, durata sessione)

- **Impostazioni**: `user://settings.json`
  - Volumi (music, sfx, master)
  - Tutorial completato
  - Preferenze UI (futuro)

### API Salvataggio
```gdscript
# Salvare il gioco
GameManager.save_game()

# Caricare il gioco
if GameManager.has_save_file():
    GameManager.load_game()

# Salvare impostazioni
GameManager.save_settings()

# Eliminare salvataggio
GameManager.delete_save_file()
```

### Nota
Lo stato del campo di battaglia (carte sul tavolo) NON viene salvato per semplicità. Il salvataggio è pensato per salvare il progresso narrativo tra sessioni, non lo stato esatto della partita.

## 🎨 Personalizzazione

### Cambiare Colori/Tema

I colori sono definiti in vari punti:
- **Card colors**: `scripts/cards/card_data.gd` → `get_type_color()`
- **UI theme**: Crea un tema custom in `resources/themes/`
- **Background**: Modifica i ColorRect nelle scene

### Artwork delle Carte

Attualmente le carte usano URL esterni. Per usare immagini locali:

1. Importa immagini in `assets/images/cards/`
2. Modifica `card.gd` → `_load_artwork()` per caricare da file locale
3. Cambia `artwork_url` nei CardData con path locali

## 🐛 Debug e Testing

### Console di Debug

In Godot, premi **F11** durante il gioco per vedere:
- Output di print()
- Errori e warning
- Statistiche performance

### Comandi Utili

Aggiungi in `game_scene_controller.gd`:

```gdscript
func _unhandled_input(event):
    if event.is_action_pressed("ui_accept"):  # Enter
        # Cheat: pesca 5 carte
        for i in range(5):
            _draw_card()
```

## 📦 Export per Steam

### Windows:

1. In Godot: **Project > Export**
2. Add preset: **Windows Desktop**
3. Configure:
   - Application name: "A Neve Portrait"
   - Icon: `icon.ico`
4. Export project

### Linux/Mac: Stessi passaggi con preset appropriato

### Steam Integration (Futuro):

Installare Godot Steam SDK:
- https://github.com/CoaguCo-Industries/GodotSteam

## 📝 Licenza

Questo progetto è un prototipo personale. Le immagini delle opere d'arte sono di pubblico dominio.

## 🤝 Contributi

Questo è un progetto in sviluppo attivo. Iterazioni future aggiungeranno:
- Sistema narrativo completo
- Più carte e meccaniche
- Effetti visivi avanzati
- Multiplayer (forse?)

## 📧 Contatti

Per domande o supporto, vedi la documentazione Godot:
- [Godot Docs](https://docs.godotengine.org/en/stable/)
- [GDScript Reference](https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/index.html)

---

**Made with Godot 4.3 🎮**
**Convertito da HTML/JS a GDScript con ❤️**
