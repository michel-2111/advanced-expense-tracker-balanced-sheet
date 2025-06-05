const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { filterDocuments, updateDocuments, uploadDocuments, getAllDocuments, deleteDocuments } = require('../controllers/documentController');
const verifyToken = require('../middleware/verifytoken');
const verifyRole = require('../middleware/verifyrole');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
    cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['.pdf'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
    cb(null, true);
    } else {
    cb(new Error('Hanya file PDF yang diperbolehkan'), false);
    }
};

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter
});

router.get('/', getAllDocuments);
router.post('/upload', verifyToken, verifyRole('admin'), upload.single('file'), uploadDocuments);
router.delete('/:id', verifyToken, verifyRole('admin'), deleteDocuments);
router.put('/:id', verifyToken, verifyRole('admin'), updateDocuments);
router.get('/filter', verifyToken, verifyRole('admin'), filterDocuments);

module.exports = router;