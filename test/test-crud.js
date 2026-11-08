import test from 'node:test';
import assert from 'node:assert/strict';
import { tambahPeserta, ubahPeserta, hapusPeserta, tambahNilai, getRiwayatTes } from '../utils/pesertaCrud.js';
import { getUniquePeserta } from '../utils/pesertaProcessor.js';
import { PesertaValidator } from '../utils/pesertaValidator.js';

const biodata = { name: 'Ayu', email: 'ayu@example.com', class: 'JavaScript', score: 90 };
const awal = () => tambahPeserta([], biodata);

test('tambah peserta menormalkan biodata dan membuat ID tes pertama', () => {
  assert.deepEqual(tambahPeserta([], { ...biodata, name: ' Ayu ', email: ' AYU@EXAMPLE.COM ', class: ' JavaScript ' }), [{ id: 1, ...biodata }]);
});

test('ID mengikuti nilai terbesar, bukan jumlah atau urutan terakhir', () => {
  const list = [{ ...biodata, id: 20 }, { ...biodata, id: 3, score: 85 }];
  assert.equal(tambahNilai(list, biodata.email, 80).at(-1).id, 21);
  assert.equal(tambahPeserta(list, { ...biodata, email: 'budi@example.com' }).at(-1).id, 21);
});

test('email duplikat ditolak setelah normalisasi', () => {
  assert.throws(() => tambahPeserta(awal(), { ...biodata, email: ' AYU@EXAMPLE.COM ' }), /sudah terdaftar/);
});

test('tes ulang 90 ke 79 ke 80 mempertahankan riwayat dan status terakhir', () => {
  const turun = tambahNilai(awal(), ' AYU@EXAMPLE.COM ', 79);
  assert.equal(PesertaValidator.getStatus(getUniquePeserta(turun)[0].score), 'TIDAK LULUS');
  const lulus = tambahNilai(turun, biodata.email, 80);
  assert.equal(PesertaValidator.getStatus(getUniquePeserta(lulus)[0].score), 'LULUS');
  assert.deepEqual(getRiwayatTes(lulus, biodata.email).map(({ score }) => score), [90, 79, 80]);
});

test('nilai nol dan batas 100 diterima', () => {
  assert.equal(tambahPeserta([], { ...biodata, score: 0 })[0].score, 0);
  assert.equal(tambahNilai(awal(), biodata.email, 0).at(-1).score, 0);
  assert.equal(tambahNilai(awal(), biodata.email, 100).at(-1).score, 100);
});

test('nilai kosong, nonangka, tak terbatas dan di luar rentang ditolak', () => {
  for (const score of ['', ' ', '80', null, NaN, Infinity, -Infinity, -1, 101]) {
    assert.throws(() => tambahPeserta([], { ...biodata, score }), /Nilai/);
    assert.throws(() => tambahNilai(awal(), biodata.email, score), /Nilai/);
  }
  assert.throws(() => tambahPeserta([], { name: 'Ayu', email: biodata.email, class: 'JS' }), /Nilai/);
});

test('nama, kelas, dan email wajib valid', () => {
  for (const perubahan of [{ name: '' }, { name: 2 }, { class: ' ' }, { class: null }, { email: 'ayu' }, { email: 'a b@example.com' }, { email: null }]) {
    assert.throws(() => tambahPeserta([], { ...biodata, ...perubahan }), /wajib|Email/);
    assert.throws(() => ubahPeserta(awal(), biodata.email, perubahan), /wajib|Email/);
  }
});

test('ubah biodata seluruh riwayat mempertahankan ID, nilai, dan urutan', () => {
  const list = tambahNilai(awal(), biodata.email, 79);
  const hasil = ubahPeserta(list, ' AYU@EXAMPLE.COM ', { name: ' Ayu Baru ', email: ' BARU@EXAMPLE.COM ', class: ' React ', score: 100, id: 200 });
  assert.deepEqual(hasil, list.map(({ id, score }) => ({ id, score, name: 'Ayu Baru', email: 'baru@example.com', class: 'React' })));
  assert.deepEqual(ubahPeserta(list, biodata.email), list);
});

test('perubahan email yang berbenturan ditolak', () => {
  const list = tambahPeserta(awal(), { ...biodata, email: 'budi@example.com' });
  assert.throws(() => ubahPeserta(list, biodata.email, { email: ' BUDI@EXAMPLE.COM ' }), /sudah terdaftar/);
});

test('hapus peserta menghapus seluruh riwayat, peserta lain tetap ada', () => {
  const list = tambahPeserta(tambahNilai(awal(), biodata.email, 79), { ...biodata, email: 'budi@example.com' });
  const hasil = hapusPeserta(list, ' AYU@EXAMPLE.COM ');
  assert.deepEqual(hasil, [list.at(-1)]);
  assert.deepEqual(getUniquePeserta(hasil).map(({ email }) => email), ['budi@example.com']);
});

test('pencarian riwayat memakai email ternormalisasi dan urutan pencatatan', () => {
  const list = tambahNilai(awal(), biodata.email, 79);
  assert.deepEqual(getRiwayatTes(list, ' AYU@EXAMPLE.COM '), list);
});

test('peserta yang tidak ditemukan memberi pesan Indonesia', () => {
  for (const operasi of [ubahPeserta, hapusPeserta, tambahNilai, getRiwayatTes]) {
    assert.throws(() => operasi([], 'hilang@example.com'), /Peserta tidak ditemukan/);
    assert.throws(() => operasi(), /Email/);
  }
});

test('semua operasi menjaga array dan object sumber', () => {
  const list = tambahPeserta(tambahNilai(awal(), biodata.email, 79), { ...biodata, email: 'budi@example.com' });
  const sebelum = structuredClone(list);
  list.forEach(Object.freeze);
  Object.freeze(list);
  const data = Object.freeze({ ...biodata, email: 'cici@example.com' });
  const perubahan = Object.freeze({ name: 'Baru' });
  const hasil = [tambahPeserta(list, data), ubahPeserta(list, biodata.email, perubahan), hapusPeserta(list, biodata.email), tambahNilai(list, biodata.email, 80), getRiwayatTes(list, biodata.email)];
  for (const array of hasil) {
    assert.notEqual(array, list);
    for (const entry of array) entry.name = 'Hasil diubah';
  }
  assert.deepEqual(list, sebelum);
});
