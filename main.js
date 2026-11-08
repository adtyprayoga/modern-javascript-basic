import { createInterface } from 'node:readline';
import { loadStore, saveStore } from './utils/pesertaStore.js';
import { tambahPeserta, ubahPeserta, hapusPeserta, tambahNilai, getRiwayatTes } from './utils/pesertaCrud.js';
import { getUniqueEmails, getUniquePeserta, createPesertaMap, getPesertaByClass, calculateAverageScore } from './utils/pesertaProcessor.js';
import { displayPeserta, createPesertaSummary, formatPesertaList, createDetailedReport } from './utils/pesertaFormatter.js';
import { PesertaValidator, createPassingValidator, createLenientValidator } from './utils/pesertaValidator.js';

let riwayat;
try {
  riwayat = await loadStore();
} catch (error) {
  console.error(`❌ ${error.message}`);
  process.exit(1);
}

const pembaca = createInterface({ input: process.stdin, crlfDelay: Infinity });
// Satu iterator menjaga urutan jawaban, termasuk input yang dikirim sekaligus.
const jawaban = pembaca[Symbol.asyncIterator]();
const akhirInput = Symbol('akhir input');
const baca = async (pertanyaan = '') => {
  process.stdout.write(pertanyaan);
  const { value, done } = await jawaban.next();
  if (done) throw akhirInput;
  return value.trim();
};
const bacaEmail = async (pertanyaan = 'Email peserta: ') => (await baca(pertanyaan)).toLowerCase();
const bacaNilai = async () => {
  const input = await baca('Nilai (0–100): ');
  if (input === '') throw new Error('Nilai wajib diisi.');
  return Number(input);
};
const cariPeserta = (email = '') => {
  const peserta = createPesertaMap(riwayat).get(email);
  if (!peserta) throw new Error('Peserta tidak ditemukan.');
  return peserta;
};
const simpan = async (hasil = [], pesan = '') => {
  // Memori baru berubah setelah penyimpanan berhasil.
  await saveStore(hasil);
  riwayat = hasil;
  console.log(pesan);
};

console.log('🎓 SISTEM MANAJEMEN PESERTA TRAINING BRAINMATICS');
try {
  let berjalan = true;
  while (berjalan) {
    console.log(`
1. Daftar peserta
2. Detail peserta dan riwayat tes
3. Tambah peserta
4. Ubah biodata peserta
5. Catat tes ulang
6. Hapus peserta
7. Filter berdasarkan kelas
8. Statistik dan validasi
0. Keluar`);
    try {
      const pilihan = await baca('Pilihan: ');
      switch (pilihan) {
        case '0':
          berjalan = false;
          break;
        case '1': {
          console.log(`Jumlah peserta unik: ${getUniqueEmails(riwayat).length}`);
          console.log(formatPesertaList(getUniquePeserta(riwayat)));
          break;
        }
        case '2': {
          const email = await bacaEmail();
          const peserta = cariPeserta(email);
          console.log(createDetailedReport(peserta));
          console.log(createPesertaSummary(peserta));
          console.log('Riwayat tes (urutan pencatatan):');
          for (const { id, name, score } of getRiwayatTes(riwayat, email)) {
            console.log(`Tes ID ${id}: ${displayPeserta(name, score)}`);
          }
          break;
        }
        case '3': {
          const name = await baca('Nama: ');
          const email = await bacaEmail('Email: ');
          const className = await baca('Kelas: ');
          const score = await bacaNilai();
          await simpan(tambahPeserta(riwayat, { name, email, class: className, score }), 'Peserta berhasil ditambahkan.');
          break;
        }
        case '4': {
          const email = await bacaEmail();
          const peserta = cariPeserta(email);
          console.log('Kosongkan isian untuk mempertahankan biodata.');
          const name = await baca(`Nama [${peserta.name}]: `);
          const emailBaru = await bacaEmail(`Email [${peserta.email}]: `);
          const className = await baca(`Kelas [${peserta.class}]: `);
          const perubahan = {
            name: name === '' ? peserta.name : name,
            email: emailBaru === '' ? peserta.email : emailBaru,
            class: className === '' ? peserta.class : className
          };
          await simpan(ubahPeserta(riwayat, email, perubahan), 'Biodata peserta berhasil diperbarui.');
          break;
        }
        case '5': {
          const email = await bacaEmail();
          cariPeserta(email);
          const score = await bacaNilai();
          await simpan(tambahNilai(riwayat, email, score), 'Tes ulang berhasil dicatat.');
          break;
        }
        case '6': {
          const email = await bacaEmail();
          const peserta = cariPeserta(email);
          const konfirmasi = await baca(`Hapus ${peserta.name} dan seluruh riwayat? Ketik ya: `);
          if (konfirmasi.toLowerCase() !== 'ya') {
            console.log('Penghapusan dibatalkan.');
            break;
          }
          await simpan(hapusPeserta(riwayat, email), 'Peserta dan seluruh riwayat berhasil dihapus.');
          break;
        }
        case '7': {
          const className = await baca('Kelas: ');
          console.log(formatPesertaList(getPesertaByClass(getUniquePeserta(riwayat), className)));
          break;
        }
        case '8': {
          const pesertaUnik = getUniquePeserta(riwayat);
          const standar = createPassingValidator();
          const rentang = createLenientValidator();
          const ringkasan = standar.validateBatch(pesertaUnik);
          console.log(`Jumlah peserta: ${ringkasan.total}`);
          console.log(`Rata-rata nilai terakhir: ${calculateAverageScore(pesertaUnik)}`);
          console.log(`LULUS (nilai >=80): ${ringkasan.valid}; TIDAK LULUS: ${ringkasan.invalid}`);
          console.log('Pemeriksaan rentang 60–100 terpisah dari kelulusan >=80.');
          for (const { name, score } of pesertaUnik) {
            const status = PesertaValidator.getStatus(score);
            console.log(`${name}: ${status}; status valid: ${PesertaValidator.isValidStatus(status)}`);
            console.log(standar.formatResult(name, score));
            console.log(`Rentang 60–100: ${rentang.formatResult(name, score)}`);
            console.log(`Nilai dalam rentang: ${rentang.isValidScore(score)}; ${rentang.getValidationDetails(score).message}`);
          }
          break;
        }
        default:
          console.log('Pilihan tidak valid. Masukkan angka 0–8.');
      }
    } catch (error) {
      if (error === akhirInput) {
        console.log('\nInput berakhir. Operasi dibatalkan.');
        break;
      }
      console.error(`❌ ${error.message}`);
    }
  }
} finally {
  pembaca.close();
}
console.log('Sampai jumpa.');
