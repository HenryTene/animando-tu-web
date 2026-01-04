import { useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark';

const THEME_KEY = 'animando-objetos-theme';
const REDUCE_MOTION_KEY = 'animando-objetos-reduce-motion';

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>('light');
  const [reduceMotion, setReduceMotionState] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize from localStorage and system preferences
  useEffect(() => {
    // Theme
    const storedTheme = localStorage.getItem(THEME_KEY) as Theme | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = storedTheme || (systemPrefersDark ? 'dark' : 'light');
    setThemeState(initialTheme);
    
    // Reduce motion
    const storedReduceMotion = localStorage.getItem(REDUCE_MOTION_KEY);
    const systemPrefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const initialReduceMotion = storedReduceMotion !== null 
      ? storedReduceMotion === 'true' 
      : systemPrefersReducedMotion;
    setReduceMotionState(initialReduceMotion);
    
    setIsLoaded(true);
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (!isLoaded) return;
    
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme, isLoaded]);

  // Apply reduce motion to document
  useEffect(() => {
    if (!isLoaded) return;
    
    const root = document.documentElement;
    if (reduceMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }
    localStorage.setItem(REDUCE_MOTION_KEY, String(reduceMotion));
  }, [reduceMotion, isLoaded]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const setReduceMotion = useCallback((value: boolean) => {
    setReduceMotionState(value);
  }, []);

  const toggleReduceMotion = useCallback(() => {
    setReduceMotionState(prev => !prev);
  }, []);

  return {
    theme,
    setTheme,
    toggleTheme,
    reduceMotion,
    setReduceMotion,
    toggleReduceMotion,
    isLoaded,
  };
}
