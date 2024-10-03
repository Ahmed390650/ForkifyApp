'use strict';
import View from './View';

class addRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _message = 'Recipe successfulyy add';
  _overlay = document.querySelector('.overlay');
  _btnClose = document.querySelector('.btn--close-modal');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHiddenWindow();
  }
  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', () => {
      this.toggleWindow();
    });
  }
  _addHandlerHiddenWindow() {
    this._btnClose.addEventListener('click', () => {
      this.toggleWindow();
    });
    this._overlay.addEventListener('click', () => {
      this.toggleWindow();
    });
  }
  _addHandlerUpload(handler) {
    this._parentElement
      .querySelector('.upload__btn')
      .addEventListener('click', e => {
        e.preventDefault();
        const data = [...new FormData(this._parentElement)];
        const dataObj = Object.fromEntries(data);
        handler(dataObj);
      });
  }
}
export default new addRecipeView();
