/* form-relay.js — lets the site's forms keep working when the pages are hosted outside Netlify
   (GitHub Pages). Every submission is sent to Netlify Forms, so leads still land in Netlify and
   the hourly lead alerts keep working. On Netlify itself this script does nothing.

   FORM_ENDPOINT = the Netlify address that receives submissions.
   - While realtorvini.com is still served by Netlify: "https://realtorvini.com"
   - After realtorvini.com moves to GitHub Pages:    "https://adorable-biscotti-0b12f4.netlify.app"
*/
(function () {
  var FORM_ENDPOINT = "https://realtorvini.com";
  var endpointHost = FORM_ENDPOINT.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  var host = location.hostname;
  if (host === endpointHost || /\.netlify\.app$/.test(host)) return; // served by Netlify: normal submit

  function relay(form) {
    form.addEventListener("submit", function (e) {
      if (form.dataset.relayed === "1") return; // fallback submit: let the browser post it
      e.preventDefault();
      if (form.reportValidity && !form.reportValidity()) return;
      var btn = form.querySelector("[type=submit]");
      if (btn) btn.disabled = true;
      var data = new URLSearchParams();
      new FormData(form).forEach(function (v, k) { data.append(k, v); });
      if (!data.get("form-name")) data.append("form-name", form.getAttribute("name"));
      var next = form.getAttribute("action") || "/thank-you";
      var done = false;
      function fallback() {
        if (done) return; done = true;
        // post straight to Netlify (visitor sees Netlify's copy of the thank-you page)
        form.dataset.relayed = "1";
        form.action = FORM_ENDPOINT + next;
        form.submit();
      }
      fetch(FORM_ENDPOINT + "/", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: data.toString()
      }).then(function () {
        if (done) return; done = true;
        try { if (window.gtag) gtag("event", "generate_lead", { form_name: form.getAttribute("name") }); } catch (x) {}
        location.href = next;
      }).catch(fallback);
      setTimeout(fallback, 12000);
    });
  }

  function init() {
    var forms = document.querySelectorAll("form[name][data-netlify], form[name][method='POST'], form[name][method='post']");
    for (var i = 0; i < forms.length; i++) relay(forms[i]);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
