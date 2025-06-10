import { useState, useCallback } from "react";
import axios from "axios";

export default function useUserManager() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editForm, setEditForm] = useState({ email: '', role: '' });
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastType, setToastType] = useState('success');

  const showToast = useCallback((msg, type = 'success') => {
    setToastMsg(msg);
    setToastType(type);
    setToastOpen(true);
  }, []);

  const fetchUsers = useCallback(async () => {
    const res = await axios.get("http://localhost:5000/api/auth");
    setUsers(res.data);
  }, []);

  const handleEdit = useCallback((user) => {
    setSelectedUser(user);
    setEditForm({ email: user.email, role: user.role });
    setEditDialogOpen(true);
  }, []);

  const handleEditSubmit = useCallback(async () => {
    try {
      await axios.put(`http://localhost:5000/api/auth/${selectedUser.id}`, editForm);
      setEditDialogOpen(false);
      showToast('User berhasil diubah!', 'success');
      fetchUsers();
    } catch {
      showToast('Gagal mengubah user!', 'error');
    }
  }, [editForm, fetchUsers, selectedUser, showToast]);

  const handleDeleteClick = useCallback((id) => {
    setSelectedUserId(id);
    setDeleteDialogOpen(true);
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    try {
      await axios.delete(`http://localhost:5000/api/auth/${selectedUserId}`);
      setDeleteDialogOpen(false);
      showToast('User berhasil dihapus!', 'success');
      fetchUsers();
    } catch {
      showToast('Gagal menghapus user!', 'error');
    }
  }, [selectedUserId, fetchUsers, showToast]);

  return {
    users, fetchUsers,
    editDialogOpen, setEditDialogOpen, selectedUser, editForm, setEditForm, handleEdit, handleEditSubmit,
    deleteDialogOpen, setDeleteDialogOpen, handleDeleteClick, handleDeleteConfirm,
    toastOpen, setToastOpen, toastMsg, toastType
  };
}
