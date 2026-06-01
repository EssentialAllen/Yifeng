/**
 * Yifeng Group - Premium Landing Page Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- HEADER SCROLL ACTION ---
  const header = document.querySelector('header');
  const scrollThreshold = 50;

  const handleScroll = () => {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check

  // --- MOBILE NAV TOGGLE ---
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      nav.classList.toggle('active');
    });

    // Close mobile menu when nav link is clicked
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
      });
    });
  }

  // --- INTERACTIVE PRODUCT TABS switcher ---
  const tabTriggers = document.querySelectorAll('.tab-trigger');
  const tabContents = document.querySelectorAll('.tab-content');

  tabTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const targetTab = trigger.getAttribute('data-tab');

      // Update triggers
      tabTriggers.forEach(t => t.classList.remove('active'));
      trigger.classList.add('active');

      // Update content with transition
      tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.getAttribute('id') === targetTab) {
          // Add timeout to let CSS display property trigger transition
          setTimeout(() => {
            content.classList.add('active');
          }, 50);
        }
      });
    });
  });

  // --- SCROLL REVEAL ANIMATIONS (Intersection Observer) ---
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve once revealed to keep layout smooth
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // --- MILESTONES SCROLLER ACTION ---
  const milestonesTrack = document.getElementById('milestones-track');
  const prevBtn = document.getElementById('milestone-prev');
  const nextBtn = document.getElementById('milestone-next');

  if (milestonesTrack && prevBtn && nextBtn) {
    const scrollAmount = 352; // 320px card width + 32px gap (2rem)
    
    prevBtn.addEventListener('click', () => {
      milestonesTrack.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    });

    nextBtn.addEventListener('click', () => {
      milestonesTrack.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    });

    // Disable/Dim buttons at scroll ends
    const toggleButtons = () => {
      const maxScrollLeft = milestonesTrack.scrollWidth - milestonesTrack.clientWidth;
      prevBtn.style.opacity = milestonesTrack.scrollLeft <= 8 ? '0.35' : '1';
      prevBtn.style.pointerEvents = milestonesTrack.scrollLeft <= 8 ? 'none' : 'auto';
      
      nextBtn.style.opacity = milestonesTrack.scrollLeft >= maxScrollLeft - 8 ? '0.35' : '1';
      nextBtn.style.pointerEvents = milestonesTrack.scrollLeft >= maxScrollLeft - 8 ? 'none' : 'auto';
    };

    milestonesTrack.addEventListener('scroll', toggleButtons);
    window.addEventListener('resize', toggleButtons);
    
    // Trigger initial button check
    setTimeout(toggleButtons, 300);
  }

  // --- FLOATING ACTIVE NAV HIGHLIGHT ---
  const sections = document.querySelectorAll('section, .hero');
  const navLinks = document.querySelectorAll('nav a');

  const highlightNav = () => {
    let scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav);
});
