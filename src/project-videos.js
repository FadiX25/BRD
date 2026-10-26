// Add your video paths here, for example: src: '/videos/chantier-01.mp4'.
// Add or remove entries to change the number of slides.
const projects = [
  { title: 'Réalisation BRD · 01', src: '', poster: '' },
  { title: 'Réalisation BRD · 02', src: '', poster: '' },
  { title: 'Réalisation BRD · 03', src: '', poster: '' },
];

const carousel = document.querySelector('.project-carousel');
const track = carousel.querySelector('.project-video-track');
const dots = carousel.querySelector('.project-video-dots');
const previous = carousel.querySelector('[data-video-previous]');
const next = carousel.querySelector('[data-video-next]');
const counter = carousel.querySelector('.project-video-counter');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let active = 0;

projects.forEach((project, index) => {
  const slide = document.createElement('article');
  slide.className = 'project-video-slide';
  slide.setAttribute('role', 'group');
  slide.setAttribute('aria-roledescription', 'diapositive');
  slide.setAttribute('aria-label', `${index + 1} sur ${projects.length} : ${project.title}`);
  if (project.src) {
    const video = document.createElement('video');
    video.src = project.src;
    if (project.poster) video.poster = project.poster;
    video.controls = true;
    video.playsInline = true;
    video.preload = 'metadata';
    video.setAttribute('aria-label', project.title);
    video.addEventListener('play', () => {
      track.querySelectorAll('video').forEach(other => {
        if (other !== video) other.pause();
      });
    });
    video.addEventListener('ended', () => {
      // Skip empty video slots and stop after the last available video.
      if (active !== index) return;
      const nextVideo = projects.findIndex((item, i) => i > index && item.src);
      if (nextVideo !== -1) goTo(nextVideo);
    });
    slide.append(video);
  } else {
    const placeholder = document.createElement('div');
    placeholder.className = 'project-video-placeholder';
    placeholder.innerHTML = '<span class="video-placeholder-mark" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><rect x="3" y="5" width="13" height="14" rx="2"/><path d="m16 10 5-3v10l-5-3z"/></svg></span><span class="eyebrow">LES COULISSES DE BRD</span><h3></h3><p>Nos vidéos de chantier seront bientôt disponibles.</p><small>PROCHAINEMENT</small>';
    placeholder.querySelector('h3').textContent = project.title;
    slide.append(placeholder);
  }
  track.append(slide);
  const dot = document.createElement('button');
  dot.type = 'button';
  dot.setAttribute('aria-label', `Voir la vidéo ${index + 1}`);
  dot.addEventListener('click', () => goTo(index));
  dots.append(dot);
});

function update() {
  const index = Math.round(track.scrollLeft / track.clientWidth);
  active = Math.max(0, Math.min(projects.length - 1, index));
  previous.disabled = active === 0;
  next.disabled = active === projects.length - 1;
  counter.textContent = `${String(active + 1).padStart(2, '0')} / ${String(projects.length).padStart(2, '0')}`;
  [...dots.children].forEach((dot, i) => dot.setAttribute('aria-current', String(i === active)));
  [...track.children].forEach((slide, i) => {
    if (i !== active) slide.querySelector('video')?.pause();
  });
}

function goTo(index) {
  const target = Math.max(0, Math.min(projects.length - 1, index));
  track.scrollTo({ left: target * track.clientWidth, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
}

previous.addEventListener('click', () => goTo(active - 1));
next.addEventListener('click', () => goTo(active + 1));
track.addEventListener('scroll', update, { passive: true });
track.addEventListener('keydown', event => {
  if (event.target !== track) return;
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault();
    goTo(active + (event.key === 'ArrowRight' ? 1 : -1));
  }
});
new ResizeObserver(() => {
  track.scrollTo({ left: active * track.clientWidth, behavior: 'instant' });
}).observe(track);
update();
