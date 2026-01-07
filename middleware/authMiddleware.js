const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token topilmadi. Iltimos, tizimga kiring.' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({ message: 'Token noto\'g\'ri yoki eskirgan.' });
        }
        req.user = user;
        next();
    });
};

const authorizeRoles = (...roles) => (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Bu amal uchun ruxsat yo\'q.' });
    }
    next();
};

module.exports = {
    authenticateToken,
    authorizeRoles
};
