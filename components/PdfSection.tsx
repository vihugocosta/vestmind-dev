import React, { useState, useEffect, useMemo } from 'react';
import { PdfDocument } from '../types';
import { PdfCard } from './PdfCard';
import { LoadingSpinner } from './LoadingSpinner';

const predefinedPdfs: PdfDocument[] = [
  {
    id: '1',
    title: 'ENEM 2023 - Caderno de Questões (1º Dia)',
    url: 'https://www.africau.edu/images/default/sample.pdf',
    description: 'Prova completa do primeiro dia do ENEM 2023, incluindo Linguagens, Códigos e suas Tecnologias, Redação e Ciências Humanas.',
    category: 'ENEM',
  },
  {
    id: '2',
    title: 'FUVEST 2024 - 1ª Fase',
    url: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf',
    description: 'Prova da primeira fase do vestibular da FUVEST 2024, com questões de conhecimentos gerais.',
    category: 'FUVEST',
  },
  {
    id: '3',
    title: 'UNICAMP 2023 - 1ª Fase',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    description: 'Prova da primeira fase do vestibular da UNICAMP 2023, com questões de conhecimentos gerais.',
    category: 'UNICAMP',
  },
   {
    id: '4',
    title: 'UNESP 2023 - Conhecimentos Gerais',
    url: 'https://www.its.hku.hk/services/communication/video/quick-start-guide.pdf',
    description: 'Prova de Conhecimentos Gerais do vestibular da UNESP 2023.',
    category: 'UNESP',
  },
  {
    id: '5',
    title: 'UERJ 2023 - Exame de Qualificação',
    url: 'https://www.africau.edu/images/default/sample.pdf',
    description: 'Exame de Qualificação do vestibular da UERJ 2023.',
    category: 'UERJ',
  },
  {
    id: '6',
    title: 'ENEM 2023 - Caderno de Questões (2º Dia)',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    description: 'Prova completa do segundo dia do ENEM 2023, cobrindo Ciências da Natureza e suas Tecnologias e Matemática.',
    category: 'ENEM',
  },
];

const ALL_CATEGORIES_FILTER = "Todos";

const PdfSection: React.FC = () => {
  const [pdfDocuments, setPdfDocuments] = useState<PdfDocument[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(ALL_CATEGORIES_FILTER);

  useEffect(() => {
    setTimeout(() => {
      setPdfDocuments(predefinedPdfs);
      setIsLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (pdfDocuments.length > 0) {
      const uniqueCategories = Array.from(new Set(pdfDocuments.map(doc => doc.category)));
      const examOrder = ["ENEM", "FUVEST", "UNICAMP", "UNESP", "UERJ"]; 
      const sortedUniqueCategories = uniqueCategories.sort((a, b) => {
        const indexA = examOrder.indexOf(a);
        const indexB = examOrder.indexOf(b);
        if (indexA === -1 && indexB === -1) return a.localeCompare(b);
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;
        return indexA - indexB;
      });
      setCategories([ALL_CATEGORIES_FILTER, ...sortedUniqueCategories]);
    }
  }, [pdfDocuments]);

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredPdfs = useMemo(() => {
    if (selectedCategory === ALL_CATEGORIES_FILTER) {
      return pdfDocuments;
    }
    return pdfDocuments.filter(doc => doc.category === selectedCategory);
  }, [pdfDocuments, selectedCategory]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="space-y-8 sm:space-y-10 animate-fadeIn">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-theme-accent-primary mb-2">Provas em PDF Disponíveis</h1>
        <p className="text-theme-text-secondary text-base sm:text-lg">Navegue e acesse diversos materiais de prova abaixo. Use os filtros para refinar sua busca por exame.</p>
      </div>

      {categories.length > 1 && (
        <div className="mb-6 p-4 sm:p-6 bg-theme-bg-nav rounded-xl shadow-xl border border-theme-border-primary">
          <h2 className="text-lg sm:text-xl font-semibold text-theme-text-primary mb-4">Filtrar por Exame:</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryFilter(category)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ease-in-out border-2
                  ${selectedCategory === category
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

      {filteredPdfs.length === 0 && !isLoading && (
         <p className="text-center text-theme-text-secondary py-10 text-lg">
            Nenhum documento PDF encontrado para o exame "{selectedCategory}".
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredPdfs.map(doc => (
          <PdfCard key={doc.id} document={doc} />
        ))}
      </div>
    </div>
  );
};

export default PdfSection;
