class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._cardTitle = data.name;
    this._cardImage = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._element
      .querySelector(".locations__card-delete")
      .addEventListener("click", () => {
        this._deleteCard();
      });
    this._element
      .querySelector(".locations__card-like")
      .addEventListener("click", () => {
        this._likeCard();
      });
    this._element
      .querySelector(".locations__card-image")
      .addEventListener("click", () => {});
  }

  _deleteCard() {
    this._element.remove();
  }

  _likeCard() {
    this._element
      .querySelector(".locations__card-like")
      .classList.toggle("locations__card-like_active");
  }

  _getCardData() {
    const cardTemplate = document.querySelector(this._cardSelector);
    const cardElement = cardTemplate.content
      .cloneNode(true)
      .querySelector(".locations__card-wrapper");

    return cardElement;
  }

  generateCard() {
    this._element = this._getCardData();
    this._setEventListeners;
    this._element.querySelector(".locations__card-text").textContent =
      this._cardTitle;
    this._element.querySelector(".locations__card-image").src = this._cardImage;

    return this._element;
  }
}

export { Card };
