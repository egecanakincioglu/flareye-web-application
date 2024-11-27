CREATE TABLE IF NOT EXISTS Afk (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    guildID TEXT DEFAULT '',
    userID TEXT DEFAULT '',
    reason TEXT DEFAULT '',
    date INTEGER DEFAULT (strftime('%s', 'now'))
);