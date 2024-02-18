import { Card } from "../components/Card.js";
import { FormValidator, settings } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

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
const cardTemplateSelector = "#locations-card";

const cardTemplate = document.querySelector("#locations-card");

const cardsContainerSelector = ".locations__cards";

const cardsContainer = document.querySelector(".locations__cards");

// Preview Modal Variables
const previewImageModal = document.querySelector("#preview-image-modal");

const previewImageModalPicture = document.querySelector(".modal__image");

const previewImageModalClose = previewImageModal.querySelector(".modal__close");

const previewImageModalText =
  previewImageModal.querySelector(".modal__image-text");

const modals = Array.from(document.querySelectorAll(".modal"));

// Form Modals
const formModals = [newPlaceModal, profileEditModal];
// formModals.push(newPlaceModal);
// formModals.push(profileEditModal);
//console.log(formModals);
//console.log(newPlaceModal.id);

// Forms Array
const formArray = Array.from(document.querySelectorAll(".modal__container"));

/* modals.forEach((modal) => {
  modal.addEventListener("mousedown", (event) => {
    if (event.target.classList.contains("modal_opened")) {
      closeModal(modal);
    }
    if (event.target.classList.contains("modal__close")) {
      closeModal(modal);
    }
  });
}); */

const imagePopup = new PopupWithImage("#preview-image-modal");

imagePopup.setEventListeners();

const handleImageClick = ({ title, image }) => {
  imagePopup.open({ title, image });
  /* openModal(previewImageModal);
  previewImageModalPicture.src = image;
  previewImageModalPicture.alt = title;
  previewImageModalText.textContent = title; */
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
  const userInfo = profileInfo.getUserInfo();
  modalInputName.value = userInfo.name;
  modalInputDescription.value = userInfo.job;
}

/* profileEditButton.addEventListener("click", () => {
  openModal(profileEditModal);
  fillProfileForm();
}); */
profileEditButton.addEventListener("click", () => {
  popupWithForms["edit-modal"].open();
  fillProfileForm();
});

function updateProfileModal(event) {
  event.preventDefault();
  profileName.textContent = modalInputName.value;
  profileDescription.textContent = modalInputDescription.value;
  closeModal(profileEditModal);
}

profileModalContainer.addEventListener("submit", updateProfileModal);

const generateCard = (cardData) => {
  const card = new Card(cardData, cardTemplateSelector, handleImageClick);
  return card.generateCard();
};

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (cardItem) => {
      const card = new Card(cardItem, cardTemplateSelector, handleImageClick);
      const cardElement = card.generateCard();
      cardsList.addItem(cardElement);
    },
  },
  cardsContainerSelector
);

cardsList.renderItems();

/*initialCards.forEach(function (cardData) {
  cardsContainer.append(generateCard(cardData));
}); */

//addCardButton.addEventListener("click", () => openModal(newPlaceModal));
addCardButton.addEventListener("click", () =>
  popupWithForms["add-card-modal"].open()
);

function createCard(event) {
  event.preventDefault();
  const name = newPlaceTitle.value;
  const link = newPlaceLink.value;
  cardsList.addItem(generateCard({ name, link }));
  //cardsContainer.prepend(generateCard({ name, link }));
  closeModal(newPlaceModal);
}

//newPlaceModalContainer.addEventListener("submit", createCard);

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

const popupWithForms = {};

formModals.forEach((modal) => {
  const formPopup = new PopupWithForm(`#${modal.id}`, (inputValues) => {
    //console.log(modal.id);
    console.log(inputValues);
  });
  formPopup.setEventListeners();
  popupWithForms[modal.id] = formPopup;
  //console.log(popupWithForms);
});
//console.log(popupWithForms["add-card-modal"]);

const profileInfo = new UserInfo({
  profileName: ".profile__name",
  profileJob: ".profile__description",
});
