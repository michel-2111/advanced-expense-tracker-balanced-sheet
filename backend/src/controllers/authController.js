const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();
const SECRET = process.env.JWT_SECRET;

// Register
exports.register = async (req, res) => {
    const { email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
        return res.status(400).json({ error: 'Email sudah terdaftar!' });
        }

    try {
    const user = await prisma.user.create({
        data: { email, password: hashedPassword, role }
    });
    res.json(user);
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
    try {
    const users = await prisma.user.findMany({
        select: { id: true, email: true, role: true, createdAt: true }
    });
    res.json(users);
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
};

// Login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
    if (!email || !password) {
        return res.status(400).json({ error: 'Username dan password wajib diisi' });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Username atau password salah' });
    }

    const token = jwt.sign(
        {
        id: user.id,
        email: user.email,
        role: user.role
        },
        SECRET,
        { expiresIn: '1d' }
    );

    res.json({ token, role: user.role });
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { email, role } = req.body;
    try {
        const user = await prisma.user.update({
        where: { id: Number(id) },
        data: { email, role }
        });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.user.delete({ where: { id: Number(id) } });
        res.json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};