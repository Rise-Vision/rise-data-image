/* eslint-disable no-magic-numbers, no-warning-comments */

import { PolymerElement } from '@polymer/polymer/polymer-element.js';

class RiseDataImage extends PolymerElement {
  static get properties () {
    return {
      file: {
        type: String,
        value: ''
      },
      url: {
        type: String,
        value: ''
      }
    };
  }

  constructor() {
    super();

    this.file = this.getAttribute('file');

    // TODO: check license ( JTBD later on this epic )

    watchSingleFile(this.file, message => this.handleUpdate(message));
  }

  handleUpdate(message) {
    if (!message.available) {
      // file doesn't exist or deleted, handle this

      return;
    }

    this.sendImageUrlUpdatedEvent(message.fileUrl);
  }

  sendImageUrlUpdatedEvent(url) {
    this.url = url;

    const event = new CustomEvent('url-updated', {
      bubbles: true, composed: true, detail: { url }
    });

    this.dispatchEvent(event);
  }

}

// Move to common-templates

function watchSingleFile(filePath, handler) {
  onceAvailable('local-storage', () =>
  {
    const state = {filePath, available: false, error: false};

    RisePlayerConfiguration.LocalMessaging.broadcastMessage({
      topic: "watch", filePath
    });

    RisePlayerConfiguration.LocalMessaging.receiveMessages(message => {
      if (!message || !message.topic) {return;}

      switch (message.topic.toUpperCase()) {
        case "FILE-UPDATE":
          return handleFileUpdate(message, state, handler);
        case "FILE-ERROR":
          return handleFileError(message, state, handler);
      }
    });
  });
}

function onceAvailable(modules, action) {
  // TODO: check if modules available, then activate action.

  action();
}

function handleFileUpdate(message, state, handler) {
  if (!message || !message.filePath || !message.status || message.filePath !== state.filePath) {
    return;
  }

  const available = message.status.toUpperCase() === "CURRENT";

  // availability hasn't changed, so don't handle
  if (available === state.available) {return;}

  Object.assign(state, {available, error: false});

  const fileUrl = available ? message.osurl : null;

  handler({ fileUrl, available });
}

function handleFileError(message, state, handler) {
  if (!message || !message.filePath) {return;}

  // file is not being watched
  if (message.filePath !== state.filePath) {return;}

  Object.assign(state, {available, error: true});

  handler({
    available, error, errorMessage: message.msg, errorDetail: message.detail
  });
}

customElements.define('rise-data-image', RiseDataImage);
