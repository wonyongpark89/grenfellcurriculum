document.addEventListener('DOMContentLoaded',()=>{
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

 const reportHeight=()=>parent.postMessage({grenfellActivityHeight:document.documentElement.scrollHeight},location.origin); if('ResizeObserver' in window)new ResizeObserver(reportHeight).observe(document.body); reportHeight();
});
