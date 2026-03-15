// Frisco Junk Pros — Shared Scripts

// Year
document.getElementById('yr').textContent = new Date().getFullYear();

// Nav scroll effect
var nv = document.getElementById('nav');
window.addEventListener('scroll', function() {
  nv.classList.toggle('sc', window.scrollY > 60);
}, { passive: true });

// Mobile menu
var nt = document.getElementById('navToggle');
var mm = document.getElementById('mobileMenu');
nt.addEventListener('click', function() {
  nt.classList.toggle('op');
  mm.classList.toggle('op');
  var o = mm.classList.contains('op');
  document.body.style.overflow = o ? 'hidden' : '';
  nt.setAttribute('aria-expanded', o ? 'true' : 'false');
  nt.setAttribute('aria-label', o ? 'Close menu' : 'Open menu');
});
function closeMobile() {
  nt.classList.remove('op');
  mm.classList.remove('op');
  document.body.style.overflow = '';
  nt.setAttribute('aria-expanded', 'false');
  nt.setAttribute('aria-label', 'Open menu');
}

// Scroll reveal
var ro = new IntersectionObserver(function(e) {
  e.forEach(function(en) {
    if (en.isIntersecting) en.target.classList.add('vis');
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.rv').forEach(function(el) { ro.observe(el); });

// Gradient tracking on service cards
window.addEventListener('load', function() {
  setTimeout(function() {
    document.querySelectorAll('.svc').forEach(function(c) {
      c.addEventListener('mousemove', function(e) {
        var r = c.getBoundingClientRect();
        var x = ((e.clientX - r.left) / r.width) * 100;
        var y = ((e.clientY - r.top) / r.height) * 100;
        c.style.background = 'radial-gradient(circle at ' + x + '% ' + y + '%, rgba(242,101,34,0.06), rgba(232,237,244,0.01))';
      });
      c.addEventListener('mouseleave', function() { c.style.background = ''; });
    });
  }, 200);
});

// UTM capture for hidden form fields
(function() {
  var params = new URLSearchParams(window.location.search);
  var fields = ['utm_source', 'utm_medium', 'utm_campaign', 'gclid', 'fbclid'];
  fields.forEach(function(field) {
    var val = params.get(field);
    if (val) {
      document.querySelectorAll('input[name="' + field + '"]').forEach(function(el) {
        el.value = val;
      });
    }
  });
  // Set landing page field
  document.querySelectorAll('input[name="landing_page"]').forEach(function(el) {
    el.value = window.location.pathname;
  });
})();

// Event tracking helpers
function trackEvent(action, category, label) {
  if (typeof gtag === 'function') {
    gtag('event', action, { event_category: category, event_label: label });
  }
  if (typeof fbq === 'function') {
    fbq('track', action === 'form_submit' ? 'Lead' : 'ViewContent', { content_name: label });
  }
}

// Track phone clicks
document.querySelectorAll('a[href^="tel:"]').forEach(function(el) {
  el.addEventListener('click', function() {
    trackEvent('phone_click', 'engagement', 'phone_cta');
  });
});

// Track form submissions
document.querySelectorAll('form').forEach(function(form) {
  form.addEventListener('submit', function() {
    trackEvent('form_submit', 'conversion', 'quote_form');
  });
});

// Track CTA button clicks
document.querySelectorAll('.btn-gw, .btn-or, .fbtn').forEach(function(el) {
  el.addEventListener('click', function() {
    var label = el.textContent.trim().substring(0, 30);
    trackEvent('cta_click', 'engagement', label);
  });
});
