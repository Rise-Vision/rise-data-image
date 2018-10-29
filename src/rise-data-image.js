/* eslint-disable no-warning-comments */

import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { version } from "./rise-data-image-version.js";

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

  // Event name constants
  static get EVENT_IMAGE_ERROR() {
    return "image-error";
  }

  static get EVENT_IMAGE_STATUS_UPDATED() {
    return "image-status-updated";
  }

  constructor() {
    super();

    this.file = this.getAttribute('file');

    // TODO: check license ( JTBD later on this epic )

    RisePlayerConfiguration.LocalStorage.watchSingleFile(
      this.file, message => this.handleSingleFileUpdate(message)
    );
    console.log("version is: ", version); // eslint-disable-line no-console
  }

  handleSingleFileUpdate(message) {
    if (!message.status) {
      return;
    }

    this.url = message.fileUrl || '';

    if (message.status === 'FILE-ERROR') {
      return this.sendImageEvent(RiseDataImage.EVENT_IMAGE_ERROR, {
        file: this.file,
        errorMessage: message.errorMessage,
        errorDetail: message.errorDetail
      });
    }

    this.sendImageEvent(RiseDataImage.EVENT_IMAGE_STATUS_UPDATED, {
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
