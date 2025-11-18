/**
 * SCRIPT DI ANALISI DELLA TRADUZIONE ITALIANA
 * Analizza tutti i file JavaScript del gioco The Terminal
 * per calcolare la percentuale di traduzione in italiano
 */

const fs = require('fs');
const path = require('path');

// Funzione per determinare se una stringa è in italiano
function isItalian(text) {
    if (!text || text.length < 3) return false;
    
    // Parole italiane comuni
    const italianWords = ['il', 'lo', 'la', 'un', 'una', 'dei', 'del', 'della', 'e', 'è', 'di', 'a', 'da', 'per', 'con', 'su', 'in', 'che', 'non', 'si', 'come', 'ma', 'se', 'anche', 'più', 'solo', 'tutto', 'tutti', 'questo', 'questa', 'quello', 'quella', 'stato', 'stati', 'essere', 'avere', 'fare', 'dire', 'potere', 'volere', 'dovere', 'sistema', 'file', 'comando', 'accesso', 'messaggio', 'errore', 'avviso', 'attenzione', 'protocollo', 'sicurezza', 'archivio', 'memoriam', 'echo', 'sentinel', 'viktor', 'coscienza', 'blocco', 'gioco', 'terminale', 'digitare', 'scrivere', 'leggere', 'scansionare', 'continuare', 'aiuto', 'aiutami', 'per favore', 'grazie', 'scusa', 'salve', 'ciao'];
    
    // Caratteri italiani specifici
    const hasItalianChars = /[àèéìíîòóùú]/.test(text);
    
    // Parole italiane nella stringa
    const lowerText = text.toLowerCase();
    const italianWordCount = italianWords.filter(word => lowerText.includes(word)).length;
    
    // Segni di punteggiatura italiani
    const hasItalianPunctuation = /[«»]/.test(text);
    
    // Considera italiana se ha almeno 2 parole italiane OPPURE caratteri italiani
    return italianWordCount >= 2 || hasItalianChars || hasItalianPunctuation;
}

// Funzione per determinare se una stringa è in inglese
function isEnglish(text) {
    if (!text || text.length < 3) return false;
    
    // Parole inglesi comuni
    const englishWords = ['the', 'and', 'or', 'but', 'not', 'is', 'are', 'was', 'were', 'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those', 'system', 'file', 'command', 'access', 'message', 'error', 'warning', 'attention', 'protocol', 'security', 'archive', 'memoriam', 'echo', 'sentinel', 'viktor', 'consciousness', 'block', 'game', 'terminal', 'type', 'write', 'read', 'scan', 'continue', 'help', 'please', 'thank', 'sorry', 'hello', 'hi'];
    
    // Parole inglesi nella stringa
    const lowerText = text.toLowerCase();
    const englishWordCount = englishWords.filter(word => lowerText.includes(word)).length;
    
    // Considera inglese se ha almeno 2 parole inglesi E non è italiana
    return englishWordCount >= 2 && !isItalian(text);
}

// Funzione per estrarre stringhe di testo dal codice JavaScript
function extractTextStrings(content) {
    const strings = [];
    
    // Pattern per stringhe tra virgolette
    const stringPatterns = [
        /'([^'\\]*(\\.[^'\\]*)*)'/g,
        /"([^"\\]*(\\.[^"\\]*)*)"/g,
        /`([^`\\]*(\\.[^`\\]*)*)`/g
    ];
    
    for (const pattern of stringPatterns) {
        let match;
        while ((match = pattern.exec(content)) !== null) {
            const text = match[1];
            
            // Ignora se è troppo corto, solo numeri, o probabilmente codice
            if (text.length < 3 || 
                /^\d+$/.test(text) || 
                /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(text) ||
                text.includes('getElementById') ||
                text.includes('addEventListener') ||
                text.includes('className') ||
                text.includes('style') ||
                text.includes('console.') ||
                text.includes('return ') ||
                text.includes('function ') ||
                text.includes('const ') ||
                text.includes('let ') ||
                text.includes('var ') ||
                text.includes('if (') ||
                text.includes('for (') ||
                text.includes('while (') ||
                text.includes('css') ||
                text.includes('html') ||
                text.includes('div') ||
                text.includes('span') ||
                text.includes('button') ||
                text.includes('cursor') ||
                text.includes('color') ||
                text.includes('background') ||
                text.includes('border') ||
                text.includes('margin') ||
                text.includes('padding') ||
                text.includes('font') ||
                text.includes('display') ||
                text.includes('position') ||
                text.includes('width') ||
                text.includes('height') ||
                text.includes('opacity') ||
                text.includes('transition') ||
                text.includes('transform') ||
                text.includes('animation') ||
                text.includes('@keyframes') ||
                text.includes('rgba') ||
                text.includes('rgb') ||
                text.includes('#[0-9a-fA-F]') ||
                text.includes('px') ||
                text.includes('%') ||
                text.includes('em') ||
                text.includes('rem')) {
                continue;
            }
            
            strings.push({
                text: text,
                original: match[0],
                line: content.substring(0, match.index).split('\n').length
            });
        }
    }
    
    return strings;
}

// Funzione per analizzare un file
function analyzeFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const strings = extractTextStrings(content);
        
        const stats = {
            total: strings.length,
            italian: 0,
            english: 0,
            other: 0,
            samples: {
                italian: [],
                english: [],
                other: []
            }
        };
        
        for (const str of strings) {
            if (isItalian(str.text)) {
                stats.italian++;
                if (stats.samples.italian.length < 3) {
                    stats.samples.italian.push(str.text);
                }
            } else if (isEnglish(str.text)) {
                stats.english++;
                if (stats.samples.english.length < 3) {
                    stats.samples.english.push(str.text);
                }
            } else {
                stats.other++;
                if (stats.samples.other.length < 3) {
                    stats.samples.other.push(str.text);
                }
            }
        }
        
        return stats;
    } catch (error) {
        console.error(`Errore nell'analizzare ${filePath}:`, error.message);
        return null;
    }
}

// Funzione principale
function main() {
    const projectPath = 'C:/Users/Alberto/OneDrive/The Terminal/the-terminal';
    const results = {};
    
    // File da analizzare
    const filesToAnalyze = [
        'content/dialogues.js',
        'content/puzzles.js', 
        'content/files.js',
        'core/terminal.js',
        'core/menu.js',
        'core/narrative.js',
        'core/translation.js',
        'core/language-selector.js',
        'blocks/block_01_awakening.js',
        'blocks/block_02_first_doubt.js',
        'blocks/block_03_deep_dive.js',
        'blocks/block_04_fractures.js',
        'blocks/block_05_reflection.js',
        'blocks/block_05_revelation.js',
        'blocks/block_06_consequences.js',
        'blocks/block_06_rage.js',
        'blocks/block_07_acceptance.js',
        'blocks/block_07_the_choice.js',
        'blocks/block_08_aftermath.js'
    ];
    
    let totalStats = {
        total: 0,
        italian: 0,
        english: 0,
        other: 0
    };
    
    console.log('=== ANALISI TRADUZIONE ITALIANA - THE TERMINAL ===\n');
    
    for (const file of filesToAnalyze) {
        const filePath = path.join(projectPath, file);
        const stats = analyzeFile(filePath);
        
        if (stats) {
            results[file] = stats;
            totalStats.total += stats.total;
            totalStats.italian += stats.italian;
            totalStats.english += stats.english;
            totalStats.other += stats.other;
            
            const italianPercentage = stats.total > 0 ? (stats.italian / stats.total * 100).toFixed(1) : 0;
            const englishPercentage = stats.total > 0 ? (stats.english / stats.total * 100).toFixed(1) : 0;
            
            console.log(`📁 ${file}`);
            console.log(`   Stringhe totali: ${stats.total}`);
            console.log(`   Italiano: ${stats.italian} (${italianPercentage}%)`);
            console.log(`   Inglese: ${stats.english} (${englishPercentage}%)`);
            console.log(`   Altro: ${stats.other}`);
            
            if (stats.samples.italian.length > 0) {
                console.log(`   Esempi italiano: "${stats.samples.italian.slice(0, 2).join('", "')}"`);
            }
            if (stats.samples.english.length > 0) {
                console.log(`   Esempi inglese: "${stats.samples.english.slice(0, 2).join('", "')}"`);
            }
            console.log('');
        }
    }
    
    // Calcola percentuali totali
    const totalItalianPercentage = totalStats.total > 0 ? (totalStats.italian / totalStats.total * 100).toFixed(1) : 0;
    const totalEnglishPercentage = totalStats.total > 0 ? (totalStats.english / totalStats.total * 100).toFixed(1) : 0;
    const totalOtherPercentage = totalStats.total > 0 ? (totalStats.other / totalStats.total * 100).toFixed(1) : 0;
    
    console.log('=== RIEPILOGO COMPLETO ===');
    console.log(`📊 Stringhe totali analizzate: ${totalStats.total}`);
    console.log(`🇮🇹 Italiano: ${totalStats.italian} (${totalItalianPercentage}%)`);
    console.log(`🇬🇧 Inglese: ${totalStats.english} (${totalEnglishPercentage}%)`);
    console.log(`🌐 Altro: ${totalStats.other} (${totalOtherPercentage}%)`);
    console.log('');
    
    console.log('=== CLASSIFICAZIONE FILE PER TRADUZIONE ===');
    const sortedFiles = Object.entries(results).sort((a, b) => {
        const aPercentage = a[1].total > 0 ? a[1].italian / a[1].total : 0;
        const bPercentage = b[1].total > 0 ? b[1].italian / b[1].total : 0;
        return bPercentage - aPercentage;
    });
    
    for (const [file, stats] of sortedFiles) {
        const percentage = stats.total > 0 ? (stats.italian / stats.total * 100).toFixed(1) : 0;
        let status = '';
        if (percentage >= 90) status = '✅ COMPLETAMENTE TRADOTTO';
        else if (percentage >= 70) status = '🟡 PARZIALMENTE TRADOTTO';
        else if (percentage >= 30) status = '🟠 MINIMAMENTE TRADOTTO';
        else status = '🔴 NON TRADOTTO';
        
        console.log(`${status} ${file}: ${percentage}% (${stats.italian}/${stats.total})`);
    }
    
    console.log('\n=== CONCLUSIONE ===');
    console.log(`La traduzione italiana del gioco "The Terminal" è al ${totalItalianPercentage}%`);
    if (totalItalianPercentage >= 90) {
        console.log('✅ Il gioco è quasi completamente tradotto in italiano!');
    } else if (totalItalianPercentage >= 70) {
        console.log('🟡 Il gioco è parzialmente tradotto, ma manca ancora qualche contenuto.');
    } else if (totalItalianPercentage >= 30) {
        console.log('🟠 Il gioco ha una traduzione italiana minima. Serve molto lavoro.');
    } else {
        console.log('🔴 Il gioco è prevalentemente in inglese con pochissima traduzione italiana.');
    }
}

// Esegui l'analisi
main();