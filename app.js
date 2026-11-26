(() => {
  const c = window.WEDDING_CONFIG;
  const $ = (s) => document.querySelector(s);
  const ceremonyStart = '2027-01-30T10:00:00+07:00';
  document.querySelectorAll('[data-config]').forEach(el => { const v = c[el.dataset.config]; if (v !== undefined && v !== null) el.textContent = v; });
  const setBg = (selector, path) => { const el=$(selector); if(path) { const img=new Image(); img.onload=()=>el.style.backgroundImage=`url("${path}")`; img.src=path; } };
  setBg('.hero-photo',c.heroImage); setBg('.portrait-groom',c.groomImage); setBg('.portrait-bride',c.brideImage); setBg('.closing-photo',c.closingImage);
  $('#churchMap').href = 'https://maps.app.goo.gl/usV7tmp2LEyY8NKv5';
  const target = new Date(ceremonyStart).getTime();
  const pad = n => String(n).padStart(2,'0');
  function tick(){let d=Math.max(0,target-Date.now()); const days=Math.floor(d/86400000);d%=86400000;const h=Math.floor(d/3600000);d%=3600000;const m=Math.floor(d/60000);const s=Math.floor(d/1000)%60;$('#days').textContent=String(days).padStart(3,'0');$('#hours').textContent=pad(h);$('#minutes').textContent=pad(m);$('#seconds').textContent=pad(s);}
  tick();setInterval(tick,1000);
  const calendarTitle='Holy Matrimony of Andy & Stephanie', calendarDates='20270130T030000Z/20270130T060000Z', calendarLocation='GBI ROCK City Church Surabaya', calendarDescription='Dress Code: white, gold, emerald green';
  $('#countdownCalendarLink').href=`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(calendarTitle)}&dates=${calendarDates}&details=${encodeURIComponent(calendarDescription)}&location=${encodeURIComponent(calendarLocation)}`;
  const form=$('#rsvpForm'), status=$('#formStatus'), list=$('#wishesList');
  function safeText(tag,text,cls){const el=document.createElement(tag);if(cls)el.className=cls;el.textContent=text;return el;}
  function renderWishes(items){list.replaceChildren();if(!items?.length){list.append(safeText('p','Your warm wishes will appear here.','empty-wishes'));return;}items.slice().reverse().forEach(item=>{if(!item.message)return;const card=document.createElement('article');card.className='wish-card';card.append(safeText('p',item.message,'wish-message'),safeText('span',item.fullName||'A friend','wish-author'));list.append(card);});}
  function loadWishes(){if(!c.appsScriptUrl)return;const cb='astWishes_'+Date.now();window[cb]=(data)=>{if(data&&data.ok)renderWishes(data.wishes||[]);delete window[cb];script.remove();};const script=document.createElement('script');script.src=c.appsScriptUrl+'?action=list&callback='+cb+'&t='+Date.now();script.onerror=()=>{delete window[cb];script.remove();console.warn('Could not refresh wishes');};document.body.append(script);}
  form.addEventListener('submit',async e=>{e.preventDefault();if(!c.appsScriptUrl){status.textContent='RSVP is not connected yet. Please contact the couple directly.';return;}const data=Object.fromEntries(new FormData(form).entries());if(data.attendance==='Not Attending')data.guestCount='0';status.textContent='Sending your response…';const button=form.querySelector('button');button.disabled=true;try{const body=new URLSearchParams({...data,action:'submit'});await fetch(c.appsScriptUrl,{method:'POST',mode:'no-cors',body});status.textContent='Thank you. Your RSVP has been received.';form.reset();$('#guestCount').value='1';setTimeout(loadWishes,1800);}catch(err){status.textContent='Unable to submit right now. Please try again.';}finally{button.disabled=false;}});
  $('#rsvpForm select[name="attendance"]').addEventListener('change',e=>{const sel=$('#guestCount');sel.disabled=e.target.value==='Not Attending';if(sel.disabled)sel.value='1';});
  
document.querySelectorAll('[data-copy-account]').forEach(button => {
  button.addEventListener('click', async () => {
    const account = button.dataset.copyAccount;
    const originalText = button.textContent;

    try {
      await navigator.clipboard.writeText(account);
      button.textContent = 'COPIED!';
    } catch (error) {
      button.textContent = 'COPY FAILED';
    }

    setTimeout(() => {
      button.textContent = originalText;
    }, 2000);
  });
});
