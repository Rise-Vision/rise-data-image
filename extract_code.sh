mkdir -p dist

cat build/prod/html/index.html | perl -pe 's!.*<script>(.*'$1'.*)</script>.*!$1!' > dist/$1.js

if [ $(wc -l < dist/$1.js) -gt 1 ]
then
  echo malformed output script - too many lines

  exit 1
fi

if [ $(grep -c '^define' dist/$1.js) -eq 0 ]
then
  echo malformed output script - not JavaScript transpiled code

  exit 1
fi
