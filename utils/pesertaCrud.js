const normalisasiEmail = (email = '') => {
  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    throw new Error('Email harus berformat valid.');
  }
  return email.trim().toLowerCase();
};

const teksWajib = (nilai, label) => {
  if (typeof nilai !== 'string' || nilai.trim() === '') {
    throw new Error(`${label} wajib diisi.`);
  }
  return nilai.trim();
};

const validasiNilai = (score) => {
  if (typeof score !== 'number' || !Number.isFinite(score) || score < 0 || score > 100) {
    throw new Error('Nilai harus berupa angka terbatas antara 0 dan 100.');
  }
};

const biodataPeserta = (data = {}) => {
  if (data === null || typeof data !== 'object' || Array.isArray(data)) {
    throw new Error('Biodata peserta harus berupa object.');
  }
  return {
    name: teksWajib(data.name, 'Nama'),
    email: normalisasiEmail(data.email),
    class: teksWajib(data.class, 'Kelas')
  };
};

const cariRiwayat = (list = [], email = '') => {
  const identitas = normalisasiEmail(email);
  const riwayat = list.filter(peserta => normalisasiEmail(peserta.email) === identitas);
  if (riwayat.length === 0) throw new Error('Peserta tidak ditemukan.');
  return riwayat;
};

const idBerikutnya = (list = []) => {
  const id = list.reduce((terbesar, peserta) => Math.max(terbesar, peserta.id), 0) + 1;
  if (!Number.isSafeInteger(id)) throw new Error('ID hasil tes tidak dapat ditambahkan.');
  return id;
};

const salinRiwayat = (list = []) => list.map(peserta => ({ ...peserta }));

/**
 * Tambahkan peserta beserta nilai tes pertamanya tanpa mengubah list sumber.
 * @param {Array} list Riwayat hasil tes.
 * @param {Object} data Biodata dan nilai peserta baru.
 * @returns {Array} Riwayat baru.
 */
export const tambahPeserta = (list = [], data = {}) => {
  const biodata = biodataPeserta(data);
  validasiNilai(data.score);
  const emailTerdaftar = new Set(list.map(peserta => normalisasiEmail(peserta.email)));
  if (emailTerdaftar.has(biodata.email)) throw new Error('Email sudah terdaftar.');
  // ES2018 object spread menyalin data agar riwayat sumber tetap utuh.
  return [...salinRiwayat(list), { id: idBerikutnya(list), ...biodata, score: data.score }];
};

/**
 * Perbarui biodata pada seluruh tes peserta dan pertahankan nilai serta ID.
 * @param {Array} list Riwayat hasil tes.
 * @param {string} email Identitas peserta saat ini.
 * @param {Object} perubahan Biodata yang ingin diubah.
 * @returns {Array} Riwayat baru.
 */
export const ubahPeserta = (list = [], email = '', perubahan = {}) => {
  const riwayat = cariRiwayat(list, email);
  if (perubahan === null || typeof perubahan !== 'object' || Array.isArray(perubahan)) {
    throw new Error('Biodata peserta harus berupa object.');
  }
  const identitas = normalisasiEmail(email);
  const biodata = biodataPeserta({ ...riwayat.at(-1), ...perubahan });
  const emailLain = new Set(list
    .map(peserta => normalisasiEmail(peserta.email))
    .filter(alamat => alamat !== identitas));
  if (emailLain.has(biodata.email)) throw new Error('Email sudah terdaftar.');
  return list.map(peserta => normalisasiEmail(peserta.email) === identitas
    ? { ...peserta, ...biodata }
    : { ...peserta });
};

/**
 * Hapus peserta beserta seluruh hasil tesnya.
 * @param {Array} list Riwayat hasil tes.
 * @param {string} email Identitas peserta.
 * @returns {Array} Riwayat baru tanpa peserta tersebut.
 */
export const hapusPeserta = (list = [], email = '') => {
  cariRiwayat(list, email);
  const identitas = normalisasiEmail(email);
  return salinRiwayat(list.filter(peserta => normalisasiEmail(peserta.email) !== identitas));
};

/**
 * Catat tes ulang di akhir array, termasuk jika nilainya turun.
 * @param {Array} list Riwayat hasil tes.
 * @param {string} email Identitas peserta.
 * @param {number} score Nilai tes baru.
 * @returns {Array} Riwayat baru dengan satu hasil tes tambahan.
 */
export const tambahNilai = (list = [], email = '', score = 0) => {
  const terakhir = cariRiwayat(list, email).at(-1);
  validasiNilai(score);
  return [...salinRiwayat(list), { id: idBerikutnya(list), ...biodataPeserta(terakhir), score }];
};

/**
 * Baca seluruh tes peserta sesuai urutan pencatatan.
 * @param {Array} list Riwayat hasil tes.
 * @param {string} email Identitas peserta.
 * @returns {Array} Salinan riwayat peserta.
 */
export const getRiwayatTes = (list = [], email = '') => salinRiwayat(cariRiwayat(list, email));
