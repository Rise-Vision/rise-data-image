# rise-data-image

Web component that retrieves image data

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
added to an HTTP server that supports CORS.

A simple HTTP server can be installed like:

`
npm install -g http-server
`

Then change to the directory and run the server with CORS enabled:

`
cd dist
http-server -p 9030 --cors
`

Then reference this file from the image-remote-transpiled.html file following
instructions on:
https://github.com/Rise-Vision/content-component-architecture-poc/blob/master/README.md

For example, the full referenced component URL for localhost and the port in
the code above should be: http://localhost:9030/rise-data-image.js
