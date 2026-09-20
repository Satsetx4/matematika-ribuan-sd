export interface Question {
  id: string;
  category: 'nilai-tempat' | 'banding-urut' | 'hitung-bersusun' | 'pembulatan' | 'soal-cerita';
  difficulty: 'mudah' | 'sedang' | 'tantangan';
  question: string;
  options: string[];
  correctAnswer: number; // 0, 1, 2, or 3
  explanation: string;
  teacherTip: string;
  illustrationType?: 'place-value' | 'comparison' | 'column' | 'rounding' | 'story';
  metadata?: {
    num1?: number;
    num2?: number;
    targetDigit?: number;
  };
}

export const QUESTION_BANK: Question[] = [
  // ==========================================
  // KATEGORI 1: NILAI TEMPAT & NILAI ANGKA
  // ==========================================
  {
    id: 'nt-01',
    category: 'nilai-tempat',
    difficulty: 'mudah',
    question: 'Pada bilangan 3.625, angka yang menempati tempat ratusan adalah...',
    options: ['3', '6', '2', '5'],
    correctAnswer: 1,
    explanation: 'Pada bilangan 3.625:\n• 3 menempati tempat Ribuan\n• 6 menempati tempat Ratusan\n• 2 menempati tempat Puluhan\n• 5 menempati tempat Satuan.\nJadi, angka yang menempati tempat ratusan adalah 6.',
    teacherTip: 'Urutkan dari kanan: Satuan (5) → Puluhan (2) → Ratusan (6) → Ribuan (3). Ratusan ada di posisi kedua dari kiri!',
    illustrationType: 'place-value'
  },
  {
    id: 'nt-02',
    category: 'nilai-tempat',
    difficulty: 'mudah',
    question: 'Nilai angka 7 pada bilangan 5.768 adalah...',
    options: ['7', '70', '700', '7.000'],
    correctAnswer: 2,
    explanation: 'Angka 7 menempati tempat ratusan. Karena berada di tempat ratusan, maka nilai angkanya adalah 7 × 100 = 700.',
    teacherTip: 'Ingat beda Nilai Tempat (nama posisi: "Ratusan") dengan Nilai Angka (jumlah nilai: "700")!',
    illustrationType: 'place-value'
  },
  {
    id: 'nt-03',
    category: 'nilai-tempat',
    difficulty: 'sedang',
    question: 'Bentuk panjang dari bilangan 4.782 adalah...',
    options: [
      '4.000 + 70 + 800 + 2',
      '4.000 + 700 + 80 + 2',
      '400 + 700 + 80 + 2',
      '4.000 + 700 + 8 + 20'
    ],
    correctAnswer: 1,
    explanation: 'Bentuk panjang diperoleh dengan menjumlahkan seluruh nilai angka tiap tempatnya:\n4 ribuan = 4.000\n7 ratusan = 700\n8 puluhan = 80\n2 satuan = 2\nMaka: 4.782 = 4.000 + 700 + 80 + 2.',
    teacherTip: 'Uraikan angka sesuai sebutan membacanya: "Empat ribu (4.000) tujuh ratus (700) delapan puluh (80) dua (2)".',
    illustrationType: 'place-value'
  },
  {
    id: 'nt-04',
    category: 'nilai-tempat',
    difficulty: 'sedang',
    question: 'Bilangan yang terbentuk dari 9 ribuan + 6 ratusan + 4 puluhan + 0 satuan adalah...',
    options: ['9.604', '9.064', '9.640', '9.460'],
    correctAnswer: 2,
    explanation: '• 9 ribuan = 9.000\n• 6 ratusan = 600\n• 4 puluhan = 40\n• 0 satuan = 0\nJika digabungkan menjadi: 9.640.',
    teacherTip: 'Tuliskan satu per satu di kolom tempatnya: [9][6][4][0] = 9.640.',
    illustrationType: 'place-value'
  },
  {
    id: 'nt-05',
    category: 'nilai-tempat',
    difficulty: 'tantangan',
    question: 'Sebuah bilangan ribuan memiliki angka 5 di tempat puluhan, angka 2 di tempat ribuan, angka 8 di tempat satuan, dan angka 0 di tempat ratusan. Bilangan tersebut adalah...',
    options: ['5.208', '2.058', '2.508', '8.052'],
    correctAnswer: 1,
    explanation: 'Susun sesuai posisinya:\n• Ribuan = 2\n• Ratusan = 0\n• Puluhan = 5\n• Satuan = 8\nMaka bilangan tersebut adalah 2.058.',
    teacherTip: 'Hati-hati jangan terkecoh urutan soal! Buat 4 kotak kosong [_][_][_][_], lalu isi: [Ribuan=2][Ratusan=0][Puluhan=5][Satuan=8].',
    illustrationType: 'place-value'
  },
  {
    id: 'nt-06',
    category: 'nilai-tempat',
    difficulty: 'tantangan',
    question: 'Selisih nilai angka 6 pada bilangan 6.365 adalah...',
    options: ['5.940', '6.000', '5.400', '5.960'],
    correctAnswer: 0,
    explanation: 'Pada bilangan 6.365 terdapat dua angka 6:\n• Angka 6 pertama ada di tempat ribuan nilainya = 6.000\n• Angka 6 kedua ada di tempat puluhan nilainya = 60\nSelisih = 6.000 - 60 = 5.940.',
    teacherTip: 'Selisih artinya bilangan yang besar dikurangi yang kecil: 6.000 - 60 = 5.940.',
    illustrationType: 'place-value'
  },
  {
    id: 'nt-07',
    category: 'nilai-tempat',
    difficulty: 'mudah',
    question: 'Bilangan "Tujuh ribu lima ratus empat belas" jika ditulis dalam lambang bilangan adalah...',
    options: ['7.514', '7.541', '7.054', '7.540'],
    correctAnswer: 0,
    explanation: '• Tujuh ribu = 7.000\n• Lima ratus = 500\n• Empat belas = 14\nJika digabungkan menjadi: 7.514.',
    teacherTip: 'Perhatikan kata "empat belas" (14), bukan "empat puluh" (40)!',
    illustrationType: 'place-value'
  },

  // ==========================================
  // KATEGORI 2: MEMBANDINGKAN & MENGURUTKAN
  // ==========================================
  {
    id: 'bu-01',
    category: 'banding-urut',
    difficulty: 'mudah',
    question: 'Tanda perbandingan yang tepat untuk 2.470 ... 2.350 adalah...',
    options: ['>', '<', '=', '≤'],
    correctAnswer: 0,
    explanation: 'Bandingkan dari tempat terbesar:\n1. Angka ribuan: sama-sama 2\n2. Angka ratusan: 4 ratusan pada 2.470 lebih besar dari 3 ratusan pada 2.350 (4 > 3)\nMaka: 2.470 > 2.350.',
    teacherTip: 'Mulut buaya (>) selalu membuka lebar ke arah angka yang lebih besar yaitu 2.470!',
    illustrationType: 'comparison'
  },
  {
    id: 'bu-02',
    category: 'banding-urut',
    difficulty: 'mudah',
    question: 'Tanda perbandingan yang tepat untuk 2.100 ... 2.250 adalah...',
    options: ['>', '<', '=', '≥'],
    correctAnswer: 1,
    explanation: 'Angka ribuan sama (2). Pada tempat ratusan, 1 ratusan lebih kecil dari 2 ratusan (1 < 2). Jadi 2.100 < 2.250.',
    teacherTip: 'Ujung lancip (<) menunjuk ke angka yang lebih kecil yaitu 2.100.',
    illustrationType: 'comparison'
  },
  {
    id: 'bu-03',
    category: 'banding-urut',
    difficulty: 'sedang',
    question: 'Di antara bilangan berikut, manakah bilangan yang nilainya paling kecil?',
    options: ['3.250', '1.978', '4.005', '2.750'],
    correctAnswer: 1,
    explanation: 'Bandingkan angka ribuannya terlebih dahulu:\n• 3.250 ribuannya 3\n• 1.978 ribuannya 1\n• 4.005 ribuannya 4\n• 2.750 ribuannya 2\nKarena 1 adalah angka ribuan terkecil, maka 1.978 adalah yang paling kecil.',
    teacherTip: 'Cukup lihat angka paling kiri (ribuan)! Angka 1 paling kecil di antara 3, 4, dan 2.',
    illustrationType: 'comparison'
  },
  {
    id: 'bu-04',
    category: 'banding-urut',
    difficulty: 'sedang',
    question: 'Urutan bilangan 2.350, 2.200, 2.470, 2.100, 2.250 dari yang TERKECIL ke TERBESAR adalah...',
    options: [
      '2.470, 2.350, 2.250, 2.200, 2.100',
      '2.100, 2.200, 2.250, 2.350, 2.470',
      '2.100, 2.250, 2.200, 2.350, 2.470',
      '2.200, 2.100, 2.250, 2.350, 2.470'
    ],
    correctAnswer: 1,
    explanation: 'Semua memiliki angka ribuan 2. Urutkan berdasarkan ratusan dan puluhannya:\n1. 2.100\n2. 2.200\n3. 2.250\n4. 2.350\n5. 2.470\nUrutan ini disebut juga urutan menaik.',
    teacherTip: 'Urutan dari terkecil ke terbesar disebut urutan MENAIK (seperti naik tangga).',
    illustrationType: 'comparison'
  },
  {
    id: 'bu-05',
    category: 'banding-urut',
    difficulty: 'sedang',
    question: 'Urutan bilangan 6.800, 6.400, 6.700, 6.600, 6.900 dari yang TERBESAR ke TERKECIL adalah...',
    options: [
      '6.900, 6.800, 6.700, 6.600, 6.400',
      '6.400, 6.600, 6.700, 6.800, 6.900',
      '6.900, 6.700, 6.800, 6.600, 6.400',
      '6.800, 6.900, 6.700, 6.600, 6.400'
    ],
    correctAnswer: 0,
    explanation: 'Urutan dari yang terbesar ke terkecil (urutan menurun):\n1. 6.900 (ratusan 9)\n2. 6.800 (ratusan 8)\n3. 6.700 (ratusan 7)\n4. 6.600 (ratusan 6)\n5. 6.400 (ratusan 4).',
    teacherTip: 'Cari yang paling juara/terbesar dulu (6.900), lalu mundur ke yang lebih kecil!',
    illustrationType: 'comparison'
  },
  {
    id: 'bu-06',
    category: 'banding-urut',
    difficulty: 'tantangan',
    question: 'Jika 3.A50 > 3.750, maka angka yang mungkin untuk menggantikan huruf A adalah...',
    options: ['5', '6', '7', '8'],
    correctAnswer: 3,
    explanation: 'Karena angka ribuan (3), puluhan (5), dan satuan (0) bernilai sama, maka agar 3.A50 lebih besar dari 3.750, angka ratusan A harus lebih besar dari 7 (A > 7). Di antara pilihan jawaban, angka yang lebih besar dari 7 adalah 8.',
    teacherTip: 'Bandingkan nilai tempat ratusannya: A harus lebih besar dari 7. Berarti A bisa 8 atau 9!',
    illustrationType: 'comparison'
  },

  // ==========================================
  // KATEGORI 3: PENJUMLAHAN & PENGURANGAN BERSUSUN
  // ==========================================
  {
    id: 'hb-01',
    category: 'hitung-bersusun',
    difficulty: 'mudah',
    question: 'Hasil dari 2.346 + 1.527 adalah...',
    options: ['3.863', '3.873', '3.773', '3.883'],
    correctAnswer: 1,
    explanation: 'Hitung bersusun dari satuan:\n• Satuan: 6 + 7 = 13 (tulis 3, simpan 1 di puluhan)\n• Puluhan: 1 (simpanan) + 4 + 2 = 7\n• Ratusan: 3 + 5 = 8\n• Ribuan: 2 + 1 = 3\nHasil = 3.873.',
    teacherTip: 'Pada saat menjumlahkan 6 + 7 = 13, tulis 3 di bawah dan simpan 1 di atas angka 4!',
    illustrationType: 'column'
  },
  {
    id: 'hb-02',
    category: 'hitung-bersusun',
    difficulty: 'mudah',
    question: 'Hasil pengurangan 7.245 - 2.138 adalah...',
    options: ['5.107', '5.117', '5.103', '5.207'],
    correctAnswer: 0,
    explanation: 'Hitung bersusun dari satuan:\n• Satuan: 5 - 8 tidak bisa, pinjam 1 dari puluhan menjadi 15 - 8 = 7\n• Puluhan: 4 sudah dipinjam 1 tinggal 3. 3 - 3 = 0\n• Ratusan: 2 - 1 = 1\n• Ribuan: 7 - 2 = 5\nHasil = 5.107.',
    teacherTip: 'Jika angka atas lebih kecil, pinjam 1 dari sebelahnya. Nilai pinjaman adalah 10!',
    illustrationType: 'column'
  },
  {
    id: 'hb-03',
    category: 'hitung-bersusun',
    difficulty: 'sedang',
    question: 'Hasil dari 4.250 + 1.375 adalah...',
    options: ['5.525', '5.625', '5.615', '5.725'],
    correctAnswer: 1,
    explanation: '• Satuan: 0 + 5 = 5\n• Puluhan: 5 + 7 = 12 (tulis 2, simpan 1)\n• Ratusan: 1 + 2 + 3 = 6\n• Ribuan: 4 + 1 = 5\nHasil = 5.625.',
    teacherTip: 'Jumlahkan angka simpanan 1 ke ratusan: 1 + 2 + 3 = 6.',
    illustrationType: 'column'
  },
  {
    id: 'hb-04',
    category: 'hitung-bersusun',
    difficulty: 'sedang',
    question: 'Hasil dari 8.500 - 1.375 adalah...',
    options: ['7.135', '7.125', '7.225', '7.115'],
    correctAnswer: 1,
    explanation: '• Satuan: 0 - 5 (pinjam puluhan, puluhan pinjam ratusan). 10 - 5 = 5\n• Puluhan: menjadi 9 - 7 = 2\n• Ratusan: 5 menjadi 4 - 3 = 1\n• Ribuan: 8 - 1 = 7\nHasil = 7.125.',
    teacherTip: 'Meminjam dari angka 0: ratusan 5 menjadi 4, puluhan 0 menjadi 9, dan satuan 0 menjadi 10.',
    illustrationType: 'column'
  },
  {
    id: 'hb-05',
    category: 'hitung-bersusun',
    difficulty: 'tantangan',
    question: 'Jika 3.500 + N = 5.850, maka nilai N adalah...',
    options: ['2.350', '2.250', '1.350', '2.450'],
    correctAnswer: 0,
    explanation: 'Untuk mencari bilangan yang belum diketahui pada penjumlahan, kurangkan hasil dengan bilangan yang ada:\nN = 5.850 - 3.500 = 2.350.',
    teacherTip: 'Ingat rumus segitiga penjumlahan: N = Hasil - Bilangan pertama.',
    illustrationType: 'column'
  },
  {
    id: 'hb-06',
    category: 'hitung-bersusun',
    difficulty: 'tantangan',
    question: 'Hitung operasi campuran berikut: 3.450 + 2.150 - 1.600 = ...',
    options: ['4.000', '3.900', '4.100', '3.800'],
    correctAnswer: 0,
    explanation: 'Lakukan secara berurutan dari kiri ke kanan:\n1. 3.450 + 2.150 = 5.600\n2. 5.600 - 1.600 = 4.000\nHasil = 4.000.',
    teacherTip: 'Kerjakan penjumlahan dulu sampai dapat hasilnya (5.600), lalu kurangkan dengan 1.600.',
    illustrationType: 'column'
  },

  // ==========================================
  // KATEGORI 4: PEMBULATAN KE RIBUAN TERDEKAT
  // ==========================================
  {
    id: 'pb-01',
    category: 'pembulatan',
    difficulty: 'mudah',
    question: 'Bilangan 3.241 jika dibulatkan ke ribuan terdekat menjadi...',
    options: ['3.000', '4.000', '3.200', '3.500'],
    correctAnswer: 0,
    explanation: 'Perhatikan angka ratusannya:\nPada 3.241, angka ratusan adalah 2.\nKarena 2 termasuk dalam kelompok 0, 1, 2, 3, 4, maka dibulatkan TURUN.\nSehingga 3.241 dibulatkan menjadi 3.000.',
    teacherTip: 'Aturan emas: Lihat angka ratusan! 0-4 = Turun (ribuan tetap), 5-9 = Naik (ribuan + 1).',
    illustrationType: 'rounding'
  },
  {
    id: 'pb-02',
    category: 'pembulatan',
    difficulty: 'mudah',
    question: 'Bilangan 6.782 jika dibulatkan ke ribuan terdekat menjadi...',
    options: ['6.000', '7.000', '6.800', '6.500'],
    correctAnswer: 1,
    explanation: 'Angka ratusan pada 6.782 adalah 7.\nKarena 7 termasuk dalam kelompok 5, 6, 7, 8, 9, maka dibulatkan NAIK.\nAngka ribuan 6 ditambah 1 menjadi 7, sehingga dibulatkan menjadi 7.000.',
    teacherTip: 'Angka ratusan 7 itu besar (≥ 5), jadi dorong naik ke atas menjadi 7.000!',
    illustrationType: 'rounding'
  },
  {
    id: 'pb-03',
    category: 'pembulatan',
    difficulty: 'sedang',
    question: 'Di antara bilangan berikut, manakah yang jika dibulatkan ke ribuan terdekat menjadi 5.000?',
    options: ['4.350', '4.620', '5.750', '3.900'],
    correctAnswer: 1,
    explanation: 'Mari uji satu per satu:\n• 4.350 (ratusan 3) → dibulatkan jadi 4.000\n• 4.620 (ratusan 6) → dibulatkan naik jadi 5.000 (BENAR!)\n• 5.750 (ratusan 7) → dibulatkan naik jadi 6.000\n• 3.900 (ratusan 9) → dibulatkan naik jadi 4.000.',
    teacherTip: 'Agar menjadi 5.000 dari angka ribuan 4, angka ratusannya harus 5, 6, 7, 8, atau 9.',
    illustrationType: 'rounding'
  },
  {
    id: 'pb-04',
    category: 'pembulatan',
    difficulty: 'sedang',
    question: 'Taksiran hasil penjumlahan 2.315 + 4.620 ke ribuan terdekat adalah...',
    options: ['6.000', '7.000', '8.000', '6.900'],
    correctAnswer: 1,
    explanation: 'Langkah taksiran:\n1. Bulatkan 2.315 (ratusan 3) → 2.000\n2. Bulatkan 4.620 (ratusan 6) → 5.000\n3. Jumlahkan taksirannya: 2.000 + 5.000 = 7.000.',
    teacherTip: 'Bulatkan masing-masing bilangan terlebih dahulu ke ribuan terdekat, baru dijumlahkan!',
    illustrationType: 'rounding'
  },
  {
    id: 'pb-05',
    category: 'pembulatan',
    difficulty: 'tantangan',
    question: 'Sebuah bilangan ribuan jika dibulatkan ke ribuan terdekat menjadi 8.000. Manakah nilai yang mungkin untuk bilangan tersebut?',
    options: ['7.490', '7.590', '8.650', '7.200'],
    correctAnswer: 1,
    explanation: 'Syarat bilangan dibulatkan menjadi 8.000:\n• Jika ribuannya 7, ratusannya harus 5-9 (7.500 s.d. 7.999)\n• Jika ribuannya 8, ratusannya harus 0-4 (8.000 s.d. 8.499)\nPada pilihan jawaban:\n• 7.490 (ratusan 4) → 7.000\n• 7.590 (ratusan 5) → 8.000 (Tepat!)\n• 8.650 (ratusan 6) → 9.000\n• 7.200 (ratusan 2) → 7.000.',
    teacherTip: 'Bilangan 7.590 memiliki angka ratusan 5, sehingga membulat naik menjadi 8.000.',
    illustrationType: 'rounding'
  },
  {
    id: 'pb-06',
    category: 'pembulatan',
    difficulty: 'sedang',
    question: 'Bilangan 5.180 jika dibulatkan ke ribuan terdekat menjadi...',
    options: ['5.000', '6.000', '5.200', '5.100'],
    correctAnswer: 0,
    explanation: 'Perhatikan angka ratusannya:\nPada 5.180, angka ratusan adalah 1.\nKarena 1 termasuk kelompok 0, 1, 2, 3, 4, maka dibulatkan TURUN.\nSehingga 5.180 dibulatkan menjadi 5.000.',
    teacherTip: 'Angka ratusan 1 kecil (< 5), jadi dibulatkan meluncur ke bawah menjadi 5.000.',
    illustrationType: 'rounding'
  },

  // ==========================================
  // KATEGORI 5: DETEKTIF SOAL CERITA
  // ==========================================
  {
    id: 'sc-01',
    category: 'soal-cerita',
    difficulty: 'mudah',
    question: 'Siti mempunyai 4.250 butir kelereng. Ia mendapat lagi 1.375 butir kelereng dari kakaknya. Berapa jumlah kelereng Siti sekarang?',
    options: ['5.625 butir', '5.525 butir', '2.875 butir', '5.615 butir'],
    correctAnswer: 0,
    explanation: 'Langkah 4 Detektif:\n1. BACA: Siti punya kelereng dan mendapat lagi.\n2. PIKIRKAN: Kata "mendapat lagi" artinya operasi PENJUMLAHAN (+).\n3. HITUNG: 4.250 + 1.375 = 5.625.\n4. JAWAB: Jadi, jumlah kelereng Siti sekarang adalah 5.625 butir.',
    teacherTip: 'Kata kunci "mendapat lagi" adalah sinyal pasti untuk operasi PENJUMLAHAN (+).',
    illustrationType: 'story'
  },
  {
    id: 'sc-02',
    category: 'soal-cerita',
    difficulty: 'mudah',
    question: 'Sebuah toko buku memiliki persediaan 9.500 pensil. Sebanyak 2.375 pensil terjual pada hari Senin. Berapa pensil yang masih tersisa?',
    options: ['7.225 pensil', '7.125 pensil', '7.135 pensil', '11.875 pensil'],
    correctAnswer: 1,
    explanation: 'Langkah 4 Detektif:\n1. BACA: Ada 9.500 pensil, lalu terjual 2.375.\n2. PIKIRKAN: Kata "terjual / tersisa" artinya operasi PENGURANGAN (-).\n3. HITUNG: 9.500 - 2.375 = 7.125.\n4. JAWAB: Jadi, pensil yang masih tersisa adalah 7.125 pensil.',
    teacherTip: 'Kata kunci "terjual" dan "tersisa" selalu menandakan operasi PENGURANGAN (-).',
    illustrationType: 'story'
  },
  {
    id: 'sc-03',
    category: 'soal-cerita',
    difficulty: 'sedang',
    question: 'Bayu mempunyai uang Rp3.650. Ia membeli buku tulis seharga Rp1.175. Berapa sisa uang kembalian yang dimiliki Bayu?',
    options: ['Rp2.475', 'Rp2.485', 'Rp2.575', 'Rp4.825'],
    correctAnswer: 0,
    explanation: 'Rumus Soal Uang:\nUang Awal - Uang Digunakan = Uang Tersisa / Kembalian\nRp3.650 - Rp1.175 = Rp2.475.\nJadi, uang Bayu yang tersisa adalah Rp2.475.',
    teacherTip: 'Dalam soal uang belanja: Sisa uang = Uang mula-mula dikurangi belanjaan.',
    illustrationType: 'story'
  },
  {
    id: 'sc-04',
    category: 'soal-cerita',
    difficulty: 'sedang',
    question: 'Pak Budi memanen 4.250 buah mangga. Ia membeli lagi 1.375 buah mangga dari petani lain. Kemudian, sebanyak 2.150 mangga dibagikan kepada warga. Berapa sisa buah mangga Pak Budi sekarang?',
    options: ['3.475 buah', '3.575 buah', '5.625 buah', '3.375 buah'],
    correctAnswer: 0,
    explanation: 'Soal Cerita 2 Tahap:\n• Tahap 1 (Beli lagi = +): 4.250 + 1.375 = 5.625 buah mangga.\n• Tahap 2 (Dibagikan = -): 5.625 - 2.150 = 3.475 buah mangga.\nJadi, sisa buah mangga Pak Budi adalah 3.475 buah.',
    teacherTip: 'Kerjakan bertahap: Tambah dulu stok mangga yang baru dibeli, lalu kurangkan dengan yang dibagikan!',
    illustrationType: 'story'
  },
  {
    id: 'sc-05',
    category: 'soal-cerita',
    difficulty: 'tantangan',
    question: 'Rina mempunyai uang Rp6.450. Ia ingin membeli tempat pensil seharga Rp2.280. Jika ditaksir ke ribuan terdekat, kira-kira berapa perkiraan sisa uang Rina?',
    options: ['Rp4.000', 'Rp5.000', 'Rp3.000', 'Rp4.170'],
    correctAnswer: 0,
    explanation: 'Gunakan Taksiran Pembulatan:\n1. Uang Rina Rp6.450 dibulatkan ke ribuan terdekat → Rp6.000 (karena ratusan 4)\n2. Harga tempat pensil Rp2.280 dibulatkan ke ribuan terdekat → Rp2.000 (karena ratusan 2)\n3. Taksiran sisa uang: Rp6.000 - Rp2.000 = Rp4.000.\n(Catatan: Jika dihitung eksak hasilnya Rp4.170, namun yang ditanyakan adalah perkiraan taksiran yaitu Rp4.000).',
    teacherTip: 'Perhatikan kata "Jika ditaksir / kira-kira": Bulatkan uangnya dulu baru dikurangkan!',
    illustrationType: 'story'
  },
  {
    id: 'sc-06',
    category: 'soal-cerita',
    difficulty: 'tantangan',
    question: 'Andi membawa uang selembar Rp5.000. Ia membeli buku seharga Rp2.750. Berapa uang kembalian yang harus diterima Andi?',
    options: ['Rp2.250', 'Rp2.350', 'Rp2.150', 'Rp3.250'],
    correctAnswer: 0,
    explanation: 'Kembalian = Uang Diberikan - Harga Belanja\nRp5.000 - Rp2.750 = Rp2.250.\nJadi, kembalian Andi adalah Rp2.250.',
    teacherTip: 'Menghitung cepat: 5.000 - 2.000 = 3.000, lalu 3.000 - 750 = 2.250.',
    illustrationType: 'story'
  },
  {
    id: 'sc-07',
    category: 'soal-cerita',
    difficulty: 'sedang',
    question: 'Sebuah perpustakaan keliling memiliki 3.420 buku dongeng dan 2.150 buku ilmu pengetahuan. Berapa jumlah seluruh buku di perpustakaan keliling tersebut?',
    options: ['5.570 buku', '5.470 buku', '5.580 buku', '1.270 buku'],
    correctAnswer: 0,
    explanation: 'Langkah 4 Detektif:\n1. BACA: Ada buku dongeng dan buku pengetahuan.\n2. PIKIRKAN: Kata "jumlah seluruh" artinya operasi PENJUMLAHAN (+).\n3. HITUNG: 3.420 + 2.150 = 5.570.\n4. JAWAB: Jadi, jumlah seluruh buku di perpustakaan adalah 5.570 buku.',
    teacherTip: 'Kata kunci "jumlah seluruh" adalah operasi PENJUMLAHAN (+). Hitung bersusun mulai dari satuan!',
    illustrationType: 'story'
  }
];
