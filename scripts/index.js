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

const profileEditModal = document.querySelector(".modal");

const modalContainer = document.querySelector(".modal__container");

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
  profileEditModal.classList.toggle("modal_opened");
}

function fillProfileForm() {
  modalInputName.value = profileName.textContent;
  modalInputDescription.value = profileDescription.textContent;
}

fillProfileForm();

profileEditButton.addEventListener("click", toggleModal);

modalClose.addEventListener("click", toggleModal);

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

for (let i = 0; i < initialCards.length; i++) {
  const cardNode = getCardElement(initialCards[i]);
  document.querySelector(".locations__cards").append(cardNode);
}
