import { useSmoothScroll } from '../hooks/useSmoothScroll';
import HeroSection from '../components/HeroSection';
import { MiniFeatureSection } from '../components/MiniFeature';
import { ScratchToReveal } from '../components/ui/ScratchToReveal';
import { CTASection } from '../components/CTASection';
import { Footer } from '../components/Footer';
import Navbar from '../components/Navbar/Navbar';
import { LandingPageSEO } from '../components/SEO/LandingPageSEO';
import { useI18n } from '../contexts/I18nContext';
import { useEffect, useState, useMemo } from 'react';
import type { MiniFeatureData } from '../components/MiniFeature';

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
  const { t } = useI18n();
  useSmoothScroll();

  const miniFeaturesConfig = useMemo<MiniFeatureData[]>(() => [
    {
      id: 'mini-concept',
      title: t.miniFeatures.concept.title,
      description: t.miniFeatures.concept.description,
      visual: '/visuals/concept.png',
      visualAlt: t.miniFeatures.concept.visualAlt,
      features: t.miniFeatures.concept.items,
      cta: {
        text: t.miniFeatures.concept.cta,
        link: 'https://www.pomocha.io/'
      },
      moreInfoLink: '/features/pomodoro-timer'
    },
    {
      id: 'mini-rewards',
      title: t.miniFeatures.rewards.title,
      description: t.miniFeatures.rewards.description,
      visual: '/visuals/rec.png',
      visualAlt: t.miniFeatures.rewards.visualAlt,
      features: t.miniFeatures.rewards.items,
      cta: {
        text: t.miniFeatures.rewards.cta,
        link: 'https://www.pomocha.io/'
      },
      moreInfoLink: '/features/rewards-system'
    },
    {
      id: 'mini-stats',
      title: t.miniFeatures.statistics.title,
      description: t.miniFeatures.statistics.description,
      visual: '/visuals/stats.png',
      visualAlt: t.miniFeatures.statistics.visualAlt,
      features: t.miniFeatures.statistics.items,
      cta: {
        text: t.miniFeatures.statistics.cta,
        link: 'https://www.pomocha.io/'
      },
      moreInfoLink: '/features/statistics'
    },
    {
      id: 'mini-more',
      title: t.miniFeatures.more.title,
      description: t.miniFeatures.more.description,
      visual: '',
      visualAlt: '',
      features: t.miniFeatures.more.items,
      cta: {
        text: t.miniFeatures.more.cta,
        link: 'https://www.pomocha.io/'
      }
    }
  ], [t]);

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
          aria-label={t.components.landingPage.scrollToTop}>
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
          alt={t.components.landingPage.characterAlt}
          className="footer-character"
          width="200"
          height="200"
        />
      </div>

      <Navbar />
      
      {/* Section Hero - Point d'entrée principal */}
      <section id="home" aria-label={t.components.landingPage.ariaLabels.home}>
        <HeroSection />
      </section>

      {/* Section À propos - Découverte de Pomocha */}
      <section id="about" className="scratch-card-container" aria-label={t.components.landingPage.ariaLabels.about}>
        {showHint && (
          <div className="scratch-card-hint">
            <span>{t.components.landingPage.scratchHint}</span>
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
              alt={t.components.landingPage.characterAlt}
              className="scratch-card-character"
              width={imageDimensions.width}
              height={imageDimensions.height}
            />
          )}
        </ScratchToReveal>
      </section>

      {/* Section Fonctionnalités - Toutes les features de Pomocha */}
      <section id="features" aria-label={t.components.landingPage.ariaLabels.features}>
        <MiniFeatureSection
          features={miniFeaturesConfig}
          layouts={['vertical', 'left', 'right', 'vertical']}
        />
      </section>

      {/* Section Call-to-Action */}
      <section id="cta" aria-label={t.components.landingPage.ariaLabels.cta}>
        <CTASection />
      </section>

      <Footer />
    </div>
  );
}
