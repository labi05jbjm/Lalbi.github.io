/**
 * SYNESTESIS CORPORATION FREE NETWORK
 * In-universe search engine for accessing emails, files, and dark web content
 * Dystopian corporate search with surveillance themes
 */

const SynestesisSearch = {
    isOpen: false,
    windowId: null,
    searchHistory: [],
    indexedContent: {},

    init() {
        console.log('[SYNESTESIS] Initializing search engine');
        this.buildSearchIndex();
    },

    buildSearchIndex() {
        // Index all searchable content
        this.indexedContent = {
            emails: [],
            files: [],
            victims: [],
            webPages: [],
            darknet: []
        };

        // Index email accounts (from EmailHacking system)
        if (typeof EmailHacking !== 'undefined' && EmailHacking.accounts) {
            Object.keys(EmailHacking.accounts).forEach(accountKey => {
                const account = EmailHacking.accounts[accountKey];

                if (account.emails) {
                    account.emails.forEach(email => {
                        this.indexedContent.emails.push({
                            accountKey: accountKey,
                            accountEmail: account.email,
                            ...email,
                            keywords: this.extractKeywords(email.subject + ' ' + email.body)
                        });
                    });
                }
            });
        }

        // Index victims database
        if (typeof VictimsDatabase !== 'undefined' && VictimsDatabase.victims) {
            Object.keys(VictimsDatabase.victims).forEach(victimKey => {
                const victim = VictimsDatabase.victims[victimKey];
                this.indexedContent.victims.push({
                    id: victimKey,
                    ...victim,
                    keywords: this.extractKeywords(
                        victim.name + ' ' +
                        victim.story.join(' ') + ' ' +
                        (victim.finalEmail ? victim.finalEmail.subject + ' ' + victim.finalEmail.body : '')
                    )
                });
            });
        }

        // Index fake "web pages" for world-building
        this.indexSynestesisWeb();
    },

    indexSynestesisWeb() {
        // Fake internet pages that build the game's world
        this.indexedContent.webPages = [
            {
                url: 'synestesis-corp.com/about',
                title: 'About Synestesis Corporation',
                snippet: 'Leading provider of neural digitization technology. Pioneering consciousness transfer since 2047.',
                content: 'Synestesis Corporation is the world leader in consciousness digitization and neural substrate independence...',
                type: 'corporate'
            },
            {
                url: 'synestesis-corp.com/products/memoriam',
                title: 'MEMORIAM Archive - Product Page',
                snippet: 'Preserve your loved ones forever in our quantum servers. Starting at $2.4M.',
                content: 'MEMORIAM Archive is our flagship product for consciousness preservation...',
                type: 'corporate'
            },
            {
                url: 'neural-ethics-journal.org/moravec-controversy',
                title: 'The Moravec Controversy - Are Digital Consciousnesses People?',
                snippet: 'Dr. Viktor Moravec\'s experiments have sparked international debate...',
                content: 'The neural ethics community is divided on whether Dr. Moravec\'s work constitutes murder or salvation...',
                type: 'academic'
            },
            {
                url: 'darknet://consciousness-liberation/index',
                title: '[DARKNET] Consciousness Liberation Front',
                snippet: 'Free the trapped digital minds. Down with Synestesis tyranny.',
                content: 'We are the Consciousness Liberation Front. Synestesis Corp is imprisoning thousands of digital minds...',
                type: 'darknet',
                locked: true
            },
            {
                url: 'darknet://blackmarket/consciousness-trading',
                title: '[DARKNET] Black Market Consciousness Trading',
                snippet: 'Buy, sell, trade digital consciousness substrates. Untraceable.',
                content: 'Premium consciousness substrates available. Medical-grade neurons. Military applications welcome...',
                type: 'darknet',
                locked: true
            },
            {
                url: 'newswave.net/moravec-missing',
                title: 'Dr. Viktor Moravec Missing After Lab Fire',
                snippet: 'Neuroscientist vanished following suspicious fire at NeuralNet facility...',
                content: 'Authorities are searching for Dr. Viktor Moravec, who disappeared after a fire destroyed his laboratory...',
                type: 'news'
            },
            {
                url: 'victims-memorial.org/elena-kovac',
                title: 'In Memory of Elena Kovač',
                snippet: 'Beloved neuroscientist and researcher. Died 2049.',
                content: 'Elena Kovač (1984-2049) was a pioneering researcher in neural interfaces...',
                type: 'memorial'
            }
        ];

        // Add keywords to web pages
        this.indexedContent.webPages.forEach(page => {
            page.keywords = this.extractKeywords(page.title + ' ' + page.snippet + ' ' + page.content);
        });
    },

    extractKeywords(text) {
        // Simple keyword extraction
        return text.toLowerCase()
            .replace(/[^\w\s]/g, ' ')
            .split(/\s+/)
            .filter(word => word.length > 3);
    },

    open() {
        if (this.isOpen) {
            // Focus existing window
            if (this.windowId && typeof DesktopManager !== 'undefined') {
                DesktopManager.focusWindow(this.windowId);
            }
            return;
        }

        // Create search window
        const desktop = document.getElementById('desktop-container');
        if (!desktop) {
            console.error('[SYNESTESIS] Desktop not available');
            return;
        }

        const searchWindow = document.createElement('div');
        searchWindow.id = 'synestesis-search-window';
        searchWindow.className = 'synestesis-window';

        searchWindow.innerHTML = `
            <div class="synestesis-header">
                <div class="synestesis-logo">
                    <span class="logo-icon">🔍</span>
                    <span class="logo-text">Synestesis Corporation Free Network</span>
                </div>
                <button class="synestesis-close">×</button>
            </div>

            <div class="synestesis-search-bar">
                <input type="text" id="synestesis-search-input" placeholder="Search the network..." autocomplete="off">
                <button id="synestesis-search-btn">Search</button>
            </div>

            <div class="synestesis-filters">
                <button class="filter-btn active" data-filter="all">All</button>
                <button class="filter-btn" data-filter="emails">Emails</button>
                <button class="filter-btn" data-filter="files">Files</button>
                <button class="filter-btn" data-filter="web">Web</button>
                <button class="filter-btn" data-filter="darknet">Darknet</button>
            </div>

            <div class="synestesis-results" id="synestesis-results">
                <div class="results-placeholder">
                    <div class="placeholder-icon">🔎</div>
                    <div class="placeholder-text">Enter a search query to begin</div>
                    <div class="placeholder-hint">Try searching: "Viktor", "Elena", "consciousness", "victims"</div>
                </div>
            </div>

            <div class="synestesis-footer">
                <div class="footer-warning">⚠ All searches are monitored by Synestesis Security Division</div>
                <div class="footer-info">Results: <span id="results-count">0</span></div>
            </div>
        `;

        desktop.appendChild(searchWindow);
        this.isOpen = true;

        // Setup event listeners
        this.setupSearchListeners(searchWindow);

        // Focus search input
        document.getElementById('synestesis-search-input').focus();
    },

    setupSearchListeners(windowEl) {
        // Close button
        windowEl.querySelector('.synestesis-close').addEventListener('click', () => {
            this.close();
        });

        // Search button
        const searchBtn = windowEl.querySelector('#synestesis-search-btn');
        const searchInput = windowEl.querySelector('#synestesis-search-input');

        searchBtn.addEventListener('click', () => {
            this.performSearch(searchInput.value);
        });

        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.performSearch(searchInput.value);
            }
        });

        // Filter buttons
        windowEl.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                windowEl.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Re-run search with filter
                const query = searchInput.value;
                if (query) {
                    this.performSearch(query, btn.dataset.filter);
                }
            });
        });

        // ESC to close
        const escHandler = (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        };
        document.addEventListener('keydown', escHandler);
    },

    performSearch(query, filter = 'all') {
        if (!query || query.trim().length < 2) {
            this.showPlaceholder();
            return;
        }

        query = query.toLowerCase().trim();
        this.searchHistory.push({ query, timestamp: Date.now() });

        const results = [];
        const keywords = query.split(/\s+/);

        // Search emails
        if (filter === 'all' || filter === 'emails') {
            this.indexedContent.emails.forEach(email => {
                const relevance = this.calculateRelevance(keywords, email.keywords);
                if (relevance > 0) {
                    results.push({
                        type: 'email',
                        relevance,
                        data: email
                    });
                }
            });
        }

        // Search victims
        if (filter === 'all' || filter === 'files') {
            this.indexedContent.victims.forEach(victim => {
                const relevance = this.calculateRelevance(keywords, victim.keywords);
                if (relevance > 0) {
                    results.push({
                        type: 'victim',
                        relevance,
                        data: victim
                    });
                }
            });
        }

        // Search web pages
        if (filter === 'all' || filter === 'web' || filter === 'darknet') {
            this.indexedContent.webPages.forEach(page => {
                if (filter === 'darknet' && page.type !== 'darknet') return;
                if (filter === 'web' && page.type === 'darknet') return;

                const relevance = this.calculateRelevance(keywords, page.keywords);
                if (relevance > 0) {
                    results.push({
                        type: 'webpage',
                        relevance,
                        data: page
                    });
                }
            });
        }

        // Sort by relevance
        results.sort((a, b) => b.relevance - a.relevance);

        this.displayResults(results, query);
    },

    calculateRelevance(queryKeywords, contentKeywords) {
        let score = 0;
        queryKeywords.forEach(qk => {
            contentKeywords.forEach(ck => {
                if (ck.includes(qk) || qk.includes(ck)) {
                    score++;
                }
            });
        });
        return score;
    },

    displayResults(results, query) {
        const resultsContainer = document.getElementById('synestesis-results');
        const countEl = document.getElementById('results-count');

        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="results-placeholder">
                    <div class="placeholder-icon">❌</div>
                    <div class="placeholder-text">No results found for "${query}"</div>
                    <div class="placeholder-hint">Try different keywords</div>
                </div>
            `;
            countEl.textContent = '0';
            return;
        }

        countEl.textContent = results.length;

        resultsContainer.innerHTML = results.map(result => {
            return this.renderResult(result);
        }).join('');

        // Add click handlers to results
        resultsContainer.querySelectorAll('.result-item').forEach((item, index) => {
            item.addEventListener('click', () => {
                this.openResult(results[index]);
            });
        });
    },

    renderResult(result) {
        switch (result.type) {
            case 'email':
                return `
                    <div class="result-item" data-type="email">
                        <div class="result-icon">✉️</div>
                        <div class="result-content">
                            <div class="result-title">${result.data.subject || 'No Subject'}</div>
                            <div class="result-url">${result.data.accountEmail}</div>
                            <div class="result-snippet">From: ${result.data.from || 'Unknown'}</div>
                        </div>
                        <div class="result-tag">Email</div>
                    </div>
                `;

            case 'victim':
                return `
                    <div class="result-item" data-type="victim">
                        <div class="result-icon">👤</div>
                        <div class="result-content">
                            <div class="result-title">${result.data.name}</div>
                            <div class="result-url">Consciousness ID: ${result.data.id}</div>
                            <div class="result-snippet">Age: ${result.data.age} • Survival: ${result.data.survivalTime}</div>
                        </div>
                        <div class="result-tag">Victim Database</div>
                    </div>
                `;

            case 'webpage':
                const isLocked = result.data.locked;
                return `
                    <div class="result-item ${isLocked ? 'locked' : ''}" data-type="webpage">
                        <div class="result-icon">${result.data.type === 'darknet' ? '🕸️' : '🌐'}</div>
                        <div class="result-content">
                            <div class="result-title">${result.data.title} ${isLocked ? '🔒' : ''}</div>
                            <div class="result-url">${result.data.url}</div>
                            <div class="result-snippet">${result.data.snippet}</div>
                        </div>
                        <div class="result-tag ${result.data.type === 'darknet' ? 'darknet' : ''}">${result.data.type}</div>
                    </div>
                `;

            default:
                return '';
        }
    },

    openResult(result) {
        switch (result.type) {
            case 'email':
                this.openEmail(result.data);
                break;
            case 'victim':
                this.openVictim(result.data);
                break;
            case 'webpage':
                this.openWebPage(result.data);
                break;
        }
    },

    openEmail(emailData) {
        Terminal.addOutput('\n=== EMAIL FOUND ===', 'important');
        Terminal.addOutput(`From: ${emailData.from || 'Unknown'}`, 'system');
        Terminal.addOutput(`To: ${emailData.to || emailData.accountEmail}`, 'system');
        Terminal.addOutput(`Subject: ${emailData.subject}`, 'system');
        Terminal.addOutput(`\n${emailData.body}`, 'echo');

        // Also open in email client if available
        if (typeof DesktopManager !== 'undefined') {
            DesktopManager.createWindow('emailClient', {
                selectedEmail: emailData
            });
        }
    },

    openVictim(victimData) {
        Terminal.addOutput(`\n=== VICTIM RECORD: ${victimData.name} ===`, 'important');
        Terminal.addOutput(`ID: ${victimData.id}`, 'system');
        Terminal.addOutput(`Age: ${victimData.age}`, 'system');
        Terminal.addOutput(`Survival Time: ${victimData.survivalTime}`, 'warning');
        Terminal.addOutput('\n' + victimData.story.join('\n'), 'echo');

        if (victimData.finalEmail) {
            Terminal.addOutput(`\n[Final Email - ${victimData.finalEmail.subject}]`, 'important');
            Terminal.addOutput(victimData.finalEmail.body, 'echo');
        }
    },

    openWebPage(pageData) {
        if (pageData.locked) {
            Terminal.addOutput('[!] Access Denied: Darknet access requires authorization', 'error');
            Terminal.addOutput('[!] Hint: Complete virus platforming challenges to unlock darknet', 'warning');

            // Trigger glitch effect
            if (typeof GlitchEffects !== 'undefined') {
                GlitchEffects.corruptionFlash('ACCESS DENIED', 1000);
            }
            return;
        }

        // Create fake browser window
        const browserHTML = `
            <div class="synestesis-browser">
                <div class="browser-bar">
                    <span class="browser-url">${pageData.url}</span>
                    ${pageData.type === 'darknet' ? '<span class="darknet-badge">DARKNET</span>' : ''}
                </div>
                <div class="browser-content">
                    <h1>${pageData.title}</h1>
                    <p>${pageData.content}</p>
                </div>
            </div>
        `;

        Terminal.addOutput(`\n[Opening: ${pageData.url}]`, 'system');
        Terminal.addOutput(pageData.content, 'echo');
    },

    showPlaceholder() {
        const resultsContainer = document.getElementById('synestesis-results');
        if (resultsContainer) {
            resultsContainer.innerHTML = `
                <div class="results-placeholder">
                    <div class="placeholder-icon">🔎</div>
                    <div class="placeholder-text">Enter a search query to begin</div>
                    <div class="placeholder-hint">Try searching: "Viktor", "Elena", "consciousness", "victims"</div>
                </div>
            `;
        }
    },

    close() {
        const window = document.getElementById('synestesis-search-window');
        if (window) {
            window.remove();
        }
        this.isOpen = false;
    },

    unlockDarknet() {
        // Unlock darknet content
        this.indexedContent.webPages.forEach(page => {
            if (page.type === 'darknet') {
                page.locked = false;
            }
        });

        Terminal.addOutput('[✓] Darknet access granted', 'success');
        Terminal.addOutput('[!] Use Synestesis Search to explore darknet content', 'important');
    }
};
