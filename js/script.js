
const navbar = document.querySelector('.navbar');
const menu = document.getElementById('navbarMenu');
const backdrop = document.getElementById('menuBackdrop');

function toggleMenu() {
  const isOpen = menu.classList.contains('show');
  if (isOpen) {
    closeMenu();
  } else {
    menu.classList.add('show');
    backdrop.classList.add('show');
    navbar.classList.add('scrolled');
  }
}

function closeMenu() {
  menu.classList.remove('show');
  backdrop.classList.remove('show');
  if (window.scrollY < 50) {
    navbar.classList.remove('scrolled');
  }
}

// Close on ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeMenu();
  }
});

// Change navbar background on scroll
window.addEventListener('scroll', function() {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else if (!menu.classList.contains('show')) {
    navbar.classList.remove('scrolled');
  }
});
 // Fade-slide animation on scroll
 const elements = document.querySelectorAll('.fade-slide');

 const observer = new IntersectionObserver((entries) => {
     entries.forEach(entry => {
         if (entry.isIntersecting) {
             entry.target.classList.add('visible');
         }
     });
 }, { threshold: 0.2 });

 elements.forEach(el => observer.observe(el));

 const carousel = document.getElementById("carousel");
 const leftBtn = document.getElementById("leftBtn");
 const rightBtn = document.getElementById("rightBtn");

 let index = 0;

 function updateCarousel() {
  const card = carousel.querySelector(".card-ourwork");
  const cardWidth = card.offsetWidth + 20; // card + gap
  const containerWidth = carousel.parentElement.offsetWidth;

  // Use ceil so partially visible cards count as "one more"
  const visibleCards = Math.ceil(containerWidth / cardWidth);
  const totalCards = carousel.children.length;

  // Correct maxIndex so no white space appears
  const maxIndex = Math.max(0, totalCards - visibleCards);

  // clamp index
  if (index < 0) index = 0;
  if (index > maxIndex) index = maxIndex;

  carousel.style.transform = `translateX(${-index * cardWidth}px)`;

  // Enable/disable arrows
  leftBtn.disabled = index === 0;
  rightBtn.disabled = index === maxIndex;
}

 rightBtn.addEventListener("click", () => {
   index++;
   updateCarousel();
 });

 leftBtn.addEventListener("click", () => {
   index--;
   updateCarousel();
 });

 window.addEventListener("resize", updateCarousel);

 // Init
 updateCarousel();

 



 
 

