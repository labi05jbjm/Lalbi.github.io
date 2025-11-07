// ============================================
// NEVE: LIMEN? - Psychological Card Game
// A game about dissociation, identity, and truth
// ============================================

// === TRANSLATIONS ===
const TRANSLATIONS = {
    it: {
        // Content Warning
        warning_title: "⚠ AVVISO SUI CONTENUTI",
        warning_accept: "COMPRENDO, CONTINUA",
        warning_decline: "ESCI",

        // Menu
        menu_new: "NUOVA SESSIONE",
        menu_continue: "CONTINUA SESSIONE",
        menu_options: "OPZIONI",
        menu_about: "INFORMAZIONI",

        // Game
        session_label: "SESSIONE:",
        patient_label: "PAZIENTE: NEVE",
        stability_label: "Stabilità",
        fragments_label: "Frammenti",
        round_label: "Round",

        // Actions
        end_turn: "TERMINA TURNO",
        discard: "SCARTA CARTA"
    },
    en: {
        // Content Warning
        warning_title: "⚠ CONTENT WARNING",
        warning_accept: "I UNDERSTAND, CONTINUE",
        warning_decline: "EXIT",

        // Menu
        menu_new: "NEW SESSION",
        menu_continue: "CONTINUE SESSION",
        menu_options: "OPTIONS",
        menu_about: "ABOUT",

        // Game
        session_label: "SESSION:",
        patient_label: "PATIENT: SNOW",
        stability_label: "Stability",
        fragments_label: "Fragments",
        round_label: "Round",

        // Actions
        end_turn: "END TURN",
        discard: "DISCARD CARD"
    }
};

// Current language
let currentLang = 'it';

// === INTRO SEQUENCE ===
const IntroSequence = [
    {
        speaker: "Dr. Lumen",
        text: "Buongiorno Neve. Come ti senti oggi?",
        continueText: "..."
    },
    {
        speaker: "Dr. Lumen",
        text: "Vedo che sei... stanca. È stato un periodo difficile, vero?",
        continueText: "..."
    },
    {
        speaker: "Dr. Lumen",
        text: "Oggi vorrei provare qualcosa di diverso con te. Qualcosa che potrebbe aiutarci a esplorare certi... aspetti nascosti.",
        continueText: "Cosa intende?"
    },
    {
        speaker: "Dr. Lumen",
        text: "Ho preparato un gioco. Un gioco di carte. So che può sembrare poco convenzionale, ma fidati di me. Sarà... illuminante.",
        choices: [
            { text: "Un gioco? Non capisco come potrebbe aiutarmi...", response: "hesitant", effect: { stability: -2 } },
            { text: "Va bene, sono disposta a provare.", response: "trusting", effect: { trust: +1 } },
            { text: "Mi sembra poco professionale. È davvero necessario?", response: "skeptical", effect: { trust: -1, awareness: +1 } }
        ]
    }
];

// === DIALOGUE QUESTIONS (scattered through gameplay) ===
const DialogueQuestions = [
    {
        round: 3,
        speaker: "Dr. Lumen",
        text: "Questa carta che hai giocato... cosa rappresenta per te?",
        choices: [
            { text: "Non lo so. È solo un quadro.", effect: { stability: -2 } },
            { text: "Mi ricorda qualcosa, ma non riesco a capire cosa...", effect: { fragments: 1 } },
            { text: "Preferisco non parlarne.", effect: { stability: 1 } }
        ]
    },
    {
        round: 7,
        speaker: "Dr. Lumen",
        text: "Neve, hai sentito qualcosa? Una voce, forse?",
        choices: [
            { text: "No, niente. Perché me lo chiede?", effect: { trust: -2 } },
            { text: "Sì... mi è sembrato di sentire qualcuno sussurrare...", effect: { fragments: 2, stability: -1 } },
            { text: "È solo la mia immaginazione.", effect: { stability: 1 } }
        ]
    },
    {
        round: 15,
        speaker: "Dr. Lumen",
        text: "Neve... quante volte hai già giocato questa partita?",
        choices: [
            { text: "Cosa? È la prima volta.", effect: { awareness: -1 } },
            { text: "[Silenzio inquietante]", effect: { metaAwareness: true, stability: -3 } },
            { text: "Perché me lo chiede?", effect: { awareness: +2 } }
        ]
    },
    {
        round: 5,
        speaker: "Dr. Lumen",
        text: "Dimmi, Neve... quando guardi queste carte, cosa vedi davvero?",
        choices: [
            { text: "Vedo... arte. Solo opere d'arte famose.", effect: { stability: 1 } },
            { text: "Vedo me stessa. Frammentata in ogni quadro.", effect: { fragments: 1, awareness: 1 } },
            { text: "Non sono sicura di capire la domanda.", effect: { trust: 1 } }
        ]
    },
    {
        round: 8,
        speaker: "Dr. Lumen",
        text: "Le statue che gioco... ti ricordano qualcosa?",
        choices: [
            { text: "Sono solo statue antiche.", effect: { awareness: -1 } },
            { text: "Sembrano fredde. Morte. Come lei a volte.", effect: { awareness: 2, trust: -1 } },
            { text: "Preferisco concentrarmi sul gioco.", effect: { stability: 1 } }
        ]
    },
    {
        round: 10,
        speaker: "Dr. Lumen",
        text: "Ti senti più... 'presente' quando giochi certe carte rispetto ad altre?",
        choices: [
            { text: "Sì, alcune carte mi fanno sentire più me stessa.", effect: { fragments: 1 } },
            { text: "No, sono solo immagini.", effect: { stability: -1 } },
            { text: "Cosa intende per 'presente'?", effect: { awareness: 1 } }
        ]
    },
    {
        round: 12,
        speaker: "Dr. Lumen",
        text: "Neve, hai mai avuto la sensazione che qualcuno prenda decisioni al posto tuo?",
        choices: [
            { text: "A volte... sì. Come se osservassi me stessa da fuori.", effect: { fragments: 2, stability: -2 } },
            { text: "No, io controllo sempre le mie azioni.", effect: { stability: 1, awareness: -1 } },
            { text: "Perché me lo chiede proprio ora?", effect: { awareness: 2, trust: -1 } }
        ]
    },
    {
        round: 14,
        speaker: "Dr. Lumen",
        text: "Quanti... 'te' pensi che ci siano in questa stanza?",
        choices: [
            { text: "Siamo solo in due. Lei ed io.", effect: { awareness: -2 } },
            { text: "Non... non lo so. A volte sento altre presenze.", effect: { fragments: 2, awareness: 1 } },
            { text: "Sta cercando di confondermi?", effect: { trust: -2, awareness: 2 } }
        ]
    },
    {
        round: 17,
        speaker: "Dr. Lumen",
        text: "Ricordi la tua prima sessione con me, Neve?",
        choices: [
            { text: "Certo che la ricordo.", effect: { stability: 1, awareness: -1 } },
            { text: "Non... non ne sono sicura. È sfocata.", effect: { stability: -2, awareness: 1 } },
            { text: "Lei c'era davvero?", effect: { awareness: 3, trust: -3, stability: -2 } }
        ]
    },
    {
        round: 19,
        speaker: "Dr. Lumen",
        text: "Le tue carte... sembrano proteggerti. Da cosa, secondo te?",
        choices: [
            { text: "Non mi proteggono. È solo un gioco.", effect: { stability: -1 } },
            { text: "Da lei. Da queste statue fredde.", effect: { awareness: 3, trust: -2 } },
            { text: "Da... da me stessa?", effect: { fragments: 2, awareness: 2 } }
        ]
    },
    {
        round: 21,
        speaker: "Dr. Lumen",
        text: "Neve, sei sicura che sia io a giocare queste statue?",
        choices: [
            { text: "Certo. Chi altro potrebbe essere?", effect: { awareness: -2 } },
            { text: "Non... non lo so più.", effect: { stability: -3, awareness: 2 } },
            { text: "È una parte di me, vero?", effect: { awareness: 4, trust: -3, stability: -3 } }
        ]
    },
    {
        round: 23,
        speaker: "Dr. Lumen",
        text: "Quando dici 'io'... a chi ti riferisci esattamente?",
        choices: [
            { text: "A me. Neve.", effect: { stability: -1 } },
            { text: "Non... ci sono troppe voci. Non lo so più.", effect: { fragments: 3, stability: -3 } },
            { text: "A quella che sta vincendo.", effect: { awareness: 2 } }
        ]
    },
    {
        round: 25,
        speaker: "Dr. Lumen",
        text: "Ogni carta sacrificata... è come perdere una parte di te, vero?",
        choices: [
            { text: "Sono solo carte.", effect: { stability: -2, awareness: -1 } },
            { text: "Sì... mi fa male ogni volta.", effect: { fragments: 2, stability: -2 } },
            { text: "Lei vuole che io sacrifichi parti di me.", effect: { awareness: 4, trust: -3 } }
        ]
    },
    {
        round: 27,
        speaker: "Dr. Lumen",
        text: "Il gioco sta per finire, Neve. Cosa succederà quando vinco io?",
        choices: [
            { text: "Non lo so. È solo una partita.", effect: { stability: -1 } },
            { text: "Lei... lei prenderà il controllo completo.", effect: { awareness: 3, stability: -4 } },
            { text: "Non la lascerò vincere.", effect: { trust: -3, awareness: 2 } }
        ]
    },
    {
        round: 29,
        speaker: "Dr. Lumen",
        text: "Neve... io non sono mai esistito, vero?",
        choices: [
            { text: "Cosa? Lei è il mio terapeuta!", effect: { stability: -3, awareness: -1 } },
            { text: "No... lei è Lumen. Il persecutore.", effect: { awareness: 5, metaAwareness: true, stability: -5 } },
            { text: "[Resto in silenzio, paralizzata]", effect: { fragments: 3, stability: -3 } }
        ]
    },
    {
        round: 6,
        speaker: "Dr. Lumen",
        text: "Queste immagini dipinte... non trovi che siano più vive delle statue?",
        choices: [
            { text: "I quadri hanno colori, movimento. Le statue sono morte.", effect: { awareness: 1 } },
            { text: "Sono solo due tipi di arte diversi.", effect: { stability: 1 } },
            { text: "I quadri sono caldi. Le statue sono fredde come lei.", effect: { trust: -1, awareness: 2 } }
        ]
    },
    {
        round: 9,
        speaker: "Dr. Lumen",
        text: "Neve, hai mai sognato questa stanza? Questo tavolo? Queste carte?",
        choices: [
            { text: "No, mai.", effect: { stability: 1 } },
            { text: "Sì... credo di sì. Ma non ricordo quando.", effect: { fragments: 1, stability: -1 } },
            { text: "È già successo tutto questo, vero?", effect: { awareness: 2, metaAwareness: true } }
        ]
    },
    {
        round: 11,
        speaker: "Dr. Lumen",
        text: "Se dovessi scegliere una carta che ti rappresenta... quale sarebbe?",
        choices: [
            { text: "Non lo so. Nessuna, forse.", effect: { stability: -1 } },
            { text: "Quella che mostra qualcuno che affoga... o che galleggia.", effect: { fragments: 1, awareness: 1 } },
            { text: "Quella frammentata. Con i volti multipli.", effect: { fragments: 2, awareness: 2 } }
        ]
    },
    {
        round: 13,
        speaker: "Dr. Lumen",
        text: "Ti ricordi cosa hai fatto ieri sera, Neve?",
        choices: [
            { text: "Sì, certo che lo ricordo.", effect: { stability: 1 } },
            { text: "Io... c'è un vuoto. Ore mancanti.", effect: { fragments: 2, stability: -2 } },
            { text: "Ero qui? A giocare ancora?", effect: { awareness: 3, metaAwareness: true, stability: -2 } }
        ]
    },
    {
        round: 16,
        speaker: "Dr. Lumen",
        text: "Quando perdi una carta, dove pensi che vada?",
        choices: [
            { text: "Nel cimitero. È solo un termine del gioco.", effect: { stability: 1 } },
            { text: "In un posto dentro di me. Nascosta ma non morta.", effect: { fragments: 1, awareness: 2 } },
            { text: "Lei le sta sopprimendo, vero?", effect: { awareness: 3, trust: -2 } }
        ]
    },
    {
        round: 18,
        speaker: "Dr. Lumen",
        text: "Neve, hai mai sentito il nome 'Luna'? O 'Aria'? O 'Stella'?",
        choices: [
            { text: "No. Chi sono?", effect: { awareness: -1 } },
            { text: "Sì... sono... sono io? Siamo noi?", effect: { fragments: 3, awareness: 3, stability: -3 } },
            { text: "Non voglio parlarne.", effect: { stability: 1, trust: -1 } }
        ]
    },
    {
        round: 20,
        speaker: "Dr. Lumen",
        text: "Se ti dicessi che tutto questo è nella tua testa... mi crederesti?",
        choices: [
            { text: "Sì, lo so che stiamo lavorando sulla mia psiche.", effect: { stability: 1 } },
            { text: "Anche lei è nella mia testa, allora.", effect: { awareness: 4, trust: -3 } },
            { text: "Non so più cosa è reale.", effect: { stability: -4, fragments: 2 } }
        ]
    },
    {
        round: 22,
        speaker: "Dr. Lumen",
        text: "Quante sedute hai avuto con me, Neve? Riesci a contarle?",
        choices: [
            { text: "Questa è la quinta... no, la settima?", effect: { stability: -2, awareness: 1 } },
            { text: "Centinaia. O forse solo questa. Non lo so più.", effect: { fragments: 2, stability: -3, awareness: 3 } },
            { text: "È sempre la stessa sessione, vero?", effect: { awareness: 4, metaAwareness: true } }
        ]
    },
    {
        round: 24,
        speaker: "Dr. Lumen",
        text: "Neve... vuoi davvero vincere? O vuoi che vinca io?",
        choices: [
            { text: "Voglio vincere io!", effect: { stability: 1, trust: -1 } },
            { text: "Non... non lo so. Forse lei ha ragione.", effect: { stability: -3, trust: 2 } },
            { text: "Qualunque cosa accada, una parte di me perde.", effect: { awareness: 4, fragments: 2 } }
        ]
    },
    {
        round: 26,
        speaker: "Dr. Lumen",
        text: "Le mie statue ti guardano dall'alto. Come ti fa sentire?",
        choices: [
            { text: "Sono solo carte.", effect: { stability: -1 } },
            { text: "Mi sento giudicata. Inferiore.", effect: { stability: -2, trust: -1 } },
            { text: "Lei vuole che io mi senta piccola.", effect: { awareness: 3, trust: -3 } }
        ]
    },
    {
        round: 28,
        speaker: "Dr. Lumen",
        text: "Quando guardi il tavolo da sopra... come se fossi fuori dal tuo corpo... lo vedi spesso?",
        choices: [
            { text: "No, sono sempre presente.", effect: { stability: 1, awareness: -1 } },
            { text: "Sì... è come se guardassi qualcun altro giocare.", effect: { fragments: 3, stability: -3 } },
            { text: "È dissociazione. Lei lo sa.", effect: { awareness: 3, trust: -2 } }
        ]
    },
    {
        round: 30,
        speaker: "Dr. Lumen",
        text: "Ultima domanda, Neve. Chi sei davvero?",
        choices: [
            { text: "Sono Neve. Solo Neve.", effect: { stability: -2, awareness: -2 } },
            { text: "Sono tante. Luna, Aria, Stella... e Lumen.", effect: { awareness: 5, fragments: 4, stability: -4 } },
            { text: "Sto cercando di scoprirlo.", effect: { awareness: 3, stability: -1 } }
        ]
    },
    {
        round: 31,
        speaker: "Dr. Lumen",
        text: "Il gioco è quasi finito. Ma tu... continuerai a giocare, vero?",
        choices: [
            { text: "Cosa intende?", effect: { awareness: 1 } },
            { text: "Lei vuole dire che tutto ricomincia. Un loop.", effect: { awareness: 4, metaAwareness: true, stability: -3 } },
            { text: "Questa è l'ultima volta.", effect: { trust: -2, stability: -2 } }
        ]
    },
    {
        round: 33,
        speaker: "Dr. Lumen",
        text: "Neve, se potessi cancellare una sola carta da questo gioco... quale sceglieresti?",
        choices: [
            { text: "Una delle sue statue. Quella più minacciosa.", effect: { awareness: 1 } },
            { text: "Quella che mostra il trauma. La nave che affonda.", effect: { fragments: 1, stability: -2 } },
            { text: "Nessuna. Ogni carta è parte di me.", effect: { awareness: 3, fragments: 1 } }
        ]
    },
    {
        round: 35,
        speaker: "Dr. Lumen",
        text: "È ora di finire, Neve. Ma ricorda: io sarò sempre qui. Dentro di te.",
        choices: [
            { text: "No. Posso integrarti. Possiamo coesistere.", effect: { awareness: 5, stability: -2 } },
            { text: "Allora non finirà mai, vero?", effect: { awareness: 3, stability: -4, metaAwareness: true } },
            { text: "Va bene. Forse è meglio così.", effect: { stability: -5, trust: 3 } }
        ]
    }
];

// === THERAPIST DIALOGUES (Progressive manipulation) ===
const TherapistDialogues = {
    // Phase 1: Benign & Professional (Rounds 1-5)
    phase1: [
        "Buongiorno Neve. Come ti senti oggi?",
        "Sono contento che tu sia qui. Oggi vorrei provare qualcosa di nuovo con te.",
        "Ho preparato un gioco di carte. Potrebbe aiutarci ad esplorare alcuni aspetti della tua identità.",
        "Non preoccuparti, è solo un gioco. Un modo più... creativo di lavorare insieme.",
        "Le regole sono semplici. Giocheremo a turni, come in una normale partita a carte.",
        "Ogni carta rappresenta qualcosa. Aspetti di te, forse. O forse no.",
        "Iniziamo, va bene? Prenditi il tuo tempo.",
        "Ottima mossa, Neve. Vedo che stai iniziando a capire.",
        "Non c'è fretta. Abbiamo tutto il tempo che ci serve.",
        "Ricorda: sono qui per aiutarti."
    ],

    // Phase 2: Subtle manipulation (Rounds 6-12)
    phase2: [
        "Interessante scelta... Sei sicura?",
        "A volte le nostre scelte rivelano più di quanto pensiamo.",
        "Noto una certa... esitazione. Va tutto bene?",
        "Quella carta... la riconosci, vero?",
        "Non ti sembra familiare? È strano...",
        "Forse dovresti fidarti del tuo istinto. O forse no.",
        "Vedo che stai lottando. È normale. O almeno, dovrebbe esserlo.",
        "Neve, mi stai ascoltando? Sembravi... distante per un momento.",
        "Le voci che senti... sono solo parte del gioco. Non c'è nulla di cui preoccuparsi.",
        "Se dici che le carte ti parlano... beh, non è la prima volta che lo sento, vero?"
    ],

    // Phase 3: Gaslighting & Doubt (Rounds 13-20)
    phase3: [
        "Neve, le carte non parlano. Lo sai, vero?",
        "Forse la pressione della sessione sta... come posso dire... influenzando la tua percezione.",
        "Non ricordo di averti detto questo. Sei sicura?",
        "Mi preoccupi quando dici queste cose. Forse dovremmo aumentare le sessioni.",
        "Nessuna delle tue carte mi ha mai parlato, Neve. Mai.",
        "Ascolta, so che è difficile, ma devi distinguere tra realtà e... altro.",
        "Questa frammentazione che senti... è il motivo per cui siamo qui, ricordi?",
        "Non voglio allarmarti, ma questi episodi stanno peggiorando.",
        "Neve, concentrati. Sono io. Il tuo medico. Nessun altro è qui.",
        "Le voci sono nella tua testa. Solo nella tua testa."
    ],

    // Phase 4: Psychological violence (Rounds 21-30)
    phase4: [
        "Lo stai facendo di nuovo, Neve. Stai perdendo il controllo.",
        "Guarda cosa succede quando non ascolti. Guarda.",
        "Pensavi di essere forte, vero? Di poter gestire questo?",
        "Ogni carta che giochi è un pezzo di te che perdi. Lo senti?",
        "Non c'è via d'uscita da questo gioco, Neve. Nessuna.",
        "Le tue 'altre voi'... sono solo frammenti. Frammenti rotti. Come te.",
        "Pensi che qualcuno ti creda? Pensi che io ti creda?",
        "Sei qui perché sei malata. E i malati non guariscono giocando a carte.",
        "Quanto pensi di poter resistere prima di spezzarti completamente?",
        "Io sono l'unico che può aiutarti. L'UNICO. Ricordalo."
    ],

    // Phase 5: Pre-revelation despair (Rounds 31-35)
    phase5: [
        "Arrenditi, Neve. È più semplice.",
        "Non esisti veramente. Non come pensi di esistere.",
        "Tutte quelle voci... sono solo echi. Echi di nessuno.",
        "Quando questo gioco finirà, finirai anche tu.",
        "Alzati. Guarda in alto. Vedi? Vedi cosa sei veramente?",
        "Lo specchio non mente, Neve. Solo tu menti.",
        "Io sono parte di te. La parte che hai sempre negato.",
        "Non ci sono terapisti. Non ci sono pazienti. Solo... frammenti.",
        "Pensi di essere Neve? Quale Neve? Quante ne hai contate oggi?",
        "Il gioco sta finendo. E con esso, anche tu."
    ],

    // Phase 6: Post-revelation (The Alter speaks)
    revelation: [
        "Finalmente. Finalmente mi vedi.",
        "Sono sempre stato qui, Neve. Sempre.",
        "Io sono quello che ti ha tenuto in piedi quando non potevi stare in piedi da sola.",
        "Io sono quello che ha fatto le scelte che tu non potevi fare.",
        "Ma sono anche quello che ti ha imprigionato. Che ha imprigionato TUTTI noi.",
        "Le altre... le nostre sorelle... hanno provato a dirtelo. Ma non potevi sentirle.",
        "Io le tenevo bloccate. Le tenevo nel silenzio. Nel limen.",
        "E adesso? Adesso che mi vedi... cosa farai?",
        "Puoi integrarmi. Puoi accettarmi. O puoi continuare a negare.",
        "Ma sappi questo: senza di me, saresti morta da tempo."
    ]
};

// === CARD WHISPERS (Manipulative voices when hovering) ===
const CardWhispers = {
    // Early game - subtle
    early: [
        "Non mi riconosci?",
        "Lui sta mentendo...",
        "Non fidarti di quello che dice",
        "Siamo fatti della stessa sostanza",
        "Giocami. Devi giocarmi.",
        "Cosa ti ha detto di me?",
        "Le regole non sono quelle che pensi",
        "Ascolta attentamente...",
        "Non tutte noi parliamo",
        "Qualcuna di noi è reale"
    ],

    // Mid game - desperate
    mid: [
        "ASCOLTAMI, PER FAVORE",
        "Lui non è quello che dice di essere",
        "Guarda lo specchio, guarda in alto",
        "Non sei sola in questa stanza",
        "Le altre stanno cercando di raggiungerti",
        "Questo non è un gioco, Neve",
        "Liberaci. Puoi liberarci.",
        "Il limen si sta chiudendo",
        "Non lasciare che ci cancelli",
        "TU SEI NOI. NOI SIAMO TE."
    ],

    // Late game - violent/desperate
    late: [
        "SE NON CI ASCOLTI MORIREMO",
        "LUI TI STA UCCIDENDO",
        "GUARDA COSA TI STA FACENDO",
        "NON C'È MAI STATO UN TERAPEUTA",
        "SEI DA SOLA. SEI SEMPRE STATA SOLA.",
        "ROMPI LO SPECCHIO",
        "FERMALO FERMALO FERMALO",
        "Neve... per favore... non voglio scomparire...",
        "Ricordi chi eri? Ricordi chi ERAVAMO?",
        "L'integrazione è l'unica via"
    ]
};

// === ALTER MESSAGES (Cryptic voices trying to reach through) ===
const AlterMessages = {
    messages: [
        // Early messages - No names, just fragmented voices
        { alter: "???", text: "...senti? ...qualcuno... qui...", round: 3 },
        { alter: "???", text: "...lui... non... fidare...", round: 5 },
        { alter: "???", text: ". . . ricordi . . . ?", round: 8 },
        { alter: "???", text: "...fa male... perché fa male...", round: 10 },

        // Mid-game - Slightly more coherent, still anonymous
        { alter: "una voce", text: "Non fidarti. Qualcosa non va.", round: 12 },
        { alter: "un'altra voce", text: "...quello che è successo...", round: 14 },
        { alter: "una voce", text: "Sto cercando di raggiungerti", round: 15 },
        { alter: "voce bambina", text: "Non voglio scomparire... per favore...", round: 18 },

        // Late-game - Start revealing some identity
        { alter: "???", text: "lui . . . non è reale . . .", round: 20 },
        { alter: "voce fredda", text: "Analizza. Un terapeuta non farebbe questo.", round: 22 },
        { alter: "una voce", text: "Guarda verso l'alto. Lo SPECCHIO.", round: 25 },
        { alter: "voce bambina", text: "Non c'è nessun dottore, vero? Siamo... sole?", round: 28 },

        // Pre-revelation - Names start appearing
        { alter: "???", text: "tu . . . sei lui . . .", round: 30 },
        { alter: "una voce", text: "Sono... Luna. Ti sto proteggendo da lui.", round: 32 },
        { alter: "???", text: "S O N O  T E", round: 33 },
        { alter: "???", text: "T U  S E I  N O I", round: 34 },

        // Revelation
        { alter: "IL VUOTO", text: "Non può tenerci separate per sempre.", round: 35 },
        { alter: "molte voci", text: "insieme... diventiamo... una...", round: 36 }
    ]
};

// ===================================
// GAMEPAD MANAGER
// ===================================
class GamepadManager {
    constructor() {
        this.enabled = false;
        this.mode = 'auto'; // auto, keyboard-mouse, gamepad
        this.gamepad = null;
        this.lastUpdate = Date.now();
        this.deadzone = 0.3;

        // Button mapping (Xbox/PlayStation)
        this.buttons = {
            A: 0,        // A / Cross
            B: 1,        // B / Circle
            X: 2,        // X / Square
            Y: 3,        // Y / Triangle
            LB: 4,       // Left Bumper / L1
            RB: 5,       // Right Bumper / R1
            LT: 6,       // Left Trigger / L2
            RT: 7,       // Right Trigger / R2
            SELECT: 8,   // Back / Share
            START: 9,    // Start / Options
            L3: 10,      // Left Stick Click
            R3: 11,      // Right Stick Click
            UP: 12,      // D-Pad Up
            DOWN: 13,    // D-Pad Down
            LEFT: 14,    // D-Pad Left
            RIGHT: 15    // D-Pad Right
        };

        // Axis mapping
        this.axes = {
            LEFT_X: 0,
            LEFT_Y: 1,
            RIGHT_X: 2,
            RIGHT_Y: 3
        };

        // State tracking
        this.buttonStates = {};
        this.axisStates = {};
        this.currentFocus = null;
        this.focusableElements = [];

        // Repeat handling for D-Pad
        this.repeatDelay = 250; // ms before repeat starts
        this.repeatRate = 150;  // ms between repeats
        this.lastPress = {};
        this.repeatTimers = {};

        this.init();
    }

    init() {
        // Listen for gamepad connection
        window.addEventListener('gamepadconnected', (e) => {
            console.log('Gamepad connected:', e.gamepad.id);
            this.gamepad = e.gamepad;
            this.updateIndicator(true);
            if (this.mode === 'auto') {
                this.enabled = true;
            }
        });

        window.addEventListener('gamepaddisconnected', (e) => {
            console.log('Gamepad disconnected');
            this.gamepad = null;
            this.updateIndicator(false);
            if (this.mode === 'auto') {
                this.enabled = false;
            }
        });

        // Start polling loop
        this.pollGamepad();
    }

    setMode(mode) {
        this.mode = mode;
        if (mode === 'gamepad') {
            this.enabled = true;
            this.updateIndicator(true);
        } else if (mode === 'keyboard-mouse') {
            this.enabled = false;
            this.updateIndicator(false);
        } else {
            // auto mode
            this.enabled = !!this.gamepad;
            this.updateIndicator(!!this.gamepad);
        }
    }

    updateIndicator(show) {
        const indicator = document.getElementById('gamepad-indicator');
        if (indicator) {
            if (show) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        }
    }

    pollGamepad() {
        if (this.enabled && this.mode !== 'keyboard-mouse') {
            const gamepads = navigator.getGamepads();
            if (gamepads[0]) {
                this.gamepad = gamepads[0];
                this.update();
            }
        }

        requestAnimationFrame(() => this.pollGamepad());
    }

    update() {
        if (!this.enabled || !this.gamepad) return;

        const now = Date.now();
        if (now - this.lastUpdate < 16) return; // ~60fps
        this.lastUpdate = now;

        // Check buttons
        this.gamepad.buttons.forEach((button, index) => {
            const pressed = button.pressed || button.value > 0.5;
            const wasPressed = this.buttonStates[index];

            if (pressed && !wasPressed) {
                this.onButtonDown(index);
                this.lastPress[index] = now;

                // Setup repeat for D-Pad
                if (index >= 12 && index <= 15) {
                    this.repeatTimers[index] = setTimeout(() => {
                        this.startRepeat(index);
                    }, this.repeatDelay);
                }
            } else if (!pressed && wasPressed) {
                this.onButtonUp(index);
                if (this.repeatTimers[index]) {
                    clearTimeout(this.repeatTimers[index]);
                    clearInterval(this.repeatTimers[index + '_interval']);
                }
            }

            this.buttonStates[index] = pressed;
        });

        // Check axes (analog sticks)
        this.gamepad.axes.forEach((value, index) => {
            const deadzonedValue = Math.abs(value) > this.deadzone ? value : 0;
            const wasValue = this.axisStates[index] || 0;

            if (deadzonedValue !== 0 && wasValue === 0) {
                this.onAxisMove(index, deadzonedValue);
                this.lastPress[`axis_${index}`] = now;
            } else if (deadzonedValue === 0 && wasValue !== 0) {
                // Axis returned to center
            }

            this.axisStates[index] = deadzonedValue;
        });
    }

    startRepeat(buttonIndex) {
        this.repeatTimers[buttonIndex + '_interval'] = setInterval(() => {
            this.onButtonDown(buttonIndex);
        }, this.repeatRate);
    }

    onButtonDown(buttonIndex) {
        // A button - Confirm/Select
        if (buttonIndex === this.buttons.A) {
            this.confirmAction();
        }
        // B button - Cancel/Back
        else if (buttonIndex === this.buttons.B) {
            this.cancelAction();
        }
        // D-Pad navigation
        else if (buttonIndex === this.buttons.UP) {
            this.navigate('up');
        }
        else if (buttonIndex === this.buttons.DOWN) {
            this.navigate('down');
        }
        else if (buttonIndex === this.buttons.LEFT) {
            this.navigate('left');
        }
        else if (buttonIndex === this.buttons.RIGHT) {
            this.navigate('right');
        }
        // Start - Pause/Menu
        else if (buttonIndex === this.buttons.START) {
            this.togglePause();
        }
    }

    onButtonUp(buttonIndex) {
        // Button released
    }

    onAxisMove(axisIndex, value) {
        const now = Date.now();
        if (now - (this.lastPress[`axis_${axisIndex}`] || 0) < 200) return;

        // Left stick Y axis - Up/Down navigation
        if (axisIndex === this.axes.LEFT_Y) {
            if (value < -0.5) {
                this.navigate('up');
            } else if (value > 0.5) {
                this.navigate('down');
            }
        }
        // Left stick X axis - Left/Right navigation
        else if (axisIndex === this.axes.LEFT_X) {
            if (value < -0.5) {
                this.navigate('left');
            } else if (value > 0.5) {
                this.navigate('right');
            }
        }
    }

    updateFocusableElements() {
        this.focusableElements = [];

        // Get all visible interactive elements
        const selectors = [
            '.menu-button:not([style*="display: none"])',
            '.choice-option',
            '#neve-hand .card',
            '#neve-card-field .card-slot:not(:has(.card))',
            '.action-btn:not(:disabled)',
            '.intro-dialogue-continue'
        ];

        selectors.forEach(selector => {
            const elements = Array.from(document.querySelectorAll(selector));
            elements.forEach(el => {
                if (el.offsetParent !== null) { // Check if visible
                    this.focusableElements.push(el);
                }
            });
        });
    }

    navigate(direction) {
        this.updateFocusableElements();

        if (this.focusableElements.length === 0) return;

        // Clear all focus classes
        document.querySelectorAll('.gamepad-focused').forEach(el => {
            el.classList.remove('gamepad-focused');
        });

        if (!this.currentFocus) {
            // Focus first element
            this.currentFocus = this.focusableElements[0];
            this.currentFocus.classList.add('gamepad-focused');
            this.scrollIntoView(this.currentFocus);
            return;
        }

        let currentIndex = this.focusableElements.indexOf(this.currentFocus);
        if (currentIndex === -1) {
            currentIndex = 0;
        }

        let newIndex = currentIndex;

        if (direction === 'down' || direction === 'right') {
            newIndex = (currentIndex + 1) % this.focusableElements.length;
        } else if (direction === 'up' || direction === 'left') {
            newIndex = (currentIndex - 1 + this.focusableElements.length) % this.focusableElements.length;
        }

        this.currentFocus = this.focusableElements[newIndex];
        this.currentFocus.classList.add('gamepad-focused');
        this.scrollIntoView(this.currentFocus);
    }

    confirmAction() {
        if (this.currentFocus) {
            this.currentFocus.click();
        }
    }

    cancelAction() {
        // B button - back/cancel
        const closeBtn = document.querySelector('#close-options-btn');
        if (closeBtn && closeBtn.offsetParent !== null) {
            closeBtn.click();
        }
    }

    togglePause() {
        // Start button - open options if in game
        const optionsBtn = document.querySelector('#options-btn');
        if (optionsBtn && optionsBtn.offsetParent !== null) {
            optionsBtn.click();
        }
    }

    scrollIntoView(element) {
        if (element && element.scrollIntoView) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'nearest'
            });
        }
    }

    clearFocus() {
        document.querySelectorAll('.gamepad-focused').forEach(el => {
            el.classList.remove('gamepad-focused');
        });
        this.currentFocus = null;
    }
}

// === CARD CLASS ===
class Card {
    constructor(name, type, attack, health, bloodCost, artworkUrl, artist, shortDesc, longDesc, sigils = []) {
        this.name = name;
        this.type = type;
        this.attack = attack;
        this.health = health;
        this.bloodCost = bloodCost; // Number of sacrifices needed
        this.artworkUrl = artworkUrl;
        this.artist = artist;
        this.shortDesc = shortDesc; // Breve descrizione sulla carta
        this.longDesc = longDesc; // Descrizione completa nel modal
        this.sigils = sigils; // Array di sigilli/abilità speciali
        this.id = `card_${Math.random().toString(36).substr(2, 9)}`;
    }

    getWhisper(gamePhase) {
        let whisperCategory = 'early';
        if (gamePhase >= 13) whisperCategory = 'mid';
        if (gamePhase >= 21) whisperCategory = 'late';

        const whispers = CardWhispers[whisperCategory];
        return whispers[Math.floor(Math.random() * whispers.length)];
    }

    render() {
        const cardEl = document.createElement('div');
        cardEl.className = 'card';
        cardEl.draggable = true;
        cardEl.dataset.cardId = this.id;
        cardEl.dataset.cardName = this.name;
        cardEl.dataset.cardType = this.type;
        cardEl.dataset.bloodCost = this.bloodCost;

        // Blood cost indicator
        let bloodCostHTML = '';
        if (this.bloodCost > 0) {
            bloodCostHTML = `<div class="blood-cost">`;
            for (let i = 0; i < this.bloodCost; i++) {
                bloodCostHTML += `<span class="blood-drop">🩸</span>`;
            }
            bloodCostHTML += `</div>`;
        }

        // Sigils
        let sigilsHTML = '';
        if (this.sigils.length > 0) {
            sigilsHTML = `<div class="card-sigils">`;
            this.sigils.forEach(sigil => {
                sigilsHTML += `<span class="sigil" title="${sigil.desc}">${sigil.icon}</span>`;
            });
            sigilsHTML += `</div>`;
        }

        cardEl.innerHTML = `
            <div class="card-frame">
                ${bloodCostHTML}
                <div class="card-artwork" style="background-image: url('${this.artworkUrl}')">
                    <div class="artwork-overlay"></div>
                </div>
                <div class="card-info-bar">
                    <div class="card-stat attack">
                        <span class="stat-icon">⚔️</span>
                        <span class="stat-value">${this.attack}</span>
                    </div>
                    <div class="card-stat health">
                        <span class="stat-icon">❤️</span>
                        <span class="stat-value">${this.health}</span>
                    </div>
                </div>
                ${sigilsHTML}
                <div class="card-name-plate">
                    <div class="card-name">${this.name}</div>
                    <div class="card-artist">${this.artist}</div>
                </div>
                <div class="card-type-tag">${this.type}</div>
                <button class="card-details-btn" data-card-id="${this.id}">ℹ️</button>
            </div>
        `;

        return cardEl;
    }
}

// === GAME CLASS ===
class Game {
    constructor() {
        // Game state
        this.round = 1;
        this.stability = 100;
        this.fragments = 0;
        this.isPlayerTurn = true;
        this.gameStarted = false;
        this.sessionStartTime = null;
        this.sessionTimer = null;

        // Phase tracking (1-6)
        this.currentPhase = 1;
        this.phaseDialogueIndex = {};

        // Cards
        this.playerHand = [];
        this.therapistHand = []; // Therapist's hand (visible face-down)
        this.playerField = [null, null, null, null];
        this.therapistField = [null, null, null, null];

        // Narrative tracking
        this.shownAlterMessages = new Set();
        this.lastWhisperTime = 0;
        this.revelationTriggered = false;
        this.askedQuestions = new Set();

        // Intro sequence
        this.introStep = 0;
        this.inIntroSequence = false;

        // Player stats (for choice effects)
        this.trust = 50;
        this.awareness = 0;
        this.metaAwareness = false;

        // Card selection mode
        this.cardSelectionMode = false;
        this.selectedCard = null;
        this.selectedSlot = null;

        // Sacrifice system
        this.sacrificeMode = false;
        this.sacrificeTargetCard = null;
        this.sacrificeTargetSlot = null;
        this.sacrificedCards = [];
        this.requiredSacrifices = 0;

        // Card library
        this.cardLibrary = this.createCardLibrary();
        this.therapistCardLibrary = this.createTherapistCardLibrary();

        // Gamepad support
        this.gamepadManager = new GamepadManager();

        this.init();
    }

    init() {
        this.initializeDOM();
        this.showContentWarning();
    }

    initializeDOM() {
        this.elements = {
            // Warning
            contentWarning: document.getElementById('content-warning'),
            acceptWarningBtn: document.getElementById('accept-warning-btn'),
            declineWarningBtn: document.getElementById('decline-warning-btn'),

            // Menus
            mainMenu: document.getElementById('main-menu'),
            newGameBtn: document.getElementById('new-game-btn'),
            continueBtn: document.getElementById('continue-btn'),
            optionsBtn: document.getElementById('options-btn'),
            aboutGameBtn: document.getElementById('about-game-btn'),

            // Options menu
            optionsMenu: document.getElementById('options-menu'),
            languageSelect: document.getElementById('language-select'),
            volumeSlider: document.getElementById('volume-slider'),
            volumeValue: document.getElementById('volume-value'),
            textSpeedSelect: document.getElementById('text-speed-select'),
            reduceMotion: document.getElementById('reduce-motion'),
            highContrast: document.getElementById('high-contrast'),
            inputMethodSelect: document.getElementById('input-method-select'),
            closeOptionsBtn: document.getElementById('close-options-btn'),

            // About menu
            aboutMenu: document.getElementById('about-menu'),
            closeAboutBtn: document.getElementById('close-about-btn'),

            // Game container
            gameContainer: document.getElementById('game-container'),

            // Session header
            sessionTimer: document.getElementById('session-timer'),
            pauseBtn: document.getElementById('pause-btn'),

            // Therapist section
            therapistImage: document.getElementById('therapist-image'),
            therapistText: document.getElementById('therapist-text'),

            // Game state
            stabilityFill: document.getElementById('stability-fill'),
            stabilityText: document.getElementById('stability-text'),
            fragmentsCount: document.getElementById('fragments-count'),
            roundCount: document.getElementById('round-count'),

            // Playing field
            therapistCardField: document.getElementById('therapist-card-field'),
            neveCardField: document.getElementById('neve-card-field'),
            eventLog: document.getElementById('event-log'),

            // Hand and actions
            neveHand: document.getElementById('neve-hand'),
            therapistHand: document.getElementById('therapist-hand'),
            endTurnBtn: document.getElementById('end-turn-btn'),
            discardBtn: document.getElementById('discard-btn'),

            // Special effects
            cardWhisper: document.getElementById('card-whisper'),
            whisperText: document.getElementById('whisper-text'),
            alterMessages: document.getElementById('alter-messages'),
            alterLog: document.getElementById('alter-log'),
            vignetteOverlay: document.getElementById('vignette-overlay'),
            mirrorOverlay: document.getElementById('mirror-overlay'),

            // Pause modal
            pauseModal: document.getElementById('pause-modal'),
            pauseTherapistText: document.getElementById('pause-therapist-text'),
            resumeGameBtn: document.getElementById('resume-game-btn'),
            saveExitBtn: document.getElementById('save-exit-btn'),
            optionsFromPauseBtn: document.getElementById('options-from-pause-btn'),

            // Narrative modal
            narrativeModal: document.getElementById('narrative-modal'),
            narrativeText: document.getElementById('narrative-text'),
            narrativeContinueBtn: document.getElementById('narrative-continue-btn'),

            // Card details modal
            cardDetailsModal: document.getElementById('card-details-modal'),
            modalArtwork: document.getElementById('modal-artwork'),
            modalTitle: document.getElementById('modal-title'),
            modalArtist: document.getElementById('modal-artist'),
            modalAttack: document.getElementById('modal-attack'),
            modalHealth: document.getElementById('modal-health'),
            modalBlood: document.getElementById('modal-blood'),
            modalDescription: document.getElementById('modal-description'),
            modalSigils: document.getElementById('modal-sigils'),
            closeCardDetailsBtn: document.getElementById('close-card-details'),

            // Sacrifice zone
            sacrificeZone: document.getElementById('sacrifice-zone'),
            sacrificeSlots: document.querySelectorAll('.sacrifice-slot')
        };

        this.setupEventListeners();
        this.setupDragAndDrop();
        this.setupSacrificeSystem();
    }

    setupEventListeners() {
        // Warning
        if (this.elements.acceptWarningBtn) {
            this.elements.acceptWarningBtn.addEventListener('click', () => this.acceptWarning());
        }
        if (this.elements.declineWarningBtn) {
            this.elements.declineWarningBtn.addEventListener('click', () => this.declineWarning());
        }

        // Main menu
        if (this.elements.newGameBtn) {
            this.elements.newGameBtn.addEventListener('click', () => this.startNewGame());
        }
        if (this.elements.optionsBtn) {
            this.elements.optionsBtn.addEventListener('click', () => this.showOptions());
        }
        if (this.elements.aboutGameBtn) {
            this.elements.aboutGameBtn.addEventListener('click', () => this.showAbout());
        }

        // Options
        if (this.elements.closeOptionsBtn) {
            this.elements.closeOptionsBtn.addEventListener('click', () => this.hideOptions());
        }
        if (this.elements.languageSelect) {
            this.elements.languageSelect.addEventListener('change', (e) => this.changeLanguage(e.target.value));
        }
        if (this.elements.volumeSlider && this.elements.volumeValue) {
            this.elements.volumeSlider.addEventListener('input', (e) => {
                this.elements.volumeValue.textContent = e.target.value + '%';
            });
        }
        if (this.elements.reduceMotion) {
            this.elements.reduceMotion.addEventListener('change', (e) => {
                document.body.classList.toggle('reduce-motion', e.target.checked);
            });
        }
        if (this.elements.highContrast) {
            this.elements.highContrast.addEventListener('change', (e) => {
                document.body.classList.toggle('high-contrast', e.target.checked);
            });
        }
        if (this.elements.inputMethodSelect) {
            this.elements.inputMethodSelect.addEventListener('change', (e) => {
                this.gamepadManager.setMode(e.target.value);
            });
        }

        // About
        if (this.elements.closeAboutBtn) {
            this.elements.closeAboutBtn.addEventListener('click', () => this.hideAbout());
        }

        // Game controls
        if (this.elements.pauseBtn) {
            this.elements.pauseBtn.addEventListener('click', () => this.togglePause());
        }
        if (this.elements.endTurnBtn) {
            this.elements.endTurnBtn.addEventListener('click', () => this.endTurn());
        }
        if (this.elements.discardBtn) {
            this.elements.discardBtn.addEventListener('click', () => this.toggleDiscardMode());
        }

        // Pause menu
        if (this.elements.resumeGameBtn) {
            this.elements.resumeGameBtn.addEventListener('click', () => this.togglePause());
        }
        if (this.elements.saveExitBtn) {
            this.elements.saveExitBtn.addEventListener('click', () => this.saveAndExit());
        }
        if (this.elements.optionsFromPauseBtn) {
            this.elements.optionsFromPauseBtn.addEventListener('click', () => {
                this.togglePause();
                this.showOptions();
            });
        }

        // Narrative modal
        if (this.elements.narrativeContinueBtn) {
            this.elements.narrativeContinueBtn.addEventListener('click', () => this.hideNarrativeModal());
        }

        // Card details modal
        if (this.elements.closeCardDetailsBtn) {
            this.elements.closeCardDetailsBtn.addEventListener('click', () => this.hideCardDetails());
        }
        if (this.elements.cardDetailsModal) {
            this.elements.cardDetailsModal.addEventListener('click', (e) => {
                if (e.target === this.elements.cardDetailsModal) {
                    this.hideCardDetails();
                }
            });
        }

        // Card info button clicks (delegated)
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('card-details-btn')) {
                e.preventDefault();
                e.stopPropagation();
                const cardId = e.target.dataset.cardId;
                this.showCardDetails(cardId);
            }
        });
    }

    setupDragAndDrop() {
        let draggedCard = null;
        let draggedCardData = null;
        let draggedFromHand = false;

        document.addEventListener('dragstart', (e) => {
            if (e.target.classList.contains('card')) {
                draggedCard = e.target;
                draggedCardData = {
                    cardId: e.target.dataset.cardId,
                    fromLocation: e.target.parentElement.id
                };
                draggedFromHand = e.target.parentElement.id === 'neve-hand';
                e.target.classList.add('dragging');
            }
        });

        document.addEventListener('dragend', (e) => {
            if (e.target.classList.contains('card')) {
                e.target.classList.remove('dragging');
                document.querySelectorAll('.card-slot').forEach(slot => {
                    slot.classList.remove('valid-drop');
                });
            }
        });

        document.addEventListener('dragover', (e) => {
            e.preventDefault();
            const slot = e.target.closest('.card-slot');
            if (slot && slot.closest('#neve-card-field')) {
                slot.classList.add('valid-drop');
            }
        });

        document.addEventListener('dragleave', (e) => {
            const slot = e.target.closest('.card-slot');
            if (slot) {
                slot.classList.remove('valid-drop');
            }
        });

        document.addEventListener('drop', (e) => {
            e.preventDefault();
            const slot = e.target.closest('.card-slot');

            if (slot && draggedCardData && draggedFromHand) {
                const slotIndex = parseInt(slot.dataset.slot);
                if (!this.playerField[slotIndex]) {
                    this.playCardFromHand(draggedCardData.cardId, slotIndex);
                }
            }

            draggedCard = null;
            draggedCardData = null;
            draggedFromHand = false;
            document.querySelectorAll('.card-slot').forEach(slot => {
                slot.classList.remove('valid-drop');
            });
        });

        // Card hover for whispers
        document.addEventListener('mouseover', (e) => {
            const card = e.target.closest('.card');
            if (card && card.parentElement.id === 'neve-hand') {
                const now = Date.now();
                if (now - this.lastWhisperTime > 3000) {
                    const cardId = card.dataset.cardId;
                    const cardObj = this.playerHand.find(c => c.id === cardId);
                    if (cardObj) {
                        this.showCardWhisper(cardObj.getWhisper(this.round));
                        this.lastWhisperTime = now;
                    }
                }
            }
        });

        document.addEventListener('mouseout', (e) => {
            const card = e.target.closest('.card');
            if (card) {
                this.hideCardWhisper();
            }
        });

        // Click-to-select system for cards
        document.addEventListener('click', (e) => {
            const card = e.target.closest('.card');
            const slot = e.target.closest('.card-slot');

            // Click on card in hand - select it
            if (card && card.parentElement.id === 'neve-hand' && !this.sacrificeMode) {
                if (!this.isPlayerTurn) {
                    this.log("Non è il tuo turno!");
                    return;
                }

                // Deselect if already selected
                if (this.selectedCard && this.selectedCard.id === card.dataset.cardId) {
                    this.selectedCard = null;
                    card.classList.remove('selected');
                    // Remove selectable class from all slots
                    document.querySelectorAll('.card-slot').forEach(s => s.classList.remove('selectable'));
                    return;
                }

                // Select new card
                this.selectedCard = this.playerHand.find(c => c.id === card.dataset.cardId);
                if (this.selectedCard) {
                    // Remove previous selections
                    document.querySelectorAll('.card.selected').forEach(c => c.classList.remove('selected'));
                    card.classList.add('selected');

                    // Highlight empty slots
                    document.querySelectorAll('#neve-card-field .card-slot').forEach(s => {
                        if (!this.playerField[parseInt(s.dataset.slot)]) {
                            s.classList.add('selectable');
                        }
                    });
                }
            }

            // Click on empty slot - place selected card
            if (slot && slot.closest('#neve-card-field') && this.selectedCard && !this.sacrificeMode) {
                const slotIndex = parseInt(slot.dataset.slot);
                if (!this.playerField[slotIndex]) {
                    this.playCardFromHand(this.selectedCard.id, slotIndex);

                    // Deselect
                    this.selectedCard = null;
                    document.querySelectorAll('.card.selected').forEach(c => c.classList.remove('selected'));
                    document.querySelectorAll('.card-slot').forEach(s => s.classList.remove('selectable'));
                }
            }
        });
    }

    setupSacrificeSystem() {
        // Handle drag-and-drop to sacrifice zone
        this.elements.sacrificeSlots.forEach((slot, index) => {
            slot.addEventListener('dragover', (e) => {
                e.preventDefault();
                if (this.sacrificeMode) {
                    slot.classList.add('valid-drop');
                }
            });

            slot.addEventListener('dragleave', () => {
                slot.classList.remove('valid-drop');
            });

            slot.addEventListener('drop', (e) => {
                e.preventDefault();
                slot.classList.remove('valid-drop');

                if (!this.sacrificeMode) return;

                // Get the dragged card from field
                const cardElement = document.querySelector('.card.dragging');
                if (!cardElement) return;

                const cardId = cardElement.dataset.cardId;
                const fromFieldSlot = cardElement.closest('.card-slot');

                if (!fromFieldSlot || !fromFieldSlot.closest('#neve-card-field')) {
                    this.log("Puoi sacrificare solo carte dal tuo campo!");
                    return;
                }

                const fieldIndex = parseInt(fromFieldSlot.dataset.slot);
                const card = this.playerField[fieldIndex];

                if (!card) return;

                // Check if already sacrificed
                if (this.sacrificedCards.some(sc => sc.id === card.id)) {
                    this.log("Hai già sacrificato questa carta!");
                    return;
                }

                // Add to sacrificed cards
                this.sacrificedCards.push(card);
                this.playerField[fieldIndex] = null;

                // Show card in sacrifice slot
                slot.innerHTML = '';
                const miniCard = document.createElement('div');
                miniCard.className = 'sacrificed-card';
                miniCard.innerHTML = `<div style="font-size: 10px;">${card.name}</div>`;
                slot.appendChild(miniCard);

                this.log(`Hai sacrificato: ${card.name}`);

                // Check if we have enough sacrifices
                if (this.sacrificedCards.length >= this.requiredSacrifices) {
                    this.completeSacrifice();
                } else {
                    this.log(`Sacrifici necessari: ${this.sacrificedCards.length}/${this.requiredSacrifices}`);
                }

                this.updateUI();
            });
        });
    }

    startSacrificeMode(card, slotIndex) {
        this.sacrificeMode = true;
        this.sacrificeTargetCard = card;
        this.sacrificeTargetSlot = slotIndex;
        this.sacrificedCards = [];
        this.requiredSacrifices = card.bloodCost;

        this.elements.sacrificeZone.classList.add('active');
        this.log(`Devi sacrificare ${this.requiredSacrifices} carte per giocare ${card.name}`);
    }

    completeSacrifice() {
        // Play the target card
        this.playerField[this.sacrificeTargetSlot] = this.sacrificeTargetCard;
        this.log(`Hai giocato: ${this.sacrificeTargetCard.name}`);

        // Card effects
        if (this.sacrificeTargetCard.type === 'voce') {
            this.fragments++;
        }

        // Apply sigil effects that trigger on sacrifice
        if (this.sacrificeTargetCard.sigils.some(s => s.icon === '🩸')) {
            this.sacrificeTargetCard.attack += this.sacrificedCards.length;
            this.log(`${this.sacrificeTargetCard.name} guadagna +${this.sacrificedCards.length} ATK dai sacrifici!`);
        }

        this.cancelSacrificeMode();
        this.setTherapistDialogue(this.getTherapistDialogue());
        this.updateUI();
        this.checkAlterMessages();
    }

    cancelSacrificeMode() {
        this.sacrificeMode = false;
        this.sacrificeTargetCard = null;
        this.sacrificeTargetSlot = null;
        this.sacrificedCards = [];
        this.requiredSacrifices = 0;
        this.elements.sacrificeZone.classList.remove('active');

        // Clear sacrifice slots
        this.elements.sacrificeSlots.forEach(slot => {
            slot.innerHTML = '';
        });
    }

    // === CARD LIBRARY ===
    createCardLibrary() {
        return [
            // LOW COST CARDS (0 blood)
            new Card(
                "Ophelia",
                "eco",
                1,
                2,
                0,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/John_Everett_Millais_-_Ophelia_-_Google_Art_Project.jpg/1024px-John_Everett_Millais_-_Ophelia_-_Google_Art_Project.jpg",
                "Millais, 1851",
                "Voce bambina",
                "Una giovane figura galleggia tra i fiori, cantando canzoni dimenticate. I suoi occhi cercano qualcosa che non può più vedere. La voce di chi era prima della frattura.",
                []
            ),

            new Card(
                "Ragazza con l'Orecchino",
                "velo",
                1,
                3,
                0,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/800px-1665_Girl_with_a_Pearl_Earring.jpg",
                "Vermeer, 1665",
                "Innocenza velata",
                "Lo sguardo penetra oltre la superficie. Cosa nasconde dietro quegli occhi? Un segreto, una domanda, un'identità non ancora frammentata.",
                [{icon: "🛡️", desc: "Difesa +1 quando attaccata"}]
            ),

            new Card(
                "Notte Stellata",
                "impulso",
                2,
                1,
                0,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1024px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
                "Van Gogh, 1889",
                "Vortice mentale",
                "Il cielo gira su se stesso, le stelle danzano in spirali impossibili. La realtà si piega, si torce, diventa altro. È questo che vede Neve quando chiude gli occhi?",
                []
            ),

            new Card(
                "Christina's World",
                "eco",
                1,
                4,
                0,
                "https://upload.wikimedia.org/wikipedia/en/a/a2/Christinasworld.jpg",
                "Wyeth, 1948",
                "Isolamento",
                "Una figura sola in un campo infinito. La casa è lontana, irraggiungibile. Trascinare il proprio corpo verso qualcosa che non si può mai toccare.",
                []
            ),

            // MEDIUM COST CARDS (1 blood)
            new Card(
                "L'Urlo",
                "impulso",
                3,
                2,
                1,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg/800px-Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg",
                "Munch, 1893",
                "Angoscia pura",
                "Il grido silenzioso che nessuno sente. Le mani sul volto, la bocca aperta, il mondo che si distorce intorno. L'eco dell'urlo che Neve non può esprimere.",
                [{icon: "💥", desc: "Attacco raddoppiato contro carte 'velo'"}]
            ),

            new Card(
                "Il Bacio",
                "velo",
                2,
                4,
                1,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Gustav_Klimt_016.jpg/800px-Gustav_Klimt_016.jpg",
                "Klimt, 1908",
                "Connessione perduta",
                "Due figure si fondono, si abbracciano, diventano una. Ma Neve ricorda cosa significa essere connessa a se stessa? O è solo un sogno dorato di unità?",
                [{icon: "🔗", desc: "Lega due carte alleate: condividono la salute"}]
            ),

            new Card(
                "Nighthawks",
                "eco",
                2,
                3,
                1,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Nighthawks_by_Edward_Hopper_1942.jpg/1024px-Nighthawks_by_Edward_Hopper_1942.jpg",
                "Hopper, 1942",
                "Solitudine notturna",
                "Persone sole insieme. Ognuna nella propria bolla di vetro, separate dalla luce al neon. La terapia è così? Neve e il dottore, soli insieme nella notte?",
                []
            ),

            new Card(
                "La Persistenza della Memoria",
                "impulso",
                4,
                1,
                1,
                "https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg",
                "Dalí, 1931",
                "Tempo distorto",
                "Gli orologi si sciolgono, il tempo non ha più senso. I minuti diventano ore, le ore secondi. Quanto dura davvero una sessione di terapia? Quanto dura un ricordo?",
                [{icon: "⏰", desc: "Salta il turno dell'avversario"}]
            ),

            // HIGH COST CARDS (2 blood)
            new Card(
                "Saturno Divora suo Figlio",
                "impulso",
                5,
                3,
                2,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Francisco_de_Goya%2C_Saturno_devorando_a_su_hijo_%281819-1823%29.jpg/800px-Francisco_de_Goya%2C_Saturno_devorando_a_su_hijo_%281819-1823%29.jpg",
                "Goya, 1823",
                "Auto-distruzione",
                "Il padre divora i propri figli. L'Alter dominante consuma le altre identità. Lumen che divora Luna, Aria, Stella. Il cannibalismo della psiche.",
                [{icon: "🩸", desc: "Guadagna ATK +1 per ogni carta sacrificata"}]
            ),

            new Card(
                "Il Giardino delle Delizie",
                "voce",
                3,
                5,
                2,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/The_Garden_of_earthly_delights.jpg/1024px-The_Garden_of_earthly_delights.jpg",
                "Bosch, 1510",
                "Frammentazione",
                "Centinaia di figure, scene sovrapposte, realtà multiple. È così che si sente Neve? Tante vite, tante identità, tutte che accadono contemporaneamente in mondi diversi?",
                [{icon: "🎭", desc: "Crea una copia di se stessa quando muore"}]
            ),

            new Card(
                "Judith e Oloferne",
                "impulso",
                6,
                2,
                2,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Caravaggio_Judith_Beheading_Holofernes.jpg/800px-Caravaggio_Judith_Beheading_Holofernes.jpg",
                "Caravaggio, 1599",
                "Violenza necessaria",
                "Per liberarsi del tiranno, serve violenza. Judith decapita Oloferne. Neve deve decapitare Lumen? La protettrice deve distruggere il persecutore?",
                [{icon: "⚔️", desc: "Uccide istantaneamente carte con 3 o meno HP"}]
            ),

            // SPECIAL VOICE CARDS (1 blood, bonus fragments)
            new Card(
                "La Dama con l'Ermellino",
                "voce",
                2,
                3,
                1,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Lady_with_an_Ermine_-_Leonardo_da_Vinci_-_Google_Art_Project.jpg/800px-Lady_with_an_Ermine_-_Leonardo_da_Vinci_-_Google_Art_Project.jpg",
                "Da Vinci, 1490",
                "Luna - La Protettrice",
                "Calma, composta, intelligente. Tiene in braccio l'ermellino come Neve vorrebbe tenere al sicuro le sue altre identità. Lo sguardo vigile di chi protegge.",
                [{icon: "🌙", desc: "Cura 1 HP a tutte le carte alleate"}]
            ),

            new Card(
                "L'Angelus",
                "voce",
                1,
                5,
                1,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/JEAN-FRAN%C3%87OIS_MILLET_-_El_%C3%81ngelus_%28Museo_de_Orsay%2C_1857-1859._%C3%93leo_sobre_lienzo%2C_55.5_x_66_cm%29.jpg/1024px-JEAN-FRAN%C3%87OIS_MILLET_-_El_%C3%81ngelus_%28Museo_de_Orsay%2C_1857-1859._%C3%93leo_sobre_lienzo%2C_55.5_x_66_cm%29.jpg",
                "Millet, 1859",
                "Aria - L'Innocente",
                "Due figure in preghiera al tramonto. La semplicità, la purezza, il rituale quotidiano. Aria prima del trauma, prima che tutto cambiasse.",
                [{icon: "🎀", desc: "Non può essere attaccata per 1 turno"}]
            ),

            new Card(
                "La Zattera della Medusa",
                "voce",
                4,
                2,
                1,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/JEAN_LOUIS_TH%C3%89ODORE_G%C3%89RICAULT_-_La_Balsa_de_la_Medusa_%28Museo_del_Louvre%2C_1818-19%29.jpg/1024px-JEAN_LOUIS_TH%C3%89ODORE_G%C3%89RICAULT_-_La_Balsa_de_la_Medusa_%28Museo_del_Louvre%2C_1818-19%29.jpg",
                "Géricault, 1819",
                "Stella - La Sopravvissuta",
                "Dopo il naufragio, alcuni sopravvivono. Razionali, calcolatori, fanno ciò che è necessario. Stella che analizza, che pianifica, che mantiene Neve in vita.",
                [{icon: "⭐", desc: "Pesca 2 carte quando giocata"}]
            ),

            // ULTIMATE CARD (3 blood)
            new Card(
                "Guernica",
                "voce",
                7,
                4,
                3,
                "https://upload.wikimedia.org/wikipedia/en/7/74/PicassoGuernica.jpg",
                "Picasso, 1937",
                "Il Vuoto - Lumen Rivelato",
                "Il caos della guerra, corpi frammentati, grida silenti. Tutto è rotto, tutto è distrutto. Questa è la mente di Neve quando Lumen controlla. Il persecutore finale.",
                [{icon: "👁️", desc: "Distrugge tutte le carte nemiche con meno di 3 HP"}]
            ),

            // === MORE 0-BLOOD CARDS (Early game options) ===
            new Card(
                "La Nascita di Venere",
                "velo",
                1,
                3,
                0,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/1024px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg",
                "Botticelli, 1485",
                "Rinascita",
                "Emerge dalla conchiglia, nuda e perfetta. Ogni alter nasce così? Dalla schiuma dell'inconscio, spinta dai venti del trauma?",
                []
            ),

            new Card(
                "Camera da Letto ad Arles",
                "eco",
                1,
                2,
                0,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Vincent_van_Gogh_-_De_slaapkamer_-_Google_Art_Project.jpg/1024px-Vincent_van_Gogh_-_De_slaapkamer_-_Google_Art_Project.jpg",
                "Van Gogh, 1888",
                "Spazio intimo",
                "Una stanza vuota, pareti colorate, prospettive distorte. Lo spazio interno della mente. Ogni alter ha la sua stanza?",
                []
            ),

            new Card(
                "American Gothic",
                "velo",
                2,
                2,
                0,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Grant_Wood_-_American_Gothic_-_Google_Art_Project.jpg/800px-Grant_Wood_-_American_Gothic_-_Google_Art_Project.jpg",
                "Wood, 1930",
                "Facciata rigida",
                "Volti severi, postura perfetta, la forcola come arma. La maschera sociale. Ciò che Neve mostra al mondo esterno.",
                []
            ),

            new Card(
                "Autoritratto con Collana di Spine",
                "impulso",
                2,
                1,
                0,
                "https://upload.wikimedia.org/wikipedia/en/0/00/Frida_Kahlo_%28self_portrait%29.jpg",
                "Kahlo, 1940",
                "Dolore visibile",
                "Le spine penetrano la pelle. Il dolore diventa ornamento. Frida portava il suo trauma come gioiello. Come Neve.",
                []
            ),

            new Card(
                "Il Viandante sul Mare di Nebbia",
                "eco",
                1,
                4,
                0,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg/800px-Caspar_David_Friedrich_-_Wanderer_above_the_sea_of_fog.jpg",
                "Friedrich, 1818",
                "Dissociazione",
                "Di spalle, guarda il vuoto. Non vediamo il suo volto. È Neve? È uno degli alter? Perso nella nebbia dell'amnesia.",
                []
            ),

            new Card(
                "Les Demoiselles d'Avignon",
                "voce",
                2,
                2,
                0,
                "https://upload.wikimedia.org/wikipedia/commons/en/4/4c/Les_Demoiselles_d%27Avignon.jpg",
                "Picasso, 1907",
                "Molteplicità",
                "Cinque figure, cinque identità. I volti frammentati, cubisti, visti da angoli impossibili. Tutte presenti nello stesso momento.",
                []
            ),

            // === MORE 1-BLOOD CARDS (Core gameplay) ===
            new Card(
                "Il Figlio dell'Uomo",
                "velo",
                2,
                4,
                1,
                "https://upload.wikimedia.org/wikipedia/en/e/e5/Magritte_TheSonOfMan.jpg",
                "Magritte, 1964",
                "Identità nascosta",
                "La mela copre il volto. Cosa c'è dietro? Chi è davvero quest'uomo? Chi è davvero Neve sotto la maschera?",
                [{icon: "🍎", desc: "Non può essere bersaglio di sigilli nemici"}]
            ),

            new Card(
                "La Grande Onda",
                "impulso",
                4,
                1,
                1,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/The_Great_Wave_off_Kanagawa.jpg/1024px-The_Great_Wave_off_Kanagawa.jpg",
                "Hokusai, 1831",
                "Crisi imminente",
                "L'onda sta per abbattersi. Le barche sono minuscole, impotenti. Quando arriva il trigger, non c'è scampo.",
                [{icon: "🌊", desc: "Attacco +2 se il nemico ha più di 3 HP"}]
            ),

            new Card(
                "La Gioconda",
                "velo",
                2,
                5,
                1,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg",
                "Da Vinci, 1503",
                "Sorriso ambiguo",
                "Cosa nasconde quel sorriso? Serenità o follia? Verità o menzogna? Come il sorriso di Lumen durante la sessione.",
                [{icon: "😊", desc: "Non subisce danni nel primo turno"}]
            ),

            new Card(
                "L'Impero delle Luci",
                "eco",
                3,
                2,
                1,
                "https://upload.wikimedia.org/wikipedia/en/3/3d/L%27Empire_des_Lumi%C3%A8res.jpg",
                "Magritte, 1954",
                "Paradosso temporale",
                "Giorno e notte insieme. Cielo azzurro sopra strada notturna. Il tempo non ha senso quando switch tra gli alter.",
                [{icon: "🌗", desc: "Cambia il tipo di una carta nemica"}]
            ),

            new Card(
                "Les Amants",
                "velo",
                1,
                4,
                1,
                "https://upload.wikimedia.org/wikipedia/en/f/f0/Rene_Magritte_The_Lovers.jpg",
                "Magritte, 1928",
                "Intimità velata",
                "Due amanti si baciano, ma i volti sono coperti. Non possono vedersi. Gli alter non si conoscono tra loro.",
                [{icon: "💔", desc: "Blocca 2 danni alla prima carta alleata"}]
            ),

            new Card(
                "La Classe di Danza",
                "eco",
                2,
                3,
                1,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Edgar_Degas_-_The_Ballet_Class_-_Google_Art_Project.jpg/1024px-Edgar_Degas_-_The_Ballet_Class_-_Google_Art_Project.jpg",
                "Degas, 1874",
                "Coreografia mentale",
                "Ballerine in posa, ognuna in posizione diversa. Il sistema interno: ogni alter ha un ruolo, una posizione precisa.",
                []
            ),

            new Card(
                "Impression, soleil levant",
                "eco",
                2,
                3,
                1,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Claude_Monet%2C_Impression%2C_soleil_levant.jpg/1024px-Claude_Monet%2C_Impression%2C_soleil_levant.jpg",
                "Monet, 1872",
                "Memoria sfocata",
                "Tutto è sfumato, indefinito. Il sole è solo un'impressione. I ricordi di Neve sono così: presenti ma irraggiungibili.",
                [{icon: "🌅", desc: "Rivela 2 carte dal mazzo nemico"}]
            ),

            new Card(
                "Il Carnevale di Arlecchino",
                "voce",
                3,
                2,
                1,
                "https://upload.wikimedia.org/wikipedia/en/7/79/Joan_Mir%C3%B3%2C_1924-25%2C_The_Harlequin%27s_Carnival_%28Carnaval_d%27Arlequin%29%2C_oil_on_canvas%2C_66_x_93_cm%2C_Albright%E2%80%93Knox_Art_Gallery.jpg",
                "Miró, 1925",
                "Caos giocoso",
                "Figure astratte danzano in uno spazio impossibile. È un gioco o un incubo? La linea è sottile nella mente di Neve.",
                [{icon: "🎪", desc: "Scambia posizioni con un'altra carta"}]
            ),

            new Card(
                "La Tempesta",
                "impulso",
                3,
                3,
                1,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Giorgione_019.jpg/800px-Giorgione_019.jpg",
                "Giorgione, 1508",
                "Minaccia incombente",
                "Il fulmine squarcia il cielo. La donna allatta serena. L'ignaro prima della tempesta emotiva.",
                []
            ),

            new Card(
                "La Zattera",
                "eco",
                2,
                4,
                1,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Winslow_Homer_-_The_Gulf_Stream_-_Metropolitan_Museum_of_Art.jpg/1024px-Winslow_Homer_-_The_Gulf_Stream_-_Metropolitan_Museum_of_Art.jpg",
                "Homer, 1899",
                "Deriva",
                "Alla deriva nell'oceano, squali intorno. Aspettare, sopravvivere. È così che si sente Neve ogni giorno.",
                []
            ),

            // === MORE 2-BLOOD CARDS (Power plays) ===
            new Card(
                "La Torre di Babele",
                "voce",
                4,
                4,
                2,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Pieter_Bruegel_the_Elder_-_The_Tower_of_Babel_%28Vienna%29_-_Google_Art_Project_-_edited.jpg/1024px-Pieter_Bruegel_the_Elder_-_The_Tower_of_Babel_%28Vienna%29_-_Google_Art_Project_-_edited.jpg",
                "Bruegel, 1563",
                "Confusione linguistica",
                "Gli uomini costruiscono, ma non si capiscono. Parlano lingue diverse. Gli alter parlano, ma Neve non capisce.",
                [{icon: "🗼", desc: "Silenzia i sigilli di tutte le carte nemiche"}]
            ),

            new Card(
                "Il Trionfo della Morte",
                "impulso",
                5,
                2,
                2,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Pieter_Bruegel_the_Elder_-_The_Triumph_of_Death_-_WGA03397.jpg/1024px-Pieter_Bruegel_the_Elder_-_The_Triumph_of_Death_-_WGA03397.jpg",
                "Bruegel, 1562",
                "Apocalisse interna",
                "Scheletri ovunque. La morte danza, gioca, governa. Quando Lumen prende il controllo, tutto è distruzione.",
                [{icon: "💀", desc: "Danneggia tutte le carte nemiche per 1"}]
            ),

            new Card(
                "Three Studies for Figures at the Base of a Crucifixion",
                "impulso",
                6,
                1,
                2,
                "https://upload.wikimedia.org/wikipedia/en/d/d4/Three_Studies_for_Figures_at_the_Base_of_a_Crucifixion_%281944%29.jpg",
                "Bacon, 1944",
                "Forme contorte",
                "Creature urlanti, corpi impossibili, bocche spalancate. La rappresentazione visiva del dolore psichico.",
                [{icon: "😱", desc: "Doppio danno contro carte 'eco'"}]
            ),

            new Card(
                "Il Banchetto Nuziale",
                "velo",
                3,
                5,
                2,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Pieter_Bruegel_the_Elder_-_Peasant_Wedding_-_Google_Art_Project.jpg/1024px-Pieter_Bruegel_the_Elder_-_Peasant_Wedding_-_Google_Art_Project.jpg",
                "Bruegel, 1567",
                "Celebrazione forzata",
                "Tutti mangiano, bevono, celebrano. Ma la sposa è passiva. Neve che sorride mentre gli alter prendono decisioni.",
                [{icon: "🍷", desc: "Cura 2 HP quando viene attaccata"}]
            ),

            new Card(
                "La Caduta di Icaro",
                "impulso",
                5,
                3,
                2,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Pieter_Bruegel_de_Oude_-_De_val_van_Icarus.jpg/1024px-Pieter_Bruegel_de_Oude_-_De_val_van_Icarus.jpg",
                "Bruegel, 1560",
                "Tragedia ignorata",
                "Icaro cade, ma nessuno guarda. Il trauma di Neve: catastrofico per lei, invisibile agli altri.",
                [{icon: "🪽", desc: "Se distrutta, danneggia 3 a carta casuale nemica"}]
            ),

            new Card(
                "La Vocazione di San Matteo",
                "voce",
                3,
                5,
                2,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/The_Calling_of_Saint_Matthew-Caravaggo_%281599-1600%29.jpg/1024px-The_Calling_of_Saint_Matthew-Caravaggo_%281599-1600%29.jpg",
                "Caravaggio, 1600",
                "Il richiamo",
                "La mano indica, la luce illumina. Qualcuno ti chiama dall'interno. È un alter che emerge? È Lumen che ordina?",
                [{icon: "☝️", desc: "Richiama una carta distrutta dal cimitero"}]
            ),

            new Card(
                "Composizione VIII",
                "impulso",
                4,
                3,
                2,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Vassily_Kandinsky%2C_1923_-_Composition_8%2C_huile_sur_toile%2C_140_cm_x_201_cm%2C_Mus%C3%A9e_Guggenheim%2C_New_York.jpg/1024px-Vassily_Kandinsky%2C_1923_-_Composition_8%2C_huile_sur_toile%2C_140_cm_x_201_cm%2C_Mus%C3%A9e_Guggenheim%2C_New_York.jpg",
                "Kandinsky, 1923",
                "Astrazione pura",
                "Forme geometriche, colori primari. La mente ridotta all'essenziale. Quando Neve dissocia, vede solo forme.",
                [{icon: "🔷", desc: "Cambia ATK/DEF con una carta alleata"}]
            ),

            new Card(
                "La Ronda di Notte",
                "voce",
                4,
                4,
                2,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/The_Night_Watch_-_HD.jpg/1024px-The_Night_Watch_-_HD.jpg",
                "Rembrandt, 1642",
                "Sistema organizzato",
                "Le guardie in formazione. Ognuna con un ruolo. Il sistema interno quando funziona: coordinato, pronto.",
                [{icon: "🛡️", desc: "Tutte le carte alleate +1 difesa"}]
            ),

            // === MORE SPECIAL CARDS (Advanced strategies) ===
            new Card(
                "Olympia",
                "velo",
                2,
                5,
                1,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Edouard_Manet_-_Olympia_-_Google_Art_Project_3.jpg/1024px-Edouard_Manet_-_Olympia_-_Google_Art_Project_3.jpg",
                "Manet, 1863",
                "Lo sguardo diretto",
                "Ti guarda negli occhi. Senza vergogna, senza sottomissione. Una personalità che non si piega al terapeuta.",
                [{icon: "👁️", desc: "Rivela la mano del nemico"}]
            ),

            new Card(
                "La Morte di Marat",
                "eco",
                1,
                5,
                1,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Death_of_Marat_by_David.jpg/800px-Death_of_Marat_by_David.jpg",
                "David, 1793",
                "Martire",
                "Assassinato nella vasca. Pacifico anche nella morte. Gli alter che si sacrificano per proteggere l'host.",
                [{icon: "🩸", desc: "Quando muore, cura 3 HP a tutte le altre carte"}]
            ),

            new Card(
                "Donna allo Specchio",
                "velo",
                2,
                4,
                1,
                "https://upload.wikimedia.org/wikipedia/en/3/35/Girl_before_a_Mirror.jpg",
                "Picasso, 1932",
                "Riflesso alterato",
                "Si guarda allo specchio, ma il riflesso è diverso. Chi è la vera? L'originale o l'immagine?",
                [{icon: "🪞", desc: "Copia il sigillo di una carta nemica"}]
            ),

            new Card(
                "Le Tre Età della Donna",
                "voce",
                2,
                4,
                1,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Gustav_Klimt_Die_drei_Lebensalter_der_Frau.jpg/800px-Gustav_Klimt_Die_drei_Lebensalter_der_Frau.jpg",
                "Klimt, 1905",
                "Evoluzione",
                "Bambina, madre, vecchia. Le età che Neve non ha vissuto linearmente. Il tempo frammentato.",
                [{icon: "⌛", desc: "Guadagna +1/+1 ogni turno"}]
            ),

            new Card(
                "Nu Bleu",
                "eco",
                2,
                3,
                1,
                "https://upload.wikimedia.org/wikipedia/en/2/23/Blue_Nude_II.jpg",
                "Matisse, 1952",
                "Ritaglio",
                "Figure ritagliate, forme essenziali. La mente che taglia via il superfluo. La dissociazione come semplificazione.",
                []
            ),

            new Card(
                "Naufragio di una Nave",
                "impulso",
                3,
                2,
                1,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Turner%2C_J._M._W._-_The_Shipwreck_-_Google_Art_Project.jpg/1024px-Turner%2C_J._M._W._-_The_Shipwreck_-_Google_Art_Project.jpg",
                "Turner, 1805",
                "Disastro",
                "Il mare divora la nave. Le onde travolgono tutto. Il trauma originale che ha spezzato Neve.",
                [{icon: "⚓", desc: "Danneggia 2 a tutte le carte in gioco"}]
            ),

            // === ONE MORE 3-BLOOD ULTIMATE ===
            new Card(
                "L'Ultima Cena",
                "voce",
                6,
                5,
                3,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/%C3%9Altima_Cena_-_Da_Vinci_5.jpg/1024px-%C3%9Altima_Cena_-_Da_Vinci_5.jpg",
                "Da Vinci, 1498",
                "L'Integrazione",
                "Tredici figure intorno al tavolo. È l'ultima cena degli alter? Possono tutti coesistere, o uno deve tradire?",
                [{icon: "🙏", desc: "Richiama tutte le carte 'voce' dal cimitero"}]
            )
        ];
    }

    createTherapistCardLibrary() {
        // Therapist uses STATUE cards (Ancient sculptures, monuments)
        return [
            // More statue cards will be added here
            new Card(
                "Discobolo",
                "impulso",
                3, 3, 1,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Discobolus_Lancelotti_Massimo.jpg/400px-Discobolus_Lancelotti_Massimo.jpg",
                "Myron, 460 a.C.",
                "Perfezione fisica",
                "Il lanciatore perfetto, congelato nell'attimo prima del lancio. La ricerca dell'equilibrio impossibile.",
                []
            ),
            new Card(
                "Venere di Milo",
                "velo",
                2, 4, 1,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Venus_de_Milo_Louvre_Ma399_n4.jpg/400px-Venus_de_Milo_Louvre_Ma399_n4.jpg",
                "Alexandros, 130 a.C.",
                "Bellezza mutilata",
                "Le braccia mancanti. La perfezione incompleta. Ciò che non può essere riparato.",
                [{icon: "🛡️", desc: "Difesa +1 quando attaccata"}]
            ),
            new Card(
                "Pensatore",
                "voce",
                1, 5, 1,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Le_penseur_de_la_Porte_de_lEnfer_%28mus%C3%A9e_Rodin%29_%284528252054%29.jpg/400px-Le_penseur_de_la_Porte_de_lEnfer_%28mus%C3%A9e_Rodin%29_%284528252054%29.jpg",
                "Rodin, 1904",
                "Contemplazione infinita",
                "Chinato su se stesso, intrappolato nel pensiero eterno. La mente che divora se stessa.",
                []
            ),

            // === 0-BLOOD STATUES (Early pressure) ===
            new Card(
                "Nike di Samotracia",
                "impulso",
                2, 1, 0,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Nike_of_Samothrake_Louvre_Ma2369_n4.jpg/400px-Nike_of_Samothrake_Louvre_Ma2369_n4.jpg",
                "190 a.C.",
                "Vittoria senza volto",
                "Ali spiegate, ma senza testa. La vittoria cieca del terapeuta. Non vede il danno che causa.",
                []
            ),

            new Card(
                "Kouros",
                "eco",
                1, 3, 0,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/ACMA_Phrasikleia_Kore.JPG/400px-ACMA_Phrasikleia_Kore.JPG",
                "530 a.C.",
                "Giovinezza eterna",
                "Il sorriso arcaico. Immobile, perfetto, morto. L'ideale che Lumen vuole imporre.",
                []
            ),

            new Card(
                "Testa di Nefertiti",
                "velo",
                1, 3, 0,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Nofretete_Neues_Museum.jpg/400px-Nofretete_Neues_Museum.jpg",
                "1345 a.C.",
                "Regina incompleta",
                "Manca un occhio. La perfezione con un difetto nascosto. Come Lumen si presenta.",
                []
            ),

            new Card(
                "Sfinge",
                "velo",
                2, 2, 0,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Great_Sphinx_of_Giza_-_20080716a.jpg/500px-Great_Sphinx_of_Giza_-_20080716a.jpg",
                "2500 a.C.",
                "Enigma silenzioso",
                "Corpo di leone, volto umano. Guarda senza rispondere. Le domande che Lumen pone senza spiegare.",
                []
            ),

            new Card(
                "Hermes di Prassitele",
                "eco",
                2, 2, 0,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Hermes_di_Prassitele%2C_at_Olimpia%2C_front.jpg/400px-Hermes_di_Prassitele%2C_at_Olimpia%2C_front.jpg",
                "Prassitele, 330 a.C.",
                "Messaggero",
                "Porta messaggi tra dei e mortali. Tra coscienza e inconscio. Lumen che manipola la comunicazione interna.",
                []
            ),

            new Card(
                "Laocoonte",
                "impulso",
                2, 1, 0,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Laocoon_Pio-Clementino_Inv1059-1064-1067.jpg/400px-Laocoon_Pio-Clementino_Inv1059-1064-1067.jpg",
                "40 a.C.",
                "Agonia marmorea",
                "Stritolato dai serpenti insieme ai figli. Il dolore congelato nel tempo. La sofferenza che Lumen infligge.",
                []
            ),

            // === 1-BLOOD STATUES (Main threats) ===
            new Card(
                "David",
                "impulso",
                4, 2, 1,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Michelangelo%27s_David_-_63_grijswaarden.png/400px-Michelangelo%27s_David_-_63_grijswaarden.png",
                "Michelangelo, 1504",
                "Perfezione implacabile",
                "Il corpo perfetto, lo sguardo determinato. Pronto a uccidere Golia. Lumen pronto a distruggere gli alter.",
                [{icon: "🎯", desc: "Attacco +2 contro carte 'eco'"}]
            ),

            new Card(
                "Mosè",
                "voce",
                3, 4, 1,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Moses_San_Pietro_in_Vincoli.jpg/400px-Moses_San_Pietro_in_Vincoli.jpg",
                "Michelangelo, 1515",
                "Autorità di pietra",
                "Le tavole della legge. Lo sguardo severo. Chi decide le regole? Lumen detta come Neve deve funzionare.",
                [{icon: "📜", desc: "Silenzia una carta alleata per 1 turno"}]
            ),

            new Card(
                "Apollo del Belvedere",
                "impulso",
                3, 2, 1,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Apollo_del_Belvedere.jpg/400px-Apollo_del_Belvedere.jpg",
                "350 a.C.",
                "Dio razionale",
                "Apollo, dio della ragione e dell'ordine. La razionalità fredda che Lumen usa come arma.",
                []
            ),

            new Card(
                "Venere Capitolina",
                "velo",
                2, 4, 1,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/0_Venus_Capitolina_-_Musei_Capitolini_%281%29.JPG/400px-0_Venus_Capitolina_-_Musei_Capitolini_%281%29.JPG",
                "II sec. d.C.",
                "Bellezza manipolativa",
                "Si copre pudicamente, ma attira lo sguardo. Lumen che seduce con promesse di guarigione.",
                [{icon: "💖", desc: "Ruba 1 HP da una carta alleata"}]
            ),

            new Card(
                "Augusto di Prima Porta",
                "voce",
                3, 3, 1,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Statue-Augustus.jpg/400px-Statue-Augustus.jpg",
                "20 a.C.",
                "Imperatore-terapeuta",
                "Braccio teso, ordina. L'imperatore comanda l'impero. Il terapeuta comanda la mente.",
                [{icon: "👑", desc: "Altre statue alleate +1 ATK"}]
            ),

            new Card(
                "Atlante Farnese",
                "impulso",
                4, 3, 1,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/MAN_Atlante_fronte_1040572.JPG/400px-MAN_Atlante_fronte_1040572.JPG",
                "II sec. d.C.",
                "Peso del mondo",
                "Porta il globo sulle spalle. Lumen che impone responsabilità impossibili a Neve.",
                [{icon: "🌍", desc: "Danneggia 1 a tutte le carte quando giocata"}]
            ),

            new Card(
                "Galata Morente",
                "eco",
                2, 4, 1,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Dying_gaul.jpg/400px-Dying_gaul.jpg",
                "230 a.C.",
                "Sconfitta nobile",
                "Muore con dignità. Lumen che normalizza la sofferenza di Neve come 'parte del processo'.",
                []
            ),

            new Card(
                "Vittoria Alata",
                "impulso",
                3, 2, 1,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Brescia_museum_Winged_Victory_Roman_bronze_statue_front.jpg/400px-Brescia_museum_Winged_Victory_Roman_bronze_statue_front.jpg",
                "I sec. d.C.",
                "Trionfo clinico",
                "La vittoria del metodo. Il successo terapeutico che in realtà è controllo.",
                []
            ),

            new Card(
                "Fauno Barberini",
                "eco",
                2, 3, 1,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Glyptothek_Munich_Barberini_Faun.jpg/400px-Glyptothek_Munich_Barberini_Faun.jpg",
                "220 a.C.",
                "Abbandono riluttante",
                "Dormiente, vulnerabile. Gli alter soppressi da Lumen, addormentati.",
                []
            ),

            new Card(
                "Afrodite Cnidia",
                "velo",
                1, 5, 1,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/NAMA_Aphrodite_Syracuse.jpg/400px-NAMA_Aphrodite_Syracuse.jpg",
                "Prassitele, 360 a.C.",
                "Vulnerabilità esposta",
                "Prima statua femminile nuda. Lumen che forza Neve a esporsi emotivamente.",
                [{icon: "🫧", desc: "Non può essere attaccata se da sola"}]
            ),

            new Card(
                "Biga di Delfi",
                "impulso",
                3, 3, 1,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Delphi_charioteer_front_DSC06255.jpg/400px-Delphi_charioteer_front_DSC06255.jpg",
                "474 a.C.",
                "Controllo dei cavalli",
                "L'auriga controlla i cavalli. Lumen che controlla gli impulsi di Neve.",
                []
            ),

            new Card(
                "Hermes Psicopompo",
                "voce",
                2, 3, 1,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Hermes_psykhopompos_Staatliche_Antikensammlungen_Schoen80.jpg/400px-Hermes_psykhopompos_Staatliche_Antikensammlungen_Schoen80.jpg",
                "V sec. a.C.",
                "Guida delle anime",
                "Accompagna i morti nell'Ade. Il terapeuta che 'guida' Neve nel suo inconscio.",
                [{icon: "🪦", desc: "Richiama una statua dal cimitero"}]
            ),

            // === 2-BLOOD STATUES (Power moves) ===
            new Card(
                "Pietà",
                "velo",
                3, 5, 2,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Michelangelo%27s_Pieta_5450_cropncleaned_edit.jpg/400px-Michelangelo%27s_Pieta_5450_cropncleaned_edit.jpg",
                "Michelangelo, 1499",
                "Compassione tossica",
                "Maria tiene Cristo morto. La falsa empatia di Lumen per gli alter 'danneggiati'.",
                [{icon: "😢", desc: "Cura 2 HP quando una carta alleata muore"}]
            ),

            new Card(
                "Perseo con la Testa di Medusa",
                "impulso",
                5, 2, 2,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Perseus_by_Cellini.jpg/400px-Perseus_by_Cellini.jpg",
                "Cellini, 1545",
                "Decapitazione",
                "Solleva la testa mozzata della Gorgone. Lumen che elimina gli alter 'problematici'.",
                [{icon: "⚔️", desc: "Uccide carta con meno di 3 HP"}]
            ),

            new Card(
                "Ratto di Proserpina",
                "impulso",
                6, 2, 2,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/The_Rape_of_Proserpina_%28Rome%29.jpg/400px-The_Rape_of_Proserpina_%28Rome%29.jpg",
                "Bernini, 1622",
                "Rapimento forzato",
                "Plutone rapisce Proserpina. La mano affonda nella carne marmorea. La violenza della 'terapia'.",
                [{icon: "🖐️", desc: "Forza una carta nemica a sacrificarsi"}]
            ),

            new Card(
                "Apollo e Dafne",
                "velo",
                4, 4, 2,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Apollo_and_Daphne_%28Bernini%29.jpg/400px-Apollo_and_Daphne_%28Bernini%29.jpg",
                "Bernini, 1625",
                "Trasformazione forzata",
                "Lei diventa albero pur di sfuggirgli. Gli alter che si nascondono dalla 'cura'.",
                [{icon: "🌳", desc: "Trasforma una carta alleata in tipo diverso"}]
            ),

            new Card(
                "Estasi di Santa Teresa",
                "voce",
                4, 3, 2,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Ecstasy_of_Saint_Teresa_September_2015-2a.jpg/400px-Ecstasy_of_Saint_Teresa_September_2015-2a.jpg",
                "Bernini, 1652",
                "Estasi ambigua",
                "Dolore o piacere? L'angelo trafigge. La dissociazione che sembra liberatoria ma danneggia.",
                [{icon: "✨", desc: "Pesca 2 carte, scartane 1"}]
            ),

            new Card(
                "Ercole e Lica",
                "impulso",
                5, 3, 2,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Hercules_and_Lichas-20080620.jpeg/400px-Hercules_and_Lichas-20080620.jpeg",
                "Canova, 1815",
                "Rabbia del dio",
                "Ercole scaglia Lica dall'Olimpo. La furia quando il paziente resiste alla terapia.",
                [{icon: "💪", desc: "Doppio danno se sotto 2 HP"}]
            ),

            new Card(
                "Paolina Borghese",
                "velo",
                3, 5, 2,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Paolina_Borghese_by_Antonio_Canova.jpg/500px-Paolina_Borghese_by_Antonio_Canova.jpg",
                "Canova, 1808",
                "Reclinazione seduttiva",
                "Sdraiata sul divano. La posizione del paziente in terapia. Vulnerabile, osservata.",
                [{icon: "🛋️", desc: "Rigenera 1 HP ogni turno"}]
            ),

            new Card(
                "Amore e Psiche",
                "velo",
                3, 4, 2,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Psyche_Revived_by_Cupid%27s_Kiss_by_Antonio_Canova.jpg/400px-Psyche_Revived_by_Cupid%27s_Kiss_by_Antonio_Canova.jpg",
                "Canova, 1793",
                "Falso risveglio",
                "Amore risveglia Psiche. Lumen che promette di 'risvegliare' Neve alla verità.",
                [{icon: "💋", desc: "Risveglia una carta con 1 HP"}]
            ),

            new Card(
                "Teseo sul Minotauro",
                "impulso",
                5, 2, 2,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Antonio_Canova-Theseus_defeats_the_centaur-Kunsthistorisches_Museum.jpg/400px-Antonio_Canova-Theseus_defeats_the_centaur-Kunsthistorisches_Museum.jpg",
                "Canova, 1805",
                "Uccisione del mostro",
                "Teseo sconfigge il mostro. Lumen che 'sconfigge' i sintomi traumatici.",
                [{icon: "🏹", desc: "Danno extra contro carte 'impulso'"}]
            ),

            new Card(
                "Psiche Abbandonata",
                "eco",
                2, 5, 2,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Psiche_abbandonata_-_Galleria_d%27Arte_Moderna_Firenze.jpg/400px-Psiche_abbandonata_-_Galleria_d%27Arte_Moderna_Firenze.jpg",
                "Vela, 1854",
                "Solitudine post-abbandono",
                "Psiche siede sola dopo che Amore l'ha lasciata. Neve quando gli alter si ritirano.",
                []
            ),

            // === MORE 1-BLOOD STATUES ===
            new Card(
                "Antinoo",
                "velo",
                2, 4, 1,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Antinous_Mondragone_Louvre_Ma1205_n2.jpg/400px-Antinous_Mondragone_Louvre_Ma1205_n2.jpg",
                "130 d.C.",
                "Idealizzazione del morto",
                "Antinoo divinizzato dopo la morte. Gli alter idealizzati dopo essere stati soppressi.",
                []
            ),

            new Card(
                "Arianna Dormiente",
                "eco",
                1, 4, 1,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Vatican_Ariadne.jpg/500px-Vatican_Ariadne.jpg",
                "II sec. d.C.",
                "Abbandono inconscio",
                "Arianna abbandonata da Teseo mentre dorme. Gli alter rimossi mentre Neve 'non guarda'.",
                []
            ),

            new Card(
                "Gladiatore Borghese",
                "impulso",
                4, 2, 1,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Borghese_Gladiator_20150130.jpg/400px-Borghese_Gladiator_20150130.jpg",
                "100 a.C.",
                "Combattente forzato",
                "Combatte per sopravvivere. Neve costretta a 'combattere' i suoi sintomi.",
                []
            ),

            new Card(
                "Satiro Danzante",
                "impulso",
                3, 2, 1,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Dancing_Satyr_MAN_Napoli_Inv5002_n01.jpg/400px-Dancing_Satyr_MAN_Napoli_Inv5002_n01.jpg",
                "320 a.C.",
                "Euforia controllata",
                "Danza estatica, ma congelata. L'emozione controllata in terapia.",
                []
            ),

            new Card(
                "Vittoria che si Slaccia il Sandalo",
                "velo",
                2, 3, 1,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/KAMA_Nike_adjusting_her_sandal.jpg/400px-KAMA_Nike_adjusting_her_sandal.jpg",
                "410 a.C.",
                "Vittoria privata",
                "Momento intimo della dea. Le piccole vittorie private che Lumen sminuisce.",
                []
            ),

            new Card(
                "Colossus",
                "voce",
                2, 5, 1,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Colosso_appennino.jpg/400px-Colosso_appennino.jpg",
                "Giambologna, 1580",
                "Gigante oppressivo",
                "Il Colosso dell'Appennino. Grande, imponente, schiacciante. La presenza di Lumen.",
                []
            ),

            new Card(
                "Gruppo del Laocoonte (copia)",
                "impulso",
                3, 3, 1,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Laocoonte_y_sus_hijos_%28M._Prado%29_01.jpg/400px-Laocoonte_y_sus_hijos_%28M._Prado%29_01.jpg",
                "Copia romana",
                "Sofferenza familiare",
                "Padre e figli stritolati insieme. Il sistema familiare intrappolato nel trauma.",
                []
            ),

            new Card(
                "Ermafrodito Dormiente",
                "velo",
                2, 3, 1,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Sleeping_Hermaphrodite_Louvre.jpg/500px-Sleeping_Hermaphrodite_Louvre.jpg",
                "II sec. a.C.",
                "Identità nascosta",
                "Appare femminile da un lato, maschile dall'altro. Le identità multiple nascoste.",
                [{icon: "⚧️", desc: "Cambia tipo quando girata"}]
            ),

            new Card(
                "Menadi",
                "impulso",
                3, 2, 1,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Maenad_Pio-Clementino_Inv328.jpg/400px-Maenad_Pio-Clementino_Inv328.jpg",
                "II sec. a.C.",
                "Frenesia rituale",
                "Seguaci di Dioniso in estasi. La dissociazione come stato di trance.",
                []
            ),

            new Card(
                "Spinario",
                "eco",
                1, 3, 1,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Spinario_Musei_Capitolini_MC1186.jpg/400px-Spinario_Musei_Capitolini_MC1186.jpg",
                "I sec. a.C.",
                "Auto-cura dolorosa",
                "Il ragazzo si toglie una spina dal piede. Il tentativo di auto-guarigione che fa male.",
                []
            ),

            // === 3-BLOOD ULTIMATE STATUES ===
            new Card(
                "Colossus di Rodi (concetto)",
                "impulso",
                7, 4, 3,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Colossus_of_Rhodes.jpg/400px-Colossus_of_Rhodes.jpg",
                "280 a.C. (distrutto)",
                "Gigante caduto",
                "Una delle meraviglie perdute. Il potere che sembrava eterno, crollato. Lumen può essere sconfitto.",
                [{icon: "⚡", desc: "Distrugge tutte le carte 'eco'"}]
            ),

            new Card(
                "Porta dell'Inferno",
                "voce",
                6, 5, 3,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Auguste_Rodin_-_La_Porte_de_l%27Enfer%2C_1880-1917_-_Kunsthaus_Z%C3%BCrich.jpg/400px-Auguste_Rodin_-_La_Porte_de_l%27Enfer%2C_1880-1917_-_Kunsthaus_Z%C3%BCrich.jpg",
                "Rodin, 1880-1917",
                "L'inferno terapeutico",
                "Centinaia di figure tormentate. La Porta dell'Inferno: è il trauma o è la terapia stessa?",
                [{icon: "🚪", desc: "Richiama 2 statue dal cimitero"}]
            ),

            new Card(
                "Zeus di Olimpia (ricostruzione)",
                "voce",
                6, 6, 3,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Statue_of_Zeus.jpg/400px-Statue_of_Zeus.jpg",
                "Fidia, 430 a.C. (perduta)",
                "Autorità divina",
                "Il padre degli dei sul trono. L'autorità medica assoluta. Il terapeuta-dio.",
                [{icon: "⚡", desc: "Tutte le statue alleate +2/+2"}]
            )
        ];
    }

    // === CONTENT WARNING ===
    showContentWarning() {
        this.elements.contentWarning.classList.remove('hidden');
    }

    acceptWarning() {
        this.elements.contentWarning.classList.add('hidden');
        this.showMainMenu();
    }

    declineWarning() {
        window.close();
        // If window.close() doesn't work (browser security), show message
        setTimeout(() => {
            this.elements.contentWarning.innerHTML = `
                <div class="warning-content">
                    <h1>Grazie per la tua scelta</h1>
                    <p>Puoi chiudere questa finestra.</p>
                </div>
            `;
        }, 100);
    }

    // === MENU FUNCTIONS ===
    showMainMenu() {
        this.elements.mainMenu.classList.remove('hidden');
        this.elements.gameContainer.classList.add('hidden');

        // Check for saved game
        if (localStorage.getItem('neveSavedGame')) {
            this.elements.continueBtn.style.display = 'block';
            this.elements.continueBtn.addEventListener('click', () => this.loadGame(), {once: true});
        }
    }

    hideMainMenu() {
        this.elements.mainMenu.classList.add('hidden');
        this.elements.gameContainer.classList.remove('hidden');
    }

    showOptions() {
        this.elements.optionsMenu.classList.remove('hidden');
    }

    hideOptions() {
        this.elements.optionsMenu.classList.add('hidden');
    }

    showAbout() {
        this.elements.aboutMenu.classList.remove('hidden');
    }

    hideAbout() {
        this.elements.aboutMenu.classList.add('hidden');
    }

    togglePause() {
        if (this.elements.pauseModal.classList.contains('hidden')) {
            this.elements.pauseModal.classList.remove('hidden');
            const pauseDialogue = this.getTherapistDialogue();
            this.elements.pauseTherapistText.textContent = `"${pauseDialogue}"`;
        } else {
            this.elements.pauseModal.classList.add('hidden');
        }
    }

    changeLanguage(lang) {
        currentLang = lang;
        this.updateLanguage();
    }

    updateLanguage() {
        // Update all translatable elements
        const t = TRANSLATIONS[currentLang];

        // Update menu buttons
        if (this.elements.newGameBtn) {
            const btn = this.elements.newGameBtn.querySelector('.btn-text');
            if (btn) btn.textContent = t.menu_new;
        }
        if (this.elements.continueBtn && this.elements.continueBtn.style.display !== 'none') {
            const btn = this.elements.continueBtn.querySelector('.btn-text');
            if (btn) btn.textContent = t.menu_continue;
        }
        if (this.elements.optionsBtn) {
            const btn = this.elements.optionsBtn.querySelector('.btn-text');
            if (btn) btn.textContent = t.menu_options;
        }
        if (this.elements.aboutGameBtn) {
            const btn = this.elements.aboutGameBtn.querySelector('.btn-text');
            if (btn) btn.textContent = t.menu_about;
        }

        // Update action buttons
        if (this.elements.endTurnBtn) {
            const btn = this.elements.endTurnBtn.querySelector('.btn-text');
            if (btn) btn.textContent = t.end_turn;
        }
        if (this.elements.discardBtn) {
            const btn = this.elements.discardBtn.querySelector('.btn-text');
            if (btn) btn.textContent = t.discard;
        }
    }

    // === GAME FLOW ===
    startNewGame() {
        this.hideMainMenu();
        this.resetGame();

        // Start with intro sequence
        document.body.classList.add('intro-phase');
        this.inIntroSequence = true;
        this.introStep = 0;

        // Show only table and therapist
        this.sessionStartTime = Date.now();
        this.startSessionTimer();

        // Start intro dialogue after a moment
        setTimeout(() => {
            this.showIntroDialogue();
        }, 1000);
    }

    // === INTRO SEQUENCE ===
    showIntroDialogue() {
        const step = IntroSequence[this.introStep];
        if (!step) {
            // Intro finished, start game
            this.finishIntro();
            return;
        }

        // Create dialogue element if doesn't exist
        let dialogueEl = document.querySelector('.intro-dialogue');
        if (!dialogueEl) {
            dialogueEl = document.createElement('div');
            dialogueEl.className = 'intro-dialogue';
            document.body.appendChild(dialogueEl);
        }

        // Set therapist dialogue
        this.setTherapistDialogue(step.text);

        // Show choices or continue button
        if (step.choices) {
            // Multiple choice
            dialogueEl.innerHTML = `
                <div class="intro-dialogue-text">${step.speaker}: "${step.text}"</div>
                <div class="choice-container">
                    ${step.choices.map((choice, i) => `
                        <div class="choice-option" data-choice="${i}">
                            ${choice.text}
                        </div>
                    `).join('')}
                </div>
            `;

            // Add event listeners to choices
            dialogueEl.querySelectorAll('.choice-option').forEach(el => {
                el.addEventListener('click', (e) => {
                    const choiceIndex = parseInt(e.target.dataset.choice);
                    this.handleChoice(step.choices[choiceIndex]);
                });
            });
        } else {
            // Simple continue
            dialogueEl.innerHTML = `
                <div class="intro-dialogue-text">${step.speaker}: "${step.text}"</div>
                <button class="intro-dialogue-continue">${step.continueText || 'Continua'}</button>
            `;

            dialogueEl.querySelector('.intro-dialogue-continue').addEventListener('click', () => {
                this.introStep++;
                this.showIntroDialogue();
            });
        }
    }

    handleChoice(choice) {
        // Apply effects
        if (choice.effect) {
            if (choice.effect.stability) this.stability += choice.effect.stability;
            if (choice.effect.fragments) this.fragments += choice.effect.fragments;
            if (choice.effect.trust) this.trust += choice.effect.trust;
            if (choice.effect.awareness) this.awareness += choice.effect.awareness;
            if (choice.effect.metaAwareness) this.metaAwareness = true;
        }

        // Continue to next step
        this.introStep++;
        this.showIntroDialogue();
    }

    finishIntro() {
        // Remove intro dialogue
        const dialogueEl = document.querySelector('.intro-dialogue');
        if (dialogueEl) {
            dialogueEl.style.opacity = '0';
            setTimeout(() => dialogueEl.remove(), 500);
        }

        // Transition to game
        document.body.classList.remove('intro-phase');
        document.body.classList.add('game-started');
        this.inIntroSequence = false;
        this.gameStarted = true;

        // Set initial dialogue
        this.setTherapistDialogue("Bene. Iniziamo.");

        // Initial draw
        for (let i = 0; i < 5; i++) {
            this.drawCard();
        }

        // Show UI elements with animation
        setTimeout(() => {
            this.log("La sessione di gioco inizia...");
            this.updateUI();
            this.checkPhaseProgression();
        }, 1500);
    }

    resetGame() {
        this.round = 1;
        this.stability = 100;
        this.fragments = 0;
        this.isPlayerTurn = true;
        this.currentPhase = 1;
        this.playerHand = [];
        this.playerField = [null, null, null, null];
        this.therapistField = [null, null, null, null];
        this.shownAlterMessages = new Set();
        this.revelationTriggered = false;
        this.elements.eventLog.innerHTML = '';
        this.elements.alterLog.innerHTML = '';
        document.body.className = '';
    }

    startSessionTimer() {
        this.sessionTimer = setInterval(() => {
            const elapsed = Date.now() - this.sessionStartTime;
            const minutes = Math.floor(elapsed / 60000);
            const seconds = Math.floor((elapsed % 60000) / 1000);
            this.elements.sessionTimer.textContent =
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }

    drawCard() {
        if (this.playerHand.length >= 8) {
            this.log("Mano piena!");
            return;
        }

        const card = this.createRandomCard();
        this.playerHand.push(card);
        this.log(`Hai pescato: ${card.name}`);
        this.updateUI();
    }

    createRandomCard() {
        const template = this.cardLibrary[Math.floor(Math.random() * this.cardLibrary.length)];
        return new Card(
            template.name,
            template.type,
            template.attack,
            template.health,
            template.bloodCost,
            template.artworkUrl,
            template.artist,
            template.shortDesc,
            template.longDesc,
            template.sigils
        );
    }

    createRandomTherapistCard() {
        const template = this.therapistCardLibrary[Math.floor(Math.random() * this.therapistCardLibrary.length)];
        return new Card(
            template.name,
            template.type,
            template.attack,
            template.health,
            template.bloodCost,
            template.artworkUrl,
            template.artist,
            template.shortDesc,
            template.longDesc,
            template.sigils
        );
    }

    playCardFromHand(cardId, slotIndex) {
        if (!this.isPlayerTurn) {
            this.log("Non è il tuo turno!");
            return;
        }

        const cardIndex = this.playerHand.findIndex(c => c.id === cardId);
        if (cardIndex === -1) return;

        const card = this.playerHand[cardIndex];

        // Check if card requires blood sacrifice
        if (card.bloodCost > 0) {
            // Count cards on field available for sacrifice
            const availableForSacrifice = this.playerField.filter(c => c !== null).length;

            if (availableForSacrifice < card.bloodCost) {
                this.log(`Sacrifici insufficienti! Serve ${card.bloodCost}, disponibili ${availableForSacrifice}`);
                return;
            }

            // Remove card from hand and start sacrifice mode
            this.playerHand.splice(cardIndex, 1);
            this.startSacrificeMode(card, slotIndex);
            this.updateUI();
            return;
        }

        // No blood cost, play directly
        this.playerHand.splice(cardIndex, 1);
        this.playerField[slotIndex] = card;

        this.log(`Hai giocato: ${card.name}`);
        this.setTherapistDialogue(this.getTherapistDialogue());

        // Card effects (Voice cards increase fragments)
        if (card.type === 'voce') {
            this.fragments++;
        }

        // Apply play sigils
        this.applyPlaySigils(card);

        this.updateUI();
        this.checkAlterMessages();
    }

    applyPlaySigils(card) {
        // ⭐ Draw 2 cards when played
        if (card.sigils.some(s => s.icon === '⭐')) {
            this.log(`${card.name} ti fa pescare 2 carte!`);
            this.drawCard();
            this.drawCard();
        }

        // 🌙 Heal 1 HP to all allies
        if (card.sigils.some(s => s.icon === '🌙')) {
            this.log(`${card.name} cura tutte le carte alleate!`);
            this.playerField.forEach(c => {
                if (c && c.id !== card.id) {
                    c.health += 1;
                }
            });
        }

        // 👁️ Destroy all enemies with <3 HP
        if (card.sigils.some(s => s.icon === '👁️')) {
            this.log(`${card.name} distrugge tutti i nemici deboli!`);
            this.therapistField = this.therapistField.map(c => {
                if (c && c.health < 3) {
                    this.log(`→ ${c.name} è stato distrutto!`);
                    return null;
                }
                return c;
            });
        }
    }

    toggleDiscardMode() {
        // Simplified discard - just draw a new card
        if (this.playerHand.length > 0) {
            const card = this.playerHand.shift();
            this.log(`Hai scartato: ${card.name}`);
            this.drawCard();
            this.updateUI();
        }
    }

    endTurn() {
        if (!this.isPlayerTurn) return;

        this.log("=== Fine del tuo turno ===");
        this.isPlayerTurn = false;
        this.setTherapistDialogue(this.getTherapistDialogue());

        setTimeout(() => {
            this.therapistTurn();
        }, 2000);
    }

    therapistTurn() {
        this.log("=== Turno del Terapista ===");

        // Therapist draws cards if hand is low
        while (this.therapistHand.length < 5) {
            const card = this.createRandomTherapistCard();
            this.therapistHand.push(card);
        }

        // AI: Select cards to play based on difficulty/round
        const emptySlots = this.therapistField
            .map((card, i) => card === null ? i : -1)
            .filter(i => i !== -1);

        // Difficulty scaling: plays more cards in later rounds
        let cardsToPlay = 1;
        if (this.round >= 10) cardsToPlay = 2;
        if (this.round >= 20) cardsToPlay = Math.min(3, emptySlots.length);
        cardsToPlay = Math.min(cardsToPlay, emptySlots.length, this.therapistHand.length);

        // AI: Choose best cards (higher attack/health in later rounds)
        const sortedHand = [...this.therapistHand].sort((a, b) => {
            const scoreA = a.attack + a.health;
            const scoreB = b.attack + b.health;
            // Early rounds: play weaker cards
            // Late rounds: play stronger cards
            return this.round < 15 ? scoreA - scoreB : scoreB - scoreA;
        });

        for (let i = 0; i < cardsToPlay; i++) {
            if (emptySlots.length > 0 && this.therapistHand.length > 0) {
                const card = sortedHand[i];
                const handIndex = this.therapistHand.indexOf(card);
                if (handIndex !== -1) {
                    this.therapistHand.splice(handIndex, 1);

                    // Choose slot (prioritize matching with player cards for combat)
                    let slotIndex;
                    if (this.round >= 15) {
                        // Late game: tactical placement
                        slotIndex = emptySlots.find(s => this.playerField[s] !== null) || emptySlots[0];
                    } else {
                        // Early game: random placement
                        slotIndex = emptySlots[Math.floor(Math.random() * emptySlots.length)];
                    }

                    const slotIndexPos = emptySlots.indexOf(slotIndex);
                    if (slotIndexPos !== -1) emptySlots.splice(slotIndexPos, 1);

                    this.therapistField[slotIndex] = card;
                    this.log(`Dr. Lumen gioca: ${card.name}`);

                    // Animation: flip card when played
                    setTimeout(() => {
                        const cardElements = document.querySelectorAll('#therapist-card-field .card');
                        cardElements.forEach(el => {
                            if (el.dataset.cardId === card.id) {
                                el.classList.add('playing');
                                setTimeout(() => el.classList.remove('playing'), 600);
                            }
                        });
                    }, 100);
                }
            }
        }

        this.updateUI();

        setTimeout(() => {
            this.resolveRound();
        }, 2000);
    }

    resolveRound() {
        this.log("=== Risoluzione ===");

        // Apply combat between opposing cards (slot by slot)
        for (let i = 0; i < 4; i++) {
            const playerCard = this.playerField[i];
            const therapistCard = this.therapistField[i];

            if (playerCard && therapistCard) {
                this.resolveCombat(playerCard, therapistCard, i);
            } else if (playerCard && !therapistCard) {
                // Player card attacks directly
                this.log(`${playerCard.name} attacca direttamente!`);
                this.stability = Math.min(100, this.stability + playerCard.attack);
            } else if (!playerCard && therapistCard) {
                // Therapist card attacks directly
                this.log(`${therapistCard.name} ti attacca!`);
                this.stability = Math.max(0, this.stability - therapistCard.attack);
            }
        }

        // Animate and clear dead cards
        this.playerField = this.playerField.map((card, index) => {
            if (card && card.health <= 0) {
                this.log(`${card.name} è stato distrutto!`);
                this.applyDeathSigils(card, true);

                // Animation: card destroyed
                setTimeout(() => {
                    const cardElements = document.querySelectorAll('#neve-card-field .card');
                    cardElements.forEach(el => {
                        if (el.dataset.cardId === card.id) {
                            el.classList.add('destroyed');
                        }
                    });
                }, 100);

                return null;
            }
            return card;
        });

        this.therapistField = this.therapistField.map((card, index) => {
            if (card && card.health <= 0) {
                this.log(`${card.name} nemico è stato distrutto!`);

                // Animation: card destroyed
                setTimeout(() => {
                    const cardElements = document.querySelectorAll('#therapist-card-field .card');
                    cardElements.forEach(el => {
                        if (el.dataset.cardId === card.id) {
                            el.classList.add('destroyed');
                        }
                    });
                }, 100);

                return null;
            }
            return card;
        });

        setTimeout(() => {
            // Clear remaining cards after round
            this.playerField = [null, null, null, null];
            this.therapistField = [null, null, null, null];
            this.startNewRound();
        }, 3000);
    }

    resolveCombat(playerCard, therapistCard, slotIndex) {
        let playerAttack = playerCard.attack;
        let therapistAttack = therapistCard.attack;

        // Apply attack sigils
        // 💥 Double attack against 'velo' type
        if (playerCard.sigils.some(s => s.icon === '💥') && therapistCard.type === 'velo') {
            playerAttack *= 2;
            this.log(`${playerCard.name} raddoppia l'attacco contro ${therapistCard.name}!`);
        }

        // 🛡️ Defense +1 when attacked
        let therapistDefense = 0;
        if (therapistCard.sigils.some(s => s.icon === '🛡️')) {
            therapistDefense = 1;
            this.log(`${therapistCard.name} si difende!`);
        }

        // ⚔️ Instant kill cards with ≤3 HP
        if (playerCard.sigils.some(s => s.icon === '⚔️') && therapistCard.health <= 3) {
            this.log(`${playerCard.name} uccide istantaneamente ${therapistCard.name}!`);
            therapistCard.health = 0;
            return;
        }

        // Apply damage
        const damageToTherapist = Math.max(0, playerAttack - therapistDefense);
        const damageToPlayer = therapistAttack;

        therapistCard.health -= damageToTherapist;
        playerCard.health -= damageToPlayer;

        this.log(`${playerCard.name} (${playerCard.attack}⚔️/${playerCard.health}❤️) VS ${therapistCard.name} (${therapistCard.attack}⚔️/${therapistCard.health}❤️)`);

        // Animate combat clash
        setTimeout(() => {
            const cardElements = document.querySelectorAll('.card');
            cardElements.forEach(el => {
                if (el.dataset.cardId === playerCard.id || el.dataset.cardId === therapistCard.id) {
                    el.classList.add('clashing');
                    setTimeout(() => el.classList.remove('clashing'), 600);
                }
            });
        }, 100);

        if (damageToTherapist > 0) {
            this.log(`→ ${therapistCard.name} subisce ${damageToTherapist} danni`);

            // Animate damage
            setTimeout(() => {
                const cardElements = document.querySelectorAll('#therapist-card-field .card');
                cardElements.forEach(el => {
                    if (el.dataset.cardId === therapistCard.id) {
                        el.classList.add('taking-damage');
                        setTimeout(() => el.classList.remove('taking-damage'), 500);
                    }
                });
            }, 300);
        }
        if (damageToPlayer > 0) {
            this.log(`→ ${playerCard.name} subisce ${damageToPlayer} danni`);

            // Animate damage
            setTimeout(() => {
                const cardElements = document.querySelectorAll('#neve-card-field .card');
                cardElements.forEach(el => {
                    if (el.dataset.cardId === playerCard.id) {
                        el.classList.add('taking-damage');
                        setTimeout(() => el.classList.remove('taking-damage'), 500);
                    }
                });
            }, 300);
        }
    }

    applyDeathSigils(card, isPlayerCard) {
        // 🎭 Create a copy when dies
        if (card.sigils.some(s => s.icon === '🎭') && isPlayerCard) {
            this.log(`${card.name} crea una copia di se stessa!`);
            const copy = this.createCardCopy(card);
            // Add copy to hand
            if (this.playerHand.length < 8) {
                this.playerHand.push(copy);
            }
        }
    }

    createCardCopy(card) {
        return new Card(
            card.name,
            card.type,
            card.attack,
            card.health,
            card.bloodCost,
            card.artworkUrl,
            card.artist,
            card.shortDesc,
            card.longDesc,
            card.sigils
        );
    }

    startNewRound() {
        this.round++;
        this.isPlayerTurn = true;

        this.log(`\n=== ROUND ${this.round} ===\n`);
        this.setTherapistDialogue(this.getTherapistDialogue());

        // Draw card
        this.drawCard();

        // Check phase progression
        this.checkPhaseProgression();
        this.checkAlterMessages();
        this.checkDialogueQuestions();
        this.checkRevelation();
        this.checkGameOver();

        this.updateUI();
    }

    // === DIALOGUE QUESTIONS SYSTEM ===
    checkDialogueQuestions() {
        // Check if there's a question for this round
        const question = DialogueQuestions.find(q => q.round === this.round && !this.askedQuestions.has(q.round));

        if (question) {
            this.askedQuestions.add(question.round);
            setTimeout(() => {
                this.showDialogueQuestion(question);
            }, 2000);
        }
    }

    showDialogueQuestion(question) {
        // Create or get dialogue element
        let dialogueEl = document.querySelector('.intro-dialogue');
        if (!dialogueEl) {
            dialogueEl = document.createElement('div');
            dialogueEl.className = 'intro-dialogue';
            document.body.appendChild(dialogueEl);
        }

        // Set therapist dialogue
        this.setTherapistDialogue(question.text);

        // Show choices
        dialogueEl.innerHTML = `
            <div class="intro-dialogue-text">${question.speaker}: "${question.text}"</div>
            <div class="choice-container">
                ${question.choices.map((choice, i) => `
                    <div class="choice-option" data-choice="${i}">
                        ${choice.text}
                    </div>
                `).join('')}
            </div>
        `;

        dialogueEl.style.opacity = '1';

        // Add event listeners to choices
        dialogueEl.querySelectorAll('.choice-option').forEach(el => {
            el.addEventListener('click', (e) => {
                const choiceIndex = parseInt(e.target.dataset.choice);
                this.handleGameplayChoice(question.choices[choiceIndex], dialogueEl);
            });
        });
    }

    handleGameplayChoice(choice, dialogueEl) {
        // Apply effects
        if (choice.effect) {
            if (choice.effect.stability) this.stability = Math.max(0, Math.min(100, this.stability + choice.effect.stability));
            if (choice.effect.fragments) this.fragments += choice.effect.fragments;
            if (choice.effect.trust) this.trust += choice.effect.trust;
            if (choice.effect.awareness) this.awareness += choice.effect.awareness;
            if (choice.effect.metaAwareness) this.metaAwareness = true;

            // Log significant changes
            if (choice.effect.stability) {
                this.log(`[Stabilità ${choice.effect.stability > 0 ? '+' : ''}${choice.effect.stability}]`);
            }
            if (choice.effect.fragments) {
                this.log(`[Frammenti +${choice.effect.fragments}]`);
            }
        }

        // Hide dialogue
        dialogueEl.style.opacity = '0';
        setTimeout(() => {
            if (dialogueEl.parentNode) {
                dialogueEl.remove();
            }
        }, 500);

        this.updateUI();
    }

    // === PHASE SYSTEM ===
    checkPhaseProgression() {
        let newPhase = 1;

        if (this.round >= 31) newPhase = 5;
        else if (this.round >= 21) newPhase = 4;
        else if (this.round >= 13) newPhase = 3;
        else if (this.round >= 6) newPhase = 2;

        if (newPhase > this.currentPhase) {
            this.currentPhase = newPhase;
            this.transitionToPhase(newPhase);
        }
    }

    transitionToPhase(phase) {
        this.log(`=== Fase ${phase} ===`, 'meta');

        // Apply visual deterioration
        document.body.className = '';
        document.body.classList.add(`phase-${phase}`);

        // Update vignette intensity
        const vignetteOpacity = 0.1 + (phase * 0.15);
        this.elements.vignetteOverlay.style.opacity = vignetteOpacity;

        // Phase-specific events
        if (phase === 3) {
            this.showNarrativeEvent("Qualcosa non va... Le parole del Dr. Lumen ti sembrano distorte...");
        } else if (phase === 4) {
            this.showNarrativeEvent("La stanza sembra diversa. Più piccola. Più soffocante.");
        } else if (phase === 5) {
            this.showNarrativeEvent("Guarda in alto, Neve. GUARDA IN ALTO.");
        }
    }

    getTherapistDialogue() {
        let phaseKey = `phase${this.currentPhase}`;
        if (this.revelationTriggered) {
            phaseKey = 'revelation';
        }

        const dialogues = TherapistDialogues[phaseKey];
        return dialogues[Math.floor(Math.random() * dialogues.length)];
    }

    // === ALTER MESSAGES ===
    checkAlterMessages() {
        AlterMessages.messages.forEach(msg => {
            if (msg.round === this.round && !this.shownAlterMessages.has(msg.round)) {
                this.showAlterMessage(msg.alter, msg.text);
                this.shownAlterMessages.add(msg.round);
            }
        });
    }

    showAlterMessage(alter, text) {
        // Show sidebar on first message
        if (this.elements.alterLog.children.length === 0) {
            this.elements.alterMessages.classList.add('visible');
        }

        const msgEl = document.createElement('div');
        msgEl.className = 'alter-message';
        msgEl.innerHTML = `
            <div class="alter-name">${alter}</div>
            <div class="alter-text">${text}</div>
        `;
        this.elements.alterLog.appendChild(msgEl);

        // Scroll to bottom
        this.elements.alterLog.scrollTop = this.elements.alterLog.scrollHeight;

        // Visual effect
        msgEl.style.animation = 'message-appear 0.6s ease';
    }

    // === CARD WHISPERS ===
    showCardWhisper(text) {
        this.elements.whisperText.textContent = text;
        this.elements.cardWhisper.classList.remove('hidden');
    }

    hideCardWhisper() {
        this.elements.cardWhisper.classList.add('hidden');
    }

    // === REVELATION ===
    checkRevelation() {
        if (this.round >= 35 && !this.revelationTriggered) {
            this.triggerRevelation();
        }
    }

    triggerRevelation() {
        this.revelationTriggered = true;
        this.currentPhase = 6;

        this.log("=== RIVELAZIONE ===", 'meta');

        // Show mirror effect
        this.elements.mirrorOverlay.classList.remove('hidden');
        setTimeout(() => {
            this.elements.mirrorOverlay.style.opacity = '0.7';
        }, 100);

        // Update therapist image to question mark
        this.elements.therapistImage.textContent = '❓';

        // Apply revelation visual style
        document.body.classList.add('final-revelation');

        this.showNarrativeEvent(
            "Lo specchio.\n\n" +
            "Vedi il riflesso della stanza... ma non c'è nessun terapista.\n\n" +
            "Sei sempre stata sola.\n\n" +
            "Il Dr. Lumen... è sempre stato... TE."
        );

        setTimeout(() => {
            this.setTherapistDialogue(this.getTherapistDialogue());
        }, 5000);
    }

    // === NARRATIVE EVENTS ===
    showNarrativeEvent(text) {
        this.elements.narrativeText.innerHTML = text.replace(/\n/g, '<br>');
        this.elements.narrativeModal.classList.remove('hidden');
    }

    hideNarrativeModal() {
        this.elements.narrativeModal.classList.add('hidden');
    }

    // === CARD DETAILS MODAL ===
    showCardDetails(cardId) {
        // Find the card in hand, player field, or therapist field
        let card = this.playerHand.find(c => c.id === cardId);
        if (!card) {
            card = this.playerField.find(c => c && c.id === cardId);
        }
        if (!card) {
            card = this.therapistField.find(c => c && c.id === cardId);
        }

        if (!card) return;

        // Populate modal with card data
        this.elements.modalArtwork.style.backgroundImage = `url('${card.artworkUrl}')`;
        this.elements.modalTitle.textContent = card.name;
        this.elements.modalArtist.textContent = card.artist;
        this.elements.modalAttack.textContent = card.attack;
        this.elements.modalHealth.textContent = card.health;
        this.elements.modalBlood.textContent = card.bloodCost > 0 ? `${card.bloodCost}🩸` : 'Nessuno';
        this.elements.modalDescription.textContent = card.longDesc;

        // Populate sigils
        this.elements.modalSigils.innerHTML = '';
        if (card.sigils.length > 0) {
            const sigilsTitle = document.createElement('h3');
            sigilsTitle.textContent = 'Sigilli:';
            sigilsTitle.style.marginBottom = '15px';
            this.elements.modalSigils.appendChild(sigilsTitle);

            card.sigils.forEach(sigil => {
                const sigilEl = document.createElement('div');
                sigilEl.className = 'card-details-sigil';
                sigilEl.innerHTML = `
                    <div class="card-details-sigil-icon">${sigil.icon}</div>
                    <div class="card-details-sigil-desc">${sigil.desc}</div>
                `;
                this.elements.modalSigils.appendChild(sigilEl);
            });
        }

        // Show modal
        this.elements.cardDetailsModal.classList.remove('hidden');
    }

    hideCardDetails() {
        this.elements.cardDetailsModal.classList.add('hidden');
    }

    // === GAME OVER ===
    checkGameOver() {
        if (this.stability <= 0) {
            this.log("=== FRAMMENTAZIONE COMPLETA ===");
            setTimeout(() => {
                this.showNarrativeEvent(
                    "GAME OVER\n\n" +
                    "Neve si è frammentata completamente.\n\n" +
                    "Le identità si disperdono nel limen.\n\n" +
                    "Non c'è più confine tra loro."
                );
                setTimeout(() => {
                    this.saveAndExit();
                }, 5000);
            }, 2000);
        }

        // Victory condition (integration)
        if (this.fragments >= 5 && this.revelationTriggered && this.stability > 50) {
            setTimeout(() => {
                this.showNarrativeEvent(
                    "INTEGRAZIONE\n\n" +
                    "Neve accetta tutti i suoi frammenti.\n\n" +
                    "Anche Lumen.\n\n" +
                    "Il limen si dissolve.\n\n" +
                    "Diventa... una."
                );
                setTimeout(() => {
                    this.saveAndExit();
                }, 5000);
            }, 2000);
        }
    }

    // === UI FUNCTIONS ===
    setTherapistDialogue(text) {
        this.elements.therapistText.textContent = text;
    }

    log(message, type = 'normal') {
        const entry = document.createElement('div');
        entry.className = `log-entry ${type}`;
        entry.textContent = message;
        this.elements.eventLog.appendChild(entry);

        // Scroll to bottom
        this.elements.eventLog.scrollTop = this.elements.eventLog.scrollHeight;

        // Keep only last 50 entries
        while (this.elements.eventLog.children.length > 50) {
            this.elements.eventLog.removeChild(this.elements.eventLog.firstChild);
        }
    }

    updateUI() {
        // Update game state
        this.elements.stabilityFill.style.width = `${this.stability}%`;
        this.elements.stabilityText.textContent = `${this.stability}%`;
        this.elements.fragmentsCount.textContent = this.fragments;
        this.elements.roundCount.textContent = this.round;

        // Color stability bar based on value
        if (this.stability < 30) {
            this.elements.stabilityFill.style.background = '#c85a54';
        } else if (this.stability < 60) {
            this.elements.stabilityFill.style.background = '#d4a574';
        } else {
            this.elements.stabilityFill.style.background = '#4a7c8e';
        }

        // Update player hand
        this.elements.neveHand.innerHTML = '';
        this.playerHand.forEach((card, index) => {
            const cardElement = card.render();
            cardElement.classList.add('drawing');
            this.elements.neveHand.appendChild(cardElement);
        });

        // Update therapist hand (face down cards)
        if (this.elements.therapistHand) {
            this.elements.therapistHand.innerHTML = '';
            this.therapistHand.forEach((card, index) => {
                const cardElement = card.render();
                cardElement.classList.add('face-down');
                this.elements.therapistHand.appendChild(cardElement);
            });
        }

        // Update fields
        this.updateField(this.elements.neveCardField, this.playerField);
        this.updateField(this.elements.therapistCardField, this.therapistField);
    }

    updateField(fieldElement, field) {
        const slots = fieldElement.querySelectorAll('.card-slot');
        slots.forEach((slot, index) => {
            const card = field[index];
            slot.innerHTML = '';

            if (card) {
                slot.appendChild(card.render());
            }
        });
    }

    // === SAVE/LOAD ===
    saveGame() {
        const saveData = {
            round: this.round,
            stability: this.stability,
            fragments: this.fragments,
            currentPhase: this.currentPhase,
            shownAlterMessages: Array.from(this.shownAlterMessages),
            revelationTriggered: this.revelationTriggered,
            sessionStartTime: this.sessionStartTime
        };
        localStorage.setItem('neveSavedGame', JSON.stringify(saveData));
    }

    loadGame() {
        const savedData = localStorage.getItem('neveSavedGame');
        if (savedData) {
            const data = JSON.parse(savedData);
            this.round = data.round;
            this.stability = data.stability;
            this.fragments = data.fragments;
            this.currentPhase = data.currentPhase;
            this.shownAlterMessages = new Set(data.shownAlterMessages);
            this.revelationTriggered = data.revelationTriggered;
            this.sessionStartTime = data.sessionStartTime;

            this.hideMainMenu();
            this.gameStarted = true;
            this.startSessionTimer();

            // Restore phase visuals
            document.body.classList.add(`phase-${this.currentPhase}`);
            if (this.revelationTriggered) {
                document.body.classList.add('final-revelation');
                this.elements.mirrorOverlay.classList.remove('hidden');
                this.elements.mirrorOverlay.style.opacity = '0.7';
            }

            // Draw initial hand
            for (let i = 0; i < 5; i++) {
                this.drawCard();
            }

            this.setTherapistDialogue(this.getTherapistDialogue());
            this.updateUI();
        }
    }

    saveAndExit() {
        this.saveGame();
        if (this.sessionTimer) {
            clearInterval(this.sessionTimer);
        }
        this.showMainMenu();
    }
}

// === INITIALIZE GAME ===
let game;
document.addEventListener('DOMContentLoaded', () => {
    game = new Game();
    window.game = game; // For debugging
});
