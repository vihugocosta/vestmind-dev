import React from 'react';
import { ChatMessage } from '../types';
import { LoadingSpinner } from './LoadingSpinner';

interface MessageBubbleProps {
  message: ChatMessage;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const { text, sender, timestamp, isStreaming } = message;
  const isUser = sender === 'user';
  const isSystem = sender === 'system';

  // Note: For high contrast, text on accent colors needs careful consideration.
  // --text-on-accent might be a good CSS variable. For now, using text-theme-text-white or text-theme-text-black.
  const userBubbleColors = 'bg-theme-accent-secondary text-theme-text-white'; // Assuming accent-secondary is good for bg, and white text on it.
  const geminiBubbleColors = 'bg-theme-bg-tertiary text-theme-text-primary';
  const systemBubbleColors = 'bg-theme-error-secondary text-theme-text-white';


  const bubbleClasses = isUser
    ? `${userBubbleColors} self-end rounded-l-xl rounded-tr-xl shadow-md`
    : isSystem 
    ? `${systemBubbleColors} self-center rounded-xl text-sm py-2 px-4 shadow-md`
    : `${geminiBubbleColors} self-start rounded-r-xl rounded-tl-xl shadow-md`;
  
  const containerClasses = isUser ? 'flex justify-end' : isSystem ? 'flex justify-center' : 'flex justify-start';

  const formattedText = text.split('\n').map((line, index, arr) => (
    <React.Fragment key={index}>
      {line}
      {index < arr.length - 1 && <br />}
    </React.Fragment>
  ));

  return (
    <div className={`${containerClasses} mb-3 animate-fadeIn`}>
      <div className={`max-w-md md:max-w-lg lg:max-w-2xl px-4 py-3 ${bubbleClasses} transition-shadow duration-200`}>
        <p className="text-sm whitespace-pre-wrap leading-relaxed">
          {formattedText}
          {isStreaming && <LoadingSpinner size="small" className="inline-block ml-2" />}
        </p>
        {!isSystem && (
          <p className={`text-xs mt-1.5 ${isUser ? 'text-[var(--text-white)] opacity-80' : 'text-theme-text-tertiary'} text-right`}>
            {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        )}
      </div>
    </div>
  );
};
