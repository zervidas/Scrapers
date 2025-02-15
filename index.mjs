import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const modules = {};

// Fungsi untuk memuat semua file dalam `category/`
async function loadModules(dir, base = '') {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            await loadModules(fullPath, `${base}${file}/`);
        } else if (file.endsWith('.js')) {
            const moduleName = path.basename(file, '.js');
            const module = await import(`file://${fullPath}`);

            const cleanBase = base.replace(/\/$/, '');
            if (!modules[cleanBase]) modules[cleanBase] = {};
            modules[cleanBase][moduleName] = module.default || module;
        }
    }
}

// Load semua modul dari folder `category`
await loadModules(path.join(__dirname, 'category'));

export default modules;
