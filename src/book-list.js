import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-image/iron-image.js';

import './shared-styles.js';

class BookList extends PolymerElement {

  static get properties() {
    return {
      isbn: String
    };
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
          width: 80%;
          height: 100%;
          margin: 0 auto;
          display: flex;
          justify-content: space-around;
        }

        .book {
          flex: 2;
          height: 100%;
          max-width: 164px;
          display: flex;
          flex-direction: column;
          transition: transform .2s;
        }

        .book:hover {
          transform: scale(1.1); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
      }
        
        .book-contents {
          flex: 1;
        }

        .book-image-container {
          position: relative;
          width: 164px;
          height: 220px;
        }

        .book-cover {
          width: 164px;
          height: 220px;
          border-radius: 3px;
        }

        .book-title {
          color: #242525;
          width: 100%;
          height: 70px;
          background: rgba(255, 255, 255, 0.7);
          position: absolute;
          bottom: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .title {
          font-size: .7rem;
          font-weight: bold;
        }

        .title, .contributors {
          margin-left: 5px;
        }

        .book-info {
          display: flex;
          flex-direction: column;
          font-size: .9rem;
          margin-top: 5px;
        }

        h1 {
          text-align: center;
          color: #757575;
        }

      </style>

      <iron-ajax
        auto
        url="../data/data.json"
        handle-as="json"
        last-response="{{books}}">
      </iron-ajax>
      
      <h1>Your Titles</h1>
      <div class="container">
        <template is="dom-repeat" items=[[books.books]]>
            <div class="book">
              <div class="book-image-container">
                <iron-image sizing="contain" class="book-cover" src="https://d1re4mvb3lawey.cloudfront.net/{{item.isbn}}/cover.jpg"></iron-image>
                <div class="book-title">
                  <span class="title">[[item.title]]</span>
                  <template is="dom-repeat" items=[[item.contributors]]>
                    <span class="contributors">[[item]]</span>
                  </template>
                </div>
              </div>
              <div class="book-info">
                <span class="bold">ISBN <span class="value"> | [[item.isbn]]</span></span>
                <template is="dom-if" if="[[item.publisher]]"><span class="bold">Publisher: <span class="value"> | [[item.publisher]]</span></template>
              </div>
            </div>
        </template>
        
      </div>
    `;
  }
}

window.customElements.define('book-list', BookList);