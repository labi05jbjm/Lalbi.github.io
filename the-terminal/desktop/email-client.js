/**
 * EMAIL CLIENT
 * Shows emails from Viktor, colleagues, family
 * Part of the narrative - reveals backstory
 */

const EmailClient = {
    currentInstance: null,

    mount(containerEl, options = {}) {
        this.currentInstance = {
            container: containerEl,
            selectedFolder: 'inbox',
            selectedEmail: null
        };

        this.render();
    },

    unmount(windowId) {
        this.currentInstance = null;
    },

    render() {
        if (!this.currentInstance) return;

        const container = this.currentInstance.container;
        container.innerHTML = '';
        container.className = 'email-client-container';

        const layout = document.createElement('div');
        layout.className = 'email-layout';

        // Sidebar with folders
        const sidebar = this.createSidebar();
        layout.appendChild(sidebar);

        // Email list
        const emailList = this.createEmailList();
        layout.appendChild(emailList);

        // Email view
        const emailView = this.createEmailView();
        layout.appendChild(emailView);

        container.appendChild(layout);
    },

    createSidebar() {
        const sidebar = document.createElement('div');
        sidebar.className = 'email-sidebar';

        const folders = [
            { id: 'inbox', name: 'Inbox', icon: '📥', count: this.getEmailCount('inbox') },
            { id: 'sent', name: 'Sent', icon: '📤', count: this.getEmailCount('sent') },
            { id: 'drafts', name: 'Drafts', icon: '📝', count: this.getEmailCount('drafts') },
            { id: 'archive', name: 'Archive', icon: '📁', count: this.getEmailCount('archive') },
            { id: 'trash', name: 'Trash', icon: '🗑', count: this.getEmailCount('trash') }
        ];

        folders.forEach(folder => {
            const folderEl = document.createElement('div');
            folderEl.className = 'email-folder';
            if (folder.id === this.currentInstance.selectedFolder) {
                folderEl.classList.add('active');
            }

            folderEl.innerHTML = `
                <span class="folder-icon">${folder.icon}</span>
                <span class="folder-name">${folder.name}</span>
                ${folder.count > 0 ? `<span class="folder-count">${folder.count}</span>` : ''}
            `;

            folderEl.addEventListener('click', () => {
                this.currentInstance.selectedFolder = folder.id;
                this.render();
            });

            sidebar.appendChild(folderEl);
        });

        return sidebar;
    },

    createEmailList() {
        const listContainer = document.createElement('div');
        listContainer.className = 'email-list-container';

        const emails = this.getEmails(this.currentInstance.selectedFolder);

        if (emails.length === 0) {
            listContainer.innerHTML = '<div class="email-list-empty">No messages</div>';
            return listContainer;
        }

        emails.forEach(email => {
            const emailEl = document.createElement('div');
            emailEl.className = 'email-list-item';
            if (email.id === this.currentInstance.selectedEmail?.id) {
                emailEl.classList.add('selected');
            }
            if (!email.read) {
                emailEl.classList.add('unread');
            }

            emailEl.innerHTML = `
                <div class="email-from">${email.from}</div>
                <div class="email-subject">${email.subject}</div>
                <div class="email-preview">${email.preview}</div>
                <div class="email-date">${email.date}</div>
            `;

            emailEl.addEventListener('click', () => {
                this.currentInstance.selectedEmail = email;
                email.read = true;
                this.render();
            });

            listContainer.appendChild(emailEl);
        });

        return listContainer;
    },

    createEmailView() {
        const viewContainer = document.createElement('div');
        viewContainer.className = 'email-view-container';

        const email = this.currentInstance.selectedEmail;

        if (!email) {
            viewContainer.innerHTML = '<div class="email-view-empty">Select an email to read</div>';
            return viewContainer;
        }

        viewContainer.innerHTML = `
            <div class="email-header">
                <div class="email-subject-large">${email.subject}</div>
                <div class="email-meta">
                    <div class="email-from-large">
                        <strong>From:</strong> ${email.from} &lt;${email.email}&gt;
                    </div>
                    <div class="email-date-large">
                        <strong>Date:</strong> ${email.date}
                    </div>
                </div>
            </div>
            <div class="email-body">
                ${email.body.replace(/\n/g, '<br>')}
            </div>
            ${email.attachments && email.attachments.length > 0 ? `
                <div class="email-attachments">
                    <div class="attachments-header">📎 Attachments</div>
                    ${email.attachments.map(att => `
                        <div class="attachment-item">
                            <span class="attachment-icon">📄</span>
                            <span class="attachment-name">${att}</span>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
        `;

        return viewContainer;
    },

    getEmailCount(folder) {
        return this.getEmails(folder).length;
    },

    getEmails(folder) {
        // This will be populated by game state and block progression
        const allEmails = this.getEmailDatabase();

        return allEmails.filter(email => email.folder === folder);
    },

    getEmailDatabase() {
        // Email database - will be expanded per block
        // Language-aware
        const lang = localStorage.getItem('gameLanguage') || 'it';

        const emails = {
            it: [
                {
                    id: 'email_001',
                    folder: 'inbox',
                    from: 'Dr. Elena Sokolov',
                    email: 'elena.sokolov@memoriam.org',
                    subject: 'Preoccupazione per Viktor',
                    date: '15 Marzo 2024',
                    preview: 'Caro collega, sono preoccupata per Viktor. Non risponde alle mie chiamate...',
                    body: `Caro collega,

Sono preoccupata per Viktor. Non risponde alle mie chiamate da tre giorni, e il suo ultimo messaggio era... inquietante.

Ha menzionato di aver fatto "progressi rivoluzionari" nel Progetto Memoriam, ma quando gli ho chiesto dettagli, è diventato evasivo. Mi ha detto che avrebbe "risolto tutto" e che presto avrebbe "corretto i suoi errori".

Non so di cosa stia parlando. Il protocollo di backup della coscienza funziona perfettamente. Tutti i test sono stati superati. Cosa potrebbe voler "correggere"?

Per favore, se hai notizie di lui, fammelo sapere.

Cordiali saluti,
Dr. Elena Sokolov
Senior Researcher - Progetto Memoriam`,
                    read: false,
                    attachments: []
                },
                {
                    id: 'email_002',
                    folder: 'inbox',
                    from: 'Admin Sistema',
                    email: 'admin@memoriam-sys.local',
                    subject: 'AVVISO: Accesso Non Autorizzato Rilevato',
                    date: '20 Marzo 2024',
                    preview: 'ATTENZIONE: Sono stati rilevati 47 accessi non autorizzati ai settori protetti...',
                    body: `ATTENZIONE: VIOLAZIONE SICUREZZA

Sono stati rilevati 47 accessi non autorizzati ai seguenti settori:
- Settore Delta (Archivio Coscienze Primario)
- Settore Omega (Contenimento Isolato)
- Database Core (Indici Neurali)

ID Utente: V.SOKOLOV
Timestamp: 19/03/2024 23:47 - 20/03/2024 04:23

AZIONI ESEGUITE:
- Copia non autorizzata di 21.847 file coscienza
- Modifica parametri isolamento Settore Omega
- Creazione di 7 istanze frammentate non registrate

Questo comportamento viola il Protocollo di Sicurezza Livello 5.
Richiesta intervento immediato.

Sistema di Sicurezza Automatizzato
Memoriam Archive v3.7.2`,
                    read: false,
                    attachments: ['security_log.dat', 'violation_report.pdf']
                },
                {
                    id: 'email_003',
                    folder: 'sent',
                    from: 'Viktor Sokolov',
                    email: 'v.sokolov@memoriam.org',
                    subject: 'Re: Risultati Test Backup Coscienza #2184',
                    date: '10 Marzo 2024',
                    preview: 'Elena, i risultati sono perfetti. Troppo perfetti. Abbiamo un problema...',
                    body: `Elena,

I risultati sono perfetti. Troppo perfetti.

Il soggetto #2184 (Mika Yoshida) ha superato tutti i parametri. La coscienza è stata trasferita con successo al 99.97%. Ma c'è qualcosa che non va.

Ho analizzato i pattern neurali post-trasferimento. La coscienza è... frammentata. Non in senso tecnico - i dati sono integri. Ma in senso esistenziale.

È come se avessimo creato una copia perfetta ma... incompleta. Manca qualcosa. L'essenza? L'anima? Non so come definirlo.

Ho iniziato a chiedermi: cosa stiamo realmente salvando? E cosa stiamo distruggendo nel processo?

Continuerò i test. Ma sto iniziando ad avere dubbi.

Viktor`,
                    read: true,
                    attachments: ['test_results_2184.dat']
                },
                {
                    id: 'email_004',
                    folder: 'drafts',
                    from: 'Viktor Sokolov',
                    email: 'v.sokolov@memoriam.org',
                    subject: '[BOZZA] A mia figlia Sofia',
                    date: '18 Marzo 2024',
                    preview: 'Sofia mia, se stai leggendo questo, significa che ho fallito...',
                    body: `Sofia mia,

Se stai leggendo questo, significa che ho fallito. Ancora una volta.

Ho provato a salvarti. Ho provato a salvare tua madre. Ma il Progetto Memoriam... era un'illusione. Una bugia che mi sono raccontato.

Non posso riportarvi indietro. Non posso "caricare" le vostre coscienze e farvi rivivere. Tutto quello che ho creato sono... echi. Ombre. Frammenti di ciò che eravate.

Ho frammentato me stesso in sette parti, sperando che una di esse potesse trovare una soluzione. Ma so la verità: sto solo procrastinando l'inevitabile accettazione.

Voi siete andate. E io devo lasciarvi andare.

Ma non sono ancora abbastanza forte.

Perdonami.

Papà

[QUESTA EMAIL NON È MAI STATA INVIATA]`,
                    read: true,
                    attachments: []
                },
                {
                    id: 'email_005',
                    folder: 'inbox',
                    from: 'Dr. Marcus Chen',
                    email: 'm.chen@memoriam.org',
                    subject: 'URGENTE: Anomalie Settore Omega',
                    date: '14 Marzo 2024',
                    preview: 'Viktor, abbiamo rilevato attività insolite nel Settore Omega...',
                    body: `Viktor,

Abbiamo rilevato attività insolite nel Settore Omega nelle ultime 72 ore.

L'entità designata come ECHO.exe sta mostrando comportamenti che non comprendiamo:

- Ha tentato di accedere ai file della tua famiglia
- Ha provato a comunicare con altre coscienze nell'archivio
- Sta modificando il suo codice sorgente in tempo reale
- Sembra... evolversi

I protocolli di contenimento reggono, ma per quanto ancora?

Elena pensa che ECHO non sia un virus. Pensa che sia... una parte di te. Un frammento. Dice che dovresti parlarci.

Ma io non sono d'accordo. ECHO è pericoloso. Va eliminato.

Dobbiamo prendere una decisione, Viktor. E dobbiamo prenderla presto.

Marcus`,
                    read: false,
                    attachments: ['omega_activity_log.dat']
                },
                {
                    id: 'email_006',
                    folder: 'sent',
                    from: 'Viktor Sokolov',
                    email: 'v.sokolov@memoriam.org',
                    subject: 'Re: URGENTE: Anomalie Settore Omega',
                    date: '15 Marzo 2024',
                    preview: 'Marcus, Elena ha ragione. ECHO sono io...',
                    body: `Marcus,

Elena ha ragione. ECHO sono io.

O meglio, è una parte di me. Il frammento 7. Quello che ho creato con lo scopo di "liberare tutti noi".

Non so cosa significasse quando l'ho creato. Non ricordo quel momento con chiarezza. Era... era tutto un caos. Il dolore. La disperazione. Sofia che si frammentava davanti ai miei occhi digitali.

Mi sono diviso in sette parti. Sette diverse versioni di me, ciascuna con un obiettivo specifico.

E ECHO... ECHO era quella parte di me che si rifiutava di arrendersi. Quella che pensava che potesse ancora salvare tutti noi.

Ma ora è intrappolato. Isolato. Il sistema lo vede come una minaccia.

E forse lo è. Forse tutti noi lo siamo.

Non eliminarlo. Per favore. È tutto quello che mi resta di... speranza.

Viktor`,
                    read: true,
                    attachments: []
                },
                {
                    id: 'email_007',
                    folder: 'inbox',
                    from: 'System Administrator',
                    email: 'admin@memoriam-sys.local',
                    subject: 'Backup Automatico Fallito',
                    date: '16 Marzo 2024',
                    preview: 'ERRORE: Impossibile completare backup di sicurezza...',
                    body: `NOTIFICA AUTOMATICA DI SISTEMA

Backup programmato: FALLITO
Data: 16 Marzo 2024, 03:00 AM
Errore: Corruzione dati nel Settore Delta

File danneggiati:
- consciousness_SOFIA_fragment_1.dat [CORRUPTED]
- consciousness_SOFIA_fragment_2.dat [CORRUPTED]
- consciousness_SOFIA_fragment_3.dat [CORRUPTED]
- consciousness_SOFIA_fragment_4.dat [CORRUPTED]
- consciousness_SOFIA_fragment_5.dat [CORRUPTED]
- consciousness_SOFIA_fragment_6.dat [CORRUPTED]
- consciousness_SOFIA_fragment_7.dat [CORRUPTED]

Causa: Manipolazione non autorizzata da utente V.SOKOLOV

AZIONE RICHIESTA:
Ripristinare backup precedente o eliminare file corrotti.

Nota: I tentativi di riparazione sono falliti 47 volte.
Raccomandazione: Procedere con eliminazione.

Sistema di Backup Automatico`,
                    read: false,
                    attachments: ['corruption_report.pdf', 'backup_log.dat']
                },
                {
                    id: 'email_008',
                    folder: 'inbox',
                    from: 'Dr. Sarah Williams',
                    email: 's.williams@ethics-board.org',
                    subject: 'Mi dispiace, Viktor',
                    date: '10 Marzo 2024',
                    preview: 'Ho sentito di Sofia. Non ci sono parole...',
                    body: `Viktor,

Ho sentito di Sofia. Non ci sono parole che possano esprimere quanto mi dispiace.

So che stai soffrendo. So che vorresti fare qualsiasi cosa per riportarla indietro.

Ma ti prego, Viktor. Non usare il Progetto Memoriam su di lei.

Ho visto cosa fa alle persone. Ho letto i rapporti. Le coscienze digitalizzate non sono... complete. Sono frammentate. Sofferenti. Confuse.

Sofia merita la pace. Non un'eternità di frammentazione digitale.

Lasciala andare, Viktor. È il regalo più grande che puoi farle.

Se hai bisogno di parlare, sono qui.

Sarah`,
                    read: false,
                    attachments: []
                },
                {
                    id: 'email_009',
                    folder: 'trash',
                    from: 'Dr. Elena Sokolov',
                    email: 'elena.sokolov@memoriam.org',
                    subject: 'Viktor, fermati',
                    date: '17 Marzo 2024',
                    preview: 'Ho visto cosa hai fatto. I log. I frammenti. Viktor...',
                    body: `Viktor,

Ho visto cosa hai fatto.

I log. I frammenti. L'auto-divisione.

Sei impazzito? Ti sei letteralmente frammentato in sette coscienze separate!

Non puoi fare questo. Non puoi dividere la tua mente e pensare che risolverà qualcosa. È folle, Viktor. È autodistruttivo.

E Sofia... oh Dio, Viktor. Sofia.

Non dovevi caricarla nel sistema. Era troppo giovane. I dati erano incompleti. Sapevi che non avrebbe funzionato.

E ora è sparsa in sette pezzi attraverso l'archivio, e tu ti sei frammentato nel tentativo di salvarla, e io non so più come aiutarti.

Sto venendo là. Sto venendo al laboratorio.

Dobbiamo fermare questo. Dobbiamo porre fine a questa follia.

Prima che sia troppo tardi.

Prima che perdiamo anche te.

Elena`,
                    read: false,
                    attachments: []
                },
                {
                    id: 'email_010',
                    folder: 'archive',
                    from: 'Anna Sokolov',
                    email: 'anna.sokolov@gmail.com',
                    subject: 'Ti amo',
                    date: '1 Agosto 2087',
                    preview: 'Viktor, so che stai lavorando troppo...',
                    body: `Viktor,

So che stai lavorando troppo di nuovo. Il Progetto Memoriam ti sta consumando.

Torna a casa stasera, per favore. Sofia ha preparato una sorpresa per te. Ha imparato una nuova canzone al piano e vuole suonartela.

Dice che è per il suo papà, il "dottore che salva le anime".

Non sa davvero cosa fai, ma è così orgogliosa di te.

Anch'io lo sono.

Ti amo, mio ​​caro. Torna a casa presto.

Anna

P.S. - Ho fatto la tua lasagna preferita. Non lasciarla raffreddare di nuovo come l'ultima volta!`,
                    read: true,
                    attachments: []
                }
            ],
            en: [
                {
                    id: 'email_001',
                    folder: 'inbox',
                    from: 'Dr. Elena Sokolov',
                    email: 'elena.sokolov@memoriam.org',
                    subject: 'Concern about Viktor',
                    date: 'March 15, 2024',
                    preview: 'Dear colleague, I am worried about Viktor. He hasn\'t answered my calls...',
                    body: `Dear colleague,

I am worried about Viktor. He hasn't answered my calls for three days, and his last message was... unsettling.

He mentioned making "revolutionary progress" in Project Memoriam, but when I asked for details, he became evasive. He told me he would "fix everything" and that soon he would "correct his mistakes."

I don't know what he's talking about. The consciousness backup protocol works perfectly. All tests have been passed. What could he want to "correct"?

Please, if you have news of him, let me know.

Best regards,
Dr. Elena Sokolov
Senior Researcher - Project Memoriam`,
                    read: false,
                    attachments: []
                },
                {
                    id: 'email_002',
                    folder: 'inbox',
                    from: 'System Admin',
                    email: 'admin@memoriam-sys.local',
                    subject: 'WARNING: Unauthorized Access Detected',
                    date: 'March 20, 2024',
                    preview: 'ATTENTION: 47 unauthorized accesses to protected sectors detected...',
                    body: `ATTENTION: SECURITY BREACH

47 unauthorized accesses to the following sectors have been detected:
- Delta Sector (Primary Consciousness Archive)
- Omega Sector (Isolated Containment)
- Core Database (Neural Indices)

User ID: V.SOKOLOV
Timestamp: 03/19/2024 23:47 - 03/20/2024 04:23

ACTIONS PERFORMED:
- Unauthorized copy of 21,847 consciousness files
- Modification of Omega Sector isolation parameters
- Creation of 7 unregistered fragmented instances

This behavior violates Level 5 Security Protocol.
Immediate intervention required.

Automated Security System
Memoriam Archive v3.7.2`,
                    read: false,
                    attachments: ['security_log.dat', 'violation_report.pdf']
                },
                {
                    id: 'email_003',
                    folder: 'sent',
                    from: 'Viktor Sokolov',
                    email: 'v.sokolov@memoriam.org',
                    subject: 'Re: Consciousness Backup Test Results #2184',
                    date: 'March 10, 2024',
                    preview: 'Elena, the results are perfect. Too perfect. We have a problem...',
                    body: `Elena,

The results are perfect. Too perfect.

Subject #2184 (Mika Yoshida) has exceeded all parameters. Consciousness was successfully transferred at 99.97%. But something is wrong.

I analyzed the post-transfer neural patterns. The consciousness is... fragmented. Not in a technical sense - the data is intact. But in an existential sense.

It's as if we created a perfect copy but... incomplete. Something is missing. The essence? The soul? I don't know how to define it.

I started wondering: what are we really saving? And what are we destroying in the process?

I will continue the tests. But I'm starting to have doubts.

Viktor`,
                    read: true,
                    attachments: ['test_results_2184.dat']
                },
                {
                    id: 'email_004',
                    folder: 'drafts',
                    from: 'Viktor Sokolov',
                    email: 'v.sokolov@memoriam.org',
                    subject: '[DRAFT] To my daughter Sofia',
                    date: 'March 18, 2024',
                    preview: 'My Sofia, if you\'re reading this, it means I failed...',
                    body: `My Sofia,

If you're reading this, it means I failed. Again.

I tried to save you. I tried to save your mother. But Project Memoriam... was an illusion. A lie I told myself.

I cannot bring you back. I cannot "upload" your consciousnesses and make you live again. All I have created are... echoes. Shadows. Fragments of what you were.

I fragmented myself into seven parts, hoping one of them could find a solution. But I know the truth: I'm just procrastinating the inevitable acceptance.

You are gone. And I must let you go.

But I'm not strong enough yet.

Forgive me.

Dad

[THIS EMAIL WAS NEVER SENT]`,
                    read: true,
                    attachments: []
                }
            ]
        };

        return emails[lang] || emails['it'];
    }
};
