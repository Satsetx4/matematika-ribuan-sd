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
import { setSoundEnabled } from './utils/soundEffects';

export function App() {
  // Dark mode state: default dark as per Hermes anti-slop standard
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('math_theme');
      if (saved) return saved === 'dark';
    }
    return true; // Default dark
  });

  // Sound state
  const [soundOn, setSoundOn] = useState<boolean>(true);

  // Stars earned by student
  const [starsCount, setStarsCount] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('math_stars');
      return saved ? parseInt(saved, 10) : 5; // Start with 5 bonus stars
    }
    return 5;
  });

  // Navigation tab
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');

  // Teacher summary sheet modal
  const [summaryOpen, setSummaryOpen] = useState<boolean>(false);

  // Sync dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('math_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('math_theme', 'light');
    }
  }, [darkMode]);

  // Sync sound setting
  const handleSetSound = (enabled: boolean) => {
    setSoundOn(enabled);
    setSoundEnabled(enabled);
  };

  // Earning star action
  const handleEarnStar = () => {
    setStarsCount((prev) => {
      const updated = prev + 1;
      localStorage.setItem('math_stars', updated.toString());
      return updated;
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      
      {/* Navigation Header */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        soundEnabled={soundOn}
        setSoundEnabled={handleSetSound}
        starsCount={starsCount}
        onOpenSummary={() => setSummaryOpen(true)}
      />

      {/* Module Tabs Bar */}
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'home' && (
          <AdventureHome
            setActiveTab={setActiveTab}
            starsCount={starsCount}
            onOpenSummary={() => setSummaryOpen(true)}
          />
        )}

        {activeTab === 'nilai-tempat' && (
          <PlaceValueLab onEarnStar={handleEarnStar} />
        )}

        {activeTab === 'banding-urut' && (
          <ComparisonSortArena onEarnStar={handleEarnStar} />
        )}

        {activeTab === 'hitung-bersusun' && (
          <ColumnMathLab onEarnStar={handleEarnStar} />
        )}

        {activeTab === 'pembulatan' && (
          <RoundingRollercoaster onEarnStar={handleEarnStar} />
        )}

        {activeTab === 'soal-cerita' && (
          <StoryDetectiveLab onEarnStar={handleEarnStar} />
        )}

        {activeTab === 'kuis' && (
          <QuizArena onEarnStar={handleEarnStar} />
        )}
      </main>

      {/* Teacher Summary Modal */}
      <TeacherSummarySheet
        isOpen={summaryOpen}
        onClose={() => setSummaryOpen(false)}
      />

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/50 py-8 px-4 sm:px-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-700 dark:text-slate-300">
              Petualangan Angka Ribuan
            </span>
            <span>•</span>
            <span>Kurikulum Merdeka SD Kelas 3 & 4</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setSummaryOpen(true)}
              className="hover:text-amber-500 font-semibold transition"
            >
              Lembar Cetak Rangkuman
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveTab('kuis')}
              className="hover:text-amber-500 font-semibold transition"
            >
              Bank Soal (30+ Soal)
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
