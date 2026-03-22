// Frisco Junk Pros — Shared Scripts
// Nav, mobile menu, scroll reveal handled by inline scripts.

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
  document.querySelectorAll('input[name="landing_page"]').forEach(function(el) {
    el.value = window.location.pathname;
  });
})();

// Event tracking
function trackEvent(action, category, label) {
  if (typeof gtag === 'function') gtag('event', action, { event_category: category, event_label: label });
  if (typeof fbq === 'function' && action !== 'form_submit') fbq('track', 'ViewContent', { content_name: label });
}
document.querySelectorAll('a[href^="tel:"]').forEach(function(el) {
  el.addEventListener('click', function() { trackEvent('phone_click', 'engagement', 'phone_cta'); });
});
document.querySelectorAll('form').forEach(function(form) {
  form.addEventListener('submit', function() { trackEvent('form_submit', 'conversion', 'quote_form'); });
});
document.querySelectorAll('.btn-gw, .btn-or, .fbtn').forEach(function(el) {
  el.addEventListener('click', function() { trackEvent('cta_click', 'engagement', el.textContent.trim().substring(0, 30)); });
});
