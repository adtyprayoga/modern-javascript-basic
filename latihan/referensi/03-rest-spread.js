// Latihan 03: destructuring + object rest (ES2018)
// Show a participant without their email: rest collects every other field.

import { loadPeserta } from '../../utils/pesertaLoader.js';
import { getUniquePeserta } from '../../utils/pesertaProcessor.js';

const [pertama] = getUniquePeserta(await loadPeserta());   // array destructuring: first item

const { email, ...tanpaEmail } = pertama;                   // object rest: everything except email
console.log(JSON.stringify(tanpaEmail));
