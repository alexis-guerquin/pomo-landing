import { m, LazyMotion, domAnimation } from "framer-motion";
import ThreeDButton from "../ui/3DButton/3dbutton";
import { MobileStoreLinks } from "../MobileStoreLinks/MobileStoreLinks";
import { useI18n } from "../../contexts/I18nContext";
import "./HeroSection.css";

const HeroSection = () => {
  const { t } = useI18n();
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
                  text={t.components.hero.cta}
                  variant="rectangle"
                  color="primary"
                  theme="light"
                  type="button"
                  onClick={() => {
                    window.location.href = 'https://www.pomocha.io/';
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
                <div className="laptop-frame">
                  <div className="laptop-screen">
                    <div className="laptop-content">
                    <img
                      src="/assets/Home-desktop.png"
                      alt="Application Pomocha - Vue desktop"
                      className="laptop-image"
                      fetchPriority="high"
                      loading="eager"
                      width="665"
                      height="316"
                      sizes="(max-width: 1024px) 450px, 665px"
                      srcSet="/assets/Home-desktop.png 665w, /assets/Home-desktop.png 450w"
                    />
                    </div>
                  </div>
                  <div className="laptop-base"></div>
                </div>
              </m.div>

              {/* Mockup Smartphone */}
              <m.div
                className="mockup-phone"
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="phone-div">
                  <div className="phone-frame">
                    <div className="phone-screen">
                      <img
                        src="/assets/pocha/mascot-reveal.webp"
                        alt="Capture réelle de Pocha sur Android : découverte du compagnon de concentration"
                        className="phone-image"
                        fetchPriority="high"
                        loading="eager"
                        width="540"
                        height="1200"
                      />
                    </div>
                  </div>
                </div>
              </m.div>
            </div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
};

export default HeroSection;
