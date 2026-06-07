import { useEffect, useRef, useState } from 'react';

const achievementsData = [
  {
    type: 'HACKATHON',
    title: 'Code O’Clock – 24-Hour National Hackathon',
    organization: 'Coimbatore Institute of Technology (CIT) & StartupTN',
    desc: 'Participated as part of Team TECHQEE in the 24-Hour National Level Hackathon conducted at CIT in association with StartupTN.',
    year: '2026',
    badge: 'National Level'
  },
  {
    type: 'HACKATHON',
    title: 'HackHub 25',
    organization: 'IEEE Computer Society, VIT Chennai',
    desc: 'Participated in the HackHub 25 hackathon conducted by the IEEE Computer Society at VIT Chennai, building rapid prototypes and collaborating on technical solutions.',
    year: '2025',
    badge: 'IEEE Event'
  },
  {
    type: 'RESEARCH PUBLICATION',
    title: 'AI-Assisted Smart Study Helper (AIFPM System)',
    organization: 'Published Research Paper',
    desc: 'Developed and published an AI-based system designed for tracking student study focus, detecting distraction levels, and delivering personalized productivity insights.',
    year: '2025',
    badge: 'Paper Published'
  },
  {
    type: 'COMPETITIVE PROGRAMMING',
    title: 'Global Rank 5,071 on Codolio',
    organization: 'Codolio Platform',
    desc: 'Secured a global rank of 5,071 on the Codolio programming platform, demonstrating strong competitive coding speed, algorithmic optimization, and analytical problem-solving skills.',
    year: '2024',
    badge: 'Top Rank'
  }
];

export default function Achievements() {
  const [visibleItems, setVisibleItems] = useState({});
  const itemRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.getAttribute('data-index');
            setVisibleItems((prev) => ({ ...prev, [index]: true }));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="achievements-section" id="achievements">
      <div className="content-container">
        <div className="section-header-block">
          <span className="section-subtitle">MILESTONES & HONORS</span>
          <h2 className="section-heading">Key Achievements</h2>
        </div>

        <div className="achievements-timeline">
          {achievementsData.map((item, index) => (
            <article
              key={index}
              ref={(el) => (itemRefs.current[index] = el)}
              data-index={index}
              className={`achievement-item reveal-item ${visibleItems[index] ? 'visible' : ''}`}
            >
              <div className="achievement-left">
                <span className="achievement-year">{item.year}</span>
                <span className="achievement-type">{item.type}</span>
              </div>
              
              <div className="achievement-center">
                <div className="timeline-node"></div>
                <div className="timeline-line"></div>
              </div>
              
              <div className="achievement-right">
                <div className="achievement-header-group">
                  <span className="achievement-badge">{item.badge}</span>
                  <h3>{item.title}</h3>
                  <h4 className="achievement-org">{item.organization}</h4>
                </div>
                <p className="achievement-desc">{item.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
