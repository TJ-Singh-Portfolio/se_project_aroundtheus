class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
  }

  open() {
    this._popupSelector.classList.add("modal_opened");
  }

  close() {
    this._popupSelector.classList.remove("modal_opened");
  }
  _handleEscClose() {
    if (event.key === "Escape") {
      const targetModal = document.querySelector(".modal_opened");
      closeModal(targetModal);
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
