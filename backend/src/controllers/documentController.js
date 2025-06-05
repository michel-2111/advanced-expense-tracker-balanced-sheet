const { PrismaClient } = require('@prisma/client')
const path = require('path')
const fs = require('fs')

const prisma = new PrismaClient()

const uploadDir = path.join(__dirname, '../../uploads')
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir)

exports.uploadDocuments = async (req, res) => {
    try {
        const { title, status } = req.body;

        if (!req.file) {
        return res.status(400).json({ error: 'File tidak ditemukan dalam request' });
        }

        const fileUrl = `/uploads/${req.file.filename}`;

        const newDoc = await prisma.document.create({
        data: { title, fileUrl, status }
        });

        res.status(201).json(newDoc);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.getAllDocuments = async (req, res) => {
    try {
    const docs = await prisma.document.findMany();
    res.json(docs);
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
};

exports.deleteDocuments = async (req, res) => {
    const { id } = req.params;

    try {
    const document = await prisma.document.findUnique({ where: { id: Number(id) } });
    if (!document) return res.status(404).json({ error: 'Dokumen tidak ditemukan' });

    // Hapus file fisik
    const filePath = path.join(__dirname, '../../', document.fileUrl);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    // Hapus dari database
    await prisma.document.delete({ where: { id: Number(id) } });

    res.json({ message: 'Dokumen berhasil dihapus' });
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
};

exports.updateDocuments = async (req, res) => {
    const { id } = req.params;
    const { title, status } = req.body;

    try {
        const updated = await prisma.document.update({
        where: { id: Number(id) },
        data: { title, status }
        });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.filterDocuments = async (req, res) => {
    const { status, sortField, sortOrder } = req.query;

    try {
        const where = {};
        const orderBy = [];

        if (status) {
            where.status = status;
        }

        if (sortField && sortOrder) {
            if (['title', 'createdAt'].includes(sortField)) {
                orderBy.push({ [sortField]: sortOrder });
            }
        }

        const filteredDocs = await prisma.document.findMany({
            where,
            orderBy
        });

        res.json(filteredDocs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};