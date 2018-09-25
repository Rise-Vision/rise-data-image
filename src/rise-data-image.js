import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class RiseDataImage extends PolymerElement {
    static get template() {
      return html`
        <p>Downloading image, please wait...</p>
      `;
    }
}

customElements.define('rise-data-image', RiseDataImage);
