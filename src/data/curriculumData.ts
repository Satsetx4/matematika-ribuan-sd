export interface TopicModule {
  id: string;
  title: string;
  shortTitle: string;
  iconName: string;
  color: string;
  summary: string;
  keyPoints: string[];
  examples: {
    title: string;
    explanation: string;
    steps?: string[];
  }[];
  tips: string;
}

export const CURRICULUM_MODULES: TopicModule[] = [
  {
    id: 'nilai-tempat',
    title: 'Mengenal Bilangan Ribuan & Nilai Tempat',
    shortTitle: 'Nilai Tempat',
    iconName: 'Boxes',
    color: '#f59e0b',
    summary: 'Bilangan yang memiliki 4 angka disebut bilangan ribuan. Setiap letak angka memiliki nilai tempat dan nilai angka yang berbeda.',
    keyPoints: [
      'Bilangan ribuan terdiri dari 4 angka.',
      'Urutan nilai tempat dari terbesar ke terkecil: Ribuan → Ratusan → Puluhan → Satuan.',
      'Nilai Tempat adalah nama posisinya (Ribuan, Ratusan, Puluhan, Satuan).',
      'Nilai Angka adalah jumlah nilai sebenarnya (contoh: angka 3 di tempat ribuan bernilai 3.000).'
    ],
    examples: [
      {
        title: 'Bedah Bilangan 3.625',
        explanation: 'Dibaca: Tiga ribu enam ratus dua puluh lima',
        steps: [
          'Angka 3 menempati tempat Ribuan → bernilai 3.000',
          'Angka 6 menempati tempat Ratusan → bernilai 600',
          'Angka 2 menempati tempat Puluhan → bernilai 20',
          'Angka 5 menempati tempat Satuan → bernilai 5',
          'Bentuk Panjang: 3.625 = 3.000 + 600 + 20 + 5'
        ]
      },
      {
        title: 'Bedah Bilangan 5.768',
        explanation: 'Dibaca: Lima ribu tujuh ratus enam puluh delapan',
        steps: [
          'Angka 5 di tempat Ribuan = 5.000',
          'Angka 7 di tempat Ratusan = 700',
          'Angka 6 di tempat Puluhan = 60',
          'Angka 8 di tempat Satuan = 8',
          'Bentuk Panjang: 5.768 = 5.000 + 700 + 60 + 8'
        ]
      }
    ],
    tips: 'Ingat kuncinya: Selalu baca dari kiri (Ribuan) ke kanan (Satuan)!'
  },
  {
    id: 'banding-urut',
    title: 'Membandingkan & Mengurutkan Bilangan',
    shortTitle: 'Banding & Urut',
    iconName: 'Scale',
    color: '#0284c7',
    summary: 'Membandingkan dua bilangan berarti menentukan mana yang lebih besar (>), lebih kecil (<), atau sama dengan (=). Mengurutkan berarti menyusun bilangan berdasarkan nilainya.',
    keyPoints: [
      'Gunakan tanda: > (lebih besar), < (lebih kecil), = (sama dengan).',
      'Trik Mulut Buaya: Mulut simbol selalu terbuka memakan bilangan yang lebih besar!',
      'Cara membandingkan: Mulai dari angka paling kiri (Ribuan). Jika sama, lihat Ratusan. Jika masih sama, lihat Puluhan, lalu Satuan.',
      'Urutan Naik: Dari yang paling kecil ke yang paling besar.',
      'Urutan Turun: Dari yang paling besar ke yang paling kecil.'
    ],
    examples: [
      {
        title: 'Bandingkan: 2.470 dan 2.350',
        explanation: 'Kedua bilangan memiliki angka ribuan yang sama yaitu 2.',
        steps: [
          'Langkah 1: Angka ribuan sama-sama 2.',
          'Langkah 2: Bandingkan angka ratusannya: 4 ratusan vs 3 ratusan.',
          'Langkah 3: Karena 4 > 3, maka 2.470 > 2.350 (2.470 lebih besar dari 2.350).'
        ]
      },
      {
        title: 'Urutan dari Terkecil ke Terbesar',
        explanation: 'Urutkan bilangan: 2.350, 2.200, 2.470, 2.100, 2.250',
        steps: [
          'Cari yang paling kecil: 2.100',
          'Berikutnya: 2.200',
          'Lalu: 2.250',
          'Berikutnya: 2.350',
          'Paling besar: 2.470',
          'Hasil: 2.100 → 2.200 → 2.250 → 2.350 → 2.470'
        ]
      }
    ],
    tips: 'Lihat dari kiri! Angka yang lebih besar pada tempat pertama yang berbeda langsung menentukan bilangan mana yang lebih besar.'
  },
  {
    id: 'hitung-bersusun',
    title: 'Penjumlahan & Pengurangan Bilangan Ribuan',
    shortTitle: 'Hitung Bersusun',
    iconName: 'Calculator',
    color: '#10b981',
    summary: 'Menghitung bilangan ribuan paling mudah dilakukan dengan cara bersusun pendek, luruskan setiap angka sesuai nilai tempatnya mulai dari satuan.',
    keyPoints: [
      'Susun angka lurus: Satuan lurus satuan, puluhan lurus puluhan, dst.',
      'Mulai menghitung SELALU dari SATUAN (paling kanan).',
      'Penjumlahan: Jika hasil penjumlahan suatu tempat lebih dari 9, lakukan MENYIMPAN ke kolom sebelah kirinya.',
      'Pengurangan: Jika angka di atas lebih kecil dari angka di bawah, PINJAM 1 puluhan dari kolom sebelah kirinya.'
    ],
    examples: [
      {
        title: 'Penjumlahan dengan Menyimpan: 2.250 + 1.375',
        explanation: 'Rana punya 2.250 pensil, mendapat lagi 1.375 pensil. Berapa seluruhnya?',
        steps: [
          'Satuan: 0 + 5 = 5',
          'Puluhan: 5 + 7 = 12 (tulis 2 di bawah, simpan 1 di atas ratusan)',
          'Ratusan: 1 (simpanan) + 2 + 3 = 6',
          'Ribuan: 2 + 1 = 3',
          'Hasil akhir: 3.625 pensil'
        ]
      },
      {
        title: 'Pengurangan: 8.500 - 1.375',
        explanation: 'Nina memiliki 8.500 barang, terjual 1.375 barang. Sisa barang?',
        steps: [
          'Satuan: 0 - 5 (tidak cukup, pinjam dari puluhan)',
          'Setelah meminjam: 10 - 5 = 5',
          'Puluhan: 9 - 7 = 2',
          'Ratusan: 4 - 3 = 1',
          'Ribuan: 8 - 1 = 7',
          'Hasil akhir: 7.125 barang tersisa'
        ]
      }
    ],
    tips: 'Jangan lupa tulis angka simpanan kecil di atas agar tidak kelupaan saat menjumlahkan!'
  },
  {
    id: 'pembulatan-taksiran',
    title: 'Pembulatan ke Ribuan Terdekat & Taksiran Belanja',
    shortTitle: 'Pembulatan',
    iconName: 'Compass',
    color: '#8b5cf6',
    summary: 'Pembulatan digunakan untuk memperkirakan jumlah dengan cepat. Sangat berguna dalam kehidupan sehari-hari seperti belanja dan mengatur uang saku.',
    keyPoints: [
      'Kunci Pembulatan ke Ribuan: LIHAT ANGKA RATUSANNYA!',
      'Aturan 1 (Turun): Jika ratusan 0, 1, 2, 3, 4 → Dibulatkan ke bawah (angka ribuan TETAP).',
      'Aturan 2 (Naik): Jika ratusan 5, 6, 7, 8, 9 → Dibulatkan ke atas (angka ribuan + 1).',
      'Contoh Turun: 3.241 → ratusannya 2 → dibulatkan jadi 3.000.',
      'Contoh Naik: 6.782 → ratusannya 7 → dibulatkan jadi 7.000.'
    ],
    examples: [
      {
        title: 'Taksiran Uang Belanja Sehari-hari',
        explanation: 'Rina punya uang Rp6.450. Ia membeli tempat pensil seharga Rp2.280. Taksirlah sisa uang Rina!',
        steps: [
          'Bulatkan uang awal: Rp6.450 (ratusan 4) dibulatkan menjadi Rp6.000',
          'Bulatkan harga belanja: Rp2.280 (ratusan 2) dibulatkan menjadi Rp2.000',
          'Taksiran sisa: Rp6.000 - Rp2.000 = Rp4.000',
          'Hitung sebenarnya: Rp6.450 - Rp2.280 = Rp4.170 (Perkiraan sangat dekat!)'
        ]
      }
    ],
    tips: 'Angka 0, 1, 2, 3, 4 = Istirahat di bawah. Angka 5, 6, 7, 8, 9 = Lompat naik ke atas!'
  },
  {
    id: 'soal-cerita',
    title: 'Detektif Soal Cerita (Metode 4 Langkah Juara)',
    shortTitle: 'Soal Cerita',
    iconName: 'Search',
    color: '#ec4899',
    summary: 'Selesaikan soal cerita matematika seperti seorang detektif hebat dengan 4 langkah mudah: BACA - PIKIRKAN - HITUNG - JAWAB.',
    keyPoints: [
      'Langkah 1 (BACA): Baca soal dengan tenang dan teliti sampai paham ceritanya.',
      'Langkah 2 (PIKIRKAN): Tentukan apa yang diketahui, apa yang ditanyakan, dan apakah jumlahnya bertambah atau berkurang.',
      'Langkah 3 (HITUNG): Pilih rumus operasi yang tepat (+ atau -) dan hitung teliti.',
      'Langkah 4 (JAWAB): Tulis kesimpulan jawaban lengkap beserta nama satuannya.'
    ],
    examples: [
      {
        title: 'Operasi Dua Tahap: Buah Mangga Pak Budi',
        explanation: 'Pak Budi memiliki 4.250 buah mangga. Ia membeli lagi 1.375 mangga. Kemudian 2.150 mangga dibagikan kepada warga. Berapa sisa mangga?',
        steps: [
          'Langkah 1 (BACA): Pak Budi punya mangga, beli lagi, lalu dibagikan.',
          'Langkah 2 (PIKIRKAN): "Beli lagi" sering menandakan jumlah bertambah, sedangkan "dibagikan" sering menandakan jumlah berkurang. Periksa perubahan jumlah dalam seluruh cerita sebelum memilih operasi.',
          'Langkah 3 (HITUNG - Tahap 1): 4.250 + 1.375 = 5.625 mangga.',
          'Langkah 3 (HITUNG - Tahap 2): 5.625 - 2.150 = 3.475 mangga.',
          'Langkah 4 (JAWAB): Jadi, sisa buah mangga Pak Budi adalah 3.475 buah.'
        ]
      }
    ],
    tips: 'Kata seperti "mendapat", "beli lagi", "dibagikan", dan "tersisa" dapat menjadi petunjuk. Cocokkan dengan perubahan jumlah di seluruh cerita; kata-kata itu tidak otomatis menentukan operasi.'
  }
];

export const KEYWORDS_DICT = {
  addition: [
    { word: 'mendapat', meaning: 'Menerima barang atau nilai baru' },
    { word: 'membeli lagi', meaning: 'Menambah barang yang sudah ada' },
    { word: 'bertambah', meaning: 'Jumlah bertambah banyak' },
    { word: 'seluruhnya / jumlah semua', meaning: 'Menggabungkan semua barang menjadi satu' },
    { word: 'diberi lagi', meaning: 'Mendapat hadiah/pemberian tambahan' }
  ],
  subtraction: [
    { word: 'dijual', meaning: 'Barang dikeluarkan untuk pembeli' },
    { word: 'diberikan / dibagikan', meaning: 'Barang dibagi kepada orang lain' },
    { word: 'digunakan / dipakai', meaning: 'Barang atau uang dipakai untuk sesuatu' },
    { word: 'berkurang', meaning: 'Jumlah menjadi lebih sedikit' },
    { word: 'tersisa / sisa', meaning: 'Jumlah yang belum terpakai' },
    { word: 'kembalian', meaning: 'Uang sisa setelah membayar barang' }
  ]
};
