
// Temporary local progress only: stored in the learner's browser, not sent anywhere.
(function(){
  try{
    const key='grenfell_cpd_pages_viewed';
    const path=location.pathname.split('/').pop();
    if(path && path.endsWith('.html')){
      const viewed=new Set(JSON.parse(localStorage.getItem(key)||'[]'));
      viewed.add(path);
      localStorage.setItem(key, JSON.stringify(Array.from(viewed)));
    }
  }catch(e){}
})();
