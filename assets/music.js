/* #ASTogether opening interaction and compact floating music control */
(() => {
 const audio=new Audio('assets/wedding-music.mp3');audio.loop=true;audio.preload='none';
 const hero=document.querySelector('.hero');if(!hero)return;
 const cover=document.createElement('div');cover.className='ast-open-screen';cover.innerHTML='<div class="ast-open-content"><button class="ast-open-button" type="button">OPEN INVITATION <span aria-hidden="true">↗</span></button></div>';hero.appendChild(cover);
 const btn=document.createElement('button');btn.type='button';btn.className='ast-music-toggle';btn.textContent='♫';btn.setAttribute('aria-label','Play background music');btn.title='Play music';btn.hidden=true;document.body.appendChild(btn);
 const state=playing=>{btn.textContent=playing?'Ⅱ':'♫';btn.setAttribute('aria-label',playing?'Pause background music':'Play background music');btn.title=playing?'Pause music':'Play music';btn.hidden=false;};
 const play=async()=>{audio.preload='auto';try{await audio.play();state(true);}catch(e){state(false);}};
 cover.querySelector('button').addEventListener('click',async()=>{cover.classList.add('is-opening');await play();const first=document.querySelector('#invitation');if(first)first.scrollIntoView({behavior:'smooth',block:'start'});window.setTimeout(()=>cover.remove(),700);});
 audio.addEventListener('error',()=>{btn.hidden=false;btn.textContent='!';btn.title='Music unavailable';});
 btn.addEventListener('click',async()=>{if(audio.paused)await play();else{audio.pause();state(false);}});
})();
