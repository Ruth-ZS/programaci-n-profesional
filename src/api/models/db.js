const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS paquetes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      descripcion TEXT,
      depto TEXT,
      fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

module.exports = db;