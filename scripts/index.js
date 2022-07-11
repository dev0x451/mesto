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

const popupOverlays = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupGallery = document.querySelector('.popup-gallery');
const popupGalleryImage = popupGallery.querySelector('.popup-gallery__image');
const popupGalleryCaption = popupGallery.querySelector('.popup-gallery__caption');
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
const cardTemplate = document.querySelector('#card-template').content;
const cardElements = document.querySelector('.elements');
const closeButtons = document.querySelectorAll('.popup__close-button');

//сразу запишем в поля ввода значения из разметки, чтобы при открытии попапа валидация 
//сразу сработала правильно...
inputName.value = profileName.textContent;
inputJob.value = profileJob.textContent;

const setupObj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

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

showPopup = (popup) => {
  resetValidation(setupObj);
  popup.addEventListener('keydown', handleEsc);
  popup.addEventListener('transitionend', (event) => {
    event.target.focus();
  });
  popup.classList.add('popup_opened');
}

closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('keydown', handleEsc);
}

//закрытие попап по Esc
const handleEsc = (evt) => {
  if (evt.key === 'Escape') {
    closePopup(evt.target);
  }

}

//закрытие попап по клику на оверлей
Array.from(popupOverlays).forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    closePopup(evt.target);
  });

});

const handleLikeButton = (button) => {
  button.querySelector('.element__heart-icon').classList.toggle('element__heart-icon_active');
}

const handleDeleteButton = (button) => {
  button.closest('.element').remove();
}

const handleCardImage = (imageLink, caption) => {
  popupGalleryImage.src = imageLink;
  popupGalleryImage.alt = caption;
  popupGalleryCaption.textContent = caption;
  showPopup(popupGallery);
}

const renderCard = (cardElement, container, position) => {
  if (position === 'start') container.prepend(cardElement)
  else if (position === 'end') container.append(cardElement);
}

const createNewCard = (card) => {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  const cardDescription = cardElement.querySelector('.element__name');
  const likeButton = cardElement.querySelector('.element__heart-button');
  const deleteButton = cardElement.querySelector('.element__delete-button');

  likeButton.addEventListener('click', () => { handleLikeButton(likeButton) });
  deleteButton.addEventListener('click', () => { handleDeleteButton(deleteButton) });
  cardImage.addEventListener('click', () => { handleCardImage(card.link, card.name); });

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardDescription.textContent = card.name;
  return cardElement;
}

//загрузим все карточки из массива ,
// когда весь документ прогрузится
window.addEventListener("load", (evt) => {
  initialCards.forEach(card => {
    renderCard(createNewCard(card), cardElements, 'end');
  });
});

const handleFormSubmitEdit = (evt) => {
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupEdit);
}

const handleFormSubmitAdd = (evt) => {
  const card = {
    name: inputTitle.value,
    link: inputLink.value
  };
  renderCard(createNewCard(card), cardElements, 'start');
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

enableValidation(setupObj);
