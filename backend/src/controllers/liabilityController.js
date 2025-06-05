const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllLiabilities = async (req, res) => {
    const data = await prisma.liability.findMany();
    res.json(data);
};

exports.createLiability = async (req, res) => {
    const { name, value, notes } = req.body;
    const data = await prisma.liability.create({ data: { name, value: parseFloat(value), notes } });
    res.json(data);
};

exports.updateLiability = async (req, res) => {
    const { id } = req.params;
    const { name, value, notes } = req.body;
    const data = await prisma.liability.update({
        where: { id: Number(id) },
        data: { name, value: parseFloat(value), notes },
    });
    res.json(data);
};

exports.deleteLiability = async (req, res) => {
    const { id } = req.params;
    await prisma.liability.delete({ where: { id: Number(id) } });
    res.json({ success: true });
};