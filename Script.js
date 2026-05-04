
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

const navbar = document.querySelector(".navbar");

let lastScroll = 0;
let hideTimeout;


function showNavbar() {
  navbar.style.transform = "translateY(0)";
}


function hideNavbar() {
  navbar.style.transform = "translateY(-100%)";
}


window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > lastScroll) {
    hideNavbar(); 
  } else {
    showNavbar(); 
  }

  lastScroll = currentScroll;

  resetIdleTimer();
});


document.addEventListener("mousemove", () => {
  showNavbar();
  resetIdleTimer();
});


function resetIdleTimer() {
  clearTimeout(hideTimeout);

  hideTimeout = setTimeout(() => {
    hideNavbar();
  }, 3000); 
}

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target); 
    }
  });
}, {
  threshold: 0.2
});

sections.forEach(section => {
  observer.observe(section);
});
