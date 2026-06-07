import { useState, useEffect } from 'react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => {
      const next = !prev;
      if (next) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
      return next;
    });
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  };

  const handleNavLinkClick = (e, targetId) => {
    e.preventDefault();
    handleCloseMenu();

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerHeight = 64;
      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <header className={`lc-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="lc-header-inner">
          <div className="logo-wrapper">
            <a className="logo-text" href="#home" onClick={(e) => handleNavLinkClick(e, '#home')}>
              HARISH V R
            </a>
          </div>
          
          <nav className="desktop-nav">
            <a className="link-hover link-hover--slide" href="#home" onClick={(e) => handleNavLinkClick(e, '#home')}>Home</a>
            <a className="link-hover link-hover--slide" href="#about" onClick={(e) => handleNavLinkClick(e, '#about')}>About</a>
            <a className="link-hover link-hover--slide" href="#tech-stack" onClick={(e) => handleNavLinkClick(e, '#tech-stack')}>Technical Stack</a>
            <a className="link-hover link-hover--slide" href="#projects" onClick={(e) => handleNavLinkClick(e, '#projects')}>Projects</a>
            <a className="link-hover link-hover--slide" href="#coding-platforms" onClick={(e) => handleNavLinkClick(e, '#coding-platforms')}>Stats</a>
          </nav>
          
          <div className="header-actions">
            <a href="/assets/Harish V R resume.pdf" className="btn-premium-dark" download>
              <span>Download CV</span>
            </a>
            <button 
              className={`mobile-menu-toggle ${isMenuOpen ? 'active' : ''}`}
              aria-label="Toggle menu" 
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu" 
              onClick={handleToggleMenu}
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE OVERLAY NAVIGATION */}
      <div id="navMenu" className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
        <button className="close-icon" id="nav-close" aria-label="Close Navigation" onClick={handleCloseMenu}>
          <span></span>
          <span></span>
        </button>
        <div className="nav-left">
          <ul>
            <li><a href="#home" onClick={(e) => handleNavLinkClick(e, '#home')}>Home</a></li>
            <li><a href="#about" onClick={(e) => handleNavLinkClick(e, '#about')}>About</a></li>
            <li><a href="#tech-stack" onClick={(e) => handleNavLinkClick(e, '#tech-stack')}>Technical Stack</a></li>
            <li><a href="#projects" onClick={(e) => handleNavLinkClick(e, '#projects')}>Projects</a></li>
            <li><a href="#coding-platforms" onClick={(e) => handleNavLinkClick(e, '#coding-platforms')}>Stats</a></li>
            <li><a href="#contact" onClick={(e) => handleNavLinkClick(e, '#contact')}>Contact</a></li>
          </ul>
        </div>
      </div>
    </>
  );
}
