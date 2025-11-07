// === INTRO NARRATIVE SEQUENCE ===
const IntroSequence = [
    {
        speaker: "Dr. Lumen",
        text: "Buongiorno Neve. Come ti senti oggi?",
        continueText: "Continua"
    },
    {
        speaker: "Dr. Lumen",
        text: "Vedo che sei... stanca. È stato un periodo difficile, vero?",
        continueText: "..."
    },
    {
        speaker: "Dr. Lumen",
        text: "Oggi vorrei provare qualcosa di diverso. Qualcosa che potrebbe aiutarci a... esplorare certi aspetti di te.",
        continueText: "Cosa intende?"
    },
    {
        speaker: "Dr. Lumen",
        text: "Ho preparato un gioco. Un gioco di carte. So che può sembrare strano, ma fidati di me.",
        choices: [
            { text: "Un gioco? Non capisco come potrebbe aiutarmi...", response: "hesitant" },
            { text: "Va bene, sono disposta a provare.", response: "trusting" },
            { text: "Mi sembra poco professionale. È davvero necessario?", response: "skeptical" }
        ]
    }
];

// === DIALOGUE QUESTIONS (for 5-hour gameplay) ===
const DialogueQuestions = [
    // Round 3
    {
        round: 3,
        speaker: "Dr. Lumen",
        text: "Questa carta che hai giocato... cosa rappresenta per te?",
        choices: [
            { text: "Non lo so. È solo un quadro.", effect: { stability: -2 } },
            { text: "Mi ricorda qualcosa, ma non riesco a capire cosa...", effect: { fragments: +1 } },
            { text: "Preferisco non parlarne.", effect: { stability: +1, trust: -1 } }
        ]
    },
    // Round 7
    {
        round: 7,
        speaker: "Dr. Lumen",
        text: "Neve, hai sentito qualcosa? Una voce, forse?",
        choices: [
            { text: "No, niente. Perché me lo chiede?", effect: { trust: -2 } },
            { text: "Sì... mi è sembrato di sentire qualcuno sussurrare...", effect: { fragments: +2, stability: -1 } },
            { text: "È solo la mia immaginazione.", effect: { stability: +1 } }
        ]
    },
    // Round 12
    {
        round: 12,
        speaker: "Dr. Lumen",
        text: "Quante ore pensi siano passate dall'inizio della sessione?",
        choices: [
            { text: "Non lo so... forse mezz'ora?", effect: { stability: -1 } },
            { text: "Quanto tempo è passato davvero?", effect: { awareness: +2 } },
            { text: "Il tempo qui dentro sembra... strano.", effect: { fragments: +1 } }
        ]
    },
    // Round 18 - META
    {
        round: 18,
        speaker: "Dr. Lumen",
        text: "Neve, posso farti una domanda personale? Chi sta controllando le tue decisioni in questo momento?",
        choices: [
            { text: "Io. Sono io a scegliere.", effect: { awareness: -1 } },
            { text: "Non sono sicura di capire la domanda...", effect: { stability: -2 } },
            { text: "Lei cosa ne pensa, dottore?", effect: { trust: -2, awareness: +1 } }
        ]
    },
    // Round 25 - Quarta parete
    {
        round: 25,
        speaker: "Dr. Lumen",
        text: "Neve... sei consapevole di star giocando un gioco? Intendo, DAVVERO un gioco?",
        choices: [
            { text: "Cosa? Di cosa sta parlando?", effect: { stability: -3 } },
            { text: "[Guardi fuori dallo schermo]", effect: { metaAwareness: true, stability: -5 } },
            { text: "Basta. Voglio andarmene.", effect: { trust: -5 } }
        ]
    }
];

// === META MOMENTS (breaking fourth wall) ===
const MetaMoments = [
    {
        trigger: "round",
        value: 15,
        text: "Dr. Lumen ti fissa intensamente. 'Neve... quante volte hai già giocato questa partita?'"
    },
    {
        trigger: "death",
        value: 1,
        text: "Dr. Lumen sorride. 'Interessante. Hai mai pensato che forse non PUOI morire qui?'"
    },
    {
        trigger: "round",
        value: 30,
        text: "Le carte cominciano a sussurrare in coro: 'GUARDA IN ALTO. GUARDA CHI TI STA GUARDANDO.'"
    },
    {
        trigger: "sacrifice",
        value: 5,
        text: "Dr. Lumen: 'Sacrifichi le carte così facilmente. Come sacrifichi le parti di te che non vuoi vedere.'"
    }
];

export { IntroSequence, DialogueQuestions, MetaMoments };
