const Quiz = require('../models/quizModel');
const db = require('../config/db')
exports.getQuizzes = (req, res) => {
    Quiz.getAll((err, rows) => {
        if (err) return res.status(500).json({ error: "Serverda xatolik yuz berdi: " + err.message });

        if (!rows || rows.length === 0) {
            return res.status(200).json({ message: "Testlar hozircha yo‘q" });
        }
        res.status(200).json(rows);
    });
};

exports.addQuiz = (req, res) => {
    Quiz.create(req.body, (err, id) => {
        if (err) return res.status(500).json({ error: "Test qo‘shishda xatolik yuz berdi: " + err.message });

        res.status(201).json({ message: "Test muvaffaqiyatli qo‘shildi!", id });
    });
};

exports.deleteAllQuizzes = (req, res) => {
    Quiz.deleteAll((err) => {
        if (err) return res.status(500).json({ error: "Testlarni o‘chirishda xatolik yuz berdi: " + err.message });

        res.status(200).json({ message: "Barcha testlar muvaffaqiyatli o‘chirildi!" });
    });
};

exports.checkAnswers = (req, res) => {
    const userAnswers = req.body.answers; 

    if (!userAnswers || !Array.isArray(userAnswers)) {
        return res.status(400).json({ xato: "Javoblar massiv (ro'yxat) ko'rinishida yuborilishi kerak" });
    }

    db.all("SELECT id, correct_answer FROM quizzes", [], (err, rows) => {
        if (err) return res.status(500).json({ xato: err.message });

        let jamiSavollar = rows.length;
        let togriJavoblarSoni = 0;
        let batafsilNatija = [];

        rows.forEach(quiz => {
            const userAnswer = userAnswers.find(ua => ua.id === quiz.id);
            const togri = userAnswer && userAnswer.answer === quiz.correct_answer;
            
            if (togri) togriJavoblarSoni++;

            batafsilNatija.push({
                savol_id: quiz.id,
                natija: togri ? "To'g'ri" : "Xato",
                sizning_javobingiz: userAnswer ? userAnswer.answer : "Belgilanmagan",
                togri_javob: quiz.correct_answer
            });
        });

        const foiz = jamiSavollar > 0 ? (togriJavoblarSoni / jamiSavollar) * 100 : 0;

        // Userga qaytadigan o'zbekcha javob
        res.json({
            jami_savollar: jamiSavollar,
            togri_javoblar: togriJavoblarSoni,
            xato_javoblar: jamiSavollar - togriJavoblarSoni,
            muvaffaqiyat_koeffitsienti: Math.round(foiz) + "%",
            batafsil: batafsilNatija
        });
    });
};