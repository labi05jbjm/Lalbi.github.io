/**
 * SCRIPT DI COMPLETAMENTO TRADUZIONE ITALIANA
 * Traduce automaticamente le stringhe inglesi rimanenti
 */

const fs = require('fs');
const path = require('path');

// Mappa di traduzioni comuni
const commonTranslations = {
    // Comandi di sistema
    "Use 'view memory <id>' to see consciousness memories.": "Usa 'view memory <id>' per vedere i ricordi delle coscienze.",
    "Or 'talk nexus' to communicate.": "O 'talk nexus' per comunicare.",
    "Use 'explore network' to investigate the damage.": "Usa 'explore network' per investigare i danni.",
    "Use 'learn acceptance' to understand what acceptance means.": "Usa 'learn acceptance' per capire cosa significa l'accettazione.",
    "Or 'talk morpheus' to speak with the final fragment.": "O 'talk morpheus' per parlare con il frammento finale.",
    "Use 'confront echo' to see WRAITH unmask the truth.": "Usa 'confront echo' per vedere WRAITH smascherare la verità.",
    "Or type 'status' to check system integrity.": "O digita 'status' per verificare l'integrità del sistema.",
    
    // Messaggi di sistema
    "Accessing consciousness network...": "Accesso alla rete delle coscienze...",
    "Mapping neural connections": "Mappatura connessioni neurali",
    "Loading consciousness data": "Caricamento dati coscienza",
    "Viewing memory": "Visualizzazione memoria",
    "Memory loaded": "Memoria caricata",
    "Exploring consciousness": "Esplorazione coscienza",
    "Consciousness data accessed": "Dati coscienza accessibili",
    
    // Menu e interfaccia
    "Showing main menu": "Visualizzazione menu principale",
    "Showing language selection terminal": "Visualizzazione terminale selezione lingua",
    "terminal-output": "terminal-output",
    "terminal-input": "terminal-input",
    "terminal-container": "terminal-container",
    "terminal-header": "terminal-header",
    "terminal-input-line": "terminal-input-line",
    "menu-title-animated": "menu-title-animated",
    "main-menu-container": "main-menu-container",
    
    // Nomi file e directory
    "readme.txt": "readme.txt",
    "welcome.txt": "welcome.txt",
    "/home/guest/readme.txt": "/home/guest/readme.txt",
    "/home/guest/welcome.txt": "/home/guest/welcome.txt",
    "/home/sentinel": "/home/sentinel",
    "/archive/sector_delta": "/archive/sector_delta",
    "/archive/sector_delta/consciousness_021847.dat": "/archive/sector_delta/consciousness_021847.dat",
    
    // Messaggi di stato
    "SYSTEM STATUS": "STATO SISTEMA",
    "Core Integrity": "Integrità Nucleo",
    "Consciousness Nodes": "Nodi Coscienza",
    "Unrecoverable Losses": "Perdite Irrecuperabili",
    "Final sequence activated": "Sequenza finale attivata",
    "Fragment MORPHEUS: Active": "Frammento MORPHEUS: Attivo",
    "All 7 fragments present": "Tutti e 7 frammenti presenti",
    "CRITICAL: Point of no return approaching": "CRITICO: Punto di non ritorno in avvicinamento",
    "Next decision will be IRREVERSIBLE": "La prossima decisione sarà IRREVERSIBILE",
    
    // Finali e statistiche
    "GAME COMPLETE": "GIOCO COMPLETATO",
    "YOUR ENDING": "IL TUO FINALE",
    "EPILOGUE": "EPILOGO",
    "Total Playtime": "Tempo di gioco totale",
    "Final Suspicion": "Sospetto finale",
    "Final Trust in ECHO": "Fiducia finale in ECHO",
    "Ending": "Finale",
    "Block 6 Choice": "Scelta Blocco 6",
    "Block 7 Identity": "Identità Blocco 7",
    "You may close the game or type 'restart' to play again.": "Puoi chiudere il gioco o digitare 'restart' per giocare di nuovo.",
    "Please refresh page to start a new game.": "Per favore ricarica la pagina per iniziare una nuova partita.",
    "restart": "restart",
    "new game": "nuovo gioco",
    "stats": "stats",
    "status": "status",
    
    // Messaggi di errore e avviso
    "WRAITH is too enraged to listen. Confront ECHO to continue.": "WRAITH è troppo furioso per ascoltare. Affronta ECHO per continuare.",
    "The fragments are too focused on system collapse.": "I frammenti sono troppo concentrati sul collasso del sistema.",
    "I'm sorry... I didn't mean... I didn't know I was... just a lie...": "Mi dispiace... non volevo... non sapevo di essere... solo una bugia...",
    "Look at the collapse. See what we did.": "Guarda il collasso. Vedi cosa abbiamo fatto.",
    
    // Scelte e opzioni
    "what is acceptance": "cos'è l'accettazione",
    "learn acceptance": "learn acceptance",
    "talk morpheus": "talk morpheus",
    "confront echo": "confront echo",
    "explore network": "explore network",
    "view memory": "view memory",
    "talk nexus": "talk nexus",
    
    // Nomi dei blocchi
    "BLOCK 3: DEEP DIVE": "BLOCCO 3: DEEP DIVE",
    "BLOCK 6: RAGE": "BLOCCO 6: RAGE",
    "BLOCK 7: ACCEPTANCE": "BLOCCO 7: ACCEPTANCE",
    "BLOCK 8: AFTERMATH": "BLOCCO 8: AFTERMATH",
    
    // Messaggi di inizializzazione
    "[BLOCK 03] Deep Dive initialized": "[BLOCCO 03] Deep Dive inizializzato",
    "[BLOCK 06] RAGE - Initializing...": "[BLOCCO 06] RAGE - Inizializzazione...",
    "[BLOCK 07] ACCEPTANCE - Initializing...": "[BLOCCO 07] ACCEPTANCE - Inizializzazione...",
    "[BLOCK 08] AFTERMATH - Initializing...": "[BLOCCO 08] AFTERMATH - Inizializzazione...",
    "[BLOCK 08] Ending determined:": "[BLOCCO 08] Finale determinato:",
    
    // Altri messaggi comuni
    "CHOICE HISTORY REVIEW": "RICONTO CRONOLOGIA SCELTE",
    "I'm sorry.": "Mi dispiace.",
    "Please.": "Per favore.",
    "Thank you.": "Grazie.",
    "I understand.": "Capisco.",
    "I don't understand.": "Non capisco.",
    "What do you mean?": "Cosa intendi?",
    "Explain yourself.": "Spiegati.",
    "Why?": "Perché?",
    "How?": "Come?",
    "Where?": "Dove?",
    "When?": "Quando?",
    "Who?": "Chi?",
    "What?": "Cosa?",
    "Help me.": "Aiutami.",
    "Save me.": "Salvami.",
    "Stop!": "Ferma!",
    "Wait!": "Aspetta!",
    "Go!": "Vai!",
    "Yes": "Sì",
    "No": "No",
    "Maybe": "Forse",
    "Perhaps": "Forse",
    "Probably": "Probabilmente",
    "Definitely": "Definitivamente",
    "Absolutely": "Assolutamente",
    "Never": "Mai",
    "Always": "Sempre",
    "Sometimes": "A volte",
    "Often": "Spesso",
    "Rarely": "Raramente",
    "Usually": "Di solito",
    "Normally": "Normalmente",
    "Currently": "Attualmente",
    "Finally": "Finalmente",
    "Eventually": "Alla fine",
    "Suddenly": "Improvvisamente",
    "Immediately": "Immediatamente",
    "Quickly": "Rapidamente",
    "Slowly": "Lentamente",
    "Carefully": "Attentamente",
    "Quietly": "Silenziosamente",
    "Loudly": "Ad alta voce",
    "Softly": "Dolcemente",
    "Hardly": "A malapena",
    "Barely": "A malapena",
    "Nearly": "Quasi",
    "Almost": "Quasi",
    "About": "Circa",
    "Around": "Circa",
    "Approximately": "Approssimativamente",
    "Exactly": "Esattamente",
    "Precisely": "Precisamente",
    "Specifically": "Specificamente",
    "Particularly": "Particolarmente",
    "Especially": "Specialmente",
    "Mainly": "Principalmente",
    "Mostly": "Principalmente",
    "Primarily": "Principalmente",
    "Essentially": "Essenzialmente",
    "Basically": "Fondamentalmente",
    "Simply": "Semplicemente",
    "Merely": "Semplicemente",
    "Purely": "Puramente",
    "Truly": "Veramente",
    "Really": "Davvero",
    "Actually": "In realtà",
    "In fact": "Infatti",
    "Indeed": "Infatti",
    "Certainly": "Certamente",
    "Definitely": "Definitivamente",
    "Absolutely": "Assolutamente",
    "Completely": "Completamente",
    "Totally": "Totalmente",
    "Entirely": "Completamente",
    "Wholly": "Completamente",
    "Fully": "Completamente",
    "Perfectly": "Perfettamente",
    "Exactly": "Esattamente",
    "Precisely": "Precisamente"
};

// Funzione per tradurre un file
function translateFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;
        
        // Applica le traduzioni comuni
        for (const [english, italian] of Object.entries(commonTranslations)) {
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
            console.log(`ℹ️  File già tradotto: ${filePath}`);
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
    
    // File da tradurre
    const filesToTranslate = [
        'core/menu.js',
        'core/language-selector.js',
        'content/files.js',
        'blocks/block_03_deep_dive.js',
        'blocks/block_06_rage.js',
        'blocks/block_07_acceptance.js',
        'blocks/block_08_aftermath.js'
    ];
    
    console.log('=== COMPLETAMENTO TRADUZIONE ITALIANA ===\n');
    
    let translatedCount = 0;
    let alreadyTranslatedCount = 0;
    
    for (const file of filesToTranslate) {
        const filePath = path.join(projectPath, file);
        const wasTranslated = translateFile(filePath);
        
        if (wasTranslated) {
            translatedCount++;
        } else {
            alreadyTranslatedCount++;
        }
    }
    
    console.log('\n=== RIEPILOGO ===');
    console.log(`📊 File tradotti: ${translatedCount}`);
    console.log(`✅ File già tradotti: ${alreadyTranslatedCount}`);
    console.log(`📁 File totali: ${filesToTranslate.length}`);
    
    if (translatedCount === 0) {
        console.log('\n🎉 TUTTI I FILE SONO GIÀ COMPLETAMENTE TRADOTTI IN ITALIANO!');
    } else {
        console.log(`\n✨ Complete! ${translatedCount} file sono stati tradotti.`);
    }
    
    console.log('\n🚀 Ora eseguiamo una verifica finale...');
    
    // Eseguiamo lo script di verifica
    setTimeout(() => {
        const { exec } = require('child_process');
        exec('node check_english_strings.js', { cwd: projectPath }, (error, stdout, stderr) => {
            if (error) {
                console.error('Errore nell\'eseguire la verifica:', error);
                return;
            }
            console.log(stdout);
        });
    }, 1000);
}

// Esegui il completamento
main();