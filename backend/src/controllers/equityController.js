const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllEquities = async (req, res) => {
    const data = await prisma.equity.findMany();
    res.json(data);
};

exports.createEquity = async (req, res) => {
    const { name, value, notes } = req.body;
    const data = await prisma.equity.create({ data: { name, value: parseFloat(value), notes } });
    res.json(data);
};

exports.updateEquity = async (req, res) => {
    const { id } = req.params;
    const { name, value, notes } = req.body;
    const data = await prisma.equity.update({
        where: { id: Number(id) },
        data: { name, value: parseFloat(value), notes },
    });
    res.json(data);
};

exports.deleteEquity = async (req, res) => {
    const { id } = req.params;
    await prisma.equity.delete({ where: { id: Number(id) } });
    res.json({ success: true });
};