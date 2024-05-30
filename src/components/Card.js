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
    this._likeStatus = data.isLiked;
  }

  _setEventListeners() {
    this._deleteButton = this._element.querySelector(".locations__card-delete");
    this._deleteButton.addEventListener("click", this.handleDeleteClick);
    this._likeButton = this._element.querySelector(".locations__card-like");
    this._likeButton.addEventListener("click", () => {
      this._handleCardLike(this._id, this);
    });
    this._cardImage = this._element.querySelector(".locations__card-image");
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick({
        title: this._cardTitle,
        image: this._cardLink,
      });
    });
  }

  getId() {
    return this._id;
  }

  handleDeleteClick = () => {
    this._handleCardDelete(this);
  };

  deleteCard = () => {
    this._element.remove();
    this._element = null; // Helps with memory management.
  };

  likeCard = () => {
    this._likeButton.classList.toggle("locations__card-like_active");
  };

  checkLike() {
    return this._likeButton.classList.contains("locations__card-like_active")
      ? true
      : false;
  }

  _setLike() {
    if (this._likeStatus === true) {
      this._likeButton.classList.add("locations__card-like_active");
    } else {
      this._likeButton.classList.remove("locations__card-like_active");
    }
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
    this._cardText = this._element.querySelector(".locations__card-text");
    this._cardText.textContent = this._cardTitle;
    this._cardImage.src = this._cardLink;
    this._cardImage.alt = `Photo of ${this._cardTitle}`;
    this._setLike();

    return this._element;
  }
}

export { Card };
