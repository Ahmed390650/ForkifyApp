'use strict';
import View from './View';
import previewView from './previewView.js';
class bookmarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _message = 'cound not find recipes results';
  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}
export default new bookmarkView();
