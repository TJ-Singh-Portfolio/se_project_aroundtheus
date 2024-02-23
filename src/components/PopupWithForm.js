import { Popup } from "./Popup.js";
class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formSelector = this._popupSelector.querySelector(".modal__container");
    this._inputList = this._formSelector.querySelectorAll(".modal__input");
  }

  _getInputValues() {
    this.inputValues = {};
    this._inputList.forEach((input) => {
      this.inputValues[input.name] = input.value;
    });
    return this.inputValues;
  }
  setEventListeners() {
    this._formSelector.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      // Move reset form logic from FormValidator.js to here because it was resetting form before the values could be grabbed here.
      this._formSelector.reset();
    });
    super.setEventListeners();
  }
}

export { PopupWithForm };
