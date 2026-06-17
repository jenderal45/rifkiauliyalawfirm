const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
  counter.innerText = '0';
  const updateCounter = () => {
    const target = +counter.getAttribute('data-target');
    const c = +counter.innerText;
    const increment = target / 200;
    if (c < target) {
      counter.innerText = `${Math.ceil(c + increment)}`;
      setTimeout(updateCounter, 10);
    } else {
      counter.innerText = target + '+';
    }
  };
  updateCounter();
});

/* ===== SLIDER LOGIC ===== */
(function(){
  const track = document.getElementById('attorneyTrack');
  const dotsContainer = document.getElementById('sliderDots');
  const cards = track.querySelectorAll('.attorney-card');
  let current = 0;

  function getVisible(){
    const w = track.parentElement.offsetWidth;
    if(w < 560) return 1;
    if(w < 900) return 2;
    return 3;
  }

  function maxIndex(){
    return Math.max(0, cards.length - getVisible());
  }

  function buildDots(){
    dotsContainer.innerHTML = '';
    const total = maxIndex() + 1;
    for(let i = 0; i < total; i++){
      const d = document.createElement('button');
      d.className = 'slider-dot' + (i === current ? ' active' : '');
      d.setAttribute('aria-label', 'Slide ' + (i+1));
      d.onclick = () => goTo(i);
      dotsContainer.appendChild(d);
    }
  }

  function goTo(index){
    current = Math.max(0, Math.min(index, maxIndex()));
    const cardWidth = cards[0].offsetWidth + 24;
    track.style.transform = 'translateX(-' + (current * cardWidth) + 'px)';
    document.querySelectorAll('.slider-dot').forEach((d,i) => d.classList.toggle('active', i === current));
    document.querySelector('.slider-prev').disabled = current === 0;
    document.querySelector('.slider-next').disabled = current >= maxIndex();
  }

  window.slideAttorney = function(dir){ goTo(current + dir); };

  buildDots();
  goTo(0);
  window.addEventListener('resize', () => { buildDots(); goTo(Math.min(current, maxIndex())); });
})();

/* ===== MODAL LOGIC ===== */
function openAttorneyModal(){
  document.getElementById('attorneyModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeAttorneyModal(){
  document.getElementById('attorneyModal').classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => {
  if(e.key === 'Escape') closeAttorneyModal();
});

/* ================= SCRIPT ================= */
/* HEADER SCROLL */
const header=document.getElementById("header");
window.addEventListener("scroll",()=>{
  header.classList.toggle("scrolled",window.scrollY>60);
});

/* SIDEBAR MOBILE */
const hamburger=document.getElementById("hamburger");
const sidebar=document.getElementById("mobileSidebar");
const overlay=document.getElementById("overlay");

hamburger.onclick=()=>{
  sidebar.classList.add("active");
  overlay.classList.add("active");
};

overlay.onclick=closeSidebar;

document.querySelectorAll(".mobile-sidebar a").forEach(link=>{
  link.onclick=closeSidebar;
});

function closeSidebar(){
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
}

/* SMOOTH SCROLL */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if(target){
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

/* SMOOTH SIDEBAR ACTIVE */

(function() {
    // Ambil elemen berdasarkan ID di HTML kamu
    const hamburger = document.getElementById('hamburger');
    const mobileSidebar = document.getElementById('mobileSidebar');
    const closeSidebar = document.getElementById('closeSidebar');
    const overlay = document.getElementById('overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    // Fungsi Buka Menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            mobileSidebar.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Kunci scroll
        });
    }

    // Fungsi Tutup Menu
    function closeMenu() {
        mobileSidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // Aktifkan scroll
    }

    if (closeSidebar) closeSidebar.addEventListener('click', closeMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);

    // Tutup jika link diklik
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
})();