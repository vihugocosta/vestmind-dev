import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChatMessage } from '../types';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorDisplay } from './ErrorDisplay';
import { geminiService, getApiKeyStatus, getApiKeyError } from '../services/geminiService';
import { Chat } from '@google/genai';
import { ApiKeyStatus } from '../types';


const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentInput, setCurrentInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [apiKeyStatus, setApiKeyStatus] = useState<ApiKeyStatus>(ApiKeyStatus.VALID);
  const [apiKeyErrorMessage, setApiKeyErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const status = getApiKeyStatus();
    setApiKeyStatus(status);
    if (status !== ApiKeyStatus.VALID) {
        const errMessage = getApiKeyError();
        setApiKeyErrorMessage(errMessage);
        setError("Erro de Configuração: " + (errMessage || "A chave da API não está configurada ou é inválida."));
        return;
    }

    const initChat = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const session = await geminiService.startChat();
        if (session) {
          setChatSession(session);
           setMessages([{ 
            id: crypto.randomUUID(), 
            text: "Olá! Sou seu assistente de IA do VestMind. Como posso te ajudar hoje?", 
            sender: 'gemini', 
            timestamp: new Date() 
          }]);
        } else {
          const err = "Falha ao iniciar a sessão de bate-papo. A chave da API pode estar ausente ou inválida, ou o serviço pode estar indisponível.";
          setError(err);
          setApiKeyStatus(ApiKeyStatus.ERROR); 
          setApiKeyErrorMessage(err);
        }
      } catch (e: any) {
        const errMessage = e.message || "Ocorreu um erro inesperado ao iniciar o bate-papo.";
        setError(errMessage);
        setApiKeyStatus(ApiKeyStatus.ERROR);
        setApiKeyErrorMessage(errMessage);
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    initChat();
  }, []);

  const handleSendMessage = useCallback(async () => {
    if (!currentInput.trim() || isLoading || !chatSession) return;

    const newUserMessage: ChatMessage = {
      id: crypto.randomUUID(),
      text: currentInput.trim(),
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setCurrentInput('');
    setIsLoading(true);
    setError(null);

    const streamingMessageId = crypto.randomUUID();
    setMessages(prevMessages => [
      ...prevMessages,
      {
        id: streamingMessageId,
        text: '',
        sender: 'gemini',
        timestamp: new Date(),
        isStreaming: true,
      },
    ]);

    try {
      await geminiService.sendMessageAndStream(
        chatSession,
        newUserMessage.text,
        (chunkText, isFinalChunk) => {
          setMessages(prevMessages =>
            prevMessages.map(msg =>
              msg.id === streamingMessageId
                ? { ...msg, text: msg.text + chunkText, isStreaming: !isFinalChunk }
                : msg
            )
          );
        }
      );
    } catch (e: any) {
      const errMessage = e.message || "Ocorreu um erro ao enviar a mensagem.";
      setError(errMessage);
      setMessages(prevMessages => prevMessages.filter(msg => msg.id !== streamingMessageId)); 
      setMessages(prevMessages => [
        ...prevMessages,
        {
            id: crypto.randomUUID(),
            text: `Erro: ${errMessage}`,
            sender: 'system',
            timestamp: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [currentInput, isLoading, chatSession]);

  if (apiKeyStatus !== ApiKeyStatus.VALID && apiKeyErrorMessage) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 bg-theme-bg-card rounded-xl shadow-xl border border-theme-border-primary">
        <ErrorDisplay message={`${apiKeyErrorMessage}`} />
        <p className="mt-6 text-theme-text-secondary text-center">
          Por favor, certifique-se de que a chave da API (API_KEY) está configurada corretamente como uma variável de ambiente.
        </p>
         <p className="mt-2 text-xs text-theme-text-tertiary">
          Consulte a documentação para mais informações.
        </p>
      </div>
    );
  }


  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] sm:h-[calc(100vh-11rem)] max-w-3xl mx-auto bg-theme-bg-card shadow-2xl rounded-xl overflow-hidden border border-theme-border-secondary">
      <div className="flex-grow p-4 sm:p-6 space-y-4 overflow-y-auto">
        {messages.map(msg => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {isLoading && messages[messages.length -1]?.sender !== 'gemini' && (
            <div className="flex justify-center py-2">
                <LoadingSpinner />
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      {error && !isLoading && messages.every(msg => msg.sender !== 'system') && (
        <div className="p-4 border-t border-theme-border-primary">
          <ErrorDisplay message={error} />
        </div>
      )}
      <ChatInput
        value={currentInput}
        onChange={setCurrentInput}
        onSubmit={handleSendMessage}
        isLoading={isLoading || !chatSession}
      />
    </div>
  );
};

export default ChatInterface;
