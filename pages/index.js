import { Card } from "../components/Card.js";
import { FormValidator, settings } from "../components/FormValidator.js";

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

// Profile Variables
const profileEditModal = document.querySelector("#edit-modal");

const profileModalContainer = document.forms["profile-form"];

const profileEditButton = document.querySelector(".profile__edit-button");

const editModalClose = profileEditModal.querySelector(".modal__close");

const profileName = document.querySelector(".profile__name");

const profileDescription = document.querySelector(".profile__description");

const modalInputName = document.querySelector(".modal__input-name");

const modalInputDescription = document.querySelector(
  ".modal__input-description"
);

const profileSave = profileModalContainer.querySelector(".modal__save");

// Add Card Variables
const addCardButton = document.querySelector(".profile__add-button");

const newPlaceModal = document.querySelector("#add-card-modal");

const newPlaceModalContainer = document.forms["card-form"];

const cardModalClose = newPlaceModal.querySelector(".modal__close");

const newPlaceTitle = newPlaceModal.querySelector(".modal__input-title");

const newPlaceLink = newPlaceModal.querySelector(".modal__input-link");

const newPlaceButton = newPlaceModalContainer.querySelector(".modal__save");

// Card Template Variables
const cardTemplate = document.querySelector("#locations-card");

const cardsContainer = document.querySelector(".locations__cards");

// Preview Modal Variables
const previewImageModal = document.querySelector("#preview-image-modal");

const previewImageModalPicture = document.querySelector(".modal__image");

const previewImageModalClose = previewImageModal.querySelector(".modal__close");

const previewImageModalText =
  previewImageModal.querySelector(".modal__image-text");

const modals = Array.from(document.querySelectorAll(".modal"));

// Forms Array
const formArray = Array.from(document.querySelectorAll(".modal__container"));

modals.forEach((modal) => {
  modal.addEventListener("mousedown", (event) => {
    if (event.target.classList.contains("modal_opened")) {
      closeModal(modal);
    }
    if (event.target.classList.contains("modal__close")) {
      closeModal(modal);
    }
  });
});

const handleImageClick = (object) => {
  openModal(previewImageModal);
  previewImageModalPicture.src = object._cardImage;
  previewImageModalPicture.alt = object._cardTitle;
  previewImageModalText.textContent = object._cardTitle;
};

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalByEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalByEscape);
}

function fillProfileForm() {
  modalInputName.value = profileName.textContent;
  modalInputDescription.value = profileDescription.textContent;
}

profileEditButton.addEventListener("click", () => {
  openModal(profileEditModal);
  fillProfileForm();
});

function updateProfileModal(event) {
  event.preventDefault();
  profileName.textContent = modalInputName.value;
  profileDescription.textContent = modalInputDescription.value;
  closeModal(profileEditModal);
  profileSave.disabled = true;
  profileSave.classList.add("modal__save_disabled");
}

profileModalContainer.addEventListener("submit", updateProfileModal);

initialCards.forEach(function (cardData) {
  const cardNode = new Card(cardData, "#locations-card", handleImageClick);
  const cardElement = cardNode.generateCard();
  cardsContainer.append(cardElement);
});

addCardButton.addEventListener("click", () => openModal(newPlaceModal));

function createCard(event) {
  event.preventDefault();
  const name = newPlaceTitle.value;
  const link = newPlaceLink.value;
  const cardElement = new Card(
    { name, link },
    "#locations-card",
    handleImageClick
  ).generateCard();
  cardsContainer.prepend(cardElement);
  closeModal(newPlaceModal);
  newPlaceModalContainer.reset();
  newPlaceButton.disabled = true;
  newPlaceButton.classList.add("modal__save_disabled");
}

newPlaceModalContainer.addEventListener("submit", createCard);

const closeModalByEscape = (event) => {
  if (event.key === "Escape") {
    const targetModal = document.querySelector(".modal_opened");
    closeModal(targetModal);
  }
};

formArray.forEach((form) => {
  const newValidator = new FormValidator(settings, form);
  newValidator.enableValidation();
});
