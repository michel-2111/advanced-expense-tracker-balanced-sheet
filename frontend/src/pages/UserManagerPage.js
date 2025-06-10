import React, { useEffect } from "react";
import { Typography, Box, Snackbar, Alert } from "@mui/material";
import { useAuth } from '../context/AuthContext';
import { Navigate } from "react-router-dom";
import { useBreadcrumb } from '../context/BreadcrumbContext';
import MainLayout from "../components/Layout/MainLayout";
import PageTransition from "../components/Layout/PageTransition";
import UserTable from "../components/UserManage/UserTable";
import EditDialog from "../components/UserManage/EditDialog";
import DeleteDialog from "../components/UserManage/DeleteDialog";
import useUserManager from "../hooks/useUserManager";

export default function UserManagerPage() {
  const {
    users, fetchUsers,
    editDialogOpen, setEditDialogOpen, selectedUser, editForm, setEditForm, handleEdit, handleEditSubmit,
    deleteDialogOpen, setDeleteDialogOpen, handleDeleteClick, handleDeleteConfirm,
    toastOpen, setToastOpen, toastMsg, toastType
  } = useUserManager();

  const { setBreadcrumbs } = useBreadcrumb();
  const { role } = useAuth();

  useEffect(() => {
    fetchUsers();
    setBreadcrumbs([
      { label: role === 'admin' ? 'Admin' : 'UMKM', path: role === 'admin' ? '/admin' : '/home' },
      { label: 'Home', path: role === 'admin' ? '/admin' : '/home' },
      { label: 'Daftar User', path: '/users' }
    ]);
  }, [fetchUsers, setBreadcrumbs, role]);

  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return (
    <PageTransition>
      <MainLayout>
        <Box sx={{ p: 4 }}>
          <Typography variant="h6" mb={2}>Daftar User</Typography>
          <UserTable users={users} onEdit={handleEdit} onDelete={handleDeleteClick} />
          <EditDialog
            open={editDialogOpen}
            onClose={() => setEditDialogOpen(false)}
            onSave={handleEditSubmit}
            form={editForm}
            setForm={setEditForm}
          />
          <DeleteDialog
            open={deleteDialogOpen}
            onClose={() => setDeleteDialogOpen(false)}
            onConfirm={handleDeleteConfirm}
            title="Hapus User"
            message="Apakah kamu yakin ingin menghapus user ini?"
          />
          <Snackbar
            open={toastOpen}
            autoHideDuration={2500}
            onClose={() => setToastOpen(false)}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert onClose={() => setToastOpen(false)} severity={toastType} variant="filled" sx={{ width: '100%' }}>
              {toastMsg}
            </Alert>
          </Snackbar>
        </Box>
      </MainLayout>
    </PageTransition>
  );
}
