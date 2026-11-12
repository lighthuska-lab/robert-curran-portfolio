const button = document.querySelector('#copy-email');
const status = document.querySelector('#copy-status');
button?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('robertmcurran0909@gmail.com');
    status.textContent = 'Email address copied.';
  } catch {
    status.textContent = 'Copy unavailable. Use the email link or select the address above.';
  }
});

const filterBar = document.querySelector('.project-filters');
if (filterBar) {
  const cards = [...document.querySelectorAll('.featured-card')];
  const filterStatus = document.querySelector('.filter-status');
  filterBar.hidden = false;
  filterBar.addEventListener('click', (event) => {
    const filter = event.target.closest('button[data-filter]');
    if (!filter) return;
    filterBar.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === filter)));
    cards.forEach(card => { card.hidden = filter.dataset.filter !== 'all' && card.dataset.category !== filter.dataset.filter; });
    filterStatus.textContent = `${cards.filter(card => !card.hidden).length} featured case studies shown.`;
  });
}
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.gauge-item, .featured-card, .career-card').forEach(element => {
    element.classList.add('reveal-ready');
    observer.observe(element);
  });
}
