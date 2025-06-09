const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomPick(arr) {
    return arr[randomInRange(0, arr.length - 1)];
}

const ASSET_IDS = [1, 2, 3];
const LIABILITY_IDS = [1, 2];
const EQUITY_IDS = [1, 2];

const CATEGORIES_INCOME = ['Penjualan', 'Investasi', 'Piutang', 'Modal'];
const CATEGORIES_EXPENSE = ['Operasional', 'Beban Listrik', 'Hutang', 'Gaji', 'Pembelian'];
const NOTES_INCOME = ['Penjualan tunai', 'Pembayaran piutang', 'Setoran modal', 'Pendapatan investasi'];
const NOTES_EXPENSE = ['Pembelian alat', 'Bayar listrik', 'Bayar hutang usaha', 'Pembayaran gaji', 'Biaya operasional'];

function randomDateInMonth(year, month) {
    const day = randomInRange(1, 28);
    const hour = randomInRange(8, 17);
    const minute = randomInRange(0, 59);
    return new Date(year, month - 1, day, hour, minute);
}

async function main() {
    await prisma.transaction.deleteMany();

    let saldo_awal = 5000000;
    let saldo = saldo_awal;
    for (let month = 1; month <= 9; month++) {
        const nTrans = randomInRange(30, 40);
        let monthIncome = 0, monthExpense = 0;

        const nIncome = Math.floor(nTrans * 0.5) + randomInRange(-3, 3);
        for (let i = 0; i < nIncome; i++) {
            const amount = randomInRange(150000, 400000);
            monthIncome += amount;
            saldo += amount;
            await prisma.transaction.create({
                data: {
                    type: "income",
                    amount,
                    category: randomPick(CATEGORIES_INCOME),
                    date: randomDateInMonth(2025, month),
                    notes: randomPick(NOTES_INCOME),
                    impact: "asset",
                    assetId: randomPick(ASSET_IDS)
                }
            });
        }

        const nExpense = nTrans - nIncome;
        for (let i = 0; i < nExpense; i++) {
            const amount = randomInRange(100000, 350000);
            monthExpense += amount;
            saldo -= amount;
            await prisma.transaction.create({
                data: {
                    type: "expense",
                    amount,
                    category: randomPick(CATEGORIES_EXPENSE),
                    date: randomDateInMonth(2025, month),
                    notes: randomPick(NOTES_EXPENSE),
                    impact: i % 5 === 0 ? "liability" : "asset",
                    assetId: i % 5 !== 0 ? randomPick(ASSET_IDS) : undefined,
                    liabilityId: i % 5 === 0 ? randomPick(LIABILITY_IDS) : undefined,
                }
            });
        }

        for (let i = 0; i < randomInRange(1, 2); i++) {
            const amount = randomInRange(100000, 300000);
            saldo += amount;
            await prisma.transaction.create({
                data: {
                    type: "income",
                    amount,
                    category: "Setoran Modal",
                    date: randomDateInMonth(2025, month),
                    notes: "Setoran ke ekuitas",
                    impact: "equity",
                    equityId: randomPick(EQUITY_IDS)
                }
            });
}

    }
    console.log("Selesai generate transaksi dummy!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });