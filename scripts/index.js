import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards } from './initialCards.js';

const setupObj = {
  //formSelector: '.popup__form', - по факту не нужен, можно удалить
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};


const allPopups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupGallery = document.querySelector('.popup-gallery');
const popupGalleryImage = popupGallery.querySelector('.popup-gallery__image');
const popupGalleryCaption = popupGallery.querySelector('.popup-gallery__caption');
const formElementEdit = document.querySelector('.popup__form_edit');
const formElementAdd = document.querySelector('.popup__form_add');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const inputName = document.querySelector('.popup__input_name');
const inputJob = document.querySelector('.popup__input_job');
const inputTitle = document.querySelector('.popup__input_title');
const inputLink = document.querySelector('.popup__input_link');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const cardElements = document.querySelector('.elements');


const showPopup = (popup) => {
  document.addEventListener('keydown', handleEsc);
  popup.classList.add('popup_opened');
}

const closePopup = (popup) => {
  document.removeEventListener('keydown', handleEsc);
  popup.classList.remove('popup_opened');
}

//хэндлер на клик по картинке карточки
const handleCardImage = (imageLink, caption) => {

  popupGalleryImage.src = imageLink;
  popupGalleryImage.alt = caption;
  popupGalleryCaption.textContent = caption;

  showPopup(popupGallery);
}

//закрытие попапа по Esc
const handleEsc = (evt) => {
  if (evt.key === 'Escape') {
    //найдем открытый в данный момент попап
    const currentOpenedPopup = document.querySelector('.popup_opened');
    closePopup(currentOpenedPopup);
  }

}

//закрытие всех попапов по клику на оверлей или на крестик
Array.from(allPopups).forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }

  });

});

const renderCard = (cardElement, container, toStart = true) => {
  if (toStart) container.prepend(cardElement)
  else container.append(cardElement);
}

const createCard = (card, cardTemplate, handleCardImage, position) => {
  const theCard = new Card(card, cardTemplate, handleCardImage);
  renderCard(theCard.generateCard(), cardElements, position);
}

//загрузим все карточки из массива ,
// когда весь документ прогрузится
window.addEventListener("load", (evt) => {
  initialCards.forEach(card => {
    createCard(card, '#card-template', handleCardImage, false);
  });
});

const handleFormSubmitEdit = (evt) => {
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupEdit);
}

const handleFormSubmitAdd = (evt) => {
  createCard({
    name: inputTitle.value,
    link: inputLink.value
  }, '#card-template', handleCardImage, true);

  closePopup(popupAdd);
}

buttonEditProfile.addEventListener('click', () => {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  //сбросим валидацию
  formEditValidation.resetValidation(false);

  showPopup(popupEdit);
});

buttonAdd.addEventListener('click', () => {
  //сбросим валидацию и обнулим поля формы
  formAddValidation.resetValidation(true);
  showPopup(popupAdd);
});

formElementEdit.addEventListener('submit', handleFormSubmitEdit);
formElementAdd.addEventListener('submit', handleFormSubmitAdd);

//создадим объекты валидации форм
const formEditValidation = new FormValidator(setupObj, formElementEdit);
formEditValidation.enableValidation();

const formAddValidation = new FormValidator(setupObj, formElementAdd);
formAddValidation.enableValidation();
