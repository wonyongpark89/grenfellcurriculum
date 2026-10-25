/* Homepage updates share the existing news.js source; HTML remains a fallback. */
(() => {
  const section = document.querySelector('.news .wrap');
  const button = section?.querySelector('.more-updates');
  if (!section || !button) return;
  const items = window.GRENFELL_NEWS_ITEMS;
  const arrow = () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    const path = document.createElementNS(svg.namespaceURI, 'path');
    path.setAttribute('d', 'M4 12h15m-6-6 6 6-6 6');
    svg.append(path);
    return svg;
  };
  if (Array.isArray(items) && items.length) {
    const fragment = document.createDocumentFragment();
    [...items].sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(item => {
      const article = document.createElement('article');
      article.className = 'update';
      const time = document.createElement('time');
      time.dateTime = item.date;
      time.textContent = item.displayDate;
      const content = document.createElement('div');
      const heading = document.createElement('h3');
      const link = document.createElement('a');
      link.href = item.href;
      link.textContent = item.title;
      heading.append(link);
      const paragraph = document.createElement('p');
      paragraph.textContent = item.summary.replaceAll('&amp;', '&');
      const action = document.createElement('a');
      action.className = 'text-link';
      action.href = item.href;
      action.append(document.createTextNode(item.linkText), arrow());
      content.append(heading, paragraph, action);
      article.append(time, content);
      fragment.append(article);
    });
    section.querySelectorAll('.update').forEach(article => article.remove());
    section.insertBefore(fragment, button);
  }
  const articles = [...section.querySelectorAll('.update')];
  articles.forEach((article, index) => { article.hidden = index >= 4; });
  button.hidden = articles.length <= 4;
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    articles.forEach((article, index) => { if (index >= 4) article.hidden = expanded; });
    button.setAttribute('aria-expanded', String(!expanded));
    button.textContent = expanded ? 'Show earlier updates' : 'Show fewer updates';
  });
  const menu = document.querySelector('details.menu');
  menu?.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      menu.open = false;
      menu.querySelector('summary').focus();
    }
  });
})();
