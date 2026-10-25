// Course reading, reflection, glossary and immediate-feedback matching controls.
document.addEventListener('DOMContentLoaded',()=>{
 const menu=document.querySelector('.course-menu');
 document.querySelectorAll('.video-launch').forEach(button=>button.addEventListener('click',()=>{
  const frame=document.createElement('iframe');frame.src=button.dataset.video+'?autoplay=1';frame.title=button.dataset.title;frame.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';frame.allowFullscreen=true;button.replaceWith(frame);frame.focus();
 }));
 if(menu){
  const desktop=matchMedia('(min-width:801px)');
  const syncNavigation=()=>{menu.open=desktop.matches};
  syncNavigation();desktop.addEventListener('change',syncNavigation);
 }
 document.querySelectorAll('.mobile-outline a').forEach(a=>a.addEventListener('click',()=>a.closest('details').open=false));
 document.querySelectorAll('.copy-note').forEach(button=>button.addEventListener('click',async()=>{
  const field=button.closest('details'),area=field.querySelector('textarea'),status=field.querySelector('[role=status]');
  try{await navigator.clipboard.writeText(area.value);status.textContent='Notes copied.'}
  catch{area.focus();area.select();status.textContent='Your notes are selected. Press Ctrl+C or Command+C to copy.'}
 }));
 const observed=document.querySelectorAll('.reader>section[id]');
 if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>{
   entries.filter(e=>e.isIntersecting).forEach(e=>{
    document.querySelectorAll('.page-outline a[aria-current]').forEach(a=>a.removeAttribute('aria-current'));
    const link=document.querySelector('.page-outline a[href="#'+e.target.id+'"]');if(link)link.setAttribute('aria-current','true');
   });
  },{rootMargin:'-10% 0px -65% 0px'});observed.forEach(s=>observer.observe(s));
 }
 const activity=document.querySelector('.connect-activity');
 if(activity){
  const buttons=[...activity.querySelectorAll('.connect-item')],solved=new Set(),timers=new Map();let selected=null;
  const announcement=activity.querySelector('#match-announcement'),completion=activity.querySelector('.matching-status');
  const announce=message=>{announcement.textContent=message};
  const render=()=>{
   buttons.forEach(button=>{
    const correct=solved.has(button.id);
    button.classList.toggle('is-selected',button===selected);button.classList.toggle('is-correct',correct);
    button.setAttribute('aria-pressed',String(button===selected));button.setAttribute('aria-disabled',String(correct));
    button.setAttribute('aria-label',button.querySelector('.item-copy').textContent+(correct?' Correct match.':button===selected?' Selected.':''));
   });
   completion.textContent=solved.size===10?'All five matches found.':'';
  };
  buttons.forEach(button=>button.addEventListener('click',()=>{
   if(solved.has(button.id))return;
   if(button.dataset.side==='theme'){
    selected=selected===button?null:button;render();announce(selected?'Theme selected. Choose its matching statement on the right.':'Selection cancelled.');return;
   }
   if(!selected){announce('Select a theme on the left first.');return}
   if(selected.dataset.answer===button.dataset.id){
    if(timers.has(button)){clearTimeout(timers.get(button));timers.delete(button)}
    button.classList.remove('is-wrong');solved.add(selected.id);solved.add(button.id);selected=null;render();
    announce(solved.size===10?'All five matches found.':'Correct. Choose another theme.');
   }else{
    if(timers.has(button))clearTimeout(timers.get(button));
    button.classList.remove('is-wrong');void button.offsetWidth;button.classList.add('is-wrong');
    timers.set(button,setTimeout(()=>{button.classList.remove('is-wrong');timers.delete(button)},500));
    announce('That is not the suggested match. Try another statement.');
   }
  }));
  activity.querySelector('#reset-connections').addEventListener('click',()=>{
   timers.forEach(clearTimeout);timers.clear();buttons.forEach(b=>b.classList.remove('is-wrong'));solved.clear();selected=null;render();announce('Activity reset. Select a theme on the left.');buttons[0].focus();
  });
  activity.addEventListener('keydown',event=>{if(event.key==='Escape'){selected=null;render();announce('Selection cancelled.')}});
  render();
 }
 const search=document.querySelector('#glossary-search');
 if(search){
  const definitions=[...document.querySelectorAll('.definition')],groups=[...document.querySelectorAll('.glossary-group')],status=document.querySelector('#search-status'),empty=document.querySelector('.empty-state'),expand=document.querySelector('#expand-definitions');
  const filter=()=>{
   const query=search.value.trim().toLocaleLowerCase();let count=0;
   definitions.forEach(d=>{const show=d.dataset.search.includes(query);d.hidden=!show;if(show)count++});
   groups.forEach(g=>g.hidden=![...g.querySelectorAll('.definition')].some(d=>!d.hidden));
   empty.hidden=!!count;status.textContent=query?`${count} ${count===1?'term':'terms'} matching “${search.value.trim()}”`:'69 terms in five groups';
   expand.hidden=!count;expand.textContent='Expand definitions';
   document.querySelectorAll('.page-outline a[href^="#glossary-group-"],.mobile-outline a[href^="#glossary-group-"]').forEach(a=>{a.closest('li').hidden=document.querySelector(a.getAttribute('href')).hidden});
  };
  search.addEventListener('input',filter);
  document.querySelectorAll('.search-clear').forEach(button=>button.addEventListener('click',()=>{search.value='';filter();search.focus()}));
  expand.addEventListener('click',()=>{const visible=definitions.filter(d=>!d.hidden),open=visible.some(d=>!d.open);visible.forEach(d=>d.open=open);expand.textContent=open?'Collapse definitions':'Expand definitions'});
 }
});
