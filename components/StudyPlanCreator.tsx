import React, { useState, useEffect, useCallback } from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorDisplay } from './ErrorDisplay';
import { geminiService, getApiKeyStatus, getApiKeyError } from '../services/geminiService';
import { ApiKeyStatus } from '../types';
import { StudyPlanIcon } from './icons/StudyPlanIcon';
import { TrashIcon } from './icons/TrashIcon';

const LOCAL_STORAGE_KEY = 'vestmind-study-plan';

interface SavedStudyPlan {
  userInput: string;
  studyPlan: string;
  timestamp: number;
}

const StudyPlanCreator: React.FC = () => {
  const [userInput, setUserInput] = useState<string>('');
  const [studyPlan, setStudyPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [apiKeyStatusState, setApiKeyStatusState] = useState<ApiKeyStatus>(ApiKeyStatus.VALID);
  const [apiKeyErrorMessage, setApiKeyErrorMessage] = useState<string | null>(null);
  const [lastSavedTimestamp, setLastSavedTimestamp] = useState<number | null>(null);

  useEffect(() => {
    const status = getApiKeyStatus();
    setApiKeyStatusState(status);
    if (status !== ApiKeyStatus.VALID) {
      const errMessage = getApiKeyError();
      setApiKeyErrorMessage(errMessage);
      setError("Erro de Configuração: " + (errMessage || "A chave da API não está configurada corretamente."));
    }

    try {
      const savedPlanString = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedPlanString) {
        const savedPlan: SavedStudyPlan = JSON.parse(savedPlanString);
        setUserInput(savedPlan.userInput);
        setStudyPlan(savedPlan.studyPlan);
        setLastSavedTimestamp(savedPlan.timestamp);
      }
    } catch (e) {
      console.error("Erro ao carregar plano de estudos do localStorage:", e);
    }
  }, []);

  const savePlanToLocalStorage = useCallback((input: string, plan: string) => {
    try {
      const timestamp = Date.now();
      const dataToSave: SavedStudyPlan = { userInput: input, studyPlan: plan, timestamp };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToSave));
      setLastSavedTimestamp(timestamp);
    } catch (e) {
      console.error("Erro ao salvar plano de estudos no localStorage:", e);
      setError("Não foi possível salvar o plano de estudos localmente. Seu navegador pode estar com o armazenamento cheio ou em modo privado.");
    }
  }, []);

  const handleGeneratePlan = async () => {
    if (!userInput.trim()) {
        setError("Por favor, descreva seus objetivos de estudo.");
        return;
    }
    if (isLoading) return;

    if (apiKeyStatusState !== ApiKeyStatus.VALID) {
        setError("Erro de Configuração: " + (apiKeyErrorMessage || "A chave da API não é válida ou está ausente. Verifique a configuração."));
        return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const plan = await geminiService.generateStudyPlanText(userInput);
      setStudyPlan(plan);
      savePlanToLocalStorage(userInput, plan);
    } catch (e: any) {
      const errMessage = e.message || "Ocorreu um erro ao gerar o plano de estudos.";
      setError(errMessage);
      setStudyPlan(null); 
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearPlan = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setUserInput('');
    setStudyPlan(null);
    setLastSavedTimestamp(null);
    setError(null); 
  };
  
  const formatDate = (timestamp: number | null): string => {
    if (!timestamp) return '';
    return new Date(timestamp).toLocaleString('pt-BR', {
      day: '2-digit',
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };


  if (apiKeyStatusState !== ApiKeyStatus.VALID && apiKeyErrorMessage) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 bg-theme-bg-card rounded-xl shadow-xl border border-theme-border-primary animate-fadeIn">
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
    <div className="max-w-3xl mx-auto p-6 sm:p-8 bg-theme-bg-nav shadow-2xl rounded-xl border border-theme-border-primary space-y-6 sm:space-y-8 animate-fadeIn">
      <div className="flex items-center justify-between pb-2 border-b border-theme-border-secondary/50">
        <div className="flex items-center space-x-3">
          <StudyPlanIcon className="h-8 w-8 sm:h-9 sm:w-9 text-theme-accent-primary" />
          <h1 className="text-2xl sm:text-3xl font-bold text-theme-accent-primary">Crie seu Plano de Estudos</h1>
        </div>
        { (studyPlan || lastSavedTimestamp || userInput) && (
           <button
            onClick={handleClearPlan}
            className="flex items-center space-x-2 px-3 py-2 text-sm bg-theme-error-primary hover:bg-theme-error-secondary text-theme-text-white rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-theme-error-secondary focus:ring-offset-2 focus:ring-offset-theme-bg-nav"
            title="Limpar plano e dados"
            aria-label="Limpar plano salvo e recomeçar"
          >
            <TrashIcon className="h-4 w-4" /> 
            <span className="hidden sm:inline">Limpar Tudo</span>
          </button>
        )}
      </div>
      <p className="text-theme-text-secondary sm:text-base">
        Descreva seus objetivos, matérias de foco, tempo disponível e qualquer outra informação relevante para que a IA crie um plano de estudos personalizado para você.
      </p>

      <div className="space-y-4">
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ex: Estudar para ENEM focado em Exatas e Redação, 3 meses disponíveis, 2 horas por dia de segunda a sexta."
          className="w-full p-3.5 bg-theme-bg-input text-theme-text-primary rounded-lg focus:ring-2 focus:ring-theme-accent-primary focus:border-theme-accent-primary focus:outline-none placeholder:text-theme-text-tertiary min-h-[120px] resize-y transition-colors duration-150 text-sm sm:text-base"
          rows={5}
          disabled={isLoading}
          aria-label="Descreva seus objetivos de estudo"
        />
        <button
          onClick={handleGeneratePlan}
          disabled={isLoading || !userInput.trim() || apiKeyStatusState !== ApiKeyStatus.VALID}
          className="w-full flex items-center justify-center bg-theme-accent-secondary text-theme-text-white px-6 py-3 rounded-lg hover:bg-theme-accent-secondary-hover focus:outline-none focus:ring-2 focus:ring-theme-accent-secondary focus:ring-offset-2 focus:ring-offset-theme-bg-nav disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-150 font-semibold text-base"
        >
          {isLoading ? (
            <>
              <LoadingSpinner size="small" className="mr-2.5" />
              Gerando Plano...
            </>
          ) : (
            'Gerar Plano de Estudos com IA'
          )}
        </button>
      </div>
      
      {lastSavedTimestamp && !studyPlan && !isLoading && !error && (
        <p className="text-xs text-theme-text-tertiary text-center animate-fadeIn">
          Você tem um plano salvo de {formatDate(lastSavedTimestamp)}. Edite a descrição acima e gere um novo, ou limpe para começar do zero.
        </p>
      )}

      {error && !isLoading && <ErrorDisplay message={error} />}
      
      {isLoading && !studyPlan && (
        <div className="flex flex-col items-center justify-center py-6 text-center animate-fadeIn">
          <LoadingSpinner size="large" />
          <p className="mt-4 text-theme-text-secondary">Gerando seu plano de estudos... Isso pode levar alguns instantes.</p>
        </div>
      )}


      {studyPlan && !isLoading && (
        <div className="mt-6 p-4 sm:p-6 bg-theme-bg-card rounded-xl border border-theme-border-primary animate-slideInUp">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 pb-3 border-b border-theme-border-secondary/70">
            <h2 className="text-xl sm:text-2xl font-semibold text-theme-accent-primary mb-2 sm:mb-0">Seu Plano de Estudos Personalizado:</h2>
            {lastSavedTimestamp && (
              <p className="text-xs text-theme-text-tertiary">
                Salvo em: {formatDate(lastSavedTimestamp)}
              </p>
            )}
          </div>
          <div 
            className="text-theme-text-primary whitespace-pre-wrap text-sm sm:text-base leading-relaxed prose prose-sm max-w-none prose-headings:text-theme-accent-primary prose-strong:text-theme-text-primary prose-ul:list-disc prose-ul:pl-5 prose-ol:list-decimal prose-ol:pl-5"
            dangerouslySetInnerHTML={{ __html: studyPlan.replace(/\n/g, '<br />') }} 
          >
          </div>
        </div>
      )}

       {!studyPlan && !isLoading && !error && !lastSavedTimestamp && (
        <div className="mt-6 p-6 sm:p-8 bg-theme-bg-card/70 rounded-xl border border-theme-border-primary/50 text-center animate-fadeIn">
          <StudyPlanIcon className="h-12 w-12 sm:h-16 sm:w-16 text-theme-text-tertiary mx-auto mb-4"/>
          <p className="text-theme-text-secondary text-base sm:text-lg">Seu plano de estudos personalizado aparecerá aqui.</p>
          <p className="text-sm text-theme-text-tertiary mt-1">Descreva seus objetivos acima e clique em "Gerar Plano".</p>
        </div>
      )}
    </div>
  );
};

export default StudyPlanCreator;
