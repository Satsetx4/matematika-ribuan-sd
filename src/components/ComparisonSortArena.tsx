import React, { useState } from 'react';
import { Scale, Train, ArrowUpDown, CheckCircle2, RotateCcw, Sparkles, ArrowRight, Lightbulb } from 'lucide-react';
import { playClickSound, playSuccessSound, playGentleWrongSound } from '../utils/soundEffects';

interface ComparisonSortArenaProps {
  onEarnStar: () => void;
}

export const ComparisonSortArena: React.FC<ComparisonSortArenaProps> = ({ onEarnStar }) => {
  // Comparison state
  const [numA, setNumA] = useState<number>(2470);
  const [numB, setNumB] = useState<number>(2350);

  // Sorting game state
  type SortMode = 'ascending' | 'descending';
  const [sortMode, setSortMode] = useState<SortMode>('ascending');
  
  const sortPresets = {
    ascending: [2350, 2200, 2470, 2100, 2250],
    descending: [6800, 6400, 6700, 6600, 6900],
    challenge: [3250, 1978, 4005, 2750]
  };

  const [trainCars, setTrainCars] = useState<number[]>([2350, 2200, 2470, 2100, 2250]);
  const [sortCompleted, setSortCompleted] = useState<boolean>(false);

  // Determine comparison symbol
  let compSymbol = '=';
  let compWord = 'sama dengan';
  if (numA > numB) {
    compSymbol = '>';
    compWord = 'lebih besar dari (>)';
  } else if (numA < numB) {
    compSymbol = '<';
    compWord = 'lebih kecil dari (<)';
  }

  // Digit comparison breakdown
  const getDigits = (n: number) => ({
    rib: Math.floor((n % 10000) / 1000),
    rat: Math.floor((n % 1000) / 100),
    pul: Math.floor((n % 100) / 10),
    sat: n % 10
  });

  const dA = getDigits(numA);
  const dB = getDigits(numB);

  // Reason generation
  const getComparisonReason = () => {
    if (dA.rib !== dB.rib) {
      return `Angka ribuan berbeda: ${dA.rib} ${dA.rib > dB.rib ? '>' : '<'} ${dB.rib}. Langsung ditentukan dari nilai tempat ribuan!`;
    }
    if (dA.rat !== dB.rat) {
      return `Angka ribuan sama (${dA.rib}). Lihat ratusannya: ${dA.rat} ${dA.rat > dB.rat ? '>' : '<'} ${dB.rat}. Jadi pembedanya ada di ratusan!`;
    }
    if (dA.pul !== dB.pul) {
      return `Angka ribuan dan ratusan sama. Lihat puluhannya: ${dA.pul} ${dA.pul > dB.pul ? '>' : '<'} ${dB.pul}.`;
    }
    if (dA.sat !== dB.sat) {
      return `Ribuan, ratusan, dan puluhan sama. Lihat satuannya: ${dA.sat} ${dA.sat > dB.sat ? '>' : '<'} ${dB.sat}.`;
    }
    return 'Semua angka di tempat ribuan, ratusan, puluhan, dan satuan persis sama! Nilainya sama besar.';
  };

  // Move train car left or right
  const moveCar = (index: number, direction: 'left' | 'right') => {
    playClickSound();
    const newCars = [...trainCars];
    const targetIdx = direction === 'left' ? index - 1 : index + 1;
    if (targetIdx >= 0 && targetIdx < newCars.length) {
      const temp = newCars[index];
      newCars[index] = newCars[targetIdx];
      newCars[targetIdx] = temp;
      setTrainCars(newCars);
      checkTrainOrder(newCars, sortMode);
    }
  };

  const checkTrainOrder = (cars: number[], mode: SortMode) => {
    let isCorrect = true;
    for (let i = 0; i < cars.length - 1; i++) {
      if (mode === 'ascending' && cars[i] > cars[i + 1]) {
        isCorrect = false;
        break;
      }
      if (mode === 'descending' && cars[i] < cars[i + 1]) {
        isCorrect = false;
        break;
      }
    }
    if (isCorrect) {
      setSortCompleted(true);
      playSuccessSound();
      onEarnStar();
    } else {
      setSortCompleted(false);
    }
  };

  const switchPreset = (type: 'asc' | 'desc' | 'chal') => {
    playClickSound();
    setSortCompleted(false);
    if (type === 'asc') {
      setSortMode('ascending');
      setTrainCars([2350, 2200, 2470, 2100, 2250].sort(() => Math.random() - 0.5));
    } else if (type === 'desc') {
      setSortMode('descending');
      setTrainCars([6800, 6400, 6700, 6600, 6900].sort(() => Math.random() - 0.5));
    } else {
      setSortMode('ascending');
      setTrainCars([3250, 1978, 4005, 2750].sort(() => Math.random() - 0.5));
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-sky-500/15 via-indigo-500/10 to-amber-500/15 border border-sky-400/30 dark:border-sky-500/20 rounded-3xl p-6 sm:p-8 backdrop-blur-sm">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-800 dark:text-sky-300 font-bold text-xs mb-3">
            <Scale className="w-3.5 h-3.5" />
            Materi Bagian C, D, & E (Halaman 1, 2, 4)
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Arena Timbangan & Kereta Pengurut Bilangan
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Bandingkan angka dari posisi terbesar (kiri ke kanan: Ribuan → Ratusan → Puluhan → Satuan). Mulut simbol selalu terbuka memakan bilangan yang lebih besar!
          </p>
        </div>
      </div>

      {/* 1. Timbangan Komparasi Interaktif */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-sky-500" />
              <span>Timbangan Perbandingan Angka</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Gunakan tanda &gt; (lebih besar), &lt; (lebih kecil), atau = (sama dengan)
            </p>
          </div>

          {/* Quick presets from PDF */}
          <div className="flex flex-wrap gap-1.5">
            {[
              { a: 2470, b: 2350, label: '2.470 vs 2.350' },
              { a: 2100, b: 2250, label: '2.100 vs 2.250' },
              { a: 1450, b: 1405, label: '1.450 vs 1.405' },
              { a: 6800, b: 6700, label: '6.800 vs 6.700' },
            ].map((p, idx) => (
              <button
                key={idx}
                onClick={() => {
                  playClickSound();
                  setNumA(p.a);
                  setNumB(p.b);
                }}
                className="btn-tactile text-xs font-bold px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-sky-100 dark:hover:bg-sky-950 border border-slate-200 dark:border-slate-700"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Comparison Stage */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-10">
          
          {/* Card A */}
          <div className={`p-6 rounded-3xl border-2 transition-all w-full md:w-64 text-center ${
            numA > numB
              ? 'bg-amber-500/15 border-amber-500 shadow-lg shadow-amber-500/10 scale-105'
              : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
          }`}>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Bilangan Pertama
            </span>
            <input
              type="number"
              min={1000}
              max={9999}
              value={numA}
              onChange={(e) => setNumA(parseInt(e.target.value) || 1000)}
              className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white bg-transparent text-center w-full focus:outline-none"
            />
            <div className="mt-3 grid grid-cols-4 gap-1 text-[11px] font-bold">
              <span className="bg-amber-500/20 text-amber-700 dark:text-amber-300 rounded p-1">{dA.rib}</span>
              <span className="bg-sky-500/20 text-sky-700 dark:text-sky-300 rounded p-1">{dA.rat}</span>
              <span className="bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 rounded p-1">{dA.pul}</span>
              <span className="bg-rose-500/20 text-rose-700 dark:text-rose-300 rounded p-1">{dA.sat}</span>
            </div>
            {numA > numB && (
              <span className="inline-block mt-3 text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-amber-500 text-white shadow-xs">
                Lebih Besar!
              </span>
            )}
          </div>

          {/* Alligator Symbol Mascot */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white flex items-center justify-center font-black text-3xl sm:text-4xl shadow-md shadow-sky-500/25 animate-pulse">
              {compSymbol}
            </div>
            <span className="text-xs font-extrabold text-sky-600 dark:text-sky-400 mt-2 text-center max-w-[140px]">
              {compWord}
            </span>
          </div>

          {/* Card B */}
          <div className={`p-6 rounded-3xl border-2 transition-all w-full md:w-64 text-center ${
            numB > numA
              ? 'bg-amber-500/15 border-amber-500 shadow-lg shadow-amber-500/10 scale-105'
              : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'
          }`}>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Bilangan Kedua
            </span>
            <input
              type="number"
              min={1000}
              max={9999}
              value={numB}
              onChange={(e) => setNumB(parseInt(e.target.value) || 1000)}
              className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white bg-transparent text-center w-full focus:outline-none"
            />
            <div className="mt-3 grid grid-cols-4 gap-1 text-[11px] font-bold">
              <span className="bg-amber-500/20 text-amber-700 dark:text-amber-300 rounded p-1">{dB.rib}</span>
              <span className="bg-sky-500/20 text-sky-700 dark:text-sky-300 rounded p-1">{dB.rat}</span>
              <span className="bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 rounded p-1">{dB.pul}</span>
              <span className="bg-rose-500/20 text-rose-700 dark:text-rose-300 rounded p-1">{dB.sat}</span>
            </div>
            {numB > numA && (
              <span className="inline-block mt-3 text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-amber-500 text-white shadow-xs">
                Lebih Besar!
              </span>
            )}
          </div>

        </div>

        {/* Step-by-Step Reason Box */}
        <div className="mt-8 p-5 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-900/60">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-extrabold text-sm text-sky-900 dark:text-sky-300">
                Cara Mengetahuinya (Trik Guru Dari Kiri):
              </h4>
              <p className="mt-1 text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                {getComparisonReason()}
              </p>
              <div className="mt-2 text-xs font-bold text-sky-700 dark:text-sky-400">
                Jadi: {numA.toLocaleString('id-ID')} {compSymbol} {numB.toLocaleString('id-ID')}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 2. Kereta Gerbong Pengurut Angka */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <Train className="w-5 h-5 text-purple-500" />
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                Gerbong Kereta Pengurut Angka
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Urutkan gerbong kereta sesuai tantangan misi dengan mengklik panah tukar posisi!
            </p>
          </div>

          {/* Presets switcher */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => switchPreset('asc')}
              className={`btn-tactile text-xs font-bold px-3 py-1.5 rounded-xl border ${
                sortMode === 'ascending'
                  ? 'bg-sky-500 text-white border-sky-600'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              Menaik (Kecil → Besar)
            </button>
            <button
              onClick={() => switchPreset('desc')}
              className={`btn-tactile text-xs font-bold px-3 py-1.5 rounded-xl border ${
                sortMode === 'descending'
                  ? 'bg-purple-500 text-white border-purple-600'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              Menurun (Besar → Kecil)
            </button>
          </div>
        </div>

        {/* Train Target Mission Notice */}
        <div className="mt-6 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/70 dark:border-amber-900/50 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-bold text-amber-900 dark:text-amber-200">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>
              Target Misi: Urutkan dari <strong>{sortMode === 'ascending' ? 'TERKECIL ke TERBESAR' : 'TERBESAR ke TERKECIL'}</strong>!
            </span>
          </div>
          {sortCompleted && (
            <span className="flex items-center gap-1 text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-500 text-white animate-bounce">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Sempurna! +1 Bintang
            </span>
          )}
        </div>

        {/* Train Cars Track */}
        <div className="mt-8 overflow-x-auto pb-4">
          <div className="flex items-end justify-center gap-3 min-w-max px-4">
            
            {/* Locomotive Head */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-24 rounded-2xl bg-gradient-to-t from-slate-800 to-slate-700 dark:from-slate-700 dark:to-slate-600 text-white flex flex-col items-center justify-center shadow-md relative">
                <Train className="w-8 h-8 text-amber-400" />
                <span className="text-[10px] font-black tracking-widest text-amber-400 uppercase mt-1">LOKO</span>
                {/* Smokestack */}
                <div className="absolute -top-3 left-4 w-3 h-3 bg-slate-600 rounded-t-sm" />
              </div>
              <div className="w-20 h-3 bg-slate-400 dark:bg-slate-600 rounded-full mt-1" />
            </div>

            {/* Gerbong-gerbong Angka */}
            {trainCars.map((num, idx) => (
              <div key={idx} className="flex flex-col items-center group">
                
                {/* Car Box */}
                <div className={`w-28 sm:w-32 h-24 rounded-2xl border-2 p-2 flex flex-col items-center justify-between shadow-md transition-all ${
                  sortCompleted
                    ? 'bg-emerald-500/15 border-emerald-500 shadow-emerald-500/20'
                    : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700'
                }`}>
                  <span className="text-[10px] font-bold uppercase text-slate-400">
                    Gerbong #{idx + 1}
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-wide">
                    {num.toLocaleString('id-ID')}
                  </span>
                  
                  {/* Reorder Buttons */}
                  <div className="flex items-center gap-1 w-full justify-between pt-1 border-t border-slate-100 dark:border-slate-700">
                    <button
                      disabled={idx === 0}
                      onClick={() => moveCar(idx, 'left')}
                      className="btn-tactile text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 disabled:opacity-30"
                    >
                      ← Geser
                    </button>
                    <button
                      disabled={idx === trainCars.length - 1}
                      onClick={() => moveCar(idx, 'right')}
                      className="btn-tactile text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 disabled:opacity-30"
                    >
                      Geser →
                    </button>
                  </div>
                </div>

                {/* Car Wheels */}
                <div className="flex gap-4 mt-1">
                  <div className="w-4 h-4 rounded-full bg-slate-700 dark:bg-slate-600 border-2 border-slate-400" />
                  <div className="w-4 h-4 rounded-full bg-slate-700 dark:bg-slate-600 border-2 border-slate-400" />
                </div>
              </div>
            ))}

          </div>

          {/* Railway Tracks */}
          <div className="w-full h-3 bg-amber-800/40 dark:bg-amber-950/60 rounded-full mt-1 relative overflow-hidden flex items-center justify-around">
            {Array.from({ length: 25 }).map((_, i) => (
              <div key={i} className="w-1.5 h-full bg-amber-950 dark:bg-amber-900" />
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
