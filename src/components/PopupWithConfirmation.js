import { Popup } from "./Popup";
class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".modal__container");
    this._button = this._form.querySelector(".modal__save");
    this._originalButtonText = this._button.textContent;
  }

  setEventListeners() {
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit();
    });
    super.setEventListeners();
  }

  setHandleFormSubmit(func) {
    this._handleFormSubmit = func;
  }
}

export { PopupWithConfirmation };
