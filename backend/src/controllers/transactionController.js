const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Get all transactions + relation (advanced)
exports.getAll = async (req, res) => {
    try {
        const data = await prisma.transaction.findMany({
            include: {
                asset: true,
                liability: true,
                equity: true
            }
        });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Create new transaction with relation
exports.create = async (req, res) => {
    const { type, amount, category, notes, impact, assetId, liabilityId, equityId } = req.body
    try {
        const data = await prisma.transaction.create({
            data: {
                type,
                amount: parseFloat(amount),
                category,
                notes,
                impact,
                assetId: assetId ? Number(assetId) : undefined,
                liabilityId: liabilityId ? Number(liabilityId) : undefined,
                equityId: equityId ? Number(equityId) : undefined
            }
        })
        res.json(data)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.update = async (req, res) => {
    const { id } = req.params;
    const { type, amount, category, notes, impact, assetId, liabilityId, equityId } = req.body;

    try {
        const updated = await prisma.transaction.update({
            where: { id: parseInt(id) },
            data: {
                type,
                amount: parseFloat(amount),
                category,
                notes,
                impact,
                assetId: assetId ? Number(assetId) : undefined,
                liabilityId: liabilityId ? Number(liabilityId) : undefined,
                equityId: equityId ? Number(equityId) : undefined
            },
        });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.remove = async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.transaction.delete({
            where: { id: parseInt(id) },
        });
        res.json({ message: 'Transaksi berhasil dihapus' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getFilteredAndSorted = async (req, res) => {
    const { amountRange, sortOrder, period, startDate, endDate, type } = req.query;

    const where = {};
    const orderBy = [];

    if (amountRange === '<100000') {
        where.amount = { lt: 100000 };
    } else if (amountRange === '100000-500000') {
        where.amount = { gte: 100000, lte: 500000 };
    } else if (amountRange === '>500000') {
        where.amount = { gt: 500000 };
    }

    // Ganti amount ke date
    if (sortOrder) {
        orderBy.push({ date: sortOrder }); // <--- ini kuncinya
    }

    if (period === 'week') {
        const now = new Date();
        const first = now.getDate() - now.getDay() + 1;
        const start = new Date(now.setDate(first));
        start.setHours(0,0,0,0);
        const end = new Date(start);
        end.setDate(start.getDate() + 6);
        end.setHours(23,59,59,999);
        where.date = { gte: start, lte: end };
    } else if (period === 'month') {
        const now = new Date();
        const start = new Date(now.getFullYear(), now.getMonth(), 1);
        const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
        where.date = { gte: start, lte: end };
    } else if (period === 'custom' && startDate && endDate) {
        where.date = {
            gte: new Date(startDate + 'T00:00:00.000Z'),
            lte: new Date(endDate + 'T23:59:59.999Z'),
        };
    }

    if (type) {
        where.type = type; // income atau expense
    }

    if (sortOrder) {
        orderBy.push({ date: sortOrder });
    }

    try {
        const data = await prisma.transaction.findMany({
            where,
            orderBy,
            include: {
                asset: true,
                liability: true,
                equity: true
            }
        });

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};