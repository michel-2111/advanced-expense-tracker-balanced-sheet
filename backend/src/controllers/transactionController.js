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

exports.importTransactions = async (req, res) => {
    const { transactions } = req.body;
    if (!transactions || !Array.isArray(transactions) || !transactions.length) {
        return res.status(400).json({ error: 'No transaction data provided' });
    }

    try {
        // 1. Ambil master data
        const [assets, liabilities, equities] = await Promise.all([
            prisma.asset.findMany(),
            prisma.liability.findMany(),
            prisma.equity.findMany()
        ]);

        // 2. Siapkan array data transaksi yang sudah dimapping id-nya
        const mappedTransactions = transactions.map((trx) => {
            let assetId = undefined;
            let liabilityId = undefined;
            let equityId = undefined;

            // Gunakan posisiName dari import (case-insensitive match)
            const posName = trx.positionName ? String(trx.positionName).trim().toLowerCase() : '';

            if (trx.impact === 'asset') {
                const found = assets.find(a => a.name.trim().toLowerCase() === posName);
                if (found) assetId = found.id;
            } else if (trx.impact === 'liability') {
                const found = liabilities.find(l => l.name.trim().toLowerCase() === posName);
                if (found) liabilityId = found.id;
            } else if (trx.impact === 'equity') {
                const found = equities.find(e => e.name.trim().toLowerCase() === posName);
                if (found) equityId = found.id;
            }

            return {
                type: trx.type,
                amount: parseFloat(trx.amount),
                category: trx.category,
                notes: trx.notes,
                date: new Date(trx.date),
                impact: trx.impact,
                assetId,
                liabilityId,
                equityId,
            };
        });

        // 3. Validasi jika ada posisiName yang tidak ditemukan di master
        const failed = mappedTransactions.filter((trx, idx) => {
            // Hanya gagal jika impact ada, tapi id nya null/undefined
            if (trx.impact === 'asset' && !trx.assetId) return true;
            if (trx.impact === 'liability' && !trx.liabilityId) return true;
            if (trx.impact === 'equity' && !trx.equityId) return true;
            return false;
        });

        if (failed.length > 0) {
            // Buat pesan error untuk semua data gagal
            const errorRows = failed.map((trx, idx) => `${trx.impact}: ${transactions[idx].positionName || '-'}`).join(', ');
            return res.status(400).json({ error: `Posisi berikut tidak ditemukan di master data: ${errorRows}` });
        }

        // 4. Masukkan data ke DB
        await prisma.$transaction(
            mappedTransactions.map((trx) =>
                prisma.transaction.create({ data: trx })
            )
        );

        res.json({ success: true, count: mappedTransactions.length });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
