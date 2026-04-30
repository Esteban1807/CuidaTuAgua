import React, { createContext, useContext, useEffect, useState } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemeMode = 'light' | 'dark';

export type ThemeColors = {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
  grayLight: string;
  grayMedium: string;
  success: string;
  error: string;
  warning: string;
};

export const lightColors: ThemeColors = {
  primary: '#0A6D95',
  secondary: '#118FC3',
  background: '#F3F4F6',
  surface: '#FFFFFF',
  textPrimary: '#1F2937',
  textSecondary: '#0B5FA5',
  grayLight: '#F2F2F2',
  grayMedium: '#c2c2c2',
  success: '#16A34A',
  error: '#DC2626',
  warning: '#F59E0B',
};

export const darkColors: ThemeColors = {
  primary: '#38BDF8',
  secondary: '#0EA5E9',
  background: '#0F172A',
  surface: '#111827',
  textPrimary: '#E2E8F0',
  textSecondary: '#93C5FD',
  grayLight: '#1F2937',
  grayMedium: '#475569',
  success: '#22C55E',
  error: '#F97316',
  warning: '#FBBF24',
};

const STORAGE_KEY = 'cuidatuagua-theme-mode';

type ThemeContextValue = {
  mode: ThemeMode;
  colors: ThemeColors;
  toggleTheme: () => void;
  setThemeMode: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  mode: 'light',
  colors: lightColors,
  toggleTheme: () => {},
  setThemeMode: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const system = Appearance.getColorScheme();
    return system === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved === 'light' || saved === 'dark') {
          setMode(saved);
        }
      } catch (error) {
        // ignore
      }
    };

    loadTheme();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, mode).catch(() => {});
  }, [mode]);

  const toggleTheme = () => {
    setMode((current) => (current === 'light' ? 'dark' : 'light'));
  };

  const colors = mode === 'light' ? lightColors : darkColors;

  return (
    <ThemeContext.Provider value={{ mode, colors, toggleTheme, setThemeMode: setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
