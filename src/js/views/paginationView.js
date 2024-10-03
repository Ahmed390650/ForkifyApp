'use strict';
import View from './View';
import icon from 'url:../../img/icons.svg';
class Pagination extends View {
  _parentElement = document.querySelector('.pagination');
  _generateMarkup() {
    const numPage = Math.ceil(
      this._data.result.length / this._data.resultPerPage
    );
    const currentPage = this._data.page;
    const btnPagi = this.ButtonPagination;
    if (currentPage === 1 && numPage > 1)
      return btnPagi(currentPage + 1, 'next');
    if (currentPage === numPage && numPage > 1)
      return btnPagi(currentPage - 1, 'prev');
    if (currentPage < numPage)
      return (
        btnPagi(currentPage - 1, 'prev') + btnPagi(currentPage + 1, 'next')
      );
    return '';
  }
  ButtonPagination(page, type) {
    return `<button class="btn--inline pagination__btn--${type}" data-page="${page}">
            <svg class="search__icon">
             <use href="${icon}#icon-arrow-${
      type === 'next' ? 'right' : 'left'
    }"></use>
            </svg>
                <span>Page ${page}</span>
          </button>`;
  }
  addHandleClicker(handler) {
    this._parentElement.addEventListener('click', e => {
      e.preventDefault();
      const btn = e.target.closest('.btn--inline');
      if (btn) handler(+btn.dataset.page);
    });
  }
}
export default new Pagination();
