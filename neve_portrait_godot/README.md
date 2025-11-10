# 🎴 A Neve Portrait - Godot Edition

Un gioco di carte psicologico ispirato a Inscryption, convertito da HTML/JavaScript a Godot 4.3.

## 📖 Descrizione

**A Neve Portrait** è un card game narrativo che esplora la frammentazione della psiche attraverso opere d'arte classiche. Gioca come Neve in una sessione di terapia dove ogni carta rappresenta un frammento di memoria, e ogni scelta rivela strati più profondi della verità.

## 🎯 Stato del Progetto

**ITERAZIONE 1 COMPLETATA** ✅

### Core Gameplay Funzionante:
- ✅ Sistema carte completo (CardData, Card, CardDatabase)
- ✅ 8 carte giocatore implementate (4 gratuite + 4 costo sangue)
- ✅ Sistema di combattimento base
- ✅ Sistema sacrifici
- ✅ GameManager con gestione turni
- ✅ Scene complete (MainMenu, GameScene, Card)
- ✅ UI base (stats, field, hand, log)
- ✅ Autoload systems (GameManager, CardDatabase, AudioManager)

### Da Implementare (Iterazioni Future):
- ⏳ Tutorial interattivo
- ⏳ Sistema dialoghi completo
- ⏳ Fasi narrative (1-4)
- ⏳ Effetti visivi e particelle
- ⏳ Sistema audio completo
- ⏳ Sistema salvataggio
- ⏳ Achievements Steam
- ⏳ Carte avversario complete
- ⏳ AI avanzata

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

- **⭐ Pesca Carte**: Pesca 2 carte quando giocata
- **🌙 Guarigione**: Cura 1 HP a tutte le carte alleate
- **💥 Attacco Raddoppiato**: x2 danno contro carte 'velo'
- **🛡️ Difesa**: +1 difesa quando attaccata
- **🔗 Legame**: Lega due carte alleate (salute condivisa)

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
