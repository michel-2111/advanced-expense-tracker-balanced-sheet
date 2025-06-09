import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function useTransactionManager(itemsPerPage = 10) {
    const [transactions, setTransactions] = useState([]);
    const [allTransactions, setAllTransactions] = useState([]);
    const [page, setPage] = useState(1);

    // Dialog state
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    const [form, setForm] = useState({ type: '', amount: '', category: '', notes: '', impact: '' });

    // Fetch all data
    const fetchTransactions = async () => {
        const res = await axios.get('http://localhost:5000/api/transactions');
        setTransactions(res.data);
        setAllTransactions(res.data);
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

  // CRUD
    const handleSubmit = async () => {
        // Kirim sesuai impact
        const payload = {
            type: form.type,
            amount: form.amount,
            category: form.category,
            notes: form.notes,
            impact: form.impact,
        };
        if (form.impact === 'asset') payload.assetId = form.assetId;
        if (form.impact === 'liability') payload.liabilityId = form.liabilityId;
        if (form.impact === 'equity') payload.equityId = form.equityId;

        await axios.post('http://localhost:5000/api/transactions', payload);
        toast.success('Transaksi berhasil ditambahkan');
        fetchTransactions();
        setForm({ type: '', amount: '', category: '', notes: '', impact: '', assetId: null, liabilityId: null, equityId: null });
    };

    const handleEditOpen = (transaction) => {
        setSelectedTransaction(transaction);
        setEditDialogOpen(true);
    };

    const handleEditClose = () => {
        setEditDialogOpen(false);
        setSelectedTransaction(null);
    };

    const handleEditSubmit = async (formData) => {
        try {
        await axios.put(`http://localhost:5000/api/transactions/${selectedTransaction.id}`, formData);
        toast.success('Transaksi berhasil diperbarui');
        fetchTransactions();
        handleEditClose();
        } catch (error) {
        toast.error('Gagal memperbarui transaksi');
        }
    };

    const handleDeleteOpen = (transaction) => {
        setSelectedTransaction(transaction);
        setDeleteDialogOpen(true);
    };

    const handleDeleteClose = () => {
        setDeleteDialogOpen(false);
        setSelectedTransaction(null);
    };

    const handleDeleteConfirm = async () => {
        try {
        await axios.delete(`http://localhost:5000/api/transactions/${selectedTransaction.id}`);
        toast.success('Transaksi berhasil dihapus');
        fetchTransactions();
        handleDeleteClose();
        } catch (error) {
        toast.error('Gagal menghapus transaksi');
        }
    };

    const handleFilter = async (filters) => {
        try {
        const res = await axios.get('http://localhost:5000/api/transactions/filter', { params: filters });
        setAllTransactions(res.data);
        setPage(1);
        } catch (error) {
        console.error(error);
        }
    };

    // Pagination
    const totalPages = Math.ceil(allTransactions.length / itemsPerPage);
    const displayedTransactions = allTransactions.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return {
        form, setForm,
        allTransactions, transactions, displayedTransactions, totalPages, page, setPage,
        editDialogOpen, handleEditOpen, handleEditClose,
        handleEditSubmit, selectedTransaction,
        deleteDialogOpen, handleDeleteOpen, handleDeleteClose, handleDeleteConfirm,
        handleSubmit, handleFilter,
        fetchTransactions,
    };
}
