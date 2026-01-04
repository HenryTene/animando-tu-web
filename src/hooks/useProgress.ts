import { useState, useEffect, useCallback } from 'react';

export interface ModuleProgress {
  id: string;
  completed: boolean;
  completedAt?: string;
}

export interface UserProgress {
  modules: Record<string, ModuleProgress>;
  quizScore?: number;
  quizCompletedAt?: string;
  badges: string[];
  totalProgress: number;
}

const STORAGE_KEY = 'animando-objetos-progress';

const defaultProgress: UserProgress = {
  modules: {},
  badges: [],
  totalProgress: 0,
};

const MODULE_IDS = [
  'introduccion',
  'efectos-texto',
  'transformaciones',
  'transformaciones-3d',
  'transiciones',
  'animaciones',
  'laboratorio',
  'evaluacion',
];

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setProgress(parsed);
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
      } catch (error) {
        console.error('Error saving progress:', error);
      }
    }
  }, [progress, isLoaded]);

  const calculateTotalProgress = useCallback((modules: Record<string, ModuleProgress>) => {
    const completedCount = Object.values(modules).filter(m => m.completed).length;
    return Math.round((completedCount / MODULE_IDS.length) * 100);
  }, []);

  const markModuleComplete = useCallback((moduleId: string) => {
    setProgress(prev => {
      const newModules = {
        ...prev.modules,
        [moduleId]: {
          id: moduleId,
          completed: true,
          completedAt: new Date().toISOString(),
        },
      };
      
      const totalProgress = calculateTotalProgress(newModules);
      
      // Check for badges
      const newBadges = [...prev.badges];
      if (totalProgress >= 100 && !newBadges.includes('completionist')) {
        newBadges.push('completionist');
      }
      if (Object.keys(newModules).length >= 3 && !newBadges.includes('explorer')) {
        newBadges.push('explorer');
      }
      
      return {
        ...prev,
        modules: newModules,
        badges: newBadges,
        totalProgress,
      };
    });
  }, [calculateTotalProgress]);

  const markModuleIncomplete = useCallback((moduleId: string) => {
    setProgress(prev => {
      const newModules = { ...prev.modules };
      if (newModules[moduleId]) {
        newModules[moduleId] = {
          ...newModules[moduleId],
          completed: false,
          completedAt: undefined,
        };
      }
      
      return {
        ...prev,
        modules: newModules,
        totalProgress: calculateTotalProgress(newModules),
      };
    });
  }, [calculateTotalProgress]);

  const setQuizScore = useCallback((score: number) => {
    setProgress(prev => {
      const newBadges = [...prev.badges];
      if (score >= 80 && !newBadges.includes('quiz-master')) {
        newBadges.push('quiz-master');
      }
      if (score === 100 && !newBadges.includes('perfect-score')) {
        newBadges.push('perfect-score');
      }
      
      return {
        ...prev,
        quizScore: score,
        quizCompletedAt: new Date().toISOString(),
        badges: newBadges,
      };
    });
  }, []);

  const isModuleCompleted = useCallback((moduleId: string) => {
    return progress.modules[moduleId]?.completed ?? false;
  }, [progress.modules]);

  const resetProgress = useCallback(() => {
    setProgress(defaultProgress);
  }, []);

  return {
    progress,
    isLoaded,
    markModuleComplete,
    markModuleIncomplete,
    setQuizScore,
    isModuleCompleted,
    resetProgress,
    moduleIds: MODULE_IDS,
  };
}
