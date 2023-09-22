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

const modal = document.querySelector(".modal");

const profileEditButton = document.querySelector(".profile__edit-button");

const modalClose = document.querySelector(".modal__close");

const profileName = document.querySelector(".profile__name");

const profileDescription = document.querySelector(".profile__description");

const modalInputName = document.querySelector(".modal__input-name");

const modalInputDescription = document.querySelector(
  ".modal__input-description"
);

const cardTemplate = document.querySelector("#locations-card");

function toggleModal() {
  modal.classList.toggle("modal_opened");
}

profileEditButton.addEventListener("click", toggleModal);

modalClose.addEventListener("click", toggleModal);

modalInputName.value = profileName.textContent;

modalInputDescription.value = profileDescription.textContent;

function updateModal(event) {
  profileName.textContent = modalInputName.value;
  profileDescription.textContent = modalInputDescription.value;
  event.preventDefault();
  toggleModal();
}

document
  .querySelector(".modal__container")
  .addEventListener("submit", updateModal);

  getCardElement(data) {

  }