const express = require('express');
const router = express.Router();
const quizCtrl = require('../controllers/quizController');

/**
 * @openapi
 * /api/quizzes:
 *   get:
 *     summary: Barcha testlarni olish
 *     responses:
 *       200:
 *         description: Testlar ro'yxati
 */
router.get('/quizzes', quizCtrl.getQuizzes);

/**
 * @openapi
 * /api/quizzes:
 *   post:
 *     summary: Yangi test qo'shish (Admin uchun)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *               a:
 *                 type: string
 *               b:
 *                 type: string
 *               c:
 *                 type: string
 *               d:
 *                 type: string
 *               correct_answer:
 *                 type: string
 *     responses:
 *       201:
 *         description: Test yaratildi
 */
router.post('/quizzes', quizCtrl.addQuiz);

/**
 * @openapi
 * /api/quizzes:
 *   delete:
 *     summary: Barcha testlarni o'chirib tashlash (Admin uchun)
 *     responses:
 *       200:
 *         description: Hamma testlar o'chirildi
 */
router.delete('/quizzes', quizCtrl.deleteAllQuizzes);


/**
 * @openapi
 * /api/quizzes/submit:
 *   post:
 *     summary: Test javoblarini tekshirish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               answers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     answer:
 *                       type: string
 *     responses:
 *       200:
 *         description: Test natijalari
 */
router.post('/quizzes/submit', quizCtrl.checkAnswers);


module.exports = router;
