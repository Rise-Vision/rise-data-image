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

    setTimeout(() => this.loadImage(this), 5000);
  }

  loadImage(element) {
    // fixed for now, URL will be read from local-storage in a later POC
    element.url = element.file;

    const event = new CustomEvent('url-updated', {
      bubbles: true, composed: true, detail: { url: element.url }
    });

    this.dispatchEvent(event);
  }
}

customElements.define('rise-data-image', RiseDataImage);
