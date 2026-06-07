import { useEffect, useRef, useState } from 'react';

export default function About() {
  const paragraphRef = useRef(null);
  const bioRef = useRef(null);
  const portraitRef = useRef(null);
  
  const [wordsVisible, setWordsVisible] = useState([]);
  const [bioVisible, setBioVisible] = useState(false);
  const [portraitVisible, setPortraitVisible] = useState(false);

  const text = "We Turn Data Into Decisions. I design intelligent neural networks and program physical microcontrollers to create systems that act independently and connect seamlessly.";
  const words = text.split(/\s+/);

  useEffect(() => {
    const wordObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            words.forEach((_, index) => {
              setTimeout(() => {
                setWordsVisible((prev) => {
                  const next = [...prev];
                  next[index] = true;
                  return next;
                });
              }, index * 40);
            });
            wordObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -100px 0px' }
    );

    const genericObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === bioRef.current) setBioVisible(true);
            if (entry.target === portraitRef.current) setPortraitVisible(true);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (paragraphRef.current) wordObserver.observe(paragraphRef.current);
    if (bioRef.current) genericObserver.observe(bioRef.current);
    if (portraitRef.current) genericObserver.observe(portraitRef.current);

    return () => {
      wordObserver.disconnect();
      genericObserver.disconnect();
    };
  }, []);

  return (
    <section className="intro-section" id="about">
      <div className="section-grid">
        <div className="intro-visual-col">
          {/* Grayscale Gridded Portrait Frame */}
          <div ref={portraitRef} className={`portrait-wrapper reveal-item ${portraitVisible ? 'visible' : ''}`}>
            <div className="portrait-container">
              <img src="/assets/IMG-20240203-WA0001.jpg" alt="Harish V R" className="portrait-photo" />
            </div>
            <div className="portrait-grid-accent"></div>
          </div>
        </div>
        
        <div className="intro-text-col">
          <div className="reveal-word-wrapper">
            <p ref={paragraphRef} className="reveal-word-paragraph" id="reveal-text">
              {words.map((word, idx) => (
                <span 
                  key={idx} 
                  className={`reveal-word ${wordsVisible[idx] ? 'visible' : ''}`}
                >
                  {word}{' '}
                </span>
              ))}
            </p>
          </div>
          
          <div ref={bioRef} className={`bio-detail-paragraph reveal-item ${bioVisible ? 'visible' : ''}`}>
            <p>
              Currently pursuing Computer Science Engineering with a specialization in Artificial Intelligence and Machine Learning at <a href="https://kit.ac.in" target="_blank" rel="noopener noreferrer" className="text-link">KIT</a>. I focus on training convolutional backbones in PyTorch, developing offline-capable speech interfaces on ESP32 boards, and structuring metrics dashboards using Power BI.
            </p>
            <p className="location-stamp">
              Based in Coimbatore, Tamil Nadu, India — open to worldwide remote collaborations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
