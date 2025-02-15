async function loadModule() {
    const modules = await import('./index.mjs'); // Ambil dari ESM
    module.exports = modules.default; // Ekspor sebagai CommonJS
}

// Jalankan fungsi untuk load modul
loadModule();
