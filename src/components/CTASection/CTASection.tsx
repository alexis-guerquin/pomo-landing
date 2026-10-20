import { PhoneScreenshot } from '../DevicePair/DevicePair';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ThreeDButton from '../ui/3DButton/3dbutton';
import { useI18n } from '../../contexts/I18nContext';
import { MobileStoreLinks } from '../MobileStoreLinks/MobileStoreLinks';
import './CTASection.css';

const CTASection: React.FC = () => {
  const { t, locale } = useI18n();
  const navigate = useNavigate();
  const handleCTAClick = () => {
    navigate('/app');
  };

  return (
    <section className="cta-section">
      <div className="cta-content">
        <div className="cta-text">
          <h2 className="cta-title">{t.components.cta.title}</h2>
          <p className="cta-subtitle">{t.components.cta.subtitle}</p>
          <ThreeDButton
            text={locale === 'fr' ? 'Choisir ma version de Pocha' : 'Find my version of Pocha'}
            onClick={handleCTAClick}
            variant="rectangle"
            color="secondary"
            theme="dark"
          />
          <MobileStoreLinks compact />
        </div>
        <div className="cta-image">
          <PhoneScreenshot scene="focus" />
        </div>
      </div>
    </section>
  );
};

export default CTASection;
