/**
 * SCI-FI CURSOR SYSTEM
 * Custom cursor with trail effect
 */

const CursorManager = {
    cursor: null,
    lastX: 0,
    lastY: 0,
    trailDelay: 0,

    init() {
        // Create custom cursor element
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        document.body.appendChild(this.cursor);

        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            this.updateCursor(e.clientX, e.clientY);
            this.createTrail(e.clientX, e.clientY);
        });

        // Track mouse clicks
        document.addEventListener('mousedown', () => {
            this.cursor.classList.add('clicking');
        });

        document.addEventListener('mouseup', () => {
            this.cursor.classList.remove('clicking');
        });

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            this.cursor.style.opacity = '0';
        });

        document.addEventListener('mouseenter', () => {
            this.cursor.style.opacity = '1';
        });

        console.log('[CURSOR] Sci-fi cursor initialized');
    },

    updateCursor(x, y) {
        this.cursor.style.left = x + 'px';
        this.cursor.style.top = y + 'px';

        this.lastX = x;
        this.lastY = y;
    },

    createTrail(x, y) {
        // Throttle trail creation
        this.trailDelay++;
        if (this.trailDelay < 2) return; // Create trail every 2 frames for more density
        this.trailDelay = 0;

        const trail = document.createElement('div');

        // Randomly apply glitch variant (70% chance of glitch)
        const glitchVariants = ['glitch-1', 'glitch-2', 'glitch-3', 'glitch-4'];
        const useGlitch = Math.random() > 0.3;
        const glitchClass = useGlitch ? glitchVariants[Math.floor(Math.random() * glitchVariants.length)] : '';

        trail.className = `cursor-trail ${glitchClass}`;
        trail.style.left = x + 'px';
        trail.style.top = y + 'px';

        // Random offset for more chaotic glitch effect
        if (useGlitch) {
            const offsetX = (Math.random() - 0.5) * 6;
            const offsetY = (Math.random() - 0.5) * 6;
            trail.style.left = (x + offsetX) + 'px';
            trail.style.top = (y + offsetY) + 'px';
        }

        document.body.appendChild(trail);

        // Remove trail after animation
        setTimeout(() => {
            trail.remove();
        }, 500);
    }
};

// Initialize on DOM load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        CursorManager.init();
    });
} else {
    CursorManager.init();
}
