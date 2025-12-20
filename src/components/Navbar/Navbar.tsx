import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ThreeDButton from '../ui/3DButton/3dbutton';
import './Navbar.css';

const transition = {
  type: 'spring',
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
} as const;

function HoveredLink({
  children,
  to,
  onClick,
}: {
  children: React.ReactNode;
  to: string;
  onClick?: () => void;
}) {
  return (
    <Link to={to} onClick={onClick} className="nav-hovered-link">
      {children}
    </Link>
  );
}

function Menu({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) {
  return (
    <nav onMouseLeave={() => setActive(null)} className="nav-pill" aria-label="Navigation principale">
      {children}
    </nav>
  );
}

function MenuItem({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) {
  return (
    <div onMouseEnter={() => setActive(item)} className="nav-item">
      <motion.p transition={{ duration: 0.3 }} className="nav-item__label">
        {item}
      </motion.p>

      {active !== null && (
        <motion.div initial={{ opacity: 0, scale: 0.85, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={transition}>
          {active === item && (
            <div className="nav-dropdown">
              <motion.div transition={transition} layoutId="active" className="nav-dropdown__panel">
                <motion.div layout className="nav-dropdown__content">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
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
    setActive(null);
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
    const featureLinks = [
      { label: 'Minuteur Pomodoro', to: '/features/pomodoro-timer' },
      { label: 'Motivation & récompenses', to: '/features/rewards-system' },
      { label: 'Statistiques de focus', to: '/features/statistics' },
    ] as const;

    const useCaseLinks = [
      { label: 'Étudiants', to: '/use-cases/students' },
      { label: 'Freelances', to: '/use-cases/freelancers' },
    ] as const;

    const mobileItems = [
      { label: 'Accueil', onClick: () => goToSection('hero') },
      { label: 'Fonctionnalités (aperçu)', onClick: () => goToSection('features') },
      ...featureLinks.map((l) => ({ label: l.label, onClick: () => goToPath(l.to) })),
      ...useCaseLinks.map((l) => ({ label: l.label, onClick: () => goToPath(l.to) })),
      { label: 'À propos', onClick: () => goToPath('/about') },
    ];

    return { featureLinks, useCaseLinks, mobileItems };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

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
          aria-label="Retour à l'accueil"
        >
          <img src="/character/default.svg" alt="Pomocha Logo" />
        </div>

        {/* Menu "pill" au centre */}
        <div className="navbar-menu">
          <Menu setActive={setActive}>
            <button className="nav-pill__link" type="button" onMouseEnter={() => setActive('Accueil')} onClick={() => goToSection('hero')}>
              Accueil
            </button>

            <MenuItem setActive={(item) => setActive(item)} active={active} item="Fonctionnalités">
              <div className="nav-dropdown-grid">
                {navConfig.featureLinks.map((l) => (
                  <HoveredLink key={l.to} to={l.to} onClick={() => setActive(null)}>
                    {l.label}
                  </HoveredLink>
                ))}
              </div>
            </MenuItem>

            <MenuItem setActive={(item) => setActive(item)} active={active} item="Cas d’usage">
              <div className="nav-dropdown-grid">
                {navConfig.useCaseLinks.map((l) => (
                  <HoveredLink key={l.to} to={l.to} onClick={() => setActive(null)}>
                    {l.label}
                  </HoveredLink>
                ))}
              </div>
            </MenuItem>

            <HoveredLink to="/about" onClick={() => setActive(null)}>
              À propos
            </HoveredLink>
          </Menu>
        </div>

        {/* Actions à droite */}
        <div className="navbar-actions">
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

          <button
            className="navbar-mobile-toggle"
            type="button"
            aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((v) => !v)}
          >
            Menu
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
