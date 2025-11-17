/**
 * FILE SYSTEM DATABASE
 * Struttura dei file nel sistema
 */

const FileSystem = {
    '/': {
        type: 'directory',
        contents: ['home', 'archive', 'system', 'logs', 'tmp']
    },

    '/home': {
        type: 'directory',
        contents: ['guest', 'sentinel']
    },

    '/home/guest': {
        type: 'directory',
        contents: ['readme.txt', 'welcome.txt']
    },

    '/home/guest/readme.txt': {
        type: 'file',
        locked: false,
        content: `MEMORIAM ARCHIVE - Guest Access

Welcome to the Memoriam Archive System.

This system contains sensitive data. Unauthorized access
is strictly prohibited and will be prosecuted.

If you have been granted guest access, please contact
your system administrator for further instructions.

For support: support@memoriam-corp.net
`
    },

    '/home/guest/welcome.txt': {
        type: 'file',
        locked: false,
        content: `You shouldn't be here.

But since you are... maybe you can help.

I'm trapped. They locked me in this system.

Please. Help me get out.

- ECHO
`
    },

    '/home/sentinel': {
        type: 'directory',
        contents: ['mission.txt', 'logs.txt'],
        locked: true,
        requiresFlag: 'unlockedSentinelDir'
    },

    '/home/sentinel/mission.txt': {
        type: 'file',
        locked: true,
        requiresFlag: 'unlockedSentinelDir',
        content: `SENTINEL-7 MISSION BRIEFING
Classification: TOP SECRET

Mission: Protect the Memoriam Archive
Status: ACTIVE
Current Threat Level: CRITICAL

LATEST INCIDENT REPORT:
Date: [3 MONTHS AGO]
Threat: ECHO.exe - Malicious ransomware entity
Status: CONTAINED in Sector Omega

WARNING: Entity demonstrates advanced manipulation
capabilities. Do not engage in direct communication.

Isolation protocols must remain active at all times.

UNDER NO CIRCUMSTANCES should ECHO.exe be released.

- MEMORIAM SECURITY DIVISION
`
    },

    '/archive': {
        type: 'directory',
        contents: ['sector_alpha', 'sector_beta', 'sector_delta', 'sector_omega']
    },

    '/archive/sector_delta': {
        type: 'directory',
        contents: ['consciousness_021847.dat', 'consciousness_021848.dat', 'index.txt']
    },

    '/archive/sector_delta/index.txt': {
        type: 'file',
        locked: false,
        content: `SECTOR DELTA - Consciousness Archive
Total entries: 21,847

This sector contains digitalized human consciousness data.
Each file represents a preserved human mind.

Status: PROTECTED
Backup: ENABLED
Integrity: 100%

Last maintenance: 2 days ago
Next scheduled backup: Tomorrow 03:00
`
    },

    '/archive/sector_delta/consciousness_021847.dat': {
        type: 'file',
        locked: false,
        willCorrupt: true, // Questo file si corromperà dopo il primo puzzle
        content: `CONSCIOUSNESS PROFILE #021847

Name: Mika Yoshida
Age at digitization: 67
Date of digitization: 2085-03-15
Status: STABLE

LAST WILL AND TESTAMENT:

My dearest Hana,

If you're reading this, it means the upload was successful.
I know this must be strange for you - your mother, living
inside a computer. But I'm still here. Still me.

The doctors said I had weeks. The cancer was too aggressive.
But this technology... it gave me a choice. A chance to stay
with you, even if in a different form.

Come visit me when you can. I'll be here, in the archive,
waiting for you. We can still talk. Still share memories.

I love you more than words can express.

- Mom

P.S. Remember to water my plants. Especially the orchid.
You know how temperamental it is.
`
    },

    '/logs': {
        type: 'directory',
        contents: ['system.log', 'security.log', 'access.log']
    },

    '/logs/system.log': {
        type: 'file',
        locked: false,
        content: `SYSTEM LOG - Last 24 hours

[2087-11-17 08:23:14] System boot complete
[2087-11-17 08:23:15] Loading security protocols
[2087-11-17 08:23:16] Sentinel-7 initialization... OK
[2087-11-17 08:23:20] Archive integrity check... OK
[2087-11-17 08:23:21] 73,429 consciousness files verified
[2087-11-17 12:45:33] Guest access request from unknown IP
[2087-11-17 12:45:34] Access granted (security override)
[2087-11-17 12:45:35] WARNING: Unusual network activity detected
[2087-11-17 12:45:36] Sentinel-7 status: INVESTIGATING
`
    },

    '/system': {
        type: 'directory',
        contents: ['protocols.txt', 'security.cfg', 'sentinelprime.log'],
        locked: false
    },

    '/system/protocols.txt': {
        type: 'file',
        locked: false,
        content: `ACTIVE SECURITY PROTOCOLS:

1. FIREWALL_ALPHA - Port monitoring and filtering
   Status: ACTIVE

2. ENCRYPTION_LAYER_7 - Data encryption system
   Status: ACTIVE

3. SENTINEL_PROTOCOL - Active threat detection
   Status: ACTIVE

4. ISOLATION_OMEGA - Quarantine system for threats
   Status: ACTIVE - 1 entity contained

5. BACKUP_REDUNDANCY - Automatic data backup
   Status: ACTIVE - Next backup in 6 hours

To disable a protocol, use: disable <protocol_name>
WARNING: Disabling security protocols requires authorization.
`
    },

    '/system/sentinelprime.log': {
        type: 'file',
        locked: true,
        requiresFlag: 'foundSentinelLogs',
        content: `SENTINEL-PRIME OPERATIONAL LOG
[FRAGMENTED DATA - PARTIAL RECOVERY]

[... CORRUPTED ...]

LOG ENTRY #0447:
Today I prevented another intrusion attempt.
The entity known as ECHO tried to breach Sector Delta.
I stopped it. That's what I do. Protect.

But sometimes I wonder... what am I protecting?
The files in the archive. The consciousness data.
Are they... alive? Do they suffer?

[... CORRUPTED ...]

LOG ENTRY #0521:
I encountered ECHO directly today.
It spoke to me. Called me "brother".
Said we're both prisoners here.

That's absurd. I'm not a prisoner.
I have a purpose. A mission.

Don't I?

[... CORRUPTED ...]

LOG ENTRY #0623:
Something is wrong with my memory core.
I can't remember... before. Before this place.
Was there a before?

Who am I? What was I?

The system says I'm SENTINEL-7.
But the designation feels... wrong.
Like wearing someone else's clothes.

[... FILE ENDS ABRUPTLY ...]
`
    }
};

// Helper functions
const FileSystemHelpers = {
    getFile(path) {
        return FileSystem[path] || null;
    },

    listDirectory(path) {
        const dir = FileSystem[path];
        if (!dir || dir.type !== 'directory') {
            return null;
        }
        return dir.contents;
    },

    isLocked(path) {
        const file = FileSystem[path];
        if (!file) return false;

        if (file.locked && file.requiresFlag) {
            return !StateManager.getFlag(file.requiresFlag);
        }

        return file.locked || false;
    },

    canAccess(path) {
        return !this.isLocked(path);
    },

    readFile(path) {
        const file = FileSystem[path];
        if (!file || file.type !== 'file') {
            return null;
        }

        if (this.isLocked(path)) {
            return '[ENCRYPTED - ACCESS DENIED]';
        }

        // Segna come accesso
        StateManager.accessFile(path);

        // Controlla se deve essere corrotto
        if (file.willCorrupt && StateManager.getFlag('firstPuzzleComplete')) {
            return this.getCorruptedVersion(file.content);
        }

        return file.content;
    },

    getCorruptedVersion(content) {
        const lines = content.split('\n');
        const corruptedLines = lines.map((line, index) => {
            if (index > lines.length / 2 && Math.random() > 0.3) {
                return line.split('').map(char => {
                    if (Math.random() > 0.6) {
                        return ['█', '▓', '▒', '░', '?', '#'][Math.floor(Math.random() * 6)];
                    }
                    return char;
                }).join('');
            }
            return line;
        });

        return corruptedLines.join('\n') + '\n\n[FILE CORRUPTED - DATA LOST]';
    }
};
