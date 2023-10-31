const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const profileEditModal = document.querySelector("#edit-modal");

const profileModalContainer =
  profileEditModal.querySelector(".modal__container");

const profileEditButton = document.querySelector(".profile__edit-button");

const addCardButton = document.querySelector(".profile__add-button");

const editModalClose = profileEditModal.querySelector(".modal__close");

const profileName = document.querySelector(".profile__name");

const profileDescription = document.querySelector(".profile__description");

const modalInputName = document.querySelector(".modal__input-name");

const modalInputDescription = document.querySelector(
  ".modal__input-description"
);

const newPlaceModal = document.querySelector("#add-card-modal");

const newPlaceModalContainer = newPlaceModal.querySelector(".modal__container");

const cardModalClose = newPlaceModal.querySelector(".modal__close");

const newPlaceTitle = newPlaceModal.querySelector(".modal__input-title");

const newPlaceLink = newPlaceModal.querySelector(".modal__input-link");

const cardsContainer = document.querySelector(".locations__cards");

const cardTemplate = document.querySelector("#locations-card");

const previewImageModal = document.querySelector("#preview-image-modal");

const previewImageModalPicture = document.querySelector(".modal__image");

const previewImageModalClose = previewImageModal.querySelector(".modal__close");

const previewImageModalText =
  previewImageModal.querySelector(".modal__image-text");

function universalOpenModal(modal) {
  modal.classList.add("modal_opened");
}

function universalCloseModal(modal) {
  modal.classList.remove("modal_opened");
}

function fillProfileForm() {
  modalInputName.value = profileName.textContent;
  modalInputDescription.value = profileDescription.textContent;
}

fillProfileForm();

profileEditButton.addEventListener("click", () =>
  universalOpenModal(profileEditModal)
);

editModalClose.addEventListener("click", () =>
  universalCloseModal(profileEditModal)
);

function updateProfileModal(event) {
  event.preventDefault();
  profileName.textContent = modalInputName.value;
  profileDescription.textContent = modalInputDescription.value;
  universalCloseModal(profileEditModal);
}

profileModalContainer.addEventListener("submit", updateProfileModal);

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .cloneNode(true)
    .querySelector(".locations__card-wrapper");
  const cardTitle = cardElement.querySelector(".locations__card-text");
  const cardImage = cardElement.querySelector(".locations__card-image");
  const likeButton = cardElement.querySelector(".locations__card-like");
  const deleteButton = cardElement.querySelector(".locations__card-delete");

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("locations__card-like_active");
  });

  cardImage.addEventListener("click", () => {
    universalOpenModal(previewImageModal);
    previewImageModalPicture.setAttribute("src", data.link);
    previewImageModalPicture.setAttribute("alt", data.name);
    previewImageModalText.textContent = data.name;
  });

  cardImage.setAttribute("src", data.link);
  cardImage.setAttribute("alt", data.name);
  cardTitle.textContent = data.name;

  return cardElement;
}

initialCards.forEach(function (cardData) {
  const cardNode = getCardElement(cardData);
  document.querySelector(".locations__cards").append(cardNode);
});

addCardButton.addEventListener("click", () =>
  universalOpenModal(newPlaceModal)
);

cardModalClose.addEventListener("click", () =>
  universalCloseModal(newPlaceModal)
);

function createCard(event) {
  event.preventDefault();
  const name = newPlaceTitle.value;
  const link = newPlaceLink.value;
  const cardElement = getCardElement({ name, link });
  cardsContainer.prepend(cardElement);
  universalCloseModal(newPlaceModal);
  newPlaceModalContainer.reset();
}

newPlaceModalContainer.addEventListener("submit", createCard);

previewImageModalClose.addEventListener("click", () =>
  universalCloseModal(previewImageModal)
);
