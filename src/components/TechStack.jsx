import { useEffect, useRef, useState } from 'react';

const techData = [
  {
    id: 'ai',
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
    ],
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="2.5" />
        <circle cx="5" cy="12" r="2.5" />
        <circle cx="19" cy="12" r="2.5" />
        <circle cx="12" cy="19" r="2.5" />
        <line x1="12" y1="7.5" x2="12" y2="16.5" />
        <line x1="6.77" y1="13.77" x2="10.23" y2="17.23" />
        <line x1="13.77" y1="6.77" x2="17.23" y2="10.23" />
        <line x1="6.77" y1="10.23" x2="10.23" y2="6.77" />
        <line x1="13.77" y1="17.23" x2="17.23" y2="13.77" />
        <line x1="7.5" y1="12" x2="16.5" y2="12" />
      </svg>
    ),
    logs: [
      { label: 'Focus Area', value: 'Deep Neural Networks & Machine Learning' },
      { label: 'Capabilities', value: 'Image Classification, NLP Video Summarizer, Model Optimization' },
      { label: 'Primary Toolkits', value: 'Python, PyTorch, TensorFlow, Scikit-learn' },
      { label: 'Key Project', value: 'ResNet18 classifier isolating AI vs Real generative photographs' },
      { label: 'Status', value: 'Active Research & Development' }
    ]
  },
  {
    id: 'iot',
    num: '02',
    category: 'Hardware & IoT Integration',
    tags: [
      { name: 'ESP32', core: true },
      { name: 'ESP8266', core: true },
      { name: 'Water Sensors', core: false },
      { name: 'Actuators', core: false },
      { name: 'Offline Speech APIs', core: false }
    ],
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <line x1="9" y1="1" x2="9" y2="4" />
        <line x1="15" y1="1" x2="15" y2="4" />
        <line x1="9" y1="20" x2="9" y2="23" />
        <line x1="15" y1="20" x2="15" y2="23" />
        <line x1="20" y1="9" x2="23" y2="9" />
        <line x1="20" y1="15" x2="23" y2="15" />
        <line x1="1" y1="9" x2="4" y2="9" />
        <line x1="1" y1="15" x2="4" y2="15" />
      </svg>
    ),
    logs: [
      { label: 'Focus Area', value: 'Embedded Systems & Hardware Interfacing' },
      { label: 'Capabilities', value: 'Microcontroller Programming, Sensor Arrays, Local Voice Control' },
      { label: 'Core Hardware', value: 'ESP32, ESP8266, Solenoid Valves, Moisture & Flow Sensors' },
      { label: 'Key Project', value: 'Offline voice water control valve system running Vosk local API' },
      { label: 'Status', value: 'Hardware Prototyping Complete' }
    ]
  },
  {
    id: 'frontend',
    num: '03',
    category: 'Frontend & Architectures',
    tags: [
      { name: 'JavaScript', core: true },
      { name: 'React.js', core: true },
      { name: 'HTML5 / CSS3', core: false },
      { name: 'Grid & Flexbox', core: false },
      { name: 'Bootstrap', core: false }
    ],
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="2" y1="8" x2="22" y2="8" />
        <line x1="6" y1="21" x2="18" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
        <circle cx="5" cy="5.5" r="0.75" />
        <circle cx="8" cy="5.5" r="0.75" />
        <circle cx="11" cy="5.5" r="0.75" />
      </svg>
    ),
    logs: [
      { label: 'Focus Area', value: 'User Interfaces & Component Architectures' },
      { label: 'Capabilities', value: 'Responsive Layouts, Custom Stylesystems, Interactive UX' },
      { label: 'Core Web Tech', value: 'React.js, Modern JavaScript (ES6+), Semantic HTML5 & CSS3' },
      { label: 'Key Project', value: 'Luxury portfolio styling with custom interactive components' },
      { label: 'Status', value: 'Fully Implemented & Optimised' }
    ]
  },
  {
    id: 'tools',
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
    ],
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        <path d="M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6" />
      </svg>
    ),
    logs: [
      { label: 'Focus Area', value: 'Data Warehousing, APIs & Git Collaboration' },
      { label: 'Capabilities', value: 'BI Dashboards, Database Schemas, Version Control Pipelines' },
      { label: 'Data & Server', value: 'Power BI, SQL (PostgreSQL), MongoDB, Node.js, Express' },
      { label: 'Key Project', value: 'Service booking & management platform with revenue tracking dashboards' },
      { label: 'Status', value: 'Database & Git Sync Verified' }
    ]
  }
];

const defaultConsoleLogs = [
  { label: 'Core Focus', value: 'Artificial Intelligence, Web Architectures & IoT Systems' },
  { label: 'Education', value: 'Computer Science & Engineering Student (AI & ML Specialization)' },
  { label: 'Key Projects', value: 'Machine Learning Models, Smart Hardware Prototypes, Web Dashboards' },
  { label: 'Diagnostic', value: 'All systems operational. Diagnostics link established.' },
  { label: 'Interaction', value: 'Hover over any competency module card to view specialized logs...' }
];

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [consoleLogs, setConsoleLogs] = useState(defaultConsoleLogs);
  const [visibleCards, setVisibleCards] = useState({});
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.getAttribute('data-index');
            setVisibleCards((prev) => ({ ...prev, [index]: true }));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const handleHoverStart = (category) => {
    setActiveCategory(category.id);
    setConsoleLogs(category.logs);
  };

  const handleHoverEnd = () => {
    setActiveCategory(null);
    setConsoleLogs(defaultConsoleLogs);
  };

  return (
    <section className="tech-section" id="tech-stack">
      <div className="content-container">
        <div className="section-header-block">
          <span className="section-subtitle">CORE COMPETENCIES</span>
          <h2 className="section-heading">Technical Stack</h2>
        </div>

        <div className="circuit-dashboard">
          {/* SVG Connection Traces behind components */}
          <svg className="circuit-svg-layer" viewBox="0 0 1000 650" preserveAspectRatio="none">
            {/* Top-Left Trace (AI) */}
            <path
              d="M 220 180 L 400 180 L 450 240 L 450 300"
              className={`circuit-trace tl-trace ${activeCategory === 'ai' ? 'active' : ''}`}
            />
            {/* Top-Right Trace (IoT) */}
            <path
              d="M 780 180 L 600 180 L 550 240 L 550 300"
              className={`circuit-trace tr-trace ${activeCategory === 'iot' ? 'active' : ''}`}
            />
            {/* Bottom-Left Trace (Frontend) */}
            <path
              d="M 220 470 L 400 470 L 450 410 L 450 350"
              className={`circuit-trace bl-trace ${activeCategory === 'frontend' ? 'active' : ''}`}
            />
            {/* Bottom-Right Trace (Tools) */}
            <path
              d="M 780 470 L 600 470 L 550 410 L 550 350"
              className={`circuit-trace br-trace ${activeCategory === 'tools' ? 'active' : ''}`}
            />
          </svg>

          <div className="circuit-layout-grid">
            {/* Top Left Card: AI & ML */}
            <div
              ref={(el) => (cardRefs.current[0] = el)}
              data-index="0"
              className={`tech-circuit-card reveal-item ${visibleCards[0] ? 'visible' : ''} ${activeCategory === 'ai' ? 'hovered' : ''}`}
              onMouseEnter={() => handleHoverStart(techData[0])}
              onMouseLeave={handleHoverEnd}
            >
              <div className="card-screw top-left"></div>
              <div className="card-screw top-right"></div>
              <div className="card-screw bottom-left"></div>
              <div className="card-screw bottom-right"></div>
              
              <div className="circuit-card-header">
                <div className="circuit-card-icon">{techData[0].icon}</div>
                <div className="circuit-title-group">
                  <span className="circuit-card-num">{techData[0].num}</span>
                  <h3>{techData[0].category}</h3>
                </div>
              </div>
              <div className="circuit-card-tags">
                {techData[0].tags.map((tag, i) => (
                  <span key={i} className={`circuit-tag ${tag.core ? 'core' : ''}`}>{tag.name}</span>
                ))}
              </div>
            </div>

            {/* Top Right Card: Hardware & IoT */}
            <div
              ref={(el) => (cardRefs.current[1] = el)}
              data-index="1"
              className={`tech-circuit-card reveal-item ${visibleCards[1] ? 'visible' : ''} ${activeCategory === 'iot' ? 'hovered' : ''}`}
              onMouseEnter={() => handleHoverStart(techData[1])}
              onMouseLeave={handleHoverEnd}
            >
              <div className="card-screw top-left"></div>
              <div className="card-screw top-right"></div>
              <div className="card-screw bottom-left"></div>
              <div className="card-screw bottom-right"></div>

              <div className="circuit-card-header">
                <div className="circuit-card-icon">{techData[1].icon}</div>
                <div className="circuit-title-group">
                  <span className="circuit-card-num">{techData[1].num}</span>
                  <h3>{techData[1].category}</h3>
                </div>
              </div>
              <div className="circuit-card-tags">
                {techData[1].tags.map((tag, i) => (
                  <span key={i} className={`circuit-tag ${tag.core ? 'core' : ''}`}>{tag.name}</span>
                ))}
              </div>
            </div>

            {/* Central System Core Console Display */}
            <div className="system-core-console">
              <div className="console-led-indicators">
                <div className={`led-dot red ${activeCategory ? 'pulsing' : ''}`}></div>
                <div className="led-dot yellow"></div>
                <div className="led-dot green active"></div>
              </div>
              
              <div className="console-screen">
                <div className="console-terminal-body">
                  <span className="console-heading">SYSTEM READOUT: COMPETENCY LOGS</span>
                  <div className="console-logs">
                    {consoleLogs.map((log, index) => (
                      <div key={index} className="console-line">
                        <span className="console-prompt">&gt;</span>
                        <span className="console-label">{log.label}:</span>
                        <span className="console-value">{log.value}</span>
                      </div>
                    ))}
                    <div className="console-line active-line">
                      <span className="console-prompt">&gt;</span> SYSTEM LINK NOMINAL<span className="console-cursor">_</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Left Card: Frontend */}
            <div
              ref={(el) => (cardRefs.current[2] = el)}
              data-index="2"
              className={`tech-circuit-card reveal-item ${visibleCards[2] ? 'visible' : ''} ${activeCategory === 'frontend' ? 'hovered' : ''}`}
              onMouseEnter={() => handleHoverStart(techData[2])}
              onMouseLeave={handleHoverEnd}
            >
              <div className="card-screw top-left"></div>
              <div className="card-screw top-right"></div>
              <div className="card-screw bottom-left"></div>
              <div className="card-screw bottom-right"></div>

              <div className="circuit-card-header">
                <div className="circuit-card-icon">{techData[2].icon}</div>
                <div className="circuit-title-group">
                  <span className="circuit-card-num">{techData[2].num}</span>
                  <h3>{techData[2].category}</h3>
                </div>
              </div>
              <div className="circuit-card-tags">
                {techData[2].tags.map((tag, i) => (
                  <span key={i} className={`circuit-tag ${tag.core ? 'core' : ''}`}>{tag.name}</span>
                ))}
              </div>
            </div>

            {/* Bottom Right Card: Tools & Databases */}
            <div
              ref={(el) => (cardRefs.current[3] = el)}
              data-index="3"
              className={`tech-circuit-card reveal-item ${visibleCards[3] ? 'visible' : ''} ${activeCategory === 'tools' ? 'hovered' : ''}`}
              onMouseEnter={() => handleHoverStart(techData[3])}
              onMouseLeave={handleHoverEnd}
            >
              <div className="card-screw top-left"></div>
              <div className="card-screw top-right"></div>
              <div className="card-screw bottom-left"></div>
              <div className="card-screw bottom-right"></div>

              <div className="circuit-card-header">
                <div className="circuit-card-icon">{techData[3].icon}</div>
                <div className="circuit-title-group">
                  <span className="circuit-card-num">{techData[3].num}</span>
                  <h3>{techData[3].category}</h3>
                </div>
              </div>
              <div className="circuit-card-tags">
                {techData[3].tags.map((tag, i) => (
                  <span key={i} className={`circuit-tag ${tag.core ? 'core' : ''}`}>{tag.name}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
