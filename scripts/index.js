const popup = document.querySelector('.popup');
const formElement = document.querySelector('.popup__form');
const editButton = document.querySelector('.profile__edit-button');
const closeIcon = document.querySelector('.popup__close-button');
const inputName = document.querySelector('.popup__input_name');
const inputJob = document.querySelector('.popup__input_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

editButton.addEventListener('click', showPopup);
closeIcon.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);

function showPopup() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  popup.classList.add('popup_opened');
}

function closePopup() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  popup.classList.remove('popup_opened');
}
