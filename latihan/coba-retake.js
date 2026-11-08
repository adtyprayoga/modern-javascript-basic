// Practice script for BEGINNER_GUIDE.md Step 18.3.
// Edit latihan/peserta-retake.json, then run: node latihan/coba-retake.js
// (npm test does not read this file or that JSON, so experimenting is safe.)

import { loadPeserta } from '../utils/pesertaLoader.js';
import { createPesertaMap } from '../utils/pesertaProcessor.js';
import { displayPeserta } from '../utils/pesertaFormatter.js';

const semuaTes = await loadPeserta(new URL('./peserta-retake.json', import.meta.url));

// Every test, in file order
semuaTes.forEach(({ score }, index) => console.log(`Tes ${index + 1}: ${score}`));

// The Map keeps only the last test per email; the status comes from that one
for (const { name, score } of createPesertaMap(semuaTes).values()) {
  console.log(displayPeserta(name, score));
}
