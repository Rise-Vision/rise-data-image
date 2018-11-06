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

  static get STORAGE_PREFIX() {
    return "https://storage.googleapis.com/";
  }

  constructor() {
    super();

    this.file = this.getAttribute( "file" );
  }

  ready() {
    super.ready();

    const handleStart = RisePlayerConfiguration.isPreview() ?
      this._handleStartForPreview : this._handleStart;

    this.addEventListener( RiseDataImage.EVENT_START, handleStart, {
      once: true
    });

    this._logInfo( RiseDataImage.EVENT_CONFIGURED );
    this._sendImageEvent( RiseDataImage.EVENT_CONFIGURED );
  }

  _getComponentData() {
    return {
      name: "rise-data-image",
      id: this.id,
      version: version
    };
  }

  _getStorageData() {
    return {
      configuration: "storage file",
      file_form: this._getStorageFileFormat( this.file ),
      file_path: this.file,
      local_url: this.url
    }
  }

  _getStorageFileFormat( filePath ) {
    return filePath.substr( filePath.lastIndexOf( "." ) + 1 ).toLowerCase();
  }

  _handleStartForPreview() {
    // check license for preview will be implemented in some other epic later

    this.url = RiseDataImage.STORAGE_PREFIX + this.file
    this._sendImageStatusUpdated( "CURRENT" );
  }

  _handleStart() {
    // TODO: check license ( JTBD later on this epic )

    this._logInfo( RiseDataImage.EVENT_START );

    RisePlayerConfiguration.LocalStorage.watchSingleFile(
      this.file, message => this._handleSingleFileUpdate( message )
    );
  }

  _logInfo( event, details = null ) {
    RisePlayerConfiguration.Logger.info( this._getComponentData(), event, details, { storage: this._getStorageData() });
  }

  _logError( event, details = null ) {
    RisePlayerConfiguration.Logger.error( this._getComponentData(), event, details, { storage: this._getStorageData() });
  }

  _handleSingleFileError( message ) {
    const details = { file: this.file, errorMessage: message.errorMessage, errorDetail: message.errorDetail };

    this._logError( RiseDataImage.EVENT_IMAGE_ERROR, {
      errorMessage: message.errorMessage,
      errorDetail: message.errorDetail
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

    this._sendImageStatusUpdated( message.status );
  }

  _sendImageStatusUpdated( status ) {
    this._logInfo( RiseDataImage.EVENT_IMAGE_STATUS_UPDATED, { status: status });

    this._sendImageEvent( RiseDataImage.EVENT_IMAGE_STATUS_UPDATED, {
      file: this.file, url: this.url, status: status
    });
  }

  _sendImageEvent( eventName, detail = {}) {
    const event = new CustomEvent( eventName, {
      bubbles: true, composed: true, detail
    });

    this.dispatchEvent( event );
  }

}

customElements.define( "rise-data-image", RiseDataImage );
