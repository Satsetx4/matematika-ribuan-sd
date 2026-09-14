import React, { useState } from 'react';
import { Volume2, Sparkles, CheckCircle2, RotateCcw, Lightbulb, ChevronRight } from 'lucide-react';
import { playClickSound, playSuccessSound, playGentleWrongSound, speakIndonesian } from '../utils/soundEffects';

interface PlaceValueLabProps {
  onEarnStar: () => void;
}

export const PlaceValueLab: React.FC<PlaceValueLabProps> = ({ onEarnStar }) => {
  const [currentNumber, setCurrentNumber] = useState<number>(3625);
  const [speaking, setSpeaking] = useState(false);

  // Quick challenge state
  const [challengeTarget, setChallengeTarget] = useState({
    num: 4782,
    targetDigit: 7,
    placeName: 'ratusan',
    value: 700
  });
  const [challengeAnswer, setChallengeAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Decompose current number into digits
  const thousands = Math.floor((currentNumber % 10000) / 1000);
  const hundreds = Math.floor((currentNumber % 1000) / 100);
  const tens = Math.floor((currentNumber % 100) / 10);
  const ones = currentNumber % 10;

  // Indonesian number to words conversion
  const toIndonesianWords = (num: number): string => {
    const satuanArr = ['', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'delapan', 'sembilan', 'sepuluh', 'sebelas'];
    if (num === 0) return 'nol';

    const getBelowThousand = (n: number): string => {
      let res = '';
      const r = Math.floor(n / 100);
      const rem = n % 100;
      if (r === 1) res += 'seratus ';
      else if (r > 1) res += satuanArr[r] + ' ratus ';

      if (rem > 0) {
        if (rem < 12) res += satuanArr[rem];
        else if (rem < 20) res += satuanArr[rem - 10] + ' belas';
        else {
          const p = Math.floor(rem / 10);
          const s = rem % 10;
          res += satuanArr[p] + ' puluh ';
          if (s > 0) res += satuanArr[s];
        }
      }
      return res.trim();
    };

    const rib = Math.floor(num / 1000);
    const sisa = num % 1000;
    let finalWords = '';

    if (rib === 1) finalWords += 'seribu ';
    else if (rib > 1) finalWords += getBelowThousand(rib) + ' ribu ';

    if (sisa > 0) {
      finalWords += getBelowThousand(sisa);
    }

    return finalWords.trim().replace(/\s+/g, ' ');
  };

  const numberInWords = toIndonesianWords(currentNumber);
  const capitalizedWords = numberInWords.charAt(0).toUpperCase() + numberInWords.slice(1);

  const handleSpeak = (text: string) => {
    setSpeaking(true);
    speakIndonesian(text, () => setSpeaking(false));
  };

  const presets = [3625, 2350, 5768, 4782, 9640, 1978];

  // Generate new mini challenge
  const handleNextChallenge = () => {
    playClickSound();
    const testNumbers = [
      { num: 5768, targetDigit: 7, placeName: 'Ratusan', value: 700 },
      { num: 3625, targetDigit: 3, placeName: 'Ribuan', value: 3000 },
      { num: 2350, targetDigit: 5, placeName: 'Puluhan', value: 50 },
      { num: 9640, targetDigit: 4, placeName: 'Puluhan', value: 40 },
      { num: 6305, targetDigit: 5, placeName: 'Satuan', value: 5 },
      { num: 4782, targetDigit: 4, placeName: 'Ribuan', value: 4000 },
    ];
    const pick = testNumbers[Math.floor(Math.random() * testNumbers.length)];
    setChallengeTarget(pick);
    setChallengeAnswer(null);
    setIsAnswered(false);
  };

  const checkAnswer = (val: number) => {
    setChallengeAnswer(val);
    setIsAnswered(true);
    if (val === challengeTarget.value) {
      playSuccessSound();
      onEarnStar();
    } else {
      playGentleWrongSound();
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-500/15 via-sky-500/10 to-emerald-500/15 border border-amber-400/30 dark:border-amber-500/20 rounded-3xl p-6 sm:p-8 backdrop-blur-sm relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 font-bold text-xs mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Materi Bagian A & B (Halaman 1 & 3)
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Laboratorium Nilai Tempat Bilangan Ribuan
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Setiap bilangan ribuan terdiri dari 4 angka. Posisi angka menentukan <strong>Nilai Tempat</strong> (namanya) dan <strong>Nilai Angka</strong> (jumlah nilainya).
          </p>
        </div>
      </div>

      {/* Interactive Number Controller */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Ketik atau Pilih Bilangan Ribuan:
            </label>
            <div className="flex items-center gap-3 mt-1">
              <input
                type="number"
                min={1000}
                max={9999}
                value={currentNumber}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 1000;
                  setCurrentNumber(Math.min(9999, Math.max(1000, val)));
                }}
                className="text-3xl sm:text-4xl font-black text-amber-600 dark:text-amber-400 tracking-wider bg-slate-50 dark:bg-slate-800 px-4 py-1.5 rounded-2xl border border-slate-300 dark:border-slate-700 w-44 text-center focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                onClick={() => handleSpeak(`Bilangan ${currentNumber} dibaca: ${capitalizedWords}`)}
                className="btn-tactile p-3 rounded-2xl bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-900 border border-amber-300 dark:border-amber-800"
                title="Dengarkan Cara Membaca Bilangan"
              >
                <Volume2 className={`w-5 h-5 ${speaking ? 'animate-bounce text-amber-500' : ''}`} />
              </button>
            </div>
          </div>

          {/* Quick Presets from Material PDF */}
          <div>
            <span className="text-xs font-bold text-slate-400 block mb-1">Contoh Soal Buku:</span>
            <div className="flex flex-wrap gap-1.5">
              {presets.map((preset) => (
                <button
                  key={preset}
                  onClick={() => {
                    playClickSound();
                    setCurrentNumber(preset);
                  }}
                  className={`btn-tactile px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    currentNumber === preset
                      ? 'bg-amber-500 text-white shadow-sm scale-105'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {preset.toLocaleString('id-ID')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Pronunciation banner */}
        <div className="mt-4 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/70 dark:border-amber-900/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-700 dark:text-amber-400 font-black">
              🗣️
            </div>
            <div>
              <p className="text-xs font-bold text-amber-800/80 dark:text-amber-400 uppercase tracking-wider">Cara Membaca Bilangan</p>
              <p className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-slate-100">
                "{capitalizedWords}"
              </p>
            </div>
          </div>
        </div>

        {/* 4 Color-coded Place Value Columns (Montessori / CPA Standard) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-6">
          
          {/* Ribuan */}
          <div className="rounded-2xl p-4 bg-amber-500/10 border-2 border-amber-500/40 dark:border-amber-500/30 flex flex-col items-center text-center relative overflow-hidden group hover:shadow-md transition">
            <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500 text-white shadow-sm mb-2">
              Tempat Ribuan
            </span>
            <span className="text-4xl sm:text-5xl font-black text-amber-600 dark:text-amber-400 my-1">
              {thousands}
            </span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Nilai Angka:
            </span>
            <span className="text-base sm:text-lg font-bold text-amber-700 dark:text-amber-300">
              {(thousands * 1000).toLocaleString('id-ID')}
            </span>
            {/* Visual block illustration */}
            <div className="mt-3 flex gap-1 flex-wrap justify-center min-h-[36px]">
              {Array.from({ length: thousands }).map((_, i) => (
                <div
                  key={i}
                  className="w-5 h-5 rounded-md bg-amber-500 shadow-sm border border-amber-600 flex items-center justify-center text-[9px] text-white font-bold"
                  title="1 Balok Ribuan = 1.000"
                >
                  1K
                </div>
              ))}
            </div>
          </div>

          {/* Ratusan */}
          <div className="rounded-2xl p-4 bg-sky-500/10 border-2 border-sky-500/40 dark:border-sky-500/30 flex flex-col items-center text-center relative overflow-hidden group hover:shadow-md transition">
            <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-sky-500 text-white shadow-sm mb-2">
              Tempat Ratusan
            </span>
            <span className="text-4xl sm:text-5xl font-black text-sky-600 dark:text-sky-400 my-1">
              {hundreds}
            </span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Nilai Angka:
            </span>
            <span className="text-base sm:text-lg font-bold text-sky-700 dark:text-sky-300">
              {(hundreds * 100).toLocaleString('id-ID')}
            </span>
            {/* Visual plate illustration */}
            <div className="mt-3 flex gap-1 flex-wrap justify-center min-h-[36px]">
              {Array.from({ length: hundreds }).map((_, i) => (
                <div
                  key={i}
                  className="w-4 h-4 rounded bg-sky-400 shadow-xs border border-sky-600 flex items-center justify-center text-[8px] text-white font-bold"
                  title="1 Lempeng Ratusan = 100"
                >
                  C
                </div>
              ))}
            </div>
          </div>

          {/* Puluhan */}
          <div className="rounded-2xl p-4 bg-emerald-500/10 border-2 border-emerald-500/40 dark:border-emerald-500/30 flex flex-col items-center text-center relative overflow-hidden group hover:shadow-md transition">
            <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500 text-white shadow-sm mb-2">
              Tempat Puluhan
            </span>
            <span className="text-4xl sm:text-5xl font-black text-emerald-600 dark:text-emerald-400 my-1">
              {tens}
            </span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Nilai Angka:
            </span>
            <span className="text-base sm:text-lg font-bold text-emerald-700 dark:text-emerald-300">
              {(tens * 10).toLocaleString('id-ID')}
            </span>
            {/* Visual rod illustration */}
            <div className="mt-3 flex gap-1 flex-wrap justify-center min-h-[36px]">
              {Array.from({ length: tens }).map((_, i) => (
                <div
                  key={i}
                  className="w-2.5 h-6 rounded-xs bg-emerald-500 shadow-xs border border-emerald-600"
                  title="1 Batang Puluhan = 10"
                />
              ))}
            </div>
          </div>

          {/* Satuan */}
          <div className="rounded-2xl p-4 bg-rose-500/10 border-2 border-rose-500/40 dark:border-rose-500/30 flex flex-col items-center text-center relative overflow-hidden group hover:shadow-md transition">
            <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-500 text-white shadow-sm mb-2">
              Tempat Satuan
            </span>
            <span className="text-4xl sm:text-5xl font-black text-rose-600 dark:text-rose-400 my-1">
              {ones}
            </span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Nilai Angka:
            </span>
            <span className="text-base sm:text-lg font-bold text-rose-700 dark:text-rose-300">
              {ones.toLocaleString('id-ID')}
            </span>
            {/* Visual unit cubes */}
            <div className="mt-3 flex gap-1 flex-wrap justify-center min-h-[36px]">
              {Array.from({ length: ones }).map((_, i) => (
                <div
                  key={i}
                  className="w-2.5 h-2.5 rounded-xs bg-rose-500 shadow-xs border border-rose-600"
                  title="1 Kubus Satuan = 1"
                />
              ))}
            </div>
          </div>

        </div>

        {/* Bentuk Panjang (Expanded Form) */}
        <div className="mt-6 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Bentuk Panjang Bilangan:
          </p>
          <div className="mt-2 text-lg sm:text-2xl font-extrabold flex flex-wrap items-center gap-2">
            <span className="text-slate-900 dark:text-white font-black">
              {currentNumber.toLocaleString('id-ID')}
            </span>
            <span className="text-slate-400">=</span>
            <span className="text-amber-600 dark:text-amber-400">
              {(thousands * 1000).toLocaleString('id-ID')}
            </span>
            <span className="text-slate-400">+</span>
            <span className="text-sky-600 dark:text-sky-400">
              {(hundreds * 100).toLocaleString('id-ID')}
            </span>
            <span className="text-slate-400">+</span>
            <span className="text-emerald-600 dark:text-emerald-400">
              {(tens * 10).toLocaleString('id-ID')}
            </span>
            <span className="text-slate-400">+</span>
            <span className="text-rose-600 dark:text-rose-400">
              {ones}
            </span>
          </div>
        </div>

      </div>

      {/* Mini Interactive Practice Challenge */}
      <div className="bg-gradient-to-br from-amber-500/10 via-white to-sky-500/10 dark:from-slate-900 dark:via-slate-900 dark:to-slate-850 border border-amber-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black">
              🎯
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
                Tantangan Kilat: Tebak Nilai Angka!
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Uji pemahamanmu untuk meraih bintang tambahan
              </p>
            </div>
          </div>
          <button
            onClick={handleNextChallenge}
            className="btn-tactile flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Ganti Soal</span>
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mb-5">
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200">
            Perhatikan bilangan <span className="font-extrabold text-amber-600 dark:text-amber-400 text-lg px-2 py-0.5 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800">{challengeTarget.num.toLocaleString('id-ID')}</span>.
            Berapa <strong>Nilai Angka</strong> dari angka <strong>{challengeTarget.targetDigit}</strong> (tempat {challengeTarget.placeName})?
          </p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            challengeTarget.targetDigit,
            challengeTarget.targetDigit * 10,
            challengeTarget.targetDigit * 100,
            challengeTarget.targetDigit * 1000
          ].map((val) => {
            const isSelected = challengeAnswer === val;
            const isCorrect = val === challengeTarget.value;

            let btnStyle = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-amber-400';
            if (isAnswered) {
              if (isCorrect) {
                btnStyle = 'bg-emerald-500 text-white border-emerald-600 shadow-md scale-105';
              } else if (isSelected) {
                btnStyle = 'bg-rose-500 text-white border-rose-600';
              } else {
                btnStyle = 'opacity-40 bg-slate-100 dark:bg-slate-800';
              }
            }

            return (
              <button
                key={val}
                disabled={isAnswered}
                onClick={() => checkAnswer(val)}
                className={`btn-tactile p-4 rounded-2xl border-2 font-extrabold text-lg transition-all ${btnStyle}`}
              >
                {val.toLocaleString('id-ID')}
              </button>
            );
          })}
        </div>

        {/* Feedback notification */}
        {isAnswered && (
          <div className={`mt-4 p-4 rounded-2xl flex items-center justify-between ${
            challengeAnswer === challengeTarget.value
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
              : 'bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-200'
          }`}>
            <div className="flex items-center gap-3">
              {challengeAnswer === challengeTarget.value ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <Lightbulb className="w-5 h-5 text-amber-500" />
              )}
              <span className="text-sm font-semibold">
                {challengeAnswer === challengeTarget.value
                  ? `Hebat! Angka ${challengeTarget.targetDigit} berada di tempat ${challengeTarget.placeName}, bernilai ${challengeTarget.value.toLocaleString('id-ID')}. (+1 Bintang!)`
                  : `Kurang tepat. Angka ${challengeTarget.targetDigit} berada di tempat ${challengeTarget.placeName}, sehingga bernilai ${challengeTarget.value.toLocaleString('id-ID')}.`}
              </span>
            </div>
            <button
              onClick={handleNextChallenge}
              className="btn-tactile flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-white shadow-xs"
            >
              <span>Lanjut</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
