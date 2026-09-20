import React, { useState, useEffect } from 'react';
import { Trophy, CheckCircle2, XCircle, Lightbulb, RotateCcw, Award, Sparkles, Filter, ChevronRight, Volume2, HelpCircle, Star, GraduationCap, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';
import { QUESTION_BANK, Question } from '../data/questionBank';
import { playClickSound, playSuccessSound, playGentleWrongSound, playCelebrationFanfare, speakIndonesian } from '../utils/soundEffects';

interface QuizArenaProps {
  onEarnStar: () => void;
}

export const QuizArena: React.FC<QuizArenaProps> = ({ onEarnStar }) => {
  type QuizView = 'practice' | 'exam';
  const [viewMode, setViewMode] = useState<QuizView>('practice');

  // Filters for practice mode
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  // State for practice answers: questionId -> selected answer index
  const [practiceAnswers, setPracticeAnswers] = useState<Record<string, number>>({});
  const [revealedExplanations, setRevealedExplanations] = useState<Record<string, boolean>>({});

  // State for Exam Mode
  const [examQuestions, setExamQuestions] = useState<Question[]>([]);
  const [currentExamIndex, setCurrentExamIndex] = useState<number>(0);
  const [examUserAnswers, setExamUserAnswers] = useState<(number | null)[]>([]);
  const [examFinished, setExamFinished] = useState<boolean>(false);
  const [examScore, setExamScore] = useState<number>(0);

  // Filtered practice questions
  const filteredQuestions = QUESTION_BANK.filter((q) => {
    if (selectedCategory !== 'all' && q.category !== selectedCategory) return false;
    if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) return false;
    return true;
  });

  // Start Exam Mode
  const startExam = () => {
    playClickSound();
    // Shuffle and pick 10 questions
    const shuffled = [...QUESTION_BANK].sort(() => Math.random() - 0.5).slice(0, 10);
    setExamQuestions(shuffled);
    setCurrentExamIndex(0);
    setExamUserAnswers(new Array(shuffled.length).fill(null));
    setExamFinished(false);
    setExamScore(0);
    setViewMode('exam');
  };

  const handlePracticeSelect = (question: Question, optionIdx: number) => {
    playClickSound();
    setPracticeAnswers((prev) => ({ ...prev, [question.id]: optionIdx }));
    setRevealedExplanations((prev) => ({ ...prev, [question.id]: true }));

    if (optionIdx === question.correctAnswer) {
      playSuccessSound();
      onEarnStar();
    } else {
      playGentleWrongSound();
    }
  };

  const handleExamAnswer = (optionIdx: number) => {
    playClickSound();
    const updatedAnswers = [...examUserAnswers];
    updatedAnswers[currentExamIndex] = optionIdx;
    setExamUserAnswers(updatedAnswers);
  };

  const handleNextExamQuestion = () => {
    playClickSound();
    if (currentExamIndex < examQuestions.length - 1) {
      setCurrentExamIndex(currentExamIndex + 1);
    } else {
      // Calculate score
      let correctCount = 0;
      examQuestions.forEach((q, idx) => {
        if (examUserAnswers[idx] === q.correctAnswer) {
          correctCount++;
        }
      });
      const finalScore = Math.round((correctCount / examQuestions.length) * 100);
      setExamScore(finalScore);
      setExamFinished(true);

      // Play fanfare and confetti
      playCelebrationFanfare();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      // Reward stars
      if (finalScore >= 80) onEarnStar();
    }
  };

  const categories = [
    { id: 'all', name: 'Semua Materi' },
    { id: 'nilai-tempat', name: 'Nilai Tempat' },
    { id: 'banding-urut', name: 'Banding & Urut' },
    { id: 'hitung-bersusun', name: 'Hitung Bersusun' },
    { id: 'pembulatan', name: 'Pembulatan' },
    { id: 'soal-cerita', name: 'Soal Cerita' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-500/15 via-yellow-500/10 to-emerald-500/15 border border-amber-400/30 dark:border-amber-500/20 rounded-3xl p-6 sm:p-8 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 font-bold text-xs mb-3">
              <Trophy className="w-3.5 h-3.5" />
              Bank Soal & Pembahasan Terlengkap (30+ Soal)
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Arena Uji Kemampuan Matematika Juara
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Pilih <strong>Mode Latihan Mandiri</strong> untuk belajar bebas dengan pembahasan interaktif instan, atau <strong>Kuis Petualangan 10 Soal</strong> untuk menguji ketangkasanmu!
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playClickSound();
                setViewMode('practice');
              }}
              className={`btn-tactile text-xs sm:text-sm font-extrabold px-4 py-2.5 rounded-2xl border transition-all ${
                viewMode === 'practice'
                  ? 'bg-amber-500 text-white border-amber-600 shadow-md shadow-amber-500/20'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
              }`}
            >
              Latihan Mandiri
            </button>
            <button
              onClick={startExam}
              className={`btn-tactile text-xs sm:text-sm font-extrabold px-4 py-2.5 rounded-2xl border transition-all ${
                viewMode === 'exam'
                  ? 'bg-amber-500 text-white border-amber-600 shadow-md shadow-amber-500/20'
                  : 'bg-gradient-to-r from-yellow-500 to-amber-600 text-white border-yellow-500 shadow-sm'
              }`}
            >
              <span className="flex items-center justify-center gap-1.5">
                <Trophy className="w-4 h-4" />
                <span>Mulai Kuis 10 Soal</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* MODE 1: LATIHAN MANDIRI (PRACTICE) */}
      {viewMode === 'practice' && (
        <div className="space-y-6">
          
          {/* Filter Bar */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-sm">
            
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-bold text-slate-400 mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3" />
                Materi:
              </span>
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    playClickSound();
                    setSelectedCategory(c.id);
                  }}
                  className={`btn-tactile text-xs font-bold px-3 py-1.5 rounded-xl border transition-all ${
                    selectedCategory === c.id
                      ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>

            {/* Difficulty Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-400 mr-1">Tingkat:</span>
              {[
                { id: 'all', label: 'Semua' },
                { id: 'mudah', label: 'Mudah' },
                { id: 'sedang', label: 'Sedang' },
                { id: 'tantangan', label: 'Tantangan' },
              ].map((d) => (
                <button
                  key={d.id}
                  onClick={() => {
                    playClickSound();
                    setSelectedDifficulty(d.id);
                  }}
                  className={`btn-tactile text-xs font-bold px-2.5 py-1 rounded-xl border transition-all ${
                    selectedDifficulty === d.id
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>

          </div>

          {/* Question List */}
          <div className="space-y-6">
            {filteredQuestions.map((q, qIndex) => {
              const userAnswer = practiceAnswers[q.id];
              const hasAnswered = userAnswer !== undefined;
              const isCorrect = userAnswer === q.correctAnswer;
              const isExplRevealed = revealedExplanations[q.id];

              return (
                <div
                  key={q.id}
                  className={`bg-white dark:bg-slate-900 border-2 rounded-3xl p-6 sm:p-8 shadow-sm transition-all ${
                    hasAnswered
                      ? isCorrect
                        ? 'border-emerald-500/50 dark:border-emerald-500/40 bg-emerald-50/10'
                        : 'border-rose-500/40 dark:border-rose-500/30 bg-rose-50/10'
                      : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  {/* Question Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 flex items-center justify-center text-xs font-black">
                        #{qIndex + 1}
                      </span>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 capitalize">
                        {q.category.replace('-', ' ')}
                      </span>
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase ${
                        q.difficulty === 'mudah'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : q.difficulty === 'sedang'
                          ? 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300'
                          : 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                      }`}>
                        {q.difficulty}
                      </span>
                    </div>

                    <button
                      onClick={() => speakIndonesian(q.question)}
                      className="btn-tactile p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-amber-600"
                      title="Dengarkan Soal Ini"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Question Text */}
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white leading-relaxed mb-6">
                    {q.question}
                  </h3>

                  {/* Options Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = userAnswer === optIdx;
                      const isOptionCorrect = optIdx === q.correctAnswer;

                      let btnStyle = 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-amber-400';
                      if (hasAnswered) {
                        if (isOptionCorrect) {
                          btnStyle = 'bg-emerald-500 text-white border-emerald-600 font-black shadow-sm';
                        } else if (isSelected) {
                          btnStyle = 'bg-rose-500 text-white border-rose-600 font-black';
                        } else {
                          btnStyle = 'opacity-40 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={hasAnswered}
                          onClick={() => handlePracticeSelect(q, optIdx)}
                          className={`btn-tactile p-4 rounded-2xl border-2 text-left flex items-center justify-between transition-all ${btnStyle}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-7 h-7 rounded-xl bg-white/20 dark:bg-black/20 flex items-center justify-center font-black text-xs">
                              {['A', 'B', 'C', 'D'][optIdx]}
                            </span>
                            <span className="text-sm sm:text-base font-bold">
                              {opt}
                            </span>
                          </div>
                          {hasAnswered && isOptionCorrect && (
                            <CheckCircle2 className="w-5 h-5 text-white" />
                          )}
                          {hasAnswered && isSelected && !isOptionCorrect && (
                            <XCircle className="w-5 h-5 text-white" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Toggle Explanation Button */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={() => {
                        playClickSound();
                        setRevealedExplanations((prev) => ({ ...prev, [q.id]: !prev[q.id] }));
                      }}
                      className="btn-tactile text-xs font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5 hover:underline"
                    >
                      <Lightbulb className="w-4 h-4" />
                      <span>{isExplRevealed ? 'Sembunyikan Pembahasan' : 'Buka Pembahasan Lengkap & Trik Guru'}</span>
                    </button>

                    {hasAnswered && (
                      <span className={`text-xs font-black flex items-center gap-1 ${
                        isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                      }`}>
                        {isCorrect ? 'Jawabanmu Tepat! (+1 Bintang)' : 'Belum tepat, pelajari pembahasannya ya!'}
                      </span>
                    )}
                  </div>

                  {/* Detailed Explanation Box */}
                  {isExplRevealed && (
                    <div className="mt-4 p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 animate-fadeIn space-y-3">
                      <div>
                        <span className="text-xs font-black uppercase tracking-wider text-amber-800 dark:text-amber-400 flex items-center gap-1.5 mb-1">
                          <BookOpen className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                          <span>Pembahasan Langkah Demi Langkah:</span>
                        </span>
                        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-medium whitespace-pre-line leading-relaxed">
                          {q.explanation}
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-amber-300 dark:border-amber-800 flex items-start gap-2">
                        <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                          <GraduationCap className="w-3.5 h-3.5" />
                        </div>
                        <p className="text-xs font-bold text-amber-900 dark:text-amber-200 leading-relaxed">
                          <strong>Trik Guru Hebat:</strong> {q.teacherTip}
                        </p>
                      </div>
                    </div>
                  )}

                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* MODE 2: KUIS PETUALANGAN 10 SOAL (EXAM) */}
      {viewMode === 'exam' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
          
          {!examFinished ? (
            <div>
              {/* Exam Header & Progress */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    Kuis Petualangan Bintang
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    Soal #{currentExamIndex + 1} dari {examQuestions.length}
                  </h3>
                </div>

                <div className="w-32 bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${((currentExamIndex + 1) / examQuestions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Current Question */}
              {examQuestions[currentExamIndex] && (
                <div className="mt-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 capitalize">
                      {examQuestions[currentExamIndex].category.replace('-', ' ')}
                    </span>
                    <button
                      onClick={() => speakIndonesian(examQuestions[currentExamIndex].question)}
                      className="btn-tactile p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h4 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-relaxed mb-6">
                    {examQuestions[currentExamIndex].question}
                  </h4>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {examQuestions[currentExamIndex].options.map((opt, optIdx) => {
                      const isSelected = examUserAnswers[currentExamIndex] === optIdx;

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleExamAnswer(optIdx)}
                          className={`btn-tactile p-4 rounded-2xl border-2 text-left flex items-center gap-3 transition-all ${
                            isSelected
                              ? 'bg-amber-500 text-white border-amber-600 shadow-md shadow-amber-500/20'
                              : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-amber-400'
                          }`}
                        >
                          <span className="w-7 h-7 rounded-xl bg-white/20 dark:bg-black/20 flex items-center justify-center font-black text-xs">
                            {['A', 'B', 'C', 'D'][optIdx]}
                          </span>
                          <span className="text-sm sm:text-base font-bold">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
                    <button
                      disabled={currentExamIndex === 0}
                      onClick={() => {
                        playClickSound();
                        setCurrentExamIndex(currentExamIndex - 1);
                      }}
                      className="btn-tactile text-xs font-bold px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-30"
                    >
                      ← Soal Sebelumnya
                    </button>

                    <button
                      disabled={examUserAnswers[currentExamIndex] === null}
                      onClick={handleNextExamQuestion}
                      className="btn-tactile flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm shadow-md shadow-amber-500/25 disabled:opacity-40"
                    >
                      <span>
                        {currentExamIndex === examQuestions.length - 1 ? 'Selesaikan Kuis & Lihat Hasil' : 'Soal Berikutnya'}
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-6 animate-fadeIn">
              <div className="w-20 h-20 rounded-3xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto mb-4 shadow-inner">
                <Trophy className="w-10 h-10" />
              </div>

              <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Laporan Hasil Ujian Siswa
              </span>
              <h3 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
                Skor Akhir: {examScore} / 100
              </h3>

              <div className="flex items-center justify-center gap-2 my-4">
                {examScore >= 80 ? (
                  <span className="px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-extrabold text-xs sm:text-sm flex items-center gap-2 border border-emerald-300 dark:border-emerald-800">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Predikat: Sangat Hebat! (Bintang Emas)</span>
                    <span className="flex items-center gap-0.5 text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                    </span>
                  </span>
                ) : examScore >= 60 ? (
                  <span className="px-4 py-2 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 font-extrabold text-xs sm:text-sm flex items-center gap-2 border border-sky-300 dark:border-sky-800">
                    <span>Predikat: Bagus Sekali! (Bintang Perak)</span>
                    <span className="flex items-center gap-0.5 text-slate-400">
                      <Star className="w-3.5 h-3.5 fill-slate-400" />
                      <Star className="w-3.5 h-3.5 fill-slate-400" />
                    </span>
                  </span>
                ) : (
                  <span className="px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-extrabold text-xs sm:text-sm flex items-center gap-2 border border-amber-300 dark:border-amber-800">
                    <span>Predikat: Semangat Belajar Lagi! (Bintang Perunggu)</span>
                    <span className="flex items-center gap-0.5 text-amber-600">
                      <Star className="w-3.5 h-3.5 fill-amber-600" />
                    </span>
                  </span>
                )}
              </div>

              {/* Review Exam Questions with Explanations */}
              <div className="mt-8 text-left space-y-4 max-w-2xl mx-auto">
                <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                  Evaluasi Jawaban Tiap Nomor:
                </h4>
                {examQuestions.map((q, idx) => {
                  const uAns = examUserAnswers[idx];
                  const isCor = uAns === q.correctAnswer;

                  return (
                    <div
                      key={q.id}
                      className={`p-4 rounded-2xl border-2 ${
                        isCor
                          ? 'border-emerald-500/40 bg-emerald-50/30 dark:bg-emerald-950/20'
                          : 'border-rose-500/40 bg-rose-50/30 dark:bg-rose-950/20'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="text-xs font-black text-slate-700 dark:text-slate-300">
                          #{idx + 1}. {q.question}
                        </span>
                        {isCor ? (
                          <span className="text-xs font-black text-emerald-600 flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" /> Benar
                          </span>
                        ) : (
                          <span className="text-xs font-black text-rose-600 flex items-center gap-1">
                            <XCircle className="w-4 h-4" /> Salah
                          </span>
                        )}
                      </div>

                      <div className="text-xs space-y-1">
                        <p className="text-slate-600 dark:text-slate-400">
                          Jawabanmu: <strong>{uAns !== null ? q.options[uAns] : '-'}</strong>
                        </p>
                        {!isCor && (
                          <p className="text-emerald-700 dark:text-emerald-300 font-bold">
                            Jawaban Benar: <strong>{q.options[q.correctAnswer]}</strong>
                          </p>
                        )}
                        <p className="text-slate-500 dark:text-slate-400 text-[11px] pt-1 mt-1 border-t border-slate-200 dark:border-slate-800 flex items-center">
                          <Lightbulb className="w-3.5 h-3.5 text-amber-500 mr-1 shrink-0" />
                          <span><strong>Trik Guru:</strong> {q.teacherTip}</span>
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex items-center justify-center gap-3">
                <button
                  onClick={startExam}
                  className="btn-tactile flex items-center gap-1.5 px-6 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm shadow-md"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Ulangi Kuis Baru</span>
                </button>
                <button
                  onClick={() => setViewMode('practice')}
                  className="btn-tactile px-6 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white font-extrabold text-sm border border-slate-200 dark:border-slate-700"
                >
                  Kembali ke Bank Soal
                </button>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
};
