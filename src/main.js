import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ============================================================
// 1. REMOVE WEBFLOW BADGE
// ============================================================
function killWebflowBadge() {
  const selectors = [
    '.w-webflow-badge',
    'a[href*="webflow.com?utm"]',
    'a[href*="webflow.com/made-in-webflow"]',
    '[class*="webflow-badge"]',
  ];
  selectors.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el) => el.remove());
  });
}

// ============================================================
// 2. MOBILE NAV DRAWER
// ============================================================
function initNav() {
  const btn = document.getElementById('menuToggle');
  const menu = document.getElementById('navMenu');
  if (!btn || !menu) return;

  const openMenu = () => {
    menu.classList.add('is-active');
    btn.classList.add('is-active');
    btn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    // Animate links in
    gsap.fromTo(
      menu.querySelectorAll('.nav-link, .nav-mobile-cta'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.07, duration: 0.4, ease: 'power2.out', delay: 0.1 }
    );
  };

  const closeMenu = () => {
    menu.classList.remove('is-active');
    btn.classList.remove('is-active');
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.contains('is-active') ? closeMenu() : openMenu();
  });

  document.addEventListener('click', (e) => {
    if (menu.classList.contains('is-active') && !menu.contains(e.target) && !btn.contains(e.target)) {
      closeMenu();
    }
  });

  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (e) => e.key === 'Escape' && closeMenu());
}

// ============================================================
// 3. NAVBAR SCROLL EFFECT
// ============================================================
function initNavScroll() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  ScrollTrigger.create({
    start: 'top+=80 top',
    onEnter: () => {
      gsap.to(header, { backgroundColor: 'rgba(8,8,8,0.97)', duration: 0.3 });
    },
    onLeaveBack: () => {
      gsap.to(header, { backgroundColor: 'rgba(10,10,10,0.92)', duration: 0.3 });
    },
  });
}

// ============================================================
// 4. GSAP SCROLL ANIMATIONS (replaces Webflow IX2)
// ============================================================
function initScrollAnimations() {
  const mm = gsap.matchMedia();

  // Defaults
  const defaults = { ease: 'power3.out', duration: 0.9 };

  // --- Hero Heading ---
  gsap.utils.toArray('.hero-heading').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', delay: 0.15 }
    );
  });

  // --- Hero image ---
  gsap.utils.toArray('.home-image').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, scale: 1.04 },
      { opacity: 1, scale: 1, duration: 1.3, ease: 'power2.out', delay: 0.4 }
    );
  });

  // --- Section headings ---
  gsap.utils.toArray('.home-work-heading, .section-heading, .h1, .h2').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
        ...defaults,
      }
    );
  });

  // --- Work/portfolio grid items (stagger) ---
  const workGrids = document.querySelectorAll('.home-work-grid, .works-list, .secondary-grid');
  workGrids.forEach((grid) => {
    const children = grid.children;
    if (!children.length) return;
    gsap.fromTo(
      children,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0,
        stagger: 0.12,
        scrollTrigger: { trigger: grid, start: 'top 85%', toggleActions: 'play none none none' },
        ...defaults,
      }
    );
  });

  // --- Service items ---
  gsap.utils.toArray('.home-service-title, .home-service-text, .service-title').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, x: -30 },
      {
        opacity: 1, x: 0,
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
        duration: 0.7, ease: 'power2.out',
      }
    );
  });

  // --- Number counters / stats ---
  gsap.utils.toArray('.number-heading, .stat-number').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1, scale: 1,
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
        duration: 0.8, ease: 'back.out(1.7)',
      }
    );
  });

  // --- General sections fade up ---
  gsap.utils.toArray('.section').forEach((el) => {
    const children = el.querySelectorAll('p, .primary-btn-text, .author-card, .blog-post-title');
    if (!children.length) return;
    gsap.fromTo(
      children,
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0,
        stagger: 0.08,
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
        duration: 0.65, ease: 'power2.out',
      }
    );
  });

  // --- Footer heading big letters ---
  gsap.utils.toArray('.footer-heading').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, x: -60 },
      {
        opacity: 1, x: 0,
        scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
        duration: 1, ease: 'power3.out',
      }
    );
  });

  // --- Testimonial cards ---
  gsap.utils.toArray('.ff-testimonial-card').forEach((el, i) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        delay: i * 0.1,
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
        duration: 0.7, ease: 'power2.out',
      }
    );
  });

  // --- Works page hero elements ---
  gsap.utils.toArray('.hero_heading-wrapper, .hero_text-wrapper').forEach((el, i) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, delay: i * 0.15, duration: 1, ease: 'power3.out' }
    );
  });

  // --- Works page work items ---
  gsap.utils.toArray('.work-item, .main-image-wrapper').forEach((el, i) => {
    gsap.fromTo(
      el,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1, scale: 1,
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
        duration: 0.8, ease: 'power2.out', delay: (i % 3) * 0.1,
      }
    );
  });

  // --- Contact form ---
  gsap.utils.toArray('.contact-form-wrapper, .form-container, .footer-form-wrapper').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
        duration: 0.8, ease: 'power2.out',
      }
    );
  });

  // --- Circular rotating element ---
  gsap.utils.toArray('.larva-ciruclar, .circular-text').forEach((el) => {
    gsap.to(el, { rotation: 360, duration: 18, ease: 'none', repeat: -1 });
  });

  // --- Parallax on hero image ---
  mm.add('(min-width: 992px)', () => {
    gsap.utils.toArray('.home-image, .hero-image').forEach((el) => {
      gsap.to(el, {
        y: -60,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
      });
    });
  });
}

// ============================================================
// 5. PRIMARY BUTTON HOVER (replaces Webflow IX2 hover)
// ============================================================
function initButtonAnimations() {
  document.querySelectorAll('.primary-button:not(.nav-btn)').forEach((btn) => {
    const bg = btn.querySelector('.primary-btn-bg');
    const text = btn.querySelector('.primary-btn-text');
    const arrow = btn.querySelector('.right-arrow');

    if (!bg) return;

    // Set initial bg state
    gsap.set(bg, { width: '45px', left: 'auto', right: 0 });

    btn.addEventListener('mouseenter', () => {
      gsap.to(bg, { width: '100%', duration: 0.4, ease: 'power2.inOut' });
      if (arrow) gsap.to(arrow, { x: 5, duration: 0.3, ease: 'power2.out' });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(bg, { width: '45px', duration: 0.35, ease: 'power2.inOut' });
      if (arrow) gsap.to(arrow, { x: 0, duration: 0.3, ease: 'power2.out' });
    });
  });
}

// ============================================================
// 6. SMOOTH SCROLL for anchor links
// ============================================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        gsap.to(window, { scrollTo: { y: target, offsetY: 80 }, duration: 1, ease: 'power3.inOut' });
      }
    });
  });
}

// ============================================================
// 7. MARQUEE / ticker text animation
// ============================================================
function initMarquee() {
  document.querySelectorAll('.ticker-text, .marquee-text, .slided-text').forEach((el) => {
    const parent = el.parentElement;
    if (!parent) return;
    // Check if already initialized
    if (parent.dataset.marqueeInit) return;
    parent.dataset.marqueeInit = '1';

    gsap.to(parent, {
      x: '-50%',
      ease: 'none',
      duration: 20,
      repeat: -1,
    });
  });
}

// ============================================================
// RUN ALL ON DOM READY
// ============================================================
function init() {
  killWebflowBadge();
  initNav();
  initNavScroll();
  initScrollAnimations();
  initButtonAnimations();
  initSmoothScroll();
  initMarquee();

  // Kill badge again after a delay (Webflow CDN JS injects it late)
  setTimeout(killWebflowBadge, 500);
  setTimeout(killWebflowBadge, 1500);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

window.addEventListener('load', () => {
  killWebflowBadge();
  // Refresh ScrollTrigger after images load
  ScrollTrigger.refresh();
});
