import React, { createContext, useContext, ReactNode } from 'react';
import { useProgress, UserProgress } from '@/hooks/useProgress';
import { useTheme } from '@/hooks/useTheme';

interface AppContextType {
  // Progress
  progress: UserProgress;
  markModuleComplete: (moduleId: string) => void;
  markModuleIncomplete: (moduleId: string) => void;
  setQuizScore: (score: number) => void;
  isModuleCompleted: (moduleId: string) => boolean;
  resetProgress: () => void;
  moduleIds: string[];
  
  // Theme
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  reduceMotion: boolean;
  toggleReduceMotion: () => void;
  
  // Current module
  currentModule: string;
  setCurrentModule: (moduleId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const progressHook = useProgress();
  const themeHook = useTheme();
  const [currentModule, setCurrentModule] = React.useState('introduccion');

  const value: AppContextType = {
    progress: progressHook.progress,
    markModuleComplete: progressHook.markModuleComplete,
    markModuleIncomplete: progressHook.markModuleIncomplete,
    setQuizScore: progressHook.setQuizScore,
    isModuleCompleted: progressHook.isModuleCompleted,
    resetProgress: progressHook.resetProgress,
    moduleIds: progressHook.moduleIds,
    theme: themeHook.theme,
    toggleTheme: themeHook.toggleTheme,
    reduceMotion: themeHook.reduceMotion,
    toggleReduceMotion: themeHook.toggleReduceMotion,
    currentModule,
    setCurrentModule,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
