import { useState, useEffect } from 'react';
import { ScratchToReveal } from '../ui/ScratchToReveal';
import { useI18n } from '../../contexts/I18nContext';
import './CharacterReveal.css';

const CHARACTER_IMAGES = [
  '/character/topProject.svg',
  '/character/default.svg',
  '/character/recaps.svg',
  '/character/stretching.svg',
  '/character/meditation.svg',
  '/character/free.svg',
  '/character/drink.svg',
];

export const CharacterReveal = () => {
  const { t } = useI18n();
  const [currentImage, setCurrentImage] = useState<string>('');
  const [key, setKey] = useState(0);

  useEffect(() => {
    // Sélectionner une image aléatoire au chargement
    const randomImage = CHARACTER_IMAGES[Math.floor(Math.random() * CHARACTER_IMAGES.length)];
    setCurrentImage(randomImage);
  }, []);

  const handleComplete = () => {
    console.log('Révélation terminée !');
    // Après 2 secondes, changer l'image et réinitialiser le scratch
    setTimeout(() => {
      const randomImage = CHARACTER_IMAGES[Math.floor(Math.random() * CHARACTER_IMAGES.length)];
      setCurrentImage(randomImage);
      setKey(prev => prev + 1); // Force le re-render du composant ScratchToReveal
    }, 2000);
  };

  if (!currentImage) return null;

  return (
    <section className="character-reveal-section">
      <div className="character-reveal-container">
        <div className="character-reveal-content">
          <h2 className="character-reveal-title">
            {t.components.characterReveal.title}
          </h2>
          <p className="character-reveal-description">
            {t.components.characterReveal.description}
          </p>
          
          <div className="scratch-wrapper">
            <ScratchToReveal
              key={key}
              width={400}
              height={400}
              minScratchPercentage={40}
              onComplete={handleComplete}
              className="scratch-card"
              maskImage={currentImage}
            >
              <img 
                src={currentImage} 
                alt={t.components.landingPage.characterAlt} 
                className="scratch-card-character"
                width="400"
                height="400"
              />
            </ScratchToReveal>
          </div>

          <p className="character-reveal-hint">
            {t.components.characterReveal.hint}
          </p>
        </div>
      </div>
    </section>
  );
};

export default CharacterReveal;

