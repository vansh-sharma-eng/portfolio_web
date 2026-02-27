window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;

  document.querySelector('.progress-bar').style.width = scrollPercent + '%';
});
function downloadResume() {
  if (confirm("Do you want to download the resume?")) {
    const link = document.createElement('a');
    link.href = 'My.resume.pdf'; // your PDF path
    link.download = 'Vansh_Sharma_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
document.title = "Vansh's Portfolio";

const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

let links = document.querySelectorAll('.nav-link');
links.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('show');
  });
});

let alertBox = document.getElementById('custom-alert');
let alertMsg = document.getElementById('alert-message');
let closeBtn = document.getElementById('close-alert');

let alertOpen = false;
let clickCount = 0;

links.forEach(function(link){
    link.addEventListener('click', function(e){
        let targetId = this.getAttribute('href').slice(1);
        let section = document.getElementById(targetId);
        
        let sectionTop = section.offsetTop;
        let scrollTop = window.scrollY;

        if(alertOpen){
            e.preventDefault();
            clickCount++;
            if(clickCount >= 3){
                alertMsg.textContent = "Please click OK before doing anything else!";
            }
            return;
        }

        if(Math.abs(scrollTop - sectionTop) < 10){
            e.preventDefault();
            alertMsg.textContent = "You are already on the " + targetId + " section!";
            alertBox.style.display = "block";
            alertOpen = true;
            clickCount = 0;
        }
    });
});

closeBtn.addEventListener('click', function(){
    alertBox.style.display = "none";
    alertOpen = false;
    clickCount = 0;
});

