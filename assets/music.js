/* #ASTogether opening interaction + background music */
(() => {
  const audio = new Audio('assets/wedding-music.mp3');
  audio.loop = true;
  audio.preload = 'none';

  const style = document.createElement('style');
  style.textContent = `
    .ast-open-screen {
      position: absolute; inset: 0; z-index: 6; display: grid; place-items: center;
      padding: 24px; background: #17271d55; text-align: center;
      transition: opacity .7s ease, visibility .7s ease;
    }
    .ast-open-screen.is-opening { opacity: 0; visibility: hidden; pointer-events: none; }
    .ast-open-content { color: #fff; display: grid; justify-items: center; gap: 18px; }
    .ast-open-content p { margin: 0; color: #e5ddcc; font: italic 22px 'Cormorant Garamond', Georgia, serif; }
    .ast-open-button {
      min-width: 190px; min-height: 48px; border: 1px solid #d1b77f; padding: 14px 22px;
      background: #263b33eF; color: #fff; cursor: pointer;
      font: 600 9px 'DM Sans', Arial, sans-serif; letter-spacing: .2em;
    }
    .ast-music-toggle {
      position: fixed; z-index: 12; right: max(18px, env(safe-area-inset-right));
      bottom: max(18px, env(safe-area-inset-bottom)); border: 1px solid #d1b77f;
      border-radius: 999px; padding: 12px 16px; background: #263b33ef; color: #fff;
      font: 600 9px 'DM Sans', Arial, sans-serif; letter-spacing: .14em;
      cursor: pointer; box-shadow: 0 5px 20px #0002; backdrop-filter: blur(8px);
    }
    .ast-music-toggle[hidden] { display: none; }
    .ast-music-toggle:focus-visible, .ast-open-button:focus-visible {
      outline: 2px solid #d1b77f; outline-offset: 3px;
    }
    @media (max-width: 700px) {
      .ast-open-content p { font-size: 20px; }
      .ast-open-button { min-height: 48px; }
    }
  `;
  document.head.appendChild(style);

  const hero = document.querySelector('.hero');
  if (!hero) return;

  const openScreen = document.createElement('div');
  openScreen.className = 'ast-open-screen';
  openScreen.innerHTML = `
    <div class="ast-open-content">
      <p>Andy &amp; Stephanie</p>
      <button class="ast-open-button" type="button">OPEN INVITATION <span aria-hidden="true">↗</span></button>
    </div>
  `;
  hero.appendChild(openScreen);

  const musicButton = document.createElement('button');
  musicButton.type = 'button';
  musicButton.className = 'ast-music-toggle';
  musicButton.textContent = '♪ PLAY MUSIC';
  musicButton.setAttribute('aria-label', 'Play background music');
  musicButton.hidden = true;
  document.body.appendChild(musicButton);

  let musicStarted = false;
  const startMusic = async () => {
    if (musicStarted) return;
    audio.preload = 'auto';
    try {
      await audio.play();
      musicStarted = true;
      musicButton.textContent = 'Ⅱ PAUSE MUSIC';
      musicButton.setAttribute('aria-label', 'Pause background music');
      musicButton.hidden = false;
    } catch (error) {
      // Autoplay may still be denied by the browser or audio asset may not load.
      musicButton.hidden = false;
      musicButton.textContent = '♪ PLAY MUSIC';
    }
  };

  openScreen.querySelector('.ast-open-button').addEventListener('click', async () => {
    openScreen.classList.add('is-opening');
    await startMusic();
    window.setTimeout(() => openScreen.remove(), 750);
  });

  audio.addEventListener('error', () => {
    musicButton.hidden = false;
    musicButton.textContent = '♪ MUSIC UNAVAILABLE';
  });

  musicButton.addEventListener('click', async () => {
    if (audio.paused) {
      try {
        await audio.play();
        musicStarted = true;
        musicButton.textContent = 'Ⅱ PAUSE MUSIC';
        musicButton.setAttribute('aria-label', 'Pause background music');
      } catch (error) {
        musicButton.textContent = '♪ MUSIC UNAVAILABLE';
      }
    } else {
      audio.pause();
      musicButton.textContent = '♪ PLAY MUSIC';
      musicButton.setAttribute('aria-label', 'Play background music');
    }
  });
})();
