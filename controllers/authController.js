const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

exports.register = (req, res) => {
    const { ism, parol, role = 'user' } = req.body;
    const username = ism;
    const password = parol;

    if (!username || !password) {
        return res.status(400).json({ message: 'Ism va parol talab qilinadi.' });
    }

    User.findByUsername(username, (err, existingUser) => {
        if (err) return res.status(500).json({ message: 'Foydalanuvchini tekshirishda xatolik.', error: err.message });
        if (existingUser) return res.status(409).json({ message: 'Bu login band.' });

        const hashedPassword = bcrypt.hashSync(password, 10);

        User.create({ username, password: hashedPassword, role }, createErr => {
            if (createErr) return res.status(500).json({ message: "Ro'yxatdan o'tkazishda xatolik.", error: createErr.message });
            res.status(201).json({ message: "Foydalanuvchi ro'yxatdan o'tdi.", role });
        });
    });
};

exports.login = (req, res) => {
    const { ism, parol } = req.body;
    const username = ism;
    const password = parol;

    if (!username || !password) {
        return res.status(400).json({ message: 'Ism va parol talab qilinadi.' });
    }

    User.findByUsername(username, (err, user) => {
        if (err) return res.status(500).json({ message: 'Server xatosi.', error: err.message });
        if (!user) return res.status(401).json({ message: 'Login yoki parol noto\'g\'ri.' });

        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Login yoki parol noto\'g\'ri.' });

        const token = jwt.sign({ id: user.id, role: user.role, username: user.username }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        res.json({ token, role: user.role, username: user.username });
    });
};
