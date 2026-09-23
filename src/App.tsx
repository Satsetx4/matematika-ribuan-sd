import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { TabNavigation, ActiveTab } from './components/TabNavigation';
import { AdventureHome } from './components/AdventureHome';
import { PlaceValueLab } from './components/PlaceValueLab';
import { ComparisonSortArena } from './components/ComparisonSortArena';
import { ColumnMathLab } from './components/ColumnMathLab';
import { RoundingRollercoaster } from './components/RoundingRollercoaster';
import { StoryDetectiveLab } from './components/StoryDetectiveLab';
import { QuizArena } from './components/QuizArena';
import { TeacherSummarySheet } from './components/TeacherSummarySheet';
import { setSoundEnabled, playClickSound, playSuccessSound } from './utils/soundEffects';
import { safeGetItem, safeSetItem, clearLearningData, STORAGE_KEYS } from './utils/storage';
import { RotateCcw, AlertTriangle, X } from 'lucide-react';
import { useLearningProgress } from './hooks/useLearningProgress';
import { AccessibleDialog } from './components/ui/AccessibleDialog';

export function App() {
  // Dark mode state: default dark as per Hermes anti-slop standard
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = safeGetItem(STORAGE_KEYS.THEME);
    if (saved !== null) return saved === 'dark';
    return true; // Default dark
  });

  const [soundOn, setSoundOn] = useState<boolean>(() => safeGetItem(STORAGE_KEYS.SOUND) !== 'false');
  const { progress, completeActivity, recordQuizScore, resetProgress } = useLearningProgress();
  const starsCount = progress.stars;

  // Navigation tab with localStorage persistence
  const [activeTab, setActiveTab] = useState<ActiveTab>(() => {
    const savedTab = safeGetItem(STORAGE_KEYS.ACTIVE_TAB);
    const validTabs: ActiveTab[] = [
      'home',
      'nilai-tempat',
      'banding-urut',
      'hitung-bersusun',
      'pembulatan',
      'soal-cerita',
      'kuis'
    ];
    if (savedTab && validTabs.includes(savedTab as ActiveTab)) {
      return savedTab as ActiveTab;
    }
    return 'home';
  });

  // Teacher summary sheet modal
  const [summaryOpen, setSummaryOpen] = useState<boolean>(false);

  // Reset confirmation modal state
  const [resetModalOpen, setResetModalOpen] = useState<boolean>(false);

  // Sync dark mode class & save preference defensively
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      safeSetItem(STORAGE_KEYS.THEME, 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      safeSetItem(STORAGE_KEYS.THEME, 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    setSoundEnabled(soundOn);
    safeSetItem(STORAGE_KEYS.SOUND, String(soundOn));
  }, [soundOn]);

  // Tab change with persistence
  const handleSelectTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    safeSetItem(STORAGE_KEYS.ACTIVE_TAB, tab);
  };

  // Sync sound setting
  const handleSetSound = (enabled: boolean) => {
    setSoundOn(enabled);
  };

  // Reset all user data (Fresh Start action)
  const handleConfirmReset = () => {
    clearLearningData();
    resetProgress();
    setActiveTab('home');
    setResetModalOpen(false);
    playSuccessSound();
  };

  return (
    <div className="app-shell min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      
      {/* Navigation Header */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        soundEnabled={soundOn}
        setSoundEnabled={handleSetSound}
        starsCount={starsCount}
        onOpenSummary={() => setSummaryOpen(true)}
        onOpenReset={() => setResetModalOpen(true)}
      />

      {/* Module Tabs Bar (Mobile Horizontal Swipe Friendly) */}
      <TabNavigation activeTab={activeTab} setActiveTab={handleSelectTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3.5 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'home' && (
          <AdventureHome
            setActiveTab={handleSelectTab}
            onOpenSummary={() => setSummaryOpen(true)}
          />
        )}

        {activeTab === 'nilai-tempat' && (
          <PlaceValueLab onCompleteActivity={completeActivity} />
        )}

        {activeTab === 'banding-urut' && (
          <ComparisonSortArena onCompleteActivity={completeActivity} />
        )}

        {activeTab === 'hitung-bersusun' && (
          <ColumnMathLab onCompleteActivity={completeActivity} />
        )}

        {activeTab === 'pembulatan' && (
          <RoundingRollercoaster onCompleteActivity={completeActivity} />
        )}

        {activeTab === 'soal-cerita' && (
          <StoryDetectiveLab onCompleteActivity={completeActivity} />
        )}

        {activeTab === 'kuis' && (
          <QuizArena
            onCompleteActivity={completeActivity}
            bestQuizScore={progress.bestQuizScore}
            onRecordQuizScore={recordQuizScore}
          />
        )}
      </main>

      {/* Teacher Summary Modal */}
      <TeacherSummarySheet
        isOpen={summaryOpen}
        onClose={() => setSummaryOpen(false)}
        starsCount={starsCount}
        completedCount={progress.completedActivities.length}
        bestQuizScore={progress.bestQuizScore}
      />

      {/* Reset Confirmation Dialog Modal */}
      <AccessibleDialog
            isOpen={resetModalOpen}
            onClose={() => setResetModalOpen(false)}
            labelledBy="reset-dialog-title"
            panelClassName="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl animate-fadeIn"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5 text-rose-600 dark:text-rose-400">
                <div className="w-9 h-9 rounded-xl bg-rose-500/15 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h3 id="reset-dialog-title" className="font-extrabold text-base text-slate-900 dark:text-white">
                  Mulai dari Awal?
                </h3>
              </div>
              <button
                onClick={() => {
                  playClickSound();
                  setResetModalOpen(false);
                }}
                className="btn-tactile min-h-11 min-w-11 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                aria-label="Tutup dialog mulai dari awal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="mt-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              Bintang ({starsCount}), aktivitas selesai ({progress.completedActivities.length}), skor terbaik kuis, dan progres kuis akan dihapus. Tema dan pengaturan suara tetap tersimpan.
            </p>

            <div className="mt-6 flex items-center justify-end gap-2.5">
              <button
                onClick={() => {
                  playClickSound();
                  setResetModalOpen(false);
                }}
                className="btn-tactile min-h-11 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold border border-slate-200 dark:border-slate-700"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmReset}
                className="btn-tactile min-h-11 flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Ya, Reset Sekarang</span>
              </button>
            </div>
      </AccessibleDialog>

      {/* Footer with Mobile-First Layout */}
      <footer className="mt-12 sm:mt-16 border-t border-slate-200 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/60 py-6 sm:py-8 px-4 sm:px-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="font-extrabold text-slate-700 dark:text-slate-300">
              Petualangan Angka Ribuan
            </span>
            <span className="hidden sm:inline">•</span>
            <span>Kurikulum Merdeka SD Kelas 3 & 4</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => {
                playClickSound();
                setSummaryOpen(true);
              }}
              className="btn-tactile min-h-11 px-2 hover:text-amber-500 font-semibold transition py-1"
            >
              Lembar Cetak Rangkuman
            </button>
            <span>•</span>
            <button
              onClick={() => {
                playClickSound();
                handleSelectTab('kuis');
              }}
              className="btn-tactile min-h-11 px-2 hover:text-amber-500 font-semibold transition py-1"
            >
              Bank Soal (30+ Soal)
            </button>
            <span>•</span>
            <button
              onClick={() => {
                playClickSound();
                setResetModalOpen(true);
              }}
              className="btn-tactile min-h-11 px-2 text-rose-500/90 hover:text-rose-600 dark:text-rose-400 font-bold transition flex items-center gap-1 py-1"
              title="Reset progress dan mulai dari 0"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Data</span>
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
