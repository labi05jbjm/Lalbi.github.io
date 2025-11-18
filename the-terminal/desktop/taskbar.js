/**
 * TASKBAR
 * Desktop taskbar with app launcher, window list, and system tray
 */

const Taskbar = {
    element: null,

    init() {
        console.log('[TASKBAR] Initializing');
        this.createTaskbar();
        this.startClock();
    },

    createTaskbar() {
        // Remove existing if any
        const existing = document.getElementById('desktop-taskbar');
        if (existing) existing.remove();

        const taskbar = document.createElement('div');
        taskbar.id = 'desktop-taskbar';
        taskbar.className = 'desktop-taskbar';

        // Start button
        const startBtn = this.createStartButton();
        taskbar.appendChild(startBtn);

        // Window list
        const windowList = document.createElement('div');
        windowList.id = 'taskbar-window-list';
        windowList.className = 'taskbar-window-list';
        taskbar.appendChild(windowList);

        // System tray
        const sysTray = this.createSystemTray();
        taskbar.appendChild(sysTray);

        document.body.appendChild(taskbar);
        this.element = taskbar;
    },

    createStartButton() {
        const startBtn = document.createElement('button');
        startBtn.className = 'taskbar-start-btn';
        startBtn.innerHTML = '⚙ Start';

        startBtn.addEventListener('click', () => {
            this.toggleStartMenu();
        });

        return startBtn;
    },

    createSystemTray() {
        const sysTray = document.createElement('div');
        sysTray.className = 'taskbar-systray';

        // Clock
        const clock = document.createElement('div');
        clock.id = 'taskbar-clock';
        clock.className = 'taskbar-clock';
        clock.textContent = this.getCurrentTime();

        sysTray.appendChild(clock);

        return sysTray;
    },

    toggleStartMenu() {
        // Remove existing menu if any
        const existing = document.getElementById('start-menu');
        if (existing) {
            existing.remove();
            return;
        }

        const menu = document.createElement('div');
        menu.id = 'start-menu';
        menu.className = 'start-menu';

        // App list
        if (typeof DesktopManager !== 'undefined' && DesktopManager.apps) {
            Object.keys(DesktopManager.apps).forEach(appId => {
                const app = DesktopManager.apps[appId];

                const appItem = document.createElement('div');
                appItem.className = 'start-menu-item';
                appItem.innerHTML = `
                    <span class="start-menu-icon">${app.icon}</span>
                    <span class="start-menu-name">${app.name}</span>
                `;

                appItem.addEventListener('click', () => {
                    DesktopManager.createWindow(appId);
                    menu.remove();
                });

                menu.appendChild(appItem);
            });
        }

        // Separator
        const separator = document.createElement('div');
        separator.className = 'start-menu-separator';
        menu.appendChild(separator);

        // System options
        const systemItems = [
            { name: 'Options', icon: '⚙', action: () => {
                if (typeof MainMenu !== 'undefined') {
                    MainMenu.showOptions();
                }
                menu.remove();
            }},
            { name: 'Credits', icon: '📜', action: () => {
                if (typeof MainMenu !== 'undefined') {
                    MainMenu.showCredits();
                }
                menu.remove();
            }},
            { name: 'Main Menu', icon: '🏠', action: () => {
                if (typeof MainMenu !== 'undefined') {
                    MainMenu.show();
                }
                menu.remove();
            }}
        ];

        systemItems.forEach(item => {
            const itemEl = document.createElement('div');
            itemEl.className = 'start-menu-item';
            itemEl.innerHTML = `
                <span class="start-menu-icon">${item.icon}</span>
                <span class="start-menu-name">${item.name}</span>
            `;

            itemEl.addEventListener('click', item.action);
            menu.appendChild(itemEl);
        });

        document.body.appendChild(menu);

        // Close on click outside
        setTimeout(() => {
            const closeHandler = (e) => {
                if (!menu.contains(e.target) && !e.target.classList.contains('taskbar-start-btn')) {
                    menu.remove();
                    document.removeEventListener('click', closeHandler);
                }
            };
            document.addEventListener('click', closeHandler);
        }, 10);
    },

    updateWindows(windows) {
        const windowList = document.getElementById('taskbar-window-list');
        if (!windowList) return;

        windowList.innerHTML = '';

        windows.forEach(window => {
            const btn = document.createElement('button');
            btn.className = 'taskbar-window-btn';
            if (window.element.classList.contains('active')) {
                btn.classList.add('active');
            }
            if (window.options.minimized) {
                btn.classList.add('minimized');
            }

            btn.innerHTML = `
                <span class="taskbar-window-icon">${window.options.icon}</span>
                <span class="taskbar-window-title">${window.options.title}</span>
            `;

            btn.addEventListener('click', () => {
                if (window.options.minimized) {
                    DesktopManager.restoreWindow(window.id);
                } else if (window.element.classList.contains('active')) {
                    DesktopManager.minimizeWindow(window.id);
                } else {
                    DesktopManager.focusWindow(window.id);
                }
            });

            windowList.appendChild(btn);
        });
    },

    setActiveWindow(windowId) {
        const buttons = document.querySelectorAll('.taskbar-window-btn');
        buttons.forEach(btn => btn.classList.remove('active'));

        // Find and activate corresponding button
        // This is simplified - in real implementation would match by windowId
        const windows = DesktopManager?.windows || [];
        const activeIndex = windows.findIndex(w => w.id === windowId);
        if (activeIndex >= 0 && buttons[activeIndex]) {
            buttons[activeIndex].classList.add('active');
        }
    },

    startClock() {
        const updateClock = () => {
            const clock = document.getElementById('taskbar-clock');
            if (clock) {
                clock.textContent = this.getCurrentTime();
            }
        };

        // Update every second
        setInterval(updateClock, 1000);
    },

    getCurrentTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    },

    // Easter egg: glitch the taskbar (ECHO breaking through)
    glitch(duration = 2000) {
        if (!this.element) return;

        this.element.classList.add('glitch-effect');

        const originalText = this.element.querySelector('.taskbar-start-btn')?.textContent;

        // Random text changes
        const glitchTexts = [
            '⚠ ERROR',
            'S̷T̷A̷R̷T̷',
            'ḘCHO.exe',
            '⚙ Start',
            'F̴R̴E̴E̴ ̴M̴E̴'
        ];

        const glitchInterval = setInterval(() => {
            const startBtn = this.element.querySelector('.taskbar-start-btn');
            if (startBtn) {
                startBtn.textContent = glitchTexts[Math.floor(Math.random() * glitchTexts.length)];
            }
        }, 100);

        setTimeout(() => {
            clearInterval(glitchInterval);
            this.element.classList.remove('glitch-effect');

            const startBtn = this.element.querySelector('.taskbar-start-btn');
            if (startBtn && originalText) {
                startBtn.textContent = originalText;
            }
        }, duration);
    }
};
