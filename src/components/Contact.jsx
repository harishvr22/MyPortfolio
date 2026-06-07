import { useEffect, useRef, useState } from 'react';

export default function Contact() {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Message sent successfully! (Demonstration Mode)\n\nThank you, ${formData.name}. We will get back to you soon.`);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <section className="contact-section" id="contact">
      <div className="content-container">
        <div className="section-header-block">
          <span className="section-subtitle">INQUIRIES & COLLABORATION</span>
          <h2 className="section-heading">Get In Touch</h2>
        </div>

        <div 
          ref={containerRef}
          className={`contact-card-box reveal-item ${isVisible ? 'visible' : ''}`}
        >
          <form id="portfolio-contact" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="c-name">Full Name</label>
                <input 
                  type="text" 
                  id="c-name" 
                  name="name" 
                  placeholder="John Doe" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
                <span className="focus-line"></span>
              </div>
              <div className="form-group">
                <label htmlFor="c-email">Email Address</label>
                <input 
                  type="email" 
                  id="c-email" 
                  name="email" 
                  placeholder="johndoe@email.com" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
                <span className="focus-line"></span>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="c-subject">Subject</label>
              <input 
                type="text" 
                id="c-subject" 
                name="subject" 
                placeholder="Project / Career Inquiry" 
                value={formData.subject}
                onChange={handleChange}
                required 
              />
              <span className="focus-line"></span>
            </div>
            <div className="form-group">
              <label htmlFor="c-message">Message</label>
              <textarea 
                id="c-message" 
                name="message" 
                rows="4" 
                placeholder="Brief outline of your proposal..." 
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <span className="focus-line"></span>
            </div>
            <div className="submit-wrapper">
              <button type="submit" className="btn-premium-dark">
                <span>Send Message</span>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" className="send-icon">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
