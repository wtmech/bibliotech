import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-image/iron-image.js';
import '@polymer/iron-icon/iron-icon.js';
import './detail-view';

import './shared-styles.js';

class BookList extends PolymerElement {

  static get properties() {
    return {
      isbn: String,
      title: String,
      publisher: String,
      contributors: Array,
      toc: Array,
      hidden: {
		    type: Boolean,
		    value: true
      }
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

        [hidden] {
          display: none;
         }

        .container {
          width: 80%;
          height: auto;
          margin: 0 auto;
          display: flex;
          justify-content: space-around;
          over-flow: hidden;
          flex-wrap: wrap;
        }

        .book {
          flex: 2;
          max-width: 164px;
          display: flex;
          flex-direction: column;
          transition: transform .2s;
          cursor: pointer;
        }

        .book:hover {
          transform: scale(1.1);
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
          width: 100%;
          height: 100%;
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

        .close-icon {
          z-index: 3;
          width: 45px;
          height: auto;
        }

      </style>

      
      <template is="dom-if" if=[[hidden]]>
        <h1>Your Titles</h1>
        <div class="container">
          <template is="dom-repeat" items=[[books.books]]>
            <div class="book" on-click="show">
              <div class="book-image-container">
                <template is="dom-if" if="[[item.title]]"> <iron-image sizing="contain" class="book-cover" src="https://d1re4mvb3lawey.cloudfront.net/{{item.isbn}}/cover.jpg"></iron-image></template>
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
      </template>
      <template is="dom-if" if=[[!hidden]]><paper-icon-button icon="my-icons:close" class="close-icon" on-click="close"></paper-icon-button></template>
      <detail-view 
        done
        hidden="[[hidden]]"
        title=[[title]]
        isbn=[[isbn]]
        publisher=[[publisher]]
        contributors=[[contributors]]
        toc=[[toc]]>
      </detail-view>
    `;
  }

  show(e) {
    e.stopPropagation();
    this.hidden = false;
    this.title = e.model.item.title;
    this.isbn = e.model.item.isbn;
    this.publisher = e.model.item.publisher;
    this.contributors = e.model.item.contributors;
    this.toc = e.model.item.pathTo.toc
  }

  close(e) {
    e.stopPropagation();
    this.hidden = true;
  }
}

window.customElements.define('book-list', BookList);