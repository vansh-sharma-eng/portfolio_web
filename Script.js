

const text = "Hello, I am Vansh Sharma";
let index = 0;
let isDeleting = false;

function typeEffect() {
  const element = document.getElementById("typing");

  if (!isDeleting) {
    element.innerHTML = text.substring(0, index++);
    if (index > text.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1000); // pause before deleting
      return;
    }
  } else {
    element.innerHTML = text.substring(0, index--);
    if (index === 0) {
      isDeleting = false;
    }
  }

  setTimeout(typeEffect, isDeleting ? 50 : 100);
}

typeEffect();


function showTab(tabId) {
  document.querySelectorAll('.cards').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));

  document.getElementById(tabId).classList.add('active');
  event.target.classList.add('active');
}


const form = document.querySelector(".contact-form");

form.addEventListener("submit", async function(e) {
  e.preventDefault();

  const data = new FormData(form);

  const response = await fetch(form.action, {
    method: "POST",
    body: data,
    headers: {
      'Accept': 'application/json'
    }
  });

  if (response.ok) {
    alert("Message sent successfully ✅");

    form.reset(); 
  } else {
    alert("Something went wrong ❌");
  }
  
});
document.querySelector(".contact-btn").addEventListener("click", function() {
  document.querySelector("#Contact").scrollIntoView({
    behavior: "smooth"
  });
});

document.querySelector(".primary").addEventListener("click", function() {
  document.querySelector("#Projects").scrollIntoView({
    behavior: "smooth"
  });
});

document.querySelector(".secondary").addEventListener("click", function() {
  document.querySelector("#Contact").scrollIntoView({
    behavior: "smooth"
  });
});





function revealOnScroll() {
  const elements = document.querySelectorAll(".reveal");

  elements.forEach((el) => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 120;

    if (elementTop < windowHeight - revealPoint) {
      el.classList.add("active");
    } else {
      el.classList.remove("active"); // remove if you want repeat animation
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

  const cursor = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  const sectionColors = {
    'home':      '44, 74, 82',
    'about':     '58, 74, 58',
    'skills':    '237, 244, 246',
    'project':  '28,28,30',
    'education': '28, 46, 56',
    'contact':   '42, 30, 24',
  };

  let currentColor = '44, 74, 82';

   function updateCursorColor() {
    const sections = document.querySelectorAll('section, .home, .about, .skills, .education, .contact');
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (
        mouseY >= rect.top && mouseY <= rect.bottom &&
        mouseX >= rect.left && mouseX <= rect.right
      ) {
    
        const matched = Object.keys(sectionColors).find(key => section.classList.contains(key));
        if (matched) currentColor = sectionColors[matched];
      }
    });

 
    cursor.style.background = `rgb(${currentColor})`;
    cursorRing.style.borderColor = `rgba(${currentColor}, 0.5)`;
  }

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
    spawnTrail(mouseX, mouseY);
    updateCursorColor();
  });

  function lerp(a, b, t) { return a + (b - a) * t; }

  function animateRing() {
    ringX = lerp(ringX, mouseX, 0.10);
    ringY = lerp(ringY, mouseY, 0.10);
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  let lastTrailTime = 0;
  function spawnTrail(x, y) {
    const now = Date.now();
    if (now - lastTrailTime < 40) return;
    lastTrailTime = now;
    const dot = document.createElement('div');
    dot.className = 'cursor-trail';
    dot.style.left = x + 'px';
    dot.style.top  = y + 'px';
    dot.style.background = `rgba(${currentColor}, 0.35)`;
    document.body.appendChild(dot);
    setTimeout(() => dot.remove(), 100);
  }

  const hoverTargets = 'a, button, .card, .tab, .icon, .project-card, .edu-card, input, textarea, .btn';

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverTargets)) document.body.classList.add('cursor-hover');
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverTargets)) document.body.classList.remove('cursor-hover');
  });

  document.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
  document.addEventListener('mouseup', () => document.body.classList.remove('cursor-click'));

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorRing.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    cursorRing.style.opacity = '1';
  });




function scrollToSection(id) {
  const section = document.getElementById(id);

  section.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}



const resumeBtn = document.getElementById("resumeBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    resumeBtn.classList.add("hide");
  } else {
    resumeBtn.classList.remove("hide");
  }
});



const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });
}
