/**
 * FILE EXPLORER
 * GUI file browser for navigating the game's file system
 */

const FileExplorer = {
    instances: {},

    mount(containerEl, options = {}) {
        const instanceId = `explorer-${Date.now()}`;

        const instance = {
            id: instanceId,
            container: containerEl,
            currentPath: options.startPath || '/home/guest',
            history: [],
            historyIndex: -1
        };

        this.instances[instanceId] = instance;

        this.render(instanceId);

        return instanceId;
    },

    unmount(windowId) {
        // Clean up instance
        const instanceId = Object.keys(this.instances).find(id =>
            this.instances[id].container.closest('.desktop-window')?.id === windowId
        );

        if (instanceId) {
            delete this.instances[instanceId];
        }
    },

    render(instanceId) {
        const instance = this.instances[instanceId];
        if (!instance) return;

        instance.container.innerHTML = '';
        instance.container.className = 'file-explorer-container';

        // Toolbar
        const toolbar = this.createToolbar(instanceId);
        instance.container.appendChild(toolbar);

        // Address bar
        const addressBar = this.createAddressBar(instanceId);
        instance.container.appendChild(addressBar);

        // Content area
        const content = this.createContentArea(instanceId);
        instance.container.appendChild(content);

        // Status bar
        const statusBar = this.createStatusBar(instanceId);
        instance.container.appendChild(statusBar);
    },

    createToolbar(instanceId) {
        const instance = this.instances[instanceId];

        const toolbar = document.createElement('div');
        toolbar.className = 'explorer-toolbar';
        toolbar.innerHTML = `
            <button class="toolbar-btn back-btn" title="Back" ${instance.historyIndex <= 0 ? 'disabled' : ''}>◀</button>
            <button class="toolbar-btn forward-btn" title="Forward" ${instance.historyIndex >= instance.history.length - 1 ? 'disabled' : ''}>▶</button>
            <button class="toolbar-btn up-btn" title="Up">⬆</button>
            <button class="toolbar-btn refresh-btn" title="Refresh">↻</button>
            <div class="toolbar-spacer"></div>
            <button class="toolbar-btn view-list-btn active" title="List View">☰</button>
            <button class="toolbar-btn view-grid-btn" title="Grid View">⊞</button>
        `;

        // Event listeners
        toolbar.querySelector('.back-btn').addEventListener('click', () => this.navigateBack(instanceId));
        toolbar.querySelector('.forward-btn').addEventListener('click', () => this.navigateForward(instanceId));
        toolbar.querySelector('.up-btn').addEventListener('click', () => this.navigateUp(instanceId));
        toolbar.querySelector('.refresh-btn').addEventListener('click', () => this.refresh(instanceId));

        return toolbar;
    },

    createAddressBar(instanceId) {
        const instance = this.instances[instanceId];

        const addressBar = document.createElement('div');
        addressBar.className = 'explorer-address-bar';

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'address-input';
        input.value = instance.currentPath;
        input.spellcheck = false;

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.navigateTo(instanceId, input.value);
            }
        });

        addressBar.appendChild(input);
        return addressBar;
    },

    createContentArea(instanceId) {
        const instance = this.instances[instanceId];

        const contentArea = document.createElement('div');
        contentArea.className = 'explorer-content';

        // Get directory contents
        const contents = this.getDirectoryContents(instance.currentPath);

        if (!contents) {
            contentArea.innerHTML = '<div class="explorer-error">⚠ Directory not found</div>';
            return contentArea;
        }

        // Render files and folders
        contents.forEach(item => {
            const itemEl = this.createFileItem(instanceId, item);
            contentArea.appendChild(itemEl);
        });

        if (contents.length === 0) {
            contentArea.innerHTML = '<div class="explorer-empty">Empty directory</div>';
        }

        return contentArea;
    },

    createFileItem(instanceId, item) {
        const instance = this.instances[instanceId];

        const itemEl = document.createElement('div');
        itemEl.className = 'explorer-item';

        if (item.type === 'directory') {
            itemEl.classList.add('directory');
            itemEl.innerHTML = `
                <div class="item-icon">📁</div>
                <div class="item-name">${item.name}</div>
            `;

            itemEl.addEventListener('dblclick', () => {
                const newPath = `${instance.currentPath}/${item.name}`.replace('//', '/');
                this.navigateTo(instanceId, newPath);
            });
        } else {
            itemEl.classList.add('file');
            itemEl.innerHTML = `
                <div class="item-icon">${this.getFileIcon(item.name)}</div>
                <div class="item-name">${item.name}</div>
            `;

            itemEl.addEventListener('dblclick', () => {
                this.openFile(instanceId, item.name);
            });
        }

        // Context menu
        itemEl.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            this.showContextMenu(instanceId, item, e.clientX, e.clientY);
        });

        return itemEl;
    },

    createStatusBar(instanceId) {
        const instance = this.instances[instanceId];

        const statusBar = document.createElement('div');
        statusBar.className = 'explorer-status-bar';

        const contents = this.getDirectoryContents(instance.currentPath);
        const fileCount = contents ? contents.filter(i => i.type === 'file').length : 0;
        const folderCount = contents ? contents.filter(i => i.type === 'directory').length : 0;

        statusBar.textContent = `${folderCount} folder(s), ${fileCount} file(s)`;

        return statusBar;
    },

    getDirectoryContents(path) {
        // Use FileSystemHelpers from the game
        if (typeof FileSystemHelpers === 'undefined') return null;

        const contents = FileSystemHelpers.listDirectory(path);
        if (!contents) return null;

        return contents.map(name => {
            const fullPath = `${path}/${name}`.replace('//', '/');
            const item = FileSystem[fullPath];

            return {
                name,
                type: item && item.type === 'directory' ? 'directory' : 'file',
                fullPath
            };
        });
    },

    getFileIcon(filename) {
        const ext = filename.split('.').pop().toLowerCase();

        const icons = {
            'txt': '📄',
            'log': '📋',
            'md': '📝',
            'pdf': '📕',
            'img': '🖼',
            'png': '🖼',
            'jpg': '🖼',
            'exe': '⚙',
            'dat': '💾',
            'db': '🗄',
            'zip': '📦'
        };

        return icons[ext] || '📄';
    },

    navigateTo(instanceId, path) {
        const instance = this.instances[instanceId];
        if (!instance) return;

        // Check if path exists
        const contents = this.getDirectoryContents(path);
        if (!contents) {
            console.error('[FILE EXPLORER] Invalid path:', path);
            return;
        }

        // Add to history
        instance.history = instance.history.slice(0, instance.historyIndex + 1);
        instance.history.push(path);
        instance.historyIndex = instance.history.length - 1;

        instance.currentPath = path;
        this.render(instanceId);
    },

    navigateBack(instanceId) {
        const instance = this.instances[instanceId];
        if (!instance || instance.historyIndex <= 0) return;

        instance.historyIndex--;
        instance.currentPath = instance.history[instance.historyIndex];
        this.render(instanceId);
    },

    navigateForward(instanceId) {
        const instance = this.instances[instanceId];
        if (!instance || instance.historyIndex >= instance.history.length - 1) return;

        instance.historyIndex++;
        instance.currentPath = instance.history[instance.historyIndex];
        this.render(instanceId);
    },

    navigateUp(instanceId) {
        const instance = this.instances[instanceId];
        if (!instance || instance.currentPath === '/') return;

        const parts = instance.currentPath.split('/').filter(p => p);
        parts.pop();
        const newPath = '/' + parts.join('/');

        this.navigateTo(instanceId, newPath || '/');
    },

    refresh(instanceId) {
        this.render(instanceId);
    },

    openFile(instanceId, filename) {
        const instance = this.instances[instanceId];
        const fullPath = `${instance.currentPath}/${filename}`.replace('//', '/');

        // Read file using FileSystemHelpers
        if (typeof FileSystemHelpers === 'undefined') return;

        const content = FileSystemHelpers.readFile(fullPath);

        if (content === null) {
            alert('File not found');
            return;
        }

        if (content === '[CRIPTATO - ACCESSO NEGATO]' || content === '[ENCRYPTED - ACCESS DENIED]') {
            alert('Access denied - file is encrypted');
            return;
        }

        // Open in Notes app
        if (typeof DesktopManager !== 'undefined') {
            DesktopManager.createWindow('notesApp', {
                title: `Notes - ${filename}`,
                data: {
                    content,
                    filename,
                    fullPath,
                    readOnly: true
                }
            });
        }
    },

    showContextMenu(instanceId, item, x, y) {
        // Remove existing context menus
        document.querySelectorAll('.explorer-context-menu').forEach(m => m.remove());

        const menu = document.createElement('div');
        menu.className = 'explorer-context-menu';
        menu.style.left = x + 'px';
        menu.style.top = y + 'px';

        const options = item.type === 'directory'
            ? ['Open', 'Copy Path']
            : ['Open', 'Copy Path', 'View in Terminal'];

        options.forEach(opt => {
            const option = document.createElement('div');
            option.className = 'context-menu-item';
            option.textContent = opt;

            option.addEventListener('click', () => {
                this.handleContextAction(instanceId, item, opt);
                menu.remove();
            });

            menu.appendChild(option);
        });

        document.body.appendChild(menu);

        // Close on click outside
        setTimeout(() => {
            const closeHandler = (e) => {
                if (!menu.contains(e.target)) {
                    menu.remove();
                    document.removeEventListener('click', closeHandler);
                }
            };
            document.addEventListener('click', closeHandler);
        }, 10);
    },

    handleContextAction(instanceId, item, action) {
        const instance = this.instances[instanceId];

        switch (action) {
            case 'Open':
                if (item.type === 'directory') {
                    this.navigateTo(instanceId, item.fullPath);
                } else {
                    this.openFile(instanceId, item.name);
                }
                break;

            case 'Copy Path':
                // Copy to clipboard (if available)
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(item.fullPath);
                }
                break;

            case 'View in Terminal':
                // Open terminal and run cat command
                if (typeof Terminal !== 'undefined') {
                    Terminal.executeCommand(`cat ${item.fullPath}`);
                }
                break;
        }
    }
};
