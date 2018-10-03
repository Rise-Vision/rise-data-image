/* eslint-disable no-warning-comments */

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
    if (!message.status) {
      return;
    }

    this.url = message.fileUrl || '';

    if (message.status === 'FILE-ERROR') {
      return this.sendImageEvent('image-error', {
        file: this.file,
        errorMessage: message.errorMessage,
        errorDetail: message.errorDetail
      });
    }

    this.sendImageEvent('image-status-updated', {
      file: this.file, url: this.url, status: message.status
    });
  }

  sendImageEvent(eventName, detail = {}) {
    const event = new CustomEvent(eventName, {
      bubbles: true, composed: true, detail
    });

    this.dispatchEvent(event);
  }

}

customElements.define('rise-data-image', RiseDataImage);
