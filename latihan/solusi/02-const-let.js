// Latihan 02: const dan let
// const for values that never change; let for the counter, because it goes up.

import { loadPeserta } from '../../utils/pesertaLoader.js';
import { getUniquePeserta } from '../../utils/pesertaProcessor.js';
import { PesertaValidator } from '../../utils/pesertaValidator.js';

const pesertaUnik = getUniquePeserta(await loadPeserta());

let jumlahLulus = 0;
for (const { score } of pesertaUnik) {
  if (PesertaValidator.getStatus(score) === "LULUS") jumlahLulus++;
}

console.log(`Jumlah LULUS: ${jumlahLulus}`);
