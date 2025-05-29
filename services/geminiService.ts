import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { GeminiService, ApiKeyStatus } from "../types";

let ai: GoogleGenAI | null = null;
let apiKeyError: string | null = null;
let currentApiKeyStatus: ApiKeyStatus = ApiKeyStatus.VALID;

const apiKey = process.env.API_KEY;

if (!apiKey) {
  apiKeyError = "A API_KEY não está configurada. Por favor, defina a variável de ambiente process.env.API_KEY.";
  console.error(apiKeyError);
  currentApiKeyStatus = ApiKeyStatus.MISSING;
} else {
  try {
    ai = new GoogleGenAI({ apiKey });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    apiKeyError = `Falha ao inicializar GoogleGenAI: ${message}`;
    console.error(apiKeyError);
    currentApiKeyStatus = ApiKeyStatus.ERROR;
  }
}

export const getApiKeyStatus = (): ApiKeyStatus => currentApiKeyStatus;
export const getApiKeyError = (): string | null => apiKeyError;

const startChat = async (): Promise<Chat | null> => {
  if (currentApiKeyStatus !== ApiKeyStatus.VALID || !ai) {
    throw new Error(apiKeyError || "Cliente GoogleGenAI não inicializado.");
  }
  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash-preview-04-17',
      config: {
        systemInstruction: 'Você é um assistente de IA amigável e prestativo. Forneça respostas concisas e informativas.',
      },
    });
    return chat;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Erro ao iniciar sessão de bate-papo:", message);
    throw new Error(`Falha ao iniciar sessão de bate-papo: ${message}`);
  }
};

// Função utilitária para remover '**' do texto (ignorar markdown negrito)
function removeAsterisks(text: string): string {
  return text.replace(/\*\*/g, '');
}

const sendMessageAndStream = async (
  chat: Chat,
  message: string,
  onChunk: (chunkText: string, isFinalChunk: boolean) => void
): Promise<string> => {
  if (currentApiKeyStatus !== ApiKeyStatus.VALID) {
     throw new Error(apiKeyError || "Cliente GoogleGenAI não inicializado ou erro na chave da API.");
  }

  let accumulatedText = "";
  try {
    const stream = await chat.sendMessageStream({ message });
    for await (const chunk of stream) {
      let text = chunk.text;
      if (text) {
        text = removeAsterisks(text); // Remove '**' de cada chunk
        accumulatedText += text;
        onChunk(text, false);
      }
    }
    onChunk("", true);
    return accumulatedText;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Erro ao enviar mensagem em stream:", errorMessage);
    onChunk(`\n\n[Erro: ${errorMessage}]`, true); 
    throw new Error(`Falha ao enviar mensagem: ${errorMessage}`);
  }
};

const generateStudyPlanText = async (userPrompt: string): Promise<string> => {
  if (currentApiKeyStatus !== ApiKeyStatus.VALID || !ai) {
    throw new Error(apiKeyError || "Cliente GoogleGenAI não inicializado.");
  }

  const fullPrompt = `Você é um especialista em planejamento de estudos para vestibulares e concursos.\nCrie um plano de estudos personalizado e detalhado baseado na seguinte descrição fornecida pelo usuário:\n"${userPrompt}"\n\nO plano deve incluir:\n1.  Uma visão geral dos objetivos.\n2.  Uma divisão semanal ou diária das matérias e tópicos a serem estudados.\n3.  Sugestões de quantidade de tempo a ser dedicado a cada tópico/matéria.\n4.  Dicas de estudo, como técnicas de memorização, resolução de exercícios, e revisões periódicas.\n5.  Sugestões de recursos (livros, sites, vídeos), se aplicável (mencione que são sugestões genéricas se não puder ser específico).\n6.  Uma mensagem motivacional curta ao final.\n\nFormate a resposta de forma clara, usando títulos, listas (com marcadores ou números) e quebras de linha para facilitar a leitura.\nEvite usar markdown complexo, prefira texto simples e bem estruturado.`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash-preview-04-17',
        contents: fullPrompt,
    });
    let text = response.text;
    if (!text) {
        throw new Error("A API não retornou nenhum texto para o plano de estudos.");
    }
    text = removeAsterisks(text); // Remove '**' do texto final
    return text;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Erro ao gerar plano de estudos:", message);
    throw new Error(`Falha ao gerar plano de estudos: ${message}`);
  }
};

export const geminiService: GeminiService = {
  startChat,
  sendMessageAndStream,
  generateStudyPlanText,
};
