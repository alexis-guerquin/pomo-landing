import { m, LazyMotion, domAnimation } from "framer-motion";
import { PhoneScreenshot } from '../DevicePair/DevicePair';
import { useNavigate } from 'react-router-dom';
import { MacScreenshot } from '../MacScreenshot/MacScreenshot';
import ThreeDButton from "../ui/3DButton/3dbutton";
import { MobileStoreLinks } from "../MobileStoreLinks/MobileStoreLinks";
import { useI18n } from "../../contexts/I18nContext";
import "./HeroSection.css";

const HeroSection = () => {
  const { t, locale } = useI18n();
  const navigate = useNavigate();
  return (
    <LazyMotion features={domAnimation} strict>
      <section className="hero-section" id="hero">
        <div className="hero-container">
          {/* Contenu texte à gauche */}
          <div className="hero-content">
            <m.div
              className="hero-text"
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="hero-tagline">
                {t.components.hero.tagline}
              </p>
              <h1 className="hero-title">
                {t.components.hero.title.split('\n').map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < t.components.hero.title.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </h1>
              <p className="hero-description">{t.components.hero.description}</p>
              <div className="hero-cta">
                <ThreeDButton
                  text={locale === 'fr' ? 'Découvrir Pocha sur Mac' : 'Explore Pocha for Mac'}
                  variant="rectangle"
                  color="primary"
                  theme="light"
                  type="button"
                  onClick={() => {
                    navigate('/app#mac');
                  }}
                />
                <p className="available-on">{t.components.hero.availableOn}</p>
                <MobileStoreLinks />
              </div>
            </m.div>{" "}
          </div>

          {/* Section visuelle à droite */}
          <div className="hero-visual">
            {/* Mockups en dessous */}
            <div className="hero-mockups">
              {/* Mockup MacBook */}
              <m.div
                className="mockup-laptop"
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <MacScreenshot scene="macbook-focus" className="hero-mac-image" priority paired={false} />
              </m.div>

              {/* Mockup Smartphone */}
              <m.div
                className="mockup-phone"
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <PhoneScreenshot scene="focus" priority />
              </m.div>
            </div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
};

export default HeroSection;
