import React from 'react';
import ThreeDButton from '../ui/3DButton/3dbutton';
import { useI18n } from '../../contexts/I18nContext';
import './CTASection.css';

const CTASection: React.FC = () => {
  const { t } = useI18n();
  const handleCTAClick = () => {
    window.open('https://www.pomocha.io/', '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="cta-section">
      <div className="cta-content">
        <div className="cta-text">
          <h2 className="cta-title">{t.components.cta.title}</h2>
          <p className="cta-subtitle">{t.components.cta.subtitle}</p>
          <ThreeDButton
            text={t.components.cta.button}
            onClick={handleCTAClick}
            variant="rectangle"
            color="secondary"
            theme="dark"
          />
        </div>
        <div className="cta-image">
          <img src="/icons/target.svg" alt="Target" width="200" height="200" />
        </div>
      </div>
    </section>
  );
};

export default CTASection;

