import { Paper, Box } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function TransactionChart({ transactions = [], period = 'monthly' }) {
    if (!Array.isArray(transactions)) return null;

    
const groupData = () => {
    const groups = {};

    transactions.forEach((trx) => {
        const date = new Date(trx.date);
        const key =
            period === 'monthly'
            ? `${date.getFullYear()}-${date.getMonth() + 1}`
            : `${date.getFullYear()}-W${getWeekNumber(date)}`;

        if (!groups[key]) groups[key] = { income: 0, expense: 0 };

        if (trx.type === 'income') groups[key].income += trx.amount;
        else groups[key].expense += trx.amount;
    });

    return groups;
};

const getWeekNumber = (d) => {
    const date = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const dayNum = date.getDay() || 7;
    date.setDate(date.getDate() + 4 - dayNum);
    const yearStart = new Date(date.getFullYear(), 0, 1);
    return Math.ceil(((date - yearStart) / 86400000 + 1) / 7);
};

const grouped = groupData();
const labels = Object.keys(grouped).sort();
const incomeData = labels.map((key) => grouped[key].income);
const expenseData = labels.map((key) => grouped[key].expense);

const data = {
    labels,
    datasets: [
        { label: 'Pemasukan', data: incomeData, backgroundColor: '#4caf50' },
        { label: 'Pengeluaran', data: expenseData, backgroundColor: '#f44336' }
    ]
};

return <Bar data={data} />;}