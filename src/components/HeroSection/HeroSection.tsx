import { m, LazyMotion, domAnimation } from "framer-motion";
import ThreeDButton from "../ui/3DButton/3dbutton";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <LazyMotion features={domAnimation} strict>
      <section className="hero-section" id="hero">
        <div className="hero-container">
          {/* Contenu texte à gauche */}
          <div className="hero-content">
            <m.div
              className="hero-text"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="hero-tagline">
                Pour les personnes qui travaillent dur mais qui se sentent
                coincées.
              </p>
              <h6 className="hero-title">
                l'application qui vous poussera vers
                <br /> vos objectifs
              </h6>
              <h5 className="hero-description">Gamifie ton temps de travail</h5>
              <div className="hero-cta">
                <ThreeDButton
                  text="Tester Pomocha"
                  variant="rectangle"
                  color="primary"
                  theme="light"
                  type="button"
                  onClick={() => {
                    window.location.href = 'https://www.pomocha.io/';
                  }}
                />
                <p className="available-on">Available on: Browser</p>
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
                initial={{ opacity: 0, y: 50 }}
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
                      width="1920"
                      height="1080"
                    />
                    </div>
                  </div>
                  <div className="laptop-base"></div>
                </div>
              </m.div>

              {/* Mockup Smartphone */}
              <m.div
                className="mockup-phone"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="phone-div">
                  <img
                    src="/character/meditation.svg"
                    alt="Personnage méditation"
                    className="character-svg"
                    loading="lazy"
                    width="200"
                    height="200"
                  />
                  <div className="phone-frame">
                    <div className="phone-screen">
                      <img
                        src="/assets/Home-mobile.png"
                        alt="Application Pomocha - Vue mobile"
                        className="phone-image"
                        loading="lazy"
                        width="390"
                        height="844"
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
