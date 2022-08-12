
import { Section } from '../components/Section.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { initialCards, setupObj } from '../utils/constants.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import './index.css';

const formElementEdit = document.querySelector('.popup__form_edit');
const formElementAdd = document.querySelector('.popup__form_add');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
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

const handleFormSubmitAdd = (formValues) => {
  const newCard = new Card(formValues, cardTemplateSelector, handleCardClick);
  cardsSection.addItem(newCard.generateCard(), true);
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
