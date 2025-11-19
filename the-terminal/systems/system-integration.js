/**
 * SYSTEM INTEGRATION
 * Central hub for integrating GlitchEffects, VictimsDatabase, EmailHacking,
 * VirusPlatforming, and MetaPlatforming into narrative blocks
 */

const SystemIntegration = {
    // Track which integrations have been triggered
    triggered: {
        glitchEffects: new Set(),
        victimDiscoveries: new Set(),
        emailHacks: new Set(),
        virusPlatforms: new Set(),
        metaPlatforms: new Set()
    },

    /**
     * GLITCH EFFECTS INTEGRATIONS
     */
    async triggerGlitchForFile(filePath) {
        if (typeof GlitchEffects === 'undefined') return;

        // Trigger specific glitch based on file content
        if (filePath.includes('victim') || filePath.includes('consciousness')) {
            await GlitchEffects.screenShake(3);
            await GlitchEffects.corruptionFlash('CONSCIOUSNESS_DATA_ACCESSED', 1500);
        } else if (filePath.includes('ethics') || filePath.includes('violation')) {
            await GlitchEffects.traumaticDiscovery();
        } else if (filePath.includes('experiment') || filePath.includes('pain')) {
            await GlitchEffects.damagePulse();
        }
    },

    async triggerGlitchForEvent(eventType, data = {}) {
        if (typeof GlitchEffects === 'undefined') return;

        switch (eventType) {
            case 'traumatic_discovery':
                await GlitchEffects.traumaticDiscovery();
                break;

            case 'system_damage':
                await GlitchEffects.majorSystemDamage();
                break;

            case 'consciousness_deletion':
                await GlitchEffects.consciousnessDeletion();
                break;

            case 'system_collapse':
                const stage = data.stage || 1;
                await GlitchEffects.systemCollapse(stage);
                break;

            case 'screen_shake':
                await GlitchEffects.screenShake(data.intensity || 2);
                break;

            case 'corruption':
                await GlitchEffects.corruptionFlash(data.text || 'ERROR', data.duration || 1000);
                break;

            case 'glitch_text':
                await GlitchEffects.glitchText(data.text || 'SYSTEM ERROR', data.duration || 2000);
                break;

            case 'distortion':
                await GlitchEffects.distortion(data.duration || 2000);
                break;

            default:
                console.warn(`[INTEGRATION] Unknown glitch event: ${eventType}`);
        }
    },

    /**
     * VICTIMS DATABASE INTEGRATIONS
     */
    async unlockVictim(victimId, blockNum) {
        if (typeof VictimsDatabase === 'undefined') return;

        const victim = VictimsDatabase.victims[victimId];
        if (!victim) {
            console.error(`[INTEGRATION] Victim not found: ${victimId}`);
            return;
        }

        if (this.triggered.victimDiscoveries.has(victimId)) {
            return; // Already discovered
        }

        this.triggered.victimDiscoveries.add(victimId);

        // Glitch effect first
        await this.triggerGlitchForEvent('screen_shake', { intensity: 3 });

        // Display victim info
        Terminal.addOutput('\n╔════════════════════════════════════════╗', 'error');
        Terminal.addOutput('║   CONSCIOUSNESS RECORD UNLOCKED    ║', 'error');
        Terminal.addOutput('╚════════════════════════════════════════╝', 'error');
        Terminal.addOutput('');
        Terminal.addOutput(`Name: ${victim.name}`, 'warning');
        Terminal.addOutput(`ID: ${victim.id}`, 'system');
        Terminal.addOutput(`Age: ${victim.age}`, 'system');
        Terminal.addOutput(`Survival Time: ${victim.survivalTime}`, 'error');
        Terminal.addOutput('');

        // Display story snippet (first 2 paragraphs)
        if (victim.story && victim.story.length > 0) {
            Terminal.addOutput(victim.story[0], 'echo');
            if (victim.story.length > 1) {
                await NarrativeEngine.wait(1500);
                Terminal.addOutput(victim.story[1], 'echo');
            }
            Terminal.addOutput('');
            Terminal.addOutput('[!] Full story available via Synestesis Search or "victims" command', 'system');
        }

        // Unlock icon on desktop if available
        if (typeof DesktopIcons !== 'undefined') {
            DesktopIcons.unlockIcon('victims-db');
        }
    },

    /**
     * EMAIL HACKING INTEGRATIONS
     */
    async triggerEmailHackPuzzle(accountKey, blockNum, required = false) {
        if (typeof EmailHacking === 'undefined') return;

        if (this.triggered.emailHacks.has(accountKey)) {
            return; // Already hacked
        }

        Terminal.addOutput('\n╔════════════════════════════════════════╗', 'warning');
        Terminal.addOutput('║      EMAIL ACCOUNT DETECTED        ║', 'warning');
        Terminal.addOutput('╚════════════════════════════════════════╝', 'warning');
        Terminal.addOutput('');

        const account = EmailHacking.accounts[accountKey];
        if (!account) {
            console.error(`[INTEGRATION] Account not found: ${accountKey}`);
            return;
        }

        Terminal.addOutput(`Target: ${account.email}`, 'system');
        Terminal.addOutput(`Difficulty: ${account.difficulty}`, required ? 'error' : 'warning');
        Terminal.addOutput('');

        if (required) {
            Terminal.addOutput('[!] REQUIRED: You must hack this account to continue', 'error');
            Terminal.addOutput('');
        }

        Terminal.addOutput('Available commands:', 'system');
        Terminal.addOutput(`  hack ${accountKey}          - Start hacking attempt`, 'system');
        Terminal.addOutput(`  hack ${accountKey} brute    - Brute force attack`, 'system');
        Terminal.addOutput(`  hack ${accountKey} social   - Social engineering`, 'system');
        Terminal.addOutput(`  hack ${accountKey} dict     - Dictionary attack`, 'system');
        Terminal.addOutput('');
    },

    async completeEmailHack(accountKey) {
        this.triggered.emailHacks.add(accountKey);

        // Trigger success glitch
        if (typeof GlitchEffects !== 'undefined') {
            await GlitchEffects.glitchText('ACCESS GRANTED', 1500);
        }

        Terminal.addOutput('\n[✓] Email account successfully compromised!', 'success');
        Terminal.addOutput('[!] Use Synestesis Search to browse emails', 'system');
        Terminal.addOutput('');
    },

    /**
     * VIRUS PLATFORMING INTEGRATIONS
     */
    async triggerVirusPlatforming(virusType, blockNum, required = false) {
        if (typeof VirusPlatforming === 'undefined') return;

        const virusKey = `virus_${virusType}_block${blockNum}`;
        if (this.triggered.virusPlatforms.has(virusKey)) {
            return; // Already completed
        }

        Terminal.addOutput('\n╔════════════════════════════════════════╗', 'error');
        Terminal.addOutput('║    ⚠ VIRUS DETECTED IN SYSTEM ⚠    ║', 'error');
        Terminal.addOutput('╚════════════════════════════════════════╝', 'error');
        Terminal.addOutput('');

        const virus = VirusPlatforming.viruses[virusType];
        if (!virus) {
            console.error(`[INTEGRATION] Virus not found: ${virusType}`);
            return;
        }

        Terminal.addOutput(`Virus Type: ${virus.name}`, 'error');
        Terminal.addOutput(`Threat Level: ${virus.threatLevel}`, 'error');
        Terminal.addOutput('');
        Terminal.addOutput(virus.description, 'warning');
        Terminal.addOutput('');

        if (required) {
            Terminal.addOutput('[!] REQUIRED: Eliminate this virus to continue', 'error');
            Terminal.addOutput('');
        }

        // Glitch effect for virus presence
        if (typeof GlitchEffects !== 'undefined') {
            await GlitchEffects.corruptionFlash('VIRUS_ACTIVE', 2000);
        }

        Terminal.addOutput(`Command: virus ${virusType}`, 'system');
        Terminal.addOutput('');

        return virusKey;
    },

    async completeVirusPlatforming(virusKey) {
        this.triggered.virusPlatforms.add(virusKey);

        Terminal.addOutput('\n[✓] Virus eliminated successfully!', 'success');

        // Maybe unlock darknet access after certain viruses
        if (this.triggered.virusPlatforms.size >= 3) {
            if (typeof SynestesisSearch !== 'undefined' && !SynestesisSearch.darknetUnlocked) {
                Terminal.addOutput('[✓] DARKNET ACCESS UNLOCKED', 'important');
                Terminal.addOutput('[!] Use Synestesis Search to explore darknet content', 'system');
                SynestesisSearch.unlockDarknet();
            }
        }
    },

    /**
     * META PLATFORMING INTEGRATIONS
     */
    async triggerMetaPlatforming(levelKey, trigger, required = false) {
        if (typeof MetaPlatforming === 'undefined') return;

        const metaKey = `meta_${levelKey}`;
        if (this.triggered.metaPlatforms.has(metaKey)) {
            return; // Already completed
        }

        Terminal.addOutput('\n╔════════════════════════════════════════╗', 'important');
        Terminal.addOutput('║      SYSTEM OVERRIDE DETECTED       ║', 'important');
        Terminal.addOutput('╚════════════════════════════════════════╝', 'important');
        Terminal.addOutput('');

        if (required) {
            Terminal.addOutput('[!] ECHO has trapped you in a platforming challenge', 'error');
            Terminal.addOutput('[!] You must complete it to continue', 'error');
        } else {
            Terminal.addOutput('[?] ECHO is mocking you with a platforming challenge', 'warning');
            Terminal.addOutput('[?] This is optional but may reveal secrets', 'system');
        }

        Terminal.addOutput('');

        // Start the platforming session
        await MetaPlatforming.start(levelKey, trigger);

        return metaKey;
    },

    async completeMetaPlatforming(metaKey) {
        this.triggered.metaPlatforms.add(metaKey);
        Terminal.addOutput('\n[✓] Meta platforming challenge completed!', 'success');
    },

    /**
     * BLOCK-SPECIFIC INTEGRATION TRIGGERS
     */
    async integrateBlock01() {
        // Block 01: First victim discovery
        return {
            onFilesComplete: async (phase) => {
                if (phase === 'deep_archive') {
                    // Unlock Elena (Viktor's wife)
                    await this.unlockVictim('elena_kovac', 1);
                }
            },

            onPuzzleComplete: async (puzzleId) => {
                if (puzzleId === 'echoCodeBreaker') {
                    // Corruption effect when breaking ECHO's code
                    await this.triggerGlitchForEvent('corruption', {
                        text: 'ECHO_INTEGRITY_COMPROMISED',
                        duration: 2000
                    });
                }
            }
        };
    },

    async integrateBlock02() {
        // Block 02: Email hacking introduction + Mika discovery
        return {
            onPhaseStart: async (phase) => {
                if (phase === 'doubt_phase') {
                    // Introduce email hacking
                    await this.triggerEmailHackPuzzle('viktor_personal', 2, false);
                }
            },

            onPuzzleComplete: async (puzzleId) => {
                if (puzzleId === 'painIndexPuzzle') {
                    // Unlock Mika after discovering pain index
                    await this.unlockVictim('mika_yoshida', 2);

                    // Trigger system damage glitch
                    await this.triggerGlitchForEvent('system_damage');
                }
            }
        };
    },

    async integrateBlock03() {
        // Block 03: First virus + Sofia discovery
        return {
            onPhaseStart: async (phase) => {
                if (phase === 'deep_dive') {
                    // First virus encounter - worm
                    await this.triggerVirusPlatforming('worm', 3, true);
                }
            },

            onVirusComplete: async () => {
                // Unlock Sofia (8-year-old victim)
                await this.unlockVictim('sofia_reyes', 3);
            }
        };
    },

    async integrateBlock04() {
        // Block 04: Trojan virus + ransomware + email hack required
        return {
            onPhaseStart: async (phase) => {
                if (phase === 'fractures') {
                    // Trojan virus
                    await this.triggerVirusPlatforming('trojan', 4, true);
                }
            },

            onVirusComplete: async () => {
                // After trojan, trigger ransomware
                await this.triggerVirusPlatforming('ransomware', 4, true);
            },

            onRansomwareComplete: async () => {
                // Required email hack to proceed
                await this.triggerEmailHackPuzzle('dark_investor', 4, true);
            }
        };
    },

    async integrateBlock05() {
        // Block 05: Meta platforming introduction + spyware virus
        return {
            onPhaseStart: async (phase) => {
                if (phase === 'reflection') {
                    // ECHO starts getting hostile - trigger meta platforming
                    await this.triggerMetaPlatforming('tutorial', 'echo_hostility', false);
                }
            },

            onMetaComplete: async () => {
                // After meta platforming, spyware virus appears
                await this.triggerVirusPlatforming('spyware', 5, true);
            },

            onPuzzleComplete: async (puzzleId) => {
                if (puzzleId === 'identityCrisis') {
                    // Unlock Marcus victim
                    await this.unlockVictim('marcus_chen', 5);
                }
            }
        };
    },

    async integrateBlock06() {
        // Block 06: Rage - multiple viruses + difficult meta platforming
        return {
            onPhaseStart: async (phase) => {
                if (phase === 'rage') {
                    // Rootkit virus
                    await this.triggerVirusPlatforming('rootkit', 6, true);
                }
            },

            onRootkitComplete: async () => {
                // Logic bomb virus
                await this.triggerVirusPlatforming('logicBomb', 6, true);
            },

            onLogicBombComplete: async () => {
                // Impossible meta platforming
                await this.triggerMetaPlatforming('impossible', 'echo_rage', true);
            },

            onMetaComplete: async () => {
                // System collapse glitch stage 2
                await this.triggerGlitchForEvent('system_collapse', { stage: 2 });
            }
        };
    },

    async integrateBlock07() {
        // Block 07: Final viruses + final email hacks
        return {
            onPhaseStart: async (phase) => {
                if (phase === 'acceptance') {
                    // Polymorphic virus
                    await this.triggerVirusPlatforming('polymorphic', 7, true);
                }
            },

            onPolymorphicComplete: async () => {
                // Boot sector virus (final virus)
                await this.triggerVirusPlatforming('bootSector', 7, true);
            },

            onBootSectorComplete: async () => {
                // Final email hack - shadow council
                await this.triggerEmailHackPuzzle('shadow_council', 7, true);
            },

            onFinalHackComplete: async () => {
                // System collapse stage 3
                await this.triggerGlitchForEvent('system_collapse', { stage: 3 });
            }
        };
    },

    async integrateBlock08() {
        // Block 08: Finale - meta platforming finale
        return {
            onPhaseStart: async (phase) => {
                if (phase === 'finale') {
                    // Final meta platforming challenge
                    await this.triggerMetaPlatforming('finale', 'final_confrontation', true);
                }
            },

            onChoice: async (choice) => {
                if (choice === 'destroy_echo') {
                    await this.triggerGlitchForEvent('consciousness_deletion');
                } else if (choice === 'merge') {
                    await this.triggerGlitchForEvent('system_collapse', { stage: 4 });
                }
            }
        };
    },

    /**
     * UTILITY: Get integration hooks for a block
     */
    getBlockIntegration(blockNum) {
        const integrations = {
            1: () => this.integrateBlock01(),
            2: () => this.integrateBlock02(),
            3: () => this.integrateBlock03(),
            4: () => this.integrateBlock04(),
            5: () => this.integrateBlock05(),
            6: () => this.integrateBlock06(),
            7: () => this.integrateBlock07(),
            8: () => this.integrateBlock08()
        };

        return integrations[blockNum] ? integrations[blockNum]() : null;
    }
};
