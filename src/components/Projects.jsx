import { useEffect, useRef, useState } from 'react';

const projectsData = [
  {
    category: 'FULL-STACK WEB',
    year: '2026',
    title: 'Service-Based Booking & Management Platform',
    desc: 'Built a full-stack cloud-hosted platform enabling users to discover and book services with role-based dashboards for Residents, Service Providers, and Administrators. Implemented RESTful APIs using Flask, PostgreSQL database integration, real-time notifications, and revenue tracking modules. Deployed backend on Render and frontend on Vercel for scalable service management.',
    pills: ['Flask', 'PostgreSQL', 'JavaScript', 'REST APIs', 'Render', 'Vercel'],
    image: '/assets/service based.png'
  },
  {
    category: 'NLP & AI',
    year: '2025',
    title: 'AI Video Summarizer',
    desc: 'Developed an intelligent video summarization system that automates content understanding by extracting audio, converting speech-to-text, and applying NLP techniques to generate concise, meaningful summaries. Enables users to quickly grasp key information from lengthy videos through AI-powered content analysis and fast processing.',
    pills: ['Python', 'NLP', 'Speech Recognition', 'Machine Learning', 'Flask'],
    image: '/assets/ai video summarizer.png'
  },
  {
    category: 'DEEP LEARNING',
    year: '2024',
    title: 'AI vs Real Image Detector',
    desc: 'Built a classification model in Python utilizing a custom-trained ResNet18 backbone in PyTorch. Optimized hyper-parameters to classify and isolate synthetic generative AI images from natural photographs, outputting confusion matrix reports and evaluation curves for model benchmarking.',
    pills: ['PyTorch', 'ResNet18', 'Image Processing', 'Python'],
    image: '/assets/ai vs real.png'
  },
  {
    category: 'IoT & HARDWARE',
    year: '2023',
    title: 'Offline Voice Water Detector',
    desc: 'Programmed an ESP32-based embedded controller coupled with soil moisture and water flow sensor inputs. Integrated offline local voice recognition (Vosk/Picovoice) for immediate operational control of water valves without active internet or cloud dependencies.',
    pills: ['ESP32', 'Speech Recognition', 'C++', 'Sensors'],
    image: '/assets/iot project.png'
  }
];

export default function Projects() {
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

  return (
    <section className="projects-section" id="projects">
      <div className="content-container">
        <div className="section-header-block">
          <span className="section-subtitle">CASE STUDIES</span>
          <h2 className="section-heading">Featured Projects</h2>
        </div>

        <div className="projects-list">
          {projectsData.map((project, index) => (
            <article 
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              data-index={index}
              className={`project-card-row reveal-item ${visibleCards[index] ? 'visible' : ''}`}
            >
              <div className="project-meta">
                <span className="project-category">{project.category}</span>
                <span className="project-year">{project.year}</span>
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p className="project-desc">{project.desc}</p>
                <div className="project-pills">
                  {project.pills.map((pill, pillIdx) => (
                    <span key={pillIdx} className="project-pill">
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="project-image-col">
                <img src={project.image} alt={project.title} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
