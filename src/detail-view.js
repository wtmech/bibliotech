import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-image/iron-image.js';
import './shared-styles.js';

class DetailView extends PolymerElement {

  static get properties() {
    return {
      isbn: String,
      title: String,
      contributors: Array,
      publisher: String,
      toc: String

    }
  }

  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
          padding: 10px;
          color: #767676;
          height: calc(100vh - 64px);
          background: #fafafa;
        }

        .container {
          width: 100%;
          height: 100%;
          margin: 0 auto;
          display: flex;
        }
        
        .book-contents {
          flex: 1;
        }

        .book-info {
          
          margin-top: 5px;
        }

        .top-bar {
          width: 100%;
          height: auto;
          max-height: 150px;
          display: flex;
          justify-content: center;
          position: absolute;
          top: 90px;
          overflow: hidden;
        }

        .book-cover {
          width: 100px;
          height: 130px;
        }

        .book-info {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-left: 20px;
          font-size: .9rem;
        }

        .book-contents {
          position: relative;
        }

        .hide {
          width: 40px;
          height: 45px;
          background: #fafafa;
          position: absolute;
          top: 108px;
          left: 15px;
        }

      </style>
      <template is="dom-if" if=[[isbn]]>
        <div class="top-bar">
          <iron-image sizing="contain" class="book-cover" src="https://d1re4mvb3lawey.cloudfront.net/[[isbn]]/cover.jpg"></iron-image>
          <div class="book-info">
            <span class="bold">Title: <span class="value">[[title]]</span></span>
            <span class="bold">Publisher: <span class="value">[[publisher]]</span></span>
            <span class="bold">
              Contributors:
              <template is="dom-repeat" items=[[contributors]]>
                <span class="value">[[item]]</span>
              </template>
          </span>
          </div>
        </div>
        <div class="container">
          <div class="book-contents">
            <div class="hide"></div>
            <template is="dom-if" if=[[isbn]]>
              <iframe src="https://bibliotech.education/#/view/books/[[isbn]]/[[toc]]" width: 100%></iframe>
            </template>
          </div>
        </div>
      </template>
    `;
  }
}



window.customElements.define('detail-view', DetailView);

