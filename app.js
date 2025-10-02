// Global variables
let particles = [];
let animationId;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize all app functionality
function initializeApp() {
    initNavigation();
    initTypingEffect();
    initParticles();
    initScrollAnimations();
    initContactForm();
    initMobileMenu();
    initScrollNavbar();
    initProjectLinks();
}

// Initialize project links
function initProjectLinks() {
    const projectLinks = document.querySelectorAll('.project-link');
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                window.open(href, '_blank');
            }
        });
    });
}

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                smoothScroll(offsetTop);
                
                // Update active nav link
                navLinks.forEach(nl => nl.classList.remove('active'));
                this.classList.add('active');
                
                // Close mobile menu if open
                const navMenu = document.getElementById('nav-menu');
                const navToggle = document.getElementById('nav-toggle');
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });
}

// Smooth scroll function
function smoothScroll(targetPosition) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000;
    let start = null;
    
    function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// Typing effect
function initTypingEffect() {
    const typingText = document.getElementById('typing-text');
    if (!typingText) return;
    
    const texts = [
        'Data Scientist',
        'AI Researcher', 
        'Machine Learning Engineer',
        'NLP Specialist',
        'Data Analyst',
        'Python Developer'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseTime = 2000;
    
    function typeWriter() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? deletingSpeed : typingSpeed;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = pauseTime;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(typeWriter, typeSpeed);
    }
    
    typeWriter();
}

// Particle system
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }
    
    function createParticle() {
        const particle = {
            element: document.createElement('div'),
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 3 + 1
        };
        
        particle.element.style.position = 'absolute';
        particle.element.style.width = particle.size + 'px';
        particle.element.style.height = particle.size + 'px';
        particle.element.style.background = 'rgba(33, 128, 141, 0.6)';
        particle.element.style.borderRadius = '50%';
        particle.element.style.pointerEvents = 'none';
        particle.element.style.opacity = Math.random() * 0.5 + 0.2;
        
        particlesContainer.appendChild(particle.element);
        particles.push(particle);
    }
    
    // Animate particles
    function animateParticles() {
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around screen
            if (particle.x < 0) particle.x = window.innerWidth;
            if (particle.x > window.innerWidth) particle.x = 0;
            if (particle.y < 0) particle.y = window.innerHeight;
            if (particle.y > window.innerHeight) particle.y = 0;
            
            particle.element.style.left = particle.x + 'px';
            particle.element.style.top = particle.y + 'px';
        });
        
        animationId = requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
    
    // Handle resize
    window.addEventListener('resize', () => {
        particles.forEach(particle => {
            if (particle.x > window.innerWidth) particle.x = window.innerWidth;
            if (particle.y > window.innerHeight) particle.y = window.innerHeight;
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animatedElements = document.querySelectorAll('.stat-card, .skill-card, .project-card, .timeline-item');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !message) {
            showToast('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showToast('Please enter a valid email address', 'error');
            return;
        }
        
        // Create mailto link with form data
        const subject = encodeURIComponent('Contact from Portfolio Website');
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        const mailtoLink = `mailto:asha491322@gmail.com?subject=${subject}&body=${body}`;
        
        // Open default email client
        window.location.href = mailtoLink;
        
        // Show success message
        showToast('Email client opened successfully!', 'success');
        
        // Reset form
        this.reset();
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Mobile menu functionality
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (!navToggle || !navMenu) return;
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// Navbar scroll effect
function initScrollNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    const scrollThreshold = 100;
    
    function updateNavbar() {
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    }
    
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Debounced scroll handler
    let ticking = false;
    
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateNavbar();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Initial call
    updateNavbar();
}

// Download resume functionality
function downloadResume() {
    // Show immediate feedback
    showToast('Preparing your resume download...', 'success');
    
    // Create a comprehensive resume content
    const resumeContent = `
ASHWITH ANAND POOJARY
Data Scientist & AI Researcher
===========================================

CONTACT INFORMATION:
Email: asha491322@gmail.com
Phone: +49 1.5566158086e+10
Location: Heidelberg, Baden-Württemberg, Germany
LinkedIn: http://www.linkedin.com/in/ashwith-anand-poojary-b02b85342/
GitHub: https://github.com/ashwith1

PROFESSIONAL SUMMARY:
Innovative data analyst with a strong foundation in applied data science and AI, demonstrated through impactful work at Merck KGaA, Darmstadt, Germany. Proficient in leveraging platforms like Palantir Foundry, LLMs and FastAPI to develop robust real-time solutions.

PROFESSIONAL EXPERIENCE:
===========================================

Intern - Data Science & AI
Merck KGaA | Darmstadt, Germany | April 2025 – August 2025
• Develop FastAPI endpoints integrating MyGPT (LLM) with Qdrant and SQL for efficient semantic searches
• Implement metadata-driven SQL queries through Azure DevOps pipelines, reducing manual effort by 40%
• Streamline end-to-end data processing, accelerating retrieval time by 30%
• Present actionable data insights to stakeholders, enhancing decision-making efficiency
• Implemented Palantir AIP multi-agent chatbot with dynamic dashboard filtering

Major Incident Manager / IT Support Specialist
McAfee Software (India) Private Limited | Bangalore, India | August 2022 – October 2023
• Executed comprehensive incident resolution procedures improving response efficiency
• Utilized O-365 applications for seamless global team collaboration
• Developed robust Incident Management processes reducing escalations

EDUCATION:
===========================================

M.Sc. Applied Data Science and Analytics
SRH Hochschule Heidelberg | Heidelberg, Germany | October 2023 – Ongoing
Subjects: Data Analytics, Data Mining, Big Data, SQL, Tableau, NoSQL, Python, R

Bachelor of Information Science and Engineering
PES Institute of Technology | Bangalore, India | June 2017 – July 2022
Subjects: SQL, Python, Java, C, Data Warehouse, Machine Learning, Web Programming

TECHNICAL SKILLS:
===========================================

Advanced:
• Python
• Machine Learning
• NLP (Natural Language Processing)
• Power BI
• Tableau
• FastAPI
• LLM Integration

Proficient:
• Azure
• GCP (Google Cloud Platform)
• Kafka
• Qdrant
• SAS
• Palantir Foundry
• Agile

FEATURED PROJECTS:
===========================================

1. Master Thesis: AI-Vector Database Integration
   Darmstadt, Germany | April 2025 – Present
   • Integrate MyGPT (LLM) with Qdrant and SQL via FastAPI to enable efficient semantic searches
   • Real-time insights and interactive data visualizations
   • Technologies: Python, MyGPT, FastAPI, Qdrant, Azure DevOps
   • Live Demo: https://masterthesisdashboard.vercel.app

2. German Biography Generator
   Heidelberg, Germany | May 2024 - October 2024
   • Automated AI-driven biography generator from interviews
   • Institut für Geschichte und Biographie partnership
   • GDPR-compliant large-scale text processing
   • Technologies: Python, Meta Llama 3.1, Mistral, Streamlit
   • GitHub: https://github.com/ashwith1/German_Biography_Generator

3. 2024 US Presidential Election Dashboard
   Heidelberg, Germany | October 2024 - November 2024
   • Dynamic Tableau dashboard showcasing electoral themes
   • Voter priorities and demographic insights analysis
   • Technologies: Tableau, Tableau Prep, Python, TabPy
   • GitHub: https://github.com/ashwith1/The-2024-US-Presidential-Election-Dashboard

4. DataDoofs Energy Consumption Dashboard
   Heidelberg, Germany | June 2024 - July 2024
   • EU energy consumption analysis amid COVID-19 and Russia-Ukraine conflict
   • Supporting informed energy policy decisions
   • Technologies: Tableau, Tableau Prep
   • GitHub: https://github.com/ashwith1/Team_DataDoofs_Energy-Consumption-Dashboard

KEY ACHIEVEMENTS:
===========================================
• 13+ GitHub Projects
• 40% improvement in query efficiency at Merck KGaA
• 30% increase in data retrieval speed
• GDPR-compliant large-scale text processing implementation
• Multi-agent chatbot development with dynamic filtering

LANGUAGES:
===========================================
• English (Fluent)
• German (Intermediate)
• Hindi (Native)
• Kannada (Native)

CERTIFICATIONS & INTERESTS:
===========================================
• Data Science & Machine Learning
• Natural Language Processing
• Vector Databases & Semantic Search
• Business Intelligence & Visualization
• Cloud Computing (Azure, GCP)
• Agile Project Management

===========================================
Generated on: ${new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
})}

This resume was generated from my interactive portfolio website.
For the most up-to-date information, please visit: https://ashresume.github.io
===========================================
`;
    
    // Create blob and download
    const blob = new Blob([resumeContent], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Ashwith_Anand_Poojary_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    // Show success message after a short delay
    setTimeout(() => {
        showToast('Resume downloaded successfully! 📄', 'success');
    }, 500);
}

// Toast notification system
function showToast(message, type = 'info', duration = 5000) {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    
    // Toast content
    toast.innerHTML = `
        <div class="toast__icon">
            ${getToastIcon(type)}
        </div>
        <div class="toast__message">${message}</div>
        <button class="toast__close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add to page
    document.body.appendChild(toast);
    
    // Auto remove
    setTimeout(() => {
        if (toast.parentElement) {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => toast.remove(), 300);
        }
    }, duration);
    
    // Make toast clickable to dismiss
    toast.addEventListener('click', (e) => {
        if (e.target.closest('.toast__close')) {
            toast.remove();
        }
    });
}

// Get appropriate icon for toast type
function getToastIcon(type) {
    switch (type) {
        case 'success':
            return '<i class="fas fa-check-circle"></i>';
        case 'error':
            return '<i class="fas fa-exclamation-circle"></i>';
        case 'warning':
            return '<i class="fas fa-exclamation-triangle"></i>';
        default:
            return '<i class="fas fa-info-circle"></i>';
    }
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        if (navMenu && navToggle) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
        
        // Close all toasts
        const toasts = document.querySelectorAll('.toast');
        toasts.forEach(toast => toast.remove());
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add performance monitoring
const performanceObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime);
        }
    }
});

try {
    performanceObserver.observe({ entryTypes: ['largest-contentful-paint'] });
} catch (e) {
    // Performance Observer not supported in all browsers
    console.log('Performance Observer not supported');
}

// Export functions for potential future use
window.portfolioApp = {
    downloadResume,
    showToast,
    smoothScroll
};