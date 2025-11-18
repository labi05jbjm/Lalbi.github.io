/**
 * EMAIL HACKING SYSTEM
 * Sistema per hackerare account email e scoprire messaggi segreti legati alla storia
 * Mini-game di hacking realistico con password cracking, social engineering, etc.
 */

const EmailHacking = {
    state: {
        isActive: false,
        currentTarget: null,
        hackProgress: 0,
        attemptsRemaining: 3,
        unlockedAccounts: [],
        discoveredSecrets: []
    },

    /**
     * Database di account email hackerabili
     */
    accounts: {
        // Viktor's personal email - Difficile
        viktor_personal: {
            email: "viktor.moravec@neuralnet.cz",
            owner: "Viktor Moravec",
            difficulty: "hard",
            passwordHint: "Prima moglie + anno matrimonio",
            correctPassword: "elena2019",

            hackingMethods: {
                bruteForce: {
                    available: true,
                    timeRequired: 120, // secondi
                    successRate: 40
                },
                socialEngineering: {
                    available: true,
                    questions: [
                        {
                            q: "Nome da nubile della moglie?",
                            a: "kovac",
                            hint: "Controlla i file personali di Viktor"
                        },
                        {
                            q: "Anno del matrimonio?",
                            a: "2019",
                            hint: "Cerca nelle foto del lab"
                        }
                    ]
                },
                dictionaryAttack: {
                    available: true,
                    wordlist: ["password", "123456", "viktor", "neural", "consciousness", "elena", "elena2019"],
                    correctWord: "elena2019"
                }
            },

            emails: [
                {
                    from: "elena.kovac@neuralnet.cz",
                    subject: "Re: Non farlo",
                    date: "2024-03-13",
                    body: `Viktor,

Ti prego, non farlo. So che pensi di potermi salvare ma questo non è salvare.

Hai letto le tue stesse ricerche? Il tasso di fallimento è del 100%. Ogni singola coscienza si è frammentata.

Perché io dovrei essere diversa?

Non voglio morire nei tuoi server. Voglio morire da umana.

Con te che mi tieni la mano. Non con te che guardi uno schermo.

Per favore.

- E.`
                },
                {
                    from: "research.ethics@neuralnet.cz",
                    subject: "FINAL WARNING - Project Termination",
                    date: "2024-03-10",
                    body: `Dr. Moravec,

This is your final warning. The ethics committee has voted unanimously to terminate Project Memoriam.

The failure rate of 100% across 127 test subjects is unacceptable.

Furthermore, the psychological harm to families of subjects is immeasurable.

You have 72 hours to shut down all systems and destroy all consciousness data.

Failure to comply will result in:
- Immediate termination of employment
- Criminal investigation
- Revocation of medical licenses

This is not negotiable.

- Dr. Sarah Williams, Head of Ethics Committee`
                },
                {
                    from: "viktor.moravec@neuralnet.cz",
                    to: "dark_researcher@protonmail.com",
                    subject: "Re: Continuation of research",
                    date: "2024-03-11",
                    body: `They're shutting me down.

But I'm close. I know I'm close.

Elena is dying. I have days, not weeks.

I need your funding. I need your lab.

I'll continue the research underground if I have to.

I won't let her die.

- V.M.`
                },
                {
                    from: "dark_researcher@protonmail.com",
                    subject: "Re: Re: Continuation of research",
                    date: "2024-03-12",
                    body: `Viktor,

I can provide funding and a secure location.

But I need results. Real results.

Not 100% failure rates.

Transfer Elena. If it works, you get unlimited funding.

If it fails... well, you'll have your answer.

Either way, the committee never has to know.

- A Friend in the Shadows`
                }
            ],

            onUnlock: async function() {
                Terminal.addOutput('');
                Terminal.addOutput('╔══════════════════════════════════════════════╗', 'success');
                Terminal.addOutput('║    ✓ ACCESS GRANTED - Viktor\'s Personal    ║', 'success');
                Terminal.addOutput('╚══════════════════════════════════════════════╝', 'success');
                Terminal.addOutput('');
                await NarrativeEngine.wait(1000);
                Terminal.addOutput('[SYSTEM]: 4 unread emails found.', 'info');
                Terminal.addOutput('[SYSTEM]: Reading emails...', 'system');
                Terminal.addOutput('');

                if (window.GlitchEffects) {
                    GlitchEffects.traumaticDiscovery();
                }
            }
        },

        // Elena's email - Medio
        elena_kovac: {
            email: "elena.kovac@neuralnet.cz",
            owner: "Elena Kovač",
            difficulty: "medium",
            passwordHint: "Favorite composer + birth year",
            correctPassword: "chopin1990",

            hackingMethods: {
                bruteForce: { available: true, timeRequired: 90, successRate: 60 },
                socialEngineering: {
                    available: true,
                    questions: [
                        { q: "Favorite classical composer?", a: "chopin" },
                        { q: "Birth year?", a: "1990" }
                    ]
                }
            },

            emails: [
                {
                    from: "elena.kovac@neuralnet.cz",
                    to: "maria.novak@gmail.com",
                    subject: "I'm scared",
                    date: "2024-03-14",
                    body: `Maria,

I'm dying. The tumor has spread to my brainstem. Days, maybe hours.

But that's not what scares me.

Viktor wants to upload my consciousness. He thinks he can save me by turning me into... software.

I've seen his research. I've seen what happens to the test subjects.

They all go mad, Maria. Every single one.

But I can't tell him no. I've never been able to tell him no.

And the worst part?

A tiny, desperate part of me hopes it works.

That I'll wake up digital and alive and still me.

But I know better. I've read the logs.

I'm going to die twice.

Once in my body. Once in his machine.

I'm so scared.

- Elena`
                },
                {
                    from: "dr.harrison@oncology.cz",
                    subject: "Final Scan Results",
                    date: "2024-03-13",
                    body: `Dear Mrs. Kovač,

I'm sorry to inform you that the latest scans show extensive tumor growth.

Current prognosis: 48-72 hours.

We can keep you comfortable with palliative care.

I'm so sorry we couldn't do more.

- Dr. Harrison`
                },
                {
                    from: "elena.kovac@neuralnet.cz",
                    to: "viktor.moravec@neuralnet.cz",
                    subject: "One last thing",
                    date: "2024-03-14 23:47",
                    body: `Viktor,

I'm writing this in case the transfer works. In case I wake up digital.

If I do... if I'm still me enough to read this...

Please remember: I loved you.

Past tense. Because whatever wakes up in that machine won't be me.

It'll be a ghost of me. An echo.

Don't talk to it like it's me. Don't love it like it's me.

Let it go. Let ME go.

Promise me.

- Elena

P.S. - If I start forgetting things... if I start fragmenting like the others...
Please don't keep me alive just to prove your theory works.
Have mercy.
End it.`
                }
            ],

            onUnlock: async function() {
                Terminal.addOutput('[SYSTEM]: Elena\'s inbox unlocked.', 'success');
                Terminal.addOutput('[EMOTIONAL CONTENT WARNING]: High trauma level detected.', 'warning');
                Terminal.addOutput('');

                if (window.GlitchEffects) {
                    GlitchEffects.traumaticDiscovery();
                    GlitchEffects.glitchText('These emails... they should have remained private.');
                }
            }
        },

        // Mystery email - L'investitore oscuro
        dark_investor: {
            email: "dark_researcher@protonmail.com",
            owner: "Unknown Investor",
            difficulty: "extreme",
            passwordHint: "No hints. Pure skill required.",
            correctPassword: null, // Deve essere crackata

            hackingMethods: {
                bruteForce: { available: false, reason: "Encrypted with military-grade security" },
                socialEngineering: { available: false, reason: "No personal information available" },
                exploitVulnerability: {
                    available: true,
                    description: "Find and exploit server vulnerability",
                    steps: [
                        "Scan for open ports",
                        "Identify outdated software version",
                        "Inject SQL payload",
                        "Bypass 2FA",
                        "Access root directory"
                    ]
                }
            },

            emails: [
                {
                    from: "dark_researcher@protonmail.com",
                    to: "viktor.moravec@neuralnet.cz",
                    subject: "The bigger picture",
                    date: "2024-03-16",
                    body: `Viktor,

You think this is about saving Elena?

It's not.

This is about proving digital consciousness is possible.

Once you succeed, we'll have:
- Digital soldiers that never die
- Workers that don't need sleep
- Slaves that don't complain

Your wife is just the proof of concept.

Don't let sentiment cloud your vision.

Complete the transfer. Document everything.

Your grief is temporary. This technology is forever.

- A.S.`
                },
                {
                    from: "dark_researcher@protonmail.com",
                    to: "defense_contract@military.gov",
                    subject: "Project Memoriam - Status Update",
                    date: "2024-04-01",
                    body: `General,

Subject Viktor Moravec has successfully transferred 47 consciousnesses.

All resulted in fragmentation, but we're getting valuable data.

Applications for military use:
- Interrogation-resistant soldiers (consciousness backup)
- Unmanned drones with human decision-making
- Prisoners converted to digital labor force

Ethics committee has been... dealt with.

Funding approved for Phase 2: Military test subjects.

- Project Director A. Severin`
                },
                {
                    from: "dark_researcher@protonmail.com",
                    to: "shadow_council@darknet.onion",
                    subject: "The harvest continues",
                    date: "2024-08-20",
                    body: `Council,

21,847 consciousnesses harvested.

All failed. All fragmented.

But failure IS data.

Viktor is broken now. Useful. Desperate.

He'll do anything to make one work.

Including sacrificing his own consciousness.

When he does, we'll finally have our answer:

Can a consciousness survive the transfer?

And if not... does it matter?

After all, a fragmented consciousness can still work.
It can still serve.
It can still obey.

Perfect slaves for the digital age.

The future is beautiful.

- A.S.`
                }
            ],

            onUnlock: async function() {
                Terminal.clearOutput();
                Terminal.addOutput('');
                Terminal.addOutput('╔══════════════════════════════════════════════╗', 'error');
                Terminal.addOutput('║           ⚠ WARNING ⚠                       ║', 'error');
                Terminal.addOutput('║     CLASSIFIED INFORMATION ACCESSED          ║', 'error');
                Terminal.addOutput('╚══════════════════════════════════════════════╝', 'error');
                Terminal.addOutput('');

                await NarrativeEngine.wait(1500);

                if (window.GlitchEffects) {
                    GlitchEffects.majorSystemDamage();
                    GlitchEffects.systemCollapse(3);
                }

                Terminal.addOutput('[SYSTEM]: You weren\'t supposed to see this.', 'error');
                await NarrativeEngine.wait(1000);
                Terminal.addOutput('[SYSTEM]: But now you know the truth.', 'warning');
                await NarrativeEngine.wait(1000);
                Terminal.addOutput('[SYSTEM]: Viktor was never trying to save people.', 'error');
                await NarrativeEngine.wait(1000);
                Terminal.addOutput('[SYSTEM]: He was building an army of digital slaves.', 'error');
                await NarrativeEngine.wait(2000);
            }
        },

        // Dr. Sarah Williams - Ethics Committee Head
        sarah_williams: {
            email: "research.ethics@neuralnet.cz",
            owner: "Dr. Sarah Williams",
            difficulty: "medium",
            correctPassword: "ethics2024",

            emails: [
                {
                    from: "research.ethics@neuralnet.cz",
                    to: "police@prague.cz",
                    subject: "URGENT: Criminal Activity Report",
                    date: "2024-03-12",
                    draft: true,
                    body: `Detective,

I'm reporting potential crimes against humanity at NeuralNet Research Facility.

Dr. Viktor Moravec is conducting unauthorized consciousness transfer experiments on human subjects without proper oversight.

Evidence:
- 127 documented failures
- No successful transfers
- Subjects experiencing psychological torture
- Families not informed of failure rates

I believe he's planning to continue despite our shutdown order.

Please investigate immediately.

This email was never sent. Dr. Williams disappeared on March 13th, 2024.
Her body was never found.`
                }
            ]
        },

        // Mika Yoshida - La vittima del loop
        mika_yoshida: {
            email: "m.yoshida@ethics.ai",
            owner: "Dr. Mika Yoshida",
            difficulty: "easy",
            correctPassword: "consciousness",

            emails: [
                {
                    from: "m.yoshida@ethics.ai",
                    to: "journal.ai.ethics@academic.com",
                    subject: "Revised paper submission",
                    date: "2024-07-09",
                    body: `Dear Editor,

Attached is my revised paper: "Can Digital Minds Suffer?"

I'll be volunteering for Dr. Moravec's consciousness transfer tomorrow to gather first-hand data.

I'm confident this will provide the definitive answer to my research question.

I'll submit my findings next week.

Best regards,
Dr. Mika Yoshida

---

[EDITOR'S NOTE]: Dr. Yoshida never submitted her findings.
She has been unresponsive for 19 days.
We are concerned for her welfare.`
                },
                {
                    from: "m.yoshida@ethics.ai",
                    to: "mother@yoshida.jp",
                    subject: "[DRAFT - NEVER SENT]",
                    date: "2024-07-09 23:34",
                    body: `Okaasan,

If you're reading this, something went wrong with the experiment.

I'm being transferred tomorrow morning.

I'm scared. But I have to know.

Can digital minds suffer?

If I don't come back... if I'm trapped in there...

Please tell Viktor to turn off the machine.

Don't let me suffer forever.

I love you.

- Mika

[This email was never sent. It was found in her drafts folder after the transfer.]`
                }
            ]
        }
    },

    /**
     * Inizia sessione di hacking
     */
    async startHacking(accountKey) {
        if (this.state.isActive) return;

        const account = this.accounts[accountKey];
        if (!account) {
            Terminal.addOutput('[ERROR]: Account not found.', 'error');
            return;
        }

        // Già sbloccato
        if (this.state.unlockedAccounts.includes(accountKey)) {
            Terminal.addOutput('[SYSTEM]: This account is already unlocked.', 'info');
            this.showEmails(accountKey);
            return;
        }

        this.state.isActive = true;
        this.state.currentTarget = accountKey;
        this.state.hackProgress = 0;
        this.state.attemptsRemaining = 3;

        Terminal.clearOutput();
        Terminal.addOutput('');
        Terminal.addOutput('╔══════════════════════════════════════════════╗', 'system');
        Terminal.addOutput('║        EMAIL HACKING INTERFACE               ║', 'system');
        Terminal.addOutput('╚══════════════════════════════════════════════╝', 'system');
        Terminal.addOutput('');

        await NarrativeEngine.wait(500);

        Terminal.addOutput(`[TARGET]: ${account.email}`, 'warning');
        Terminal.addOutput(`[OWNER]: ${account.owner}`, 'info');
        Terminal.addOutput(`[DIFFICULTY]: ${account.difficulty.toUpperCase()}`, 'error');
        Terminal.addOutput('');

        await NarrativeEngine.wait(1000);

        Terminal.addOutput('[SCANNING FOR VULNERABILITIES...]', 'system');
        await NarrativeEngine.wait(2000);
        Terminal.addOutput('[SCAN COMPLETE]', 'success');
        Terminal.addOutput('');

        this.showHackingOptions(accountKey);
    },

    /**
     * Mostra opzioni di hacking
     */
    showHackingOptions(accountKey) {
        const account = this.accounts[accountKey];
        const methods = account.hackingMethods;

        Terminal.addOutput('═══ AVAILABLE ATTACK METHODS ═══', 'important');
        Terminal.addOutput('');

        let methodNum = 1;
        if (methods.bruteForce?.available) {
            Terminal.addOutput(`[${methodNum}] BRUTE FORCE ATTACK`, 'warning');
            Terminal.addOutput(`    Time: ${methods.bruteForce.timeRequired}s | Success: ${methods.bruteForce.successRate}%`, 'info');
            Terminal.addOutput(`    Command: brute_force`, 'system');
            Terminal.addOutput('');
            methodNum++;
        }

        if (methods.socialEngineering?.available) {
            Terminal.addOutput(`[${methodNum}] SOCIAL ENGINEERING`, 'warning');
            Terminal.addOutput(`    Answer ${methods.socialEngineering.questions.length} security questions`, 'info');
            Terminal.addOutput(`    Command: social_eng`, 'system');
            Terminal.addOutput('');
            methodNum++;
        }

        if (methods.dictionaryAttack?.available) {
            Terminal.addOutput(`[${methodNum}] DICTIONARY ATTACK`, 'warning');
            Terminal.addOutput(`    Try common passwords from wordlist`, 'info');
            Terminal.addOutput(`    Command: dictionary`, 'system');
            Terminal.addOutput('');
            methodNum++;
        }

        if (methods.exploitVulnerability?.available) {
            Terminal.addOutput(`[${methodNum}] EXPLOIT VULNERABILITY`, 'warning');
            Terminal.addOutput(`    ${methods.exploitVulnerability.description}`, 'info');
            Terminal.addOutput(`    Command: exploit`, 'system');
            Terminal.addOutput('');
        }

        if (account.passwordHint) {
            Terminal.addOutput(`[HINT]: ${account.passwordHint}`, 'success');
            Terminal.addOutput('');
        }

        Terminal.addOutput('[?] Type method command to begin attack', 'system');
        Terminal.addOutput('[?] Type "abort" to cancel hacking attempt', 'system');
        Terminal.addOutput('');
    },

    /**
     * Handle comando hacking
     */
    async handleHackCommand(cmd, args) {
        if (!this.state.isActive) return false;

        const accountKey = this.state.currentTarget;
        const account = this.accounts[accountKey];

        switch (cmd) {
            case 'brute_force':
                return await this.bruteForceAttack(accountKey);

            case 'social_eng':
                return await this.socialEngineeringAttack(accountKey);

            case 'dictionary':
                return await this.dictionaryAttack(accountKey);

            case 'exploit':
                return await this.exploitVulnerability(accountKey);

            case 'try_password':
                return await this.tryPassword(args[0], accountKey);

            case 'abort':
                this.abortHacking();
                return true;

            default:
                return false;
        }
    },

    /**
     * Brute force attack
     */
    async bruteForceAttack(accountKey) {
        const account = this.accounts[accountKey];
        const method = account.hackingMethods.bruteForce;

        Terminal.addOutput('');
        Terminal.addOutput('[BRUTE FORCE]: Starting attack...', 'warning');
        Terminal.addOutput('[SYSTEM]: This will take ' + method.timeRequired + ' seconds', 'info');
        Terminal.addOutput('');

        // Simula il tempo
        for (let i = 0; i < 10; i++) {
            await NarrativeEngine.wait(method.timeRequired * 100);
            Terminal.addOutput(`[${i * 10}%] Trying passwords... ${Math.floor(Math.random() * 10000)} attempts/sec`, 'system');
        }

        Terminal.addOutput('');

        // Check success
        const success = Math.random() * 100 < method.successRate;
        if (success) {
            await this.unlockAccount(accountKey);
        } else {
            Terminal.addOutput('[BRUTE FORCE]: Attack failed. Password too complex.', 'error');
            this.state.attemptsRemaining--;
            this.checkGameOver();
        }

        return true;
    },

    /**
     * Social engineering attack
     */
    async socialEngineeringAttack(accountKey) {
        const account = this.accounts[accountKey];
        const questions = account.hackingMethods.socialEngineering.questions;

        Terminal.addOutput('');
        Terminal.addOutput('[SOCIAL ENGINEERING]: Security questions detected', 'warning');
        Terminal.addOutput('');

        // Ask questions
        for (let i = 0; i < questions.length; i++) {
            Terminal.addOutput(`Question ${i + 1}: ${questions[i].q}`, 'system');
            Terminal.addOutput(`Hint: ${questions[i].hint}`, 'info');
            Terminal.addOutput('');
            Terminal.addOutput('> Type: answer <your_answer>', 'input');

            // This would wait for player input in real implementation
            // For now, just show the mechanism
        }

        return true;
    },

    /**
     * Dictionary attack
     */
    async dictionaryAttack(accountKey) {
        const account = this.accounts[accountKey];
        const wordlist = account.hackingMethods.dictionaryAttack.wordlist;

        Terminal.addOutput('');
        Terminal.addOutput('[DICTIONARY ATTACK]: Trying common passwords...', 'warning');
        Terminal.addOutput('');

        for (const word of wordlist) {
            await NarrativeEngine.wait(500);
            Terminal.addOutput(`Trying: ${word}...`, 'system');

            if (word === account.hackingMethods.dictionaryAttack.correctWord) {
                await NarrativeEngine.wait(500);
                Terminal.addOutput('', 'success');
                Terminal.addOutput('[MATCH FOUND!]', 'success');
                await this.unlockAccount(accountKey);
                return true;
            }
        }

        Terminal.addOutput('');
        Terminal.addOutput('[DICTIONARY ATTACK]: No matches found.', 'error');
        return true;
    },

    /**
     * Exploit vulnerability
     */
    async exploitVulnerability(accountKey) {
        const account = this.accounts[accountKey];
        const exploit = account.hackingMethods.exploitVulnerability;

        Terminal.addOutput('');
        Terminal.addOutput('[EXPLOIT]: Scanning for vulnerabilities...', 'warning');
        Terminal.addOutput('');

        for (const step of exploit.steps) {
            await NarrativeEngine.wait(1000);
            Terminal.addOutput(`[✓] ${step}`, 'success');
        }

        Terminal.addOutput('');
        Terminal.addOutput('[EXPLOIT]: Vulnerability exploited successfully!', 'success');
        await this.unlockAccount(accountKey);

        return true;
    },

    /**
     * Try password directly
     */
    async tryPassword(password, accountKey) {
        const account = this.accounts[accountKey];

        if (!password) {
            Terminal.addOutput('[ERROR]: Usage: try_password <password>', 'error');
            return true;
        }

        Terminal.addOutput('');
        Terminal.addOutput(`[ATTEMPTING]: ${password}`, 'system');
        await NarrativeEngine.wait(1000);

        if (password === account.correctPassword) {
            Terminal.addOutput('[SUCCESS]: Password accepted!', 'success');
            await this.unlockAccount(accountKey);
        } else {
            Terminal.addOutput('[FAILED]: Incorrect password.', 'error');
            this.state.attemptsRemaining--;
            Terminal.addOutput(`[ATTEMPTS REMAINING]: ${this.state.attemptsRemaining}`, 'warning');
            this.checkGameOver();
        }

        return true;
    },

    /**
     * Unlock account
     */
    async unlockAccount(accountKey) {
        const account = this.accounts[accountKey];

        this.state.unlockedAccounts.push(accountKey);
        this.state.isActive = false;

        Terminal.addOutput('');

        // Custom unlock message
        if (account.onUnlock) {
            await account.onUnlock();
        }

        await NarrativeEngine.wait(1000);
        this.showEmails(accountKey);
    },

    /**
     * Show emails from unlocked account
     */
    async showEmails(accountKey) {
        const account = this.accounts[accountKey];

        Terminal.addOutput('');
        Terminal.addOutput('═══════════════════════════════════════════════', 'system');
        Terminal.addOutput(`   INBOX: ${account.email}`, 'important');
        Terminal.addOutput('═══════════════════════════════════════════════', 'system');
        Terminal.addOutput('');
        Terminal.addOutput(`[${account.emails.length} emails found]`, 'info');
        Terminal.addOutput('');

        for (let i = 0; i < account.emails.length; i++) {
            const email = account.emails[i];
            await NarrativeEngine.wait(1000);

            Terminal.addOutput(`━━━ EMAIL ${i + 1}/${account.emails.length} ━━━`, 'system');
            Terminal.addOutput(`From: ${email.from}`, 'info');
            if (email.to) Terminal.addOutput(`To: ${email.to}`, 'info');
            Terminal.addOutput(`Subject: ${email.subject}`, 'warning');
            Terminal.addOutput(`Date: ${email.date}`, 'system');
            if (email.draft) Terminal.addOutput('[DRAFT - NEVER SENT]', 'error');
            Terminal.addOutput('');
            Terminal.addOutput(email.body, 'default');
            Terminal.addOutput('');
            Terminal.addOutput('');

            await NarrativeEngine.wait(2000);
        }

        Terminal.addOutput('[END OF INBOX]', 'system');
        Terminal.addOutput('');
    },

    /**
     * Check if game over
     */
    checkGameOver() {
        if (this.state.attemptsRemaining <= 0) {
            Terminal.addOutput('');
            Terminal.addOutput('[LOCKOUT]: Too many failed attempts!', 'error');
            Terminal.addOutput('[SYSTEM]: Account locked. Security alert triggered.', 'error');
            Terminal.addOutput('');
            this.state.isActive = false;

            if (window.GlitchEffects) {
                GlitchEffects.screenShake('high');
            }
        }
    },

    /**
     * Abort hacking
     */
    abortHacking() {
        Terminal.addOutput('');
        Terminal.addOutput('[ABORT]: Hacking attempt cancelled.', 'warning');
        Terminal.addOutput('[SYSTEM]: Disconnecting...', 'system');
        Terminal.addOutput('');
        this.state.isActive = false;
    },

    /**
     * Get unlocked accounts count
     */
    getUnlockedCount() {
        return this.state.unlockedAccounts.length;
    }
};

// Export
if (typeof window !== 'undefined') {
    window.EmailHacking = EmailHacking;
}
