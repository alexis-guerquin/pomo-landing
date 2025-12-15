import { useEffect, useState } from 'react';
import ThreeDButton from '../ui/3DButton/3dbutton';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo à gauche */}
        <div className="navbar-logo" onClick={() => scrollToSection('hero')}>
          <img src="/character/default.svg" alt="Pomocha Logo" />
        </div>

        {/* Liens de navigation à droite */}
        <div className="navbar-links">
          <button 
            className="navbar-link" 
            onClick={() => scrollToSection('hero')}
          >
            Accueil
          </button>
          <button 
            className="navbar-link" 
            onClick={() => scrollToSection('features')}
          >
            Fonctionnalités
          </button>
          <ThreeDButton 
            text="Tester Pomocha"
            variant="rectangle"
            color="primary"
            theme="light"
            type="button"
            onClick={() => scrollToSection('hero')}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
