/* ==========================================================================
   Stackframe — Blog listing: search + category filter
   ========================================================================== */

(function () {
  'use strict';

  var grid = document.getElementById('article-grid');
  var searchInput = document.getElementById('blog-search');
  var pills = document.querySelectorAll('.filter-pill');
  var noResults = document.getElementById('no-results');

  if (!grid) return;

  var cards = Array.prototype.slice.call(grid.querySelectorAll('.article-card'));
  var activeCategory = 'all';

  function applyFilters() {
    var query = (searchInput.value || '').trim().toLowerCase();
    var visibleCount = 0;

    cards.forEach(function (card) {
      var category = card.getAttribute('data-category');
      var title = card.getAttribute('data-title') || '';
      var matchesCategory = activeCategory === 'all' || category === activeCategory;
      var matchesQuery = title.indexOf(query) !== -1;
      var visible = matchesCategory && matchesQuery;

      card.style.display = visible ? '' : 'none';
      if (visible) visibleCount++;
    });

    noResults.classList.toggle('is-visible', visibleCount === 0);
  }

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }

  pills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      pills.forEach(function (p) { p.setAttribute('aria-pressed', 'false'); });
      pill.setAttribute('aria-pressed', 'true');
      activeCategory = pill.getAttribute('data-filter');
      applyFilters();
    });
  });
})();
