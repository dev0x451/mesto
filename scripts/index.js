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

const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupGallery = document.querySelector('.popup_gallery');
const formElementEdit = document.querySelector('.popup__form_edit');
const formElementAdd = document.querySelector('.popup__form_add');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtonEdit = document.querySelector('.popup__close-button_edit');
const closeButtonAdd = document.querySelector('.popup__close-button_add');
const closeButtonGallery = document.querySelector('.popup__close-button_gallery');
const inputName = document.querySelector('.popup__input_name');
const inputJob = document.querySelector('.popup__input_job');
const inputTitle = document.querySelector('.popup__input_title');
const inputLink = document.querySelector('.popup__input_link');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const cardTemplate = document.querySelector('#card-template').content;
const cardElements = document.querySelector('.elements');

//кнопка like
toggleLike = (button) => {
  button.querySelector('.element__heart-icon').classList.toggle('element__heart-icon_active');

}

renderNewCard = (name, link, place) => {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  const cardDescription = cardElement.querySelector('.element__name');
  const likeButton = cardElement.querySelector('.element__heart-button');
  // toggleLike(likeButton);
  likeButton.addEventListener('click', (evt) => {
    likeButton.querySelector('.element__heart-icon').classList.toggle('element__heart-icon_active');
  });
  cardImage.setAttribute('src', link);
  cardImage.setAttribute('alt', name);
  cardDescription.textContent = name;
  if (place === 'start') cardElements.prepend(cardElement)
  else if (place === 'end') cardElements.append(cardElement);
}

//загрузим все карточки из массива когда весь документ прогрузится
window.addEventListener("load", (evt) => {
  initialCards.forEach(card => {
    renderNewCard(card.name, card.link, 'end');
  });
});

//renderNewCard('Чернобыль', 'https://www.calend.ru/calendar/wp-content/uploads/ice_screenshot_20210424-223143.jpeg');



showPopup = (popup) => {
  popup.classList.add('popup_opened');
}

closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  // popup.classList.add('popup_closed');

}

formSubmitHandlerEdit = (evt) => {
  evt.preventDefault();
  console.log('form edit');
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupEdit);
}

formSubmitHandlerAdd = (evt) => {
  evt.preventDefault();
  //'Чернобыль', 'https://www.calend.ru/calendar/wp-content/uploads/ice_screenshot_20210424-223143.jpeg'
  renderNewCard(inputTitle.value, inputLink.value, 'start');
  inputTitle.value = '';
  inputLink.value = '';
  closePopup(popupAdd);
}

editButton.addEventListener('click', () => {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  showPopup(popupEdit);
});
addButton.addEventListener('click', () => {
  showPopup(popupAdd)
});
//galleryItem.addEventListener('click', () => { showPopup(popupGallery) });
closeButtonEdit.addEventListener('click', () => {
  inputName.value = '';
  inputJob.value = '';
  closePopup(popupEdit);
});
closeButtonAdd.addEventListener('click', () => {
  inputTitle.value = '';
  inputLink.value = '';
  closePopup(popupAdd);
});
closeButtonGallery.addEventListener('click', () => {
  closePopup(popupGallery)
});
formElementEdit.addEventListener('submit', formSubmitHandlerEdit);
formElementAdd.addEventListener('submit', formSubmitHandlerAdd);

