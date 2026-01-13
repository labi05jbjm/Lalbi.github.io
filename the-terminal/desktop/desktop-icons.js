/**
 * DESKTOP ICONS SYSTEM
 * Visual file/folder icons on desktop background
 * Mimics real OS desktop with draggable icons
 */

const DesktopIcons = {
    icons: [],
    gridSize: 100,
    selectedIcon: null,

    init() {
        console.log('[DESKTOP ICONS] Initializing icon system');
        this.createIconContainer();
        this.loadSystemIcons();
        this.setupEventListeners();
    },

    createIconContainer() {
        const desktop = document.getElementById('desktop-container');
        if (!desktop) return;

        // Create icons layer (below windows)
        let iconsLayer = document.getElementById('desktop-icons-layer');
        if (!iconsLayer) {
            iconsLayer = document.createElement('div');
            iconsLayer.id = 'desktop-icons-layer';
            iconsLayer.className = 'desktop-icons-layer';
            desktop.insertBefore(iconsLayer, desktop.firstChild);
        }
    },

    loadSystemIcons() {
        // Default system icons (will be populated dynamically based on unlocked content)
        const systemIcons = [
            {
                id: 'computer',
                name: 'This Computer',
                icon: '🖥️',
                type: 'system',
                x: 20,
                y: 20,
                action: () => this.openComputer()
            },
            {
                id: 'documents',
                name: 'Documents',
                icon: '📁',
                type: 'folder',
                x: 20,
                y: 140,
                action: () => this.openFolder('/documents')
            },
            {
                id: 'synestesis-search',
                name: 'Synestesis Search',
                icon: '🔍',
                type: 'app',
                x: 20,
                y: 260,
                action: () => this.openSynestesisSearch()
            },
            {
                id: 'memory-archive',
                name: 'Memory Archive',
                icon: '💾',
                type: 'folder',
                x: 20,
                y: 380,
                action: () => this.openFolder('/memory_archive')
            },
            {
                id: 'terminal',
                name: 'Terminal',
                icon: '⌨️',
                type: 'app',
                x: 20,
                y: 500,
                action: () => this.returnToTerminal()
            },
            {
                id: 'email',
                name: 'Email Client',
                icon: '✉️',
                type: 'app',
                x: 140,
                y: 20,
                action: () => DesktopManager.createWindow('emailClient')
            },
            {
                id: 'victims-db',
                name: 'Victims Database',
                icon: '👥',
                type: 'data',
                x: 140,
                y: 140,
                locked: true, // Unlocks during gameplay
                action: () => this.openVictimsDatabase()
            },
            {
                id: 'system-logs',
                name: 'System Logs',
                icon: '📋',
                type: 'folder',
                x: 140,
                y: 260,
                action: () => this.openFolder('/logs')
            },
            {
                id: 'consciousness-map',
                name: 'Consciousness Map',
                icon: '🧠',
                type: 'data',
                x: 140,
                y: 380,
                locked: true,
                action: () => this.openConsciousnessMap()
            }
        ];

        systemIcons.forEach(iconData => {
            this.createIcon(iconData);
        });
    },

    createIcon(iconData) {
        const iconsLayer = document.getElementById('desktop-icons-layer');
        if (!iconsLayer) return;

        const iconEl = document.createElement('div');
        iconEl.id = `desktop-icon-${iconData.id}`;
        iconEl.className = 'desktop-icon';
        if (iconData.locked) {
            iconEl.classList.add('locked');
        }

        iconEl.style.left = iconData.x + 'px';
        iconEl.style.top = iconData.y + 'px';

        iconEl.innerHTML = `
            <div class="icon-image">${iconData.icon}</div>
            <div class="icon-label">${iconData.name}</div>
            ${iconData.locked ? '<div class="icon-lock">🔒</div>' : ''}
        `;

        iconEl.dataset.iconId = iconData.id;

        // Double click to open
        iconEl.addEventListener('dblclick', (e) => {
            e.stopPropagation();
            if (!iconData.locked && iconData.action) {
                iconData.action();
            } else if (iconData.locked) {
                Terminal.addOutput('[!] Access denied: Content locked', 'error');
            }
        });

        // Single click to select
        iconEl.addEventListener('click', (e) => {
            e.stopPropagation();
            this.selectIcon(iconData.id);
        });

        // Make draggable
        this.makeIconDraggable(iconEl, iconData);

        iconsLayer.appendChild(iconEl);

        this.icons.push({
            ...iconData,
            element: iconEl
        });
    },

    makeIconDraggable(iconEl, iconData) {
        let isDragging = false;
        let startX, startY;

        iconEl.addEventListener('mousedown', (e) => {
            if (e.detail === 2) return; // Skip on double-click

            isDragging = true;
            startX = e.clientX - parseInt(iconEl.style.left);
            startY = e.clientY - parseInt(iconEl.style.top);

            iconEl.classList.add('dragging');
            e.preventDefault();
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            const newX = e.clientX - startX;
            const newY = e.clientY - startY;

            // Keep within bounds
            const maxX = window.innerWidth - iconEl.offsetWidth;
            const maxY = window.innerHeight - 40 - iconEl.offsetHeight; // 40 for taskbar

            iconEl.style.left = Math.max(0, Math.min(newX, maxX)) + 'px';
            iconEl.style.top = Math.max(0, Math.min(newY, maxY)) + 'px';
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                iconEl.classList.remove('dragging');

                // Update stored position
                iconData.x = parseInt(iconEl.style.left);
                iconData.y = parseInt(iconEl.style.top);
            }
        });
    },

    selectIcon(iconId) {
        // Deselect all
        this.icons.forEach(icon => {
            icon.element.classList.remove('selected');
        });

        // Select clicked icon
        const icon = this.icons.find(i => i.id === iconId);
        if (icon) {
            icon.element.classList.add('selected');
            this.selectedIcon = icon;
        }
    },

    setupEventListeners() {
        // Deselect on desktop click
        document.getElementById('desktop-icons-layer')?.addEventListener('click', (e) => {
            if (e.target.id === 'desktop-icons-layer') {
                this.deselectAll();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            const desktop = document.getElementById('desktop-container');
            if (!desktop || !desktop.classList.contains('active')) return;

            if (e.key === 'Delete' && this.selectedIcon) {
                // Optional: delete custom icons
                e.preventDefault();
            }

            if (e.key === 'Enter' && this.selectedIcon) {
                // Open selected icon
                if (this.selectedIcon.action && !this.selectedIcon.locked) {
                    this.selectedIcon.action();
                }
                e.preventDefault();
            }
        });
    },

    deselectAll() {
        this.icons.forEach(icon => {
            icon.element.classList.remove('selected');
        });
        this.selectedIcon = null;
    },

    unlockIcon(iconId) {
        const icon = this.icons.find(i => i.id === iconId);
        if (!icon) return;

        icon.locked = false;
        icon.element.classList.remove('locked');

        const lockEl = icon.element.querySelector('.icon-lock');
        if (lockEl) {
            lockEl.remove();
        }

        Terminal.addOutput(`[✓] Unlocked: ${icon.name}`, 'success');
    },

    addCustomIcon(iconData) {
        // Add dynamically created icons (e.g., from game events)
        const existingIcon = this.icons.find(i => i.id === iconData.id);
        if (existingIcon) return;

        this.createIcon(iconData);
    },

    removeIcon(iconId) {
        const iconIndex = this.icons.findIndex(i => i.id === iconId);
        if (iconIndex === -1) return;

        const icon = this.icons[iconIndex];
        icon.element.remove();
        this.icons.splice(iconIndex, 1);
    },

    // Icon Actions
    openComputer() {
        DesktopManager.createWindow('fileExplorer', {
            title: 'This Computer',
            path: '/'
        });
    },

    openFolder(path) {
        DesktopManager.createWindow('fileExplorer', {
            title: path.split('/').pop() || 'Documents',
            path: path
        });
    },

    openSynestesisSearch() {
        // Open Synestesis Corporation Free Network search engine
        if (typeof SynestesisSearch !== 'undefined') {
            SynestesisSearch.open();
        } else {
            console.error('[DESKTOP ICONS] SynestesisSearch not loaded');
        }
    },

    returnToTerminal() {
        const desktop = document.getElementById('desktop-container');
        if (desktop) {
            desktop.classList.remove('active');
        }

        const terminal = document.getElementById('terminal-container');
        if (terminal) {
            terminal.style.display = 'flex';
        }

        // Focus terminal input
        const terminalInput = document.getElementById('terminal-input');
        if (terminalInput) {
            terminalInput.focus();
        }
    },

    openVictimsDatabase() {
        if (typeof VictimsDatabase !== 'undefined') {
            // Create special window for victims database
            const windowId = DesktopManager.createWindow('notesApp', {
                title: 'Victims Database - CLASSIFIED',
                icon: '👥',
                width: 900,
                height: 700
            });

            // Load victims data
            setTimeout(() => {
                this.displayVictimsData();
            }, 100);
        }
    },

    openConsciousnessMap() {
        Terminal.addOutput('[CONSCIOUSNESS MAP] Generating neural pathways...', 'system');
        Terminal.addOutput('[!] This feature reveals the structure of all trapped consciousnesses', 'warning');

        // Open consciousness visualization
        DesktopManager.createWindow('notesApp', {
            title: 'Consciousness Map - Neural Network',
            icon: '🧠'
        });
    },

    displayVictimsData() {
        if (typeof VictimsDatabase === 'undefined') return;

        Terminal.addOutput('\n=== VICTIMS DATABASE ===', 'important');
        Terminal.addOutput(`Total Consciousnesses Archived: ${Object.keys(VictimsDatabase.victims || {}).length}`, 'system');
        Terminal.addOutput('Access via command: victims <id>', 'system');
    }
};
