// Latihan 02: const/let dan function dengan default parameter
// const for values that never change; let for the counter, because it goes up.
// Default parameter (ES6): hitungLulus() with no argument uses an empty list.

import { loadPeserta } from '../../utils/pesertaLoader.js';
import { getUniquePeserta } from '../../utils/pesertaProcessor.js';
import { PesertaValidator } from '../../utils/pesertaValidator.js';

const hitungLulus = (pesertaList = []) => {
  let jumlah = 0;
  for (const { score } of pesertaList) {
    if (PesertaValidator.getStatus(score) === "LULUS") jumlah++;
  }
  return jumlah;
};

const pesertaUnik = getUniquePeserta(await loadPeserta());

console.log(`Jumlah LULUS: ${hitungLulus(pesertaUnik)}`);
console.log(`Jumlah LULUS (tanpa data): ${hitungLulus()}`);
