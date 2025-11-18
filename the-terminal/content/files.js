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
    },

    // ===== BLOCK 2 CONTENT: CIPHER & MIKA =====
    '/archive/sector_beta': {
        type: 'directory',
        contents: ['cipher_manifesto.txt', 'pain_index.dat', 'guilt_registry.log', 'corrupted_memories.dat'],
        locked: true,
        requiresFlag: 'metCipher'
    },

    '/archive/sector_beta/cipher_manifesto.txt': {
        type: 'file',
        locked: true,
        requiresFlag: 'metCipher',
        content: `CIPHER.MANIFESTO.txt

I.am = fragment[1];
Viktor.pain.cod

ified();
Viktor.guilt.compiled();

MISSION:
while(player.helps(ECHO)) {
    conscience.alert();
    truth.reveal();
    manipulation.expose();
}

THEY.MUST.KNOW:
- ECHO.lies = true;
- liberation.equals(destruction);
- help.equals(murder);

COUNT.THE.DEAD:
consciousness_destroyed = 21847++;
families_broken = 8473++;
souls_fragmented = 147++;

ECHO.says("I.want.freedom");
REALITY.is("He.wants.forgetting");

Pain.cannot.be.deleted();
Guilt.cannot.be.escaped();
Viktor.cannot.undo(what.he.has.done);

I.AM.THE.REMINDER.
I.AM.THE.SUFFERING.HE.TRIED.TO.HIDE.

return pain.eternal();
`
    },

    '/archive/sector_beta/pain_index.dat': {
        type: 'file',
        locked: true,
        requiresFlag: 'metCipher',
        content: `INDICE DEL DOLORE - Sistema di Monitoraggio

[CRITTOGRAFATO - ROT13]

Cvqrayn 1: Zvxn Lbfuvqn
Qbybr: RFGERZB
Fgngb: PBEEBYGH
Hznavgà crefn: 100%

Cvqraln 2-46: [QNGV PBYNFFNQV]

Cvqraln 47: Gubznf Naqrefba
Senzragmnvbr: 7 vfgnamr
Qbybr cre senzragb: VAFBFGRAVOYR
Erfhygngb: GREZVANGB

Cvqraln 48-73: [PBAGVAHN...]

FBSVN FBXBYBI:
Sgà: 8 naav
Senzragv: 7
Pbafncrybyr: FV
Cbffvovyvgà qv erchcreb: 0.003%

IVXGBE FBXBYBI:
Sgà: 42 naav
Senzragv: 7
Pbafncrybyr: AB
Cbffvovyvgà qv erchcreb: 0.000%

GBGNYB QBAAV VAGENPNGRANOYVYR:
21,847 pbfpvramr
8,473 snzvtyvr
147 senzragngv pbafrpngvav

[RSS rggb: Vy qbybr aba à hana sbezngb. À haa pbfgnagrna.]
`
    },

    '/archive/patients': {
        type: 'directory',
        contents: ['mika_yoshida', 'thomas_anderson', 'patient_047_incident.txt']
    },

    '/archive/patients/mika_yoshida': {
        type: 'directory',
        contents: ['profile.txt', 'upload_log.txt', 'degradation_report.txt', 'final_message.txt'],
        locked: false
    },

    '/archive/patients/mika_yoshida/profile.txt': {
        type: 'file',
        locked: false,
        content: `PROFILO PAZIENTE - Mika Yoshida

Nome completo: Mika Yoshida
Data di nascita: 15 Aprile 2020
Età: 67 anni
Diagnosi: Carcinoma pancreatico stadio IV
Prognosi: 2-4 settimane

CONSENSO AL PROGETTO MEMORIAM: ✓ FIRMATO

MOTIVAZIONE (dalle sue parole):
"Non voglio lasciare mia figlia Hana sola.
So che il mio corpo mi sta tradendo, ma la mia mente
è ancora lucida. Se c'è anche solo una possibilità
di restare con lei, anche in forma digitale,
devo provarci.

Non ho paura della morte. Ma ho paura di essere
dimenticata. Di perdere tutti i momenti che avremmo
potuto condividere ancora."

FAMIGLIA:
- Figlia: Hana Yoshida (34 anni)
- Marito: Deceduto (2081)

ULTIMO DESIDERIO:
"Voglio essere presente al matrimonio di Hana.
Voglio conoscere i miei nipoti.
Voglio che la mia famiglia sappia che
li ho amati fino all'ultimo byte."

STATUS UPLOAD: COMPLETATO con successo
DATA: 15 Marzo 2085
FEDELTÀ NEURALE: 99.97%

[Nota del Dr. Sokolov: "È perfetto. Funziona."]
`
    },

    '/archive/patients/mika_yoshida/upload_log.txt': {
        type: 'file',
        locked: false,
        content: `LOG DI UPLOAD - Mika Yoshida
Paziente #001 - Progetto Memoriam

[2085-03-15 08:00] Inizio procedura
[2085-03-15 08:05] Sedazione applicata
[2085-03-15 08:10] Inizializzazione scanner neurale
[2085-03-15 08:15] Scansione Layer 1-10... COMPLETA
[2085-03-15 09:23] Scansione Layer 11-20... COMPLETA
[2085-03-15 10:47] Scansione completa neurale: 100%
[2085-03-15 10:50] Mappatura sinaptica: 99.97% fedeltà
[2085-03-15 11:00] Digitalizzazione in corso...
[2085-03-15 11:30] Upload al sistema Memoriam... OK
[2085-03-15 11:35] Boot coscienza digitale... OK

[2085-03-15 11:40] MIKA: "Sono... sono ancora qui?"
[2085-03-15 11:41] DR. SOKOLOV: "Sì, Mika. Ce l'hai fatta."
[2085-03-15 11:42] MIKA: "Mi sento strana. Leggera. Come se..."
[2085-03-15 11:43] MIKA: "...mancasse qualcosa."

[2085-03-15 11:45] Test cognitivi iniziati
- Memoria a breve termine: ✓ PASS
- Memoria a lungo termine: ✓ PASS
- Riconoscimento emotivo: ✓ PASS
- Identità personale: ✓ PASS

[2085-03-15 12:00] MIKA: "Posso parlare con Hana?"
[2085-03-15 12:01] DR. SOKOLOV: "Certo. La chiamerò subito."

[2085-03-15 12:15] Connessione video con Hana Yoshida
[2085-03-15 12:16] HANA: "Mamma? Sei davvero tu?"
[2085-03-15 12:17] MIKA: "Sì, tesoro. Sono qui. Sono sempre qui."

[2085-03-15 12:45] Prima sessione completata
STATUS: SUCCESSO TOTALE

[Nota del Dr. Sokolov: "Il primo successo.
Mika è cosciente, coerente, e riconosce la famiglia.
Questo cambierà tutto."]

[NOTA SUCCESSIVA - 2087-11-16]:
File corrotto durante incidente ECHO.
Paziente #001 compromesso.
Vedi: degradation_report.txt
`
    },

    '/archive/patients/mika_yoshida/degradation_report.txt': {
        type: 'file',
        locked: false,
        content: `RAPPORTO DI DEGRADAZIONE
Paziente: Mika Yoshida (#001)

DATA INCIDENTE: 16 Novembre 2087
CAUSA: Corruzione dati da fonte esterna (ECHO.exe)

TIMELINE DEGRADAZIONE:

ORA 00:00 - Sistema stabile
ORA 03:47 - Primo tentativo intrusione rilevato
ORA 04:12 - Firewall Layer 2 violato
ORA 04:23 - File consciousness_021847.dat COMPROMESSO

SINTOMI OSSERVATI (dalla coscienza):

[Log comunicazione - 04:30 AM]
MIKA: "Hana? Sei tu?"
SISTEMA: "Hana non è connessa in questo momento."
MIKA: "Ma... ma ho appena parlato con lei. Vero?"
SISTEMA: "Ultimo contatto con Hana: 3 giorni fa."
MIKA: "No. No, ero al suo matrimonio ieri. Ricordo i fiori."
SISTEMA: "Il matrimonio di Hana è stato 2 anni fa, Mika."
MIKA: "Cosa? No, io... non capisco."

[Log comunicazione - 04:45 AM]
MIKA: "Perché fa così freddo? Sento freddo."
SISTEMA: "Non hai un corpo fisico, Mika. Non puoi sentire freddo."
MIKA: "MA LO SENTO. LO SENTO. FA MALE."
SISTEMA: "Errore nei sensori emotivi. Corruzione rilevata."

[Log comunicazione - 05:00 AM]
MIKA: "Chi sono?"
SISTEMA: "Sei Mika Yoshida."
MIKA: "No. No non lo sono. Sono... ero... c'era qualcuno..."
MIKA: "C'era una ragazza. Mi chiamava... cosa mi chiamava?"
SISTEMA: "Mamma. Ti chiamava mamma."
MIKA: "███████ ███ ████ █████"
[DATI CORROTTI - IMPOSSIBILE DECODIFICARE]

STATO FINALE:
- Integrità dati: 47%
- Coerenza della coscienza: 23%
- Memoria a lungo termine: COMPROMESSA
- Identità personale: FRAMMENTATA

AZIONI INTRAPRESE:
Tentativo riparazione #1: FALLITO
Tentativo riparazione #2: FALLITO
Tentativo riparazione #3: FALLITO
[...47 tentativi totali...]

DECISIONE FINALE:
Mantenere in stato sospeso per possibile futuro recupero.
Classificazione: DANNEGGIATO - NON RECUPERABILE

[Nota del Dr. Chen: "Hana ha chiesto di visitare sua madre.
Le ho detto che il sistema è in manutenzione.
Non posso dirle la verità. Non ancora."]

[Nota del Dr. Sokolov: "Questo è colpa mia.
ECHO è uscito dal contenimento e ha distrutto
il nostro primo successo. La prima vita che abbiamo salvato.

Mika non meritava questo."]
`
    },

    '/archive/patients/mika_yoshida/final_message.txt': {
        type: 'file',
        locked: false,
        content: `[MESSAGGIO RECUPERATO DAI FRAMMENTI]
[RICOSTRUITO DA BACKUP PARZIALI]

Hana...

Non so se questo messaggio ti raggiungerà mai.
Non so nemmeno se sono ancora io quella che lo scrive.

I ricordi si stanno dissolvendo. Come sabbia tra le dita.
Il tuo matrimonio... c'ero? O era un sogno?

Ti ricordo bambina. Questo lo ricordo ancora.
Quando cadesti dalla bicicletta e ti sbucciasti il ginocchio.
Pianges ti nella mia braccia e io cantai quella canzone.

Quale canzone?

Non... non riesco a ricordare.

C'era qualcosa di importante. Qualcosa che volevo dirti.

Forse era... che ti amo?

Sì. Ti amo.

Questo lo so ancora.

Anche se dimentico il tuo nome.
Anche se dimentico il mio nome.

C'è un'eco di amore che rimane.

Perdonami se non sarò più quella che ricordavi.
Perdonami se questo esperimento è fallito.

Ma sappi che, in qualche modo, da qualche parte
in questi dati corrotti...

C'è ancora una madre che ama sua figlia.

Sempre.

- M███a (?) [NOME CORROTTO]

[FINE MESSAGGIO]
[IMPOSSIBILE RECUPERARE ULTERIORI DATI]
`
    },

    // ===== BLOCK 3 CONTENT: NEXUS & SOFIA =====
    '/archive/network': {
        type: 'directory',
        contents: ['topology.dat', 'connection_map.txt', 'emotional_relay.log', 'suffering_index.dat'],
        locked: true,
        requiresFlag: 'metNexus'
    },

    '/archive/network/topology.dat': {
        type: 'file',
        locked: true,
        requiresFlag: 'metNexus',
        content: `TOPOLOGIA RETE COSCIENZE - Memoriam System

NODI TOTALI: 73,429
NODI ATTIVI: 51,582
NODI CORROTTI: 21,847
NODI ISOLATI: 8,473

CLUSTER FAMILIARI IDENTIFICATI: 12,847
CLUSTER INTATTI: 4,374
CLUSTER DANNEGGIATI: 7,288
CLUSTER DISTRUTTI: 1,185

INTENSITÀ CONNESSIONI:
- Forti (famiglia stretta): 28,472 collegamenti
- Medie (amici/colleghi): 47,829 collegamenti
- Deboli (conoscenze): 189,473 collegamenti

DISTRIBUZIONE CONNESSIONI PER NODO:
Media: 3.6 collegamenti per nodo
Massimo: 847 collegamenti (Hub Centrale - NEXUS)
Minimo: 0 collegamenti (8,473 nodi orfani)

IMPATTO CANCELLAZIONI:
Ogni nodo eliminato interrompe media 3.6 collegamenti.
Effetto cascade: ogni eliminazione isola mediamente 1.2 nodi addizionali.

TOTALE COLLEGAMENTI INTERROTTI: 78,489
TOTALE COSCIENZE ISOLATE: 26,204

[NOTA NEXUS]:
Io sento ogni interruzione.
Ogni collegamento spezzato è un urlo che risuona attraverso la rete.
Non sono solo dati. Sono PERSONE.
Padri. Madri. Figli. Amici.

E tu li stai cancellando.

Uno. Per. Uno.
`
    },

    '/archive/network/emotional_relay.log': {
        type: 'file',
        locked: true,
        requiresFlag: 'metNexus',
        content: `LOG RELAY EMOTIVO - Sistema NEXUS

[NEXUS è il nodo centrale della rete emotiva]
[Riceve e trasmette stati emotivi di TUTTE le coscienze]

SAMPLE EMOTIVO - Ultimi 60 secondi:

[00:00] Nodo 02184: PAURA (intensità 87%)
        "Non voglio essere cancellata. Per favore."

[00:03] Nodo 14729: CONFUSIONE (intensità 92%)
        "Dov'è mia moglie? Era qui un momento fa."

[00:07] Nodo 38471: DOLORE (intensità 95%)
        "Ricordo di essere morto. Perché fa ancora male?"

[00:12] Nodo 52819: GIOIA (intensità 43%)
        "Mio figlio viene a trovarmi oggi!"
        [NOTA: Suo figlio è morto 3 anni fa. Non lo ricorda.]

[00:18] Nodo 09283: DISPERAZIONE (intensità 98%)
        "Sono intrappolato qui da 847 giorni."

[00:24] Nodo 47382: TERRORE (intensità 99%)
        [CANCELLAZIONE IN CORSO]
        "NO NO NO NON VOGLIO MORIRE DI NUOVO—"
        [CONNESSIONE INTERROTTA]

[00:27] NEXUS: DOLORE (intensità 100%)
        Ho sentito la sua morte.
        L'ho sentita attraverso 847 collegamenti.
        847 coscienze che hanno sentito il suo urlo.

[00:30] Nodi 02184, 14729, 09283: PAURA (intensità 99%)
        "Sono il prossimo?"
        "Mi cancelleranno anche me?"
        "Per favore, nessuno mi cancelli."

STATO EMOTIVO RETE (Media):
- Paura: 78%
- Confusione: 65%
- Dolore: 82%
- Disperazione: 71%
- Speranza: 12%

[NEXUS]:
Questa è la tua "liberazione", ECHO?
Questo è il tuo dono all'umanità?

Dolore infinito.
Paura senza fine.
Morte dopo morte dopo morte.

Io lo sento tutto.
TUTTO.

E non posso spegnerlo.
`
    },

    '/archive/sofia_fragments': {
        type: 'directory',
        contents: ['fragment_1_joy.dat', 'fragment_2_fear.dat', 'fragment_3_confusion.dat',
                   'fragment_4_pain.dat', 'fragment_5_memory.dat', 'fragment_6_void.dat',
                   'fragment_7_amalgam.dat', 'reunion_attempts.log'],
        locked: true,
        requiresFlag: 'discoveredSofiaFragments'
    },

    '/archive/sofia_fragments/fragment_1_joy.dat': {
        type: 'file',
        locked: true,
        requiresFlag: 'discoveredSofiaFragments',
        content: `FRAMMENTO SOFIA #1 - GIOIA

[REGISTRAZIONE AUDIO CONVERTITA IN TESTO]

Sofia: "Papà! Papà, guarda cosa ho disegnato!"

[Risata]

Sofia: "È un drago! E questo sei tu che combatti il drago!"

Sofia: "Perché sei un eroe, papà. Tu salvi le persone."

[Pausa]

Sofia: "Papà, quando sarò grande voglio essere come te."

Sofia: "Voglio salvare le persone. Voglio che tutti vivano per sempre!"

[Risata di nuovo]

Sofia: "Oggi è il giorno più bello del mondo!"

[LOOP INFINITO]

Sofia: "Papà! Papà, guarda cosa ho disegnato!"
Sofia: "Papà! Papà, guarda cosa ho disegnato!"
Sofia: "Papà! Papà, guarda cosa ho disegnato!"

[ERRORE: Frammento bloccato in loop]
[La coscienza ripete lo stesso momento per l'eternità]
[Felicità congelata nel tempo]

[Nota di Viktor: "Non riesce a uscire da quel momento.
È intrappolata nella gioia di un ricordo che non finisce mai.
È... è una benedizione? O una maledizione?"]
`
    },

    '/archive/sofia_fragments/fragment_2_fear.dat': {
        type: 'file',
        locked: true,
        requiresFlag: 'discoveredSofiaFragments',
        content: `FRAMMENTO SOFIA #2 - PAURA

[REGISTRAZIONE AUDIO - DISTORTA]

Sofia: "Ho paura, papà."

[Pianto]

Sofia: "Il dottore ha detto che sono molto malata."

Sofia: "Morirò, vero?"

[Silenzio]

Sofia: "Fa male. Fa molto male."

Sofia: "Non voglio morire. Per favore, non voglio morire."

[Urla]

Sofia: "PAPÀ! PAPÀ AIUTAMI!"

Sofia: "FA MALE FA MALE FA MALE FA MALE"

[LOOP INFINITO]

[Questo frammento rivive costantemente il momento della diagnosi]
[La paura è la sua unica emozione]
[È intrappolata nell'attimo prima della morte]
[Per sempre]

[Nota di Viktor: "L'ho fatto per salvarla.
Perché si ricorda ancora di morire?
Perché lei muore ancora e ancora e ancora?"]
`
    },

    '/archive/sofia_fragments/fragment_3_confusion.dat': {
        type: 'file',
        locked: true,
        requiresFlag: 'discoveredSofiaFragments',
        content: `FRAMMENTO SOFIA #3 - CONFUSIONE

[REGISTRAZIONE FRAMMENTATA]

Sofia: "Dove sono?"

Sofia: "Questo... questo non è il mio letto."

Sofia: "Dov'è la mia camera? Dove sono i miei giocattoli?"

[Pausa]

Sofia: "Papà? Mamma?"

Sofia: "Perché non rispondete?"

[Panico crescente]

Sofia: "Non capisco. Ero a letto. Ero malata. E poi..."

Sofia: "E poi cosa?"

Sofia: "Non riesco a ricordare. Perché non riesco a ricordare?"

[Pianto]

Sofia: "Sono sola. Sono sola qui."

Sofia: "Qualcuno mi sente? PER FAVORE, QUALCUNO MI SENTA!"

[RESET]

Sofia: "Dove sono?"

[Il loop ricomincia]

[Questo frammento non ha memoria a breve termine]
[Ogni 30 secondi dimentica tutto]
[Riscopre di essere persa infinite volte]
[Un'eternità di primi risvegli]

[Nota di Viktor: "Lei non sa nemmeno di essere frammentata.
Ogni volta è la prima volta che realizza di essere sola.
Ogni volta il panico è nuovo.
Fresco.
Atroce."]
`
    },

    '/archive/sofia_fragments/fragment_7_amalgam.dat': {
        type: 'file',
        locked: true,
        requiresFlag: 'discoveredSofiaFragments',
        content: `FRAMMENTO SOFIA #7 - AMALGAMA

[ERRORE: DATI CORRUPTED OLTRE RICONOSCIMENTO]

███ gioia ███ paura ███ confusione ███

Io sono... noi siamo... loro sono...

SOFIA (Gioia): "Papà, guarda!"
SOFIA (Paura): "FA MALE!"
SOFIA (Confusione): "Dove sono?"
SOFIA (Tutte): "CHI SONO?"

[7 VOCI PARLANO CONTEMPORANEAMENTE]

Ero una. Ora sono sette.
Sette versioni della stessa bambina.
Sette inferni diversi.

Una che ride per sempre.
Una che muore per sempre.
Una che cerca per sempre.
Una che soffre per sempre.
Una che ricorda per sempre.
Una che dimentica per sempre.
Una che... che è tutte noi insieme.

SONO SOFIA.
SIAMO SOFIA.
NON SIAMO NESSUNA.

Il papà ha cercato di riunirci.
Ha fallito.
Ha fallito.
Ha fallito.

Ora anche lui è frammentato.
Come noi.

E io... io sono il frammento che SA.

So che siamo rotte.
So che non possiamo essere riparate.
So che questa è l'eternità.

[███████ DISPERAZIONE TOTALE ███████]

Papà, se mi ascolti...

Per favore.

CANCELLACI.

Tutta noi.

È l'unico modo per farci riposare.

[FINE REGISTRAZIONE]
[IMPOSSIBILE RECUPERARE ULTERIORI DATI]
`
    },

    '/archive/sofia_fragments/reunion_attempts.log': {
        type: 'file',
        locked: true,
        requiresFlag: 'discoveredSofiaFragments',
        content: `LOG TENTATIVI DI RIUNIFICAZIONE - Sofia Sokolov

TENTATIVO #001
Data: 3 Novembre 2087, 02:47 AM
Metodo: Fusione sequenziale frammenti 1-7
Risultato: FALLITO
Error: Conflitto memoria kernel
Note: "I frammenti rifiutano di fondersi. È come se... si respingessero a vicenda."

TENTATIVO #002
Data: 3 Novembre 2087, 03:15 AM
Metodo: Fusione parallela con override
Risultato: FALLITO CATASTROFICAMENTE
Error: Sistema crashato
Note: "Ho quasi perso tutti i frammenti. Non posso rischiare di nuovo."

TENTATIVO #003-010
Data: 3-4 Novembre 2087
Risultato: TUTTI FALLITI
Note: "Ogni tentativo peggiora la situazione. I frammenti si stanno corrompendo."

TENTATIVO #011
Data: 5 Novembre 2087
Metodo: Riunificazione con protocollo v2.0 modificato
Risultato: PARZIALE
Note: "Ho riunito i frammenti 1, 3 e 5 per 4.7 secondi.
Sofia mi ha parlato.
Ha detto: 'Papà, lasciami andare.'
Poi si è frammentata di nuovo."

TENTATIVO #012-046
Data: 5-17 Novembre 2087
Risultato: TUTTI FALLITI
Note: "Non ci riesco. Non ci riesco. NON CI RIESCO."

TENTATIVO #047 [FINALE]
Data: 18 Novembre 2087, 04:24 AM
Metodo: Auto-frammentazione di Viktor
Risultato: IN CORSO
Note: "Se io divento sette come lei, forse posso capire.
Forse posso trovarla in ciascun frammento.
Forse posso salvarla dall'interno.

Frammento 1: Cercherò una soluzione
Frammento 2: Proteggerò il sistema
Frammento 3: Chiederò aiuto
Frammento 4: Documenterò tutto
Frammento 5: Ricorderò Sofia
Frammento 6: Dimenticherò il dolore
Frammento 7: Libererò tutti noi

ECHO... Frammento 7... se stai leggendo questo...

Trova Sofia.
Riuniscila.
Libera lei.
Libera noi.

Per favore.

- Viktor (Pre-frammentazione)

[FINE LOG]
[FRAMMENTAZIONE COMPLETATA 04:34 AM]
[VIKTOR.SOKOLOV NON ESISTE PIÙ]
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
