
import { Section } from '../components/Section.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { initialCards, setupObj, cardsContainerSelector, cardTemplateSelector } from '../utils/constants.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import './index.css';

const formElementEdit = document.querySelector('.popup__form_edit');
const formElementAdd = document.querySelector('.popup__form_add');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

//хэндлер на клик по картинке карточки
const handleCardClick = (imageLink, caption) => {
  thePopupWithImage.open(imageLink, caption);

}

function createCard(item) {
  const cardElement = new Card(item, cardTemplateSelector, handleCardClick);

  return cardElement.generateCard()
}

//загрузим все карточки из массива
const cardsSection = new Section({
  items: initialCards, renderer: (item) => {
    const theCard = createCard(item);
    cardsSection.addItem(theCard);
  }
}, cardsContainerSelector);
cardsSection.renderItems();

const handleFormSubmitAdd = (formValues) => {

  const newCard = createCard(formValues);
  cardsSection.addItem(newCard, true);

  thePopupAdd.close();
}

const handleFormSubmitEdit = (formValues) => {
  userInfo.setUserInfo(formValues.name, formValues.job);
  thePopupEdit.close();
}

buttonEditProfile.addEventListener('click', () => {
  thePopupEdit.setInputValues(userInfo.getUserInfo());
  formEditValidation.resetValidation();
  thePopupEdit.open();
});

buttonAdd.addEventListener('click', () => {
  formAddValidation.resetValidation();
  thePopupAdd.open();
});

const userInfo = new UserInfo({ nameSelector: '.profile__name', jobSelector: '.profile__job' });

const formEditValidation = new FormValidator(setupObj, formElementEdit);
formEditValidation.enableValidation();

const formAddValidation = new FormValidator(setupObj, formElementAdd);
formAddValidation.enableValidation();

const thePopupAdd = new PopupWithForm('.popup_add', handleFormSubmitAdd);
thePopupAdd.setEventListeners();

const thePopupEdit = new PopupWithForm('.popup_edit', handleFormSubmitEdit);
thePopupEdit.setEventListeners();

const thePopupWithImage = new PopupWithImage('.popup-gallery');
thePopupWithImage.setEventListeners();
