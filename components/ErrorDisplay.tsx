import React from 'react';

interface ErrorDisplayProps {
  message: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="bg-theme-error-background-light border border-theme-error-primary/30 text-theme-error-text px-4 py-3 rounded-lg relative animate-fadeIn" role="alert">
      <strong className="font-bold text-theme-error-secondary">Erro: </strong>
      <span className="block sm:inline ml-1">{message}</span>
    </div>
  );
};
