// src/utils/exportToExcelF.js
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export default function exportToExcelF(data, fileName = 'data.xlsx', columns = null) {
    // Jika columns ada, mapping data sesuai columns
    const formattedData = columns
        ? data.map((item, idx) => {
            const row = {};
            columns.forEach(col => {
                if (col.key === 'No') row['No'] = idx + 1;
                else if (typeof col.format === 'function') row[col.label] = col.format(item[col.key], item);
                else row[col.label] = item[col.key];
            });
            return row;
        })
        : data;
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(dataBlob, fileName);
}
