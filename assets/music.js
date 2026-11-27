
/* ASTogether: Full-screen opening cover, locked scroll and background music */
(() => {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const audio = new Audio('assets/wedding-music.mp3');
  audio.loop = true;
  audio.preload = 'none';

  const params = new URLSearchParams(window.location.search);
  const guestName = (params.get('to') || 'Guest').trim().slice(0, 120) || 'Guest';

  // Lock the page until the invitation is opened.
  document.documentElement.classList.add('ast-cover-locked');
  document.body.classList.add('ast-cover-locked');

  // Build the personalized opening cover.
  const cover = document.createElement('div');
  cover.className = 'ast-open-screen';

  const content = document.createElement('div');
  content.className = 'ast-open-content';

  const greeting = document.createElement('p');
  greeting.className = 'ast-guest-greeting';
  greeting.textContent = 'Dear Mr./Mrs./Ms.';

  const name = document.createElement('p');
  name.className = 'ast-guest-name';
  name.textContent = guestName;

  const openButton = document.createElement('button');
  openButton.className = 'ast-open-button';
  openButton.type = 'button';
  openButton.innerHTML = 'OPEN INVITATION <span aria-hidden="true">↗</span>';

  content.append(greeting, name, openButton);
  cover.append(content);
  hero.appendChild(cover);

  // Music control.
  const musicButton = document.createElement('button');
  musicButton.type = 'button';
  musicButton.className = 'ast-music-toggle';
  musicButton.textContent = '♫';
  musicButton.setAttribute('aria-label', 'Play background music');
  musicButton.title = 'Play music';
  musicButton.hidden = true;
  document.body.appendChild(musicButton);

  const updateMusicButton = (playing) => {
    musicButton.textContent = '♫';
    musicButton.classList.toggle('is-playing', playing);
    musicButton.setAttribute(
      'aria-label',
      playing ? 'Pause background music' : 'Play background music'
    );
    musicButton.title = playing ? 'Pause music' : 'Play music';
    musicButton.hidden = false;
  };

  const playMusic = async () => {
    audio.preload = 'auto';
    try {
      await audio.play();
      updateMusicButton(true);
    } catch (error) {
      updateMusicButton(false);
    }
  };

  // Open the invitation.
  openButton.addEventListener('click', () => {
    if (openButton.disabled) return;
    openButton.disabled = true;

    // Start music directly from the user's click.
    playMusic();

    // Slide the entire cover upwards.
    hero.classList.add('ast-cover-exiting');

    // Remove the cover permanently after the animation.
    window.setTimeout(() => {
      hero.remove();

      document.documentElement.classList.remove('ast-cover-locked');
      document.body.classList.remove('ast-cover-locked');

      // The monogram now leads to the invitation, not the removed cover.
      const homeLink = document.querySelector('.topbar .wordmark');
      if (homeLink) homeLink.href = '#invitation';

      const invitation = document.querySelector('#invitation');
      if (invitation) {
        window.scrollTo({
          top: invitation.offsetTop,
          behavior: 'instant'
        });
      }
    }, 900);
  });

  // Music toggle after the cover has been opened.
  musicButton.addEventListener('click', async () => {
    if (audio.paused) {
      await playMusic();
    } else {
      audio.pause();
      updateMusicButton(false);
    }
  });

  audio.addEventListener('error', () => {
    updateMusicButton(false);
  });
})();
