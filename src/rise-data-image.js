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
      this.file, message => this.handleSingleFileUpdate(message)
    );
  }

  handleSingleFileUpdate(message) {
    if (!message.available) {
      this.url = '';

      if (message.error) {
        return this.sendImageEvent('image-error', {
          errorMessage: message.errorMessage, errorDetail: message.errorDetail
        });
      }

      return this.sendImageEvent('image-not-available');
    }

    this.url = message.fileUrl;
    this.sendImageEvent('image-url-updated', { url: this.url });
  }

  sendImageEvent(eventName, detail = {}) {
    const event = new CustomEvent(eventName, {
      bubbles: true, composed: true, detail
    });

    this.dispatchEvent(event);
  }

}

customElements.define('rise-data-image', RiseDataImage);
