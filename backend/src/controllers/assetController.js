const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllAssets = async (req, res) => {
    const data = await prisma.asset.findMany();
    res.json(data);
    };

    exports.createAsset = async (req, res) => {
    const { name, value, notes } = req.body;
    const data = await prisma.asset.create({ data: { name, value: parseFloat(value), notes } });
    res.json(data);
    };

    exports.updateAsset = async (req, res) => {
    const { id } = req.params;
    const { name, value, notes } = req.body;
    const data = await prisma.asset.update({
        where: { id: Number(id) },
        data: { name, value: parseFloat(value), notes },
    });
    res.json(data);
    };

    exports.deleteAsset = async (req, res) => {
    const { id } = req.params;
    await prisma.asset.delete({ where: { id: Number(id) } });
    res.json({ success: true });
    };