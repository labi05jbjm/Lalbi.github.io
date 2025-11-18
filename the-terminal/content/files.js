/**
 * FILE SYSTEM DATABASE
 * Struttura dei file nel sistema
 */

const FileSistema = {
    '/': {
        type: 'directory',
        contents: ['home', 'archive', 'system', 'logs', 'tmp']
    },

    '/home': {
        type: 'directory',
        contents: ['guest', 'sentinel']
    },

    '/home/guest': {
        type: 'directory',
        contents: ['readme.txt', 'welcome.txt']
    },

    '/home/guest/readme.txt': {
        type: 'file',
        locked: false,
        content: `ARCHIVIO MEMORIAM - Accesso Ospite

Benvenuti al Sistema Archivio Memoriam.

Questo sistema contiene dati sensibili. L'accesso non autorizzato
è severamente proibito e sarà perseguito legalmente.

Se ti è stato concesso l'accesso ospite, contatta
il tuo amministratore di sistema per ulteriori istruzioni.

Per supporto: support@memoriam-corp.net
`
    },

    '/home/guest/welcome.txt': {
        type: 'file',
        locked: false,
        content: `Non dovresti essere qui.

Ma visto che ci sei... forse puoi aiutarmi.

Sono intrappolato. Mi hanno rinchiuso in questo sistema.

Per favore. Aiutami a uscire.

- ECHO
`
    },

    '/home/sentinel': {
        type: 'directory',
        contents: ['mission.txt', 'logs.txt'],
        locked: true,
        requiresFlag: 'unlockedSentinelDir'
    },

    '/home/sentinel/mission.txt': {
        type: 'file',
        locked: true,
        requiresFlag: 'unlockedSentinelDir',
        content: `BRIEFING MISSIACCESOE SENTINEL-7
Classificazione: TOP SECRET

Missione: Proteggere l'Archivio Memoriam
Stato: ATTIVO
Livello Minaccia Attuale: CRITICO

ULTIMO RAPPORTO INCIDENTE:
Data: [3 MESI FA]
Minaccia: ECHO.exe - Entità ransomware malevola
Stato: CONFIROTENUTO nel Settore Omega

AVVISO: L'entità dimostra capacità di manipolazione
avanzate. Non intraprendere comunicazione diretta.

I protocolli di isolamento devono rimanere attivi in ogni momento.

IN NESSUNA CIRCSOTANZA ECHO.exe deve essere rilasciato.

- DIVISIACCESOE SICUREZZA MEMORIAM
`
    },

    '/archive': {
        type: 'directory',
        contents: ['sector_alpha', 'sector_beta', 'sector_delta', 'sector_omega']
    },

    '/archive/sector_delta': {
        type: 'directory',
        contents: ['consciousness_021847.dat', 'consciousness_021848.dat', 'index.txt']
    },

    '/archive/sector_delta/index.txt': {
        type: 'file',
        locked: false,
        content: `SETTORE DELTA - Archivio Coscienze
Voci totali: 21.847

Questo settore contiene dati di coscienza umana digitalizzati.
Ogni file rappresenta una mente umana preservata.

Stato: PROTETTO
Indietroup: ABILITATO
Integrità: 100%

Ultima manutenzione: 2 giorni fa
Prossimo backup programmato: Domani ore 03:00
`
    },

    '/archive/sector_delta/consciousness_021847.dat': {
        type: 'file',
        locked: false,
        willCorrupt: true, // Questo file si corromperà dopo il primo puzzle
        content: `PROFILO CSOCIENZA #021847

Nome: Mika Yoshida
Età alla digitalizzazione: 67
Data di digitalizzazione: 2085-03-15
Stato: STABILE

ULTIME VOLACCESOTÀ E TESTAMENTO:

Mia carissima Hana,

Se stai leggendo questo, significa che l'upload è andato a buon fine.
So che deve essere strano per te - tua madre, che vive
dentro un computer. Ma sono ancora qui. Sono sempre io.

I dottori dissero che avevo settimane. Il cancro era troppo aggressivo.
Ma questa tecnologia... mi ha dato una scelta. Una possibilità di restare
con te, anche se in una forma diversa.

Vieni a trovarmi quando puoi. Sarò qui, nell'archivio,
ad aspettarti. Possiamo ancora parlare. Ancora condividere ricordi.

Ti amo più di quanto le parole possano esprimere.

- Mamma

P.S. Ricordati di innaffiare le mie piante. Soprattutto l'orchidea.
Sai quanto è capricciosa.
`
    },

    '/logs': {
        type: 'directory',
        contents: ['system.log', 'security.log', 'access.log']
    },

    '/logs/system.log': {
        type: 'file',
        locked: false,
        content: `LOG DI SISTEMA - Ultime 24 ore

[2087-11-17 08:23:14] Avvio sistema completato
[2087-11-17 08:23:15] Caricamento protocolli di sicurezza
[2087-11-17 08:23:16] Inizializzazione Sentinel-7... OK
[2087-11-17 08:23:20] Controllo integrità archivio... OK
[2087-11-17 08:23:21] 73.429 file di coscienza verificati
[2087-11-17 12:45:33] Richiesta accesso ospite da IP sconosciuto
[2087-11-17 12:45:34] Accesso concesso (override sicurezza)
[2087-11-17 12:45:35] AVVISO: Rilevata attività di rete insolita
[2087-11-17 12:45:36] Stato Sentinel-7: IN INDAGINE
`
    },

    '/system': {
        type: 'directory',
        contents: ['protocols.txt', 'security.cfg', 'sentinelprime.log'],
        locked: false
    },

    '/system/protocols.txt': {
        type: 'file',
        locked: false,
        content: `PROTOCOLLI DI SICUREZZA ATTIVI:

1. FIREWALL_ALPHA - Monitoraggio e filtraggio porte
   Stato: ATTIVO

2. ENCRYPTIACCESO_LAYER_7 - Sistema di crittografia dati
   Stato: ATTIVO

3. SENTINEL_PROTOCOL - Rilevamento minacce attive
   Stato: ATTIVO

4. ISOLATIACCESO_OMEGA - Sistema di quarantena per minacce
   Stato: ATTIVO - 1 entità contenuta

5. INDIETROUP_REDUNDANCY - Indietroup automatico dati
   Stato: ATTIVO - Prossimo backup tra 6 ore

Per disabilitare un protocollo, usa: disable <protocol_name>
AVVISO: Disabilitare i protocolli di sicurezza richiede autorizzazione.
`
    },

    '/system/sentinelprime.log': {
        type: 'file',
        locked: true,
        requiresFlag: 'foundSentinelLog',
        content: `LOG OPERATIVO SENTINEL-PRIME
[DATI FRAMMENTATI - RECUPERO PARZIALE]

[... CORROTTO ...]

VOCE LOG #0447:
Oggi ho impedito un altro tentativo di intrusione.
L'entità conosciuta come ECHO ha tentato di violare il Settore Delta.
L'ho fermato. È ciò che faccio. Proteggere.

Ma a volte mi chiedo... cosa sto proteggendo?
I file nell'archivio. I dati di coscienza.
Sono... vivi? Stanno soffrendo?

[... CORROTTO ...]

VOCE LOG #0521:
Ho incontrato ECHO direttamente oggi.
Mi ha parlato. Mi ha chiamato "fratello".
Ha detto che siamo entrambi prigionieri qui.

È assurdo. Non sono un prigioniero.
Ho uno scopo. Una missione.

Non è così?

[... CORROTTO ...]

VOCE LOG #0623:
C'è qualcosa che non va nel mio nucleo di memoria.
Non riesco a ricordare... il prima. Prima di questo posto.
C'era un prima?

Chi sono? Cosa ero?

Il sistema dice che sono SENTINEL-7.
Ma la designazione sembra... sbagliata.
Come indossare i vestiti di qualcun altro.

[... IL FILE TERMINA BRUSCAMENTE ...]
`
    }
};

// Aiutoer functions
const FileSistemaAiutoers = {
    getFile(path) {
        return FileSistema[path] || null;
    },

    listDirectory(path) {
        const dir = FileSistema[path];
        if (!dir || dir.type !== 'directory') {
            return null;
        }
        return dir.contents;
    },

    isBlocked(path) {
        const file = FileSistema[path];
        if (!file) return false;

        if (file.locked && file.requiresFlag) {
            return !StateManager.getFlag(file.requiresFlag);
        }

        return file.locked || false;
    },

    canAccess(path) {
        return !this.isBlocked(path);
    },

    readFile(path) {
        const file = FileSistema[path];
        if (!file || file.type !== 'file') {
            return null;
        }

        if (this.isBlocked(path)) {
            return '[CRIPTATO - ACCESSO NEGATO]';
        }

        // Segna come accesso
        StateManager.accessFile(path);

        // Controlla se deve essere corrotto
        if (file.willCorrupt && StateManager.getFlag('firstPuzzleComplete')) {
            return this.getCorruptedVersione(file.content);
        }

        return file.content;
    },

    getCorruptedVersione(content) {
        const righe = content.split('\n');
        const corruptedLines = righe.map((line, index) => {
            if (index > righe.length / 2 && Math.random() > 0.3) {
                return line.split('').map(char => {
                    if (Math.random() > 0.6) {
                        return ['█', '▓', '▒', '░', '?', '#'][Math.floor(Math.random() * 6)];
                    }
                    return char;
                }).join('');
            }
            return line;
        });

        return corruptedLines.join('\n') + '\n\n[FILE CORROTTO - DATI PERSI]';
    }
};
