'use strict';
import icon from 'url:../../img/icons.svg';

export default class View {
  _data;
  /**
   *
   * @param {Object | Object[]} data
   * @param {boolean} [render=true]
   * @returns
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderMessage();
    this._data = data;
    const markup = this._generateMarkup();
    if (!render) return markup;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  update(data) {
    this._data = data;
    const markup = this._generateMarkup();
    const newDom = document.createRange().createContextualFragment(markup);
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const currElements = Array.from(this._parentElement.querySelectorAll('*'));
    newElements.forEach((newEle, i) => {
      const curEl = currElements[i];
      //update changed Text
      if (
        !newEle.isEqualNode(curEl) &&
        newEle.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEle.textContent;
      }
      //update change attributes
      if (!newEle.isEqualNode(curEl)) {
        Array.from(newEle.attributes).forEach(attr => {
          curEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }
  _clear() {
    this._parentElement.innerHTML = '';
  }
  renderMessage(message = this._message) {
    const html = `<div class="message">
            <div>
              <svg>
                <use href="${icon}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }
  renderSpinner() {
    const html = `<div class="spinner">
          <svg>
            <use href="${icon}#icon-loader"></use>
          </svg>
        </div> `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', html);
  }
}
