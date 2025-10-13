// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Navigation Toggle
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('navMenu');
  const navClose = document.getElementById('nav-close');
  const navImage = document.querySelector('.nav-image-wrapper');

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
