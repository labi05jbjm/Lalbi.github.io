/**
 * DESKTOP MANAGER
 * Window management system with draggable, resizable windows
 * Handles focus, z-index, minimize, maximize, close
 */

const DesktopManager = {
    windows: [],
    nextZIndex: 1000,
    activeWindow: null,
    apps: {},

    init() {
        console.log('[DESKTOP] Initializing Desktop Manager');

        // Create desktop container
        this.createDesktopContainer();

        // Register available apps
        this.registerApps();

        // Initialize taskbar
        if (typeof Taskbar !== 'undefined') {
            Taskbar.init();
        }

        // Global ESC key handler for pause menu
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !MainMenu.menuActive) {
                this.showPauseMenu();
            }
        });

        console.log('[DESKTOP] Desktop ready');
    },

    createDesktopContainer() {
        let desktop = document.getElementById('desktop-container');
        if (!desktop) {
            desktop = document.createElement('div');
            desktop.id = 'desktop-container';
            document.body.appendChild(desktop);
        }
    },

    registerApps() {
        // Register all available desktop apps
        this.apps = {
            terminal: {
                name: 'Terminal',
                icon: '⌨',
                component: 'Terminal',
                singleton: true
            },
            fileExplorer: {
                name: 'File Explorer',
                icon: '📁',
                component: 'FileExplorer',
                singleton: false
            },
            emailClient: {
                name: 'Email',
                icon: '✉',
                component: 'EmailClient',
                singleton: true
            },
            notesApp: {
                name: 'Notes',
                icon: '📝',
                component: 'NotesApp',
                singleton: true
            }
        };
    },

    createWindow(appId, options = {}) {
        const app = this.apps[appId];
        if (!app) {
            console.error(`[DESKTOP] Unknown app: ${appId}`);
            return null;
        }

        // Check if singleton and already exists
        if (app.singleton) {
            const existing = this.windows.find(w => w.appId === appId);
            if (existing) {
                this.focusWindow(existing.id);
                return existing;
            }
        }

        const windowId = `window-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        const defaultOptions = {
            title: app.name,
            icon: app.icon,
            width: 800,
            height: 600,
            x: 100 + (this.windows.length * 30),
            y: 50 + (this.windows.length * 30),
            minimized: false,
            maximized: false,
            resizable: true,
            draggable: true
        };

        const finalOptions = { ...defaultOptions, ...options };

        const windowEl = this.createWindowElement(windowId, appId, finalOptions);

        const windowObj = {
            id: windowId,
            appId: appId,
            element: windowEl,
            options: finalOptions,
            zIndex: this.nextZIndex++
        };

        this.windows.push(windowObj);

        // Mount app component
        this.mountApp(windowId, appId, finalOptions);

        // Focus new window
        this.focusWindow(windowId);

        // Update taskbar
        if (typeof Taskbar !== 'undefined') {
            Taskbar.updateWindows(this.windows);
        }

        return windowObj;
    },

    createWindowElement(windowId, appId, options) {
        const desktop = document.getElementById('desktop-container');

        const windowEl = document.createElement('div');
        windowEl.id = windowId;
        windowEl.className = 'desktop-window';
        windowEl.style.cssText = `
            left: ${options.x}px;
            top: ${options.y}px;
            width: ${options.width}px;
            height: ${options.height}px;
        `;

        // Window header
        const header = document.createElement('div');
        header.className = 'window-header';
        header.innerHTML = `
            <div class="window-title">
                <span class="window-icon">${options.icon}</span>
                <span class="window-title-text">${options.title}</span>
            </div>
            <div class="window-controls">
                <button class="window-btn minimize-btn" title="Minimize">−</button>
                <button class="window-btn maximize-btn" title="Maximize">□</button>
                <button class="window-btn close-btn" title="Close">×</button>
            </div>
        `;

        // Window content
        const content = document.createElement('div');
        content.className = 'window-content';
        content.id = `${windowId}-content`;

        windowEl.appendChild(header);
        windowEl.appendChild(content);
        desktop.appendChild(windowEl);

        // Make draggable
        if (options.draggable) {
            this.makeDraggable(windowEl, header);
        }

        // Make resizable
        if (options.resizable) {
            this.makeResizable(windowEl);
        }

        // Window controls
        header.querySelector('.minimize-btn').addEventListener('click', () => {
            this.minimizeWindow(windowId);
        });

        header.querySelector('.maximize-btn').addEventListener('click', () => {
            this.toggleMaximize(windowId);
        });

        header.querySelector('.close-btn').addEventListener('click', () => {
            this.closeWindow(windowId);
        });

        // Focus on click
        windowEl.addEventListener('mousedown', () => {
            this.focusWindow(windowId);
        });

        return windowEl;
    },

    makeDraggable(windowEl, handle) {
        let isDragging = false;
        let currentX, currentY, initialX, initialY;

        handle.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('window-btn')) return;

            isDragging = true;
            initialX = e.clientX - windowEl.offsetLeft;
            initialY = e.clientY - windowEl.offsetTop;

            windowEl.classList.add('dragging');
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;

            // Keep within bounds
            const maxX = window.innerWidth - windowEl.offsetWidth;
            const maxY = window.innerHeight - windowEl.offsetHeight;

            currentX = Math.max(0, Math.min(currentX, maxX));
            currentY = Math.max(0, Math.min(currentY, maxY));

            windowEl.style.left = currentX + 'px';
            windowEl.style.top = currentY + 'px';
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                windowEl.classList.remove('dragging');
            }
        });
    },

    makeResizable(windowEl) {
        const resizer = document.createElement('div');
        resizer.className = 'window-resizer';
        windowEl.appendChild(resizer);

        let isResizing = false;
        let startX, startY, startWidth, startHeight;

        resizer.addEventListener('mousedown', (e) => {
            isResizing = true;
            startX = e.clientX;
            startY = e.clientY;
            startWidth = parseInt(windowEl.style.width);
            startHeight = parseInt(windowEl.style.height);

            e.preventDefault();
        });

        document.addEventListener('mousemove', (e) => {
            if (!isResizing) return;

            const width = startWidth + (e.clientX - startX);
            const height = startHeight + (e.clientY - startY);

            windowEl.style.width = Math.max(400, width) + 'px';
            windowEl.style.height = Math.max(300, height) + 'px';
        });

        document.addEventListener('mouseup', () => {
            isResizing = false;
        });
    },

    mountApp(windowId, appId, options) {
        const contentEl = document.getElementById(`${windowId}-content`);

        switch (appId) {
            case 'terminal':
                // Terminal is already in the page, just move it
                const terminalContainer = document.getElementById('terminal-container');
                if (terminalContainer) {
                    contentEl.appendChild(terminalContainer);
                }
                break;

            case 'fileExplorer':
                if (typeof FileExplorer !== 'undefined') {
                    FileExplorer.mount(contentEl, options);
                }
                break;

            case 'emailClient':
                if (typeof EmailClient !== 'undefined') {
                    EmailClient.mount(contentEl, options);
                }
                break;

            case 'notesApp':
                if (typeof NotesApp !== 'undefined') {
                    NotesApp.mount(contentEl, options);
                }
                break;
        }
    },

    focusWindow(windowId) {
        const window = this.windows.find(w => w.id === windowId);
        if (!window) return;

        // Update z-index
        window.zIndex = this.nextZIndex++;
        window.element.style.zIndex = window.zIndex;

        // Remove active class from all windows
        this.windows.forEach(w => {
            w.element.classList.remove('active');
        });

        // Add active class to focused window
        window.element.classList.add('active');
        this.activeWindow = window;

        // Update taskbar
        if (typeof Taskbar !== 'undefined') {
            Taskbar.setActiveWindow(windowId);
        }
    },

    minimizeWindow(windowId) {
        const window = this.windows.find(w => w.id === windowId);
        if (!window) return;

        window.element.classList.add('minimized');
        window.options.minimized = true;

        // Update taskbar
        if (typeof Taskbar !== 'undefined') {
            Taskbar.updateWindows(this.windows);
        }
    },

    restoreWindow(windowId) {
        const window = this.windows.find(w => w.id === windowId);
        if (!window) return;

        window.element.classList.remove('minimized');
        window.options.minimized = false;

        this.focusWindow(windowId);
    },

    toggleMaximize(windowId) {
        const window = this.windows.find(w => w.id === windowId);
        if (!window) return;

        if (window.options.maximized) {
            // Restore
            window.element.classList.remove('maximized');
            window.element.style.width = window.options.width + 'px';
            window.element.style.height = window.options.height + 'px';
            window.element.style.left = window.options.x + 'px';
            window.element.style.top = window.options.y + 'px';
            window.options.maximized = false;
        } else {
            // Maximize
            // Save current position and size
            window.options.x = parseInt(window.element.style.left);
            window.options.y = parseInt(window.element.style.top);
            window.options.width = parseInt(window.element.style.width);
            window.options.height = parseInt(window.element.style.height);

            window.element.classList.add('maximized');
            window.options.maximized = true;
        }
    },

    closeWindow(windowId) {
        const windowIndex = this.windows.findIndex(w => w.id === windowId);
        if (windowIndex === -1) return;

        const window = this.windows[windowIndex];

        // Cleanup app-specific resources
        this.unmountApp(window.appId, windowId);

        // Remove element
        window.element.remove();

        // Remove from array
        this.windows.splice(windowIndex, 1);

        // Update taskbar
        if (typeof Taskbar !== 'undefined') {
            Taskbar.updateWindows(this.windows);
        }

        // Focus another window if available
        if (this.windows.length > 0) {
            this.focusWindow(this.windows[this.windows.length - 1].id);
        }
    },

    unmountApp(appId, windowId) {
        // App-specific cleanup
        switch (appId) {
            case 'fileExplorer':
                if (typeof FileExplorer !== 'undefined') {
                    FileExplorer.unmount(windowId);
                }
                break;
            case 'emailClient':
                if (typeof EmailClient !== 'undefined') {
                    EmailClient.unmount(windowId);
                }
                break;
            case 'notesApp':
                if (typeof NotesApp !== 'undefined') {
                    NotesApp.unmount(windowId);
                }
                break;
        }
    },

    showPauseMenu() {
        // Create pause overlay
        const overlay = document.createElement('div');
        overlay.id = 'pause-menu-overlay';
        overlay.className = 'pause-overlay';

        const menu = document.createElement('div');
        menu.className = 'pause-menu';
        menu.innerHTML = `
            <h2 class="pause-title">⏸ PAUSED</h2>
            <div class="pause-buttons">
                <button class="pause-btn resume-btn">Resume</button>
                <button class="pause-btn options-btn">Options</button>
                <button class="pause-btn menu-btn">Main Menu</button>
            </div>
        `;

        overlay.appendChild(menu);
        document.body.appendChild(overlay);

        // Button handlers
        menu.querySelector('.resume-btn').addEventListener('click', () => {
            overlay.remove();
        });

        menu.querySelector('.options-btn').addEventListener('click', () => {
            overlay.remove();
            if (typeof MainMenu !== 'undefined') {
                MainMenu.showOptions();
            }
        });

        menu.querySelector('.menu-btn').addEventListener('click', () => {
            overlay.remove();
            if (typeof MainMenu !== 'undefined') {
                MainMenu.show();
            }
        });

        // ESC to close
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                overlay.remove();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    },

    // Meta/glitch effects (Pony Island style)
    glitchWindow(windowId, duration = 1000) {
        const window = this.windows.find(w => w.id === windowId);
        if (!window) return;

        window.element.classList.add('glitch-effect');

        // Random position jumps
        const originalX = parseInt(window.element.style.left);
        const originalY = parseInt(window.element.style.top);

        const glitchInterval = setInterval(() => {
            const offsetX = (Math.random() - 0.5) * 20;
            const offsetY = (Math.random() - 0.5) * 20;
            window.element.style.left = (originalX + offsetX) + 'px';
            window.element.style.top = (originalY + offsetY) + 'px';
        }, 50);

        setTimeout(() => {
            clearInterval(glitchInterval);
            window.element.classList.remove('glitch-effect');
            window.element.style.left = originalX + 'px';
            window.element.style.top = originalY + 'px';
        }, duration);
    },

    forceCloseWindow(windowId) {
        // Close window with animation (ECHO forces close)
        const window = this.windows.find(w => w.id === windowId);
        if (!window) return;

        window.element.style.animation = 'window-force-close 0.5s ease';

        setTimeout(() => {
            this.closeWindow(windowId);
        }, 500);
    }
};
