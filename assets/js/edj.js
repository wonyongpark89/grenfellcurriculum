(() => {
  'use strict';
  const explorer = document.querySelector('.edj-page');
  if (!explorer) return;
  const panels = [...explorer.querySelectorAll('[data-panel]')];
  const controls = [...explorer.querySelectorAll('[data-select]')];
  const known = new Set(panels.map(p => p.dataset.panel));
  function fromHash() {
    const raw = window.location.hash.slice(1).replace(/^panel-/, '');
    return known.has(raw) ? raw : 'overview';
  }
  let activeId = null;
  function show(id, focus = false) {
    if (!known.has(id)) id = 'overview';
    const changed = activeId !== id;
    const animate = activeId !== null && changed;
    activeId = id;
    panels.forEach(p => {
      p.hidden = p.dataset.panel !== id;
      p.classList.toggle('panel-enter', animate && !p.hidden);
    });
    controls.forEach(c => {
      if (c.dataset.select === id) c.setAttribute('aria-current', 'true');
      else c.removeAttribute('aria-current');
    });
    const current = document.getElementById('panel-' + id);
    if (changed) current.scrollTop = 0;
    explorer.dispatchEvent(new CustomEvent('edj:select', { detail: { id } }));
    if (focus) {
      current.focus({ preventScroll: true });
    }
  }
  controls.forEach(c => c.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const id = c.dataset.select;
    const hash = '#panel-' + id;
    if (window.location.hash !== hash) history.pushState(null, '', hash);
    show(id, true);
  }));
  explorer.addEventListener('edj:overview', () => {
    if (window.location.hash !== '#panel-overview') history.pushState(null, '', '#panel-overview');
    show('overview');
  });
  window.addEventListener('popstate', () => show(fromHash()));
  window.addEventListener('hashchange', () => show(fromHash()));
  document.documentElement.classList.add('js');
  show(fromHash());
})();
