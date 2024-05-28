import { Card } from "../components/Card.js";
import { FormValidator, settings } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import { initialCards } from "../utils/utils.js";
import "./index.css";

// Profile Variables
const profileEditModal = document.querySelector("#edit-modal");

const avatarModal = document.querySelector("#avatar-modal");

const profileModalContainer = document.forms["profile-form"];

const profileEditButton = document.querySelector(".profile__edit-button");

const editModalClose = profileEditModal.querySelector(".modal__close");

const profileAvatar = document.querySelector(".profile__image");

const avatarEditButton = document.querySelector(".profile__avatar-button");

const profileName = document.querySelector(".profile__name");

const profileDescription = document.querySelector(".profile__description");

const modalInputName = document.querySelector(".modal__input-name");

const modalInputDescription = document.querySelector(
  ".modal__input-description"
);

const profileSave = profileModalContainer.querySelector(".modal__save");

// Card Variables
const addCardButton = document.querySelector(".profile__add-button");

const newPlaceModal = document.querySelector("#add-card-modal");

const deleteCardModal = document.querySelector("#delete-card-modal");

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

// Modals
const modals = Array.from(document.querySelectorAll(".modal"));

// Form Modals
const formModals = [newPlaceModal, profileEditModal, avatarModal];

const confirmationModals = [deleteCardModal];

// Forms Array
const formArray = Array.from(document.querySelectorAll(".modal__container"));

// Array and Object Collections
const formValidators = {};

const popupWithForms = {};

const confirmationPopups = {};

let cardsOnPage = {};

// Logic

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "d4cadbf6-4b07-471d-8c88-393f36774c1d",
    "Content-Type": "application/json",
  },
});

const imagePopup = new PopupWithImage("#preview-image-modal");

imagePopup.setEventListeners();

const handleImageClick = ({ title, image }) => {
  imagePopup.open({ title, image });
};

const handleCardDelete = (card) => {
  confirmationPopups["delete-card-modal"].open();
  return id;
};

const handleCardLike = (id, evt) => {
  if (evt.target.classList.contains("locations__card-like_active")) {
    return api.likeCard(id).catch((err) => {
      console.error(err);
    });
  } else {
    return api.unlikeCard(id).catch((err) => {
      console.error(err);
    });
  }
};

const retrieveProfileInfo = () => {
  return api
    .loadUserInfo()
    .then((profileData) => {
      profileInfo.setUserInfo(profileData["name"], profileData["about"]);
      profileInfo.updateUserAvatar(profileData["avatar"]);
    })
    .catch((err) => {
      console.error(err);
    });
};

retrieveProfileInfo();

function fillProfileForm() {
  const userInfo = profileInfo.getUserInfo();
  modalInputName.value = userInfo.name;
  modalInputDescription.value = userInfo.job;
}

profileEditButton.addEventListener("click", () => {
  formValidators["profile-form"].resetValidation();
  popupWithForms["edit-modal"].resetButtonText();
  popupWithForms["edit-modal"].open();
  fillProfileForm();
});

profileAvatar.addEventListener("mouseover", () => {
  avatarEditButton.classList.add("profile__avatar-button_visible");
});

avatarEditButton.addEventListener("click", () => {
  //reset the validation before opening it
  formValidators["avatar-form"].resetValidation();
  popupWithForms["avatar-modal"].resetButtonText();
  popupWithForms["avatar-modal"].open();
});

const updateProfilePicture = (inputValues) => {
  api.updateProfilePicture(inputValues["avatar-link"]).catch((err) => {
    console.error(err);
  });
  api
    .loadUserInfo()
    .then((profileData) => {
      popupWithForms["avatar-modal"].changeButtonText();
      profileInfo.updateUserAvatar(profileData["avatar"]);
    })
    .catch((err) => {
      console.error(err);
    });
  popupWithForms["avatar-modal"].close();
};

function updateProfileModal(inputValues) {
  profileInfo.setUserInfo(inputValues["Name"], inputValues["About me"]);
  api
    .editUserInfo(inputValues["Name"], inputValues["About me"])
    .then((res) => {
      popupWithForms["edit-modal"].changeButtonText();
    })
    .catch((err) => {
      console.error(err);
    });
  popupWithForms["edit-modal"].close();
}

const generateCard = (cardData) => {
  const card = new Card(
    cardData,
    cardTemplateSelector,
    handleImageClick,
    (card) => {
      confirmationPopups["delete-card-modal"].open();
      confirmationPopups["delete-card-modal"].setHandleFormSubmit(() => {
        api
          .deleteCard(card.getId())
          .then(() => {
            card.deleteCard();
            confirmationPopups["delete-card-modal"].close();
          })
          .catch((err) => {
            console.error(err);
          });
      });
    },
    handleCardLike
  );
  cardsOnPage[cardData.name] = card;
  return card.generateCard();
};

const cardsList = new Section(
  {
    renderer: () => {
      api
        .checkStatus(api.loadUserInfo(), api.getInitialCards())
        .then((res) => {
          const cards = res[1];
          cards.forEach((card) => {
            const cardElement = generateCard(card);
            return cardsList.addItem(cardElement);
          });
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  cardsContainerSelector
);

cardsList.renderItems();

addCardButton.addEventListener("click", () => {
  formValidators["card-form"].resetValidation();
  popupWithForms["add-card-modal"].resetButtonText();
  popupWithForms["add-card-modal"].open();
});

function createCard(inputValues) {
  const name = inputValues["image-title"];
  const link = inputValues["image-link"];
  //cardsList.addItem(generateCard({ name, link }));
  api
    .addCard(inputValues["image-title"], inputValues["image-link"])
    .then((res) => {
      cardsList.addItem(generateCard(res));
      popupWithForms["add-card-modal"].changeButtonText();
    })
    .catch((err) => {
      console.error(err);
    });
  popupWithForms["add-card-modal"].close();
}

formArray.forEach((form) => {
  const newValidator = new FormValidator(settings, form);
  newValidator.enableValidation();
  formValidators[form.name] = newValidator;
});

formModals.forEach((modal) => {
  const formPopup = new PopupWithForm(`#${modal.id}`, (inputValues) => {
    if (modal.id === "add-card-modal") {
      return createCard(inputValues);
    }
    if (modal.id === "edit-modal") {
      return updateProfileModal(inputValues);
    }
    if (modal.id === "avatar-modal") {
      console.log(inputValues["avatar-link"]);
      updateProfilePicture(inputValues);
    }
  });
  formPopup.setEventListeners();
  popupWithForms[modal.id] = formPopup;
});

confirmationModals.forEach((modal) => {
  const confirmationPopup = new PopupWithConfirmation(`#${modal.id}`);
  confirmationPopup.setEventListeners();
  confirmationPopups[modal.id] = confirmationPopup;
});

const profileInfo = new UserInfo({
  profileName: ".profile__name",
  profileJob: ".profile__description",
  profileAvatar: ".profile__image",
});

// TEST AREA
/*
console.log(popupWithForms);
console.log(formValidators);*/
//console.log(cardsOnPage);
