class Section {
  constructor({ items, renderer }, classSelector) {
    this._initialArray = items;
    this._renderer = renderer;
    this._classSelector = document.querySelector(classSelector);
  }

  renderItems() {
    this._initialArray.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._classSelector.append(element);
  }
}

export { Section };
