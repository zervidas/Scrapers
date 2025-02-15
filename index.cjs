const modules = await import('./index.mjs'); // Ambil dari ESM
module.exports = modules.default; // Ekspor sebagai CommonJS
