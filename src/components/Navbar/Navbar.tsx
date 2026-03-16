import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ThreeDButton from '../ui/3DButton/3dbutton';
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher';
import { useI18n } from '../../contexts/I18nContext';
import './Navbar.css';

function HoveredLink({
  children,
  to,
}: {
  children: React.ReactNode;
  to: string;
}) {
  return (
    <Link to={to} className="nav-hovered-link">
      {children}
    </Link>
  );
}

const Navbar = () => {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Ferme le menu mobile à chaque changement de page
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      // Attendre que la page se rende avant de scroller
      setTimeout(() => scrollToSection(sectionId), 50);
      return;
    }
    scrollToSection(sectionId);
  };

  const goToPath = (path: string) => {
    if (location.pathname === path) return;
    navigate(path);
  };

  const navConfig = useMemo(() => {
    const mainLinks = [
      { label: t.components.navbar.concept, to: '/concept' },
      { label: t.components.navbar.app, to: '/app' },
      { label: t.components.navbar.extension, to: '/extension' },
      { label: t.components.navbar.contact, to: '/contact' },
      { label: t.components.navbar.legal, to: '/legal' },
    ] as const;

    const mobileItems = [
      { label: t.components.navbar.mobileItems.home, onClick: () => goToSection('hero') },
      ...mainLinks.map((l) => ({ label: l.label, onClick: () => goToPath(l.to) })),
      { label: t.components.navbar.blog, onClick: () => goToPath('/blog') },
    ];

    return { mainLinks, mobileItems };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, t]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo à gauche */}
        <div
          className="navbar-logo"
          role="button"
          tabIndex={0}
          onClick={() => goToSection('hero')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') goToSection('hero');
          }}
          aria-label={t.components.navbar.backToHome}
        >
          <img src="/character/default.svg" alt="Pomocha Logo" width="50" height="50" />
        </div>

        {/* Menu "pill" au centre */}
        <div className="navbar-menu">
          <nav className="nav-pill" aria-label="Navigation principale">
            <button className="nav-pill__link" type="button" onClick={() => goToSection('hero')}>
              {t.components.navbar.home}
            </button>

            {navConfig.mainLinks.map((l) => (
              <HoveredLink key={l.to} to={l.to}>
                {l.label}
              </HoveredLink>
            ))}

            <HoveredLink to="/blog">
              {t.components.navbar.blog}
            </HoveredLink>
          </nav>
        </div>

        {/* Actions à droite */}
        <div className="navbar-actions">
          <LanguageSwitcher />
          <ThreeDButton
            text={t.components.navbar.cta}
            variant="rectangle"
            color="primary"
            theme="light"
            type="button"
            onClick={() => {
              window.open('https://www.pomocha.io/', '_blank', 'noopener,noreferrer');
            }}
          />

          <button
            className="navbar-mobile-toggle"
            type="button"
            aria-label={mobileMenuOpen ? t.components.navbar.menuToggle.close : t.components.navbar.menuToggle.open}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((v) => !v)}
          >
            {t.components.navbar.menu}
          </button>
        </div>
      </div>

      <div className={`navbar-mobile ${mobileMenuOpen ? 'open' : ''}`} aria-hidden={!mobileMenuOpen}>
        {navConfig.mobileItems.map((it) => (
          <button
            key={it.label}
            className="navbar-mobile__item"
            type="button"
            onClick={() => {
              it.onClick();
              setMobileMenuOpen(false);
            }}
          >
            {it.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
