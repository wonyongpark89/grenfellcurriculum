(() => {
 'use strict';
 const explorer=document.querySelector('.edj-page');
 const figure=document.querySelector('.pack-figure');
 const buttons=[...document.querySelectorAll('[data-wheel-mode]')];
 const segments=[...document.querySelectorAll('.pack-wheel [data-select]')];
 const wheel=document.querySelector('.pack-wheel');
 function makeOutline(className){
   const path=document.createElementNS('http://www.w3.org/2000/svg','path');
   path.setAttribute('class',className);
   path.setAttribute('aria-hidden','true');
   wheel.append(path);
   return path;
 }
 // Draw above every sector so neighbouring fills cannot cover half a border.
 const selectionOutline=makeOutline('selection-outline');
 const focusOutline=makeOutline('focus-outline');
 function outline(path,segment){
   if(segment) path.setAttribute('d',segment.querySelector('.wedge').getAttribute('d'));
   else path.removeAttribute('d');
 }
 function setMode(mode){
   figure.dataset.mode=mode;
   buttons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.wheelMode===mode)));
 }
 function sync(id){
   const segment=segments.find(segment=>segment.dataset.select===id);
   outline(selectionOutline,segment);
   setMode(segment?(segment.dataset.ring==='do'?'do':'know'):id==='capacity-to-act'?'do':'all');
 }
 wheel.addEventListener('focusin',event=>{
   const segment=event.target.closest('.wheel-segment');
   outline(focusOutline,segment?.matches(':focus-visible')?segment:null);
 });
 wheel.addEventListener('focusout',()=>outline(focusOutline,null));
 explorer.addEventListener('edj:select',event=>sync(event.detail.id));
 buttons.forEach(button=>button.addEventListener('click',()=>{
   // Clear a component selection before switching the view of the whole wheel.
   explorer.dispatchEvent(new CustomEvent('edj:overview'));
   setMode(button.dataset.wheelMode);
   button.focus({preventScroll:true});
 }));
 sync(location.hash.replace('#panel-',''));
})();
