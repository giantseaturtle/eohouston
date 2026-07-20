/* EO Houston shared header/footer/interactions */
(function () {
  var page = document.body.getAttribute('data-page') || '';

  var EO_MARK = '<svg class="eo-mark" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<g stroke-linecap="round" stroke-width="5.5">' +
    '<circle cx="50" cy="50" r="42" stroke="#FF4E6A" stroke-dasharray="175 264" transform="rotate(-35 50 50)"/>' +
    '<circle cx="50" cy="50" r="34" stroke="#FF8A3D" stroke-dasharray="150 214" transform="rotate(70 50 50)"/>' +
    '<circle cx="50" cy="50" r="26" stroke="#FFC23D" stroke-dasharray="105 163" transform="rotate(175 50 50)"/>' +
    '<circle cx="50" cy="50" r="18" stroke="#1FC7B6" stroke-dasharray="80 113" transform="rotate(-90 50 50)"/>' +
    '<circle cx="50" cy="50" r="10" stroke="#2E7DEE" stroke-dasharray="45 63" transform="rotate(40 50 50)"/>' +
    '<circle cx="50" cy="50" r="4" fill="#8A5CF6" stroke="none"/></g></svg>';

  var LINKS = [
    ['/', 'Home', 'home'],
    ['/about', 'About', 'about'],
    ['/leadership', 'Leadership', 'leadership'],
    ['/events', 'Events', 'events'],
    ['/join', 'Join', 'join'],
    ['/partners', 'Partners', 'partners'],
    ['https://eomomentum.com', 'Momentum', 'momentum', true]
  ];
  var MEMBER_LOGIN = 'https://eohouston.chapterpro.com/index.php?frontend=1';
  var IG = 'https://www.instagram.com/eohouston/';

  function navLinks(mobile) {
    return LINKS.map(function (l) {
      var ext = l[3] ? ' target="_blank" rel="noopener"' : '';
      var cls = (l[3] ? 'ext' : '') + (page === l[2] ? ' active' : '');
      return '<a href="' + l[0] + '"' + ext + (cls.trim() ? ' class="' + cls.trim() + '"' : '') + '>' + l[1] + '</a>';
    }).join('');
  }

  document.getElementById('site-header').innerHTML =
    '<header class="site-header"><div class="container header-inner">' +
      '<a class="brand" href="/">' + EO_MARK +
        '<span>EO Houston<small>Entrepreneurs’ Organization</small></span></a>' +
      '<nav class="nav">' + navLinks() + '</nav>' +
      '<div class="header-actions">' +
        '<a class="header-login" href="' + MEMBER_LOGIN + '" target="_blank" rel="noopener">Member Login</a>' +
        '<a class="btn btn-pink" href="/refer">Refer a Member</a>' +
        '<a class="btn btn-accent" href="/join">Join EO Houston</a>' +
      '</div>' +
      '<a class="header-login-mobile" href="' + MEMBER_LOGIN + '" target="_blank" rel="noopener">' +
        '<span class="lm-full">Member Login</span><span class="lm-short">Sign In</span></a>' +
      '<button class="nav-toggle" aria-label="Menu"><span></span><span></span><span></span></button>' +
    '</div>' +
    '<div class="mobile-nav" id="mnav">' + navLinks(true) +
      '<a href="/refer">Refer a Member</a>' +
      '<a href="' + MEMBER_LOGIN + '" target="_blank" rel="noopener">Member Login</a>' +
      '<a class="btn btn-accent" href="/join">Join EO Houston</a></div></header>';

  var tgl = document.querySelector('.nav-toggle'), mn = document.getElementById('mnav');
  if (tgl) tgl.addEventListener('click', function () { mn.style.display = (mn.style.display === 'flex' ? 'none' : 'flex'); });

  document.getElementById('site-footer').innerHTML =
    '<footer class="site-footer"><div class="container">' +
      '<div class="footer-grid">' +
        '<div class="footer-brand">' +
          '<a class="brand" href="/">' + EO_MARK + '<span>EO Houston<small>Entrepreneurs’ Organization</small></span></a>' +
          '<p>A community of Houston business owners learning, growing, and connecting through the global Entrepreneurs’ Organization.</p></div>' +
        '<div><h4>Explore</h4>' +
          '<a href="/about">About EO</a><a href="/leadership">Leadership</a>' +
          '<a href="/events">Events</a><a href="/partners">Partners</a><a href="/join">Join EO Houston</a>' +
          '<a href="' + IG + '" target="_blank" rel="noopener">Instagram ↗</a></div>' +
        '<div><h4>Programs</h4>' +
          '<a href="https://eomomentum.com" target="_blank" rel="noopener">EO Momentum ↗</a>' +
          '<a href="' + MEMBER_LOGIN + '" target="_blank" rel="noopener">Member Login ↗</a>' +
          '<a href="/refer">Refer a Member</a>' +
          '<a href="https://www.eonetwork.org" target="_blank" rel="noopener">EO Global ↗</a>' +
          '<a href="/join">Become a Member</a></div>' +
        '<div><h4>Compare</h4>' +
          '<a href="/eo-vs-ypo" style="white-space:nowrap">EO vs. YPO</a>' +
          '<a href="/eo-vs-vistage" style="white-space:nowrap">EO vs. Vistage</a>' +
          '<a href="/eo-vs-tiger21" style="white-space:nowrap">EO vs. TIGER 21</a>' +
          '<a href="/eo-vs-goldman-sachs" style="white-space:nowrap">EO vs. Goldman Sachs</a></div>' +
      '</div>' +
      '<div class="footer-bottom"><span>© ' + '2026 EO Houston, a chapter of the Entrepreneurs’ Organization. · Houston, Texas</span></div>' +
    '</div></footer>';

  /* lightbox for any .masonry img or [data-lightbox], with gallery next/prev */
  var lb = document.createElement('div');
  lb.className = 'lb';
  lb.innerHTML = '<button class="lb-nav lb-prev" aria-label="Previous image">‹</button>' +
    '<img alt="">' +
    '<button class="lb-nav lb-next" aria-label="Next image">›</button>' +
    '<button class="lb-close" aria-label="Close">×</button>';
  document.body.appendChild(lb);
  var lbImg = lb.querySelector('img');
  var group = [], idx = 0;

  function isLbImg(t) {
    return t.tagName === 'IMG' && (t.closest('.masonry') || t.hasAttribute('data-lightbox'));
  }
  function groupFor(t) {
    var c = t.closest('.masonry, .deck');
    var imgs = c ? c.querySelectorAll('img') : document.querySelectorAll('[data-lightbox]');
    return Array.prototype.filter.call(imgs, isLbImg);
  }
  function show(i) {
    idx = (i + group.length) % group.length;
    var g = group[idx];
    lbImg.src = g.currentSrc || g.src; lbImg.alt = g.alt || '';
    lb.classList.toggle('lb-solo', group.length < 2);
  }
  function openLb(t) {
    group = groupFor(t); idx = group.indexOf(t);
    if (idx < 0) { group = [t]; idx = 0; }
    show(idx); lb.classList.add('open'); document.body.classList.add('lb-locked');
  }
  function closeLb() { lb.classList.remove('open'); document.body.classList.remove('lb-locked'); lbImg.style.transform = ''; }

  document.addEventListener('click', function (e) {
    var t = e.target;
    if (isLbImg(t)) { openLb(t); return; }
    if (t.classList.contains('lb-next')) { e.stopPropagation(); show(idx + 1); return; }
    if (t.classList.contains('lb-prev')) { e.stopPropagation(); show(idx - 1); return; }
    if (t === lb || t === lbImg || t.classList.contains('lb-close')) { closeLb(); }
  });
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLb();
    else if (e.key === 'ArrowRight') show(idx + 1);
    else if (e.key === 'ArrowLeft') show(idx - 1);
  });
  /* swipe navigation on touch devices: track the image, lock the page behind */
  var tsx = 0, tsy = 0, swiping = false, horiz = false;
  lb.addEventListener('touchstart', function (e) {
    if (e.touches.length !== 1) { swiping = false; return; }
    var t = e.changedTouches[0]; tsx = t.clientX; tsy = t.clientY;
    swiping = true; horiz = false; lbImg.style.transition = 'none';
  }, { passive: true });
  lb.addEventListener('touchmove', function (e) {
    if (!swiping || !lb.classList.contains('open')) return;
    var t = e.changedTouches[0], dx = t.clientX - tsx, dy = t.clientY - tsy;
    if (!horiz && Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 8) horiz = true;
    if (horiz) {
      e.preventDefault();
      if (group.length > 1) lbImg.style.transform = 'translateX(' + dx + 'px)';
    }
  }, { passive: false });
  lb.addEventListener('touchend', function (e) {
    if (!swiping) return;
    swiping = false;
    lbImg.style.transition = 'transform .2s ease';
    if (!lb.classList.contains('open') || group.length < 2) { lbImg.style.transform = ''; return; }
    var t = e.changedTouches[0], dx = t.clientX - tsx, dy = t.clientY - tsy;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      show(idx + (dx < 0 ? 1 : -1));
    }
    lbImg.style.transform = '';
  }, { passive: true });
})();
