import { Sparkles, Trophy, Boxes, Scale, Calculator, TrendingUp, Search, ArrowRight, BookOpen, Star, Sprout } from 'lucide-react';
import { ActiveTab } from './TabNavigation';
import { playClickSound } from '../utils/soundEffects';

interface AdventureHomeProps {
  setActiveTab: (tab: ActiveTab) => void;
  starsCount: number;
  onOpenSummary: () => void;
}

export const AdventureHome: React.FC<AdventureHomeProps> = ({
  setActiveTab,
  starsCount,
  onOpenSummary
}) => {
  const stations = [
    {
      id: 'nilai-tempat' as ActiveTab,
      stationNum: 1,
      title: 'Laboratorium Nilai Tempat',
      subtitle: 'Balok Dienes & Bentuk Panjang Bilangan Ribuan',
      icon: Boxes,
      color: 'from-amber-500 to-amber-600',
      badge: 'Hal 1 & 3',
      bgLight: 'bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300'
    },
    {
      id: 'banding-urut' as ActiveTab,
      stationNum: 2,
      title: 'Timbangan & Kereta Bilangan',
      subtitle: 'Tanda >, <, = dan Urutan Naik/Turun',
      icon: Scale,
      color: 'from-sky-500 to-sky-600',
      badge: 'Hal 1, 2, 4',
      bgLight: 'bg-sky-500/10 border-sky-500/30 text-sky-700 dark:text-sky-300'
    },
    {
      id: 'hitung-bersusun' as ActiveTab,
      stationNum: 3,
      title: 'Kastil Hitung Bersusun',
      subtitle: 'Penjumlahan Simpan & Pengurangan Pinjam',
      icon: Calculator,
      color: 'from-emerald-500 to-emerald-600',
      badge: 'Hal 5 & 6',
      bgLight: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
    },
    {
      id: 'pembulatan' as ActiveTab,
      stationNum: 4,
      title: 'Rollercoaster Pembulatan',
      subtitle: 'Aturan 0-4 Turun, 5-9 Naik & Kasir Belanja',
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
      badge: 'Hal 6 & 7',
      bgLight: 'bg-purple-500/10 border-purple-500/30 text-purple-700 dark:text-purple-300'
    },
    {
      id: 'soal-cerita' as ActiveTab,
      stationNum: 5,
      title: 'Detektif Soal Cerita',
      subtitle: '4 Langkah Juara: BACA - PIKIRKAN - HITUNG - JAWAB',
      icon: Search,
      color: 'from-rose-500 to-rose-600',
      badge: 'Hal 5, 6, 7',
      bgLight: 'bg-rose-500/10 border-rose-500/30 text-rose-700 dark:text-rose-300'
    },
    {
      id: 'kuis' as ActiveTab,
      stationNum: 6,
      title: 'Kubah Juara (Bank Soal)',
      subtitle: '30+ Soal Interaktif, Kuis Bintang & Pembahasan Rinci',
      icon: Trophy,
      color: 'from-yellow-500 to-amber-600',
      badge: '30+ Soal',
      bgLight: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-700 dark:text-yellow-300'
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Hero Welcome Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 text-slate-950 p-8 sm:p-10 shadow-lg shadow-amber-500/20">
        
        {/* Background decorative circles */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute right-20 top-4 w-32 h-32 rounded-full bg-yellow-300/20 blur-xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/15 text-slate-950 font-black text-xs mb-4 backdrop-blur-xs">
            <Sparkles className="w-4 h-4 fill-current" />
            <span>Selamat Datang, Penjelajah Angka Cilik!</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Petualangan Matematika Bilangan Ribuan
          </h1>

          <p className="mt-3 text-sm sm:text-base font-bold text-slate-900/90 leading-relaxed">
            Belajar matematika itu mudah, asyik, dan menyenangkan! Mari jelajahi stasiun nilai tempat, timbangan bilangan, hitung bersusun, rollercoaster pembulatan, dan pecahkan teka-teki soal cerita.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                playClickSound();
                setActiveTab('nilai-tempat');
              }}
              className="btn-tactile flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-950 text-white font-black text-sm shadow-md hover:bg-slate-900"
            >
              <span>Mulai Ekspedisi Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                playClickSound();
                onOpenSummary();
              }}
              className="btn-tactile flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/25 hover:bg-white/35 text-slate-950 font-extrabold text-sm backdrop-blur-xs border border-white/30"
            >
              <BookOpen className="w-4 h-4" />
              <span>Lihat Rangkuman Materi</span>
            </button>
          </div>
        </div>

      </div>

      {/* Teacher Encouragement & Motto (From PDF Hal 1 & 7) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
              Semboyan Guru Juara (Hal 1 & 3):
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium italic mt-1 leading-relaxed">
              "Matematika hari ini, untuk masa depan yang lebih baik! Belajar Matematika, Melatih Logika, Meraih Masa Depan!"
            </p>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Star className="w-6 h-6 fill-emerald-500/30" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
              Pesan Penting untuk Siswa (Hal 7):
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium italic mt-1 leading-relaxed">
              "Aku tidak boleh terburu-buru saat menghitung. Aku harus teliti, memahami soal, lalu memilih cara yang tepat. Dengan rajin berlatih, aku pasti bisa!"
            </p>
          </div>
        </div>
      </div>

      {/* Map Stations Grid (6 Interactive Stations) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Peta Stasiun Petualangan
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Pilih salah satu stasiun untuk mulai belajar secara interaktif
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {stations.map((s) => {
            const Icon = s.icon;

            return (
              <div
                key={s.id}
                onClick={() => {
                  playClickSound();
                  setActiveTab(s.id);
                }}
                className="btn-tactile bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-md cursor-pointer flex flex-col justify-between group transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${s.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                      {s.badge}
                    </span>
                  </div>

                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Stasiun #{s.stationNum}
                  </span>
                  <h4 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {s.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {s.subtitle}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                  <span>Masuk Belajar</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
