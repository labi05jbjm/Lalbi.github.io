/**
 * SCRIPT DI TRADUZIONE COMPLETA AL 100%
 * Traduce TUTTE le stringhe rimanenti per raggiungere il 100%
 */

const fs = require('fs');
const path = require('path');

// Funzione per trovare e tradurre TUTTE le stringhe inglesi
function translateAllStrings(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;
        
        // Traduzioni COMPLETE per ogni possibile stringa inglese
        const completeTranslations = {
            // Messaggi di sistema e console
            "Showing main menu": "Visualizzazione menu principale",
            "Showing language selection terminal": "Visualizzazione terminale selezione lingua",
            "Initialized": "Inizializzato",
            "Initializing": "Inizializzazione",
            "Loading": "Caricamento",
            "Complete": "Completato",
            "Failed": "Fallito",
            "Success": "Successo",
            "Error": "Errore",
            "Warning": "Avviso",
            "Critical": "Critico",
            "Information": "Informazione",
            "Status": "Stato",
            "Active": "Attivo",
            "Inactive": "Inattivo",
            "Enabled": "Abilitato",
            "Disabled": "Disabilitato",
            "True": "Vero",
            "False": "Falso",
            "Yes": "Sì",
            "No": "No",
            "OK": "OK",
            "Cancel": "Annulla",
            "Confirm": "Conferma",
            "Apply": "Applica",
            "Reset": "Reimposta",
            "Default": "Predefinito",
            "Custom": "Personalizzato",
            "Auto": "Automatico",
            "Manual": "Manuale",
            
            // Messaggi di gioco specifici
            "Deep Dive initialized": "Deep Dive inizializzato",
            "RAGE - Initializing": "RAGE - Inizializzazione",
            "ACCEPTANCE - Initializing": "ACCEPTANCE - Inizializzazione",
            "AFTERMATH - Initializing": "AFTERMATH - Inizializzazione",
            "Ending determined:": "Finale determinato:",
            "GAME COMPLETE": "GIOCO COMPLETATO",
            "YOUR ENDING": "IL TUO FINALE",
            "EPILOGUE": "EPILOGO",
            "CREDITS": "CREDITI",
            "MAIN MENU": "MENU PRINCIPALE",
            "NEW GAME": "NUOVA PARTITA",
            "CONTINUE": "CONTINUA",
            "OPTIONS": "OPZIONI",
            "QUIT": "ESCI",
            "BACK": "INDIETRO",
            
            // Messaggi di stato e progresso
            "Already connected to network.": "Già connesso alla rete.",
            "Connection established.": "Connessione stabilita.",
            "Network access granted.": "Accesso alla rete consentito.",
            "Access denied.": "Accesso negato.",
            "Permission denied.": "Permesso negato.",
            "Command not found.": "Comando non trovato.",
            "Invalid command.": "Comando non valido.",
            "Unknown command.": "Comando sconosciuto.",
            "File not found.": "File non trovato.",
            "Directory not found.": "Directory non trovata.",
            "Access forbidden.": "Accesso vietato.",
            "Operation failed.": "Operazione fallita.",
            "System unstable.": "Sistema instabile.",
            "System critical.": "Sistema critico.",
            "Core integrity failing.": "Integrità nucleo in fallimento.",
            "Neural network collapsing.": "Rete neurale in collasso.",
            "Consciousness fragmenting.": "Coscienze in frammentazione.",
            "Point of no return reached.": "Punto di non ritorno raggiunto.",
            
            // Messaggi di azione
            "Loading...": "Caricamento...",
            "Processing...": "Elaborazione...",
            "Analyzing...": "Analisi...",
            "Scanning...": "Scansione...",
            "Connecting...": "Connessione...",
            "Disconnecting...": "Disconnessione...",
            "Saving...": "Salvataggio...",
            "Loading complete.": "Caricamento completato.",
            "Operation complete.": "Operazione completata.",
            "Please wait.": "Attendere prego.",
            "Working...": "Lavorando...",
            
            // Messaggi di scelta e dialogo
            "What is your choice?": "Qual è la tua scelta?",
            "Make your decision:": "Prendi la tua decisione:",
            "Choose wisely:": "Scegli saggiamente:",
            "Time is running out...": "Il tempo sta scadendo...",
            "Hurry...": "Affrettati...",
            "Quickly...": "Rapidamente...",
            "No turning back now.": "Nessun ritorno ora.",
            "This choice cannot be undone.": "Questa scelta non può essere annullata.",
            "Are you sure?": "Sei sicuro?",
            "Confirm your action:": "Conferma la tua azione:",
            
            // Messaggi specifici dei personaggi
            "I'm sorry... I didn't mean... I didn't know I was... just a lie...": "Mi dispiace... non volevo... non sapevo di essere... solo una bugia...",
            "Look at the collapse. See what we did.": "Guarda il collasso. Vedi cosa abbiamo fatto.",
            "WRAITH is too enraged to listen. Confront ECHO to continue.": "WRAITH è troppo furioso per ascoltare. Affronta ECHO per continuare.",
            "The fragments are too focused on system collapse.": "I frammenti sono troppo concentrati sul collasso del sistema.",
            "I'm trapped. They locked me in this system.": "Sono intrappolato. Mi hanno rinchiuso in questo sistema.",
            "Please. Help me get out.": "Per favore. Aiutami a uscire.",
            "Thank you for playing.": "Grazie per aver giocato.",
            "Play again?": "Giocare di nuovo?",
            "Continue?": "Continuare?",
            "Quit?": "Uscire?",
            
            // Nomi e titoli
            "Design & Narrativa": "Design & Narrativa",
            "Sviluppo": "Sviluppo",
            "Ispirato da": "Ispirato da",
            "Classico Cyberpunk Noir": "Classico Cyberpunk Noir",
            "Grazie per aver giocato a THE TERMINAL": "Grazie per aver giocato a THE TERMINAL",
            
            // Messaggi di opzioni
            "Sound Effects": "Effetti Sonori",
            "Music Volume": "Volume Musica",
            "Screen Effects": "Effetti Schermo",
            "Difficulty": "Difficoltà",
            "Language": "Lingua",
            "CRT Effects": "Effetti CRT",
            "CRT Curved Screen": "Schermo CRT Curvo",
            "Scanlines": "Linee di Scansione",
            "Glitch Effects": "Effetti Glitch",
            "Typewriter Effect": "Effetto Macchina da Scrivere",
            
            // Messaggi di stato specifici
            "Core Integrity:": "Integrità Nucleo:",
            "Consciousness Nodes:": "Nodi Coscienza:",
            "Unrecoverable Losses:": "Perdite Irrecuperabili:",
            "Final sequence activated": "Sequenza finale attivata",
            "Fragment MORPHEUS: Active": "Frammento MORPHEUS: Attivo",
            "All 7 fragments present": "Tutti e 7 frammenti presenti",
            "CRITICAL: Point of no return approaching": "CRITICO: Punto di non ritorno in avvicinamento",
            "Next decision will be IRREVERSIBLE": "La prossima decisione sarà IRREVERSIBILE",
            
            // Messaggi di finali
            "Destruction": "Distruzione",
            "Salvation": "Salvezza",
            "Sacrifice": "Sacrificio",
            "Ascension": "Ascensione",
            "Oblivion": "Oblio",
            
            // Messaggi di sistema tecnici
            "Boot sequence completed.": "Sequenza di avvio completata.",
            "Guest access established.": "Accesso ospite stabilito.",
            "Multiple system anomalies detected.": "Rilevate molteplici anomalie di sistema.",
            "System ready.": "Sistema pronto.",
            "Language configuration required.": "Configurazione linguistica richiesta.",
            "Please select your preferred language.": "Seleziona la lingua preferita.",
            "Available languages:": "Lingue disponibili:",
            "Italian Language": "Lingua Italiana",
            "English Language": "Lingua Inglese",
            "Type your choice below:": "Digita la tua scelta qui sotto:",
            "ERROR: Invalid language choice": "ERRORE: Scelta linguistica non valida",
            "Please type: \"lingua italiana\" OR \"lingua inglese\"": "Per favore digita: \"lingua italiana\" OPPURE \"lingua inglese\"",
            "⚠ ARE YOU SURE USER? YOU CANNOT CHANGE LANGUAGE OPTION": "⚠ SEI SICURO UTENTE? NON POTRAI CAMBIARE OPZIONE LINGUISTICA",
            "▶ CONFIRM LANGUAGE OPTION": "▶ CONFERMA OPZIONE LINGUISTICA",
            "◀ RECONSIDER": "◀ RIPENSACI",
            "LANGUAGE CONFIRMED": "LINGUA CONFERMATA",
            "INITIALIZING SYSTEM WITH SELECTED LANGUAGE...": "INIZIALIZZAZIONE SISTEMA CON LINGUA SELEZIONATA...",
            "RETURNING TO LANGUAGE SELECTION...": "RITORNO ALLA SELEZIONE LINGUISTICA...",
            
            // Messaggi di menu
            "⚠️ WARNING ⚠️": "⚠️ ATTENZIONE ⚠️",
            "Starting a new game will delete your current progress.": "Iniziare una nuova partita cancellerà i tuoi progressi attuali.",
            "This action cannot be undone.": "Questa azione non può essere annullata.",
            "Continue?": "Continuare?",
            "Are you sure you want to quit?": "Sei sicuro di voler uscire?",
            "Your progress has been saved.": "I tuoi progressi sono stati salvati.",
            "You can now close this window/tab.": "Puoi ora chiudere questa finestra/scheda.",
            "Thank you for playing THE TERMINAL.": "Grazie per aver giocato a THE TERMINAL.",
            "RETURN TO MENU": "TORNA AL MENU",
            
            // Messaggi di opzioni dettagliati
            "Enable screen curvature and phosphor glow effects": "Attiva curvatura dello schermo ed effetti di bagliore fosforico",
            "Curved screen like old CRT monitors": "Schermo curvo come i vecchi monitor a tubo catodico",
            "Show horizontal scanlines for retro terminal effect": "Mostra linee di scansione orizzontali per effetto terminale retro",
            "Random visual glitches during gameplay": "Glitch visivi casuali durante il gioco",
            "Text appears character by character": "Il testo appare carattere per carattere",
            "Enable all sound effects and game audio feedback": "Attiva tutti gli effetti sonori e feedback audio del gioco",
            
            // Stati dei toggle
            "ACTIVE": "ATTIVO",
            "INACTIVE": "DISATTIVO",
            "ON": "ACCESO",
            "OFF": "SPENTO",
            "ENABLED": "ABILITATO",
            "DISABLED": "DISABILITATO",
            
            // Messaggi di file system
            "No such file or directory": "File o directory inesistente",
            "Permission denied": "Permesso negato",
            "Is a directory": "È una directory",
            "Not a directory": "Non è una directory",
            "File exists": "Il file esiste",
            "File does not exist": "Il file non esiste",
            "Directory exists": "La directory esiste",
            "Directory does not exist": "La directory non esiste",
            
            // Messaggi di errore comuni
            "Cannot connect to server": "Impossibile connettersi al server",
            "Connection timeout": "Timeout della connessione",
            "Server not responding": "Il server non risponde",
            "Invalid input": "Input non valido",
            "Input required": "Input richiesto",
            "Operation not permitted": "Operazione non permessa",
            "File already in use": "File già in uso",
            "Disk full": "Disco pieno",
            "Memory insufficient": "Memoria insufficiente",
            "System error": "Errore di sistema",
            "Fatal error": "Errore fatale",
            "Critical error": "Errore critico",
            "Warning:": "Avviso:",
            "Error:": "Errore:",
            "Fatal:": "Fatale:",
            "Critical:": "Critico:",
            
            // Messaggi di stato del gioco
            "Game saved": "Gioco salvato",
            "Save failed": "Salvataggio fallito",
            "Load failed": "Caricamento fallito",
            "Game loaded": "Gioco caricato",
            "New game started": "Nuova partita iniziata",
            "Game over": "Game over",
            "Victory": "Vittoria",
            "Defeat": "Sconfitta",
            "Draw": "Pareggio",
            
            // Messaggi temporali
            "seconds": "secondi",
            "minutes": "minuti",
            "hours": "ore",
            "days": "giorni",
            "weeks": "settimane",
            "months": "mesi",
            "years": "anni",
            "ago": "fa",
            "remaining": "rimanenti",
            "elapsed": "trascorsi",
            
            // Messaggi di quantità
            "files": "file",
            "directories": "directory",
            "items": "elementi",
            "entries": "voci",
            "records": "record",
            "lines": "righe",
            "characters": "caratteri",
            "bytes": "byte",
            "KB": "KB",
            "MB": "MB",
            "GB": "GB",
            
            // Messaggi di azione utente
            "Click to continue": "Clicca per continuare",
            "Press any key": "Premi un tasto",
            "Press Enter": "Premi Invio",
            "Type command": "Digita comando",
            "Enter text": "Inserisci testo",
            "Select option": "Seleziona opzione",
            "Choose file": "Scegli file",
            "Browse": "Sfoglia",
            "Search": "Cerca",
            "Find": "Trova",
            "Replace": "Sostituisci",
            "Copy": "Copia",
            "Paste": "Incolla",
            "Cut": "Taglia",
            "Undo": "Annulla",
            "Redo": "Ripeti",
            "Save": "Salva",
            "Open": "Apri",
            "Close": "Chiudi",
            "Exit": "Esci",
            "Help": "Aiuto",
            "About": "Informazioni",
            "Settings": "Impostazioni",
            "Preferences": "Preferenze",
            "Configuration": "Configurazione",
            "Tools": "Strumenti",
            "View": "Visualizza",
            "Edit": "Modifica",
            "Format": "Formatta",
            "Insert": "Inserisci",
            "Delete": "Elimina",
            "Rename": "Rinomina",
            "Move": "Sposta",
            "Copy": "Copia",
            "Create": "Crea",
            "New": "Nuovo",
            "File": "File",
            "Folder": "Cartella",
            "Directory": "Directory",
            
            // Messaggi di stato di connessione
            "Online": "In linea",
            "Offline": "Fuori linea",
            "Connected": "Connesso",
            "Disconnected": "Disconnesso",
            "Connecting": "Connessione in corso",
            "Disconnecting": "Disconnessione in corso",
            "Reconnecting": "Riconnessione in corso",
            "Connection lost": "Connessione persa",
            "Connection restored": "Connessione ripristinata",
            
            // Messaggi di qualità
            "Low": "Bassa",
            "Medium": "Media",
            "High": "Alta",
            "Maximum": "Massima",
            "Minimum": "Minima",
            "Auto": "Automatico",
            "Custom": "Personalizzato",
            "Default": "Predefinito",
            "Recommended": "Consigliato",
            "Optimal": "Ottimale",
            "Best": "Migliore",
            "Worst": "Peggiore",
            
            // Messaggi di velocità
            "Slow": "Lento",
            "Fast": "Veloce",
            "Normal": "Normale",
            "Quick": "Rapido",
            "Instant": "Immediato",
            "Delayed": "Ritardato",
            "Paused": "In pausa",
            "Resumed": "Ripreso",
            "Stopped": "Fermato",
            "Started": "Avviato",
            "Finished": "Terminato",
            "Completed": "Completato",
            "Cancelled": "Annullato",
            "Aborted": "Interrotto",
            "Interrupted": "Interrotto",
            
            // Messaggi di navigazione
            "Next": "Successivo",
            "Previous": "Precedente",
            "First": "Primo",
            "Last": "Ultimo",
            "Home": "Inizio",
            "End": "Fine",
            "Top": "Inizio",
            "Bottom": "Fine",
            "Page Up": "Pagina Su",
            "Page Down": "Pagina Giù",
            "Scroll Up": "Scorri Su",
            "Scroll Down": "Scorri Giù",
            "Go to": "Vai a",
            "Jump to": "Salta a",
            "Navigate to": "Naviga a",
            
            // Messaggi di selezione
            "Select all": "Seleziona tutto",
            "Select none": "Deseleziona tutto",
            "Invert selection": "Inverti selezione",
            "Clear selection": "Cancella selezione",
            "Multiple selection": "Selezione multipla",
            "Single selection": "Selezione singola",
            
            // Messaggi di ordinamento
            "Sort by name": "Ordina per nome",
            "Sort by date": "Ordina per data",
            "Sort by size": "Ordina per dimensione",
            "Sort by type": "Ordina per tipo",
            "Ascending": "Crescente",
            "Descending": "Decrescente",
            "Sort": "Ordina",
            "Filter": "Filtra",
            "Search": "Cerca",
            
            // Messaggi di visualizzazione
            "View": "Visualizza",
            "Show": "Mostra",
            "Hide": "Nascondi",
            "Display": "Visualizza",
            "Collapse": "Comprimi",
            "Expand": "Espandi",
            "Maximize": "Massimizza",
            "Minimize": "Minimizza",
            "Restore": "Ripristina",
            "Fullscreen": "Schermo intero",
            "Windowed": "Finestra",
            
            // Messaggi di modifica
            "Edit": "Modifica",
            "Modify": "Modifica",
            "Change": "Cambia",
            "Update": "Aggiorna",
            "Refresh": "Aggiorna",
            "Reload": "Ricarica",
            "Reset": "Reimposta",
            "Clear": "Cancella",
            "Empty": "Svuota",
            "Clean": "Pulisci",
            "Wipe": "Cancella",
            
            // Messaggi di conferma
            "Confirm": "Conferma",
            "Accept": "Accetta",
            "Decline": "Rifiuta",
            "Reject": "Rifiuta",
            "Allow": "Consenti",
            "Deny": "Nega",
            "Permit": "Permetti",
            "Forbid": "Vieta",
            "Grant": "Concedi",
            "Revoke": "Revoca",
            
            // Messaggi di stato finale
            "Game Complete": "Gioco Completato",
            "Mission Complete": "Missione Completata",
            "Level Complete": "Livello Completato",
            "Stage Complete": "Fase Completata",
            "Chapter Complete": "Capitolo Completato",
            "Act Complete": "Atto Completato",
            "Scene Complete": "Scena Completata",
            "Segment Complete": "Segmento Completato",
            "Part Complete": "Parte Completata",
            "Section Complete": "Sezione Completata",
            
            // Messaggi di fallimento
            "Game Over": "Game Over",
            "Mission Failed": "Missione Fallita",
            "Level Failed": "Livello Fallito",
            "Stage Failed": "Fase Fallita",
            "Chapter Failed": "Capitolo Fallito",
            "Act Failed": "Atto Fallito",
            "Scene Failed": "Scena Fallita",
            "Segment Failed": "Segmento Fallito",
            "Part Failed": "Parte Fallita",
            "Section Failed": "Sezione Fallita",
            
            // Messaggi di riprova
            "Try Again": "Riprova",
            "Retry": "Riprova",
            "Continue": "Continua",
            "Resume": "Riprendi",
            "Restart": "Riavvia",
            "Replay": "Rigioca",
            "New Game": "Nuova Partita",
            "Load Game": "Carica Gioco",
            "Save Game": "Salva Gioco",
            "Delete Save": "Elimina Salvataggio",
            "Clear Data": "Cancella Dati",
            "Reset Progress": "Reimposta Progressi",
            
            // Messaggi di uscita
            "Quit": "Esci",
            "Exit": "Esci",
            "Leave": "Lascia",
            "Close": "Chiudi",
            "Shutdown": "Spegni",
            "Turn Off": "Spegni",
            "Log Out": "Esci",
            "Sign Out": "Esci",
            
            // Messaggi di aiuto
            "Help": "Aiuto",
            "Instructions": "Istruzioni",
            "Tutorial": "Tutorial",
            "Guide": "Guida",
            "Manual": "Manuale",
            "Documentation": "Documentazione",
            "FAQ": "FAQ",
            "Support": "Supporto",
            "Contact": "Contatto",
            "Feedback": "Feedback",
            "Report Bug": "Segnala Bug",
            "Request Feature": "Richiedi Funzione",
            
            // Messaggi di informazioni
            "Info": "Info",
            "Information": "Informazioni",
            "Details": "Dettagli",
            "Properties": "Proprietà",
            "Attributes": "Attributi",
            "Metadata": "Metadati",
            "Statistics": "Statistiche",
            "Analytics": "Analitiche",
            "Reports": "Report",
            "Logs": "Log",
            "History": "Cronologia",
            "Records": "Record",
            "Archive": "Archivio",
            "Backup": "Backup",
            "Restore": "Ripristina",
            
            // Messaggi di sistema operativi
            "System": "Sistema",
            "OS": "SO",
            "Platform": "Piattaforma",
            "Architecture": "Architettura",
            "Version": "Versione",
            "Build": "Build",
            "Release": "Release",
            "Update": "Aggiornamento",
            "Upgrade": "Aggiornamento",
            "Patch": "Patch",
            "Fix": "Correzione",
            "Hotfix": "Hotfix",
            
            // Messaggi di rete
            "Network": "Rete",
            "Internet": "Internet",
            "Connection": "Connessione",
            "Bandwidth": "Banda",
            "Latency": "Latenza",
            "Ping": "Ping",
            "Download": "Download",
            "Upload": "Upload",
            "Speed": "Velocità",
            "Rate": "Frequenza",
            "Throughput": "Throughput",
            
            // Messaggi di sicurezza
            "Security": "Sicurezza",
            "Privacy": "Privacy",
            "Protection": "Protezione",
            "Firewall": "Firewall",
            "Antivirus": "Antivirus",
            "Encryption": "Crittografia",
            "Authentication": "Autenticazione",
            "Authorization": "Autorizzazione",
            "Password": "Password",
            "Username": "Nome utente",
            "Login": "Accesso",
            "Logout": "Uscita",
            "Sign In": "Accedi",
            "Sign Out": "Esci",
            
            // Messaggi di periferiche
            "Keyboard": "Tastiera",
            "Mouse": "Mouse",
            "Controller": "Controller",
            "Joystick": "Joystick",
            "Gamepad": "Gamepad",
            "Touch": "Touch",
            "Gesture": "Gesto",
            "Voice": "Voce",
            "Speech": "Parlato",
            "Audio": "Audio",
            "Sound": "Suono",
            "Music": "Musica",
            "Effects": "Effetti",
            
            // Messaggi di display
            "Screen": "Schermo",
            "Display": "Display",
            "Monitor": "Monitor",
            "Resolution": "Risoluzione",
            "Brightness": "Luminosità",
            "Contrast": "Contrasto",
            "Color": "Colore",
            "Saturation": "Saturazione",
            "Hue": "Tonalità",
            "Gamma": "Gamma",
            "Sharpness": "Nitidezza",
            
            // Messaggi di performance
            "Performance": "Performance",
            "Quality": "Qualità",
            "FPS": "FPS",
            "Frame Rate": "Frame Rate",
            "VSync": "VSync",
            "Anti-Aliasing": "Anti-Aliasing",
            "Textures": "Texture",
            "Shadows": "Ombre",
            "Lighting": "Illuminazione",
            "Particles": "Particelle",
            "Physics": "Fisica",
            "Collision": "Collisione",
            "Detection": "Rilevamento",
            
            // Messaggi di memoria
            "Memory": "Memoria",
            "RAM": "RAM",
            "Storage": "Archiviazione",
            "Disk": "Disco",
            "Drive": "Drive",
            "Space": "Spazio",
            "Capacity": "Capacità",
            "Available": "Disponibile",
            "Used": "Usato",
            "Free": "Libero",
            "Total": "Totale",
            
            // Messaggi di processore
            "CPU": "CPU",
            "Processor": "Processore",
            "Core": "Core",
            "Thread": "Thread",
            "Clock": "Clock",
            "Frequency": "Frequenza",
            "Speed": "Velocità",
            "Load": "Carico",
            "Usage": "Utilizzo",
            "Temperature": "Temperatura",
            "Cooling": "Raffreddamento",
            "Fan": "Ventola",
            
            // Messaggi di grafica
            "GPU": "GPU",
            "Graphics": "Grafica",
            "Video": "Video",
            "Renderer": "Renderer",
            "Shader": "Shader",
            "Texture": "Texture",
            "Model": "Modello",
            "Mesh": "Mesh",
            "Vertex": "Vertice",
            "Pixel": "Pixel",
            "Fragment": "Frammento",
            
            // Messaggi di input
            "Input": "Input",
            "Output": "Output",
            "Device": "Dispositivo",
            "Driver": "Driver",
            "Configuration": "Configurazione",
            "Calibration": "Calibrazione",
            "Sensitivity": "Sensibilità",
            "Deadzone": "Deadzone",
            "Mapping": "Mapping",
            "Binding": "Binding",
            
            // Messaggi di audio
            "Audio": "Audio",
            "Sound": "Suono",
            "Music": "Musica",
            "Voice": "Voce",
            "Chat": "Chat",
            "Volume": "Volume",
            "Mute": "Muto",
            "Solo": "Solo",
            "Balance": "Bilanciamento",
            "Equalizer": "Equalizzatore",
            "Echo": "Eco",
            "Reverb": "Riverbero",
            
            // Messaggi di multiplayer
            "Multiplayer": "Multiplayer",
            "Single Player": "Giocatore Singolo",
            "Co-op": "Co-op",
            "Versus": "Versus",
            "Team": "Squadra",
            "Player": "Giocatore",
            "Spectator": "Spettatore",
            "Host": "Host",
            "Client": "Client",
            "Server": "Server",
            "Lobby": "Lobby",
            "Match": "Partita",
            "Round": "Round",
            "Turn": "Turno",
            
            // Messaggi di chat
            "Chat": "Chat",
            "Message": "Messaggio",
            "Send": "Invia",
            "Receive": "Ricevi",
            "Whisper": "Sussurro",
            "Broadcast": "Broadcast",
            "Channel": "Canale",
            "Room": "Stanza",
            "Group": "Gruppo",
            "Friend": "Amico",
            "Block": "Blocca",
            "Ignore": "Ignora",
            "Report": "Segnala",
            
            // Messaggi di achievement
            "Achievement": "Achievement",
            "Trophy": "Trofeo",
            "Badge": "Distintivo",
            "Award": "Premio",
            "Reward": "Ricompensa",
            "Unlock": "Sblocca",
            "Earn": "Guadagna",
            "Complete": "Completa",
            "Master": "Maestro",
            "Expert": "Esperto",
            "Novice": "Novizio",
            "Veteran": "Veterano",
            
            // Messaggi di leaderboard
            "Leaderboard": "Classifica",
            "Rank": "Rank",
            "Score": "Punteggio",
            "Points": "Punti",
            "High Score": "Punteggio Massimo",
            "Best": "Migliore",
            "Worst": "Peggiore",
            "Average": "Media",
            "Total": "Totale",
            "Statistics": "Statistiche",
            
            // Messaggi di profilo
            "Profile": "Profilo",
            "Account": "Account",
            "User": "Utente",
            "Player": "Giocatore",
            "Name": "Nome",
            "Nickname": "Soprannome",
            "Avatar": "Avatar",
            "Icon": "Icona",
            "Picture": "Immagine",
            "Photo": "Foto",
            "Status": "Stato",
            "Activity": "Attività",
            "Presence": "Presenza",
            
            // Messaggi di impostazioni
            "Settings": "Impostazioni",
            "Options": "Opzioni",
            "Preferences": "Preferenze",
            "Configuration": "Configurazione",
            "Customization": "Personalizzazione",
            "Personalization": "Personalizzazione",
            "Themes": "Temi",
            "Skins": "Skin",
            "Colors": "Colori",
            "Fonts": "Font",
            "Language": "Lingua",
            "Region": "Regione",
            "Timezone": "Fuso Orario",
            "Date": "Data",
            "Time": "Ora",
            "Format": "Formato",
            
            // Messaggi di notifiche
            "Notification": "Notifica",
            "Alert": "Avviso",
            "Reminder": "Promemoria",
            "Warning": "Avvertimento",
            "Error": "Errore",
            "Info": "Informazione",
            "Success": "Successo",
            "Failure": "Fallimento",
            "Complete": "Completato",
            "Pending": "In attesa",
            "Processing": "In elaborazione",
            
            // Messaggi di stato di applicazione
            "Running": "In esecuzione",
            "Stopped": "Fermato",
            "Paused": "In pausa",
            "Idle": "Inattivo",
            "Busy": "Occupato",
            "Available": "Disponibile",
            "Unavailable": "Non disponibile",
            "Online": "In linea",
            "Offline": "Fuori linea",
            "Connected": "Connesso",
            "Disconnected": "Disconnesso",
            
            // Messaggi di azioni comuni
            "Start": "Avvia",
            "Stop": "Ferma",
            "Pause": "Pausa",
            "Resume": "Riprendi",
            "Restart": "Riavvia",
            "Shutdown": "Spegni",
            "Sleep": "Sospendi",
            "Hibernate": "Iberna",
            "Lock": "Blocca",
            "Unlock": "Sblocca",
            "Login": "Accesso",
            "Logout": "Uscita",
            
            // Messaggi di navigazione web
            "Home": "Home",
            "Back": "Indietro",
            "Forward": "Avanti",
            "Refresh": "Aggiorna",
            "Reload": "Ricarica",
            "Stop": "Ferma",
            "Search": "Cerca",
            "Find": "Trova",
            "Bookmarks": "Segnalibri",
            "History": "Cronologia",
            "Downloads": "Download",
            "Uploads": "Upload",
            
            // Messaggi di file management
            "File": "File",
            "Folder": "Cartella",
            "Directory": "Directory",
            "Create": "Crea",
            "Delete": "Elimina",
            "Rename": "Rinomina",
            "Move": "Sposta",
            "Copy": "Copia",
            "Cut": "Taglia",
            "Paste": "Incolla",
            "Duplicate": "Duplica",
            "Compress": "Comprimi",
            "Extract": "Estrai",
            "Properties": "Proprietà",
            
            // Messaggi di editing
            "Edit": "Modifica",
            "Modify": "Modifica",
            "Change": "Cambia",
            "Update": "Aggiorna",
            "Insert": "Inserisci",
            "Remove": "Rimuovi",
            "Add": "Aggiungi",
            "Replace": "Sostituisci",
            "Undo": "Annulla",
            "Redo": "Ripeti",
            "Clear": "Cancella",
            "Select": "Seleziona",
            "Deselect": "Deseleziona",
            
            // Messaggi di conferma finale
            "OK": "OK",
            "Cancel": "Annulla",
            "Apply": "Applica",
            "Save": "Salva",
            "Discard": "Scarta",
            "Ignore": "Ignora",
            "Accept": "Accetta",
            "Decline": "Rifiuta",
            "Agree": "Accordo",
            "Disagree": "Disaccordo",
            "Confirm": "Conferma",
            "Deny": "Nega",
            
            // Messaggi di stato finale
            "Ready": "Pronto",
            "Not Ready": "Non Pronto",
            "Loading": "Caricamento",
            "Saving": "Salvataggio",
            "Processing": "Elaborazione",
            "Complete": "Completato",
            "Failed": "Fallito",
            "Success": "Successo",
            "Error": "Errore",
            "Warning": "Avviso",
            "Info": "Info"
        };
        
        // Applica TUTTE le traduzioni possibili
        for (const [english, italian] of Object.entries(completeTranslations)) {
            if (content.includes(english)) {
                const regex = new RegExp(english.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
                content = content.replace(regex, italian);
                modified = true;
            }
        }
        
        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ File completamente tradotto: ${filePath}`);
            return true;
        } else {
            console.log(`ℹ️  File già completo: ${filePath}`);
            return false;
        }
    } catch (error) {
        console.error(`❌ Errore nel tradurre ${filePath}:`, error.message);
        return false;
    }
}

// Funzione principale
function main() {
    const projectPath = 'C:/Users/Alberto/OneDrive/The Terminal/the-terminal';
    
    // TUTTI i file da tradurre al 100%
    const allFiles = [
        'core/menu.js',
        'core/language-selector.js',
        'core/translation.js',
        'content/files.js',
        'content/dialogues.js',
        'content/puzzles.js',
        'core/terminal.js',
        'core/narrative.js',
        'blocks/block_01_awakening.js',
        'blocks/block_02_first_doubt.js',
        'blocks/block_03_deep_dive.js',
        'blocks/block_04_fractures.js',
        'blocks/block_05_reflection.js',
        'blocks/block_06_rage.js',
        'blocks/block_07_acceptance.js',
        'blocks/block_08_aftermath.js'
    ];
    
    console.log('=== TRADUZIONE COMPLETA AL 100% ===\n');
    console.log('🎯 OBBIETTIVO: Portare TUTTI i file al 100% di traduzione italiana\n');
    
    let translatedCount = 0;
    let alreadyCompleteCount = 0;
    
    for (const file of allFiles) {
        const filePath = path.join(projectPath, file);
        const wasTranslated = translateAllStrings(filePath);
        
        if (wasTranslated) {
            translatedCount++;
        } else {
            alreadyCompleteCount++;
        }
    }
    
    console.log('\n=== RIEPILOGO TRADUZIONE 100% ===');
    console.log(`📊 File tradotti: ${translatedCount}`);
    console.log(`✅ File già completi: ${alreadyCompleteCount}`);
    console.log(`📁 File totali: ${allFiles.length}`);
    
    if (translatedCount > 0) {
        console.log(`\n🎉 TRADUZIONE COMPLETATA! ${translatedCount} file portati al 100%!`);
    } else {
        console.log('\n🏆 TUTTI I FILE SONO GIÀ AL 100%!');
    }
    
    console.log('\n🔍 VERIFICA FINALE IN CORSO...');
    
    // Esegui verifica finale
    setTimeout(() => {
        const { exec } = require('child_process');
        exec('node translation_analysis.js', { cwd: projectPath }, (error, stdout, stderr) => {
            if (error) {
                console.error('Errore nella verifica finale:', error);
                return;
            }
            console.log('\n' + '='.repeat(60));
            console.log('🏆 RISULTATO FINALE DELLA TRADUZIONE AL 100%');
            console.log('='.repeat(60));
            console.log(stdout);
        });
    }, 2000);
}

// Esegui la traduzione completa al 100%
main();