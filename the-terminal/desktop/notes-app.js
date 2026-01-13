/**
 * NOTES APP
 * Simple text viewer for reading files and notes
 * Shows Viktor's journal entries and documents
 */

const NotesApp = {
    instances: {},

    mount(containerEl, options = {}) {
        const instanceId = `notes-${Date.now()}`;

        const instance = {
            id: instanceId,
            container: containerEl,
            content: options.data?.content || '',
            filename: options.data?.filename || 'Untitled',
            fullPath: options.data?.fullPath || '',
            readOnly: options.data?.readOnly !== false
        };

        this.instances[instanceId] = instance;
        this.render(instanceId);

        return instanceId;
    },

    unmount(windowId) {
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
        instance.container.className = 'notes-app-container';

        // Toolbar
        const toolbar = this.createToolbar(instanceId);
        instance.container.appendChild(toolbar);

        // Content area
        const contentArea = this.createContentArea(instanceId);
        instance.container.appendChild(contentArea);

        // Status bar
        const statusBar = this.createStatusBar(instanceId);
        instance.container.appendChild(statusBar);
    },

    createToolbar(instanceId) {
        const instance = this.instances[instanceId];

        const toolbar = document.createElement('div');
        toolbar.className = 'notes-toolbar';

        toolbar.innerHTML = `
            <div class="notes-file-info">
                <span class="notes-filename">📄 ${instance.filename}</span>
                ${instance.fullPath ? `<span class="notes-filepath">${instance.fullPath}</span>` : ''}
            </div>
            <div class="notes-actions">
                ${!instance.readOnly ? '<button class="notes-btn save-btn">💾 Save</button>' : ''}
                <button class="notes-btn copy-btn">📋 Copy</button>
            </div>
        `;

        // Event listeners
        const copyBtn = toolbar.querySelector('.copy-btn');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => this.copyToClipboard(instanceId));
        }

        const saveBtn = toolbar.querySelector('.save-btn');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => this.save(instanceId));
        }

        return toolbar;
    },

    createContentArea(instanceId) {
        const instance = this.instances[instanceId];

        const contentArea = document.createElement('div');
        contentArea.className = 'notes-content-area';

        if (instance.readOnly) {
            // Read-only view
            const pre = document.createElement('pre');
            pre.className = 'notes-content-display';
            pre.textContent = instance.content;
            contentArea.appendChild(pre);
        } else {
            // Editable textarea
            const textarea = document.createElement('textarea');
            textarea.className = 'notes-content-editor';
            textarea.value = instance.content;
            textarea.spellcheck = false;

            textarea.addEventListener('input', (e) => {
                instance.content = e.target.value;
                this.updateStatusBar(instanceId);
            });

            contentArea.appendChild(textarea);
        }

        return contentArea;
    },

    createStatusBar(instanceId) {
        const instance = this.instances[instanceId];

        const statusBar = document.createElement('div');
        statusBar.className = 'notes-status-bar';
        statusBar.id = `notes-status-${instanceId}`;

        const lines = instance.content.split('\n').length;
        const chars = instance.content.length;
        const words = instance.content.trim() ? instance.content.trim().split(/\s+/).length : 0;

        statusBar.textContent = `Lines: ${lines} | Words: ${words} | Characters: ${chars}`;

        return statusBar;
    },

    updateStatusBar(instanceId) {
        const instance = this.instances[instanceId];
        const statusBar = document.getElementById(`notes-status-${instanceId}`);
        if (!statusBar) return;

        const lines = instance.content.split('\n').length;
        const chars = instance.content.length;
        const words = instance.content.trim() ? instance.content.trim().split(/\s+/).length : 0;

        statusBar.textContent = `Lines: ${lines} | Words: ${words} | Characters: ${chars}`;
    },

    copyToClipboard(instanceId) {
        const instance = this.instances[instanceId];
        if (!instance) return;

        if (navigator.clipboard) {
            navigator.clipboard.writeText(instance.content)
                .then(() => {
                    // Show feedback
                    const statusBar = document.getElementById(`notes-status-${instanceId}`);
                    if (statusBar) {
                        const originalText = statusBar.textContent;
                        statusBar.textContent = '✓ Copied to clipboard';
                        setTimeout(() => {
                            statusBar.textContent = originalText;
                        }, 2000);
                    }
                })
                .catch(err => {
                    console.error('[NOTES] Copy failed:', err);
                });
        }
    },

    save(instanceId) {
        const instance = this.instances[instanceId];
        if (!instance || instance.readOnly) return;

        // Save to localStorage or game state
        // This is a placeholder - actual implementation would depend on game mechanics
        console.log('[NOTES] Saving:', instance.filename, instance.content);

        const statusBar = document.getElementById(`notes-status-${instanceId}`);
        if (statusBar) {
            const originalText = statusBar.textContent;
            statusBar.textContent = '✓ Saved';
            setTimeout(() => {
                statusBar.textContent = originalText;
            }, 2000);
        }
    }
};
