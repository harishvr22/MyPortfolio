import { useEffect, useRef, useState } from 'react';

export default function Hero() {
  const canvasRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  // Slideshow Logic
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 3);
    }, 3500);
    return () => clearInterval(slideInterval);
  }, []);

  // Canvas Constellation Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);
    let mouse = { x: null, y: null, radius: 140 };

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
      init();
    };

    const handlePointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handlePointerLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerleave', handlePointerLeave);

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 1.5 + 1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(28, 28, 30, 0.08)';
        ctx.fill();
      }

      update() {
        // Bounce off bounds
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse repulsion physics
        if (mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const distance = Math.hypot(dx, dy);
          
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            this.x += Math.cos(angle) * force * 2;
            this.y += Math.sin(angle) * force * 2;
          }
        }

        this.x += this.vx;
        this.y += this.vy;
      }
    }

    const init = () => {
      particles = [];
      const count = Math.min(60, Math.floor((width * height) / 18000));
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw grid lines
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.01)';
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Update and draw particles
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      // Draw connections
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < 120) {
            const alpha = ((120 - dist) / 120) * 0.06;
            ctx.strokeStyle = `rgba(28, 28, 30, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleCtaClick = (e, targetId) => {
    e.preventDefault();
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
    <section className="hero-section" id="home">
      <div className="hero-canvas-container">
        <canvas ref={canvasRef} id="hero-canvas"></canvas>
      </div>
      
      <div className="hero-overlay-content">
        <div className="hero-text-block">
          <div className="badge">
            <span className="badge-dot"></span>
            <span className="badge-text">Available for projects</span>
          </div>
          
          <h1 className="hero-main-title">
            Engineering Intelligence.<br/>
            Building the Future.
          </h1>
          
          <h2 className="sub-heading-scroller">
            <span className="type-text">CSE Student & AI/ML Explorer</span>
            <span className="cursor">|</span>
          </h2>
          
          <div className="cta-buttons">
            <a href="#projects" className="btn btn-primary" onClick={(e) => handleCtaClick(e, '#projects')}>Featured Works</a>
            <a href="#contact" className="btn btn-secondary" onClick={(e) => handleCtaClick(e, '#contact')}>Get In Touch</a>
          </div>
        </div>
      </div>
      
      {/* HERO CAROUSEL PREVIEW OVERLAY (Bottom Right) */}
      <div className="hero-carousel-overlay hidden sm:flex">
        <div className="carousel-track-wrapper">
          <div className="carousel-track">
            {/* Slide 1 */}
            <div className={`carousel-slide-item ${activeSlide === 0 ? 'active' : ''}`}>
              <div className="slide-num">01</div>
              <div className="slide-content">
                <h4>Service Booking Platform</h4>
                <p>Flask / PostgreSQL</p>
              </div>
            </div>
            {/* Slide 2 */}
            <div className={`carousel-slide-item ${activeSlide === 1 ? 'active' : ''}`}>
              <div className="slide-num">02</div>
              <div className="slide-content">
                <h4>AI Video Summarizer</h4>
                <p>NLP / Speech Recognition</p>
              </div>
            </div>
            {/* Slide 3 */}
            <div className={`carousel-slide-item ${activeSlide === 2 ? 'active' : ''}`}>
              <div className="slide-num">03</div>
              <div className="slide-content">
                <h4>AI Image Detector</h4>
                <p>ResNet18 / PyTorch</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
