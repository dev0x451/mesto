export class Card {
    constructor(cardData, templateSelector, handleCardImage) {
        this._link = cardData.link;
        this._name = cardData.name;
        this._cardTemplate = document.querySelector(templateSelector).content;
        this._cardElement = this._cardTemplate.querySelector('.element').cloneNode(true);
        this._cardImage = this._cardElement.querySelector('.element__image');
        this._cardDescription = this._cardElement.querySelector('.element__name');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._link
        this._cardDescription.textContent = this._name;
        this._likeButton = this._cardElement.querySelector('.element__heart-button');
        this._deleteButton = this._cardElement.querySelector('.element__delete-button');
        this._handleCardImage = handleCardImage;

        this._setEventListeners();

    }

    _handleLikeButton(button) {
        button.querySelector('.element__heart-icon').classList.toggle('element__heart-icon_active');
    }

    _handleDeleteButton(button) {
        button.closest('.element').remove();
    }

    _setEventListeners() {

        this._likeButton.addEventListener('click', () => { this._handleLikeButton(this._likeButton) });
        this._deleteButton.addEventListener('click', () => { this._handleDeleteButton(this._deleteButton) });
        this._cardImage.addEventListener('click', () => { this._handleCardImage(this._link, this._name); });

    }

    generateCard() {

        return this._cardElement;
    }


}