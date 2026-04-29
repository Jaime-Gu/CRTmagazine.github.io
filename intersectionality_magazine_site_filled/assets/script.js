
const progress = document.querySelector('[data-progress]');
const updateProgress = () => {
  if (!progress) return;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = max > 0 ? (window.scrollY / max) * 100 : 0;
  progress.style.width = `${Math.min(ratio, 100)}%`;
};
window.addEventListener('scroll', updateProgress, {passive: true});
window.addEventListener('resize', updateProgress);
updateProgress();

const fades = document.querySelectorAll('.fade');
if (fades.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  fades.forEach(el => io.observe(el));
}

const tocLinks = document.querySelectorAll('[data-toc-link]');
const headings = document.querySelectorAll('[data-section-heading]');
if (tocLinks.length && headings.length) {
  const setActive = (id) => {
    tocLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
  };
  const obs = new IntersectionObserver((entries) => {
    const visible = [...entries].filter(e => e.isIntersecting).sort((a,b) => a.target.offsetTop - b.target.offsetTop);
    if (visible[0]) setActive(visible[0].target.id);
  }, { rootMargin: '-30% 0px -55% 0px', threshold: 0.01 });
  headings.forEach(h => obs.observe(h));
}
