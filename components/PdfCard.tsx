import React from 'react';
import { PdfDocument } from '../types';
import { PdfIcon } from './icons/PdfIcon'; 

interface PdfCardProps {
  document: PdfDocument;
}

export const PdfCard: React.FC<PdfCardProps> = ({ document }) => {
  return (
    <div className="bg-theme-bg-card p-6 rounded-xl shadow-lg border border-theme-border-primary hover:border-theme-accent-primary/80 hover:shadow-teal-glow-sm transform hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between animate-fadeIn">
      <div>
        <div className="flex items-center mb-4">
          <PdfIcon className="h-7 w-7 text-theme-accent-primary mr-3 flex-shrink-0" />
          <h2 className="text-xl font-semibold text-theme-text-primary leading-tight">{document.title}</h2>
        </div>
        <p className="text-xs text-theme-text-tertiary mb-1 uppercase tracking-wider">Exame: {document.category}</p>
        <p className="text-sm text-theme-text-secondary mb-5 min-h-[4.5rem] h-auto overflow-y-auto leading-relaxed">
          {document.description}
        </p>
      </div>
      <a
        href={document.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-block w-full text-center bg-theme-accent-secondary text-theme-text-white px-4 py-2.5 rounded-lg hover:bg-theme-accent-secondary-hover transition-colors duration-150 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-theme-accent-secondary focus:ring-offset-2 focus:ring-offset-theme-bg-card"
      >
        Abrir PDF
      </a>
    </div>
  );
};
