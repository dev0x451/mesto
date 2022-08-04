import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const setupObj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};


const popupOverlays = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupGallery = document.querySelector('.popup-gallery');

const formList = Array.from(document.querySelectorAll(setupObj.formSelector));
const formElementEdit = document.querySelector('.popup__form_edit');
const formElementAdd = document.querySelector('.popup__form_add');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const inputName = document.querySelector('.popup__input_name');
const inputJob = document.querySelector('.popup__input_job');
const inputTitle = document.querySelector('.popup__input_title');
const inputLink = document.querySelector('.popup__input_link');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const closeButtons = document.querySelectorAll('.popup__close-button');
const cardElements = document.querySelector('.elements');


//запишем в поля ввода значения из разметки, чтобы при открытии попапа редактирования валидация 
//сразу сработала правильно...
inputName.value = profileName.textContent;
inputJob.value = profileJob.textContent;


closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап 
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', (evt) => {
    closePopup(popup);
  });

  //крестик получает ненужный фокус после наведения на него мыши (без клика), 
  //из-за чего перестает отлавливаться нажатие на Esc, поэтому
  //отловим событие фокуса и уведем фокус на сам попап
  button.addEventListener('focus', (evt) => {
    popup.focus();
  });

});

const showPopup = (popup) => {

  //пройдемся по всем формам, сбросим валидацию и  очистим поля ввода
  formsValidationList.forEach((formVal) => {
    formVal.resetValidation(true);

  });

  //// возьмем значения полей ввода из разметки
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  ////

  //еще раз пройдемся по всем формам, но уже не будем очищать поля ввода, чтобы кнопка Сохранить
  //в попапе редактирования профиля была активна сразу после открытия попапа
  formsValidationList.forEach((formVal) => {
    formVal.resetValidation(false);

  });


  popup.addEventListener('keydown', handleEsc);
  popup.addEventListener('transitionend', (event) => {
    event.target.focus();
  });
  popup.classList.add('popup_opened');
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('keydown', handleEsc);
}


//хэндлер на клик по картинке карточки
const handleCardImage = (imageLink, caption) => {

  popupGallery.querySelector('.popup-gallery__image').src = imageLink;
  popupGallery.querySelector('.popup-gallery__image').alt = caption;
  popupGallery.querySelector('.popup-gallery__caption').textContent = caption;

  showPopup(popupGallery);
}

//закрытие попапа по Esc
const handleEsc = (evt) => {
  if (evt.key === 'Escape') {
    closePopup(evt.target);
  }

}

//закрытие всех попапов по клику на оверлей
Array.from(popupOverlays).forEach((popupOverlay) => {
  popupOverlay.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) closePopup(evt.target);
  });

});


const renderCard = (cardElement, container, position) => {
  if (position === 'start') container.prepend(cardElement)
  else if (position === 'end') container.append(cardElement);
}


//загрузим все карточки из массива ,
// когда весь документ прогрузится
window.addEventListener("load", (evt) => {
  initialCards.forEach(card => {

    const theCard = new Card(card, '#card-template', handleCardImage);

    renderCard(theCard.generateCard(), cardElements, 'end');
  });
});

const handleFormSubmitEdit = (evt) => {
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupEdit);
}

const handleFormSubmitAdd = (evt) => {
  const newCard = new Card({
    name: inputTitle.value,
    link: inputLink.value
  }, '#card-template');

  renderCard(newCard.generateCard(), cardElements, 'start');
  closePopup(popupAdd);
}



editButton.addEventListener('click', () => {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  showPopup(popupEdit);
});
addButton.addEventListener('click', () => {
  showPopup(popupAdd);
});

formElementEdit.addEventListener('submit', handleFormSubmitEdit);
formElementAdd.addEventListener('submit', handleFormSubmitAdd);


//создадим объекты валидации форм
const formsValidationList = [];
formList.forEach((formElement) => {
  const formValidation = new FormValidator(setupObj, formElement);
  formValidation.enableValidation();
  formsValidationList.push(formValidation);
});

