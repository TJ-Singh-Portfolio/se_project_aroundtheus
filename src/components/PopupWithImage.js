import { Popup } from "./Popup.js";
class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open({ title, image }) {
    this._popupImage = this._popupSelector.querySelector(".modal__image");
    this._popupTitle = this._popupSelector.querySelector(".modal__image-text");
    this._popupImage.src = image;
    this._popupImage.alt = title;
    this._popupTitle.textContent = title;
    super.open();
  }
}

export { PopupWithImage };
