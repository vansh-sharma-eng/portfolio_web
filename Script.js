const text = "I build scalable web apps using modern technologies.";
let index = 0;
let isDeleting = false;
let showCursor = true;
const el = document.getElementById("text");
setInterval(() => {
  showCursor = !showCursor;
}, 500);
function typeEffect() {
  let displayText = text.substring(0, index);
  el.textContent = displayText + (showCursor ? "|" : "");
  if (!isDeleting) {
    index++;
    if (index === text.length) {
      isDeleting = true;
    }
  } else {
    index--;
    if (index === 0) {
      isDeleting = false;
    }
  }
  setTimeout(typeEffect, isDeleting ? 90 : 90);
}

typeEffect();

function downloadResume(){
  if(confirm("Download Resume?")){
    const link = document.createElement('a');
    link.href = "My.resume.pdf";
    link.download = "Vansh_Sharma_Resume.pdf";
    link.click();
  }
}
const links = document.querySelectorAll("nav a");
links.forEach(link=>{
  link.addEventListener("click",()=>{
    links.forEach(l=>l.classList.remove("active"));
    link.classList.add("active");
  });
});
const aboutSection = document.querySelector("#about");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        aboutSection.classList.add("active");
      } else {
        aboutSection.classList.remove("active");
      }
    });
  },
  {
    threshold: 0.2,
  }
);
observer.observe(aboutSection);
const skills = document.querySelectorAll(".skill");
const Observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, { threshold: 0.2 });
skills.forEach((skill, i) => {
  skill.style.opacity = "0";
  skill.style.transform = "translateY(40px)";
  skill.style.transition = `0.5s ease ${i * 0.05}s`;
  Observer.observe(skill);
});
const cards = document.querySelectorAll(".project-card");
cards.forEach(card => {
  card.addEventListener("click", () => {
    card.classList.toggle("active");
  });
});
const form = document.getElementById("contactForm");
const thankCard = document.getElementById("thankCard");
const thankMsg = document.getElementById("thankMsg");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  thankMsg.innerText = `Thank you, ${name}! Your message has been sent successfully 🚀`;
  thankCard.classList.add("active");
  fetch(form.action, {
    method: "POST",
    body: new FormData(form),
    headers: { 'Accept': 'application/json' }
  });
  form.reset();
});
function closeCard() {
  thankCard.classList.remove("active");
}
document.querySelectorAll('.footer-nav a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({
      behavior: 'smooth'
    });
  });
});
