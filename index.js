import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const modules = {};

// Fungsi untuk memuat semua file JS dalam `category/`
async function loadModules(dir, base = '') {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            // Jika folder, rekursi dengan path base agar namespace tetap rapi
            await loadModules(fullPath, `${base}${file}/`);
        } else if (file.endsWith('.js')) {
            // Jika file JS, import dan tambahkan ke objek ekspor dengan struktur folder
            const moduleName = path.basename(file, '.js'); // Ambil nama file tanpa ekstensi
            const module = await import(`file://${fullPath}`); // ESM import harus pakai URL
            
            // Simpan modul dengan namespace berdasarkan foldernya
            if (!modules[base]) modules[base] = {};
            modules[base][moduleName] = module.default || module;
        }
    }
}

// Load semua modul dari folder `category`
await loadModules(path.join(__dirname, 'category'));

export default modules;
