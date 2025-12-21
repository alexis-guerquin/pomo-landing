import { useSmoothScroll } from '../hooks/useSmoothScroll';
import HeroSection from '../components/HeroSection';
import { MiniFeatureSection } from '../components/MiniFeature';
import { MINI_FEATURES_CONFIG } from '../config/mini-features.config';
import { ScratchToReveal } from '../components/ui/ScratchToReveal';
import { CTASection } from '../components/CTASection';
import { Footer } from '../components/Footer';
import Navbar from '../components/Navbar/Navbar';
import { LandingPageSEO } from '../components/SEO/LandingPageSEO';
import { useEffect, useState } from 'react';

const CHARACTER_IMAGES = [
  '/character/topProject.svg',
  '/character/default.svg',
  '/character/recaps.svg',
  '/character/stretching.svg',
  '/character/meditation.svg',
  '/character/free.svg',
  '/character/drink.svg',
];

export default function LandingPage() {
  useSmoothScroll();

  const [currentCharacter] = useState<string>(() => {
    return CHARACTER_IMAGES[Math.floor(Math.random() * CHARACTER_IMAGES.length)];
  });

  const [imageDimensions, setImageDimensions] = useState({ width: 300, height: 300 });
  const [key] = useState(0);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    if (!currentCharacter) return;

    const img = new Image();
    img.onload = () => {
      const maxHeight = 400;
      const aspectRatio = img.width / img.height;

      let newWidth = maxHeight * aspectRatio;
      let newHeight = maxHeight;

      if (newWidth > 400) {
        newWidth = 400;
        newHeight = 400 / aspectRatio;
      }

      setImageDimensions({ width: Math.round(newWidth), height: Math.round(newHeight) });
    };
    img.src = currentCharacter;
  }, [currentCharacter]);

  const handleComplete = () => {
    setShowHint(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app">
      <LandingPageSEO />
      <div className="footer-character-container">
        <button
          onClick={scrollToTop}
          className="footer-scroll-top"
          aria-label="Retour en haut">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
        <img
          src="/character/stretching.svg"
          alt="Personnage Pomocha"
          className="footer-character"
          width="200"
          height="200"
        />
      </div>

      <Navbar />
      
      {/* Section Hero - Point d'entrée principal */}
      <section id="home" aria-label="Accueil">
        <HeroSection />
      </section>

      {/* Section À propos - Découverte de Pomocha */}
      <section id="about" className="scratch-card-container" aria-label="À propos de Pomocha">
        {showHint && (
          <div className="scratch-card-hint">
            <span>personnage à gratter →</span>
          </div>
        )}
        <ScratchToReveal
          key={key}
          width={imageDimensions.width}
          height={imageDimensions.height}
          minScratchPercentage={85}
          className="scratch-card-wrapper"
          onComplete={handleComplete}
          gradientColors={["#403028"]}
          maskImage={currentCharacter}>
          {currentCharacter && (
            <img
              src={currentCharacter}
              alt="Pomocha Character"
              className="scratch-card-character"
              width={imageDimensions.width}
              height={imageDimensions.height}
            />
          )}
        </ScratchToReveal>
      </section>

      {/* Section Fonctionnalités - Toutes les features de Pomocha */}
      <section id="features" aria-label="Fonctionnalités Pomocha">
        <MiniFeatureSection
          features={MINI_FEATURES_CONFIG}
          layouts={['vertical', 'left', 'right', 'vertical']}
        />
      </section>

      {/* Section Call-to-Action */}
      <section id="cta" aria-label="Commencer avec Pomocha">
        <CTASection />
      </section>

      <Footer />
    </div>
  );
}
