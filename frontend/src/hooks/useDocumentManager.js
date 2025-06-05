import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';

export default function useDocumentManager() {
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState('Received');

    const [docs, setDocs] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedDocId, setSelectedDocId] = useState(null);

    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editDoc, setEditDoc] = useState({ id: null, title: '', status: '' });

    const [filterStatus, setFilterStatus] = useState('');
    const [sortField, setSortField] = useState('title');
    const [sortOrder, setSortOrder] = useState('asc');
    const [searchQuery, setSearchQuery] = useState('');

    const [loading, setLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const fetchDocs = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get('/documents');
            setDocs(res.data);
        } catch (err) {
            toast.error('Gagal mengambil dokumen!');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDocs();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [filterStatus, sortField, sortOrder, searchQuery]);

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('file', file);
            formData.append('status', status);
            await axiosInstance.post('/documents/upload', formData);
            fetchDocs();
            setTitle('');
            setFile(null);
            setStatus('Sent');
            toast.success('Dokumen berhasil diupload!');
        } catch (err) {
            toast.error('Gagal upload dokumen!');
            console.error(err);
        }
    };

    const confirmDelete = (id) => {
        setSelectedDocId(id);
        setOpenDialog(true);
    };

    const handleDeleteConfirmed = async () => {
        try {
            await axiosInstance.delete(`/documents/${selectedDocId}`);
            fetchDocs();
            setOpenDialog(false);
            toast.success('Dokumen berhasil dihapus!');
        } catch (err) {
            toast.error('Gagal menghapus dokumen!');
            console.error(err);
        }
    };

    const openEditDialog = (doc) => {
        setEditDoc({ id: doc.id, title: doc.title, status: doc.status });
        setEditDialogOpen(true);
    };

    const handleUpdate = async () => {
        try {
            await axiosInstance.put(`/documents/${editDoc.id}`, {
                title: editDoc.title,
                status: editDoc.status,
            });
            fetchDocs();
            setEditDialogOpen(false);
            toast.success('Dokumen berhasil diperbarui!');
        } catch (err) {
            toast.error('Gagal mengupdate dokumen!');
            console.error(err);
        }
    };

    const filteredDocs = docs
        .filter(doc => {
            if (!filterStatus) return true;
            return doc.status === filterStatus;
        })
        .filter(doc => {
            if (!searchQuery) return true;
            return doc.title.toLowerCase().includes(searchQuery.toLowerCase());
        })
        .sort((a, b) => {
            let fieldA = a[sortField];
            let fieldB = b[sortField];

            if (sortField === 'createdAt') {
                fieldA = new Date(fieldA);
                fieldB = new Date(fieldB);
            } else {
                fieldA = fieldA.toLowerCase();
                fieldB = fieldB.toLowerCase();
            }

            return sortOrder === 'asc'
                ? (fieldA > fieldB ? 1 : -1)
                : (fieldA < fieldB ? 1 : -1);
        });

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedDocs = filteredDocs.slice(startIndex, startIndex + itemsPerPage);

    return {
        // upload
        title, setTitle, file, setFile, status, setStatus, handleUpload,
        // documents
        docs: paginatedDocs, fetchDocs,
        // delete
        openDialog, setOpenDialog, confirmDelete, handleDeleteConfirmed,
        // edit
        editDialogOpen, setEditDialogOpen, editDoc, setEditDoc, openEditDialog, handleUpdate,
        // filter & sort
        filterStatus, setFilterStatus, sortField, setSortField, sortOrder, setSortOrder,
        // search
        searchQuery, setSearchQuery,
        // loading
        loading,
        // pagination
        totalDocs: filteredDocs.length, currentPage, setCurrentPage, itemsPerPage
    };
}