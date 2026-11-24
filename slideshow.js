/* #ASTogether cinematic 3-photo cover slideshow */
(() => {
  const hero = document.querySelector('.hero-photo');
  if (!hero) return;

  const photos = ['assets/cover-1.jpg', 'assets/cover-2.jpg', 'assets/cover-3.jpg'];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const style = document.createElement('style');
  style.textContent = `
    .hero-photo.ast-slideshow {
      position: absolute; inset: 0; overflow: hidden;
      isolation: isolate; background-image: none !important;
    }
    .hero-photo.ast-slideshow .ast-slide {
      position: absolute; inset: 0; z-index: 0;
      background-position: center 48%; background-size: cover; background-repeat: no-repeat;
      opacity: 0; transform: scale(1.035);
      transition: opacity 1500ms ease-in-out, transform 9000ms ease-out;
      will-change: opacity, transform;
    }
    .hero-photo.ast-slideshow .ast-slide.is-visible {
      opacity: 1; transform: scale(1.105);
    }
    .hero-pagination {
      position: absolute; z-index: 4; left: 50%; bottom: 30px;
      transform: translateX(-50%); display: flex; gap: 8px;
    }
    .hero-pagination span {
      display: block; width: 5px; height: 5px; border-radius: 50%;
      background: #ffffff70; transition: background 400ms ease, transform 400ms ease;
    }
    .hero-pagination span.is-current {
      background: #d1b77f; transform: scale(1.45);
    }
    @media (prefers-reduced-motion: reduce) {
      .hero-photo.ast-slideshow .ast-slide { transition: none; transform: none; }
    }
  `;
  document.head.appendChild(style);
  hero.classList.add('ast-slideshow');
  hero.style.backgroundImage = 'none';

  const layers = photos.map((src, index) => {
    const layer = document.createElement('div');
    layer.className = 'ast-slide' + (index === 0 ? ' is-visible' : '');
    layer.setAttribute('aria-hidden', 'true');
    layer.style.backgroundImage = `url("${src}")`;
    hero.appendChild(layer);
    return layer;
  });

  photos.forEach(src => { const img = new Image(); img.src = src; });

  const dots = [...document.querySelectorAll('.hero-pagination span')];
  let active = 0;
  if (dots.length) dots[0].classList.add('is-current');

  const show = next => {
    layers[active].classList.remove('is-visible');
    if (dots[active]) dots[active].classList.remove('is-current');
    active = next;
    layers[active].classList.add('is-visible');
    if (dots[active]) dots[active].classList.add('is-current');
  };

  if (!reduceMotion) window.setInterval(() => show((active + 1) % layers.length), 6500);
})();
