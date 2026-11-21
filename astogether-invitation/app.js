(() => {
  const c = window.WEDDING_CONFIG;
  const $ = (s) => document.querySelector(s);
  const fmtDate = (iso) => iso ? new Date(iso).toLocaleString('en-US',{dateStyle:'full',timeStyle:'short',timeZone:'Asia/Jakarta'}) : 'Saturday, 30 January 2027 · Time to be confirmed';
  document.querySelectorAll('[data-config]').forEach(el => { const v = c[el.dataset.config]; if (v !== undefined && v !== null) el.textContent = v; });
  const setBg = (selector, path) => { const el=$(selector); if(path) { const img=new Image(); img.onload=()=>el.style.backgroundImage=`url("${path}")`; img.src=path; } };
  setBg('.hero-photo',c.heroImage); setBg('.portrait-groom',c.groomImage); setBg('.portrait-bride',c.brideImage); setBg('.closing-photo',c.closingImage);
  const mapsUrl = address => address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}` : 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent('GBI ROCK Royal Residence Surabaya');
  $('#churchMap').href=mapsUrl(c.churchAddress || c.churchName+', Surabaya');
  $('#receptionMap').href=mapsUrl(c.receptionAddress || c.receptionName+', Surabaya');
  $('#venueMap').href=mapsUrl(c.churchAddress || c.churchName+', Surabaya');
  $('[data-config="ceremonyDateLabel"]').textContent=fmtDate(c.ceremonyDateTime);
  $('[data-config="receptionDateLabel"]').textContent=fmtDate(c.receptionDateTime);
  const toCal = () => {
    if (!c.ceremonyDateTime || !c.ceremonyEndDateTime) return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Wedding of Andy & Stephanie')}&dates=${c.date.replaceAll('-','')}/${new Date(new Date(c.date+'T00:00:00+07:00').getTime()+86400000).toISOString().slice(0,10).replaceAll('-','')}&details=${encodeURIComponent('Celebrate the wedding of Andy Surya & Stephanie Vanessa. #ASTogether')}&location=${encodeURIComponent(c.churchName+', '+(c.churchAddress||'Surabaya'))}`;
    const dates = d => new Date(d).toISOString().replaceAll(/[-:]/g,'').replace(/\.\d{3}/,'');
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Wedding of Andy & Stephanie')}&dates=${dates(c.ceremonyDateTime)}/${dates(c.ceremonyEndDateTime)}&details=${encodeURIComponent('With grateful hearts, Andy Surya & Stephanie Vanessa invite you to celebrate their wedding. #ASTogether')}&location=${encodeURIComponent(c.churchName+', '+c.churchAddress)}`;
  };
  $('#calendarLink').href=toCal();
  const target = c.ceremonyDateTime ? new Date(c.ceremonyDateTime).getTime() : new Date(c.date+'T00:00:00+07:00').getTime();
  const pad = n => String(n).padStart(2,'0');
  function tick(){let d=Math.max(0,target-Date.now()); const days=Math.floor(d/86400000);d%=86400000;const h=Math.floor(d/3600000);d%=3600000;const m=Math.floor(d/60000);const s=Math.floor(d/1000)%60;$('#days').textContent=String(days).padStart(3,'0');$('#hours').textContent=pad(h);$('#minutes').textContent=pad(m);$('#seconds').textContent=pad(s);}
  tick();setInterval(tick,1000);
  const form=$('#rsvpForm'), status=$('#formStatus'), list=$('#wishesList');
  function safeText(tag, text, cls){const el=document.createElement(tag);if(cls)el.className=cls;el.textContent=text;return el;}
  function renderWishes(items){list.replaceChildren();if(!items?.length){list.append(safeText('p','Your warm wishes will appear here.','empty-wishes'));return;}items.slice().reverse().forEach(item=>{if(!item.message) return;const card=document.createElement('article');card.className='wish-card';card.append(safeText('p',item.message,'wish-message'),safeText('span',item.fullName||'A friend','wish-author'));list.append(card);});}
  function loadWishes(){if(!c.appsScriptUrl)return;const cb='astWishes_'+Date.now();window[cb]=(data)=>{if(data&&data.ok)renderWishes(data.wishes||[]);delete window[cb];script.remove();};const script=document.createElement('script');script.src=c.appsScriptUrl+'?action=list&callback='+cb+'&t='+Date.now();script.onerror=()=>{delete window[cb];script.remove();console.warn('Could not refresh wishes');};document.body.append(script);}
  form.addEventListener('submit',async e=>{e.preventDefault();if(!c.appsScriptUrl){status.textContent='RSVP is not connected yet. Please contact the couple directly.';return;}const data=Object.fromEntries(new FormData(form).entries());if(data.attendance==='Not Attending')data.guestCount='0';status.textContent='Sending your response…';const button=form.querySelector('button');button.disabled=true;try{const body=new URLSearchParams({...data,action:'submit'});await fetch(c.appsScriptUrl,{method:'POST',mode:'no-cors',body});status.textContent='Thank you. Your RSVP has been received.';form.reset();$('#guestCount').value='1';setTimeout(loadWishes,1800);}catch(err){status.textContent='Unable to submit right now. Please try again.';}finally{button.disabled=false;}});
  $('#rsvpForm select[name="attendance"]').addEventListener('change',e=>{const sel=$('#guestCount');sel.disabled=e.target.value==='Not Attending';if(sel.disabled)sel.value='1';});
  $('#copyBank').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(c.bankAccount);$('#copyBank').textContent='COPIED';}catch(e){$('#copyBank').textContent='COPY NOT AVAILABLE';}});
  loadWishes(); if(c.appsScriptUrl)setInterval(loadWishes,30000);
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
})();
