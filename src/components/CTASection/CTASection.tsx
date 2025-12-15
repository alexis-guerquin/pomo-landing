import React from 'react';
import ThreeDButton from '../ui/3DButton/3dbutton';
import './CTASection.css';

const CTASection: React.FC = () => {
  const handleCTAClick = () => {
    // Action à définir (ex: redirection vers page de téléchargement)
    console.log('CTA clicked!');
  };

  return (
    <section className="cta-section">
      <div className="cta-content">
        <div className="cta-text">
          <h2 className="cta-title">Alors, t'attends quoi pour te lancer ?</h2>
          <p className="cta-subtitle">Pomocha t'attend!</p>
          <ThreeDButton
            text="C'est parti !"
            onClick={handleCTAClick}
            variant="rectangle"
            color="secondary"
            theme="dark"
          />
        </div>
        <div className="cta-image">
          <img src="/icons/target.svg" alt="Target" />
        </div>
      </div>
    </section>
  );
};

export default CTASection;

