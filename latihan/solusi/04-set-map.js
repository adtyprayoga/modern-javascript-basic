// Latihan 04: Set untuk deduplikasi, Map untuk index peserta

import { loadPeserta } from '../../utils/pesertaLoader.js';
import { createPesertaMap } from '../../utils/pesertaProcessor.js';

const rawPeserta = await loadPeserta();

// Set keeps each class name once
const kelasUnik = new Set(rawPeserta.map(({ class: className }) => className));
console.log(`Jumlah kelas: ${kelasUnik.size}`);

// Map gives a direct lookup by email (latest entry wins)
const pesertaMap = createPesertaMap(rawPeserta);
console.log(`zaim@brainmatics.com: ${pesertaMap.get("zaim@brainmatics.com").score}`);
