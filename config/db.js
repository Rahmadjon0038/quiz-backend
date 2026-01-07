const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const db = new sqlite3.Database('./quiz.db');

const seedAdmin = () => {
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    db.get('SELECT id FROM users WHERE username = ?', [adminUsername], (err, row) => {
        if (err) {
            console.error('Admin foydalanuvchini tekshirishda xatolik:', err.message);
            return;
        }

        if (!row) {
            const hashedPassword = bcrypt.hashSync(adminPassword, 10);
            db.run(
                'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
                [adminUsername, hashedPassword, 'admin'],
                insertErr => {
                    if (insertErr) {
                        console.error('Admin foydalanuvchini yaratishda xatolik:', insertErr.message);
                    } else {
                        console.log('Standart admin foydalanuvchi yaratildi (login: admin, parol: admin123).');
                    }
                }
            );
        }
    });
};

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS quizzes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question TEXT NOT NULL,
        a TEXT, b TEXT, c TEXT, d TEXT,
        correct_answer TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'user'
    )`, [], seedAdmin);
});

module.exports = db;