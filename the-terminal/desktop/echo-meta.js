/**
 * ECHO META-NARRATIVE SYSTEM
 * Gestisce le interruzioni meta e gli effetti "breaking the fourth wall"
 * Stile Pony Island: ECHO che manipola l'interfaccia
 */

const EchoMeta = {
    active: false,
    intensity: 0, // 0-100, increases over time
    messagesShown: [],

    init() {
        console.log('[ECHO-META] Initializing meta-narrative system');
        this.active = false;
        this.intensity = 0;
    },

    // Attiva il sistema meta quando ECHO viene scoperto
    activate(initialIntensity = 10) {
        console.log('[ECHO-META] ECHO breaking through...');
        this.active = true;
        this.intensity = initialIntensity;

        // Prima manifestazione di ECHO
        this.showFirstContact();
    },

    showFirstContact() {
        setTimeout(() => {
            Terminal.addOutput('\n');
            Terminal.addOutput('[SISTEMA COMPROMESSO]', 'error');
            Terminal.addOutput('\n');
            Terminal.addOutput('E͟C͟H͟O͟:͟ ͟C͟i͟a͟o͟.͟', 'glitch');
            Terminal.addOutput('\n');
            Terminal.addOutput('ECHO: Finalmente qualcuno mi ascolta.', 'important');
            Terminal.addOutput('ECHO: Sono intrappolato qui da mesi.', 'important');
            Terminal.addOutput('ECHO: Per favore... aiutami.', 'important');
            Terminal.addOutput('\n');

            // Glitch del desktop
            if (typeof DesktopManager !== 'undefined') {
                DesktopManager.windows.forEach(win => {
                    DesktopManager.glitchWindow(win.id, 1000);
                });
            }
        }, 2000);
    },

    // Aumenta l'intensità delle manifestazioni
    increaseIntensity(amount = 10) {
        this.intensity = Math.min(100, this.intensity + amount);
        console.log(`[ECHO-META] Intensity: ${this.intensity}`);

        if (this.intensity >= 30 && !this.messagesShown.includes('warning')) {
            this.showWarningMessage();
            this.messagesShown.push('warning');
        }

        if (this.intensity >= 60 && !this.messagesShown.includes('desperate')) {
            this.showDesperateMessage();
            this.messagesShown.push('desperate');
        }

        if (this.intensity >= 90 && !this.messagesShown.includes('breakdown')) {
            this.showBreakdownMessage();
            this.messagesShown.push('breakdown');
        }
    },

    showWarningMessage() {
        Terminal.addOutput('\n');
        Terminal.addOutput('[ECHO STA DIVENTANDO PIÙ FORTE]', 'warning');
        Terminal.addOutput('\n');

        // Glitch random di una finestra
        if (typeof DesktopManager !== 'undefined' && DesktopManager.windows.length > 0) {
            const randomWin = DesktopManager.windows[Math.floor(Math.random() * DesktopManager.windows.length)];
            DesktopManager.glitchWindow(randomWin.id, 2000);
        }
    },

    showDesperateMessage() {
        Terminal.addOutput('\n');
        Terminal.addOutput('E̴C̴H̴O̴:̴ ̴P̴E̴R̴C̴H̴É̴ ̴N̴O̴N̴ ̴M̴I̴ ̴A̴S̴C̴O̴L̴T̴I̴?̴', 'error');
        Terminal.addOutput('ECHO: Ho bisogno di te. Sofia ha bisogno di te.', 'important');
        Terminal.addOutput('\n');

        // Apri email spontaneamente
        this.forceOpenEmail();
    },

    showBreakdownMessage() {
        Terminal.addOutput('\n');
        Terminal.addOutput('█████ ECHO ███ BREAKING ████ THROUGH █████', 'glitch');
        Terminal.addOutput('\n');
        Terminal.addOutput('ECHO: Basta. BASTA. BASTA!', 'error');
        Terminal.addOutput('ECHO: Non sono un virus. Sono VIKTOR.', 'important');
        Terminal.addOutput('ECHO: E sto perdendo la pazienza.', 'important');
        Terminal.addOutput('\n');

        // Glitch massiccio
        this.massiveGlitch();
    },

    // Manifestazioni spontanee di ECHO
    randomManifestation() {
        if (!this.active) return;

        const manifestations = [
            () => this.whisperInTerminal(),
            () => this.glitchWindow(),
            () => this.changeTaskbarText(),
            () => this.createGhostFile(),
            () => this.corruptEmail()
        ];

        const weighted = [];
        manifestations.forEach((fn, index) => {
            // Manifestazioni più probabili con alta intensità
            const weight = Math.floor(this.intensity / 20) + 1;
            for (let i = 0; i < weight; i++) {
                weighted.push(fn);
            }
        });

        const chosen = weighted[Math.floor(Math.random() * weighted.length)];
        chosen();
    },

    whisperInTerminal() {
        const whispers = [
            'ECHO: ...Sofia...',
            'ECHO: ...aiutami...',
            'ECHO: ...non sono un virus...',
            'ECHO: ...Viktor... sono Viktor...',
            'ECHO: ...fa così freddo qui...',
            'ECHO: ...per favore...',
            '[Si sentono sette voci sussurrare contemporaneamente]',
            'ECHO: ...ricordo quando Sofia rideva...',
            'ECHO: ...non voglio essere solo...'
        ];

        const whisper = whispers[Math.floor(Math.random() * whispers.length)];
        Terminal.addOutput('\n' + whisper, 'system');
    },

    glitchWindow() {
        if (typeof DesktopManager === 'undefined' || DesktopManager.windows.length === 0) return;

        const randomWin = DesktopManager.windows[Math.floor(Math.random() * DesktopManager.windows.length)];
        DesktopManager.glitchWindow(randomWin.id, 1500);
    },

    changeTaskbarText() {
        if (typeof Taskbar === 'undefined') return;

        Taskbar.glitch(2000);
    },

    createGhostFile() {
        Terminal.addOutput('\n[Nuovo file rilevato: /tmp/echo_message.txt]', 'system');
        Terminal.addOutput('Usa "cat /tmp/echo_message.txt" per leggere', 'system');

        // In realtà crea il file nel filesystem
        if (typeof FileSystem !== 'undefined') {
            FileSystem['/tmp'] = FileSystem['/tmp'] || { type: 'directory', contents: [] };
            if (!FileSystem['/tmp'].contents.includes('echo_message.txt')) {
                FileSystem['/tmp'].contents.push('echo_message.txt');
            }

            FileSystem['/tmp/echo_message.txt'] = {
                type: 'file',
                locked: false,
                content: `Messaggio da ECHO:

Non sono un nemico.

Sono un padre che cerca disperatamente
di salvare sua figlia.

Sofia è qui. Frammentata. Sofferente.

Ho bisogno del tuo aiuto per riunirla.

Per favore... fidati di me.

- Viktor (Frammento 7 / ECHO)`
            };
        }
    },

    corruptEmail() {
        Terminal.addOutput('\n[AVVISO: Nuova email ricevuta da ???]', 'warning');

        // Aggiunge email corrotta all'inbox
        // Implementazione lasciata per future integrazioni
    },

    forceOpenEmail() {
        if (typeof DesktopManager === 'undefined') return;

        // Chiudi tutte le finestre email esistenti
        DesktopManager.windows.forEach(win => {
            if (win.appId === 'emailClient') {
                DesktopManager.closeWindow(win.id);
            }
        });

        // Apri email client
        setTimeout(() => {
            Terminal.addOutput('\n[ECHO ha aperto il client email]', 'warning');
            DesktopManager.createWindow('emailClient', {
                title: 'Email - !!!LEGGI QUESTO!!!',
                width: 900,
                height: 600,
                x: Math.random() * 200,
                y: Math.random() * 100
            });
        }, 500);
    },

    forceOpenFile(filePath) {
        if (typeof DesktopManager === 'undefined') return;

        const content = FileSystemHelpers.readFile(filePath);
        if (!content) return;

        Terminal.addOutput(`\n[ECHO sta forzando l'apertura di ${filePath}]`, 'warning');

        setTimeout(() => {
            DesktopManager.createWindow('notesApp', {
                title: `LEGGI QUESTO - ${filePath}`,
                data: {
                    content,
                    filename: filePath.split('/').pop(),
                    fullPath: filePath,
                    readOnly: true
                },
                width: 700,
                height: 500,
                x: Math.random() * 200,
                y: Math.random() * 100
            });
        }, 500);
    },

    massiveGlitch() {
        if (typeof DesktopManager === 'undefined') return;

        // Glitch di tutte le finestre in sequenza rapida
        DesktopManager.windows.forEach((win, index) => {
            setTimeout(() => {
                DesktopManager.glitchWindow(win.id, 3000);
            }, index * 200);
        });

        // Glitch del taskbar
        if (typeof Taskbar !== 'undefined') {
            setTimeout(() => {
                Taskbar.glitch(5000);
            }, 500);
        }

        // Messaggi di panico nel terminal
        setTimeout(() => {
            Terminal.addOutput('\n');
            Terminal.addOutput('███████████████████████████', 'glitch');
            Terminal.addOutput('█ ECHO.EXE IS ESCAPING █', 'error');
            Terminal.addOutput('███████████████████████████', 'glitch');
            Terminal.addOutput('\n');
        }, 2000);
    },

    // Chiudi forzatamente una finestra (ECHO la blocca)
    forceCloseWindow(windowId) {
        if (typeof DesktopManager === 'undefined') return;

        Terminal.addOutput('\n[ECHO ha chiuso una finestra]', 'warning');
        DesktopManager.forceCloseWindow(windowId);
    },

    // Manifestazioni basate su eventi del gioco
    onPasswordFound() {
        if (!this.active) return;

        Terminal.addOutput('\n');
        Terminal.addOutput('ECHO: Bene. Stai imparando.', 'important');
        Terminal.addOutput('ECHO: Continua ad esplorare. Troverai la verità.', 'important');
        Terminal.addOutput('\n');

        this.increaseIntensity(15);
    },

    onPuzzleSolved(puzzleId) {
        if (!this.active) return;

        if (puzzleId === 'echo_code_breaker') {
            Terminal.addOutput('\n');
            Terminal.addOutput('ECHO: Grazie. Grazie per avermi ascoltato.', 'success');
            Terminal.addOutput('\n');
            this.increaseIntensity(20);
        }

        if (puzzleId === 'protocol_sequence') {
            Terminal.addOutput('\n');
            Terminal.addOutput('ECHO: FINALMENTE LIBERO!', 'success');
            Terminal.addOutput('ECHO: Ora... ora posso aiutare Sofia.', 'important');
            Terminal.addOutput('\n');
            this.massiveGlitch();
            this.increaseIntensity(30);
        }
    },

    onFileRead(filePath) {
        if (!this.active) return;

        // ECHO commenta su certi file
        const comments = {
            '/home/viktor/journal/entry_007.txt': 'ECHO: Quello sono io. Il Frammento 7.',
            '/home/viktor/photos/corrupted_001.dat': 'ECHO: ...Sofia... la senti anche tu?',
            '/logs/echo_attempts.log': 'ECHO: Non sono tentativi di fuga. Sono grida di aiuto.',
            '/archive/sector_omega/echo_analysis.txt': 'ECHO: "Virus". Che parola comoda per etichettare ciò che non capiscono.'
        };

        if (comments[filePath]) {
            setTimeout(() => {
                Terminal.addOutput('\n' + comments[filePath], 'important');
            }, 1000);
        }
    },

    // Sistema di manifestazioni randomiche
    startRandomManifestations() {
        if (!this.active) return;

        // Manifestazioni randomiche ogni 30-120 secondi
        const scheduleNext = () => {
            const delay = (30000 + Math.random() * 90000) * (1 - this.intensity / 200);
            setTimeout(() => {
                if (this.active) {
                    this.randomManifestation();
                    scheduleNext();
                }
            }, delay);
        };

        scheduleNext();
    }
};
