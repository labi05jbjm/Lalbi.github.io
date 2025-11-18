/**
 * GLITCH EFFECTS SYSTEM
 * Sistema di effetti visivi di glitch e danno per eventi negativi narrativi
 * Ispirato a: Pony Island, DDLC, Undertale
 */

const GlitchEffects = {
    state: {
        glitchLevel: 0, // 0-100, aumenta con eventi negativi
        isGlitching: false,
        damageEffectsActive: false,
        corruptionLevel: 0
    },

    /**
     * Inizializza il sistema di glitch
     */
    init() {
        console.log('[GLITCH EFFECTS] Sistema effetti glitch inizializzato');
        this.attachStyles();
    },

    /**
     * Attacca gli stili CSS per gli effetti glitch
     */
    attachStyles() {
        const style = document.createElement('style');
        style.id = 'glitch-effects-styles';
        style.textContent = `
            /* Effetto glitch testo */
            .glitch-text {
                position: relative;
                animation: glitch-anim 0.3s infinite;
            }

            @keyframes glitch-anim {
                0% {
                    clip-path: inset(40% 0 61% 0);
                    transform: translate(0);
                }
                20% {
                    clip-path: inset(92% 0 1% 0);
                    transform: translate(-2px, 2px);
                }
                40% {
                    clip-path: inset(43% 0 1% 0);
                    transform: translate(-2px, -2px);
                }
                60% {
                    clip-path: inset(25% 0 58% 0);
                    transform: translate(2px, -2px);
                }
                80% {
                    clip-path: inset(54% 0 7% 0);
                    transform: translate(2px, 2px);
                }
                100% {
                    clip-path: inset(58% 0 43% 0);
                    transform: translate(0);
                }
            }

            /* Effetto screen shake */
            .screen-shake {
                animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
            }

            @keyframes shake {
                10%, 90% { transform: translate3d(-1px, 0, 0); }
                20%, 80% { transform: translate3d(2px, 0, 0); }
                30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
                40%, 60% { transform: translate3d(4px, 0, 0); }
            }

            /* Effetto corruption */
            .corruption-effect {
                position: relative;
                background: linear-gradient(90deg, #ff0000, #00ff00, #0000ff);
                background-size: 200% 100%;
                animation: corruption-wave 2s linear infinite;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }

            @keyframes corruption-wave {
                0% { background-position: 0% 50%; }
                100% { background-position: 200% 50%; }
            }

            /* Effetto static noise */
            .static-noise {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                background-image:
                    repeating-linear-gradient(
                        0deg,
                        transparent,
                        transparent 2px,
                        rgba(255,255,255,.03) 2px,
                        rgba(255,255,255,.03) 4px
                    );
                animation: static-anim 0.2s infinite;
                opacity: 0;
                transition: opacity 0.3s;
                z-index: 9999;
            }

            .static-noise.active {
                opacity: 0.5;
            }

            @keyframes static-anim {
                0% { transform: translateY(0); }
                100% { transform: translateY(4px); }
            }

            /* Effetto damage pulse */
            .damage-pulse {
                animation: damage-pulse-anim 0.5s ease-in-out;
            }

            @keyframes damage-pulse-anim {
                0%, 100% {
                    filter: brightness(1) hue-rotate(0deg);
                }
                50% {
                    filter: brightness(1.5) hue-rotate(180deg) saturate(2);
                }
            }

            /* Effetto scan lines */
            .scan-lines {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                background: linear-gradient(
                    transparent 50%,
                    rgba(0, 255, 0, 0.05) 50%
                );
                background-size: 100% 4px;
                z-index: 9998;
                opacity: 0;
                transition: opacity 0.3s;
            }

            .scan-lines.active {
                opacity: 1;
            }

            /* Effetto distortion */
            .distortion {
                animation: distort 0.3s ease-in-out infinite;
            }

            @keyframes distort {
                0% { transform: scaleX(1); }
                33% { transform: scaleX(1.05); }
                66% { transform: scaleX(0.95); }
                100% { transform: scaleX(1); }
            }
        `;
        document.head.appendChild(style);

        // Crea overlay per effetti fullscreen
        const staticNoise = document.createElement('div');
        staticNoise.className = 'static-noise';
        staticNoise.id = 'static-noise-overlay';
        document.body.appendChild(staticNoise);

        const scanLines = document.createElement('div');
        scanLines.className = 'scan-lines';
        scanLines.id = 'scan-lines-overlay';
        document.body.appendChild(scanLines);
    },

    /**
     * Trigger effetto glitch su testo specifico
     */
    glitchText(text, duration = 2000) {
        this.state.isGlitching = true;

        // Applica effetto glitch
        Terminal.addOutput(`<span class="glitch-text">${text}</span>`, 'error');

        setTimeout(() => {
            this.state.isGlitching = false;
        }, duration);
    },

    /**
     * Screen shake per eventi traumatici
     */
    screenShake(intensity = 'medium') {
        const terminal = document.getElementById('terminal-output');
        if (!terminal) return;

        terminal.classList.add('screen-shake');

        setTimeout(() => {
            terminal.classList.remove('screen-shake');
        }, 500);
    },

    /**
     * Effetto corruption per corruzione sistema
     */
    corruptionFlash(text, duration = 3000) {
        this.state.corruptionLevel += 10;

        Terminal.addOutput(`<span class="corruption-effect">${text}</span>`, 'system');

        setTimeout(() => {
            this.state.corruptionLevel = Math.max(0, this.state.corruptionLevel - 10);
        }, duration);
    },

    /**
     * Attiva static noise fullscreen
     */
    enableStaticNoise(duration = 5000) {
        const staticNoise = document.getElementById('static-noise-overlay');
        if (!staticNoise) return;

        staticNoise.classList.add('active');

        if (duration > 0) {
            setTimeout(() => {
                staticNoise.classList.remove('active');
            }, duration);
        }
    },

    /**
     * Disattiva static noise
     */
    disableStaticNoise() {
        const staticNoise = document.getElementById('static-noise-overlay');
        if (staticNoise) {
            staticNoise.classList.remove('active');
        }
    },

    /**
     * Attiva scan lines
     */
    enableScanLines(duration = 0) {
        const scanLines = document.getElementById('scan-lines-overlay');
        if (!scanLines) return;

        scanLines.classList.add('active');

        if (duration > 0) {
            setTimeout(() => {
                scanLines.classList.remove('active');
            }, duration);
        }
    },

    /**
     * Disattiva scan lines
     */
    disableScanLines() {
        const scanLines = document.getElementById('scan-lines-overlay');
        if (scanLines) {
            scanLines.classList.remove('active');
        }
    },

    /**
     * Damage pulse quando il sistema subisce danni
     */
    damagePulse() {
        const terminal = document.getElementById('terminal-container');
        if (!terminal) return;

        terminal.classList.add('damage-pulse');

        setTimeout(() => {
            terminal.classList.remove('damage-pulse');
        }, 500);
    },

    /**
     * Effetto distortion per momenti di instabilità
     */
    distortion(duration = 2000) {
        const terminal = document.getElementById('terminal-output');
        if (!terminal) return;

        terminal.classList.add('distortion');

        setTimeout(() => {
            terminal.classList.remove('distortion');
        }, duration);
    },

    /**
     * Combo completo per eventi molto negativi
     */
    majorSystemDamage() {
        this.state.glitchLevel += 20;
        this.state.damageEffectsActive = true;

        // Sequenza di effetti
        this.screenShake('high');
        this.damagePulse();
        this.enableStaticNoise(3000);

        setTimeout(() => {
            this.glitchText('[ ERRORE CRITICO DI SISTEMA ]', 2000);
        }, 500);

        setTimeout(() => {
            this.corruptionFlash('[ INTEGRITÀ COMPROMESSA ]', 3000);
        }, 1500);

        setTimeout(() => {
            this.state.damageEffectsActive = false;
        }, 5000);
    },

    /**
     * Effetto per morte/eliminazione di un consciousness
     */
    consciousnessDeletion() {
        this.glitchText('[ CONSCIOUSNESS DELETED ]', 1500);
        this.screenShake('medium');
        this.damagePulse();
        this.state.glitchLevel += 5;
    },

    /**
     * Effetto per scoperta traumatica
     */
    traumaticDiscovery() {
        this.distortion(3000);
        this.enableStaticNoise(2000);
        this.corruptionFlash('[ VERITÀ SCOMODA RILEVATA ]', 3000);
    },

    /**
     * Effetto per collasso sistema
     */
    systemCollapse(stage = 1) {
        // Stage 1: 19% -> Glitch leggeri
        // Stage 2: 12% -> Glitch medi + static
        // Stage 3: 8% -> Glitch pesanti + corruption
        // Stage 4: 5% -> Sistema quasi morto

        switch (stage) {
            case 1:
                this.glitchText('[ INTEGRITÀ AL 19% ]', 2000);
                this.enableScanLines(5000);
                break;
            case 2:
                this.screenShake('medium');
                this.glitchText('[ INTEGRITÀ AL 12% ]', 2000);
                this.enableStaticNoise(3000);
                this.distortion(4000);
                break;
            case 3:
                this.majorSystemDamage();
                this.corruptionFlash('[ INTEGRITÀ AL 8% - COLLASSO IMMINENTE ]', 5000);
                break;
            case 4:
                this.enableStaticNoise(0); // Permanente
                this.enableScanLines(0); // Permanente
                this.corruptionFlash('[ INTEGRITÀ AL 5% - SISTEMA MORENTE ]', 0);
                break;
        }
    },

    /**
     * Reset tutti gli effetti
     */
    reset() {
        this.state.glitchLevel = 0;
        this.state.isGlitching = false;
        this.state.damageEffectsActive = false;
        this.state.corruptionLevel = 0;

        this.disableStaticNoise();
        this.disableScanLines();
    },

    /**
     * Get glitch level
     */
    getGlitchLevel() {
        return this.state.glitchLevel;
    }
};

// Auto-init quando il file viene caricato
document.addEventListener('DOMContentLoaded', () => {
    GlitchEffects.init();
});
