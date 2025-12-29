const db = require('../config/db');

const Quiz = {
    getAll: (callback) => {
        db.all("SELECT id, question, a, b, c, d FROM quizzes", [], callback);
    },
    create: (data, callback) => {
        const { question, a, b, c, d, correct_answer } = data;
        db.run(
            `INSERT INTO quizzes (question, a, b, c, d, correct_answer) VALUES (?, ?, ?, ?, ?, ?)`,
            [question, a, b, c, d, correct_answer],
            function(err) { callback(err, this.lastID); }
        );
    },

    deleteAll: (callback) => {
        db.run("DELETE FROM quizzes", [], callback);
    }
};

module.exports = Quiz;