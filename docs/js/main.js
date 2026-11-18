document.getElementById('year').textContent = new Date().getFullYear();

const navToggle = document.getElementById('nav-toggle');
const siteNav = document.getElementById('site-nav');
const header = document.querySelector('.site-header');

navToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
  if (document.body.classList.contains('home')) header.classList.add('scrolled');
});

siteNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Home page: transparent header over the hero video, solid RSG blue once scrolled
if (document.body.classList.contains('home') && header) {
  const onScroll = () => {
    if (siteNav.classList.contains('open')) return;
    header.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Hero background video: widescreen cut on desktop, vertical cut on phones
const heroVideo = document.getElementById('hero-video');
if (heroVideo) {
  const mq = window.matchMedia('(max-width: 767px)');
  const pick = () => {
    const tall = mq.matches;
    const src = heroVideo.dataset[tall ? 'tall' : 'wide'];
    if (heroVideo.getAttribute('src') === src) return;
    heroVideo.poster = heroVideo.dataset[tall ? 'tallPoster' : 'widePoster'];
    heroVideo.src = src;
    heroVideo.play().catch(() => {});
  };
  pick();
  mq.addEventListener ? mq.addEventListener('change', pick) : mq.addListener(pick);
}
