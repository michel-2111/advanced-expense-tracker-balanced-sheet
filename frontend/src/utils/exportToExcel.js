import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export default function exportToExcel(data, fileName = 'dokumen-arsip.xlsx') {
    // Format data agar hanya field yang dibutuhkan
    const formattedData = data.map((doc, index) => ({
        No: index + 1,
        Judul: doc.title,
        'Link File': `http://localhost:5000${doc.fileUrl}`,
        'Tanggal Upload': new Date(doc.createdAt).toLocaleDateString('id-ID'),
        Status: doc.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Dokumen');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });

    saveAs(dataBlob, fileName);
    }
