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
        if (this.trailDelay < 3) return; // Create trail every 3 frames
        this.trailDelay = 0;

        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = x + 'px';
        trail.style.top = y + 'px';

        document.body.appendChild(trail);

        // Remove trail after animation
        setTimeout(() => {
            trail.remove();
        }, 600);
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
