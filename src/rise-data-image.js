/* eslint-disable no-magic-numbers */

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

    this.watch(this.file, message => this.handleUpdate(message));
  }

  handleUpdate(message) {
    if (!message.fileUrl) {
      // file doesn't exist or deleted, handle this

      return;
    }

    this.loadImage(message.fileUrl);
  }

  loadImage(url) {
    this.url = url;

    const event = new CustomEvent('url-updated', {
      bubbles: true, composed: true, detail: { url }
    });

    this.dispatchEvent(event);
  }

  // this will be sent to common-template later
  watch(filePath, handler) {
    setTimeout(() => handler({ filePath, fileUrl: this.file }), 5000);
  }

}

customElements.define('rise-data-image', RiseDataImage);
