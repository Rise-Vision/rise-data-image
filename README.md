# rise-data-image

Web component that retrieves data

## Build instructions

First clone and change into this project directory.

Then run:

`
npm install
npm install -g polymer-cli
npm run build
`

Note: if EPERM errors happen install polymer-cli using the --unsafe-perm flag
( npm install -g polymer-cli --unsafe-perm ) and/or using sudo.

## Test instructions

`
npm test
`

## Run locally instructions

After building, the dist/ directory will hold the extracted code that can be
added to an HTTP server, for example:

`
cd dist
python -m SimpleHTTPServer 9030
`

Then reference this file from the image-remote-transpiled.html file following
instructions on:
https://github.com/Rise-Vision/content-component-architecture-poc/blob/master/README.md
