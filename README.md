# realtorvini.com

Website of Vinicius Cadengue, Miami realtor (Riley Smith Group at Compass).

- `docs/` — the public website, published with GitHub Pages.
- `netlify/` — files used only when the same site is deployed to the Netlify backup copy
  (copy `docs/` plus these files into one folder, then deploy).
- Forms: every form posts to Netlify Forms through `docs/js/form-relay.js`, so leads are stored in
  Netlify no matter where the pages are hosted.
