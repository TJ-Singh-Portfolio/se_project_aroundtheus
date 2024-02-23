import { Card } from "../components/Card.js";
import { FormValidator, settings } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { initialCards } from "../utils/utils.js";
import "./index.css";

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

// Forms Array
const formArray = Array.from(document.querySelectorAll(".modal__container"));

const imagePopup = new PopupWithImage("#preview-image-modal");

imagePopup.setEventListeners();

const handleImageClick = ({ title, image }) => {
  imagePopup.open({ title, image });
};

function fillProfileForm() {
  const userInfo = profileInfo.getUserInfo();
  modalInputName.value = userInfo.name;
  modalInputDescription.value = userInfo.job;
}

profileEditButton.addEventListener("click", () => {
  formValidators["profile-form"].resetValidation();
  popupWithForms["edit-modal"].open();
  fillProfileForm();
});

function updateProfileModal(inputValues) {
  profileInfo.setUserInfo(inputValues["Name"], inputValues["About me"]);
  popupWithForms["edit-modal"].close();
}

const generateCard = (cardData) => {
  const card = new Card(cardData, cardTemplateSelector, handleImageClick);
  return card.generateCard();
};

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (cardItem) => {
      const cardElement = generateCard(cardItem);
      cardsList.addItem(cardElement);
    },
  },
  cardsContainerSelector
);

cardsList.renderItems();

addCardButton.addEventListener("click", () => {
  formValidators["card-form"].resetValidation();
  popupWithForms["add-card-modal"].open();
});

function createCard(inputValues) {
  const name = inputValues["image-title"];
  const link = inputValues["image-link"];
  cardsList.addItem(generateCard({ name, link }));
  popupWithForms["add-card-modal"].close();
}

const formValidators = {};

formArray.forEach((form) => {
  const newValidator = new FormValidator(settings, form);
  newValidator.enableValidation();
  formValidators[form.name] = newValidator;
});

const popupWithForms = {};

formModals.forEach((modal) => {
  const formPopup = new PopupWithForm(`#${modal.id}`, (inputValues) => {
    modal.id === "add-card-modal"
      ? createCard(inputValues)
      : updateProfileModal(inputValues);
  });
  formPopup.setEventListeners();
  popupWithForms[modal.id] = formPopup;
});

const profileInfo = new UserInfo({
  profileName: ".profile__name",
  profileJob: ".profile__description",
});
