/* eslint-disable no-magic-numbers */

import { PolymerElement } from '@polymer/polymer/polymer-element.js';

class RiseDataImage extends PolymerElement {
  static get properties () {
    return {
      url: {
        type: String,
        value: ''
      }
    };
  }

  constructor() {
    super();

    setTimeout(() => this.loadImage(this), 5000);
  }

  loadImage(element) {
    // fixed for now, URL will be read from local-storage in a later POC
    element.url = '/content/logo.svg';

    const event = new CustomEvent('url-updated', {
      bubbles: true, composed: true, detail: { url: element.url }
    });

    this.dispatchEvent(event);
  }
}

customElements.define('rise-data-image', RiseDataImage);
