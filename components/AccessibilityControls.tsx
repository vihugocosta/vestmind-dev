import React, { useState, useContext, useRef, useEffect } from 'react';
import { AccessibilityContext } from '../contexts/AccessibilityContext';
import { ThemeSetting, FontSizeSetting, HighContrastSetting } from '../types';
import { AccessibilityIcon } from './icons/AccessibilityIcon';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';
import { ContrastIcon } from './icons/ContrastIcon';
import { FontSizeIncreaseIcon } from './icons/FontSizeIncreaseIcon';
import { FontSizeDecreaseIcon } from './icons/FontSizeDecreaseIcon';
import { ResetIcon } from './icons/ResetIcon';
import { CloseIcon } from './icons/CloseIcon';

const AccessibilityControls: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    theme, setTheme,
    fontSize, setFontSize,
    highContrast, setHighContrast,
    resetAccessibilitySettings
  } = useContext(AccessibilityContext);
  const panelRef = useRef<HTMLDivElement>(null);

  const fontSizes: FontSizeSetting[] = ['sm', 'md', 'lg', 'xl'];
  const fontSizeLabels: Record<FontSizeSetting, string> = { sm: 'P', md: 'M', lg: 'G', xl: 'XG' };

  const togglePanel = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && panelRef.current && !panelRef.current.contains(event.target as Node)) {
        const fabButton = document.getElementById('accessibility-fab');
        if (fabButton && !fabButton.contains(event.target as Node)) {
          setIsOpen(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);


  const getButtonClass = (isActive: boolean) => 
    `p-2 rounded-md transition-colors duration-150 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-theme-accent-primary focus:ring-offset-2 focus:ring-offset-theme-bg-secondary ${
      isActive 
        ? 'bg-theme-accent-primary text-theme-text-white shadow-md' 
        : 'bg-theme-bg-tertiary text-theme-text-secondary hover:bg-theme-bg-interactive'
    }`;
  
  const getFontSizeButtonClass = (size: FontSizeSetting) =>
    `px-3 py-1.5 rounded-md text-xs font-semibold transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-theme-bg-secondary ${
      fontSize === size
        ? 'bg-theme-accent-primary text-theme-text-white ring-2 ring-theme-accent-primary shadow-md'
        : 'bg-theme-bg-tertiary text-theme-text-secondary hover:bg-theme-bg-interactive'
    }`;


  return (
    <>
      <button
        id="accessibility-fab"
        onClick={togglePanel}
        className="fixed bottom-5 right-5 z-50 bg-theme-accent-secondary text-theme-text-white p-3.5 rounded-full shadow-xl hover:bg-theme-accent-secondary-hover focus:outline-none focus:ring-2 focus:ring-theme-accent-secondary focus:ring-offset-2 focus:ring-offset-theme-bg-primary transition-all transform hover:scale-110"
        aria-label="Abrir Controles de Acessibilidade"
        aria-expanded={isOpen}
        aria-controls="accessibility-panel"
      >
        <AccessibilityIcon className="h-6 w-6" />
      </button>

      {isOpen && (
        <div 
            ref={panelRef}
            id="accessibility-panel"
            className="fixed bottom-20 right-5 z-50 w-72 bg-theme-bg-secondary p-5 rounded-xl shadow-2xl border border-theme-border-primary animate-fadeInScaleUp"
            role="dialog"
            aria-modal="true"
            aria-labelledby="accessibility-panel-title"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 id="accessibility-panel-title" className="text-lg font-semibold text-theme-text-primary">Acessibilidade</h2>
            <button 
              onClick={togglePanel} 
              className="p-1.5 rounded-md text-theme-text-secondary hover:bg-theme-bg-interactive hover:text-theme-text-primary focus:outline-none focus:ring-2 focus:ring-theme-accent-primary" 
              aria-label="Fechar painel de acessibilidade"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Theme Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-theme-text-secondary mb-1.5">Tema</label>
            <div className="grid grid-cols-3 gap-2">
              <button 
                onClick={() => { setTheme('light'); setHighContrast('off'); }} 
                className={getButtonClass(theme === 'light' && highContrast === 'off')} 
                aria-pressed={theme === 'light' && highContrast === 'off'}
                title="Tema Claro"
              >
                <SunIcon className="h-5 w-5"/> <span className="ml-1.5 text-xs">Claro</span>
              </button>
              <button 
                onClick={() => { setTheme('dark'); setHighContrast('off'); }} 
                className={getButtonClass(theme === 'dark' && highContrast === 'off')} 
                aria-pressed={theme === 'dark' && highContrast === 'off'}
                title="Tema Escuro"
              >
                <MoonIcon className="h-5 w-5"/> <span className="ml-1.5 text-xs">Escuro</span>
              </button>
              <button 
                onClick={() => setHighContrast(highContrast === 'on' ? 'off' : 'on')} 
                className={getButtonClass(highContrast === 'on')}
                aria-pressed={highContrast === 'on'}
                title="Alto Contraste"
              >
                <ContrastIcon className="h-5 w-5"/> <span className="ml-1.5 text-xs">Contraste</span>
              </button>
            </div>
          </div>

          {/* Font Size Adjustment */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-theme-text-secondary mb-1.5">Tamanho da Fonte</label>
            <div className="flex items-center space-x-2">
               <button 
                onClick={() => {
                    const currentIndex = fontSizes.indexOf(fontSize);
                    if (currentIndex > 0) setFontSize(fontSizes[currentIndex - 1]);
                }} 
                disabled={fontSize === 'sm'}
                className={`${getButtonClass(false)} p-1.5 disabled:opacity-50 disabled:cursor-not-allowed`}
                aria-label="Diminuir tamanho da fonte"
               >
                <FontSizeDecreaseIcon className="h-5 w-5" />
              </button>
              <div className="flex-grow grid grid-cols-4 gap-1.5 text-center">
                {fontSizes.map(size => (
                    <button 
                        key={size} 
                        onClick={() => setFontSize(size)} 
                        className={getFontSizeButtonClass(size)} 
                        aria-pressed={fontSize === size}
                        aria-label={`Tamanho da fonte ${fontSizeLabels[size]}`}
                    >
                        {fontSizeLabels[size]}
                    </button>
                ))}
              </div>
              <button 
                onClick={() => {
                    const currentIndex = fontSizes.indexOf(fontSize);
                    if (currentIndex < fontSizes.length - 1) setFontSize(fontSizes[currentIndex + 1]);
                }}
                disabled={fontSize === 'xl'}
                className={`${getButtonClass(false)} p-1.5 disabled:opacity-50 disabled:cursor-not-allowed`}
                aria-label="Aumentar tamanho da fonte"
              >
                <FontSizeIncreaseIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          {/* Reset Button */}
          <button
            onClick={() => {
              resetAccessibilitySettings();
            }}
            className="w-full flex items-center justify-center text-sm bg-theme-bg-interactive text-theme-text-primary hover:bg-theme-bg-interactive-hover p-2.5 rounded-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-theme-accent-primary focus:ring-offset-2 focus:ring-offset-theme-bg-secondary"
          >
            <ResetIcon className="h-4 w-4 mr-2" />
            Redefinir Padrões
          </button>
        </div>
      )}
    </>
  );
};

export default AccessibilityControls;
