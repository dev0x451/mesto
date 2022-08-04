export class Card {
    constructor(cardData, templateSelector, handleCardImage) {
        this._link = cardData.link;
        this._name = cardData.name;
        this._templateSelector = templateSelector;
        this._handleCardImage = handleCardImage;
    }

    _handleLikeButton(button) {
        //button.querySelector('.element__heart-icon').classList.toggle('element__heart-icon_active');
        this._likeButton.classList.toggle('element__heart-button_active');
    }

    _handleDeleteButton(button) {
        this._cardElement.remove();
        this._cardElement = null;
    }

    _setEventListeners() {

        this._likeButton.addEventListener('click', () => { this._handleLikeButton(this._likeButton) });
        this._deleteButton.addEventListener('click', () => { this._handleDeleteButton(this._deleteButton) });
        this._cardImage.addEventListener('click', () => { this._handleCardImage(this._link, this._name); });

    }

    generateCard() {
        this._cardTemplate = document.querySelector(this._templateSelector).content;
        this._cardElement = this._cardTemplate.querySelector('.element').cloneNode(true);
        this._cardImage = this._cardElement.querySelector('.element__image');
        this._cardDescription = this._cardElement.querySelector('.element__name');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._link
        this._cardDescription.textContent = this._name;
        this._likeButton = this._cardElement.querySelector('.element__heart-button');
        this._deleteButton = this._cardElement.querySelector('.element__delete-button');

        this._setEventListeners();

        return this._cardElement;
    }


}