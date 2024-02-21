class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
  }

  open() {
    this._popupSelector.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupSelector.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }
  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
      console.log(event.key);
    }
  }
  setEventListeners() {
    this._popupSelector.addEventListener("mousedown", (event) => {
      if (event.target.classList.contains("modal_opened")) {
        this.close();
      }
      if (event.target.classList.contains("modal__close")) {
        this.close();
      }
    });
  }
}

export { Popup };
