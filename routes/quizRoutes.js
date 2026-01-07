const express = require('express');
const router = express.Router();
const quizCtrl = require('../controllers/quizController');
const authCtrl = require('../controllers/authController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     summary: Yangi foydalanuvchini ro'yxatdan o'tkazish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ism:
 *                 type: string
 *                 description: Foydalanuvchi ismi
 *               parol:
 *                 type: string
 *                 description: Foydalanuvchi paroli
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *                 description: Foydalanuvchi roli (ixtiyoriy, standart 'user')
 *             required:
 *               - ism
 *               - parol
 *     responses:
 *       201:
 *         description: Foydalanuvchi yaratildi
 */
router.post('/auth/register', authCtrl.register);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Foydalanuvchini tizimga kiritish
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ism:
 *                 type: string
 *                 description: Foydalanuvchi ismi
 *               parol:
 *                 type: string
 *                 description: Foydalanuvchi paroli
 *             required:
 *               - ism
 *               - parol
 *     responses:
 *       200:
 *         description: Token qaytariladi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 role:
 *                   type: string
 *                 username:
 *                   type: string
 */
router.post('/auth/login', authCtrl.login);

/**
 * @openapi
 * /api/quizzes:
 *   get:
 *     summary: Barcha testlarni olish
 *     responses:
 *       200:
 *         description: Testlar ro'yxati
 */
router.get('/quizzes', authenticateToken, authorizeRoles('user', 'admin'), quizCtrl.getQuizzes);

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
router.post('/quizzes', authenticateToken, authorizeRoles('admin'), quizCtrl.addQuiz);

/**
 * @openapi
 * /api/quizzes:
 *   delete:
 *     summary: Barcha testlarni o'chirib tashlash (Admin uchun)
 *     responses:
 *       200:
 *         description: Hamma testlar o'chirildi
 */
router.delete('/quizzes', authenticateToken, authorizeRoles('admin'), quizCtrl.deleteAllQuizzes);

/**
 * @openapi
 * /api/quizzes/{id}:
 *   delete:
 *     summary: ID bo'yicha testni o'chirish (Admin)
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Test o'chirildi
 */
router.delete('/quizzes/:id', authenticateToken, authorizeRoles('admin'), quizCtrl.deleteQuiz);

/**
 * @openapi
 * /api/quizzes/{id}:
 *   put:
 *     summary: ID bo'yicha testni yangilash (Admin)
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Test yangilandi
 */
router.put('/quizzes/:id', authenticateToken, authorizeRoles('admin'), quizCtrl.updateQuiz);


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
 *             additionalProperties:
 *               type: string
 *             example:
 *               "1": "a"
 *               "2": "b" 
 *               "3": "c"
 *           description: Savol ID'larini kalitlar, javoblarni qiymatlar sifatida yuboring
 *     responses:
 *       200:
 *         description: Test natijalari
 */
router.post('/quizzes/submit', authenticateToken, authorizeRoles('user', 'admin'), quizCtrl.checkAnswers);


module.exports = router;
