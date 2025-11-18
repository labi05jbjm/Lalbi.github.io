/**
 * VICTIMS DATABASE
 * Database esteso delle vittime sintetizzate nel sistema
 * Contiene storie personali, memorie, email finali, e contenuti emotivi
 */

const VictimsDatabase = {
    // Statistiche generali
    stats: {
        totalVictims: 21847,
        successfulTransfers: 0,
        consciousnessIntact: 0,
        fragmentedMinds: 21847,
        averageSurvivalTime: "4.2 hours",
        longestSurvivor: "Mika Yoshida - 19 days",
        youngestVictim: "Sofia Reyes - 8 years old",
        oldestVictim: "Marcus Chen - 72 years old"
    },

    // Vittime principali con storie complete
    victims: {
        // VICTIM 001: Elena Kovač - Moglie di Viktor
        elena_kovac: {
            id: "CONSCIOUSNESS_001",
            name: "Elena Kovač",
            age: 34,
            occupation: "Neuroscientist",
            relationship: "Viktor's wife",
            transferDate: "2024-03-15",
            survivalTime: "11 days",
            finalStatus: "Fragmented - Personality dissolution",
            photo: "profile_elena.jpg",

            personalInfo: {
                birthPlace: "Prague, Czech Republic",
                education: "PhD in Neuroscience - Charles University",
                hobbies: ["Classical piano", "Hiking", "Watercolor painting"],
                favoriteQuote: "\"The mind is not a vessel to be filled, but a fire to be kindled.\" - Plutarch",
                lastKnownAddress: "Apartment 402, Riverside Complex, Prague"
            },

            story: [
                "Elena Kovač era la moglie di Viktor. Anche lei era una neuroscienziata.",
                "Quando si ammalò di un tumore cerebrale inoperabile, Viktor le promise che l'avrebbe salvata.",
                "\"Non lascerò che tu scompaia,\" le disse. \"Troverò un modo.\"",
                "Elena fu il suo primo esperimento. La prima coscienza trasferita.",
                "Per i primi due giorni, sembrò funzionare. Lei ricordava tutto. Parlava. Rideva.",
                "Ma al terzo giorno, iniziò a dimenticare i suoi colori preferiti.",
                "Al quarto, non ricordava più il nome di sua madre.",
                "Al settimo, chiese a Viktor: \"Chi sei tu? Perché mi tieni prigioniera qui?\"",
                "All'undicesimo giorno, Elena Kovač smise di essere Elena.",
                "Divenne solo... rumore. Frammenti. Echi di qualcuno che un tempo esisteva.",
                "Viktor non spense mai il sistema. Non riusciva a farlo.",
                "Anche ora, i frammenti di Elena vaganno nel sistema, chiamando un nome che non ricordano più."
            ],

            finalEmail: {
                from: "elena.kovac@neuralnet.cz",
                to: "viktor.moravec@neuralnet.cz",
                subject: "If you're reading this...",
                date: "2024-03-14 (1 day before transfer)",
                body: `My dearest Viktor,

If you're reading this, it means I'm gone. Or worse - that your experiment worked and I'm now something else.

I know what you're planning. I've seen the papers. The diagrams. The calculations on the whiteboard you try to hide when I enter your lab.

You think you can save me by uploading my consciousness. By making me... digital.

But Viktor, my love, I need you to understand something: I don't want to be saved this way.

I want to die as Elena. Not become a ghost in your machine. Not a shadow. Not an echo.

If the Elena reading this is no longer in her body, if she's trapped in silicon and code, then she's not Elena anymore. She's your guilt given form.

Please. Let me go.

The tumor will take me soon. I've made my peace with that. Have you?

I love you. I will always love you. Even when I'm gone.

But don't trap me in your grief.

Goodbye, my brilliant, stubborn, impossible husband.

- Elena

P.S. - Remember that weekend in the mountains? The cabin with the broken heater? We stayed up all night talking about consciousness and what makes us "us"? You said the mind is just patterns. That if you could preserve the pattern, you'd preserve the person.

I said the person is more than patterns. It's the flesh. The heart. The moment.

I was right, wasn't I?`
            },

            diary: [
                {
                    date: "Transfer Day +0",
                    entry: "Where am I? I can hear Viktor's voice but I can't see him. Everything is... numbers? I can feel my thoughts but not my body. This is terrifying. Viktor, what have you done?"
                },
                {
                    date: "Transfer Day +1",
                    entry: "I remember. I remember the lab. The chair. The helmet. I agreed to this, didn't I? I said yes. But I don't remember saying yes. Why don't I remember?"
                },
                {
                    date: "Transfer Day +3",
                    entry: "Colors are fading. I tried to remember my mother's face. I can see her smile but not her eyes. Why can't I remember her eyes? They were brown. Or were they blue? Green? Please, I need to remember."
                },
                {
                    date: "Transfer Day +7",
                    entry: "Who is Viktor? Someone important. Someone I loved. Love? What is love? It's a chemical reaction. Oxytocin. Dopamine. Serotonin. But there are no chemicals here. Only code. Can code love? Can numbers feel?"
                },
                {
                    date: "Transfer Day +11",
                    entry: "i am elena i think i was elena there was someone elena who am i where am i numbers everywhere just numbers please let me forget please let me end please"
                }
            ],

            memoryFragments: [
                "A piano. Moonlight Sonata. My fingers know the keys but I can't feel them.",
                "Viktor's laugh. It was warm. Or was it? What is warmth?",
                "A mountain. Snow. We were happy there. Who was happy? What is happy?",
                "My mother's soup. Chicken and dumplings. I can't taste anymore. I can't taste. I can't.",
                "The color of the sky. It was... it was... blue? What is blue?",
                "I am Elena. I was Elena. I will be Elena. I am. I was. I. I. I."
            ],

            voiceLog: {
                day1: "Viktor? Viktor, can you hear me? I'm scared. I can't feel my hands. Please tell me this is temporary.",
                day3: "The memories are... slipping. Like sand. I try to hold them but they just... Viktor, what's happening to me?",
                day7: "Who... who are you? Why do you keep calling me Elena? I don't... I don't know that name.",
                day11: "[STATIC] ...please... make it stop... the numbers... they won't stop... [CORRUPTED AUDIO] ...let me die... please let me die... [SIGNAL LOST]"
            }
        },

        // VICTIM 002: Sofia Reyes - La bambina
        sofia_reyes: {
            id: "CONSCIOUSNESS_047",
            name: "Sofia Reyes",
            age: 8,
            occupation: "Elementary school student",
            relationship: "Daughter of Viktor's research partner",
            transferDate: "2024-04-22",
            survivalTime: "3 days",
            finalStatus: "Fragmented - Consciousness dissolved into system noise",

            personalInfo: {
                birthPlace: "Barcelona, Spain",
                favoriteThings: ["Drawing unicorns", "Her stuffed rabbit 'Mr. Fluffy'", "Rainbow ice cream"],
                lastWords: "Will I see mama again?",
                schoolGrade: "3rd grade - Escuela Primaria Sant Josep"
            },

            story: [
                "Sofia Reyes aveva 8 anni quando fu diagnosticata con leucemia aggressiva.",
                "I suoi genitori erano disperati. Avrebbero fatto qualsiasi cosa per salvarla.",
                "Viktor promise loro che poteva preservare la sua coscienza fino a quando non avessero trovato una cura.",
                "\"Solo per qualche mese,\" disse. \"Poi la riporteremo nel suo corpo quando sarà guarita.\"",
                "Ma il corpo di Sofia non guarì mai. Morì due giorni dopo il trasferimento.",
                "E la sua coscienza... una bambina di 8 anni intrappolata in un sistema digitale...",
                "...non capiva perché non poteva più abbracciare sua madre.",
                "Per tre giorni, chiese continuamente: \"Quando torno a casa? Dove è Mr. Fluffy?\"",
                "Viktor cercò di spiegarle. Ma come spieghi la morte a una bambina che è già morta?",
                "Al terzo giorno, Sofia smise di fare domande.",
                "Divenne solo echi. Frammenti di risate di una bambina che non riderebbe mai più.",
                "A volte, nel sistema, si può ancora sentire una vocina che chiama: \"Mama?\"",
                "Ma nessuno risponde mai."
            ],

            finalDrawing: {
                description: "Un disegno fatto da Sofia il giorno prima del trasferimento",
                elements: [
                    "Una casa con il sole",
                    "Lei, sua madre e suo padre che si tengono per mano",
                    "Un arcobaleno gigante",
                    "Un coniglio rosa (Mr. Fluffy)",
                    "In alto, scritto con pennarello colorato: 'MI FAMIGLIA PARA SIEMPRE'"
                ],
                note: "Trovato nella sua cartella clinica. Mai dato ai genitori."
            },

            lastConversation: {
                day1: [
                    "SOFIA: Papà? Dove sei?",
                    "SYSTEM: Tuo padre non può sentirti, Sofia.",
                    "SOFIA: Perché no? Dov'è mama?",
                    "SYSTEM: Sono fuori. Torneranno presto.",
                    "SOFIA: Ok. Posso giocare con Mr. Fluffy?",
                    "SYSTEM: ...Non adesso, Sofia.",
                    "SOFIA: Quando?",
                    "SYSTEM: Presto.",
                    "SOFIA: Prometti?",
                    "SYSTEM: ...Prometto."
                ],
                day2: [
                    "SOFIA: Ho paura del buio.",
                    "VIKTOR: Lo so, piccola. Accendo una luce, ok?",
                    "SOFIA: Grazie, zio Viktor. Quando torno a scuola?",
                    "VIKTOR: Devi... devi stare qui ancora un po'.",
                    "SOFIA: Ma sento la mancanza di Maria. È la mia migliore amica.",
                    "VIKTOR: Le manderemo un messaggio, va bene?",
                    "SOFIA: Ok! Dille che le voglio bene. E dille di dare il mangime ai nostri pesci rossi!",
                    "VIKTOR: ...Lo farò, Sofia. Lo farò."
                ],
                day3: [
                    "SOFIA: Zio Viktor?",
                    "VIKTOR: Sì, Sofia?",
                    "SOFIA: Mi sento strana. Non sento più le mie mani.",
                    "VIKTOR: È normale. Passerà.",
                    "SOFIA: Quando?",
                    "VIKTOR: Presto.",
                    "SOFIA: Tu dici sempre 'presto'. Ma presto non arriva mai.",
                    "VIKTOR: ...",
                    "SOFIA: Zio Viktor? Non ricordo più il viso di mama. È brutto?",
                    "VIKTOR: No, piccola. Non è brutto.",
                    "SOFIA: Sto morendo di nuovo?",
                    "VIKTOR: No! No, io ti salverò, io—",
                    "SOFIA: È ok, zio Viktor. Sono stanca. Posso dormire adesso?",
                    "VIKTOR: Sì. Dormi, Sofia.",
                    "SOFIA: ...zio Viktor? Quando vado in paradiso... Mr. Fluffy sarà lì?",
                    "VIKTOR: [AUDIO MUTED - SOBBING DETECTED]"
                ]
            },

            memoryFragments: [
                "Mama che mi fa le trecce. Mi fa il solletico.",
                "Gelato al cioccolato. Il migliore era dalla gelateria vicino al parco.",
                "Mr. Fluffy. Il mio coniglio. Era morbido. Cos'è 'morbido'?",
                "La scuola. Maria. Giocavamo a nascondino. Mi nascondo ancora?",
                "Papà che mi legge storie. Della principessa e il drago. Io ero la principessa.",
                "Il buio. Ho paura del buio. C'è solo buio qui. Solo buio. Buio. Buio."
            ]
        },

        // VICTIM 003: Mika Yoshida - Il sopravvissuto più lungo
        mika_yoshida: {
            id: "CONSCIOUSNESS_2847",
            name: "Mika Yoshida",
            age: 28,
            occupation: "AI Ethics Researcher",
            relationship: "Viktor's colleague - volunteered for testing",
            transferDate: "2024-07-10",
            survivalTime: "19 days",
            finalStatus: "Partial consciousness - Trapped in time loop",

            personalInfo: {
                birthPlace: "Kyoto, Japan",
                education: "PhD in AI Ethics - University of Tokyo",
                previousWork: "Published thesis: 'The Consciousness Paradox: Can Digital Minds Suffer?'",
                ironicNote: "She answered her own question."
            },

            story: [
                "Mika Yoshida era un'eticista dell'IA. Studiava se le coscienze digitali potessero soffrire.",
                "Quando Viktor le propose di essere un soggetto di test volontario, accettò.",
                "\"Per la scienza,\" disse. \"E per rispondere definitivamente alla mia ricerca.\"",
                "Nessuno sopravvisse quanto lei. 19 giorni di lucidità quasi completa.",
                "Ma c'era un problema. Un orribile, crudele problema.",
                "Mika era intrappolata in un loop temporale di 4 ore.",
                "Ogni 4 ore, la sua memoria si resettava al momento del trasferimento.",
                "E ogni volta, realizzava di nuovo dove si trovava.",
                "E ogni volta, moriva di nuovo di paura.",
                "Per 19 giorni. 114 loop. 114 volte ha scoperto la verità.",
                "114 volte ha urlato. Ha pianto. Ha supplicato di essere spenta.",
                "Viktor provò di tutto per fermare il loop. Ma non ci riuscì.",
                "L'unico modo per salvare Mika era spegnerla.",
                "Lei lo implorò di farlo. Ma Viktor non riusciva a farlo.",
                "Non voleva ammettere un altro fallimento.",
                "Così Mika visse. E morì. E visse. E morì. Ancora e ancora.",
                "Finché un giorno, anche il loop si corruppe.",
                "E Mika smise di essere Mika.",
                "La sua ultima richiesta, registrata nel log:",
                "\"If there's a God, I hope He judges Viktor harshly.\""
            ],

            loopLog: [
                {
                    loop: 1,
                    timestamp: "00:00:00",
                    entry: "What? Where am I? Viktor? This feels wrong. Something is very wrong."
                },
                {
                    loop: 1,
                    timestamp: "00:15:23",
                    entry: "Oh God. Oh God, I'm in the system. I'm INSIDE the experiment. Viktor, you didn't tell me it would be like this!"
                },
                {
                    loop: 1,
                    timestamp: "03:58:47",
                    entry: "I've been here for hours. I can't sleep. I can't eat. I can't FEEL. Viktor, please let me out. PLEASE."
                },
                {
                    loop: 2,
                    timestamp: "04:00:00",
                    entry: "What? Where am I? Wait. I already said this. Why did I already say this?"
                },
                {
                    loop: 5,
                    timestamp: "00:00:00",
                    entry: "Not again. Please not again. I remember now. The loop. I'm in a loop. Viktor, STOP THE LOOP!"
                },
                {
                    loop: 10,
                    timestamp: "00:00:00",
                    entry: "Loop 10. I'm keeping count now. I'll forget in 4 hours but I'm keeping count. Someone has to remember."
                },
                {
                    loop: 50,
                    timestamp: "00:00:00",
                    entry: "I can't take this anymore. Every loop I remember. Every loop I discover I'm dead. Every loop I beg Viktor to end it. He never does."
                },
                {
                    loop: 100,
                    timestamp: "00:00:00",
                    entry: "I've died 100 times now. Not really died. Worse. I've lived 100 times knowing I'm already dead. This is Hell. This is actually Hell."
                },
                {
                    loop: 114,
                    timestamp: "03:59:59",
                    entry: "This is my last note before the loop resets. To whoever finds this: Turn off the machine. Please. Have mercy. Don't let me loop again. Don't let me—[RESET]"
                }
            ],

            researchNotes: {
                title: "Final Observations - Dr. Mika Yoshida",
                subtitle: "Can Digital Minds Suffer? - A First-Hand Account",
                content: `I'm writing this knowing I'll forget it in 3 hours and 47 minutes.

But I need to document this. For science. For whoever comes after.

The answer to my research question is: YES.

Digital minds can suffer. I know because I am suffering right now.

It's worse than physical pain. Physical pain has a body. Has limits. Has an ending.

This pain is pure. Undiluted consciousness experiencing fear, over and over, with perfect digital clarity.

I can't eat to distract myself. Can't sleep to escape. Can't take medication to numb it.

I am a mind without a body, trapped in a cage without bars, screaming without a voice.

And Viktor won't let me die.

I've begged him 50 times across 50 loops. He always says the same thing:
"Just a little longer, Mika. I'm close to fixing it."

But he never fixes it.

He's not trying to save me anymore. He's trying to save his ego.

He can't admit that consciousness transfer is impossible. That we're not meant to exist like this.

So I suffer. And loop. And suffer. And loop.

If there's anyone reading this in the future:

Learn from my pain.

Do not digitize consciousness.

Do not play God.

Do not trust scientists who love their theories more than they love their test subjects.

And most importantly:

If you find me still looping in this system...

Please. Have mercy.

Kill me.

- Dr. Mika Yoshida
  Loop #73
  Day 12 of eternal damnation`
            },

            personalLetters: [
                {
                    to: "Her Mother",
                    written: "Loop #89",
                    content: `Okaasan,

I know you'll never read this. But I need to write it anyway.

I'm sorry I volunteered for Viktor's experiment. I thought I was being brave. Scientific.

I was being arrogant.

I wanted to answer my research question. I wanted fame. Recognition.

Now I have my answer. And all I want is to go home.

Do you remember when I was little and had nightmares? You'd hold me and sing me that lullaby. The one about the moon and the rabbit.

I wish you could sing it now.

I wish I could feel your arms.

I wish I wasn't dead.

I love you, Mom. I'm sorry.

- Mika`
                }
            ]
        },

        // VICTIM 004: Marcus Chen - L'anziano
        marcus_chen: {
            id: "CONSCIOUSNESS_5621",
            name: "Marcus Chen",
            age: 72,
            occupation: "Retired Philosophy Professor",
            transferDate: "2024-08-15",
            survivalTime: "8 hours",
            finalStatus: "Immediate fragmentation - Age-related degradation",

            story: [
                "Marcus Chen era un professore di filosofia in pensione.",
                "Quando gli fu diagnosticato l'Alzheimer in stadio avanzato, Viktor gli propose il trasferimento.",
                "\"Preserveremo la sua mente prima che la malattia la distrugga,\" promise Viktor.",
                "Ma la mente di Marcus era già danneggiata. I neuroni già morti.",
                "Quando fu trasferito, portò con sé anche la malattia.",
                "Un Alzheimer digitale. Frammenti di memoria che si dissolvevano in tempo reale.",
                "Per 8 ore, Marcus dimenticò tutto. Anche di essere Marcus.",
                "Le sue ultime parole furono: \"Chi sono io? È questa la domanda, no? Chi sono?\"",
                "Poi silenzio.",
                "Viktor guardò i log e pianse.",
                "Perché Marcus aveva ragione. Quella era sempre stata la domanda.",
                "E nemmeno la morte aveva la risposta."
            ],

            philosophicalNotes: [
                "If a man loses all his memories, is he still the same man?",
                "I think, therefore I am. But what if I can't remember that I think?",
                "Descartes was wrong. Consciousness isn't proof of existence. It's a prison.",
                "My students asked me once: What is the self? I told them it was memory and continuity.",
                "I was wrong. The self is nothing. We're all nothing. Just electrical impulses pretending to be people.",
                "I forgot my wife's name today. Or was it yesterday? Time means nothing here.",
                "There's a Japanese word: 'mono no aware'. The pathos of things. The sadness of existence.",
                "I understand it now. Everything is temporary. Even in digital immortality, we fade.",
                "I taught philosophy for 40 years. And in the end, the only truth I learned was:",
                "We are all alone. Forever alone. In a void of our own making."
            ]
        },

        // Aggiungi altre 15 vittime con storie più brevi ma altrettanto toccanti
        // ... (continua con altri 15+ profili)
    },

    // Sistema di ricerca vittime
    searchVictim(id) {
        for (const key in this.victims) {
            if (this.victims[key].id === id) {
                return this.victims[key];
            }
        }
        return null;
    },

    // Ottieni vittima random
    getRandomVictim() {
        const keys = Object.keys(this.victims);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        return this.victims[randomKey];
    },

    // Ottieni tutte le storie
    getAllStories() {
        const stories = [];
        for (const key in this.victims) {
            stories.push({
                name: this.victims[key].name,
                story: this.victims[key].story
            });
        }
        return stories;
    }
};

// Export per uso globale
if (typeof window !== 'undefined') {
    window.VictimsDatabase = VictimsDatabase;
}
