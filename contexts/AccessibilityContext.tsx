import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { AccessibilitySettings, ThemeSetting, FontSizeSetting, HighContrastSetting, AccessibilityContextProps } from '../types';

const LOCAL_STORAGE_KEY = 'vestmind-accessibility-settings';

const defaultSettings: AccessibilitySettings = {
  theme: 'dark', // Default to dark theme
  fontSize: 'md',
  highContrast: 'off',
};

export const AccessibilityContext = createContext<AccessibilityContextProps>({
  ...defaultSettings,
  setTheme: () => {},
  setFontSize: () => {},
  setHighContrast: () => {},
  resetAccessibilitySettings: () => {},
});

interface AccessibilityProviderProps {
  children: ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    try {
      const storedSettings = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedSettings) {
        const parsed = JSON.parse(storedSettings);
        // Validate parsed settings against defaults
        return {
          theme: ['light', 'dark', 'system'].includes(parsed.theme) ? parsed.theme : defaultSettings.theme,
          fontSize: ['sm', 'md', 'lg', 'xl'].includes(parsed.fontSize) ? parsed.fontSize : defaultSettings.fontSize,
          highContrast: ['on', 'off'].includes(parsed.highContrast) ? parsed.highContrast : defaultSettings.highContrast,
        };
      }
    } catch (error) {
      console.error("Failed to load accessibility settings from localStorage", error);
    }
    return defaultSettings;
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error("Failed to save accessibility settings to localStorage", error);
    }
  }, [settings]);

  const setTheme = useCallback((theme: ThemeSetting) => {
    setSettings(s => ({ ...s, theme }));
  }, []);

  const setFontSize = useCallback((fontSize: FontSizeSetting) => {
    setSettings(s => ({ ...s, fontSize }));
  }, []);

  const setHighContrast = useCallback((highContrast: HighContrastSetting) => {
    setSettings(s => ({ ...s, highContrast }));
  }, []);

  const resetAccessibilitySettings = useCallback(() => {
    setSettings(defaultSettings);
  }, []);

  return (
    <AccessibilityContext.Provider value={{ ...settings, setTheme, setFontSize, setHighContrast, resetAccessibilitySettings }}>
      {children}
    </AccessibilityContext.Provider>
  );
};
