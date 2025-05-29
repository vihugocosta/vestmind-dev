import React, { useState, useContext, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ChatInterface from './components/ChatInterface';
import PdfSection from './components/PdfSection';
import StudyPlanCreator from './components/StudyPlanCreator';
import MentorshipSection from './components/MentorshipSection'; // Added import
import WelcomeScreen from './components/WelcomeScreen'; 
import { AccessibilityProvider, AccessibilityContext } from './contexts/AccessibilityContext';
import AccessibilityControls from './components/AccessibilityControls';

const AppContent: React.FC = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const { theme, fontSize, highContrast } = useContext(AccessibilityContext);

  useEffect(() => {
    const htmlElement = document.documentElement;
    
    const classesToRemove = [
      'theme-light', 
      'theme-high-contrast', 
      'font-scale-sm', 
      'font-scale-md', 
      'font-scale-lg', 
      'font-scale-xl'
    ];
    htmlElement.classList.remove(...classesToRemove);
    
    if (highContrast === 'on') {
      htmlElement.classList.add('theme-high-contrast');
    } else if (theme === 'light') {
      htmlElement.classList.add('theme-light');
    }
    
    htmlElement.classList.add(`font-scale-${fontSize}`);

  }, [theme, fontSize, highContrast]);


  const handleEnterApp = () => {
    setShowWelcome(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-theme-bg-primary text-theme-text-primary transition-colors duration-300">
      {showWelcome ? (
        <WelcomeScreen onEnter={handleEnterApp} />
      ) : (
        <>
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8 sm:py-10">
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<Home />} />
              <Route path="/chat" element={<ChatInterface />} />
              <Route path="/pdfs" element={<PdfSection />} />
              <Route path="/study-plan" element={<StudyPlanCreator />} />
              <Route path="/mentorship" element={<MentorshipSection />} /> {/* Added route */}
            </Routes>
          </main>
          <footer className="text-center p-6 text-sm text-theme-text-tertiary border-t border-theme-border-primary">
            VestMind &copy; {new Date().getFullYear()}
          </footer>
        </>
      )}
      {!showWelcome && <AccessibilityControls />}
      <div 
        aria-hidden="true"
        className="fixed bottom-3 left-3 text-xs text-theme-text-tertiary opacity-60 transform -rotate-45 origin-bottom-left select-none pointer-events-none z-0"
      >
        Versão em Desenvolvimento - não representa o produto final
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AccessibilityProvider>
        <AppContent />
      </AccessibilityProvider>
    </HashRouter>
  );
};

export default App;