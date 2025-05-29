import React, { useState, useEffect, useMemo } from 'react';
import { NewsArticle } from '../types';
import { NewsCard } from './NewsCard';
import { LoadingSpinner } from './LoadingSpinner';
import { HomeIcon as SectionIcon } from './icons/HomeIcon'; 

const sampleNews: NewsArticle[] = [
  {
    id: 'news1',
    title: 'MEC divulga datas oficiais do ENEM 2024',
    summary: 'O Ministério da Educação anunciou as datas para as provas do Exame Nacional do Ensino Médio de 2024. As inscrições começam em maio e as provas serão aplicadas em novembro.',
    url: 'https://example.com/news/enem-2024-datas',
    source: 'Portal G1 Educação',
    publishedDate: '2024-07-28',
    category: 'ENEM',
  },
  {
    id: 'news2',
    title: 'FUVEST 2025: Lista de obras literárias obrigatórias é atualizada',
    summary: 'A FUVEST publicou a nova lista de leituras obrigatórias para o vestibular de 2025, com a inclusão de três novos títulos e a remoção de dois. Confira as mudanças.',
    url: 'https://example.com/news/fuvest-2025-obras',
    source: 'Site Oficial FUVEST',
    publishedDate: '2024-07-27',
    category: 'Vestibular',
  },
  {
    id: 'news3',
    title: 'Concurso Banco Central: Edital previsto para Agosto com 500 vagas',
    summary: 'Fontes internas indicam que o edital para o novo concurso do Banco Central deve ser liberado na primeira quinzena de agosto, ofertando 500 vagas para nível superior.',
    url: 'https://example.com/news/concurso-banco-central-agosto',
    source: 'Folha Dirigida',
    publishedDate: '2024-07-26',
    category: 'Concurso',
  },
  {
    id: 'news4',
    title: 'ITA abre inscrições para Vestibular 2025 com novidades no processo seletivo',
    summary: 'O Instituto Tecnológico de Aeronáutica (ITA) está com inscrições abertas para seu tradicional e concorrido vestibular. Este ano, há mudanças no formato das provas de segunda fase.',
    url: 'https://example.com/news/ita-vestibular-2025',
    source: 'Site Oficial ITA',
    publishedDate: '2024-07-25',
    category: 'Vestibular',
  },
  {
    id: 'news5',
    title: 'Como usar a nota do ENEM para ingressar em universidades portuguesas',
    summary: 'Saiba quais universidades em Portugal aceitam a nota do ENEM e como funciona o processo de candidatura para estudantes brasileiros.',
    url: 'https://example.com/news/enem-portugal-universidades',
    source: 'Educa Mais Brasil',
    publishedDate: '2024-07-24',
    category: 'ENEM',
  },
];

const ALL_NEWS_FILTER = "Todas";

const Home: React.FC = () => {
  const [newsItems, setNewsItems] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [newsCategories, setNewsCategories] = useState<string[]>([]);
  const [selectedNewsCategory, setSelectedNewsCategory] = useState<string>(ALL_NEWS_FILTER);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setNewsItems(sampleNews);
      setIsLoading(false);
    }, 700);
  }, []);

  useEffect(() => {
    if (newsItems.length > 0) {
      const uniqueCategories = Array.from(new Set(newsItems.map(item => item.category).filter(Boolean) as string[]));
      uniqueCategories.sort((a, b) => a.localeCompare(b));
      setNewsCategories([ALL_NEWS_FILTER, ...uniqueCategories]);
    }
  }, [newsItems]);

  const handleCategoryFilter = (category: string) => {
    setSelectedNewsCategory(category);
  };

  const filteredNewsItems = useMemo(() => {
    if (selectedNewsCategory === ALL_NEWS_FILTER) {
      return newsItems;
    }
    return newsItems.filter(item => item.category === selectedNewsCategory);
  }, [newsItems, selectedNewsCategory]);


  return (
    <div className="space-y-8 sm:space-y-10 animate-fadeIn">
      <header className="pb-4 sm:pb-6 border-b border-theme-border-primary/60">
        <div className="flex items-center space-x-3 mb-2">
          <SectionIcon className="h-8 w-8 sm:h-9 sm:w-9 text-theme-accent-primary" />
          <h1 className="text-3xl sm:text-4xl font-bold text-theme-accent-primary">Últimas Notícias e Novidades</h1>
        </div>
        <p className="text-theme-text-secondary text-base sm:text-lg">
          Mantenha-se atualizado sobre os principais vestibulares, concursos e informações relevantes para seus estudos.
        </p>
      </header>

      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size="large" />
        </div>
      )}

      {!isLoading && newsCategories.length > 1 && (
         <div className="my-6 p-4 sm:p-6 bg-theme-bg-nav rounded-xl shadow-xl border border-theme-border-primary/70">
          <h2 className="text-lg sm:text-xl font-semibold text-theme-text-primary mb-4">Filtrar por Categoria:</h2>
          <div className="flex flex-wrap gap-3">
            {newsCategories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryFilter(category)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ease-in-out border-2
                  ${selectedNewsCategory === category
                    ? 'bg-theme-accent-secondary text-theme-text-white shadow-md shadow-theme-shadow-color-accent scale-105 border-theme-accent-secondary'
                    : 'bg-theme-bg-tertiary text-theme-text-secondary border-theme-border-secondary hover:bg-theme-bg-interactive hover:border-theme-border-interactive-focus focus:outline-none focus:ring-2 focus:ring-theme-accent-primary focus:ring-offset-2 focus:ring-offset-theme-bg-nav'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      {!isLoading && filteredNewsItems.length === 0 && (
        <p className="text-center text-theme-text-secondary py-10 text-lg">
          {selectedNewsCategory === ALL_NEWS_FILTER 
            ? "Nenhuma notícia disponível no momento." 
            : `Nenhuma notícia encontrada para a categoria "${selectedNewsCategory}".`}
        </p>
      )}

      {!isLoading && filteredNewsItems.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredNewsItems.map(article => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      )}
       <div className="mt-12 text-center text-xs sm:text-sm text-theme-text-tertiary">
          <p>As notícias apresentadas são fictícias e servem apenas para demonstração.</p>
        </div>
    </div>
  );
};

export default Home;
