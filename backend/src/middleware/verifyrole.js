const jwt = require('jsonwebtoken');

const verifyRole = (requiredRole) => {
    return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token tidak ditemukan' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Token tidak valid' });

        if (decoded.role !== requiredRole) {
        return res.status(403).json({ message: 'Akses ditolak: butuh peran ' + requiredRole });
        }

        req.user = decoded;
        next();
        });
    };
};

module.exports = verifyRole;