/* Partner preview popups.
 * Turns every logo in a .partner-grid into a button that opens a preview card:
 * what the company does, what they offer EO Houston members and forums, the EO
 * point of contact, and a link to their website. Data lives in partners-data.js
 * (window.EO_PARTNERS, keyed by the logo's data-partner attribute).
 * Same file is used by eohouston.com and eomomentum.com; colors come from each
 * site's own CSS variables with fallbacks.
 */
(function () {
  'use strict';
  var DATA = window.EO_PARTNERS || {};
  var grids = document.querySelectorAll('.partner-grid');
  if (!grids.length) return;

  var CSS = [
    '.pm-open-btn{cursor:pointer}',
    '.partner-grid li{position:relative}',
    '.pm-backdrop{position:fixed;inset:0;background:rgba(7,15,36,.62);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);z-index:9000;display:flex;align-items:center;justify-content:center;padding:20px;opacity:0;transition:opacity .22s}',
    '.pm-backdrop.is-open{opacity:1}',
    '.pm-card{position:relative;background:#fff;color:var(--body,#48506a);width:100%;max-width:620px;max-height:min(88vh,860px);overflow:auto;border-radius:22px;box-shadow:0 40px 90px -30px rgba(7,15,36,.6);transform:translateY(14px) scale(.98);transition:transform .22s;font-family:Inter,system-ui,sans-serif;line-height:1.6;-webkit-overflow-scrolling:touch}',
    '.pm-backdrop.is-open .pm-card{transform:none}',
    '.pm-close{position:absolute;top:12px;right:12px;width:38px;height:38px;border:0;border-radius:50%;background:rgba(11,26,59,.06);color:var(--ink,#16203a);font-size:22px;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:2}',
    '.pm-close:hover{background:rgba(11,26,59,.12)}',
    '.pm-head{display:flex;align-items:center;gap:1.1rem;padding:1.6rem 1.6rem 1.1rem;border-bottom:1px solid var(--line,#e6e9f2)}',
    '.pm-logo{flex:none;width:120px;height:72px;display:flex;align-items:center;justify-content:center;background:#fff;border:1px solid var(--line,#e6e9f2);border-radius:12px;padding:8px}',
    '.pm-logo img{max-width:100%;max-height:100%;width:auto;height:auto;object-fit:contain;display:block}',
    '.pm-kicker{margin:0 0 .15rem;font:700 .7rem/1.2 Sora,Inter,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:var(--pm-accent,var(--accent,var(--purple,#3d46f2)))}',
    '.pm-head h3{margin:0;font:800 1.35rem/1.15 Sora,Inter,sans-serif;color:var(--ink,#16203a);letter-spacing:-.01em}',
    '.pm-head .pm-tag{margin:.3rem 0 0;font-size:.85rem;color:var(--muted,#7c849c)}',
    '.pm-body{padding:1.1rem 1.6rem 1.5rem}',
    '.pm-body h4{margin:1rem 0 .35rem;font:700 .74rem/1.2 Sora,Inter,sans-serif;letter-spacing:.1em;text-transform:uppercase;color:var(--muted,#7c849c)}',
    '.pm-body h4:first-child{margin-top:0}',
    '.pm-body p{margin:0 0 .6rem;font-size:.95rem}',
    '.pm-chips{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:.45rem}',
    '.pm-chips li{font-size:.82rem;font-weight:600;color:var(--ink,#16203a);background:var(--bg-soft,#f0f1fb);border:1px solid var(--line,#e6e9f2);border-radius:999px;padding:.32rem .75rem}',
    '.pm-members{background:var(--bg-soft,#f0f1fb);border-left:4px solid var(--pm-accent,var(--accent,var(--purple,#3d46f2)));border-radius:0 12px 12px 0;padding:.75rem .95rem;margin:.2rem 0 .4rem}',
    '.pm-members p{margin:0;font-size:.93rem}',
    '.pm-contact{display:flex;align-items:center;gap:.8rem;margin-top:.2rem}',
    '.pm-avatar{flex:none;width:44px;height:44px;border-radius:50%;background:var(--pm-accent,var(--accent,var(--purple,#3d46f2)));color:#fff;display:flex;align-items:center;justify-content:center;font:700 .95rem Sora,Inter,sans-serif;letter-spacing:.02em}',
    '.pm-contact b{display:block;color:var(--ink,#16203a);font-size:.97rem}',
    '.pm-contact span{display:block;font-size:.85rem;color:var(--muted,#7c849c)}',
    '.pm-contact a{font-size:.88rem;font-weight:600;color:var(--pm-accent,var(--accent,var(--purple,#3d46f2)));word-break:break-all}',
    '.pm-team{list-style:none;margin:.7rem 0 0;padding:0;display:grid;gap:.45rem}',
    '.pm-team li{display:flex;justify-content:space-between;gap:.6rem;align-items:baseline;font-size:.86rem;padding:.45rem .7rem;background:var(--bg-soft,#f0f1fb);border-radius:10px}',
    '.pm-team b{color:var(--ink,#16203a);font-weight:600}',
    '.pm-team small{color:var(--muted,#7c849c);display:block;font-size:.78rem}',
    '.pm-team a{font-weight:600;color:var(--pm-accent,var(--accent,var(--purple,#3d46f2)));white-space:nowrap}',
    '@media(max-width:640px){.pm-team li{flex-direction:column;gap:.1rem}.pm-team a{white-space:normal;word-break:break-all}}',
    '.pm-actions{display:flex;gap:.6rem;flex-wrap:wrap;margin-top:1.3rem}',
    '.pm-btn{flex:1 1 auto;display:inline-flex;align-items:center;justify-content:center;gap:.4rem;padding:.8rem 1.1rem;border-radius:12px;font:700 .93rem Sora,Inter,sans-serif;text-decoration:none;cursor:pointer;border:1px solid transparent;transition:.15s}',
    '.pm-btn-primary{background:var(--pm-accent,var(--accent,var(--purple,#3d46f2)));color:#fff}',
    '.pm-btn-primary:hover{filter:brightness(1.08);transform:translateY(-1px)}',
    '.pm-btn-ghost{background:#fff;color:var(--ink,#16203a);border-color:var(--line,#e6e9f2)}',
    '.pm-btn-ghost:hover{background:var(--bg-soft,#f0f1fb)}',
    '.pm-nav{display:flex;align-items:center;justify-content:space-between;gap:.6rem;margin-top:1.1rem;padding-top:.9rem;border-top:1px solid var(--line,#e6e9f2)}',
    '.pm-nav button{flex:1 1 0;display:flex;align-items:center;gap:.5rem;min-width:0;padding:.6rem .75rem;border:1px solid var(--line,#e6e9f2);border-radius:12px;background:#fff;color:var(--ink,#16203a);font:600 .85rem Inter,system-ui,sans-serif;cursor:pointer;text-align:left;transition:.15s}',
    '.pm-nav button:hover{background:var(--bg-soft,#f0f1fb);border-color:var(--pm-accent,var(--accent,var(--purple,#3d46f2)))}',
    '.pm-nav button.pm-next{text-align:right;justify-content:flex-end}',
    '.pm-nav button span{display:block;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
    '.pm-nav button small{display:block;font-size:.68rem;letter-spacing:.08em;text-transform:uppercase;color:var(--muted,#7c849c);font-weight:700}',
    '.pm-nav .pm-count{flex:none;font-size:.78rem;color:var(--muted,#7c849c);font-variant-numeric:tabular-nums}',
    '@media(max-width:640px){.pm-nav .pm-count{display:none}}',
    '.pm-foot{margin:1rem 0 0;font-size:.76rem;color:var(--muted,#7c849c)}',
    'body.pm-locked{overflow:hidden}',
    '@media(max-width:640px){.pm-backdrop{padding:0;align-items:flex-end}.pm-card{max-width:none;max-height:92vh;border-radius:22px 22px 0 0;transform:translateY(40px)}.pm-head{padding:1.3rem 1.2rem .9rem;gap:.85rem}.pm-logo{width:96px;height:60px}.pm-head h3{font-size:1.15rem}.pm-body{padding:.9rem 1.2rem calc(1.2rem + env(safe-area-inset-bottom))}.pm-actions{flex-direction:column}}',
    '@media(prefers-reduced-motion:reduce){.pm-backdrop,.pm-card{transition:none}}'
  ].join('');
  var style = document.createElement('style');
  style.textContent = CSS;
  document.head.appendChild(style);

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function initials(name) {
    return name.split(/\s+/).filter(Boolean).slice(0, 2).map(function (w) { return w[0]; }).join('').toUpperCase();
  }
  function keyFor(a) {
    var img = a.querySelector('img');
    if (a.dataset.partner) return a.dataset.partner;
    if (!img) return '';
    var m = (img.getAttribute('src') || '').match(/([^\/]+)\.\w+$/);
    return m ? m[1] : '';
  }
  function track(name, params) {
    if (typeof window.gtag === 'function') window.gtag('event', name, params || {});
  }

  var backdrop = null, lastFocus = null, current = null;
  var ORDER = [], ANCHOR = {};
  grids.forEach(function (grid) {
    grid.querySelectorAll('a').forEach(function (a) {
      var k = keyFor(a);
      if (DATA[k] && !ANCHOR[k]) { ORDER.push(k); ANCHOR[k] = a; }
    });
  });

  function close() {
    if (!backdrop) return;
    var el = backdrop;
    backdrop = null;
    el.classList.remove('is-open');
    document.body.classList.remove('pm-locked');
    document.removeEventListener('keydown', onKey);
    setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 220);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function onKey(e) {
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      var i = ORDER.indexOf(current);
      if (i < 0 || ORDER.length < 2) return;
      e.preventDefault();
      show(ORDER[(i + (e.key === 'ArrowRight' ? 1 : -1) + ORDER.length) % ORDER.length]);
    }
    if (e.key === 'Tab' && backdrop) {
      var f = backdrop.querySelectorAll('a[href],button');
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }

  function render(d, logoSrc, siteUrl) {
    var url = d.url || siteUrl;
    var host = '';
    try { host = new URL(url).hostname.replace(/^www\./, ''); } catch (e) {}
    var h = '';
    h += '<button class="pm-close" type="button" aria-label="Close">&times;</button>';
    h += '<div class="pm-head"><div class="pm-logo"><img src="' + esc(logoSrc) + '" alt=""></div><div>';
    h += '<p class="pm-kicker">' + esc(d.tier || 'Strategic Alliance Partner') + '</p>';
    h += '<h3 id="pm-title">' + esc(d.name) + '</h3>';
    if (d.tagline) h += '<p class="pm-tag">' + esc(d.tagline) + '</p>';
    h += '</div></div><div class="pm-body">';
    if (d.about) h += '<h4>What they do</h4><p>' + esc(d.about) + '</p>';
    if (d.services && d.services.length) {
      h += '<h4>Services</h4><ul class="pm-chips">' + d.services.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ul>';
    }
    if (d.members) h += '<h4>For EO Houston members and forums</h4><div class="pm-members"><p>' + esc(d.members) + '</p></div>';
    if (d.contact && d.contact.name) {
      var c = d.contact;
      h += '<h4>EO member point of contact</h4><div class="pm-contact"><div class="pm-avatar" aria-hidden="true">' + esc(initials(c.name)) + '</div><div>';
      h += '<b>' + esc(c.name) + '</b>';
      if (c.title) h += '<span>' + esc(c.title) + '</span>';
      if (c.email) h += '<a href="mailto:' + esc(c.email) + '">' + esc(c.email) + '</a>';
      else if (c.link) h += '<a href="' + esc(c.link) + '" target="_blank" rel="noopener">View profile</a>';
      h += '</div></div>';
    }
    if (d.team && d.team.length) {
      h += '<h4>Also at ' + esc(d.name) + '</h4><ul class="pm-team">' + d.team.map(function (t) {
        return '<li><span><b>' + esc(t.name) + '</b><small>' + esc(t.title || '') + '</small></span>' + (t.email ? '<a href="mailto:' + esc(t.email) + '">' + esc(t.email) + '</a>' : '') + '</li>';
      }).join('') + '</ul>';
    }
    h += '<div class="pm-actions">';
    h += '<a class="pm-btn pm-btn-primary" href="' + esc(url) + '" target="_blank" rel="noopener">Visit ' + esc(host || 'website') + ' &#8599;</a>';
    if (d.contact && d.contact.email) h += '<a class="pm-btn pm-btn-ghost" href="mailto:' + esc(d.contact.email) + '?subject=' + encodeURIComponent('EO Houston member inquiry') + '">Email ' + esc(d.contact.name.split(' ')[0]) + '</a>';
    h += '</div>';
    if (ORDER.length > 1) {
      var i = ORDER.indexOf(current), prev = ORDER[(i - 1 + ORDER.length) % ORDER.length], next = ORDER[(i + 1) % ORDER.length];
      h += '<div class="pm-nav">';
      h += '<button type="button" class="pm-prev" data-key="' + esc(prev) + '" aria-label="Previous sponsor: ' + esc(DATA[prev].name) + '">&#8249; <span><small>Previous</small>' + esc(DATA[prev].name) + '</span></button>';
      h += '<span class="pm-count">' + (i + 1) + ' of ' + ORDER.length + '</span>';
      h += '<button type="button" class="pm-next" data-key="' + esc(next) + '" aria-label="Next sponsor: ' + esc(DATA[next].name) + '"><span><small>Next</small>' + esc(DATA[next].name) + '</span> &#8250;</button>';
      h += '</div>';
    }
    h += '<p class="pm-foot">Mention you are an EO Houston member when you reach out.</p>';
    h += '</div>';
    return h;
  }

  function cardHtml(key) {
    var a = ANCHOR[key], img = a.querySelector('img');
    return render(DATA[key], img ? img.getAttribute('src') : '', a.href);
  }
  function bindCard(card) {
    card.querySelector('.pm-close').addEventListener('click', close);
    card.querySelectorAll('.pm-nav button').forEach(function (b) {
      b.addEventListener('click', function () { show(b.getAttribute('data-key')); });
    });
  }
  function show(key) {
    if (!backdrop || !DATA[key]) return;
    current = key;
    var card = backdrop.querySelector('.pm-card');
    card.innerHTML = cardHtml(key);
    card.scrollTop = 0;
    bindCard(card);
    card.querySelector('.pm-close').focus();
    track('partner_preview_open', { partner: DATA[key].name, page: document.body.dataset.page || location.pathname, via: 'nav' });
  }
  function open(a) {
    var key = keyFor(a);
    var d = DATA[key];
    if (!d) { window.open(a.href, '_blank', 'noopener'); return; }
    lastFocus = a;
    current = key;
    backdrop = document.createElement('div');
    backdrop.className = 'pm-backdrop';
    backdrop.innerHTML = '<div class="pm-card" role="dialog" aria-modal="true" aria-labelledby="pm-title">' + cardHtml(key) + '</div>';
    backdrop.addEventListener('click', function (e) { if (e.target === backdrop) close(); });
    bindCard(backdrop.querySelector('.pm-card'));
    document.body.appendChild(backdrop);
    document.body.classList.add('pm-locked');
    document.addEventListener('keydown', onKey);
    setTimeout(function () { if (!backdrop) return; backdrop.classList.add("is-open"); backdrop.querySelector(".pm-close").focus(); }, 20);
    track('partner_preview_open', { partner: d.name, page: document.body.dataset.page || location.pathname });
  }

  grids.forEach(function (grid) {
    grid.querySelectorAll('a').forEach(function (a) {
      var key = keyFor(a);
      if (!DATA[key]) return; // no data: keep the plain link to their site
      a.classList.add('pm-open-btn');
      a.setAttribute('role', 'button');
      a.setAttribute('aria-haspopup', 'dialog');
      a.setAttribute('aria-label', DATA[key].name + ': see what they offer EO Houston members');
      a.addEventListener('click', function (e) {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return; // let power users open the site directly
        e.preventDefault();
        open(a);
      });
    });
  });
  // Deep link: /partners#partner-weinstein opens that preview on load.
  var hm = (location.hash || "").match(/^#partner-([a-z0-9-]+)$/i);
  if (hm) {
    var target = null;
    grids.forEach(function (grid) { grid.querySelectorAll("a").forEach(function (a) { if (!target && keyFor(a) === hm[1].toLowerCase()) target = a; }); });
    if (target) setTimeout(function () { target.scrollIntoView({ block: "center" }); open(target); }, 150);
  }
})();
