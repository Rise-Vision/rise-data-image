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

    RisePlayerConfiguration.LocalStorage.watchSingleFile(
      this.file, message => this.handleUpdate(message)
    );
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

customElements.define('rise-data-image', RiseDataImage);
