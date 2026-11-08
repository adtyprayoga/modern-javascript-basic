import { mkdir, readFile, rename, unlink, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';

const defaultFile = new URL('../data/peserta.local.json', import.meta.url);
const defaultSeed = new URL('../data/peserta.json', import.meta.url);
const lokasiFile = (file = process.env.PESERTA_DATA_FILE ?? defaultFile) =>
  file instanceof URL ? fileURLToPath(file) : resolve(file);

const validasiRiwayat = (data) => {
  if (data === null || typeof data !== 'object' || !Array.isArray(data.peserta)) {
    throw new Error('Struktur data harus berupa object dengan array peserta.');
  }
  const ids = new Set();
  const identitas = new Map();
  return data.peserta.map((peserta) => {
    if (peserta === null || typeof peserta !== 'object' || Array.isArray(peserta)) {
      throw new Error('Setiap hasil tes harus berupa object.');
    }
    const { id, name, email, class: className, score } = peserta;
    if (!Number.isSafeInteger(id) || id <= 0 || ids.has(id)) {
      throw new Error('ID hasil tes harus bilangan bulat positif yang unik dan aman.');
    }
    if (typeof name !== 'string' || !name.trim() || typeof className !== 'string' || !className.trim()) {
      throw new Error('Nama dan kelas wajib diisi.');
    }
    if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      throw new Error('Email harus berformat valid.');
    }
    if (typeof score !== 'number' || !Number.isFinite(score) || score < 0 || score > 100) {
      throw new Error('Nilai harus berupa angka terbatas antara 0 dan 100.');
    }
    const alamat = email.trim().toLowerCase();
    const biodata = { name: name.trim(), class: className.trim() };
    const sebelumnya = identitas.get(alamat);
    if (sebelumnya && (sebelumnya.name !== biodata.name || sebelumnya.class !== biodata.class)) {
      throw new Error('Biodata dalam seluruh riwayat peserta harus konsisten.');
    }
    ids.add(id);
    identitas.set(alamat, biodata);
    return { id, name: biodata.name, email: alamat, class: biodata.class, score };
  });
};

/**
 * Muat riwayat tervalidasi; buat file kerja dari seed hanya jika belum ada.
 * @param {URL|string} fileUrl File kerja, atau PESERTA_DATA_FILE jika tidak diberikan.
 * @param {URL|string} seedUrl File data contoh.
 * @returns {Promise<Array>} Riwayat tes sesuai urutan pencatatan.
 */
export const loadStore = async (fileUrl, seedUrl = defaultSeed) => {
  const file = lokasiFile(fileUrl);
  let isi;
  try {
    isi = await readFile(file, 'utf8');
  } catch (error) {
    if (error.code !== 'ENOENT') throw new Error(`Gagal membaca data peserta: ${error.message}`, { cause: error });
    try {
      const seed = await readFile(lokasiFile(seedUrl), 'utf8');
      const list = validasiRiwayat(JSON.parse(seed));
      await saveStore(list, file);
      return list;
    } catch (seedError) {
      throw new Error(`Gagal menginisialisasi data peserta: ${seedError.message}`, { cause: seedError });
    }
  }
  try {
    return validasiRiwayat(JSON.parse(isi));
  } catch (error) {
    throw new Error(`Data peserta tidak valid: ${error.message}`, { cause: error });
  }
};

/**
 * Simpan riwayat melalui file sementara agar kegagalan tidak merusak file lama.
 * @param {Array} list Riwayat tes yang akan disimpan.
 * @param {URL|string} fileUrl File kerja, atau PESERTA_DATA_FILE jika tidak diberikan.
 * @returns {Promise<void>} Selesai setelah rename berhasil.
 */
export const saveStore = async (list = [], fileUrl) => {
  const peserta = validasiRiwayat({ peserta: list });
  const file = lokasiFile(fileUrl);
  const sementara = `${file}.${randomUUID()}.tmp`;
  try {
    await mkdir(dirname(file), { recursive: true });
    await writeFile(sementara, `${JSON.stringify({ peserta }, null, 2)}\n`, { flag: 'wx' });
    await rename(sementara, file);
  } catch (error) {
    await unlink(sementara).catch(() => {});
    throw new Error(`Gagal menyimpan data peserta: ${error.message}`, { cause: error });
  }
};
