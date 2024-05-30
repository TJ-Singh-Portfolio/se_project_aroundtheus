import { Popup } from "./Popup.js";
class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".modal__container");
    this._inputList = this._form.querySelectorAll(".modal__input");
    this._button = this._form.querySelector(".modal__save");
    this._originalButtonText = this._button.textContent;
  }

  _getInputValues() {
    this.inputValues = {};
    this._inputList.forEach((input) => {
      this.inputValues[input.name] = input.value;
    });
    return this.inputValues;
  }
  setEventListeners() {
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }

  resetForm() {
    this._form.reset();
  }

  resetButtonText() {
    this._button.textContent = this._originalButtonText;
  }

  changeButtonText() {
    this._button.textContent = "Saving...";
  }
}

export { PopupWithForm };
