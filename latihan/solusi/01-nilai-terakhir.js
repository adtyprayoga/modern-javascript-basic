// Latihan 01: Lulus atau Tidak Lulus dari nilai tes terakhir
// Rina took the test three times (70, 76, 82). Only the last test counts.

import { loadPeserta } from '../../utils/pesertaLoader.js';
import { getUniquePeserta } from '../../utils/pesertaProcessor.js';
import { displayPeserta } from '../../utils/pesertaFormatter.js';

const semuaTes = await loadPeserta(new URL('../peserta-retake.json', import.meta.url));

// getUniquePeserta keeps the LAST entry per email (Map.set overwrites), so only score 82 remains
for (const { name, score } of getUniquePeserta(semuaTes)) {
  console.log(displayPeserta(name, score));
}
