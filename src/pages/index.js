
import { Section } from '../components/Section.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { setupObj, cardsContainerSelector, cardTemplateSelector } from '../utils/constants.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupConfirm } from '../components/PopupConfirm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import './index.css';

const formElementEdit = document.querySelector('.popup__form_edit');
const formElementAvatar = document.querySelector('.popup__form_avatar');
const formElementAdd = document.querySelector('.popup__form_add');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonEditAvatar = document.querySelector('.profile__avatar');
const buttonAdd = document.querySelector('.profile__add-button');


const api = new Api({ url: 'https://mesto.nomoreparties.co/v1/cohort-49', token: '4a3a5ed7-c33c-4007-ab2f-bb1055621552' });

const userPromise = api.getUser();
const cardsPromise = api.getInitialCards();

const allPromises = [cardsPromise, userPromise];

Promise.all(allPromises).then((results) => {

  const cardsData = results[0];
  const myUser = results[1];

  const userInfo = new UserInfo({ nameSelector: '.profile__name', jobSelector: '.profile__job', avatarSelector: '.profile__avatar' });

  userInfo.setUserInfo(myUser.name, myUser.about, myUser._id);
  userInfo.setAvatar(myUser.avatar);


  const handleFormSubmitAdd = (formValues) => {


    thePopupAdd.setSubmitCaption('Сохранение...');
    api.addCard(formValues.name, formValues.link).then((card) => {

      thePopupAdd.setSubmitCaption('Готово!');

      //добавим таймаут 500мс, чтобы пользователь успел увидеть надпись "Готово!" (улучшаем UX :) )
      setTimeout(() => {
        thePopupAdd.close();
      }, 500);

      const newCard = createCard(card, false, true);
      cardsSection.addItem(newCard, true);

    }).finally(() => {

      setTimeout(() => {
        thePopupAdd.setDefaultSubmitCaption();

      }, 1200);

    })


  }



  const handleFormSubmitEdit = (formValues) => {

    thePopupEdit.setSubmitCaption('Сохранение...');


    api.setUser(formValues.name, formValues.job).then(() => {

      thePopupEdit.setSubmitCaption('Готово!');

      //добавим таймаут 500мс, чтобы пользователь успел увидеть надпись "Готово!" (улучшаем UX :) )
      setTimeout(() => {
        thePopupEdit.close();
      }, 500);
      userInfo.setUserInfo(formValues.name, formValues.job, myUser._id);
    }).finally(() => {

      setTimeout(() => {
        thePopupEdit.setDefaultSubmitCaption();

      }, 1200);


    })

  }

  const handleFormSubmitAvatar = (formValues) => {

    thePopupAvatar.setSubmitCaption('Сохранение...');

    api.setAvatar(formValues.avatar).then(
      (user) => {
        thePopupAvatar.setSubmitCaption('Готово!');

        //добавим таймаут 500мс, чтобы пользователь успел увидеть надпись "Готово!" (улучшаем UX :) )
        setTimeout(() => {
          userInfo.setAvatar(user.avatar);
          thePopupAvatar.close();

        }, 500);

      }).finally(() => {

        setTimeout(() => {
          thePopupAvatar.setDefaultSubmitCaption();

        }, 1200);

      })

  }

  const handleConfirmButton = (cardInstance) => {

    thePopupConfirm.setConfirmButtonCaption('Удаление...');

    api.deleteCard(cardInstance.getCardId()).then(
      (card) => {

        thePopupConfirm.setConfirmButtonCaption('Готово!');
        //добавим таймаут 500мс, чтобы пользователь успел увидеть надпись "Готово!" (улучшаем UX :) )
        setTimeout(() => {
          cardInstance.removeCard();
          thePopupConfirm.close();
        }, 500);

      }).finally(() => {

        setTimeout(() => {
          thePopupConfirm.setDefaultConfirmButtonCaption();

        }, 1200);


      })

  }


  const formEditValidation = new FormValidator(setupObj, formElementEdit);
  formEditValidation.enableValidation();

  const formAvatarValidation = new FormValidator(setupObj, formElementAvatar);
  formAvatarValidation.enableValidation();


  const formAddValidation = new FormValidator(setupObj, formElementAdd);
  formAddValidation.enableValidation();

  const thePopupAdd = new PopupWithForm('.popup_add', handleFormSubmitAdd);
  thePopupAdd.setEventListeners();

  const thePopupEdit = new PopupWithForm('.popup_edit', handleFormSubmitEdit);
  thePopupEdit.setEventListeners();

  const thePopupAvatar = new PopupWithForm('.popup_avatar', handleFormSubmitAvatar);
  thePopupAvatar.setEventListeners();

  const thePopupWithImage = new PopupWithImage('.popup-gallery');
  thePopupWithImage.setEventListeners();


  const thePopupConfirm = new PopupConfirm('.popup_confirm', handleConfirmButton);
  thePopupConfirm.setEventListeners();


  const cardsSection = new Section({
    items: cardsData, renderer: (item) => {

      let isOwned = false;

      //проверим, являемся ли мы владельцами картинки
      if (item.owner._id === myUser._id) isOwned = true;

      //проверим, есть ли лайк картинки у нашего пользовтеля
      const isLiked = item.likes.some(element => {
        return (element._id === myUser._id)
      })
      const theCard = createCard(item, isLiked, isOwned);
      cardsSection.addItem(theCard, false);
    }
  }, cardsContainerSelector);
  cardsSection.renderItems();

  //хэндлер на клик по картинке карточки
  function handleCardClick(imageLink, caption) {
    thePopupWithImage.open(imageLink, caption);

  }


  function handleTrashButtonClick(cardInstance) {

    thePopupConfirm.setCurrentCard(cardInstance);
    thePopupConfirm.open();

  }


  function setLike(cardId) {

    return api.setLike(cardId);

  }


  function setDislike(cardId) {

    return api.removeLike(cardId)

  }


  function createCard(item, isLiked, isOwned) {
    const cardElement = new Card(item, cardTemplateSelector, handleCardClick, handleTrashButtonClick, setLike, setDislike, isLiked, isOwned);

    return cardElement.generateCard()
  }



  buttonEditProfile.addEventListener('click', () => {
    thePopupEdit.setInputValues(userInfo.getUserInfo());
    formEditValidation.resetValidation();
    thePopupEdit.open();
  });

  buttonEditAvatar.addEventListener('click', (evt) => {
    formAvatarValidation.resetValidation();
    thePopupAvatar.open();
  });


  buttonAdd.addEventListener('click', () => {
    formAddValidation.resetValidation();
    thePopupAdd.open();
  });

})

  .catch((err) => {
    console.log('ошибка кэтч: ' + err); // выведем ошибку в консоль
  });
