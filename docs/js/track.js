/* realtorvini.com lead tracking. Inactive until window.GA_ID is set (Google Analytics 4 measurement ID). */
(function () {
  var id = window.GA_ID;
  if (!id) return;
  var s = document.createElement("script"); s.async = true; s.src = "https://www.googletagmanager.com/gtag/js?id=" + id; document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { dataLayer.push(arguments); };
  gtag("js", new Date()); gtag("config", id);
  function ev(name, p) { try { gtag("event", name, p || {}); } catch (e) {} }
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a"); if (!a) return;
    var h = a.getAttribute("href") || "";
    if (h.indexOf("wa.me") > -1) ev("whatsapp_click", { placement: a.getAttribute("data-wa") || "link", page: location.pathname });
    else if (h.indexOf("tel:") === 0) ev("phone_click", { page: location.pathname });
    else if (h.indexOf("mailto:") === 0) ev("email_click", { page: location.pathname });
    else if (/\.pdf$/i.test(h)) ev("file_download", { file: h });
  }, true);
  document.addEventListener("submit", function (e) {
    var f = e.target; if (!f || !f.getAttribute) return;
    ev("generate_lead", { form: f.getAttribute("name") || "form", page: location.pathname });
  }, true);
})();
