import React from 'react';
import { Sparkles, Moon, Sun, Volume2, VolumeX, BookOpen, RotateCcw } from 'lucide-react';
import { playClickSound } from '../utils/soundEffects';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  starsCount: number;
  onOpenSummary: () => void;
  onOpenReset?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  setDarkMode,
  soundEnabled,
  setSoundEnabled,
  starsCount,
  onOpenSummary,
  onOpenReset
}) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="w-10 h-10 shrink-0 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 flex items-center justify-center shadow-md shadow-amber-500/20 text-slate-950 font-black text-lg tracking-tighter">
            <span>1K</span>
          </div>
          <div className="min-w-0 truncate">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 dark:from-amber-400 dark:to-yellow-300 bg-clip-text text-transparent truncate">
                Petualangan Angka
              </span>
              <span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 shrink-0">
                SD 3-4
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden md:block truncate">
              Laboratorium Matematika Interaktif Bilangan Ribuan
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          
          {/* Star counter badge */}
          <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/80 text-amber-700 dark:text-amber-300 font-black text-xs sm:text-sm shadow-xs">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 fill-amber-400 animate-pulse" />
            <span>{starsCount}</span>
            <span className="text-xs font-semibold opacity-80 hidden lg:inline">Bintang</span>
          </div>

          {/* Rangkuman Cepat Guru/Siswa */}
          <button
            onClick={() => {
              playClickSound();
              onOpenSummary();
            }}
            className="btn-tactile flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-slate-700"
            title="Lembar Rangkuman & Cetak"
          >
            <BookOpen className="w-3.5 h-3.5 text-sky-500 shrink-0" />
            <span className="hidden sm:inline">Rangkuman</span>
          </button>

          {/* Reset Action (Subtle) */}
          {onOpenReset && (
            <button
              onClick={() => {
                playClickSound();
                onOpenReset();
              }}
              className="btn-tactile p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-100 dark:hover:bg-rose-950 text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 border border-slate-200 dark:border-slate-700 transition"
              title="Reset Semua Data / Mulai dari Awal"
              aria-label="Reset Data"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}

          {/* Audio Toggle */}
          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              playClickSound();
            }}
            className="btn-tactile p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition"
            title={soundEnabled ? 'Matikan Suara Efek' : 'Nyalakan Suara Efek'}
            aria-label="Toggle Sound"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {/* Dark/Light Mode Toggle */}
          <button
            onClick={() => {
              setDarkMode(!darkMode);
              playClickSound();
            }}
            className="btn-tactile p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition"
            title={darkMode ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
            aria-label="Toggle Theme"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600" />
            )}
          </button>

        </div>

      </div>
    </header>
  );
};
