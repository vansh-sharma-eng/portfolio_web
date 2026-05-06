document.addEventListener('DOMContentLoaded', () => {
// TYPING EFFECT
  const typingEl = document.getElementById('typing');
  const text     = 'Hello, I am Vansh Sharma';
  let index      = 0;
  let deleting   = false;

  function typeEffect() {
    typingEl.textContent = text.substring(0, index);

    if (!deleting) {
      index++;
      if (index > text.length) {
        deleting = true;
        setTimeout(typeEffect, 1200);
        return;
      }
    } else {
      index--;
      if (index === 0) deleting = false;
    }

    setTimeout(typeEffect, deleting ? 50 : 100);
  }

  typeEffect();

// SKILL TABS
  window.showTab = function(tabId, btn) {
    document.querySelectorAll('.cards').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });

    document.getElementById(tabId).classList.add('active');

    // btn is passed from the inline onclick; fallback to event.target
    const activeBtn = btn || event.target;
    activeBtn.classList.add('active');
    activeBtn.setAttribute('aria-selected', 'true');
  };

// CONTACT FORM
  const form = document.getElementById('contactForm');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Sending…';
      btn.disabled = true;

      try {
        const res = await fetch(form.action, {
          method:  'POST',
          body:    new FormData(form),
          headers: { Accept: 'application/json' }
        });

        if (res.ok) {
          alert('Message sent successfully ✅');
          form.reset();
        } else {
          alert('Something went wrong. Please try again ❌');
        }
      } catch {
        alert('Network error. Check your connection and try again.');
      } finally {
        btn.textContent = 'Send Message';
        btn.disabled = false;
      }
    });
  }

// SMOOTH SCROLL  (for buttons, not links — links use href="#id")
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  document.getElementById('viewProjectsBtn')?.addEventListener('click', () => scrollTo('Projects'));
  document.getElementById('getInTouchBtn')?.addEventListener('click',  () => scrollTo('Contact'));


// RESUME BUTTON — hide after scrolling past home
  const resumeBtn = document.getElementById('resumeBtn');

  if (resumeBtn) {
    const onScroll = () => {
      resumeBtn.classList.toggle('hide', window.scrollY > 120);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }

// HAMBURGER MENU
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.querySelector('.navbar nav');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      hamburger.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when a nav link is tapped
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }
  // CUSTOM CURSOR  (only on pointer:fine devices)
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');

  if (!dot || !ring) return;

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;
  let lastTrail = 0;

  const sectionColors = {
    home:      '44, 74, 82',
    about:     '58, 74, 58',
    skills:    '237, 244, 246',
    projects:  '28, 28, 30',
    education: '28, 46, 56',
    contact:   '42, 58, 42',
  };

  let currentColor = '44, 74, 82';

  function updateColor() {
    document.querySelectorAll('section').forEach(sec => {
      const r = sec.getBoundingClientRect();
      if (mouseY >= r.top && mouseY <= r.bottom) {
        const key = Object.keys(sectionColors).find(k => sec.classList.contains(k));
        if (key) currentColor = sectionColors[key];
      }
    });
    dot.style.background            = `rgb(${currentColor})`;
    ring.style.borderColor           = `rgba(${currentColor}, 0.5)`;
  }

  function spawnTrail(x, y) {
    const now = Date.now();
    if (now - lastTrail < 40) return;
    lastTrail = now;

    const t = document.createElement('div');
    t.className = 'cursor-trail';
    t.style.cssText = `left:${x}px;top:${y}px;background:rgba(${currentColor},0.35)`;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 650);
  }

  function lerp(a, b, t) { return a + (b - a) * t; }

  (function animateRing() {
    ringX = lerp(ringX, mouseX, 0.10);
    ringY = lerp(ringY, mouseY, 0.10);
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  })();

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
    spawnTrail(mouseX, mouseY);
    updateColor();
  });

  const hoverSel = 'a, button, .card, .tab, .icon, .project-card, .edu-card, input, textarea, .btn, .btn-primary-card';

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverSel)) document.body.classList.add('cursor-hover');
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverSel)) document.body.classList.remove('cursor-hover');
  });
  document.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
  document.addEventListener('mouseup',   () => document.body.classList.remove('cursor-click'));
  document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; ring.style.opacity = '1'; });

});
