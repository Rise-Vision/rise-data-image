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

    setInterval(() => this.toggleImage(this), 5000);
  }

  toggleImage(element) {
    element.url = `/content/${
      element.url.endsWith('logo.svg') ? 'schedules-icon.png' : 'logo.svg'
    }`;

    const event = new CustomEvent('url-updated', {
      bubbles: true, composed: true, detail: { url: element.url }
    });

    this.dispatchEvent(event);
  }
}

customElements.define('rise-data-image', RiseDataImage);
