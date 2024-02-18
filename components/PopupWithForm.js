import { Popup } from "./Popup.js";
class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formSelector = this._popupSelector.querySelector(".modal__container");
    //console.log(this._formSelector);
  }

  _getInputValues() {
    this._inputList = this._formSelector.querySelectorAll(".modal__input");
    this.inputValues = {};
    this._inputList.forEach((input) => {
      this.inputValues[input.name] = input.value;
      //What may be happening is that the reset() method from FormValidator is running on the form before you can grab the values in the form.
    });
    return this.inputValues;
  }
  setEventListeners() {
    this._formSelector.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this._formSelector.reset();
    });
    super.setEventListeners();
  }
}

export { PopupWithForm };
