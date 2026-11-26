/* Opening interaction + personalized guest name + compact animated music-note control */
(() => {
 const audio=new Audio('assets/wedding-music.mp3');audio.loop=true;audio.preload='none';
 const hero=document.querySelector('.hero');if(!hero)return;
 const params=new URLSearchParams(window.location.search);
 const guestName=(params.get('to')||'Guest').trim().slice(0,120)||'Guest';
 const cover=document.createElement('div');cover.className='ast-open-screen';
 const content=document.createElement('div');content.className='ast-open-content';
 const greeting=document.createElement('p');greeting.className='ast-guest-greeting';greeting.textContent='Dear Mr./Mrs./Ms.';
 const name=document.createElement('p');name.className='ast-guest-name';name.textContent=guestName;
 const openButton=document.createElement('button');openButton.className='ast-open-button';openButton.type='button';openButton.innerHTML='OPEN INVITATION <span aria-hidden="true">↗</span>';
 content.append(greeting,name,openButton);cover.append(content);hero.appendChild(cover);
 const btn=document.createElement('button');btn.type='button';btn.className='ast-music-toggle';btn.textContent='♫';btn.setAttribute('aria-label','Play background music');btn.title='Play music';btn.hidden=true;document.body.appendChild(btn);
 const state=playing=>{btn.textContent='♫';btn.classList.toggle('is-playing',playing);btn.setAttribute('aria-label',playing?'Pause background music':'Play background music');btn.title=playing?'Pause music':'Play music';btn.hidden=false;};
 const play=async()=>{audio.preload='auto';try{await audio.play();state(true);}catch(e){state(false);}};
 openButton.addEventListener('click',async()=>{cover.classList.add('is-opening');await play();const first=document.querySelector('#invitation');if(first)first.scrollIntoView({behavior:'smooth',block:'start'});window.setTimeout(()=>cover.remove(),900);});
 audio.addEventListener('error',()=>{btn.hidden=false;state(false);});
 btn.addEventListener('click',async()=>{if(audio.paused)await play();else{audio.pause();state(false);}});
})();
