#!/usr/bin/env bash
# Netlify build step. Copies the Riley Smith Group photos/logo onto realtorvini.com itself
# (only when a file is missing). If a download fails, that page keeps the team URL so nothing breaks.
CDN="https://cms.idxboostcdn.com/c379d49765a509fa852792ea58d175ea"
mkdir -p images/team
while read -r src dst; do
  [ -z "$src" ] && continue
  if [ -s ".$dst" ]; then echo "have $dst"; continue; fi
  if curl -fsSL --retry 3 -m 60 "$CDN/$src" -o ".$dst" && [ -s ".$dst" ]; then
    echo "saved $dst"
  else
    echo "WARN could not fetch $src - keeping team URL"; rm -f ".$dst"
    grep -rl --include=*.html --include=*.css "$dst" . | xargs -r sed -i "s#$dst#$CDN/$src#g"
  fi
done <<'LIST'
2fe5a3c268ea93b844050ca9be949128.svg /images/rsg-logo.svg
4bc50efa41027d1cab8a1bfc935a4a0d-2048x1269.jpg /images/team/coconut-grove-waterfront.jpg
186c10c83b625a947bc31b98bd4037e6-1200x801.jpg /images/team/brickell.jpg
270ac52abf6651fefcefc3b920c978b0-1200x900.jpg /images/team/coral-gables.jpg
7810d2703d9565553fd536bfecac2dc6-1200x799.jpg /images/team/coconut-grove.jpg
df2d2910836d31ede01ffc032453505a-1200x800.jpg /images/team/key-biscayne.jpg
605c6782c1af76dfc7ddb98a2073580b-1200x801.jpg /images/team/gated-communities.jpg
8566d3b94a7e89e560248020fb119ed1-2048x753.jpg /images/team/miami-band.jpg
LIST
