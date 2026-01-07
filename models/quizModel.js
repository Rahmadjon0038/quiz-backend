const db = require('../config/db');

const Quiz = {
    getAll: (callback) => {
        db.all("SELECT id, question, a, b, c, d FROM quizzes", [], callback);
    },
    getAnswers: (callback) => {
        db.all('SELECT id, correct_answer FROM quizzes', [], callback);
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
    },

    deleteById: (id, callback) => {
        db.run('DELETE FROM quizzes WHERE id = ?', [id], function(err) {
            callback(err, this?.changes);
        });
    },

    updateById: (id, data, callback) => {
        const { question, a, b, c, d, correct_answer } = data;
        db.run(
            `UPDATE quizzes SET question = ?, a = ?, b = ?, c = ?, d = ?, correct_answer = ? WHERE id = ?`,
            [question, a, b, c, d, correct_answer, id],
            function(err) {
                callback(err, this?.changes);
            }
        );
    }
};

module.exports = Quiz;