# rise-data-image demo

## Install polymer tools

This needs to be done just once per machine.

```bash
npm install -g polymer-cli
```

## Build instructions

Create a standalone project using the contents of this directory as a base.

Then run:

```bash
npm install
polymer build
```

The 'polymer build' command needs to be run after each change to the source
code.

The output is created into the build/prod directory.

## Run instructions

### option a) using a local server

Run a web server from the build/prod directory, for example.

```bash
cd build/es5
python -m SimpleHTTPServer 8999
```

Then configure a schedule pointing to the URL:
http://localhost:8999/src/rise-data-image-electron.html

Add a display id to that schedule, and open a local electron player for that
display id.

The image referenced as the file attribute in the rise-data-image tag should
appear after a few seconds. Status messages related to GCS download may appear
also in the meantime.

### option b) hosting page code on GCS

Alternatively, all the contents of build/prod may be uploaded to GCS,
with public permissions and no caching; and the schedule may point to the
published file.

This option is actually better, as it resembles more closely the environment
the deployed page will run on.

## Build & run instructions - ChromeOS

Currently, the rise-data-image-electron.html is fixed for Player Electron.
To build the test page for ChromeOS player one should use the provided file
rise-data-image-chromeos.html. The procedure is the same that the
one that was described above for Player Electron, but before building the page
it's necessary to change the following line in polymer.json:

```
  "entrypoint": "src/rise-data-image-chromeos.html",
```
