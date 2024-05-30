class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._containerSelector = containerSelector;
    this._container = document.querySelector(this._containerSelector);
  }

  renderItems() {
    this._renderer();
  }

  addItem(element) {
    this._container.prepend(element);
  }
}

export { Section };
