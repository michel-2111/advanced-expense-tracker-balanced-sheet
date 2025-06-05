require('dotenv').config();
const express = require('express')
const cors = require('cors')
const { PrismaClient } = require('@prisma/client')

const app = express()
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json());

const documentRoutes = require('./routes/Document')
app.use('/api/documents', documentRoutes)
app.use('/uploads', express.static('uploads'))

const authRoutes = require('./routes/auth')
app.use('/api/auth', authRoutes)

const transactionRoutes = require('./routes/transaction')
app.use('/api/transactions', transactionRoutes)

const assetRoutes = require('./routes/asset');
app.use('/api/assets', assetRoutes);

const liabilityRoutes = require('./routes/liability');
app.use('/api/liabilities', liabilityRoutes);

const equityRoutes = require('./routes/equity');
app.use('/api/equities', equityRoutes);

const adjustmentRoutes = require('./routes/adjustment');
app.use('/api/adjustments', adjustmentRoutes);

const balanceRoutes = require('./routes/balance');
app.use('/api', balanceRoutes);

app.listen(5000, () => console.log("Server in running on port 5000"))