import * as XLSX from 'xlsx';
import axios from 'axios';
import { toast } from 'react-toastify';

// Helper: konversi serial number Excel ke JS Date
function excelDateToJSDate(serial) {
    var utc_days = Math.floor(serial - 25569);
    var utc_value = utc_days * 86400;
    var date_info = new Date(utc_value * 1000);

    var fractionalDay = serial - Math.floor(serial);
    var totalSeconds = Math.floor(86400 * fractionalDay);
    var seconds = totalSeconds % 60;
    var minutes = Math.floor(totalSeconds / 60) % 60;
    var hours = Math.floor(totalSeconds / 3600);

    date_info.setHours(hours);
    date_info.setMinutes(minutes);
    date_info.setSeconds(seconds);

    return date_info;
}

// Helper: mapping impact
function mapImpact(val = '') {
    const lc = val.toLowerCase();
    if (lc.includes('aset')) return 'asset';
    if (lc.includes('liabilitas')) return 'liability';
    if (lc.includes('ekuitas') || lc.includes('modal')) return 'equity';
    return 'asset';
}

const handleImport = async (e, onSuccess) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
        try {
            const data = new Uint8Array(evt.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const rows = XLSX.utils.sheet_to_json(sheet);

            // Mapping & validasi kolom
            const cleanRows = rows.map((r, i) => {
                // --- HANDLE TANGGAL ---
                let dateVal = r['Tanggal'];
                let jsDate = null;
                if (typeof dateVal === 'number') {
                    jsDate = excelDateToJSDate(dateVal);
                } else if (typeof dateVal === 'string') {
                    // normalize format, support "dd/mm/yyyy hh:mm" or "yyyy-mm-dd hh:mm"
                    jsDate = new Date(
                        dateVal
                            .replace(/\./g, ':') // replace dot to colon if ada
                            .replace(/\//g, '-') // replace slash to dash
                    );
                }

                let impact = mapImpact(r['Posisi'] || '');
                
                return {
                    type: (r['Jenis'] || '').toLowerCase(),
                    amount: Number(r['Jumlah']),
                    category: r['Kategori'] || '',
                    notes: r['Catatan'] || '',
                    date: jsDate,
                    impact,
                    positionName: (r['Nama Posisi'] || ''),
                };
            }).filter(r =>
                ['income', 'expense'].includes(r.type) &&
                !isNaN(r.amount) &&
                r.category &&
                r.date instanceof Date && !isNaN(r.date)
            );

            if (!cleanRows.length) {
                toast.error('File kosong atau format salah!');
                return;
            }

            // Kirim ke backend
            await axios.post('http://localhost:5000/api/transactions/import', { transactions: cleanRows });
            toast.success('Import berhasil!');
            if (onSuccess) onSuccess();
            // fetch ulang data transaksi kalau perlu
        } catch (err) {
            toast.error('Import gagal: ' + (err.response?.data?.error || err.message));
        }
    };
    reader.readAsArrayBuffer(file);
};

export default handleImport;
