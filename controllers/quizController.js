const Quiz = require('../models/quizModel');
exports.getQuizzes = (req, res) => {
    Quiz.getAll((err, rows) => {
        if (err) return res.status(500).json({ error: "Serverda xatolik yuz berdi: " + err.message });

        if (!rows || rows.length === 0) {
            return res.status(200).json([]);
        }
        res.status(200).json(rows);
    });
};

exports.addQuiz = (req, res) => {
    const { question, a, b, c, d, correct_answer } = req.body;

    if (!question || !correct_answer) {
        return res.status(400).json({ error: 'Savol va to\'g\'ri javob majburiy.' });
    }

    Quiz.create({ question, a, b, c, d, correct_answer }, (err, id) => {
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
    const userAnswers = req.body;

    if (!userAnswers || typeof userAnswers !== 'object') {
        return res.status(400).json({ xato: "Javoblar obyekt ko'rinishida yuborilishi kerak. Misol: {\"1\": \"a\", \"2\": \"b\"}" });
    }

    Quiz.getAnswers((err, rows) => {
        if (err) return res.status(500).json({ xato: err.message });

        let jamiSavollar = rows.length;
        let togriJavoblarSoni = 0;
        let batafsilNatija = [];

        rows.forEach(quiz => {
            const userAnswer = userAnswers[quiz.id.toString()];
            const togri = userAnswer && userAnswer === quiz.correct_answer;
            
            if (togri) togriJavoblarSoni++;

            batafsilNatija.push({
                savol_id: quiz.id,
                natija: togri ? "To'g'ri" : "Xato",
                sizning_javobingiz: userAnswer || "Belgilanmagan",
                togri_javob: quiz.correct_answer
            });
        });

        const foiz = jamiSavollar > 0 ? (togriJavoblarSoni / jamiSavollar) * 100 : 0;

        // Userga qaytadigan o'zbekcha javob
        res.json({
            jami_savollar: jamiSavollar,
            togri_javoblar: togriJavoblarSoni,
            xato_javoblar: jamiSavollar - togriJavoblarSoni,
            muvaffaqiyat_koeffitsienti: Math.round(foiz),
            batafsil: batafsilNatija
        });
    });
};

exports.deleteQuiz = (req, res) => {
    const { id } = req.params;

    Quiz.deleteById(id, (err, changes) => {
        if (err) return res.status(500).json({ error: "Testni o‘chirishda xatolik: " + err.message });
        if (!changes) return res.status(404).json({ error: 'Bunday ID li test topilmadi.' });

        res.status(200).json({ message: 'Test o‘chirildi.' });
    });
};

exports.updateQuiz = (req, res) => {
    const { id } = req.params;
    const { question, a, b, c, d, correct_answer } = req.body;

    if (!question || !correct_answer) {
        return res.status(400).json({ error: 'Savol va to\'g\'ri javob majburiy.' });
    }

    Quiz.updateById(id, { question, a, b, c, d, correct_answer }, (err, changes) => {
        if (err) return res.status(500).json({ error: "Testni yangilashda xatolik: " + err.message });
        if (!changes) return res.status(404).json({ error: 'Bunday ID li test topilmadi.' });

        res.status(200).json({ message: 'Test ma’lumotlari yangilandi.' });
    });
};