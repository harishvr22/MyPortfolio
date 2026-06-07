import { useEffect } from 'react';

export default function SpotlightOverlay() {
  useEffect(() => {
    if (window.matchMedia('(hover: hover)').matches) {
      const docEl = document.documentElement;
      
      // Set initial off-screen coordinates
      docEl.style.setProperty('--mouse-x', '-999px');
      docEl.style.setProperty('--mouse-y', '-999px');

      const handlePointerMove = (e) => {
        requestAnimationFrame(() => {
          docEl.style.setProperty('--mouse-x', `${e.clientX}px`);
          docEl.style.setProperty('--mouse-y', `${e.clientY}px`);
        });
      };

      window.addEventListener('pointermove', handlePointerMove);
      return () => {
        window.removeEventListener('pointermove', handlePointerMove);
      };
    }
  }, []);

  return <div className="spotlight-overlay" />;
}
