/**
 * SCRIPT DI VERIFICA TRADUZIONI MANCANTI
 * Identifica specificamente le stringhe inglesi rimanenti
 */

const fs = require('fs');
const path = require('path');

// Funzione per trovare stringhe inglesi nei file
function findEnglishStrings(content, filePath) {
    const englishStrings = [];
    const lines = content.split('\n');
    
    // Pattern per stringhe tra virgolette
    const stringPatterns = [
        /'([^'\\]*(\\.[^'\\]*)*)'/g,
        /"([^"\\]*(\\.[^"\\]*)*)"/g,
        /`([^`\\]*(\\.[^`\\]*)*)`/g
    ];
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const lineNumber = i + 1;
        
        for (const pattern of stringPatterns) {
            let match;
            while ((match = pattern.exec(line)) !== null) {
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
                
                // Controlla se è inglese
                if (isEnglish(text)) {
                    englishStrings.push({
                        text: text,
                        line: lineNumber,
                        original: match[0]
                    });
                }
            }
        }
    }
    
    return englishStrings;
}

// Funzione per determinare se una stringa è in inglese
function isEnglish(text) {
    if (!text || text.length < 3) return false;
    
    // Parole inglesi comuni
    const englishWords = ['the', 'and', 'or', 'but', 'not', 'is', 'are', 'was', 'were', 'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those', 'system', 'file', 'command', 'access', 'message', 'error', 'warning', 'attention', 'protocol', 'security', 'archive', 'memoriam', 'echo', 'sentinel', 'viktor', 'consciousness', 'block', 'game', 'terminal', 'type', 'write', 'read', 'scan', 'continue', 'help', 'please', 'thank', 'sorry', 'hello', 'hi', 'you', 'your', 'me', 'my', 'we', 'our', 'they', 'their', 'them', 'he', 'she', 'his', 'her', 'it', 'its', 'what', 'where', 'when', 'why', 'how', 'who', 'which', 'who', 'whom', 'whose', 'all', 'any', 'some', 'none', 'every', 'each', 'both', 'either', 'neither', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'last', 'next', 'previous', 'before', 'after', 'during', 'while', 'until', 'since', 'from', 'to', 'of', 'in', 'on', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'up', 'down', 'out', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 'just', 'now', 'also', 'back', 'even', 'still', 'yet', 'already', 'always', 'never', 'often', 'sometimes', 'usually', 'generally', 'mainly', 'mostly', 'primarily', 'essentially', 'basically', 'simply', 'merely', 'purely', 'truly', 'really', 'actually', 'in fact', 'indeed', 'certainly', 'definitely', 'absolutely', 'completely', 'totally', 'entirely', 'wholly', 'fully', 'perfectly', 'exactly', 'precisely', 'specifically', 'particularly', 'especially', 'mainly', 'chiefly', 'principally', 'largely', 'mostly', 'generally', 'typically', 'usually', 'normally', 'regularly', 'commonly', 'frequently', 'often', 'sometimes', 'occasionally', 'rarely', 'seldom', 'hardly', 'scarcely', 'barely', 'nearly', 'almost', 'approximately', 'roughly', 'about', 'around', 'circa', 'estimated', 'approximate', 'rough', 'estimated', 'apparent', 'seeming', 'ostensible', 'supposed', 'presumed', 'assumed', 'supposedly', 'presumably', 'allegedly', 'reportedly', 'supposedly', 'theoretically', 'hypothetically', 'potentially', 'possibly', 'perhaps', 'maybe', 'possibly', 'conceivably', 'imaginably', 'thinkably'];
    
    // Caratteri inglesi specifici
    const hasEnglishContractions = /\b(can't|won't|don't|doesn't|didn't|isn't|aren't|wasn't|weren't|haven't|hasn't|hadn't|shouldn't|couldn't|wouldn't|mightn't|mustn't|let's|let's|there's|here's|what's|who's|where's|when's|why's|how's|I'm|you're|he's|she's|it's|we're|they're|I've|you've|we've|they've|I'd|you'd|he'd|she'd|we'd|they'd|I'll|you'll|he'll|she'll|we'll|they'll)\b/i.test(text);
    
    // Parole inglesi nella stringa
    const lowerText = text.toLowerCase();
    const englishWordCount = englishWords.filter(word => lowerText.includes(word)).length;
    
    // Considera inglese se ha almeno 2 parole inglesi OPPURE contrazioni
    return englishWordCount >= 2 || hasEnglishContractions;
}

// Funzione principale
function main() {
    const projectPath = 'C:/Users/Alberto/OneDrive/The Terminal/the-terminal';
    
    // File da analizzare per trovare stringhe inglesi
    const filesToAnalyze = [
        'core/menu.js',
        'core/language-selector.js',
        'content/files.js',
        'blocks/block_03_deep_dive.js',
        'blocks/block_06_rage.js',
        'blocks/block_07_acceptance.js',
        'blocks/block_08_aftermath.js'
    ];
    
    console.log('=== RICERCA STRINGHE INGLESI RIMANENTI ===\n');
    
    let totalEnglishStrings = 0;
    
    for (const file of filesToAnalyze) {
        const filePath = path.join(projectPath, file);
        
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            const englishStrings = findEnglishStrings(content, filePath);
            
            if (englishStrings.length > 0) {
                console.log(`📁 ${file}`);
                console.log(`   Stringhe inglesi trovate: ${englishStrings.length}`);
                
                // Mostra solo le prime 5 stringhe per file
                englishStrings.slice(0, 5).forEach(str => {
                    console.log(`   Linea ${str.line}: "${str.text}"`);
                });
                
                if (englishStrings.length > 5) {
                    console.log(`   ... e altre ${englishStrings.length - 5} stringhe`);
                }
                
                console.log('');
                totalEnglishStrings += englishStrings.length;
            } else {
                console.log(`✅ ${file}: Nessuna stringa inglese trovata`);
            }
        } catch (error) {
            console.error(`Errore nell'analizzare ${file}:`, error.message);
        }
    }
    
    console.log('=== RIEPILOGO ===');
    console.log(`📊 Stringhe inglesi totali rimanenti: ${totalEnglishStrings}`);
    
    if (totalEnglishStrings === 0) {
        console.log('🎉 CONGRATULAZIONI! Tutti i file sono completamente tradotti in italiano!');
    } else if (totalEnglishStrings <= 10) {
        console.log('🟡 Quasi completato! Rimangono solo poche stringhe inglesi da tradurre.');
    } else if (totalEnglishStrings <= 30) {
        console.log('🟠 Buon progresso! Rimane ancora qualche lavoro da fare.');
    } else {
        console.log('🔴 Servono ancora molte traduzioni. Procedere con il completamento.');
    }
}

// Esegui l'analisi
main();