import { useEffect, useRef, useState } from 'react';

const techData = [
  {
    num: '01',
    category: 'Artificial Intelligence & ML',
    tags: [
      { name: 'Python', core: true },
      { name: 'PyTorch', core: true },
      { name: 'TensorFlow', core: true },
      { name: 'Scikit-learn', core: false },
      { name: 'Deep Learning', core: false },
      { name: 'CNNs', core: false },
      { name: 'Pandas', core: false },
      { name: 'NumPy', core: false },
      { name: 'Matplotlib', core: false }
    ]
  },
  {
    num: '02',
    category: 'Hardware & IoT Integration',
    tags: [
      { name: 'ESP32', core: true },
      { name: 'ESP8266', core: true },
      { name: 'Water Sensors', core: false },
      { name: 'Actuators', core: false },
      { name: 'Offline Speech APIs', core: false }
    ]
  },
  {
    num: '03',
    category: 'Frontend & Architectures',
    tags: [
      { name: 'JavaScript', core: true },
      { name: 'React.js', core: true },
      { name: 'HTML5 / CSS3', core: false },
      { name: 'Grid & Flexbox', core: false },
      { name: 'Bootstrap', core: false }
    ]
  },
  {
    num: '04',
    category: 'BI, Tools & Databases',
    tags: [
      { name: 'Power BI', core: true },
      { name: 'GitHub', core: true },
      { name: 'VS Code', core: false },
      { name: 'Node.js', core: false },
      { name: 'Express.js', core: false },
      { name: 'MongoDB', core: false },
      { name: 'SQL', core: false }
    ]
  }
];

export default function TechStack() {
  const [visibleRows, setVisibleRows] = useState({});
  const rowRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.getAttribute('data-index');
            setVisibleRows((prev) => ({ ...prev, [index]: true }));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    rowRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="tech-section" id="tech-stack">
      <div className="content-container">
        <div className="section-header-block">
          <span className="section-subtitle">CORE COMPETENCIES</span>
          <h2 className="section-heading">Technical Stack</h2>
        </div>
        
        <div className="tech-stack-list">
          {techData.map((row, index) => (
            <div 
              key={index}
              ref={(el) => (rowRefs.current[index] = el)}
              data-index={index}
              className={`tech-item-row reveal-item ${visibleRows[index] ? 'visible' : ''}`}
            >
              <div className="tech-row-header">
                <span className="tech-num">{row.num}</span>
                <h3>{row.category}</h3>
              </div>
              <div className="tech-tags">
                {row.tags.map((tag, tagIndex) => (
                  <span 
                    key={tagIndex} 
                    className={`tech-tag ${tag.core ? 'core' : ''}`}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
