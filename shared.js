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
    ['/membership', 'Join', 'join'],
    ['/partners', 'Partners', 'partners'],
    ['/momentum', 'Momentum', 'momentum']
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
        '<a class="btn btn-accent" href="/membership">Join EO Houston</a>' +
      '</div>' +
      '<a class="header-login-mobile" href="' + MEMBER_LOGIN + '" target="_blank" rel="noopener">' +
        '<span class="lm-full">Member Login</span><span class="lm-short">Sign In</span></a>' +
      '<button class="nav-toggle" aria-label="Menu"><span></span><span></span><span></span></button>' +
    '</div>' +
    '<div class="mobile-nav" id="mnav">' + navLinks(true) +
      '<a href="/refer">Refer a Member</a>' +
      '<a href="' + MEMBER_LOGIN + '" target="_blank" rel="noopener">Member Login</a>' +
      '<a class="btn btn-accent" href="/membership">Join EO Houston</a></div></header>';

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
          '<a href="/events">Events</a><a href="/partners">Partners</a><a href="/membership">Join EO Houston</a>' +
          '<a href="' + IG + '" target="_blank" rel="noopener">Instagram ↗</a></div>' +
        '<div><h4>Programs</h4>' +
          '<a href="https://eomomentum.com" target="_blank" rel="noopener">EO Momentum ↗</a>' +
          '<a href="' + MEMBER_LOGIN + '" target="_blank" rel="noopener">Member Login ↗</a>' +
          '<a href="/refer">Refer a Member</a>' +
          '<a href="https://www.eonetwork.org" target="_blank" rel="noopener">EO Global ↗</a>' +
          '<a href="/membership">Become a Member</a></div>' +
        '<div><h4>Compare</h4>' +
          '<a href="/eo-vs-ypo" style="white-space:nowrap">EO vs. YPO</a>' +
          '<a href="/eo-vs-vistage" style="white-space:nowrap">EO vs. Vistage</a>' +
          '<a href="/eo-vs-tiger21" style="white-space:nowrap">EO vs. TIGER 21</a>' +
          '<a href="/eo-vs-goldman-sachs" style="white-space:nowrap">EO vs. Goldman Sachs</a></div>' +
      '</div>' +
      '<div class="footer-bottom"><span>© ' + '2026 EO Houston, a chapter of the Entrepreneurs’ Organization. · Houston, Texas</span></div>' +
    '</div></footer>';

  /* GA4: track every CTA-style button/link click sitewide (text + destination + page) as
     cta_click, and promote the highest-value conversions to their own named event so Robert
     can build funnels/reports off them directly instead of filtering by link text every time. */
  var CTA_EVENT_RULES = [
    /* /join was renamed to /membership; keep matching both so the event name stays
       continuous in GA4 and any old link still counts. */
    [/^\/(membership|join)(#.*)?$/, 'join_click'],
    [/^https:\/\/member\.eonetwork\.org\/why-join/, 'join_click'],
    [/^\/refer$/, 'refer_click'],
    [/^\/momentum$/, 'momentum_click'],
    [/^https:\/\/eomomentum\.com/, 'momentum_click'],
    [/^https:\/\/docs\.google\.com\/forms\//, 'momentum_apply_click']
  ];

  /* One send path for every event: straight to GA4 via gtag, and onto the dataLayer so the
     GTM container can pick the same event up without the page being edited again. */
  function pageLabel() { return page || location.pathname; }
  function track(name, params) {
    var p = params || {};
    if (!p.page) p.page = pageLabel();
    if (typeof window.gtag === 'function') window.gtag('event', name, p);
    window.dataLayer = window.dataLayer || [];
    var d = { event: name };
    for (var k in p) { if (Object.prototype.hasOwnProperty.call(p, k)) d[k] = p[k]; }
    window.dataLayer.push(d);
  }
  window.eoTrack = track;

  document.addEventListener('click', function (e) {
    var el = e.target.closest('.btn, .header-login, .header-login-mobile');
    if (!el) return;
    var href = el.getAttribute('href') || '';
    var text = (el.textContent || '').trim().replace(/\s+/g, ' ');
    track('cta_click', { link_text: text, link_url: href });
    if (href === MEMBER_LOGIN) { track('member_login_click'); return; }
    for (var i = 0; i < CTA_EVENT_RULES.length; i++) {
      if (CTA_EVENT_RULES[i][0].test(href)) {
        track(CTA_EVENT_RULES[i][1], { link_text: text });
        break;
      }
    }
  });

  /* Contact intent: email and phone links anywhere on the page, not just buttons. */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (href.indexOf('mailto:') === 0) {
      track('email_click', { email_address: href.replace('mailto:', '').split('?')[0] });
    } else if (href.indexOf('tel:') === 0) {
      track('phone_click', { phone_number: href.replace('tel:', '') });
    } else if (/^https?:\/\//.test(href) && href.indexOf(location.host) === -1) {
      track('outbound_click', {
        link_url: href,
        link_domain: (href.split('/')[2] || ''),
        link_text: (a.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 90)
      });
    }
  });

  /* Form funnel: form_start on the first real interaction, form_submit on send.
     Together with the *_form_submit event on /thanks these give a 3-step funnel. */
  Array.prototype.forEach.call(document.querySelectorAll('form'), function (form) {
    var started = false;
    var formName = form.getAttribute('data-form') ||
                   ((form.action || '').indexOf('formsubmit') > -1 ? 'contact' : 'form');
    form.addEventListener('focusin', function (ev) {
      if (started) return;
      if (!ev.target.matches('input:not([type=hidden]), textarea, select')) return;
      started = true;
      track('form_start', { form_name: formName });
    });
    form.addEventListener('submit', function () {
      var sel = form.querySelector('select[name="Interest"]');
      track('form_submit', {
        form_name: formName,
        interest: sel ? sel.value : undefined
      });
    });
  });

  /* Scroll depth: one event per threshold per pageview. */
  (function () {
    var marks = [25, 50, 75, 90], hit = {}, ticking = false;
    function check() {
      ticking = false;
      var doc = document.documentElement;
      var scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable < 400) return;
      var top = window.pageYOffset || doc.scrollTop || document.body.scrollTop || 0;
      var pct = Math.round((top / scrollable) * 100);
      for (var i = 0; i < marks.length; i++) {
        if (pct >= marks[i] && !hit[marks[i]]) {
          hit[marks[i]] = true;
          track('scroll_depth', { percent_scrolled: marks[i] });
        }
      }
    }
    /* setTimeout rather than requestAnimationFrame: rAF is throttled to zero in a
       background tab, which would latch the throttle flag and kill tracking for good. */
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      setTimeout(check, 150);
    }, { passive: true });
  })();

  /* Content engagement: opening an FAQ answer is a real intent signal on /momentum. */
  Array.prototype.forEach.call(document.querySelectorAll('details'), function (d) {
    d.addEventListener('toggle', function () {
      if (!d.open) return;
      var s = d.querySelector('summary');
      track('faq_open', { question: (s ? s.textContent : '').trim().slice(0, 100) });
    });
  });

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
