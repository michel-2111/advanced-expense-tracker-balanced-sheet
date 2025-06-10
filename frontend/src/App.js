import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthContext';
import { BreadcrumbProvider } from './context/BreadcrumbContext';

import Login from './pages/login'
import UMKMFinance from './pages/UMKMFinance'
import AdminArchive from './pages/AdminArchive'
import Register from './pages/register'
import BalanceSheet from './pages/BalanceSheet';
import UMKMDashboard from './pages/UMKMDashboard';
import MasterData from './pages/MasterData';
import Listpage from "./pages/TransactionListPage"
import UserManagerPage from './pages/UserManagerPage';

import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';

function RoutesWrapper() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/home" element={<UMKMDashboard />} />
        <Route path="/master-data" element={<MasterData />} /> 
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add" element={<UMKMFinance />} />
        <Route path="/admin" element={<AdminArchive />} />
        <Route path="/balance-sheet" element={<BalanceSheet />} />
        <Route path='/list' element={<Listpage />} />
        <Route path='/users' element={<UserManagerPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <BreadcrumbProvider>
          <RoutesWrapper />
          <ToastContainer position="top-right" autoClose={3000} />
        </BreadcrumbProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}
