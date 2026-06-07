import { useEffect, useRef, useState } from 'react';
import GithubHeatmap from './GithubHeatmap';

const statsData = [
  {
    value: '600+',
    label: 'LeetCode Problems Solved',
    platformId: '@711523bam022',
    detail: 'Maintained a 1400+ rating, focusing on dynamic programming algorithms, greedy methods, tree/graph structures, and space-time complexity optimization.',
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" stroke-width="1.3" fill="none">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
      </svg>
    ),
    iconBack: (
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="1.5" fill="none">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
      </svg>
    )
  },
  {
    value: '1200+',
    label: 'CodeChef Peak Rating',
    platformId: '@kit23bam022',
    detail: 'Regular participant in timed monthly matches and competitive logic challenges. Focused on rapid problem breakdown and structured debugging under constraints.',
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" stroke-width="1.3" fill="none">
        <circle cx="12" cy="8" r="7"></circle>
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
      </svg>
    ),
    iconBack: (
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="1.5" fill="none">
        <circle cx="12" cy="8" r="7"></circle>
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
      </svg>
    )
  },
  {
    value: '500+',
    label: 'GFG Practice Solves',
    platformId: '@harishvt20t',
    detail: 'Implemented standard mathematical computations, matrix search routines, custom list definitions, and sorting routines in core languages.',
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" stroke-width="1.3" fill="none">
        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
        <polyline points="2 17 12 22 22 17"></polyline>
        <polyline points="2 12 12 17 22 12"></polyline>
      </svg>
    ),
    iconBack: (
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="1.5" fill="none">
        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
        <polyline points="2 17 12 22 22 17"></polyline>
        <polyline points="2 12 12 17 22 12"></polyline>
      </svg>
    )
  },
  {
    value: 'AIML',
    label: 'KIT CSE Specialization',
    platformId: 'KIT CBE',
    detail: 'Deep engagement in foundational engineering courses, neural networks, machine learning theory, stats, and database architectures.',
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" stroke-width="1.3" fill="none">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
        <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
      </svg>
    ),
    iconBack: (
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="1.5" fill="none">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
        <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
      </svg>
    )
  }
];

export default function Stats() {
  const [flippedCards, setFlippedCards] = useState({});
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

  const handleCardClick = (index) => {
    if (window.matchMedia('(hover: none)').matches || window.innerWidth <= 768) {
      setFlippedCards((prev) => ({ ...prev, [index]: !prev[index] }));
    }
  };

  const handleCardKeyDown = (e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setFlippedCards((prev) => ({ ...prev, [index]: !prev[index] }));
    }
  };

  return (
    <section className="stats-section" id="coding-platforms">
      <div className="content-container">
        <div className="section-header-block">
          <span className="section-subtitle">COMPETITIVE PERFORMANCE</span>
          <h2 className="section-heading">Developer Stats</h2>
        </div>

        <div className="stats-grid">
          {statsData.map((stat, index) => (
            <div 
              key={index}
              ref={(el) => (itemRefs.current[index] = el)}
              data-index={index}
              className={`perspective-container reveal-item ${visibleItems[index] ? 'visible' : ''}`}
            >
              <div 
                className={`card-inner ${flippedCards[index] ? 'flipped' : ''}`}
                tabIndex="0"
                onClick={() => handleCardClick(index)}
                onKeyDown={(e) => handleCardKeyDown(e, index)}
              >
                <div className="card-front">
                  <div className="card-icon">{stat.icon}</div>
                  <div className="kpi-main">
                    <span className="kpi-value">{stat.value}</span>
                    <p className="kpi-label">{stat.label}</p>
                  </div>
                  <div className="flip-hint">{stat.platformId}</div>
                </div>
                <div className="card-back">
                  <div className="card-icon-back">{stat.iconBack}</div>
                  <p className="kpi-detail">{stat.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Horizontals / Secondary Info row */}
        <div 
          ref={(el) => (itemRefs.current[4] = el)}
          data-index={4}
          className={`horizontal-stats-card reveal-item ${visibleItems[4] ? 'visible' : ''}`}
        >
          <div className="horizontal-stat-row">
            <div className="stat-meta">
              <h3>HackerRank Milestones</h3>
              <p>Five-star programmer in Java, C++, and Python. Earned badges for problem solving milestones.</p>
            </div>
            <div className="stat-progress-bar">
              <span className="progress-info">Problem Solving Cert</span>
              <div className="progress-track">
                <div className="progress-fill fill-1"></div>
              </div>
            </div>
          </div>

          <div className="horizontal-stat-row github-row">
            <div className="stat-meta">
              <h3>GitHub Contribution Frequency</h3>
              <p>Continuous commits housing deep learning prototypes, esp32 firmware source repositories, and local dashboards.</p>
            </div>
            <div className="github-heatmap-wrapper">
              <GithubHeatmap username="harishvr22" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
