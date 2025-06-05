const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getBalanceSummary = async (req, res) => {
    const transactions = await prisma.transaction.findMany();
    const adjustments = await prisma.adjustment.findMany();

    const asset = transactions.filter(t => t.impact === 'asset')
        .reduce((sum, t) => sum + (t.type === 'income' ? t.amount : -t.amount), 0)
        + adjustments.filter(a => a.type === 'asset').reduce((sum, a) => sum + a.value, 0);

    const liability = transactions.filter(t => t.impact === 'liability')
        .reduce((sum, t) => sum + (t.type === 'income' ? -t.amount : t.amount), 0)
        + adjustments.filter(a => a.type === 'liability').reduce((sum, a) => sum + a.value, 0);

    const equity = transactions.filter(t => t.impact === 'equity')
        .reduce((sum, t) => sum + (t.type === 'income' ? t.amount : -t.amount), 0)
        + adjustments.filter(a => a.type === 'equity').reduce((sum, a) => sum + a.value, 0);

    res.json({ asset, liability, equity });
};