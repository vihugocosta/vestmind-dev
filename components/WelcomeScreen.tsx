import React from 'react';

interface WelcomeScreenProps {
  onEnter: () => void;
}

const professorImageUrl = 'https://i.imgur.com/Cfnfdrp.png'; 

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onEnter }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-[var(--background-primary)] via-[var(--background-nav)] to-[var(--background-primary)] text-theme-text-primary overflow-y-auto">
      <div className="w-full max-w-5xl mx-auto">
        {/* Main Content: Image and Text */}
        <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-8 md:gap-10 lg:gap-16 animate-fadeInScaleUp bg-white/10 rounded-2xl shadow-2xl p-6 md:p-10 border border-theme-accent-primary backdrop-blur-md">
          {/* Image Column - Order 1 on mobile (source order), Order 2 on LG */}
          <div className="w-full lg:w-5/12 flex justify-center items-center order-1 lg:order-2">
            <div className="w-full aspect-[3/4] max-w-[340px] sm:max-w-[400px] md:max-w-[440px] lg:max-w-[520px] xl:max-w-[580px] relative rounded-xl border-4 border-theme-accent-primary overflow-hidden flex items-center justify-center bg-white/70">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbAIBwuR7S92pa2F5tj6j0Q7WHbOJSWctxuw&s"
                alt="Fundo decorativo"
                className="absolute inset-0 w-full h-full object-cover blur-md z-0"
                aria-hidden="true"
                draggable="false"
              />
              <img 
                src={professorImageUrl} 
                alt="Professor Fabiano" 
                className="w-full h-full object-contain relative z-10 drop-shadow-xl"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
            </div>
          </div>

          {/* Text Content Column - Order 2 on mobile, Order 1 on LG */}
          <div className="w-full lg:w-7/12 text-center lg:text-left order-2 lg:order-1 flex flex-col justify-center items-center lg:items-start">
            <h1 className="text-[2.2rem] leading-[2.5rem] sm:text-[2.7rem] sm:leading-[3rem] md:text-[3.1rem] md:leading-[3.4rem] lg:text-[3.5rem] lg:leading-[3.8rem] xl:text-[3.7rem] xl:leading-[4rem] font-extrabold text-theme-accent-primary mb-4 drop-shadow-lg">
              Bem-vindo ao <span className="text-theme-accent-secondary">VestMind!</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-theme-text-white mb-4 font-semibold">
              Prepare-se para o vestibular com o Professor Fabiano.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-theme-text-secondary mb-6 sm:mb-8 leading-relaxed max-w-xl">
              Didática direta, estratégias personalizadas e foco total no seu sucesso. Domine os conteúdos mais difíceis e conquiste sua vaga!
            </p>
          </div>
        </div>

        {/* Button Section */}
        <div className="mt-8 sm:mt-10 md:mt-12 text-center animate-fadeIn" style={{ animationDelay: "200ms" }}>
          <button
            onClick={onEnter}
            className="bg-gradient-to-r from-theme-accent-primary to-theme-accent-secondary text-theme-text-white px-10 py-4 sm:px-12 sm:py-5 rounded-xl text-lg sm:text-xl font-bold shadow-2xl hover:scale-110 hover:shadow-theme-accent-primary/40 focus:outline-none focus:ring-4 focus:ring-theme-accent-secondary focus:ring-offset-4 focus:ring-offset-[var(--background-primary)] transition-all duration-200"
            aria-label="Começar a usar o VestMind"
          >
            Começar Agora
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;