mkdir dist

cat build/prod/html/index.html | perl -pe 's!.*<script>(.*'$1'.*)</script>.*!$1!' > dist/$1.js
