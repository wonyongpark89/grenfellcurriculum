/*
  The Grenfell Curriculum — shared JavaScript
  ------------------------------------------
  - Mobile navigation toggle
  - Automatically sorted selected news cards
  - Resource repository search/filter controls
  - Footer year update
*/

(function () {
  const body = document.body;
  const navToggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-site-nav]');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = body.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.addEventListener('click', (event) => {
      if (event.target.closest('a')) {
        body.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && body.classList.contains('nav-open')) {
        body.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  const year = document.querySelector('[data-current-year]');
  if (year) year.textContent = new Date().getFullYear();

  // Selected updates shown on the home page.
  // Add future updates here; items marked selected: true will be sorted by date and displayed automatically.
  const NEWS_ITEMS = [
    {
      title: 'CPD course launched',
      date: '2026-04-01',
      displayDate: 'April 2026',
      summary: 'The free online course Teaching about Grenfell: Education and Social Justice after Disasters is available on Canvas.',
      href: 'https://canvas.instructure.com/courses/13952145/modules',
      external: true,
      linkText: 'Access the course',
      selected: true
    },
    {
      title: 'Pilot lesson completed in North Kensington',
      date: '2026-02-01',
      displayDate: 'February 2026',
      summary: 'A Year 5 pilot lesson explored remembrance through poetry, structured discussion and careful preparation.',
      href: 'resources/',
      linkText: 'See related outputs',
      selected: true
    },
    {
      title: 'Community recommendations report published',
      date: '2025-07-01',
      displayDate: 'July 2025',
      summary: 'The report sets out community-informed recommendations for what teaching about Grenfell should include and why it matters.',
      href: 'resources/',
      linkText: 'Find the report',
      selected: true
    },
    {
      title: 'Engineering ethics lesson pack added',
      date: '2026-05-19',
      displayDate: 'May 2026',
      summary: 'A KS4 Design &amp; Technology lesson pack, Engineering Ethics: When Buildings Fail, is now available with a scheme of work, slides and student activity sheet.',
      href: 'resources/#repository',
      linkText: 'Download the pack',
      selected: true
    }
  ];

  const newsList = document.querySelector('[data-news-list]');
  if (newsList) {
    const selectedNews = NEWS_ITEMS
      .filter((item) => item.selected)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 4);

    newsList.innerHTML = selectedNews.map((item) => {
      const attrs = item.external ? ' target="_blank" rel="noopener noreferrer"' : '';
      return `
        <article class="card news-card">
          <h3>${item.title}</h3>
          <p class="meta">${item.displayDate}</p>
          <p>${item.summary}</p>
          <a class="btn secondary" href="${item.href}"${attrs}>${item.linkText}</a>
        </article>`;
    }).join('');
  }

  // Searchable, filterable and paginated resources page.
  const PER_PAGE = 6;

  const resourceList = document.querySelector('[data-resource-list]');
  if (!resourceList) return;

  const cards = Array.from(resourceList.querySelectorAll('[data-resource-card]'));
  const searchInput = document.querySelector('[data-resource-search]');
  const filters = Array.from(document.querySelectorAll('[data-resource-filter]'));
  const resetButton = document.querySelector('[data-resource-reset]');
  const count = document.querySelector('[data-resource-count]');
  const pager = document.querySelector('[data-resource-pagination]');

  // Theme values are comma-separated on some cards; the other filters are single-value.
  const MULTI_VALUE_FILTERS = new Set(['theme']);
  let currentPage = 1;

  function normalise(value) {
    return String(value || '').trim().toLowerCase();
  }

  function splitValues(value) {
    return String(value || '')
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }

  function valuesForCard(card, key) {
    const raw = card.getAttribute('data-' + key) || '';
    return MULTI_VALUE_FILTERS.has(key) ? splitValues(raw) : (raw.trim() ? [raw.trim()] : []);
  }

  function populateFilterOptions() {
    filters.forEach((filter) => {
      const key = filter.dataset.resourceFilter;
      const currentValue = filter.value;
      const defaultOption = filter.querySelector('option[value=""]');
      const defaultText = defaultOption ? defaultOption.textContent : 'All';

      const values = Array.from(new Set(cards.flatMap((card) => valuesForCard(card, key))))
        .sort((a, b) => a.localeCompare(b, 'en-GB', { sensitivity: 'base' }));

      filter.innerHTML = '';

      const allOption = document.createElement('option');
      allOption.value = '';
      allOption.textContent = defaultText;
      filter.appendChild(allOption);

      values.forEach((value) => {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        filter.appendChild(option);
      });

      if (values.includes(currentValue)) filter.value = currentValue;
    });
  }

  function cardMatches(card) {
    const query = normalise(searchInput ? searchInput.value : '');
    const searchableText = normalise(card.dataset.search || card.textContent);

    if (query && !searchableText.includes(query)) return false;

    return filters.every((filter) => {
      const selectedValue = filter.value;
      if (!selectedValue) return true;

      const key = filter.dataset.resourceFilter;
      return valuesForCard(card, key)
        .some((cardValue) => normalise(cardValue) === normalise(selectedValue));
    });
  }

  function renderResources() {
    const matches = cards.filter(cardMatches);
    const total = matches.length;
    const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));

    currentPage = Math.min(Math.max(currentPage, 1), totalPages);

    const start = (currentPage - 1) * PER_PAGE;
    const end = start + PER_PAGE;

    cards.forEach((card) => {
      card.hidden = true;
    });

    matches.slice(start, end).forEach((card) => {
      card.hidden = false;
    });

    updateResourceCount(total, start);
    renderPagination(totalPages);
  }

  function updateResourceCount(total, start) {
    if (!count) return;

    if (total === 0) {
      count.textContent = 'No resources match your filters.';
      return;
    }

    const from = start + 1;
    const to = Math.min(start + PER_PAGE, total);
    const noun = total === 1 ? 'resource' : 'resources';
    count.textContent = `Showing ${from}–${to} of ${total} ${noun}`;
  }

  function createPageButton(label, page, options = {}) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'page-btn';
    button.textContent = label;

    if (options.disabled) button.disabled = true;
    if (options.current) button.setAttribute('aria-current', 'page');
    if (options.ariaLabel) button.setAttribute('aria-label', options.ariaLabel);

    if (!options.disabled && !options.current) {
      button.addEventListener('click', () => goToPage(page));
    }

    return button;
  }

  function renderPagination(totalPages) {
    if (!pager) return;

    pager.innerHTML = '';

    if (totalPages <= 1) {
      pager.hidden = true;
      return;
    }

    pager.hidden = false;

    pager.appendChild(createPageButton('‹ Prev', currentPage - 1, {
      disabled: currentPage === 1,
      ariaLabel: 'Previous page'
    }));

    for (let page = 1; page <= totalPages; page += 1) {
      pager.appendChild(createPageButton(String(page), page, {
        current: page === currentPage,
        ariaLabel: `Page ${page}`
      }));
    }

    pager.appendChild(createPageButton('Next ›', currentPage + 1, {
      disabled: currentPage === totalPages,
      ariaLabel: 'Next page'
    }));
  }

  function goToPage(page) {
    currentPage = page;
    renderResources();

    resourceList.scrollIntoView({ behavior: 'smooth', block: 'start' });

    if (count) {
      count.setAttribute('tabindex', '-1');
      count.focus({ preventScroll: true });
    }
  }

  function resetToFirstPageAndRender() {
    currentPage = 1;
    renderResources();
  }

  populateFilterOptions();

  if (searchInput) searchInput.addEventListener('input', resetToFirstPageAndRender);
  filters.forEach((filter) => filter.addEventListener('change', resetToFirstPageAndRender));

  if (resetButton) {
    resetButton.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      filters.forEach((filter) => {
        filter.value = '';
      });
      resetToFirstPageAndRender();
    });
  }

  renderResources();

})();
/*
  The Grenfell Curriculum — contact form
  --------------------------------------
  Sends the contact form to a Google Apps Script web app and verifies the
  submitter with Cloudflare Turnstile. The destination email address lives
  only in the Apps Script, never in this file.
*/
(function () {
  var form = document.querySelector('[data-contact-form]');
  if (!form) return;

  // Google Apps Script web app URL (see code.gs for deployment).
  var ENDPOINT = 'https://script.google.com/macros/s/AKfycbxvMBnIHKR1ncQuCswvFDBmHgKufVj6arybdEd7AhExDKdMU2WjGgmC371cDu748BLr/exec';

  var statusEl = form.querySelector('[data-cf-status]');
  var submitBtn = form.querySelector('[data-cf-submit]');
  var defaultLabel = submitBtn ? submitBtn.textContent : 'Send message';
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setStatus(type, message) {
    if (!statusEl) return;
    statusEl.hidden = false;
    statusEl.className = 'cf-status cf-status--' + type;
    statusEl.textContent = message;
  }

  function resetTurnstile() {
    try { if (window.turnstile) window.turnstile.reset(); } catch (err) { /* ignore */ }
  }

  function turnstileToken() {
    var field = form.querySelector('[name="cf-turnstile-response"]');
    if (field && field.value) return field.value;
    try { if (window.turnstile) return window.turnstile.getResponse(); } catch (err) { /* ignore */ }
    return '';
  }

  function value(selector) {
    var el = form.querySelector(selector);
    return el ? el.value.trim() : '';
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var name = value('#cf-name');
    var email = value('#cf-email');
    var message = value('#cf-message');
    var company = value('#cf-company'); // honeypot — should stay empty

    if (!name || !email || !message) {
      setStatus('error', 'Please complete every field before sending.');
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setStatus('error', 'Please enter a valid email address.');
      return;
    }

    var token = turnstileToken();
    if (!token) {
      setStatus('error', 'Please complete the verification challenge, then send.');
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
    }
    setStatus('pending', 'Sending your message…');

    // Sent as text/plain (no custom headers) so the browser treats this as a
    // "simple" request and skips the CORS pre-flight that Apps Script cannot answer.
    fetch(ENDPOINT, {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        email: email,
        message: message,
        company: company,
        token: token
      })
    })
      .then(function (response) {
        return response.json().catch(function () { return null; });
      })
      .then(function (result) {
        if (result && result.status === 'success') {
          form.reset();
          setStatus('success', result.message || 'Thank you — your message has been sent.');
        } else {
          setStatus('error', (result && result.message) || 'Sorry, something went wrong. Please try again.');
        }
      })
      .catch(function () {
        setStatus('error', 'Sorry, your message could not be sent. Please check your connection and try again.');
      })
      .then(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = defaultLabel;
        }
        resetTurnstile();
      });
  });
})();