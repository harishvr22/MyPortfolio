// Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('navMenu');
const navClose = document.getElementById('nav-close');

// Toggle navigation menu
navToggle.addEventListener('click', () => {
    navMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
});

// Close navigation menu
navClose.addEventListener('click', () => {
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
});

// Close menu when clicking on a nav link
document.querySelectorAll('.nav-left li').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll animation for experience section
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Stop observing after animation is triggered
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all experience items
document.addEventListener('DOMContentLoaded', () => {
    const experienceItems = document.querySelectorAll('.experience-item');
    experienceItems.forEach((item, index) => {
        // Add staggered delay
        item.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(item);
    });

    // Add scroll event for header animation
    const header = document.querySelector('.main-content');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Down
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Up
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
    });
});

// Add animation to experience section when it comes into view
const experienceSection = document.querySelector('.experience-section');
const experienceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
            experienceObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

if (experienceSection) {
    experienceSection.classList.add('section-hidden');
    experienceObserver.observe(experienceSection);
}
