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
  popupWithForms["edit-modal"].open();
  fillProfileForm();
});

profileAvatar.addEventListener("mouseover", () => {
  avatarEditButton.classList.add("profile__avatar-button_visible");
});

avatarEditButton.addEventListener("click", () => {
  //reset the validation before opening it
  formValidators["avatar-form"].resetValidation();
  popupWithForms["avatar-modal"].open();
});

const updateProfilePicture = (inputValues) => {
  popupWithForms["avatar-modal"].changeButtonText();
  api
    .updateProfilePicture(inputValues["avatar-link"])
    .then((res) => {
      profileInfo.updateUserAvatar(res["avatar"]);
      popupWithForms["avatar-modal"].close();
      popupWithForms["avatar-modal"].resetForm();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      popupWithForms["avatar-modal"].resetButtonText();
    });
};

function updateProfileModal(inputValues) {
  profileInfo.setUserInfo(inputValues["Name"], inputValues["About me"]);
  popupWithForms["edit-modal"].changeButtonText();
  api
    .editUserInfo(inputValues["Name"], inputValues["About me"])
    .then((res) => {
      popupWithForms["edit-modal"].close();
      popupWithForms["edit-modal"].resetForm();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      popupWithForms["edit-modal"].resetButtonText();
    });
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
    (id, card) => {
      if (card.checkLike()) {
        return api
          .unlikeCard(id)
          .then(() => {
            card.likeCard();
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        return api
          .likeCard(id)
          .then(() => {
            card.likeCard();
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
  );
  cardsOnPage[cardData.name] = card;
  return card.generateCard();
};

const cardsList = new Section(
  {
    renderer: () => {
      api
        .getInitialCards()
        .then((res) => {
          const cards = res;
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
  popupWithForms["add-card-modal"].open();
});

function createCard(inputValues) {
  const name = inputValues["image-title"];
  const link = inputValues["image-link"];
  popupWithForms["add-card-modal"].changeButtonText();
  api
    .addCard(name, link)
    .then((res) => {
      cardsList.addItem(generateCard(res));
      popupWithForms["add-card-modal"].close();
      popupWithForms["add-card-modal"].resetForm();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      popupWithForms["add-card-modal"].resetButtonText();
    });
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
      return updateProfilePicture(inputValues);
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
