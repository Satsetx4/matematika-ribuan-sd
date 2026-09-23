import React, { useState } from 'react';
import { Search, Volume2, CheckCircle2, ArrowRight, BookOpen, Brain, Calculator, Award } from 'lucide-react';
import { playClickSound, playSuccessSound, playGentleWrongSound, speakIndonesian } from '../utils/soundEffects';

interface StoryDetectiveLabProps {
  onCompleteActivity: (activityId: string) => void;
}

interface StoryCase {
  id: string;
  title: string;
  storyText: string;
  keywords: { word: string; op: '+' | '-' }[];
  known: string[];
  asked: string;
  step1Formula: string;
  step1Result: string;
  step2Formula?: string;
  step2Result?: string;
  finalAnswer: string;
}

export const StoryDetectiveLab: React.FC<StoryDetectiveLabProps> = ({ onCompleteActivity }) => {
  const storyCases: StoryCase[] = [
    {
      id: 'case-1',
      title: 'Kasus 1: Buah Mangga Pak Budi (Operasi 2 Tahap - Hal 6)',
      storyText: 'Pak Budi memiliki 4.250 buah mangga. Ia membeli lagi 1.375 buah mangga. Setelah itu, 2.150 buah mangga dibagikan kepada warga. Berapa sisa buah mangga yang tersisa?',
      keywords: [
        { word: 'membeli lagi', op: '+' },
        { word: 'dibagikan', op: '-' },
        { word: 'tersisa', op: '-' }
      ],
      known: [
        'Mangga mula-mula: 4.250 buah',
        'Membeli lagi: 1.375 buah',
        'Dibagikan ke warga: 2.150 buah'
      ],
      asked: 'Berapa sisa buah mangga yang tersisa?',
      step1Formula: '4.250 + 1.375',
      step1Result: '5.625 buah mangga (setelah membeli lagi)',
      step2Formula: '5.625 - 2.150',
      step2Result: '3.475 buah mangga',
      finalAnswer: 'Jadi, buah mangga yang tersisa adalah 3.475 buah.'
    },
    {
      id: 'case-2',
      title: 'Kasus 2: Pensil Rana & Nina (Hal 5)',
      storyText: 'Rana mempunyai 2.250 pensil. Kemudian Rana mendapat lagi 1.375 pensil dari toko. Berapa jumlah seluruh pensil Rana sekarang?',
      keywords: [
        { word: 'mendapat lagi', op: '+' },
        { word: 'jumlah seluruh', op: '+' }
      ],
      known: [
        'Pensil awal Rana: 2.250 pensil',
        'Mendapat lagi: 1.375 pensil'
      ],
      asked: 'Berapa jumlah seluruh pensil Rana sekarang?',
      step1Formula: '2.250 + 1.375',
      step1Result: '3.625 pensil',
      finalAnswer: 'Jadi, jumlah seluruh pensil Rana sekarang adalah 3.625 pensil.'
    },
    {
      id: 'case-3',
      title: 'Kasus 3: Uang Jajan Bayu (Hal 5)',
      storyText: 'Bayu mempunyai uang Rp3.650. Ia membeli buku seharga Rp1.175. Berapa sisa uang kembalian yang masih tersisa pada Bayu?',
      keywords: [
        { word: 'membeli', op: '-' },
        { word: 'uang yang tersisa', op: '-' }
      ],
      known: [
        'Uang awal Bayu: Rp3.650',
        'Uang yang digunakan belanja: Rp1.175'
      ],
      asked: 'Berapa uang yang tersisa?',
      step1Formula: 'Rp3.650 - Rp1.175',
      step1Result: 'Rp2.475',
      finalAnswer: 'Jadi, uang Bayu yang tersisa adalah Rp2.475.'
    },
    {
      id: 'case-4',
      title: 'Kasus 4: Gudang Buku Sekolah (Hal 6)',
      storyText: 'Sebuah toko buku memiliki 7.245 buku tulis. Sebanyak 2.138 buku tulis telah terjual kepada murid sekolah. Berapa buku tulis yang tersisa?',
      keywords: [
        { word: 'terjual', op: '-' },
        { word: 'tersisa', op: '-' }
      ],
      known: [
        'Total buku tulis di toko: 7.245 buku',
        'Buku yang terjual: 2.138 buku'
      ],
      asked: 'Berapa buku tulis yang masih tersisa?',
      step1Formula: '7.245 - 2.138',
      step1Result: '5.107 buku',
      finalAnswer: 'Jadi, buku tulis yang tersisa adalah 5.107 buku.'
    }
  ];

  const [selectedCase, setSelectedCase] = useState<StoryCase>(storyCases[0]);
  const [activeStep, setActiveStep] = useState<number>(1);
  const [speaking, setSpeaking] = useState(false);
  const [selectedKnown, setSelectedKnown] = useState<string[]>([]);
  const [askedChoice, setAskedChoice] = useState('');
  const [operationChoice, setOperationChoice] = useState('');
  const [thinkingFeedback, setThinkingFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [thinkingVerified, setThinkingVerified] = useState(false);

  const knownOptions = [...new Set([
    ...selectedCase.known,
    ...storyCases.flatMap((storyCase) => storyCase.known).filter((fact) => !selectedCase.known.includes(fact)).slice(0, 2),
  ])];
  const askedOptions = [...new Set([
    selectedCase.asked,
    ...storyCases.map((storyCase) => storyCase.asked).filter((question) => question !== selectedCase.asked).slice(0, 2),
  ])];
  const expectedOperations = [selectedCase.step1Formula, selectedCase.step2Formula]
    .filter((formula): formula is string => Boolean(formula))
    .map((formula) => formula.includes('+') ? '+' : '-')
    .join(',');
  const operationOptions = [
    { value: '+', label: 'Penjumlahan' },
    { value: '-', label: 'Pengurangan' },
    { value: '+,-', label: 'Penjumlahan lalu pengurangan' },
    { value: '-,+', label: 'Pengurangan lalu penjumlahan' },
  ];

  const handleSpeak = (text: string) => {
    setSpeaking(true);
    speakIndonesian(text, () => setSpeaking(false));
  };

  const handleCaseChange = (c: StoryCase) => {
    playClickSound();
    setSelectedCase(c);
    setActiveStep(1);
    setSelectedKnown([]);
    setAskedChoice('');
    setOperationChoice('');
    setThinkingFeedback(null);
    setThinkingVerified(false);
  };

  const checkThinking = () => {
    playClickSound();
    const knownCorrect = selectedKnown.length === selectedCase.known.length
      && selectedCase.known.every((fact) => selectedKnown.includes(fact));
    const answersCorrect = knownCorrect && askedChoice === selectedCase.asked && operationChoice === expectedOperations;
    setThinkingFeedback(answersCorrect ? 'correct' : 'wrong');
    setThinkingVerified(answersCorrect);
    if (answersCorrect) playSuccessSound();
    else playGentleWrongSound();
  };

  const handleNextStep = () => {
    playClickSound();
    if (activeStep < 4) {
      setActiveStep(activeStep + 1);
      if (activeStep + 1 === 4 && thinkingVerified) {
        playSuccessSound();
        onCompleteActivity(`story-problem-${selectedCase.id}`);
      }
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-rose-500/15 via-pink-500/10 to-amber-500/15 border border-rose-400/30 dark:border-rose-500/20 rounded-3xl p-6 sm:p-8 backdrop-blur-sm">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-800 dark:text-rose-300 font-bold text-xs mb-3">
            <Search className="w-3.5 h-3.5" />
            Materi Bagian 3, 4, 7 (Halaman 5, 6, 7)
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Detektif Soal Cerita (Metode 4 Langkah Juara)
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Menyelesaikan soal cerita matematika semudah memecahkan misteri dengan 4 langkah: <strong>1. BACA</strong> → <strong>2. PIKIRKAN</strong> → <strong>3. HITUNG</strong> → <strong>4. JAWAB</strong>.
          </p>
        </div>
      </div>

      {/* Case Selector Tabs */}
      <div className="flex flex-wrap gap-2">
        {storyCases.map((c) => (
          <button
            key={c.id}
            type="button"
            aria-pressed={selectedCase.id === c.id}
            onClick={() => handleCaseChange(c)}
            className={`btn-tactile min-h-11 text-xs sm:text-sm font-extrabold px-4 py-2 rounded-2xl border transition-all ${
              selectedCase.id === c.id
                ? 'bg-rose-500 text-white border-rose-600 shadow-md shadow-rose-500/20'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100'
            }`}
          >
            {c.title.split(':')[0]}
          </button>
        ))}
      </div>

      {/* 4 Steps Interactive Detective Board */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        
        {/* Step Indicator Progress Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pb-6 border-b border-slate-100 dark:border-slate-800">
          {[
            { step: 1, name: 'BACA', icon: BookOpen, desc: 'Pahami Ceritanya' },
            { step: 2, name: 'PIKIRKAN', icon: Brain, desc: 'Temukan Kata Kunci' },
            { step: 3, name: 'HITUNG', icon: Calculator, desc: 'Operasi Angka' },
            { step: 4, name: 'JAWAB', icon: Award, desc: 'Kesimpulan Lengkap' }
          ].map((s) => {
            const Icon = s.icon;
            const isCurrent = activeStep === s.step;
            const isDone = activeStep > s.step;

            return (
              <div
                key={s.step}
                aria-current={isCurrent ? 'step' : undefined}
                className={`text-left p-3 rounded-2xl border-2 ${
                  isCurrent
                    ? 'border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-300'
                    : isDone
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-black uppercase tracking-wider">
                    Langkah #{s.step}
                  </span>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                  {s.name}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  {s.desc}
                </div>
              </div>
            );
          })}
        </div>

        {/* Story Text Box (Active on all steps) */}
        <div className="mt-6 p-5 sm:p-6 rounded-3xl bg-rose-50/50 dark:bg-rose-950/20 border-2 border-rose-200 dark:border-rose-900/60 relative">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-black uppercase tracking-wider text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-rose-600 dark:text-rose-400" />
              <span>Teks Soal Cerita</span>
            </span>
            <button
              onClick={() => handleSpeak(selectedCase.storyText)}
              aria-label="Dengarkan soal cerita"
              className="btn-tactile min-h-11 flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 shadow-xs"
            >
              <Volume2 className={`w-3.5 h-3.5 ${speaking ? 'animate-bounce text-rose-500' : ''}`} />
              <span>Dengarkan Suara Guru</span>
            </button>
          </div>

          <p className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 leading-relaxed">
            {selectedCase.storyText}
          </p>

          {/* Keyword tags highlight */}
          {activeStep >= 3 && thinkingVerified && (
            <div className="mt-4 flex flex-wrap items-center gap-2 pt-3 border-t border-rose-200 dark:border-rose-900">
              <span className="text-xs font-bold text-slate-500">Petunjuk kata dari konteks, bukan aturan mutlak:</span>
              {selectedCase.keywords.map((k, idx) => (
                <span key={idx} className="text-xs px-2.5 py-1 rounded-full font-black flex items-center gap-1 border shadow-xs bg-white/80 dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700">
                  <span>{k.word}</span>
                  <span className="text-xs font-black px-1 rounded bg-slate-100 dark:bg-black/30">{k.op === '+' ? 'sering terkait +' : 'sering terkait −'}</span>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Step-by-Step Detective Content */}
        <div className="mt-6">
          
          {/* STEP 1: BACA */}
          {activeStep === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white mb-2">
                  Tips Guru Saat Membaca:
                </h4>
                <ul className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-1.5 list-disc pl-5">
                  <li>Baca soal 2 sampai 3 kali sampai terbayang alur ceritanya di pikiranmu.</li>
                  <li>Tandai angka-angka penting yang disebutkan dalam cerita.</li>
                  <li>Perhatikan satuannya: apakah buah mangga, pensil, kelereng, atau rupiah.</li>
                </ul>
              </div>
            </div>
          )}

          {/* STEP 2: PIKIRKAN */}
          {activeStep === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <fieldset className="p-5 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-900">
                <legend className="px-1 font-extrabold text-sm text-sky-900 dark:text-sky-300">Apa saja yang DIKETAHUI?</legend>
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {knownOptions.map((fact) => {
                    const isSelected = selectedKnown.includes(fact);
                    return (
                      <button
                        key={fact}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => {
                          setSelectedKnown((current) => isSelected ? current.filter((item) => item !== fact) : [...current, fact]);
                          setThinkingFeedback(null);
                          setThinkingVerified(false);
                        }}
                        className={`btn-tactile min-h-11 rounded-xl border px-3 py-2 text-left text-sm font-semibold ${isSelected ? 'border-sky-500 bg-sky-100 text-sky-950 dark:bg-sky-900 dark:text-white' : 'border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200'}`}
                      >
                        {fact}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <fieldset className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900">
                <legend className="px-1 font-extrabold text-sm text-amber-900 dark:text-amber-300">Apa yang DITANYAKAN?</legend>
                <div className="mt-2 grid grid-cols-1 gap-2">
                  {askedOptions.map((question) => (
                    <button
                      key={question}
                      type="button"
                      aria-pressed={askedChoice === question}
                      onClick={() => { setAskedChoice(question); setThinkingFeedback(null); setThinkingVerified(false); }}
                      className={`btn-tactile min-h-11 rounded-xl border px-3 py-2 text-left text-sm font-semibold ${askedChoice === question ? 'border-amber-500 bg-amber-100 text-amber-950 dark:bg-amber-900 dark:text-white' : 'border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200'}`}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900">
                <legend className="px-1 font-extrabold text-sm text-emerald-900 dark:text-emerald-300">Operasi mana yang membantu menjawabnya?</legend>
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {operationOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      aria-pressed={operationChoice === option.value}
                      onClick={() => { setOperationChoice(option.value); setThinkingFeedback(null); setThinkingVerified(false); }}
                      className={`btn-tactile min-h-11 rounded-xl border px-3 py-2 text-left text-sm font-semibold ${operationChoice === option.value ? 'border-emerald-500 bg-emerald-100 text-emerald-950 dark:bg-emerald-900 dark:text-white' : 'border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200'}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="flex flex-wrap items-center gap-3">
                <button type="button" onClick={checkThinking} className="btn-tactile min-h-11 rounded-xl bg-rose-500 px-5 py-2 font-extrabold text-white">Periksa Pilihan</button>
                {thinkingFeedback === 'wrong' && <p role="status" className="text-sm font-semibold text-rose-700 dark:text-rose-300">Belum tepat. Baca lagi cerita dan pikirkan apa yang diketahui serta ditanyakan.</p>}
                {thinkingFeedback === 'correct' && <p role="status" className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Tepat. Kata dalam cerita bisa menjadi petunjuk, tetapi makna seluruh konteks yang menentukan operasi.</p>}
              </div>
            </div>
          )}

          {/* STEP 3: HITUNG */}
          {activeStep === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900">
                <h4 className="font-extrabold text-sm text-emerald-900 dark:text-emerald-300 mb-2">
                  Langkah Perhitungan Kalimat Matematika:
                </h4>
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Tahap 1:</span>
                    <span className="text-base font-black text-slate-900 dark:text-white">
                      {selectedCase.step1Formula} = <strong className="text-emerald-600 dark:text-emerald-400">{selectedCase.step1Result}</strong>
                    </span>
                  </div>

                  {selectedCase.step2Formula && (
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-500">Tahap 2:</span>
                      <span className="text-base font-black text-slate-900 dark:text-white">
                        {selectedCase.step2Formula} = <strong className="text-emerald-600 dark:text-emerald-400">{selectedCase.step2Result}</strong>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: JAWAB */}
          {activeStep === 4 && (
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-amber-500/15 border-2 border-emerald-500 text-center animate-fadeIn">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-300 block mb-1">
                Kesimpulan Jawaban Lengkap:
              </span>
              <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-2">
                "{selectedCase.finalAnswer}"
              </p>
              <div className="mt-4 flex items-center justify-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Kasus selesai. Kamu telah membaca, memilih operasi, menghitung, dan menjawab.</span>
              </div>
            </div>
          )}

        </div>

        {/* Step Navigation Controller */}
        <div className="mt-8 flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
          <button
            disabled={activeStep === 1}
            onClick={() => {
              playClickSound();
              setActiveStep(activeStep - 1);
            }}
            className="btn-tactile min-h-11 text-xs font-bold px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-30 border border-slate-200 dark:border-slate-700"
          >
            ← Kembali
          </button>

          {activeStep < 4 ? (
            <button
              disabled={activeStep === 2 && !thinkingVerified}
              onClick={handleNextStep}
              className="btn-tactile min-h-11 flex items-center gap-1.5 px-6 py-2.5 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-rose-500/25 disabled:opacity-40"
            >
              <span>Lanjut ke Langkah #{activeStep + 1}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => {
                handleCaseChange(selectedCase);
              }}
              className="btn-tactile min-h-11 text-xs font-bold px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
            >
              Ulangi Kasus Ini
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
