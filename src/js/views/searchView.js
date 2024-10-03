class SearchView {
  #parentEl = document.querySelector('.search');
  getQuery() {
    const query = this.#parentEl.querySelector('.search__field').value;
    this.#clearInput();
    return query;
  }
  #clearInput() {
    this.#parentEl.querySelector('.search__field').value = '';
  }
  addHandleSeach(handler) {
    this.#parentEl.addEventListener('click', e => {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
