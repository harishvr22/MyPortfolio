// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Navigation Toggle
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('navMenu');
  const navClose = document.getElementById('nav-close');
  const navImage = document.querySelector('.nav-image-wrapper');

  // Navigation Links
  const navLinks = document.querySelectorAll('.nav-left ul li .hover-underline');

  // Toggle navigation menu
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  // Close navigation menu
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
  });

  // Handle navigation clicks
  navLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      // Close navigation menu first
      navMenu.classList.remove('active');
      document.body.style.overflow = 'auto';

      // Handle different navigation options
      switch(index) {
        case 0: // Home
          // Stay on current page or scroll to top
          window.scrollTo({ top: 0, behavior: 'smooth' });
          break;
        case 1: // Technical Stack
          // Scroll to tech-stack section on same page
          const techSection = document.getElementById('tech-stack');
          if (techSection) {
            techSection.scrollIntoView({ behavior: 'smooth' });
          }
          break;
        case 2: // Projects
          // For now, scroll to a projects section if it exists
          const projectsSection = document.getElementById('projects');
          if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: 'smooth' });
          }
          break;
        case 3: // Achievements
          // For now, scroll to achievements section if it exists
          const achievementsSection = document.getElementById('achievements') || document.getElementById('achievement');
          if (achievementsSection) {
            achievementsSection.scrollIntoView({ behavior: 'smooth' });
          }
          break;
        case 4: // Contact
          // For now, scroll to contact section if it exists
          const contactSection = document.getElementById('contact');
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
          }
          break;
      }
    });
  });

  // Image frame effect
  if (navImage) {
    // Create frame elements
    const frameTop = document.createElement('div');
    const frameRight = document.createElement('div');
    const frameBottom = document.createElement('div');
    const frameLeft = document.createElement('div');

    // Add frame classes
    frameTop.className = 'frame-edge frame-top';
    frameRight.className = 'frame-edge frame-right';
    frameBottom.className = 'frame-edge frame-bottom';
    frameLeft.className = 'frame-edge frame-left';

    // Append frame elements
    navImage.prepend(frameTop, frameRight, frameBottom, frameLeft);

    // Add hover effect
    navImage.addEventListener('mouseenter', () => {
      navImage.classList.add('frame-hover');
    });

    navImage.addEventListener('mouseleave', () => {
      navImage.classList.remove('frame-hover');
    });
  }
});
