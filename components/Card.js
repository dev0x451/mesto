export class Card {
    constructor(cardData, templateSelector, handleCardClick) {
        this._link = cardData.link;
        this._title = cardData.title;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }

    _handleLikeButton(button) {
        this._likeButton.classList.toggle('element__heart-button_active');
    }

    _handleDeleteButton(button) {
        this._cardElement.remove();
        this._cardElement = null;
    }

    _setEventListeners() {

        this._likeButton.addEventListener('click', () => { this._handleLikeButton(this._likeButton) });
        this._deleteButton.addEventListener('click', () => { this._handleDeleteButton(this._deleteButton) });
        this._cardImage.addEventListener('click', () => { this._handleCardClick(this._link, this._title); });

    }

    generateCard() {
        this._cardTemplate = document.querySelector(this._templateSelector).content;
        this._cardElement = this._cardTemplate.querySelector('.element').cloneNode(true);
        this._cardImage = this._cardElement.querySelector('.element__image');
        this._cardDescription = this._cardElement.querySelector('.element__name');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._link
        this._cardDescription.textContent = this._title;
        this._likeButton = this._cardElement.querySelector('.element__heart-button');
        this._deleteButton = this._cardElement.querySelector('.element__delete-button');

        this._setEventListeners();

        return this._cardElement;
    }


}