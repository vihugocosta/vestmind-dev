import { Chat } from "@google/genai";

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'gemini' | 'system';
  timestamp: Date;
  isStreaming?: boolean;
}

export interface PdfDocument {
  id: string;
  title: string;
  url: string;
  description: string;
  category: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  publishedDate: string; // YYYY-MM-DD format
  category?: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>; // Optional: specific icon per category
}

export interface GeminiService {
  startChat: () => Promise<Chat | null>;
  sendMessageAndStream: (
    chat: Chat,
    message: string,
    onChunk: (chunkText: string, isFinalChunk: boolean) => void
  ) => Promise<string>; // Returns final accumulated text
  generateStudyPlanText: (userPrompt: string) => Promise<string>;
}

export enum ApiKeyStatus {
  VALID,
  MISSING,
  ERROR
}

// Accessibility Types
export type ThemeSetting = 'light' | 'dark' | 'system'; // 'system' can defer to OS
export type FontSizeSetting = 'sm' | 'md' | 'lg' | 'xl';
export type HighContrastSetting = 'on' | 'off';

export interface AccessibilitySettings {
  theme: ThemeSetting;
  fontSize: FontSizeSetting;
  highContrast: HighContrastSetting;
}

export interface AccessibilityContextProps extends AccessibilitySettings {
  setTheme: (theme: ThemeSetting) => void;
  setFontSize: (fontSize: FontSizeSetting) => void;
  setHighContrast: (highContrast: HighContrastSetting) => void;
  resetAccessibilitySettings: () => void;
}
