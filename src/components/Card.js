class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._cardTitle = data.name;
    this._cardLink = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._deleteButton = this._element.querySelector(".locations__card-delete");
    this._deleteButton.addEventListener("click", () => {
      this._deleteCard();
    });
    this._likeButton = this._element.querySelector(".locations__card-like");
    this._likeButton.addEventListener("click", () => {
      this._likeCard();
    });
    this._cardImage = this._element.querySelector(".locations__card-image");
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick({
        title: this._cardTitle,
        image: this._cardLink,
      });
    });
  }

  _deleteCard() {
    this._element.remove();
    this._element = null; // Helps with memory management.
  }

  _likeCard() {
    this._likeButton.classList.toggle("locations__card-like_active");
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
    this._setEventListeners();
    this._element.querySelector(".locations__card-text").textContent =
      this._cardTitle;
    this._cardImage.src = this._cardLink;
    this._cardImage.alt = `Photo of ${this._cardTitle}`;

    return this._element;
  }
}

export { Card };
