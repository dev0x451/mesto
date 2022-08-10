import { Section } from '../components/Section.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { initialCards, setupObj } from '../utils/constants.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';


//const allPopups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupGallery = document.querySelector('.popup-gallery');
//const popupGalleryImage = popupGallery.querySelector('.popup-gallery__image');
//const popupGalleryCaption = popupGallery.querySelector('.popup-gallery__caption');
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
const cardsContainerSelector = '.elements';
const cardTemplateSelector = '#card-template';

//хэндлер на клик по картинке карточки
const handleCardClick = (imageLink, caption) => {
  thePopupWithImage.open(imageLink, caption);

}

//загрузим все карточки из массива
const cardsSection = new Section({
  items: initialCards, renderer: (item) => {
    const theCard = new Card(item, cardTemplateSelector, handleCardClick);
    cardsSection.addItem(theCard.generateCard());
  }
}, cardsContainerSelector);
cardsSection.renderItems();

const handleFormSubmitAdd = () => {
  const newCard = new Card({
    name: inputTitle.value,
    link: inputLink.value
  }, cardTemplateSelector, handleCardClick);
  cardsSection.addItem(newCard.generateCard(), true);

  closePopup(popupAdd);
}

const handleFormSubmitEdit = () => {
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupEdit);
}

buttonEditProfile.addEventListener('click', () => {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  //сбросим валидацию
  formEditValidation.resetValidation(false);
  thePopupEdit.open();

});

buttonAdd.addEventListener('click', () => {
  //сбросим валидацию и обнулим поля формы
  formAddValidation.resetValidation(true);
  thePopupAdd.open();
});

formElementEdit.addEventListener('submit', handleFormSubmitEdit);
formElementAdd.addEventListener('submit', handleFormSubmitAdd);

//создадим объекты валидации форм
const formEditValidation = new FormValidator(setupObj, formElementEdit);
formEditValidation.enableValidation();

const formAddValidation = new FormValidator(setupObj, formElementAdd);
formAddValidation.enableValidation();

const thePopupAdd = new PopupWithForm('.popup_add');
thePopupAdd.setEventListeners();

const thePopupEdit = new PopupWithForm('.popup_edit');
thePopupEdit.setEventListeners();

const thePopupWithImage = new PopupWithImage('.popup-gallery');
thePopupWithImage.setEventListeners();
