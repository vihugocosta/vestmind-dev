import React from 'react';
import { SendIcon } from './icons/SendIcon';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ value, onChange, onSubmit, isLoading }) => {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey && !isLoading) {
      event.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="p-4 border-t border-theme-border-primary bg-theme-bg-card">
      <div className="flex items-center space-x-3">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Digite sua mensagem..."
          className="flex-grow p-3 bg-theme-bg-input text-theme-text-primary rounded-lg focus:ring-2 focus:ring-theme-accent-primary focus:border-theme-accent-primary focus:outline-none placeholder:text-theme-text-tertiary transition-colors duration-150"
          disabled={isLoading}
          aria-label="Campo de mensagem"
        />
        <button
          onClick={onSubmit}
          disabled={isLoading || !value.trim()}
          className="bg-theme-accent-secondary text-theme-text-white p-3 rounded-lg hover:bg-theme-accent-secondary-hover focus:outline-none focus:ring-2 focus:ring-theme-accent-secondary focus:ring-offset-2 focus:ring-offset-theme-bg-card disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-150"
          aria-label="Enviar mensagem"
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-theme-text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <SendIcon className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
};
