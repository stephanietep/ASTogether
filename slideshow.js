/* #ASTogether: static cover, rotating prewedding gallery in section 01 */
(() => {
 const gallery=document.querySelector('.memory-slideshow'); if(!gallery)return;
 const photos=['assets/cover-1.jpg','assets/cover-2.jpg','assets/cover-3.jpg'];
 const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const layers=photos.map((src,i)=>{const el=document.createElement('div');el.className='memory-slide'+(i===0?' is-visible':'');el.setAttribute('aria-hidden','true');el.style.backgroundImage=`url("${src}")`;gallery.appendChild(el);const im=new Image();im.src=src;return el;});
 const nav=document.createElement('div');nav.className='memory-pagination';const dots=photos.map((_,i)=>{const d=document.createElement('span');if(!i)d.classList.add('is-current');nav.appendChild(d);return d;});gallery.appendChild(nav);
 let active=0;const show=n=>{layers[active].classList.remove('is-visible');dots[active].classList.remove('is-current');active=n;layers[active].classList.add('is-visible');dots[active].classList.add('is-current');};
 if(!reduceMotion)window.setInterval(()=>show((active+1)%layers.length),5000);
})();
