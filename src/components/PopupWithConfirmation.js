import { Popup } from "./Popup";
class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formSelector = this._popupSelector.querySelector(".modal__container");
    this._button = this._formSelector.querySelector(".modal__save");
    this._originalButtonText = this._button.textContent;
  }

  setEventListeners() {
    this._formSelector.addEventListener("submit", (event) => {
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
