/* eslint-disable no-warning-comments */

import { PolymerElement } from "@polymer/polymer/polymer-element.js";
import { version } from "./rise-data-image-version.js";

class RiseDataImage extends PolymerElement {
  static get properties() {
    return {
      file: {
        type: String,
        value: ""
      },
      url: {
        type: String,
        value: ""
      }
    };
  }

  // Event name constants
  static get EVENT_CONFIGURED() {
    return "configured";
  }

  static get EVENT_IMAGE_ERROR() {
    return "image-error";
  }

  static get EVENT_IMAGE_STATUS_UPDATED() {
    return "image-status-updated";
  }

  static get EVENT_START() {
    return "start";
  }

  constructor() {
    super();

    this.file = this.getAttribute( "file" );
  }

  ready() {
    super.ready();

    this.addEventListener(
      RiseDataImage.EVENT_START,
      () => this._handleStart(),
      { once: true }
    );

    RisePlayerConfiguration.Logger.info( this._getComponentData(), { "event": RiseDataImage.EVENT_CONFIGURED });

    this._sendImageEvent( RiseDataImage.EVENT_CONFIGURED );
  }

  _getComponentData() {
    return {
      name: "rise-data-image",
      id: this.id,
      version: version
    };
  }

  _handleStart() {
    // TODO: check license ( JTBD later on this epic )

    RisePlayerConfiguration.Logger.info( this._getComponentData(), {
      "event": RiseDataImage.EVENT_START,
      "event_details": { file: this.file }
    });

    RisePlayerConfiguration.LocalStorage.watchSingleFile(
      this.file, message => this._handleSingleFileUpdate( message )
    );
  }

  _handleSingleFileError( message ) {
    const details = { file: this.file, errorMessage: message.errorMessage, errorDetail: message.errorDetail };

    RisePlayerConfiguration.Logger.error( this._getComponentData(), {
      "event": RiseDataImage.EVENT_IMAGE_ERROR,
      "event_details": details
    });

    this._sendImageEvent( RiseDataImage.EVENT_IMAGE_ERROR, details );
  }

  _handleSingleFileUpdate( message ) {
    if ( !message.status ) {
      return;
    }

    this.url = message.fileUrl || "";

    if ( message.status === "FILE-ERROR" ) {
      this._handleSingleFileError( message );
      return;
    }

    const details = { file: this.file, url: this.url, status: message.status };

    RisePlayerConfiguration.Logger.info( this._getComponentData(), {
      "event": RiseDataImage.EVENT_IMAGE_STATUS_UPDATED,
      "event_details": details
    });

    this._sendImageEvent( RiseDataImage.EVENT_IMAGE_STATUS_UPDATED, details );
  }

  _sendImageEvent( eventName, detail = {}) {
    const event = new CustomEvent( eventName, {
      bubbles: true, composed: true, detail
    });

    this.dispatchEvent( event );
  }

}

customElements.define( "rise-data-image", RiseDataImage );
