import React, { useState } from 'react';
import { TrendingUp, ShoppingBag, ArrowDownRight, ArrowUpRight, GraduationCap, Lightbulb } from 'lucide-react';
import { playClickSound, playSuccessSound, playGentleWrongSound } from '../utils/soundEffects';
import { NumberInput } from './ui/NumberInput';
import { getRoundingDigit, roundToPlace } from '../domain/math/rounding';

interface RoundingRollercoasterProps {
  onCompleteActivity: (activityId: string) => void;
}

const CHALLENGE_NUMBERS = [3241, 6782, 2315, 4620, 5180, 7590, 8925];

export const RoundingRollercoaster: React.FC<RoundingRollercoasterProps> = ({ onCompleteActivity }) => {
  const [inputNumber, setInputNumber] = useState<number>(3241);
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [challengeAnswer, setChallengeAnswer] = useState<number | null>(null);
  const [challengeFeedback, setChallengeFeedback] = useState<'correct' | 'wrong' | null>(null);

  // Shopping Estimator state (From Page 7 PDF)
  const initialMoney = 6450;
  const itemCost = 2280;

  // Rounding breakdown
  const ribuan = Math.floor(inputNumber / 1000);
  const ratusan = getRoundingDigit(inputNumber, 1000);
  const isRoundUp = ratusan >= 5;
  const roundedResult = roundToPlace(inputNumber, 1000);

  const challengeNumber = CHALLENGE_NUMBERS[challengeIndex];
  const challengeHundreds = getRoundingDigit(challengeNumber, 1000);
  const challengeResult = roundToPlace(challengeNumber, 1000);
  const challengeOptions = [...new Set([
    Math.floor(challengeNumber / 1000) * 1000,
    challengeResult,
    (Math.floor(challengeNumber / 1000) + 1) * 1000,
  ])].sort((a, b) => a - b);

  const handleChallengeSubmit = () => {
    if (challengeAnswer === null) return;
    playClickSound();
    if (challengeAnswer === challengeResult) {
      setChallengeFeedback('correct');
      playSuccessSound();
      onCompleteActivity(`rounding-${String(challengeIndex + 1).padStart(2, '0')}`);
    } else {
      setChallengeFeedback('wrong');
      playGentleWrongSound();
    }
  };

  const handleNextChallenge = () => {
    if (challengeIndex >= CHALLENGE_NUMBERS.length - 1) return;
    playClickSound();
    setChallengeIndex((index) => index + 1);
    setChallengeAnswer(null);
    setChallengeFeedback(null);
  };

  // Shopping estimation calculations
  const roundedMoney = roundToPlace(initialMoney, 1000);
  const roundedCost = roundToPlace(itemCost, 1000);
  const estimatedDiff = roundedMoney - roundedCost;
  const exactDiff = initialMoney - itemCost;

  const pdfPresets = [
    { num: 3241, label: '3.241 (Hal 6)' },
    { num: 6782, label: '6.782 (Hal 6)' },
    { num: 2315, label: '2.315 (Hal 6)' },
    { num: 4620, label: '4.620 (Hal 6)' },
    { num: 5180, label: '5.180 (Hal 7)' },
    { num: 7590, label: '7.590 (Hal 7)' },
    { num: 8925, label: '8.925 (Hal 7)' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-purple-500/15 via-pink-500/10 to-amber-500/15 border border-purple-400/30 dark:border-purple-500/20 rounded-3xl p-6 sm:p-8 backdrop-blur-sm">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-800 dark:text-purple-300 font-bold text-xs mb-3">
            <TrendingUp className="w-3.5 h-3.5" />
            Materi Bagian 5 & 6 (Halaman 6 & 7)
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Bukit Rollercoaster Pembulatan & Taksiran Belanja
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Pembulatan ke ribuan terdekat cukup dengan <strong>MELIHAT ANGKA RATUSANNYA</strong>! Jika 0–4 meluncur turun, jika 5–9 mendaki naik.
          </p>
        </div>
      </div>

      {/* 1. Bukit Rollercoaster Pembulatan */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        
        {/* Header & Presets */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-500" />
              <span>Simulator Rollercoaster Pembulatan</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Ketik angka ribuan atau pilih contoh dari buku materi
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {pdfPresets.map((p, idx) => (
              <button
                key={idx}
                onClick={() => {
                  playClickSound();
                  setInputNumber(p.num);
                }}
                className={`btn-tactile min-h-11 text-xs font-bold px-2.5 py-1 rounded-xl border transition-all ${
                  inputNumber === p.num
                    ? 'bg-purple-500 text-white border-purple-600 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-purple-100'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Rollercoaster Visual Track */}
        <div className="mt-8 relative bg-gradient-to-b from-purple-50/50 to-indigo-50/50 dark:from-slate-950 dark:to-slate-900 border border-purple-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 overflow-hidden">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            
            {/* Input Box */}
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Bilangan Awal:
              </span>
              <NumberInput
                key={inputNumber}
                id="rounding-number"
                label="Bilangan awal untuk simulator pembulatan"
                min={1000}
                max={9999}
                value={inputNumber}
                onCommit={setInputNumber}
                labelClassName="sr-only"
                className="text-3xl sm:text-4xl font-black text-purple-600 dark:text-purple-400 bg-white dark:bg-slate-800 border-2 border-purple-300 dark:border-purple-700 px-4 py-2 rounded-2xl text-center w-48 shadow-sm focus:outline-none"
              />
              <div className="mt-2 text-xs font-bold text-slate-500 dark:text-slate-400">
                Angka Ratusan: <span className="text-sky-600 dark:text-sky-400 font-black text-base px-1.5 py-0.5 bg-sky-100 dark:bg-sky-950/60 rounded-md border border-sky-300 dark:border-sky-800">{ratusan}</span>
              </div>
            </div>

            {/* Rollercoaster Mountain Illustration */}
            <div className="flex flex-col items-center flex-1 max-w-sm px-4">
              
              {/* Dynamic Status Badge */}
              <div className={`px-4 py-1.5 rounded-full text-xs font-extrabold flex items-center gap-1.5 shadow-sm mb-3 ${
                isRoundUp
                  ? 'bg-emerald-500 text-white animate-bounce'
                  : 'bg-amber-500 text-white'
              }`}>
                {isRoundUp ? (
                  <>
                    <ArrowUpRight className="w-4 h-4" />
                    <span>Ratusan ≥ 5 → DIBULATKAN NAIK!</span>
                  </>
                ) : (
                  <>
                    <ArrowDownRight className="w-4 h-4" />
                    <span>Ratusan ≤ 4 → DIBULATKAN TURUN!</span>
                  </>
                )}
              </div>

              {/* Rollercoaster Cart Simulation */}
              <div className="w-full h-24 relative flex items-center justify-center">
                <div className="w-full h-2 bg-slate-300 dark:bg-slate-700 rounded-full relative">
                  {/* Cart */}
                  <div
                    className="absolute -top-7 transition-all duration-500 flex flex-col items-center"
                    style={{ left: `${(ratusan / 9) * 85}%` }}
                  >
                    <div className="w-7 h-7 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-md">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-black px-1.5 py-0.2 rounded bg-purple-700 text-white mt-0.5">
                      {ratusan}
                    </span>
                  </div>
                </div>
              </div>

              {/* Range Scale */}
              <div className="w-full flex justify-between text-[11px] font-bold text-slate-400 mt-1">
                <span className="text-amber-600 dark:text-amber-400">0, 1, 2, 3, 4 (Turun)</span>
                <span className="text-emerald-600 dark:text-emerald-400">5, 6, 7, 8, 9 (Naik)</span>
              </div>
            </div>

            {/* Rounded Result Box */}
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Hasil Pembulatan:
              </span>
              <div className="text-3xl sm:text-4xl font-black text-white bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-2 rounded-2xl shadow-lg shadow-purple-500/20">
                {roundedResult.toLocaleString('id-ID')}
              </div>
              <span className="inline-block mt-2 text-xs font-bold text-purple-700 dark:text-purple-300">
                Ribuan Terdekat
              </span>
            </div>

          </div>

          {/* Teacher Rule Summary */}
          <div className="mt-8 p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <strong>Penjelasan Guru:</strong> Pada bilangan <strong>{inputNumber.toLocaleString('id-ID')}</strong>, angka ratusannya adalah <strong>{ratusan}</strong>.
              {isRoundUp ? (
                <> Karena angka ratusan <strong>{ratusan} ≥ 5</strong>, maka dibulatkan <strong>NAIK</strong>. Angka ribuan {ribuan} ditambah 1 menjadi {ribuan + 1}, sehingga hasilnya adalah <strong>{roundedResult.toLocaleString('id-ID')}</strong>.</>
              ) : (
                <> Karena angka ratusan <strong>{ratusan} ≤ 4</strong>, maka dibulatkan <strong>TURUN</strong>. Angka ribuan tetap {ribuan}, sehingga hasilnya adalah <strong>{roundedResult.toLocaleString('id-ID')}</strong>.</>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* Tantangan pembulatan dengan jawaban aktif */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm" aria-labelledby="rounding-challenge-title">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h3 id="rounding-challenge-title" className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">Tantangan Pembulatan</h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Baca angkanya, tentukan hasil pembulatan ke ribuan terdekat, lalu periksa jawabanmu.</p>
          </div>
        </div>

        <form className="mt-5" onSubmit={(event) => { event.preventDefault(); handleChallengeSubmit(); }}>
          <p className="text-base font-extrabold text-slate-900 dark:text-white">
            Misi {challengeIndex + 1} dari {CHALLENGE_NUMBERS.length}: bulatkan <span className="text-purple-700 dark:text-purple-300">{challengeNumber.toLocaleString('id-ID')}</span> ke ribuan terdekat.
          </p>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2" role="group" aria-label="Pilihan hasil pembulatan">
            {challengeOptions.map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={challengeAnswer === option}
                disabled={challengeFeedback === 'correct'}
                onClick={() => { setChallengeAnswer(option); setChallengeFeedback(null); }}
                className={`btn-tactile min-h-11 rounded-xl border-2 px-4 py-2 font-extrabold ${challengeAnswer === option ? 'border-purple-500 bg-purple-100 text-purple-900 dark:bg-purple-950 dark:text-purple-100' : 'border-slate-200 bg-slate-50 text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100'}`}
              >
                {option.toLocaleString('id-ID')}
              </button>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <button type="submit" disabled={challengeAnswer === null || challengeFeedback === 'correct'} className="btn-tactile min-h-11 rounded-xl bg-purple-600 px-5 py-2 font-extrabold text-white disabled:opacity-50">Periksa Jawaban</button>
            {challengeFeedback === 'wrong' && <p role="status" className="text-sm font-semibold text-rose-700 dark:text-rose-300">Belum tepat. Periksa angka ratusannya, lalu coba lagi.</p>}
            {challengeFeedback === 'correct' && (
              <p role="status" className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                Benar. Angka ratusannya {challengeHundreds}; {challengeHundreds >= 5 ? 'karena 5–9, ribuan dibulatkan naik' : 'karena 0–4, ribuan tetap'} menjadi {challengeResult.toLocaleString('id-ID')}.
              </p>
            )}
          </div>
        </form>

        {challengeFeedback === 'correct' && challengeIndex < CHALLENGE_NUMBERS.length - 1 && (
          <button type="button" onClick={handleNextChallenge} className="btn-tactile mt-4 min-h-11 rounded-xl bg-slate-100 px-4 py-2 font-bold text-slate-800 border border-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700">Tantangan Berikutnya</button>
        )}
        {challengeFeedback === 'correct' && challengeIndex === CHALLENGE_NUMBERS.length - 1 && (
          <p className="mt-4 text-sm font-bold text-emerald-700 dark:text-emerald-300">Semua tantangan selesai. Kamu dapat mengulang untuk berlatih.</p>
        )}
      </section>

      {/* 2. Kasir Belanja Pintar (Taksiran Sehari-hari Hal 7) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        
        <div className="flex items-center gap-3 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-xl">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              Toko Taksiran Belanja Sehari-hari (Kasus Rina Hal 7)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Belajar menaksir uang belanjaan dengan cepat sebelum membayar ke kasir
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          
          {/* Sisi Kiri: Taksiran Cepat */}
          <div className="p-6 rounded-3xl bg-amber-50/60 dark:bg-amber-950/30 border-2 border-amber-300 dark:border-amber-800/80">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black uppercase tracking-wider text-amber-800 dark:text-amber-400">
                ⚡ Cara Cepat: Taksiran Pembulatan
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200">
                Perkiraan
              </span>
            </div>

            <div className="space-y-3 text-sm font-semibold text-slate-800 dark:text-slate-200">
              <div className="flex justify-between items-center pb-2 border-b border-amber-200 dark:border-amber-900">
                <span>Uang Rina (Rp{initialMoney.toLocaleString('id-ID')}):</span>
                <span className="font-extrabold text-amber-700 dark:text-amber-400">
                  ≈ Rp{roundedMoney.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-amber-200 dark:border-amber-900">
                <span>Harga Pensil (Rp{itemCost.toLocaleString('id-ID')}):</span>
                <span className="font-extrabold text-amber-700 dark:text-amber-400">
                  ≈ Rp{roundedCost.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 text-base font-black text-amber-900 dark:text-amber-300">
                <span>Taksiran Sisa Uang:</span>
                <span>Rp{estimatedDiff.toLocaleString('id-ID')}</span>
              </div>
            </div>

            <p className="text-xs text-amber-700/80 dark:text-amber-400/80 mt-4 leading-relaxed">
              *Hanya butuh 2 detik di dalam kepala: 6.000 dikurangi 2.000 = 4.000!
            </p>
          </div>

          {/* Sisi Kanan: Hitungan Sebenarnya */}
          <div className="p-6 rounded-3xl bg-sky-50/60 dark:bg-sky-950/30 border-2 border-sky-300 dark:border-sky-800/80">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black uppercase tracking-wider text-sky-800 dark:text-sky-400">
                🎯 Cara Teliti: Hitungan Sebenarnya
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-sky-200 dark:bg-sky-900 text-sky-900 dark:text-sky-200">
                Eksak
              </span>
            </div>

            <div className="space-y-3 text-sm font-semibold text-slate-800 dark:text-slate-200">
              <div className="flex justify-between items-center pb-2 border-b border-sky-200 dark:border-sky-900">
                <span>Uang Rina mula-mula:</span>
                <span className="font-extrabold text-sky-700 dark:text-sky-400">
                  Rp{initialMoney.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-sky-200 dark:border-sky-900">
                <span>Harga beli tempat pensil:</span>
                <span className="font-extrabold text-sky-700 dark:text-sky-400">
                  - Rp{itemCost.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 text-base font-black text-sky-900 dark:text-sky-300">
                <span>Hasil Sebenarnya:</span>
                <span>Rp{exactDiff.toLocaleString('id-ID')}</span>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-xl bg-white dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center justify-between">
              <span>Selisih Taksiran vs Nyata:</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">
                Hanya Rp{Math.abs(exactDiff - estimatedDiff)} (Sangat Dekat!)
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
