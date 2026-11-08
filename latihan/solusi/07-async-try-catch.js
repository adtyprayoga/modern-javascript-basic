// Latihan 07: async/await + try/catch, ?. dan ??
// Load a file that does not exist, recover with an empty list, then read safely.

import { loadPeserta } from '../../utils/pesertaLoader.js';

let peserta = [];   // let: replaced inside try if loading works
try {
  peserta = await loadPeserta(new URL('../tidak-ada.json', import.meta.url));
} catch {
  console.log("Data tidak bisa dimuat, memakai daftar kosong");
}

// ?. : peserta[0] is undefined, so stop instead of crashing; ?? : fall back to a text
console.log(`Peserta pertama: ${peserta[0]?.name ?? "tidak ada"}`);
