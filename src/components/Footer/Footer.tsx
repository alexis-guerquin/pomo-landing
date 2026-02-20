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
        {
          title: t.components.footer.links.blog,
          href: '/blog',
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
        </div>

        <span className="footer-copyright">
          © {new Date().getFullYear()} Pomocha. {t.components.footer.copyright}
        </span>
      </div>
    </footer>
  );
}

