export class Card {
  constructor(cardData, templateSelector, handleCardClick, handleTrashButtonClick, setLike, setDislike, isLiked, isOwned) {
    this._cardId = cardData._id;
    this._link = cardData.link;
    this._title = cardData.name;
    this._likes = cardData.likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleTrashButtonClick = handleTrashButtonClick;
    this._setLike = setLike;
    this._setDislike = setDislike;
    this._isLiked = isLiked;
    this._isOwned = isOwned;
    this._ownerId = cardData.owner._id;
  }

  _handleLikeButton(button) {

    this._likeButton.classList.toggle('element__heart-button_active');
    if (this._likeButton.classList.contains('element__heart-button_active')) {
      this._setLike(this._cardId).then((result) => {

        this._likesElement.textContent = result.likes.length;

      });
    }
    else {
      this._setDislike(this._cardId).then((result) => {
        this._likesElement.textContent = result.likes.length;

      });
    }
  }

  removeCard() {

    this._cardElement.remove();
    this._cardElement = null;

  }

  getCardId() {
    return this._cardId;
  }


  _setEventListeners() {

    this._likeButton.addEventListener('click', () => { this._handleLikeButton(this._likeButton) });
    this._deleteButton.addEventListener('click', () => { this._handleTrashButtonClick(this) });
    this._cardImage.addEventListener('click', () => { this._handleCardClick(this._link, this._title); });
  }


  generateCard() {
    this._cardTemplate = document.querySelector(this._templateSelector).content;
    this._cardElement = this._cardTemplate.querySelector('.element').cloneNode(true);
    this._cardImage = this._cardElement.querySelector('.element__image');
    this._cardDescription = this._cardElement.querySelector('.element__name');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._link;
    this._cardDescription.textContent = this._title;
    this._likeButton = this._cardElement.querySelector('.element__heart-button');
    this._likesElement = this._cardElement.querySelector('.element__likes-count');
    this._likesElement.textContent = this._likes.length;
    this._deleteButton = this._cardElement.querySelector('.element__delete-button');

    if (this._isLiked) {
      this._likeButton.classList.add('element__heart-button_active');

    }

    if (this._isOwned) {
      this._deleteButton.classList.add('element__delete-button_active');

    }

    this._setEventListeners();

    return this._cardElement;
  }
}
