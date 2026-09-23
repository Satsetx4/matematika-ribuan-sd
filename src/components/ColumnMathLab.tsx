import React, { useState } from 'react';
import { Calculator, Plus, Minus, CheckCircle2, RotateCcw, ArrowRight, GraduationCap } from 'lucide-react';
import { playClickSound, playSuccessSound, playGentleWrongSound } from '../utils/soundEffects';
import { explainSubtraction } from '../domain/math/subtraction';
import { validateBoundedIntegerInput } from '../domain/math/numericInput';
import { addNumbers } from '../domain/math/addition';

interface ColumnMathLabProps {
  onCompleteActivity: (activityId: string) => void;
}

export const ColumnMathLab: React.FC<ColumnMathLabProps> = ({ onCompleteActivity }) => {
  type Operation = 'add' | 'subtract';
  const [operation, setOperation] = useState<Operation>('add');
  const [numA, setNumA] = useState<number>(2250);
  const [numB, setNumB] = useState<number>(1375);
  const [answerDraft, setAnswerDraft] = useState('');
  const [answerError, setAnswerError] = useState('');
  const [answerFeedback, setAnswerFeedback] = useState<'correct' | 'wrong' | null>(null);

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

  // Keep the larger value on top for a non-negative written subtraction.
  const finalNumA = operation === 'subtract' && numA < numB ? numB : numA;
  const finalNumB = operation === 'subtract' && numA < numB ? numA : numB;
  const fa = getDigits(finalNumA);
  const fb = getDigits(finalNumB);
  const subtraction = operation === 'subtract' ? explainSubtraction(finalNumA, finalNumB) : null;
  const visibleSubtractionDigits = currentStep > 0 && subtraction
    ? subtraction.steps[currentStep - 1].digitsAfterBorrow
    : subtraction?.initialDigits ?? [fa.rib, fa.rat, fa.pul, fa.sat];
  const subtractionResults = subtraction
    ? [subtraction.steps[3].resultDigit, subtraction.steps[2].resultDigit, subtraction.steps[1].resultDigit, subtraction.steps[0].resultDigit]
    : [0, 0, 0, 0];

  const expectedAnswer = operation === 'add' ? addNumbers(numA, numB) : finalNumA - finalNumB;

  const resetAttempt = () => {
    setCurrentStep(0);
    setAnswerDraft('');
    setAnswerError('');
    setAnswerFeedback(null);
  };

  const handleCheckAnswer = () => {
    playClickSound();
    const parsed = validateBoundedIntegerInput(answerDraft, 0, 19998);
    if (!parsed.valid) {
      setAnswerError(parsed.message);
      setAnswerFeedback(null);
      return;
    }
    setAnswerError('');
    if (parsed.value === expectedAnswer) {
      setAnswerFeedback('correct');
      setCurrentStep(1);
      playSuccessSound();
    } else {
      setAnswerFeedback('wrong');
      playGentleWrongSound();
    }
  };

  const handleNextStep = () => {
    playClickSound();
    if (currentStep < 4) {
      const next = currentStep + 1;
      setCurrentStep(next);
      if (next === 4) {
        playSuccessSound();
        onCompleteActivity(operation === 'add' ? 'column-addition-01' : 'column-subtraction-01');
      }
    }
  };

  const handleReset = () => {
    playClickSound();
    resetAttempt();
  };

  const loadPreset = (op: Operation, top: number, bottom: number) => {
    playClickSound();
    setOperation(op);
    setNumA(top);
    setNumB(bottom);
    resetAttempt();
  };

  // Explanation notes for each step
  const getStepNarrative = () => {
    if (currentStep === 0) {
      return 'Coba hitung hasilnya dahulu. Setelah jawaban benar, kita telusuri langkah satuan sampai ribuan bersama-sama.';
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
      const step = subtraction?.steps[currentStep - 1];
      if (!step || !subtraction) return '';
      const placeIndex: Record<string, number> = { ribuan: 0, ratusan: 1, puluhan: 2, satuan: 3 };
      const transferNotes = step.borrowTransfers.map((transfer, index) => {
        const before = index === 0 ? subtraction.initialDigits : step.borrowTransfers[index - 1].digits;
        const fromIndex = placeIndex[transfer.from];
        const toIndex = placeIndex[transfer.to];
        return `Pinjam 1 ${transfer.from} ke ${transfer.to}: ${transfer.from} berubah dari ${before[fromIndex]} menjadi ${transfer.digits[fromIndex]}, ${transfer.to} berubah dari ${before[toIndex]} menjadi ${transfer.digits[toIndex]}.`;
      });
      const explanation = transferNotes.length ? `${transferNotes.join(' ')} ` : '';
      return `Langkah ${currentStep} (${step.place}): ${explanation}${step.topDigit} - ${step.bottomDigit} = ${step.resultDigit}.`;
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
                resetAttempt();
              }}
              className={`btn-tactile min-h-11 flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs sm:text-sm font-extrabold transition-all ${
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
                resetAttempt();
              }}
              className={`btn-tactile min-h-11 flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs sm:text-sm font-extrabold transition-all ${
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
              className="btn-tactile min-h-11 text-xs font-bold px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-100 dark:hover:bg-emerald-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
            >
              2.250 + 1.375
            </button>
            <button
              onClick={() => loadPreset('add', 2346, 1527)}
              className="btn-tactile min-h-11 text-xs font-bold px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-100 dark:hover:bg-emerald-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
            >
              2.346 + 1.527
            </button>
            <button
              onClick={() => loadPreset('subtract', 8500, 1375)}
              className="btn-tactile min-h-11 text-xs font-bold px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-100 dark:hover:bg-rose-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
            >
              8.500 - 1.375
            </button>
            <button
              onClick={() => loadPreset('subtract', 7245, 2138)}
              className="btn-tactile min-h-11 text-xs font-bold px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-100 dark:hover:bg-rose-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
            >
              7.245 - 2.138
            </button>
          </div>
        </div>

        {/* Step-by-Step Interactive Board */}
        <div className="mt-8 flex flex-col items-center">

          {currentStep === 0 && (
            <form
              className="mb-6 w-full max-w-md rounded-2xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50/70 dark:bg-emerald-950/30 p-4"
              onSubmit={(event) => {
                event.preventDefault();
                handleCheckAnswer();
              }}
            >
              <label htmlFor="column-answer" className="block text-sm font-extrabold text-slate-900 dark:text-white">
                Tantangan: berapa hasil hitungnya?
              </label>
              <p className="mt-1 text-base font-black text-emerald-800 dark:text-emerald-200">
                {finalNumA.toLocaleString('id-ID')} {operation === 'add' ? '+' : '−'} {finalNumB.toLocaleString('id-ID')}
              </p>
              <div className="mt-3 flex gap-2">
                <input
                  id="column-answer"
                  aria-label="Jawaban tantangan hitung"
                  type="text"
                  inputMode="numeric"
                  value={answerDraft}
                  onChange={(event) => {
                    setAnswerDraft(event.target.value);
                    setAnswerError('');
                    setAnswerFeedback(null);
                  }}
                  aria-describedby={answerError ? 'column-answer-error' : undefined}
                  aria-invalid={answerError ? 'true' : undefined}
                  className="min-h-11 min-w-0 flex-1 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 text-base font-bold"
                />
                <button type="submit" className="btn-tactile min-h-11 rounded-xl bg-emerald-600 px-4 font-extrabold text-white">Periksa</button>
              </div>
              {answerError && <p id="column-answer-error" role="alert" className="mt-2 text-xs font-semibold text-rose-600">{answerError}</p>}
              {answerFeedback === 'wrong' && <p role="status" className="mt-2 text-xs font-semibold text-rose-700 dark:text-rose-300">Belum tepat. Coba hitung lagi dari kolom satuan.</p>}
            </form>
          )}
          {answerFeedback === 'correct' && currentStep > 0 && (
            <p role="status" className="mb-4 w-full max-w-md rounded-xl bg-emerald-100 dark:bg-emerald-950/60 p-3 text-sm font-bold text-emerald-800 dark:text-emerald-200">
              Jawaban benar. Sekarang ikuti prosesnya dari satuan.
            </p>
          )}
          
          {/* The Arithmetic Grid */}
          <div className="bg-slate-50 dark:bg-slate-800/80 border-2 border-slate-200 dark:border-slate-700 rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-inner">
            
            {/* Column Headers (Place Values) */}
            <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-black uppercase tracking-wider mb-2">
              <span className="text-amber-600 dark:text-amber-400">Ribuan</span>
              <span className="text-sky-600 dark:text-sky-400">Ratusan</span>
              <span className="text-emerald-600 dark:text-emerald-400">Puluhan</span>
              <span className="text-rose-600 dark:text-rose-400">Satuan</span>
            </div>

            {operation === 'subtract' && currentStep > 0 && (
              <p className="mb-1 text-center text-[10px] font-bold text-slate-500 dark:text-slate-400">Angka atas setelah peminjaman · ribuan ke satuan</p>
            )}

            {/* Top Number Row */}
            <div className="grid grid-cols-4 gap-2 text-center text-3xl font-black text-slate-900 dark:text-white py-1">
              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">{operation === 'add' ? a.rib : visibleSubtractionDigits[0]}</div>
              <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-500/20">{operation === 'add' ? a.rat : visibleSubtractionDigits[1]}</div>
              <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">{operation === 'add' ? a.pul : visibleSubtractionDigits[2]}</div>
              <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20">{operation === 'add' ? a.sat : visibleSubtractionDigits[3]}</div>
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
                {currentStep >= 4 ? (operation === 'add' ? resRib : subtractionResults[0]) : '?'}
              </div>

              {/* Ratusan Result */}
              <div className={`p-2 rounded-xl border-2 transition-all ${
                currentStep >= 3
                  ? 'bg-sky-500/20 border-sky-500 text-sky-600 dark:text-sky-400 scale-105'
                  : 'border-dashed border-slate-300 dark:border-slate-700 text-slate-300 dark:text-slate-600'
              }`}>
                {currentStep >= 3 ? (operation === 'add' ? resRat : subtractionResults[1]) : '?'}
              </div>

              {/* Puluhan Result */}
              <div className={`p-2 rounded-xl border-2 transition-all ${
                currentStep >= 2
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-600 dark:text-emerald-400 scale-105'
                  : 'border-dashed border-slate-300 dark:border-slate-700 text-slate-300 dark:text-slate-600'
              }`}>
                {currentStep >= 2 ? (operation === 'add' ? resPul : subtractionResults[2]) : '?'}
              </div>

              {/* Satuan Result */}
              <div className={`p-2 rounded-xl border-2 transition-all ${
                currentStep >= 1
                  ? 'bg-rose-500/20 border-rose-500 text-rose-600 dark:text-rose-400 scale-105'
                  : 'border-dashed border-slate-300 dark:border-slate-700 text-slate-300 dark:text-slate-600'
              }`}>
                {currentStep >= 1 ? (operation === 'add' ? resSat : subtractionResults[3]) : '?'}
              </div>

            </div>

          </div>

          {/* Stepper Buttons */}
          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={handleReset}
              className="btn-tactile min-h-11 flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-sm border border-slate-200 dark:border-slate-700"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Ulangi</span>
            </button>

            {currentStep === 0 ? null : currentStep < 4 ? (
              <button
                onClick={handleNextStep}
                className="btn-tactile min-h-11 flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm shadow-md shadow-emerald-500/25"
              >
                <span>Langkah Berikutnya</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-emerald-500/20 border border-emerald-500 text-emerald-800 dark:text-emerald-300 font-extrabold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span>Misi hitung selesai!</span>
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
