import React from 'react';
import { NewsArticle } from '../types';
import { ExternalLinkIcon } from './icons/ExternalLinkIcon';
import { PdfIcon } from './icons/PdfIcon'; // Generic icon for news

interface NewsCardProps {
  article: NewsArticle;
}

const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString + 'T00:00:00'); 
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  } catch (e) {
    const parts = dateString.split('-');
    if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
    return dateString;
  }
};


export const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const ArticleIcon = article.icon || PdfIcon;

  return (
    <article className="bg-theme-bg-card p-5 sm:p-6 rounded-xl shadow-lg border border-theme-border-primary hover:border-theme-accent-primary/80 hover:shadow-teal-glow-sm transform hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between animate-fadeIn">
      <div>
        <div className="flex items-start mb-3">
          <ArticleIcon className="h-7 w-7 text-theme-accent-primary mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-semibold text-theme-text-primary mb-1.5 leading-tight">{article.title}</h3>
            {article.category && (
              <span className="text-xs bg-theme-accent-primary/20 text-theme-accent-primary px-2.5 py-1 rounded-full font-medium uppercase tracking-wide">
                {article.category}
              </span>
            )}
          </div>
        </div>
        <p className="text-sm text-theme-text-secondary mb-4 leading-relaxed min-h-[4.5rem]">
          {article.summary}
        </p>
        <p className="text-xs text-theme-text-tertiary mb-5">
          <strong>Fonte:</strong> {article.source} | <strong>Publicado em:</strong> {formatDate(article.publishedDate)}
        </p>
      </div>
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto group inline-flex items-center justify-center w-full text-center bg-theme-accent-secondary text-theme-text-white px-4 py-2.5 rounded-lg hover:bg-theme-accent-secondary-hover transition-colors duration-150 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-theme-accent-secondary focus:ring-offset-2 focus:ring-offset-theme-bg-card"
        aria-label={`Leia mais sobre ${article.title}`}
      >
        Leia mais
        <ExternalLinkIcon className="h-4 w-4 ml-2 transform transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </article>
  );
};
