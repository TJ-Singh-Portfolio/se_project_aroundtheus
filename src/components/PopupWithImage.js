import { Popup } from "./Popup.js";
class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(".modal__image");
    this._popupTitle = this._popup.querySelector(".modal__image-text");
  }

  open({ title, image }) {
    this._popupImage.src = image;
    this._popupImage.alt = title;
    this._popupTitle.textContent = title;
    super.open();
  }
}

export { PopupWithImage };
