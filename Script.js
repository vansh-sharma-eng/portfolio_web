// Resume Download
function downloadResume(){
  if(confirm("Download Resume?")){
    const link = document.createElement('a');
    link.href = "My.resume.pdf";
    link.download = "Vansh_Sharma_Resume.pdf";
    link.click();
  }
}

// Smooth scroll active link highlight
const links = document.querySelectorAll("nav a");

links.forEach(link=>{
  link.addEventListener("click",()=>{
    links.forEach(l=>l.classList.remove("active"));
    link.classList.add("active");
  });
});


// =======================
// 🎯 CARD TILT EFFECT
// =======================
const card = document.querySelector('.card');

card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const rotateY = (x - rect.width / 2) / 10;
  const rotateX = (rect.height / 2 - y) / 10;

  card.style.transform = `
    rotateY(${rotateY}deg) 
    rotateX(${rotateX}deg)
  `;
});

card.addEventListener('mouseleave', () => {
  card.style.transform = `rotateY(0) rotateX(0)`;
});


// =======================
// 👋 BOY SCROLL EFFECT
// =======================
let lastScrollTop = 0;
const boy = document.querySelector(".About-img");

// initial setup via JS
boy.style.transition = "transform 0.4s ease, opacity 0.4s ease";

window.addEventListener("scroll", () => {
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  // prevent jitter
  if (Math.abs(currentScroll - lastScrollTop) < 5) return;

  if (currentScroll > lastScrollTop) {
    // 🔽 SCROLL DOWN → hide inside card
    boy.style.transform = "translateX(-120px)";
    boy.style.opacity = "0";
    boy.style.visibility = "hidden";
  } else {
    // 🔼 SCROLL UP → show again
    boy.style.transform = "translateX(0)";
    boy.style.opacity = "1";
    boy.style.visibility = "visible";
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});
