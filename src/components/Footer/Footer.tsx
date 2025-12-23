import './Footer.css';
import { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useI18n } from '../../contexts/I18nContext';

export default function Footer() {
  const { t } = useI18n();
  const [showContact, setShowContact] = useState(false);
  const [copied, setCopied] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const linkCategories = useMemo(() => [
    {
      title: t.components.footer.categories.features,
      links: [
        {
          title: t.components.footer.links.pomodoroTimer,
          href: '/features/pomodoro-timer',
          isRoute: true,
        },
        {
          title: t.components.footer.links.rewardsSystem,
          href: '/features/rewards-system',
          isRoute: true,
        },
        {
          title: t.components.footer.links.statistics,
          href: '/features/statistics',
          isRoute: true,
        },
      ],
    },
    {
      title: t.components.footer.categories.useCases,
      links: [
        {
          title: t.components.footer.links.students,
          href: '/use-cases/students',
          isRoute: true,
        },
        {
          title: t.components.footer.links.freelancers,
          href: '/use-cases/freelancers',
          isRoute: true,
        },
      ],
    },
    {
      title: t.components.footer.categories.about,
      links: [
        {
          title: t.components.footer.links.about,
          href: '/about',
          isRoute: true,
        },
      ],
    },
  ], [t]);

  const handleContactClick = () => {
    setShowContact(!showContact);
  };

  const copyToClipboard = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    
    try {
      await navigator.clipboard.writeText('team@pomocha.fr');
      setCopied(true);
      
      // Réinitialiser après 2 secondes
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isRoute: boolean) => {
    e.preventDefault();
    
    if (isRoute) {
      // Navigation vers une route
      navigate(href);
    } else {
      // Navigation vers une ancre sur la page d'accueil
      const targetId = href.replace('#', '');

      const scrollNow = () => {
        const targetElement = document.getElementById(targetId);
        if (!targetElement) return;

        const offset = 80; // Offset pour la navbar
        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });

        targetElement.classList.add('scroll-highlight');
        setTimeout(() => {
          targetElement.classList.remove('scroll-highlight');
        }, 1500);
      };

      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(scrollNow, 50);
        return;
      }

      scrollNow();
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <span className="footer-logo-text">Pomocha</span>
    
        
        <div className="footer-links">
          {linkCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="footer-link-column">
              <h3 className="footer-column-title">{category.title}</h3>
              <div className="footer-column-links">
                {category.links.map((link, linkIndex) => (
                  <a
                    key={linkIndex}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href, link.isRoute)}
                    className="footer-link">
                    <span>{link.title}</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
          <div className="footer-link-column">
            <h3 className="footer-column-title">{t.components.footer.categories.contact}</h3>
            <div className="footer-column-links">
              <button
                onClick={handleContactClick}
                className="footer-link footer-link-button">
                <span>{t.components.footer.links.contact}</span>
              </button>
              {showContact && (
                <div className="footer-contact-email">
                  <a 
                    href="mailto:team@pomocha.fr"
                    onClick={copyToClipboard}
                    className="footer-email-link">
                    team@pomocha.fr
                  </a>
                  <button 
                    onClick={copyToClipboard}
                    className="footer-copy-button"
                    aria-label={t.components.footer.copyEmail}>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      {copied ? (
                        // Icône de check
                        <path d="M20 6L9 17l-5-5"/>
                      ) : (
                        // Icône de copie
                        <>
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                        </>
                      )}
                    </svg>
                  </button>
                  {copied && (
                    <div className="footer-copy-notification">
                      {t.components.footer.copied}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="footer-socials">
          <a
            href="https://x.com/Team_Pomocha"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X/Twitter"
            className="footer-social-link">
            <svg
              className="footer-social-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M10.488 14.651L15.25 21h7l-7.858-10.478L20.93 3h-2.65l-5.117 5.886L8.75 3h-7l7.51 10.015L2.32 21h2.65zM16.25 19L5.75 5h2l10.5 14z"></path>
            </svg>
          </a>
          <a
            href="https://www.reddit.com/r/pomocha/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Reddit"
            className="footer-social-link">
            <svg
              className="footer-social-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M14.238 15.348c.085.084.085.221 0 .306c-.465.462-1.194.687-2.231.687l-.008-.002l-.008.002c-1.036 0-1.766-.225-2.231-.688a.219.219 0 0 1 0-.305a.219.219 0 0 1 .306 0c.384.383 1.012.555 1.925.555l.008.002l.008-.002c.912 0 1.54-.172 1.925-.555a.219.219 0 0 1 .306 0m-3.44-2.418c0-.507-.414-.919-.922-.919c-.509 0-.923.412-.923.919c0 .506.414.918.923.918c.508.001.922-.411.922-.918m13.202-.93c0 6.627-5.373 12-12 12s-12-5.373-12-12s5.373-12 12-12s12 5.373 12 12m-5-.129c0-.851-.695-1.543-1.55-1.543c-.417 0-.795.167-1.074.435c-1.056-.695-2.485-1.137-4.066-1.194l.865-2.724l2.343.549l-.003.034c0 .696.569 1.262 1.268 1.262c.7 0 1.267-.566 1.267-1.262s-.567-1.262-1.267-1.262c-.537 0-.994.335-1.179.804l-2.525-.592a.22.22 0 0 0-.244.133l-.941 2.965c-1.621.061-3.079.51-4.148 1.218a1.55 1.55 0 0 0-1.078-.447c-.854 0-1.55.691-1.55 1.542c0 .634.375 1.177.919 1.421c-.016.129-.03.258-.03.388c0 2.084 2.425 3.766 5.41 3.766c2.987 0 5.410-1.682 5.410-3.766c0-.139-.014-.277-.037-.412c.546-.235.922-.779.922-1.417M13.305 8.787c0-.437.355-.79.792-.79s.792.353.792.79c0 .436-.355.789-.792.789s-.792-.353-.792-.789m-5.414 6.572c-.509 0-.922-.412-.922-.919c0-.506.414-.918.922-.918s.923.412.923.918c0 .507-.414.919-.923.919"></path>
            </svg>
          </a>
        </div>

        <span className="footer-copyright">
          © {new Date().getFullYear()} Pomocha. {t.components.footer.copyright}
        </span>
      </div>
    </footer>
  );
}

