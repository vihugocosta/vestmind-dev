import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon } from './icons/HomeIcon';
import { ChatIcon } from './icons/ChatIcon';
import { PdfIcon } from './icons/PdfIcon';
import { StudyPlanIcon } from './icons/StudyPlanIcon';
import { AcademicCapIcon } from './icons/AcademicCapIcon';

const Navbar: React.FC = () => {
  const activeClassName = "bg-theme-accent-secondary text-theme-text-white shadow-md shadow-theme-shadow-color-accent";
  const inactiveClassName = "text-theme-text-secondary hover:bg-theme-bg-tertiary hover:text-theme-text-primary";

  return (
    <nav className="bg-theme-bg-nav shadow-xl border-b border-theme-border-primary sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">
            <span className="font-extrabold text-2xl text-theme-accent-primary">VestMind</span>
          </div>
          <div className="flex space-x-1 sm:space-x-2">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold flex items-center space-x-2 transition-all duration-200 ${isActive ? activeClassName : inactiveClassName}`
              }
            >
              <HomeIcon className="h-5 w-5" />
              <span className="hidden sm:inline">Início</span>
            </NavLink>
            <NavLink
              to="/chat"
              className={({ isActive }) =>
                `px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold flex items-center space-x-2 transition-all duration-200 ${isActive ? activeClassName : inactiveClassName}`
              }
            >
              <ChatIcon className="h-5 w-5" />
              <span className="hidden sm:inline">Bate-papo</span>
            </NavLink>
            <NavLink
              to="/pdfs"
              className={({ isActive }) =>
                `px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold flex items-center space-x-2 transition-all duration-200 ${isActive ? activeClassName : inactiveClassName}`
              }
            >
              <PdfIcon className="h-5 w-5" />
              <span className="hidden sm:inline">Provas</span>
            </NavLink>
            <NavLink
              to="/study-plan"
              className={({ isActive }) =>
                `px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold flex items-center space-x-2 transition-all duration-200 ${isActive ? activeClassName : inactiveClassName}`
              }
            >
              <StudyPlanIcon className="h-5 w-5" />
              <span className="hidden sm:inline">Plano de Estudos</span>
            </NavLink>
            <NavLink
              to="/mentorship"
              className={({ isActive }) =>
                `px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold flex items-center space-x-2 transition-all duration-200 ${isActive ? activeClassName : inactiveClassName}`
              }
            >
              <AcademicCapIcon className="h-5 w-5" />
              <span className="hidden sm:inline">Mentoria</span>
              <span 
                className="hidden sm:inline-flex items-center justify-center ml-1.5 px-1.5 py-0.5 text-[0.6rem] font-bold bg-theme-accent-primary text-theme-text-white rounded-sm leading-none"
                aria-label="Recurso Profissional"
              >
                PRO
              </span>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;