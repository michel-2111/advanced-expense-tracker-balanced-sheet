import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import UMKMFinance from './pages/UMKMFinance'
import AdminArchive from './pages/AdminArchive'
import Register from './pages/register'
import BalanceSheet from './pages/BalanceSheet';
import UMKMDashboard from './pages/UMKMDashboard';
import MasterData from './pages/MasterData';
import Listpage from "./pages/TransactionListPage"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<UMKMDashboard />} />
        <Route path="/master-data" element={<MasterData />} /> 
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<UMKMFinance />} />
        <Route path="/admin" element={<AdminArchive />} />
        <Route path="/balance-sheet" element={<BalanceSheet />} />
        <Route path='/list' element={<Listpage />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  )
}

export default App