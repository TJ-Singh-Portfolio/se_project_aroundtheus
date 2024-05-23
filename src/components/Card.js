class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleCardDelete,
    handleCardLike
  ) {
    this._cardTitle = data.name;
    this._cardLink = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._id = data._id;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
    //console.log(this._id);
  }

  _setEventListeners() {
    this._deleteButton = this._element.querySelector(".locations__card-delete");
    this._deleteButton.addEventListener("click", this._deleteCard);
    this._likeButton = this._element.querySelector(".locations__card-like");
    this._likeButton.addEventListener("click", this._likeCard);
    this._cardImage = this._element.querySelector(".locations__card-image");
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick({
        title: this._cardTitle,
        image: this._cardLink,
      });
    });
  }

  _deleteCard = () => {
    this._handleCardDelete(this._id);
    this._element.remove();
    this._element = null; // Helps with memory management.
  };

  _likeCard = () => {
    this._likeButton.classList.toggle("locations__card-like_active");
    this._handleCardLike(this._id);
  };

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
    this._cardText = this._element.querySelector(".locations__card-text");
    this._cardText.textContent = this._cardTitle;
    this._cardImage.src = this._cardLink;
    this._cardImage.alt = `Photo of ${this._cardTitle}`;

    return this._element;
  }
}

export { Card };
