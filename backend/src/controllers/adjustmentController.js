const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllAdjustments = async (req, res) => {
    const data = await prisma.adjustment.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(data);
};

exports.createAdjustment = async (req, res) => {
    const { type, value, notes, user } = req.body;
    const data = await prisma.adjustment.create({ data: { type, value: parseFloat(value), notes, user } });
    res.json(data);
};
