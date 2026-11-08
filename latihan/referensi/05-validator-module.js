// Latihan 05: class validator yang dipisah dengan export/import
// KelasValidator lives in its own file (kelasValidator.js) and is imported here.

import { KelasValidator } from './kelasValidator.js';

for (const kelas of ["JavaScript Fundamentals", "Python Advanced"]) {
  console.log(`${kelas}: ${KelasValidator.isValidKelas(kelas)}`);
}
