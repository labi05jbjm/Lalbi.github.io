/**
 * SCRIPT DI TRADUZIONE MIRATA - SOLO TESTO UTENTE
 * Traduce solo le stringhe che l'utente vede effettivamente
 */

const fs = require('fs');
const path = require('path');

// Funzione per tradurre solo il testo visibile all'utente
function translateUserVisibleText(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;
        
        // Traduzioni specifiche per testo utente
        const userVisibleTranslations = {
            // Messaggi di sistema che l'utente vede
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
            "Success.": "Successo.",
            "Complete.": "Complete.",
            "Failed.": "Failed.",
            "Error.": "Errore.",
            "Warning.": "Avviso.",
            "Critical.": "Critico.",
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
            
            // Messaggi specifici del gioco
            "Use 'explore network' to investigate the damage.": "Usa 'explore network' per investigare i danni.",
            "Use 'view memory <id>' to see consciousness memories.": "Usa 'view memory <id>' per vedere i ricordi delle coscienze.",
            "Or 'talk nexus' to communicate.": "O 'talk nexus' per comunicare.",
            "Use 'learn acceptance' to understand what acceptance means.": "Usa 'learn acceptance' per capire cosa significa l'accettazione.",
            "Or 'talk morpheus' to speak with the final fragment.": "O 'talk morpheus' per parlare con il frammento finale.",
            "Use 'confront echo' to see WRAITH unmask the truth.": "Usa 'confront echo' per vedere WRAITH smascherare la verità.",
            "Or type 'status' to check system integrity.": "O digita 'status' per verificare l'integrità del sistema.",
            
            // Messaggi di stato
            "System unstable.": "Sistema instabile.",
            "System critical.": "Sistema critico.",
            "Core integrity failing.": "Integrità nucleo in fallimento.",
            "Neural network collapsing.": "Rete neurale in collasso.",
            "Consciousness fragmenting.": "Coscienze in frammentazione.",
            "Point of no return reached.": "Punto di non ritorno raggiunto.",
            
            // Messaggi di finali
            "Game Complete.": "Gioco Complete.",
            "Your Ending:": "Il Tuo Finale:",
            "Thank you for playing.": "Grazie per aver giocato.",
            "Play again?": "Giocare di nuovo?",
            "Continue?": "Continuare?",
            "Quit?": "Uscire?",
            
            // Messaggi di menu
            "Main Menu": "Menu Principale",
            "New Game": "Nuova Partita",
            "Continue": "Continua",
            "Options": "Opzioni",
            "Credits": "Crediti",
            "Quit": "Esci",
            "Back": "Indietro",
            "Yes": "Sì",
            "No": "No",
            "Confirm": "Conferma",
            "Cancel": "Annulla",
            
            // Messaggi di opzioni
            "Sound Effects:": "Effetti Sonori:",
            "Music Volume:": "Volume Musica:",
            "Screen Effects:": "Effetti Schermo:",
            "Difficulty:": "Difficoltà:",
            "Language:": "Lingua:",
            
            // Messaggi di errore migliorati
            "I'm sorry... I didn't mean... I didn't know I was... just a lie...": "Mi dispiace... non volevo... non sapevo di essere... solo una bugia...",
            "Look at the collapse. See what we did.": "Guarda il collasso. Vedi cosa abbiamo fatto.",
            "WRAITH is too enraged to listen. Confront ECHO to continue.": "WRAITH è troppo furioso per ascoltare. Affronta ECHO per continuare.",
            "The fragments are too focused on system collapse.": "I frammenti sono troppo concentrati sul collasso del sistema.",
            
            // Altri messaggi utente
            "What is your choice?": "Qual è la tua scelta?",
            "Make your decision:": "Prendi la tua decisione:",
            "Choose wisely:": "Scegli saggiamente:",
            "Time is running out...": "Il tempo sta scadendo...",
            "Hurry...": "Affrettati...",
            "Quickly...": "Rapidamente...",
            "No turning back now.": "Nessun ritorno ora.",
            "This choice cannot be undone.": "Questa scelta non può essere annullata.",
            "Are you sure?": "Sei sicuro?",
            "Confirm your action:": "Conferma la tua azione:"
        };
        
        // Applica le traduzioni
        for (const [english, italian] of Object.entries(userVisibleTranslations)) {
            if (content.includes(english)) {
                content = content.replace(new RegExp(english.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), italian);
                modified = true;
            }
        }
        
        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ File tradotto: ${filePath}`);
            return true;
        } else {
            console.log(`ℹ️  File non richiedeva traduzioni: ${filePath}`);
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
    
    // File da tradurre (solo quelli con testo utente)
    const filesToTranslate = [
        'blocks/block_03_deep_dive.js',
        'blocks/block_06_rage.js',
        'blocks/block_07_acceptance.js',
        'blocks/block_08_aftermath.js'
    ];
    
    console.log('=== TRADUZIONE MIRATA TESTO UTENTE ===\n');
    
    let translatedCount = 0;
    
    for (const file of filesToTranslate) {
        const filePath = path.join(projectPath, file);
        const wasTranslated = translateUserVisibleText(filePath);
        
        if (wasTranslated) {
            translatedCount++;
        }
    }
    
    console.log('\n=== RIEPILOGO ===');
    console.log(`📊 File tradotti: ${translatedCount}`);
    console.log(`📁 File totali: ${filesToTranslate.length}`);
    
    if (translatedCount > 0) {
        console.log('\n✨ Traduzioni completate con successo!');
    } else {
        console.log('\n📋 Nessuna traduzione necessaria per il testo utente.');
    }
    
    console.log('\n🔍 Esecuzione verifica finale...');
    
    // Esegui verifica finale
    setTimeout(() => {
        const { exec } = require('child_process');
        exec('node translation_analysis.js', { cwd: projectPath }, (error, stdout, stderr) => {
            if (error) {
                console.error('Errore nella verifica:', error);
                return;
            }
            console.log('\n' + stdout);
        });
    }, 1000);
}

// Esegui la traduzione mirata
main();