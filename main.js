/* ============================================
   Modern Portfolio - JavaScript
   ============================================ */

'use strict';

// ============================================
// Preloader
// ============================================
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.classList.add('hidden');
  }, 1000);
});

// ============================================
// Hero Video - Play Once with Controls
// ============================================
const initHeroVideo = () => {
  const heroVideo = document.getElementById('hero-video');
  
  if (!heroVideo) return;
  
  // Ensure video doesn't loop
  heroVideo.loop = false;
  
  // Play video when it's ready
  heroVideo.addEventListener('loadeddata', () => {
    // Ensure loop is disabled
    heroVideo.loop = false;
    
    // Try to play automatically (muted autoplay works in most browsers)
    heroVideo.play().catch(err => {
      console.log('Video autoplay prevented:', err);
    });
  });
  
  // Ensure loop stays false when video ends
  heroVideo.addEventListener('ended', () => {
    heroVideo.loop = false;
    // Video stays visible with controls, user can replay if needed
  });
  
  // Prevent loop on any play event
  heroVideo.addEventListener('play', () => {
    heroVideo.loop = false;
  });
  
  // Ensure loop is always false
  const preventLoop = () => {
    if (heroVideo.loop) {
      heroVideo.loop = false;
    }
  };
  
  heroVideo.addEventListener('loadstart', preventLoop);
  heroVideo.addEventListener('canplay', preventLoop);
};

// ============================================
// Custom Cursor
// ============================================
const initCustomCursor = () => {
  const cursor = document.getElementById('cursor');
  const cursorFollower = document.getElementById('cursor-follower');
  
  if (!cursor || !cursorFollower) return;
  
  let mouseX = 0;
  let mouseY = 0;
  let followerX = 0;
  let followerY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });
  
  // Smooth follower animation
  const animateFollower = () => {
    const distX = mouseX - followerX;
    const distY = mouseY - followerY;
    
    followerX += distX * 0.1;
    followerY += distY * 0.1;
    
    cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;
    
    requestAnimationFrame(animateFollower);
  };
  
  animateFollower();
  
  // Add hover effect on interactive elements
  const hoverElements = document.querySelectorAll('a, button, .skill-card, .project-card');
  
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorFollower.classList.add('hover');
    });
    
    el.addEventListener('mouseleave', () => {
      cursorFollower.classList.remove('hover');
    });
  });
};

// ============================================
// Navbar
// ============================================
const initNavbar = () => {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Scroll effect
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
  
  // Mobile menu toggle with animation
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const isActive = hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.style.overflow = isActive ? 'hidden' : '';
      
      // Animate menu items on open
      if (isActive) {
        const items = navMenu.querySelectorAll('.nav-item');
        items.forEach((item, index) => {
          item.style.animation = `slideIn 0.3s ease forwards ${index * 0.1}s`;
        });
      }
    });
  }
  
  // Add slideIn animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);
  
  // Active link on scroll
  const sections = document.querySelectorAll('.section, .hero');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
  
  // Close mobile menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('active');
      navMenu?.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
};

// ============================================
// Theme Toggle
// ============================================
const initThemeToggle = () => {
  const themeToggle = document.getElementById('theme-toggle');
  
  if (!themeToggle) return;
  
  // Check for saved theme preference or default to dark mode
  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.body.classList.toggle('light-theme', currentTheme === 'light');
  
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    
    const theme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
  });
};

// ============================================
// Particles
// ============================================
const initParticles = () => {
  if (typeof particlesJS === 'undefined') return;
  
  const particlesConfig = {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: '#5b5b5b'
      },
      shape: {
        type: 'circle'
      },
      opacity: {
        value: 0.3,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: true,
          speed: 2,
          size_min: 0.1,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#5b5b5b',
        opacity: 1,
        width: 1
      },
      move: {
        enable: true,
        speed: 1,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out',
        bounce: false
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: 'grab'
        },
        onclick: {
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 1
          }
        },
        push: {
          particles_nb: 4
        }
      }
    },
    retina_detect: true
  };
  
  // Adjust particle count based on screen size for better performance
  const getParticleConfig = () => {
    const width = window.innerWidth;
    if (width < 768) {
      return { count: 50, distance: 120 };
    } else if (width < 1024) {
      return { count: 65, distance: 135 };
    } else {
      return { count: 80, distance: 150 };
    }
  };
  
  const screenConfig = getParticleConfig();
  particlesConfig.particles.number.value = screenConfig.count;
  particlesConfig.particles.line_linked.distance = screenConfig.distance;
  
  // Initialize particles
  particlesJS('particles-js', particlesConfig);
  
  // Handle window resize - particles.js handles canvas resize automatically
  // but we ensure the container stays properly sized
  let resizeTimer;
  const handleResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const particlesContainer = document.getElementById('particles-js');
      if (particlesContainer && window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
        // Canvas resize is handled automatically by particles.js with resize: true
        // But we ensure it's triggered properly
        if (window.pJSDom[0].pJS.fn && window.pJSDom[0].pJS.fn.canvasResize) {
          window.pJSDom[0].pJS.fn.canvasResize();
        }
      }
    }, 150);
  };
  
  window.addEventListener('resize', handleResize);
  window.addEventListener('orientationchange', handleResize);
  
  // Ensure canvas is properly sized on load
  window.addEventListener('load', () => {
    setTimeout(() => {
      const particlesContainer = document.getElementById('particles-js');
      if (particlesContainer && window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
        if (window.pJSDom[0].pJS.fn && window.pJSDom[0].pJS.fn.canvasResize) {
          window.pJSDom[0].pJS.fn.canvasResize();
        }
      }
    }, 200);
  });
};

// ============================================
// Back to Top Button
// ============================================
const initBackToTop = () => {
  const backToTopBtn = document.getElementById('back-to-top');
  
  if (!backToTopBtn) return;
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });
  
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
};

// ============================================
// Smooth Scroll
// ============================================
const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href === '#') return;
      
      e.preventDefault();
      
      const target = document.querySelector(href);
      
      if (target) {
        const offsetTop = target.offsetTop - 80;
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
};

// ============================================
// Typing Animation
// ============================================
const initTypingAnimation = () => {
  const subtitle = document.querySelector('.hero-subtitle');
  
  if (!subtitle) return;
  
  const text = subtitle.textContent;
  subtitle.textContent = '';
  subtitle.style.opacity = '1';
  
  let charIndex = 0;
  
  const typeChar = () => {
    if (charIndex < text.length) {
      subtitle.textContent += text.charAt(charIndex);
      charIndex++;
      setTimeout(typeChar, 100);
    }
  };
  
  setTimeout(typeChar, 1000);
};

// ============================================
// Intersection Observer for Animations
// ============================================
const initIntersectionObserver = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe elements
  const animateElements = document.querySelectorAll('.skill-card, .project-card');
  
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
};

// ============================================
// Counter Animation
// ============================================
const initCounterAnimation = () => {
  const counters = document.querySelectorAll('.stat-number');
  
  const animateCounter = (counter) => {
    const target = parseInt(counter.textContent.replace(/\D/g, ''));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
      current += increment;
      
      if (current < target) {
        counter.textContent = Math.floor(current) + '+';
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + '+';
      }
    };
    
    updateCounter();
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.5});
  
  counters.forEach(counter => observer.observe(counter));
};

// ============================================
// Parallax Effect
// ============================================
const initParallax = () => {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Scroll indicator fade
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
      const opacity = Math.max(0, 1 - scrolled / 300);
      scrollIndicator.style.opacity = opacity;
    }
  });
};

// ============================================
// Add Hover Tilt Effect to Cards
// ============================================
const initTiltEffect = () => {
  const cards = document.querySelectorAll('.skill-card, .project-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
};

// ============================================
// Magnetic Button Effect
// ============================================
const initMagneticButtons = () => {
  const buttons = document.querySelectorAll('.btn-primary');
  
  buttons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) translateY(-2px)`;
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = '';
    });
  });
};

// ============================================
// Add Ripple Effect to Buttons
// ============================================
const initRippleEffect = () => {
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        left: ${x}px;
        top: ${y}px;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
      `;
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });
  
  // Add ripple animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
};

// ============================================
// Dynamic Copyright Year
// ============================================
const updateCopyrightYear = () => {
  const yearElements = document.querySelectorAll('.footer-text p');
  const currentYear = new Date().getFullYear();
  
  yearElements.forEach(el => {
    el.textContent = el.textContent.replace(/\d{4}/, currentYear);
  });
};

// ============================================
// Initialize All
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initNavbar();
  initThemeToggle();
  initBackToTop();
  initSmoothScroll();
  initTypingAnimation();
  initIntersectionObserver();
  initCounterAnimation();
  initParallax();
  initTiltEffect();
  initMagneticButtons();
  initRippleEffect();
  updateCopyrightYear();
  initHeroVideo();
  
  // Initialize particles after a short delay
  setTimeout(initParticles, 500);
});

// ============================================
// Performance Optimization
// ============================================
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      // Scroll-based animations handled here
      ticking = false;
    });
    
    ticking = true;
  }
});

// ============================================
// Console Message
// ============================================
console.log(
  '%cWelcome to My Portfolio! 👋',
  'color: #6366f1; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);'
);

console.log(
  '%cLooking for something? Feel free to reach out!',
  'color: #06b6d4; font-size: 14px;'
);

console.log(
  '%c📧 rohitraj2k04@gmail.com',
  'color: #a8a8b3; font-size: 12px;'
);
