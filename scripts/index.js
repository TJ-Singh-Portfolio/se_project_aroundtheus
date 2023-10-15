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

const modalContainer = document.querySelector(".modal__container");

const profileEditButton = document.querySelector(".profile__edit-button");

const addCardButton = document.querySelector(".profile__add-button");

const editModalClose = document.querySelector(".modal__close");

const profileName = document.querySelector(".profile__name");

const profileDescription = document.querySelector(".profile__description");

const modalInputName = document.querySelector(".modal__input-name");

const modalInputDescription = document.querySelector(
  ".modal__input-description"
);

const newPlaceModal = document.querySelector("#add-card-modal");

const cardModalClose = newPlaceModal.querySelector(".modal__close");

const cardTemplate = document.querySelector("#locations-card");

function toggleModal() {
  profileEditModal.classList.toggle("modal_opened");
}

function fillProfileForm() {
  modalInputName.value = profileName.textContent;
  modalInputDescription.value = profileDescription.textContent;
}

fillProfileForm();

profileEditButton.addEventListener("click", toggleModal);

editModalClose.addEventListener("click", toggleModal);

function updateModal(event) {
  profileName.textContent = modalInputName.value;
  profileDescription.textContent = modalInputDescription.value;
  event.preventDefault();
  toggleModal();
}

modalContainer.addEventListener("submit", updateModal);

function getCardElement(data) {
  const cardElement = cardTemplate.content.cloneNode(true);
  const cardTitle = cardElement.querySelector(".locations__card-text");
  const cardImage = cardElement.querySelector(".locations__card-image");
  cardImage.setAttribute("src", data.link);
  cardImage.setAttribute("alt", data.name);
  cardTitle.textContent = data.name;
  return cardElement;
}

initialCards.forEach(function (cardData) {
  const cardNode = getCardElement(cardData);
  document.querySelector(".locations__cards").append(cardNode);
});

function toggleAddModal() {
  newPlaceModal.classList.toggle("modal_opened");
}

addCardButton.addEventListener("click", toggleAddModal);

cardModalClose.addEventListener("click", toggleAddModal);
