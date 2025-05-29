import React from 'react';
import { MentorshipNavIcon } from './icons/MentorshipNavIcon'; // Retained for community item
import { AcademicCapIcon } from './icons/AcademicCapIcon'; // Added for header
import { LockClosedIcon } from './icons/LockClosedIcon';
import { ChatIcon } from './icons/ChatIcon';
import { StudyPlanIcon } from './icons/StudyPlanIcon';
import { LightBulbIcon } from './icons/LightBulbIcon'; 

const FeatureListItem: React.FC<{ icon: React.ReactNode, text: string }> = ({ icon, text }) => (
  <li className="flex items-start space-x-3 p-3 bg-theme-bg-tertiary/50 rounded-lg">
    <span className="flex-shrink-0 w-6 h-6 text-theme-accent-primary opacity-70">{icon}</span>
    <span className="text-theme-text-secondary opacity-80">{text}</span>
  </li>
);

const MentorshipSection: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 sm:p-8 bg-theme-bg-nav shadow-2xl rounded-xl border border-theme-border-primary space-y-6 sm:space-y-8 animate-fadeIn">
      <header className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 pb-4 border-b border-theme-border-secondary/50">
        <AcademicCapIcon className="h-10 w-10 sm:h-12 sm:w-12 text-theme-accent-primary" /> {/* Changed icon */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-theme-accent-primary text-center sm:text-left">Mentoria Premium VestMind</h1>
          <p className="text-theme-text-secondary text-sm sm:text-base text-center sm:text-left mt-1">
            Acelere sua aprovação com orientação individualizada de especialistas.
          </p>
        </div>
      </header>

      <div className="text-theme-text-primary prose prose-sm sm:prose-base max-w-none prose-headings:text-theme-accent-primary prose-strong:text-theme-text-primary prose-ul:list-disc prose-ul:pl-5 prose-ol:list-decimal prose-ol:pl-5">
        <p>
          Imagine ter um mentor experiente ao seu lado, guiando cada passo da sua jornada de estudos. Com a Mentoria Premium VestMind, você terá acesso a um suporte personalizado para:
        </p>
        <ul>
          <li>Esclarecer dúvidas complexas de forma rápida e eficaz.</li>
          <li>Desenvolver estratégias de estudo e de prova sob medida para suas necessidades.</li>
          <li>Manter a motivação e o foco, superando os desafios da preparação.</li>
          <li>Receber feedback construtivo sobre seu desempenho e progresso.</li>
        </ul>
      </div>

      <div className="mt-6 p-6 sm:p-8 bg-theme-bg-card rounded-xl border-2 border-theme-accent-primary/50 shadow-teal-glow-sm relative overflow-hidden">
        <div className="absolute -top-8 -right-8 text-theme-accent-primary/10 transform rotate-[20deg] pointer-events-none">
            <LockClosedIcon className="w-32 h-32 sm:w-40 sm:w-40" />
        </div>
        
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row items-center sm:space-x-4 mb-5">
            <LockClosedIcon className="h-10 w-10 text-theme-accent-primary mb-3 sm:mb-0 flex-shrink-0" />
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-theme-accent-primary">Acesso Exclusivo em Breve!</h2>
              <p className="text-theme-text-secondary text-sm sm:text-base">Esta funcionalidade é parte dos nossos planos Premium e está em desenvolvimento.</p>
            </div>
          </div>

          <p className="text-theme-text-primary mb-4 font-medium">Com a Mentoria Premium, você poderá:</p>
          <ul className="space-y-3 mb-6">
            <FeatureListItem 
              icon={<ChatIcon className="w-5 h-5" />} 
              text="Sessões de tira-dúvidas individuais ou em pequenos grupos com professores especialistas." 
            />
            <FeatureListItem 
              icon={<StudyPlanIcon className="w-5 h-5" />} 
              text="Revisão e otimização personalizada do seu plano de estudos por mentores experientes." 
            />
            <FeatureListItem 
              icon={<LightBulbIcon className="w-5 h-5" />} 
              text="Aconselhamento estratégico para provas, incluindo gerenciamento de tempo e controle emocional." 
            />
             <FeatureListItem 
              icon={<MentorshipNavIcon className="w-5 h-5" />} // Original icon (users) kept for this community item
              text="Acesso a uma comunidade exclusiva de mentorados para troca de experiências e suporte mútuo." 
            />
          </ul>
        
          <div className="text-center p-4 bg-theme-bg-tertiary rounded-lg">
            <p className="text-lg font-semibold text-theme-text-primary">Fique de Olho!</p>
            <p className="text-theme-text-secondary text-sm">
              Estamos trabalhando para trazer essa experiência transformadora para você. Mais novidades sobre os planos Premium serão anunciadas em breve.
            </p>
          </div>
        </div>
      </div>
       <p className="text-xs text-theme-text-tertiary text-center mt-4">
          A Mentoria Premium VestMind será um serviço pago, adicional às funcionalidades gratuitas.
       </p>
    </div>
  );
};

export default MentorshipSection;
