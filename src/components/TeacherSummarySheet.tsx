import React from 'react';
import { X, Printer, BookOpen, CheckCircle, Lightbulb, Sparkles } from 'lucide-react';
import { CURRICULUM_MODULES, KEYWORDS_DICT } from '../data/curriculumData';
import { playClickSound } from '../utils/soundEffects';

interface TeacherSummarySheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TeacherSummarySheet: React.FC<TeacherSummarySheetProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    playClickSound();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 print:p-0 print:bg-white print:static">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 print:border-none print:shadow-none print:max-h-none print:w-full print:rounded-none">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800 print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                Rangkuman Materi & Lembar Cetak Guru
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Panduan ringkas materi matematika bilangan ribuan SD Kelas 3 & 4
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="btn-tactile flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 text-white font-bold text-xs shadow-sm hover:bg-amber-600"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Simpan PDF</span>
            </button>
            <button
              onClick={() => {
                playClickSound();
                onClose();
              }}
              className="btn-tactile p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Title */}
        <div className="text-center my-6">
          <span className="text-xs font-black tracking-widest text-amber-600 dark:text-amber-400 uppercase">
            Kurikulum Matematika SD • Materi Bilangan Ribuan
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
            Lembar Rangkuman Super Lengkap
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Nilai Tempat • Perbandingan & Urutan • Hitung Bersusun • Pembulatan • Detektif Soal Cerita
          </p>
        </div>

        {/* Content Modules */}
        <div className="space-y-6 mt-6">
          {CURRICULUM_MODULES.map((mod, idx) => (
            <div
              key={mod.id}
              className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 break-inside-avoid"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-amber-500 text-white flex items-center justify-center text-xs font-black">
                  {idx + 1}
                </span>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  {mod.title}
                </h3>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium mb-3">
                {mod.summary}
              </p>

              {/* Key Points */}
              <div className="space-y-1 pl-4 border-l-2 border-amber-400 dark:border-amber-600 mb-3">
                {mod.keyPoints.map((pt, i) => (
                  <p key={i} className="text-xs text-slate-700 dark:text-slate-300">
                    • {pt}
                  </p>
                ))}
              </div>

              {/* Teacher Tip Box */}
              <div className="p-3 rounded-xl bg-amber-100/60 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 text-xs font-semibold flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Tips Guru:</strong> {mod.tips}</span>
              </div>
            </div>
          ))}

          {/* Keywords Dictionary Table */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 break-inside-avoid">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-3">
              Kamus Kata Kunci Penentu Operasi Hitung Soal Cerita
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                <span className="text-xs font-black uppercase text-emerald-800 dark:text-emerald-300 block mb-2">
                  ➕ Kata Kunci Penjumlahan (Jumlah Bertambah):
                </span>
                <ul className="text-xs space-y-1.5 text-slate-700 dark:text-slate-200">
                  {KEYWORDS_DICT.addition.map((item, i) => (
                    <li key={i}>
                      <strong className="text-emerald-700 dark:text-emerald-400">"{item.word}"</strong>: {item.meaning}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800">
                <span className="text-xs font-black uppercase text-rose-800 dark:text-rose-300 block mb-2">
                  ➖ Kata Kunci Pengurangan (Jumlah Berkurang / Sisa):
                </span>
                <ul className="text-xs space-y-1.5 text-slate-700 dark:text-slate-200">
                  {KEYWORDS_DICT.subtraction.map((item, i) => (
                    <li key={i}>
                      <strong className="text-rose-700 dark:text-rose-400">"{item.word}"</strong>: {item.meaning}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 4 Golden Steps Summary */}
          <div className="p-5 rounded-2xl bg-amber-500/10 border-2 border-amber-500/40 text-center break-inside-avoid">
            <h4 className="text-sm font-black uppercase tracking-wider text-amber-800 dark:text-amber-300 mb-2">
              🌟 4 Langkah Emas Detektif Matematika 🌟
            </h4>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-extrabold text-slate-800 dark:text-white">
              <span className="px-3 py-1 rounded-full bg-white dark:bg-slate-800 shadow-xs">1. BACA Teliti</span>
              <span>→</span>
              <span className="px-3 py-1 rounded-full bg-white dark:bg-slate-800 shadow-xs">2. PIKIRKAN Kata Kunci</span>
              <span>→</span>
              <span className="px-3 py-1 rounded-full bg-white dark:bg-slate-800 shadow-xs">3. HITUNG Bersusun</span>
              <span>→</span>
              <span className="px-3 py-1 rounded-full bg-white dark:bg-slate-800 shadow-xs">4. JAWAB Lengkap</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
