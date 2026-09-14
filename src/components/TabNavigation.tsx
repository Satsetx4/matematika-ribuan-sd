import React from 'react';
import { Home, Boxes, Scale, Calculator, TrendingUp, Search, Trophy, FileText } from 'lucide-react';
import { playClickSound } from '../utils/soundEffects';

export type ActiveTab = 'home' | 'nilai-tempat' | 'banding-urut' | 'hitung-bersusun' | 'pembulatan' | 'soal-cerita' | 'kuis';

interface TabNavigationProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

interface TabItem {
  id: ActiveTab;
  label: string;
  badge?: string;
  icon: React.ElementType;
  color: string;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs: TabItem[] = [
    { id: 'home', label: 'Peta Petualangan', icon: Home, color: 'text-amber-500' },
    { id: 'nilai-tempat', label: '1. Nilai Tempat', icon: Boxes, color: 'text-amber-500' },
    { id: 'banding-urut', label: '2. Banding & Urut', icon: Scale, color: 'text-sky-500' },
    { id: 'hitung-bersusun', label: '3. Hitung Bersusun', icon: Calculator, color: 'text-emerald-500' },
    { id: 'pembulatan', label: '4. Pembulatan', icon: TrendingUp, color: 'text-purple-500' },
    { id: 'soal-cerita', label: '5. Detektif Cerita', icon: Search, color: 'text-rose-500' },
    { id: 'kuis', label: 'Bank Soal & Kuis', badge: '30+ Soal', icon: Trophy, color: 'text-yellow-500' },
  ];

  return (
    <nav className="w-full bg-slate-100/80 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800/80 overflow-x-auto no-scrollbar py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 min-w-max">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => {
                playClickSound();
                setActiveTab(tab.id);
              }}
              className={`btn-tactile flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all relative ${
                isActive
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm border border-slate-200 dark:border-slate-700'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-800/40'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? tab.color : 'text-slate-400'}`} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                  {tab.badge}
                </span>
              )}
              {isActive && (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-amber-500 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
