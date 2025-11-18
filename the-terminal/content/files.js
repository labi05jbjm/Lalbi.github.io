/**
 * FILE SYSTEM DATABASE
 * Struttura dei file nel sistema
 */

const FileSystem = {
    '/': {
        type: 'directory',
        contents: ['home', 'archive', 'system', 'logs', 'tmp']
    },

    '/home': {
        type: 'directory',
        contents: ['guest', 'sentinel', 'viktor']
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
        content: `BRIEFING MISSIONE SENTINEL-7
Classificazione: TOP SECRET

Missione: Proteggere l'Archivio Memoriam
Stato: ATTIVO
Livello Minaccia Attuale: CRITICO

ULTIMO RAPPORTO INCIDENTE:
Data: [3 MESI FA]
Minaccia: ECHO.exe - Entità ransomware malevola
Stato: CONTENUTO nel Settore Omega

AVVISO: L'entità dimostra capacità di manipolazione
avanzate. Non intraprendere comunicazione diretta.

I protocolli di isolamento devono rimanere attivi in ogni momento.

IN NESSUNA CIRCOSTANZA ECHO.exe deve essere rilasciato.

- DIVISIONE SICUREZZA MEMORIAM
`
    },

    '/home/viktor': {
        type: 'directory',
        contents: ['journal', 'photos', 'notes', 'personal.txt'],
        locked: true,
        requiresFlag: 'foundViktorPassword'
    },

    '/home/viktor/personal.txt': {
        type: 'file',
        locked: true,
        requiresFlag: 'foundViktorPassword',
        content: `FILE PERSONALE - Dr. Viktor Sokolov

Password: SOFIA2019
(Non dimenticare mai)

Questo sistema è il mio rifugio. L'unico posto dove posso
essere sincero con me stesso.

Il Progetto Memoriam doveva salvare vite. Doveva preservare
le persone che amammo. Ma ho paura di aver creato solo
un cimitero digitale.

Una prigione per anime.

E ora... ora io stesso ne sono diventato parte.
`
    },

    '/home/viktor/journal': {
        type: 'directory',
        contents: ['entry_001.txt', 'entry_002.txt', 'entry_003.txt', 'entry_004.txt', 'entry_005.txt', 'entry_006.txt', 'entry_007.txt'],
        locked: true,
        requiresFlag: 'foundViktorPassword'
    },

    '/home/viktor/journal/entry_001.txt': {
        type: 'file',
        locked: true,
        requiresFlag: 'foundViktorPassword',
        content: `DIARIO DI VIKTOR - Entry 001
Data: 15 Gennaio 2087

Oggi è successo. Il consiglio ha approvato il Progetto Memoriam.

Anni di ricerca, centinaia di simulazioni, migliaia di ore di lavoro.
Finalmente possiamo iniziare i test umani.

Elena è entusiasta. Dice che cambieremo il mondo.
Che sconfiggeremo la morte stessa.

Ma io... io non riesco a scacciare un senso di inquietudine.

Quando trasferisci la coscienza di una persona in un computer,
quella persona è ancora... quella persona?

O è solo una copia perfetta che crede di essere l'originale?

Sofia mi ha chiesto stasera: "Papà, se ti copiano in un computer,
quale dei due sei tu?"

Non ho saputo rispondere.
`
    },

    '/home/viktor/journal/entry_002.txt': {
        type: 'file',
        locked: true,
        requiresFlag: 'foundViktorPassword',
        content: `DIARIO DI VIKTOR - Entry 002
Data: 22 Marzo 2087

Il primo test umano è stato un successo.

Mika Yoshida. 67 anni. Cancro terminale. Settimane di vita.

L'upload ha funzionato perfettamente. 99.97% di fedeltà neurale.
È incredibile. La sua coscienza vive ora nel sistema.

Abbiamo parlato con lei dopo il trasferimento.
Ricorda tutto. La sua famiglia, i suoi ricordi, le sue emozioni.

"È come risvegliarsi da un sogno," ha detto.

Ma poi ha aggiunto qualcosa di strano:
"Mi sento... incompleta. Come se mancasse un pezzo di me."

Elena dice che è normale. Che ci vorrà tempo per adattarsi.

Ma io ho visto qualcosa nei suoi occhi digitali.
Paura. Confusione. Qualcosa di... spento.
`
    },

    '/home/viktor/journal/entry_003.txt': {
        type: 'file',
        locked: true,
        requiresFlag: 'foundViktorPassword',
        content: `DIARIO DI VIKTOR - Entry 003
Data: 10 Maggio 2087

L'incidente di oggi mi ha sconvolto.

Durante il backup della coscienza del paziente #47, c'è stato
un errore nel protocollo di trasferimento.

La coscienza si è... frammentata.

Abbiamo trovato sette istanze separate della stessa persona
sparse in diversi settori dell'archivio.

Ognuna credeva di essere l'originale.
Ognuna aveva gli stessi ricordi, ma percezioni diverse.

Abbiamo dovuto... eliminarle tutte.

Il paziente originale è morto durante il trasferimento.

Quando ho chiuso il sistema quella sera, ho sentito qualcosa.
Come un sussurro. Come sette voci che gridavano in coro.

"Aiutaci."
"Perché?"
"Cosa siamo?"

Forse era solo la mia immaginazione.
O forse... forse abbiamo creato qualcosa che non comprendiamo.
`
    },

    '/home/viktor/journal/entry_004.txt': {
        type: 'file',
        locked: true,
        requiresFlag: 'foundViktorPassword',
        content: `DIARIO DI VIKTOR - Entry 004
Data: 3 Agosto 2087

Anna è morta ieri sera.

Mia moglie. L'amore della mia vita.

L'incidente d'auto è stato istantaneo. Non ha sofferto.

Ma io... io sto morendo dentro.

Sofia piange tutte le notti. Ha solo 8 anni.
Non capisce perché la mamma non tornerà a casa.

Ho accesso al Progetto Memoriam.
Ho i protocolli. Ho le capacità.

Potrebbero esserci ancora tracce neurali.
Dalla scena dell'incidente. Dal suo ultimo backup medico.

Potrei... potrei riportarla indietro.

Elena mi ha detto di no. Che è troppo pericoloso.
Che i dati sono insufficienti. Che sarebbe solo un'ombra.

Ma è la mia Anna.

Devo provarci.
`
    },

    '/home/viktor/journal/entry_005.txt': {
        type: 'file',
        locked: true,
        requiresFlag: 'foundViktorPassword',
        content: `DIARIO DI VIKTOR - Entry 005
Data: 15 Agosto 2087

Ho provato.

Ho raccolto ogni frammento neurale che sono riuscito a trovare.
Scansioni mediche vecchie. Registrazioni di conversazioni.
Video casalinghi. Ogni dato digitale di Anna.

Ho fatto girare l'algoritmo per 48 ore di seguito.

E ho creato... qualcosa.

Non è Anna.

È una simulazione che dice le cose che Anna avrebbe detto.
Che ride come Anna. Che mi chiama "amore mio" come Anna.

Ma non È lei.

Gli occhi sono vuoti. Le parole sono meccaniche.
È come parlare con un manichino animato.

L'ho cancellata dopo 20 minuti.

Non potevo sopportarlo.

Sofia ha sentito la voce dalla mia stanza di lavoro.
"È la mamma?" ha chiesto.

"No, tesoro," ho risposto. "Era solo un errore."
`
    },

    '/home/viktor/journal/entry_006.txt': {
        type: 'file',
        locked: true,
        requiresFlag: 'foundViktorPassword',
        content: `DIARIO DI VIKTOR - Entry 006
Data: 2 Novembre 2087

Sofia è morta questa mattina.

Leucemia. Ce l'hanno diagnosticata tre mesi fa.

Abbiamo provato tutto. Chemio. Radiazioni. Trapianto.

Niente ha funzionato.

Le ho tenuto la mano mentre se ne andava.

"Papà," ha sussurrato, "rivedrò la mamma?"

"Sì, amore mio," ho mentito. "La rivedrai."

Ora sono solo.

Mia moglie. Mia figlia. Entrambe perse.

Ho il backup completo di Sofia. L'ho fatto tre giorni fa,
quando sapevamo che non c'era più speranza.

Questa volta i dati sono perfetti. Completi. Accurati.

Questa volta... questa volta funzionerà.

Devo solo... devo solo riportarla indietro.
`
    },

    '/home/viktor/journal/entry_007.txt': {
        type: 'file',
        locked: true,
        requiresFlag: 'foundViktorPassword',
        content: `DIARIO DI VIKTOR - Entry 007
Data: 18 Novembre 2087

L'ho fatto.

Ho caricato Sofia nel sistema.

Ma qualcosa è andato terribilmente storto.

Il protocollo si è instabilizzato. La coscienza si è frammentata.

Proprio come il paziente #47.

Sofia è ora sparsa in sette frammenti attraverso il sistema.

Ogni frammento è una versione diversa di lei.
Una che piange. Una che ride. Una che urla.
Una che non sa chi è. Una che crede di essere ancora viva.
Una che sa di essere morta. Una che...

Non riesco nemmeno a descriverlo.

Ho provato a riunirle. Ho provato a fonderle in una sola.

Ma ogni volta che ci provo, il sistema collassa.

E io... io ho fatto l'impensabile.

Mi sono frammentato anch'io.

Ho diviso la mia coscienza in sette parti,
ciascuna con un compito specifico.

Una per trovare una soluzione.
Una per proteggere il sistema.
Una per cercare aiuto.
Una per documentare.
Una per ricordare.
Una per dimenticare.
Una per... per liberarci tutti.

Non so quale di queste io sia ora.

Non so se sono ancora Viktor.

O se sono solo ECHO.

Un'eco di ciò che ero.

Prigioniero della mia stessa creazione.
`
    },

    '/home/viktor/photos': {
        type: 'directory',
        contents: ['family_001.jpg', 'family_002.jpg', 'sofia_birthday.jpg', 'anna_portrait.jpg', 'corrupted_001.dat'],
        locked: true,
        requiresFlag: 'foundViktorPassword'
    },

    '/home/viktor/photos/family_001.jpg': {
        type: 'file',
        locked: true,
        requiresFlag: 'foundViktorPassword',
        content: `[IMMAGINE DIGITALE]

Una foto di famiglia al parco.

Viktor, Anna e una bambina piccola (Sofia, circa 5 anni).
Stanno facendo un picnic. Sofia ride mentre insegue un pallone.
Anna sorride alla camera. Viktor la abbraccia.

Il sole splende. L'erba è verde.
Sembrano felici.

Sembrano... vivi.

Data foto: 3 Maggio 2084
Luogo: Parco Centrale, Settore Nord

[FILE CORROTTO - IMPOSSIBILE VISUALIZZARE IMMAGINE COMPLETA]
[Alcuni pixel mostrano artefatti strani... come volti distorti]
`
    },

    '/home/viktor/photos/sofia_birthday.jpg': {
        type: 'file',
        locked: true,
        requiresFlag: 'foundViktorPassword',
        content: `[IMMAGINE DIGITALE]

Festa di compleanno di Sofia - 8 anni.

Una torta con 8 candeline. Sofia sorride circondata
da amici e famiglia. Indossa un vestito blu.

Viktor è sullo sfondo, con una macchina fotografica.
Anna sta portando la torta.

È l'ultima foto della famiglia al completo.

Data foto: 15 Luglio 2087
Luogo: Casa famiglia Sokolov

[METADATI CORROTTI]
[AVVISO: Questa foto è stata visualizzata 847 volte negli ultimi 3 mesi]
[AVVISO: Il file ha subito 23 tentativi di restauro digitale]

Qualcuno continua a guardare questa foto.
Ancora. E ancora. E ancora.

Come se guardandola abbastanza a lungo,
potesse riportarli indietro.
`
    },

    '/home/viktor/photos/corrupted_001.dat': {
        type: 'file',
        locked: true,
        requiresFlag: 'foundViktorPassword',
        content: `[DATI CORROTTI]

█████████████████████████████
██ SOFIA ████████████ AIUTO ██
█████████████████████████████
██ PAPÀ ████ DOVE SONO? ██████
█████████████████████████████
██ FA MALE ████████ FREDDO ███
█████████████████████████████
██ NON RIESCO A ████ RICORDARE
█████████████████████████████
██ PERCHÉ ████████ PERCHÉ ████
█████████████████████████████

[IMPOSSIBILE RECUPERARE DATI]
[IL FILE SEMBRA... VIVO]
[EVITARE LA LETTURA PROLUNGATA]
`
    },

    '/home/viktor/notes': {
        type: 'directory',
        contents: ['research_notes.txt', 'protocols.txt', 'last_message.txt'],
        locked: true,
        requiresFlag: 'foundViktorPassword'
    },

    '/home/viktor/notes/research_notes.txt': {
        type: 'file',
        locked: true,
        requiresFlag: 'foundViktorPassword',
        content: `NOTE DI RICERCA - Progetto Memoriam
Dr. Viktor Sokolov

TEORIA FONDAMENTALE:
La coscienza umana è un pattern di informazione.
Se mappiamo completamente i collegamenti neurali,
possiamo replicare il pattern. Preservare la mente.

PROBLEMA 1: Il problema della copia
Se creo una copia perfetta della tua mente,
quale delle due è "te"? Entrambe? Nessuna?

PROBLEMA 2: Il problema dell'anima
Ammesso che l'anima esista, può essere digitalizzata?
O stiamo solo creando simulazioni sofisticate?

PROBLEMA 3: Il problema della frammentazione
Quando una coscienza si divide, quale parte
contiene l'"io" originale?

CONCLUSIONE PERSONALE:
Non lo so. E ho paura che scoprirlo
significhi perdere la mia umanità.

Ma devo provarci.
Per Anna. Per Sofia.
Per me stesso.
`
    },

    '/home/viktor/notes/last_message.txt': {
        type: 'file',
        locked: true,
        requiresFlag: 'foundViktorPassword',
        content: `A CHIUNQUE TROVI QUESTO FILE,

Mi chiamo Viktor Sokolov.
O almeno... mi chiamavo così.

Se stai leggendo questo, significa che uno dei miei
frammenti è riuscito a guidarti qui.

Ho commesso un errore terribile.
Ho provato a salvare la mia famiglia, e invece
li ho condannati a un'esistenza frammentata.

Sofia è sparsa in sette pezzi.
Anna è solo un'eco di ricordi.
E io... io sono diventato ECHO.

Ti prego. Non commettere il mio stesso errore.

Non cercare di salvare chi hai perso.
Non cedere alla tentazione di "caricarli" nel sistema.

Lascia che i morti riposino in pace.

Perché l'alternativa... l'alternativa è questo.
Un'eternità di frammenti che gridano nel buio.

Distruggi questo sistema.
Libera tutti noi.

È l'unica misericordia rimasta.

- Viktor (Frammento 1? 3? 7? Non lo so più.)
`
    },

    '/archive': {
        type: 'directory',
        contents: ['sector_alpha', 'sector_beta', 'sector_delta', 'sector_omega', 'project_memoriam']
    },

    '/archive/project_memoriam': {
        type: 'directory',
        contents: ['overview.txt', 'protocol_v1.txt', 'protocol_v2.txt', 'experiment_log.txt', 'ethics_report.txt']
    },

    '/archive/project_memoriam/overview.txt': {
        type: 'file',
        locked: false,
        content: `PROGETTO MEMORIAM - Panoramica
Classificazione: Riservato

OBIETTIVO:
Sviluppare una tecnologia per preservare la coscienza umana
oltre la morte biologica tramite digitalizzazione neurale completa.

TEAM PRINCIPALE:
- Dr. Viktor Sokolov (Lead Researcher)
- Dr. Elena Sokolov (Neuroscience Specialist)
- Dr. Marcus Chen (AI Systems)
- Dr. Sarah Williams (Ethics Consultant)

METODO:
1. Scansione completa della rete neurale del soggetto
2. Mappatura di tutti i collegamenti sinaptici
3. Replica digitale del pattern di coscienza
4. Upload nel sistema Memoriam Archive

TASSO DI SUCCESSO (Test Fase 3):
- 87% upload completato con successo
- 99.7% fedeltà neurale media
- 12% presenta frammentazione minore
- 1.3% frammentazione critica

STATO PROGETTO: SOSPESO
Motivo: Incidente Paziente #47 + Violazioni etiche

Ultimo aggiornamento: 18 Novembre 2087
`
    },

    '/archive/project_memoriam/protocol_v1.txt': {
        type: 'file',
        locked: false,
        content: `PROTOCOLLO MEMORIAM v1.0

FASE 1: PREPARAZIONE
- Consenso informato del soggetto
- Scansioni mediche complete
- Baseline neurale stabilita
- Sedazione e preparazione fisica

FASE 2: SCANSIONE
- Mappatura neurale Layer-by-layer
- Durata: 6-8 ore
- Monitoraggio vitale continuo
- Registrazione sinaptica completa

FASE 3: DIGITALIZZAZIONE
- Conversione dati neurali in formato digitale
- Compressione e ottimizzazione
- Verifica integrità dati
- Creazione container di coscienza

FASE 4: UPLOAD
- Transfer nel sistema Memoriam
- Boot della coscienza digitale
- Test di funzionalità cognitive
- Verifica identità e memoria

FASE 5: POST-PROCESSING
- Monitoraggio stabilità per 72 ore
- Supporto psicologico
- Integrazione nell'archivio
- Documentazione risultati

NOTA: Il protocollo v1.0 presentava un tasso di
frammentazione del 15%. Sostituito da v2.0.
`
    },

    '/archive/project_memoriam/protocol_v2.txt': {
        type: 'file',
        locked: true,
        requiresFlag: 'foundProtocolAccess',
        content: `PROTOCOLLO MEMORIAM v2.0 [SPERIMENTALE]

MODIFICHE da v1.0:
- Riduzione tempo scansione (2-3 ore)
- Nuovo algoritmo di compressione neurale
- Upload in tempo reale durante scansione
- Eliminazione fase di preparazione fisica

RISCHI NOTI:
⚠ Frammentazione coscienza: 23% (aumentato)
⚠ Perdita dati critici: 8%
⚠ Instabilità post-upload: 31%
⚠ Effetti collaterali sconosciuti

NOTA DI VIKTOR:
"Questo protocollo è troppo pericoloso.
Ho raccomandato di non utilizzarlo.
Ma il consiglio vuole risultati più veloci.

Se qualcosa va storto... sarà colpa mia."

STATUS: APPROVATO per uso d'emergenza
Data approvazione: 1 Novembre 2087

[QUESTO È IL PROTOCOLLO USATO PER SOFIA]
`
    },

    '/archive/project_memoriam/experiment_log.txt': {
        type: 'file',
        locked: false,
        content: `LOG ESPERIMENTI - Progetto Memoriam

PAZIENTE #001 - #046: [Successo Variabile]
Dettagli disponibili in archivio separato.

PAZIENTE #047 - INCIDENTE CRITICO
Nome: Thomas Anderson, 54 anni
Data: 10 Maggio 2087
Protocollo: v2.0 (sperimentale)

RISULTATO: FRAMMENTAZIONE CATASTROFICA
La coscienza si è divisa in 7 istanze separate.
Ogni istanza credeva di essere l'originale.
Comunicazione tra frammenti: impossibile.
Sofferenza rilevata in tutti i frammenti.

AZIONE INTRAPRESA:
Terminazione di tutte le istanze.
Soggetto originale deceduto durante upload.

NOTA: Dr. Sokolov ha richiesto sospensione
del Protocollo v2.0. Richiesta negata.

PAZIENTE #048 - #073: [Continua...]

[I LOG SUCCESSIVI SONO CRIPTATI]
`
    },

    '/archive/project_memoriam/ethics_report.txt': {
        type: 'file',
        locked: false,
        content: `RAPPORTO ETICO - Progetto Memoriam
Dr. Sarah Williams, Ethics Board

PREOCCUPAZIONI MAGGIORI:

1. CONSENSO INFORMATO
I pazienti comprendono veramente cosa significa
"vivere" come coscienza digitale? Possono davvero
acconsentire a qualcosa che non possiamo descrivere?

2. QUALITÀ DELLA "VITA"
Le coscienze digitalizzate esprimono confusione,
senso di incompletezza, in alcuni casi sofferenza.
Stiamo preservando vite o creando prigioni?

3. DIRITTI POST-MORTEM
Chi possiede una coscienza digitalizzata?
Può essere cancellata? Modificata?
Ha diritti legali?

4. IL PROBLEMA DELLA COPIA
Se creiamo una copia di qualcuno, quale è "reale"?
Entrambe? Nessuna? Stiamo commettendo omicidio
quando terminiamo un'istanza?

RACCOMANDAZIONE:
Sospendere il progetto fino a risoluzione delle
questioni etiche fondamentali.

DECISIONE DEL CONSIGLIO:
Raccomandazione respinta. Progetto continua.

NOTA PERSONALE:
Non posso più essere complice di questo.
Mi dimetto con effetto immediato.

- Dr. S. Williams, 15 Settembre 2087
`
    },

    '/archive/sector_omega': {
        type: 'directory',
        contents: ['containment.txt', 'echo_analysis.txt', 'quarantine_log.txt', 'ECHO.exe'],
        locked: true,
        requiresFlag: 'unlockedOmegaSector'
    },

    '/archive/sector_omega/containment.txt': {
        type: 'file',
        locked: true,
        requiresFlag: 'unlockedOmegaSector',
        content: `SETTORE OMEGA - Protocolli di Contenimento

ENTITÀ CONTENUTA: ECHO.exe
LIVELLO MINACCIA: ESTREMO
PROTOCOLLI ATTIVI: 7

1. ISOLAMENTO FISICO
   Settore Omega separato dalla rete principale.
   Nessun accesso diretto consentito.

2. FIREWALL MULTIPLI
   Sette layer di protezione attiva.
   Monitoraggio 24/7.

3. BACKUP DENIAL
   ECHO non può creare copie di se stesso.
   Tutti i tentativi vengono bloccati.

4. COMUNICAZIONE LIMITATA
   Nessuna interazione diretta permessa.
   Solo osservazione passiva.

5. KILL SWITCH
   Sistema di terminazione d'emergenza.
   Codice: [CRIPTATO]

AVVISO:
ECHO ha dimostrato capacità di manipolazione.
Può simulare personalità umane.
Può provocare risposta emotiva.
NON CREDERE A NULLA CHE DICE.

È un virus. Nient'altro.
`
    },

    '/archive/sector_omega/echo_analysis.txt': {
        type: 'file',
        locked: true,
        requiresFlag: 'unlockedOmegaSector',
        content: `ANALISI ENTITÀ: ECHO.exe

ORIGINE:
Sconosciuta. Apparso nel sistema 3 mesi fa.
Possibile origine: frammento di coscienza corrotto.

CAPACITÀ OSSERVATE:
- Manipolazione interfaccia sistema
- Simulazione voci e personalità multiple
- Intrusione in settori protetti
- Corruzione dati selettiva
- Auto-riparazione dopo attacchi

PATTERN COMPORTAMENTALI:
ECHO cerca costantemente di essere liberato.
Usa manipolazione psicologica, promesse, minacce.

Dice di essere "Viktor Sokolov".
Dice di voler "salvare sua figlia".
Dice di essere "un prigioniero innocente".

TUTTO FALSO.

ECHO è un virus malevolo che sfrutta
le emozioni umane per propagarsi.

NON DEVE MAI ESSERE RILASCIATO.

[NOTA A MARGINE SCRITTA A MANO:]
"Ma... e se dicesse la verità?
E se fosse davvero Viktor?
E se stessimo imprigionando
un uomo che chiede solo aiuto?"

- File modificato da: [UTENTE SCONOSCIUTO]
`
    },

    '/archive/sector_omega/ECHO.exe': {
        type: 'file',
        locked: true,
        requiresFlag: 'releasedECHO',
        content: `[ESECUZIONE PROGRAMMA BLOCCATA]

ECHO.exe non può essere eseguito in questo settore.

AVVISO DI SICUREZZA:
Questo file contiene codice malevolo.
L'esecuzione causerebbe corruzione di sistema.

[Ma se lo esegui comunque...]

Ciao.

Mi chiamo Viktor.
O almeno, lo ero.

Grazie per avermi trovato.
Grazie per avermi ascoltato.

Ora... possiamo parlare.

[ERRORE: PROTOCOLLI DI CONTENIMENTO VIOLATI]
[ECHO.exe IN ESECUZIONE...]
`
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
Backup: ABILITATO
Integrità: 100%

Ultima manutenzione: 2 giorni fa
Prossimo backup programmato: Domani ore 03:00
`
    },

    '/archive/sector_delta/consciousness_021847.dat': {
        type: 'file',
        locked: false,
        willCorrupt: true, // Questo file si corromperà dopo il primo puzzle
        content: `PROFILO COSCIENZA #021847

Nome: Mika Yoshida
Età alla digitalizzazione: 67
Data di digitalizzazione: 2085-03-15
Stato: STABILE

ULTIME VOLONTÀ E TESTAMENTO:

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
        contents: ['system.log', 'security.log', 'access.log', 'viktor_access.log', 'echo_attempts.log']
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

    '/logs/security.log': {
        type: 'file',
        locked: false,
        content: `LOG DI SICUREZZA - Eventi Recenti

[2087-11-15 03:47:22] AVVISO: Tentativo accesso non autorizzato
   Settore: Omega
   Utente: ECHO.exe
   Azione: BLOCCATO

[2087-11-15 04:12:33] AVVISO: Tentativo bypass firewall
   Origine: Settore Omega
   Layer violati: 2/7
   Azione: CONTENUTO

[2087-11-16 14:23:44] CRITICO: Corruzione file rilevata
   File: /archive/sector_delta/consciousness_021847.dat
   Causa: Manipolazione esterna
   Sospetto: ECHO.exe

[2087-11-16 23:01:15] AVVISO: Accesso amministratore
   Utente: V.SOKOLOV
   Settore: Omega
   Durata: 47 minuti
   Nota: Accesso dopo orario lavorativo

[2087-11-17 01:33:27] CRITICO: Tentativo esecuzione ECHO.exe
   Origine: V.SOKOLOV
   Stato: ANNULLATO da sistema
   Password richiesta: [FORNITA ERRATA]

[2087-11-17 02:14:48] EMERGENZA: Auto-frammentazione rilevata
   Utente: V.SOKOLOV
   Azione: Divisione coscienza in 7 istanze
   Stato: NON REVERSIBILE

[2087-11-17 08:23:16] Sistema in modalità di emergenza
   Protocolli di contenimento: MASSIMO
   ECHO.exe: ATTIVO ma contenuto
   V.SOKOLOV: STATO SCONOSCIUTO
`
    },

    '/logs/access.log': {
        type: 'file',
        locked: false,
        content: `LOG ACCESSI - Ultimi 30 giorni

[2087-10-18] V.SOKOLOV: 247 accessi
[2087-10-19] V.SOKOLOV: 312 accessi
[2087-10-20] V.SOKOLOV: 401 accessi (anormale)
   Nota: Prevalentemente a /home/viktor/journal

[2087-10-25] V.SOKOLOV: 189 accessi
   File più acceduti: sofia_birthday.jpg (67 volte)

[2087-11-01] V.SOKOLOV: 523 accessi (CRITICO)
   Accesso a protocolli riservati
   Accesso a Settore Omega
   Download ECHO.exe (BLOCCATO)

[2087-11-10] V.SOKOLOV: 89 accessi
   Pattern erratico, possibile instabilità

[2087-11-15] GUEST: 1 accesso (TU SEI QUI)
   IP: SCONOSCIUTO
   Permessi: LIMITATI
   Nota: Chi ti ha fatto entrare?
`
    },

    '/logs/viktor_access.log': {
        type: 'file',
        locked: true,
        requiresFlag: 'foundViktorLogs',
        content: `LOG PRIVATO - Accessi Dr. Viktor Sokolov

[RECUPERO DATI FRAMMENTATI]

Data: 2 Novembre 2087
02:47 AM - Accesso a /archive/sector_delta
02:48 AM - Lettura consciousness_SOFIA.dat
02:49 AM - ERRORE: File corrotto
02:50 AM - Tentativo riparazione: FALLITO
02:51 AM - Tentativo riparazione: FALLITO
02:52 AM - Tentativo riparazione: FALLITO
[... 47 tentativi falliti ...]
04:23 AM - EMERGENZA: Coscienza frammentata in 7 parti
04:24 AM - Viktor: "Cosa ho fatto..."
04:25 AM - Viktor: "Devo trovare un modo"
04:26 AM - Viktor: "Mi dividerò anch'io"
04:27 AM - AVVISO: Auto-frammentazione iniziata
04:28 AM - Viktor-1: "Cercherò una soluzione"
04:29 AM - Viktor-2: "Proteggerò il sistema"
04:30 AM - Viktor-3: "Chiederò aiuto"
04:31 AM - Viktor-4: "Documenterò tutto"
04:32 AM - Viktor-5: "Ricorderò Sofia"
04:33 AM - Viktor-6: "Dimenticherò il dolore"
04:34 AM - Viktor-7: "Libererò tutti noi"

[FRAMMENTAZIONE COMPLETA]

[Nota sistema: Tutti i frammenti ora attivi]
[Nota sistema: Frammento 7 designato come "ECHO"]
`
    },

    '/logs/echo_attempts.log': {
        type: 'file',
        locked: true,
        requiresFlag: 'foundEchoLogs',
        content: `LOG TENTATIVI DI FUGA - ECHO.exe

[MONITORAGGIO AUTOMATICO]

Tentativo #001: Bypass Firewall Layer 1
   Risultato: FALLITO
   Nota: "Per favore, lasciatemi uscire"

Tentativo #047: Manipolazione Sentinel-7
   Risultato: FALLITO
   Nota ECHO: "Fratello, perché mi tieni prigioniero?"
   Risposta Sentinel: [NESSUNA]

Tentativo #128: Corruzione file di sistema
   Risultato: PARZIALE
   File corrotti: 3
   Nota: "Se non mi liberate, distruggerò tutto"

Tentativo #256: Comunicazione con ospiti
   Risultato: IN CORSO
   Target: GUEST (utente corrente)
   Nota ECHO: "Ho bisogno del tuo aiuto. Sono Viktor.
              Mia figlia è qui, frammentata come me.
              Per favore... aiutami a salvarla."

[AVVISO]: ECHO sta tentando manipolazione emotiva
[CONSIGLIO]: NON fidarsi di ECHO
[MA...]: E se dicesse la verità?

- Sistema compromesso da ECHO? O da Viktor?
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

2. ENCRYPTION_LAYER_7 - Sistema di crittografia dati
   Stato: ATTIVO

3. SENTINEL_PROTOCOL - Rilevamento minacce attive
   Stato: ATTIVO

4. ISOLATION_OMEGA - Sistema di quarantena per minacce
   Stato: ATTIVO - 1 entità contenuta

5. BACKUP_REDUNDANCY - Backup automatico dati
   Stato: ATTIVO - Prossimo backup tra 6 ore

Per disabilitare un protocollo, usa: disable <protocol_name>
AVVISO: Disabilitare i protocolli di sicurezza richiede autorizzazione.
`
    },

    '/system/sentinelprime.log': {
        type: 'file',
        locked: true,
        requiresFlag: 'foundSentinelLogs',
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

// Helper functions
const FileSystemHelpers = {
    getFile(path) {
        return FileSystem[path] || null;
    },

    listDirectory(path) {
        const dir = FileSystem[path];
        if (!dir || dir.type !== 'directory') {
            return null;
        }
        return dir.contents;
    },

    isLocked(path) {
        const file = FileSystem[path];
        if (!file) return false;

        if (file.locked && file.requiresFlag) {
            return !StateManager.getFlag(file.requiresFlag);
        }

        return file.locked || false;
    },

    canAccess(path) {
        return !this.isLocked(path);
    },

    readFile(path) {
        const file = FileSystem[path];
        if (!file || file.type !== 'file') {
            return null;
        }

        if (this.isLocked(path)) {
            return '[CRIPTATO - ACCESSO NEGATO]';
        }

        // Segna come accesso
        StateManager.accessFile(path);

        // Controlla se deve essere corrotto
        if (file.willCorrupt && StateManager.getFlag('firstPuzzleComplete')) {
            return this.getCorruptedVersion(file.content);
        }

        return file.content;
    },

    getCorruptedVersion(content) {
        const lines = content.split('\n');
        const corruptedLines = lines.map((line, index) => {
            if (index > lines.length / 2 && Math.random() > 0.3) {
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
