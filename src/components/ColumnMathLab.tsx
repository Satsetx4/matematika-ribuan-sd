import React, { useState } from 'react';
import { Calculator, Plus, Minus, CheckCircle2, RotateCcw, ArrowRight, Sparkles, Lightbulb, GraduationCap } from 'lucide-react';
import { playClickSound, playSuccessSound, playGentleWrongSound } from '../utils/soundEffects';

interface ColumnMathLabProps {
  onEarnStar: () => void;
}

export const ColumnMathLab: React.FC<ColumnMathLabProps> = ({ onEarnStar }) => {
  type Operation = 'add' | 'subtract';
  const [operation, setOperation] = useState<Operation>('add');
  const [numA, setNumA] = useState<number>(2250);
  const [numB, setNumB] = useState<number>(1375);

  // Step progression (0: ready, 1: satuan, 2: puluhan, 3: ratusan, 4: ribuan / done)
  const [currentStep, setCurrentStep] = useState<number>(0);

  const getDigits = (n: number) => ({
    rib: Math.floor((n % 10000) / 1000),
    rat: Math.floor((n % 1000) / 100),
    pul: Math.floor((n % 100) / 10),
    sat: n % 10
  });

  const a = getDigits(numA);
  const b = getDigits(numB);

  // Addition calculation logic
  const sumSat = a.sat + b.sat;
  const carrySatToPul = sumSat >= 10 ? 1 : 0;
  const resSat = sumSat % 10;

  const sumPul = a.pul + b.pul + carrySatToPul;
  const carryPulToRat = sumPul >= 10 ? 1 : 0;
  const resPul = sumPul % 10;

  const sumRat = a.rat + b.rat + carryPulToRat;
  const carryRatToRib = sumRat >= 10 ? 1 : 0;
  const resRat = sumRat % 10;

  const sumRib = a.rib + b.rib + carryRatToRib;
  const resRib = sumRib;

  // Subtraction calculation logic with borrowing
  // For subtraction we ensure numA >= numB
  const finalNumA = operation === 'subtract' && numA < numB ? numB : numA;
  const finalNumB = operation === 'subtract' && numA < numB ? numA : numB;

  const fa = getDigits(finalNumA);
  const fb = getDigits(finalNumB);

  // Satuan borrow
  const needBorrowSat = fa.sat < fb.sat;
  const faSatVal = needBorrowSat ? fa.sat + 10 : fa.sat;
  const subSat = faSatVal - fb.sat;

  // Puluhan borrow
  const faPulRemaining = needBorrowSat ? fa.pul - 1 : fa.pul;
  const needBorrowPul = faPulRemaining < fb.pul;
  const faPulVal = needBorrowPul ? faPulRemaining + 10 : faPulRemaining;
  const subPul = faPulVal - fb.pul;

  // Ratusan borrow
  const faRatRemaining = needBorrowPul ? fa.rat - 1 : fa.rat;
  const needBorrowRat = faRatRemaining < fb.rat;
  const faRatVal = needBorrowRat ? faRatRemaining + 10 : faRatRemaining;
  const subRat = faRatVal - fb.rat;

  // Ribuan
  const faRibRemaining = needBorrowRat ? fa.rib - 1 : fa.rib;
  const subRib = faRibRemaining - fb.rib;

  const handleNextStep = () => {
    playClickSound();
    if (currentStep < 4) {
      const next = currentStep + 1;
      setCurrentStep(next);
      if (next === 4) {
        playSuccessSound();
        onEarnStar();
      }
    }
  };

  const handleReset = () => {
    playClickSound();
    setCurrentStep(0);
  };

  const loadPreset = (op: Operation, top: number, bottom: number) => {
    playClickSound();
    setOperation(op);
    setNumA(top);
    setNumB(bottom);
    setCurrentStep(0);
  };

  // Explanation notes for each step
  const getStepNarrative = () => {
    if (currentStep === 0) {
      return 'Klik "Mulai Hitung Bersusun" untuk menghitung langkah demi langkah dari Satuan!';
    }
    if (operation === 'add') {
      if (currentStep === 1) {
        return `Langkah 1 (Satuan): ${a.sat} + ${b.sat} = ${sumSat}. ${
          carrySatToPul ? `Karena lebih dari 9, tulis ${resSat} di bawah dan simpan ${carrySatToPul} di atas puluhan.` : `Tulis ${resSat} di bawah.`
        }`;
      }
      if (currentStep === 2) {
        return `Langkah 2 (Puluhan): ${carrySatToPul > 0 ? `${carrySatToPul} (simpanan) + ` : ''}${a.pul} + ${b.pul} = ${sumPul}. ${
          carryPulToRat ? `Tulis ${resPul} di bawah dan simpan ${carryPulToRat} di atas ratusan.` : `Tulis ${resPul} di bawah.`
        }`;
      }
      if (currentStep === 3) {
        return `Langkah 3 (Ratusan): ${carryPulToRat > 0 ? `${carryPulToRat} (simpanan) + ` : ''}${a.rat} + ${b.rat} = ${sumRat}. ${
          carryRatToRib ? `Tulis ${resRat} di bawah dan simpan ${carryRatToRib} di atas ribuan.` : `Tulis ${resRat} di bawah.`
        }`;
      }
      if (currentStep === 4) {
        return `Langkah 4 (Ribuan): ${carryRatToRib > 0 ? `${carryRatToRib} (simpanan) + ` : ''}${a.rib} + ${b.rib} = ${resRib}. Hasil akhir adalah ${(numA + numB).toLocaleString('id-ID')}!`;
      }
    } else {
      if (currentStep === 1) {
        return `Langkah 1 (Satuan): ${fa.sat} - ${fb.sat}. ${
          needBorrowSat ? `Karena angka atas lebih kecil, pinjam 1 puluhan (10) dari sebelah sehingga menjadi ${faSatVal} - ${fb.sat} = ${subSat}.` : `Hasil: ${subSat}.`
        }`;
      }
      if (currentStep === 2) {
        return `Langkah 2 (Puluhan): ${needBorrowSat ? `Angka puluhan tersisa ${faPulRemaining}. ` : ''}${
          needBorrowPul ? `Pinjam 1 ratusan (10) sehingga menjadi ${faPulVal} - ${fb.pul} = ${subPul}.` : `${faPulRemaining} - ${fb.pul} = ${subPul}.`
        }`;
      }
      if (currentStep === 3) {
        return `Langkah 3 (Ratusan): ${needBorrowPul ? `Angka ratusan tersisa ${faRatRemaining}. ` : ''}${
          needBorrowRat ? `Pinjam 1 ribuan sehingga menjadi ${faRatVal} - ${fb.rat} = ${subRat}.` : `${faRatRemaining} - ${fb.rat} = ${subRat}.`
        }`;
      }
      if (currentStep === 4) {
        return `Langkah 4 (Ribuan): ${needBorrowRat ? `Angka ribuan tersisa ${faRibRemaining}. ` : ''}${faRibRemaining} - ${fb.rib} = ${subRib}. Hasil akhir adalah ${(finalNumA - finalNumB).toLocaleString('id-ID')}!`;
      }
    }
    return '';
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-amber-500/15 border border-emerald-400/30 dark:border-emerald-500/20 rounded-3xl p-6 sm:p-8 backdrop-blur-sm">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-bold text-xs mb-3">
            <Calculator className="w-3.5 h-3.5" />
            Materi Bagian 1, 2, 3 (Halaman 5 & 6)
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Laboratorium Hitung Bersusun (Simpan & Pinjam)
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Menghitung bilangan ribuan bersusun pendek: luruskan nilai tempat dan hitung <strong>SELALU DARI SATUAN</strong> (paling kanan).
          </p>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        
        {/* Controls Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          
          {/* Op Switcher */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playClickSound();
                setOperation('add');
                setCurrentStep(0);
              }}
              className={`btn-tactile flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs sm:text-sm font-extrabold transition-all ${
                operation === 'add'
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>Penjumlahan (+)</span>
            </button>
            <button
              onClick={() => {
                playClickSound();
                setOperation('subtract');
                setCurrentStep(0);
              }}
              className={`btn-tactile flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs sm:text-sm font-extrabold transition-all ${
                operation === 'subtract'
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <Minus className="w-4 h-4" />
              <span>Pengurangan (-)</span>
            </button>
          </div>

          {/* Preset Buttons from PDF */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold text-slate-400 mr-1">Contoh Buku:</span>
            <button
              onClick={() => loadPreset('add', 2250, 1375)}
              className="btn-tactile text-xs font-bold px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-100 dark:hover:bg-emerald-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
            >
              2.250 + 1.375
            </button>
            <button
              onClick={() => loadPreset('add', 2346, 1527)}
              className="btn-tactile text-xs font-bold px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-100 dark:hover:bg-emerald-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
            >
              2.346 + 1.527
            </button>
            <button
              onClick={() => loadPreset('subtract', 8500, 1375)}
              className="btn-tactile text-xs font-bold px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-100 dark:hover:bg-rose-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
            >
              8.500 - 1.375
            </button>
            <button
              onClick={() => loadPreset('subtract', 7245, 2138)}
              className="btn-tactile text-xs font-bold px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-100 dark:hover:bg-rose-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
            >
              7.245 - 2.138
            </button>
          </div>
        </div>

        {/* Step-by-Step Interactive Board */}
        <div className="mt-8 flex flex-col items-center">
          
          {/* The Arithmetic Grid */}
          <div className="bg-slate-50 dark:bg-slate-800/80 border-2 border-slate-200 dark:border-slate-700 rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-inner">
            
            {/* Column Headers (Place Values) */}
            <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-black uppercase tracking-wider mb-2">
              <span className="text-amber-600 dark:text-amber-400">Ribuan</span>
              <span className="text-sky-600 dark:text-sky-400">Ratusan</span>
              <span className="text-emerald-600 dark:text-emerald-400">Puluhan</span>
              <span className="text-rose-600 dark:text-rose-400">Satuan</span>
            </div>

            {/* Carry / Borrow Indicators Row */}
            <div className="grid grid-cols-4 gap-2 text-center h-8 items-center mb-1">
              {operation === 'add' ? (
                <>
                  <div className="text-xs font-black text-amber-500">{currentStep >= 4 && carryRatToRib > 0 ? `+${carryRatToRib}` : ''}</div>
                  <div className="text-xs font-black text-sky-500">{currentStep >= 3 && carryPulToRat > 0 ? `+${carryPulToRat}` : ''}</div>
                  <div className="text-xs font-black text-emerald-500">{currentStep >= 2 && carrySatToPul > 0 ? `+${carrySatToPul}` : ''}</div>
                  <div className="text-xs font-black text-slate-400">-</div>
                </>
              ) : (
                <>
                  <div className="text-xs font-black text-amber-500">{currentStep >= 4 && needBorrowRat ? `(${faRibRemaining})` : ''}</div>
                  <div className="text-xs font-black text-sky-500">{currentStep >= 3 && needBorrowRat ? `(${faRatVal})` : ''}</div>
                  <div className="text-xs font-black text-emerald-500">{currentStep >= 2 && needBorrowPul ? `(${faPulVal})` : ''}</div>
                  <div className="text-xs font-black text-rose-500">{currentStep >= 1 && needBorrowSat ? `(${faSatVal})` : ''}</div>
                </>
              )}
            </div>

            {/* Top Number Row */}
            <div className="grid grid-cols-4 gap-2 text-center text-3xl font-black text-slate-900 dark:text-white py-1">
              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">{operation === 'add' ? a.rib : fa.rib}</div>
              <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-500/20">{operation === 'add' ? a.rat : fa.rat}</div>
              <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">{operation === 'add' ? a.pul : fa.pul}</div>
              <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20">{operation === 'add' ? a.sat : fa.sat}</div>
            </div>

            {/* Bottom Number Row with Operation Sign */}
            <div className="relative mt-2">
              <div className="absolute -left-6 top-3 text-2xl font-black text-slate-400">
                {operation === 'add' ? '+' : '-'}
              </div>
              <div className="grid grid-cols-4 gap-2 text-center text-3xl font-black text-slate-900 dark:text-white py-1">
                <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">{operation === 'add' ? b.rib : fb.rib}</div>
                <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-500/20">{operation === 'add' ? b.rat : fb.rat}</div>
                <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">{operation === 'add' ? b.pul : fb.pul}</div>
                <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20">{operation === 'add' ? b.sat : fb.sat}</div>
              </div>
            </div>

            {/* Divider Line */}
            <div className="w-full h-1 bg-slate-900 dark:bg-white rounded-full my-3" />

            {/* Result Row (revealed step by step) */}
            <div className="grid grid-cols-4 gap-2 text-center text-3xl font-black text-emerald-600 dark:text-emerald-400 py-1 min-h-[56px] items-center">
              
              {/* Ribuan Result */}
              <div className={`p-2 rounded-xl border-2 transition-all ${
                currentStep >= 4
                  ? 'bg-amber-500/20 border-amber-500 text-amber-600 dark:text-amber-400 scale-105'
                  : 'border-dashed border-slate-300 dark:border-slate-700 text-slate-300 dark:text-slate-600'
              }`}>
                {currentStep >= 4 ? (operation === 'add' ? resRib : subRib) : '?'}
              </div>

              {/* Ratusan Result */}
              <div className={`p-2 rounded-xl border-2 transition-all ${
                currentStep >= 3
                  ? 'bg-sky-500/20 border-sky-500 text-sky-600 dark:text-sky-400 scale-105'
                  : 'border-dashed border-slate-300 dark:border-slate-700 text-slate-300 dark:text-slate-600'
              }`}>
                {currentStep >= 3 ? (operation === 'add' ? resRat : subRat) : '?'}
              </div>

              {/* Puluhan Result */}
              <div className={`p-2 rounded-xl border-2 transition-all ${
                currentStep >= 2
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-600 dark:text-emerald-400 scale-105'
                  : 'border-dashed border-slate-300 dark:border-slate-700 text-slate-300 dark:text-slate-600'
              }`}>
                {currentStep >= 2 ? (operation === 'add' ? resPul : subPul) : '?'}
              </div>

              {/* Satuan Result */}
              <div className={`p-2 rounded-xl border-2 transition-all ${
                currentStep >= 1
                  ? 'bg-rose-500/20 border-rose-500 text-rose-600 dark:text-rose-400 scale-105'
                  : 'border-dashed border-slate-300 dark:border-slate-700 text-slate-300 dark:text-slate-600'
              }`}>
                {currentStep >= 1 ? (operation === 'add' ? resSat : subSat) : '?'}
              </div>

            </div>

          </div>

          {/* Stepper Buttons */}
          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={handleReset}
              className="btn-tactile flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-sm border border-slate-200 dark:border-slate-700"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Ulangi</span>
            </button>

            {currentStep < 4 ? (
              <button
                onClick={handleNextStep}
                className="btn-tactile flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm shadow-md shadow-emerald-500/25"
              >
                <span>{currentStep === 0 ? 'Mulai Hitung Bersusun' : 'Langkah Berikutnya'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-emerald-500/20 border border-emerald-500 text-emerald-800 dark:text-emerald-300 font-extrabold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span>Selesai! (+1 Bintang)</span>
              </div>
            )}
          </div>

          {/* Teacher Step Narrative */}
          <div className="mt-6 w-full max-w-md p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-900/60">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
                  Penjelasan Guru Langkah #{currentStep === 0 ? 'Persiapan' : currentStep}:
                </p>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1 leading-relaxed">
                  {getStepNarrative()}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
