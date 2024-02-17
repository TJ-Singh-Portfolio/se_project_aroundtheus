import { Popup } from "./Popup.js";
class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formSelector = this._popupSelector.querySelector(".modal__container");
  }

  _getInputValues() {
    this._inputList = this._formSelector.querySelectorAll(".modal__input");
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });

    return this._inputValues;
  }
  setEventListeners() {
    this._formSelector.addEventListener("submit", handleFormSubmit);
    super.setEventListeners();
  }
}
