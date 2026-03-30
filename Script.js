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


const cards = document.querySelectorAll(".skill-card");
let current = 2; // center card

function updateStack() {
  cards.forEach((card, i) => {
    let offset = i - current;

    card.style.transform = `
      translateX(${offset * 120}px)
      scale(${1 - Math.abs(offset) * 0.15})
      rotateY(${offset * 10}deg)
    `;

    card.style.zIndex = 10 - Math.abs(offset);
    card.style.opacity = Math.abs(offset) > 2 ? 0 : 1;

    // active class
    card.classList.toggle("active", i === current);
  });
}

// initial load
updateStack();

// NEXT ➡️
document.getElementById("next").onclick = () => {
  current = (current + 1) % cards.length;
  updateStack();
};

// PREV ⬅️
document.getElementById("prev").onclick = () => {
  current = (current - 1 + cards.length) % cards.length;
  updateStack();
};

// CLICK CARD
cards.forEach((card, index) => {
  card.addEventListener("click", () => {
    current = index;
    updateStack();
  });
});
