/* Six portrait photographs for the full-page slideshow in section 01 */
(() => {
 const gallery=document.querySelector('.memory-slideshow'); if(!gallery)return;
 const photos=['assets/slide-1.jpg','assets/slide-2.jpg','assets/slide-3.jpg','assets/slide-4.jpg','assets/slide-5.jpg','assets/slide-6.jpg'];
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const layers=photos.map((src,i)=>{const el=document.createElement('div');el.className='memory-slide'+(i===0?' is-visible':'');el.setAttribute('aria-hidden','true');el.style.backgroundImage=`url("${src}")`;gallery.appendChild(el);const img=new Image();img.src=src;return el;});
 const nav=document.createElement('div');nav.className='memory-pagination';
 const dots=photos.map((_,i)=>{const d=document.createElement('span');if(i===0)d.classList.add('is-current');nav.appendChild(d);return d;});
 gallery.appendChild(nav);let active=0;
 const show=n=>{layers[active].classList.remove('is-visible');dots[active].classList.remove('is-current');active=n;layers[active].classList.add('is-visible');dots[active].classList.add('is-current');};
 if(!reduced)window.setInterval(()=>show((active+1)%layers.length),5000);
})();
