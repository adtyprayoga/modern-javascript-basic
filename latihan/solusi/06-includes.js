// Latihan 06: validasi status dengan includes() (ES2016)
// Keep only the statuses that are in PesertaValidator.STATUS (case-sensitive).

import { PesertaValidator } from '../../utils/pesertaValidator.js';

const statusMasuk = ["LULUS", "lulus", "TIDAK LULUS", "PENDING"];
const statusSah = statusMasuk.filter((status) => PesertaValidator.isValidStatus(status));

console.log(JSON.stringify(statusSah));
