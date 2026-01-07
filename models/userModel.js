const db = require('../config/db');

const User = {
    create: (data, callback) => {
        const { username, password, role = 'user' } = data;
        db.run(
            'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
            [username, password, role],
            function(err) {
                callback(err, this?.lastID);
            }
        );
    },
    findByUsername: (username, callback) => {
        db.get('SELECT * FROM users WHERE username = ?', [username], callback);
    }
};

module.exports = User;
