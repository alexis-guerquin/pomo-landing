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

  const linkCategories = useMemo<Array<{ title: string; links: Array<{ title: string; href: string; isRoute: boolean; icon?: string }> }>>(() => [
    {
      title: t.components.footer.categories.discover,
      links: [
        {
          title: t.components.footer.links.concept,
          href: '/concept',
          isRoute: true,
        },
        {
          title: t.components.footer.links.app,
          href: '/app',
          isRoute: true,
        },
        {
          title: t.components.footer.links.extension,
          href: '/extension',
          isRoute: true,
        },
      ],
    },
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
        {
          title: t.components.footer.links.legal,
          href: '/legal',
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
                    className={`footer-link${link.icon ? ' footer-link--highlight' : ''}`}>
                    {link.icon === 'puzzle' && (
                      <svg className="footer-link__icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15.5 2H18a2 2 0 0 1 2 2v2.4a1 1 0 0 1-.68.95 1.6 1.6 0 1 0 0 3.1A1 1 0 0 1 20 11.4V14a2 2 0 0 1-2 2h-2.4a1 1 0 0 1-.95-.68 1.6 1.6 0 1 0-3.1 0 1 1 0 0 1-.95.68H8a2 2 0 0 1-2-2v-2.4a1 1 0 0 0-.68-.95 1.6 1.6 0 1 1 0-3.1A1 1 0 0 0 6 6.4V4a2 2 0 0 1 2-2h2.4a1 1 0 0 0 .95-.68 1.6 1.6 0 1 1 3.1 0A1 1 0 0 0 15.5 2z"/>
                      </svg>
                    )}
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
            href="https://www.linkedin.com/in/alexis-guerquin/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="footer-social-link">
            <svg
              className="footer-social-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a
            href="https://github.com/alexis-guerquin"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="footer-social-link">
            <svg
              className="footer-social-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
          </a>
          <a
            href="https://www.producthunt.com/products/pomocha"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Product Hunt"
            className="footer-social-link">
            <svg
              className="footer-social-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M13.604 8.4h-3.405V12h3.405a1.8 1.8 0 0 0 1.8-1.8 1.8 1.8 0 0 0-1.8-1.8zM12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm1.604 14.4h-3.405V18H7.801V6h5.804a4.2 4.2 0 0 1 4.199 4.2 4.2 4.2 0 0 1-4.2 4.2z"/>
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

