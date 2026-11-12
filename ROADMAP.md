# ROADMAP — matematika-ribuan-sd
> Draf 12 Nov 2026. App petualangan bilangan ribuan kelas 3 SD (React 19 + Vite). Publik. Tanpa README (kosong), tanpa OG, tanpa CI.

## 1. Posisi kini
- 5 lab: `PlaceValueLab`, `ComparisonSortArena`, `ColumnMathLab`, `RoundingRollercoaster`, `StoryDetectiveLab` + `QuizArena` + `TeacherSummarySheet`.
- Domain terpisah: `addition/subtraction/comparison/placeValue/rounding/numericInput` + `quizSession` v1 + `progress` + `questionBankValidation`.
- Bank ~33 soal 5 kategori (`nilai-tempat/banding-urut/hitung-bersusun/pembulatan/soal-cerita`) × 3 kesulitan.
- `NumberInput`, `AccessibleDialog`, SFX + storage defensif. 4 file test (~5.100 LOC src).
- ESLint + jsx-a11y + `typecheck`; belum ada workflow CI; belum ada `robots.txt`/`sitemap.xml`/OG.

## 2. Fase 1 — Fondasi (v1.1)
- [ ] Tulis README: deskripsi, `npm ci/dev/test/build`, struktur `src/domain`, cakupan kurikulum.
- [ ] Tambah workflow CI: `lint (max-warnings=0) + typecheck + test + build`.
- [ ] Audit cakupan bank: target minimal 8 soal per kategori × minimal 2 per kesulitan; tambah yang bolong.
- [ ] Tambah meta OG + `robots.txt` + `sitemap.xml` + thumbnail pratinjau.
- [ ] Uji `NumberInput` di Android kelas bawah (keyboard numerik, validasi input, tanpa crash).

## 3. Fase 2 — Kelas nyata (v1.2)
- [ ] Tambah soal cerita kontekstual (+ilustrasi `story`) minimal 12 soal.
- [ ] Mode ujian berwaktu 10 soal (pakai ulang pola `quizSession.viewMode='exam'`).
- [ ] Cetak lembar kerja via print-CSS (soal + kunci guru terpisah).
- [ ] Ekspor rekap guru (CSV) dari `TeacherSummarySheet`.
- [ ] Mode "langkah bersusun" beranimasi di `ColumnMathLab` (pinjam/simpan sebagai langkah, bukan teks statis).

## 4. Fase 3 — Naik level (v2.0)
- [ ] Level lanjut: puluhan ribu (5 digit) sebagai kategori terkunci berbasis progres.
- [ ] PWA offline untuk lab + bank soal.
- [ ] Bank soal berversi + migrasi defensif (ikuti pola `quizSession.version`).

## 5. Definisi selesai
- Fase 1: README + CI hijau + matriks cakupan bank penuh (laporan dari `questionBankValidation`).
- Fase 2: 1 guru kelas 3 uji di kelas; lembar cetak dipakai tanpa revisi konten.
- Fase 3: PWA terinstal; regresi: progres lama tetap terbaca setelah migrasi.
