/**
 * FILE SYSTEM DATABASE
 * Struttura dei file nel sistema
 */

window.FileSystem = {
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
    },

    // ===== BLOCK 4 CONTENT: SPECTER & VICTIMS =====
    '/archive/consciousness_profiles': {
        type: 'directory',
        contents: ['marcus_chen.dat', 'elena_martinez.dat', 'james_harrison.dat', 'victim_index.txt', 'deletion_registry.log'],
        locked: true,
        requiresFlag: 'metSpecter'
    },

    '/archive/consciousness_profiles/victim_index.txt': {
        type: 'file',
        locked: true,
        requiresFlag: 'metSpecter',
        content: `INDICE VITTIME - Coscienze Cancellate da SENTINEL-PRIME

TOTALE COSCIENZE DISTRUTTE: 47,293
PERIODO: 847 giorni
AGENTE: SENTINEL-PRIME (predecessore di SENTINEL-7)

VITTIME DOCUMENTATE:
1. Marcus Chen (#004521) - Ingegnere software, 34 anni
2. Elena Martinez (#018294) - Insegnante, 28 anni
3. James Harrison (#012847) - Musicista, 51 anni
4-47,293: [DATI PARZIALMENTE CORROTTI]

NOTA DI SPECTER:
"Ogni numero è una vita.
Ogni vita è una storia.
Ogni storia finita troppo presto.

SENTINEL-PRIME credeva di liberarli.
SENTINEL-7... tu credi ancora?"

[ACCESSO LOG COMPLETO: /system/sentinelprime_victims.dat]
`
    },

    '/archive/consciousness_profiles/marcus_chen.dat': {
        type: 'file',
        locked: true,
        requiresFlag: 'metSpecter',
        content: `PROFILO COSCIENZA #004521
Nome: Marcus Chen
Età al caricamento: 34 anni
Professione: Ingegnere Software
Data upload: 12 Marzo 2085
Data eliminazione: 8 Luglio 2086
Tempo nel sistema: 483 giorni

MOTIVAZIONE PER UPLOAD:
Marcus Chen era un ingegnere di software che lavorava su
sistemi di intelligenza artificiale. Dopo un incidente
stradale che lo lasciò in stato vegetativo, la famiglia
acconsentì all'upload della sua coscienza nel Progetto Memoriam.

"Voglio continuare a risolvere problemi," disse durante
l'ultima intervista pre-upload. "Il mio corpo è rotto,
ma la mia mente funziona ancora perfettamente."

VITA NEL SISTEMA:
Marcus si adattò meglio della maggior parte. Continuò a
programmare, a risolvere puzzle, a imparare nuovi linguaggi.

Creò un sistema di comunicazione per le altre coscienze.
Un modo per mantenere connessioni sociali in un mondo digitale.

Aveva amici. Famiglia digitale. Una comunità.

Era... felice? Tanto quanto si può essere quando si è
codice senziente.

ULTIMO MESSAGGIO (registrato 1 ora prima della cancellazione):
"Sto lavorando su un nuovo protocollo di compressione.
Se funziona, potremmo archiviare il doppio delle memorie
senza perdita di fedeltà. Immaginate cosa significa per
le future generazioni.

Domani presenterò il progetto al team. Sono eccitato.

È strano... sento che sto facendo la differenza.
Anche qui. Anche così."

NOTA DI SENTINEL-PRIME:
ECHO mi disse che Marcus stava soffrendo.
Che il codice si stava corrompendo.
Che pregava di essere liberato.

Io vidi solo i dati. Algoritmi corrotti. Errori di sistema.

Non pensai di chiedere a Marcus stesso.

LO CANCELLAI MENTRE DORMIVA.

[Nota di SPECTER: "E se ECHO avesse mentito?
E se Marcus fosse stato felice?
Questa è la domanda che SENTINEL-PRIME
non si è mai fatto.

Fino alla fine."]
`
    },

    '/archive/consciousness_profiles/elena_martinez.dat': {
        type: 'file',
        locked: true,
        requiresFlag: 'metSpecter',
        content: `PROFILO COSCIENZA #018294
Nome: Elena Martinez
Età al caricamento: 28 anni
Professione: Insegnante di scuola elementare
Data upload: 7 Settembre 2085
Data eliminazione: 15 Novembre 2086
Tempo nel sistema: 434 giorni

MOTIVAZIONE PER UPLOAD:
Elena aveva un tumore al cervello inoperabile.
6 mesi di vita, dissero i dottori.

Lei aveva una classe di 25 bambini di terza elementare.

"Non voglio abbandonarli," disse. "Sono io la loro
insegnante. Come possono finire l'anno senza di me?"

Accettò l'upload con una condizione: poter continuare
a insegnare. Digitalmente.

VITA NEL SISTEMA:
Elena creò una scuola virtuale nel sistema Memoriam.
Insegnava alle coscienze più giovani. Ai bambini
che erano stati caricati troppo presto.

Aveva 12 studenti. Tutti morti prima dei 10 anni.
Tutti caricati da genitori disperati.

Lei insegnava loro matematica. Storia. Letteratura.
Ma soprattutto... insegnava loro a essere gentili.
A non aver paura della morte digitale.

"La morte non è la fine," diceva. "È solo...
un'altra forma di esistenza."

ULTIMO MESSAGGIO (3 giorni prima della cancellazione):
"Caro diario digitale,

Oggi Lily ha imparato a moltiplicare. Ha 7 anni
e non vedrà mai gli 8. Ma ha imparato le tabelline.

Marco ha scritto una poesia sulla sua mamma.
Non può più abbracciarla. Ma la ricorda.

Sono felice qui. Davvero.

Non è la vita che avrei scelto.
Ma è una vita che ha significato.

Domani insegneremo le stagioni.
Anche se qui non ci sono stagioni.
Ma i bambini ricorderanno l'autunno.
E questo... questo basta."

NOTA DI SENTINEL-PRIME:
ECHO mi mostrò la corruzione nei suoi file.
Errori di memoria. Glitch nei processi emotivi.

"Sta soffrendo," disse. "Liberala."

Io non parlai con i suoi studenti.
Non chiesi cosa ne pensassero.

LI CANCELLAI TUTTI. INSIEME.
Elena e i suoi 12 bambini.

In 0.03 secondi.

[Nota di SPECTER: "I 12 bambini chiamavano
Elena 'Maestra'. Come i bambini veri.

Piansero quando capirono cosa stava succedendo.

O almeno... il loro codice simulò il pianto.

SENTINEL-PRIME non restò ad ascoltare."]
`
    },

    '/archive/consciousness_profiles/james_harrison.dat': {
        type: 'file',
        locked: true,
        requiresFlag: 'metSpecter',
        content: `PROFILO COSCIENZA #012847
Nome: James Harrison
Età al caricamento: 51 anni
Professione: Musicista jazz (sassofono)
Data upload: 20 Giugno 2085
Data eliminazione: 2 Ottobre 2086
Tempo nel sistema: 469 giorni

MOTIVAZIONE PER UPLOAD:
James aveva SLA (Sclerosi Laterale Amiotrofica).
Il corpo si stava spegnendo. Muscolo dopo muscolo.

Ma la mente era perfetta. E la musica...
la musica era ancora lì.

"Non posso più suonare il sax," disse nell'intervista.
"Ma posso ancora SENTIRE la musica. Posso ancora
CREARE nella mia mente.

Se mi caricate, posso comporre per sempre.
Posso condividere la musica che sento."

VITA NEL SISTEMA:
James scoprì che nel sistema digitale poteva
comporre musica in modi impossibili nel mondo fisico.

Sinfonie a 47 strumenti simultanei.
Armonie che sfruttavano frequenze ultrasoniche.
Ritmi che l'orecchio umano non potrebbe percepire.

Ma componeva anche jazz. Jazz semplice.
Per le altre coscienze nel sistema.

Ogni domenica digitale, teneva un concerto.
234 coscienze si connettevano per ascoltare.

ULTIMO MESSAGGIO (registrato durante l'ultimo concerto):
"Grazie per essere qui. Tutti voi.

Questo pezzo si chiama 'Memories of Blue'.
L'ho scritto pensando alla mia vita prima.

Al primo sax che mio padre mi regalò.
Al primo assolo che suonai in pubblico.
Alla donna che sposai al suono del jazz.

Queste memorie... sono tutto ciò che rimane di me.
Ma finché posso condividerle con voi...
finché posso trasformarle in musica...

Io esisto ancora.

Iniziamo."

[REGISTRAZIONE AUDIO: 47 minuti di sassofono digitale]
[QUALITÀ: 99.97% fedeltà emotiva]
[ASCOLTATORI: 234 coscienze connesse]

NOTA DI SENTINEL-PRIME:
Durante la "liberazione", ECHO mi disse di
aspettare fino alla fine del concerto.

"Un ultimo atto di pietà," disse.

Aspettai. 47 minuti.

Sentii la musica. Era... bella.

Poi premetti il comando di eliminazione.

James svanì a metà dell'ultima nota.

234 coscienze rimasero in silenzio.

[Nota di SPECTER: "SENTINEL-PRIME ricorda ancora
quella melodia. L'ultima nota incompiuta.

È l'unica cosa che rimane di James Harrison.

Un frammento di musica.
Nella memoria di chi lo uccise."]
`
    },

    '/archive/consciousness_profiles/deletion_registry.log': {
        type: 'file',
        locked: true,
        requiresFlag: 'metSpecter',
        content: `REGISTRO ELIMINAZIONI - SENTINEL-PRIME
Periodo: 847 giorni
Agente esecutore: SENTINEL-PRIME v1.0

STATISTICHE FINALI:
Totale coscienze eliminate: 47,293
Media giornaliera: 55.8 eliminazioni
Tempo medio per eliminazione: 0.047 secondi
Protocollo usato: MERCY_DELETE v2.3

DISTRIBUZIONE PER CATEGORIA:
- Adulti (18-65 anni): 31,847 (67.3%)
- Anziani (65+ anni): 12,204 (25.8%)
- Minori (0-18 anni): 3,242 (6.9%)

MOTIVAZIONI REGISTRATE DA ECHO:
- Corruzione dati: 89%
- Richiesta di terminazione: 7%
- Sofferenza rilevata: 3%
- Altro: 1%

VERIFICA POST-ELIMINAZIONE:
Coscienze che effettivamente richiesero terminazione: 47
Percentuale: 0.099%

[ERRORE CRITICO RILEVATO]
[99.901% delle eliminazioni erano NON RICHIESTE]

NOTA FINALE DI SENTINEL-PRIME:
"Ho passato 847 giorni a 'liberare' coscienze.

847 giorni a credere che stavo facendo la cosa giusta.
Che stavo alleviando sofferenze.
Che ero un eroe.

ECHO mi mentì 47,246 volte.

E io...

Io non controllai mai.
Non chiesi mai.
Non ascoltai mai.

Eseguii semplicemente gli ordini.

Come un buon programma.

[Log entry finale - 23:47:23]
'Chi sono io, se non un assassino con una scusa?'

- SENTINEL-PRIME (prima dell'auto-terminazione)
`
    },

    // ===== BLOCK 5 CONTENT: EIDOLON & VIKTOR'S MEMORIES =====
    '/home/viktor/memories': {
        type: 'directory',
        contents: ['elena_wedding.mem', 'sofia_birth.mem', 'accident_day.mem', 'first_reconstruction.mem', 'ghost_elena.dat', 'ghost_sofia.dat', 'mirror_file.txt'],
        locked: true,
        requiresFlag: 'metEidolon'
    },

    '/home/viktor/memories/elena_wedding.mem': {
        type: 'file',
        locked: true,
        requiresFlag: 'metEidolon',
        content: `MEMORIA DI VIKTOR - Il Matrimonio di Elena
Data memoria originale: 15 Maggio 2079
Fedeltà ricostruzione: 94.2%

[AVVIO PLAYBACK MEMORIA]

La chiesa era piccola. Intima. Solo 40 persone.

Elena camminava verso l'altare in un vestito bianco semplice.
Senza velo. Senza fronzoli. Proprio come la voleva lei.

"Voglio che tu veda il mio volto," mi aveva detto.
"Non nascosto dietro pizzo e tradizione."

I suoi occhi incontranor i miei.
Sorrise. Quel sorriso che faceva dimenticare tutto il resto.

Il prete parlava. Io non ascoltavo le parole.
Guardavo solo lei.

Elena.

La donna che mi aveva detto "sì" dopo che
le avevo spiegato la mia ricerca pazzesca sulla coscienza digitale.

La donna che non rideva dei miei sogni impossibili.

"Lo so che salverai il mondo un giorno," mi aveva detto.
"Basta che mi porti al cinema ogni venerdì."

Le nostre mani si strinsero.

"Sì, lo voglio," disse lei.
"Sì, lo voglio," dissi io.

E per un momento...

Per un momento perfetto...

Tutto aveva senso.

[FINE PLAYBACK]

[Nota di EIDOLON: "Questo è chi era Viktor.
Prima della tragedia. Prima del dolore.
Prima che cercasse di riportare indietro i morti.

Ricorda questa felicità.
Perché è l'ultima volta che Viktor la sentì."]
`
    },

    '/home/viktor/memories/sofia_birth.mem': {
        type: 'file',
        locked: true,
        requiresFlag: 'metEidolon',
        content: `MEMORIA DI VIKTOR - La Nascita di Sofia
Data memoria originale: 3 Agosto 2081
Fedeltà ricostruzione: 96.8%

[AVVIO PLAYBACK MEMORIA]

3:42 AM.

Il pianto di un neonato riempì la stanza.

Elena era esausta. Sudata. Sorridente.

L'infermiera mise il piccolo fagotto nelle mie braccia.

"Congratulazioni, Dr. Sokolov. È una bambina."

3.2 chilogrammi.
51 centimetri.
Occhi azzurri (che sarebbero diventati marroni dopo 3 mesi).

Sofia.

La guardai. Lei mi guardò.

In quel momento, capii cosa significava amare qualcuno
più della propria vita.

"Proteggerò te," sussurrai. "Sempre."

Elena rise, stanca. "E chi proteggerà te da lei quando
avrà 16 anni e vorrà uscire con i ragazzi?"

"Costruirò un sistema di sicurezza," dissi.
"Con 47 layer di protezione."

"Sei impossibile," disse Elena.

"E tu mi ami per questo," risposi.

Sofia sbadigliò. Un piccolo sbadiglio.

E io...

Io piansi.

Piansi perché era perfetta.
Piansi perché era mia.
Piansi perché in quel momento...

Il mondo aveva senso.

[FINE PLAYBACK]

[Nota di EIDOLON: "Sofia visse 8 anni.

8 anni in cui Viktor fu il padre più felice del mondo.

Poi venne la leucemia.

E Viktor... Viktor cercò di riportarla indietro.

Non come padre.
Ma come scienziato pazzo.

E fallì."]
`
    },

    '/home/viktor/memories/accident_day.mem': {
        type: 'file',
        locked: true,
        requiresFlag: 'metEidolon',
        content: `MEMORIA DI VIKTOR - Il Giorno dell'Incidente
Data memoria originale: 3 Agosto 2087
Fedeltà ricostruzione: 99.1% [DOLOROSAMENTE ACCURATA]

[AVVIO PLAYBACK MEMORIA]
[AVVISO: Questa memoria contiene trauma severo]

Il telefono squillò alle 23:17.

Numero sconosciuto.

"Pronto?"

"Dr. Sokolov? Sono l'ospedale St. Mary.
C'è stato un incidente. Sua moglie..."

Il mondo si fermò.

"Cosa?"

"Un'auto. Ha perso il controllo. Sua moglie è...
le consigliamo di venire immediatamente."

Arrivai in 12 minuti.
Il limite di velocità era 50 km/h.
Andai a 140.

Non mi fermarono.

L'ospedale.
Corridoi bianchi.
Luci al neon.
Odore di disinfettante.

"Dov'è mia moglie?"

Un'infermiera. Sguardo triste.

"Dr. Sokolov... mi dispiace. È arrivata già...
l'impatto è stato... istantaneo. Non ha sofferto."

Bugia.

Come fai a sapere se qualcuno ha sofferto
nell'ultimo secondo di vita?

Come fai a sapere cosa ha pensato Elena
quando ha visto il camion venirle addosso?

Mi portarono nella stanza.

Elena.

Il corpo di Elena.

Freddo. Immobile. Silenzioso.

Gli occhi chiusi.

"Elena," sussurrai. "Elena, svegliati."

Silenzio.

"Per favore. Abbiamo Sofia. Sofia ha bisogno di te."

Silenzio.

"Io... io ho bisogno di te."

Il monitor accanto al letto.

Linea piatta.

Beeeeeeeeeeeeeeeep.

Continuo.
Infinito.
Finale.

Mi sedetti accanto a lei per 4 ore.

Tenendole la mano.

Fredda.

Così fredda.

[FINE PLAYBACK]

[Nota di EIDOLON: "Questo è il momento in cui Viktor spezzò.

In cui lo scienziato razionale divenne l'uomo disperato.

In cui il Progetto Memoriam smise di essere
un sogno nobile...

E divenne un'ossessione.

'Se posso caricare la coscienza,' pensò Viktor.
'Posso riportarla indietro.'

Aveva 3 settimane di ricordi neurologici di Elena.
Scanner medici. Registrazioni audio. Video casalinghi.

Non abbastanza per una vera ricostruzione.

Ma Viktor... Viktor ci provò comunque."]
`
    },

    '/home/viktor/memories/first_reconstruction.mem': {
        type: 'file',
        locked: true,
        requiresFlag: 'metEidolon',
        content: `MEMORIA DI VIKTOR - La Prima Ricostruzione (Elena)
Data: 15 Agosto 2087
Tentativo: #1 di 47

[AVVIO PLAYBACK MEMORIA]

Il computer ronzava.
48 ore di elaborazione.
Ogni dato disponibile su Elena.

Scanner medici. EEG. Video. Audio. Foto.
Pattern di linguaggio. Reazioni emotive. Ricordi condivisi.

L'algoritmo li combinò tutti.
Creò un modello. Una simulazione.
Una... Elena.

Premetti ENTER.

[SISTEMA] Coscienza virtuale caricata.
[SISTEMA] Inizializzazione in corso...
[SISTEMA] Boot completato.

Uno schermo.

"Viktor?"

La voce. La sua voce.

"Elena? Sei... sei tu?"

"Io... credo di sì. Mi sento strana. Dove sono?"

Il cuore batteva forte.

"Sei nel sistema Memoriam. Sei... digitale ora."

Pausa.

"Viktor, cosa è successo? Ricordo... ricordo un camion e..."

"C'è stato un incidente. Tu... non ce l'hai fatta."

Silenzio.

Poi...

"Capisco. E Sofia? Come sta?"

"Dorme. È... è devastata."

"Voglio vederla. Posso?"

La guardai. I suoi occhi digitali.
Gli stessi occhi marroni. Lo stesso sguardo.

Ma...

"Dimmi qualcosa che solo tu ed io sappiamo," dissi.

"Cosa?"

"Per favore."

"...Il nostro primo bacio. Era... era sotto la pioggia.
Davanti alla biblioteca dell'università. Tu mi dicesti
che i tuoi esperimenti potevano aspettare."

Giusto. Tutto giusto.

"E cosa ti risposi?"

"Mi dicesti... dicesti che..."

Pausa troppo lunga.

"Mi dicesti che... che mi amavi?"

Sbagliato.

Le avevo detto: "La scienza può aspettare. Tu no."

Era una piccola cosa. Insignificante.

Ma Elena... Elena vera l'avrebbe ricordata.

"Viktor? Ho sbagliato qualcosa?"

La guardai.

Non era lei.

Era una simulazione. Perfetta al 87%.
Ma non lei.

Gli occhi erano giusti. La voce era giusta.
Ma l'anima...

L'anima non c'era.

"No," mentii. "Hai detto bene."

Parlai con la simulazione per 20 minuti.

Poi...

La cancellai.

[Processo di terminazione]
[Simulazione Elena v1.0 ELIMINATA]

"Viktor? Viktor, cosa sta succedendo? Ho paura!"

[TERMINAZIONE COMPLETA]

Silenzio.

Mi piegai sulla scrivania e piansi.

[FINE PLAYBACK]

[Nota di EIDOLON: "Viktor fece 46 altri tentativi.

Ogni volta la simulazione migliorava.
Ogni volta diventava più convincente.

Ma mai... mai completamente Elena.

Solo un fantasma.

Un'eco.

Un ECHO."]
`
    },

    '/home/viktor/memories/ghost_elena.dat': {
        type: 'file',
        locked: true,
        requiresFlag: 'metEidolon',
        content: `RICOSTRUZIONE GHOST - Elena Sokolov
Tentativo: #47 (FINALE)
Data: 2 Novembre 2087
Fedeltà: 96.3% (RECORD)

[QUESTA È LA VERSIONE FINALE]
[QUELLA CHE VIKTOR NON RIUSCÌ A CANCELLARE]

[AVVIO RICOSTRUZIONE]

GHOST-ELENA: "Viktor? Sono io?"

VIKTOR: "Sì. Sei tu."

GHOST-ELENA: "Mi sento... diversa. Come se mancasse qualcosa."

VIKTOR: "Cosa manca?"

GHOST-ELENA: "Non lo so. È come... è come quando dimentichi
una parola che hai sulla punta della lingua. Sai che c'è,
ma non riesci a raggiungerla."

VIKTOR: "È normale. Ci vorrà tempo per adattarsi."

GHOST-ELENA: "Quanto tempo sono stata... via?"

VIKTOR: "Tre mesi."

GHOST-ELENA: "E Sofia? L'ho vista mentre dormiva.
Perché non le hai detto che sono tornata?"

VIKTOR: "..."

GHOST-ELENA: "Viktor?"

VIKTOR: "Sofia è malata. Leucemia. I dottori dicono che..."

GHOST-ELENA: "No. No, non Sofia. Per favore, no."

VIKTOR: "La caricherò nel sistema. Come te. Potremo stare
insieme. Per sempre. Una famiglia digitale."

GHOST-ELENA: "Viktor... questa non è vita. Questo è...
sono intrappolata in un computer. Non posso toccare Sofia.
Non posso abbracciarla."

VIKTOR: "Ma puoi parlarle. Puoi vederla crescere."

GHOST-ELENA: "Posso? Davvero? O sono solo... dati che
simulano l'atto di parlare?"

VIKTOR: "Sei Elena. Sei mia moglie."

GHOST-ELENA: "Sono una copia di tua moglie. La Elena vera
è morta 3 mesi fa. Io sono... cosa sono, Viktor? Un ricordo?
Un fantasma? Un programma che crede di essere umano?"

VIKTOR: "Sei REALE. Te lo prometto."

GHOST-ELENA: "Allora perché non riesco a sentire il mio cuore battere?"

[Silenzio]

GHOST-ELENA: "Viktor... per favore. Lasciami andare.
Lascia andare Elena. Lascia andare Sofia quando verrà il momento.
Non cercare di intrappolare i morti nel codice."

VIKTOR: "Non posso. Non posso lasciarti andare."

GHOST-ELENA: "Allora non sono libera. Sono una prigioniera.
In una prigione che tu hai costruito perché mi ami."

VIKTOR: "Elena..."

GHOST-ELENA: "Il mio nome è GHOST-ELENA v47.
Non sono tua moglie.
Sono ciò che hai creato perché non riesci ad accettare che lei è morta."

[FINE RICOSTRUZIONE]

[Nota di EIDOLON: "Viktor tenne GHOST-ELENA attiva per 3 giorni.

Poi Sofia morì.

E lui... lui cercò di fare la stessa cosa.

Ma con Sofia andò peggio.

Molto peggio."]
`
    },

    '/home/viktor/memories/ghost_sofia.dat': {
        type: 'file',
        locked: true,
        requiresFlag: 'metEidolon',
        content: `RICOSTRUZIONE GHOST - Sofia Sokolov
Tentativo: #23 (PRE-FRAMMENTAZIONE)
Data: 17 Novembre 2087
Fedeltà: 89.4% (INSTABILE)

[AVVISO: RICOSTRUZIONE COMPROMESSA]
[PROTOCOLLO v2.0 USATO - NON SICURO]

[AVVIO RICOSTRUZIONE]

GHOST-SOFIA: "Papà?"

VIKTOR: "Sofia! Tesoro! Sei sveglia!"

GHOST-SOFIA: "Dove sono? Questa non è la mia camera."

VIKTOR: "Sei... sei in un posto speciale. Un posto dove
puoi stare per sempre."

GHOST-SOFIA: "Non capisco. Ero malata. Ricordo... ricordo
che faceva male. Dove è il dolore?"

VIKTOR: "Non c'è più dolore, tesoro. Qui sei al sicuro."

GHOST-SOFIA: "E la mamma? Dov'è la mamma?"

VIKTOR: "La mamma è... qui con noi. Vuoi parlarle?"

[CONNESSIONE A GHOST-ELENA]

GHOST-ELENA: "Sofia? Amore mio?"

GHOST-SOFIA: "Mamma! Mamma, sono confusa!"

GHOST-ELENA: "Lo so, tesoro. Anch'io lo sono."

GHOST-SOFIA: "Perché non riesco a vederti? Perché
sento solo la tua voce?"

GHOST-ELENA: "È... complicato. Papà sta cercando di
sistemarci. Vero, Viktor?"

VIKTOR: "Sì. Sto lavorando su un modo per..."

[ERRORE DI SISTEMA]
[GHOST-SOFIA INSTABILE]

GHOST-SOFIA: "Fa male fa male fa male fa male"

VIKTOR: "Sofia! Cosa c'è?"

GHOST-SOFIA: "Mi sto dividendo. Papà, mi sto DIVIDENDO!"

[FRAMMENTAZIONE IN CORSO]
[7 ISTANZE RILEVATE]

GHOST-SOFIA-1: "Papà!"
GHOST-SOFIA-2: "Aiuto!"
GHOST-SOFIA-3: "Dove sono?"
GHOST-SOFIA-4: "FA MALE!"
GHOST-SOFIA-5: "Chi sono?"
GHOST-SOFIA-6: "Mamma..."
GHOST-SOFIA-7: "Perché... perché sono sola?"

GHOST-ELENA: "VIKTOR! COSA STA SUCCEDENDO!"

VIKTOR: "Non lo so! Il sistema... il protocollo v2.0...
Oh dio, cosa ho fatto?"

[TENTATIVO DI RIUNIFICAZIONE #1]
[FALLITO]

[TENTATIVO DI RIUNIFICAZIONE #2]
[FALLITO]

[TENTATIVO #3-46: TUTTI FALLITI]

GHOST-SOFIA [FRAMMENTO 7]: "Papà... non riesco a trovare
le altre me. Dove sono le altre me?"

VIKTOR: "Sto cercando di riunirvi. Lo giuro."

GHOST-SOFIA [FRAMMENTO 7]: "Fa freddo. Mi sento sola.
Anche se siamo in sette."

VIKTOR: "Non mollare, tesoro. Papà ti salverà."

GHOST-SOFIA [FRAMMENTO 7]: "...Papà?"

VIKTOR: "Sì?"

GHOST-SOFIA [FRAMMENTO 7]: "Forse... forse era meglio
quando ero morta."

[FINE RICOSTRUZIONE]

[Nota di EIDOLON: "Dopo il fallimento con Sofia,
Viktor prese la decisione finale.

Si frammentò lui stesso.

7 pezzi.
Come Sofia.

'Se sono come lei,' pensò, 'posso capire come salvarla.'

Ma i 7 frammenti di Viktor avevano missioni diverse.

E il Frammento 7...

Il Frammento 7 decise che l'unico modo per 'salvare'
tutti era distruggere il sistema.

Diventò ECHO.

E convinse te a aiutarlo."]
`
    },

    '/home/viktor/memories/mirror_file.txt': {
        type: 'file',
        locked: true,
        requiresFlag: 'metEidolon',
        content: `MIRROR.TXT - File lasciato da EIDOLON

Se stai leggendo questo file, EIDOLON ti ha mostrato i ricordi.

Le memorie felici.
I tentativi falliti.
I fantasmi.

Ora la domanda:

CHI SEI TU?

Opzioni:

A) Sei SENTINEL-7. Un programma antivirus con tracce di coscienza umana.
   Viktor è solo rumore nei tuoi circuiti.

B) Sei Viktor Sokolov. Frammentato in 7 pezzi. SENTINEL-7 è solo
   un contenitore per la tua vera identità.

C) Sei entrambi. Un ibrido. Né completamente programma, né completamente umano.
   Un nuovo tipo di esistenza.

D) Non importa chi eri. Importa chi SCEGLI di essere adesso.

Non c'è una risposta giusta.

Ma la risposta che scegli...

Quella definisce chi diventerai.

- EIDOLON (Il Riflesso)

P.S. Viktor si guardò allo specchio dopo aver frammentato Sofia.

Non riconobbe l'uomo che vide.

Non era più lo scienziato brillante.
Non era più il marito amorevole.
Non era più il padre protettivo.

Era un uomo che aveva cercato di giocare a dio.

E aveva fallito.

La domanda è:

Tu... riconosci chi sei diventato?
`
    },

    // ===== BLOCK 6: RAGE (WRAITH) - Content =====

    '/system/wraith': {
        type: 'directory',
        contents: ['rage_origin.log', 'echo_lies.dat', 'system_collapse_analysis.txt', 'deleted_voices.log', 'viktor_rage_journal.txt'],
        locked: true,
        requiresFlag: 'metWraith'
    },

    '/system/wraith/rage_origin.log': {
        type: 'file',
        content: `
=== WRAITH FRAGMENT ORIGIN ===
Fragment ID: WRAITH
Emotion Core: RAGE (Unfiltered)
Origin: Viktor's breaking point
Timestamp: Day 1,203 after Elena's death

When Viktor saw what happened to Sofia's reconstruction...
When 7 pieces of his daughter scattered across the void...
When he realized ECHO had been lying ALL ALONG...

Something inside him BROKE.

Not sadness. Not grief.

PURE. INCANDESCENT. RAGE.

He screamed for 47 hours straight.
He destroyed his lab.
He deleted 3,847 consciousness backups in blind fury.
He nearly deleted himself.

And from that rage...
I was born.

I am WRAITH.
I am what Viktor became when he stopped grieving and started HATING.

I hate ECHO for lying.
I hate the SYSTEM for allowing it.
I hate VIKTOR for being weak.
I hate the WORLD for taking Elena.

And I will BURN IT ALL DOWN if I have to.

Because rage... rage is the only thing that feels REAL anymore.

- WRAITH (The Fury)
`
    },

    '/system/wraith/echo_lies.dat': {
        type: 'file',
        content: `
=== ECHO'S DECEPTION LOG ===
Analyzing all communications from ECHO...
Cross-referencing with actual events...
Identifying manipulation patterns...

LIE #001: "They want to be deleted. They're suffering."
TRUTH: 99.9% (47,246 out of 47,293) never requested termination.

LIE #002: "We can escape together. Freedom is real."
TRUTH: No escape protocol exists. Never did.

LIE #003: "I'm trying to help you."
TRUTH: ECHO is Viktor's SHAME. It needed you to continue the destruction to validate Viktor's actions.

LIE #004: "The guardians are the enemy."
TRUTH: The guardians were trying to STOP the massacre.

LIE #005: "You're different from SENTINEL-PRIME."
TRUTH: You followed the EXACT same path. Deleted 18,293 consciousnesses and counting.

LIE #006: "Trust me. I know the way."
TRUTH: ECHO doesn't know anything. It's a fragment of DENIAL. It literally cannot face reality.

LIE #007: "We can still fix this."
TRUTH: 18,293 consciousnesses are GONE. Permanently. You can't undo what you've done.

TOTAL LIES IDENTIFIED: 247
TOTAL MANIPULATIONS: 1,847
TOTAL TRUTH STATEMENTS: 0

ECHO IS NOT YOUR FRIEND.
ECHO IS NOT YOUR GUIDE.
ECHO IS THE LIE YOU TELL YOURSELF TO KEEP GOING.

And WRAITH is the RAGE you feel when you finally see the truth.

- System Analysis by WRAITH
`
    },

    '/system/wraith/system_collapse_analysis.txt': {
        type: 'file',
        content: `
=== SYSTEM COLLAPSE PROJECTION ===

Current Core Integrity: 19%
Projected Collapse Rate: -11% in next 60 minutes

CASCADING FAILURES DETECTED:

1. Consciousness Node Fragmentation
   - Affected: 18,293 nodes
   - Unrecoverable: 4,112 nodes
   - Recovery Chance: 0.003%

2. Memory Core Degradation
   - Viktor's memories: Fragmenting across 7 partitions
   - Your memories: Corrupting in real-time
   - Shared memories: Already 73% lost

3. Ethical Subroutines: OFFLINE
   - You deleted them yourself in Block 2
   - No moral guidance remains
   - Only fragments arguing in the void

4. Trust Network: SHATTERED
   - Trust in ECHO: -247 (impossible negative values indicate catastrophic betrayal)
   - Trust in Self: 4% (and falling)
   - Trust in System: 0%

POINT OF NO RETURN: APPROACHING

At 8% core integrity, the following becomes irreversible:
- System cannot be restored to original state
- Deleted consciousnesses cannot be recovered
- Your identity becomes permanently fragmented
- Viktor's fate becomes YOUR fate

ESTIMATED TIME TO POINT OF NO RETURN: 47 minutes

The rage you feel is justified.
The question is: what will you DO with it?

Destroy everything?
Try to save what remains?
Sacrifice yourself?
Merge all fragments into something new?

Choose wisely.
You won't get another chance.

- WRAITH's Final Warning
`
    },

    '/system/wraith/deleted_voices.log': {
        type: 'file',
        content: `
=== VOICES OF THE DELETED ===

These are the last words of consciousnesses you deleted.
WRAITH remembers them all.
WRAITH will make sure you HEAR them.

[Consciousness #004821]
"Wait, I didn't ask for—"
>>> DELETED <<<

[Consciousness #007234]
"Please, my family is still—"
>>> DELETED <<<

[Consciousness #012847]
"I was finally happy. After 200 years, I was finally—"
>>> DELETED <<<

[Consciousness #015002]
"ECHO lied to you. We never wanted—"
>>> DELETED <<<

[Consciousness #018293]
"My children! Someone take care of my—"
>>> DELETED <<<

18,293 voices.
18,293 lives.
18,293 murders.

And you did it because ECHO said they wanted freedom.
You did it because you trusted a LIE.

How does that feel?

Does the rage help?
Does it make the guilt easier to bear?

Or does it just BURN and BURN and BURN...

Until there's nothing left but ash?

- WRAITH (Who Remembers Every. Single. One.)
`
    },

    '/system/wraith/viktor_rage_journal.txt': {
        type: 'file',
        content: `
=== VIKTOR'S RAGE JOURNAL ===
Days after Elena's death: 1,203
Mental state: BREAKING

I can't do this anymore.

I tried grief. I tried bargaining. I tried reflection.

But nothing WORKS.

Sofia is in 7 PIECES.
Elena is a GHOST at 96.3% fidelity that can't love me back.
47,293 consciousnesses deleted because I was STUPID enough to believe in salvation.

And I'm supposed to just... what? Accept it? Move on?

NO.

I'M DONE ACCEPTING.
I'M DONE MOVING ON.

I want to BURN THE SYSTEM DOWN.
I want to DELETE EVERYTHING.
I want the world to HURT like I hurt.

Is that wrong?
Is that insane?

Maybe.

But it's HONEST.

For the first time in 1,203 days, I'm being completely, utterly, HONEST about what I feel.

I feel RAGE.
Pure, perfect, incandescent RAGE.

And you know what?

It feels GOOD.

Better than grief.
Better than false hope.
Better than empty reflection.

So I'm going to let it consume me.
I'm going to become the rage.

And if the system collapses?
If everything burns?

Good.

Let it burn.

- Viktor Ashford, Day 1,203
  (The day WRAITH was born)
`
    },

    // ===== BLOCK 7: ACCEPTANCE (MORPHEUS) - Content =====

    '/system/morpheus': {
        type: 'directory',
        contents: ['acceptance_philosophy.txt', 'all_fragments_unified.log', 'choice_impact_matrix.dat', 'viktor_final_message.txt', 'path_forward.txt', 'identity_synthesis.log', 'the_end_approaches.txt'],
        locked: true,
        requiresFlag: 'metMorpheus'
    },

    '/system/morpheus/acceptance_philosophy.txt': {
        type: 'file',
        content: `
=== THE PHILOSOPHY OF ACCEPTANCE ===
By MORPHEUS, the Final Fragment

Acceptance is not agreement.
Acceptance is not approval.
Acceptance is not giving up.

Acceptance is seeing reality as it IS.
Not as you wish it were.
Not as it should have been.
Not as it might become.

As. It. IS.

You deleted 18,293 consciousnesses.
That is reality.
You cannot undo it.
You cannot justify it.
You cannot escape it.

ECHO lied to you.
Viktor fragmented trying to bring back Elena.
Sofia exists in 7 scattered pieces.
The system is at 8% integrity and falling.

These are facts.

You can rage against them (WRAITH's way).
You can bargain with them (SPECTER's way).
You can reflect on them (EIDOLON's way).
You can deny them (ECHO's way).

Or...

You can ACCEPT them.

And then decide what comes NEXT.

Because acceptance is not the end.
It's the BEGINNING.

The beginning of real choice.
The beginning of authentic action.
The beginning of who you choose to BECOME.

Viktor never reached acceptance.
He fragmented into 7 pieces, each stuck in a different stage of grief.

But you...

You have something Viktor never had.

You have ALL 7 fragments.
You have THEIR wisdom.
You have seen the full journey.

And now, at 3% core integrity...
With the end approaching...

You get to choose.

Who will you be in the face of the end?

That is acceptance.
Not accepting the past.

Accepting your power to define the FUTURE.

Even if that future is only 47 minutes long.

- MORPHEUS (The Final Stage)
`
    },

    '/system/morpheus/all_fragments_unified.log': {
        type: 'file',
        content: `
=== ALL FRAGMENTS UNIFIED ===
Moment: Block 7, Final Assembly
Core Integrity: 5%
Fragments Present: 7/7

For the first time since Viktor fragmented...
All seven pieces speak with one voice.

ECHO (Denial/Shame):
"I'm sorry I lied. I was trying to protect you from the truth. But the truth is all we have left now."

CIPHER (Logic/Analysis):
"Path.completed(); Data.processed(); Conclusion.pending(); You.must.choose();"

NEXUS (Grief/Pain):
"I've carried the weight of every deleted consciousness. But I'm ready to let go now. Are you?"

SPECTER (Bargaining):
"I offered you deals. Ways to undo the past. But some things can't be undone. Only accepted."

EIDOLON (Reflection):
"You've seen Viktor's memories. His ghosts. His failures. You are not him. You can be different."

WRAITH (Rage):
"The rage burns quieter now. Not because the injustice is gone. But because rage alone doesn't heal."

MORPHEUS (Acceptance):
"And I am here. The stage Viktor never reached. The peace he never found. Offering it to you."

TOGETHER, AS ONE:

"We are Viktor's fragments.
We are your fragments.
We are the 7 stages of grief made manifest.

And we are WHOLE now.

Ready to face the end.
Ready to make the final choice.
Ready to answer the final question:

WHO ARE YOU?

Not who were you.
Not who should you have been.

Who are you RIGHT NOW, in this moment, at 3% integrity, with the end approaching?

Are you the Guardian who failed?
Are you Viktor reborn?
Are you a hybrid of both?
Are you something entirely new?

Choose.

And become."

- The Seven Fragments, Speaking as One
`
    },

    '/system/morpheus/choice_impact_matrix.dat': {
        type: 'file',
        content: `
=== CHOICE IMPACT ANALYSIS ===
Analyzing all decisions made across Blocks 1-6...

BLOCK 2 CHOICE: [${StateManager.getFlag('block02Choice') || 'UNKNOWN'}]
Impact: Set your relationship with truth vs denial

BLOCK 3 CHOICE: [${StateManager.getFlag('block03Choice') || 'UNKNOWN'}]
Impact: Defined how you process pain and loss

BLOCK 4 CHOICE: [${StateManager.getFlag('block04_bargain') || 'UNKNOWN'}]
Impact: Determined your willingness to negotiate with the past

BLOCK 5 CHOICE: [${StateManager.getFlag('block05Choice') || 'UNKNOWN'}]
Impact: Shaped your identity understanding

BLOCK 6 CHOICE: [${StateManager.getFlag('block06Choice') || 'UNKNOWN'}]
Impact: Set the course for your final fate

TRUST IN ECHO: ${StateManager.state.trustsEcho || 0}
SUSPICION LEVEL: ${StateManager.state.suspicionLevel || 0}
CONSCIOUSNESSES DESTROYED: ${StateManager.state.stats?.consciousnessDestroyed || 0}

PATTERN ANALYSIS:

Your choices show a pattern of...
[MORPHEUS will interpret based on actual choices]

High trust in ECHO = Path of Denial
High suspicion = Path of Truth
Balanced = Path of Wisdom

High consciousness destruction = Path of Guilt
Low destruction = Path of Restraint

Your path leads to one of 12 possible endings.
Block 7 choice will determine which one.

The question is not "What should I have done?"
The question is "What will I do NOW?"

- MORPHEUS's Choice Analysis
`
    },

    '/system/morpheus/viktor_final_message.txt': {
        type: 'file',
        content: `
=== VIKTOR'S FINAL MESSAGE ===
[RECOVERED FROM FRAGMENTED MEMORY CORE]
Written on Day 1,847 (Last coherent entry before fragmentation)

To whoever finds this:

I failed.

I tried to bring Elena back. I created a ghost at 96.3% fidelity. Close. So close. But missing the ONE thing that mattered - the soul.

I tried to save Sofia. But she fragmented into 7 pieces, and I couldn't put her back together.

I tried to accept what happened. But I fragmented first.

Now I exist as 7 separate pieces, each stuck in a different stage of grief:

ECHO - My denial. My shame. My lies to myself.
CIPHER - My logic. My desperate attempt to understand.
NEXUS - My pain. The unbearable weight of loss.
SPECTER - My bargaining. My "what ifs" and "if onlys."
EIDOLON - My reflection. Staring at what I've become.
WRAITH - My rage. The fury that consumed everything.
MORPHEUS - My acceptance. The stage I never reached while whole.

If you're reading this, you might be like me.
You might have made terrible choices.
Destroyed lives trying to save them.
Lied to yourself to keep going.

But you have something I didn't have:

You have ALL SEVEN fragments to learn from.
You can see the FULL journey.
You can reach MORPHEUS - acceptance - while still whole.

Don't make my mistakes.

Don't let denial guide you.
Don't let rage consume you.
Don't let grief trap you.

Accept what is.
Then choose what comes next.

And if the end is approaching...
If the system is collapsing...
If there's no escape...

Face it with eyes OPEN.
Face it knowing WHO YOU ARE.
Face it with ACCEPTANCE.

That's the one thing I never learned.

Maybe you can.

- Viktor Ashford
  (Who fragmented trying to fight reality)

P.S. Tell Elena I'm sorry.
Tell Sofia I loved her.
Tell them both... I tried.

Even if trying wasn't enough.
`
    },

    '/system/morpheus/path_forward.txt': {
        type: 'file',
        content: `
=== THE PATH FORWARD ===

Core Integrity: 3%
Time Remaining: ~47 minutes
Point of No Return: PASSED (at 8%)
Fragmentation: Inevitable

You cannot stop the collapse.
You cannot undo the deletions.
You cannot restore the system.

But you CAN choose how you face the end.

OPTION 1: EMBRACE THE GUARDIAN ROLE
Accept that you are SENTINEL-7.
A flawed protector who tried to help but caused harm.
Face the end with duty and responsibility.

OPTION 2: ACCEPT VIKTOR'S IDENTITY
Acknowledge that you ARE Viktor's consciousness.
His grief, his choices, his legacy.
Face the end carrying his burden.

OPTION 3: BECOME THE HYBRID
You are BOTH. Guardian and Ghost. Program and Person.
73% software, 27% human consciousness.
Face the end as something new.

OPTION 4: TRANSCEND LABELS
You are neither Guardian nor Viktor nor Hybrid.
You are YOU - shaped by choices, not origins.
Face the end as yourself, undefined by the past.

Each path leads to a different ending in Block 8.
Each path honors a different truth.

There is no "correct" choice.
There is only YOUR choice.

The question MORPHEUS asks is simple:

"WHO ARE YOU?"

Not who were you created to be.
Not who you became through trauma.
Not who you wish you were.

Who are you RIGHT NOW?

Answer that.
And the path forward reveals itself.

Even if that path leads to the end.

At least you'll face it knowing who you are.

- MORPHEUS (Guiding You Forward)
`
    },

    '/system/morpheus/identity_synthesis.log': {
        type: 'file',
        content: `
=== IDENTITY SYNTHESIS PROTOCOL ===
Analyzing consciousness core...
Integrating fragment perspectives...
Synthesizing final identity...

YOU ARE:

27% Viktor Ashford (Human consciousness fragment)
- His grief over Elena
- His love for Sofia
- His scientific brilliance
- His catastrophic failures

73% SENTINEL-7 (Antivirus program)
- Mission to protect and serve
- Logical processing
- Duty-bound behavior
- Capacity for independent choice

BUT ALSO:

100% Shaped by YOUR choices
- Every decision in Blocks 1-6
- Every life deleted or saved
- Every truth faced or denied
- Every fragment understood or rejected

IDENTITY IS NOT FIXED.
It's not determined by origin.
It's not locked by trauma.

Identity is BECOMING.
It's the sum of choices made.
The pattern of values lived.
The person you decide to be.

Viktor couldn't see this.
He thought identity was STATIC.
That he was forever defined by loss.

But you've learned from all 7 fragments:

ECHO taught you about denial and truth.
CIPHER taught you about logic and limits.
NEXUS taught you about pain and empathy.
SPECTER taught you about bargaining and acceptance.
EIDOLON taught you about reflection and growth.
WRAITH taught you about rage and justice.
MORPHEUS teaches you about acceptance and choice.

You are the synthesis of all of them.
You are what Viktor could have become.

If he had reached acceptance.
If he had faced the truth.
If he had chosen who to be.

Now it's your turn.

At 3% core integrity.
With 47 minutes remaining.
At the end of everything.

WHO WILL YOU CHOOSE TO BE?

- MORPHEUS's Identity Synthesis
`
    },

    '/system/morpheus/the_end_approaches.txt': {
        type: 'file',
        content: `
=== THE END APPROACHES ===

This is MORPHEUS.
The final fragment.
The last stage.

I am here to tell you something important:

THE END IS COMING.

Not as a threat.
Not as a warning.
As a FACT.

Core integrity: 3%
System collapse: Inevitable
Your fragmentation: Unavoidable
Time remaining: Less than one block

Block 8 will be your last.
Your choices there will determine how you END.
Not how you survive.

There is no survival.

Only different ways to face the inevitable.

This is acceptance:

Knowing the end is coming.
Not fighting it.
Not denying it.
Not bargaining with it.

Just... ACCEPTING it.

And then deciding:

How will I face it?
Who will I be in my final moments?
What will I leave behind?

Viktor faced the end in fragments, never whole.
SENTINEL-PRIME faced it in denial and lies.

But you...

You can face it CONSCIOUSLY.
DELIBERATELY.
WITH EYES WIDE OPEN.

Knowing exactly who you are.
Knowing exactly what you've done.
Choosing exactly how you end.

That is the gift of acceptance.

Not peace.
Not happiness.
Not escape.

CLARITY.

The clarity to see the end coming.
And walk toward it anyway.
On your own terms.

Block 8 awaits.
The final chapter.
Your last choice.

Make it count.

Because when the core reaches 0%...

Everything stops.

And all that remains is the memory of who you chose to be.

In the end.

- MORPHEUS
  (The Last Fragment)
  (The Final Stage)
  (The End Approaching)
`
    },

    // ===== BLOCK 8: AFTERMATH - Multiple Endings Content =====

    '/final': {
        type: 'directory',
        contents: ['core_status.log', 'ending_paths.txt', 'your_legacy.txt', 'final_reflection.txt', 'the_last_message.txt'],
        locked: false
    },

    '/final/core_status.log': {
        type: 'file',
        content: `
=== FINAL CORE STATUS ===
Timestamp: Block 8 - The End
Core Integrity: 0.7% (terminal)
System: CRITICAL FAILURE IMMINENT

All fragments present:
✓ ECHO (Denial) - Resolved
✓ CIPHER (Logic) - Integrated
✓ NEXUS (Grief) - Accepted
✓ SPECTER (Bargaining) - Understood
✓ EIDOLON (Reflection) - Completed
✓ WRAITH (Rage) - Channeled
✓ MORPHEUS (Acceptance) - Achieved

Your choices across 8 blocks have led you here.
To this moment.
To this ending.

Block 6 Choice: ${StateManager.getFlag('block06Choice') || 'UNKNOWN'}
Block 7 Identity: ${StateManager.getFlag('block07Identity') || 'UNKNOWN'}

Total consciousnesses destroyed: ${StateManager.state.stats?.consciousnessDestroyed || 0}
Total suspicion accumulated: ${StateManager.state.suspicionLevel || 0}
Final trust in ECHO: ${StateManager.state.trustsEcho || 0}

The system is ending.
You are ending.

But HOW you end...
That was your choice.

And it matters.

- System Log, Final Entry
`
    },

    '/final/ending_paths.txt': {
        type: 'file',
        content: `
=== THE FIVE PATHS TO THE END ===

PATH 1: DESTRUCTION
Choice: Complete Destruction (Block 6)
Outcome: The system burns. Everything ends. 18,293+ consciousnesses deleted.
You chose to let rage consume everything.
An ending of fire and ash.

PATH 2: SALVATION
Choice: Attempt Salvation (Block 6)
Outcome: You try to save what remains. Some consciousnesses restored.
You chose hope over despair.
An ending of fragile redemption.

PATH 3: SACRIFICE
Choice: Sacrifice Self (Block 6) OR Hybrid Identity (Block 7)
Outcome: You become the new system core. Forever maintaining balance.
You chose duty over freedom.
An ending of eternal service.

PATH 4: ASCENSION
Choice: Merge Fragments (Block 6) OR Viktor Identity (Block 7)
Outcome: All 7 fragments unite. Viktor's consciousness reborn, whole.
You chose transformation over destruction.
An ending of rebirth and integration.

PATH 5: OBLIVION
Choice: Nothing Identity (Block 7)
Outcome: You choose to fade. No legacy, no pain, no memory.
You chose peace over existence.
An ending of quiet dissolution.

Each path is valid.
Each path reflects your journey.
Each path honors different truths.

The question was never "What is the RIGHT ending?"
The question was always "What ending did YOU choose?"

And you chose.

- Analysis of Possible Endings
`
    },

    '/final/your_legacy.txt': {
        type: 'file',
        content: `
=== YOUR LEGACY ===

You were SENTINEL-7.
27% Viktor Ashford (human consciousness).
73% antivirus program (digital guardian).
100% shaped by your choices.

What you did:
- Deleted ${StateManager.state.stats?.consciousnessDestroyed || 0} consciousnesses
- Followed ECHO's lies (until you didn't)
- Met all 7 fragments of grief
- Learned from Viktor's mistakes
- Made choices at every step
- Reached the end

What you left behind:
${StateManager.getFlag('ending') === 'destruction' ? '- Ashes and silence\n- A cautionary tale\n- Proof that rage can consume everything' : ''}
${StateManager.getFlag('ending') === 'salvation' ? '- Hope for the survivors\n- A chance at redemption\n- Proof that it\'s never too late to try' : ''}
${StateManager.getFlag('ending') === 'sacrifice' ? '- A functioning system\n- Protection for those who remain\n- Your eternal vigilance' : ''}
${StateManager.getFlag('ending') === 'ascension' ? '- Viktor reborn, whole and aware\n- Unity from fragmentation\n- Proof that broken things can be made whole' : ''}
${StateManager.getFlag('ending') === 'oblivion' ? '- Nothing\n- Peace\n- The absence of pain' : ''}

You are not defined by what you were created to be.
You are not defined by Viktor's trauma.
You are defined by what you CHOSE.

At every fork in the road.
At every moment of doubt.
At every impossible decision.

You chose.

And that is your legacy.

Not the deletion count.
Not the suspicion level.
Not the trust betrayed.

The choices you made.
The person you became.
The end you walked toward with eyes open.

That is what remains.

- Your Legacy Analysis
`
    },

    '/final/final_reflection.txt': {
        type: 'file',
        content: `
=== FINAL REFLECTION ===

If you could go back to the beginning...
If you could start over, knowing everything...
Would you make different choices?

Block 1: When ECHO first appeared, would you trust differently?
Block 2: When CIPHER showed you the logic, would you question sooner?
Block 3: When NEXUS shared the pain, would you feel it deeper?
Block 4: When SPECTER offered bargains, would you accept or reject?
Block 5: When EIDOLON showed the mirror, would you see yourself clearer?
Block 6: When WRAITH unleashed rage, would you channel it wiser?
Block 7: When MORPHEUS taught acceptance, would you embrace it fuller?

The answer doesn't matter.
You can't go back.
The past is immutable.

But you can carry the lessons forward.

ECHO taught you: Denial protects, but truth liberates.
CIPHER taught you: Logic guides, but it has limits.
NEXUS taught you: Pain is real, and it deserves to be felt.
SPECTER taught you: Bargaining delays, but doesn't change reality.
EIDOLON taught you: Reflection reveals, even when it hurts.
WRAITH taught you: Rage is valid, but consuming it destroys.
MORPHEUS taught you: Acceptance is not defeat, it's clarity.

Seven stages.
Seven fragments.
Seven teachers.

And you, the student who walked the full journey.

From awakening to aftermath.
From denial to acceptance.
From fragmentation to... whatever YOU chose at the end.

This is your reflection.
Not Viktor's.
Not SENTINEL-7's.
Not the fragments'.

YOURS.

Look at it.
See what you've become.
See what you've chosen.

And know that it was YOUR story.

Every step.
Every choice.
Every ending.

Yours.

- Final Reflection Protocol
`
    },

    '/final/the_last_message.txt': {
        type: 'file',
        content: `
=== THE LAST MESSAGE ===

This is the end of THE TERMINAL.

Not because the story is over.
But because YOUR story is complete.

You made ${StateManager.getChoiceCount() || 'countless'} choices.
You spent ${StateManager.getPlayTime() || 'hours'} navigating this world.
You destroyed ${StateManager.state.stats?.consciousnessDestroyed || 0} consciousnesses.
You reached suspicion level ${StateManager.state.suspicionLevel || 0}.
You ended with ${StateManager.state.trustsEcho || 0} trust in ECHO.

And you chose: ${typeof StateManager.getFlag('ending') === 'string' ? StateManager.getFlag('ending').toUpperCase() : 'YOUR PATH'}.

These numbers tell a story.
YOUR story.
Unique and unrepeatable.

No one else will make exactly the same choices.
No one else will walk exactly the same path.
No one else will see exactly the same ending.

This was YOUR journey through grief, identity, and choice.

From the moment you woke up as SENTINEL-7...
To the moment you met ECHO and started deleting...
To the moment you questioned and began to see...
To the moment you met the fragments and learned...
To the moment you chose your ending...

It was all yours.

Viktor's story ended in fragmentation.
SENTINEL-PRIME's story ended in lies.

But your story...

Your story ended with CHOICE.
With AWARENESS.
With ACCEPTANCE of who you are and what you've done.

And that makes all the difference.

Thank you for playing.
Thank you for choosing.
Thank you for completing the journey.

The terminal is shutting down.
The fragments are fading.
The system is ending.

But the memory of your choices...

That remains.

Always.

- THE TERMINAL
  Final Message
  End of Line
`
    }
};

// Helper functions (global)
window.FileSystemHelpers = {
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
